(()=>{
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
const motion=(s,dx=0,dy=0,scale=1,rot=0,fade=1)=>`<g data-motion="${dx},${dy},${scale},${rot},${fade}">${s}</g>`;
const txt=(x,y,s,size=38,fill='#e9fbff',weight=800,anchor='middle',ls=1)=>`<text x="${x}" y="${y}" fill="${fill}" font-size="${size}" font-family="Montserrat,Arial,sans-serif" font-weight="${weight}" text-anchor="${anchor}" letter-spacing="${ls}">${esc(s)}</text>`;
const line=(x1,y1,x2,y2,c,w=2,o=1)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}" opacity="${o}" stroke-linecap="round"/>`;
const circle=(x,y,r,f,o=1,e='')=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${f}" opacity="${o}" ${e}/>`;
const rect=(x,y,w,h,f,rx=0,o=1,e='')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}" opacity="${o}" ${e}/>`;
const path=(d,f,s='none',sw=1,e='')=>`<path d="${d}" fill="${f}" stroke="${s}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" ${e}/>`;
const bg=(variant='dark', extra='')=>{
 const top=variant==='red'?'#320915':variant==='teal'?'#072536':'#08111e';
 const mid=variant==='red'?'#130811':variant==='teal'?'#0a1725':'#0d1f31';
 const bot=variant==='teal'?'#05111d':'#04080f';
 return `<svg viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg"><defs>
 <linearGradient id="bgGrad" x2="0" y2="1"><stop stop-color="${top}"/><stop offset=".58" stop-color="${mid}"/><stop offset="1" stop-color="${bot}"/></linearGradient>
 <radialGradient id="haloCyan"><stop stop-color="#3ae3ff" stop-opacity=".38"/><stop offset="1" stop-color="#3ae3ff" stop-opacity="0"/></radialGradient>
 <radialGradient id="haloRed"><stop stop-color="#ff586d" stop-opacity=".32"/><stop offset="1" stop-color="#ff586d" stop-opacity="0"/></radialGradient>
 <linearGradient id="card" x2="1" y2="1"><stop stop-color="#15273a"/><stop offset="1" stop-color="#0b141f"/></linearGradient>
 <linearGradient id="cyanLine" x2="1"><stop stop-color="#6ce8ff"/><stop offset="1" stop-color="#1e94b4"/></linearGradient>
 <linearGradient id="gold"><stop stop-color="#fff0aa"/><stop offset=".5" stop-color="#d2a34e"/><stop offset="1" stop-color="#785124"/></linearGradient>
 <linearGradient id="warning"><stop stop-color="#ffb36d"/><stop offset="1" stop-color="#ff6358"/></linearGradient>
 <filter id="blur8"><feGaussianBlur stdDeviation="8"/></filter>
 <filter id="shadow"><feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#000" flood-opacity=".55"/></filter>
 </defs><rect width="1080" height="1080" fill="url(#bgGrad)"/>
 <circle cx="200" cy="160" r="240" fill="url(#haloCyan)"/>
 <circle cx="880" cy="220" r="250" fill="url(#haloRed)"/>
 <circle cx="540" cy="920" r="350" fill="#09141f" opacity=".7" filter="url(#blur8)"/>
 ${extra}</svg>`;
};
const avatar=(x,y,scale=1,fill='#9ddff6',shirt='#253f57')=>`<g transform="translate(${x} ${y}) scale(${scale})"><circle cx="0" cy="-26" r="24" fill="#deb496"/><path d="M-24 -32q5-25 25-25q24 0 25 25l-24-8z" fill="#423838"/><path d="M-40 54v-26q0-24 40-24q40 0 40 24v26z" fill="${shirt}"/><circle cx="-7" cy="-27" r="2" fill="#1d1616"/><circle cx="7" cy="-27" r="2" fill="#1d1616"/><path d="M-8 -12q8 6 16 0" fill="none" stroke="#6c443c" stroke-width="2" stroke-linecap="round"/></g>`;
const commentBubble=(x,y,w,h,txt1,txt2='',badge='BOT')=>`<g filter="url(#shadow)">${rect(x,y,w,h,'url(#card)',20,1,'stroke="#294459" stroke-width="2"')}${circle(x+48,y+46,22,'#4cb7d1')}${txt(x+95,y+41,badge,16,'#09111a',900,'start',2)}${txt(x+78,y+85,txt1,23,'#e8fbff',800,'start',0)}${txt2?txt(x+78,y+118,txt2,21,'#b2d4dc',600,'start',0):''}${path(`M ${x+40} ${y+h} l 24 0 l -10 16 z`,'url(#card)','none',0)}</g>`;
const phone=(screen)=>`<g filter="url(#shadow)">${rect(344,120,392,760,'#0a1119',52,1,'stroke="#3c5469" stroke-width="4"')}${rect(372,165,336,670,'#101c2b',34,1,'stroke="#29465b" stroke-width="2"')}${rect(490,138,100,10,'#203345',6)}${screen}</g>`;
const profileCard=(x,y,name='AI_USER',subs='1.2M')=>`<g filter="url(#shadow)">${rect(x,y,252,164,'url(#card)',20,1,'stroke="#27455a" stroke-width="2"')}${circle(x+48,y+46,26,'#77d4eb')}${circle(x+48,y+46,15,'#deb496')}${path(`M ${x+31} ${y+41} q 17 -18 34 0 l -16 5 z`,'#342a28')}${txt(x+86,y+45,name,22,'#e8fbff',800,'start',1)}${txt(x+86,y+76,'perfil automático',16,'#9fc8d4',600,'start',0)}${rect(x+28,y+104,196,18,'#173144',9)}${rect(x+28,y+104,142,18,'url(#cyanLine)',9)}${txt(x+28,y+147,subs+' interacciones',16,'#b7ced7',700,'start',0)}</g>`;
const forumWindow=(body, sub='illuminatipirate · 2021')=>`${rect(120,130,840,620,'url(#card)',28,1,'stroke="#2d4155" stroke-width="2"')}${rect(120,130,840,64,'#102030',28)}${circle(168,162,10,'#ff6666')}${circle(198,162,10,'#ffca58')}${circle(228,162,10,'#55d48c')}${txt(300,171,'FORO ANÓNIMO',26,'#a8cddd',700,'start',3)}${txt(170,244,sub,22,'#65dff3',800,'start',1)}${txt(170,304,body[0],44,'#eff8ff',900,'start',0)}${body[1]?txt(170,356,body[1],38,'#dbeefa',800,'start',0):''}${body[2]?txt(170,408,body[2],38,'#dbeefa',800,'start',0):''}`;
const docCard=(title, lines, accent='#6de3ff')=>`${rect(174,126,732,820,'#f4f0e8',24,1,'stroke="#dacdb9" stroke-width="2"')}${rect(174,126,732,94,'#e1e5e8',24)}${rect(174,126,732,94,accent,24,.12)}${txt(540,186,title,34,'#1b2b3d',900)}${lines.map((t,i)=>txt(230,286+i*84,t,32,i===1?'#1e3141':'#394b5e',700,'start',0)).join('')}${rect(230,588,520,14,'#d6e2e9',7)}${rect(230,632,570,14,'#d6e2e9',7)}${rect(230,676,490,14,'#d6e2e9',7)}${rect(230,720,610,14,'#d6e2e9',7)}${path('M 744 770 q 66 -20 92 32 q -66 20 -92 -32 z','#8ca2af')}${circle(790,805,24,'#bd543e')}`;
const chart=(value='53%', label='TRÁFICO BOT')=>`${rect(192,158,696,764,'url(#card)',34,1,'stroke="#2f475c" stroke-width="2"')}${txt(540,234,label,32,'#9ac7d1',800)}${circle(540,475,180,'none',1,'stroke="#173648" stroke-width="30"')}${path('M 540 295 A 180 180 0 1 1 364 552','none','url(#warning)',30)}${txt(540,500,value,110,'#fff4d6',900)}${txt(540,574,'DEL TRÁFICO WEB',32,'#e2f7ff',700)}${txt(540,630,'2025 · INFORME THALES',24,'#8bbac7',700)}${rect(300,710,480,20,'#173647',10)}${rect(300,710,254,20,'#6de3ff',10)}${txt(540,790,'humanos vs automatización',24,'#b8d6df',700)}${line(350,838,730,838,'#38556a',4)}${rect(350,808,110,30,'#6de3ff',8)}${txt(405,832,'47%',24,'#09131d',900)}${rect(470,776,260,62,'url(#warning)',14)}${txt(600,818,'53%',28,'#231209',900)}`;
const network=(bots=9,color='#6de3ff')=>{
 let nodes='';
 const pts=[];
 for(let i=0;i<bots;i++){
  const a=(Math.PI*2*i)/bots - Math.PI/2;
  const r=260 + (i%2)*70;
  const x=540+Math.cos(a)*r, y=470+Math.sin(a)*r;
  pts.push([x,y]);
 }
 pts.forEach(([x,y],i)=>{nodes += line(540,470,x,y,'#2c7183',3,.8); nodes += circle(x,y,28,'#102331',1,'stroke="#55d8f0" stroke-width="3"'); nodes += txt(x,y+7,i%2?'AI':'BOT',18,'#e6fbff',900);});
 return `${circle(540,470,82,'#142a39',1,'stroke="#ff7c74" stroke-width="5"')}${txt(540,480,'TÚ',44,'#fff5e3',900)}${nodes}`;
 };
 const titleCard=(l1,l2='',l3='')=>`${rect(170,260,740,420,'url(#card)',30,1,'stroke="#2f475c" stroke-width="2"')}${txt(540,380,l1,54,'#f7fbff',900)}${l2?txt(540,460,l2,54,'#6ee2ff',900):''}${l3?txt(540,540,l3,54,'#ff8d82',900):''}${rect(250,600,580,10,'#193446',6)}${rect(250,600,260,10,'url(#cyanLine)',6)}`;
 const eyeScene=()=>`${circle(540,460,210,'#0f2233',1,'stroke="#35627f" stroke-width="4"')}${path('M 250 460 q 290 -220 580 0 q -290 220 -580 0 z','none','#6fe4ff',8)}${circle(540,460,84,'#08131d')}${circle(540,460,60,'#6de3ff')}${circle(540,460,22,'#ffffff')}${circle(660,376,44,'#ff676f',.55,'data-flash="1"')}${commentBubble(182,716,716,142,'¿quién escribió esto?', 'alguien… o algo?', 'COMENTARIO')}`;

 const scenes=[];
 scenes.push(bg('dark', motion(commentBubble(110,156,360,120,'¿y si gran parte…','…no viene de humanos?','HOOK'),0,-16,1.02,0,1)+motion(commentBubble(584,250,362,120,'likes, comentarios, vistas','todo parece normal','FEED'),0,16,1.02,0,1)+motion(network(6),0,12,1.02,0,1)+motion(txt(540,118,'INTERNET',56,'#f3fbff',900),0,0,1,0,1)));
 scenes.push(bg('teal', motion(phone(`<g>${profileCard(408,208,'user_281','784k')}${profileCard(408,394,'neo.daily','1.4M')}${profileCard(408,580,'echo.loop','951k')}${rect(410,760,292,40,'#173446',14)}${txt(556,789,'scroll infinito',24,'#9fd2de',700)}</g>`),0,12,1.03,0,1)+motion(txt(540,98,'REDES SOCIALES',40,'#eafcff',800),0,0,1,0,1)));
 scenes.push(bg('dark', motion(profileCard(110,162,'AI_MELI','2.8M'),-22,0,1.04,-3,1)+motion(profileCard(414,236,'ghost.media','1.1M'),18,0,1.03,2,1)+motion(profileCard(708,156,'trend.hub','3.6M'),24,0,1.04,5,1)+motion(txt(540,854,'perfiles creados para parecer personas',34,'#c2dde8',700),0,0,1,0,1)));
 scenes.push(bg('dark', motion(forumWindow(['ENERO · 2021','una idea inquietante','en un foro anónimo'],'reconstrucción ilustrada'),0,10,1.02,0,1)+motion(txt(540,92,'ORIGEN',44,'#f2fbff',900),0,0,1,0,1)));
 scenes.push(bg('red', motion(forumWindow(['LA TEORÍA DEL','INTERNET MUERTO',''], 'IlluminatiPirate · usuario anónimo')+rect(706,212,182,46,'#7b1422',12,1,'stroke="#ff8f95" stroke-width="2"')+txt(797,242,'PUBLICACIÓN',20,'#fff2f2',900),0,8,1.03,0,1)));
 scenes.push(bg('dark', motion(titleCard('2016 — 2017','internet “muere”','según la teoría'),0,-8,1.03,0,1)+motion(line(254,662,822,662,'#35566d',5)+circle(370,662,18,'#6de3ff')+circle(694,662,18,'#ff7d7d')+txt(370,718,'2016',28,'#c3dce6',800)+txt(694,718,'2017',28,'#c3dce6',800),0,0,1,0,1)));
 scenes.push(bg('teal', motion(commentBubble(112,206,360,118,'comentarios repetidos','mismo tono, mismo ritmo','COMENT'),0,8,1.02,-2,1)+motion(commentBubble(600,340,336,118,'perfiles idénticos','reacciones automáticas','PERFIL'),0,-8,1.02,2,1)+motion(commentBubble(210,524,648,126,'conversaciones que parecen humanas','pero podrían ser sintéticas','CHAT'),0,10,1.01,0,1)));
 scenes.push(bg('dark', motion(network(10),0,6,1.02,0,1)+motion(txt(540,134,'BOTS CREANDO CONTENIDO',44,'#f4fbff',900),0,0,1,0,1)+motion(rect(292,782,496,70,'#132839',18,1,'stroke="#2d5b70" stroke-width="2"')+txt(540,828,'para otros bots',34,'#ff9c90',900),0,0,1,0,1)));
 scenes.push(bg('red', motion(rect(168,184,744,632,'url(#card)',34,1,'stroke="#50314a" stroke-width="2"')+txt(540,262,'¿Y DETRÁS?',44,'#f5fbff',900)+txt(540,340,'la teoría dice:',30,'#c3d5dd',700)+path('M 400 670 q 140 -290 280 0 z','#1b0b12')+circle(460,540,40,'#240d16')+circle(620,540,40,'#240d16')+rect(410,572,200,120,'#1b0b12',24)+txt(540,438,'GOBIERNO',62,'#ff9c95',900)+circle(540,556,140,'none',1,'stroke="#7f3045" stroke-width="5" stroke-dasharray="10 10"'),0,10,1.02,0,1)));
 scenes.push(bg('dark', motion(rect(164,188,752,644,'url(#card)',34,1,'stroke="#2d4559" stroke-width="2"')+txt(540,332,'CASI NADIE',64,'#f7fbff',900)+txt(540,416,'lo tomó en serio',46,'#c8dce3',700)+rect(316,534,448,110,'#2f1116',18,1,'stroke="#ff7c74" stroke-width="3"')+txt(540,605,'FALSA',74,'#fff1e9',900)+path('M 348 670 q 196 90 385 -4','none','#6de3ff',5),0,8,1.02,0,1)));
 scenes.push(bg('teal', motion(docCard('THE ATLANTIC',['la teoría era falsa','pero “se sentía cierta”','el tema no desapareció'], '#6de3ff'),0,12,1.02,-1,1)+motion(circle(786,254,58,'#ff6a6e',.18,'data-flash="1"')+circle(786,254,42,'none',1,'stroke="#ff7f84" stroke-width="6"'),0,0,1,0,1)));
 scenes.push(bg('dark', motion(rect(192,194,696,596,'url(#card)',32,1,'stroke="#2d475b" stroke-width="2"')+txt(540,296,'FALSA',48,'#a7d0dc',800)+txt(540,380,'pero se sentía',44,'#f7fbff',900)+txt(540,448,'CIERTA',78,'#ff8b7d',900)+line(312,540,768,540,'#2f4f63',4)+txt(540,632,'esa sensación es la que la mantuvo viva',28,'#bfdae2',700),0,0,1.02,0,1)));
 scenes.push(bg('teal', motion(rect(154,170,772,670,'url(#card)',34,1,'stroke="#2d4b60" stroke-width="2"')+txt(540,248,'ENTONCES LLEGÓ LA IA',48,'#f7fbff',900)+avatar(350,468,2.4,'#fff','#30495f')+avatar(730,468,2.4,'#fff','#4b2740')+txt(350,646,'rostros que no existen',26,'#bce1ea',700)+txt(730,646,'cuentas que sí publican',26,'#bce1ea',700)+rect(250,714,580,64,'#122a38',18,1,'stroke="#2d5970" stroke-width="2"')+txt(540,756,'IA GENERATIVA',34,'#6de3ff',900),0,8,1.03,0,1)));
 scenes.push(bg('red', motion(rect(142,150,796,690,'url(#card)',34,1,'stroke="#39495a" stroke-width="2"')+txt(540,226,'2025',62,'#ffead0',900)+txt(540,290,'pasó algo inesperado',38,'#f7fbff',800)+profileCard(204,350,'synthetic.face','viral')+profileCard(418,468,'video.zero','loop')+profileCard(634,350,'event.ai','fake')+path('M 260 298 L 820 298','none','#334e60',4),0,6,1.02,0,1)));
 scenes.push(bg('dark', motion(phone(`<g>${rect(408,192,266,60,'#13293a',18)}${txt(541,231,'Sam Altman',32,'#f2fbff',900)}${rect(408,272,266,264,'#173144',18)}${avatar(541,408,2.4,'#fff','#2e4757')}${rect(408,560,266,186,'#122231',18)}${txt(541,614,'Nunca la tomé',24,'#e6fbff',700)}${txt(541,654,'en serio',24,'#e6fbff',700)}${txt(541,704,'Ahora veo',24,'#ffdac0',800)}${txt(541,736,'muchas cuentas IA',24,'#ffdac0',800)}</g>`),0,12,1.03,0,1)+motion(txt(540,92,'PARÁFRASIS ILUSTRADA',40,'#f6fbff',800),0,0,1,0,1)));
 scenes.push(bg('teal', motion(rect(136,164,808,710,'url(#card)',36,1,'stroke="#2e485e" stroke-width="2"')+txt(540,232,'OPENAI · CHATGPT',40,'#6de3ff',900)+network(12)+'<g transform="translate(540 470)"><circle r="0" fill="none"/></g>'+txt(540,804,'cuentas manejadas por IA',38,'#f7fbff',900),0,10,1.02,0,1)));
 scenes.push(bg('dark', motion(profileCard(114,210,'CUENTA A','automática'),-35,0,1.04,-4,1)+motion(profileCard(414,380,'CUENTA B','automática'),0,-45,1.05,0,1)+motion(profileCard(714,210,'CUENTA C','automática'),35,0,1.04,4,1)+motion(line(240,374,540,500,'#6de3ff',5)+line(840,374,540,500,'#6de3ff',5)+circle(540,680,78,'#132839',1,'stroke="#6de3ff" stroke-width="4"')+txt(540,690,'IA',48,'#e9fbff',900),0,-18,1.04,0,1)+txt(540,140,'CUENTAS AUTOMATIZADAS',42,'#e9fbff',900)));
 scenes.push(bg('dark', motion(docCard('THALES · INFORME ANUAL',['bots, tráfico web y automatización','2025','dato clave del video'],'#ff936d')+rect(220,770,196,64,'#102636',16,1,'stroke="#345e74" stroke-width="2"')+txt(318,812,'reporte',26,'#e8fbff',800)+rect(430,770,274,64,'#2d1216',16,1,'stroke="#ff8b7b" stroke-width="2"')+txt(567,812,'estadística',26,'#fff1e5',800),0,8,1.02,0,1)));
 scenes.push(bg('red', motion(chart('53%','TRÁFICO WEB AUTOMÁTICO'),0,8,1.03,0,1)));
 scenes.push(bg('dark', motion(rect(160,168,760,688,'url(#card)',34,1,'stroke="#2d475b" stroke-width="2"')+txt(540,252,'TRÁFICO HUMANO',44,'#e8fbff',900)+txt(540,312,'47 % del tráfico medido',58,'#ff8a7b',900)+line(262,760,818,760,'#2e5065',4)+rect(284,702,140,58,'#6de3ff',14)+txt(354,742,'47%',28,'#09131d',900)+rect(444,646,354,114,'url(#warning)',14)+txt(620,716,'53%',48,'#231209',900)+txt(620,754,'automatizado',24,'#231209',900),0,6,1.02,0,1)));
 scenes.push(bg('teal', motion(rect(162,174,756,684,'url(#card)',34,1,'stroke="#2d485d" stroke-width="2"')+txt(540,254,'PERO OJO',56,'#fff1d8',900)+txt(540,344,'esto no prueba',42,'#f7fbff',800)+txt(540,406,'la teoría completa',50,'#ff8f7f',900)+line(270,494,810,494,'#365269',4)+txt(354,590,'tráfico',44,'#6de3ff',900)+txt(724,590,'personas',44,'#ffae9a',900)+line(374,612,706,612,'#47677b',5)+circle(540,644,14,'#fff4d6')+path('M 350 694 q 190 -66 380 0','none','#2e5167',4),0,0,1.02,0,1)));
 scenes.push(bg('dark', motion(rect(184,200,712,620,'url(#card)',34,1,'stroke="#2f475c" stroke-width="2"')+txt(540,286,'NO HAY PRUEBAS',48,'#f7fbff',900)+txt(540,350,'de un complot',56,'#ff8f7f',900)+rect(294,470,492,160,'#102130',22,1,'stroke="#2d4e63" stroke-width="2"')+txt(540,540,'tráfico ≠ usuarios reales',36,'#bfe2eb',800)+txt(540,592,'automatización no es conspiración',30,'#9cc2ce',700),0,6,1.02,0,1)));
 scenes.push(bg('teal', motion(phone(`<g>${commentBubble(394,214,292,100,'wow esto sí da miedo','','USER')}${commentBubble(394,340,292,100,'¿será verdad?','','USER')}${commentBubble(394,466,292,100,'publicado hace 3 s','','BOT')}${commentBubble(394,592,292,116,'la próxima vez que leas…','pregúntate quién escribió','AVISO')}</g>`),0,10,1.03,0,1)+motion(txt(540,96,'LA PRÓXIMA VEZ…',42,'#f8fbff',900),0,0,1,0,1)));
 scenes.push(bg('dark', motion(eyeScene(),0,0,1.03,0,1)+motion(txt(540,124,'¿FUE ALGUIEN… O ALGO?',48,'#f8fbff',900),0,0,1,0,1)));
 window.DEADNET_SCENES=scenes.map((markup,i)=>markup.replace(/id="([^" ]+)"/g,(_,id)=>`id="dn${i}-${id}"`).replace(/url\(#([^)]*)\)/g,(_,id)=>`url(#dn${i}-${id})`));
})();

