/* DATOLOGO · episodio hotspanish-parte-3-la-mansion-vip · scenes.js — "HotSpanish · Parte 3: La Mansión VIP"
   FORMATO 1:1 → marco 1080×1080. Biblia v5.1: HotSpanish SIEMPRE con rasgos firma (afro visible, lentes oscuros, conjunto rosa,
   cadena, sonrisa); participantes = personajes genéricos variados (sin retratos de personas reales). Subtítulos libres (y>860). */
(function(){
const {lg,rg,def,PRNG}=DL; const P=DLP; const {makeChar,A}=DLC;
const {N,T,addToGroup,sky,floorG,light,beam}=DLK;
const F=window.FICHAS; const S=[]; const HS=F.hotspanish;
const pantalla=(c,extra)=>`<rect x="-240" y="-302" width="480" height="286" fill="${c}"/>${extra||''}`;
const SKINS=[['#f3c09a','#c98a66','#7a4a40'],['#e0a07a','#a86a4c','#5e3628'],['#c88a62','#9a5a3c','#4a2a1e'],['#f6d0b0','#d0a080','#8a5a48'],['#8a5a3c','#5e3826','#2e1a12']];
const HAIRS=[['short',['#2a1a12','#0c0806']],['long',['#3a2418','#140a06']],['curly',['#1a1210','#060404']],['long',['#e8c87a','#a8843a']],['bald',['#2a1a12','#0c0806']],['short',['#c84a2a','#6a2010']]];
const TOPS=[['#3a8ad8','#163a6a'],['#f2c14e','#a86a12'],['#7dbf6a','#2a5a24'],['#e85a4a','#8a2a24'],['#9a7aff','#3a2a8a'],['#2a2a36','#0c0c12'],['#ff9a4a','#a84a12'],['#f4f4f8','#a8acb8']];
const extra=(i,o={})=>Object.assign({skin:SKINS[i%5],hairStyle:HAIRS[i%6][0],hair:HAIRS[i%6][1],top:TOPS[i%8],pants:['#2c3550','#121626'],beard:i%7===3},o);
const billetes=(seed,n,id)=>{const R=PRNG(seed);let s='';for(let i=0;i<n;i++)s+=N(`${id}${i}`,R()*1080,-120-R()*500,.55+R()*.3,P.bill(),R()*360);return `<g id="${id}">${s}</g>`;};
const fallBills=(tl,id,n,t0)=>{for(let i=0;i<n;i++)tl.to(`#${id}${i}`,{y:1500,rotation:'+=200',duration:2.4+(i%5)*.35,ease:'none'},t0+(i%7)*.18);};
const confeti=(seed,n,id)=>{const R=PRNG(seed),C=['#ff4fb4','#ffd24f','#5ff3ff','#7dffb0','#fff'];let s='';for(let i=0;i<n;i++)s+=`<rect id="${id}${i}" x="${(R()*1080).toFixed(0)}" y="${(-40-R()*400).toFixed(0)}" width="14" height="22" rx="3" fill="${C[i%5]}" transform="rotate(${(R()*90).toFixed(0)} ${(R()*1080).toFixed(0)} 0)"/>`;return `<g id="${id}">${s}</g>`;};
const hs=(id,x,y,s,extraObj)=>N(id+'_g',x,y,s,extraObj?addToGroup(makeChar(id,HS),id+'_hF',extraObj):makeChar(id,HS));

/* 1 ─ GANCHO "Lo apostó todo." Mesa verde, HotSpanish empuja todo su dinero y su alcancía al centro */
S.push({k:'hook',w:0,tr:'fade',cam:{s:[1.25,1.06],y:[40,0],ease:'power2.out'},
 bg:()=>sky('h_bg',[[0,'#0a0614'],[1,'#140a1e']])+beam(540,-80,560,1000,0,'#fff1c8',.3,'h_beam'),
 mid:()=>hs('ha',300,1180,1.3)+`<path d="M-80 760 L1160 760 L1160 1160 L-80 1160Z" fill="#1e5a3a"/><path d="M-80 760 H1160" stroke="#c8a46a" stroke-width="14"/>`+
   `<g id="h_pot">${P.alcancia('h_pig',760,700,.55)}${Array.from({length:6},(_,i)=>N('h_s'+i,560+(i%3)*90,800-Math.floor(i/3)*24,.6,P.bill())).join('')}${Array.from({length:6},(_,i)=>N('h_c'+i,900+(i%3)*40,810-Math.floor(i/3)*30,.55,P.coin(30))).join('')}</g>`,
 fg:()=>light(700,780,360,90,'gGlowA',.5,'h_glow'),
 anim(tl,t0,d){A.breathe(tl,'ha',t0,d);A.blinks(tl,'ha',t0,d);A.look(tl,'ha',10,4,t0);A.arm(tl,'ha','F',-60,-20,0,t0+.1,.4);
   tl.fromTo('#h_pot',{x:220},{x:0,duration:.8,ease:'power3.out'},t0+.15);tl.to('#h_glow',{opacity:.9,duration:.3,yoyo:true,repeat:3},t0+.9);}
});

/* 2 ─ "Después de años de retos en la calle… competir con la televisión." La calle (izq) frente a una tele gigante (der) */
S.push({k:'vs',w:3,tr:'whip',cam:{x:[-40,40],s:[1.04,1.12]},
 bg:()=>`<rect x="-80" y="-80" width="660" height="1240" fill="url(#v_sky)"/>`+(def(lg('v_sky',[[0,'#5aa8e8'],[1,'#f2dcb8']])),'')+P.skyline(401,{x0:-80,x1:560,base:760,minH:200,maxH:500,top:'#d8b090',bot:'#a8806a',side:'#7a5a4a',lit:'#fff1c8',dark:'#8a6a5a',towers:false})+
   `<rect x="560" y="-80" width="620" height="1240" fill="#140c24"/>`+light(840,420,420,400,'gGlowB',.45)+`<rect x="-80" y="760" width="1240" height="400" fill="#3a3040"/>`,
 mid:()=>hs('hv',250,1210,1.25,`<g transform="translate(14 46) rotate(-30)">${[-20,0,20].map(r=>`<g transform="rotate(${r})"><g transform="translate(0 -60) scale(.55)">${P.bill()}</g></g>`).join('')}</g>`)+
   N('v_tv',830,470,.95,P.crt('vt',`<rect x="-180" y="-135" width="360" height="270" fill="#1c2a4a"/><rect x="-120" y="-60" width="240" height="40" rx="8" fill="#d8362f"/>${T(0,-32,'TV',{s:32,c:'#fff'})}<rect x="-150" y="20" width="300" height="12" fill="#5a6a8a"/><rect x="-150" y="44" width="200" height="12" fill="#5a6a8a"/>`,{body:['#3a3a46','#1a1a22'],glow:'#7fb4ff'}))+
   `<g id="v_vs" opacity="0">${T(545,330,'VS',{s:130,c:'#ffd24f',f:'fGlow'})}${T(545,330,'VS',{s:130,c:'#fff8d8'})}</g>`,
 fg:()=>P.dust(402,24,1080,1080,'#ffe8c0'),
 anim(tl,t0,d){A.setArm('hv','F',-100,-40,0);A.breathe(tl,'hv',t0,d);A.blinks(tl,'hv',t0,d);A.look(tl,'hv',10,-4,t0+.2);
   tl.fromTo('#v_vs',{opacity:0,scale:2,svgOrigin:'545 290'},{opacity:1,scale:1,duration:.35,ease:'back.out(2.5)'},WT(20)-.1);SHAKE(0,WT(20),.25,6);A.brows(tl,'hv',-6,WT(20));}
});

/* 3 ─ "Su idea: un reality show propio…" foco que se enciende; boceto de mansión en una pizarra */
S.push({k:'idea',w:24,tr:'flash',cam:{s:[1.12,1.02],ease:'power2.out'},
 bg:()=>sky('i_bg',[[0,'#1a1430'],[1,'#0a0814']])+`<g filter="url(#fWall)"><rect x="-80" y="-80" width="1240" height="840" fill="#221c3a"/></g>`+
   `<rect x="560" y="140" width="460" height="320" rx="10" fill="#1c3a2c" stroke="#6a4a2a" stroke-width="16"/><g id="i_sk" stroke="#e8f0e8" stroke-width="5" fill="none" stroke-dasharray="1400" stroke-dashoffset="1400"><path d="M620 400 V280 H700 V240 H880 V280 H960 V400 Z M660 320 h40 v40 h-40z M760 320 h40 v40 h-40z M860 320 h40 v40 h-40z M770 400 v-50 h40 v50"/></g>`+
   `<rect x="-80" y="760" width="1240" height="400" fill="#16122a"/>`,
 mid:()=>hs('hi',330,1220,1.3)+`<g id="i_bulb" opacity="0" transform="translate(330 250)"><circle r="120" fill="url(#gGlowA)"/><circle cy="-10" r="46" fill="#ffe8a0"/><rect x="-20" y="30" width="40" height="34" rx="6" fill="#a8acb8"/></g>`,
 fg:()=>P.dust(403,24,1080,1080,'#ffe8a0'),
 anim(tl,t0,d){A.breathe(tl,'hi',t0,d);A.blinks(tl,'hi',t0,d);A.look(tl,'hi',4,-8,t0);A.head(tl,'hi',-6,t0+.1);
   tl.fromTo('#i_bulb',{opacity:0,scale:.4,svgOrigin:'330 250'},{opacity:1,scale:1,duration:.35,ease:'back.out(3)'},WT(25)-.1);
   tl.to('#i_sk',{strokeDashoffset:0,duration:1.6,ease:'power1.inOut'},WT(27));A.arm(tl,'hi','F',-130,-20,0,WT(27));}
});

/* 4 ─ "…transmitido gratis y en vivo por YouTube." Celular gigante con EN VIVO y GRATIS */
S.push({k:'live',w:30,tr:'zoom',cam:{s:[1.0,1.14]},
 bg:()=>sky('l_bg',[[0,'#2a0a3a'],[1,'#0a0414']])+light(540,520,520,520,'gGlowR',.35),
 mid:()=>N('l_ph',540,520,1.15,P.phone('lp',`<rect x="-134" y="-282" width="268" height="564" fill="#14101e"/><rect x="-120" y="-250" width="240" height="160" rx="16" fill="#2a1a3a"/>${P.mansion('lpm',0,-120,.22)}<rect id="l_live" x="-110" y="-240" width="96" height="34" rx="8" fill="#ff3b3b"/>${T(-62,-216,'EN VIVO',{s:20,c:'#fff'})}<rect x="-60" y="-30" width="120" height="84" rx="22" fill="#f4f4f8"/><path d="M-16 -8 L24 12 L-16 32Z" fill="#14101e"/>${T(0,140,'YouTube',{s:40,c:'#fff'})}`))+
   `<g id="l_free" opacity="0"><rect x="700" y="210" width="280" height="96" rx="20" fill="#7dffb0"/>${T(840,276,'GRATIS',{s:54,c:'#0c2a1a'})}</g>`,
 fg:()=>P.dust(404,30,1080,1080,'#ff9ae8'),
 anim(tl,t0,d){tl.to('#l_live',{opacity:.3,duration:.35,yoyo:true,repeat:Math.floor(d/.35)},t0);tl.fromTo('#l_free',{opacity:0,x:120},{opacity:1,x:0,duration:.35,ease:'back.out(2)'},WT(31)-.1);}
});

/* 5 ─ "La Mansión VIP." Revelación de la mansión de noche con letrero de neón */
S.push({k:'mansion',w:37,tr:'flash',title:'LA MANSIÓN VIP',titleAt:37,cam:{s:[1.2,1.0],y:[60,0],ease:'power2.out'},
 bg:()=>sky('m_sky',[[0,'#0a0a24'],[.7,'#2a1a4a'],[1,'#5a2a5a']])+P.stars(405,80,1080,500)+P.palm(80,800,1.4,'#0a0814')+P.palm(1000,820,1.6,'#0a0814'),
 mid:()=>`<g id="m_house">${P.mansion('m_m',540,780,1.0)}</g>${light(540,660,560,240,'gGlowA',.5,'m_glow')}`+`<rect x="-80" y="810" width="1240" height="350" fill="#0c0a18"/><rect x="200" y="810" width="680" height="40" fill="#4a7ad8" opacity=".5"/>`,
 fg:()=>beam(200,1160,200,900,200,'#ff9ae8',.2)+beam(880,1160,200,900,160,'#5ff3ff',.2),
 anim(tl,t0,d){tl.fromTo('#m_glow',{opacity:0},{opacity:.9,duration:.8},t0+.1);tl.fromTo('#m_house',{opacity:.2},{opacity:1,duration:.6},t0);}
});

/* 6 ─ "…metió en el proyecto todos sus ahorros." Alcancía que se rompe; monedas que vuelan hacia el plano de la mansión; HotSpanish tenso */
S.push({k:'ahorros',w:40,tr:'cut',cam:{s:[1.06,1.16],x:[20,-20]},
 bg:()=>sky('a_bg',[[0,'#1a1430'],[1,'#0a0814']])+`<g opacity=".25">${Array.from({length:12},(_,i)=>`<path d="M${-80+i*110} -80 V1160 M-80 ${-80+i*110} H1160" stroke="#5ff3ff" stroke-width="1.5"/>`).join('')}</g>`+
   `<g transform="translate(780 330)"><rect x="-230" y="-170" width="460" height="340" fill="#1a3a6a" stroke="#cfe6ff" stroke-width="4"/><g stroke="#cfe6ff" stroke-width="3" fill="none"><rect x="-200" y="-140" width="180" height="120"/><rect x="20" y="-140" width="180" height="120"/><rect x="-200" y="0" width="400" height="130"/></g>${T(0,215,'PLANO',{s:28,c:'#cfe6ff',ls:8})}</g>`,
 mid:()=>hs('hb',260,1220,1.3)+`<g id="a_pigW">${P.alcancia('a_pig',560,760,.6)}</g><g id="a_crack" opacity="0"><path d="M520 690 l20 30 l-14 20 l24 30" stroke="#2a0a14" stroke-width="6" fill="none"/></g>`+
   `<g id="a_coins">${Array.from({length:10},(_,i)=>N('a_c'+i,560,740,.5,P.coin(30))).join('')}</g>`,
 fg:()=>light(560,760,240,80,'gGlowA',.4),
 anim(tl,t0,d){A.breathe(tl,'hb',t0,d);A.blinks(tl,'hb',t0,d);A.look(tl,'hb',10,4,t0);A.brows(tl,'hb',6,t0+.3);A.mouth(tl,'hb','S',t0+.4);
   const tc=WT(47)-.1;tl.to('#a_crack',{opacity:1,duration:.1},tc);tl.to('#a_pigW',{x:6,duration:.05,yoyo:true,repeat:5},tc);
   for(let i=0;i<10;i++)tl.to('#a_c'+i,{x:120+i*20,y:-380-(i%4)*40,duration:.8,ease:'power2.out'},tc+.2+i*.06).to('#a_c'+i,{opacity:0,duration:.2},tc+1.0+i*.06);}
});

/* 7 ─ "Sin un canal de televisión detrás. Sin red de seguridad." Cuerda floja entre dos edificios de noche, sin red abajo */
S.push({k:'red',w:50,tr:'whip',cam:{s:[1.0,1.12],y:[-20,20],ease:'sine.inOut'},
 bg:()=>sky('r_sky',[[0,'#0a0c22'],[1,'#2a1a3a']])+P.stars(407,60,1080,500)+`<rect x="-80" y="420" width="260" height="760" fill="#1a1626"/><rect x="900" y="420" width="260" height="760" fill="#1a1626"/>`+
   `<g id="r_tv" opacity=".9"><rect x="60" y="460" width="100" height="70" rx="8" fill="#2a2a36"/><path d="M80 470 L140 520 M140 470 L80 520" stroke="#ff3b3b" stroke-width="8"/></g>`+P.skyline(408,{base:1160,minH:120,maxH:300,top:'#14102a',bot:'#0a0816',side:'#06040c',lit:'#ffd88a',dark:'#120e20',towers:false}),
 mid:()=>`<path d="M180 430 Q540 470 900 430" stroke="#c8ccd8" stroke-width="5" fill="none"/>`+N('r_hsW',300,452,.62,makeChar('hr',HS)),
 fg:()=>`<g id="r_net" opacity="0">${T(540,800,'SIN RED',{s:70,c:'#ff6a6a',ls:8})}</g>`+P.dust(409,30,1080,1080,'#cfe6ff'),
 anim(tl,t0,d){A.setArm('hr','F',-170,-10,0);A.setArm('hr','B',-170,-10,0);A.walk(tl,'hr',t0,d,.45);A.blinks(tl,'hr',t0,d);A.brows(tl,'hr',6,t0);
   tl.to('#r_hsW',{x:400,duration:d,ease:'none'},t0);tl.to('#r_hsW',{rotation:4,svgOrigin:'0 0',duration:.5,yoyo:true,repeat:Math.floor(d/.5)},t0);
   tl.to('#r_net',{opacity:1,duration:.3},WT(56));}
});

/* 8 ─ "Él mismo diseñó los espacios con ayuda de inteligencia artificial." Laptop con plano que se dibuja solo + chip IA */
S.push({k:'ia',w:60,tr:'glitch',cam:{s:[1.04,1.14]},
 bg:()=>sky('ia_bg',[[0,'#0a1a2a'],[1,'#040a12']])+light(700,480,520,420,'gGlowC',.35)+`<rect x="-80" y="780" width="1240" height="380" fill="#0a1220"/>`,
 mid:()=>hs('hd',260,1230,1.3)+`<rect x="440" y="800" width="640" height="34" rx="8" fill="#3a3a54"/>`+
   N('ia_lap',760,800,1.0,P.laptop('il',pantalla('#08141e',`<g id="ia_draw" stroke="#5ff3ff" stroke-width="4" fill="none" stroke-dasharray="2200" stroke-dashoffset="2200"><rect x="-200" y="-270" width="400" height="230"/><path d="M-200 -170 H200 M-60 -270 V-40 M80 -170 V-40"/><circle cx="-130" cy="-220" r="20"/><rect x="100" y="-250" width="70" height="50"/></g>`)))+
   `<g id="ia_chip" opacity="0">${N('ia_c',800,250,1.2,P.chip('iac','#5ff3ff'))}${T(800,262,'IA',{s:56,c:'#04121c'})}</g>`,
 fg:()=>P.dust(410,30,1080,1080,'#5ff3ff'),
 anim(tl,t0,d){A.breathe(tl,'hd',t0,d);A.blinks(tl,'hd',t0,d);A.look(tl,'hd',10,2,t0);A.arm(tl,'hd','F',-90,-20,0,t0+.2);
   tl.to('#ia_draw',{strokeDashoffset:0,duration:Math.max(1.2,d-.6),ease:'power1.inOut'},t0+.2);tl.fromTo('#ia_chip',{opacity:0,scale:.5,svgOrigin:'800 250'},{opacity:1,scale:1,duration:.4,ease:'back.out(2.5)'},WT(68)-.1);}
});

/* 9 ─ "Instalaron más de cincuenta cámaras para grabar las veinticuatro horas." Corte de la casa con cámaras que se encienden + contador 50+ y 24/7 */
S.push({k:'camaras',w:70,tr:'wipe',cam:{s:[1.0,1.12]},
 bg:()=>sky('c_bg',[[0,'#141020'],[1,'#08060e']])+`<g transform="translate(540 600)"><rect x="-480" y="-420" width="960" height="760" fill="#2a2440"/>${[-1,0,1].map(r=>`<path d="M-480 ${r*250+40} H480" stroke="#141020" stroke-width="16"/>`).join('')}<path d="M-160 -420 V340 M160 -420 V340" stroke="#141020" stroke-width="16"/></g>`,
 mid:()=>`<g id="c_cams">${Array.from({length:18},(_,i)=>{const x=150+(i%6)*156,y=230+Math.floor(i/6)*250;return `<g id="c_k${i}" opacity="0">${P.camara('ck'+i,x,y,.38)}</g>`;}).join('')}</g>`+
   `<g id="c_num" opacity="0"><rect x="300" y="900" width="480" height="0" fill="none"/>${T(320,180,'50+',{s:120,c:'#ff3b3b',f:'fGlow'})}${T(320,180,'50+',{s:120,c:'#fff'})}</g><g id="c_247" opacity="0">${T(780,180,'24/7',{s:110,c:'#5ff3ff',f:'fGlow'})}${T(780,180,'24/7',{s:110,c:'#fff'})}</g>`,
 fg:()=>'',
 anim(tl,t0,d){for(let i=0;i<18;i++){tl.fromTo('#c_k'+i,{opacity:0,scale:.3,svgOrigin:'540 540'},{opacity:1,scale:1,duration:.22,ease:'back.out(2)'},t0+.06*i);tl.to('#ck'+i+'_rec',{opacity:.2,duration:.3,yoyo:true,repeat:Math.floor(d/.3)},t0+.2);}
   tl.fromTo('#c_num',{opacity:0,y:30},{opacity:1,y:0,duration:.3,ease:'back.out(2)'},WT(73)-.1);tl.fromTo('#c_247',{opacity:0,y:30},{opacity:1,y:0,duration:.3,ease:'back.out(2)'},WT(78)-.1);}
});

/* 10 ─ "El único lugar sin cámaras: los baños." Puerta de baño con cámara tachada */
S.push({k:'banos',w:80,tr:'cut',cam:{s:[1.14,1.04],ease:'power2.out'},
 bg:()=>sky('b_bg',[[0,'#d8e2ea'],[1,'#a8b8c8']])+`<g>${Array.from({length:10},(_,i)=>`<rect x="${-80+i*130}" y="-80" width="126" height="1240" fill="${i%2?'#e8eef2':'#dfe6ec'}"/>`).join('')}</g><rect x="-80" y="900" width="1240" height="260" fill="#9aa8b4"/>`,
 mid:()=>`<rect x="330" y="160" width="420" height="760" rx="10" fill="#7a5a44" filter="url(#fWood)"/><circle cx="700" cy="560" r="16" fill="url(#mMetal)"/><rect x="440" y="230" width="200" height="90" rx="12" fill="#fff"/>${T(540,292,'BAÑO',{s:50,c:'#2a2a3a'})}`+
   `<g id="b_no" opacity="0" transform="translate(540 500)">${P.camara('bk',0,0,.8)}<circle r="120" fill="none" stroke="#ff3b3b" stroke-width="18"/><path d="M-85 -85 L85 85" stroke="#ff3b3b" stroke-width="18"/></g>`,
 fg:()=>light(540,420,400,300,'gGlowW',.3),
 anim(tl,t0,d){tl.fromTo('#b_no',{opacity:0,scale:.4,svgOrigin:'540 500'},{opacity:1,scale:1,duration:.35,ease:'back.out(2.5)'},WT(84)-.1);}
});

/* 11 ─ "Después vino el casting. Juntó a dieciséis participantes…" HotSpanish frente a 16 retratos que se llenan */
S.push({k:'casting',w:87,tr:'whip',cam:{x:[30,-30],s:[1.04,1.12]},
 bg:()=>sky('k_bg',[[0,'#2a1a3a'],[1,'#0c0814']])+`<g filter="url(#fWall)"><rect x="-80" y="-80" width="1240" height="860" fill="#2a2040"/></g>`+
   `<g id="k_grid">${Array.from({length:16},(_,i)=>{const x=470+(i%4)*150,y=110+Math.floor(i/4)*170;return `<g id="k_f${i}" opacity="0"><rect x="${x-62}" y="${y-70}" width="124" height="150" rx="10" fill="#f4ecd8"/><g transform="translate(${x} ${y+76}) scale(.24)">${makeChar('kc'+i,extra(i))}</g></g>`;}).join('')}</g>`+
   `<rect x="-80" y="780" width="1240" height="380" fill="#16122a"/>`,
 mid:()=>hs('hk',210,1230,1.25,`<g transform="translate(10 40) rotate(-20)"><rect x="-30" y="-46" width="60" height="80" rx="6" fill="#f4ecd8"/><rect x="-22" y="-36" width="44" height="30" fill="#c8ccd8"/></g>`)+
   `<g id="k_16" opacity="0"><circle cx="980" cy="760" r="76" fill="#ffd24f"/>${T(980,786,'16',{s:76,c:'#2a1020'})}</g>`,
 fg:()=>'',
 anim(tl,t0,d){A.setArm('hk','F',-80,-50,0);A.breathe(tl,'hk',t0,d);A.blinks(tl,'hk',t0,d);A.look(tl,'hk',10,-6,t0);
   const t1=WT(91);for(let i=0;i<16;i++)tl.fromTo('#k_f'+i,{opacity:0,scale:.5,svgOrigin:`${470+(i%4)*150} ${110+Math.floor(i/4)*170}`},{opacity:1,scale:1,duration:.22,ease:'back.out(2)'},t1+i*.08);
   tl.fromTo('#k_16',{opacity:0,scale:.3,svgOrigin:'980 760'},{opacity:1,scale:1,duration:.35,ease:'back.out(3)'},WT(93)-.1);}
});

/* 12 ─ "…figuras de la televisión mezcladas con estrellas de internet" dos grupos que se juntan al centro */
S.push({k:'mezcla',w:95,tr:'zoom',cam:{s:[1.0,1.12]},
 bg:()=>`<rect x="-80" y="-80" width="620" height="1240" fill="#1c2a4a"/><rect x="540" y="-80" width="620" height="1240" fill="#3a1450"/>`+light(220,300,340,300,'gGlowB',.5)+light(860,300,340,300,'gGlowP',.5)+
   N('mz_tv',220,230,.55,P.crt('mt',`<rect x="-180" y="-135" width="360" height="270" fill="#2a3a6a"/>${T(0,20,'TV',{s:120,c:'#fff'})}`,{body:['#3a3a46','#1a1a22']}))+N('mz_ph',860,240,.42,P.phone('mzp',`<rect x="-134" y="-282" width="268" height="564" fill="#2a0f3a"/><rect x="-60" y="-40" width="120" height="84" rx="22" fill="#f4f4f8"/><path d="M-16 -18 L24 2 L-16 22Z" fill="#2a0f3a"/>`))+`<rect x="-80" y="800" width="1240" height="360" fill="#100c1c"/>`,
 mid:()=>`<g id="mz_L">${[0,1,2].map(i=>N('mz_l'+i,60+i*130,1040,.8,makeChar('ml'+i,extra(i+3,{top:[['#2a2a36','#0c0c12'],['#f4f4f8','#a8acb8'],['#9a2a3a','#4a0a14']][i]})))).join('')}</g>`+
   `<g id="mz_R">${[0,1,2].map(i=>N('mz_r'+i,1020-i*130,1040,-.8,makeChar('mr'+i,extra(i+7,{top:[['#ff9a4a','#a84a12'],['#7dffb0','#1a6a3a'],['#ffd24f','#a86a12']][i]})))).join('')}</g>`,
 fg:()=>P.dust(412,30,1080,1080,'#fff'),
 anim(tl,t0,d){[0,1,2].forEach(i=>{A.walk(tl,'ml'+i,t0+.2,1.4,.3);A.walk(tl,'mr'+i,t0+.2,1.4,.3);A.blinks(tl,'ml'+i,t0,d);A.blinks(tl,'mr'+i,t0,d);A.mouth(tl,'mr'+i,'O',t0+1.6);});
   tl.to('#mz_L',{x:120,duration:1.4,ease:'power2.out'},t0+.2);tl.to('#mz_R',{x:-120,duration:1.4,ease:'power2.out'},t0+.2);}
});

/* 13 ─ "…un premio de dos millones de pesos para quien conquistara al público." Lluvia de billetes y contador */
S.push({k:'premio',w:104,tr:'flash',cam:{s:[1.12,1.02],ease:'power2.out'},
 bg:()=>sky('p_bg',[[0,'#0e2a1c'],[1,'#04100a']])+light(540,460,560,460,'gGlowA',.55)+billetes(413,22,'p_m'),
 mid:()=>`<g transform="translate(540 430)"><rect x="-380" y="-120" width="760" height="240" rx="26" fill="#f4ecd8" stroke="#c8a46a" stroke-width="10"/>${T(0,-50,'PREMIO',{s:42,c:'#6a4a2a',ls:10})}<text id="p_num" y="60" font-family="DatoSans" font-weight="900" font-size="96" fill="#1e5a3a" text-anchor="middle">$0</text>${T(270,96,'MXN',{s:30,c:'#6a4a2a'})}</g>`+N('p_tro',540,900,.7,P.trophy('pt')),
 fg:()=>'',
 anim(tl,t0,d){fallBills(tl,'p_m',22,t0);const o={v:0};const tc=WT(109)-.1;tl.to(o,{v:2000000,duration:1.2,ease:'power2.out',onUpdate:()=>{const e=document.getElementById('p_num');if(e)e.textContent='$'+Math.round(o.v).toLocaleString('en-US');}},tc);
   tl.fromTo('#p_tro',{y:200,opacity:0},{y:0,opacity:1,duration:.5,ease:'back.out(2)'},WT(114));}
});

/* 14 ─ "El 12 de abril de 2026 se abrieron las puertas." Calendario + puertas de la mansión que se abren con luz */
S.push({k:'puertas',w:118,tr:'fade',title:'12 ABRIL 2026',titleAt:119,cam:{s:[1.0,1.2],ease:'power2.in'},
 bg:()=>sky('d_bg',[[0,'#0a0614'],[1,'#1a0e24']])+light(540,560,500,500,'gGlowW',0,'d_light'),
 mid:()=>`<rect x="240" y="180" width="600" height="760" fill="#fff6dc" id="d_inside" opacity=".9"/>`+
   N('d_l',240,180,1,`<rect width="300" height="760" fill="#3a2418" filter="url(#fWood)"/><rect x="40" y="60" width="220" height="280" fill="none" stroke="#c8a46a" stroke-width="8"/><circle cx="270" cy="400" r="14" fill="url(#mCoin)"/>`)+
   N('d_r',840,180,1,`<rect x="-300" width="300" height="760" fill="#3a2418" filter="url(#fWood)"/><rect x="-260" y="60" width="220" height="280" fill="none" stroke="#c8a46a" stroke-width="8"/><circle cx="-270" cy="400" r="14" fill="url(#mCoin)"/>`)+
   `<rect x="200" y="140" width="680" height="44" fill="#1a1020"/>${T(540,174,'LA MANSIÓN VIP',{s:30,c:'#ffd24f',ls:8})}`,
 fg:()=>N('d_cal',150,820,.5,P.calendarPage('dc','12','ABRIL 2026','#ff4fb4')),
 anim(tl,t0,d){const to=WT(124);tl.to('#d_l',{scaleX:.08,svgOrigin:'0 0',duration:.9,ease:'power2.inOut'},to);tl.to('#d_r',{scaleX:.08,svgOrigin:'0 0',duration:.9,ease:'power2.inOut'},to);tl.to('#d_light',{opacity:1,duration:.9},to);}
});

/* 15 ─ "Esa misma noche, más de un millón de personas se conectaron a verlo." Contador de espectadores en vivo y pantallas */
S.push({k:'millon',w:128,tr:'flash',cam:{s:[1.0,1.15]},
 bg:()=>sky('mi_bg',[[0,'#1a0630'],[1,'#05020c']])+light(540,540,600,600,'gGlowP',.45)+
   `<g id="mi_grid">${Array.from({length:12},(_,i)=>{const x=150+(i%4)*260,y=180+Math.floor(i/4)*230;return `<g id="mi_s${i}" opacity="0"><rect x="${x-110}" y="${y-75}" width="220" height="150" rx="14" fill="#2a1a3a"/><g transform="translate(${x} ${y+10})">${P.mansion('mim'+i,0,0,.16)}</g><rect x="${x-100}" y="${y-68}" width="54" height="20" rx="5" fill="#ff3b3b"/></g>`;}).join('')}</g>`,
 mid:()=>`<g transform="translate(540 540)"><rect x="-330" y="-90" width="660" height="180" rx="30" fill="#0c0614ee" stroke="#ff4fb4" stroke-width="6"/><circle cx="-270" cy="0" r="16" fill="#ff3b3b" id="mi_dot"/><text id="mi_num" x="20" y="34" font-family="DatoSans" font-weight="900" font-size="92" fill="#fff" text-anchor="middle">0</text>${T(20,80,'CONECTADOS EN VIVO',{s:24,c:'#ff9ae8',ls:6})}</g>`,
 fg:()=>P.dust(415,40,1080,1080,'#ff9ae8'),
 anim(tl,t0,d){for(let i=0;i<12;i++)tl.fromTo('#mi_s'+i,{opacity:0,scale:.3,svgOrigin:'540 540'},{opacity:1,scale:1,duration:.25,ease:'back.out(2)'},t0+.05*i);
   const o={v:0};tl.to(o,{v:1000000,duration:1.6,ease:'power2.out',onUpdate:()=>{const e=document.getElementById('mi_num');if(e)e.textContent=(o.v>=999999?'+':'')+Math.round(o.v).toLocaleString('en-US');}},WT(131));tl.to('#mi_dot',{opacity:.2,duration:.3,yoyo:true,repeat:Math.floor(d/.3)},t0);}
});

/* 16 ─ "Cuatro semanas de alianzas, peleas y votaciones…" calendario de 4 semanas + iconos que entran en su palabra */
S.push({k:'semanas',w:141,tr:'whip',cam:{s:[1.04,1.12],x:[-20,20]},
 bg:()=>sky('s_bg',[[0,'#1a1430'],[1,'#0a0814']])+`<g transform="translate(540 260)">${[0,1,2,3].map(i=>`<g id="s_w${i}" opacity=".25"><rect x="${-330+i*170}" y="-80" width="150" height="150" rx="16" fill="#ff4fb4"/>${T(-255+i*170,10,'S'+(i+1),{s:56,c:'#fff'})}</g>`).join('')}</g>`,
 mid:()=>`<g id="s_a" opacity="0" transform="translate(220 640)"><circle r="130" fill="#2a6a4a"/><path d="M-70 10 q30 -40 70 -10 q40 -30 70 10 q-30 40 -70 30 q-40 10 -70 -30z" fill="#f2c9a0"/>${T(0,190,'ALIANZAS',{s:38,c:'#fff',ls:4})}</g>`+
   `<g id="s_p" opacity="0" transform="translate(540 640)"><circle r="130" fill="#8a1a2a"/><path d="M10 -90 L-40 10 L0 10 L-20 90 L50 -20 L10 -20Z" fill="#ffd24f"/>${T(0,190,'PELEAS',{s:38,c:'#fff',ls:4})}</g>`+
   `<g id="s_v" opacity="0" transform="translate(860 640)"><circle r="130" fill="#1a3a8a"/><rect x="-60" y="-20" width="120" height="90" rx="10" fill="#f4f4f8"/><rect x="-20" y="-90" width="40" height="80" fill="#ffd24f"/><rect x="-40" y="-30" width="80" height="12" fill="#1a3a8a"/>${T(0,190,'VOTOS',{s:38,c:'#fff',ls:4})}</g>`,
 fg:()=>'',
 anim(tl,t0,d){for(let i=0;i<4;i++)tl.to('#s_w'+i,{opacity:1,duration:.15},t0+.15+i*.18);
   [[144,'#s_a'],[145,'#s_p'],[147,'#s_v']].forEach(([w,id])=>tl.fromTo(id,{opacity:0,scale:.4},{opacity:1,scale:1,duration:.3,ease:'back.out(2.5)'},WT(w)-.1));SHAKE(0,WT(145),.25,6);}
});

/* 17 ─ "…el reality terminó con una final que se vivió en todo el internet en español." Escenario final, confeti, trofeo, HotSpanish anfitrión */
S.push({k:'final',w:149,tr:'flash',cam:{s:[1.16,1.04],ease:'power2.out'},
 bg:()=>sky('f_bg',[[0,'#12051e'],[1,'#2a0a3a']])+beam(200,-80,300,1000,-12,'#ff9ae8',.25)+beam(880,-80,300,1000,12,'#5ff3ff',.25)+beam(540,-80,360,1000,0,'#ffd24f',.22)+
   `<rect x="-80" y="760" width="1240" height="400" fill="#1a0a24"/><g fill="#0a0410">${Array.from({length:14},(_,i)=>`<circle cx="${-40+i*84}" cy="${1000+(i%2)*20}" r="44"/>`).join('')}</g>`,
 mid:()=>`<rect x="140" y="720" width="800" height="50" rx="10" fill="#3a1a4a"/>`+hs('hf',360,730,1.05,P.mic('hfm').replace('<g id="hfm">','<g id="hfm" transform="translate(10 30) scale(.3)">'))+N('f_tro',740,720,.75,P.trophy('ft'))+light(740,560,200,200,'gGlowA',.6,'f_tg'),
 fg:()=>confeti(417,40,'f_cf'),
 anim(tl,t0,d){A.setArm('hf','F',-100,-60,0);A.breathe(tl,'hf',t0,d);A.blinks(tl,'hf',t0,d);A.mouth(tl,'hf','O',t0+.3);A.arm(tl,'hf','B',-160,-20,0,t0+.4);
   for(let i=0;i<40;i++)tl.to('#f_cf'+i,{y:1300,rotation:360,duration:2.2+(i%5)*.3,ease:'none'},t0+(i%8)*.12);tl.to('#f_tg',{opacity:.2,duration:.3,yoyo:true,repeat:Math.floor(d/.3)},t0);}
});

/* 18 ─ "Y la temporada se volvió el inicio de algo más grande: una segunda edición." Claqueta TEMPORADA 2 */
S.push({k:'temporada2',w:164,tr:'zoom',cam:{s:[1.0,1.15]},
 bg:()=>sky('t_bg',[[0,'#1a0630'],[1,'#05020c']])+P.mansion('t_m',540,980,.9,'#ffcf7a')+light(540,760,600,260,'gGlowA',.4),
 mid:()=>`<g transform="translate(540 380)"><g id="t_top"><rect x="-300" y="-170" width="600" height="70" fill="#14141c"/>${[0,1,2,3,4,5].map(i=>`<path d="M${-290+i*100} -170 l60 0 l-40 70 l-60 0z" fill="#f4f4f8"/>`).join('')}</g><rect x="-300" y="-100" width="600" height="300" fill="#14141c"/>${T(0,-10,'LA MANSIÓN VIP',{s:44,c:'#fff',ls:6})}${T(0,140,'TEMPORADA 2',{s:74,c:'#ffd24f'})}</g>`,
 fg:()=>P.dust(418,40,1080,1080,'#ffd24f'),
 anim(tl,t0,d){tl.fromTo('#t_top',{rotation:-25,svgOrigin:'-300 -100'},{rotation:0,duration:.18,ease:'power3.in'},WT(176)-.15);SHAKE(0,WT(176),.2,8);}
});

/* 19 ─ "El niño que perdió a su madre a un año, que preparaba tortas a los siete y al que nadie veía en inglés…" tres recuerdos */
S.push({k:'recuerdos',w:178,tr:'fade',cam:{s:[1.0,1.08]},
 bg:()=>sky('rc_bg',[[0,'#2a2030'],[1,'#120c16']])+P.dust(419,40,1080,1080,'#ffe8c0'),
 mid:()=>`<g id="rc_1" opacity="0"><rect x="40" y="200" width="320" height="560" rx="16" fill="#f4ecd8"/><rect x="60" y="220" width="280" height="520" fill="#2a1c2a"/>${light(250,420,120,120,'gGlowA',.8)}<rect x="240" y="420" width="18" height="60" fill="#f3e6cc"/><path d="M249 400 q-8 12 0 22 q8 -10 0 -22z" fill="#ffd27a"/><rect x="100" y="300" width="110" height="140" rx="6" fill="#c8a46a"/><rect x="110" y="310" width="90" height="120" fill="#f4e8d0"/>${N('rc_k1',190,730,.55,makeChar('r1',F.hotspanishNino))}</g>`+
   `<g id="rc_2" opacity="0"><rect x="380" y="200" width="320" height="560" rx="16" fill="#f4ecd8"/><rect x="400" y="220" width="280" height="520" fill="#7a3a2a"/>${N('rc_k2',540,730,.55,addToGroup(makeChar('r2',F.hotspanishNino),'r2_hF',P.torta('rc_t',20,20,.8)))}</g>`+
   `<g id="rc_3" opacity="0"><rect x="720" y="200" width="320" height="560" rx="16" fill="#f4ecd8"/><rect x="740" y="220" width="280" height="520" fill="#14203a"/>${N('rc_k3',880,730,.55,makeChar('r3',F.hotspanishYT))}${T(880,300,'0 views',{s:36,c:'#9fb4d8'})}</g>`,
 fg:()=>'',
 anim(tl,t0,d){[[179,1],[188,2],[195,3]].forEach(([w,i])=>{tl.fromTo('#rc_'+i,{opacity:0,y:40,rotation:i===2?0:(i===1?-3:3),svgOrigin:'540 480'},{opacity:1,y:0,duration:.45,ease:'power2.out'},WT(w)-.1);});
   ['r1','r2','r3'].forEach(c=>{A.breathe(tl,c,t0,d);A.blinks(tl,c,t0,d);});A.head(tl,'r1',10,t0+.3,1);A.mouth(tl,'r1','S',t0+.3);}
});

/* 20 ─ "…hoy produce su propio show." Cuarto de control: HotSpanish con audífonos frente a muchos monitores de la mansión */
S.push({k:'productor',w:201,tr:'flash',cam:{s:[1.18,1.04],ease:'power2.out'},
 bg:()=>sky('pr_bg',[[0,'#0a0e1a'],[1,'#04060c']])+`<g>${Array.from({length:12},(_,i)=>{const x=110+(i%6)*172,y=150+Math.floor(i/6)*190;return `<rect x="${x-80}" y="${y-70}" width="160" height="130" rx="8" fill="#1a2a4a" stroke="#2a3a5a" stroke-width="6"/><g transform="translate(${x} ${y+20})">${P.mansion('prm'+i,0,0,.13)}</g><circle cx="${x-60}" cy="${y-50}" r="7" fill="#ff3b3b"/>`;}).join('')}</g>`+light(540,300,600,300,'gGlowB',.4),
 mid:()=>`<rect x="-80" y="760" width="1240" height="60" fill="#2a2a36"/>${Array.from({length:10},(_,i)=>`<rect x="${80+i*90}" y="772" width="40" height="14" rx="4" fill="${['#ff3b3b','#7dffb0','#ffd24f','#5ff3ff'][i%4]}"/>`).join('')}`+
   N('pr_hs',540,1250,1.35,makeChar('ph',Object.assign({},HS,{headphones:true}))),
 fg:()=>`<g id="pr_txt" opacity="0"><rect x="330" y="40" width="420" height="80" rx="16" fill="#ff4fb4"/>${T(540,96,'PRODUCTOR',{s:50,c:'#fff',ls:6})}</g>`,
 anim(tl,t0,d){A.breathe(tl,'ph',t0,d);A.blinks(tl,'ph',t0,d);A.laugh(tl,'ph',t0+.2,1);A.arm(tl,'ph','F',-150,-20,0,t0+.3);
   tl.fromTo('#pr_txt',{opacity:0,y:-20},{opacity:1,y:0,duration:.35,ease:'back.out(2)'},WT(203));}
});

/* 21 ─ PREGUNTA "¿Tú te atreverías a apostar todos tus ahorros por un sueño?" HotSpanish mira a cámara con la alcancía; globo ¿Y TÚ? */
S.push({k:'pregunta',w:206,tr:'whip',cam:{s:[1.0,1.14],ease:'power1.inOut'},
 bg:()=>sky('q_bg',[[0,'#12051e'],[.6,'#3a0a40'],[1,'#ff4fb4']])+light(540,760,620,420,'gGlowP',.8)+P.mansion('q_m',820,800,.55,'#ffcf7a'),
 mid:()=>hs('hq',380,1250,1.45,P.alcancia('q_pig',30,40,.32))+`<g id="q_b" opacity="0">${P.bocadillo('q_bb',800,260,380,'¿Y TÚ?',{s:70,bg:'#ffd24f',tail:'l'})}</g>`,
 fg:()=>P.dust(421,40,1080,1080,'#ffd8f0'),
 anim(tl,t0,d){A.setArm('hq','F',-70,-40,0);A.breathe(tl,'hq',t0,d);A.blinks(tl,'hq',t0,d);A.look(tl,'hq',2,0,t0);A.head(tl,'hq',-4,t0+.3);
   tl.fromTo('#q_b',{opacity:0,scale:.5,svgOrigin:'800 260'},{opacity:1,scale:1,duration:.35,ease:'back.out(2.5)'},WT(206));A.brows(tl,'hq',-6,WT(210));tl.to('#black',{opacity:1,duration:.5},t0+d-.5);}
});

window.SCENES=S;
window.EPISODE_KEYWORDS=[];
})();
