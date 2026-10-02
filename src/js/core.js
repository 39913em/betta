const canvas=document.getElementById('c'), ctx=canvas.getContext('2d');
let W,H,dpr;

const CFG = {
  ARTEMIA_TO_NEST: 500,
  ARTEMIA_TO_GROW: 500,
  ARTEMIA_MAX: 42,
  ARTEMIA_SPAWN_DT: 0.7,
  HATCH_DELAY: 10,
  NEST_BUBBLES: 40,
  NEST_BUILD_DT: 0.35,
};

const SWIM_BAND = { topFrac: 0.08, botFrac: 0.93 };
const WATER_FLOOR_FRAC = 0.91;
const DEPTH_MIN=1, DEPTH_MAX=5;
const MAX_BETTAS = 5;
const BIRTH_VARIANTS = ['original','superDelta','halfmoon','roseTail','crowntail'];
let reproductionComplete = false;
let createdBettas = 1;
let grownBettas = 1;

function resize(){
  dpr=Math.min(devicePixelRatio||1,1.8);
  W=canvas.width=innerWidth*dpr;
  H=canvas.height=innerHeight*dpr;
  canvas.style.width=innerWidth+'px';
  canvas.style.height=innerHeight+'px';
  buildSwamp();
}

