/* ============================================================
   ARTEMIA — confinada a la banda de nado
   ============================================================ */
class Artemia{
  constructor(x,y){
    this.x=x; this.y=y;
    this.angle=Math.random()*Math.PI*2;
    this.phase=Math.random()*Math.PI*2;
    this.speed=0.35+Math.random()*0.5;
    this.r=1.9*dpr;
    this.eaten=false;
    this.wobble=Math.random()*Math.PI*2;
  }
  update(dt,t){
    this.angle += Math.sin(t*4+this.phase)*0.18*dt;
    this.wobble += dt*5;
    const sp=this.speed*dpr*60*dt*0.55;
    this.x += Math.cos(this.angle)*sp;
    this.y += Math.sin(this.angle)*sp;
    this.y -= 0.06*dpr*60*dt*0.55;

    const topY = H*SWIM_BAND.topFrac + 15*dpr;
    const botY = H*WATER_FLOOR_FRAC - 12*dpr;
    if(this.x<20*dpr){this.x=20*dpr; this.angle=Math.PI-this.angle;}
    if(this.x>W-20*dpr){this.x=W-20*dpr; this.angle=Math.PI-this.angle;}
    if(this.y<topY){ this.y=topY; this.angle=-this.angle; }
    if(this.y>botY){ this.y=botY; this.angle=-this.angle; }
  }
  draw(t){
    const wig=Math.sin(this.wobble)*0.6;
    const tx=this.x-Math.cos(this.angle)*this.r*2.0;
    const ty=this.y-Math.sin(this.angle)*this.r*2.0;
    ctx.strokeStyle='rgba(220,150,80,0.55)';
    ctx.lineWidth=0.65*dpr;
    ctx.beginPath();
    ctx.moveTo(this.x,this.y);
    ctx.lineTo(tx+Math.cos(this.angle+Math.PI/2)*wig*this.r,
               ty+Math.sin(this.angle+Math.PI/2)*wig*this.r);
    ctx.stroke();
    ctx.fillStyle='rgba(230,165,90,0.85)';
    ctx.beginPath();
    ctx.ellipse(this.x,this.y,this.r,this.r*0.55,this.angle,0,Math.PI*2);
    ctx.fill();
    const ex=this.x+Math.cos(this.angle)*this.r*0.55;
    const ey=this.y+Math.sin(this.angle)*this.r*0.55;
    ctx.fillStyle='rgba(20,8,4,0.9)';
    ctx.beginPath();
    ctx.arc(ex-Math.sin(this.angle)*this.r*0.25, ey+Math.cos(this.angle)*this.r*0.25, 0.45*dpr,0,Math.PI*2);
    ctx.fill();
  }
}
let artemia=[];
let artemiaSpawnT=0;
function spawnArtemia(){
  const topY = H*SWIM_BAND.topFrac + 20*dpr;
  const botY = H*WATER_FLOOR_FRAC - 12*dpr;
  let x,y;
  const s=Math.random();
  if(s<0.4){ x=Math.random()*W; y=botY - Math.random()*60*dpr; }
  else if(s<0.7){ x=Math.random()*W; y=topY + Math.random()*80*dpr; }
  else { x=Math.random()<0.5? W*0.05 : W*0.95; y=topY + Math.random()*(botY-topY); }
  artemia.push(new Artemia(x,y));
}
function updateArtemia(dt,t){
  artemiaSpawnT+=dt;
  if(artemia.length<CFG.ARTEMIA_MAX && artemiaSpawnT>CFG.ARTEMIA_SPAWN_DT){
    spawnArtemia(); artemiaSpawnT=0;
  }
  artemia=artemia.filter(a=>!a.eaten);
  for(const a of artemia) a.update(dt,t);
}

