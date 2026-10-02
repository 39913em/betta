
class Nest{
  constructor(x,y){
    this.x=x; this.y=y;
    this.bubbles=[];
    this.eggs=[];
    this.built=false;
    this.hatched=false;
    this.t=0;
    this.done=false;
    this.doneT=0;
  }
  addBubble(){
    const a=Math.random()*Math.PI*2;
    const r=Math.random()*30*dpr;
    this.bubbles.push({
      ox:Math.cos(a)*r, oy:Math.sin(a)*r*0.5,
      r:(2.5+Math.random()*3)*dpr,
      phase:Math.random()*Math.PI*2,
    });
    bubblePop();
  }
  addEgg(){
    this.eggs.push({
      ox:(Math.random()-0.5)*40*dpr,
      oy:8*dpr+Math.random()*6*dpr,
      r:1.6*dpr,
      phase:Math.random()*Math.PI*2,
    });
  }
  update(dt){
    this.t+=dt;
    if(!this.built && this.bubbles.length>=CFG.NEST_BUBBLES){
      this.built=true;
      for(let i=0;i<20;i++) this.addEgg();
    }
  }
  draw(t, alpha){
    alpha = (alpha==null) ? 1 : alpha;
    ctx.save();
    ctx.globalAlpha = alpha;
    for(const b of this.bubbles){
      const bob=Math.sin(t*1.2+b.phase)*1.2*dpr;
      const cx=this.x+b.ox, cy=this.y+b.oy+bob;
      ctx.strokeStyle='rgba(200,230,220,0.55)';
      ctx.lineWidth=0.6*dpr;
      ctx.beginPath(); ctx.arc(cx,cy,b.r,0,Math.PI*2); ctx.stroke();
      ctx.fillStyle='rgba(180,220,210,0.18)';
      ctx.fill();
      ctx.fillStyle='rgba(255,255,255,0.4)';
      ctx.beginPath(); ctx.arc(cx-b.r*0.3,cy-b.r*0.3,b.r*0.3,0,Math.PI*2); ctx.fill();
    }
    for(const e of this.eggs){
      const bob=Math.sin(t*1.4+e.phase)*0.6*dpr;
      ctx.fillStyle='rgba(230,220,190,0.75)';
      ctx.beginPath(); ctx.arc(this.x+e.ox, this.y+e.oy+bob, e.r, 0, Math.PI*2); ctx.fill();
    }
    ctx.restore();
  }
}
let nests=[];

