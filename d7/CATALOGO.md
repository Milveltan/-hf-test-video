# CATÁLOGO · Biblioteca permanente Datologo 7 (`src/dl/`)
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
`Fx.tsx`: `Stamp` (sello que golpea) · `Particles` (chispas, polvo, nieve, burbujas) · `Flash` · `Scanline`. `Dust.tsx`: polvo en un haz.

## Transiciones · `transitions/`
`Transit` (whip, zoom, iris, fade, drop, wipe) · `GlitchBands`. Además: paneo vertical continuo, entrada a pantalla (match-cut), línea que continúa entre escenas (ver episodio internet-muerto).

## Tipografía · `type/Type.tsx`
`MaskRise` (letras/palabras desde máscara) · `SlamWord` (golpe + RGB) · `Odometer` (contador mecánico) · `TypeOn` (máquina de escribir).

## Interfaces · `ui/`
`FeedCard.tsx`: `FeedCard`, `makeCards` (feed social con giro humano→bot). `ForumScreen.tsx`: foro con compositor, clic, publicación, respuestas, marcador. `Social.tsx`: `PostCard` (cita real con resaltados) · `CommentBubble` · `ProfileCard` · `ChatThread` · `ChatWindow` (asistente IA) · `PhoneFrame`.

## Personajes · `characters/`
| Pieza | Notas |
|---|---|
| `Avatars.tsx` → `HumanFace`, `BotFace` | avatares de perfil |
| `Bot.tsx` → `Bot` (cuerpo completo articulado: cabeza, brazos, LED), `Pictogram` (isotipo persona/bot) | |
| `AltmanBust.tsx` → `Bust` + fichas `ALTMAN`, `PERSONA` | retrato editorial 3/4 con parpadeo, mirada y boca; nuevas personas = nueva ficha de colores |
| `HoodedFigure.tsx` → `HoodedFigure` | usuario anónimo de espaldas, respira y teclea |

**Fichas registradas:** `ALTMAN` (cabello castaño claro corto, ojos claros, suéter gris de cuello redondo) · `PERSONA` (genérica: pelo oscuro, suéter mostaza).

## Escenarios · `environments/`
`DarkRoom.tsx` → `Room`, `SCR` (cuarto nocturno con monitor, ventana con lluvia) · `GovBuilding.tsx` (edificio de gobierno genérico con ventanas que se encienden).

## Mecanismos · `mechanisms/`
`Conveyor.tsx` (banda transportadora con rodillos y objetos que viajan).

## Datos · `data/`
`EcgTrace.tsx` (`EcgTrace`, `ecgHead`) · `Data.tsx`: `TimelineRuler` · `PercentRing` · `StreamSplit` (flujo que se divide) · `IsoGrid` (n de 100).

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
