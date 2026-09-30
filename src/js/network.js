/* ============================================================
   RED · 10 ESPACIOS ABIERTOS + AGUA COMÚN
   - Firebase Auth anónima da identidad a cada navegador.
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
  const isFree=s=>!s || !s.owner || abandoned(s);
  const timeout=(p,ms)=>Promise.race([p,new Promise((_,r)=>setTimeout(()=>r(new Error('timeout')),ms))]);

  /* ---------- arranque ---------- */
  async function init(){
    if(!FIREBASE_CONFIG || typeof firebase==='undefined' || !firebase.auth) return {role:'local'};
    try{ return await timeout(boot(),7000); }
    catch(e){ error=String(e&&e.message||e); role='local'; online=false; return {role:'local'}; }
  }
  async function boot(){
    firebase.initializeApp(FIREBASE_CONFIG);
    const cred=await firebase.auth().signInAnonymously();
    uid=cred.user.uid;
    slotsRef=firebase.database().ref('slots');
    slots=(await slotsRef.once('value')).val()||{};
    online=true;
    for(let i=1;i<=N;i++) if(slots[sid(i)] && slots[sid(i)].owner===uid) mySlot=i;
    if(!mySlot && now()>+(localStorage.getItem(NOCLAIM_KEY)||0)){
      for(let i=1;i<=N && !mySlot;i++){
        if(!isFree(slots[sid(i)])) continue;
        if(await claim(i)) mySlot=i;
      }
    }
    role=mySlot?'owner':'spectator';
    slotsRef.on('value',s=>{
      slots=s.val()||{}; recompute();
      if(mySlot && (!slots[sid(mySlot)] || slots[sid(mySlot)].owner!==uid)){ mySlot=null; role='spectator'; }
    },()=>{ online=false; });
    if(mySlot){ setInterval(()=>{ if(!document.hidden) publish(true); },BEAT_MS); }
    recompute();
    return { role, slot:mySlot, state: mySlot?slots[sid(mySlot)]:null };
  }
  /* transacción: toma el espacio solo si sigue libre */
  async function claim(i){
    try{
      const r=await slotsRef.child(sid(i)).transaction(cur=>{
        if(cur && !isFree(cur)) return;                 /* alguien ganó: abortar */
        const base=cur||{ x:Math.random()<.5?0:1, n:0, f:0, d:[] };
        return Object.assign({},base,{ owner:uid, t:now() });
      });
      return r.committed && r.snapshot.val().owner===uid;
    }catch(e){ return false; }
  }

  /* ---------- publicar el estado del propio espacio ---------- */
  function record(){
    const s=Persist.state(), last=s.days[s.days.length-1]||{f:0};
    return { owner:uid, t:now(), f:last.f|0, n:s.feeds|0, x:s.sex==='female'?1:0, d:s.days };
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
  async function cede(){
    if(role!=='owner') return false;
    await slotsRef.child(sid(mySlot)).update({ owner:null, t:now(), d:Persist.state().days, n:Persist.state().feeds });
    localStorage.setItem(NOCLAIM_KEY, String(now()+864e5));   /* 24 h sin retomar */
    mySlot=null; role='spectator';
    return true;
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

  return { init, publish, cede, drawWater,
    canFeed:()=>role!=='spectator', isOwner:()=>role==='owner', role:()=>role };
})();
