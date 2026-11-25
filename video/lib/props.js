/* DATOLOGO · lib/props.js — vehículos, ciudades, paisajes y utilería en vector 2.5D (reutilizable) */
(function(){
const {lg,rg,PRNG,def}=DL;
const R2=n=>Math.round(n*10)/10;

/* ---------------- VEHÍCULOS ---------------- */
/* Auto de perfil hacia la derecha. Origen: suelo, centro. Largo ≈ 520 u */
function car(id,o){
  o=Object.assign({c1:'#e8504a',c2:'#7a1420',type:'sedan',police:false,lights:true,rim:'#ffd9a0'},o||{});
  if(o.police){o.c1='#f4f6fa';o.c2='#9aa3b5';}
  const g=lg(id+'_b',[[0,o.c1],[.55,o.c2],[1,'#14141c']]);
  const body=o.type==='sport'
   ? 'M-262 -34 Q-264 -70 -236 -80 L-120 -92 Q-60 -146 10 -150 L70 -150 Q130 -146 178 -96 L240 -86 Q266 -80 264 -46 L260 -28 Q256 -18 242 -18 L-248 -18 Q-262 -20 -262 -34 Z'
   : 'M-260 -40 Q-262 -92 -230 -102 L-150 -110 Q-110 -172 -40 -178 L60 -178 Q122 -174 162 -112 L236 -102 Q262 -96 262 -52 L258 -30 Q255 -18 240 -18 L-245 -18 Q-260 -20 -260 -40 Z';
  const win=o.type==='sport'
   ? 'M-104 -94 Q-56 -136 8 -138 L66 -138 Q112 -134 150 -96 Z'
   : 'M-132 -112 Q-98 -162 -40 -166 L52 -166 Q102 -162 140 -112 Z';
  const wheel=(x,k)=>`<g transform="translate(${x} -40)"><circle r="48" fill="url(#mTire)"/><g id="${id}_w${k}"><circle r="30" fill="url(#mChrome)"/>${[0,60,120].map(a=>`<rect x="-4" y="-28" width="8" height="56" rx="3" fill="#59606e" transform="rotate(${a})"/>`).join('')}<circle r="9" fill="#2a2e38"/></g><path d="M-30 -36 a48 48 0 0 1 60 0" stroke="#ffffff22" stroke-width="4" fill="none"/></g>`;
  let s=`<defs>${g}</defs><g id="${id}">`+
   `<ellipse cx="0" cy="-6" rx="290" ry="22" fill="url(#gShadow)"/>`+
   `<path d="${body}" fill="url(#${id}_b)"/>`+
   (o.police?`<path d="M-258 -62 L258 -62 L258 -30 L-258 -30 Z" fill="#14182a"/><text x="-10" y="-38" font-family="DatoSans" font-weight="900" font-size="30" fill="#f4f6fa" text-anchor="middle" letter-spacing="4">POLICE</text>`:'')+
   `<path d="${win}" fill="url(#mWin)"/><path d="${win}" fill="url(#mGlass)"/>`+
   (o.type==='sport'?'':`<rect x="0" y="-168" width="12" height="58" fill="${o.police?'#1a1d28':o.c2}"/>`)+
   `<path d="M-230 -98 Q0 -112 236 -98" stroke="#ffffff70" stroke-width="5" fill="none"/>`+
   `<path d="M-150 -108 Q-110 -170 -40 -176" stroke="${o.rim}" stroke-width="4" fill="none" opacity=".7"/>`+
   `<rect x="20" y="-96" width="34" height="6" rx="3" fill="#00000055"/><rect x="-110" y="-96" width="34" height="6" rx="3" fill="#00000055"/>`+
   wheel(-160,'a')+wheel(165,'b')+
   `<path d="M244 -82 l18 4 l-2 18 l-20 -2 z" fill="#fff6d0"/>`+
   (o.lights?`<g id="${id}_head"><ellipse cx="300" cy="-70" rx="90" ry="34" fill="url(#gGlowW)" opacity=".8"/></g>`:'')+
   `<path d="M-258 -84 l14 -2 l0 18 l-14 0 z" fill="#ff3030"/><ellipse cx="-262" cy="-76" rx="26" ry="14" fill="url(#gGlowR)" opacity=".6"/>`+
   (o.police?`<g transform="translate(-30 ${o.type==='sport'?-150:-178})"><rect x="-50" y="-18" width="100" height="18" rx="6" fill="#20232e"/><rect x="-46" y="-16" width="44" height="13" rx="4" fill="#ff2a3a"/><rect x="2" y="-16" width="44" height="13" rx="4" fill="#2a6bff"/><circle id="${id}_lr" cx="-24" cy="-10" r="70" fill="url(#gGlowR)"/><circle id="${id}_lb" cx="24" cy="-10" r="70" fill="url(#gGlowB)" opacity="0"/></g>`:'')+
   `</g>`;
  return s;
}
/* Auto visto desde arriba (para el mapa del primer juego). Origen centro, mira a la derecha */
function topCar(o){
  o=Object.assign({c:'#f2c14e',police:false,w:46,h:24},o||{});
  const c=o.police?'#e8ecf4':o.c;
  return `<rect x="${-o.w/2}" y="${-o.h/2}" width="${o.w}" height="${o.h}" rx="7" fill="${c}"/><rect x="${-o.w/2+12}" y="${-o.h/2+3}" width="${o.w-24}" height="${o.h-6}" rx="4" fill="#00000055"/><rect x="${-o.w/2+16}" y="${-o.h/2+5}" width="${o.w-32}" height="${o.h-10}" rx="3" fill="${c}"/>`+
   (o.police?`<rect x="-4" y="-8" width="8" height="16" fill="#ff2a3a"/><rect x="-4" y="0" width="8" height="8" fill="#2a6bff"/>`:'')+
   `<rect x="${o.w/2-4}" y="${-o.h/2+3}" width="4" height="5" fill="#fff8c0"/><rect x="${o.w/2-4}" y="${o.h/2-8}" width="4" height="5" fill="#fff8c0"/>`;
}

/* ---------------- CIUDADES ---------------- */
let patN=0;
function winPattern(lit,dark,w=22,h=30){
  const id='wp'+(patN++);
  def(`<pattern id="${id}" width="${w*4}" height="${h*3}" patternUnits="userSpaceOnUse">`+
    [[0,0,1],[1,0,0],[2,0,1],[3,0,1],[0,1,0],[1,1,1],[2,1,1],[3,1,0],[0,2,1],[1,2,1],[2,2,0],[3,2,1]].map(([x,y,l])=>`<rect x="${x*w+5}" y="${y*h+6}" width="${w-10}" height="${h-12}" fill="${l?lit:dark}"/>`).join('')+`</pattern>`);
  return id;
}
/* skyline(seed,{x0,x1,base,minH,maxH,minW,maxW,top,bot,side,lit,dark,neon,towers}) */
function skyline(seed,o){
  const R=PRNG(seed);
  o=Object.assign({x0:-60,x1:1260,base:1500,minH:200,maxH:700,minW:70,maxW:170,top:'#2a3150',bot:'#11142a',side:'#0b0d1c',lit:'#ffd38a',dark:'#1a1f36',neon:null,towers:true,depth:18,gap:6},o||{});
  const gid='sk'+seed; def(lg(gid,[[0,o.top],[1,o.bot]]));
  const pat=winPattern(o.lit,o.dark);
  let s='',x=o.x0;
  while(x<o.x1){
    const w=o.minW+R()*(o.maxW-o.minW), h=o.minH+R()*(o.maxH-o.minH), y=o.base-h;
    s+=`<path d="M${R2(x+w)} ${R2(y)} l${o.depth} ${-o.depth*.6} v${R2(h)} h${-o.depth} z" fill="${o.side}"/>`;
    s+=`<rect x="${R2(x)}" y="${R2(y)}" width="${R2(w)}" height="${R2(h)}" fill="url(#${gid})"/>`;
    s+=`<rect x="${R2(x+8)}" y="${R2(y+14)}" width="${R2(w-16)}" height="${R2(h-20)}" fill="url(#${pat})" opacity="${(.45+R()*.5).toFixed(2)}"/>`;
    if(o.towers&&R()<.35) s+=`<rect x="${R2(x+w/2-3)}" y="${R2(y-60-R()*60)}" width="6" height="120" fill="${o.bot}"/><circle cx="${R2(x+w/2)}" cy="${R2(y-70)}" r="5" fill="#ff4040"/>`;
    if(o.tanks&&R()<.4) s+=`<g transform="translate(${R2(x+w*.3)} ${R2(y)})"><rect x="0" y="-46" width="34" height="36" rx="4" fill="#5a3a2a"/><path d="M-2 -46 l19 -16 l19 16 z" fill="#3a241a"/><path d="M4 -10 v12 M30 -10 v12" stroke="#2a1a10" stroke-width="4"/></g>`;
    if(o.neon&&R()<.45){const c=o.neon[Math.floor(R()*o.neon.length)];s+=`<rect x="${R2(x+10)}" y="${R2(y+30+R()*80)}" width="${R2(w-20)}" height="10" rx="5" fill="${c}" filter="url(#fNeon)"/>`;}
    x+=w+o.gap+R()*14;
  }
  return s;
}
/* bloque isométrico (ciudad 3D) */
function isoBlock(x,y,w,d,h,c){
  // c: [top, left, right]
  return `<g transform="translate(${x} ${y})"><path d="M0 0 L${w} ${w*.5} L${w} ${w*.5-h} L0 ${-h} Z" fill="${c[1]}"/><path d="M${w} ${w*.5} L${w+d} ${w*.5-d*.5} L${w+d} ${w*.5-d*.5-h} L${w} ${w*.5-h} Z" fill="${c[2]}"/><path d="M0 ${-h} L${w} ${w*.5-h} L${w+d} ${w*.5-d*.5-h} L${d} ${-d*.5-h} Z" fill="${c[0]}"/></g>`;
}
/* ---------------- NATURALEZA ---------------- */
function palm(x,y,s=1,c='#0f1a24'){
  return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0 Q-10 -180 20 -360" stroke="${c}" stroke-width="16" fill="none" stroke-linecap="round"/>`+
   [[-150,-330],[-120,-400],[40,-430],[150,-380],[170,-320],[-60,-300]].map(([a,b],i)=>`<path class="frond" d="M20 -360 Q${(20+a)/2} ${b-60} ${a} ${b}" stroke="${c}" stroke-width="${12-i%3*2}" fill="none" stroke-linecap="round"/><path d="M20 -360 Q${(20+a)/2} ${b-40} ${a} ${b}" stroke="${c}" stroke-width="26" fill="none" stroke-dasharray="4 10" opacity=".9"/>`).join('')+`</g>`;
}
function pine(x,y,s=1,c='#1d3a2c',c2='#0e2018'){return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-6" y="-30" width="12" height="34" fill="#3a2418"/><path d="M0 -200 L46 -90 L22 -96 L60 -20 L-60 -20 L-22 -96 L-46 -90 Z" fill="${c}"/><path d="M0 -200 L-46 -90 L-22 -96 L-60 -20 L0 -20 Z" fill="${c2}" opacity=".7"/></g>`;}
function cactus(x,y,s=1,c='#3f6b3a'){return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-14" y="-160" width="28" height="160" rx="14" fill="${c}"/><path d="M-14 -80 h-26 q-10 0 -10 -10 v-40" stroke="${c}" stroke-width="22" fill="none" stroke-linecap="round"/><path d="M14 -100 h22 q10 0 10 -10 v-30" stroke="${c}" stroke-width="20" fill="none" stroke-linecap="round"/><rect x="2" y="-156" width="6" height="150" rx="3" fill="#ffffff22"/></g>`;}
function mountains(seed,base,h,c1,c2,n=6,x0=-80,x1=1280){const R=PRNG(seed);let d=`M${x0} ${base}`;const st=(x1-x0)/n;for(let i=0;i<=n;i++){const x=x0+i*st;d+=` L${R2(x-st*.5)} ${R2(base-h*(.4+R()*.6))} L${R2(x)} ${R2(base-h*(.15+R()*.3))}`;}d+=` L${x1} ${base} Z`;const gid='mt'+seed;def(lg(gid,[[0,c1],[1,c2]]));return `<path d="${d}" fill="url(#${gid})"/>`;}
function rain(seed,n,x0,y0,w,h,c='#cfe3ff'){const R=PRNG(seed);let s='';for(let i=0;i<n;i++){const x=x0+R()*w,y=y0+R()*h,l=30+R()*40;s+=`<path d="M${R2(x)} ${R2(y)} l-8 ${R2(l)}" stroke="${c}" stroke-width="${(1.5+R()*2).toFixed(1)}" opacity="${(.25+R()*.45).toFixed(2)}"/>`;}return s;}
function stars(seed,n,w,h,c='#fff'){const R=PRNG(seed);let s='';for(let i=0;i<n;i++)s+=`<circle cx="${R2(R()*w)}" cy="${R2(R()*h)}" r="${(0.8+R()*2.2).toFixed(1)}" fill="${c}" opacity="${(.3+R()*.7).toFixed(2)}"/>`;return s;}

/* ---------------- UTILERÍA ---------------- */
function crt(id,screen,o){ // monitor CRT 90s. Origen: centro de pantalla. pantalla 360x270
  o=Object.assign({body:['#e6dccb','#a99c86'],glow:'#7dffb0'},o||{});
  def(lg(id+'_cb',[[0,o.body[0]],[1,o.body[1]]],0,0,1,1));
  return `<g id="${id}"><path d="M-250 -200 L250 -200 L230 210 L-230 210 Z" fill="url(#${id}_cb)"/><path d="M-170 210 L170 210 L140 300 L-140 300 Z" fill="${o.body[1]}"/><rect x="-200" y="300" width="400" height="30" rx="8" fill="${o.body[1]}"/>`+
   `<rect x="-205" y="-165" width="410" height="320" rx="34" fill="#1a1d1a"/><g clip-path="url(#${id}_clip)"><rect x="-190" y="-150" width="380" height="290" fill="#06120c"/>${screen}</g>`+
   `<clipPath id="${id}_clip"><rect x="-190" y="-150" width="380" height="290" rx="26"/></clipPath>`+
   `<rect x="-190" y="-150" width="380" height="290" rx="26" fill="url(#${id}_scan)" opacity=".35"/>`+
   `<pattern id="${id}_scan" width="4" height="6" patternUnits="userSpaceOnUse"><rect width="4" height="2" fill="#000"/></pattern>`+
   `<path d="M-180 -140 q160 -20 300 10" stroke="#ffffff30" stroke-width="10" fill="none"/>`+
   `<ellipse cx="0" cy="0" rx="300" ry="240" fill="url(#gGlowC)" opacity=".15"/><circle cx="190" cy="180" r="8" fill="${o.glow}"/><path d="M246 -196 L230 206" stroke="#ffffff50" stroke-width="5"/></g>`;
}
function topMap(seed,w=380,h=290){ // calles vistas desde arriba
  const R=PRNG(seed);let s=`<rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" fill="#2b4a2a"/>`;
  for(let i=0;i<6;i++)for(let j=0;j<5;j++){const x=-w/2+i*70+10,y=-h/2+j*64+10;s+=`<rect x="${x}" y="${y}" width="50" height="44" fill="${['#6b5a4a','#7a7a86','#4a5a6a','#8a6a4a'][Math.floor(R()*4)]}"/><rect x="${x+4}" y="${y+4}" width="42" height="12" fill="#00000040"/>`;}
  for(let i=0;i<7;i++)s+=`<rect x="${-w/2+i*70-10}" y="${-h/2}" width="20" height="${h}" fill="#2a2a30"/>`;
  for(let j=0;j<6;j++)s+=`<rect x="${-w/2}" y="${-h/2+j*64-10}" width="${w}" height="20" fill="#2a2a30"/>`;
  return s;
}
function gameBox(id,o){ // caja de juego genérica, ilustración propia. Origen centro. 300x420
  o=Object.assign({title:'GRAND THEFT AUTO',sub:'',c1:'#f2c14e',c2:'#c0392b',art:''},o||{});
  def(lg(id+'_g',[[0,o.c1],[1,o.c2]],0,0,1,1));
  return `<g id="${id}"><rect x="-162" y="-222" width="324" height="444" rx="10" fill="#111"/><rect x="-150" y="-210" width="300" height="420" rx="6" fill="url(#${id}_g)"/>`+
    `<g clip-path="url(#${id}_cl)">${o.art}</g><clipPath id="${id}_cl"><rect x="-150" y="-120" width="300" height="300"/></clipPath>`+
    `<rect x="-150" y="-210" width="300" height="90" fill="#0d0d12"/><text x="0" y="-172" font-family="DatoSans" font-weight="900" font-size="${o.title.length>12?30:44}" fill="#fff" text-anchor="middle" letter-spacing="2">${o.title}</text>`+
    (o.sub?`<text x="0" y="-136" font-family="DatoSans" font-weight="800" font-size="24" fill="${o.c1}" text-anchor="middle" letter-spacing="6">${o.sub}</text>`:'')+
    `<path d="M-150 -210 L-110 -210 L-150 210 Z" fill="#ffffff18"/><rect x="-150" y="-210" width="300" height="420" rx="6" fill="none" stroke="#ffffff30" stroke-width="3"/></g>`;
}
function bill(o){o=Object.assign({w:150,h:66},o||{});return `<rect x="${-o.w/2}" y="${-o.h/2}" width="${o.w}" height="${o.h}" rx="5" fill="url(#mBill)"/><rect x="${-o.w/2+6}" y="${-o.h/2+6}" width="${o.w-12}" height="${o.h-12}" rx="3" fill="none" stroke="#2f6a3a" stroke-width="3"/><circle r="${o.h*.28}" fill="#9fd39a" stroke="#2f6a3a" stroke-width="3"/><text y="${o.h*.12}" font-family="DatoSans" font-weight="900" font-size="${o.h*.34}" fill="#2f6a3a" text-anchor="middle">$</text>`;}
function coin(r=34){return `<circle r="${r}" fill="url(#mCoin)"/><circle r="${r*.72}" fill="none" stroke="#a86a12" stroke-width="${r*.1}"/><text y="${r*.32}" font-family="DatoSans" font-weight="900" font-size="${r}" fill="#a86a12" text-anchor="middle">$</text><path d="M${-r*.6} ${-r*.5} a${r} ${r} 0 0 1 ${r*.8} ${-r*.3}" stroke="#fff" stroke-width="${r*.12}" fill="none" opacity=".7"/>`;}
function phone(id,screen){return `<g id="${id}"><rect x="-150" y="-300" width="300" height="600" rx="44" fill="#16161c"/><rect x="-150" y="-300" width="300" height="600" rx="44" fill="none" stroke="url(#mMetal)" stroke-width="8"/><rect x="-134" y="-282" width="268" height="564" rx="32" fill="#05060a"/><g clip-path="url(#${id}_c)">${screen}</g><clipPath id="${id}_c"><rect x="-134" y="-282" width="268" height="564" rx="32"/></clipPath><rect x="-40" y="-274" width="80" height="22" rx="11" fill="#000"/><path d="M-120 -260 L40 -282 L-134 100 Z" fill="#ffffff10"/></g>`;}
function laptop(id,screen){return `<g id="${id}"><path d="M-260 -320 L260 -320 L260 0 L-260 0 Z" fill="#1c1e26"/><rect x="-240" y="-302" width="480" height="286" fill="#04070c"/><g clip-path="url(#${id}_c)">${screen}</g><clipPath id="${id}_c"><rect x="-240" y="-302" width="480" height="286"/></clipPath><path d="M-300 0 L300 0 L340 40 L-340 40 Z" fill="url(#mMetal)"/><path d="M-60 12 h120" stroke="#00000060" stroke-width="6"/></g>`;}
function bigBen(x,y,s=1,c='#2a2230',lit='#ffd88a'){
  return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-60" y="-900" width="120" height="900" fill="${c}"/><rect x="-74" y="-980" width="148" height="100" fill="${c}"/><circle cx="0" cy="-930" r="52" fill="${lit}"/><circle cx="0" cy="-930" r="52" fill="none" stroke="${c}" stroke-width="8"/><path d="M0 -930 l0 -36 M0 -930 l24 10" stroke="${c}" stroke-width="7" stroke-linecap="round"/><circle cx="0" cy="-930" r="110" fill="url(#gGlowA)" opacity=".4"/><path d="M-74 -980 L0 -1180 L74 -980 Z" fill="${c}"/><path d="M-4 -1180 h8 v-70 h-8 z" fill="${c}"/>`+
   [-40,-10,20].map(xx=>`<rect x="${xx}" y="-860" width="16" height="760" fill="#00000030"/>`).join('')+`</g>`;
}
function parliament(x,y,w,c='#2a2230',lit='#ffcf7a'){ // fachada gótica larga
  let s=`<g transform="translate(${x} ${y})"><rect x="0" y="-260" width="${w}" height="260" fill="${c}"/>`;
  for(let i=0;i<w;i+=46){s+=`<path d="M${i} -260 l10 -40 l10 40 z M${i+23} -260 v-24" fill="${c}" stroke="${c}" stroke-width="4"/><rect x="${i+10}" y="-220" width="16" height="44" rx="8" fill="${lit}" opacity=".75"/><rect x="${i+10}" y="-140" width="16" height="44" rx="8" fill="${lit}" opacity=".55"/>`;}
  return s+`</g>`;
}
function newspaper(id,head,sub){return `<g id="${id}"><rect x="-260" y="-340" width="520" height="680" fill="url(#mPaper)"/><text x="0" y="-270" font-family="Georgia,serif" font-weight="700" font-size="54" fill="#1a1a1a" text-anchor="middle">THE DAILY</text><path d="M-230 -250 h460 M-230 -244 h460" stroke="#1a1a1a" stroke-width="3"/><text x="0" y="-160" font-family="DatoSans" font-weight="900" font-size="${head.length>12?64:84}" fill="#111" text-anchor="middle">${head}</text><text x="0" y="-100" font-family="DatoSans" font-weight="700" font-size="30" fill="#7a1a1a" text-anchor="middle">${sub||''}</text><rect x="-230" y="-70" width="220" height="180" fill="#3a3a3a"/><path d="M-200 80 l60 -80 l40 50 l30 -30 l50 60 z" fill="#6a6a6a"/>`+[0,1,2,3,4,5,6,7,8].map(i=>`<rect x="10" y="${-70+i*22}" width="${200-(i%3)*30}" height="9" fill="#8a857a"/>`).join('')+[0,1,2,3,4,5].map(i=>`<rect x="-230" y="${140+i*26}" width="${460-(i%2)*80}" height="10" fill="#8a857a"/>`).join('')+`</g>`;}
function calendarPage(id,num,lbl,c='#e8423f'){return `<g id="${id}"><rect x="-170" y="-200" width="340" height="400" rx="20" fill="#f7f3ea"/><rect x="-170" y="-200" width="340" height="110" rx="20" fill="${c}"/><rect x="-170" y="-110" width="340" height="20" fill="${c}"/><text x="0" y="-128" font-family="DatoSans" font-weight="900" font-size="46" fill="#fff" text-anchor="middle" letter-spacing="6">${lbl}</text><text x="0" y="110" font-family="DatoSans" font-weight="900" font-size="170" fill="#1d1d24" text-anchor="middle">${num}</text><circle cx="-100" cy="-200" r="14" fill="#555"/><circle cx="100" cy="-200" r="14" fill="#555"/></g>`;}
function magnifier(id){return `<g id="${id}"><circle r="120" fill="#9fd8ff22" stroke="url(#mMetal)" stroke-width="22"/><path d="M-70 -60 a90 90 0 0 1 80 -40" stroke="#fff" stroke-width="10" fill="none" opacity=".6"/><rect x="74" y="74" width="46" height="190" rx="20" transform="rotate(-45 97 97)" fill="#3a2418"/></g>`;}
function trophy(id){def(lg(id+'_g',[[0,'#fff1a8'],[.4,'#f2c14e'],[1,'#8a5a0a']],0,0,1,0));return `<g id="${id}"><path d="M-110 -260 L110 -260 Q110 -80 0 -40 Q-110 -80 -110 -260 Z" fill="url(#${id}_g)"/><path d="M-110 -230 q-80 0 -70 60 q10 50 80 50 M110 -230 q80 0 70 60 q-10 50 -80 50" stroke="url(#${id}_g)" stroke-width="22" fill="none"/><rect x="-22" y="-44" width="44" height="90" fill="url(#${id}_g)"/><rect x="-90" y="40" width="180" height="60" rx="8" fill="#3a2418"/><rect x="-60" y="56" width="120" height="26" rx="4" fill="url(#${id}_g)"/><path d="M-70 -240 q10 120 50 170" stroke="#fff" stroke-width="12" fill="none" opacity=".5"/></g>`;}
function mic(id){return `<g id="${id}"><rect x="-70" y="-200" width="140" height="220" rx="70" fill="url(#mMetal)"/><g opacity=".5">${[0,1,2,3,4,5,6].map(i=>`<path d="M-62 ${-170+i*28} h124" stroke="#1a1d24" stroke-width="5"/>`).join('')}</g><path d="M-100 -40 q0 120 100 120 q100 0 100 -120" stroke="url(#mMetal)" stroke-width="16" fill="none"/><rect x="-10" y="80" width="20" height="140" fill="url(#mMetal)"/><ellipse cx="0" cy="230" rx="110" ry="24" fill="#2a2d36"/></g>`;}
function chip(id,c='#c0392b'){return `<g id="${id}"><ellipse cx="0" cy="18" rx="150" ry="52" fill="#5a1414"/><ellipse cx="0" cy="0" rx="150" ry="52" fill="${c}"/>${[0,1,2,3,4,5].map(i=>`<path d="M${Math.cos(i*1.047)*150*.98} ${Math.sin(i*1.047)*52*.98} L${Math.cos(i*1.047)*112} ${Math.sin(i*1.047)*39}" stroke="#fff" stroke-width="18"/>`).join('')}<ellipse cx="0" cy="0" rx="100" ry="34" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="10 8"/><text x="0" y="14" font-family="DatoSans" font-weight="900" font-size="40" fill="#fff" text-anchor="middle">13</text></g>`;}
function server(x,y,h=520){let s=`<g transform="translate(${x} ${y})"><rect x="0" y="${-h}" width="170" height="${h}" rx="8" fill="#151a26"/><rect x="0" y="${-h}" width="170" height="${h}" rx="8" fill="none" stroke="#2c3550" stroke-width="4"/>`;for(let i=0;i<Math.floor(h/46);i++){s+=`<rect x="12" y="${-h+14+i*46}" width="146" height="34" rx="4" fill="#0b0f18"/><circle class="led" cx="${30+(i%3)*14}" cy="${-h+31+i*46}" r="4" fill="${i%4?'#3dff9a':'#5ff3ff'}"/><rect x="90" y="${-h+26+i*46}" width="56" height="10" rx="3" fill="#1d2536"/>`;}return s+`</g>`;}
function shelf(x,y,w){return `<g transform="translate(${x} ${y})"><rect x="0" y="0" width="${w}" height="26" fill="url(#mShelf)"/><rect x="0" y="26" width="${w}" height="10" fill="#00000060"/></g>`;}
def(lg('mShelf',[[0,'#d8b38a'],[1,'#7a5236']]));

window.DLP={car,topCar,skyline,isoBlock,palm,pine,cactus,mountains,rain,stars,crt,topMap,gameBox,bill,coin,phone,laptop,bigBen,parliament,newspaper,calendarPage,magnifier,trophy,mic,chip,server,shelf,winPattern};
})();

/* ===== v2 (25-nov-2026 · hotspanish) — utilería ampliada. Firmas estables; agregar, nunca borrar ===== */
(function(){
const {lg,rg,def,PRNG}=DL;
const G=(id,x,y,s,inner,r=0)=>`<g transform="translate(${x} ${y}) scale(${s})${r?` rotate(${r})`:''}"><g id="${id}">${inner}</g></g>`;
def(rg('p2_lens',[[0,'#7fd6ff'],[.6,'#1d3a6a'],[1,'#05070c']],.4,.35,.7));
def(rg('p2_chile',[[0,'#ff7a5a'],[.6,'#d81e1e'],[1,'#6a0808']],.35,.3,.8));
const P2={
  /* casita(x,y,w,h,color,techo,luzVentana?) — fachada de pueblo con ventana y puerta (origen: base centro) */
  casita:(x,y,w,h,c,roof,lit)=>`<g transform="translate(${x} ${y})"><rect x="${-w/2}" y="${-h}" width="${w}" height="${h}" fill="${c}" filter="url(#fWall)"/><rect x="${-w/2}" y="${-h}" width="${w}" height="10" fill="#00000030"/><path d="M${-w/2-14} ${-h} L${w/2+14} ${-h} L${w/2} ${-h-26} L${-w/2} ${-h-26}Z" fill="${roof}"/><rect x="${-w*.32}" y="${-h*.62}" width="${w*.22}" height="${h*.3}" rx="4" fill="${lit||'#2a1c1a'}"/><rect x="${w*.1}" y="${-h*.55}" width="${w*.2}" height="${h*.55}" rx="3" fill="#4a2c22"/></g>`,
  /* torta(id,x,y,s) — torta mexicana */
  torta:(id,x,y,s=1)=>G(id,x,y,s,`<path d="M-70 4 Q-60 -46 0 -46 Q60 -46 70 4Z" fill="#e3ad64"/><path d="M-40 -26 l10 -3 M2 -32 l10 2 M30 -20 l10 2" stroke="#fbe1aa" stroke-width="4"/><path d="M-72 6 Q-46 20 -20 6 T30 6 T74 6" fill="none" stroke="#7cae5c" stroke-width="10"/><path d="M-70 15 H70" stroke="#d0705a" stroke-width="11"/><path d="M-70 22 H70" stroke="#f3d27a" stroke-width="6"/><path d="M-72 26 Q0 52 72 26Z" fill="#c78c4e"/>`),
  /* camara(id,x,y,s) — videocámara; luz REC = id_rec */
  camara:(id,x,y,s=1)=>G(id,x,y,s,`<rect x="-90" y="-60" width="150" height="110" rx="16" fill="#23262f"/><rect x="-90" y="-60" width="150" height="110" rx="16" fill="none" stroke="url(#mMetal)" stroke-width="4"/><circle cx="74" cy="-5" r="46" fill="#14161c" stroke="url(#mMetal)" stroke-width="6"/><circle cx="74" cy="-5" r="26" fill="url(#p2_lens)"/><circle cx="64" cy="-15" r="7" fill="#fff" opacity=".7"/><rect x="-70" y="-80" width="50" height="22" rx="6" fill="#2e323c"/><circle id="${id}_rec" cx="-62" cy="-36" r="9" fill="#ff3b3b"/>`),
  tripode:(x,y)=>`<path d="M${x} ${y} L${x-70} ${y+330} M${x} ${y} L${x+70} ${y+330} M${x} ${y} V${y+330}" stroke="#2a2d36" stroke-width="10"/>`,
  /* pantallaPlay(color) — contenido de pantalla para laptop() con botón play genérico */
  pantallaPlay:(c='#2b3550')=>`<rect x="-240" y="-302" width="480" height="286" fill="${c}"/><rect x="-60" y="-200" width="120" height="84" rx="22" fill="#f4f4f8"/><path d="M-16 -178 L24 -158 L-16 -138Z" fill="${c}"/>`,
  /* dust(seed,n,w,h,color) — partículas flotantes; grupo id 'd'+seed */
  dust:(seed,n,w,h,c='#ffe8c0')=>{const R=PRNG(seed);let s='';for(let i=0;i<n;i++)s+=`<circle cx="${(R()*w).toFixed(0)}" cy="${(R()*h).toFixed(0)}" r="${(1.5+R()*3.5).toFixed(1)}" fill="${c}" opacity="${(.25+R()*.5).toFixed(2)}"/>`;return `<g id="${'d'+seed}">${s}</g>`;},
  /* bocadillo(id,x,y,w,txt,{s,c,bg,tail}) — globo de diálogo; tail 'l'|'r' */
  bocadillo:(id,x,y,w,txt,o={})=>{o=Object.assign({s:40,c:'#1a1a26',bg:'#ffffff',tail:'l'},o);const h=o.s*2.2,tx=o.tail==='l'?-w*.25:w*.25;return G(id,x,y,1,`<rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="${h/2}" fill="${o.bg}"/><path d="M${tx-14} ${h/2-2} L${tx+(o.tail==='l'?-26:26)} ${h/2+34} L${tx+14} ${h/2-2}Z" fill="${o.bg}"/><text y="${o.s*.36}" font-family="DatoSans" font-weight="900" font-size="${o.s}" fill="${o.c}" text-anchor="middle">${txt}</text>`);},
  /* neon(id,x,y,txt,s,color) — letrero de neón (texto con brillo) */
  neon:(id,x,y,txt,s=110,c='#ff4fb4')=>G(id,x,y,1,`<rect x="${-txt.length*s*.36}" y="${-s*.95}" width="${txt.length*s*.72}" height="${s*1.25}" rx="20" fill="#0c0612" stroke="#2a1a34" stroke-width="8"/><text font-family="DatoSans" font-weight="900" font-size="${s}" fill="${c}" text-anchor="middle" filter="url(#fNeon)" letter-spacing="6">${txt}</text><text font-family="DatoSans" font-weight="900" font-size="${s}" fill="#fff3fb" text-anchor="middle" letter-spacing="6">${txt}</text>`),
  /* chile(id,x,y,s) — chile rojo brillante */
  chile:(id,x,y,s=1)=>G(id,x,y,s,`<path d="M-10 -80 Q40 -60 30 20 Q20 90 -40 120 Q-10 60 -20 0 Q-30 -50 -10 -80Z" fill="url(#p2_chile)"/><path d="M-6 -70 Q20 -50 18 0" stroke="#fff" stroke-width="6" opacity=".4" fill="none"/><path d="M-12 -80 q-4 -30 20 -40" stroke="#3a8a3a" stroke-width="12" fill="none" stroke-linecap="round"/>`),
  /* maquinita(id,x,y,s) — máquina para rapar */
  maquinita:(id,x,y,s=1)=>G(id,x,y,s,`<rect x="-40" y="-120" width="80" height="220" rx="34" fill="url(#mMetal)"/><rect x="-46" y="-150" width="92" height="40" rx="8" fill="#2a2d36"/>${[0,1,2,3,4,5,6].map(i=>`<rect x="${-40+i*12}" y="-162" width="6" height="16" fill="#c8ccd4"/>`).join('')}<circle cy="20" r="12" fill="#2a2d36"/>`),
  /* ruleta(id,x,y,r,colores[]) — ruleta de premios; girar '#id_w' con svgOrigin '0 0' */
  ruleta:(id,x,y,r=200,cs=['#ff4fb4','#ffd24f','#5ff3ff','#7dffb0','#ff7a5a','#9a7aff'])=>{const n=cs.length;let w='';for(let i=0;i<n;i++){const a0=i/n*Math.PI*2,a1=(i+1)/n*Math.PI*2;w+=`<path d="M0 0 L${(Math.cos(a0)*r).toFixed(1)} ${(Math.sin(a0)*r).toFixed(1)} A${r} ${r} 0 0 1 ${(Math.cos(a1)*r).toFixed(1)} ${(Math.sin(a1)*r).toFixed(1)}Z" fill="${cs[i]}"/><text x="${(Math.cos((a0+a1)/2)*r*.66).toFixed(1)}" y="${(Math.sin((a0+a1)/2)*r*.66+14).toFixed(1)}" font-family="DatoSans" font-weight="900" font-size="${r*.18}" fill="#1a1020" text-anchor="middle">$</text>`;}
    return `<g transform="translate(${x} ${y})"><g id="${id}"><circle r="${r+18}" fill="#2a1a34" stroke="url(#mMetal)" stroke-width="10"/><g id="${id}_w">${w}</g><circle r="${r*.12}" fill="url(#mCoin)"/><path d="M-18 ${-r-30} L18 ${-r-30} L0 ${-r+12}Z" fill="#fff"/></g></g>`;},
  /* alcancia(id,x,y,s) — cochinito de ahorro */
  alcancia:(id,x,y,s=1)=>G(id,x,y,s,`<ellipse rx="150" ry="110" fill="#ff8fb8"/><ellipse cx="-40" cy="-40" rx="70" ry="40" fill="#ffc0d8" opacity=".6"/><circle cx="150" cy="-10" r="44" fill="#ff7aa8"/><circle cx="140" cy="-14" r="7" fill="#7a2a4a"/><circle cx="162" cy="-14" r="7" fill="#7a2a4a"/><circle cx="90" cy="-50" r="9" fill="#2a1020"/><path d="M60 -110 l20 -40 l20 40z" fill="#ff7aa8"/><rect x="-40" y="-112" width="80" height="12" rx="6" fill="#7a2a4a"/>${[-90,-30,40,100].map(v=>`<rect x="${v-14}" y="90" width="28" height="44" rx="8" fill="#ff7aa8"/>`).join('')}`),
  /* mansion(id,x,y,s,luz) — mansión moderna genérica de noche */
  mansion:(id,x,y,s=1,lit='#ffd88a')=>G(id,x,y,s,`<rect x="-420" y="-260" width="840" height="260" fill="#2a2638"/><rect x="-300" y="-420" width="600" height="170" fill="#332e44"/><rect x="-440" y="-276" width="880" height="22" fill="#1a1626"/><rect x="-320" y="-436" width="640" height="22" fill="#1a1626"/>${[-380,-250,-120,10,140,270].map(v=>`<rect x="${v}" y="-220" width="100" height="160" fill="${lit}" opacity=".9"/>`).join('')}${[-260,-120,20,160].map(v=>`<rect x="${v}" y="-390" width="100" height="110" fill="${lit}" opacity=".8"/>`).join('')}<rect x="-60" y="-120" width="120" height="120" fill="#5a4030"/><rect x="-470" y="0" width="940" height="30" fill="#4a7ad8" opacity=".6"/>`)
};
Object.assign(window.DLP,P2);
})();
