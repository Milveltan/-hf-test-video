/* DATOLOGO · lib/engine.js — motor común de todos los videos (NO duplicar en index.html)
   Lee: window.WORDS (captions.js), window.SCENES (scenes.js), window.EPISODE_KEYWORDS, data-duration de #main.
   Hace: escenas por capas bg/mid/fg, cámara con paralaje (scene.cam), transiciones (scene.tr: fade|cut|flash|whip|glitch|zoom|wipe),
         títulos narrativos (scene.title / titleAt), grano animado, SHAKE(), subtítulos palabra por palabra (máx. 3 por grupo).
   Formato: marco de escena = data-width × data-height de #main (sobrebarrido de 80 u por lado).
   Expone: WT(i) = inicio real de la palabra i · SHAKE(_,t,dur,amp) · window.__timelines.main */
(function(){
const W=window.WORDS, S=window.SCENES, MAIN=document.getElementById('main'), DUR=+MAIN.dataset.duration;
/* formato variable (v2): lee data-width/data-height de #main · 1080x1920 (9:16) o 1080x1080 (1:1) */
const MW=+MAIN.dataset.width||1080, MH=+MAIN.dataset.height||1920; window.FRAME={w:MW,h:MH};
window.WT=i=>W[Math.max(0,Math.min(i,W.length-1))].s;
const tl=gsap.timeline({paused:true});
window.__timelines=window.__timelines||{};window.__timelines.main=tl;
/* ---- sacudida de cámara determinista ---- */
const stage=document.getElementById('stage');
window.SHAKE=(t,t0,dur,amp)=>{const n=Math.max(3,Math.round(dur/.04));for(let i=0;i<n;i++){const k=1-i/n,a=amp*k;tl.to('#stage',{x:(i%2?1:-1)*a*(.6+((i*37)%10)/25),y:((i*53)%3-1)*a*.7,rotation:(i%2?.4:-.4)*k,duration:.04,ease:'none'},t0+i*.04);}tl.to('#stage',{x:0,y:0,rotation:0,duration:.08},t0+n*.04);};
/* ---- construir escenas ---- */
const times=S.map((s,i)=>i===0?0:Math.max(0,WT(s.w)-0.06));
let html='';
S.forEach((s,i)=>{
  const lay=['bg','mid','fg'].map(L=>`<div class="L" id="${s.k}_${L}"><svg viewBox="-80 -80 ${MW+160} ${MH+160}" xmlns="http://www.w3.org/2000/svg">${s[L]?s[L]():''}</svg></div>`).join('');
  html+=`<div class="sc" id="sc_${s.k}">${lay}</div>`;
});
stage.innerHTML=html;
/* ---- cámara por capas (paralaje) ---- */
const F={bg:{p:.45,s:.55},mid:{p:1,s:1},fg:{p:1.7,s:1.45}};
function cam(s,t0,d){const c=Object.assign({x:[0,0],y:[0,0],s:[1.08,1.14],r:[0,0],ease:'sine.inOut'},s.cam||{});
  ['bg','mid','fg'].forEach(L=>{const f=F[L];
    tl.fromTo(`#${s.k}_${L}`,{x:c.x[0]*f.p,y:c.y[0]*f.p,scale:1+(c.s[0]-1)*f.s,rotation:c.r[0]*f.p},{x:c.x[1]*f.p,y:c.y[1]*f.p,scale:1+(c.s[1]-1)*f.s,rotation:c.r[1]*f.p,duration:d,ease:c.ease,immediateRender:false},t0);});}
/* ---- transiciones ---- */
function trans(type,cur,prev,t){
  const c=`#sc_${cur}`, p=prev?`#sc_${prev}`:null;
  tl.set(c,{autoAlpha:1},t);
  let hold=.02;
  if(type==='flash'){tl.fromTo('#flash',{opacity:0},{opacity:.95,duration:.06,ease:'none',immediateRender:false},t-.06).to('#flash',{opacity:0,duration:.35,ease:'power2.out'},t);}
  else if(type==='whip'){hold=.3;tl.fromTo(c,{x:900},{x:0,duration:.32,ease:'power3.out',immediateRender:false},t);if(p)tl.to(p,{x:-900,duration:.32,ease:'power3.out'},t);tl.fromTo('#streak',{opacity:0},{opacity:1,duration:.1,yoyo:true,repeat:1,immediateRender:false},t);}
  else if(type==='glitch'){hold=.22;for(let i=0;i<5;i++){tl.set('#gbars',{opacity:.55,y:(i%2?60:-40)},t+i*.045).set('#gbars',{opacity:0},t+i*.045+.03);tl.set(c,{x:(i%2?-24:24)},t+i*.045);}tl.set(c,{x:0},t+.24);}
  else if(type==='zoom'){hold=.35;tl.fromTo(c,{scale:1.3,opacity:0},{scale:1,opacity:1,duration:.38,ease:'power3.out',immediateRender:false},t);}
  else if(type==='fade'){hold=.45;tl.fromTo(c,{opacity:0},{opacity:1,duration:.45,ease:'power1.inOut',immediateRender:false},t);}
  else if(type==='wipe'){hold=.4;tl.fromTo(c,{clipPath:'inset(0% 0% 0% 100%)'},{clipPath:'inset(0% 0% 0% 0%)',duration:.4,ease:'power3.inOut',immediateRender:false},t);}
  if(p){tl.set(p,{autoAlpha:0},t+hold);}
}
S.forEach((s,i)=>{
  const t0=times[i], t1=i<S.length-1?times[i+1]:DUR, d=t1-t0;
  trans(i===0?'none':s.tr,s.k,i?S[i-1].k:null,t0);
  cam(s,t0,d+.4);
  if(s.anim)s.anim(tl,t0,d);
  if(s.title){const tt=s.titleAt!=null?WT(s.titleAt)-.1:t0+.25;
    tl.call(()=>{},[],tt); // marcador
    tl.set('#titleT',{textContent:s.title},tt);
    tl.fromTo('#title',{opacity:0,y:-30},{opacity:1,y:0,duration:.35,ease:'back.out(2)',immediateRender:false},tt);
    tl.fromTo('#titleBar',{width:0},{width:360,duration:.5,ease:'power3.out',immediateRender:false},tt+.1);
    if(i<S.length-1)tl.to('#title',{opacity:0,y:-20,duration:.3},Math.min(tt+2.2,t1-.1));}
});
tl.to('#black',{opacity:0,duration:.35},0);
/* ---- defs compartidos (materiales) ---- */
const defsSvg=document.createElementNS(DL.NS,'svg');defsSvg.setAttribute('width','0');defsSvg.setAttribute('height','0');defsSvg.style.position='absolute';
defsSvg.innerHTML='<defs>'+DL.DEFS.join('')+'</defs>';document.getElementById('main').prepend(defsSvg);
/* ---- grano animado ---- */
for(let t=0,k=0;t<DUR;t+=.1,k++)tl.set('#grain',{x:((k*37)%60)-30,y:((k*53)%60)-30},t);
/* ---- subtítulos palabra por palabra ---- */
const KEY=new Set(window.EPISODE_KEYWORDS||[]);
const norm=s=>s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]/g,'');
const groups=[];let g=[];
W.forEach((w,i)=>{g.push(i);const brk=/[.,?:;…!]$/.test(w.t)||g.length>=3;const gap=i<W.length-1&&W[i+1].s-w.e>.35;if(brk||gap){groups.push(g);g=[];}});
if(g.length)groups.push(g);
const caps=document.getElementById('caps');
caps.innerHTML=groups.map((G,gi)=>`<div class="cg" id="cg${gi}">${G.map(i=>`<span class="w" id="w${i}">${W[i].t}</span>`).join(' ')}</div>`).join('');
groups.forEach((G,gi)=>{
  const s=W[G[0]].s-.05, last=W[G[G.length-1]].e, nx=gi<groups.length-1?W[groups[gi+1][0]].s-.05:DUR;
  const e=Math.min(nx,last+.6);
  tl.fromTo('#cg'+gi,{opacity:0,y:26,scale:.9},{opacity:1,y:0,scale:1,duration:.14,ease:'back.out(2.4)',immediateRender:false},s);
  tl.set('#cg'+gi,{opacity:0},e);
  G.forEach(i=>{const k=KEY.has(norm(W[i].t));
    tl.set('#w'+i,{color:'#ffe14f',scale:1.08},W[i].s);
    tl.set('#w'+i,{color:k?'#5ff3ff':'#ffffff',scale:1},Math.min(W[i].e+.02,i<W.length-1?W[i+1].s:W[i].e+.2));});
});
tl.set({},{},DUR);
})();
