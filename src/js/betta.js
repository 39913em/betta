/* ============================================================
   BETTA — PALETTES conservadas del backup
   ============================================================ */
const PALETTES = {
  male:{
    body:['#07110d','#173326','#214c39','#1f5362','#173a45','#081b20'],
    headLight:'#254c3a',headDark:'#07120d',scaleCol:'120,210,255',
    caudal:{edge:'#360707',mem:'#c61f24',hi:false},
    dorsal:{edge:'#0c2430',mem:'#397e9e',hi:false},
    anal:{edge:'#260707',mem:'#b71f24',hi:false},
    pect:{edge:'#163848',mem:'#4f97b4',hi:false},
    ventral:{edge:'#16332a',mem:'#4a8068',hi:false},stripe:null
  },
  female:{
    body:['#14130d','#2a2818','#3a3220','#3a2c1c','#251e12','#0f0c06'],
    headLight:'#3a3420',headDark:'#151208',scaleCol:'255,200,120',
    caudal:{edge:'#4a1a08',mem:'#a83a1a',hi:false},
    dorsal:{edge:'#2a2010',mem:'#8a6a30',hi:false},
    anal:{edge:'#4a1a08',mem:'#a83a1a',hi:false},
    pect:{edge:'#2a2015',mem:'#7a6a4a',hi:false},
    ventral:{edge:'#2a2015',mem:'#6a5a3a',hi:false},stripe:'rgba(30,20,15,0.5)'
  }
};

const VARIANT_STYLE={
  original:{bodyScale:1,caudal:[34,28,155,1.75],dorsal:[16,20,62,1.05],anal:[22,24,92,1.15],colorShift:0},
  superDelta:{bodyScale:.98,caudal:[26,26,128,1.48],dorsal:[14,19,58,1.00],anal:[20,23,86,1.08],colorShift:1},
  halfmoon:{bodyScale:.97,caudal:[38,29,170,1.95],dorsal:[18,21,68,1.15],anal:[25,25,100,1.22],colorShift:2},
  roseTail:{bodyScale:.96,caudal:[46,31,158,1.78],dorsal:[20,22,72,1.18],anal:[28,26,104,1.25],colorShift:3},
  crowntail:{bodyScale:.98,caudal:[30,26,150,1.65],dorsal:[16,20,64,1.08],anal:[22,24,94,1.16],colorShift:4}
};

