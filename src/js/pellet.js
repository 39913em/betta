/* ============================================================
   CRÍAS
   ============================================================ */
let babies=[];
function spawnBaby(parent){
  if(createdBettas>=MAX_BETTAS || reproductionComplete) return null;
  const nextIndex=createdBettas;
  const variant=BIRTH_VARIANTS[nextIndex];
  if(!variant)return null;

  const b=new Betta(parent.sex,{
    isAdult:false,
    isFounder:false,
    variant,
    x:parent.nest.x+(Math.random()-.5)*20*dpr,
    y:parent.nest.y+20*dpr,
    depthPlane:2
  });
  b.opacity=.72;
  babies.push(b);
  createdBettas++;
  if(actx)bubbleSnd(1.5,1.2+Math.random()*.4);
  return b;
}

function allBettas(){ return [betta,...babies]; }
/* ============================================================
   PELLETS — caen dentro de la banda de nado
   ============================================================ */
class Pellet{
  constructor(x,y){
    this.x=x; this.y=y;
    this.vx=(Math.random()-0.5)*0.15;
    this.vy=0.32+Math.random()*0.12;
    this.r=2.6*dpr;
    this.phase=Math.random()*Math.PI*2;
    this.eaten=false;
    this.restT=0;
    this.floorY = H*WATER_FLOOR_FRAC - 8*dpr - 4*this.r;
  }
  update(dt){
    this.y+=this.vy*dpr*60*dt;
    this.x+=Math.sin(this.phase+performance.now()*0.002)*0.4*dpr;
    if(this.y>this.floorY){ this.y=this.floorY; this.vy=0; this.restT+=dt; }
  }
  draw(){
    ctx.fillStyle='rgba(0,0,0,0.35)';
    ctx.beginPath(); ctx.arc(this.x,this.y,this.r*1.4,0,Math.PI*2); ctx.fill();
    const g=ctx.createRadialGradient(this.x-this.r*0.3,this.y-this.r*0.3,0,this.x,this.y,this.r);
    g.addColorStop(0,'#b89460'); g.addColorStop(0.5,'#8a6638'); g.addColorStop(1,'#4a3518');
    ctx.fillStyle=g;
    ctx.beginPath(); ctx.arc(this.x,this.y,this.r,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='rgba(255,240,200,0.5)';
    ctx.beginPath(); ctx.arc(this.x-this.r*0.3,this.y-this.r*0.3,this.r*0.35,0,Math.PI*2); ctx.fill();
  }
}
let pellets=[];

