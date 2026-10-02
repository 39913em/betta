
const Persist = (()=>{
  const KEY='betta.bioma.v1', MAX_LAYERS=90;
  let s={ v:1, c:0, id:null, sex:null, first:0, lastDay:'', days:[], feeds:0 };
  let layer=null;
  const today=()=>new Date().toISOString().slice(0,10);
  function load(){
    try{ const r=JSON.parse(localStorage.getItem(KEY)||'null'); if(r&&r.v===1) s=r; }catch(e){}
    if(!s.first) s.first=Date.now();
    if(!s.c) s.c=Date.now();
    if(!s.id) s.id='b'+Math.random().toString(36).slice(2,10)+Date.now().toString(36).slice(-4);
    const d=today();
    if(s.lastDay!==d){ s.days.push({d,f:0}); s.lastDay=d; if(s.days.length>MAX_LAYERS) s.days.shift(); save(); }
  }
  function save(){ try{ localStorage.setItem(KEY,JSON.stringify(s)); }catch(e){} }
  function adopt(rec){
    if(!rec) return;
    s.c=rec.c||Date.now(); s.sex=rec.x===1?'female':'male'; s.days=(rec.d||[]).filter(Boolean); s.feeds=rec.n|0;
    if(!s.first) s.first=Date.now();
    const d=today();
    if(s.lastDay!==d||!s.days.length||s.days[s.days.length-1].d!==d){ s.days.push({d,f:0}); if(s.days.length>MAX_LAYERS) s.days.shift(); }
    s.lastDay=d; layer=null; save();
  }

  const DECAY_MS=6*864e5, dm=(typeof location!=='undefined'&&location.search.match(/[?&]dirt=([\d.]+)/));
  let dbg=dm?Math.min(1,+dm[1]):null;
  const dirt=()=>{
    if(dbg!==null) return dbg;
    if(Net.role()==='spectator'){ const v=Net.viewDirt(); if(v!==null) return v; }
    return Math.max(0,Math.min(1,(Date.now()-s.c)/DECAY_MS));
  };
  function reduceDirt(d){
    if(dbg!==null){ dbg=Math.max(0,dbg-d); return; }
    s.c=Date.now()-Math.max(0,dirt()-d)*DECAY_MS; save(); Net.publish();
  }
  function onFeed(){ const l=s.days[s.days.length-1]; if(l) l.f++; s.feeds++; layer=null; save(); Net.publish(); }
  function sex(){ if(!s.sex){ s.sex=Math.random()<.5?'male':'female'; save(); } return s.sex; }
  function build(){
    layer=document.createElement('canvas'); layer.width=W; layer.height=H;
    const c=layer.getContext('2d'), y0=H*WATER_FLOOR_FRAC, hh=H-y0;
    const n=s.days.length, step=Math.max(hh/Math.max(n,12),5*dpr);
    s.days.forEach((l,i)=>{
      const k=Math.min(1,l.f/12), y=H-(i+1)*step;
      c.fillStyle=`rgba(${Math.round(40+k*70)},${Math.round(30+k*35)},${Math.round(18+k*8)},${0.20+k*0.30})`;
      c.fillRect(0,y,W,step+1);
      c.fillStyle='rgba(200,170,110,.10)'; c.fillRect(0,y,W,dpr);
    });
  }
  function draw(){ if(!layer) build(); ctx.drawImage(layer,0,0); }
  return { state:()=>s, dirt, reduceDirt, adopt, load, save, onFeed, sex, draw, invalidate(){ layer=null; } };
})();
