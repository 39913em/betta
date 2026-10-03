const Care=(()=>{
  const HOUR=3600e3;
  const clamp=(v,a=0,b=100)=>Math.max(a,Math.min(b,v));
  const state=()=>Persist.state();
  const taps=[];
  let recentFeeds=0,lastCaress=0,lastSave=0;

  const ACTIONS={
    refresh:{label:'Cambio de agua',hint:'Limpia buena parte del bioma. El pez lo paga con estrés.',wait:4*HOUR,run:()=>{Persist.reduceDirt(.45);apply(15,0,'good');}},
    chemical:{label:'Tratamiento químico',hint:'Agua limpia al instante. El pez no lo olvida.',wait:12*HOUR,run:()=>{Persist.reduceDirt(1);apply(22,-12,'bad');}},
    live:{label:'Artemia viva',hint:'Compra su cariño. Ensucia el fondo.',wait:20*60e3,run:()=>{Persist.addDirt(.07);apply(-5,8,'good');for(let i=0;i<6;i++)spawnArtemia();}},
    provoke:{label:'Golpear el cristal',hint:'Reacciona, y tú decides cuánto te importa.',wait:2*60e3,run:()=>{apply(14,-4,'bad');shock();}}
  };

  function shock(){
    if(typeof betta!=='undefined'&&betta)betta.startSStart();
  }

  function apply(stress,bond,kind){
    const s=state();
    s.stress=clamp(s.stress+stress);
    s.bond=clamp(s.bond+bond);
    if(kind==='good')s.good++;
    else if(kind==='bad')s.bad++;
    Persist.save();
    Net.publish();
  }

  function act(key){
    const a=ACTIONS[key],s=state();
    if(!a||!Net.canFeed())return {ok:false,msg:'No disponible.'};
    const left=(s.cd[key]||0)+a.wait-Date.now();
    if(left>0)return {ok:false,msg:'Aún no.'};
    s.cd[key]=Date.now();
    a.run();
    return {ok:true,msg:a.label+': hecho.'};
  }

  function actions(){
    const s=state(),now=Date.now();
    return Object.keys(ACTIONS).map(key=>({key,label:ACTIONS[key].label,hint:ACTIONS[key].hint,left:(s.cd[key]||0)+ACTIONS[key].wait-now}));
  }

  function onFeed(){
    const s=state();
    recentFeeds++;
    if(recentFeeds>3){
      Persist.addDirt(.03);
      s.bad++;
      s.stress=clamp(s.stress+2);
    }else{
      s.good++;
      s.bond=clamp(s.bond+1.5);
    }
    Persist.save();
  }

  function tap(){
    if(!Net.canFeed())return;
    const s=state(),now=performance.now();
    taps.push(now);
    while(taps.length&&now-taps[0]>1400)taps.shift();
    if(taps.length>=4){
      taps.length=0;
      apply(9,-3,'bad');
      shock();
    }else if(now-lastCaress>2000){
      lastCaress=now;
      s.bond=clamp(s.bond+.6);
      s.stress=clamp(s.stress-.4);
    }
  }

  function tick(dt){
    if(!Net.canFeed())return;
    const s=state(),dirt=Persist.dirt();
    const over=clamp((recentFeeds-3)/5,0,1);
    const target=12+dirt*58+over*24;
    s.stress=clamp(s.stress+(target-s.stress)*Math.min(1,dt*.04));
    if(!document.hidden)s.bond=clamp(s.bond+dt*.018*(1-s.stress/100));
    recentFeeds*=Math.exp(-dt/600);
    lastSave+=dt;
    if(lastSave>20){
      lastSave=0;
      s.seen=Date.now();
      Persist.save();
      Net.publish();
    }
  }

  function settle(){
    const s=state(),days=Math.min(14,(Date.now()-(s.seen||Date.now()))/864e5);
    s.bond=clamp(s.bond-days*7);
    s.seen=Date.now();
    Persist.save();
  }

  function pollution(dirt){
    return clamp(dirt*.75+Net.waterLevel()*.25,0,1);
  }

  function biomeLabel(p){
    if(p<.15)return 'Óptimo';
    if(p<.35)return 'Estable';
    if(p<.6)return 'Turbio';
    if(p<.85)return 'Contaminado';
    return 'Crítico';
  }

  function conductLabel(good,bad){
    const total=good+bad;
    if(total<6)return 'Sin definir';
    const r=bad/total;
    if(r<.15)return 'Cuidador';
    if(r<.4)return 'Pragmático';
    if(r<.7)return 'Oportunista';
    return 'Depredador';
  }

  function setName(value){
    const clean=String(value||'').replace(/[^\p{L}\p{N} ]/gu,'').trim().slice(0,16);
    state().name=clean;
    Persist.save();
    Net.publish(true);
    return clean;
  }

  function snapshot(){
    const s=state();
    return {name:s.name,stress:s.stress,bond:s.bond,good:s.good,bad:s.bad,dirt:Persist.dirt(),sex:s.sex==='female'?'♀':'♂',t:Date.now()};
  }

  return {
    act,actions,onFeed,tap,tick,settle,setName,snapshot,pollution,biomeLabel,conductLabel,
    stress:()=>state().stress/100,
    bond:()=>state().bond/100,
    name:()=>state().name
  };
})();
