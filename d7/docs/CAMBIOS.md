# Registro de cambios y pruebas — DROGMAN 7.0

## v1 (26-nov-2026, 00:58–01:20) · rama `datologo-7-estable`
Episodio «Internet muerto» (81 s). Render en GitHub con `swangle` para todo: **1859 s (1.31 fps)**. Sync Faster-Whisper: 50 s, 99.5 %.

## v2 · Fase 2 (26-nov-2026, 02:39–)
- Arranque automático: `CLAUDE.md` en la raíz de la rama + `docs/` modulares (PRODUCCION, RENDER, CALIDAD, CAMBIOS).
- Render híbrido: `Clip3D` + `src/clips.ts`; el workflow hornea los clips 3D con `swangle` (WebM con alfa) y renderiza el episodio con `angle`. Clips reutilizables (se guardan en la rama).
  - Prueba local: clip «im-ia-particulas» (180 fotogramas) en 89 s; integración con transparencia verificada en fotogramas 1110–1230. ✅
- `ParticleForm` (Canvas 2D): alternativa 3D sin WebGL. ✅ (miniaturas)
- `EpisodeRunner`: el episodio declara solo el mapa de escenas.
- `tools/check.mjs` (validación técnica en 6 s, también en GitHub antes del render).
- Subtítulos con ajuste automático (`measureText`), mínimos de legibilidad subidos (fuentes, rótulos, kicker 30 px).
- Catálogo visual: `src/catalog/Showcase.tsx` + `tools/catalog-thumbs.mjs` → 32 miniaturas.
- Biblioteca nueva: `HumanRig` (cuerpo completo, 7 expresiones, poses, rayos X), anatomía (pulmones, corazón, flujo sanguíneo, cerebro, diafragma), naturaleza (cielo, colinas, pasto, bajo el agua, niebla, rayos de luz).
- **Medición en GitHub (ejecución 45786754031, mismo episodio de 81 s):**
  | Paso | v1 | v2 |
  |---|---|---|
  | Render del episodio | 1859 s (1.31 fps) | **191 s (12.77 fps)** ✅ |
  | Clip 3D (solo la 1.ª vez; luego se reutiliza) | — | 92 s ✅ |
  | Sync Faster-Whisper | 50 s | 45 s ✅ |
  | Ejecución completa del workflow | ≈ 34 min | **≈ 7.7 min** ✅ |
  Guardado automático de clips y registros en la rama: ✅ funcionando.
- El workflow ya no renderiza cuando solo cambian documentos (docs, .md, registros, catálogo).

## v2.1 (26-nov-2026, 03:07)
- Objetivo permanente de eficiencia de uso: `docs/EFICIENCIA.md` (reparto Sonnet/Opus, lectura mínima, QA acotado). Referenciado en CLAUDE.md y ARQUITECTURA.md.

## v2.2 (26-nov-2026) · Episodio "Contener la respiración"
- Episodio `contener-respiracion` (composición `ContenerRespiracion`, 14 escenas, ≈ 65,7 s). Dirección artística "Abismo fisiológico".
- Biblioteca nueva: `Spleen` (Anatomy), `VascularBody`, `Whale`/`Seal` (nature/Marine), `PowerOff` (fx), `PhScale` (Data). Añadidas al catálogo y al Showcase.
- Efectos nuevos en `public/sfx/` (sintetizados con ffmpeg): breath_in, gasp, heartbeat, alarm, power_off, underwater, spasm, body_ambient.
- QA local sin acceso a remotion.media: `REMOTION_CHROME=/opt/pw-browsers/chromium_headless_shell-*/chrome-headless-shell-linux64/chrome-headless-shell node tools/qa-stills.mjs …`.
- `words.json` provisional por pausas del audio; GitHub lo corrige con Whisper (`sync: true`).

## 2026-11-26 · Episodio sacudida-al-dormir
- Narración con las reglas nuevas de DIRECCION_CREATIVA §0 (gancho hablado, cierre explícito, sin datos técnicos).
- Piezas nuevas en la biblioteca: `environments/NightHouse.tsx` (House, ApartmentBlock) y `fx/FallVoid.tsx`.
- Con la voz Relator Narrativo Dinámico (Drama 3), ~150 palabras = 51 s; 199 palabras = 75 s.

