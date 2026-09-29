/* ============================================================
   RED · AGUA COMÚN (Fase 2)
   Cada bioma publica un registro mínimo. El agua común NO se
   guarda: cada cliente la calcula a partir de los registros
   recientes de los demás. Más alimento reciente en la red
   => agua más ámbar (taninos). Si nadie toca, el agua se aclara.
   ============================================================ */
const Net = (()=>{
  const MAX_PEERS=10, ACTIVE_MS=72*3600e3, FEED_MS=24*3600e3, FEED_CAP=12;
  let ref=null, peers={}, online=false, water=0, target=0, pubT=0;
  const DAY=()=>Persist.state().days.slice(-1)[0]||{f:0};

  function init(){
    try{
      if(!FIREBASE_CONFIG || typeof firebase==='undefined') return;
      firebase.initializeApp(FIREBASE_CONFIG);
      ref=firebase.database().ref('biomas');
      ref.limitToLast(MAX_PEERS).on('value',
        s=>{ peers=s.val()||{}; online=true; recompute(); },
        ()=>{ online=false; });
      publish(true);
    }catch(e){ ref=null; online=false; }
  }
  function record(){
    const s=Persist.state();
    return { t:Date.now(), f:DAY().f|0, n:s.feeds|0, x:s.sex==='female'?1:0 };
  }
  /* throttle: como mucho una escritura cada 5 s */
  function publish(force){
    peers[Persist.state().id]=record(); recompute();
    if(!ref) return;
    const now=Date.now();
    if(!force && now-pubT<5000) return;
    pubT=now;
    ref.child(Persist.state().id).set(record()).catch(()=>{ online=false; });
  }
  function recompute(){
    const now=Date.now(); let load=0;
    for(const id in peers){
      const p=peers[id]; if(!p||now-p.t>ACTIVE_MS) continue;
      if(now-p.t<FEED_MS) load+=Math.min(FEED_CAP,p.f|0);
    }
    target=Math.min(1,load/(MAX_PEERS*FEED_CAP)*3); /* x3: con pocos biomas ya se nota */
  }
  function drawWater(dt){
    water+=(target-water)*Math.min(1,dt*0.25);
    if(water<0.003) return;
    ctx.fillStyle=`rgba(150,95,20,${(water*0.20).toFixed(3)})`;
    ctx.fillRect(0,0,W,H);
  }
  return { init, publish, drawWater, isOnline:()=>online,
           activePeers:()=>Object.keys(peers).length };
})();
