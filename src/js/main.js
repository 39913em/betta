
let betta;
let mouse=null;

function start(){
  Persist.load();
  resize();
  initFoodHint();
  const sex=Persist.sex();
  betta=new Betta(sex,{variant:'original',isFounder:true,isAdult:true,depthPlane:2});
}

start();
function becomeOwner(state){
  const before=Persist.state().sex;
  Persist.adopt(state);
  if(Persist.state().sex!==before) betta=new Betta(Persist.state().sex,{variant:'original',isFounder:true,isAdult:true,depthPlane:2});
  Net.publish(true);
}
Net.init().then(r=>{ if(r.role==='owner') becomeOwner(r.state); Onboarding.start(r); });
let resizeTimer;
addEventListener('resize',()=>{
  clearTimeout(resizeTimer);
  resizeTimer=setTimeout(()=>{resize();initFoodHint();Persist.invalidate();},150);
});


let last=performance.now();
function loop(now){
  const dt=Math.min((now-last)/1000,.033);last=now;const t=now/1000;

  readMic();

  ctx.drawImage(swampCanvas,0,0);

  drawPlantsSet(t,plants,.62);
  drawPlantsSet(t,plantsFg,.16);
  drawMotes(dt);

  for(const n of nests){
    if(n.done)n.doneT+=dt;
    const a=n.done?Math.max(0,1-n.doneT/15):1;
    n.draw(t,a);
  }
  nests=nests.filter(n=>!(n.done&&n.doneT>=15));

  updateArtemia(dt,t);
  for(const a of artemia)a.draw(t);

  for(const p of pellets)if(!p.eaten){p.update(dt);p.draw();}
  pellets=pellets.filter(p=>!p.eaten&&p.restT<12);

  const fishes=allBettas();
  for(const f of fishes)f.update(dt);

  fishes.sort((a,b)=>b.depthZ-a.depthZ);
  for(const f of fishes)f.draw();

  drawPlantsSet(t,plants,.30);
  drawPlantsSet(t,plantsFg,1);

  Decay.draw(t);
  Net.drawWater(dt);
  drawFoodHint(t,dt,mouse);

  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

