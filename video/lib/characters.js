/* DATOLOGO · lib/characters.js — Rig de personaje v3 (SVG articulado, 3/4 hacia la derecha)
   Origen del personaje: pies (0,0). Altura ≈ 640 u. Cada articulación es un <g> cuyo origen local es su pivote,
   así GSAP rota con svgOrigin:"0 0".  makeChar(id, spec) -> string SVG */
(function(){
const {lg,rg,PRNG}=DL;
const P=(id,x,y,inner)=>`<g transform="translate(${x} ${y})"><g id="${id}">${inner}</g></g>`;

function makeChar(id,s){
  s=Object.assign({skin:['#f0b48a','#b77455','#6e3f3c'],hair:['#3a2418','#160c08'],hairStyle:'short',
    top:['#3fb3a6','#174b5a'],top2:null,pants:['#33405e','#141a2c'],shoes:'#f2f2f2',iris:'#5a3a22',
    rim:'#ffd59a',hood:false,glasses:false,beard:false,cap:null,headphones:false,silhouette:false,scale:1,
    sleeve:'long',kid:false},s||{});
  const sil=s.silhouette;
  const SK=sil?'#0d0c14':`url(#${id}_sk)`, TP=sil?'#0d0c14':`url(#${id}_tp)`, PN=sil?'#0a0a10':`url(#${id}_pn)`, HR=sil?'#0b0a10':`url(#${id}_hr)`;
  const rim=s.rim, rimW=sil?5:4, rimO=sil?.95:.75;
  let defs='';
  if(!sil){
    defs+=lg(id+'_sk',[[0,s.skin[0]],[.5,s.skin[1]],[1,s.skin[2]]],1,0,0,.4);
    defs+=lg(id+'_tp',[[0,s.top[0]],[1,s.top[1]]],1,0,0,1);
    defs+=lg(id+'_pn',[[0,s.pants[0]],[1,s.pants[1]]],1,0,0,1);
    defs+=rg(id+'_hr',[[0,s.hair[0]],[1,s.hair[1]]],.7,.25,.9);
  }
  const shoe=`<path d="M-20 128 q-6 26 6 30 h66 q12 -2 9 -16 q-8 -14 -34 -18 z" fill="${sil?'#08080c':s.shoes}"/><path d="M-14 156 h68" stroke="${sil?rim:'#00000055'}" stroke-width="5" opacity="${sil?.6:1}"/>`;
  const thigh=`<path d="M-27 0 Q-32 80 -21 152 L21 152 Q31 80 27 0 Z" fill="${PN}"/><path d="M25 6 Q30 80 20 148" stroke="${rim}" stroke-width="${rimW}" fill="none" opacity="${rimO*.7}"/>`;
  const shin=`<path d="M-21 0 Q-23 70 -17 138 L17 138 Q23 70 21 0 Z" fill="${PN}"/><path d="M-10 30 q10 6 20 0" stroke="#00000033" stroke-width="4" fill="none"/>`+shoe;
  const legB=P(id+'_thB',-22,-300,thigh+P(id+'_shB',0,150,shin));
  const legF=P(id+'_thF',24,-300,thigh+P(id+'_shF',0,150,shin));
  // brazo (manga, antebrazo, mano con dedos)
  const sleeveU=`<path d="M-24 0 Q-28 62 -19 122 L19 122 Q28 62 24 0 Z" fill="${TP}"/><path d="M22 8 Q27 62 18 118" stroke="${rim}" stroke-width="${rimW}" fill="none" opacity="${rimO}"/><path d="M-12 70 q12 8 24 0" stroke="#00000030" stroke-width="4" fill="none"/>`;
  const fore=(s.sleeve==='short'?`<path d="M-15 0 Q-16 55 -12 104 L12 104 Q16 55 15 0 Z" fill="${SK}"/>`:`<path d="M-19 0 Q-19 55 -15 100 L15 100 Q19 55 19 0 Z" fill="${TP}"/><rect x="-16" y="92" width="32" height="12" rx="5" fill="${sil?'#0d0c14':s.top[1]}"/>`)+`<path d="M16 6 Q18 55 13 98" stroke="${rim}" stroke-width="${rimW}" fill="none" opacity="${rimO}"/>`;
  const hand=`<path d="M-14 -2 Q-18 22 -10 38 Q0 46 12 38 Q18 22 14 -2 Z" fill="${SK}"/><path d="M12 6 q14 6 12 20 q-4 6 -10 2" fill="${SK}"/><path d="M-6 26 v14 M1 28 v15 M8 26 v13" stroke="${sil?'#000':'#00000040'}" stroke-width="3" stroke-linecap="round"/>`;
  const arm=(k,x,y)=>P(`${id}_ua${k}`,x,y,sleeveU+P(`${id}_fa${k}`,0,120,fore+P(`${id}_h${k}`,0,102,hand)));
  // cabeza
  let hair='';
  const R=PRNG(id.length*97+7);
  if(s.hairStyle==='short'){hair=`<path d="M-58 -96 Q-68 -172 4 -176 Q74 -176 72 -104 Q64 -134 32 -132 Q2 -146 -28 -128 Q-44 -118 -50 -88 Z" fill="${HR}"/><path d="M-30 -150 q30 -22 70 -6 M-10 -160 q34 -10 60 8" stroke="${sil?rim:'#ffffff33'}" stroke-width="5" fill="none" stroke-linecap="round"/>`;}
  else if(s.hairStyle==='curly'){let c='';for(let i=0;i<46;i++){const a=R()*Math.PI*2,d=Math.sqrt(R());const x=4+Math.cos(a)*66*d,y=-140+Math.sin(a)*40*d-(Math.cos(a)<-.3?0:0);const r=14+R()*12;c+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${HR}"/>`;if(!sil&&R()<.6)c+=`<path d="M${(x-r*.4).toFixed(1)} ${(y-r*.2).toFixed(1)} q${(r*.4).toFixed(1)} ${(-r*.6).toFixed(1)} ${(r*.8).toFixed(1)} 0" stroke="${x>4?'#ffffff40':'#00000040'}" stroke-width="3" fill="none"/>`;}
    hair=`<ellipse cx="2" cy="-132" rx="72" ry="52" fill="${HR}"/>${c}`;}
  else if(s.hairStyle==='afro'){let c='';for(let i=0;i<70;i++){const a=R()*Math.PI*2,d=Math.sqrt(R());const x=4+Math.cos(a)*92*d,y=-150+Math.sin(a)*70*d;if(y>-92&&Math.abs(x)<56)continue;const r=16+R()*13;c+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${HR}"/>`;if(!sil&&R()<.55)c+=`<path d="M${(x-r*.4).toFixed(1)} ${(y-r*.2).toFixed(1)} q${(r*.4).toFixed(1)} ${(-r*.6).toFixed(1)} ${(r*.8).toFixed(1)} 0" stroke="${x>4?'#ffffff45':'#00000045'}" stroke-width="3" fill="none"/>`;}
    hair=`<ellipse cx="4" cy="-150" rx="100" ry="76" fill="${HR}"/>${c}`;} /* v3.1: afro voluminoso (HotSpanish) */
  else if(s.hairStyle==='long'){hair=`<path d="M-62 -90 Q-74 -178 4 -178 Q80 -176 76 -100 L80 -10 Q60 0 50 -30 Q60 -120 20 -132 Q-10 -140 -36 -122 Q-50 -100 -52 -40 Q-60 -10 -76 -20 Z" fill="${HR}"/><path d="M-20 -160 q40 -20 74 0" stroke="#ffffff30" stroke-width="5" fill="none"/>`;}
  else if(s.hairStyle==='bald'){hair=`<path d="M-56 -100 Q-58 -128 -40 -128 M60 -112 q8 4 8 14" stroke="${HR}" stroke-width="10" fill="none"/>`;}
  const hoodBack=s.hood?`<path d="M-86 -60 Q-100 -190 6 -196 Q104 -192 96 -70 Q92 -20 60 0 L-60 0 Q-84 -20 -86 -60 Z" fill="${TP}"/><path d="M90 -120 Q100 -60 70 -10" stroke="${rim}" stroke-width="${rimW}" fill="none" opacity="${rimO}"/>`:'';
  const hoodFront=s.hood?`<path d="M-80 -70 Q-86 -180 6 -184 Q92 -182 88 -80 Q80 -150 8 -158 Q-58 -156 -64 -60 Z" fill="${TP}"/>`:'';
  const face=`<path d="M-52 -95 Q-56 -152 2 -160 Q64 -162 68 -100 Q72 -55 52 -30 Q32 -8 6 -8 Q-32 -10 -47 -44 Q-54 -64 -52 -95 Z" fill="${SK}"/>`+
    `<path d="M66 -100 Q72 -55 52 -30 Q34 -10 10 -8" stroke="${rim}" stroke-width="${rimW}" fill="none" opacity="${rimO}"/>`+
    `<ellipse cx="-50" cy="-80" rx="11" ry="17" fill="${SK}"/><path d="M-52 -88 q-6 8 0 16" stroke="#00000040" stroke-width="3" fill="none"/>`+
    (sil?'':`<ellipse cx="38" cy="-58" rx="14" ry="8" fill="#ff7a73" opacity=".28"/><ellipse cx="-22" cy="-60" rx="10" ry="6" fill="#ff7a73" opacity=".2"/>`+
    `<path d="M46 -88 q12 20 -2 26 q-6 2 -10 -1" stroke="${s.skin[2]}" stroke-width="4" fill="none" stroke-linecap="round"/>`+
    `<g id="${id}_eyes"><ellipse cx="-12" cy="-92" rx="9" ry="10" fill="#fbf7f2"/><ellipse cx="28" cy="-92" rx="12" ry="11" fill="#fbf7f2"/>`+
    `<g id="${id}_iris"><circle cx="-9" cy="-91" r="6.5" fill="${s.iris}"/><circle cx="32" cy="-91" r="7.5" fill="${s.iris}"/><circle cx="-9" cy="-91" r="3.2" fill="#120a08"/><circle cx="32" cy="-91" r="3.6" fill="#120a08"/><circle cx="-6.5" cy="-94" r="2" fill="#fff"/><circle cx="35" cy="-94.5" r="2.4" fill="#fff"/></g>`+
    `<path d="M-22 -100 q10 -8 20 0 M15 -101 q13 -9 26 0" stroke="#3a221a" stroke-width="3" fill="none" opacity=".7"/>`+
    `<g id="${id}_blink" opacity="0"><ellipse cx="-12" cy="-92" rx="10" ry="11" fill="${s.skin[1]}"/><ellipse cx="28" cy="-92" rx="13" ry="12" fill="${s.skin[1]}"/><path d="M-22 -88 q10 5 20 0 M15 -88 q13 5 26 0" stroke="#3a221a" stroke-width="3" fill="none"/></g></g>`+
    `<g id="${id}_brows"><path d="M-24 -112 q10 -7 22 -2" stroke="${s.hair[1]}" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M14 -114 q14 -9 30 -2" stroke="${s.hair[1]}" stroke-width="7" fill="none" stroke-linecap="round"/></g>`+
    `<path id="${id}_mN" d="M14 -40 q14 5 28 -3" stroke="#6a2c2a" stroke-width="5" fill="none" stroke-linecap="round"/>`+
    `<g id="${id}_mO" opacity="0"><path d="M8 -46 q20 2 38 -6 q-2 26 -20 28 q-16 0 -18 -22 z" fill="#4a1414"/><path d="M14 -30 q10 8 22 -2 q-4 10 -12 10 q-8 0 -10 -8z" fill="#e0656a"/><path d="M10 -45 q18 1 34 -5" stroke="#fff" stroke-width="4" fill="none"/></g>`+
    `<g id="${id}_mS" opacity="0"><ellipse cx="26" cy="-36" rx="10" ry="13" fill="#3a1010"/></g>`)+
    (s.beard&&!sil?`<path d="M-44 -48 Q-30 -6 8 -6 Q40 -8 56 -34 Q50 -18 30 -16 Q10 -26 -10 -22 Q-30 -26 -44 -48 Z" fill="${s.hair[1]}" opacity=".85"/>`:'')+
    (s.glasses&&!sil?`<g fill="none" stroke="#151515" stroke-width="5"><rect x="-26" y="-106" width="30" height="26" rx="8"/><rect x="12" y="-108" width="36" height="28" rx="9"/><path d="M4 -94 h8 M-26 -96 l-24 4"/></g><path d="M16 -102 l10 -4" stroke="#ffffff90" stroke-width="3"/>`:'');
  const cap=s.cap?`<path d="M-58 -112 Q-56 -178 6 -180 Q70 -178 70 -116 Z" fill="${s.cap}"/><path d="M40 -120 q50 -4 70 8 q-30 10 -70 4 z" fill="${s.cap}"/><path d="M-50 -120 q60 -16 118 -2" stroke="#00000040" stroke-width="5" fill="none"/>`:'';
  const phones=s.headphones&&!sil?`<path d="M-62 -100 Q-60 -196 6 -196 Q74 -196 76 -110" stroke="#1a1a22" stroke-width="12" fill="none"/><rect x="-74" y="-104" width="26" height="46" rx="10" fill="#222"/>`:'';
  const head=hoodBack+`<rect x="-20" y="-30" width="40" height="40" rx="10" fill="${SK}"/><path d="M-20 -6 q20 14 40 0" stroke="#00000040" stroke-width="6" fill="none"/>`+(s.hairStyle==='long'?'':'')+face+(s.hood?'':hair)+cap+hoodFront+phones;
  const torso=`<path d="M-72 0 Q-84 -110 -80 -192 Q-60 -218 0 -222 Q62 -218 82 -192 Q86 -110 74 0 Z" fill="${TP}"/>`+
    (sil?'':`<path d="M-40 -60 q30 14 70 0 M-50 -130 q20 30 10 70 M30 -170 q10 40 -4 90" stroke="#00000028" stroke-width="5" fill="none"/>`+(s.top2?`<path d="M-30 -214 L0 -150 L30 -214 Z" fill="${s.top2}"/>`:`<path d="M-26 -216 q26 26 52 0" stroke="#00000040" stroke-width="7" fill="none"/>`))+
    `<path d="M80 -188 Q86 -110 72 -4" stroke="${rim}" stroke-width="${rimW+1}" fill="none" opacity="${rimO}"/>`+
    `<path d="M-70 -14 h144" stroke="${sil?'#000':'#00000040'}" stroke-width="10"/>`;
  const sc=s.kid?.82:1;
  return `<defs>${defs}</defs><g id="${id}" transform="scale(${s.scale*sc})">`+
    `<ellipse cx="10" cy="4" rx="110" ry="16" fill="url(#gShadow)" opacity=".8"/>`+
    legB+legF+P(id+'_torso',0,-300,arm('B',-60,-196)+torso+P(id+'_head',0,-222,head)+arm('F',62,-196))+`</g>`;
}
/* ---------- acciones ---------- */
const A={
  blink(tl,id,t){tl.set(`#${id}_blink`,{opacity:1},t).set(`#${id}_blink`,{opacity:0},t+.1);},
  blinks(tl,id,t0,dur,every=2.3){for(let t=t0+.6;t<t0+dur-.2;t+=every)A.blink(tl,id,t);},
  breathe(tl,id,t0,dur){const n=Math.max(1,Math.floor(dur/1.6));tl.to(`#${id}_torso`,{scaleY:1.015,svgOrigin:'0 0',duration:dur/n/2,ease:'sine.inOut',yoyo:true,repeat:n*2-1},t0);},
  mouth(tl,id,k,t){['N','O','S'].forEach(m=>tl.set(`#${id}_m${m}`,{opacity:m===k?1:0},t));},
  look(tl,id,x,y,t,d=.25){tl.to(`#${id}_iris`,{x,y,duration:d,ease:'power2.out'},t);},
  brows(tl,id,y,t,d=.25){tl.to(`#${id}_brows`,{y,duration:d,ease:'power2.out'},t);},
  head(tl,id,rot,t,d=.5,ease='back.out(1.5)'){tl.to(`#${id}_head`,{rotation:rot,svgOrigin:'0 0',duration:d,ease},t);},
  lean(tl,id,rot,t,d=.5,ease='power2.out'){tl.to(`#${id}_torso`,{rotation:rot,svgOrigin:'0 0',duration:d,ease},t);},
  arm(tl,id,k,ua,fa,h,t,d=.45,ease='back.out(1.4)'){
    tl.to(`#${id}_ua${k}`,{rotation:ua,svgOrigin:'0 0',duration:d,ease},t);
    tl.to(`#${id}_fa${k}`,{rotation:fa,svgOrigin:'0 0',duration:d*1.1,ease},t+.04);
    tl.to(`#${id}_h${k}`,{rotation:h,svgOrigin:'0 0',duration:d*1.2,ease},t+.08);},
  setArm(id,k,ua,fa,h){gsap.set(`#${id}_ua${k}`,{rotation:ua,svgOrigin:'0 0'});gsap.set(`#${id}_fa${k}`,{rotation:fa,svgOrigin:'0 0'});gsap.set(`#${id}_h${k}`,{rotation:h,svgOrigin:'0 0'});},
  laugh(tl,id,t,dur){A.mouth(tl,id,'O',t);const n=Math.max(2,Math.floor(dur/.32));tl.to(`#${id}_torso`,{rotation:-3,svgOrigin:'0 0',duration:.16,ease:'sine.inOut',yoyo:true,repeat:n},t);tl.to(`#${id}_head`,{rotation:-10,svgOrigin:'0 0',duration:.3,ease:'back.out(2)'},t);},
  walk(tl,id,t0,dur,step=.42){const n=Math.floor(dur/step);
    for(let i=0;i<n;i++){const t=t0+i*step,sgn=i%2?1:-1;
      tl.to(`#${id}_thF`,{rotation:22*sgn,svgOrigin:'0 0',duration:step,ease:'sine.inOut'},t);
      tl.to(`#${id}_thB`,{rotation:-22*sgn,svgOrigin:'0 0',duration:step,ease:'sine.inOut'},t);
      tl.to(`#${id}_shF`,{rotation:sgn>0?2:24,svgOrigin:'0 0',duration:step,ease:'sine.inOut'},t);
      tl.to(`#${id}_shB`,{rotation:sgn>0?24:2,svgOrigin:'0 0',duration:step,ease:'sine.inOut'},t);
      tl.to(`#${id}_uaF`,{rotation:-18*sgn,svgOrigin:'0 0',duration:step,ease:'sine.inOut'},t);
      tl.to(`#${id}_uaB`,{rotation:18*sgn,svgOrigin:'0 0',duration:step,ease:'sine.inOut'},t);
      tl.to(`#${id}_torso`,{y:-6,duration:step/2,ease:'sine.out',yoyo:true,repeat:1},t);}}
};
window.DLC={makeChar,A};
})();
