/* ============================================================
   PERSISTENCIA + SEDIMENTO (Fase 1 · local)
   El bioma recuerda entre sesiones. Cada día de visita deja una
   capa en el fondo; cuanto más se alimenta, más oscura y cálida.
   Sin números en pantalla: el dato es materia.
   Para pasar a Firebase (Fase 2) basta sustituir load()/save().
   ============================================================ */
const Persist = (()=>{
  const KEY='betta.bioma.v1', MAX_LAYERS=90;
  let s={ v:1, id:null, sex:null, first:0, lastDay:'', days:[], feeds:0 };
  let layer=null;
  const today=()=>new Date().toISOString().slice(0,10);
  function load(){
    try{ const r=JSON.parse(localStorage.getItem(KEY)||'null'); if(r&&r.v===1) s=r; }catch(e){}
    if(!s.first) s.first=Date.now();
    if(!s.id) s.id='b'+Math.random().toString(36).slice(2,10)+Date.now().toString(36).slice(-4);
    const d=today();
    if(s.lastDay!==d){ s.days.push({d,f:0}); s.lastDay=d; if(s.days.length>MAX_LAYERS) s.days.shift(); save(); }
  }
  function save(){ try{ localStorage.setItem(KEY,JSON.stringify(s)); }catch(e){} }
  function onFeed(){ const l=s.days[s.days.length-1]; if(l) l.f++; s.feeds++; layer=null; save(); if(typeof Net!=='undefined') Net.publish(); }
  function sex(){ if(!s.sex){ s.sex=Math.random()<.5?'male':'female'; save(); } return s.sex; }
  function build(){
    layer=document.createElement('canvas'); layer.width=W; layer.height=H;
    const c=layer.getContext('2d'), y0=H*WATER_FLOOR_FRAC, hh=H-y0;
    const n=s.days.length, step=hh/Math.max(n,12);
    s.days.forEach((l,i)=>{
      const k=Math.min(1,l.f/12), y=H-(i+1)*step;
      c.fillStyle=`rgba(${Math.round(40+k*70)},${Math.round(30+k*35)},${Math.round(18+k*8)},${0.10+k*0.16})`;
      c.fillRect(0,y,W,step+1);
    });
  }
  function draw(){ if(!layer) build(); ctx.drawImage(layer,0,0); }
  return { state:()=>s, load, save, onFeed, sex, draw, invalidate(){ layer=null; } };
})();
