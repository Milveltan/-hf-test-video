/* DATOLOGO · episodio yamaguchi-dos-bombas · scenes.js — "El hombre que sobrevivió a dos bombas atómicas"
   FORMATO 1:1 → marco 1080×1080. Biblia v5.3. Tsutomu Yamaguchi = personaje ilustrado propio (ficha `yamaguchi`):
   rasgos firma en TODAS las escenas: cabello negro corto con raya, camisa blanca, pantalón gris. Herido desde la escena 11 (vendaje en oreja izq.).
   Anciano = `yamaguchiAnciano` (canoso, lentes, cárdigan). Paleta: amanecer ámbar (Hiroshima) → blanco quemado → azul ceniza (Nagasaki) → sepia (memoria).
   Subtítulos libres (y>860). */
(function(){
const {lg,rg,def,PRNG}=DL; const P=DLP; const {makeChar,A}=DLC;
const {N,T,addToGroup,sky,floorG,light,beam}=DLK;
const F=window.FICHAS; const S=[];
/* Yamaguchi: o.herido → vendaje · o.obj → objeto en la mano delantera · o.f → ficha */
const yam=(id,x,y,s,o={})=>{let c=makeChar(id,o.f||F.yamaguchi);if(o.herido)c=addToGroup(c,id+'_head',P.vendaje(id));if(o.obj)c=addToGroup(c,id+'_hF',o.obj);if(o.objB)c=addToGroup(c,id+'_hB',o.objB);return N(id+'_g',x,y,s,c);};
const chr=(id,f,x,y,s,obj)=>N(id+'_g',x,y,s,obj?addToGroup(makeChar(id,f),id+'_hF',obj):makeChar(id,f));
const counter=(tl,id,a,b,t,d,fmt=v=>Math.round(v))=>{const o={v:a};tl.to(o,{v:b,duration:d,ease:'power2.out',onUpdate:()=>{const e=document.getElementById(id);if(e)e.textContent=fmt(o.v);}},t);};
const ciudad=(seed,base,lit)=>P.skyline(seed,{x0:-80,x1:1160,base,minH:90,maxH:260,minW:60,maxW:140,top:'#b89a86',bot:'#6a5a5a',side:'#4a3e44',lit:lit||'#ffe0a8',dark:'#5a4a4a',towers:false});
const papeles=(seed,n,id)=>{const R=PRNG(seed);let s='';for(let i=0;i<n;i++)s+=N(`${id}${i}`,200+R()*680,380+R()*300,.5+R()*.4,`<rect x="-60" y="-80" width="120" height="160" fill="url(#mPaper)"/><path d="M-40 -50 h80 M-40 -20 h70 M-40 10 h80" stroke="#9a8a72" stroke-width="6"/>`,R()*40-20);return `<g id="${id}">${s}</g>`;};
const ondas=(id,x,y,c='#fff')=>`<g id="${id}" transform="translate(${x} ${y})">${[0,1,2].map(i=>`<path d="M${-30-i*34} ${-50-i*26} q${-30-i*10} ${50+i*26} 0 ${100+i*52}" stroke="${c}" stroke-width="10" fill="none" stroke-linecap="round" opacity="${.9-i*.25}"/>`).join('')}</g>`;

/* 1 ─ GANCHO "Este hombre sobrevivió a dos bombas atómicas…" Yamaguchi al centro; dos hongos se levantan detrás, uno a cada lado */
S.push({k:'hook',w:0,tr:'fade',cam:{s:[1.18,1.04],y:[30,0],ease:'power2.out'},
 bg:()=>sky('h_bg',[[0,'#2a1a2a'],[.55,'#8a4a3a'],[1,'#e8a060']])+light(540,700,700,260,'gGlowA',.55)+
   P.hongo('h_c1',210,860,.95,11)+P.hongo('h_c2',880,860,.95,23)+P.colinas(31,880,120,'#3a2a2e','#1a1218'),
 mid:()=>yam('hy',540,1330,1.55),
 fg:()=>P.dust(101,30,1080,1080,'#ffd8a0')+`<rect x="-80" y="980" width="1240" height="200" fill="url(#gFadeB)"/>`,
 anim(tl,t0,d){A.breathe(tl,'hy',t0,d);A.blinks(tl,'hy',t0,d);A.look(tl,'hy',2,2,t0);A.brows(tl,'hy',-4,t0+.4);
   tl.fromTo('#h_c1',{scale:.2,opacity:0,svgOrigin:'0 0'},{scale:1,opacity:1,duration:1.6,ease:'power2.out'},WT(4)-.2);
   tl.fromTo('#h_c2',{scale:.2,opacity:0,svgOrigin:'0 0'},{scale:1,opacity:1,duration:1.6,ease:'power2.out'},WT(5));
   tl.to('#h_c1_cap',{x:-20,duration:d,ease:'none'},t0);tl.to('#h_c2_cap',{x:20,duration:d,ease:'none'},t0);
   tl.to('#d101',{y:-80,duration:d,ease:'none'},t0);A.head(tl,'hy',-4,WT(6));}
});

/* 2 ─ "…en solo tres días." Hojas de calendario: 6 → 9 de agosto, contador de días */
S.push({k:'dias',w:7,tr:'whip',cam:{x:[-30,30],s:[1.04,1.12]},
 bg:()=>sky('d_bg',[[0,'#1a1220'],[1,'#3a2228']])+`<g filter="url(#fWall)"><rect x="-80" y="-80" width="1240" height="1240" fill="#3a2a2a" opacity=".6"/></g>`+light(540,460,520,420,'gGlowW',.35),
 mid:()=>N('d_c9',540,470,1.25,P.calendarPage('d_p9','9','AGOSTO','#2a5a8a'))+N('d_c8',540,470,1.25,P.calendarPage('d_p8','8','AGOSTO','#8a4a3a'))+N('d_c7',540,470,1.25,P.calendarPage('d_p7','7','AGOSTO','#8a4a3a'))+N('d_c6',540,470,1.25,P.calendarPage('d_p6','6','AGOSTO','#c0392b'))+
   `<g id="d_cnt" opacity="0">${T(540,830,'3 DÍAS',{s:96,c:'#ffd24f',f:'fGlow'})}${T(540,830,'3 DÍAS',{s:96,c:'#fff8d8'})}</g>`,
 fg:()=>P.dust(102,18,1080,1080,'#ffe8c0'),
 anim(tl,t0,d){const st=(d-.3)/3;['d_c6','d_c7','d_c8'].forEach((c,i)=>tl.to('#'+c,{y:-900,rotation:-25+i*15,opacity:0,duration:.35,ease:'power2.in'},t0+.2+i*st));
   tl.fromTo('#d_cnt',{opacity:0,scale:1.6,svgOrigin:'540 800'},{opacity:1,scale:1,duration:.35,ease:'back.out(2.5)'},WT(9));}
});

/* 3 ─ "Se llamaba Tsutomu Yamaguchi." Retrato medio en la ventana del hotel, luz de mañana. TÍTULO 1 */
S.push({k:'nombre',w:11,tr:'flash',title:'TSUTOMU YAMAGUCHI',titleAt:13,cam:{s:[1.0,1.1],x:[20,-20]},
 bg:()=>sky('n_bg',[[0,'#f2c48a'],[1,'#c87a4a']])+P.ventana('n_win',800,420,420,520,'#ffe2b0')+`<rect x="-80" y="-80" width="520" height="1240" fill="#5a3a2a" filter="url(#fWall)"/>`+beam(800,160,420,900,18,'#fff1c8',.35),
 mid:()=>yam('ny',420,1420,1.85),
 fg:()=>`<rect x="-80" y="900" width="1240" height="300" fill="url(#gFadeB)"/>`+P.dust(103,22,1080,1080,'#fff1c8'),
 anim(tl,t0,d){A.breathe(tl,'ny',t0,d);A.blinks(tl,'ny',t0,d,1.9);A.look(tl,'ny',6,0,t0+.3);A.head(tl,'ny',4,t0+.2);A.mouth(tl,'ny','N',t0);tl.to('#d103',{y:-60,x:30,duration:d,ease:'none'},t0);}
});

/* 4 ─ "Tenía 29 años y era ingeniero de Mitsubishi." Mesa de dibujo, lápiz en mano, contador 29 */
S.push({k:'ing',w:15,tr:'wipe',cam:{s:[1.12,1.02],y:[-20,10]},
 bg:()=>sky('g_bg',[[0,'#3a2c2a'],[1,'#1e1616']])+`<g filter="url(#fWall)"><rect x="-80" y="-80" width="1240" height="800" fill="#4a3a32"/></g>`+
   `<g transform="translate(150 140)">${[0,1,2].map(i=>`<rect x="${i*120}" y="0" width="100" height="140" fill="url(#mPaper)" transform="rotate(${i*4-4})"/>`).join('')}</g>`+light(820,120,240,200,'gGlowA',.6)+`<path d="M820 -80 V90" stroke="#2a2a2a" stroke-width="6"/><path d="M770 90 h100 l-20 40 h-60 z" fill="#3a4a3a"/>`,
 mid:()=>`<path d="M520 700 L1120 560 L1160 640 L560 790 Z" fill="#e8dcc0"/><path d="M520 700 L1120 560" stroke="#8a6a4a" stroke-width="10"/>`+N('g_pl',840,650,.75,P.plano('g_bp',520,300),-13)+
   yam('gy',360,1340,1.6,{obj:`<g transform="translate(6 40) rotate(-70)"><rect x="-6" y="-70" width="12" height="110" fill="#f2c14e"/><path d="M-6 40 L0 58 L6 40Z" fill="#3a2418"/></g>`})+
   `<g id="g_age" opacity="0"><rect x="700" y="160" width="300" height="190" rx="24" fill="#120c10" opacity=".75"/>${T(850,300,'<tspan id="g_n">0</tspan>',{s:140,c:'#ffd24f'})}${T(850,340,'AÑOS',{s:30,c:'#fff',ls:8})}</g>`+
   `<g id="g_tag" opacity="0">${T(850,440,'INGENIERO · MITSUBISHI',{s:34,c:'#fff8e8',ls:2})}</g>`,
 fg:()=>light(820,640,300,90,'gGlowA',.4,'g_lamp'),
 anim(tl,t0,d){A.setArm('gy','F',-70,-50,0);A.breathe(tl,'gy',t0,d);A.blinks(tl,'gy',t0,d);A.look(tl,'gy',9,6,t0);A.head(tl,'gy',8,t0);
   tl.fromTo('#g_age',{opacity:0,y:30},{opacity:1,y:0,duration:.3},WT(16)-.15);counter(tl,'g_n',0,29,WT(16)-.1,.8);
   tl.to('#gy_faF',{rotation:-35,svgOrigin:'0 0',duration:.3,yoyo:true,repeat:Math.max(1,Math.floor(d/.6)),ease:'sine.inOut'},t0+.3);
   tl.fromTo('#g_tag',{opacity:0,x:40},{opacity:1,x:0,duration:.35,ease:'power3.out'},WT(20));A.head(tl,'gy',-4,WT(20));A.look(tl,'gy',4,-4,WT(20));}
});

/* 5 ─ "Llevaba tres meses en Hiroshima, diseñando un barco petrolero." Astillero; el plano se dibuja y el casco crece en el muelle */
S.push({k:'barco',w:23,tr:'zoom',cam:{x:[40,-40],s:[1.05,1.12]},
 bg:()=>sky('b_bg',[[0,'#7ab0d8'],[.6,'#f2d2a8'],[1,'#e8b080']])+P.mountains(51,560,180,'#8a8aa8','#5a5a7a',5)+ciudad(52,600)+`<rect x="-80" y="600" width="1240" height="600" fill="#4a6a8a"/>`+
   `<g id="b_ship"><path d="M80 640 L940 640 Q980 640 960 700 L130 700 Q70 700 80 640 Z" fill="#2a2e3a"/><path d="M80 640 L940 640" stroke="#c0392b" stroke-width="14"/><rect x="760" y="560" width="140" height="80" fill="#e8e4da"/><rect x="800" y="520" width="40" height="40" fill="#c0392b"/></g>`+
   `<path d="M1000 120 V640 M1000 140 H700" stroke="#c0392b" stroke-width="16"/><path id="b_hook" d="M720 140 V300" stroke="#1a1a1a" stroke-width="5"/>`,
 mid:()=>yam('by',300,1340,1.55,{obj:`<g transform="translate(30 30) rotate(-80)">${P.plano('b_bp',300,190)}</g>`})+
   `<g id="b_cal" opacity="0">${T(820,300,'<tspan id="b_n">0</tspan> MESES',{s:76,c:'#fff8e8',f:'fGlow'})}${T(820,300,'<tspan id="b_n2">0</tspan> MESES',{s:76,c:'#2a1a1a'})}</g>`,
 fg:()=>P.dust(105,20,1080,1080,'#fff1c8')+`<rect x="-80" y="1000" width="1240" height="200" fill="url(#gFadeB)"/>`,
 anim(tl,t0,d){A.setArm('by','F',-60,-40,0);A.breathe(tl,'by',t0,d);A.blinks(tl,'by',t0,d);A.look(tl,'by',10,-2,t0);
   tl.fromTo('#b_ship',{opacity:.25},{opacity:1,duration:d,ease:'power1.in'},t0);tl.fromTo('#b_hook',{y:0},{y:40,duration:1.2,yoyo:true,repeat:1,ease:'sine.inOut'},t0);
   tl.fromTo('#b_cal',{opacity:0},{opacity:1,duration:.3},WT(24)-.1);counter(tl,'b_n',0,3,WT(24)-.1,.6);counter(tl,'b_n2',0,3,WT(24)-.1,.6);
   tl.to('#b_bp_l',{strokeDashoffset:0,duration:1.6,ease:'power1.inOut'},WT(28));A.head(tl,'by',10,WT(28));A.look(tl,'by',6,10,WT(28));}
});

/* 6 ─ "El 6 de agosto de 1945 era su último día en la ciudad." Habitación: cierra la maleta, calendario rojo. TÍTULO 2 */
S.push({k:'ultimo',w:32,tr:'whip',title:'HIROSHIMA · 1945',titleAt:33,cam:{s:[1.1,1.02],x:[-20,20]},
 bg:()=>sky('u_bg',[[0,'#e8b07a'],[1,'#a86a4a']])+`<g filter="url(#fWall)"><rect x="-80" y="-80" width="1240" height="780" fill="#b88a64"/></g>`+P.ventana('u_win',260,330,300,300,'#ffe8c0')+beam(260,180,300,900,-15,'#fff1c8',.3)+
   N('u_cal',840,360,.7,P.calendarPage('u_cp','6','AGOSTO 1945','#c0392b'))+`<rect x="-80" y="700" width="1240" height="500" fill="#7a5638" filter="url(#fWood)"/>`,
 mid:()=>yam('uy',520,1340,1.55)+P.maleta('u_mal',820,840,1.05),
 fg:()=>P.dust(106,20,1080,1080,'#fff1c8'),
 anim(tl,t0,d){A.breathe(tl,'uy',t0,d);A.blinks(tl,'uy',t0,d);A.look(tl,'uy',10,8,t0);A.head(tl,'uy',10,t0);
   A.arm(tl,'uy','F',-80,-30,0,t0+.2);A.arm(tl,'uy','F',-50,-10,0,WT(38));tl.fromTo('#u_mal',{y:-20},{y:0,duration:.25,ease:'bounce.out'},WT(38)+.1);
   tl.fromTo('#u_cal',{scale:1.25,svgOrigin:'0 0'},{scale:1,duration:.4,ease:'back.out(2)'},WT(33)-.1);
   A.head(tl,'uy',-2,WT(40));A.look(tl,'uy',4,-6,WT(40));A.mouth(tl,'uy','N',WT(40));}
});

/* 7 ─ "Su esposa y su bebé lo esperaban en Nagasaki." Hisako con el bebé frente a su casa de madera, colinas y bahía */
S.push({k:'familia',w:45,tr:'fade',cam:{s:[1.02,1.1],y:[10,-10]},
 bg:()=>sky('f_bg',[[0,'#8ec0e0'],[.7,'#f2dcb8'],[1,'#f2c08a']])+P.colinas(71,560,240,'#5a8a6a','#2e5a44')+`<rect x="-80" y="520" width="1240" height="60" fill="#4a7aa8" opacity=".8"/>`+P.colinas(72,700,180,'#4a7a52','#264a34')+
   P.casaJaponesa(780,780,520,300,'#ffe2a8'),
 mid:()=>`<rect x="-80" y="780" width="1240" height="420" fill="#8a7a5a"/>`+chr('fh',F.hisako,420,1330,1.55,`<g transform="translate(40 -30) rotate(60)">${P.bebe('f_bb',0,0,.75)}</g>`)+
   `<g id="f_tag" opacity="0">${T(800,250,'NAGASAKI',{s:64,c:'#fff',ls:6})}</g>`,
 fg:()=>P.dust(107,16,1080,1080,'#fff8e0'),
 anim(tl,t0,d){A.setArm('fh','F',-70,-80,0);A.setArm('fh','B',-30,-40,0);A.breathe(tl,'fh',t0,d);A.blinks(tl,'fh',t0,d);A.look(tl,'fh',8,8,t0);A.head(tl,'fh',8,t0);
   tl.to('#f_bb',{rotation:4,svgOrigin:'0 0',duration:.6,yoyo:true,repeat:Math.max(1,Math.floor(d/.6)),ease:'sine.inOut'},t0);
   A.look(tl,'fh',10,-2,WT(51));A.head(tl,'fh',-2,WT(51));tl.fromTo('#f_tag',{opacity:0,y:20},{opacity:1,y:0,duration:.4},WT(53)-.1);}
});

/* 8 ─ "A las 8:15 de la mañana," reloj grande que avanza a 8:15 · tictac */
S.push({k:'reloj',w:54,tr:'zoom',cam:{s:[1.0,1.18],ease:'power1.in'},
 bg:()=>sky('r_bg',[[0,'#f6d8a8'],[1,'#d8945a']])+`<g filter="url(#fWall)"><rect x="-80" y="-80" width="1240" height="1240" fill="#c89a70" opacity=".5"/></g>`+light(540,460,540,460,'gGlowW',.5),
 mid:()=>P.reloj('r_rel',540,450,300)+`<g id="r_t" opacity="0">${T(540,880,'8:15 A. M.',{s:80,c:'#2a1a1a'})}</g>`,
 fg:()=>beam(900,-80,500,1200,25,'#fff8e0',.25),
 anim(tl,t0,d){tl.set('#r_rel_h',{rotation:240,svgOrigin:'0 0'},t0);tl.set('#r_rel_m',{rotation:300,svgOrigin:'0 0'},t0);
   tl.to('#r_rel_m',{rotation:450,svgOrigin:'0 0',duration:Math.max(.6,WT(56)-t0+.6),ease:'power2.inOut'},t0);tl.to('#r_rel_h',{rotation:247.5,svgOrigin:'0 0',duration:1,ease:'power2.inOut'},t0);
   tl.fromTo('#r_t',{opacity:0},{opacity:1,duration:.3},WT(56));}
});

/* 9 ─ "el cielo se volvió blanco." Yamaguchi en la calle voltea; el destello lo cubre todo */
S.push({k:'blanco',w:60,tr:'cut',cam:{s:[1.04,1.14]},
 bg:()=>sky('w_bg',[[0,'#8ec0e8'],[1,'#f2d8b0']])+ciudad(91,760)+`<rect x="-80" y="760" width="1240" height="440" fill="#9a8a7a"/>`+P.destello('w_fl',820,240,160),
 mid:()=>yam('wy',430,1360,1.6),
 fg:()=>`<rect id="w_white" x="-80" y="-80" width="1240" height="1240" fill="#fffdf4" opacity="0"/>`,
 anim(tl,t0,d){A.breathe(tl,'wy',t0,d);A.blink(tl,'wy',t0+.2);
   tl.fromTo('#w_fl',{scale:.05,svgOrigin:'0 0'},{scale:4,duration:.7,ease:'power3.in'},WT(61));
   A.head(tl,'wy',14,WT(61),.25);A.look(tl,'wy',12,-10,WT(61),.15);A.brows(tl,'wy',-12,WT(61),.15);A.mouth(tl,'wy','O',WT(61));
   A.arm(tl,'wy','F',-150,-60,0,WT(62),.3);tl.to('#wy_torso',{rotation:-8,svgOrigin:'0 0',duration:.3},WT(62));
   tl.to('#w_white',{opacity:.92,duration:.5,ease:'power2.in'},WT(63));SHAKE(0,WT(63),.5,14);}
});

/* 10 ─ "Estaba a menos de tres kilómetros de la explosión." Plano general: hongo sobre la ciudad, regla de distancia hasta él */
S.push({k:'dist',w:65,tr:'flash',cam:{s:[1.12,1.0],ease:'power2.out'},
 bg:()=>sky('k_bg',[[0,'#5a4a5a'],[.6,'#c8906a'],[1,'#e8b088']])+P.hongo('k_cl',760,760,1.05,41)+ciudad(92,780,'#ffb070')+`<rect x="-80" y="780" width="1240" height="420" fill="#4a3a3a"/>`,
 mid:()=>yam('ky',200,1180,.85)+`<g id="k_rule"><path d="M260 820 H760" stroke="#ffd24f" stroke-width="8" stroke-dasharray="24 14"/><path d="M260 800 v40 M760 800 v40" stroke="#ffd24f" stroke-width="8"/></g>`+
   `<g id="k_lbl" opacity="0"><rect x="380" y="700" width="260" height="90" rx="18" fill="#120c10" opacity=".8"/>${T(510,770,'&lt; 3 KM',{s:62,c:'#ffd24f'})}</g>`,
 fg:()=>P.dust(110,40,1080,1080,'#b0a0a0'),
 anim(tl,t0,d){A.breathe(tl,'ky',t0,d);A.mouth(tl,'ky','O',t0);A.brows(tl,'ky',-10,t0);A.look(tl,'ky',12,-8,t0);
   tl.fromTo('#k_cl',{scale:.6,svgOrigin:'0 0'},{scale:1,duration:d,ease:'power1.out'},t0);tl.to('#k_cl_cap',{y:-40,duration:d,ease:'none'},t0);
   tl.fromTo('#k_rule',{scaleX:0,svgOrigin:'260 820'},{scaleX:1,duration:.8,ease:'power2.out'},WT(67));tl.fromTo('#k_lbl',{opacity:0,y:20},{opacity:1,y:0,duration:.35,ease:'back.out(2)'},WT(69)-.1);
   tl.to('#d110',{x:200,duration:d,ease:'none'},t0);}
});

/* 11 ─ "Quedó herido y perdió la audición del oído izquierdo." Primer plano; vendaje; las ondas del sonido se apagan */
S.push({k:'oido',w:74,tr:'glitch',cam:{s:[1.0,1.12],x:[-20,20]},
 bg:()=>sky('o_bg',[[0,'#2a1a20'],[1,'#5a2a24']])+light(760,380,420,420,'gGlowR',.35)+`<g opacity=".35">${ciudad(93,900,'#ff7a3a')}</g>`,
 mid:()=>yam('oy',620,1520,2.05,{herido:true})+ondas('o_w',300,420,'#fff1d8')+
   `<g id="o_x" opacity="0"><circle cx="250" cy="430" r="70" fill="none" stroke="#ff4a3a" stroke-width="12"/><path d="M200 480 L300 380" stroke="#ff4a3a" stroke-width="12"/></g>`,
 fg:()=>P.dust(111,26,1080,1080,'#ff9a6a'),
 anim(tl,t0,d){A.breathe(tl,'oy',t0,d);A.blinks(tl,'oy',t0,d,1.6);A.brows(tl,'oy',6,t0);A.mouth(tl,'oy','S',t0);A.look(tl,'oy',-4,6,t0);
   tl.to('#oy_vend',{opacity:1},t0);tl.fromTo('#o_w',{opacity:1},{opacity:0,x:40,duration:1.2,ease:'power2.in'},WT(77));
   tl.fromTo('#o_x',{opacity:0,scale:1.6,svgOrigin:'250 430'},{opacity:1,scale:1,duration:.3,ease:'back.out(2)'},WT(81));A.head(tl,'oy',-8,WT(81));tl.to('#d111',{y:-100,duration:d,ease:'none'},t0);}
});

/* 12 ─ "Aun así, regresó a casa." Camina herido por las vías, de Hiroshima a Nagasaki, atardecer */
S.push({k:'regreso',w:83,tr:'wipe',cam:{x:[60,-60],s:[1.06,1.06]},
 bg:()=>sky('e_bg',[[0,'#3a2a4a'],[.6,'#c86a4a'],[1,'#f2a060']])+light(860,560,300,200,'gGlowA',.8)+P.mountains(121,700,220,'#5a3a4a','#2a1a2a',6)+`<rect x="-80" y="700" width="1240" height="500" fill="#3a2a2a"/>`+
   `<path d="M-80 900 L1160 820" stroke="#6a5a5a" stroke-width="18"/><path d="M-80 960 L1160 870" stroke="#6a5a5a" stroke-width="18"/>${Array.from({length:16},(_,i)=>`<path d="M${-60+i*80} ${905-i*5.4} l10 60" stroke="#4a3022" stroke-width="16"/>`).join('')}`,
 mid:()=>yam('ey',420,1300,1.45,{herido:true,obj:`<g transform="translate(0 70)">${P.maleta('e_mal',0,60,.45)}</g>`}),
 fg:()=>P.dust(112,24,1080,1080,'#ffcf9a'),
 anim(tl,t0,d){A.setArm('ey','F',-6,-4,0);A.walk(tl,'ey',t0,d,.48);A.blinks(tl,'ey',t0,d);A.look(tl,'ey',8,2,t0);A.brows(tl,'ey',4,t0);
   tl.fromTo('#ey_g',{x:-120},{x:120,duration:d,ease:'none'},t0);tl.to('#d112',{x:-120,duration:d,ease:'none'},t0);}
});

/* 13 ─ "Tres días después, el 9 de agosto, fue a trabajar." Oficina de Nagasaki en las colinas; calendario 9. TÍTULO 3 */
S.push({k:'nueve',w:88,tr:'whip',title:'NAGASAKI · 9 DE AGOSTO',titleAt:91,cam:{s:[1.12,1.02],y:[-30,0]},
 bg:()=>sky('nv_bg',[[0,'#9ac8e8'],[1,'#e8dcc0']])+P.colinas(131,560,260,'#6a9a6a','#3a6a4a')+P.colinas(132,700,200,'#5a8a5a','#2a5a3a')+
   `<g transform="translate(560 760)"><rect x="-260" y="-300" width="520" height="300" fill="#d8ccb4" filter="url(#fWall)"/>${Array.from({length:8},(_,i)=>`<rect x="${-230+(i%4)*120}" y="${-270+Math.floor(i/4)*140}" width="90" height="100" fill="url(#mWin)"/>`).join('')}<rect x="-300" y="-320" width="600" height="30" fill="#8a7a64"/></g>`+`<rect x="-80" y="760" width="1240" height="440" fill="#a89a80"/>`,
 mid:()=>yam('nvy',300,1340,1.5,{herido:true})+N('nv_cal',850,330,.8,P.calendarPage('nv_cp','9','AGOSTO','#2a5a8a')),
 fg:()=>P.dust(113,16,1080,1080,'#fff8e0'),
 anim(tl,t0,d){A.walk(tl,'nvy',t0,Math.min(d,2.4),.48);A.blinks(tl,'nvy',t0,d);A.look(tl,'nvy',10,-4,t0);tl.fromTo('#nvy_g',{x:-140},{x:40,duration:Math.min(d,2.4),ease:'power1.out'},t0);
   tl.fromTo('#nv_cal',{rotation:-30,y:-200,opacity:0,svgOrigin:'0 0'},{rotation:0,y:0,opacity:1,duration:.45,ease:'back.out(2)'},WT(92)-.1);}
});

/* 14 ─ "Le estaba contando a su jefe lo que vio en Hiroshima…" Oficina; gesticula; globo con el hongo; el jefe incrédulo */
S.push({k:'jefe',w:98,tr:'cut',cam:{x:[30,-30],s:[1.04,1.1]},
 bg:()=>sky('j_bg',[[0,'#d8ccb0'],[1,'#a8987a']])+`<g filter="url(#fWall)"><rect x="-80" y="-80" width="1240" height="800" fill="#c8b898"/></g>`+P.ventana('j_win',540,300,320,280,'#a8d4f2')+
   `<rect x="-80" y="700" width="1240" height="500" fill="#6a5440"/>`,
 mid:()=>chr('jj',F.jefeNagasaki,800,1330,1.5)+P.escritorio(560,820,560)+yam('jy',280,1340,1.55,{herido:true})+
   `<g id="j_bub" opacity="0"><ellipse cx="420" cy="230" rx="170" ry="130" fill="#fff"/><path d="M360 340 L330 420 L410 350Z" fill="#fff"/>${P.hongo('j_h',420,320,.25,61)}</g>`+papeles(141,0,'j_p'),
 fg:()=>beam(540,100,320,900,0,'#fff8e0',.2),
 anim(tl,t0,d){A.breathe(tl,'jy',t0,d);A.breathe(tl,'jj',t0,d);A.blinks(tl,'jy',t0,d);A.blinks(tl,'jj',t0+.4,d);A.setArm('jj','F',-30,-60,0);
   A.look(tl,'jy',10,0,t0);A.look(tl,'jj',-10,0,t0);tl.set('#jj_iris',{x:-10},t0);
   for(let t=t0+.1,k=0;t<t0+d-.3;t+=.32,k++)A.mouth(tl,'jy',k%2?'N':'O',t);
   A.arm(tl,'jy','F',-120,-40,0,t0+.15);A.arm(tl,'jy','F',-90,-70,0,t0+1.1);A.arm(tl,'jy','F',-130,-30,0,t0+2);
   tl.fromTo('#j_bub',{opacity:0,scale:.3,svgOrigin:'380 360'},{opacity:1,scale:1,duration:.35,ease:'back.out(2.2)'},WT(105)-.1);A.brows(tl,'jj',6,WT(104));A.head(tl,'jj',-6,WT(104));}
});

/* 15 ─ "…cuando el cuarto se volvió blanco otra vez." La ventana estalla en blanco, papeles vuelan, ambos se cubren */
S.push({k:'otra',w:109,tr:'flash',cam:{s:[1.1,1.0],ease:'power3.out'},
 bg:()=>sky('x_bg',[[0,'#d8ccb0'],[1,'#a8987a']])+`<g filter="url(#fWall)"><rect x="-80" y="-80" width="1240" height="800" fill="#c8b898"/></g>`+P.ventana('x_win',540,300,320,280,'#a8d4f2')+light(540,300,600,500,'gGlowW',0,'x_glow')+`<rect x="-80" y="700" width="1240" height="500" fill="#6a5440"/>`,
 mid:()=>chr('xj',F.jefeNagasaki,820,1300,1.4)+yam('xy',270,1330,1.5,{herido:true})+papeles(151,8,'x_p'),
 fg:()=>`<rect id="x_white" x="-80" y="-80" width="1240" height="1240" fill="#ffffff" opacity="0"/>`,
 anim(tl,t0,d){const tb=WT(114)-.05;A.look(tl,'xy',10,0,t0);A.look(tl,'xj',-10,0,t0);tl.set('#xj_iris',{x:-10},t0);A.mouth(tl,'xy','O',t0);
   tl.to('#x_win_sky',{fill:'#ffffff',duration:.15},tb);tl.to('#x_glow',{opacity:1,duration:.2},tb);tl.to('#x_white',{opacity:.85,duration:.18,yoyo:true,repeat:1,ease:'power2.out'},tb);SHAKE(0,tb,.7,18);
   ['xy','xj'].forEach(c=>{A.brows(tl,c,-12,tb,.1);A.mouth(tl,c,'O',tb);A.arm(tl,c,'F',-160,-80,0,tb+.05,.25);A.arm(tl,c,'B',-140,-70,0,tb+.08,.25);A.lean(tl,c,-10,tb,.25);});
   for(let i=0;i<8;i++)tl.to(`#x_p${i}`,{x:(i%2?1:-1)*(200+i*30),y:-300+i*40,rotation:'+=220',duration:1.2,ease:'power2.out'},tb+.05);}
});

/* 16 ─ "Pensó que la nube lo había seguido." Contraluz azul; la nube asoma por la ventana; él, inmóvil */
S.push({k:'nube',w:117,tr:'fade',cam:{s:[1.16,1.04],y:[20,0],ease:'sine.inOut'},
 bg:()=>sky('q_bg',[[0,'#1a2440'],[1,'#3a3a5a']])+P.ventana('q_win',700,380,480,460,'#c8b0a0')+`<g clip-path="url(#q_clip)">${P.hongo('q_h',700,700,.62,77)}</g><clipPath id="q_clip"><rect x="460" y="150" width="480" height="460"/></clipPath>`+light(700,380,480,420,'gGlowA',.4),
 mid:()=>yam('qy',340,1470,1.95,{herido:true}),
 fg:()=>P.dust(116,30,1080,1080,'#c0c0d8')+`<rect x="-80" y="960" width="1240" height="240" fill="url(#gFadeB)"/>`,
 anim(tl,t0,d){A.breathe(tl,'qy',t0,d);A.look(tl,'qy',12,-12,t0);A.head(tl,'qy',-10,t0,1);A.brows(tl,'qy',-8,t0);A.mouth(tl,'qy','S',t0);A.blink(tl,'qy',t0+1.6);
   tl.fromTo('#q_h',{y:200},{y:0,duration:d,ease:'power1.out'},t0);tl.to('#d116',{y:-70,duration:d,ease:'none'},t0);}
});

/* 17 ─ "Las colinas de Nagasaki y una escalera reforzada frenaron la explosión." Corte: las ondas chocan con las colinas y la escalera */
S.push({k:'colinas',w:124,tr:'whip',cam:{x:[-30,30],s:[1.04,1.1]},
 bg:()=>sky('c_bg',[[0,'#3a3050'],[1,'#a87a6a']])+P.destello('c_fl',120,420,90)+
   `<g id="c_waves">${[0,1,2,3].map(i=>`<path d="M${180+i*70} ${180+i*10} Q${300+i*80} 420 ${180+i*70} ${660-i*10}" stroke="#ffd8a0" stroke-width="${14-i*2}" fill="none" opacity="${.9-i*.18}"/>`).join('')}</g>`,
 mid:()=>P.colinas(171,760,380,'#5a7a5a','#2a3a2a')+`<g id="c_lbl1" opacity="0">${T(420,560,'COLINAS',{s:50,c:'#fff',ls:4})}</g>`+P.escalera('c_esc',650,1000,.9)+
   yam('cy',800,990,.55,{herido:true})+`<g id="c_lbl2" opacity="0"><rect x="560" y="490" width="440" height="70" rx="16" fill="#120c10" opacity=".75"/>${T(780,540,'ESCALERA REFORZADA',{s:34,c:'#ffd24f'})}</g>`,
 fg:()=>P.dust(117,30,1080,1080,'#ffd8a0'),
 anim(tl,t0,d){A.breathe(tl,'cy',t0,d);A.brows(tl,'cy',-8,t0);A.mouth(tl,'cy','O',t0);A.lean(tl,'cy',-12,t0);A.arm(tl,'cy','F',-150,-60,0,t0+.1);
   tl.fromTo('#c_fl',{scale:.3,svgOrigin:'0 0'},{scale:1.2,duration:.6,ease:'power2.out'},t0);
   tl.fromTo('#c_waves',{x:-120,opacity:0},{x:160,opacity:1,duration:1.4,ease:'power2.out'},t0+.2);tl.to('#c_waves',{opacity:.2,duration:.6},WT(132));
   tl.fromTo('#c_lbl1',{opacity:0,y:20},{opacity:1,y:0,duration:.3},WT(125));tl.fromTo('#c_lbl2',{opacity:0,y:20},{opacity:1,y:0,duration:.3},WT(130));
   tl.fromTo('#c_esc',{opacity:.6},{opacity:1,duration:.3},WT(130));SHAKE(0,WT(132),.4,8);}
});

/* 18 ─ "Sobrevivió otra vez. Su esposa y su hijo, también." Reencuentro frente a la casa, luz cálida */
S.push({k:'reencuentro',w:135,tr:'flash',cam:{s:[1.12,1.02],ease:'power2.out'},
 bg:()=>sky('a_bg',[[0,'#5a6a8a'],[.6,'#d8a07a'],[1,'#f2c08a']])+P.colinas(181,600,240,'#4a6a52','#24402e')+P.casaJaponesa(540,760,560,300,'#ffd88a')+`<rect x="-80" y="760" width="1240" height="440" fill="#7a6a4e"/>`+light(540,620,600,300,'gGlowA',.55),
 mid:()=>chr('ah',F.hisako,700,1330,1.45,`<g transform="translate(40 -30) rotate(60)">${P.bebe('a_bb',0,0,.7)}</g>`)+yam('ay',360,1340,1.5,{herido:true}),
 fg:()=>P.dust(118,26,1080,1080,'#ffe8b0'),
 anim(tl,t0,d){A.setArm('ah','F',-70,-80,0);A.setArm('ah','B',-30,-40,0);[ 'ay','ah'].forEach(c=>{A.breathe(tl,c,t0,d);A.blinks(tl,c,t0,d);});
   tl.set('#ah_iris',{x:-10},t0);A.look(tl,'ay',10,4,t0);A.head(tl,'ah',-6,t0);A.mouth(tl,'ay','O',WT(135));
   A.arm(tl,'ay','F',-70,-50,0,WT(138));A.arm(tl,'ay','B',-50,-40,0,WT(138));tl.to('#ay_g',{x:60,duration:.8,ease:'power2.out'},WT(138));
   A.mouth(tl,'ay','N',WT(141));A.head(tl,'ay',6,WT(141));tl.to('#d118',{y:-80,duration:d,ease:'none'},t0);}
});

/* 19 ─ "Durante décadas casi no habló de eso. Escribía poemas." Anciano en su escritorio de noche, pincel y papel; los años pasan */
S.push({k:'poemas',w:144,tr:'fade',cam:{s:[1.02,1.12],x:[20,-20]},
 bg:()=>sky('p_bg',[[0,'#1a1420'],[1,'#3a2a24']])+`<g filter="url(#fWall)"><rect x="-80" y="-80" width="1240" height="760" fill="#3a2c26"/></g>`+P.ventana('p_win',820,300,300,280,'#1a2a4a')+P.stars(191,30,1080,500)+
   `<g id="p_years"><rect x="120" y="140" width="300" height="130" rx="20" fill="#120c10" opacity=".7"/>${T(270,240,'<tspan id="p_n">1945</tspan>',{s:86,c:'#ffd24f'})}</g>`,
 mid:()=>yam('py',360,1360,1.55,{f:F.yamaguchiAnciano,obj:`<g transform="translate(6 40) rotate(-60)"><rect x="-5" y="-80" width="10" height="110" fill="#3a2410"/><path d="M-8 30 L0 62 L8 30Z" fill="#111"/></g>`})+P.escritorio(470,820,620)+
   `<g transform="translate(720 790) rotate(-6)"><rect x="-150" y="-30" width="300" height="60" fill="#f6efdc"/><g id="p_ink" stroke="#1a1410" stroke-width="5" fill="none" stroke-dasharray="400" stroke-dashoffset="400"><path d="M-120 -10 q20 -10 30 6 q10 14 30 -4 M-40 -14 v24 M-20 -8 q20 10 40 -6 M40 -12 q10 18 30 0 M90 -12 v20"/></g></g>`+P.vela('p_v',980,810,.8),
 fg:()=>light(940,640,300,200,'gGlowA',.45,'p_glow'),
 anim(tl,t0,d){A.setArm('py','F',-60,-55,0);A.breathe(tl,'py',t0,d);A.blinks(tl,'py',t0,d,2.6);A.look(tl,'py',10,10,t0);A.head(tl,'py',10,t0);
   counter(tl,'p_n',1945,2000,t0+.2,Math.max(1,WT(150)-t0));tl.to('#p_ink',{strokeDashoffset:0,duration:Math.max(1,d-WT(151)+t0),ease:'none'},WT(151));
   tl.to('#py_faF',{rotation:-45,svgOrigin:'0 0',duration:.35,yoyo:true,repeat:Math.max(1,Math.floor(d/.7)),ease:'sine.inOut'},WT(151));
   tl.to('#p_v_f',{scaleY:1.15,svgOrigin:'0 -140',duration:.3,yoyo:true,repeat:Math.max(1,Math.floor(d/.3)),ease:'sine.inOut'},t0);tl.to('#p_glow',{opacity:.6,duration:.4,yoyo:true,repeat:Math.max(1,Math.floor(d/.4))},t0);}
});

/* 20 ─ "En sus últimos años, se volvió una voz contra las armas nucleares." Atril, público, cartel con la bomba tachada */
S.push({k:'voz',w:153,tr:'whip',cam:{s:[1.0,1.1],y:[-20,10]},
 bg:()=>sky('v_bg',[[0,'#1a1a2e'],[1,'#3a2a3a']])+beam(540,-80,600,1100,0,'#fff1c8',.35,'v_spot')+
   `<g transform="translate(820 280)"><rect x="-170" y="-150" width="340" height="300" rx="20" fill="#f4f0e6"/><g transform="translate(0 0) scale(.16)">${P.hongo('v_h',0,640,1,88)}</g><circle r="110" fill="none" stroke="#c0392b" stroke-width="22"/><path d="M-78 -78 L78 78" stroke="#c0392b" stroke-width="22"/>${T(0,135,'NO MÁS',{s:30,c:'#2a1a1a'})}</g>`,
 mid:()=>yam('vy',420,1310,1.5,{f:F.yamaguchiAnciano})+P.atril(560,1000,1)+
   (()=>{const R=PRNG(201);let s='';for(let i=0;i<9;i++)s+=N('vag'+i,-40+i*140,1300+R()*40,.95,makeChar('va'+i,{silhouette:true,rim:'#ffd59a'}),0);return `<g id="v_crowd">${s}</g>`;})(),
 fg:()=>P.dust(120,20,1080,1080,'#fff1c8'),
 anim(tl,t0,d){A.breathe(tl,'vy',t0,d);A.blinks(tl,'vy',t0,d);A.look(tl,'vy',10,4,t0);for(let t=t0+.2,k=0;t<t0+d-.3;t+=.36,k++)A.mouth(tl,'vy',k%2?'N':'O',t);
   A.arm(tl,'vy','F',-110,-40,0,WT(157));A.arm(tl,'vy','F',-60,-30,0,WT(162));tl.fromTo('#v_spot',{opacity:.5},{opacity:1,duration:.6},t0);
   tl.fromTo('#v_crowd',{y:30},{y:0,duration:d,ease:'none'},t0);}
});

/* 21 ─ "En 2009, Japón lo reconoció como el único sobreviviente oficial de las dos bombas." Documento oficial y sello */
S.push({k:'oficial',w:165,tr:'zoom',cam:{s:[1.0,1.12]},
 bg:()=>sky('o2_bg',[[0,'#2a2030'],[1,'#5a3a30']])+`<rect x="-80" y="640" width="1240" height="560" fill="#5a3a24" filter="url(#fWood)"/>`+light(540,460,500,460,'gGlowW',.4),
 mid:()=>P.certificado('o2_c',600,470,.9,'DOBLE SOBREVIVIENTE','HIROSHIMA · NAGASAKI')+
   `<g id="o2_y"><rect x="30" y="110" width="290" height="130" rx="20" fill="#120c10" opacity=".8"/>${T(175,210,'<tspan id="o2_n">2000</tspan>',{s:90,c:'#ffd24f'})}</g>`+yam('o2y',150,1260,1.05,{f:F.yamaguchiAnciano}),
 fg:()=>P.dust(121,18,1080,1080,'#fff1c8'),
 anim(tl,t0,d){counter(tl,'o2_n',2000,2009,t0,.8);A.breathe(tl,'o2y',t0,d);A.blinks(tl,'o2y',t0,d);A.look(tl,'o2y',12,0,t0);
   tl.fromTo('#o2_c',{y:80,rotation:-4,svgOrigin:'0 0'},{y:0,rotation:0,duration:.6,ease:'power3.out'},t0);
   tl.fromTo('#o2_c_st',{opacity:0,scale:2.4,svgOrigin:'120 220'},{opacity:1,scale:1,duration:.25,ease:'power4.in'},WT(172)-.1);SHAKE(0,WT(172)+.15,.25,8);A.mouth(tl,'o2y','N',WT(172));}
});

/* 22 ─ "Murió en 2010, a los 93 años." Portarretratos con vela, crepúsculo */
S.push({k:'murio',w:179,tr:'fade',cam:{s:[1.12,1.02],ease:'sine.inOut'},
 bg:()=>sky('m_bg',[[0,'#141020'],[1,'#3a2a2a']])+light(540,520,520,420,'gGlowA',.45,'m_gl')+`<rect x="-80" y="760" width="1240" height="440" fill="#3a2418" filter="url(#fWood)"/>`,
 mid:()=>P.marco('m_f',520,520,1.25,`<rect x="-150" y="-190" width="300" height="380" fill="#c8a880"/>${N('mfy_g',0,560,.9,makeChar('mfy',F.yamaguchiAnciano))}`)+P.vela('m_v1',200,840,1.1)+P.vela('m_v2',860,840,.9)+
   `<g id="m_t" opacity="0">${T(540,140,'1916 — 2010',{s:56,c:'#fff1d8',ls:6})}</g>`,
 fg:()=>P.dust(122,20,1080,1080,'#ffcf8a'),
 anim(tl,t0,d){['m_v1','m_v2'].forEach((v,i)=>tl.to(`#${v}_f`,{scaleY:1.18,svgOrigin:'0 -140',duration:.28+i*.05,yoyo:true,repeat:Math.max(1,Math.floor(d/.3)),ease:'sine.inOut'},t0));
   tl.to('#m_gl',{opacity:.6,duration:.5,yoyo:true,repeat:Math.max(1,Math.floor(d/.5))},t0);tl.fromTo('#m_t',{opacity:0,y:20},{opacity:1,y:0,duration:.5},WT(181)-.1);}
});

/* 23 ─ CIERRE "Lo llamaron el hombre más afortunado del mundo… y el más desafortunado." Mitad luz dorada / mitad ceniza azul con hongo */
S.push({k:'cierre',w:186,tr:'flash',cam:{s:[1.02,1.14],ease:'power1.inOut'},
 bg:()=>sky('z_bg',[[0,'#2a1a10'],[1,'#e8a050']])+`<g id="z_cold" opacity="0"><rect x="540" y="-80" width="620" height="1240" fill="#1c2438"/>${P.hongo('z_h',820,860,.8,99)}</g>`+light(240,420,460,460,'gGlowA',.7,'z_warm')+P.dust(123,30,540,1080,'#ffe8a0'),
 mid:()=>yam('zy',540,1420,1.85),
 fg:()=>`<rect x="-80" y="960" width="1240" height="240" fill="url(#gFadeB)"/>`,
 anim(tl,t0,d){A.breathe(tl,'zy',t0,d);A.blinks(tl,'zy',t0,d,2);A.look(tl,'zy',0,0,t0);A.mouth(tl,'zy','N',t0);
   A.head(tl,'zy',-4,WT(191));A.look(tl,'zy',-6,-4,WT(191));
   tl.to('#z_cold',{opacity:1,duration:.8,ease:'power2.inOut'},WT(194));A.head(tl,'zy',6,WT(196));A.look(tl,'zy',10,0,WT(196));A.brows(tl,'zy',4,WT(196));
   tl.fromTo('#z_h',{y:120},{y:0,duration:2,ease:'power1.out'},WT(194));tl.to('#d123',{y:-60,duration:d,ease:'none'},t0);}
});

window.SCENES=S;
window.EPISODE_KEYWORDS=['yamaguchi','hiroshima','nagasaki','bombas'];
})();
