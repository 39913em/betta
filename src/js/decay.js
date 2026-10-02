
const Decay=(()=>{
  const N=18, HIT_MS=90, R=26;
  let seed=20260930; const rnd=()=>(seed=(seed*1664525+1013904223)>>>0)/4294967296;
  const KINDS=[['residuo',1],['malesa',3],['moho',5]];
  const items=Array.from({length:N},(_,i)=>{
    const [kind,need]=KINDS[i%3];
    return { nx:.06+rnd()*.88, ny:.93+rnd()*.05, kind, need, hits:0, last:0, ph:rnd()*6.28 };
  });
  const count=()=>Math.round(Persist.dirt()*N);

  function drawItem(it,t){
    const x=it.nx*W, y=it.ny*H, k=1-it.hits/it.need*0.7;           
    ctx.save(); ctx.globalAlpha=k;
    if(it.kind==='residuo'){
      ctx.fillStyle='rgba(95,72,45,.9)';
      for(let j=0;j<3;j++){ ctx.beginPath(); ctx.ellipse(x+j*5*dpr,y+(j%2)*2*dpr,(3.5-j*.6)*dpr,(2.2)*dpr,0,0,6.3); ctx.fill(); }
    }else if(it.kind==='malesa'){
      ctx.strokeStyle='rgba(28,78,34,.92)'; ctx.lineWidth=2.4*dpr; ctx.lineCap='round';
      for(let j=-2;j<=2;j++){
        const sw=Math.sin(t*1.1+it.ph+j)*7*dpr, h=(38+Math.abs(j)*-6+10)*dpr;
        ctx.beginPath(); ctx.moveTo(x+j*4*dpr,y); ctx.quadraticCurveTo(x+j*6*dpr+sw*.5,y-h*.55,x+j*8*dpr+sw,y-h); ctx.stroke();
      }
    }else{
      const g=ctx.createRadialGradient(x,y,0,x,y,22*dpr);
      g.addColorStop(0,'rgba(222,226,210,.65)'); g.addColorStop(.5,'rgba(150,165,140,.35)'); g.addColorStop(1,'rgba(150,165,140,0)');
      ctx.fillStyle=g; ctx.beginPath(); ctx.arc(x,y,22*dpr,0,6.3); ctx.fill();
      ctx.fillStyle='rgba(38,52,34,.65)';
      for(let j=0;j<4;j++){ ctx.beginPath(); ctx.arc(x+Math.cos(it.ph+j*1.6)*8*dpr,y+Math.sin(it.ph+j*1.6)*4*dpr,2.4*dpr,0,6.3); ctx.fill(); }
    }
    ctx.restore();
  }
  function draw(t){
    const d=Persist.dirt(); if(d<=0.01) return;
    ctx.fillStyle=`rgba(46,96,40,${(d*0.26).toFixed(3)})`; ctx.fillRect(0,0,W,H);            
    const g=ctx.createLinearGradient(0,H*.78,0,
    g.addColorStop(0,'rgba(40,86,34,0)'); g.addColorStop(1,`rgba(40,86,34,${(d*.5).toFixed(3)})`);
    ctx.fillStyle=g; ctx.fillRect(0,H*.78,W,H*.22);
    const T=count(); for(let i=0;i<T;i++) drawItem(items[i],t);
  }
  function scrub(px,py){
    if(!Net.canFeed()) return false;
    const T=count(), now=performance.now(); let did=false;
    for(let i=0;i<T;i++){
      const it=items[i];
      if(Math.hypot(px-it.nx*W,py-it.ny*H)>R*dpr || now-it.last<HIT_MS) continue;
      it.last=now; it.hits++; did=true;
      if(it.hits>=it.need){
        it.hits=0; items[i]=items[T-1]; items[T-1]=it;     
        Persist.reduceDirt(1/N); break;
      }
    }
    return did;
  }
  return { draw, scrub };
})();
