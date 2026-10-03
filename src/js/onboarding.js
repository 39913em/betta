
const Onboarding=(()=>{
  const ob=document.getElementById('ob'), care=document.getElementById('care');
  const SEEN='betta.introSeen', TABS=[['','Acerca de'],['how','Cómo funciona'],['gallery','10 Biomas'],['terms','Términos'],['priv','Privacidad']];
  const MAIN=new Set(['about','how','gallery','invite','terms','priv','ficha']);
  const q=typeof location!=='undefined'?location.search:'';
  let busy=false, msg='', last={}, cur='', prev=null, ck=[false,false,false], pinMode=false, pinVal='', myPin='';
  const normPin=v=>String(v||'').toUpperCase().replace(/[^A-Z2-9]/g,'').slice(0,6);
  const fmtPin=p=>p.slice(0,3)+'-'+p.slice(3);
  const shareUrl=()=>location.origin+location.pathname+'?invita=1';
  const ready=()=>ck.every(Boolean)&&(!pinMode||normPin(pinVal).length===6);
  const btn=(a,t,c='')=>`<button data-a="${a}" class="${c}">${t}</button>`;
  const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const left=ms=>ms>=3600e3?Math.ceil(ms/3600e3)+' h':Math.ceil(ms/60e3)+' min';
  const ago=ts=>{ const d=(Date.now()-ts)/864e5; return !ts?'—':d<1?'hoy':'hace '+Math.floor(d)+' d'; };
  const meter=(l,x,c='')=>x==null?'':`<div class="meter ${c}"><span>${l}</span><div><i style="width:${Math.round(x)}%"></i></div><b>${Math.round(x)}</b></div>`;
  let fichaArg='';
  const err=()=>msg?`<p class="err">${msg}</p>`:'';
  const card=(h,body,btns,nav=true)=>{
    const act=cur.split(':')[0]==='ficha'?'gallery':cur;
    return `<div class="card"><h1>${h}</h1><div class="body">${body}</div><div class="btns">${btns}</div>`+
      (nav?`<div class="tabs">${TABS.map(([k,t])=>`<button data-a="${k}" class="tab${act===k?' on':''}">${t}</button>`).join('')}<button data-a="close" class="tab x">Cerrar</button></div>`:'')+`</div>`;
  };
  const steps={
    about:()=>card('BETTA-BIOMA',
      `<p>Un acuario que se comparte entre <b>10 cuidadores</b>.</p>
       <p>Lo que cada persona hace: alimentar, limpiar, (ausentarse cambia el agua de todos) Sin humanos el bioma resiste mucho tiempo: <b>el humano es la alteración</b>.</p>
       <p>Puedes mirar sin intervenir. ¿quieres cuidar una parte del bioma?</p>`,
      btn('decide','Saltar','ghost')+btn('how','Siguiente')),
    how:()=>card('Cómo funciona',
      `<ul><li><b>Mira.</b> El pez sigue tu cursor y reacciona al sonido. Al tocar el agua se te ofrece activar el micrófono (opcional; el audio nunca se graba ni se envía).</li>
       <li><b>Alimenta.</b> (solo cuidadores): doble toque sobre el círculo de comida.</li>
       <li><b>El agua es de todos.</b> Si la red interviene mucho el agua (de TODOS) se enturbia en ámbar; si nadie lo hace, se aclara.</li>
       <li><b>El descuido se ve.</b> Si el cuidador se ausenta aparecen residuos, malesa y moho, y el agua verdea. Se limpia <b>arrastrando</b> sobre los residuos.</li>
       <li><b>Si no tienes lugar</b> ves el estado real del lugar más descuidado, pero no puedes tocarlo: para ayudar, toma un lugar o invita a alguien.</li>
       <li><b>Ceder.</b> Mantén pulsado 3 s sobre el fondo: deja tu lugar libre o dáselo a alguien con un PIN.</li></ul>`,
      btn('about','Atrás','ghost')+btn('decide','Siguiente')),
    decide:()=>{
      const on=Net.online(), n=on?Net.freeCount():0;
      return card('¿Miras o cuidas?',
      `<p>${on?`Hay <b>${n}</b> de 10 lugares libres.`:'La red del bioma no está disponible ahora; puedes mirar en modo local.'}</p>
       <p><b>MIRAR</b> no requiere cuenta ni datos. <b>CUIDAR</b> requiere iniciar sesión con Google y aceptar un compromiso.</p>${err()}`,
      btn('watch','MIRAR','ghost')+(on?btn('haspin','PIN','ghost'):'')+btn('invite','INVITAR','ghost')+(on&&n>0?btn('pledge','CUIDAR'):'')); },
    pledge:()=>card('Tu compromiso como cuidador',
      `<ul><li>Un lugar es un bioma y su fauna. <b>Te comprometes a visitarlo, alimentarlo y limpiarlo.</b></li>
       <li>Si ya no puedes, <b>lo cedes</b> (mantener pulsado 3 s sobre el fondo): lo dejas libre o lo heredas a alguien con un PIN.</li>
       <li>Un lugar sin actividad durante <b>7 días</b> queda en rescate y cualquiera puede tomarlo.</li>
       <li>Usamos tu cuenta de Google solo para identificarte como dueño. Guardamos un identificador, no tus mensajes ni tu audio.</li></ul>
       ${pinMode?`<label class="pinf">PIN de herencia <input id="pin" maxlength="7" autocomplete="off" placeholder="K7Q-4MX" value="${pinVal}"></label>`:''}
       <label><input type="checkbox" ${ck[0]?'checked':''}> He leído y acepto los <a href="#" data-a="terms">Términos y condiciones</a>.</label>
       <label><input type="checkbox" ${ck[1]?'checked':''}> He leído el <a href="#" data-a="priv">Aviso de privacidad</a>.</label>
       <label><input type="checkbox" ${ck[2]?'checked':''}> Asumo el compromiso de cuidar mi lugar o cederlo.</label>${err()}`,
      btn('decide','Atrás','ghost')+`<button data-a="accept" ${ready()?'':'disabled'}>Aceptar y continuar con Google</button>`),
    gallery:()=>{
      const cell=s=>`<div class="cell ${s.st.replace(' ','-')}" data-a="ficha:${s.i}"><div class="h"><b>${s.i}</b> ${s.sex}</div><div class="st">${s.st}${s.st==='libre'&&s.history?' · con historia':''}</div>
        <div class="bars">${s.d.map(x=>`<i style="height:${Math.min(26,3+(x.f|0)*2)}px"></i>`).join('')}</div></div>`;
      const on=Net.online(), can=on&&!Net.isOwner()&&Net.freeCount()>0;
      return card('10 Biomas',
        on?`<div class="grid">${Net.slotsInfo().map(cell).join('')}</div>
         <p class="small">Cada barra es un día de actividad del lugar. <b>En riesgo</b>: más de 3 días sin visitas. <b>En rescate</b>: más de 7; cualquiera puede adoptarlo. <b>Reservado</b>: heredado con PIN.</p>`
        :'<p>La red del bioma no está disponible ahora.</p>',
        btn('invite','INVITAR','ghost')+(can?btn('pledge','CUIDAR'):'')); },
    invite:()=>card('INVITAR',
      `<p>Comparte este enlace. Quien lo abra verá la introducción, los lugares libres y podrá decidir si mira o cuida un lugar. Cuantos más cuidadores, más sano el bioma.</p>
       <input class="link" readonly value="${shareUrl()}" onfocus="this.select()">${msg?`<p class="ok">${msg}</p>`:''}`,
      btn('copyInvite','Copiar enlace')+(navigator.share?btn('nativeShare','Compartir…','ghost'):'')),
    cede:()=>card('Ceder tu lugar',
      `<p>Tu pez y su historia no desaparecen: pasan a otra persona.</p>
       <ul><li><b>Heredar con PIN:</b> generas un código y lo compartes con quien quieras. El lugar queda reservado para esa persona 3 días. Ella acepta los términos y escribe el PIN.</li>
       <li><b>Dejarlo libre:</b> cualquiera puede adoptarlo.</li></ul>${err()}`,
      btn('cancel','Cancelar','ghost')+btn('cedeFree','Dejarlo libre','ghost')+btn('cedePin','Heredar con PIN')),
    pinout:()=>card('Tu PIN de herencia',
      `<p class="pinbig">${fmtPin(myPin)}</p>
       <p>Compártelo con quien recibirá tu lugar. Vale 3 días. Quien lo reciba debe aceptar términos y privacidad e ingresar este PIN. Ya no eres cuidador de este lugar.</p>${msg?`<p class="ok">${msg}</p>`:''}`,
      btn('copyPin','Copiar enlace con PIN')+btn('reload','Listo'),false),
    ficha:()=>{
      const i=fichaArg==='own'?Net.slot():+fichaArg;
      const info=Net.online()?Net.slotsInfo()[i-1]:null;
      if(!info) return card('Bioma',`<p>La red del bioma no está disponible ahora.</p>`,'');
      const own=Net.isOwner()&&i===Net.slot();
      if(!info.owned&&!own) return card(`Bioma ${i}`,`<p>Este bioma está ${info.st}. Nadie lo cuida ahora.</p>`,btn('gallery','Volver a 10 Biomas','ghost'));
      const v=own?Care.snapshot():{name:info.name,stress:info.stress,bond:info.bond,good:info.good,bad:info.bad,dirt:info.dirt,sex:info.sex,t:info.t};
      const p=Care.pollution(v.dirt);
      const rows=`${meter('Estrés',v.stress,'stress')}${meter('Vínculo',v.bond,'bond')}${meter('Contaminación',p*100,'pollution')}
        <p class="facts"><span>Estado del bioma</span><b>${Care.biomeLabel(p)}</b></p>
        <p class="facts"><span>Conducta del cuidador</span><b>${Care.conductLabel(v.good,v.bad)}</b></p>
        <p class="facts"><span>Última visita</span><b>${ago(v.t)}</b></p>`;
      const mine=own?`<label class="pinf">Nombre del pez <input id="fname" maxlength="16" autocomplete="off" value="${esc(v.name)}"></label>
        <h2>Acciones</h2><p class="small">Todo tiene costo.</p>
        ${Care.actions().map(a=>`<div class="act"><div><b>${a.label}</b><small>${a.hint}</small></div>${a.left>0?`<em>${left(a.left)}</em>`:btn('act:'+a.key,'Hacer','ghost')}</div>`).join('')}`:'';
      return card(`${esc(v.name)||'Sin nombre'} ${v.sex} · Bioma ${i}`,rows+mine+(msg?`<p class="ok">${esc(msg)}</p>`:''),own?btn('saveName','Guardar nombre'):'');
    },
    working:()=>card('Un momento…',`<p>${msg}</p>`,'',false),
    done:()=>card(`Tu lugar es el ${last.slot}`,
      `<p>Tu pez ya es tuyo. Aliméntalo con doble clic sobre el círculo de comida y limpia el fondo arrastrando.</p>
       <label class="pinf">Nombre de tu pez <input id="fname" maxlength="16" autocomplete="off" placeholder="Ponle nombre"></label>`,
      btn('enter','Entrar al bioma'))
  };
  function show(n){
    const name=n.split(':')[0];
    fichaArg=n.split(':')[1]||'';
    if(MAIN.has(name)&&cur&&!MAIN.has(cur.split(':')[0])) prev=cur;
    cur=n;
    ob.innerHTML=LEGAL[name]?card(LEGAL[name].title,LEGAL[name].html,''):steps[name]();
    ob.style.display='flex';
  }
  function hide(){ cur=''; prev=null; ob.style.display='none'; ob.innerHTML=''; try{localStorage.setItem(SEEN,'1');}catch(e){} refresh(); }
  function refresh(){
    if(!care) return;
    care.style.display=(Net.online()&&!Net.isOwner()&&Net.freeCount()>0&&ob.style.display==='none')?'block':'none';
    const mine=document.getElementById('mine');
    if(mine) mine.style.display=Net.isOwner()?'inline':'none';
  }
  async function copy(text,okMsg,step){
    try{ await navigator.clipboard.writeText(text); msg=okMsg; }catch(e){ msg='Selecciona el enlace y cópialo manualmente.'; }
    show(step);
  }
  async function accept(){
    busy=true; msg='Conectando con Google…'; show('working');
    const r=await Net.takeSlot(pinMode?normPin(pinVal):null); busy=false;
    if(r.ok){ last=r; msg=''; becomeOwner(r.state); show('done'); } else { msg=r.reason; show('pledge'); }
  }
  ob.addEventListener('click',async e=>{
    const t=e.target.closest&&e.target.closest('[data-a]'); if(!t||busy) return;
    e.preventDefault();
    const a=t.dataset.a; const keepMsg=(a==='copyInvite'||a==='copyPin'); if(!keepMsg) msg='';
    if(a==='close'){ const p=prev; prev=null; return p?show(p):hide(); }
    if(a==='enter'){ const f=ob.querySelector('#fname'); if(f&&f.value.trim()) Care.setName(f.value); }
    if(a==='saveName'){ const f=ob.querySelector('#fname'); Care.setName(f?f.value:''); msg='Nombre guardado.'; return show(cur); }
    if(a.startsWith('act:')){ msg=Care.act(a.slice(4)).msg; return show(cur); }
    if(a==='watch'||a==='enter'||a==='cancel') return hide();
    if(a==='reload') return location.reload();
    if(a==='accept') return accept();
    if(a==='haspin'){ pinMode=true; return show('pledge'); }
    if(a==='pledge'){ pinMode=false; pinVal=''; return show('pledge'); }
    if(a==='copyInvite') return copy(shareUrl(),'Enlace copiado ✓','invite');
    if(a==='copyPin') return copy(shareUrl().replace('invita=1','pin='+myPin),'Enlace copiado ✓','pinout');
    if(a==='nativeShare'){ try{ await navigator.share({title:'BETTA-BIOMA',text:'Ven a cuidar un bioma en BETTA-BIOMA',url:shareUrl()}); }catch(e){} return; }
    if(a==='cedeFree'||a==='cedePin'){
      busy=true;
      try{ const r=await Net.cede(a==='cedePin'); busy=false; if(a==='cedePin'&&r){ myPin=r; return show('pinout'); } return location.reload(); }
      catch(err){ busy=false; msg='No se pudo ceder: '+(err&&err.message||err); return show('cede'); }
    }
    show(a);
  });
  ob.addEventListener('input',()=>{
    const p=ob.querySelector('#pin'); if(p) pinVal=normPin(p.value);
    const b=ob.querySelector('[data-a=accept]');
    const boxes=Array.from(ob.querySelectorAll('input[type=checkbox]')); if(boxes.length===3) ck=boxes.map(x=>x.checked); if(b) b.disabled=!ready();
  });
  if(care) care.addEventListener('click',()=>show('decide'));
  ['foot','foot2'].forEach(id=>{ const el=document.getElementById(id); if(el) el.addEventListener('click',e=>{
    const t=e.target.closest&&e.target.closest('[data-open]'); if(!t) return;
    e.preventDefault(); prev=null; cur=''; show(t.dataset.open);
  }); });
  function start(r){
    const m=q.match(/[?&]pin=([A-Za-z0-9-]+)/);
    if(r.role!=='owner' && m){ pinMode=true; pinVal=normPin(m[1]); show('pledge'); }
    else if(r.role!=='owner' && /[?&]invita/.test(q)) show('decide');
    else if(r.role==='owner'){ ob.style.display='none'; refresh(); }
    else if(!localStorage.getItem(SEEN)) show('about');
    else refresh();
    setInterval(refresh,5000);
  }
  return { start, openCede:()=>{ msg=''; cur=''; prev=null; show('cede'); } };
})();
