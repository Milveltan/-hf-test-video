# DATOLOGO · Catálogo de la biblioteca permanente (`video/` en GitHub)

**Regla:** este catálogo es ACUMULATIVO. Cada video agrega componentes; nunca se borran ni se reescriben los que funcionan.
Al empezar un video, Claude clona el repo y lee este archivo antes de dibujar algo nuevo.

## Estructura permanente del repo
```
video/
  lib/core.js        PRNG con semilla, lg()/rg() gradientes, def() → DEFS compartidos, filtros y materiales base
  lib/characters.js  Rig de personaje v3 + acciones (DLC.makeChar, DLC.A)
  lib/props.js       Vehículos, ciudades, naturaleza, utilería (DLP.*)
  lib/kit.js         Helpers de composición (DLK.N, T, addToGroup, sky, floorG, light, beam)
  lib/fichas.js      Fichas fijas de personajes (FICHAS.*)
  lib/engine.js      Motor común: escenas, cámara, transiciones, títulos, grano, SHAKE, subtítulos
  lib/CATALOGO.md    Este archivo
  tools/align.mjs    Whisper → guion: captions.js + efectos reubicados + sync-report.txt
  tools/estimate_captions.mjs  Tiempos provisionales por pausas del audio (uso local de Claude; Whisper corrige en Actions)
  tools/sfx_synth.py Generador de efectos sintetizados (sin licencias)
  tools/music_bed.py Generador de música de fondo a la medida
  assets/gsap.min.js · assets/fonts/Montserrat.ttf (OFL) · assets/sfx/*.wav
  episodios/<slug>/  Archivo de cada video (scenes.js, script.txt, captions.js, index.html, sync-report.txt)
```

## Archivos de cada video (van en `proyecto.zip`)
`index.html` (audios + includes) · `voice.mp3` · `script.txt` · `captions.js` (tiempos estimados; Whisper los corrige) · `scenes.js` · `episodio.txt` (slug) · **solo** los archivos de `lib/`, `tools/` o `assets/` nuevos o modificados (partiendo de la versión actual del repo).

## Contrato de una escena (`scenes.js`)
```js
S.push({k:'clave', w:<índice de palabra donde arranca>, tr:'fade|cut|flash|whip|glitch|zoom|wipe',
  title:'TEXTO', titleAt:<palabra opcional>,           // solo 2–3 títulos por video
  cam:{x:[a,b], y:[a,b], s:[a,b], r:[a,b], ease},      // paralaje automático bg .45 · mid 1 · fg 1.7
  bg:()=>svg, mid:()=>svg, fg:()=>svg,                 // marco 1080×1920 (sobrebarrido de 80 u)
  anim(tl,t0,d){ ... WT(i) = inicio real de la palabra i ... }});
```
Índices de palabra = posición en `script.txt` separando por espacios (empieza en 0).
Efectos de sonido en `index.html`: `<audio id="sfxNN" src="assets/sfx/x.wav" data-word="N" data-offset="-0.1" data-start="0" data-duration=".." data-volume=".." data-track-index="único">`.

## lib/characters.js — Rig v3
- **v3.2:** afro con masa DETRÁS de la cara + línea frontal alta (ya no tapa ojos ni cejas). Nuevas opciones: `shades` (lentes oscuros), `grin` (sonrisa con dientes; id `_mG`, se oculta con A.mouth O/S), `chain` (cadena dorada), `pattern:'#color'` (estampado en la ropa).
- **v3.1:** `hairStyle:'afro'` (afro voluminoso, usado por las fichas HotSpanish).
- `makeChar(id, spec)` → SVG. Origen en los pies, alto ≈ 640 u, 3/4 hacia la derecha (escala negativa en `N()` = espejo).
- spec: `skin[3] hair[2] hairStyle(short|curly|long|bald) top[2] top2 pants[2] shoes iris rim hood glasses beard cap headphones silhouette sleeve(long|short) kid scale`.
- Grupos animables (`id_` + ): `torso head thF shF thB shB uaF faF hF uaB faB hB eyes iris blink brows mN mO mS`.
- Acciones `DLC.A`: `blink, blinks, breathe, mouth(N|O|S), look, brows, head, lean, arm, setArm, laugh, walk`.
- Sentado: `thF/thB rotation -80`, `shF/shB rotation 84`.
- Objeto en la mano: `addToGroup(makeChar('ju',...),'ju_hF','<g>…</g>')`.

## lib/fichas.js — personajes
| Ficha | Descripción | Episodio |
|---|---|---|
| jugador / jugadorAdulto | Chico de sudadera turquesa; adulto con barba | gta-vi-13-anios |
| dev1 | Programador pelirrojo rizado con lentes, suéter vino | gta-vi-13-anios |
| dev2 | Programador de pelo corto, suéter verde olivo | gta-vi-13-anios |
| publicista | Traje oscuro, camisa blanca | gta-vi-13-anios |
| hacker | Sudadera con capucha, luz cian | gta-vi-13-anios |
| hotspanish | Afro rizado, lentes, conjunto rosa, manga corta (ilustración propia) | hotspanish-antes-de-la-fama |
| hotspanishNino | Versión infantil: afro, sin lentes, camisa roja (`kid`) | hotspanish-antes-de-la-fama |
| hotspanishYT | Época de YouTube: sudadera gris con capucha | hotspanish-antes-de-la-fama |
| hotspanishYTLentes | Época YouTube con lentes oscuros (desde que se pone el nombre) | hotspanish-parte-2-la-transformacion |
| tia · papa · senor | Tía cálida (pelo largo) · papá con gorra · señor de las tortas (canoso, barba) | hotspanish-antes-de-la-fama |

