/* DATOLOGO · episodio hotspanish-parte-2-la-transformacion · scenes.js — "HotSpanish · Parte 2: La transformación"
   FORMATO 1:1 → marco 1080×1080. Biblia v5: personaje grande (50–70 % del alto), cara visible, objetos narrativos grandes,
   tercio inferior (y>860) libre de caras para subtítulos. Personajes ilustrados propios (fichas), sin retratos. */
(function(){
const {lg,rg,def,PRNG}=DL; const P=DLP; const {makeChar,A}=DLC;
const {N,T,addToGroup,sky,floorG,light,beam}=DLK;
const F=window.FICHAS; const S=[];
const YT=F.hotspanishYT, YTL=F.hotspanishYTLentes, HS=F.hotspanish;
const pantalla=(c,extra)=>`<rect x="-240" y="-302" width="480" height="286" fill="${c}"/>${extra||''}`;
const billetes=(seed,n,x0,w,id)=>{const R=PRNG(seed);let s='';for(let i=0;i<n;i++){s+=N(`${id}${i}`,x0+R()*w,-120-R()*500,.55+R()*.3,P.bill(),R()*360);}return `<g id="${id}">${s}</g>`;};
const fallBills=(tl,id,n,t0,d)=>{for(let i=0;i<n;i++)tl.to(`#${id}${i}`,{y:1500,rotation:'+=200',duration:2.4+(i%5)*.35,ease:'none'},t0+(i%7)*.18);};

/* 1 ─ GANCHO "Nadie lo veía en inglés." Cuarto oscuro, laptop con 0 vistas, Roberto grande iluminado por la pantalla */
S.push({k:'hook',w:0,tr:'fade',cam:{s:[1.2,1.06],y:[30,0],ease:'power2.out'},
 bg:()=>sky('h_bg',[[0,'#141026'],[1,'#07060e']])+`<g filter="url(#fWall)"><rect x="-80" y="-80" width="1240" height="900" fill="#1c1830"/></g>`+
   `<rect x="80" y="120" width="220" height="280" fill="#0a1024"/>${P.stars(3,20,200,260).replace(/cx="([\d.]+)" cy="([\d.]+)"/g,(m,a,b)=>`cx="${+a+90}" cy="${+b+130}"`)}<path d="M190 120 v280 M80 260 h220" stroke="#0a1024" stroke-width="12"/>`+
   `<rect x="-80" y="820" width="1240" height="340" fill="#110d1c"/>`,
 mid:()=>light(560,700,420,300,'gGlowC',.35,'h_glow')+N('h_rob',380,1260,1.35,makeChar('hr',YT))+
   `<rect x="520" y="830" width="560" height="34" rx="8" fill="#3a2a22" filter="url(#fWood)"/>`+
   N('h_lap',790,830,.85,P.laptop('hl',pantalla('#14203a',`${T(0,-200,'0 views',{s:64,c:'#9fb4d8'})}${T(0,-130,'Subscribe',{s:34,c:'#5a6a8a',w:800})}<rect x="-180" y="-80" width="360" height="12" rx="6" fill="#2a3a5a"/>`))),
 fg:()=>`<g filter="url(#fSoft16)"><rect x="-140" y="880" width="380" height="300" rx="30" fill="#05040a"/></g>`+P.dust(201,24,1080,900,'#9fd8ff'),
 anim(tl,t0,d){A.setArm('hr','F',-60,-70,0);A.setArm('hr','B',-50,-75,0);A.breathe(tl,'hr',t0,d);A.blinks(tl,'hr',t0,d,1.5);A.look(tl,'hr',8,4,t0+.1);A.brows(tl,'hr',4,t0+.3);
   tl.to('#h_glow',{opacity:.2,duration:.25,yoyo:true,repeat:Math.floor(d/.25)},t0);tl.to('#d201',{y:-40,duration:d,ease:'none'},t0);}
});

/* 2 ─ Diciembre 2014: crea su canal (calendario + clic en "Crear canal") */
S.push({k:'canal',w:5,tr:'flash',title:'2014',titleAt:8,cam:{x:[40,-30],s:[1.05,1.15]},
 bg:()=>sky('c_bg',[[0,'#1a1430'],[1,'#0c0a18']])+`<g filter="url(#fWall)"><rect x="-80" y="-80" width="1240" height="840" fill="#251e3e"/></g>`+
   N('c_cal',230,330,.75,P.calendarPage('cc','DIC','2014','#d8362f'))+`<g id="c_snow">${P.stars(44,40,1080,700,'#e8f0ff')}</g>`+`<rect x="-80" y="760" width="1240" height="400" fill="#16122a"/>`,
 mid:()=>N('c_lap',600,820,1.15,P.laptop('cl',pantalla('#f2f2f6',`${T(0,-232,'TU CANAL',{s:40,c:'#2a2a3a'})}<circle cx="0" cy="-160" r="42" fill="#c8ccd8"/><rect id="c_btn" x="-130" y="-100" width="260" height="62" rx="31" fill="#d8362f"/>${T(0,-58,'CREAR CANAL',{s:30,c:'#fff'})}`)))+
   `<g id="c_cursor">${N('c_cur',780,700,1,'<path d="M0 0 L0 60 L16 46 L28 72 L38 66 L26 42 L46 42Z" fill="#fff" stroke="#1a1a26" stroke-width="4"/>')}</g>`+
   N('c_rob',260,1250,1.25,makeChar('cr',YT)),
 fg:()=>light(600,560,360,200,'gGlowW',.25,'c_flash'),
 anim(tl,t0,d){A.breathe(tl,'cr',t0,d);A.blinks(tl,'cr',t0,d);A.look(tl,'cr',8,2,t0+.2);A.arm(tl,'cr','F',-80,-40,0,t0+.3);
   tl.to('#c_cursor',{x:-200,y:-30,duration:1,ease:'power2.inOut'},t0+.2);tl.to('#c_btn',{scale:.92,svgOrigin:'0 -69',duration:.1,yoyo:true,repeat:1},t0+1.25);
   tl.fromTo('#c_flash',{opacity:0},{opacity:1,duration:.15,yoyo:true,repeat:1},t0+1.3);A.mouth(tl,'cr','O',t0+1.35);tl.to('#c_snow',{y:60,duration:d,ease:'none'},t0);}
});

/* 3 ─ Bromas en inglés: graba en la calle con su cámara, globo "Hey guys!" */
S.push({k:'english',w:17,tr:'whip',cam:{x:[-40,40],s:[1.04,1.12]},
 bg:()=>sky('e_sky',[[0,'#f2a86a'],[.6,'#f6d29a'],[1,'#fbe8c8']])+P.skyline(301,{base:760,minH:160,maxH:440,top:'#c88a6a',bot:'#8a5a4a',side:'#6a4038',lit:'#ffe2a8',dark:'#7a4a3a',towers:false})+P.palm(140,780,1.1,'#5a3a2a')+P.palm(980,790,1.3,'#5a3a2a')+
   floorG('e_st',[[0,'#8a7a6a'],[1,'#4a3e36']],760),
 mid:()=>N('e_rob',420,1240,1.3,addToGroup(makeChar('er',YT),'er_hF',P.camara('e_cam',30,30,.55)))+
   P.bocadillo('e_b1',760,250,380,'Hey guys!',{s:50,tail:'l'})+P.bocadillo('e_b2',800,420,330,'Prank time!',{s:40,tail:'l',bg:'#ffd24f'}),
 fg:()=>`<g filter="url(#fSoft8)">${N('e_car',-120,1080,.9,P.car('ec',{c1:'#3a6ad8',c2:'#162a6a'}))}</g>`,
 anim(tl,t0,d){A.setArm('er','F',-110,-30,0);A.breathe(tl,'er',t0,d);A.blinks(tl,'er',t0,d);A.laugh(tl,'er',t0+.2,1.2);A.mouth(tl,'er','S',t0+1.6);A.look(tl,'er',10,-2,t0);
   tl.to('#e_cam_rec',{opacity:.2,duration:.35,yoyo:true,repeat:Math.floor(d/.35)},t0);
   tl.fromTo('#e_b1',{opacity:0,scale:.5,svgOrigin:'0 0'},{opacity:1,scale:1,duration:.3,ease:'back.out(2.5)'},t0+.2);tl.fromTo('#e_b2',{opacity:0,scale:.5,svgOrigin:'0 0'},{opacity:1,scale:1,duration:.3,ease:'back.out(2.5)'},t0+1.4);}
});

/* 4 ─ "Grababa, editaba y publicaba…" escritorio de noche, línea de tiempo, reloj que corre, taza con vapor */
S.push({k:'edit',w:35,tr:'cut',cam:{s:[1.08,1.18],x:[0,-30]},
 bg:()=>sky('ed_bg',[[0,'#101830'],[1,'#060a16']])+`<rect x="760" y="100" width="240" height="300" fill="#0a1024"/><circle id="ed_moon" cx="900" cy="200" r="34" fill="#e8eeff"/>`+
   N('ed_clk',260,240,1,`<circle r="90" fill="#f4ecd8" stroke="#3a3a46" stroke-width="12"/><g id="ed_h"><path d="M0 0 V-50" stroke="#2a2a36" stroke-width="10" stroke-linecap="round"/></g><g id="ed_m"><path d="M0 0 V-72" stroke="#d8362f" stroke-width="6" stroke-linecap="round"/></g><circle r="8" fill="#2a2a36"/>`)+`<rect x="-80" y="760" width="1240" height="400" fill="#120e1c"/>`,
 mid:()=>light(620,600,420,260,'gGlowC',.4)+N('ed_rob',300,1250,1.3,makeChar('edr',YT))+`<rect x="380" y="820" width="700" height="36" rx="8" fill="#4a3226" filter="url(#fWood)"/>`+
   N('ed_lap',720,820,.9,P.laptop('el',pantalla('#141a2a',`<rect x="-220" y="-280" width="440" height="140" fill="#2a3450"/><path d="M-180 -210 L-110 -250 L-110 -170Z" fill="#fff" opacity=".7"/>${[0,1,2].map(r=>`<rect x="-220" y="${-120+r*34}" width="440" height="26" fill="#1c2236"/>`).join('')}<rect id="ed_c1" x="-200" y="-118" width="120" height="22" rx="4" fill="#5ff3ff"/><rect x="-60" y="-118" width="160" height="22" rx="4" fill="#ff4fd8"/><rect x="-180" y="-84" width="200" height="22" rx="4" fill="#ffd24f"/><rect id="ed_play" x="-4" y="-130" width="6" height="110" fill="#ff3b3b"/>`)))+
   `<g transform="translate(1000 820)"><rect x="-34" y="-80" width="68" height="80" rx="10" fill="#e8e2d6"/><path d="M34 -60 q26 0 26 22 q0 22 -26 22" stroke="#e8e2d6" stroke-width="10" fill="none"/><g id="ed_steam" opacity=".6"><path d="M-10 -96 q-14 -24 0 -46 q14 -22 0 -44" stroke="#c8d0e0" stroke-width="6" fill="none"/></g></g>`,
 fg:()=>`<g filter="url(#fSoft16)"><circle cx="-60" cy="1100" r="200" fill="#04030a"/></g>`,
 anim(tl,t0,d){A.setArm('edr','F',-70,-55,0);A.setArm('edr','B',-60,-70,0);A.breathe(tl,'edr',t0,d);A.blinks(tl,'edr',t0,d,1.2);A.look(tl,'edr',10,4,t0);
   tl.to('#ed_m',{rotation:1080,svgOrigin:'0 0',duration:d,ease:'none'},t0);tl.to('#ed_h',{rotation:90,svgOrigin:'0 0',duration:d,ease:'none'},t0);
   tl.to('#ed_play',{x:220,duration:d,ease:'none'},t0);tl.to('#ed_steam',{y:-30,opacity:0,duration:1.2,repeat:Math.floor(d/1.2)},t0);
   tl.to('#edr_hF',{rotation:-8,svgOrigin:'0 0',duration:.15,yoyo:true,repeat:Math.floor(d/.15)},t0);}
});

/* 5 ─ "…pero el público que esperaba nunca llegó." Auditorio vacío, un foco, él solo en el escenario */
S.push({k:'empty',w:39,tr:'fade',cam:{s:[1.0,1.14],y:[0,20],ease:'power1.inOut'},
 bg:()=>sky('em_bg',[[0,'#0a0810'],[1,'#141020']])+beam(540,-80,520,1000,0,'#fff1c8',.28,'em_beam')+
   `<g>${Array.from({length:4},(_,r)=>Array.from({length:9},(_,c)=>`<rect x="${-20+c*125+(r%2)*30}" y="${800+r*90}" width="100" height="70" rx="12" fill="#3a1a2a" stroke="#1a0a14" stroke-width="4"/>`).join('')).join('')}</g>`,
 mid:()=>`<rect x="-80" y="700" width="1240" height="60" fill="#3a2a22" filter="url(#fWood)"/>`+light(540,720,260,40,'gShadow',.8)+N('em_rob',540,730,1.0,makeChar('emr',YT)),
 fg:()=>`<g id="em_crk" opacity="0">${T(170,980,'cri',{s:34,c:'#7a8a7a',w:700})}${T(930,1010,'cri cri',{s:30,c:'#7a8a7a',w:700})}</g>`+P.dust(205,30,1080,1080,'#fff1c8'),
 anim(tl,t0,d){A.breathe(tl,'emr',t0,d);A.blinks(tl,'emr',t0,d,1.4);A.head(tl,'emr',10,t0+.4,1);A.lean(tl,'emr',4,t0+.4,1);A.brows(tl,'emr',5,t0+.5);
   A.setArm('emr','F',-10,-10,0);tl.to('#em_crk',{opacity:1,duration:.4,yoyo:true,repeat:3},t0+.6);tl.to('#em_beam',{opacity:.6,duration:.4,yoyo:true,repeat:Math.floor(d/.4)},t0);tl.to('#d205',{y:-40,duration:d,ease:'none'},t0);}
});

/* 6 ─ Descubre "un YouTube hecho para México": globo terráqueo/mapa iluminándose en verde-blanco-rojo */
S.push({k:'mexico',w:46,tr:'zoom',cam:{s:[1.0,1.18]},
 bg:()=>sky('mx_bg',[[0,'#0e1a34'],[1,'#060a16']])+`<g opacity=".15">${Array.from({length:12},(_,i)=>`<path d="M${-80+i*110} -80 V1160 M-80 ${-80+i*110} H1160" stroke="#5ff3ff" stroke-width="1.5"/>`).join('')}</g>`,
 mid:()=>N('mx_ph',700,500,1.05,P.phone('mxp',`<rect x="-134" y="-282" width="268" height="564" fill="#1a1a24"/><rect x="-110" y="-240" width="220" height="150" rx="20" fill="#f4f4f8"/><path d="M-22 -195 L30 -165 L-22 -135Z" fill="#1a1a24"/><g id="mx_flag"><rect x="-110" y="-60" width="73" height="120" fill="#1f8a4a"/><rect x="-37" y="-60" width="74" height="120" fill="#f4f4f4"/><rect x="37" y="-60" width="73" height="120" fill="#d8362f"/><circle cx="0" cy="0" r="18" fill="#a8743a"/></g>${T(0,120,'MÉXICO',{s:44,c:'#fff',ls:6})}`))+
   light(700,500,360,420,'gGlowW',.3,'mx_glow')+N('mx_rob',260,1270,1.3,makeChar('mxr',YT)),
 fg:()=>P.dust(206,40,1080,1080,'#9fffc8'),
 anim(tl,t0,d){A.breathe(tl,'mxr',t0,d);A.blinks(tl,'mxr',t0,d);A.look(tl,'mxr',10,-6,t0);A.brows(tl,'mxr',-8,WT(51));A.mouth(tl,'mxr','O',WT(51));
   tl.fromTo('#mx_flag',{opacity:0,scale:.6,svgOrigin:'0 0'},{opacity:1,scale:1,duration:.5,ease:'back.out(2)'},WT(53));tl.to('#mx_glow',{opacity:.7,duration:.6},WT(53));tl.to('#d206',{y:-60,duration:d,ease:'none'},t0);}
});

/* 7 ─ "primera gran decisión: hablarle a su gente": se levanta, la luz pasa de fría a cálida */
S.push({k:'decision',w:55,tr:'wipe',title:'LA DECISIÓN',titleAt:58,cam:{s:[1.15,1.02],ease:'power2.out'},
 bg:()=>sky('dc_bg',[[0,'#1a1430'],[1,'#0a0814']])+`<rect id="dc_warm" x="-80" y="-80" width="1240" height="1240" fill="#ff9a4a" opacity="0"/>`+light(540,380,600,500,'gGlowA',0,'dc_sun'),
 mid:()=>N('dc_rob',540,1240,1.45,makeChar('dcr',YT)),
 fg:()=>`<g filter="url(#fSoft30)"><rect x="-120" y="900" width="1320" height="300" fill="#05040a" opacity=".7"/></g>`,
 anim(tl,t0,d){A.breathe(tl,'dcr',t0,d);A.blinks(tl,'dcr',t0,d);A.brows(tl,'dcr',-6,t0+.3);A.look(tl,'dcr',2,-2,t0);
   tl.to('#dc_warm',{opacity:.25,duration:1.4},t0+.4);tl.to('#dc_sun',{opacity:.9,duration:1.4},t0+.4);
   A.arm(tl,'dcr','F',-150,-20,0,WT(61));A.mouth(tl,'dcr','S',WT(61));tl.to('#dcr_hF',{rotation:20,svgOrigin:'0 0',duration:.3,yoyo:true,repeat:3},WT(62));}
});

/* 8 ─ Cambia al español: "Hey guys!" se tacha → "¡Qué onda, raza!"; chiles que suben el tono */
S.push({k:'espanol',w:68,tr:'whip',cam:{x:[30,-30],s:[1.06,1.14]},
 bg:()=>sky('es_bg',[[0,'#3a0e1e'],[1,'#120408']])+light(760,400,500,500,'gGlowR',.45),
 mid:()=>N('es_rob',300,1250,1.35,addToGroup(makeChar('esr',YT),'esr_hF',P.camara('es_cam',30,30,.55)))+
   `<g id="es_en">${P.bocadillo('es_b1',740,230,360,'Hey guys!',{s:46})}<path id="es_x" d="M580 230 L900 230" stroke="#ff3b3b" stroke-width="12" stroke-linecap="round" stroke-dasharray="320" stroke-dashoffset="320"/></g>`+
   `<g id="es_es" opacity="0">${P.bocadillo('es_b2',740,400,420,'¡Qué onda!',{s:52,bg:'#ffd24f'})}</g>`+
   `<g id="es_hot">${[0,1,2].map(i=>`<g id="es_c${i}" opacity="0">${P.chile('es_ci'+i,640+i*130,700,.7)}</g>`).join('')}</g>`,
 fg:()=>P.dust(208,30,1080,1080,'#ffb07a'),
 anim(tl,t0,d){A.setArm('esr','F',-110,-30,0);A.breathe(tl,'esr',t0,d);A.blinks(tl,'esr',t0,d);A.look(tl,'esr',10,-4,t0);
   tl.to('#es_x',{strokeDashoffset:0,duration:.35,ease:'power2.out'},WT(69)-.1);tl.to('#es_en',{opacity:.35,duration:.3},WT(70));
   tl.fromTo('#es_es',{opacity:0,scale:.5,svgOrigin:'740 400'},{opacity:1,scale:1,duration:.35,ease:'back.out(2.5)'},WT(70));A.laugh(tl,'esr',WT(70),1);
   for(let i=0;i<3;i++)tl.fromTo('#es_c'+i,{opacity:0,y:60},{opacity:1,y:0,duration:.3,ease:'back.out(2)'},WT(71)+i*.15);tl.to('#d208',{y:-60,duration:d,ease:'none'},t0);}
});

/* 9 ─ "…y se puso un nombre: HotSpanish." Letrero de neón que se enciende detrás de él */
S.push({k:'nombre',w:77,tr:'flash',cam:{s:[1.22,1.04],ease:'power2.out'},
 bg:()=>sky('nm_bg',[[0,'#12051e'],[1,'#05020c']])+`<g filter="url(#fWall)"><rect x="-80" y="-80" width="1240" height="1240" fill="#1a0a24"/></g>`+light(540,300,600,300,'gGlowP',.0,'nm_glow'),
 mid:()=>`<g id="nm_sign" opacity="0">${P.neon('nm_n',540,300,'HOTSPANISH',96,'#ff4fb4')}</g>`+N('nm_rob',540,1280,1.35,makeChar('nmr',YT))+`<g id="nm_v2" opacity="0">${N('nm_rob2',540,1280,1.35,makeChar('nmr2',YTL))}</g>`,
 fg:()=>`<rect x="-80" y="1000" width="1240" height="200" fill="#0a0410"/>`,
 anim(tl,t0,d){A.breathe(tl,'nmr',t0,d);A.blinks(tl,'nmr',t0,d);A.look(tl,'nmr',2,-6,t0);const tn=WT(82)-.15;
   tl.set('#nm_sign',{opacity:.4},tn).set('#nm_sign',{opacity:0},tn+.06).set('#nm_sign',{opacity:1},tn+.12).set('#nm_sign',{opacity:.5},tn+.2).set('#nm_sign',{opacity:1},tn+.26);
   tl.to('#nm_glow',{opacity:.8,duration:.3},tn+.26);tl.to('#nm_v2',{opacity:1,duration:.15},tn+.3);tl.set('#nm_rob',{opacity:0},tn+.45);A.breathe(tl,'nmr2',tn+.3,1.5);A.arm(tl,'nmr2','F',-140,-30,0,tn+.35);}
});

/* 10 ─ "En 2016 llegó el video que lo cambió todo." Calendario 2016 + barra de subida al 100 % */
S.push({k:'y2016',w:83,tr:'glitch',title:'2016',titleAt:84,cam:{s:[1.0,1.16],ease:'power2.in'},
 bg:()=>sky('y_bg',[[0,'#1a0a2a'],[1,'#07030e']])+N('y_cal',830,300,.7,P.calendarPage('yc','ABR','2016','#ff4fb4')),
 mid:()=>N('y_lap',470,700,1.2,P.laptop('yl',pantalla('#2a0f3a',`${T(0,-220,'SUBIENDO VIDEO',{s:34,c:'#fff',ls:4})}<rect x="-200" y="-150" width="400" height="26" rx="13" fill="#4a2a5a"/><rect id="y_bar" x="-200" y="-150" width="0" height="26" rx="13" fill="#ff4fb4"/>`)))+light(470,560,420,260,'gGlowP',.35),
 fg:()=>P.dust(210,30,1080,1080,'#ff9ae8'),
 anim(tl,t0,d){tl.to('#y_bar',{attr:{width:400},duration:Math.max(.8,d-.5),ease:'power1.inOut'},t0+.3);tl.to('#d210',{y:-60,duration:d,ease:'none'},t0);}
});

/* 11 ─ "Un tiroteo falso en plena calle. La gente corría asustada…" (sin armas visibles: cámara oculta + gente que huye) */
S.push({k:'broma',w:92,tr:'flash',cam:{x:[-30,30],s:[1.05,1.15]},
 bg:()=>sky('b_sky',[[0,'#6a8ab8'],[1,'#d8c8b0']])+P.skyline(311,{base:740,minH:180,maxH:480,top:'#8a8aa8',bot:'#5a5a78',side:'#3a3a54',lit:'#ffe8b0',dark:'#4a4a64',towers:false})+floorG('b_st',[[0,'#9a8e80'],[1,'#5a5048']],740),
 mid:()=>[[160,1000,1.0,{hairStyle:'short',top:['#3a8ad8','#163a6a'],skin:['#f3c09a','#c98a66','#7a4a40']}],[420,960,.9,{hairStyle:'long',top:['#f2c14e','#a86a12'],skin:['#e0a07a','#a86a4c','#5e3628']}],[700,1010,1.0,{hairStyle:'bald',top:['#7dbf6a','#2a5a24'],skin:['#c88a62','#9a5a3c','#4a2a1e'],beard:true}],[920,970,.9,{hairStyle:'short',top:['#e85a4a','#8a2a24'],skin:['#f6d0b0','#d0a080','#8a5a48'],hair:['#e8c87a','#a8843a']}]].map(([x,y,s,o],i)=>N('b_p'+i,x,y,-s,makeChar('bp'+i,Object.assign({pants:['#2c3550','#121626']},o)))).join('')+
   `<g id="b_bang" opacity="0">${T(540,300,'¡BANG!',{s:120,c:'#ffd24f',f:'fGlow',ls:6})}${T(540,300,'¡BANG!',{s:120,c:'#fff8d8',ls:6})}</g>`,
 fg:()=>`<g transform="translate(980 980)"><ellipse rx="220" ry="140" fill="#2a5a2a"/><ellipse cx="-80" cy="-40" rx="120" ry="90" fill="#3a7a3a"/></g>`+P.camara('b_cam',940,900,.7)+`<g id="b_rec">${T(820,180,'● REC',{s:44,c:'#ff3b3b',a:'start'})}</g>`,
 anim(tl,t0,d){const tb=WT(93);tl.fromTo('#b_bang',{opacity:0,scale:.6,svgOrigin:'540 260'},{opacity:1,scale:1,duration:.2,ease:'back.out(3)'},tb).to('#b_bang',{opacity:0,duration:.3},tb+.6);
   SHAKE(0,tb,.4,10);for(let i=0;i<4;i++){const c='bp'+i;A.mouth(tl,c,'O',tb+.05);A.brows(tl,c,-12,tb+.05,.12);A.look(tl,c,8,-4,tb+.05,.12);
     A.arm(tl,c,'F',-165,-30,0,tb+.08,.25);A.arm(tl,c,'B',-150,-40,0,tb+.1,.25);A.walk(tl,c,WT(99),d-(WT(99)-t0),.2);tl.to('#b_p'+i,{x:-760-i*60,duration:d-(WT(99)-t0),ease:'power1.in'},WT(99));}
   tl.to('#b_rec',{opacity:.2,duration:.4,yoyo:true,repeat:Math.floor(d/.4)},t0);tl.to('#b_cam_rec',{opacity:.2,duration:.4,yoyo:true,repeat:Math.floor(d/.4)},t0);}
});

/* 12 ─ "Las vistas explotaron." Pantallas que se multiplican y gráfica disparada */
S.push({k:'vistas',w:108,tr:'zoom',cam:{s:[1.0,1.2]},
 bg:()=>sky('v_bg',[[0,'#1a0630'],[1,'#05020c']])+light(540,540,600,600,'gGlowP',.45),
 mid:()=>`<g id="v_grid">${Array.from({length:12},(_,i)=>{const x=150+(i%4)*260,y=170+Math.floor(i/4)*250;return `<g id="v_s${i}" opacity="0"><rect x="${x-110}" y="${y-80}" width="220" height="150" rx="16" fill="${['#3a1050','#14305a','#1a4a2a','#5a1a2a'][i%4]}"/><rect x="${x-30}" y="${y-30}" width="60" height="44" rx="12" fill="#f4f4f8"/><path d="M${x-8} ${y-20} L${x+14} ${y-8} L${x-8} ${y+4}Z" fill="#1a1020"/></g>`;}).join('')}</g>`+
   `<path id="v_line" d="M120 820 L320 780 L480 700 L640 520 L800 300 L960 120" fill="none" stroke="#5ff3ff" stroke-width="12" stroke-linecap="round" stroke-dasharray="1200" stroke-dashoffset="1200" filter="url(#fGlow)"/>`,
 fg:()=>P.dust(212,40,1080,1080,'#ff9ae8'),
 anim(tl,t0,d){for(let i=0;i<12;i++)tl.fromTo('#v_s'+i,{opacity:0,scale:.3,svgOrigin:'540 540'},{opacity:1,scale:1,duration:.25,ease:'back.out(2)'},t0+.05*i);tl.to('#v_line',{strokeDashoffset:0,duration:.9,ease:'power2.in'},t0+.3);}
});

/* 13 ─ "Pero también las críticas… demasiado lejos" tormenta de comentarios negativos y periódico POLÉMICA */
S.push({k:'criticas',w:111,tr:'glitch',cam:{s:[1.12,1.0],r:[-1,1]},
 bg:()=>sky('cr_bg',[[0,'#2a0a0e'],[1,'#0a0204']])+light(540,500,600,500,'gGlowR',.35),
 mid:()=>N('cr_news',540,520,.95,P.newspaper('crn','¡POLÉMICA!','Bromas que fueron demasiado lejos'))+
   `<g id="cr_cm">${[[180,180,'Eso no es broma'],[860,240,'Se pasó'],[200,820,'Qué irresponsable'],[880,780,'Demasiado lejos'],[540,120,'👎 👎 👎']].map(([x,y,t],i)=>`<g id="cr_c${i}" opacity="0">${P.bocadillo('cr_b'+i,x,y,Math.max(260,t.length*24),t,{s:32,bg:'#2a1a1e',c:'#ff8a8a',tail:i%2?'r':'l'})}</g>`).join('')}</g>`,
 fg:()=>P.dust(213,30,1080,1080,'#ff6a6a'),
 anim(tl,t0,d){tl.fromTo('#cr_news',{scale:2.2,rotation:-30,opacity:0,svgOrigin:'0 0'},{scale:1,rotation:-4,opacity:1,duration:.5,ease:'power3.out'},t0);
   for(let i=0;i<5;i++)tl.fromTo('#cr_c'+i,{opacity:0,scale:.4,svgOrigin:'540 540'},{opacity:1,scale:1,duration:.25,ease:'back.out(2.5)'},t0+.5+i*.35);}
});

/* 14 ─ "él mismo terminó admitiéndolo… tal vez no debía hacer más videos así" sentado, celular, lluvia en la ventana */
S.push({k:'admite',w:122,tr:'fade',cam:{s:[1.04,1.16],x:[20,-20]},
 bg:()=>sky('a_bg',[[0,'#141a2a'],[1,'#080c16']])+`<rect x="560" y="100" width="420" height="440" rx="8" fill="#0c1424"/>${P.rain(214,60,570,110,400,420)}<path d="M770 100 v440 M560 320 h420" stroke="#1a2236" stroke-width="14"/>`+
   `<g filter="url(#fWall)"><rect x="-80" y="-80" width="640" height="840" fill="#1c2236"/></g><rect x="-80" y="760" width="1240" height="400" fill="#10141e"/>`,
 mid:()=>light(420,620,260,220,'gGlowC',.35,'a_ph')+`<rect x="140" y="760" width="560" height="60" rx="20" fill="#3a3a54"/><rect x="140" y="640" width="80" height="160" rx="20" fill="#3a3a54"/>`+
   N('a_rob',420,1040,1.15,addToGroup(makeChar('ar',YTL),'ar_hF',`<g transform="translate(10 40) rotate(-20)"><rect x="-26" y="-50" width="52" height="96" rx="10" fill="#16161c"/><rect x="-20" y="-42" width="40" height="78" rx="6" fill="#5ff3ff" opacity=".8"/></g>`)),
 fg:()=>`<g filter="url(#fSoft16)"><rect x="880" y="700" width="360" height="500" rx="30" fill="#05070c"/></g>`,
 anim(tl,t0,d){A.setArm('ar','F',-75,-70,0);A.setArm('ar','B',-30,-40,0);['thF','thB'].forEach(k=>gsap.set('#ar_'+k,{rotation:-80,svgOrigin:'0 0'}));['shF','shB'].forEach(k=>gsap.set('#ar_'+k,{rotation:84,svgOrigin:'0 0'}));
   tl.set('#a_rob',{y:-140},t0);A.breathe(tl,'ar',t0,d);A.blinks(tl,'ar',t0,d,1.6);A.head(tl,'ar',14,t0+.3,1.2);A.look(tl,'ar',4,8,t0+.3);A.brows(tl,'ar',6,t0+.4);
   A.mouth(tl,'ar','S',WT(127));A.head(tl,'ar',4,WT(127),.8);tl.to('#a_ph',{opacity:.15,duration:.6,yoyo:true,repeat:Math.floor(d/.6)},t0);}
});

/* 15 ─ "Con los años, su contenido cambió de rumbo." Hojas de calendario volando + amanecer */
S.push({k:'rumbo',w:138,tr:'whip',cam:{x:[60,-60],s:[1.04,1.1],ease:'none'},
 bg:()=>sky('r_sky',[[0,'#2a3a7a'],[.55,'#ff9a6a'],[1,'#ffd88a']])+`<circle cx="540" cy="760" r="140" fill="#ffe8a8"/><circle cx="540" cy="760" r="420" fill="url(#gGlowA)" opacity=".7"/>`+P.mountains(315,760,200,'#6a3a5a','#3a2040',6),
 mid:()=>floorG('r_g',[[0,'#5a3a3a'],[1,'#2a1a1e']],760)+`<path d="M540 760 L640 760 L1100 1160 L-20 1160Z" fill="#7a5a4a" opacity=".6"/><path d="M590 780 L600 1160" stroke="#ffe8a8" stroke-width="10" stroke-dasharray="40 40"/>`+
   `<g id="r_cals">${['2017','2018','2019','2020','2021'].map((y,i)=>N('r_c'+i,140+i*200,300+(i%2)*120,.38,P.calendarPage('rc'+i,'AÑO',y,'#3a8ad8'),(i%2?12:-10))).join('')}</g>`,
 fg:()=>P.dust(215,30,1080,1080,'#fff1c8'),
 anim(tl,t0,d){for(let i=0;i<5;i++)tl.fromTo('#r_c'+i,{opacity:0,y:200},{opacity:1,y:0,duration:.3,ease:'back.out(2)'},t0+.15*i).to('#r_c'+i,{x:-1400,rotation:-60,svgOrigin:'0 0',duration:1.2,ease:'power2.in'},t0+.9+.12*i);tl.to('#d215',{y:-60,duration:d,ease:'none'},t0);}
});

/* 16 ─ "Salió a la calle con dinero en la mano… ¿Te atreves?" HotSpanish (look rosa) con abanico de billetes y un transeúnte */
S.push({k:'calle',w:146,tr:'flash',cam:{s:[1.14,1.04],x:[-20,20]},
 bg:()=>sky('k_sky',[[0,'#5aa8e8'],[1,'#f2dcb8']])+P.skyline(316,{base:760,minH:200,maxH:520,top:'#d8b090',bot:'#a8806a',side:'#7a5a4a',lit:'#fff1c8',dark:'#8a6a5a',towers:false})+P.palm(80,780,1.2,'#3a5a3a')+floorG('k_st',[[0,'#b8a690'],[1,'#7a6a5a']],760),
 mid:()=>N('k_hs',380,1250,1.4,addToGroup(makeChar('ks',HS),'ks_hF',`<g transform="translate(14 46) rotate(-30)">${[-30,-15,0,15,30].map(r=>`<g transform="rotate(${r})"><g transform="translate(0 -60) scale(.55)">${P.bill()}</g></g>`).join('')}</g>`))+
   N('k_p',850,1180,-1.15,makeChar('kp',{skin:['#d99a72','#a0644a','#583226'],hairStyle:'short',top:['#3ac87a','#146a3a'],pants:['#2c3550','#121626']}))+
   `<g id="k_q" opacity="0">${P.bocadillo('k_b',600,200,440,'¿TE ATREVES?',{s:56,bg:'#ffd24f'})}</g>`,
 fg:()=>light(380,560,300,300,'gGlowW',.3),
 anim(tl,t0,d){A.setArm('ks','F',-100,-40,0);A.breathe(tl,'ks',t0,d);A.blinks(tl,'ks',t0,d);A.breathe(tl,'kp',t0,d);A.blinks(tl,'kp',t0+.4,d);
   tl.to('#ks_hF',{rotation:12,svgOrigin:'0 0',duration:.3,yoyo:true,repeat:5},t0+.3);A.look(tl,'kp',-6,0,t0+.4);
   tl.fromTo('#k_q',{opacity:0,scale:.5,svgOrigin:'600 200'},{opacity:1,scale:1,duration:.35,ease:'back.out(2.5)'},WT(158)-.1);A.mouth(tl,'ks','O',WT(158));A.mouth(tl,'kp','O',WT(159)+.2);A.brows(tl,'kp',-8,WT(159)+.2);}
});

/* 17 ─ Los retos: rapar, chile, ruleta (tres objetos protagonistas que entran en orden) */
S.push({k:'retos',w:160,tr:'whip',cam:{s:[1.0,1.12]},
 bg:()=>sky('rt_bg',[[0,'#2a0a3a'],[1,'#0c0414']])+light(540,540,620,520,'gGlowP',.4)+billetes(317,14,0,1080,'rt_m'),
 mid:()=>`<g id="rt_1" opacity="0">${P.maquinita('rt_mq',200,520,1.3)}${T(200,820,'RAPARSE',{s:44,c:'#fff',ls:4})}</g>`+
   `<g id="rt_2" opacity="0">${P.chile('rt_ch',540,500,1.6)}${light(540,520,220,220,'gGlowR',.6,'rt_fire')}${T(540,820,'PICANTE',{s:44,c:'#fff',ls:4})}</g>`+
   `<g id="rt_3" opacity="0">${P.ruleta('rt_rl',880,500,170)}${T(880,820,'RULETA',{s:44,c:'#fff',ls:4})}</g>`,
 fg:()=>P.dust(217,30,1080,1080,'#ffd24f'),
 anim(tl,t0,d){[160,163,168].forEach((w,i)=>tl.fromTo('#rt_'+(i+1),{opacity:0,y:80},{opacity:1,y:0,duration:.35,ease:'back.out(2.2)'},WT(w)-.1));
   tl.to('#rt_mq',{rotation:8,svgOrigin:'0 0',duration:.05,yoyo:true,repeat:30},WT(160));tl.to('#rt_fire',{opacity:.2,duration:.15,yoyo:true,repeat:16},WT(165));
   tl.to('#rt_rl_w',{rotation:1440,svgOrigin:'0 0',duration:2.4,ease:'power3.out'},WT(169));fallBills(tl,'rt_m',14,t0,d);}
});

/* 18 ─ "Los retos se volvieron virales." Celulares con corazones flotando */
S.push({k:'viral',w:174,tr:'zoom',cam:{s:[1.0,1.15]},
 bg:()=>sky('vr_bg',[[0,'#3a0a40'],[1,'#0c0414']])+light(540,540,600,600,'gGlowP',.5),
 mid:()=>[[230,520,-10],[540,470,0],[850,520,10]].map(([x,y,r],i)=>N('vr_p'+i,x,y,.62,P.phone('vrp'+i,`<rect x="-134" y="-282" width="268" height="564" fill="#2a0f3a"/>${P.ruleta('vrr'+i,0,-90,90)}<path d="M-60 120 c-20 -30 -60 -10 -46 24 c10 20 46 44 46 44 c0 0 36 -24 46 -44 c14 -34 -26 -54 -46 -24z" fill="#ff4f7a"/>`),r)).join('')+
   `<g id="vr_h">${Array.from({length:14},(_,i)=>`<path id="vr_h${i}" d="M${120+(i*73)%860} ${980} c-14 -20 -42 -8 -32 16 c7 14 32 30 32 30 c0 0 25 -16 32 -30 c10 -24 -18 -36 -32 -16z" fill="#ff4f7a" opacity="0"/>`).join('')}</g>`,
 fg:()=>'',
 anim(tl,t0,d){for(let i=0;i<3;i++)tl.fromTo('#vr_p'+i,{y:300,opacity:0},{y:0,opacity:1,duration:.4,ease:'back.out(1.8)'},t0+i*.12);
   for(let i=0;i<14;i++)tl.fromTo('#vr_h'+i,{opacity:0,y:0},{opacity:1,y:-700,duration:1.8,ease:'power1.out'},t0+.2+i*.1).to('#vr_h'+i,{opacity:0,duration:.3},t0+1.7+i*.1);}
});

/* 19 ─ "el niño que vendía tortas se convirtió en…" corte del niño con la torta al HotSpanish adulto */
S.push({k:'match',w:179,tr:'fade',cam:{s:[1.06,1.14]},
 bg:()=>sky('m_bg',[[0,'#f6c87a'],[1,'#e8885a']])+`<rect id="m_night" x="-80" y="-80" width="1240" height="1240" fill="#1a0a2a" opacity="0"/>`+light(540,460,520,420,'gGlowA',.6,'m_l1')+light(540,460,520,420,'gGlowP',0,'m_l2'),
 mid:()=>`<g id="m_kid">${N('m_k',540,1160,1.3,addToGroup(makeChar('mk',F.hotspanishNino),'mk_hF',P.torta('m_t',20,20,.8)))}</g>`+
   `<g id="m_adult" opacity="0">${N('m_a',540,1250,1.4,makeChar('ma',HS))}</g>`,
 fg:()=>P.dust(219,30,1080,1080,'#ffe8c0'),
 anim(tl,t0,d){A.setArm('mk','F',-70,-40,0);A.breathe(tl,'mk',t0,d);A.blinks(tl,'mk',t0,d);A.look(tl,'mk',6,0,t0);
   const tc=WT(186)-.1;tl.to('#m_kid',{opacity:0,scale:1.1,svgOrigin:'540 700',duration:.35},tc);tl.fromTo('#m_adult',{opacity:0,scale:.9,svgOrigin:'540 700'},{opacity:1,scale:1,duration:.45,ease:'back.out(1.6)'},tc+.1);
   tl.to('#m_night',{opacity:.85,duration:.6},tc);tl.to('#m_l1',{opacity:0,duration:.6},tc);tl.to('#m_l2',{opacity:.8,duration:.6},tc);
   A.breathe(tl,'ma',tc,d-(tc-t0));A.blinks(tl,'ma',tc+.3,d-(tc-t0));A.laugh(tl,'ma',tc+.5,1);A.arm(tl,'ma','F',-150,-20,0,tc+.5);}
});

/* 20 ─ "Pero a HotSpanish ya no le bastaban los videos. Quería algo más grande…" azotea de noche frente a la ciudad */
S.push({k:'mas',w:198,tr:'whip',cam:{s:[1.0,1.14],y:[0,20],ease:'power1.inOut'},
 bg:()=>sky('ms_sky',[[0,'#0a0c22'],[.7,'#2a1a4a'],[1,'#5a2a5a']])+P.stars(320,70,1080,500)+P.skyline(321,{base:760,minH:160,maxH:520,top:'#2a2440',bot:'#14102a',side:'#0c0a1c',lit:'#ffd88a',dark:'#1c1830',neon:['#ff4fd8','#5ff3ff']}),
 mid:()=>`<rect x="-80" y="760" width="1240" height="40" fill="#2a2638"/><rect x="-80" y="800" width="1240" height="360" fill="#16121e"/>`+N('ms_hs',380,1240,-1.35,makeChar('mh',Object.assign({},HS,{rim:'#ff9ae8'})))+
   `<g id="ms_dream" opacity="0">${P.mansion('ms_m',780,520,.42)}${light(780,440,260,140,'gGlowA',.6)}</g>`,
 fg:()=>P.dust(220,30,1080,1080,'#ffd8f0'),
 anim(tl,t0,d){A.breathe(tl,'mh',t0,d);A.blinks(tl,'mh',t0,d,1.8);A.look(tl,'mh',8,-6,t0);A.head(tl,'mh',-6,t0+.4,1);
   tl.fromTo('#ms_dream',{opacity:0,y:30},{opacity:.95,y:0,duration:1.2,ease:'power2.out'},WT(208));A.brows(tl,'mh',-6,WT(209));}
});

/* 21 ─ CLIFFHANGER "estaba dispuesto a apostar todos sus ahorros." Alcancía, billetes empujados al centro, mansión que se enciende, PARTE 3 */
S.push({k:'apuesta',w:211,tr:'flash',cam:{s:[1.22,1.04],ease:'power2.out'},
 bg:()=>sky('ap_bg',[[0,'#0a0614'],[1,'#1a0a24']])+`<g id="ap_mn" opacity="0">${P.mansion('ap_m',540,520,.75,'#ffcf7a')}${light(540,420,600,300,'gGlowA',.5)}</g>`,
 mid:()=>`<rect x="-80" y="760" width="1240" height="60" rx="10" fill="#1e5a3a"/><rect x="-80" y="820" width="1240" height="340" fill="#0e2a1c"/>`+
   P.alcancia('ap_pig',250,690,.8)+`<g id="ap_stack">${Array.from({length:6},(_,i)=>N('ap_s'+i,620+(i%3)*110,740-Math.floor(i/3)*30,.7,P.bill())).join('')}</g>`+
   `<g id="ap_coins">${Array.from({length:8},(_,i)=>N('ap_c'+i,180+i*30,620,.5,P.coin(30))).join('')}</g>`,
 fg:()=>`<g id="ap_txt" opacity="0">${T(540,140,'PARTE 3',{s:84,c:'#fff',ls:14})}<rect x="420" y="168" width="240" height="10" rx="5" fill="#ffd24f"/></g>`,
 anim(tl,t0,d){tl.to('#ap_stack',{x:-80,duration:.8,ease:'power2.out'},WT(217)-.1);for(let i=0;i<8;i++)tl.fromTo('#ap_c'+i,{y:0,opacity:0},{y:120+i*4,x:200+i*20,opacity:1,duration:.6,ease:'bounce.out'},WT(217)+i*.07);
   tl.to('#ap_pig',{rotation:-14,svgOrigin:'0 0',duration:.4,ease:'power2.out'},WT(217));
   tl.to('#ap_mn',{opacity:1,duration:1,ease:'power2.inOut'},WT(219));tl.fromTo('#ap_txt',{opacity:0,y:-20},{opacity:1,y:0,duration:.4,ease:'back.out(2)'},WT(220)+.3);tl.to('#black',{opacity:1,duration:.5},t0+d-.5);}
});

window.SCENES=S;
window.EPISODE_KEYWORDS=[];
})();
