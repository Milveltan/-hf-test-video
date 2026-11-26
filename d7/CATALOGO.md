# CATÁLOGO · Biblioteca permanente DROGMAN 7.0 (`src/dl/`)
Vista de todas las piezas: `catalog/hoja.jpg` · miniaturas: `catalog/thumbs/<id>.jpg` · regenerar: `node tools/catalog-thumbs.mjs [ids]`.
Regla: **antes de dibujar algo nuevo, búscalo aquí.** Lo que se crea para un video y sirve para otros se agrega aquí (nunca se borra; si se mejora, se mantiene la firma).
Todas las piezas son funciones del fotograma (deterministas) y aceptan colores por props para adaptarse a cualquier tema.

## Núcleo
| Archivo | Exporta | Uso |
|---|---|---|
| `motion.ts` | `spr`, `bounce`, `prog`, `keys`, `inertia`, `stagger`, `bezier`, `noise1`, `rng`, `E` (easings) | física y curvas de todo movimiento |
| `timing.ts` | `makeTiming(words)` → `w(i, off)` | anclar escenas y efectos a palabras |
| `Captions.tsx` | `Captions` | subtítulos palabra por palabra (abajo, 1 color, "pop") |
| `Sfx.tsx` | `SfxTrack` | efectos anclados a fotogramas |
| `fonts.ts` | `F` (caption, display, grotesk, mono, serif, ui, cond) | fuentes OFL locales |

## Cámara · `camera/Camera.tsx`
`Cam` (x, y, zoom, rot, shake) + `Layer depth` (paralaje automático) · `Whip`.

## Luz · `light/Light.tsx`
`Glow` (fuente puntual) · `Beam` (haz/reflector) · `Sweep` (reflejo que barre) · `Vignette`.

## Efectos · `fx/`
`Fx.tsx`: `Stamp` (sello que golpea) · `Particles` (chispas, polvo, nieve, burbujas) · `Flash` · `Scanline`. `PowerOff.tsx`: `PowerOff` (apagado de televisor antiguo sobre cualquier escena: línea → punto → negro). `Dust.tsx`: polvo en un haz. `FallVoid.tsx`: túnel de caída con estelas radiales (k, speed, colores).

## Transiciones · `transitions/`
`Transit` (whip, zoom, iris, fade, drop, wipe) · `GlitchBands`. Además: paneo vertical continuo, entrada a pantalla (match-cut), línea que continúa entre escenas (ver episodio internet-muerto).

## Tipografía · `type/Type.tsx`
`MaskRise` (letras/palabras desde máscara) · `SlamWord` (golpe + RGB) · `Odometer` (contador mecánico) · `TypeOn` (máquina de escribir).

## Interfaces · `ui/`
`FeedCard.tsx`: `FeedCard`, `makeCards` (feed social con giro humano→bot). `ForumScreen.tsx`: foro con compositor, clic, publicación, respuestas, marcador. `Social.tsx`: `PostCard` (cita real con resaltados) · `CommentBubble` · `ProfileCard` · `ChatThread` · `ChatWindow` (asistente IA) · `PhoneFrame`.

## Motor de episodio · `episode/EpisodeRunner.tsx`
`EpisodeRunner` (words, scenes[{C, from, to, out, outLen}], sfx, mix, overlays) · `episodeFrames(words)`. El episodio solo declara el mapa de escenas.

## Render · `render/`
`Clip3D` (3D real horneado en clip con alfa; ver docs/RENDER.md) · `ParticleForm` (partículas 3D en Canvas 2D: sphere, torus, helix, ring, disc, cloud, heart; morph, rotX/rotY, colors, spread) — costo medio, sin WebGL.

## Anatomía · `anatomy/Anatomy.tsx`
`Lungs` (inflate, o2, glow) · `Heart` (bpm, o2: late solo) · `BloodFlow` (d = trayectoria, o2, speed, cells) · `Brain` (highlight: brainstem/cortex/all) · `Diaphragm` (inflate) · `Spleen` (squeeze: bazo que se contrae) · `o2Color(o2)`.
`VascularBody.tsx` → `VascularBody` (silueta 400×960 con red de vasos; constrict = vasoconstricción periférica, core = flujo concentrado en cerebro y corazón).

## Naturaleza y atmósfera · `nature/Nature.tsx`
`Sky` (t = hora del día, nubes, sol/luna, estrellas) · `Hills` (capas de paralaje) · `Grass` (viento) · `Underwater` (cáusticas, rayos, burbujas; depth) · `Fog` · `GodRays`.
`Marine.tsx` → `Whale` (ballena jorobada 900×340) · `Seal` (foca 420×170): siluetas laterales con cola ondulante y luz de contorno.

