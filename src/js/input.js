/* ============================================================
   EVENTOS — ratón y táctil
   ============================================================ */
function canvasPos(cx,cy){
  const r=canvas.getBoundingClientRect();
  return {x:(cx-r.left)*dpr, y:(cy-r.top)*dpr};
}
function dropPellet(){
  pellets.push(new Pellet(foodCircle.x, foodCircle.y - 4*dpr));
  Persist.onFeed();
  for(let i=0;i<3;i++) setTimeout(()=>bubbleSnd(0.7,1.0+Math.random()*0.4),i*60);
}
function overFood(p,k){ return Math.hypot(p.x-foodCircle.x,p.y-foodCircle.y) < foodCircle.r*k; }

canvas.addEventListener('mousemove', e=>{ mouse=canvasPos(e.clientX,e.clientY); });
canvas.addEventListener('mouseleave', ()=>{ mouse=null; });
canvas.addEventListener('click', ()=>{ initAudio(); });
canvas.addEventListener('dblclick', e=>{ if(overFood(canvasPos(e.clientX,e.clientY),1.4)) dropPellet(); });

let lastTapT=0, lastTapX=0, lastTapY=0;
canvas.addEventListener('touchstart', e=>{
  initAudio();
  const p=canvasPos(e.touches[0].clientX,e.touches[0].clientY);
  const nowT=performance.now();
  const near=Math.hypot(p.x-lastTapX,p.y-lastTapY) < 60*dpr;
  if(nowT-lastTapT<350 && near){
    if(overFood(p,1.6)) dropPellet();
    lastTapT=0;
  } else { lastTapT=nowT; lastTapX=p.x; lastTapY=p.y; }
}, {passive:true});
