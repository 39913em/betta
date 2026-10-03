(function(){
  if('serviceWorker' in navigator&&/^https?:$/.test(location.protocol))
    addEventListener('load',()=>navigator.serviceWorker.register('sw.js',{scope:'./'}).catch(()=>{}));
  const standalone=matchMedia('(display-mode: standalone)').matches||navigator.standalone;
  const nav=document.getElementById('foot2');
  if(standalone||!nav)return;
  const wrap=document.createElement('span');
  wrap.style.display='none';
  const a=document.createElement('a');
  a.href='#';
  a.textContent='Instalar';
  wrap.append(a);
  nav.append(wrap);
  let prompt=null;
  const ios=/iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  if(ios)wrap.style.display='inline';
  addEventListener('beforeinstallprompt',e=>{e.preventDefault();prompt=e;wrap.style.display='inline';});
  addEventListener('appinstalled',()=>{wrap.style.display='none';prompt=null;});
  a.addEventListener('click',async e=>{
    e.preventDefault();
    if(prompt){
      prompt.prompt();
      try{await prompt.userChoice;}catch(_){}
      prompt=null;
      wrap.style.display='none';
    }else alert('Para instalar BETTA-BIOMA en iPhone o iPad: abre esta página en Safari, pulsa Compartir y elige «Añadir a pantalla de inicio».');
  });
})();