class Betta{
  constructor(sex,opts){
    opts=opts||{};
    this.sex=sex;
    this.pal=PALETTES[sex];
    this.variant=opts.variant||'original';
    this.isFounder=opts.isFounder===true;
    this.isAdult=opts.isAdult!==false;
    this.growthProgress=this.isAdult?1:0;
    const style=VARIANT_STYLE[this.variant]||VARIANT_STYLE.original;
    const baseScale=this.isAdult?1:.30;
    const maleBig=sex==='male'?1:.85;

    this.bodyLen=64*dpr*maleBig*baseScale*style.bodyScale;
    this.bodyWidthFactor=.215;
    this.spine=new Spine(this.bodyLen,18);

    const finScale=this.isAdult?1:.55;
    const maleFinMul=sex==='male'?1:.68;
    this.caudal=new RayFin(style.caudal[0],style.caudal[1],style.caudal[2]*dpr*maleFinMul*finScale,style.caudal[3]);
    this.dorsal=new RayFin(style.dorsal[0],style.dorsal[1],style.dorsal[2]*dpr*maleFinMul*finScale,style.dorsal[3]);
    this.anal=new RayFin(style.anal[0],style.anal[1],style.anal[2]*dpr*maleFinMul*finScale,style.anal[3]);
    this.pectL=new RayFin(11,14,30*dpr*finScale,.85);
    this.pectR=new RayFin(11,14,30*dpr*finScale,.85);
    this.ventralL=new RayFin(4,22,58*dpr*maleFinMul*finScale,.18);
    this.ventralR=new RayFin(4,22,56*dpr*maleFinMul*finScale,.18);

    const yMin=H*SWIM_BAND.topFrac+45*dpr, yMax=H*WATER_FLOOR_FRAC-this.bodyLen*.45;
    this.x=opts.x!==undefined?opts.x:W*.5;
    this.y=opts.y!==undefined?opts.y:(yMin+yMax)*.5;
    this.vx=0;this.vy=0;this.angle=Math.random()*Math.PI*2;this.time=0;
    this.opacity=this.isAdult?1:.7;

    this.depthPlane=opts.depthPlane||2;
    this.depthZ=this.depthPlane;
    this.depthTarget=this.depthPlane;
    this.depthVel=0;

    this.state='cruise';this.stateT=0;this.target={x:W*.7,y:(yMin+yMax)*.5};this.lastBubble=0;this.pickTarget();
    this.sStartT=0;this.sStartDur=.35;this.sStartDir=1;
    this.artemiaEaten=0;this.veilScale=1;this.pelletEaten=0;this.nest=null;this.nestingPhase=null;this.nestingT=0;this.hatchTimer=0;this.laidEggs=false;
    this.cur={waveAmp:.14,waveFreq:.85,wavelength:1,thrust:.010,turnRate:.018,extCaudal:.55,extDorsal:.50,extAnal:.50,extPectL:.70,extPectR:.70,extVentral:.55,pectSpeed:5.5,gillFlare:0};
    this.tgt={...this.cur};
    this.micLevel=0;this.micPrev=0;this.micDeriv=0;
  }

  getDepthScale(){
    const z=this.depthZ;
    return 1.12-(z-1)*.135;
  }
  setDepthPlane(p){
    this.depthTarget=Math.max(DEPTH_MIN,Math.min(DEPTH_MAX,p));
  }
  updateDepth(dt){
    const diff=this.depthTarget-this.depthZ;
    if(Math.abs(diff)<.002){ this.depthZ=this.depthTarget; return; }
    this.depthVel += diff*dt*1.7;
    this.depthVel *= Math.pow(.72,dt*60);
    this.depthZ += this.depthVel*dt*2.2;
    this.depthZ=Math.max(DEPTH_MIN,Math.min(DEPTH_MAX,this.depthZ));
    this.depthPlane=Math.round(this.depthZ);
  }
  pickTarget(){
    const yMin=H*SWIM_BAND.topFrac+this.bodyLen*.6+30*dpr;
    const yMax=H*WATER_FLOOR_FRAC-this.bodyLen*.48-8*dpr;
    let tries=0,tx,ty;
    do{tx=W*(.10+Math.random()*.80);ty=yMin+Math.random()*(yMax-yMin);tries++;}while(Math.hypot(tx-this.x,ty-this.y)<260*dpr&&tries<25);
    this.target.x=tx;this.target.y=ty;
    if(Math.random()<.30) this.setDepthPlane(1+Math.floor(Math.random()*5));
  }
  startSStart(dir){this.state='burst';this.stateT=0;this.sStartT=0;this.sStartDir=dir||(Math.random()<.5?1:-1);this.pickTarget();}
  startNesting(){
    if(!this.isFounder || reproductionComplete || createdBettas>=MAX_BETTAS) return;
    const nx=W*(.30+Math.random()*.40),ny=H*.13;
    this.nest=new Nest(nx,ny);nests.push(this.nest);this.state='nesting';this.nestingPhase='build';this.nestingT=0;
    const yMin=H*SWIM_BAND.topFrac+this.bodyLen*.6;this.target.x=nx;this.target.y=Math.max(yMin,ny+40*dpr);
  }
  easeTo(target,ease,dt){for(const k in target)if(k in this.cur)this.cur[k]+=(target[k]-this.cur[k])*Math.min(1,ease*dt);}

