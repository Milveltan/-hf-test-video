/* DATOLOGO · episodio gta-vi-13-anios · scenes.js — "¿Por qué GTA VI tardó trece años en salir?"
   Cada escena: {k, w (índice de palabra donde arranca), tr (transición), cam, bg/mid/fg (SVG en marco 1080x1920), anim(tl,t0,d)}
   Ilustración original: sin logotipos ni personajes con marca; ciudades, autos y personas genéricos. */
(function(){
const {lg,rg,def,PRNG}=DL; const P=DLP; const {makeChar,A}=DLC;
const {N,T,addToGroup,sky,floorG,light,beam}=DLK;
const R=PRNG(2026);

const FICHA=window.FICHAS;

const S=[];

/* 1 ─ GANCHO: ciudad neón, letrero GTA VI y 13 AÑOS */
S.push({k:'hook',w:0,tr:'fade',cam:{y:[260,-40],s:[1.18,1.06],ease:'power2.inOut'},
 bg:()=>sky('s1sky',[[0,'#1a0b3a'],[.45,'#6a1f6e'],[.7,'#ff6a5a'],[.82,'#ffb56a'],[1,'#ffd9a0']])+P.stars(11,60,1080,700)+
   light(540,1180,520,160,'gGlowA',.9)+
   P.skyline(101,{base:1260,minH:120,maxH:420,top:'#3a1a52',bot:'#1a0c2e',side:'#12081f',lit:'#ffb3e6',dark:'#2a1640',neon:['#ff4fd8','#5ff3ff'],towers:false})+
   P.skyline(102,{base:1300,minH:160,maxH:620,minW:90,maxW:190,top:'#2a1240',bot:'#0e0618',side:'#08040e',lit:'#ffd38a',dark:'#1c0c2a',neon:['#ff4fd8','#5ff3ff','#ffd24f']}),
 mid:()=>`<g id="h_sign" opacity="0">${T(540,560,'GTA VI',{s:190,c:'#ff7ad9',f:'fNeon',ls:10})}${T(540,560,'GTA VI',{s:190,c:'#fff4fb',ls:10})}</g>`+
   `<g id="h_years" opacity="0">${T(540,730,'13 AÑOS',{s:110,c:'#5ff3ff',f:'fNeon',ls:14})}${T(540,730,'13 AÑOS',{s:110,c:'#effeff',ls:14})}</g>`+
   floorG('s1road',[[0,'#2a1636'],[1,'#07040c']],1300)+
   `<path d="M-100 1500 L1180 1440" stroke="#ff4fd855" stroke-width="6"/><path d="M-100 1560 L1180 1500" stroke="#ffffff30" stroke-width="10" stroke-dasharray="60 50"/>`+
   N('h_car',-400,1560,1.15,P.car('c1',{c1:'#ff5fb0',c2:'#5a0f3e',type:'sport',rim:'#ffd0f0'})),
 fg:()=>`<g filter="url(#fSoft8)">${P.palm(-40,2000,1.9,'#08030c')}${P.palm(1120,2050,2.1,'#08030c')}</g>`,
 anim(tl,t0,d){tl.to('#h_car',{x:1700,duration:d+.4,ease:'power1.in'},t0);tl.to(['#c1_wa','#c1_wb'],{rotation:1440,svgOrigin:'0 0',duration:d+.4,ease:'none'},t0);
   const ts=WT(3)-.15;tl.set('#h_sign',{opacity:.3},ts).set('#h_sign',{opacity:0},ts+.06).set('#h_sign',{opacity:1},ts+.12).fromTo('#h_sign',{scale:.85,svgOrigin:'540 520'},{scale:1,duration:.6,ease:'back.out(2)'},ts);
   tl.fromTo('#h_years',{opacity:0,y:30},{opacity:1,y:0,duration:.4,ease:'power3.out'},WT(5)-.1);}
});

/* 2 ─ El jugador: 15 años en 2013 → 28 años hoy */
S.push({k:'gamer',w:9,tr:'whip',cam:{x:[30,-30],s:[1.08,1.16]},
 bg:()=>sky('s2wall',[[0,'#1b2440'],[1,'#0e1426']])+`<rect x="-100" y="-100" width="1280" height="2120" fill="#000" opacity="0" />`+
   `<g filter="url(#fWall)"><rect x="-100" y="-100" width="1280" height="1500" fill="#22305a" opacity=".5"/></g>`+
   `<rect x="640" y="260" width="380" height="520" rx="10" fill="#0b1830"/><rect x="660" y="280" width="340" height="480" fill="#162c58"/>${P.stars(22,40,320,460).replace(/<circle cx="([\d.]+)" cy="([\d.]+)"/g,(m,a,b)=>`<circle cx="${+a+670}" cy="${+b+290}"`)}<circle cx="900" cy="380" r="46" fill="#e8f0ff"/><circle cx="900" cy="380" r="140" fill="url(#gGlowW)" opacity=".3"/><path d="M830 280 v480 M660 520 h340" stroke="#0b1830" stroke-width="16"/>`+
   `<rect x="80" y="300" width="230" height="320" fill="#3a1a2a"/><rect x="96" y="316" width="198" height="288" fill="#d24a3a"/><circle cx="195" cy="420" r="60" fill="#ffd24f"/><path d="M110 590 l60 -90 l40 50 l40 -70 l40 110 z" fill="#2a0f1a"/>`+
   `<g id="g_cal">${N('g_calA',450,190,.62,P.calendarPage('calA','2013','ENERO'))}<g id="g_calB" opacity="0">${N('g_calBi',450,190,.62,P.calendarPage('calB','2026','HOY','#2fb8c9'))}</g></g>`+
   `<rect x="-100" y="1500" width="1280" height="520" fill="#141a2e"/>`,
 mid:()=>light(900,900,600,700,'gGlowB',.35,'g_tv')+
   `<g id="g_teen">${N('g_teenI',470,1990,2.25,addToGroup(makeChar('ju',FICHA.jugador),'ju_hF',`<g transform="translate(10 40) rotate(-20)"><path d="M-70 -10 q0 -30 30 -30 h80 q30 0 30 30 q4 40 -20 46 q-20 4 -34 -16 h-32 q-14 20 -34 16 q-24 -6 -20 -46z" fill="#1d1f28"/><circle cx="34" cy="-12" r="6" fill="#ff4a4a"/><circle cx="46" cy="0" r="6" fill="#4ad1ff"/><path d="M-50 -10 h20 M-40 -20 v20" stroke="#888" stroke-width="5"/></g>`))}</g>`+
   `<g id="g_adult" opacity="0">${N('g_adultI',470,1990,2.35,addToGroup(makeChar('ja',FICHA.jugadorAdulto),'ja_hF',`<g transform="translate(10 40) rotate(-20)"><path d="M-70 -10 q0 -30 30 -30 h80 q30 0 30 30 q4 40 -20 46 q-20 4 -34 -16 h-32 q-14 20 -34 16 q-24 -6 -20 -46z" fill="#1d1f28"/><circle cx="34" cy="-12" r="6" fill="#ff4a4a"/><circle cx="46" cy="0" r="6" fill="#4ad1ff"/></g>`))}</g>`+
   `<g id="g_age">${T(860,1180,'15',{s:150,c:'#ffd24f',id:'g_n1'})}${T(860,1180,'28',{s:150,c:'#5ff3ff',id:'g_n2',op:0})}${T(860,1240,'AÑOS',{s:46,c:'#fff',ls:8})}</g>`,
 fg:()=>`<g filter="url(#fSoft16)"><rect x="-120" y="1700" width="560" height="400" rx="40" fill="#0a0d18"/><circle cx="980" cy="1820" r="160" fill="#101626"/></g>`,
 anim(tl,t0,d){['ju','ja'].forEach(id=>{A.setArm(id,'F',-55,-75,10);A.setArm(id,'B',-40,-80,0);});
   A.breathe(tl,'ju',t0,d);A.blinks(tl,'ju',t0,d,1.4);A.look(tl,'ju',4,-2,t0+.2);
   tl.to('#g_tv',{opacity:.6,duration:.12,yoyo:true,repeat:Math.floor(d/.24)},t0);
   tl.to('#ju_hF',{rotation:-6,svgOrigin:'0 0',duration:.12,yoyo:true,repeat:7},t0+.3);
   const tw=WT(18)-.1; // "hoy"
   tl.to('#g_calA',{scaleY:0,svgOrigin:'0 -200',opacity:0,duration:.3,ease:'power2.in'},tw-.3).to('#g_calB',{opacity:1,duration:.2},tw);
   tl.to('#g_teen',{opacity:0,duration:.25},tw).to('#g_adult',{opacity:1,duration:.25},tw);
   tl.to('#g_n1',{opacity:0,y:-40,duration:.25},tw).fromTo('#g_n2',{opacity:0,y:40},{opacity:1,y:0,duration:.3,ease:'back.out(2)'},tw);
   A.breathe(tl,'ja',tw,d-(tw-t0));A.blink(tl,'ja',tw+.5);A.mouth(tl,'ja','O',tw+.3);A.head(tl,'ja',-6,tw+.2);}
});

/* 3 ─ "todo empezó con un error" */
S.push({k:'error',w:22,tr:'glitch',cam:{s:[1.0,1.22],ease:'power2.in'},
 bg:()=>sky('s3bg',[[0,'#05060c'],[1,'#0b0f1c']])+(()=>{let s='';const r=PRNG(33);for(let i=0;i<46;i++){const y=120+i*38,x=80+Math.floor(r()*4)*40;s+=`<rect x="${x}" y="${y}" width="${120+r()*520}" height="16" rx="4" fill="${['#2ad18f','#4aa8ff','#c08aff','#8a93a8'][Math.floor(r()*4)]}" opacity=".55"/>`;}return `<g id="e_code">${s}</g>`;})(),
 mid:()=>`<g id="e_box">${light(540,960,560,300,'gGlowR',.6)}<rect x="160" y="820" width="760" height="280" rx="24" fill="#2a0508" stroke="#ff3b3b" stroke-width="8"/>${T(540,1000,'ERROR',{s:170,c:'#ff4646',f:'fGlow',ls:16})}<g id="e_r" opacity=".7">${T(548,1000,'ERROR',{s:170,c:'#00e5ff',ls:16,op:.5})}</g>${T(540,1070,'0x1995 · policías.exe',{s:34,c:'#ffb0b0',w:700})}</g>`,
 fg:()=>`<g id="e_bars" opacity="0">${[0,1,2,3,4,5].map(i=>`<rect x="-100" y="${200+i*290}" width="1280" height="${20+i*7}" fill="${i%2?'#ff3b3b':'#00e5ff'}" opacity=".5"/>`).join('')}</g>`,
 anim(tl,t0,d){tl.to('#e_code',{y:-300,duration:d,ease:'none'},t0);tl.fromTo('#e_box',{scale:.6,opacity:0,svgOrigin:'540 960'},{scale:1,opacity:1,duration:.3,ease:'back.out(3)'},WT(27)-.1);
   for(let i=0;i<6;i++){const t=WT(27)+i*.18;tl.set('#e_bars',{opacity:1,y:(i%2?40:-30)},t).set('#e_bars',{opacity:0},t+.06).set('#e_r',{x:i%2?-14:14},t).set('#e_r',{x:0},t+.08);}}
});

/* 4 ─ DUNDEE, 1995 — lluvia sobre el río Tay */
S.push({k:'dundee',w:28,tr:'flash',title:'DUNDEE · 1995',cam:{x:[60,-70],s:[1.12,1.18]},
 bg:()=>sky('s4sky',[[0,'#2a3348'],[.5,'#5a6478'],[.75,'#c08a6a'],[1,'#e0a878']])+
   `<g opacity=".8">${P.mountains(41,1000,180,'#4a5468','#3a4458',7)}</g>`+
   `<path d="M-100 990 L1180 960" stroke="#2a3040" stroke-width="10"/>${[...Array(18)].map((_,i)=>`<rect x="${-80+i*72}" y="${975-i*1.7}" width="8" height="40" fill="#2a3040"/>`).join('')}`+
   P.skyline(401,{base:1180,minH:140,maxH:360,minW:110,maxW:200,top:'#6a5a58',bot:'#3a3238',side:'#2a2228',lit:'#ffcf7a',dark:'#3a3238',towers:false,tanks:false,depth:22})+
   `<path d="M-100 1180 h1280 v900 h-1280z" fill="#2a3446"/>`+`<g opacity=".55">${P.skyline(401,{base:1180,minH:140,maxH:360,minW:110,maxW:200,top:'#6a5a58',bot:'#3a3238',side:'#2a2228',lit:'#ffcf7a',dark:'#3a3238',towers:false,depth:22}).replace(/<rect /g,'<rect transform="scale(1 -1) translate(0 -2360)" ')}</g>`+
   `<rect x="-100" y="1180" width="1280" height="900" fill="url(#gFadeB)" opacity=".5"/>`,
 mid:()=>`<rect x="-100" y="1560" width="1280" height="520" fill="#1d222c"/><path d="M-100 1560 h1280" stroke="#4a5262" stroke-width="10"/>`+
   `<g transform="translate(820 1560)"><rect x="-10" y="-560" width="20" height="560" fill="#1a1d24"/><path d="M0 -560 q60 -20 80 10" stroke="#1a1d24" stroke-width="16" fill="none"/><rect x="62" y="-560" width="40" height="26" rx="6" fill="#ffe6a8"/>${light(82,-520,160,160,'gGlowA',.9,'d_lamp')}${beam(82,-534,260,520,0,'#ffd88a',.3)}</g>`+
   `<g id="d_rain">${P.rain(44,140,-100,-200,1300,2300)}</g>`,
 fg:()=>`<g filter="url(#fSoft8)"><path d="M-120 1900 L-120 1300 L120 1360 L160 2050 Z" fill="#141820"/><rect x="900" y="1500" width="300" height="600" fill="#10141c"/></g>`,
 anim(tl,t0,d){tl.fromTo('#d_rain',{y:-200},{y:200,duration:d,ease:'none'},t0);tl.to('#d_lamp',{opacity:.6,duration:.08,yoyo:true,repeat:3},t0+d*.5);}
});

/* 5 ─ Estudio DMA Design: programadores, CRT con el mapa */
S.push({k:'studio',w:31,tr:'zoom',cam:{x:[-40,40],y:[40,0],s:[1.15,1.08]},
 bg:()=>sky('s5wall',[[0,'#2a2238'],[1,'#3a2a38']])+`<g filter="url(#fWall)"><rect x="-100" y="-100" width="1280" height="1300" fill="#4a3a4a" opacity=".5"/></g>`+
   `<rect x="80" y="220" width="330" height="240" fill="#1a1626"/><rect x="96" y="236" width="298" height="208" fill="#5a6a8a"/>${P.rain(55,26,100,240,290,200,'#d0e0ff')}<path d="M245 236 v208 M96 340 h298" stroke="#1a1626" stroke-width="10"/>`+
   `<rect x="560" y="200" width="420" height="300" fill="#e8e0cc" opacity=".9"/>${T(770,270,'RACE\'N\'CHASE',{s:40,c:'#c0392b'})}<path d="M600 320 h330 M600 360 h260 M600 400 h300 M600 440 h200" stroke="#7a6a5a" stroke-width="8"/>`+
   `<rect x="-100" y="1200" width="1280" height="900" fill="#2a2030"/>`,
 mid:()=>`<path d="M-100 1220 L1180 1180 L1180 1300 L-100 1340 Z" fill="url(#d5desk)"/><path d="M-100 1340 L1180 1300 L1180 1340 L-100 1380 Z" fill="#2a160c"/>`+
   N('st_crt',700,980,.95,P.crt('crt5',`<g id="st_map">${P.topMap(5)}</g>${N('st_p',-40,0,1,P.topCar({c:'#f2c14e'}))}${N('st_c1',-160,-64,1,P.topCar({police:true}))}${N('st_c2',140,64,1,P.topCar({police:true}),180)}${T(0,-112,'RACE\'N\'CHASE',{s:30,c:'#7dffb0'})}`))+
   light(700,980,520,420,'gGlowC',.35)+light(120,900,420,520,'gGlowA',.45)+
   `<g transform="translate(130 1200)"><path d="M-40 0 L40 0 L20 -40 L-20 -40Z" fill="#2a2a30"/><path d="M0 -40 L60 -220" stroke="#2a2a30" stroke-width="12"/><path d="M40 -250 l70 20 l-30 60 l-70 -30z" fill="#3a3a44"/></g>`+
   `<g id="st_dev">${N('st_devI',330,1800,1.75,makeChar('d1',FICHA.dev1))}</g>`+
   `<path d="M140 1340 L520 1340 L540 1700 L120 1700 Z" fill="#1d1622"/>`,
 fg:()=>`<g filter="url(#fSoft16)"><rect x="760" y="1500" width="380" height="600" rx="30" fill="#151018"/><rect x="-120" y="1620" width="300" height="400" fill="#120d14"/></g><g transform="translate(920 1460)"><path d="M-60 0 h120 l-14 150 h-92z" fill="#e8e0d0"/><path d="M60 30 q50 0 40 50 q-6 30 -46 30" stroke="#e8e0d0" stroke-width="14" fill="none"/><path d="M-20 -10 q10 -40 -6 -70 M20 -10 q10 -40 -6 -70" stroke="#ffffff50" stroke-width="6" fill="none" id="st_steam"/></g>`,
 anim(tl,t0,d){def(lg('d5desk',[[0,'#a5643a'],[1,'#4a2614']]));
   gsap.set('#d1_thF',{rotation:-80,svgOrigin:'0 0'});gsap.set('#d1_shF',{rotation:84,svgOrigin:'0 0'});gsap.set('#d1_thB',{rotation:-76,svgOrigin:'0 0'});gsap.set('#d1_shB',{rotation:80,svgOrigin:'0 0'});
   A.setArm('d1','F',-70,-40,10);A.setArm('d1','B',-60,-50,0);A.lean(tl,'d1',8,t0,.4);A.head(tl,'d1',6,t0,.4);A.look(tl,'d1',6,0,t0);A.blinks(tl,'d1',t0,d,1.9);
   for(let t=t0+.2;t<t0+d-.2;t+=.22){tl.to('#d1_hF',{rotation:-14,svgOrigin:'0 0',duration:.1,yoyo:true,repeat:1},t);tl.to('#d1_hB',{rotation:-12,svgOrigin:'0 0',duration:.1,yoyo:true,repeat:1},t+.11);}
   tl.to('#st_p',{x:300,duration:d,ease:'none'},t0);tl.to('#st_c1',{x:300,duration:d,ease:'none'},t0+.3);tl.to('#st_c2',{x:-260,duration:d,ease:'none'},t0);
   tl.fromTo('#st_steam',{y:0,opacity:.6},{y:-60,opacity:0,duration:2,repeat:Math.ceil(d/2)},t0);}
});

/* 6 ─ Pantalla: el fallo vuelve locos a los policías */
S.push({k:'bug',w:45,tr:'cut',cam:{s:[1.0,1.12],r:[0,-2]},
 bg:()=>sky('s6bg',[[0,'#0b0f0c'],[1,'#030504']])+N('bg_crt',540,900,2.5,P.crt('crt6',`<g>${P.topMap(6)}</g>${N('b_p',0,10,1,P.topCar({c:'#f2c14e'}))}${N('b_c1',-140,-64,1,P.topCar({police:true}))}${N('b_c2',150,64,1,P.topCar({police:true}),180)}${N('b_c3',-60,126,1,P.topCar({police:true}),-90)}<g id="b_glitch" opacity="0"><rect x="-190" y="-40" width="380" height="18" fill="#ff3b3b" opacity=".6"/><rect x="-190" y="40" width="380" height="10" fill="#00e5ff" opacity=".6"/></g>${T(0,-112,'BUG',{s:34,c:'#ff4a4a',id:'b_bug',op:0})}`,{body:['#d8ceb8','#9a8e78']})),
 mid:()=>light(540,900,700,600,'gGlowC',.15),
 fg:()=>`<g id="b_vig"><rect x="-100" y="-100" width="1280" height="2120" fill="#ff0000" opacity="0" id="b_red"/></g>`,
 anim(tl,t0,d){const tb=WT(47); // "fallo"
   tl.to('#b_c1',{x:110,y:56,rotation:20,duration:tb-t0,ease:'none'},t0);tl.to('#b_c2',{x:-100,duration:tb-t0,ease:'none'},t0);tl.to('#b_c3',{y:-80,duration:tb-t0,ease:'none'},t0);
   for(let i=0;i<4;i++)tl.set('#b_glitch',{opacity:1,y:i*30-40},tb+i*.12).set('#b_glitch',{opacity:0},tb+i*.12+.05);
   tl.set('#b_bug',{opacity:1},tb);
   const tl2=WT(51); // "volvió locos"
   tl.to('#b_c1',{rotation:'+=720',x:-20,y:-10,svgOrigin:'0 0',duration:1.2,ease:'power2.inOut'},tl2);
   tl.to('#b_c2',{rotation:'-=540',x:-150,y:-60,duration:1.1,ease:'power2.inOut'},tl2+.1);
   tl.to('#b_c3',{rotation:'+=630',y:-120,x:40,duration:1.3,ease:'power2.inOut'},tl2+.05);
   tl.to('#b_red',{opacity:.12,duration:.15,yoyo:true,repeat:5},tl2);}
});

/* 7 ─ En vez de perseguirte, te embestían */
S.push({k:'ram',w:56,tr:'whip',cam:{x:[40,-40],s:[1.1,1.16]},
 bg:()=>sky('s7sky',[[0,'#0c1024'],[.6,'#1d2346'],[1,'#3a2a4a']])+P.skyline(701,{base:1260,minH:260,maxH:820,top:'#202848',bot:'#0e1226',side:'#080a18',lit:'#ffd38a',dark:'#151a30'}),
 mid:()=>floorG('s7road',[[0,'#26283a'],[1,'#0b0b14']],1260)+`<path d="M-100 1300 h1280" stroke="#4a4c60" stroke-width="12"/><g id="r_lines"><path d="M-300 1560 h1800" stroke="#e8e0a0" stroke-width="10" stroke-dasharray="90 70"/></g>`+
   `<g id="r_speed" opacity=".5">${[...Array(14)].map((_,i)=>`<path d="M${R()*1200-100} ${1320+R()*480} h${120+R()*240}" stroke="#ffffff" stroke-width="${2+R()*3}" opacity=".35"/>`).join('')}</g>`+
   N('r_player',640,1700,1.05,P.car('c7a',{c1:'#3a8cff',c2:'#0f2a6a'}))+N('r_cop',-900,1740,1.1,P.car('c7p',{police:true}))+
   `<g id="r_impact" opacity="0">${light(370,1640,300,220,'gGlowW',1)}${[...Array(12)].map((_,i)=>{const a=i/12*6.28;return `<path d="M330 1620 l${Math.cos(a)*160} ${Math.sin(a)*120}" stroke="#ffd24f" stroke-width="7" stroke-linecap="round"/>`;}).join('')}</g>`+
   `<g id="r_sparks" opacity="0">${[...Array(18)].map(()=>`<circle cx="${300+R()*120}" cy="${1560+R()*120}" r="${3+R()*5}" fill="#ffcf4a"/>`).join('')}</g>`,
 fg:()=>`<g filter="url(#fSoft16)"><rect x="-120" y="1880" width="1320" height="200" fill="#07070c"/><rect x="980" y="900" width="60" height="1100" fill="#0a0a12"/></g>`,
 anim(tl,t0,d){const ti=WT(60); // "embestían"
   tl.to(['#c7a_wa','#c7a_wb','#c7p_wa','#c7p_wb'],{rotation:2200,svgOrigin:'0 0',duration:d,ease:'none'},t0);
   tl.to('#r_lines',{x:-640,duration:d,ease:'none'},t0);tl.to('#r_speed',{x:-500,duration:d,ease:'none'},t0);
   tl.to('#r_cop',{x:960,duration:ti-t0,ease:'power2.in'},t0);
   for(let k=0;k<Math.floor(d/.25);k++){tl.set('#c7p_lr',{opacity:k%2?0:1},t0+k*.25).set('#c7p_lb',{opacity:k%2?1:0},t0+k*.25);}
   tl.set('#r_impact',{opacity:1},ti).to('#r_impact',{opacity:0,duration:.45},ti+.05);
   tl.fromTo('#r_sparks',{opacity:1,x:0,y:0},{opacity:0,x:120,y:-60,duration:.6,ease:'power2.out'},ti);
   tl.to('#r_player',{x:220,rotation:-6,svgOrigin:'0 -40',duration:.25,ease:'power3.out'},ti).to('#r_player',{rotation:3,duration:.3,ease:'sine.inOut'},ti+.25).to('#r_player',{rotation:0,duration:.4},ti+.55);
   tl.to('#r_cop',{x:1080,duration:.3,ease:'power2.out'},ti);
   SHAKE(tl,ti,.5,26);}
});

/* 8 ─ Era divertidísimo: lo dejaron */
S.push({k:'laugh',w:63,tr:'flash',cam:{x:[-20,30],s:[1.1,1.2]},
 bg:()=>sky('s8wall',[[0,'#30243c'],[1,'#3e2c3c']])+`<g filter="url(#fWall)"><rect x="-100" y="-100" width="1280" height="1400" fill="#4a3448" opacity=".5"/></g>`+
   `<rect x="80" y="240" width="300" height="200" fill="#e8e0cc"/><path d="M110 300 h220 M110 340 h160 M110 380 h200" stroke="#7a6a5a" stroke-width="8"/>`+
   light(520,700,700,500,'gGlowA',.35)+`<rect x="-100" y="1240" width="1280" height="900" fill="#241a26"/>`,
 mid:()=>N('l_crt',540,880,.8,P.crt('crt8',`${P.topMap(8)}${N('l_c',0,0,1,P.topCar({police:true}),35)}${N('l_p',60,30,1,P.topCar({c:'#f2c14e'}),-20)}`))+
   `<g id="l_note" opacity="0">${N('l_noteI',720,700,1,`<rect x="-110" y="-80" width="220" height="160" fill="#ffe14f"/><path d="M-110 60 l40 20 h-40z" fill="#d8b82a"/>${T(0,10,'¡DÉJALO!',{s:44,c:'#2a1a0a'})}${T(0,56,'(es divertido)',{s:22,c:'#5a4a1a',w:700})}`,-6)}</g>`+
   light(540,880,480,380,'gGlowC',.3)+
   `<g>${N('l_d1i',230,1980,1.95,makeChar('l1',FICHA.dev1))}</g><g>${N('l_d2i',860,1990,-1.95,makeChar('l2',FICHA.dev2))}</g>`+
   `<path d="M-100 1600 L1180 1580 L1180 1700 L-100 1720Z" fill="url(#d5desk)"/>`,
 fg:()=>`<g filter="url(#fSoft16)"><circle cx="980" cy="1880" r="220" fill="#140e16"/></g>`,
 anim(tl,t0,d){A.setArm('l1','F',-20,-20,0);A.setArm('l2','F',-10,-10,0);A.setArm('l1','B',10,-10,0);A.setArm('l2','B',10,-10,0);
   tl.to('#l_c',{rotation:'+=360',svgOrigin:'0 0',duration:1.2,repeat:Math.ceil(d/1.2),ease:'none'},t0);
   const tf=WT(68); // "divertidísimo"
   A.arm(tl,'l1','F',-120,-30,-10,t0+.2,.45); // señala la pantalla
   A.look(tl,'l1',8,-4,t0+.2);A.look(tl,'l2',8,-4,t0+.2);
   A.laugh(tl,'l1',tf-.4,d-(tf-t0));A.laugh(tl,'l2',tf-.2,d-(tf-t0));
   A.arm(tl,'l2','F',-150,-60,-20,tf-.2,.4);A.lean(tl,'l2',-8,tf-.2,.5);
   A.blinks(tl,'l1',t0,d,1.7);A.blinks(tl,'l2',t0+.3,d,2.1);
   const tn=WT(70);tl.fromTo('#l_note',{opacity:0,scale:1.6,svgOrigin:'720 700'},{opacity:1,scale:1,duration:.25,ease:'back.out(3)'},tn);}
});

/* 9 ─ 1997: sale Grand Theft Auto */
S.push({k:'box97',w:72,tr:'wipe',cam:{y:[60,-30],s:[1.06,1.14]},
 bg:()=>sky('s9bg',[[0,'#1a1020'],[1,'#3a1a2a']])+(()=>{let s='';for(let row=0;row<4;row++){s+=P.shelf(-60,520+row*380,1200);for(let i=0;i<9;i++){const c=['#3a6aa8','#a83a4a','#3aa86a','#a8883a','#6a3aa8'][(i+row)%5];s+=`<rect x="${-40+i*130}" y="${360+row*380}" width="110" height="160" rx="6" fill="${c}" opacity=".55"/><rect x="${-40+i*130}" y="${360+row*380}" width="110" height="34" fill="#0d0d12" opacity=".6"/>`;}}return s;})()+`<rect x="-100" y="-100" width="1280" height="2120" fill="#0a0610" opacity=".55"/>`,
 mid:()=>`<g id="b9_beam">${beam(540,-80,700,1700,0,'#fff2c8',.35)}</g>`+light(540,1000,500,520,'gGlowW',.35)+
   N('b9_box',540,1000,1.55,P.gameBox('gb1',{title:'GRAND THEFT AUTO',sub:'PC · 1997',c1:'#f2c14e',c2:'#c0392b',art:`<g transform="translate(0 30)">${P.topMap(97)}${N('b9_car',-60,0,1.2,P.topCar({c:'#ffe14f'}))}${N('b9_cop',-160,-64,1.2,P.topCar({police:true}))}</g>`}))+
   `<g id="b9_tag" opacity="0">${N('b9_tagI',740,1420,1,`<rect x="-120" y="-60" width="240" height="120" rx="16" fill="#ffd24f"/>${T(0,24,'1997',{s:78,c:'#1a0f0a'})}`,8)}</g>`,
 fg:()=>`<g filter="url(#fSoft8)">${P.shelf(-120,1720,1400)}</g>`,
 anim(tl,t0,d){tl.fromTo('#b9_box',{y:300,opacity:0,rotation:-14,svgOrigin:'0 0'},{y:0,opacity:1,rotation:0,duration:.7,ease:'back.out(1.6)'},t0+.05);
   tl.to('#b9_box',{rotation:3,duration:d,ease:'sine.inOut'},t0+.75);
   tl.to('#b9_car',{x:120,duration:d,ease:'none'},t0);tl.to('#b9_cop',{x:120,y:40,duration:d,ease:'none'},t0+.2);
   tl.fromTo('#b9_beam',{opacity:0},{opacity:1,duration:.5},t0);tl.fromTo('#b9_tag',{opacity:0,scale:.4,svgOrigin:'740 1420'},{opacity:1,scale:1,duration:.35,ease:'back.out(3)'},WT(73));}
});

/* 10 ─ El experto en escándalos */
S.push({k:'scandal',w:79,tr:'whip',cam:{x:[30,-30],s:[1.12,1.2]},
 bg:()=>sky('s10bg',[[0,'#1b1a24'],[1,'#3a2a2a']])+`<rect x="-100" y="-100" width="1280" height="1500" fill="#2a2430" filter="url(#fWall)"/>`+
   `<rect x="560" y="180" width="460" height="640" fill="#0c0a10"/>${P.skyline(1001,{x0:560,x1:1020,base:820,minH:150,maxH:500,minW:50,maxW:110,top:'#2a2640',bot:'#14121e',lit:'#ffd38a',dark:'#1d1a2a',depth:8,towers:true})}<path d="M790 180 v640 M560 500 h460" stroke="#0c0a10" stroke-width="14"/>`+
   `<rect x="-100" y="1500" width="1280" height="600" fill="#1d1418"/>`,
 mid:()=>`<g id="sc_papers">${[['¿JUEGO PELIGROSO?','Polémica en el Reino Unido',260,560,-12],['ESCÁNDALO','Piden prohibirlo',820,1100,9],['INDIGNACIÓN','¿Robar autos en un juego?',220,1230,6]].map(([h,s,x,y,r],i)=>`<g id="sc_p${i}" opacity="0">${N('sc_pi'+i,x,y,.62,P.newspaper('np'+i,h,s),r)}</g>`).join('')}</g>`+
   light(560,1000,600,700,'gGlowA',.3)+
   N('sc_man',600,1990,2.25,addToGroup(makeChar('pu',FICHA.publicista),'pu_hF',`<g transform="translate(6 10)"><rect x="-16" y="-70" width="32" height="96" rx="8" fill="#1a1a1e"/><rect x="-10" y="-60" width="20" height="30" fill="#3a6a4a"/><rect x="-4" y="-100" width="6" height="34" fill="#1a1a1e"/></g>`)),
 fg:()=>`<g id="sc_flashes">${[[160,380],[930,520],[260,1500],[900,1350]].map(([x,y],i)=>`<g id="sc_f${i}" opacity="0">${light(x,y,260,260,'gGlowW',1)}<path d="M${x-60} ${y} h120 M${x} ${y-60} v120" stroke="#fff" stroke-width="10"/></g>`).join('')}</g>`,
 anim(tl,t0,d){A.setArm('pu','F',-35,-115,-10);A.setArm('pu','B',10,-20,0);A.head(tl,'pu',-8,t0,.3);A.look(tl,'pu',6,-2,t0);A.blinks(tl,'pu',t0,d,1.8);A.breathe(tl,'pu',t0,d);
   A.mouth(tl,'pu','O',t0+.3);A.mouth(tl,'pu','N',t0+.7);A.mouth(tl,'pu','O',t0+1.1);A.mouth(tl,'pu','N',t0+1.5);
   const tf=WT(86); // "funcionó"
   [0,1,2].forEach(i=>tl.fromTo('#sc_p'+i,{opacity:0,scale:.3,rotation:-40,svgOrigin:'540 960'},{opacity:1,scale:1,rotation:0,duration:.45,ease:'back.out(1.8)'},WT(82)+i*.28));
   [0,1,2,3].forEach(i=>{const t=WT(84)+i*.22;tl.set('#sc_f'+i,{opacity:1},t).to('#sc_f'+i,{opacity:0,duration:.25},t+.04);});
   tl.to('#pu_mN',{opacity:0},tf);tl.set('#pu_mO',{opacity:1},tf);A.brows(tl,'pu',-8,tf);}
});

/* 11 ─ El Parlamento británico discute prohibirlo */
S.push({k:'parl',w:87,tr:'fade',cam:{y:[-260,40],s:[1.2,1.08],ease:'power2.inOut'},
 bg:()=>sky('s11sky',[[0,'#1a2040'],[.5,'#5a4a6a'],[.8,'#e08a5a'],[1,'#ffc078']])+light(300,1050,520,240,'gGlowA',.7)+
   P.parliament(-60,1240,1300,'#2a2232','#ffcf7a')+P.bigBen(820,1240,1.0,'#2a2232','#ffe0a0')+
   `<rect x="-100" y="1240" width="1280" height="900" fill="#2a3048"/><rect x="-100" y="1240" width="1280" height="900" fill="url(#gFadeB)" opacity=".6"/>`+
   `<g opacity=".35">${[...Array(16)].map((_,i)=>`<rect x="${-60+i*82}" y="${1260+(i%3)*40}" width="${30+(i%4)*10}" height="6" fill="#ffcf7a"/>`).join('')}</g>`,
 mid:()=>`<path d="M-100 1460 L1180 1420 L1180 1480 L-100 1520Z" fill="#14121c"/>`+[...Array(10)].map((_,i)=>`<rect x="${-60+i*130}" y="${1380-i*4}" width="14" height="${90}" fill="#14121c"/><circle cx="${-53+i*130}" cy="${1372-i*4}" r="14" fill="#ffe0a0"/>`).join('')+
   `<g id="pa_stamp" opacity="0">${N('pa_stI',540,1000,1,`<rect x="-400" y="-120" width="800" height="240" rx="20" fill="none" stroke="#e8352f" stroke-width="18"/>${T(0,44,'¿PROHIBIRLO?',{s:116,c:'#e8352f'})}`,-8)}</g>`,
 fg:()=>`<g filter="url(#fSoft16)"><path d="M-120 2050 L-120 1600 Q200 1560 380 1700 L460 2050Z" fill="#0c0a12"/></g>`,
 anim(tl,t0,d){const ts=WT(96)-.05;tl.fromTo('#pa_stamp',{opacity:0,scale:2.4,svgOrigin:'540 1000'},{opacity:.95,scale:1,duration:.22,ease:'power4.in'},ts);SHAKE(tl,ts+.22,.35,16);}
});

/* 12 ─ La polémica lo convirtió en un éxito */
S.push({k:'success',w:97,tr:'zoom',cam:{x:[0,0],y:[60,-20],s:[1.1,1.18]},
 bg:()=>sky('s12bg',[[0,'#2a1408'],[.6,'#6a3a10'],[1,'#c08030']])+light(540,700,700,600,'gGlowA',.6)+
   `<g opacity=".25">${[...Array(10)].map((_,i)=>`<path d="M-100 ${200+i*170} h1280" stroke="#ffd88a" stroke-width="2"/>`).join('')}</g>`,
 mid:()=>{let s='';[[180,300],[360,480],[540,700],[720,980],[900,1240]].forEach(([x,h],i)=>{s+=`<g id="su_b${i}"><rect x="${x-70}" y="${1500-h}" width="140" height="${h}" rx="10" fill="url(#su_g)"/><rect x="${x-70}" y="${1500-h}" width="30" height="${h}" fill="#ffffff30"/></g>`;});
   def(lg('su_g',[[0,'#ffe08a'],[1,'#c07a1a']]));
   return s+`<path id="su_arrow" d="M120 1320 L360 1100 L540 1020 L720 700 L900 380" stroke="#fff" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path id="su_head" d="M900 380 l-70 10 l50 50z" fill="#fff"/>`+
   `<path d="M-100 1500 h1280" stroke="#3a1a08" stroke-width="12"/>`+
   N('su_box',540,1700,.7,P.gameBox('gb2',{title:'GRAND THEFT AUTO',sub:'+500.000',c1:'#f2c14e',c2:'#c0392b',art:P.topMap(12)}))+
   `<g id="su_coins">${[...Array(16)].map((_,i)=>N('su_c'+i,540,1500,1,P.coin(26+R()*14))).join('')}</g>`;},
 fg:()=>`<g id="su_txt" opacity="0">${T(540,1200,'ÉXITO',{s:150,c:'#fff3c8',f:'fGlow',ls:12})}</g>`,
 anim(tl,t0,d){[0,1,2,3,4].forEach(i=>tl.fromTo('#su_b'+i,{scaleY:0,svgOrigin:`0 1500`},{scaleY:1,duration:.5,ease:'back.out(1.6)'},t0+.1+i*.12));
   tl.fromTo('#su_arrow',{strokeDasharray:1400,strokeDashoffset:1400},{strokeDashoffset:0,duration:.9,ease:'power2.out'},t0+.2);tl.fromTo('#su_head',{opacity:0},{opacity:1,duration:.1},t0+1.05);
   const te=WT(103)-.1;for(let i=0;i<16;i++){const a=-Math.PI/2+(R()-.5)*2.4,v=500+R()*500;tl.fromTo('#su_c'+i,{x:0,y:0,opacity:1,rotation:0},{x:Math.cos(a)*v,y:Math.sin(a)*v+300,rotation:R()*720,opacity:0,duration:1.3,ease:'power2.out'},te);}
   tl.fromTo('#su_txt',{opacity:0,scale:.6,svgOrigin:'540 1150'},{opacity:1,scale:1,duration:.3,ease:'back.out(2.5)'},te);
   tl.fromTo('#su_box',{y:200,rotation:-10},{y:0,rotation:0,duration:.6,ease:'back.out(1.6)'},t0+.3);}
});

/* 13 ─ NUEVA YORK, 1998: los hermanos fundan el estudio */
S.push({k:'nyc',w:104,tr:'flash',title:'NUEVA YORK · 1998',cam:{x:[-60,60],y:[0,-30],s:[1.08,1.16]},
 bg:()=>sky('s13sky',[[0,'#0f1638'],[.45,'#3a3a7a'],[.75,'#e0705a'],[1,'#ffb070']])+light(540,1260,600,260,'gGlowA',.8)+
   `<g opacity=".7">${P.skyline(1301,{base:1240,minH:300,maxH:900,minW:60,maxW:130,top:'#3a3a6a',bot:'#1a1a3a',side:'#12122a',lit:'#ffe0a0',dark:'#22224a',towers:true})}</g>`+
   `<g transform="translate(300 1240)"><path d="M-40 0 L-40 -760 L-20 -820 L0 -1000 L20 -820 L40 -760 L40 0Z" fill="#1a1838"/><path d="M-20 -820 L0 -1000 L20 -820" fill="#3a3870"/></g>`+
   P.skyline(1302,{base:1360,minH:220,maxH:620,minW:110,maxW:200,top:'#2a2244',bot:'#0e0c1c',side:'#08060f',lit:'#ffcf7a',dark:'#1a1630',tanks:true,towers:false}),
 mid:()=>`<rect x="-100" y="1360" width="1280" height="760" fill="#14101e"/><path d="M-100 1360 h1280" stroke="#3a2a40" stroke-width="16"/>`+
   `<g transform="translate(160 1360)"><rect x="0" y="-300" width="300" height="300" fill="#2a1e30"/><rect x="40" y="-240" width="220" height="200" fill="#ffcf7a" id="ny_win" opacity=".25"/><g id="ny_sign" opacity="0">${T(150,-120,'ROCKSTAR',{s:44,c:'#2a1a0a'})}${T(150,-74,'GAMES',{s:44,c:'#2a1a0a'})}</g></g>`+
   `<g>${N('ny_b1i',560,1720,1.15,makeChar('hb1',Object.assign({},FICHA.dev2,{silhouette:true,rim:'#ffb070'})))}</g><g>${N('ny_b2i',900,1730,-1.2,makeChar('hb2',Object.assign({},FICHA.publicista,{silhouette:true,rim:'#ffb070'})))}</g>`,
 fg:()=>`<g filter="url(#fSoft8)"><rect x="-120" y="1700" width="1320" height="400" fill="#0a0812"/><path d="M-120 1700 h1320" stroke="#ffb07050" stroke-width="6"/></g>`,
 anim(tl,t0,d){A.setArm('hb1','F',-20,-10,0);A.setArm('hb2','F',-20,-10,0);A.breathe(tl,'hb1',t0,d);A.breathe(tl,'hb2',t0,d);
   const tr=WT(113);tl.to('#ny_win',{opacity:1,duration:.3},tr-.1).fromTo('#ny_sign',{opacity:0},{opacity:1,duration:.3},tr);
   A.head(tl,'hb1',8,tr,.5);A.head(tl,'hb2',8,tr,.5);
   A.arm(tl,'hb1','F',-60,-70,0,WT(108),.5);A.arm(tl,'hb2','F',-60,-70,0,WT(108)+.05,.5); // apretón de manos
 }
});

/* 14 ─ 2001: la primera ciudad entera en 3D */
S.push({k:'gta3',w:118,tr:'glitch',cam:{y:[40,-60],s:[1.0,1.18],r:[-2,2]},
 bg:()=>sky('s14bg',[[0,'#05070f'],[1,'#0e1226']])+`<g id="g3_grid" opacity=".7">${[...Array(26)].map((_,i)=>`<path d="M540 900 L${-1400+i*150} 2100" stroke="#3a6aff" stroke-width="2"/>`).join('')}${[...Array(14)].map((_,i)=>{const y=920+Math.pow(i/13,1.8)*1180;return `<path d="M-100 ${y} H1180" stroke="#3a6aff" stroke-width="2" opacity="${.3+i/20}"/>`;}).join('')}</g>`+
   light(540,900,700,200,'gGlowC',.35),
 mid:()=>{let s='';const cols=[['#8aa0c8','#4a5a7a','#2a3450'],['#c8a07a','#7a5a3a','#4a3020'],['#9ac0a0','#4a6a50','#2a3a2c'],['#c8c0b0','#7a7468','#4a4640']];
   const blocks=[];for(let gx=0;gx<5;gx++)for(let gy=0;gy<5;gy++){const x=540+(gx-gy)*92-60,y=1080+(gx+gy)*46;blocks.push([x,y,40+R()*260,gx,gy]);}
   blocks.sort((a,b)=>a[1]-b[1]).forEach(([x,y,h],i)=>{s+=`<g id="g3_k${i}">${P.isoBlock(x,y,84,84,h,cols[i%4])}</g>`;});
   return `<g id="g3_city">${s}</g>`+`<g id="g3_wire" opacity="1">${blocks.map(([x,y,h])=>`<path d="M${x} ${y} l84 42 l84 -42 l-84 -42 z M${x} ${y} v${-h} M${x+84} ${y+42} v${-h} M${x+168} ${y} v${-h}" stroke="#5ff3ff" stroke-width="2" fill="none" opacity=".6"/>`).join('')}</g>`+
   N('g3_car',300,1460,.9,`<rect x="-26" y="-12" width="52" height="24" rx="6" fill="#ffd24f" transform="skewY(26)"/>`)+
   `<g id="g3_lbl" opacity="0">${T(540,560,'3D',{s:260,c:'#5ff3ff',f:'fNeon'})}${T(540,560,'3D',{s:260,c:'#eaffff'})}${T(540,660,'2001',{s:70,c:'#ffd24f',ls:12})}</g>`;},
 fg:()=>'',
 anim(tl,t0,d){const tc=WT(124)-.2; // "primera ciudad"
   for(let i=0;i<25;i++)tl.fromTo('#g3_k'+i,{scaleY:0,opacity:0,svgOrigin:'540 1300'},{scaleY:1,opacity:1,duration:.5,ease:'back.out(1.5)'},Math.max(t0+.1,tc-.6)+i*.035);
   tl.to('#g3_wire',{opacity:0,duration:.6},tc+.5);tl.fromTo('#g3_lbl',{opacity:0,y:40},{opacity:1,y:0,duration:.4,ease:'back.out(2)'},WT(119));
   tl.to('#g3_car',{x:330,y:-160,duration:d,ease:'none'},t0);tl.to('#g3_grid',{opacity:.25,duration:1},tc);}
});

/* 15 ─ Vice City: atardecer neón + la voz */
S.push({k:'vice',w:129,tr:'whip',cam:{x:[-80,40],s:[1.1,1.16]},
 bg:()=>sky('s15sky',[[0,'#2a0f4a'],[.35,'#8a2a7a'],[.6,'#ff5a7a'],[.8,'#ffa060'],[1,'#ffd08a']])+
   `<g transform="translate(540 1120)"><circle r="300" fill="url(#vc_sun)"/>${[0,1,2,3,4].map(i=>`<rect x="-320" y="${60+i*46}" width="640" height="${10+i*5}" fill="#ff7a8a"/>`).join('')}</g>`+
   P.skyline(1501,{base:1240,minH:180,maxH:520,minW:120,maxW:220,top:'#4a1a5a',bot:'#200a30',side:'#14061e',lit:'#ffb3e6',dark:'#2a1040',neon:['#ff4fd8','#5ff3ff','#ffd24f'],towers:false,depth:14})+
   `<rect x="-100" y="1240" width="1280" height="900" fill="url(#vc_sea)"/>${[...Array(12)].map((_,i)=>`<path d="M${200+(i%4)*180} ${1270+i*24} h${120-i*6}" stroke="#ffc080" stroke-width="5" opacity=".6"/>`).join('')}`,
 mid:()=>`<rect x="-100" y="1500" width="1280" height="620" fill="#2a1030"/><path d="M-100 1500 h1280" stroke="#ff4fd8" stroke-width="8" filter="url(#fNeon)"/>`+
   N('vc_car',-500,1760,1.1,P.car('c15',{c1:'#f6f2ff',c2:'#c8a0d8',type:'sport',rim:'#ffb0e0'}))+
   `<g id="vc_title" opacity="0">${T(540,520,'VICE CITY',{s:150,c:'#ff7ad9',f:'fNeon',ls:8})}${T(540,520,'VICE CITY',{s:150,c:'#fff0fb',ls:8})}${T(540,610,'2002',{s:60,c:'#5ff3ff',ls:14})}</g>`,
 fg:()=>`<g id="vc_palms">${P.palm(80,2050,2.2,'#12041a')}${P.palm(1060,2080,1.8,'#12041a')}</g>`+
   `<g id="vc_mic" opacity="0">${N('vc_micI',860,1380,.9,P.mic('mic15'))}<g id="vc_waves">${[1,2,3].map(i=>`<path d="M${860-80-i*40} ${1240-i*10} q-30 70 0 140 M${860+80+i*40} ${1240-i*10} q30 70 0 140" stroke="#5ff3ff" stroke-width="8" fill="none" opacity="${1-i*.25}"/>`).join('')}</g></g>`,
 anim(tl,t0,d){def(rg('vc_sun',[[0,'#fff2a8'],[.6,'#ffb050'],[1,'#ff6a6a']]));def(lg('vc_sea',[[0,'#ff8aa0'],[.3,'#7a3a8a'],[1,'#1a0a2a']]));
   tl.to('#vc_car',{x:1700,duration:d*1.1,ease:'power1.inOut'},t0);tl.to(['#c15_wa','#c15_wb'],{rotation:2000,svgOrigin:'0 0',duration:d,ease:'none'},t0);
   tl.fromTo('#vc_title',{opacity:0,scale:.8,svgOrigin:'540 500'},{opacity:1,scale:1,duration:.45,ease:'back.out(2)'},WT(131)-.1);
   gsap.set('.frond',{svgOrigin:'20 -360'});tl.to('#vc_palms .frond',{rotation:4,duration:1.2,yoyo:true,repeat:Math.ceil(d/1.2),ease:'sine.inOut'},t0);
   const tv=WT(135)-.1;tl.fromTo('#vc_mic',{opacity:0,y:300},{opacity:1,y:0,duration:.5,ease:'back.out(1.6)'},tv);
   tl.fromTo('#vc_waves',{opacity:0,scale:.7,svgOrigin:'860 1300'},{opacity:1,scale:1.15,duration:.5,repeat:3,ease:'power1.out'},tv+.3);}
});

/* 16 ─ San Andreas: tres ciudades, desierto, montañas */
S.push({k:'sa',w:139,tr:'zoom',cam:{x:[120,-120],y:[0,-20],s:[1.16,1.1],ease:'sine.inOut'},
 bg:()=>sky('s16sky',[[0,'#3a6ab0'],[.5,'#8ab8e0'],[.8,'#ffd8a0'],[1,'#ffb070']])+light(820,760,300,300,'gGlowW',.9)+
   P.mountains(161,1100,420,'#7a8ab0','#5a6a90',6)+P.mountains(162,1180,300,'#6a7a6a','#3a4a3a',8)+
   `<g opacity=".85">${P.skyline(1601,{x0:0,x1:260,base:1150,minH:80,maxH:260,minW:24,maxW:50,top:'#8a90a8',bot:'#5a6078',side:'#4a5068',lit:'#ffe0a0',dark:'#6a7088',depth:6,gap:3,towers:false})}${P.skyline(1602,{x0:430,x1:640,base:1170,minH:60,maxH:200,minW:24,maxW:44,top:'#a89080',bot:'#786050',side:'#5a4a40',lit:'#ffe0a0',dark:'#806a5a',depth:6,gap:3,towers:false})}${P.skyline(1603,{x0:820,x1:1100,base:1180,minH:60,maxH:240,minW:24,maxW:44,top:'#c08a70',bot:'#8a5a40',side:'#6a4030',lit:'#ffe0a0',dark:'#a07050',depth:6,gap:3,neon:['#ff4fd8','#ffd24f'],towers:false})}</g>`+
   `<path d="M-100 1180 h1280 v900 h-1280z" fill="url(#sa_d)"/>`,
 mid:()=>`<path d="M540 1180 Q300 1400 600 1600 Q900 1800 400 2100" stroke="#3a3238" stroke-width="90" fill="none"/><path d="M540 1180 Q300 1400 600 1600 Q900 1800 400 2100" stroke="#e8d080" stroke-width="5" stroke-dasharray="30 30" fill="none"/>`+
   P.pine(80,1300,1,'#2a4a30')+P.pine(160,1320,1.2,'#2a4a30')+P.pine(30,1340,1.1)+
   `<g id="sa_cities">${[['LOS SANTOS',190,1080],['SAN FIERRO',540,1100],['LAS VENTURAS',880,1110]].map(([n,x,y],i)=>`<g id="sa_l${i}" opacity="0"><rect x="${x-110}" y="${y-140}" width="220" height="48" rx="24" fill="#0d0d16cc"/>${T(x,y-106,n,{s:26,c:'#ffd24f',ls:2})}<path d="M${x} ${y-92} v40" stroke="#ffd24f" stroke-width="4"/></g>`).join('')}</g>`+
   `<g id="sa_badge" opacity="0">${N('sa_bI',540,560,1,`<rect x="-330" y="-110" width="660" height="220" rx="30" fill="#0d0d16" opacity=".88"/><rect x="-330" y="-110" width="660" height="220" rx="30" fill="none" stroke="#ffd24f" stroke-width="6"/>${T(-170,40,'#1',{s:150,c:'#ffd24f'})}${T(110,-6,'MÁS VENDIDO',{s:44,c:'#fff'})}${T(110,50,'PLAYSTATION 2',{s:44,c:'#5ff3ff'})}`)}</g>`,
 fg:()=>`<g filter="url(#fSoft4)">${P.cactus(120,2000,2.2)}${P.cactus(960,2040,1.7,'#355a30')}</g><path d="M-120 1960 Q300 1880 700 1980 L1200 1940 V2100 H-120Z" fill="#8a5a30"/>`,
 anim(tl,t0,d){def(lg('sa_d',[[0,'#e0b070'],[1,'#a06a30']]));[0,1,2].forEach(i=>tl.fromTo('#sa_l'+i,{opacity:0,y:-30},{opacity:1,y:0,duration:.35,ease:'back.out(2)'},t0+.3+i*.3));
   tl.fromTo('#sa_badge',{opacity:0,scale:.5,svgOrigin:'540 560'},{opacity:1,scale:1,duration:.4,ease:'back.out(2.2)'},WT(145)-.1);}
});

/* 17 ─ Escondida en el código, una escena para adultos */
S.push({k:'hidden',w:150,tr:'fade',cam:{s:[1.0,1.15],y:[0,-30]},
 bg:()=>sky('s17bg',[[0,'#05040a'],[1,'#0e0812']])+(()=>{let s='';const r=PRNG(171);for(let i=0;i<44;i++){const y=140+i*40,x=70+Math.floor(r()*5)*36;s+=`<rect x="${x}" y="${y}" width="${100+r()*560}" height="16" rx="4" fill="${['#3a6a8a','#5a4a8a','#3a7a5a','#6a6a7a'][Math.floor(r()*4)]}" opacity=".45"/>`;}return `<g id="hd_code">${s}</g>`;})(),
 mid:()=>`<g id="hd_block" opacity="0"><rect x="180" y="860" width="720" height="250" rx="22" fill="#2a060c" stroke="#ff3b5a" stroke-width="6"/>${light(540,985,500,220,'gGlowR',.5)}<g transform="translate(320 985)"><rect x="-50" y="-20" width="100" height="80" rx="12" fill="#ff3b5a"/><path d="M-30 -20 v-30 a30 30 0 0 1 60 0 v30" stroke="#ff3b5a" stroke-width="14" fill="none"/></g>${T(620,960,'+18',{s:90,c:'#ff5a7a'})}${T(620,1040,'CONTENIDO OCULTO',{s:40,c:'#ffd0d8',ls:2})}</g>`+
   N('hd_mag',200,700,1.1,P.magnifier('mag17')),
 fg:()=>`<rect x="-100" y="-100" width="1280" height="2120" fill="url(#hd_v)"/>`,
 anim(tl,t0,d){def(rg('hd_v',[[.4,'#000',0],[1,'#000',.8]]));const tf=WT(153); // "encontró"
   tl.to('#hd_code',{y:-200,duration:d,ease:'none'},t0);
   tl.to('#hd_mag',{x:500,y:120,duration:tf-t0+.2,ease:'sine.inOut'},t0).to('#hd_mag',{x:320,y:290,duration:.6,ease:'power2.out'},tf+.2);
   tl.fromTo('#hd_block',{opacity:0,scale:.8,svgOrigin:'540 985'},{opacity:1,scale:1,duration:.4,ease:'back.out(2)'},WT(158)-.1);
   tl.to('#hd_block',{opacity:.7,duration:.15,yoyo:true,repeat:5},WT(158)+.4);}
});

/* 18 ─ Las tiendas lo retiran de los estantes */
S.push({k:'shelves',w:162,tr:'cut',cam:{x:[30,-30],s:[1.08,1.14]},
 bg:()=>sky('s18bg',[[0,'#e8e8f0'],[1,'#a8a8b8']])+`<rect x="-100" y="-100" width="1280" height="2120" fill="#1a1a2a" opacity=".55" id="sh_dim"/>`+light(540,0,700,300,'gGlowW',.8),
 mid:()=>{let s='';for(let row=0;row<3;row++){s+=P.shelf(40,700+row*440,1000);for(let i=0;i<6;i++){const id=`sh_${row}_${i}`;s+=N(id,130+i*160,560+row*440,.42,P.gameBox('gbs'+row+i,{title:'SAN ANDREAS',sub:'',c1:'#ffb040',c2:'#7a3a1a',art:`<rect x="-150" y="-120" width="300" height="300" fill="#e0a060"/>${P.mountains(180+i,100,120,'#a06a40','#6a3a20',4,-150,150)}`}));}}
   return s+`<g id="sh_sign" opacity="0">${N('sh_sI',540,1640,1,`<rect x="-300" y="-90" width="600" height="180" rx="16" fill="#e8352f"/>${T(0,32,'RETIRADO',{s:96,c:'#fff',ls:6})}`,-4)}</g>`;},
 fg:()=>`<g filter="url(#fSoft8)"><rect x="-120" y="1820" width="1320" height="300" fill="#1a1a24"/></g>`,
 anim(tl,t0,d){const tq=WT(165)-.2; // "quitaron"
   let k=0;for(let row=0;row<3;row++)for(let i=0;i<6;i++){const t=Math.max(t0+.1,tq-.3)+k*.07;tl.to(`#sh_${row}_${i}`,{y:-60,x:(i<3?-1:1)*900,rotation:(i<3?-1:1)*30,duration:.5,ease:'power2.in'},t);k++;}
   tl.fromTo('#sh_sign',{opacity:0,y:-400},{opacity:1,y:0,duration:.45,ease:'bounce.out'},tq+.9);
   tl.to('#sh_dim',{opacity:.8,duration:.1,yoyo:true,repeat:3},tq+.6);}
});

/* 19 ─ 2013: mil millones en tres días */
S.push({k:'billion',w:169,tr:'flash',cam:{y:[80,-40],s:[1.12,1.04]},
 bg:()=>sky('s19sky',[[0,'#1a3a6a'],[.5,'#e08a50'],[.75,'#ffc070'],[1,'#ffe0a0']])+light(760,1050,360,300,'gGlowW',.9)+
   P.mountains(191,1180,260,'#a06a5a','#6a4a4a',5)+`<g transform="translate(700 1010)">${T(0,0,'',{})}</g>`+
   P.skyline(1901,{base:1260,minH:200,maxH:700,minW:70,maxW:150,top:'#4a3a5a',bot:'#1a1a2a',side:'#121220',lit:'#ffd38a',dark:'#2a2a3a',towers:true})+
   P.palm(120,1300,1.3,'#1a1018')+P.palm(980,1310,1.4,'#1a1018')+P.palm(860,1320,1.1,'#1a1018')+`<rect x="-100" y="1260" width="1280" height="900" fill="#1a1420"/>`,
 mid:()=>`<g id="bi_bills">${[...Array(30)].map((_,i)=>N('bi_b'+i,R()*1080,-200-R()*900,.8+R()*.6,P.bill(),R()*60-30)).join('')}</g>`+
   `<g transform="translate(540 760)"><rect x="-470" y="-120" width="940" height="200" rx="26" fill="#0d0d16" opacity=".85"/><rect x="-470" y="-120" width="940" height="200" rx="26" fill="none" stroke="#7fff9a" stroke-width="5"/>${T(0,32,'$0',{s:110,c:'#9cff9a',id:'bi_num'})}</g>`+
   `<g>${[1,2,3].map(i=>`<g id="bi_d${i}" opacity=".25">${N('bi_dI'+i,270*i,1520,.62,P.calendarPage('bcal'+i,i,'DÍA','#2fa85a'))}</g>`).join('')}</g>`,
 fg:()=>'',
 anim(tl,t0,d){for(let i=0;i<30;i++)tl.to('#bi_b'+i,{y:2400,rotation:(R()-.5)*360,svgOrigin:'0 0',duration:2.2+R()*1.8,ease:'none'},t0+R()*1.5);
   const tm=WT(174)-.2;const o={v:0};const el=()=>document.getElementById('bi_num');
   tl.to(o,{v:1e9,duration:WT(180)-tm,ease:'power2.inOut',onUpdate:()=>{el().textContent='$'+Math.round(o.v).toLocaleString('es-MX');}},tm);
   [1,2,3].forEach(i=>tl.to('#bi_d'+i,{opacity:1,duration:.2},WT(178)+(i-1)*.3).fromTo('#bi_dI'+i,{scale:1.3},{scale:1,svgOrigin:'0 0',duration:.3,ease:'back.out(3)'},WT(178)+(i-1)*.3));}
});

/* 20 ─ Récord: nadie había llegado tan rápido */
S.push({k:'record',w:181,tr:'zoom',cam:{s:[1.2,1.06],ease:'power3.out'},
 bg:()=>sky('s20bg',[[0,'#0a0614'],[1,'#2a1438']])+`<g id="rc_lines">${[...Array(40)].map((_,i)=>{const a=i/40*6.283;return `<path d="M${540+Math.cos(a)*300} ${900+Math.sin(a)*300} L${540+Math.cos(a)*1500} ${900+Math.sin(a)*1500}" stroke="#ffd24f" stroke-width="${2+i%3*2}" opacity=".18"/>`;}).join('')}</g>`+
   beam(540,-100,900,1500,0,'#fff2c0',.3),
 mid:()=>`<path d="M260 1380 L820 1380 L900 1500 L180 1500Z" fill="#2a1a3a"/><rect x="180" y="1500" width="720" height="140" fill="#1a1026"/>`+N('rc_tro',540,1230,1.4,P.trophy('tr20'))+light(540,900,420,420,'gGlowA',.6)+
   `<g id="rc_rib" opacity="0">${N('rc_rI',540,500,1,`<path d="M-420 -80 h840 l-60 80 l60 80 h-840 l60 -80z" fill="#e8352f"/>${T(0,30,'RÉCORD',{s:96,c:'#fff',ls:12})}`)}</g>`+
   `<g id="rc_conf">${[...Array(40)].map((_,i)=>`<rect id="rc_c${i}" x="${540}" y="${700}" width="${10+R()*12}" height="${18+R()*14}" fill="${['#ffd24f','#ff4fd8','#5ff3ff','#7fff9a'][i%4]}"/>`).join('')}</g>`,
 fg:()=>'',
 anim(tl,t0,d){tl.fromTo('#rc_tro',{y:300,scale:.6,svgOrigin:'0 0'},{y:0,scale:1,duration:.6,ease:'back.out(1.8)'},t0);tl.to('#rc_lines',{rotation:30,svgOrigin:'540 900',duration:d,ease:'none'},t0);
   tl.fromTo('#rc_rib',{opacity:0,scaleX:0,svgOrigin:'540 500'},{opacity:1,scaleX:1,duration:.4,ease:'back.out(2)'},WT(188)-.1);
   for(let i=0;i<40;i++){const a=-Math.PI/2+(R()-.5)*2.8,v=500+R()*700;tl.fromTo('#rc_c'+i,{x:0,y:0,rotation:0,opacity:1},{x:Math.cos(a)*v,y:Math.sin(a)*v+900,rotation:R()*900,opacity:.9,duration:2.2,ease:'power1.out'},WT(188));}}
});

/* 21 ─ El modo online: dinero sin fin, ninguna prisa */
S.push({k:'online',w:192,tr:'whip',cam:{x:[-30,30],s:[1.08,1.16]},
 bg:()=>sky('s21bg',[[0,'#040814'],[1,'#0c1830']])+P.stars(211,90,1080,1920,'#9fd8ff')+P.server(-20,1700,1100)+P.server(930,1720,1000),
 mid:()=>`<g transform="translate(540 820)"><circle r="330" fill="url(#on_g)"/><g id="on_lat" opacity=".6">${[-60,-30,0,30,60].map(a=>`<ellipse rx="${330*Math.cos(a*Math.PI/180)}" ry="${40*Math.cos(a*Math.PI/180)}" cy="${330*Math.sin(a*Math.PI/180)}" fill="none" stroke="#5ff3ff" stroke-width="2"/>`).join('')}</g><g id="on_lon">${[0,30,60,90,120,150].map(a=>`<ellipse rx="${330*Math.abs(Math.cos(a*Math.PI/180))+1}" ry="330" fill="none" stroke="#5ff3ff" stroke-width="2" opacity=".5"/>`).join('')}</g>`+
   `<g id="on_dots">${[...Array(36)].map((_,i)=>{const a=R()*6.283,r=R()*300;return `<circle class="ondot" cx="${(Math.cos(a)*r).toFixed(1)}" cy="${(Math.sin(a)*r*.95).toFixed(1)}" r="7" fill="#7fff9a"/>`;}).join('')}</g>`+
   `${[...Array(10)].map((_,i)=>{const a=R()*6.283,b=R()*6.283;return `<path class="onarc" d="M${Math.cos(a)*280} ${Math.sin(a)*260} Q0 ${-380} ${Math.cos(b)*280} ${Math.sin(b)*260}" stroke="#5ff3ff" stroke-width="3" fill="none" opacity=".6"/>`;}).join('')}</g>`+
   `<circle cx="540" cy="820" r="460" fill="url(#gGlowC)" opacity=".18"/>`+
   `<g id="on_flow">${[...Array(18)].map((_,i)=>N('on_m'+i,540,1150,.6,i%2?P.coin(30):P.bill())).join('')}</g>`+
   `<g transform="translate(540 1600)"><path d="M-200 -60 Q-220 160 0 170 Q220 160 200 -60 Q160 -120 0 -120 Q-160 -120 -200 -60Z" fill="#b08040"/><path d="M-80 -120 q80 -60 160 0" stroke="#7a5420" stroke-width="20" fill="none"/>${T(0,70,'$',{s:150,c:'#6a4416'})}</g>`+
   `<g id="on_clock" transform="translate(860 1240)"><circle r="110" fill="#f7f3ea"/><circle r="110" fill="none" stroke="#2a2a36" stroke-width="12"/><g id="on_h"><path d="M0 0 v-60" stroke="#1a1a24" stroke-width="12" stroke-linecap="round"/></g><g id="on_mn"><path d="M0 0 v-85" stroke="#e8352f" stroke-width="7" stroke-linecap="round"/></g></g>`+
   `<g id="on_zz" opacity="0">${T(960,1110,'z',{s:60,c:'#fff'})}${T(1000,1060,'z',{s:44,c:'#fff'})}</g>`,
 fg:()=>'',
 anim(tl,t0,d){def(rg('on_g',[[0,'#1a4a8a'],[.8,'#0a1a3a'],[1,'#040a18']],.4,.35,.8));
   tl.to('#on_lon',{rotation:0,duration:d},t0);tl.to('#on_dots',{rotation:25,svgOrigin:'0 0',duration:d,ease:'none'},t0);
   tl.to('.ondot',{opacity:.3,duration:.4,yoyo:true,repeat:Math.ceil(d/.4),stagger:{each:.05}},t0);
   tl.fromTo('.onarc',{strokeDasharray:900,strokeDashoffset:900},{strokeDashoffset:0,duration:1.2,stagger:.15,ease:'power1.inOut'},t0);
   for(let i=0;i<18;i++)tl.fromTo('#on_m'+i,{y:0,x:(R()-.5)*200,opacity:1,scale:.6,svgOrigin:'0 0'},{y:420,x:0,opacity:.2,scale:.3,duration:1.1,ease:'power1.in',repeat:Math.ceil(d/2)},t0+i*.12);
   tl.to('#on_mn',{rotation:360,svgOrigin:'0 0',duration:d,ease:'none'},t0);tl.to('#on_h',{rotation:30,svgOrigin:'0 0',duration:d,ease:'none'},t0);
   tl.fromTo('#on_zz',{opacity:0,y:20},{opacity:1,y:-20,duration:.8,repeat:2,yoyo:true},WT(201));}
});

/* 22 ─ 2022: un hacker adolescente filtra 90 videos */
S.push({k:'hacker',w:205,tr:'glitch',cam:{x:[20,-20],s:[1.16,1.24]},
 bg:()=>sky('s22bg',[[0,'#05060c'],[1,'#0a0c16']])+`<rect x="100" y="260" width="300" height="420" fill="#0a1020"/><rect x="116" y="276" width="268" height="388" fill="#141e38"/>${P.rain(221,30,120,280,260,380,'#6a8ab8')}`+
   `<rect x="-100" y="1500" width="1280" height="600" fill="#0a0a12"/>`,
 mid:()=>light(620,1180,560,520,'gGlowC',.55,'hk_glow')+
   N('hk_kid',420,2060,2.3,makeChar('hk',FICHA.hacker))+
   `<path d="M-100 1560 L1180 1540 L1180 1640 L-100 1660Z" fill="#14141e"/>`+
   N('hk_lap',700,1540,.9,P.laptop('lap22',`<rect x="-240" y="-302" width="480" height="286" fill="#020a10"/>${[...Array(12)].map((_,i)=>`<rect x="${-220+(i%3)*20}" y="${-290+i*22}" width="${120+((i*53)%200)}" height="10" fill="#3dff9a" opacity=".7"/>`).join('')}`))+
   `<g id="hk_vids">${[...Array(16)].map((_,i)=>N('hk_v'+i,700,1380,.5,`<rect x="-90" y="-56" width="180" height="112" rx="10" fill="#1a1d2a" stroke="#5ff3ff" stroke-width="4"/><path d="M-16 -24 l36 24 l-36 24z" fill="#fff"/><rect x="-80" y="36" width="${60+i*6}" height="8" fill="#ff3b3b"/>`)).join('')}</g>`+
   `<g id="hk_count" opacity="0">${T(540,520,'90',{s:220,c:'#ff4646',f:'fGlow'})}${T(540,610,'VIDEOS FILTRADOS',{s:52,c:'#fff',ls:4})}</g>`,
 fg:()=>`<g filter="url(#fSoft16)"><rect x="840" y="1500" width="360" height="600" fill="#05050a"/></g>`,
 anim(tl,t0,d){A.setArm('hk','F',-75,-55,0);A.setArm('hk','B',-65,-60,0);A.lean(tl,'hk',10,t0,.3);A.head(tl,'hk',10,t0,.3);A.look(tl,'hk',6,4,t0);A.blinks(tl,'hk',t0,d,2);
   for(let t=t0+.1;t<t0+d-.2;t+=.2){tl.to('#hk_hF',{rotation:-16,svgOrigin:'0 0',duration:.09,yoyo:true,repeat:1},t);tl.to('#hk_hB',{rotation:-14,svgOrigin:'0 0',duration:.09,yoyo:true,repeat:1},t+.1);}
   tl.to('#hk_glow',{opacity:.35,duration:.15,yoyo:true,repeat:Math.floor(d/.3)},t0);
   const tf=WT(210)-.15; // "filtró"
   for(let i=0;i<16;i++){const a=-Math.PI/2+(i/15-.5)*2.6,v=500+(i%4)*120;tl.fromTo('#hk_v'+i,{x:0,y:0,opacity:0,scale:.3,svgOrigin:'0 0'},{x:Math.cos(a)*v,y:Math.sin(a)*v,opacity:1,scale:1,rotation:(i%2?1:-1)*12,duration:.8,ease:'power3.out'},tf+i*.05);}
   tl.fromTo('#hk_count',{opacity:0,scale:.5,svgOrigin:'540 500'},{opacity:1,scale:1,duration:.35,ease:'back.out(2.5)'},WT(211)-.1);}
});

/* 23 ─ El tráiler: 90 millones de vistas en 24 horas */
S.push({k:'trailer',w:216,tr:'zoom',cam:{y:[60,-20],s:[1.04,1.12],r:[3,-2]},
 bg:()=>sky('s23bg',[[0,'#1a0a2a'],[.6,'#4a1a5a'],[1,'#ff6a7a']])+P.skyline(2301,{base:1920,minH:300,maxH:900,top:'#2a1240',bot:'#0e0618',side:'#08040e',lit:'#ffb3e6',dark:'#1c0c2a',neon:['#ff4fd8','#5ff3ff']})+`<rect x="-100" y="-100" width="1280" height="2120" fill="#000" opacity=".35"/>`,
 mid:()=>light(540,900,560,700,'gGlowP',.4)+N('tr_ph',540,920,1.55,P.phone('ph23',`<rect x="-134" y="-282" width="268" height="564" fill="#0a0a12"/><rect x="-134" y="-200" width="268" height="160" fill="url(#tr_vid)"/>${P.palm(-60,-40,.25,'#1a0620')}${P.palm(70,-40,.2,'#1a0620')}<circle cx="0" cy="-120" r="30" fill="#ffffffcc"/><path d="M-10 -136 l26 16 l-26 16z" fill="#c0306a"/><rect x="-120" y="-30" width="240" height="8" rx="4" fill="#3a3a48"/><rect id="tr_bar" x="-120" y="-30" width="20" height="8" rx="4" fill="#ff3b5a"/><text x="-120" y="20" font-family="DatoSans" font-weight="800" font-size="20" fill="#fff">TRÁILER 1</text><text id="tr_views" x="-120" y="70" font-family="DatoSans" font-weight="900" font-size="34" fill="#ffd24f">0 vistas</text>${[0,1,2].map(i=>`<rect x="-120" y="${110+i*50}" width="${200-i*40}" height="20" rx="6" fill="#22222e"/>`).join('')}`))+
   `<g transform="translate(860 1520)"><circle r="130" fill="#0d0d16" opacity=".9"/><circle r="104" fill="none" stroke="#2a2a36" stroke-width="18"/><circle id="tr_ring" r="104" fill="none" stroke="#5ff3ff" stroke-width="18" stroke-linecap="round" transform="rotate(-90)"/>${T(0,10,'24',{s:72,c:'#fff'})}${T(0,50,'HORAS',{s:24,c:'#5ff3ff',ls:3})}</g>`+
   `<g id="tr_hearts">${[...Array(14)].map((_,i)=>N('tr_h'+i,300+R()*480,1400,1,`<path d="M0 10 C-30 -20 -14 -44 0 -26 C14 -44 30 -20 0 10Z" fill="${i%2?'#ff3b5a':'#ff7ad9'}"/>`)).join('')}</g>`+
   `<g id="tr_rec" opacity="0">${N('tr_rI',540,330,1,`<rect x="-300" y="-70" width="600" height="140" rx="24" fill="#ffd24f"/>${T(0,30,'¡RÉCORD!',{s:84,c:'#1a0a0a',ls:6})}`,-4)}</g>`,
 fg:()=>'',
 anim(tl,t0,d){def(lg('tr_vid',[[0,'#ff6a8a'],[.6,'#a03a8a'],[1,'#2a0a3a']]));
   const tv=WT(223)-.2;const o={v:0};tl.to(o,{v:9e7,duration:Math.max(.8,WT(229)-tv),ease:'power2.inOut',onUpdate:()=>{const e=document.getElementById('tr_views');if(e)e.textContent=Math.round(o.v).toLocaleString('es-MX')+' vistas';}},tv);
   tl.fromTo('#tr_bar',{attr:{width:10}},{attr:{width:240},duration:d,ease:'none'},t0);
   tl.fromTo('#tr_ring',{strokeDasharray:654,strokeDashoffset:654},{strokeDashoffset:0,duration:Math.max(.8,WT(229)-tv+.3),ease:'power1.inOut'},tv);
   for(let i=0;i<14;i++)tl.fromTo('#tr_h'+i,{y:0,opacity:0,scale:.5,svgOrigin:'0 0'},{y:-900-R()*300,x:(R()-.5)*200,opacity:1,scale:1.3,duration:1.8,ease:'power1.out'},t0+.3+i*.12);
   tl.fromTo('#tr_rec',{opacity:0,scale:2,svgOrigin:'540 330'},{opacity:1,scale:1,duration:.3,ease:'power3.out'},WT(220)-.1);}
});

/* 24 ─ Trece años no fueron un retraso */
S.push({k:'calendar',w:230,tr:'flash',cam:{s:[1.14,1.04]},
 bg:()=>sky('s24bg',[[0,'#0e1226'],[1,'#2a1a3a']])+light(540,900,600,600,'gGlowA',.4),
 mid:()=>{let s='';for(let y=2026;y>=2013;y--)s+=`<g id="ca_${y}">${N('ca_i'+y,540,920,1.6,P.calendarPage('cy'+y,y,y===2026?'HOY':'AÑO',y===2026?'#2fb8c9':'#e8423f').replace('font-size="170"','font-size="120"'))}</g>`;return s;},
 fg:()=>`<g id="ca_wind">${[...Array(10)].map(()=>`<path d="M${R()*1080} ${R()*1920} h${80+R()*160}" stroke="#ffffff" stroke-width="3" opacity=".25"/>`).join('')}</g>`,
 anim(tl,t0,d){const step=Math.min(.16,(d-.6)/13);for(let y=2013,k=0;y<2026;y++,k++){tl.to('#ca_'+y,{y:-1400,x:(k%2?1:-1)*300,rotation:(k%2?1:-1)*40,opacity:0,svgOrigin:'540 920',duration:.5,ease:'power2.in'},t0+.15+k*step);}
   tl.to('#ca_wind',{x:-600,duration:d,ease:'none'},t0);}
});

/* 25 ─ Final: la apuesta más grande */
S.push({k:'finale',w:236,tr:'zoom',title:'13 AÑOS',titleAt:240,cam:{y:[-120,120],s:[1.25,1.05],ease:'power2.out'},
 bg:()=>sky('s25sky',[[0,'#0a0420'],[.5,'#3a0f4a'],[.8,'#a02a6a'],[1,'#ff8a5a']])+P.stars(251,80,1080,900)+
   P.skyline(2501,{base:1380,minH:260,maxH:900,minW:80,maxW:170,top:'#2a1240',bot:'#0e0618',side:'#08040e',lit:'#ffb3e6',dark:'#1c0c2a',neon:['#ff4fd8','#5ff3ff','#ffd24f']}),
 mid:()=>floorG('s25floor',[[0,'#2a0f30'],[1,'#05020a']],1380)+light(540,1380,700,120,'gGlowP',.8)+
   N('fi_chip',540,1020,2.3,P.chip('chip25'))+light(540,1000,500,260,'gGlowA',.4,'fi_glow'),
 fg:()=>`<g filter="url(#fSoft8)">${P.palm(-60,2080,2.2,'#08030c')}${P.palm(1140,2100,2.0,'#08030c')}</g><rect id="fi_black" x="-100" y="-100" width="1280" height="2120" fill="#000" opacity="0"/>`,
 anim(tl,t0,d){tl.fromTo('#fi_chip',{y:-900,svgOrigin:'0 0'},{y:0,duration:.8,ease:'bounce.out'},t0+.1);
   tl.to('#fi_chip',{scaleX:-1,duration:.25,yoyo:true,repeat:3,ease:'sine.inOut'},t0+.1);
   tl.fromTo('#fi_glow',{opacity:0},{opacity:1,duration:.6},t0+.9);
   tl.to('#fi_black',{opacity:1,duration:.5,ease:'power1.in'},t0+d-.5);}
});

window.SCENES=S;
window.EPISODE_KEYWORDS=['gta','vi','trece','quince','veintiocho','error','1995','dundee','escocia','dma','design','racenchase','policias','embestian','1997','grand','theft','auto','escandalos','parlamento','prohibirlo','exito','1998','rockstar','games','nueva','york','2001','iii','3d','vice','city','ray','liotta','san','andreas','playstation','adultos','estanterias','2013','mil','millones','dolares','record','noventa','24','horas','hacker','2022','apuesta','videojuegos'];
})();
