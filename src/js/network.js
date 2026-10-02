/* ============================================================
   RED · 10 ESPACIOS ABIERTOS + AGUA COMÚN
   - Se mira sin cuenta; al tomar un lugar se pide cuenta de Google.
   - Hay 10 espacios (s1..s10). Quien llega toma el primero libre
     mediante una transacción atómica: nadie pisa a nadie.
   - El estado del bioma (pez, sedimento) vive en el espacio, no
     en el navegador: ceder = soltar el espacio con todo su estado.
   - Un espacio sin actividad ABANDON_MS queda en "rescate" y
     cualquiera puede tomarlo.
   - El agua común no se guarda: se calcula con los espacios.
   Roles: 'owner' (cuida un espacio) · 'spectator' (mira) · 'local' (sin red)
   ============================================================ */
const Net = (()=>{
  const N=10, ABANDON_MS=7*864e5, FEED_MS=864e5, BEAT_MS=3e5, NOCLAIM_KEY='betta.noClaimUntil';
  let slotsRef=null, slots={}, uid=null, mySlot=null, role='local', online=false;
  let water=0, target=0, pubT=0, pubTimer=null, error='';

  const now=()=>Date.now();
  const sid=i=>'s'+i;
  const abandoned=s=>s && s.owner && now()-s.t>ABANDON_MS;
  const isFree=s=>!s || (!s.owner && !(s.res>now())) || abandoned(s);   /* reservado por PIN = no libre */
  const timeout=(p,ms)=>Promise.race([p,new Promise((_,r)=>setTimeout(()=>r(new Error('timeout')),ms))]);

  /* ---------- arranque: se observa SIN pedir cuenta ---------- */
  async function init(){
    if(!FIREBASE_CONFIG || typeof firebase==='undefined' || !firebase.auth) return {role:'local'};
    try{ return await timeout(boot(),7000); }
    catch(e){ error=humanize(e); console.warn('[Betta] Red no disponible, modo local:',e); role='local'; online=false; return {role:'local'}; }
  }
  async function boot(){
    firebase.initializeApp(FIREBASE_CONFIG);
    slotsRef=firebase.database().ref('slots');
    slots=(await slotsRef.once('value')).val()||{};
    online=true;
    slotsRef.on('value',s=>{
      slots=s.val()||{}; recompute();
      if(mySlot && (!slots[sid(mySlot)] || slots[sid(mySlot)].owner!==uid)){ mySlot=null; role='spectator'; }
    },()=>{ online=false; });
    /* con sesión previa se recupera el espacio; sin sesión no se pide nada */
    const user=await new Promise(res=>{ const off=firebase.auth().onAuthStateChanged(u=>{ off(); res(u); }); });
    if(user){ uid=user.uid; for(let i=1;i<=N;i++) if(slots[sid(i)] && slots[sid(i)].owner===uid) mySlot=i; }
    role=mySlot?'owner':'spectator';
    if(mySlot) startBeat();
    recompute();
    return { role, slot:mySlot, state: mySlot?slots[sid(mySlot)]:null };
  }
  /* se llama SOLO tras aceptar la responsiva: pide cuenta de Google y toma un lugar */
  async function takeSlot(pin){
    if(!online) return {ok:false,reason:'Sin conexión con la red del bioma.'};
    if(now()<+(localStorage.getItem(NOCLAIM_KEY)||0)) return {ok:false,reason:'Cediste un lugar hace poco. Podrás tomar otro pasadas 24 horas.'};
    try{
      if(!uid){ const c=await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()); uid=c.user.uid; }
      slots=(await slotsRef.once('value')).val()||{};
      for(let i=1;i<=N && !mySlot;i++) if(slots[sid(i)] && slots[sid(i)].owner===uid) mySlot=i;
      if(pin && !mySlot){
        const p=(await firebase.database().ref('pins/'+pin).once('value')).val();
        if(!p || now()-p.t>3*864e5) return {ok:false,reason:'PIN inválido o vencido. Pídele a quien te lo dio que genere uno nuevo.'};
        const i=+p.s.slice(1);
        if(await claim(i,pin)){ mySlot=i; firebase.database().ref('pins/'+pin).remove().catch(()=>{}); }
        else return {ok:false,reason:'Ese lugar ya no está disponible.'};
      }
      if(!pin) for(let i=1;i<=N && !mySlot;i++) if(isFree(slots[sid(i)]) && await claim(i)) mySlot=i;
      if(!mySlot) return {ok:false,reason:'Los 10 lugares se ocuparon mientras decidías.'};
      role='owner'; startBeat(); recompute();
      return {ok:true, slot:mySlot, state:slots[sid(mySlot)]||null};
    }catch(e){ return {ok:false,reason:humanize(e)}; }
  }
  function humanize(e){
    const c=(e&&e.code)||'';
    return ({ 'auth/popup-closed-by-user':'Cerraste la ventana de Google. Puedes intentarlo de nuevo.',
      'auth/cancelled-popup-request':'Se canceló el inicio de sesión. Inténtalo de nuevo.',
      'auth/popup-blocked':'Tu navegador bloqueó la ventana de Google. Permítela e inténtalo de nuevo.',
      'auth/unauthorized-domain':'Este dominio no está autorizado en Firebase (Authentication > Configuración > Dominios autorizados).',
      'auth/operation-not-allowed':'Falta habilitar el proveedor Google en Firebase (Authentication > Método de acceso).'
    })[c] || ('No se pudo completar: '+(c||(e&&e.message)||e));
  }
  let beat=null;
  function startBeat(){ if(!beat) beat=setInterval(()=>{ if(!document.hidden) publish(true); },BEAT_MS); }
  const freeCount=()=>{ let c=0; for(let i=1;i<=N;i++) if(isFree(slots[sid(i)])) c++; return c; };

  /* transacción: toma el espacio solo si sigue libre */
  async function claim(i,pin){
    try{
      const r=await slotsRef.child(sid(i)).transaction(cur=>{
        if(cur && !isFree(cur) && !(pin && !cur.owner)) return;     /* alguien ganó (o está reservado sin tu PIN) */
        const base=cur||{ x:Math.random()<.5?0:1, n:0, f:0, d:[], c:now() };
        const out=Object.assign({},base,{ owner:uid, t:now() }); delete out.res; if(pin) out.pin=pin;
        return out;
      });
      if(r.committed && r.snapshot.val().owner===uid){ slots[sid(i)]=r.snapshot.val(); return true; }
      return false;
    }catch(e){ return false; }
  }

  /* ---------- publicar el estado del propio espacio ---------- */
  function record(){
    const s=Persist.state(), last=s.days[s.days.length-1]||{f:0};
    return { owner:uid, t:now(), f:last.f|0, n:s.feeds|0, x:s.sex==='female'?1:0, d:s.days, c:s.c };
  }
  function publish(force){
    if(role!=='owner'||!slotsRef) { local(); return; }
    const wait=5000-(now()-pubT);
    if(!force && wait>0){ if(!pubTimer) pubTimer=setTimeout(()=>{pubTimer=null;publish(true);},wait); return; }
    pubT=now();
    const rec=record(); slots[sid(mySlot)]=rec; recompute();
    slotsRef.child(sid(mySlot)).set(rec).catch(()=>{ online=false; });
  }
  function local(){ recompute(); }

  /* ---------- ceder el espacio (conserva pez y sedimento) ---------- */
  const genPin=()=>{ const A='ABCDEFGHJKLMNPQRSTUVWXYZ23456789', r=crypto.getRandomValues(new Uint8Array(6)); return Array.from(r,x=>A[x%A.length]).join(''); };
  /* usePin=true: reserva el lugar 3 días para quien tenga el PIN (herencia). false: queda libre para todos. */
  async function cede(usePin){
    if(role!=='owner') return null;
    const s=Persist.state(); let pin=null;
    if(usePin){ pin=genPin(); await firebase.database().ref('pins/'+pin).set({ s:sid(mySlot), t:now() }); }
    const upd={ owner:null, t:now(), d:s.days, n:s.feeds, c:s.c }; if(pin) upd.res=now()+3*864e5;
    await slotsRef.child(sid(mySlot)).update(upd);
    localStorage.setItem(NOCLAIM_KEY, String(now()+864e5));   /* 24 h sin retomar */
    mySlot=null; role='spectator';
    return pin||true;
  }

  /* ---------- agua común (calculada) ---------- */
  function recompute(){
    let load=0;
    for(let i=1;i<=N;i++){ const s=slots[sid(i)]; if(s && now()-s.t<FEED_MS) load+=Math.min(12,s.f|0); }
    if(role==='local'){ const s=Persist.state(), l=s.days[s.days.length-1]; load=Math.min(12,l?l.f:0); }
    target=Math.min(1,load/30);
  }
  function drawWater(dt){
    water+=(target-water)*Math.min(1,dt*0.25);
    if(water>0.003){ ctx.fillStyle=`rgba(160,100,20,${(water*0.34).toFixed(3)})`; ctx.fillRect(0,0,W,H); }
    if(/[?&]debug/.test(location.search)) debug();
  }
  function debug(){
    let owned=0,free=0,rescue=0;
    for(let i=1;i<=N;i++){ const s=slots[sid(i)]; if(!s||!s.owner) free++; else if(abandoned(s)) rescue++; else owned++; }
    const L=[`rol: ${role}${mySlot?' · espacio '+mySlot:''}`,`red: ${online?'conectada':'sin red'}${error?' ('+error+')':''}`,
      `espacios  ocupados ${owned} · libres ${free} · rescate ${rescue}`,`agua: ${water.toFixed(2)} (objetivo ${target.toFixed(2)})`];
    ctx.save(); ctx.font=`${12*dpr}px monospace`; ctx.fillStyle='rgba(220,235,220,.85)';
    L.forEach((l,i)=>ctx.fillText(l,12*dpr,(20+i*16)*dpr)); ctx.restore();
  }

  function slotsInfo(){
    return Array.from({length:N},(_,k)=>{
      const i=k+1, s=slots[sid(i)], age=s?(now()-s.t)/864e5:0;
      const st=s&&!s.owner&&s.res>now()?'reservado':!s||!s.owner?'libre':s.owner===uid?'tuyo':age>7?'en rescate':age>3?'en riesgo':'cuidado';
      return { i, st, sex:s?(s.x===1?'♀':'♂'):'', d:(s&&s.d||[]).filter(Boolean).slice(-30), history:!!(s&&s.n) };
    });
  }
  /* lo que ve un observador: el estado real del lugar más descuidado */
  function viewDirt(){
    let m=null;
    for(let i=1;i<=N;i++){ const s=slots[sid(i)]; if(!s||!s.owner) continue;
      const d=Math.max(0,Math.min(1,(now()-(s.c||s.t))/(6*864e5))); if(m===null||d>m) m=d; }
    return m;
  }
  return { init, viewDirt, slotsInfo, waterLevel:()=>water, takeSlot, freeCount, online:()=>online, publish, cede, drawWater,
    canFeed:()=>role!=='spectator', isOwner:()=>role==='owner', role:()=>role };
})();