  update(dt){
    this.time+=dt;this.stateT+=dt;this.updateDepth(dt);
    const mLvl=this.micLevel,mDer=this.micDeriv;

    if(micActive && mDer>.018 && this.state!=='nesting' && this.state!=='burst') {
      this.vx += Math.cos(this.angle)*(mDer*.032 + (this.micBass||0)*.008 + (this.micMid||0)*.0025);
      this.vy += Math.sin(this.angle)*(mDer*.032 + (this.micBass||0)*.008 + (this.micMid||0)*.0025);
      if(mDer>.085) this.startSStart();
    }

    if(micActive&&this.state!=='nesting'&&this.state!=='burst'){
      if(mDer>.30){}
      else if(mLvl>.045&&mLvl<.30&&this.state!=='display'&&this.isAdult){this.state='display';this.stateT=0;this.target.x=this.x+Math.cos(this.angle+Math.PI/2)*100*dpr;this.target.y=this.y+Math.sin(this.angle+Math.PI/2)*100*dpr;}
      else if(mLvl<.014&&this.state==='display'&&this.stateT>1.8){this.state='cruise';this.stateT=0;this.pickTarget();}
    }

    let nearestA=null,nA=1e9;
    if(this.state!=='nesting'&&this.state!=='burst'&&this.state!=='display'&&this.isAdult){for(const a of artemia){const d=Math.hypot(a.x-this.x,a.y-this.y);if(d<nA&&d<220*dpr){nA=d;nearestA=a;}}}
    if(!this.isAdult&&this.state!=='burst'){for(const a of artemia){const d=Math.hypot(a.x-this.x,a.y-this.y);if(d<nA&&d<180*dpr){nA=d;nearestA=a;}}}
    if(nearestA&&this.state!=='burst'&&this.state!=='nesting'&&this.state!=='display'){this.target.x=nearestA.x;this.target.y=nearestA.y;}

    const head=this.spine.pts[0];
    const eatR=this.isAdult?14*dpr:9*dpr;
    for(const a of artemia){
      if(a.eaten)continue;
      if(Math.hypot(a.x-head.x,a.y-head.y)<eatR){
        a.eaten=true;this.artemiaEaten++;if(actx&&Math.random()<.35)bubbleSnd(.6,.8+Math.random()*.4);
        if(!this.isAdult){
          this.growthProgress=Math.min(1,this.artemiaEaten/CFG.ARTEMIA_TO_GROW);
          if(this.growthProgress>=1){
            this.isAdult=true;this.artemiaEaten=0;this.growthProgress=1;this.opacity=1;
            const maleBig=this.sex==='male'?1:.85;const style=VARIANT_STYLE[this.variant]||VARIANT_STYLE.original;
            this.bodyLen=64*dpr*maleBig*style.bodyScale;this.spine=new Spine(this.bodyLen,18);
            this.caudal.baseLen=style.caudal[2]*dpr*(this.sex==='male'?1:.68);this.dorsal.baseLen=style.dorsal[2]*dpr*(this.sex==='male'?1:.68);this.anal.baseLen=style.anal[2]*dpr*(this.sex==='male'?1:.68);this.veilScale=1;this.pickTarget();
            grownBettas++;
            if(grownBettas>=MAX_BETTAS)reproductionComplete=true;
          }
        }else if(this.isFounder&&!reproductionComplete&&createdBettas<MAX_BETTAS){
          if(this.artemiaEaten>=CFG.ARTEMIA_TO_NEST&&this.state!=='nesting'&&!this.nest)this.startNesting();
        }
      }
    }

    let nearestP=null,nP=1e9;
    for(const p of pellets){if(p.eaten)continue;const d=Math.hypot(p.x-this.x,p.y-this.y);if(d<nP){nP=d;nearestP=p;}}
    if(nearestP&&nP<600*dpr&&this.state!=='nesting'&&this.state!=='burst'){this.target.x=nearestP.x;this.target.y=nearestP.y;const dHead=Math.hypot(nearestP.x-head.x,nearestP.y-head.y);if(dHead<16*dpr){nearestP.eaten=true;this.pelletEaten++;this.veilScale=Math.min(1.5,this.veilScale+.1);this.fedRecently=2.5;if(actx)bubbleSnd(1.2,.9+Math.random()*.5);this.pickTarget();}}

    if(this.state==='nesting'){
      this.nestingT+=dt;const yMinN=H*SWIM_BAND.topFrac+this.bodyLen*.6;this.target.x=this.nest.x;this.target.y=Math.max(yMinN,this.nest.y+40*dpr);
      if(this.nestingPhase==='build'){
        if(this.time-this.lastBubble>CFG.NEST_BUILD_DT){this.nest.addBubble();this.lastBubble=this.time;}
        if(this.nest.bubbles.length>=CFG.NEST_BUBBLES){this.nestingPhase='lay';this.nestingT=0;}
      }else if(this.nestingPhase==='lay'){
        this.nest.update(dt);if(this.nestingT>6){this.nestingPhase='guard';this.nestingT=0;this.hatchTimer=0;}
      }else if(this.nestingPhase==='guard'){
        this.hatchTimer+=dt;
        if(this.hatchTimer>CFG.HATCH_DELAY&&!this.nest.hatched){
          this.nest.hatched=true;
          spawnBaby(this);
          this.artemiaEaten=0;this.nest.done=true;this.nest=null;this.state='cruise';this.stateT=0;this.pickTarget();
        }
      }
    }else if(this.state==='burst'){
      this.sStartT+=dt;const tN=this.sStartT/this.sStartDur;if(tN>=1&&this.stateT>.9){const sp=Math.hypot(this.vx,this.vy);if(sp<.05){this.state='cruise';this.stateT=0;this.pickTarget();}}
    }else if(this.state==='cruise'){
      const dTgt=Math.hypot(this.target.x-this.x,this.target.y-this.y);if(dTgt<60*dpr||this.stateT>7+Math.random()*5){if(Math.random()<.30){this.state='hover';this.stateT=0;}else{this.pickTarget();this.stateT=0;}}
    }else if(this.state==='hover'){if(this.stateT>1.6+Math.random()*2.2){this.state='cruise';this.stateT=0;this.pickTarget();}}

    let tg={...this.cur};
    if(this.state==='hover')tg={waveAmp:.025,waveFreq:.45,wavelength:1,thrust:.0025,turnRate:.012,extCaudal:.50,extDorsal:.55,extAnal:.55,extPectL:.85,extPectR:.85,extVentral:.70,pectSpeed:7,gillFlare:0};
    else if(this.state==='cruise')tg={waveAmp:.14,waveFreq:.85,wavelength:1,thrust:.010,turnRate:.020,extCaudal:.62,extDorsal:.42,extAnal:.42,extPectL:.35,extPectR:.35,extVentral:.40,pectSpeed:3.2,gillFlare:0};
    else if(this.state==='burst')tg={waveAmp:.85,waveFreq:4.8,wavelength:.95,thrust:.075,turnRate:.10,extCaudal:.85,extDorsal:.15,extAnal:.15,extPectL:.10,extPectR:.10,extVentral:.20,pectSpeed:1,gillFlare:.35};
    else if(this.state==='display')tg={waveAmp:.10,waveFreq:.7,wavelength:1.1,thrust:.003,turnRate:.030,extCaudal:1,extDorsal:1,extAnal:1,extPectL:.95,extPectR:.95,extVentral:1,pectSpeed:5,gillFlare:1};
    else if(this.state==='nesting'){
      const pp=this.nestingPhase==='build'?{waveAmp:.06,waveFreq:.7,thrust:.004,turnRate:.020}:this.nestingPhase==='lay'?{waveAmp:.08,waveFreq:.9,thrust:.003,turnRate:.030}:{waveAmp:.05,waveFreq:.6,thrust:.002,turnRate:.025};
      tg={...pp,extCaudal:.85,extDorsal:.75,extAnal:.75,extPectL:.85,extPectR:.85,extVentral:.80,pectSpeed:5.5,gillFlare:.4};
    }else tg={waveAmp:.16,waveFreq:1.05,wavelength:.95,thrust:.014,turnRate:.045,extCaudal:.70,extDorsal:.35,extAnal:.35,extPectL:.30,extPectR:.30,extVentral:.40,pectSpeed:3,gillFlare:0};
    this.easeTo(tg,3.5,dt);

    if(this.state!=='display'){
      const dx=this.target.x-this.x,dy=this.target.y-this.y,want=Math.atan2(dy,dx),diff=Math.atan2(Math.sin(want-this.angle),Math.cos(want-this.angle));
      const spF=Math.min(1,Math.hypot(this.vx,this.vy)*40);this.angle+=diff*this.cur.turnRate*(.5+.5*spF);this.vx+=Math.cos(this.angle)*this.cur.thrust;this.vy+=Math.sin(this.angle)*this.cur.thrust;
    }

    const speed=Math.hypot(this.vx,this.vy),drag=.020+speed*.020;this.vx*=1-drag;this.vy*=1-drag;const MAXV=(this.isAdult?1.8:1.2)*(1-0.4*Net.waterLevel()-0.25*Persist.dirt());if(speed>MAXV){this.vx*=MAXV/speed;this.vy*=MAXV/speed;}
    this.x+=this.vx*dpr*60*dt;this.y+=this.vy*dpr*60*dt;

    const M=this.bodyLen*1.2+40*dpr,topY=H*SWIM_BAND.topFrac+this.bodyLen*.4,botY=H*WATER_FLOOR_FRAC-this.bodyLen*.4;let bounced=false;
    if(this.x<M){this.vx=Math.abs(this.vx)*.5;this.x=M;bounced=true;}if(this.x>W-M){this.vx=-Math.abs(this.vx)*.5;this.x=W-M;bounced=true;}if(this.y<topY){this.vy=Math.abs(this.vy)*.5;this.y=topY;bounced=true;}if(this.y>botY){this.vy=-Math.abs(this.vy)*.5;this.y=botY;bounced=true;}if(bounced&&this.state!=='burst'&&this.state!=='nesting')this.pickTarget();

    const wv={freq:this.cur.waveFreq,amp:this.cur.waveAmp,wavelength:this.cur.wavelength};let curvFn=null;
    if(this.state==='burst'){const tN=this.sStartT/this.sStartDur;if(tN<1)curvFn=(s,t)=>{const env=Math.sin(tN*Math.PI),lobe=Math.sin(s*Math.PI),sign=tN<.5?this.sStartDir:-this.sStartDir;return sign*env*lobe*.10;};}
    this.spine.update(this.x,this.y,this.angle,wv,this.time,curvFn);

    let flow={x:-this.vx*1.5,y:-this.vy*1.5};flow.x=Math.max(-2.5,Math.min(2.5,flow.x));flow.y=Math.max(-2.5,Math.min(2.5,flow.y));
    const peduncle=this.spine.pts[this.spine.n-1],midBody=this.spine.pts[7],midBody2=this.spine.pts[11],pectBase=this.spine.pts[3];
    this.caudal.lenScale=this.veilScale;this.caudal.fanScale=this.veilScale*.9+.1;this.anal.lenScale=.5+.5*this.veilScale;this.dorsal.lenScale=.5+.5*this.veilScale;
    this.caudal.update(peduncle.x,peduncle.y,peduncle.a+Math.PI,flow,{targetExt:this.cur.extCaudal,waveAmp:.22+this.cur.waveAmp*.3,waveFreq:.7+this.cur.waveFreq*.5,dragK:.055,spread:1,time:this.time,dt});
    this.dorsal.update(midBody.x,midBody.y-5*dpr,midBody.a-Math.PI*.58,flow,{targetExt:this.cur.extDorsal,waveAmp:.09,waveFreq:.6,dragK:.035,spread:.9,time:this.time,dt});
    this.anal.update(midBody2.x,midBody2.y+6*dpr,midBody2.a-Math.PI*.42,flow,{targetExt:this.cur.extAnal,waveAmp:.09,waveFreq:.65,dragK:.035,spread:.9,time:this.time,dt});
    const pectPh=this.time*this.cur.pectSpeed,pAngL=pectBase.a+Math.PI*.55+Math.sin(pectPh)*.55,pAngR=pectBase.a-Math.PI*.55+Math.sin(pectPh+Math.PI)*.55;
    this.pectL.update(pectBase.x,pectBase.y-6*dpr,pAngL,flow,{targetExt:this.cur.extPectL,waveAmp:.16,waveFreq:this.cur.pectSpeed*.9,dragK:.06,spread:.6,time:this.time,dt});
    this.pectR.update(pectBase.x,pectBase.y+6*dpr,pAngR,flow,{targetExt:this.cur.extPectR,waveAmp:.16,waveFreq:this.cur.pectSpeed*.9,dragK:.06,spread:.6,time:this.time,dt});
    const vb=this.spine.pts[5],vAngL=this.angle+Math.PI/2+.55+Math.sin(this.time*.9)*.10,vAngR=this.angle+Math.PI/2-.55+Math.sin(this.time*.9+.4)*.10;
    this.ventralL.update(vb.x,vb.y+3*dpr,vAngL,{x:flow.x*.2,y:flow.y*.2+.4},{targetExt:this.cur.extVentral,waveAmp:.055,waveFreq:.55,dragK:.025,spread:.4,time:this.time,dt});
    this.ventralR.update(vb.x,vb.y+4*dpr,vAngR,{x:flow.x*.2,y:flow.y*.2+.4},{targetExt:this.cur.extVentral,waveAmp:.055,waveFreq:.55,dragK:.025,spread:.4,time:this.time,dt});

    if(actx&&this.time-this.lastBubble>4.5+Math.random()*4){bubbleSnd(.7,.75+Math.random()*.5);this.lastBubble=this.time;}
  }

