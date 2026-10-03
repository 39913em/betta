const Ambience=(()=>{
  const MUTE_KEY='betta.mute';
  let out,above,below,rainGain,reeds,subFilter,murk,running=false;
  let muted=false;
  try{muted=localStorage.getItem(MUTE_KEY)==='1';}catch(e){}

  const filter=(type,freq,q=.7)=>{
    const f=actx.createBiquadFilter();
    f.type=type;
    f.frequency.value=freq;
    f.Q.value=q;
    return f;
  };
  const gain=v=>{
    const g=actx.createGain();
    g.gain.value=v;
    return g;
  };
  const noise=()=>{
    const buffer=actx.createBuffer(1,actx.sampleRate*3,actx.sampleRate),data=buffer.getChannelData(0);
    let last=0;
    for(let i=0;i<data.length;i++){
      const w=Math.random()*2-1;
      last=(last+.02*w)/1.02;
      data[i]=last*3.5+w*.15;
    }
    return buffer;
  };
  const layer=(buffer,nodes,dest)=>{
    const src=actx.createBufferSource();
    src.buffer=buffer;
    src.loop=true;
    let node=src;
    for(const n of nodes){node.connect(n);node=n;}
    node.connect(dest);
    src.start();
  };
  const night=()=>{
    const h=new Date().getHours();
    return h>=19||h<6;
  };
  const glide=(param,value,seconds=1.5)=>param.setTargetAtTime(value,actx.currentTime,seconds);

  function drop(dest){
    const t=actx.currentTime,o=actx.createOscillator(),g=gain(0);
    o.type='sine';
    o.frequency.setValueAtTime(700+Math.random()*1300,t);
    o.frequency.exponentialRampToValueAtTime(280,t+.07);
    g.gain.setValueAtTime(.035*Math.random()+.01,t);
    g.gain.exponentialRampToValueAtTime(.0005,t+.09);
    o.connect(g);
    g.connect(dest);
    o.start(t);
    o.stop(t+.12);
  }

  function croak(health){
    const t=actx.currentTime,pulses=2+Math.floor(Math.random()*3),base=150+Math.random()*90;
    const bp=filter('bandpass',620+Math.random()*200,2.2);
    bp.connect(above);
    for(let i=0;i<pulses;i++){
      const o=actx.createOscillator(),g=gain(0),s=t+i*.085;
      o.type='sawtooth';
      o.frequency.setValueAtTime(base,s);
      o.frequency.linearRampToValueAtTime(base*.8,s+.07);
      g.gain.setValueAtTime(0,s);
      g.gain.linearRampToValueAtTime(.05*health,s+.015);
      g.gain.exponentialRampToValueAtTime(.0005,s+.075);
      o.connect(g);
      g.connect(bp);
      o.start(s);
      o.stop(s+.09);
    }
  }

  function peep(health){
    const t=actx.currentTime,o=actx.createOscillator(),g=gain(0),f=2300+Math.random()*500;
    o.type='sine';
    o.frequency.setValueAtTime(f,t);
    o.frequency.linearRampToValueAtTime(f*1.12,t+.09);
    g.gain.setValueAtTime(0,t);
    g.gain.linearRampToValueAtTime(.018*health,t+.02);
    g.gain.exponentialRampToValueAtTime(.0005,t+.12);
    o.connect(g);
    g.connect(above);
    o.start(t);
    o.stop(t+.14);
  }

  function cricket(health){
    const t=actx.currentTime;
    for(let i=0;i<3;i++){
      const o=actx.createOscillator(),g=gain(0),s=t+i*.07;
      o.type='sine';
      o.frequency.value=4200+Math.random()*200;
      g.gain.setValueAtTime(0,s);
      g.gain.linearRampToValueAtTime(.008*health,s+.01);
      g.gain.exponentialRampToValueAtTime(.0003,s+.05);
      o.connect(g);
      g.connect(above);
      o.start(s);
      o.stop(s+.06);
    }
  }

  function fly(p){
    const t=actx.currentTime,o=actx.createOscillator(),g=gain(0),bp=filter('bandpass',320,1.4);
    o.type='sawtooth';
    o.frequency.setValueAtTime(150,t);
    for(let i=1;i<8;i++)o.frequency.linearRampToValueAtTime(130+Math.random()*60,t+i*.09);
    g.gain.setValueAtTime(0,t);
    g.gain.linearRampToValueAtTime(.007*p,t+.1);
    g.gain.linearRampToValueAtTime(0,t+.7);
    o.connect(bp);
    bp.connect(g);
    g.connect(above);
    o.start(t);
    o.stop(t+.75);
  }

  function step(){
    if(!actx||muted)return;
    const now=Date.now(),phase=.5+.5*Math.sin(now/7000);
    const pollution=Care.pollution(Persist.dirt());
    const health=1-pollution;
    const dark=night();
    glide(above.gain,.25+.75*phase);
    glide(below.gain,.25+.75*(1-phase));
    glide(rainGain.gain,.07+.04*Math.sin(now/13000));
    glide(reeds.gain,.03+.025*Math.sin(now/9000+1));
    glide(subFilter.frequency,220+120*Math.sin(now/5000),2);
    glide(murk.frequency,16000-13000*pollution,2);
    if(Math.random()<.55)drop(above);
    if(Math.random()<.22*(1-phase)&&typeof bubbleSnd==='function')bubbleSnd(.35,.7+Math.random()*.6);
    if(Math.random()<.05*health*(dark?1.6:.7)*(.3+phase))croak(health);
    if(dark&&Math.random()<.08*health)peep(health);
    if(dark&&Math.random()<.2*health)cricket(health);
    if(pollution>.55&&Math.random()<.12*pollution)fly(pollution);
  }

  function start(){
    if(running||!actx)return;
    running=true;
    const buffer=noise();
    murk=filter('lowpass',16000,.5);
    out=gain(0);
    murk.connect(out);
    out.connect(master);
    above=gain(.5);
    below=gain(.5);
    above.connect(murk);
    below.connect(murk);
    rainGain=gain(.08);
    layer(buffer,[filter('highpass',900),filter('lowpass',6500),rainGain],above);
    reeds=gain(.04);
    layer(buffer,[filter('bandpass',520,.8),reeds],above);
    subFilter=filter('lowpass',260);
    layer(buffer,[subFilter,filter('lowpass',700),gain(.16)],below);
    glide(out.gain,muted?0:.9,5);
    setInterval(step,400);
  }

  function toggle(){
    muted=!muted;
    try{localStorage.setItem(MUTE_KEY,muted?'1':'0');}catch(e){}
    if(!running)initAudio();
    else glide(out.gain,muted?0:.9,.4);
    label();
  }

  let link;
  function label(){
    if(link)link.textContent=muted?'Sonido: no':'Sonido: sí';
  }

  const nav=document.getElementById('foot2');
  if(nav){
    link=document.createElement('a');
    link.href='#';
    link.addEventListener('click',e=>{e.preventDefault();toggle();});
    nav.append(' · ',link);
    label();
  }

  return {start};
})();
