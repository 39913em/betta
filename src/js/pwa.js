(function(){
  if('serviceWorker' in navigator && /^https?:$/.test(location.protocol))
    addEventListener('load', () => navigator.serviceWorker.register('sw.js',{scope:'./'}).catch(()=>{}));

  const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  const nav = document.getElementById('foot2');
  if(standalone || !nav) return;

  const wrap = document.createElement('span');
  wrap.style.display = 'none';
  const a = document.createElement('a');
  a.href = '#';
  a.textContent = 'Instalar';
  wrap.append(a);
  nav.append(wrap);

  let prompt = null;

  addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    prompt = e;
  });

  addEventListener('appinstalled', () => { prompt = null; });

  window.instalarPWA = async () => {
    if(prompt){
      prompt.prompt();
      try { await prompt.userChoice; } catch(_) {}
      prompt = null;
    } else {
      alert('Para instalar BETTA-BIOMA en iPhone o iPad: abre en Safari, pulsa Compartir y elige «Añadir a pantalla de inicio».');
    }
  };
})();