  draw(){
    const pal=this.pal,op=this.opacity,depth=this.getDepthScale();
    const z=this.depthZ;
    const farFade=.97 + .03*(1-(z-1)/4);
    ctx.save();
    ctx.globalAlpha=op*farFade;
    ctx.translate(this.x,this.y);ctx.scale(depth,depth);ctx.translate(-this.x,-this.y);

    this.ventralL.draw(pal.ventral.edge,pal.ventral.mem,.9,pal.ventral.hi);
    this.ventralR.draw(pal.ventral.edge,pal.ventral.mem,.9,pal.ventral.hi);
    this.anal.draw(pal.anal.edge,pal.anal.mem,1,pal.anal.hi);
    this.dorsal.draw(pal.dorsal.edge,pal.dorsal.mem,1,pal.dorsal.hi);
    this.caudal.draw(pal.caudal.edge,pal.caudal.mem,1,pal.caudal.hi);

    const N=this.spine.n;
    ctx.beginPath();
    for(let i=0;i<N;i++){
      const p=this.spine.pts[i],t=i/(N-1);
      const depthW=this.bodyLen*this.bodyWidthFactor*(.78+.28*Math.sin(t*Math.PI*.85)-.42*Math.pow(t,2.2));
      const nx=Math.cos(p.a+Math.PI/2),ny=Math.sin(p.a+Math.PI/2);
      if(i===0)ctx.moveTo(p.x+nx*depthW,p.y+ny*depthW);else ctx.lineTo(p.x+nx*depthW,p.y+ny*depthW);
    }
    for(let i=N-1;i>=0;i--){const p=this.spine.pts[i],t=i/(N-1),depthW=this.bodyLen*this.bodyWidthFactor*(.78+.28*Math.sin(t*Math.PI*.85)-.42*Math.pow(t,2.2));ctx.lineTo(p.x+Math.cos(p.a-Math.PI/2)*depthW*.85,p.y+Math.sin(p.a-Math.PI/2)*depthW*.85);}
    ctx.closePath();

    const g=ctx.createLinearGradient(this.spine.pts[0].x,this.spine.pts[0].y,this.spine.pts[N-1].x,this.spine.pts[N-1].y),bc=pal.body;
    g.addColorStop(0,bc[0]);g.addColorStop(.20,bc[1]);g.addColorStop(.42,bc[2]);g.addColorStop(.65,bc[3]);g.addColorStop(.85,bc[4]);g.addColorStop(1,bc[5]);ctx.fillStyle=g;ctx.fill();

    ctx.save();ctx.clip();
    for(let i=2;i<N-2;i++)for(let r=-1;r<=1;r++){
      const p=this.spine.pts[i],sx=p.x+Math.cos(p.a+Math.PI/2)*r*5*dpr,sy=p.y+Math.sin(p.a+Math.PI/2)*r*5*dpr,irid=Math.sin(i*.9+r*.7)*.5+.5;
      if(irid>.55){ctx.fillStyle=`rgba(${pal.scaleCol},${.10+.16*irid})`;ctx.beginPath();ctx.ellipse(sx,sy,4*dpr,2.6*dpr,p.a,0,Math.PI*2);ctx.fill();}
    }
    ctx.restore();

    const head=this.spine.pts[0];ctx.save();ctx.translate(head.x,head.y);ctx.rotate(head.a);
    const hg=ctx.createRadialGradient(6*dpr,-2*dpr,1,4*dpr,0,15*dpr);hg.addColorStop(0,pal.headLight);hg.addColorStop(1,pal.headDark);ctx.fillStyle=hg;
    ctx.beginPath();ctx.moveTo(-4*dpr,-9*dpr);ctx.quadraticCurveTo(8*dpr,-11*dpr,13*dpr,-5*dpr);ctx.quadraticCurveTo(16*dpr,0,13*dpr,5*dpr);ctx.quadraticCurveTo(8*dpr,10*dpr,-4*dpr,9*dpr);ctx.quadraticCurveTo(-10*dpr,4*dpr,-10*dpr,0);ctx.quadraticCurveTo(-10*dpr,-4*dpr,-4*dpr,-9*dpr);ctx.closePath();ctx.fill();
    const gf=this.cur.gillFlare;if(gf>.02){ctx.globalAlpha=Math.min(1,gf)*op;ctx.fillStyle='rgba(150,25,25,.5)';ctx.beginPath();ctx.ellipse(-7*dpr,3*dpr,9*dpr*gf,6*dpr*gf,.3,0,Math.PI*2);ctx.fill();ctx.globalAlpha=op;}
    ctx.fillStyle='#030a06';ctx.beginPath();ctx.arc(11*dpr,-2*dpr,7.5*dpr,0,Math.PI*2);ctx.fill();ctx.fillStyle=this.sex==='male'?'#1a4a5e':'#5a4028';ctx.beginPath();ctx.arc(11*dpr,-2*dpr,5.6*dpr,0,Math.PI*2);ctx.fill();ctx.fillStyle='#020202';ctx.beginPath();ctx.arc(11.9*dpr,-2*dpr,3.3*dpr,0,Math.PI*2);ctx.fill();ctx.fillStyle='#eafaff';ctx.globalAlpha=.95*op;ctx.beginPath();ctx.arc(12.9*dpr,-3.9*dpr,1.6*dpr,0,Math.PI*2);ctx.fill();ctx.restore();
    this.pectL.draw(pal.pect.edge,pal.pect.mem,1,pal.pect.hi,op);this.pectR.draw(pal.pect.edge,pal.pect.mem,1,pal.pect.hi,op);
    ctx.restore();
  }
}
