/* Episode-isolated timeline. Existing core library remains untouched. */
(()=>{
'use strict';
const total=78.8, fallback=window.ATOMOS_FALLBACK;
const num=v=>typeof v==='number'&&Number.isFinite(v);
function normalize(candidate){
 if(!candidate)return null;
 if(!Array.isArray(candidate)) candidate=candidate.words||candidate.captions||candidate.segments||candidate.tokens;
 if(!Array.isArray(candidate))return null;
 const flat=candidate.flatMap(v=>Array.isArray(v?.words)?v.words:[v]);
 const result=flat.map((v,i)=>{
  if(Array.isArray(v)){if(typeof v[0]==='string')return {word:v[0],start:+v[1],end:+v[2]};if(typeof v[2]==='string')return {word:v[2],start:+v[0],end:+v[1]};}
  return {word:v?.word??v?.text??v?.w??v?.token??fallback[i]?.word,start:Number(v?.start??v?.s??v?.t??v?.time??v?.startTime),end:Number(v?.end??v?.e??v?.endTime??v?.t1)};
 });
 if(result.length!==fallback.length||!result.every(v=>num(v.start)&&typeof v.word==='string'))return null;
 const clean=w=>w.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]/g,'');
 if(result.filter((v,i)=>clean(v.word)===clean(fallback[i].word)).length/result.length<.9)return null;
 if(result[0].start<0||result.at(-1).start>total+1||result.some((v,i)=>i&&v.start<result[i-1].start))return null;
 return result.map((v,i)=>({word:fallback[i].word,start:Math.max(0,Math.min(total-.04,v.start)),end:Math.min(total, num(v.end)&&v.end>v.start?v.end:(result[i+1]?.start??total))}));
}
let candidates=[window.CAPTIONS,window.captions,window.CAPTIONS_WORDS,window.WORDS,window.CAPTION_WORDS,window.captionWords,window.alignedWords];
// Global lexical declarations in existing captions.js, if present.
try { if(typeof CAPTIONS!=='undefined')candidates.push(CAPTIONS); } catch(e){}
try { if(typeof captions!=='undefined')candidates.push(captions); } catch(e){}
try { if(typeof WORDS!=='undefined')candidates.push(WORDS); } catch(e){}
try { if(typeof CAPTION_WORDS!=='undefined')candidates.push(CAPTION_WORDS); } catch(e){}
const words=candidates.map(normalize).find(Boolean)||fallback;
const stage=document.getElementById('stage'),caps=document.getElementById('caps');
if(!stage||!caps||!window.gsap)throw new Error('Datologo: missing stage, caps or local GSAP asset');
const tl=window.gsap.timeline({paused:true,defaults:{ease:'none'}});
const cue=window.ATOMOS_CUES; const raw=window.ATOMOS_SCENES;
if(cue.length!==raw.length)throw new Error('Scene/cue count mismatch');
const scenes=raw.map((markup,i)=>{const el=document.createElement('div');el.className='atom-scene';el.id='atom-scene-'+i;el.innerHTML=markup;stage.appendChild(el);return el;});
window.gsap.set(scenes,{autoAlpha:0});
const times=cue.map((w,i)=>i===0?0:words[w].start);
for(let i=0;i<scenes.length;i++){
 const el=scenes[i],start=times[i],end=times[i+1]??total,dur=Math.max(.03,end-start);
 tl.set(el,{autoAlpha:1},start);
 if(i>0){
  // Vary the motion vocabulary: quick impact, brief dissolve, or direct narrative cut.
  const overlap=(i%5===0||i%7===0)?Math.min(.16,dur*.13):0;
  if(overlap){tl.fromTo(el,{opacity:0},{opacity:1,duration:overlap,immediateRender:false},start);tl.set(scenes[i-1],{autoAlpha:0},start+overlap);}
  else tl.set(scenes[i-1],{autoAlpha:0},start);
 }
 const groups=el.querySelectorAll('[data-motion]');
 groups.forEach((node,j)=>{
  const [x,y,scale,rotation,opacity]=node.getAttribute('data-motion').split(',').map(Number);
  const ease=i===19?'power2.out':i===22?'power1.inOut':j%2?'sine.inOut':'power1.inOut';
  tl.fromTo(node,{x:0,y:0,scale:1,rotation:0,opacity:1,transformOrigin:'50% 50%'},{x,y,scale,rotation,opacity,duration:dur,ease,immediateRender:false},start);
 });
}
// Maximum three words per group; never move subtitles above the lower safe zone.
const groups=[]; let active=[];
for(let i=0;i<words.length;i++){
 const v=words[i];active.push(v);
 const next=words[i+1];const chars=active.map(w=>w.word).join(' ').length;
 if(active.length===3||/[,.!?;:]$/.test(v.word)||!next||next.start-v.end>.24||chars+(next?.word?.length??0)>28){groups.push(active);active=[];}
}
if(active.length)groups.push(active);
caps.style.display='block';
for(let i=0;i<groups.length;i++){
 const grp=groups[i];const wrap=document.createElement('div');wrap.style.cssText='position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:13px;visibility:hidden;white-space:nowrap;';
 const letters=grp.map(w=>w.word).join(' ').length;wrap.style.fontSize=letters>25?'49px':letters>22?'54px':'60px';
 const spans=grp.map(v=>{const s=document.createElement('span');s.textContent=v.word;wrap.appendChild(s);return s;});caps.appendChild(wrap);
 const a=grp[0].start,b=Math.min(total,groups[i+1]?.[0]?.start??grp.at(-1).end,grp.at(-1).end+.22);
 tl.set(wrap,{autoAlpha:1},a);tl.fromTo(wrap,{scale:.94},{scale:1,duration:Math.min(.14,Math.max(.04,b-a)/2),ease:'back.out(1.4)',immediateRender:false},a);
 grp.forEach((v,j)=>{const d=Math.min(.10,Math.max(.04,(v.end-v.start)*.38));tl.fromTo(spans[j],{scale:1},{scale:1.09,duration:d,yoyo:true,repeat:1,ease:'power1.out',immediateRender:false},v.start);});
 tl.set(wrap,{autoAlpha:0},Math.max(a+.015,b));
}
// Fixed root length; no timers, playback calls or infinite loops.
const marker={value:0};tl.to(marker,{value:1,duration:total},0);
window.__timelines=window.__timelines||{};window.__timelines.main=tl;
window.ATOMOS_DIAGNOSTICS={scenes:scenes.length,words:words.length,captionGroups:groups.length,duration:total,source:words===fallback?'estimated':'captions.js'};
})();
