/* ============================================================
   FOOD INVITATION — círculo (moneda de 5 pesos), sin texto
   ============================================================ */
const foodCircle = { x:0, y:0, r:0 };
let foodHintMotes=[];
let foodHoverT=0;
function initFoodHint(){
  foodCircle.r = 30*dpr;
  foodCircle.x = W*0.5;
  foodCircle.y = foodCircle.r + 20*dpr;
  foodHintMotes=[];
  for(let i=0;i<16;i++){
    const a=Math.random()*Math.PI*2;
    const rr=Math.random()*foodCircle.r*0.8;
    foodHintMotes.push({
      ox:Math.cos(a)*rr,
      oy:Math.sin(a)*rr,
      r:(0.6+Math.random()*1.1)*dpr,
      speed:0.22+Math.random()*0.35,
      phase:Math.random()*Math.PI*2,
      baseA:0.25+Math.random()*0.35,
    });
  }
}
function drawFoodHint(t, dt, mouse){
  let hovering=false;
  if(mouse){
    const dx=mouse.x-foodCircle.x, dy=mouse.y-foodCircle.y;
    if(Math.hypot(dx,dy) < foodCircle.r*1.35) hovering=true;
  }
  if(hovering) foodHoverT=Math.min(1, foodHoverT+dt*2.4);
  else         foodHoverT=Math.max(0, foodHoverT-dt*1.0);

  const pulse = 1 + Math.sin(t*1.9)*0.07;
  const r = foodCircle.r * pulse;
  const intensity = 0.30 + 0.70*foodHoverT;

  const g=ctx.createRadialGradient(foodCircle.x, foodCircle.y, 0, foodCircle.x, foodCircle.y, r*2.6);
  g.addColorStop(0, `rgba(230,200,110,${0.20*intensity})`);
  g.addColorStop(0.5, `rgba(180,150,70,${0.08*intensity})`);
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle=g;
  ctx.beginPath(); ctx.arc(foodCircle.x, foodCircle.y, r*2.6, 0, Math.PI*2); ctx.fill();

  ctx.strokeStyle = `rgba(240,215,130,${(0.40 + 0.45*foodHoverT)*(0.75+0.25*Math.sin(t*2.2))})`;
  ctx.lineWidth = 1.2*dpr;
  ctx.beginPath(); ctx.arc(foodCircle.x, foodCircle.y, r, 0, Math.PI*2); ctx.stroke();

  const g2=ctx.createRadialGradient(foodCircle.x, foodCircle.y, 0, foodCircle.x, foodCircle.y, r);
  g2.addColorStop(0, `rgba(255,230,150,${0.08+0.20*foodHoverT})`);
  g2.addColorStop(1, 'rgba(255,230,150,0)');
  ctx.fillStyle=g2;
  ctx.beginPath(); ctx.arc(foodCircle.x, foodCircle.y, r, 0, Math.PI*2); ctx.fill();

  for(const m of foodHintMotes){
    m.phase += dt*1.8;
    m.oy -= m.speed*dpr*60*dt;
    if(m.oy < -foodCircle.r*0.9){
      const a=Math.random()*Math.PI*2;
      const rr=Math.random()*foodCircle.r*0.7;
      m.ox=Math.cos(a)*rr;
      m.oy=foodCircle.r*0.85;
    }
    const dd = Math.hypot(m.ox, m.oy);
    if(dd > foodCircle.r*0.95){ m.ox*=0.9; m.oy*=0.9; }
    const px = foodCircle.x + m.ox;
    const py = foodCircle.y + m.oy;
    const a=m.baseA*(0.55+0.45*Math.sin(m.phase))*(0.5+0.5*foodHoverT+0.2);
    ctx.globalAlpha=Math.min(0.9,a);
    ctx.fillStyle='rgba(240,215,130,1)';
    ctx.beginPath(); ctx.arc(px,py,m.r,0,Math.PI*2); ctx.fill();
  }
  ctx.globalAlpha=1;
}

