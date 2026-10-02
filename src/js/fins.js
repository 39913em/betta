
class Spine{
  constructor(len,n){
    this.len=len; this.n=n;
    this.pts=[];
    for(let i=0;i<n;i++) this.pts.push({x:0,y:0,a:0});
  }
  update(x,y,headAngle,wave,time,curvFn){
    const seg=this.len/(this.n-1);
    this.pts[0].x=x; this.pts[0].y=y; this.pts[0].a=headAngle;
    for(let i=1;i<this.n;i++){
      const s=i/(this.n-1);
      const env=0.02+0.98*Math.pow(s,2.0);
      let k=wave.amp*env*Math.sin(2*Math.PI*(wave.freq*time - s*wave.wavelength));
      if(curvFn) k+=curvFn(s,time);
      this.pts[i].a=this.pts[i-1].a+k;
      this.pts[i].x=this.pts[i-1].x-Math.cos(this.pts[i-1].a)*seg;
      this.pts[i].y=this.pts[i-1].y-Math.sin(this.pts[i-1].a)*seg;
    }
  }
}


class RayFin{
  constructor(nRays,nSegs,len,fanAngle){
    this.nRays=nRays; this.nSegs=nSegs;
    this.baseLen=len; this.baseFan=fanAngle;
    this.rays=[];
    for(let r=0;r<nRays;r++){
      const s=[];
      for(let k=0;k<nSegs;k++) s.push({x:0,y:0,vx:0,vy:0});
      this.rays.push(s);
    }
    this.ext=0.4; this.extV=0;
    this.init=false;
    this.lenScale=1.0; this.fanScale=1.0;
  }
  update(baseX,baseY,baseAngle,flow,opts){
    const k=6.0,damp=3.0;
    this.extV+=(opts.targetExt-this.ext)*k*opts.dt;
    this.extV*=Math.exp(-damp*opts.dt);
    this.ext+=this.extV*opts.dt;
    this.ext=Math.max(0,Math.min(1,this.ext));
    const fanNow=this.baseFan*this.fanScale*(0.10+0.90*this.ext);
    const lenNow=this.baseLen*this.lenScale*(0.35+0.65*this.ext);
    const segLen=lenNow/(this.nSegs-1);
    const tension=0.28+0.55*this.ext;
    const dragK=opts.dragK;
    for(let r=0;r<this.nRays;r++){
      const ray=this.rays[r];
      const fanT=this.nRays>1?(r/(this.nRays-1)-0.5):0;
      const rayAng=baseAngle+fanT*fanNow;
      const bx=baseX+Math.cos(baseAngle+Math.PI/2)*fanT*this.baseFan*6*dpr*opts.spread;
      const by=baseY+Math.sin(baseAngle+Math.PI/2)*fanT*this.baseFan*6*dpr*opts.spread;
      ray[0].x=bx; ray[0].y=by; ray[0].vx=0; ray[0].vy=0;
      if(!this.init){
        for(let s=0;s<this.nSegs;s++){
          ray[s].x=bx+Math.cos(rayAng)*segLen*s;
          ray[s].y=by+Math.sin(rayAng)*segLen*s;
        }
      }
      for(let s=1;s<this.nSegs;s++){
        const p=ray[s],prev=ray[s-1];
        const dx=p.x-prev.x,dy=p.y-prev.y;
        const d=Math.hypot(dx,dy)||0.001;
        const nx=dx/d,ny=dy/d;
        const sN=s/(this.nSegs-1);
        const wp=opts.time*opts.waveFreq+r*0.42+sN*3.2;
        const waveAng=rayAng+Math.sin(wp)*opts.waveAmp*sN;
        const tx=Math.cos(waveAng),ty=Math.sin(waveAng);
        let fx=(tx-nx)*tension;
        let fy=(ty-ny)*tension;
        const le=d-segLen;
        fx+=-nx*le*0.32; fy+=-ny*le*0.32;
        fx+=flow.x*dragK; fy+=flow.y*dragK;
        fy-=0.006;
        p.vx=(p.vx+fx)*0.88; p.vy=(p.vy+fy)*0.88;
        const sp=Math.hypot(p.vx,p.vy);
        const maxSp=3.2*dpr;
        if(sp>maxSp){ p.vx*=maxSp/sp; p.vy*=maxSp/sp; }
        p.x+=p.vx; p.y+=p.vy;
        const ndx=p.x-prev.x,ndy=p.y-prev.y;
        const nd=Math.hypot(ndx,ndy)||0.0001;
        const cl=Math.max(segLen*0.80,Math.min(segLen*1.20,nd));
        if(Math.abs(cl-nd)>0.0005){
          const cx=ndx/nd,cy=ndy/nd;
          p.x=prev.x+cx*cl; p.y=prev.y+cy*cl;
          const vr=p.vx*cx+p.vy*cy;
          p.vx-=cx*vr*0.5; p.vy-=cy*vr*0.5;
        }
      }
    }
    this.init=true;
  }
  draw(edgeCol,memCol,alphaScale,highlight,alphaMul){
    const aS=(alphaScale!=null?alphaScale:1)*(alphaMul!=null?alphaMul:1);
    for(let r=0;r<this.nRays-1;r++){
      const a=this.rays[r],b=this.rays[r+1];
      ctx.beginPath();
      for(let s=0;s<this.nSegs;s++) ctx.lineTo(a[s].x,a[s].y);
      for(let s=this.nSegs-1;s>=0;s--) ctx.lineTo(b[s].x,b[s].y);
      ctx.closePath();
      const fanT=r/(this.nRays-1);
      const memb=0.22+0.16*Math.sin(fanT*Math.PI);
      ctx.fillStyle=memCol; ctx.globalAlpha=memb*aS; ctx.fill();
      if(highlight){
        ctx.globalAlpha=memb*aS*0.30;
        ctx.fillStyle='rgba(255,220,220,0.4)';
        ctx.fill();
      }
    }
    ctx.strokeStyle=edgeCol;
    ctx.lineWidth=0.65*dpr;
    ctx.globalAlpha=0.70*aS;
    ctx.lineCap='round';
    for(let r=0;r<this.nRays;r++){
      const ray=this.rays[r];
      ctx.beginPath(); ctx.moveTo(ray[0].x,ray[0].y);
      for(let s=1;s<this.nSegs;s++){
        const mx=(ray[s].x+ray[s-1].x)/2;
        const my=(ray[s].y+ray[s-1].y)/2;
        ctx.quadraticCurveTo(ray[s-1].x,ray[s-1].y,mx,my);
      }
      ctx.stroke();
    }
    ctx.globalAlpha=1;
  }
}