window.DEADNET_CUES = [0, 6, 10, 15, 31, 38, 47, 54, 60, 66, 72, 83, 88, 93, 99, 104, 125, 130, 143, 154, 159, 167, 181, 194];
/* Episode-isolated timeline for Datologo — Internet muerto */
(()=>{
'use strict';
const total=80.927, fallback=window.DEADNET_FALLBACK;
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
 const clean=w=>w.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9%]/g,'');
 if(result.filter((v,i)=>clean(v.word)===clean(fallback[i].word)).length/result.length<.85)return null;
 if(result[0].start<0||result.at(-1).start>total+1||result.some((v,i)=>i&&v.start<result[i-1].start))return null;
 return result.map((v,i)=>({word:fallback[i].word,start:Math.max(0,Math.min(total-.04,v.start)),end:Math.min(total, num(v.end)&&v.end>v.start?v.end:(result[i+1]?.start??total))}));
}
let candidates=[window.CAPTIONS,window.captions,window.CAPTIONS_WORDS,window.WORDS,window.CAPTION_WORDS,window.captionWords,window.alignedWords];
try { if(typeof CAPTIONS!=='undefined')candidates.push(CAPTIONS); } catch(e){}
try { if(typeof captions!=='undefined')candidates.push(captions); } catch(e){}
try { if(typeof WORDS!=='undefined')candidates.push(WORDS); } catch(e){}
try { if(typeof CAPTION_WORDS!=='undefined')candidates.push(CAPTION_WORDS); } catch(e){}
const words=candidates.map(normalize).find(Boolean)||fallback;
const stage=document.getElementById('stage'),caps=document.getElementById('caps');
if(!stage||!caps||!window.gsap)throw new Error('Datologo: missing stage, caps or local GSAP asset');
const tl=window.gsap.timeline({paused:true,defaults:{ease:'none'}});
const cue=window.DEADNET_CUES; const raw=window.DEADNET_SCENES;
if(cue.length!==raw.length)throw new Error('V3: Scene/cue count mismatch '+raw.length+'/'+cue.length);
const scenes=raw.map((markup,i)=>{const el=document.createElement('div');el.className='scene';el.id='scene-'+i;el.innerHTML=markup;stage.appendChild(el);return el;});
window.gsap.set(scenes,{autoAlpha:0});
const times=cue.map((w,i)=>i===0?0:words[w].start);
for(let i=0;i<scenes.length;i++){
 const el=scenes[i],start=times[i],end=times[i+1]??total,dur=Math.max(.04,end-start);
 tl.set(el,{autoAlpha:1},start);
 if(i>0){
  const overlap=(i%4===0||i%6===0)?Math.min(.18,dur*.14):0;
  if(overlap){tl.fromTo(el,{opacity:0},{opacity:1,duration:overlap,immediateRender:false},start);tl.set(scenes[i-1],{autoAlpha:0},start+overlap);} else tl.set(scenes[i-1],{autoAlpha:0},start);
 }
 const groups=el.querySelectorAll('[data-motion]');
 groups.forEach((node,j)=>{
  const [x,y,scale,rotation,opacity]=node.getAttribute('data-motion').split(',').map(Number);
  const ease=(i===13||i===18)?'power2.out':(j%2?'sine.inOut':'power1.inOut');
  tl.fromTo(node,{x:0,y:0,scale:1,rotation:0,opacity:1,transformOrigin:'50% 50%'},{x,y,scale,rotation,opacity,duration:dur,ease,immediateRender:false},start);
 });
 const flashes=el.querySelectorAll('[data-flash]');
 flashes.forEach((node,j)=>{tl.fromTo(node,{opacity:.18},{opacity:.75,duration:Math.min(.45,dur*.4),yoyo:true,repeat:1,ease:'sine.inOut',immediateRender:false},start+j*.08);});
}
const groups=[]; let active=[];
for(let i=0;i<words.length;i++){
 const v=words[i]; active.push(v);
 const next=words[i+1]; const chars=active.map(w=>w.word).join(' ').length;
 if(active.length===3||/[,.!?;:]$/.test(v.word)||!next||next.start-v.end>.22||chars+(next?.word?.length??0)>28){groups.push(active);active=[];}
}
if(active.length)groups.push(active);
caps.style.display='block';
for(let i=0;i<groups.length;i++){
 const grp=groups[i]; const wrap=document.createElement('div');
 wrap.style.cssText='position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:13px;visibility:hidden;white-space:nowrap;';
 const letters=grp.map(w=>w.word).join(' ').length; wrap.style.fontSize=letters>25?'48px':letters>22?'54px':'60px';
 const spans=grp.map(v=>{const s=document.createElement('span');s.textContent=v.word;wrap.appendChild(s);return s;}); caps.appendChild(wrap);
 const a=grp[0].start,b=Math.min(total,groups[i+1]?.[0]?.start??grp.at(-1).end,grp.at(-1).end+.22);
 tl.set(wrap,{autoAlpha:1},a); tl.fromTo(wrap,{scale:.94},{scale:1,duration:Math.min(.14,Math.max(.04,b-a)/2),ease:'back.out(1.4)',immediateRender:false},a);
 grp.forEach((v,j)=>{const d=Math.min(.1,Math.max(.04,(v.end-v.start)*.38));tl.fromTo(spans[j],{scale:1},{scale:1.08,duration:d,yoyo:true,repeat:1,ease:'power1.out',immediateRender:false},v.start);});
 tl.set(wrap,{autoAlpha:0},Math.max(a+.02,b));
}
const marker={value:0}; tl.to(marker,{value:1,duration:total},0);
window.__timelines=window.__timelines||{}; window.__timelines.main=tl;
window.DEADNET_DIAGNOSTICS={scenes:scenes.length,words:words.length,captionGroups:groups.length,duration:total,source:words===fallback?'estimated':'captions.js'};
})();
