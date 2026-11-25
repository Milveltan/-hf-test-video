/* DATOLOGO · lib/kit.js — helpers de composición de escenas (reutilizable)
   N(id,x,y,s,inner,r)   grupo animable: transform estático afuera, id adentro (GSAP anima el id sin perder la posición). s<0 = espejo horizontal
   T(x,y,txt,{s,c,w,a,ls,id,f,op})  texto DatoSans
   addToGroup(svg,gid,content)      mete contenido dentro de un grupo ya generado (p. ej. un objeto en la mano: 'ju_hF')
   sky(id,stops) / floorG(id,stops,y)  fondos con degradado
   light(x,y,rx,ry,glowId,op,id)    charco/halo de luz (gGlowW/R/B/C/P/A)
   beam(x,y,w,l,ang,color,op,id)    haz de luz cónico */
(function(){
const {lg,def}=DL;
const N=(id,x,y,s,inner,r=0)=>`<g transform="translate(${x} ${y}) scale(${s<0?`${s} ${-s}`:s})${r?` rotate(${r})`:''}"><g id="${id}">${inner}</g></g>`;
const T=(x,y,txt,o={})=>`<text x="${x}" y="${y}" font-family="DatoSans" font-weight="${o.w||900}" font-size="${o.s||60}" fill="${o.c||'#fff'}" text-anchor="${o.a||'middle'}" letter-spacing="${o.ls||0}"${o.id?` id="${o.id}"`:''}${o.f?` filter="url(#${o.f})"`:''}${o.op!=null?` opacity="${o.op}"`:''}>${txt}</text>`;
function addToGroup(svg,gid,content){const i=svg.indexOf(`<g id="${gid}">`);if(i<0)return svg;let d=0,j=i;for(;j<svg.length;j++){if(svg.startsWith('<g',j))d++;else if(svg.startsWith('</g>',j)){d--;if(d===0)break;}}return svg.slice(0,j)+content+svg.slice(j);}
const sky=(id,stops)=>{def(lg(id,stops));return `<rect x="-100" y="-100" width="1280" height="2120" fill="url(#${id})"/>`;};
const floorG=(id,stops,y)=>{def(lg(id,stops));return `<rect x="-100" y="${y}" width="1280" height="${2020-y}" fill="url(#${id})"/>`;};
const light=(x,y,rx,ry,g,op=1,id)=>`<ellipse${id?` id="${id}"`:''} cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="url(#${g})" opacity="${op}"/>`;
const beam=(x,y,w,l,ang,c,op=.25,id)=>{const gid='bm'+Math.round(x+y+w+l);def(lg(gid,[[0,c,op],[1,c,0]]));return `<path${id?` id="${id}"`:''} d="M${x-w*.15} ${y} L${x+w*.15} ${y} L${x+w/2} ${y+l} L${x-w/2} ${y+l} Z" fill="url(#${gid})" transform="rotate(${ang} ${x} ${y})"/>`;};
window.DLK={N,T,addToGroup,sky,floorG,light,beam};
})();
