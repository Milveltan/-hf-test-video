/* DATOLOGO · episodio hotspanish-antes-de-la-fama · scenes.js — "HotSpanish · Parte 1: Antes de la fama"
   FORMATO 1:1 → marco de escena 1080×1080 (sobrebarrido 80 u). Personajes ilustrados propios (fichas), sin retratos.
   Cada escena: {k, w, tr, cam, bg/mid/fg, anim(tl,t0,d)} */
(function(){
const {lg,rg,def,PRNG}=DL; const P=DLP; const {makeChar,A}=DLC;
const {N,T,addToGroup,sky,floorG,light,beam}=DLK;
const F=window.FICHAS; const S=[];

/* ---------- utilería nueva del episodio (candidata a lib/props.js) ---------- */
const casita=(x,y,w,h,c,roof,lit)=>`<g transform="translate(${x} ${y})"><rect x="${-w/2}" y="${-h}" width="${w}" height="${h}" fill="${c}" filter="url(#fWall)"/><rect x="${-w/2}" y="${-h}" width="${w}" height="10" fill="#00000030"/><path d="M${-w/2-14} ${-h} L${w/2+14} ${-h} L${w/2} ${-h-26} L${-w/2} ${-h-26}Z" fill="${roof}"/>`+
  `<rect x="${-w*.32}" y="${-h*.62}" width="${w*.22}" height="${h*.3}" rx="4" fill="${lit||'#2a1c1a'}"/><rect x="${w*.1}" y="${-h*.55}" width="${w*.2}" height="${h*.55}" rx="3" fill="#4a2c22"/></g>`;
const iglesia=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><rect x="-120" y="-260" width="240" height="260" fill="#e9c9a0" filter="url(#fWall)"/><path d="M-130 -260 L0 -340 L130 -260Z" fill="#c98a5a"/><rect x="-170" y="-420" width="70" height="420" fill="#efd3ac"/><path d="M-178 -420 L-135 -500 L-92 -420Z" fill="#c98a5a"/><rect x="100" y="-420" width="70" height="420" fill="#efd3ac"/><path d="M92 -420 L135 -500 L178 -420Z" fill="#c98a5a"/><circle cx="0" cy="-190" r="34" fill="#7a4a3a"/><path d="M-40 0 V-100 Q0 -150 40 -100 V0Z" fill="#5a3326"/><rect x="-150" y="-380" width="30" height="50" rx="15" fill="#3a2420"/><rect x="120" y="-380" width="30" height="50" rx="15" fill="#3a2420"/><path d="M-135 -500 v-30 M-147 -518 h24" stroke="#5a3326" stroke-width="6"/></g>`;
const torta=(id,x,y,s=1)=>N(id,x,y,s,`<path d="M-70 4 Q-60 -46 0 -46 Q60 -46 70 4Z" fill="#e3ad64"/><path d="M-40 -26 l10 -3 M2 -32 l10 2 M30 -20 l10 2" stroke="#fbe1aa" stroke-width="4"/><path d="M-72 6 Q-46 20 -20 6 T30 6 T74 6" fill="none" stroke="#7cae5c" stroke-width="10"/><path d="M-70 15 H70" stroke="#d0705a" stroke-width="11"/><path d="M-70 22 H70" stroke="#f3d27a" stroke-width="6"/><path d="M-72 26 Q0 52 72 26Z" fill="#c78c4e"/>`);
const camara=(id,x,y,s=1)=>N(id,x,y,s,`<rect x="-90" y="-60" width="150" height="110" rx="16" fill="#23262f"/><rect x="-90" y="-60" width="150" height="110" rx="16" fill="none" stroke="url(#mMetal)" stroke-width="4"/><circle cx="74" cy="-5" r="46" fill="#14161c" stroke="url(#mMetal)" stroke-width="6"/><circle cx="74" cy="-5" r="26" fill="url(#ep_lens)"/><circle cx="64" cy="-15" r="7" fill="#fff" opacity=".7"/><rect x="-70" y="-80" width="50" height="22" rx="6" fill="#2e323c"/><circle id="${id}_rec" cx="-62" cy="-36" r="9" fill="#ff3b3b"/>`);
def(rg('ep_lens',[[0,'#7fd6ff'],[.6,'#1d3a6a'],[1,'#05070c']],.4,.35,.7));
const tripode=(x,y)=>`<path d="M${x} ${y} L${x-70} ${y+330} M${x} ${y} L${x+70} ${y+330} M${x} ${y} V${y+330}" stroke="#2a2d36" stroke-width="10"/>`;
const pantallaPlay=(c='#2b3550')=>`<rect x="-240" y="-302" width="480" height="286" fill="${c}"/><rect x="-60" y="-200" width="120" height="84" rx="22" fill="#f4f4f8"/><path d="M-16 -178 L24 -158 L-16 -138Z" fill="${c}"/>`;
const dust=(seed,n,w,h,c='#ffe8c0')=>{const R=PRNG(seed);let s='';for(let i=0;i<n;i++)s+=`<circle class="dust" cx="${(R()*w).toFixed(0)}" cy="${(R()*h).toFixed(0)}" r="${(1.5+R()*3.5).toFixed(1)}" fill="${c}" opacity="${(.25+R()*.5).toFixed(2)}"/>`;return `<g id="${'d'+seed}">${s}</g>`;};

/* 1 ─ GANCHO: "Lo perdió todo a un año." Cuna vacía junto a una ventana de noche, vela */
S.push({k:'hook',w:0,tr:'fade',title:'ANTES DE LA FAMA',titleAt:6,cam:{s:[1.22,1.05],y:[40,0],ease:'power2.out'},
 bg:()=>sky('h_wall',[[0,'#141026'],[1,'#07060e']])+`<g filter="url(#fWall)"><rect x="-80" y="-80" width="1240" height="1240" fill="#1e1834"/></g>`+
   `<rect x="620" y="120" width="300" height="380" rx="8" fill="#0a1024"/>${P.stars(7,30,280,360).replace(/cx="([\d.]+)" cy="([\d.]+)"/g,(m,a,b)=>`cx="${+a+630}" cy="${+b+130}"`)}<circle cx="840" cy="210" r="34" fill="#eef3ff"/><circle cx="840" cy="210" r="120" fill="url(#gGlowW)" opacity=".35"/><path d="M770 120 v380 M620 300 h300" stroke="#0a1024" stroke-width="14"/>`+
   beam(780,300,320,900,-28,'#bcd4ff',.18)+`<rect x="-80" y="860" width="1240" height="300" fill="#100c1c"/>`,
 mid:()=>`<g id="h_crib">${light(430,880,330,60,'gShadow',.8)}<rect x="210" y="560" width="440" height="22" rx="10" fill="#6a4a3a"/><rect x="210" y="800" width="440" height="22" rx="10" fill="#6a4a3a"/>${[0,1,2,3,4,5,6,7,8,9].map(i=>`<rect x="${226+i*44}" y="580" width="12" height="222" fill="#7a5644"/>`).join('')}<rect x="200" y="540" width="26" height="340" rx="8" fill="#5a3a2c"/><rect x="636" y="540" width="26" height="340" rx="8" fill="#5a3a2c"/><path d="M240 760 Q430 730 620 760 L620 800 L240 800Z" fill="#e8dcc8" opacity=".85"/></g>`+
   `<g id="h_candle">${light(820,820,160,160,'gGlowA',.9,'h_glow')}<rect x="800" y="760" width="40" height="110" rx="6" fill="#f3e6cc"/><path id="h_flame" d="M820 712 q-16 26 0 46 q16 -20 0 -46z" fill="#ffd27a" filter="url(#fGlow)"/></g>`,
 fg:()=>`<g filter="url(#fSoft16)"><rect x="-120" y="900" width="420" height="300" rx="40" fill="#05040a"/></g>`+dust(11,26,1080,900),
 anim(tl,t0,d){tl.to('#h_flame',{scaleY:1.15,scaleX:.9,svgOrigin:'820 758',duration:.18,yoyo:true,repeat:Math.floor(d/.18),ease:'sine.inOut'},t0);
   tl.to('#h_glow',{opacity:.6,duration:.3,yoyo:true,repeat:Math.floor(d/.3)},t0);tl.to('#d11',{y:-40,duration:d,ease:'none'},t0);}
});

/* 2 ─ Jiquilpan, Michoacán: pueblo de día, iglesia, cerros */
S.push({k:'town',w:6,tr:'flash',cam:{x:[60,-40],s:[1.06,1.14]},
 bg:()=>sky('t_sky',[[0,'#5aa8e8'],[.6,'#a8d8f0'],[1,'#f8e2b8']])+`<circle cx="860" cy="170" r="70" fill="#fff6d6"/><circle cx="860" cy="170" r="220" fill="url(#gGlowW)" opacity=".6"/>`+
   P.mountains(31,640,260,'#7aa88a','#4a7a64',5)+P.mountains(32,700,180,'#5a8a6a','#2e5a44',6),
 mid:()=>iglesia(540,780,1)+casita(150,800,190,170,'#e8a46a','#a8553a','#ffe0a0')+casita(330,820,150,140,'#f2d28a','#b8683e')+casita(760,810,170,160,'#d87a6a','#8a3a2e','#ffe0a0')+casita(940,830,190,150,'#a8c890','#5a7a3e')+
   floorG('t_road',[[0,'#c8a47a'],[1,'#8a6a4a']],800)+`<path d="M-80 900 H1160" stroke="#a8845a" stroke-width="4" stroke-dasharray="30 26"/>`+
   N('t_kid',300,1010,.9,makeChar('tk',F.hotspanishNino))+`${P.pine(30,820,.9)}${P.pine(1040,840,1)}`,
 fg:()=>`<g id="t_birds" fill="#2a2a3a">${[0,1,2].map(i=>`<path d="M${200+i*70} ${180+i*24} q14 -12 28 0 q14 -12 28 0" stroke="#2a2a3a" stroke-width="5" fill="none"/>`).join('')}</g>`+
   `<g id="t_place" opacity="0"><rect x="250" y="70" width="580" height="120" rx="20" fill="#0c0a14cc"/>${T(540,128,'JIQUILPAN',{s:58,c:'#ffd24f',ls:8})}${T(540,172,'MICHOACÁN · MÉXICO',{s:30,c:'#fff',ls:6})}</g>`,
 anim(tl,t0,d){A.breathe(tl,'tk',t0,d);A.blinks(tl,'tk',t0,d);A.look(tl,'tk',5,0,t0+.3);
   tl.to('#t_birds',{x:300,y:-60,duration:d,ease:'none'},t0);tl.fromTo('#t_place',{opacity:0,y:-20},{opacity:1,y:0,duration:.4,ease:'back.out(2)'},WT(10)-.1);}
});

/* 3 ─ "salió a carretera": carretera de montaña de noche, faros */
S.push({k:'road',w:12,tr:'fade',cam:{x:[0,-60],s:[1.04,1.14],ease:'none'},
 bg:()=>sky('r_sky',[[0,'#0a0c22'],[.7,'#24264a'],[1,'#3a2c4a']])+P.stars(41,80,1080,600)+`<circle cx="200" cy="160" r="40" fill="#e8eeff" opacity=".9"/>`+P.mountains(42,700,320,'#1a1a32','#0c0c1c',5),
 mid:()=>`<path d="M-80 780 Q400 700 700 760 T1160 740 L1160 1160 L-80 1160Z" fill="#14131f"/><path d="M-80 800 Q400 720 700 780 T1160 760" stroke="#e8e0c0" stroke-width="5" stroke-dasharray="40 34" fill="none" opacity=".55"/>`+
   `<path d="M-80 850 Q400 770 700 830 T1160 810 L1160 1160 L-80 1160Z" fill="#0a0912"/>`+
   N('r_car',-300,820,.62,P.car('rc',{c1:'#8aa0c8',c2:'#2a3450',type:'sedan',rim:'#ffe8b0'}))+
   `<g id="r_beam" opacity=".9">${beam(0,0,260,600,-90,'#fff1c8',.35)}</g>`,
 fg:()=>`<g filter="url(#fSoft8)">${P.pine(80,1100,1.6,'#05050a','#020205')}${P.pine(1000,1120,1.9,'#05050a','#020205')}</g>`,
 anim(tl,t0,d){tl.to('#r_car',{x:900,y:-30,duration:d+.4,ease:'none'},t0);tl.to(['#rc_wa','#rc_wb'],{rotation:1080,svgOrigin:'0 0',duration:d+.4,ease:'none'},t0);
   tl.fromTo('#r_beam',{x:-170,y:800},{x:1030,y:770,duration:d+.4,ease:'none',immediateRender:false},t0);}
});

/* 4 ─ "Se quedó dormida al volante… y el carro cayó por un barranco." Sin violencia: faros que se desvían y se pierden */
S.push({k:'fall',w:24,tr:'cut',cam:{s:[1.1,1.0],ease:'power1.in'},
 bg:()=>sky('f_sky',[[0,'#05060f'],[1,'#141428']])+P.stars(51,50,1080,500)+P.mountains(52,620,220,'#101024','#06060e',5),
 mid:()=>`<path d="M-80 640 L620 600 L660 1160 L-80 1160Z" fill="#12111c"/><path d="M-80 660 L600 622" stroke="#d8d0b0" stroke-width="4" stroke-dasharray="30 30" opacity=".5"/><path d="M620 600 L700 1160 L1160 1160 L1160 760 Z" fill="#05040a"/>`+
   `<g filter="url(#fSoft8)" opacity=".7"><path d="M660 640 L1100 1100" stroke="#000" stroke-width="80"/></g>`+
   `<g id="f_carW">${N('f_car',180,640,.55,P.car('fc',{c1:'#8aa0c8',c2:'#2a3450',type:'sedan',rim:'#ffe8b0'}))}<g id="f_beam">${beam(330,600,240,500,-80,'#fff1c8',.4)}</g></g>`+
   `<g id="f_zz" opacity="0">${T(260,470,'z',{s:46,c:'#cfe0ff'})}${T(300,430,'z',{s:60,c:'#cfe0ff'})}${T(350,380,'Z',{s:76,c:'#cfe0ff'})}</g>`,
 fg:()=>`<rect id="f_dark" x="-80" y="-80" width="1240" height="1240" fill="#000" opacity="0"/>`+dust(53,30,1080,1080,'#b8a890'),
 anim(tl,t0,d){tl.to('#f_zz',{opacity:.9,y:-30,duration:1.2,ease:'sine.out'},t0+.3).to('#f_zz',{opacity:0,duration:.4},t0+1.6);
   tl.to('#f_carW',{x:380,y:-20,duration:WT(29)-t0,ease:'none'},t0);
   tl.to('#f_carW',{rotation:-8,svgOrigin:'540 640',duration:.5,ease:'sine.inOut'},WT(28));
   const tf=WT(32)-.1; tl.to('#f_carW',{x:760,y:420,rotation:38,opacity:0,duration:1.1,ease:'power2.in'},tf);
   tl.to('#f_dark',{opacity:.92,duration:1.2,ease:'power2.in'},tf+.3);tl.to('#d53',{y:-60,opacity:.2,duration:2,ease:'power1.out'},tf+.4);}
});

/* 5 ─ "Él no guarda recuerdos de ella." Niño con un marco vacío que brilla */
S.push({k:'memory',w:36,tr:'fade',cam:{s:[1.0,1.12],y:[0,20]},
 bg:()=>sky('m_bg',[[0,'#1c1430'],[1,'#0a0814']])+light(560,420,520,420,'gGlowA',.35)+dust(61,40,1080,1080,'#ffd8a0'),
 mid:()=>N('m_kid',380,1040,1.15,addToGroup(makeChar('mk',F.hotspanishNino),'mk_hF',`<g transform="translate(40 10) rotate(-12)"><rect x="-10" y="-150" width="190" height="230" rx="10" fill="#8a5a3a"/><rect x="8" y="-132" width="154" height="194" fill="#f4e8d0"/><rect id="m_photo" x="8" y="-132" width="154" height="194" fill="#fff6dc"/></g>`))+
   `<g id="m_ghost" opacity="0">${N('m_gh',740,980,1.05,makeChar('mg',Object.assign({},F.tia,{silhouette:true,rim:'#ffd8a0'})))}</g>`,
 fg:()=>`<g filter="url(#fSoft30)"><circle cx="1040" cy="1060" r="200" fill="#05040a"/></g>`,
 anim(tl,t0,d){A.setArm('mk','F',-50,-60,0);A.setArm('mk','B',-30,-70,0);A.breathe(tl,'mk',t0,d);A.blinks(tl,'mk',t0,d,1.8);A.head(tl,'mk',8,t0+.2,1);A.look(tl,'mk',2,4,t0+.2);
   tl.to('#m_photo',{opacity:.35,duration:.8,yoyo:true,repeat:Math.floor(d/.8),ease:'sine.inOut'},t0);
   tl.to('#m_ghost',{opacity:.45,duration:1.2},WT(42)-.2).to('#m_ghost',{opacity:0,duration:1},WT(47));tl.to('#d61',{y:-50,duration:d,ease:'none'},t0);}
});

/* 6 ─ "Poco después, su papá se fue a Estados Unidos…" papá con mochila se aleja; niño en la puerta */
S.push({k:'dad',w:49,tr:'whip',cam:{x:[-40,40],s:[1.05,1.12]},
 bg:()=>sky('d_sky',[[0,'#3a4a8a'],[.55,'#e88a6a'],[1,'#ffd08a']])+`<circle cx="760" cy="560" r="90" fill="#ffe2a8"/><circle cx="760" cy="560" r="300" fill="url(#gGlowA)" opacity=".7"/>`+P.mountains(71,640,180,'#8a4a5a','#4a2a40',6),
 mid:()=>floorG('d_g',[[0,'#a86a4a'],[1,'#5a3428']],640)+`<path d="M560 640 L760 640 L1160 1160 L-80 1160Z" fill="#c88a5a" opacity=".55"/>`+
   `<g id="d_sign">${N('d_sg',880,660,.7,`<rect x="-6" y="-150" width="12" height="150" fill="#3a2a22"/><rect x="-120" y="-200" width="240" height="70" rx="8" fill="#2a6a4a"/>${T(0,-155,'NORTE →',{s:36,c:'#fff',ls:4})}`)}</g>`+
   casita(140,920,260,330,'#e8a46a','#a8553a','#ffe0a0')+N('d_kid',150,1000,.85,makeChar('dk',F.hotspanishNino))+
   N('d_dadW',560,960,1.0,`<g id="d_dad">${N('d_dadI',0,0,-1,addToGroup(makeChar('pa',F.papa),'pa_torso','<g transform="translate(-60 -330)"><rect x="-40" y="0" width="80" height="120" rx="20" fill="#5a4a3a"/><rect x="-34" y="10" width="68" height="16" fill="#3a2e24"/></g>'))}</g>`),
 fg:()=>`<g filter="url(#fSoft16)">${P.cactus(1060,1180,1.6,'#2a3a24')}</g>`+`<g id="d_txt" opacity="0"><rect x="300" y="80" width="480" height="96" rx="18" fill="#0c0a14cc"/>${T(540,145,'ESTADOS UNIDOS',{s:50,c:'#ffd24f',ls:6})}</g>`,
 anim(tl,t0,d){A.walk(tl,'pa',t0,d);tl.to('#d_dadW',{x:300,y:-260,scale:.45,duration:d,ease:'none'},t0);
   A.setArm('dk','F',-150,-20,0);tl.to('#dk_faF',{rotation:-50,svgOrigin:'0 0',duration:.3,yoyo:true,repeat:Math.floor(d/.3)},t0+.2);A.blinks(tl,'dk',t0,d);
   tl.fromTo('#d_txt',{opacity:0,y:-20},{opacity:1,y:0,duration:.4,ease:'back.out(2)'},WT(56)-.1);}
});

/* 7 ─ La tía: cocina cálida, hermanos, abrazo; corazón en "mamá" */
S.push({k:'tia',w:63,tr:'fade',cam:{s:[1.04,1.14],x:[20,-20]},
 bg:()=>sky('a_wall',[[0,'#e8b07a'],[1,'#a8684a']])+`<g filter="url(#fWall)"><rect x="-80" y="-80" width="1240" height="900" fill="#d89a6a"/></g>`+
   `<rect x="80" y="160" width="260" height="220" rx="8" fill="#ffe8b8"/><path d="M210 160 v220 M80 270 h260" stroke="#8a5a3a" stroke-width="10"/>`+P.shelf(640,300,340)+
   `<rect x="-80" y="800" width="1240" height="400" fill="#7a4a34" filter="url(#fWood)"/>`+light(540,220,260,120,'gGlowW',.8),
 mid:()=>N('a_tia',600,1020,1.1,makeChar('ti',F.tia))+N('a_kid',420,1030,.95,makeChar('ak',F.hotspanishNino))+
   N('a_sib1',820,1030,.85,makeChar('s1',{skin:['#e3a57c','#b06f4e','#62382c'],hairStyle:'short',top:['#3a8ad8','#163a6a'],kid:true}))+
   N('a_sib2',230,1030,.8,makeChar('s2',{skin:['#e3a57c','#b06f4e','#62382c'],hairStyle:'long',top:['#f2c14e','#a86a12'],kid:true}))+
   `<g id="a_heart" opacity="0"><path d="M540 300 c-40 -60 -130 -20 -100 50 c20 40 100 90 100 90 c0 0 80 -50 100 -90 c30 -70 -60 -110 -100 -50z" fill="#ff5f7a" filter="url(#fGlow)"/></g>`,
 fg:()=>`<rect x="-80" y="980" width="1240" height="200" fill="#4a2a1e"/>`,
 anim(tl,t0,d){['ti','ak','s1','s2'].forEach((c,i)=>{A.breathe(tl,c,t0,d);A.blinks(tl,c,t0+i*.3,d,2);});
   A.mouth(tl,'ti','S',t0);A.look(tl,'ak',6,-6,t0+.3);A.head(tl,'ak',-8,t0+.3);
   const th=WT(72)-.1;A.arm(tl,'ti','B',-60,-80,0,th);A.arm(tl,'ti','F',-40,-70,0,th);A.head(tl,'ti',10,th);tl.to('#a_kid',{x:90,duration:.6,ease:'power2.out'},th);A.mouth(tl,'ak','S',th);
   tl.fromTo('#a_heart',{opacity:0,scale:.5,svgOrigin:'540 360'},{opacity:1,scale:1,duration:.5,ease:'back.out(2.5)'},WT(84)-.15);}
});

/* 8 ─ "Pero en casa hacía falta todo." Mesa con pocas monedas, alacena vacía */
S.push({k:'need',w:85,tr:'cut',cam:{s:[1.18,1.04],ease:'power2.out'},
 bg:()=>sky('n_bg',[[0,'#2a2030'],[1,'#120c16']])+`<g filter="url(#fWall)"><rect x="-80" y="-80" width="1240" height="800" fill="#3a2a34"/></g>`+
   `<g id="n_cup"><rect x="560" y="120" width="380" height="460" rx="10" fill="#4a3226"/><rect x="580" y="140" width="340" height="420" fill="#1c120e"/><path d="M580 280 H920 M580 420 H920" stroke="#4a3226" stroke-width="12"/><rect x="620" y="370" width="50" height="50" rx="6" fill="#c8b890"/></g>`+
   beam(300,-60,260,800,8,'#ffe2a8',.25),
 mid:()=>`<rect x="40" y="720" width="760" height="40" rx="10" fill="#6a4a34" filter="url(#fWood)"/><rect x="80" y="760" width="30" height="300" fill="#4a3226"/><rect x="730" y="760" width="30" height="300" fill="#4a3226"/>`+
   `<g id="n_coins">${[0,1,2].map(i=>N('n_c'+i,260+i*70,700-i*6,.6,P.coin(34))).join('')}</g>`+N('n_pl',560,712,1,`<ellipse rx="110" ry="22" fill="#e8e2d6"/><ellipse rx="80" ry="14" fill="#d0c8ba"/>`),
 fg:()=>light(330,700,260,90,'gGlowA',.4),
 anim(tl,t0,d){[0,1,2].forEach(i=>tl.fromTo('#n_c'+i,{y:-200,opacity:0},{y:0,opacity:1,duration:.35,ease:'bounce.out'},t0+.15+i*.2));}
});

/* 9 ─ A los 7 años: niños jugan fútbol afuera; Roberto en el mostrador haciendo tortas con el señor */
S.push({k:'tortas',w:91,tr:'whip',title:'7 AÑOS',titleAt:92,cam:{x:[60,-30],s:[1.04,1.12]},
 bg:()=>sky('to_sky',[[0,'#f6c87a'],[1,'#e8885a']])+casita(150,560,240,250,'#e8c48a','#a8553a')+casita(930,560,240,240,'#c8a0d0','#7a4a8a')+floorG('to_st',[[0,'#c8a47a'],[1,'#a07a54']],560)+
   `<g id="to_kids">${N('to_k1',160,700,.5,makeChar('k1',{hairStyle:'short',top:['#3ac87a','#146a3a'],kid:true}))}${N('to_k2',330,700,-.5,makeChar('k2',{hairStyle:'curly',top:['#f2c14e','#a86a12'],kid:true}))}<circle id="to_ball" cx="245" cy="690" r="16" fill="#fff" stroke="#222" stroke-width="3"/></g>`,
 mid:()=>`<rect x="420" y="180" width="660" height="560" fill="#7a3a2a"/><rect x="400" y="160" width="700" height="60" fill="#d8362f"/>${T(750,206,'TORTAS',{s:44,c:'#fff',ls:10})}<path d="M400 220 h700" stroke="#ffd24f" stroke-width="6" stroke-dasharray="40 40"/>`+light(760,300,260,160,'gGlowW',.6)+
   N('to_sen',900,1010,1.0,makeChar('se',F.senor))+N('to_kid',620,1010,.95,addToGroup(makeChar('tk2',F.hotspanishNino),'tk2_hF','<g transform="translate(20 46)"><rect x="-40" y="-6" width="80" height="12" rx="4" fill="#c8c8d0"/></g>'))+
   `<rect x="380" y="790" width="780" height="60" rx="8" fill="#e8dcc8"/><rect x="380" y="850" width="780" height="320" fill="#6a3a2a" filter="url(#fWood)"/>`+torta('to_t1',560,780,1)+torta('to_t2',740,780,.9)+`<g id="to_t3w" opacity="0">${torta('to_t3',660,700,1)}</g>`,
 fg:()=>`<g filter="url(#fSoft8)"><rect x="-120" y="900" width="420" height="300" fill="#2a1a12"/></g>`,
 anim(tl,t0,d){tl.to('#to_ball',{x:60,y:-40,duration:.4,yoyo:true,repeat:Math.floor(d/.4),ease:'sine.inOut'},t0);A.walk(tl,'k1',t0,d,.3);A.walk(tl,'k2',t0,d,.3);
   A.setArm('tk2','F',-70,-40,0);tl.to('#tk2_uaF',{rotation:-55,svgOrigin:'0 0',duration:.25,yoyo:true,repeat:Math.floor(d/.25)},t0);A.blinks(tl,'tk2',t0,d);A.look(tl,'tk2',-6,0,t0+.5);
   A.breathe(tl,'se',t0,d);A.setArm('se','F',-60,-50,0);A.mouth(tl,'se','S',t0);
   tl.fromTo('#to_t3w',{opacity:0,y:40},{opacity:1,y:0,duration:.4,ease:'back.out(2)'},WT(110));}
});

/* 10 ─ A los 11: mapa Michoacán → Estados Unidos, ruta animada */
S.push({k:'map',w:112,tr:'zoom',title:'11 AÑOS',titleAt:114,cam:{s:[1.0,1.15],y:[30,-30]},
 bg:()=>sky('mp_bg',[[0,'#0e2a44'],[1,'#071420']])+`<g opacity=".18">${Array.from({length:12},(_,i)=>`<path d="M${-80+i*110} -80 V1160 M-80 ${-80+i*110} H1160" stroke="#5ff3ff" stroke-width="1.5"/>`).join('')}</g>`,
 mid:()=>`<path d="M140 220 L420 200 L520 260 L700 230 L920 280 L980 400 L860 470 L760 470 L700 560 L640 640 L700 760 L760 880 L680 900 L560 760 L500 620 L420 520 L300 440 L180 380Z" fill="#1f4a6a" stroke="#5ff3ff" stroke-width="3" opacity=".9"/>`+
   `<path d="M140 220 L920 280 L980 400 L860 470" fill="none" stroke="#ffd24f" stroke-width="4" stroke-dasharray="14 10"/>`+
   `<circle cx="640" cy="760" r="14" fill="#ff5f7a"/><circle cx="640" cy="760" r="60" fill="url(#gGlowR)" opacity=".7"/>${T(640,820,'MICHOACÁN',{s:30,c:'#fff',ls:4})}`+
   `<circle id="mp_dst" cx="300" cy="320" r="14" fill="#5ff3ff" opacity="0"/>${T(330,300,'ESTADOS UNIDOS',{s:30,c:'#5ff3ff',ls:4,id:'mp_dstT',op:0,a:'start'})}`+
   `<path id="mp_route" d="M640 760 Q420 620 300 320" fill="none" stroke="#ffd24f" stroke-width="8" stroke-linecap="round" stroke-dasharray="620" stroke-dashoffset="620" filter="url(#fGlow)"/>`,
 fg:()=>N('mp_kid',900,1060,.75,addToGroup(makeChar('mk2',Object.assign({},F.hotspanishNino,{top:['#3a6ad8','#162a6a']})),'mk2_torso','<g transform="translate(-58 -320)"><rect x="-34" y="0" width="68" height="110" rx="18" fill="#d8362f"/></g>')),
 anim(tl,t0,d){tl.to('#mp_route',{strokeDashoffset:0,duration:2.2,ease:'power2.inOut'},WT(120)-.1);tl.to(['#mp_dst','#mp_dstT'],{opacity:1,duration:.3},WT(131));A.breathe(tl,'mk2',t0,d);A.blinks(tl,'mk2',t0,d);A.look(tl,'mk2',-6,-4,t0+.3);}
});

/* 11 ─ "Otro país, otra escuela… un idioma que no entendía." Pasillo con casilleros, globos en inglés */
S.push({k:'school',w:133,tr:'wipe',cam:{x:[-50,30],s:[1.06,1.14]},
 bg:()=>sky('sc_bg',[[0,'#d8e2ea'],[1,'#a8b8c8']])+`<g>${Array.from({length:12},(_,i)=>`<rect x="${-60+i*100}" y="220" width="92" height="520" rx="4" fill="${i%2?'#3a6aa8':'#2e5a94'}"/><rect x="${-40+i*100}" y="260" width="50" height="8" fill="#1c3a64"/><rect x="${-40+i*100}" y="280" width="50" height="8" fill="#1c3a64"/><circle cx="${18+i*100}" cy="480" r="6" fill="#c8d0d8"/>`).join('')}</g>`+
   `<rect x="-80" y="740" width="1240" height="420" fill="#c8bca8"/>${Array.from({length:6},(_,i)=>`<path d="M${-80+i*240} 740 L${-300+i*300} 1160" stroke="#b0a490" stroke-width="3"/>`).join('')}`+beam(540,-80,600,900,0,'#ffffff',.18),
 mid:()=>N('sc_a',220,1010,.95,makeChar('sa',{hairStyle:'short',hair:['#e8c87a','#a8843a'],skin:['#f6d0b0','#d0a080','#8a5a48'],top:['#e85a4a','#8a2a24']}))+N('sc_b',380,1010,.95,makeChar('sb',{hairStyle:'long',hair:['#3a2418','#140a06'],skin:['#c88a62','#9a5a3c','#4a2a1e'],top:['#f2c14e','#a86a12']}))+
   N('sc_kid',780,1010,-.92,addToGroup(makeChar('sk',Object.assign({},F.hotspanishNino,{kid:false,top:['#3a6ad8','#162a6a']})),'sk_torso','<g transform="translate(-58 -320)"><rect x="-34" y="0" width="68" height="110" rx="18" fill="#d8362f"/></g>'))+
   `<g id="sc_b1" opacity="0"><rect x="120" y="230" width="300" height="100" rx="40" fill="#fff"/><path d="M220 330 l20 40 l20 -40z" fill="#fff"/>${T(270,295,'Hey, what\'s up?',{s:32,c:'#2a2a3a',w:800})}</g>`+
   `<g id="sc_b2" opacity="0"><rect x="340" y="120" width="320" height="100" rx="40" fill="#fff"/><path d="M420 220 l10 40 l30 -40z" fill="#fff"/>${T(500,185,'Where are you from?',{s:30,c:'#2a2a3a',w:800})}</g>`+
   `<g id="sc_q" opacity="0">${T(800,400,'?',{s:160,c:'#ffd24f',f:'fGlow'})}</g>`,
 fg:()=>`<g filter="url(#fSoft16)"><rect x="960" y="-80" width="300" height="1240" fill="#1c3a64"/></g>`,
 anim(tl,t0,d){['sa','sb','sk'].forEach(c=>{A.breathe(tl,c,t0,d);A.blinks(tl,c,t0,d);});A.mouth(tl,'sa','O',t0+.3);A.mouth(tl,'sb','S',t0+.8);
   tl.fromTo('#sc_b1',{opacity:0,scale:.6,svgOrigin:'270 330'},{opacity:1,scale:1,duration:.3,ease:'back.out(2)'},t0+.3);
   tl.fromTo('#sc_b2',{opacity:0,scale:.6,svgOrigin:'500 220'},{opacity:1,scale:1,duration:.3,ease:'back.out(2)'},t0+1.1);
   tl.fromTo('#sc_q',{opacity:0,y:30},{opacity:1,y:0,duration:.35,ease:'back.out(2.5)'},WT(139)-.1);A.brows(tl,'sk',-6,WT(139));A.mouth(tl,'sk','O',WT(141));}
});

/* 12 ─ "Le tomó un año entero aprender inglés." Escritorio nocturno, libro, calendario que pasa 12 meses */
S.push({k:'learn',w:143,tr:'fade',cam:{s:[1.04,1.14]},
 bg:()=>sky('l_bg',[[0,'#141a34'],[1,'#080a18']])+`<rect x="720" y="120" width="260" height="300" rx="6" fill="#0a1024"/>${P.stars(81,24,240,280).replace(/cx="([\d.]+)" cy="([\d.]+)"/g,(m,a,b)=>`cx="${+a+730}" cy="${+b+130}"`)}`+
   `<g id="l_cal">${['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'].map((m,i)=>`<g id="l_m${i}" opacity="${i?0:1}">${N('l_mi'+i,250,280,.5,P.calendarPage('lc'+i,String(i+1),m,'#3a8ad8'))}</g>`).join('')}</g>`,
 mid:()=>light(560,640,380,240,'gGlowA',.75,'l_lamp')+`<path d="M700 420 l-90 140 h-140 z" fill="#ffd27a" opacity=".2"/><rect x="660" y="380" width="80" height="40" rx="10" fill="#3a3a46"/><path d="M700 420 V720" stroke="#3a3a46" stroke-width="10"/>`+
   `<rect x="80" y="720" width="920" height="40" rx="8" fill="#5a3a2a" filter="url(#fWood)"/>`+
   N('l_kid',420,1060,.95,makeChar('lk',Object.assign({},F.hotspanishNino,{kid:false,top:['#3a6ad8','#162a6a']})))+
   `<g id="l_book"><path d="M440 700 L560 680 L680 700 L680 720 L440 720Z" fill="#f4ecd8"/><path d="M560 680 V720" stroke="#c8b898" stroke-width="3"/>${T(500,712,'ABC',{s:18,c:'#3a3a46'})}${T(620,712,'English',{s:16,c:'#3a3a46'})}</g>`,
 fg:()=>`<g id="l_words" opacity="0">${T(250,560,'hello',{s:42,c:'#5ff3ff',w:800})}${T(900,560,'friend',{s:42,c:'#5ff3ff',w:800})}${T(820,680,'school',{s:38,c:'#ffd24f',w:800})}</g>`,
 anim(tl,t0,d){A.setArm('lk','F',-70,-60,0);A.setArm('lk','B',-60,-70,0);A.breathe(tl,'lk',t0,d);A.blinks(tl,'lk',t0,d,1.6);A.look(tl,'lk',4,6,t0+.2);A.head(tl,'lk',10,t0+.2);
   const step=Math.max(.12,(WT(149)-t0)/12);for(let i=1;i<12;i++){tl.set('#l_m'+(i-1),{opacity:0},t0+i*step).set('#l_m'+i,{opacity:1},t0+i*step);}
   tl.to('#l_words',{opacity:1,duration:.4},WT(148));A.mouth(tl,'lk','S',WT(149));}
});

/* 13 ─ "encontró algo que lo hacía sentir visible: una cámara… y YouTube." */
S.push({k:'camera',w:150,tr:'fade',cam:{s:[1.0,1.2],ease:'power2.inOut'},
 bg:()=>sky('c_bg',[[0,'#0a0a16'],[1,'#04040a']])+beam(540,-80,520,1100,0,'#cfe6ff',.22)+dust(91,40,1080,1080,'#cfe6ff'),
 mid:()=>light(540,980,300,50,'gShadow',.9)+`<rect x="380" y="900" width="320" height="30" rx="8" fill="#2a2a36"/>`+camara('c_cam',540,820,1.6)+
   `<g id="c_play" opacity="0">${light(540,420,360,260,'gGlowW',.5)}<rect x="400" y="300" width="280" height="200" rx="56" fill="#f4f4f8"/><path d="M505 350 L605 400 L505 450Z" fill="#14141c"/>${T(540,580,'YouTube',{s:64,c:'#fff',ls:2})}</g>`,
 fg:()=>`<g filter="url(#fSoft16)"><circle cx="-40" cy="1080" r="220" fill="#020206"/><circle cx="1120" cy="1100" r="240" fill="#020206"/></g>`,
 anim(tl,t0,d){tl.to('#c_cam_rec',{opacity:.2,duration:.4,yoyo:true,repeat:Math.floor(d/.4)},t0);tl.fromTo('#c_cam',{scale:.8,svgOrigin:'0 0'},{scale:1,duration:1.4,ease:'power2.out'},t0);
   tl.fromTo('#c_play',{opacity:0,scale:.7,svgOrigin:'540 400'},{opacity:1,scale:1,duration:.45,ease:'back.out(2.2)'},WT(165)-.1);tl.to('#d91',{y:-60,duration:d,ease:'none'},t0);}
});

/* 14 ─ "Empezó grabando videos caseros… sin que nadie lo conociera." Cuarto, tripié, laptop con 0 vistas */
S.push({k:'home',w:166,tr:'whip',cam:{x:[30,-30],s:[1.05,1.12]},
 bg:()=>sky('ho_bg',[[0,'#2a2440'],[1,'#141022']])+`<g filter="url(#fWall)"><rect x="-80" y="-80" width="1240" height="840" fill="#3a3256"/></g>`+
   `<rect x="80" y="140" width="200" height="260" fill="#1a1630"/><rect x="92" y="152" width="176" height="236" fill="#5a3a7a"/>${T(180,290,'★',{s:90,c:'#ffd24f'})}`+
   `<rect x="-80" y="760" width="1240" height="400" fill="#2a2234"/>`+light(240,300,240,240,'gGlowP',.35),
 mid:()=>N('ho_rob',300,1030,1.1,makeChar('hr',F.hotspanishYT))+tripode(760,560)+camara('ho_cam',760,540,.8)+
   `<rect x="620" y="880" width="420" height="30" rx="6" fill="#4a3a2a"/>`+N('ho_lap',830,880,.6,P.laptop('hl',pantallaPlay('#1c2440')+`<text x="0" y="-60" font-family="DatoSans" font-weight="900" font-size="34" fill="#9aa8c8" text-anchor="middle">0 vistas</text>`)),
 fg:()=>light(760,520,160,160,'gGlowR',.25,'ho_rec'),
 anim(tl,t0,d){A.breathe(tl,'hr',t0,d);A.blinks(tl,'hr',t0,d,1.5);A.look(tl,'hr',8,0,t0+.2);
   A.arm(tl,'hr','F',-120,-30,0,t0+.3);A.laugh(tl,'hr',t0+.4,1.4);A.mouth(tl,'hr','S',t0+2);A.arm(tl,'hr','F',-30,-60,0,t0+2.2);
   tl.to('#ho_cam_rec',{opacity:.2,duration:.4,yoyo:true,repeat:Math.floor(d/.4)},t0);tl.to('#ho_rec',{opacity:.05,duration:.4,yoyo:true,repeat:Math.floor(d/.4)},t0);A.head(tl,'hr',-8,WT(175));}
});

/* 15 ─ "Hasta que un día subió un video tan polémico…" pantallas que se multiplican; "¿QUIÉN ES?" */
S.push({k:'viral',w:178,tr:'glitch',cam:{s:[1.0,1.22],ease:'power2.in'},
 bg:()=>sky('v_bg',[[0,'#1a0630'],[1,'#05020c']])+light(540,540,600,600,'gGlowP',.4),
 mid:()=>N('v_lap',540,620,1.1,P.laptop('vl',pantallaPlay('#3a1050')+`<g id="v_up"><rect x="-150" y="-60" width="300" height="20" rx="10" fill="#2a1a3a"/><rect id="v_bar" x="-150" y="-60" width="0" height="20" rx="10" fill="#ff4fd8"/></g>`))+
   `<g id="v_phones">${[[160,260,-14],[920,240,12],[130,820,10],[950,830,-10],[540,140,0],[300,520,-6],[790,520,8]].map(([x,y,r],i)=>`<g id="v_p${i}" opacity="0">${N('v_pi'+i,x,y,.32,P.phone('vp'+i,`<rect x="-134" y="-282" width="268" height="564" fill="#2a0f3a"/><rect x="-100" y="-140" width="200" height="140" rx="20" fill="#f4f4f8"/><path d="M-20 -100 L30 -70 L-20 -40Z" fill="#2a0f3a"/><rect x="-100" y="40" width="200" height="16" rx="8" fill="#ff4fd8"/><rect x="-100" y="70" width="140" height="16" rx="8" fill="#9a6ab8"/>`),r)}</g>`).join('')}</g>`+
   `<g id="v_who" opacity="0"><rect x="250" y="880" width="580" height="120" rx="24" fill="#0c0614ee"/>${T(540,965,'¿QUIÉN ES?',{s:76,c:'#5ff3ff',ls:6,f:'fNeon'})}${T(540,965,'¿QUIÉN ES?',{s:76,c:'#effeff',ls:6})}</g>`,
 fg:()=>dust(101,40,1080,1080,'#ff9ae8'),
 anim(tl,t0,d){tl.to('#v_bar',{attr:{width:300},duration:1.2,ease:'power1.inOut'},WT(182));
   for(let i=0;i<7;i++)tl.fromTo('#v_p'+i,{opacity:0,scale:.4,svgOrigin:'540 540'},{opacity:1,scale:1,duration:.3,ease:'back.out(2)'},WT(186)+.12*i);
   tl.to('#v_phones',{x:8,duration:.05,yoyo:true,repeat:20},WT(189));tl.fromTo('#v_who',{opacity:0,scale:.8,svgOrigin:'540 940'},{opacity:1,scale:1,duration:.35,ease:'back.out(2.5)'},WT(193)-.1);
   tl.to('#d101',{y:-80,duration:d,ease:'none'},t0);}
});

/* 16 ─ CLIFFHANGER: "Y ahí empezó todo." Silueta adulta a contraluz rosa (look de la parte 2) */
S.push({k:'end',w:197,tr:'flash',cam:{s:[1.25,1.05],y:[60,0],ease:'power2.out'},
 bg:()=>sky('e_bg',[[0,'#12051e'],[.6,'#3a0a40'],[1,'#ff4fb4']])+light(540,820,620,420,'gGlowP',.9)+beam(540,1160,700,1300,180,'#ff9ae8',.25),
 mid:()=>`<g id="e_hs">${N('e_hsI',540,1060,1.25,makeChar('eh',Object.assign({},F.hotspanish,{silhouette:true,rim:'#ff9ae8'})))}</g>`,
 fg:()=>`<g id="e_txt" opacity="0">${T(540,170,'PARTE 2',{s:80,c:'#fff',ls:14})}<rect id="e_bar" x="420" y="200" width="240" height="10" rx="5" fill="#ffd24f"/></g>`,
 anim(tl,t0,d){A.breathe(tl,'eh',t0,d);tl.fromTo('#e_hs',{opacity:0},{opacity:1,duration:.9,ease:'power2.out'},t0);
   tl.fromTo('#e_txt',{opacity:0,y:-20},{opacity:1,y:0,duration:.4,ease:'back.out(2)'},WT(199));tl.to('#black',{opacity:1,duration:.5},t0+d-.5);}
});

window.SCENES=S;
window.EPISODE_KEYWORDS=['jiquilpan','michoacan','mama','carretera','barranco','tia','tortas','siete','once','ingles','camara','youtube','polemico','chavo'];
})();
