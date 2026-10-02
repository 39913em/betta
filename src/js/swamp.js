/let swampCanvas, plants=[], plantsFg=[], motes=[];
function buildSwamp(){
  swampCanvas=document.createElement('canvas');
  swampCanvas.width=W; swampCanvas.height=H;
  const c=swampCanvas.getContext('2d');



  const water=c.createLinearGradient(0,0,0,H);
  water.addColorStop(0,'#101a18');
  water.addColorStop(0.10,'#182824');
  water.addColorStop(0.28,'#17372d');
  water.addColorStop(0.52,'#102a20');
  water.addColorStop(0.76,'#0b1d15');
  water.addColorStop(1,'#050c08');
  c.fillStyle=water;
  c.fillRect(0,0,W,H);

  const haze=c.createLinearGradient(0,0,0,H*0.55);
  haze.addColorStop(0,'rgba(150,190,170,0.10)');
  haze.addColorStop(0.30,'rgba(75,125,100,0.06)');
  haze.addColorStop(1,'rgba(5,18,12,0)');
  c.fillStyle=haze;
  c.fillRect(0,0,W,H*0.65);

  for(let i=0;i<26;i++){
    const x=W*(0.02+Math.random()*0.96);
    const base=H*(0.73+Math.random()*0.18);
    const h=H*(0.16+Math.random()*0.32);
    const col=i<14?'rgba(33,68,48,0.46)':'rgba(52,87,58,0.30)';
    c.strokeStyle=col;
    c.lineWidth=(2+Math.random()*4)*dpr;
    c.lineCap='round';
    c.beginPath();
    c.moveTo(x,base);
    c.quadraticCurveTo(
      x+(Math.random()-0.5)*45*dpr,
      base-h*0.45,
      x+(Math.random()-0.5)*70*dpr,
      base-h
    );
    c.stroke();
  }

 
  for(let i=0;i<42;i++){
    const x=W*(.01+Math.random()*.98);
    const base=H*(.72+Math.random()*.22);
    const h=H*(.16+Math.random()*.34);
    const sway=(Math.random()-.5)*28*dpr;
    c.strokeStyle=`rgba(${18+Math.random()*20|0},${43+Math.random()*35|0},${34+Math.random()*28|0},${.22+Math.random()*.18})`;
    c.lineWidth=(1+Math.random()*2.2)*dpr;
    c.beginPath();
    c.moveTo(x,base);
    c.quadraticCurveTo(x+sway*.35,base-h*.45,x+sway,base-h);
    c.stroke();
  }
  for(let i=0;i<70;i++){
    const x=W*(.02+Math.random()*.96);
    const y=H*(.18+Math.random()*.53);
    const rx=(5+Math.random()*14)*dpr;
    const ry=(3+Math.random()*8)*dpr;
    c.save();
    c.translate(x,y);
    c.rotate((Math.random()-.5)*1.5);
    c.fillStyle=`rgba(${20+Math.random()*24|0},${48+Math.random()*38|0},${34+Math.random()*28|0},${.10+Math.random()*.14})`;
    c.beginPath();
    c.ellipse(0,0,rx,ry,0,0,Math.PI*2);
    c.fill();
    c.restore();
  }
  for(let i=0;i<36;i++){
    const x=W*(.02+Math.random()*.96);
    const base=H*(.82+Math.random()*.10);
    const h=H*(.07+Math.random()*.17);
    c.strokeStyle=`rgba(${20+Math.random()*22|0},${52+Math.random()*42|0},${34+Math.random()*30|0},${.12+Math.random()*.13})`;
    c.lineWidth=(.7+Math.random()*1.4)*dpr;
    c.beginPath();
    c.moveTo(x,base);
    c.quadraticCurveTo(x+(Math.random()-.5)*20*dpr,base-h*.5,x+(Math.random()-.5)*34*dpr,base-h);
    c.stroke();
  }

  const farMist=c.createRadialGradient(W*.52,H*.42,0,W*.52,H*.42,W*.62);
  farMist.addColorStop(0,'rgba(70,112,96,.055)');
  farMist.addColorStop(.55,'rgba(35,70,57,.035)');
  farMist.addColorStop(1,'rgba(0,0,0,0)');
  c.fillStyle=farMist;
  c.fillRect(0,0,W,H*.78);

 
  function branch(points,width,depth,seed){
    const nSegs=points.length-1;
    const perSeg=14;
    const samples=nSegs*perSeg;
    const pts=[points[0],...points,points[points.length-1]];
    const path=[];
    for(let i=0;i<=samples;i++){
      const fi=i/perSeg;
      const idx=Math.min(nSegs-1,Math.floor(fi));
      const t=fi-idx;
      const p0=pts[idx],p1=pts[idx+1],p2=pts[idx+2],p3=pts[idx+3];
      const t2=t*t,t3=t2*t;
      path.push([
        0.5*((2*p1[0])+(-p0[0]+p2[0])*t+(2*p0[0]-5*p1[0]+4*p2[0]-p3[0])*t2+(-p0[0]+3*p1[0]-3*p2[0]+p3[0])*t3),
        0.5*((2*p1[1])+(-p0[1]+p2[1])*t+(2*p0[1]-5*p1[1]+4*p2[1]-p3[1])*t2+(-p0[1]+3*p1[1]-3*p2[1]+p3[1])*t3)
      ]);
    }

    const halfW=[];
    for(let i=0;i<=samples;i++){
      const t=i/samples;
      const shape=0.55+0.72*Math.sin(t*Math.PI)*Math.pow(1-Math.abs(2*t-1)*0.30,0.6);
      halfW.push(width*dpr*0.5*Math.max(0.34,shape));
    }

    const left=[],right=[];
    const upSide=[];
    for(let i=0;i<=samples;i++){
      const p=path[i];
      const pn=path[Math.min(samples,i+1)];
      const pp=path[Math.max(0,i-1)];
      const dx=pn[0]-pp[0],dy=pn[1]-pp[1];
      const len=Math.hypot(dx,dy)||1;
      const nx=-dy/len,ny=dx/len;
      left.push([p[0]+nx*halfW[i],p[1]+ny*halfW[i]]);
      right.push([p[0]-nx*halfW[i],p[1]-ny*halfW[i]]);
      let ux=nx,uy=ny;
      if(uy>0){ux=-ux;uy=-uy;}
      upSide.push([ux,uy]);
    }

    c.save();
    c.lineCap='round';
    c.lineJoin='round';

    c.beginPath();
    c.moveTo(left[0][0],left[0][1]);
    for(let i=1;i<=samples;i++)c.lineTo(left[i][0],left[i][1]);
    for(let i=samples;i>=0;i--)c.lineTo(right[i][0],right[i][1]);
    c.closePath();

    const dMul=1-(depth-2)*0.06;
    const gx0=path[0][0],gy0=path[0][1];
    const gx1=path[samples][0],gy1=path[samples][1];
    const lg=c.createLinearGradient(gx0,gy0,gx1,gy1);
    lg.addColorStop(0,   `rgba(${Math.round(94*dMul)},${Math.round(70*dMul)},${Math.round(37*dMul)},1)`);
    lg.addColorStop(0.20,`rgba(${Math.round(78*dMul)},${Math.round(55*dMul)},${Math.round(27*dMul)},1)`);
    lg.addColorStop(0.50,`rgba(${Math.round(54*dMul)},${Math.round(39*dMul)},${Math.round(20*dMul)},1)`);
    lg.addColorStop(0.80,`rgba(${Math.round(34*dMul)},${Math.round(25*dMul)},${Math.round(13*dMul)},1)`);
    lg.addColorStop(1,   `rgba(${Math.round(18*dMul)},${Math.round(13*dMul)},${Math.round(7*dMul)},1)`);
    c.fillStyle=lg;c.fill();

    c.save();
    c.clip();

    const sh=c.createLinearGradient(0,0,0,H);
    sh.addColorStop(0,   'rgba(220,190,140,0.10)');
    sh.addColorStop(0.35,'rgba(0,0,0,0)');
    sh.addColorStop(1,   'rgba(0,0,0,0.34)');
    c.fillStyle=sh;c.fillRect(0,0,W,H);

    const barkLines=20;
    for(let k=0;k<barkLines;k++){
      const offset=(Math.random()*2-1)*0.85;
      const bc=[32+Math.random()*30|0, 20+Math.random()*22|0, 9+Math.random()*12|0];
      c.strokeStyle=`rgba(${bc[0]},${bc[1]},${bc[2]},${0.20+Math.random()*0.35})`;
      c.lineWidth=(0.35+Math.random()*0.85)*dpr;
      c.beginPath();
      const startI=Math.floor(Math.random()*samples*0.45);
      const endI=Math.min(samples,startI+samples*0.45+Math.random()*samples*0.55);
      for(let i=startI;i<=endI;i++){
        const p=path[i];
        const px=p[0]+(left[i][0]-p[0])*offset + Math.sin(i*0.35+k)*1.4*dpr;
        const py=p[1]+(left[i][1]-p[1])*offset + Math.cos(i*0.28+k)*1.0*dpr;
        if(i===startI)c.moveTo(px,py);else c.lineTo(px,py);
      }
      c.stroke();
    }

    for(let k=0;k<4;k++){
      const off=-0.65-Math.random()*0.22;
      c.strokeStyle=`rgba(${155+Math.random()*50|0},${120+Math.random()*38|0},${68+Math.random()*28|0},${0.10+Math.random()*0.13})`;
      c.lineWidth=(0.65+Math.random()*0.7)*dpr;
      c.beginPath();
      for(let i=0;i<=samples;i++){
        const p=path[i];
        const px=p[0]+(left[i][0]-p[0])*off;
        const py=p[1]+(left[i][1]-p[1])*off;
        if(i===0)c.moveTo(px,py);else c.lineTo(px,py);
      }
      c.stroke();
    }
    for(let k=0;k<3;k++){
      const off=0.65+Math.random()*0.22;
      c.strokeStyle=`rgba(10,6,3,${0.22+Math.random()*0.18})`;
      c.lineWidth=(0.7+Math.random()*0.85)*dpr;
      c.beginPath();
      for(let i=0;i<=samples;i++){
        const p=path[i];
        const px=p[0]+(left[i][0]-p[0])*off;
        const py=p[1]+(left[i][1]-p[1])*off;
        if(i===0)c.moveTo(px,py);else c.lineTo(px,py);
      }
      c.stroke();
    }

    const knotCount=2+Math.floor(Math.random()*3);
    for(let kk=0;kk<knotCount;kk++){
      const ki=Math.floor(samples*(0.15+Math.random()*0.70));
      const p=path[ki];
      const kr=(3.2+Math.random()*5.5)*dpr;
      const kg=c.createRadialGradient(p[0],p[1],0,p[0],p[1],kr*1.9);
      kg.addColorStop(0,   'rgba(6,4,2,0.85)');
      kg.addColorStop(0.35,'rgba(28,18,9,0.55)');
      kg.addColorStop(1,   'rgba(20,14,7,0)');
      c.fillStyle=kg;
      c.beginPath();
      c.ellipse(p[0],p[1],kr*1.9,kr*1.25,0,0,Math.PI*2);
      c.fill();
      for(let rr=0;rr<3;rr++){
        c.strokeStyle=`rgba(${85+Math.random()*30|0},${62+Math.random()*24|0},${30+Math.random()*14|0},${0.28+Math.random()*0.24})`;
        c.lineWidth=0.5*dpr;
        c.beginPath();
        c.ellipse(p[0],p[1],kr*(0.30+rr*0.42),kr*(0.18+rr*0.30),0,0,Math.PI*2);
        c.stroke();
      }
      c.fillStyle='rgba(0,0,0,0.72)';
      c.beginPath();
      c.ellipse(p[0],p[1],kr*0.28,kr*0.18,0,0,Math.PI*2);
      c.fill();
    }

    const mossN=(depth<=2)?Math.floor(samples*0.55):(depth<=3?Math.floor(samples*0.30):0);
    for(let i=0;i<mossN;i++){
      const idx=Math.floor(Math.random()*samples);
      const p=path[idx];
      const ux=upSide[idx][0],uy=upSide[idx][1];
      const mx=p[0]+ux*halfW[idx]*(0.78+Math.random()*0.25);
      const my=p[1]+uy*halfW[idx]*(0.78+Math.random()*0.25);
      const rr=(1.0+Math.random()*3.2)*dpr;
      c.fillStyle=`rgba(${25+Math.random()*35|0},${62+Math.random()*55|0},${22+Math.random()*26|0},${0.30+Math.random()*0.38})`;
      c.beginPath();
      c.arc(mx,my,rr,0,Math.PI*2);
      c.fill();
    }

    c.restore();
    c.restore();
  }

  const trunkX=W*0.50;
  branch([
    [W*0.48,H*0.91],[W*0.49,H*0.75],[W*0.46,H*0.61],[W*0.43,H*0.48],
    [W*0.31,H*0.38],[W*0.16,H*0.31],[W*0.04,H*0.38]
  ],31,4,1);
  branch([
    [W*0.49,H*0.76],[W*0.57,H*0.60],[W*0.66,H*0.50],[W*0.73,H*0.36],
    [W*0.78,H*0.20]
  ],25,4,2);
  branch([
    [W*0.46,H*0.60],[W*0.39,H*0.48],[W*0.33,H*0.28],[W*0.27,H*0.11],
    [W*0.22,H*0.02]
  ],21,4,3);
  branch([
    [W*0.54,H*0.63],[W*0.60,H*0.48],[W*0.66,H*0.27],[W*0.62,H*0.10],
    [W*0.58,H*0.01]
  ],19,4,4);
  branch([
    [W*0.48,H*0.80],[W*0.38,H*0.73],[W*0.27,H*0.68],[W*0.15,H*0.69],
    [W*0.07,H*0.76]
  ],17,3,5);
  branch([
    [W*0.53,H*0.78],[W*0.65,H*0.77],[W*0.77,H*0.80],[W*0.90,H*0.83]
  ],15,3,6);

  branch([
    [W*0.50,H*0.82],[W*0.44,H*0.86],[W*0.36,H*0.91],[W*0.26,H*0.94]
  ],11,2,7);
  branch([
    [W*0.54,H*0.82],[W*0.62,H*0.88],[W*0.73,H*0.91],[W*0.84,H*0.94]
  ],10,2,8);

  const shadow=c.createRadialGradient(W*0.50,H*0.72,5,W*0.50,H*0.72,W*0.32);
  shadow.addColorStop(0,'rgba(0,0,0,0.38)');
  shadow.addColorStop(1,'rgba(0,0,0,0)');
  c.fillStyle=shadow;
  c.fillRect(0,0,W,H);


  const floorY=H*0.91;

  const sg=c.createLinearGradient(0,floorY-40*dpr,0,H);
  sg.addColorStop(0,'#1e2615');
  sg.addColorStop(0.25,'#16200f');
  sg.addColorStop(0.7,'#0c1409');
  sg.addColorStop(1,'#050805');
  c.fillStyle=sg;
  c.fillRect(0,floorY-40*dpr,W,H-floorY+40*dpr);

  c.save();
  c.beginPath();
  c.moveTo(0,floorY);
  for(let i=0;i<=60;i++){
    const x=W*i/60;
    const y=floorY+(Math.sin(i*0.7)*3 + Math.sin(i*2.3)*1.8 + (Math.random()-0.5)*2.5)*dpr;
    c.lineTo(x,y);
  }
  c.lineTo(W,H); c.lineTo(0,H); c.closePath();
  c.clip();

  for(let i=0;i<180;i++){
    const x=Math.random()*W;
    const y=floorY+2*dpr+Math.random()*(H-floorY-4*dpr);
    const rr=(2.2+Math.random()*4.5)*dpr;
    const tone=Math.random();
    const col = tone<0.4
      ? `rgba(${52+Math.random()*35|0},${48+Math.random()*28|0},${30+Math.random()*20|0},${0.55+Math.random()*0.35})`
      : tone<0.75
      ? `rgba(${38+Math.random()*28|0},${34+Math.random()*22|0},${22+Math.random()*16|0},${0.55+Math.random()*0.35})`
      : `rgba(${72+Math.random()*35|0},${66+Math.random()*28|0},${42+Math.random()*22|0},${0.45+Math.random()*0.30})`;
    c.fillStyle=col;
    c.beginPath();
    const sides=5+Math.floor(Math.random()*3);
    for(let k=0;k<sides;k++){
      const a=k*Math.PI*2/sides + Math.random()*0.25;
      const r=rr*(0.72+Math.random()*0.42);
      const px=x+Math.cos(a)*r, py=y+Math.sin(a)*r*0.75;
      if(k===0)c.moveTo(px,py);else c.lineTo(px,py);
    }
    c.closePath();c.fill();
    c.fillStyle=`rgba(200,190,160,${0.05+Math.random()*0.10})`;
    c.beginPath();c.arc(x-rr*0.28,y-rr*0.30,rr*0.30,0,Math.PI*2);c.fill();
  }

  for(let i=0;i<2200;i++){
    const x=Math.random()*W;
    const y=floorY+(Math.random()*(H-floorY));
    const rr=(0.35+Math.random()*1.1)*dpr;
    c.fillStyle=`rgba(${22+Math.random()*42|0},${20+Math.random()*34|0},${10+Math.random()*22|0},${0.35+Math.random()*0.5})`;
    c.beginPath();c.arc(x,y,rr,0,Math.PI*2);c.fill();
  }

  for(let i=0;i<70;i++){
    const x=Math.random()*W;
    const y=floorY+4*dpr+Math.random()*(H-floorY-8*dpr);
    const rot=(Math.random()-0.5)*1.2;
    c.save();c.translate(x,y);c.rotate(rot);
    const kind=Math.random();
    if(kind<0.55){
      const w=(4+Math.random()*10)*dpr, h=(1.5+Math.random()*2.8)*dpr;
      c.fillStyle=`rgba(${58+Math.random()*35|0},${38+Math.random()*22|0},${16+Math.random()*12|0},${0.5+Math.random()*0.35})`;
      c.beginPath();c.ellipse(0,0,w,h,0,0,Math.PI*2);c.fill();
      c.strokeStyle=`rgba(20,12,6,0.55)`;c.lineWidth=0.4*dpr;
      c.beginPath();c.moveTo(-w*0.85,0);c.lineTo(w*0.85,0);c.stroke();
    } else if(kind<0.85){
      const w=(6+Math.random()*14)*dpr;
      c.strokeStyle=`rgba(${40+Math.random()*24|0},${26+Math.random()*14|0},${12+Math.random()*10|0},${0.55+Math.random()*0.3})`;
      c.lineWidth=(0.6+Math.random()*0.9)*dpr;
      c.beginPath();c.moveTo(-w/2,0);c.quadraticCurveTo(0,(Math.random()-0.5)*2*dpr,w/2,0);c.stroke();
    } else {
      const rr=(1.4+Math.random()*2)*dpr;
      c.fillStyle=`rgba(${48+Math.random()*24|0},${32+Math.random()*18|0},${14+Math.random()*10|0},0.7)`;
      c.beginPath();c.ellipse(0,0,rr*1.6,rr*0.8,0,0,Math.PI*2);c.fill();
    }
    c.restore();
  }

  c.restore();

  const contact=c.createLinearGradient(0,floorY-8*dpr,0,floorY+6*dpr);
  contact.addColorStop(0,'rgba(0,0,0,0)');
  contact.addColorStop(1,'rgba(0,0,0,0.55)');
  c.fillStyle=contact;
  c.fillRect(0,floorY-8*dpr,W,14*dpr);

  
  for(let i=0;i<140;i++){
    const x=W*(0.01+Math.random()*0.98);
    const y=H*(0.90+Math.random()*0.10);
    const depthT=(y-H*0.90)/(H*0.10);
    const scale=0.7+depthT*0.9;
    const rosetteR=(2.5+Math.random()*3.5)*dpr*scale;

    const nLeaf=4+Math.floor(Math.random()*5);
    for(let k=0;k<nLeaf;k++){
      const a=k*Math.PI*2/nLeaf + Math.random()*0.35;
      const lx=x+Math.cos(a)*rosetteR*0.42;
      const ly=y+Math.sin(a)*rosetteR*0.30 - Math.random()*1.5*dpr;
      const lw=rosetteR*(0.75+Math.random()*0.35);
      const lh=rosetteR*(0.28+Math.random()*0.16);
      const youngness=1-k/nLeaf;
      const gcol = youngness>0.5
        ? `rgba(${95+Math.random()*45|0},${155+Math.random()*55|0},${58+Math.random()*40|0},${0.55+Math.random()*0.30})`
        : `rgba(${55+Math.random()*35|0},${115+Math.random()*45|0},${42+Math.random()*32|0},${0.45+Math.random()*0.35})`;
      c.save();c.translate(lx,ly);c.rotate(a*1.05);
      c.fillStyle=gcol;
      c.beginPath();
      c.moveTo(-lw,0);
      c.quadraticCurveTo(-lw*0.2,-lh*1.5,lw*0.85,-lh*0.25);
      c.quadraticCurveTo(lw*1.05,0,lw*0.85,lh*0.25);
      c.quadraticCurveTo(-lw*0.2,lh*1.5,-lw,0);
      c.closePath();c.fill();
      c.strokeStyle=`rgba(20,40,18,0.30)`;
      c.lineWidth=0.35*dpr;
      c.beginPath();c.moveTo(-lw*0.85,0);c.lineTo(lw*0.75,0);c.stroke();
      c.restore();
    }
  }

 
  const rightSpecies = ['vallis','sagitt','stem','vallis','sagitt','vallis','vallis','sagitt'];

  for(let i=0;i<220;i++){
    const x=W*(0.55+Math.random()*0.44);
    const base=H*(0.86+Math.random()*0.12);
    const kind=rightSpecies[Math.floor(Math.random()*rightSpecies.length)];
    const tintBias=Math.random();

    if(kind==='vallis'){
      const h=H*(0.18+Math.random()*0.46);
      const lean=(Math.random()-0.5)*95*dpr;
      const curlA=(Math.random()-0.5)*1.4;
      const w=(2.0+Math.random()*3.0)*dpr;
      const g=c.createLinearGradient(x,base,x+lean,base-h);
      if(tintBias<0.25){
        g.addColorStop(0,`rgba(18,52,30,0.82)`);
        g.addColorStop(0.6,`rgba(48,102,44,0.78)`);
        g.addColorStop(1,`rgba(96,158,62,0.75)`);
      } else if(tintBias<0.55){
        g.addColorStop(0,`rgba(24,64,34,0.82)`);
        g.addColorStop(0.6,`rgba(62,120,52,0.78)`);
        g.addColorStop(1,`rgba(120,178,74,0.75)`);
      } else if(tintBias<0.8){
        g.addColorStop(0,`rgba(30,72,40,0.82)`);
        g.addColorStop(0.6,`rgba(78,138,58,0.78)`);
        g.addColorStop(1,`rgba(148,198,86,0.75)`);
      } else {
        g.addColorStop(0,`rgba(42,80,40,0.82)`);
        g.addColorStop(0.6,`rgba(94,148,62,0.78)`);
        g.addColorStop(1,`rgba(170,208,102,0.75)`);
      }
      c.strokeStyle=g;
      c.lineCap='round';
      c.beginPath();
      c.moveTo(x-w*0.5,base);
      c.bezierCurveTo(x+lean*0.15,base-h*0.35, x+lean*0.65,base-h*0.72, x+lean,base-h);
      c.bezierCurveTo(x+lean*0.65+curlA*4*dpr,base-h*0.70, x+lean*0.15+curlA*6*dpr,base-h*0.32, x+w*0.5,base);
      c.closePath();
      c.fillStyle=g;c.fill();
      c.strokeStyle=`rgba(12,30,16,0.38)`;c.lineWidth=0.4*dpr;
      for(let v=-1;v<=1;v++){
        c.beginPath();
        c.moveTo(x+v*0.6*dpr,base);
        c.quadraticCurveTo(x+lean*0.5+v*0.8*dpr,base-h*0.55,x+lean+v*0.4*dpr,base-h);
        c.stroke();
      }
    } else if(kind==='sagitt'){
      const h=H*(0.12+Math.random()*0.26);
      const lean=(Math.random()-0.5)*65*dpr;
      const wid=(4+Math.random()*5)*dpr;
      const g=c.createLinearGradient(x,base,x+lean,base-h);
      g.addColorStop(0,`rgba(22,56,32,0.82)`);
      g.addColorStop(0.5,`rgba(62,116,50,0.78)`);
      g.addColorStop(1,`rgba(128,178,72,0.75)`);
      c.fillStyle=g;
      c.beginPath();
      c.moveTo(x-wid,base);
      c.quadraticCurveTo(x-wid*0.3,base-h*0.55, x+lean,base-h);
      c.quadraticCurveTo(x+wid*0.3,base-h*0.55, x+wid,base);
      c.closePath();c.fill();
      c.strokeStyle=`rgba(12,30,16,0.34)`;c.lineWidth=0.4*dpr;
      c.beginPath();c.moveTo(x,base);c.lineTo(x+lean,base-h);c.stroke();
    } else {
      const h=H*(0.16+Math.random()*0.32);
      const lean=(Math.random()-0.5)*45*dpr;
      c.strokeStyle=`rgba(${30+Math.random()*32|0},${72+Math.random()*55|0},${34+Math.random()*34|0},0.78)`;
      c.lineWidth=(1+Math.random()*1.4)*dpr;
      c.beginPath();c.moveTo(x,base);c.quadraticCurveTo(x+lean*0.5,base-h*0.5,x+lean,base-h);c.stroke();
      const nL=5+Math.floor(Math.random()*5);
      for(let k=1;k<=nL;k++){
        const t=k/(nL+1);
        const cx=x+lean*t+Math.sin(t*3)*2*dpr;
        const cy=base-h*t;
        const dir=k%2?1:-1;
        const gcol=Math.random()<0.4
          ? `rgba(${78+Math.random()*45|0},${132+Math.random()*50|0},${58+Math.random()*30|0},0.78)`
          : `rgba(${48+Math.random()*30|0},${100+Math.random()*42|0},${44+Math.random()*26|0},0.78)`;
        c.fillStyle=gcol;
        c.beginPath();c.ellipse(cx+dir*3.5*dpr,cy,4.2*dpr,1.7*dpr,dir*0.45,0,Math.PI*2);c.fill();
      }
    }
  }


  const anubiasAnchors=[
    {x:.48,y:.82},{x:.46,y:.72},{x:.44,y:.62},
    {x:.42,y:.52},{x:.40,y:.44},{x:.44,y:.36},
    {x:.55,y:.60},{x:.62,y:.48},{x:.66,y:.38},
    {x:.36,y:.42},{x:.30,y:.32},{x:.30,y:.24},
    {x:.58,y:.72},{x:.68,y:.68},{x:.74,y:.55},
    {x:.34,y:.60},{x:.28,y:.55},{x:.52,y:.88}
  ];
  for(const anchor of anubiasAnchors){
    const cx=W*anchor.x, cy=H*anchor.y;
    const nLeaf=6+Math.floor(Math.random()*7);
    for(let k=0;k<nLeaf;k++){
      const a=Math.random()*Math.PI*2;
      const r=Math.pow(Math.random(),0.6)*26*dpr;
      const bx=cx+Math.cos(a)*r;
      const by=cy+Math.sin(a)*r*0.7;

      const aboveBias=(cy-by)/(26*dpr);
      const outBias=bx<cx?-1:1;
      let ang;
      if(aboveBias>0.35){
        ang = -Math.PI*0.5 + outBias*0.3 + (Math.random()-0.5)*0.9;
      } else if(aboveBias<-0.35){
        ang = Math.PI*0.5 + outBias*0.4 + (Math.random()-0.5)*0.8;
      } else {
        ang = outBias>0 ? (Math.random()-0.5)*1.6 : Math.PI + (Math.random()-0.5)*1.6;
      }

      const young=Math.random()<0.35;
      const sz = young
        ? (3.5+Math.random()*4.5)*dpr
        : (7+Math.random()*11)*dpr;

      const palette = young
        ? ['rgba(120,190,80,','rgba(140,210,90,','rgba(100,175,70,','rgba(160,220,110,']
        : ['rgba(28,72,38,','rgba(38,88,44,','rgba(48,105,50,','rgba(62,125,56,','rgba(78,145,66,','rgba(22,58,32,','rgba(90,155,72,'];
      const col=palette[Math.floor(Math.random()*palette.length)];
      const alpha=young ? 0.55+Math.random()*0.35 : 0.55+Math.random()*0.40;

      c.save();
      c.translate(bx,by);
      c.rotate(ang);

      const petLen = young ? sz*0.35 : sz*0.55;
      c.strokeStyle=`rgba(${45+Math.random()*25|0},${85+Math.random()*35|0},${38+Math.random()*22|0},0.85)`;
      c.lineWidth=(0.8+Math.random()*0.6)*dpr;
      c.beginPath();
      c.moveTo(0,0);
      c.quadraticCurveTo(petLen*0.55, sz*0.10, petLen, sz*0.05);
      c.stroke();

      const widthMul = 0.55 + Math.random()*0.15;
      const lengthMul = 0.95 + Math.random()*0.25;
      c.fillStyle=`${col}${alpha})`;
      c.beginPath();
      c.moveTo(petLen, sz*0.05);
      c.bezierCurveTo(
        petLen + sz*0.45, -sz*widthMul,
        petLen + sz*1.55*lengthMul, -sz*widthMul*0.95,
        petLen + sz*1.85*lengthMul, -sz*0.05
      );
      c.bezierCurveTo(
        petLen + sz*1.55*lengthMul, sz*widthMul*0.95,
        petLen + sz*0.45, sz*widthMul,
        petLen, sz*0.05
      );
      c.closePath();
      c.fill();

      c.strokeStyle=`rgba(12,30,15,0.48)`;
      c.lineWidth=0.5*dpr;
      c.beginPath();
      c.moveTo(petLen, sz*0.05);
      c.quadraticCurveTo(petLen + sz*0.9, -sz*0.05, petLen + sz*1.7*lengthMul, -sz*0.05);
      c.stroke();

      for(let v=0;v<3;v++){
        const vt=0.30+v*0.22;
        c.strokeStyle=`rgba(12,30,15,0.30)`;
        c.lineWidth=0.35*dpr;
        const nx=petLen + sz*(0.35+vt*1.1)*lengthMul;
        c.beginPath();
        c.moveTo(nx, sz*0.02);
        c.quadraticCurveTo(nx + sz*0.15, -sz*0.22, nx + sz*0.28, -sz*0.30*widthMul*1.5);
        c.stroke();
        c.beginPath();
        c.moveTo(nx, sz*0.02);
        c.quadraticCurveTo(nx + sz*0.15, sz*0.20, nx + sz*0.26, sz*0.28*widthMul*1.5);
        c.stroke();
      }

      c.fillStyle=`rgba(210,245,190,${0.08+Math.random()*0.12})`;
      c.beginPath();
      c.ellipse(petLen + sz*1.0, -sz*0.22, sz*0.30, sz*0.09, -0.2, 0, Math.PI*2);
      c.fill();

      c.restore();
    }
  }

 

  const mossZones=[
    {x0:W*0.10,y0:H*0.55,x1:W*0.90,y1:H*0.85,density:260},
    {x0:W*0.28,y0:H*0.32,x1:W*0.72,y1:H*0.55,density:120},
    {x0:W*0.05,y0:H*0.80,x1:W*0.95,y1:H*0.94,density:180}
  ];
  for(const zone of mossZones){
    for(let i=0;i<zone.density;i++){
      const bx=zone.x0+Math.random()*(zone.x1-zone.x0);
      const by=zone.y0+Math.random()*(zone.y1-zone.y0);
      const nF=2+Math.floor(Math.random()*3);
      for(let f=0;f<nF;f++){
        const a=Math.random()*Math.PI*2;
        const len=(3+Math.random()*7)*dpr;
        const curve=(Math.random()-0.5)*0.9;
        c.strokeStyle=`rgba(${28+Math.random()*38|0},${68+Math.random()*60|0},${30+Math.random()*32|0},${0.32+Math.random()*0.38})`;
        c.lineWidth=(0.5+Math.random()*0.8)*dpr;
        c.lineCap='round';
        c.beginPath();
        c.moveTo(bx,by);
        c.quadraticCurveTo(
          bx+Math.cos(a)*len*0.5+curve*4*dpr,
          by+Math.sin(a)*len*0.5+curve*3*dpr,
          bx+Math.cos(a)*len,
          by+Math.sin(a)*len
        );
        c.stroke();
      }
    }
  }

  for(let g=0;g<26;g++){
    const gx=W*(0.02+Math.random()*0.96);
    const gy=H*(0.89+Math.random()*0.06);
    const n=8+Math.floor(Math.random()*8);
    const groupHue=80+Math.random()*45;
    for(let k=0;k<n;k++){
      const h=H*(0.08+Math.random()*0.34);
      const lean=(Math.random()-0.5)*90*dpr;
      const w=(1.4+Math.random()*2.2)*dpr;
      const curl=(Math.random()-0.5)*10*dpr;

      const lBias=Math.random();
      let colBase, colMid, colTip;
      if(lBias<0.30){
        colBase=`hsla(${groupHue+15},${42+Math.random()*20}%,${22+Math.random()*8}%,0.75)`;
        colMid =`hsla(${groupHue+18},${48+Math.random()*20}%,${38+Math.random()*10}%,0.78)`;
        colTip =`hsla(${groupHue+20},${55+Math.random()*20}%,${62+Math.random()*10}%,0.78)`;
      } else if(lBias<0.75){
        colBase=`hsla(${groupHue},${38+Math.random()*20}%,${16+Math.random()*8}%,0.80)`;
        colMid =`hsla(${groupHue+4},${42+Math.random()*20}%,${30+Math.random()*10}%,0.78)`;
        colTip =`hsla(${groupHue+6},${50+Math.random()*20}%,${52+Math.random()*10}%,0.76)`;
      } else {
        colBase=`hsla(${groupHue-10},${32+Math.random()*16}%,${10+Math.random()*6}%,0.82)`;
        colMid =`hsla(${groupHue-6},${36+Math.random()*16}%,${22+Math.random()*8}%,0.78)`;
        colTip =`hsla(${groupHue-2},${42+Math.random()*18}%,${42+Math.random()*10}%,0.74)`;
      }

      const lg=c.createLinearGradient(gx,gy,gx+lean,gy-h);
      lg.addColorStop(0, colBase);
      lg.addColorStop(0.55, colMid);
      lg.addColorStop(1, colTip);

      c.fillStyle=lg;
      c.beginPath();
      c.moveTo(gx-w,gy);
      c.quadraticCurveTo(
        gx+lean*0.45-w*0.5+curl*0.4, gy-h*0.55,
        gx+lean, gy-h
      );
      c.quadraticCurveTo(
        gx+lean*0.55+w*0.5+curl*0.5, gy-h*0.55,
        gx+w, gy
      );
      c.closePath();
      c.fill();

      c.strokeStyle=`hsla(${groupHue},${30}%,${12}%,0.32)`;
      c.lineWidth=0.35*dpr;
      c.beginPath();
      c.moveTo(gx,gy);
      c.quadraticCurveTo(gx+lean*0.5,gy-h*0.55,gx+lean,gy-h);
      c.stroke();

      if(Math.random()<0.25){
        c.strokeStyle=`hsla(${groupHue+30},70%,${75}%,${0.10+Math.random()*0.12})`;
        c.lineWidth=0.4*dpr;
        c.beginPath();
        c.moveTo(gx+lean*0.5, gy-h*0.55);
        c.quadraticCurveTo(gx+lean*0.75, gy-h*0.75, gx+lean*0.9, gy-h*0.92);
        c.stroke();
      }
    }
  }

  for(let g=0;g<22;g++){
    const gx=W*(0.03+Math.random()*0.94);
    const gy=H*(0.88+Math.random()*0.08);
    const n=5+Math.floor(Math.random()*4);
    for(let k=0;k<n;k++){
      const a=(k/n)*Math.PI*2 + Math.random()*0.4;
      const len=(5+Math.random()*11)*dpr;
      const wid=(2.5+Math.random()*2.5)*dpr;
      const hcol=Math.random()<0.35
        ? `rgba(${95+Math.random()*40|0},${70+Math.random()*30|0},${42+Math.random()*20|0},${0.55+Math.random()*0.30})`
        : `rgba(${40+Math.random()*30|0},${90+Math.random()*55|0},${45+Math.random()*35|0},${0.50+Math.random()*0.35})`;
      c.save();
      c.translate(gx,gy);
      c.rotate(a*0.55);
      c.fillStyle=hcol;
      c.beginPath();
      c.moveTo(0,0);
      c.bezierCurveTo(wid,-len*0.35, wid*0.5,-len*0.85, 0,-len);
      c.bezierCurveTo(-wid*0.5,-len*0.85, -wid,-len*0.35, 0,0);
      c.closePath();c.fill();
      c.strokeStyle=`rgba(15,32,18,0.38)`;c.lineWidth=0.4*dpr;
      for(let v=-1;v<=1;v++){
        c.beginPath();
        c.moveTo(0,0);
        c.quadraticCurveTo(v*wid*0.5,-len*0.55, v*wid*0.15,-len*0.95);
        c.stroke();
      }
      c.restore();
    }
  }

  for(let r=0;r<10;r++){
    const rx=W*(0.04+Math.random()*0.92);
    const ry=H*(0.90+Math.random()*0.06);
    const rr=(9+Math.random()*20)*dpr;
    c.fillStyle=`rgba(${28+Math.random()*20|0},${26+Math.random()*16|0},${18+Math.random()*12|0},0.85)`;
    c.beginPath();
    const sides=6+Math.floor(Math.random()*3);
    for(let s=0;s<sides;s++){
      const a=s*Math.PI*2/sides;
      const r2=rr*(0.75+Math.random()*0.35);
      const px=rx+Math.cos(a)*r2, py=ry+Math.sin(a)*r2*0.65;
      if(s===0)c.moveTo(px,py);else c.lineTo(px,py);
    }
    c.closePath();c.fill();
    c.fillStyle=`rgba(180,190,160,0.10)`;
    c.beginPath();c.arc(rx-rr*0.25,ry-rr*0.35,rr*0.42,0,Math.PI*2);c.fill();
    const nF=10+Math.floor(Math.random()*12);
    for(let f=0;f<nF;f++){
      const a=Math.random()*Math.PI*2;
      const rad=Math.random()*rr*0.85;
      const bx=rx+Math.cos(a)*rad;
      const by=ry+Math.sin(a)*rad*0.6 - rr*0.35;
      const len=(2+Math.random()*4)*dpr;
      c.strokeStyle=`rgba(${30+Math.random()*35|0},${75+Math.random()*55|0},${34+Math.random()*30|0},${0.45+Math.random()*0.35})`;
      c.lineWidth=(0.4+Math.random()*0.6)*dpr;
      c.beginPath();
      c.moveTo(bx,by);
      c.quadraticCurveTo(bx+(Math.random()-0.5)*4*dpr,by-len*0.5,bx+(Math.random()-0.5)*5*dpr,by-len);
      c.stroke();
    }
  }

  c.fillStyle='rgba(235,242,235,0.15)';
  c.fillRect(0,0,W,2*dpr);

  const vig=c.createRadialGradient(W*.5,H*.55,W*.12,W*.5,H*.55,W*.85);
  vig.addColorStop(0,'rgba(0,0,0,0)');
  vig.addColorStop(0.72,'rgba(0,0,0,0.12)');
  vig.addColorStop(1,'rgba(0,0,0,0.48)');
  c.fillStyle=vig; c.fillRect(0,0,W,H);

  plants=[];
  for(let i=0;i<20;i++){
    const cx=W*(0.02+i*0.051)+(Math.random()-0.5)*35*dpr;
    const baseY=H*(0.91+Math.random()*0.03);
    const blades=[];
    const bn=5+Math.floor(Math.random()*5);
    for(let b=0;b<bn;b++){
      blades.push({
        ox:(Math.random()-0.5)*32*dpr,
        height:(55+Math.random()*180)*dpr,
        phase:Math.random()*Math.PI*2,
        sway:5+Math.random()*10,
        width:(0.9+Math.random()*2.2)*dpr,
        hue:95+Math.random()*35,
        sat:28+Math.random()*28,
        lig:18+Math.random()*22
      });
    }
    plants.push({x:cx,y:baseY,blades});
  }

  plantsFg=[];
  for(let i=0;i<11;i++){
    const cx=W*(i/10)+(Math.random()-0.5)*35*dpr;
    const baseY=H*(0.99+Math.random()*0.03);
    const blades=[];
    const bn=5+Math.floor(Math.random()*4);
    for(let b=0;b<bn;b++){
      blades.push({
        ox:(Math.random()-0.5)*42*dpr,
        height:(80+Math.random()*170)*dpr,
        phase:Math.random()*Math.PI*2,
        sway:8+Math.random()*13,
        width:(1.5+Math.random()*3.2)*dpr,
        hue:100+Math.random()*32,
        sat:34+Math.random()*26,
        lig:9+Math.random()*12
      });
    }
    plantsFg.push({x:cx,y:baseY,blades});
  }

  motes=[];
  for(let i=0;i<150;i++){
    motes.push({x:Math.random()*W,y:Math.random()*H,r:(.35+Math.random()*1.1)*dpr,vx:(Math.random()-.5)*.04,vy:.008+Math.random()*.035,o:.08+Math.random()*.18,green:Math.random()>.45});
  }
}
function drawPlants(t){ drawPlantsSet(t, plants, 0.8); }
function drawPlantsSet(t, set, alphaMul){
  alphaMul = (alphaMul==null) ? 1 : alphaMul;
  for(const cl of set){
    for(const bl of cl.blades){
      const sway=Math.sin(t*0.6+bl.phase)*bl.sway*dpr;
      const tipX=cl.x+bl.ox+sway, tipY=cl.y-bl.height;
      const midX=cl.x+bl.ox+sway*0.35, midY=cl.y-bl.height*0.55;
     
      const key=alphaMul.toFixed(2), cache=bl._g||(bl._g={});
      let g=cache[key];
      if(!g){
        g=ctx.createLinearGradient(cl.x+bl.ox, cl.y, cl.x+bl.ox, cl.y-bl.height);
        g.addColorStop(0,`hsla(${bl.hue},${bl.sat}%,${bl.lig}%,${0.35*alphaMul})`);
        g.addColorStop(0.6,`hsla(${bl.hue},${bl.sat}%,${bl.lig+8}%,${0.55*alphaMul})`);
        g.addColorStop(1,`hsla(${bl.hue},${bl.sat+10}%,${bl.lig+22}%,${0.85*alphaMul})`);
        cache[key]=g;
      }
      ctx.strokeStyle=g; ctx.lineWidth=bl.width; ctx.lineCap='round';
      ctx.beginPath();
      ctx.moveTo(cl.x+bl.ox,cl.y);
      ctx.quadraticCurveTo(midX,midY,tipX,tipY);
      ctx.stroke();
    }
  }
}
function drawMotes(dt){
  for(const p of motes){
    p.x+=p.vx*dt*60; p.y+=p.vy*dt*60;
    if(p.y>H){ p.y=-5; p.x=Math.random()*W; }
    if(p.x<0) p.x=W; else if(p.x>W) p.x=0;
    ctx.globalAlpha=p.o;
    ctx.fillStyle = p.green ? 'rgba(140,180,120,0.7)' : 'rgba(90,70,40,0.6)';
    ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
  }
  ctx.globalAlpha=1;
}
