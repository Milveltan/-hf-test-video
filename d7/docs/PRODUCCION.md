# Flujo de producción DROGMAN 7.0

## Pasos
1. **Tema** (usuario) → **narración** (Claude) según `DIRECCION_CREATIVA.md` §0: gancho hablado, promesa, progresión, cierre claro, 140–160 palabras, lenguaje cotidiano sin cifras ni tecnicismos, con etiquetas de Fish Audio. Se aprueba antes de seguir.
2. Usuario genera la voz en Fish Audio y entrega **MP3 + texto exacto**.
3. Claude:
   1. Crea `src/episodes/<slug>/` copiando la estructura de `internet-muerto/` (Episode.tsx, scenes/, palette.ts, script.txt).
   2. Voz: `ffmpeg -i voz.mp3 -af loudnorm=I=-16:TP=-1.5:LRA=11 -ar 48000 -ac 1 public/audio/voz-<slug>.wav`.
   3. Tiempos provisionales: `words.json` con estimación (GitHub los corrige con Faster-Whisper: `sync: true`).
   4. Dirección artística: `scenes/palette.ts` + 3–5 líneas al inicio de Episode.tsx (paleta, materiales, luz, tipografía, metáfora central).
   5. Mapa de escenas en Episode.tsx (`EpisodeRunner`: escena, palabra inicio/fin, salida, efectos). Variar transiciones.
   6. Escenas: piezas del catálogo + coreografía propia. Lo nuevo reutilizable → `src/dl/` + catálogo.
   7. `node tools/check.mjs` → `node tools/qa-stills.mjs <Comp> <fotogramas>` → revisión artística (CALIDAD.md) → corregir.
   8. `episode.json`: slug, composition, voice, script, `sync: true`, qaFrames.
4. **Entrega** (una sola acción para el usuario):
   - Con permiso de escritura: `git push` a `datologo-7` → el render arranca solo. Usuario descarga de Actions → Artifacts → `datologo7-video`.
   - Sin permiso: `datologo7.zip` (contenido de `d7/` sin node_modules/out) → usuario lo sube en https://github.com/Milveltan/-hf-test-video/upload/datologo-7.
5. GitHub: validación → clips 3D (si faltan) → sync Whisper → render rápido → hoja de control → artefacto → guarda código, clips y registros en la rama.
6. Claude entrega además: descripción SEO (frase de búsqueda 25–45 caracteres + 2 hashtags) y 5 títulos gancho (MAYÚSCULAS, 3–7 palabras, con tema).

## Correcciones por escena
Cada escena es un archivo (`scenes/SNN*.tsx`). Una corrección toca solo ese archivo; `check.mjs` + 2–4 fotogramas de esa escena; push.

## Guardar mejoras
Todo lo que esté en `d7/` al hacer push queda en la rama (el workflow además guarda `public/clips/` y `registros/`). Registrar el cambio en `docs/CAMBIOS.md`.
