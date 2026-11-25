/* DATOLOGO · lib/core.js — utilidades, PRNG con semilla y materiales SVG (reutilizable) */
(function(){
const NS='http://www.w3.org/2000/svg';
function PRNG(seed){let a=seed>>>0;return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
const f1=n=>(+n).toFixed(1);
/* gradiente lineal: lg(id,[[off,color,op?]...],x1,y1,x2,y2) */
function lg(id,stops,x1=0,y1=0,x2=0,y2=1){return `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${stops.map(s=>`<stop offset="${s[0]}" stop-color="${s[1]}"${s[2]!=null?` stop-opacity="${s[2]}"`:''}/>`).join('')}</linearGradient>`;}
function rg(id,stops,cx=.5,cy=.5,r=.5){return `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${stops.map(s=>`<stop offset="${s[0]}" stop-color="${s[1]}"${s[2]!=null?` stop-opacity="${s[2]}"`:''}/>`).join('')}</radialGradient>`;}
const DEFS=[];
function def(s){DEFS.push(s);}
/* ---------- MATERIALES BASE ---------- */
def(`<filter id="fSoft4"><feGaussianBlur stdDeviation="4"/></filter>
<filter id="fSoft8"><feGaussianBlur stdDeviation="8"/></filter>
<filter id="fSoft16"><feGaussianBlur stdDeviation="16"/></filter>
<filter id="fSoft30"><feGaussianBlur stdDeviation="30"/></filter>
<filter id="fGlow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<filter id="fNeon" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6" result="b"/><feGaussianBlur in="SourceGraphic" stdDeviation="18" result="c"/><feMerge><feMergeNode in="c"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<filter id="fWall" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="9" result="n"/><feColorMatrix in="n" type="saturate" values="0" result="m"/><feComponentTransfer in="m" result="s"><feFuncA type="linear" slope="0.10"/></feComponentTransfer><feComposite in="s" in2="SourceGraphic" operator="in" result="si"/><feBlend in="si" in2="SourceGraphic" mode="multiply"/></filter>
<filter id="fWood" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.006 0.12" numOctaves="3" seed="4" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0.2  0 0 0 0 0.1  0 0 0 0 0.05  0 0 0 .5 0" result="g"/><feComposite in="g" in2="SourceGraphic" operator="in" result="gi"/><feBlend in="gi" in2="SourceGraphic" mode="multiply"/></filter>`);
def(lg('mMetal',[[0,'#2c3340'],[.35,'#8d98a8'],[.45,'#eef3fa'],[.55,'#7d8797'],[1,'#232832']],0,0,1,0));
def(lg('mChrome',[[0,'#f4f8ff'],[.45,'#9aa6b8'],[.5,'#3a4250'],[.7,'#c9d3e2'],[1,'#ffffff']]));
def(lg('mGlass',[[0,'#bfe6ff',.18],[.2,'#ffffff',.55],[.32,'#bfe6ff',.12],[1,'#9fd0f0',.25]],0,0,1,0));
def(lg('mWin',[[0,'#9fd8ff'],[.5,'#3f6f9a'],[1,'#1c2c44']]));
def(lg('mTire',[[0,'#3a3a42'],[1,'#0d0d12']]));
def(lg('mPaper',[[0,'#fff8ea'],[1,'#d6c8b2']],0,0,1,1));
def(lg('mBill',[[0,'#bfe3b0'],[.5,'#7fbf7a'],[1,'#3f7f4a']],0,0,1,1));
def(rg('mCoin',[[0,'#fff1a8'],[.55,'#f2c14e'],[1,'#a86a12']],.35,.3,.8));
def(rg('gGlowW',[[0,'#fff3d6',.9],[1,'#fff3d6',0]]));
def(rg('gGlowR',[[0,'#ff3b3b',.95],[1,'#ff3b3b',0]]));
def(rg('gGlowB',[[0,'#3b8cff',.95],[1,'#3b8cff',0]]));
def(rg('gGlowC',[[0,'#5ff3ff',.9],[1,'#5ff3ff',0]]));
def(rg('gGlowP',[[0,'#ff4fd8',.9],[1,'#ff4fd8',0]]));
def(rg('gGlowA',[[0,'#ffb347',.9],[1,'#ffb347',0]]));
def(rg('gShadow',[[0,'#000',.55],[1,'#000',0]]));
def(lg('gFadeB',[[0,'#000',0],[1,'#000',.85]]));
def(lg('gFadeT',[[0,'#000',.85],[1,'#000',0]]));

window.DL={NS,PRNG,f1,lg,rg,def,DEFS};
})();