## 2026-11-26 · Episodio olvido-puerta («Por qué se te olvida lo que ibas a hacer al entrar a un cuarto»)
- Composición `OlvidoPuerta`, 13 escenas, 60,8 s. Dirección artística "Cine de hogar" (grading teal/tungsteno, cuartos como fotogramas, la puerta como claqueta).
- Piezas nuevas en la biblioteca: `environments/Home.tsx` (Kitchen, Sala, DoorWall, HouseWorld) y `film/Film.tsx` (Idea, FilmCard, Clapper). Añadidas al catálogo y al Showcase.
- Ficha de persona `VIEWER` (suéter coral) en `episodes/olvido-puerta/scenes/palette.ts`.
- Aprendizaje: `walkPose` necesita velocidad ≈ 0.115 (ciclo de ~17 fotogramas); a 0.35 los pasos se ven acelerados. Evitar poner al personaje bajo la lámpara colgante de la cocina (parece sombrero): usar x ≈ 400.

## 2026-11-26 · Episodio sin-dormir («Qué pasa en tu cuerpo cuando no duermes en 24 horas», 27,6 s)
- Composición `SinDormir`, 7 escenas. Dirección artística "Insomnio fluorescente" con cierre de amanecer.
- Primer episodio corto (~28 s ≈ 82 palabras con la voz Drama 3). Reutiliza `Sala` (Home), `Brain`, `Sky`, `GodRays`, `HumanRig`.
- Versión larga `sin-dormir-largo` (62,6 s, composición `SinDormirLargo`): reutiliza las escenas de la corta re-ancladas con un mapa de palabras (índice viejo → nuevo, función `remap` en Episode.tsx) + escena nueva `S06Cafe`. Técnica útil para alargar o acortar cualquier episodio sin reescribir escenas.

## 2026-11-26 · Episodio huevo-prohibido (27,8 s)
- Composición `HuevoProhibido`, 7 escenas. Dirección artística "Aduana de caramelo". Productos genéricos (sin marcas). Reutiliza `Conveyor`, `Stamp`, `SourceTag`.
- Evitar `foreignObject` dentro de SVG: dibujar las piezas como `<g>` (CapsuleG, ToyG).

## 2026-11-26 · Episodio sueno-comer (31,8 s)
- Composición `SuenoComer`, 6 escenas. Dirección artística "Siesta de sobremesa". Pieza nueva: `anatomy/Stomach.tsx`.
- Persona acostada en el sofá: `Person` con `rot={-90}` (gira sobre los pies), s ≈ 0.46, pies en x≈600, y≈770 de la `Sala`.

## 2026-11-26 · Episodio bostezo (27,6 s)
- Composición `Bostezo`, 6 escenas. Dirección artística "Termografía nocturna". Pieza nueva: `characters/Face.tsx` (FaceCloseUp con bostezo, DogHead, yawnCurve).
- No existe la transición `glitch`: usar whip/zoom/iris/drop/fade/wipe.

## 2026-11-26 · Episodio ola-lituya (23,5 s) — primer episodio con el kit 3D
- Todo el video es un clip 3D continuo (`Bay3D`) anclado a words.json (Whisper lo corrige antes de hornear el clip). Agua desplazada por CPU cada fotograma, bosque instanciado que se arranca bajo la marca, holograma de escala.
- Calidad: clips 3D con `--crf=4` (máxima calidad VP8; antes ~0,5 Mbps, se veía pixeleado) y video final con `--crf=14`.
- Etiquetas 3D: esperar `document.fonts.load` (Anton 400) antes de dibujar el canvas. `MeasureLine` usa cajas (no cilindros).

## 2026-11-27 · Episodio autofagia (2:26) — 3D continuo dentro de una célula
- Composición `Autofagia`; clip 3D `autofagia-celula` (tejido → célula → fábrica → fagóforo → lisosoma → reciclaje → levaduras → falla → tejido). Capa 2D: Nobel, publicaciones virales genéricas, sellos.
- Fagóforo = casquete de esfera (`thetaLength` animado). Sin retrato de la persona real.
