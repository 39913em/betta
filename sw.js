const CACHE='betta-bioma-v2';
const CORE=["./", "index.html", "manifest.webmanifest", "src/css/style.css", "src/js/config.js", "src/js/core.js", "src/js/audio.js", "src/js/ambience.js", "src/js/persist.js", "src/js/network.js", "src/js/care.js", "src/js/swamp.js", "src/js/fins.js", "src/js/artemia.js", "src/js/nest.js", "src/js/foodhint.js", "src/js/betta.js", "src/js/pellet.js", "src/js/legal.js", "src/js/decay.js", "src/js/onboarding.js", "src/js/main.js", "src/js/input.js", "src/js/pwa.js", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png"];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  e.respondWith(fetch(r).then(res=>{
    const copy=res.clone();
    caches.open(CACHE).then(c=>c.put(r,copy));
    return res;
  }).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))));
});
