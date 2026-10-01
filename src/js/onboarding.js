/* ============================================================
   INTRODUCCIÓN · TUTORIAL · DECISIÓN · RESPONSIVA
   Orden: acerca de -> cómo se usa -> decidir -> (responsiva -> cuenta)
   Mirar es libre y sin cuenta. Solo al tomar un lugar se pide
   cuenta de Google y se acepta la responsiva.
   ============================================================ */
const Onboarding=(()=>{
  const ob=document.getElementById('ob'), care=document.getElementById('care'), about=document.getElementById('lnkAbout');
  const SEEN='betta.introSeen';
  let busy=false, msg='', last={};
  const btn=(a,t,c='')=>`<button data-a="${a}" class="${c}">${t}</button>`;
  const card=(h,body,btns)=>`<div class="card"><h1>${h}</h1>${body}<div class="btns">${btns}</div></div>`;
  const steps={
    about:()=>card('BETTA · bioma vivo',
      `<p>Un acuario que vive en tu pantalla y se comparte entre <b>10 cuidadores</b>. Un pez, un bioma, diez lugares.</p>
       <p>Lo que cada persona hace —alimentar, visitar, ausentarse— cambia el agua de todos. Sin humanos el bioma resiste mucho tiempo: <b>el humano es la alteración</b>.</p>
       <p>Puedes mirar sin cuenta. Si quieres cuidar un lugar, más adelante te lo explicamos con claridad.</p>`,
      btn('decide','Saltar','ghost')+btn('how','Cómo funciona')),
    how:()=>card('Cómo funciona',
      `<ul><li><b>Mira.</b> El pez sigue tu cursor y reacciona al sonido. Al tocar el agua se te ofrece activar el micrófono (opcional; el audio nunca se graba ni se envía).</li>
       <li><b>Alimenta</b> (solo cuidadores): doble clic o doble toque sobre el círculo de comida.</li>
       <li><b>El agua es de todos.</b> Si la red alimenta mucho se enturbia en ámbar; si nadie lo hace, se aclara.</li>
       <li><b>El fondo recuerda.</b> Cada día de visita deja una capa de sedimento.</li>
       <li><b>Ceder.</b> Un cuidador puede soltar su lugar: mantén pulsado 3 s sobre el sedimento.</li></ul>`,
      btn('about','Atrás','ghost')+btn('decide','Siguiente')),
    decide:()=>{
      const n=Net.online()?Net.freeCount():0, canTake=Net.online()&&n>0;
      return card('¿Miras o cuidas?',
      `<p>${Net.online()?`Hay <b>${n}</b> de 10 lugares libres.`:'La red del bioma no está disponible ahora; puedes mirar en modo local.'}</p>
       <p><b>Mirar</b> no requiere cuenta ni datos. <b>Cuidar un lugar</b> requiere iniciar sesión con Google y aceptar un compromiso.</p>${msg?`<p class="err">${msg}</p>`:''}`,
      btn('watch','Solo mirar','ghost')+(canTake?btn('pledge','Cuidar un lugar'):'')); },
    pledge:()=>card('Tu compromiso como cuidador',
      `<ul><li>Un lugar es un pez y su sedimento. <b>Te comprometes a visitarlo y cuidarlo.</b></li>
       <li>Si ya no puedes, <b>lo cedes</b> (mantener pulsado 3 s sobre el sedimento). Tu pez y su historia pasan a quien lo adopte: es su herencia.</li>
       <li>Un lugar sin actividad durante <b>7 días</b> queda en rescate y cualquiera puede tomarlo.</li>
       <li>Usamos tu cuenta de Google solo para identificarte como dueño. Guardamos un identificador, no tus mensajes ni tu audio.</li></ul>
       <label><input type="checkbox"> He leído y acepto los <a href="legal/terminos.html" target="_blank">Términos y condiciones</a>.</label>
       <label><input type="checkbox"> He leído el <a href="legal/privacidad.html" target="_blank">Aviso de privacidad</a>.</label>
       <label><input type="checkbox"> Asumo el compromiso de cuidar mi lugar o cederlo.</label>${msg?`<p class="err">${msg}</p>`:''}`,
      btn('decide','Atrás','ghost')+`<button data-a="accept" disabled>Aceptar y continuar con Google</button>`),
    gallery:()=>{
      const cell=s=>`<div class="cell ${s.st.replace(' ','-')}"><div class="h"><b>${s.i}</b> ${s.sex}</div><div class="st">${s.st}${s.st==='libre'&&s.history?' · con historia':''}</div>
        <div class="bars">${s.d.map(x=>`<i style="height:${Math.min(26,3+(x.f|0)*2)}px"></i>`).join('')}</div></div>`;
      const info=Net.online()?Net.slotsInfo():[], can=Net.online()&&!Net.isOwner()&&Net.freeCount()>0;
      return card('Los 10 lugares',
        Net.online()?`<div class="grid">${info.map(cell).join('')}</div>
         <p class="small">Cada barra es un día de sedimento. Un lugar en riesgo lleva más de 3 días sin visitas; <b>en rescate</b> (más de 7) puede ser adoptado por cualquiera.</p>`
        :'<p>La red del bioma no está disponible ahora.</p>',
        btn('watch','Cerrar','ghost')+(can?btn('pledge','Cuidar un lugar'):'')); },
    working:()=>card('Un momento…',`<p>${msg}</p>`,''),
    done:()=>card(`Tu lugar es el ${last.slot}`,
      `<p>Tu pez ya es tuyo. Aliméntalo con doble clic sobre el círculo de comida y vuelve a visitarlo.</p>
       <p>Si algún día no puedes seguir, cede tu lugar: mantén pulsado 3 s sobre el sedimento.</p>`,
      btn('enter','Entrar al bioma'))
  };
  function show(n){ ob.innerHTML=steps[n](); ob.style.display='flex'; }
  function hide(){ ob.style.display='none'; ob.innerHTML=''; try{localStorage.setItem(SEEN,'1');}catch(e){} refresh(); }
  function refresh(){
    if(!care) return;
    const can=Net.online() && !Net.isOwner() && Net.freeCount()>0 && ob.style.display==='none';
    care.style.display=can?'block':'none';
  }
  async function accept(){
    busy=true; msg='Conectando con Google…'; show('working');
    const r=await Net.takeSlot(); busy=false;
    if(r.ok){ last=r; msg=''; becomeOwner(r.state); show('done'); }
    else { msg=r.reason; show('pledge'); }
  }
  ob.addEventListener('click',e=>{
    const t=e.target.closest&&e.target.closest('[data-a]'); if(!t||busy) return;
    const a=t.dataset.a; msg='';
    if(a==='watch'||a==='enter') return hide();
    if(a==='accept') return accept();
    show(a);
  });
  ob.addEventListener('change',()=>{
    const b=ob.querySelector('[data-a=accept]'); if(b) b.disabled=ob.querySelectorAll('input:checked').length<3;
  });
  if(care) care.addEventListener('click',()=>show('decide'));
  const gal=document.getElementById('lnkGal');
  if(gal) gal.addEventListener('click',e=>{ e.preventDefault(); show('gallery'); });
  if(about) about.addEventListener('click',e=>{ e.preventDefault(); show('about'); });
  function start(r){
    if(r.role==='owner'){ ob.style.display='none'; refresh(); }
    else if(!localStorage.getItem(SEEN)) show('about');
    else refresh();
    setInterval(refresh,5000);
  }
  return { start };
})();