## lib/props.js — DLP
- **Vehículos:** `car(id,{c1,c2,type:'sedan'|'sport',police,lights,rim})` (ruedas `id_wa/id_wb`, sirenas `id_lr/id_lb`) · `topCar({c,police})` vista cenital.
- **Ciudades:** `skyline(seed,{x0,x1,base,minH,maxH,minW,maxW,top,bot,side,lit,dark,neon[],towers,tanks,depth,gap})` · `isoBlock(x,y,w,d,h,[top,left,right])` · `parliament(x,y,w)` · `bigBen(x,y,s)`.
- **Naturaleza:** `palm(x,y,s,c)` (hojas `.frond`) · `pine` · `cactus` · `mountains(seed,base,h,c1,c2,n)` · `rain(seed,n,x,y,w,h)` · `stars(seed,n,w,h)`.
- **Pantallas:** `crt(id,screenSvg)` · `phone(id,screenSvg)` · `laptop(id,screenSvg)` · `topMap(seed)` (mapa cenital de calles).
- **Objetos:** `gameBox(id,{title,sub,c1,c2,art})` · `newspaper(id,head,sub)` · `calendarPage(id,num,label,color)` · `bill()` · `coin(r)` · `magnifier` · `trophy` · `mic` · `chip(id,color)` · `server(x,y,h)` · `shelf(x,y,w)`.

## lib/props.js — v2 (DLP, 25-nov-2026)
`casita(x,y,w,h,c,techo,luz)` · `torta(id,x,y,s)` · `camara(id,x,y,s)` (luz `id_rec`) · `tripode(x,y)` · `pantallaPlay(c)` · `dust(seed,n,w,h,c)` (grupo `d<seed>`) · `bocadillo(id,x,y,w,txt,{s,c,bg,tail})` · `neon(id,x,y,txt,s,c)` · `chile(id,x,y,s)` · `maquinita(id,x,y,s)` · `ruleta(id,x,y,r,colores)` (girar `#id_w`) · `alcancia(id,x,y,s)` · `mansion(id,x,y,s,luz)`.

## lib/core.js — materiales y luces (`url(#…)`)
Filtros: `fSoft4/8/16/30 fGlow fNeon fWall fWood`. Materiales: `mMetal mChrome mGlass mWin mTire mPaper mBill mCoin mShelf`.
Halos: `gGlowW gGlowR gGlowB gGlowC gGlowP gGlowA gShadow`. Desvanecidos: `gFadeB gFadeT`.

## lib/engine.js — motor
**v3 (25-nov-2026):** subtítulos de UN solo color (blanco con contorno, misma fuente); la palabra activa solo hace pop (escala 1.1). `window.CAPTION_HIGHLIGHT=true` recupera amarillo/cian. Los títulos narrativos siempre desaparecen a los 2.2 s.
**Formato variable (v2):** el marco de escena es `data-width × data-height` de `#main` (viewBox `-80 -80 W+160 H+160`). 9:16 = 1080×1920 · 1:1 = 1080×1080. En 1:1 el `index.html` ajusta `.L` a 1240×1240, título en top 70 px y subtítulos en top 800 px (62 px). `window.FRAME={w,h}` disponible en escenas.
Transiciones: `fade cut flash whip glitch zoom wipe`. Cámara por capas con paralaje. `SHAKE(_,t,dur,amp)`. Títulos con barra dorada. Grano animado + viñeta. Subtítulos: máx. 3 palabras, amarilla la que suena, cian las de `EPISODE_KEYWORDS`.

## assets/sfx — efectos
**Normalizados (25-nov-2026)** a ≈ −21/−24 LUFS. Regla de mezcla: voz `voice.mp3` normalizada a −16 LUFS con `tools/voice_norm.sh` y `data-volume="1"`; TODOS los efectos `data-volume="0.5"`; música 0.12. Todo sonido nuevo se normaliza igual antes de sumarlo.
`boom cash click_ui coins crash engine flip glitch impact ping rain reveal_swell riser shutter siren stamp tick typing whoosh` + `music_bed.wav` (100 s, se regenera a la duración de cada video con `tools/music_bed.py`).

## Historial
- 2026-11-25 · hotspanish-parte-3-la-mansion-vip (1:1, 79 s, 21 escenas): contadores animados (premio, espectadores), claqueta, cuerda floja, cuarto de control; HotSpanish con `headphones` sobre el afro.
- 2026-11-25 · hotspanish-parte-2-la-transformacion (1:1, 81 s, 21 escenas): props v2 (utilería del episodio 1 promovida + bocadillo, neon, chile, maquinita, ruleta, alcancia, mansion); primera mezcla con voz −16 LUFS y efectos al 50 %.
- 2026-11-25 · ajustes de calidad: engine v3 (subtítulos un color, títulos que se van), afro en el rig, sfx normalizados, `tools/voice_norm.sh`.
- 2026-11-25 · hotspanish-antes-de-la-fama (1:1): motor con formato variable; fichas HotSpanish (3 épocas), tía, papá, señor; utilería local en scenes.js candidata a props: `casita`, `iglesia`, `torta`, `camara`, `tripode`, `pantallaPlay`, `dust`.
- 2026-11-24 · gta-vi-13-anios: base inicial (rig v3, vehículos, ciudades, motor modular, 20 efectos, música).
