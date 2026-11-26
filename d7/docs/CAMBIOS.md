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
