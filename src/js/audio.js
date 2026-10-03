
let actx,master,started=false,analyser,micData,micActive=false;
async function initAudio(){
  if(started) return; started=true;
  try{ actx=new (window.AudioContext||window.webkitAudioContext)(); }catch(e){ return; }
  if(actx.state==='suspended') actx.resume().catch(()=>{});
  master=actx.createGain(); master.gain.value=0; master.connect(actx.destination);
  const o1=actx.createOscillator(); o1.type='sine'; o1.frequency.value=36;
  const o2=actx.createOscillator(); o2.type='sine'; o2.frequency.value=54;
  const og=actx.createGain(); og.gain.value=0.09;
  o1.connect(og); o2.connect(og); og.connect(master); o1.start(); o2.start();
  Ambience.start();
  master.gain.linearRampToValueAtTime(0, actx.currentTime);
  master.gain.linearRampToValueAtTime(0.4, actx.currentTime+4);
  try{
    const s=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:false,noiseSuppression:false,autoGainControl:false}});
    const src=actx.createMediaStreamSource(s);
    analyser=actx.createAnalyser(); analyser.fftSize=1024; analyser.smoothingTimeConstant=0.7;
    src.connect(analyser);
    const sil=actx.createGain(); sil.gain.value=0;
    analyser.connect(sil); sil.connect(actx.destination);
    micData=new Uint8Array(analyser.frequencyBinCount);
    micActive=true;
  }catch(e){}
}
function readMic(){
  if(!micActive)return;
  analyser.getByteFrequencyData(micData);
  const N=micData.length;
  let total=0,bass=0,mid=0,high=0;
  for(let i=1;i<N;i++){
    const v=micData[i]/255;
    total+=v;
    if(i<N*.12)bass+=v;
    else if(i<N*.45)mid+=v;
    else high+=v;
  }
  let e=(total/(N-1));
  e=Math.max(0,e-.022)*1.55;
  const a=.50,r=.12;
  for(const f of allBettas()){
    if(e>f.micLevel)f.micLevel+=(e-f.micLevel)*a;
    else f.micLevel+=(e-f.micLevel)*r;
    const d=e-f.micPrev;f.micPrev=e;f.micDeriv=f.micDeriv*.70+Math.max(0,d)*.30;
    f.micBass=(f.micBass||0)*.8+(bass/Math.max(1,N*.12))*.2;
    f.micMid=(f.micMid||0)*.8+(mid/Math.max(1,N*.33))*.2;
    f.micHigh=(f.micHigh||0)*.8+(high/Math.max(1,N*.55))*.2;
  }
}
function bubbleSnd(i=1,p=1){
  if(!actx) return;
  const n=actx.currentTime;
  const o=actx.createOscillator(); o.type='sine';
  o.frequency.setValueAtTime(190*p,n);
  o.frequency.exponentialRampToValueAtTime(40*p,n+0.32*i);
  const g=actx.createGain();
  g.gain.setValueAtTime(0,n);
  g.gain.linearRampToValueAtTime(0.20*i,n+0.02);
  g.gain.exponentialRampToValueAtTime(0.001,n+0.55*i);
  const bp=actx.createBiquadFilter(); bp.type='bandpass';
  bp.frequency.value=900*p; bp.Q.value=7;
  o.connect(bp); bp.connect(g); g.connect(master);
  o.start(n); o.stop(n+0.75);
}
function bubblePop(){
  if(!actx) return;
  const n=actx.currentTime;
  const o=actx.createOscillator(); o.type='sine';
  o.frequency.setValueAtTime(600+Math.random()*300,n);
  o.frequency.exponentialRampToValueAtTime(1200,n+0.05);
  const g=actx.createGain();
  g.gain.setValueAtTime(0.08,n);
  g.gain.exponentialRampToValueAtTime(0.001,n+0.08);
  o.connect(g); g.connect(master);
  o.start(n); o.stop(n+0.1);
}