## Personajes · `characters/`
**`HumanRig.tsx` → `HumanRig`** (cuerpo completo articulado 400×960): pose (`POSES`: idle, handsChest, handsUp, holdNose, walkA/B, point; `mixPose` para interpolar), breath, expression (neutral, tense, strain, relief, surprise, smile, eyesClosed), cheeks, flush, blink, look, **xray + inside** (órganos dentro del pecho), person (`PERSONA_A`, `PERSONA_B`, `ATLETA` o ficha propia), rim (color de luz de contorno). Limitación: vista frontal; brazos en 2 segmentos (flL/flR acortan el brazo para simular escorzo).
| Pieza | Notas |
|---|---|
| `Avatars.tsx` → `HumanFace`, `BotFace` | avatares de perfil |
| `Bot.tsx` → `Bot` (cuerpo completo articulado: cabeza, brazos, LED), `Pictogram` (isotipo persona/bot) | |
| `AltmanBust.tsx` → `Bust` + fichas `ALTMAN`, `PERSONA` | retrato editorial 3/4 con parpadeo, mirada y boca; nuevas personas = nueva ficha de colores |
| `HoodedFigure.tsx` → `HoodedFigure` | usuario anónimo de espaldas, respira y teclea |

**Fichas registradas:** `ALTMAN` (cabello castaño claro corto, ojos claros, suéter gris de cuello redondo) · `PERSONA` (genérica: pelo oscuro, suéter mostaza).

## Escenarios · `environments/`
`DarkRoom.tsx` → `Room`, `SCR` (cuarto nocturno con monitor, ventana con lluvia) · `GovBuilding.tsx` (edificio de gobierno genérico con ventanas que se encienden). `NightHouse.tsx` → `House` (casa nocturna: `off[i]` apaga ventanas una por una; 8 = ático) · `ApartmentBlock` (edificio cols×rows con siluetas que se sacuden: `lit(i)`, `jolt(i)`).

**`Home.tsx`** (episodio olvido-puerta): `Kitchen` (cocina teal con vapor y lámpara colgante) · `Sala` (sofá, ventana nocturna, lámpara de pie, cuadros-fotograma) · `DoorWall` · `HouseWorld` (sala | puerta | cocina, 2160×1200; moverse por él con una cámara de mundo `translate/scale`). Cada cuarto acepta `lit` 0–1. Piso en y = 880.

**`anatomy/Stomach.tsx`**: `Stomach` (estómago 2.5D; `churn` contracciones, `fill` comida, `glow`). Va bien dentro de `HumanRig` con `xray`.

## Cine · `film/Film.tsx`
`Idea` (bombilla luminosa con rayos; `glow` < 1 la apaga en gris) · `FilmCard` (fotograma con perforaciones que encierra cualquier contenido 1080×1200 escalado a `w`; `glow`, `dim`) · `Clapper` (claqueta, `k` 0 abierta → 1 cerrada). Útiles para "capítulos", archivo, recuerdos, escenas dentro de escenas.

## Mecanismos · `mechanisms/`
`Conveyor.tsx` (banda transportadora con rodillos y objetos que viajan).

## Datos · `data/`
`EcgTrace.tsx` (`EcgTrace`, `ecgHead`) · `Data.tsx`: `TimelineRuler` · `PercentRing` · `StreamSplit` (flujo que se divide) · `IsoGrid` (n de 100) · `PhScale` (escala de pH ácido↔básico con aguja y marca de referencia).

## Editorial · `editorial/`
`Editorial.tsx`: `Annotation` (etiqueta + línea guía) · `LowerThird` (nombre y cargo) · `SourceTag` (fuente del dato, obligatoria con cifras). `MagazinePage.tsx` (página de revista con textura de papel).

## Opus Motion Library adaptadas (`src/opus-motion/`, MIT)
| id | Uso en Datologo | Peso |
|---|---|---|
| `text-scramble-decode` | revelaciones decodificadas | ligero |
| `split-flap-board` | fechas, marcadores, anuncios | ligero |
| `node-network` | redes, comunidades, sistemas | ligero |
| `film-look` (overlay) | grano, viñeta, aberración en todo el video | medio |
| `particle-shape-morph` | 3D real (three.js): texto → esfera/toro de partículas | pesado (1 escena) |

**Candidatas probadas para próximos temas** (renderizan bien en CPU): `globe-3d`, `holo-globe`, `giant-eye-reveal`, `neural-net-layers`, `evidence-board`, `starfield-warp`, `zoom-tunnel`, `city-rooftops-rain-window`, `ui-accumulation-storm`, `heart-rate-monitor`, `flight-arcs`, `pin-drop-cluster`. Para agregarlas: `node cli/mgl.mjs add <ids> --to d7/src` desde el repo de Opus (incluyendo las ya instaladas).

## Paletas por tema (punto de partida, no plantilla)
- **Tecnología / internet:** negro azulado, fósforo `#39FF8E`, cian `#7FE3FF`, alarma `#FF3B3B`.
- **Editorial / historia:** madera cálida, papel `#F4EFE4`, tinta `#14110D`, rojo `#D2452B`.
- **Advertencia / verificación:** ámbar `#FFB020` sobre negro cálido.
- **Anatomía / ciencia / animales / naturaleza:** cada episodio define su paleta en `episodes/<slug>/scenes/palette.ts`.
