# DROGMAN 7.0 — Arranque (leer primero, 1 minuto)
Sistema de producción de videos de DROGMAN (antes Datologo). Motor: **Remotion 4.0.532 + Opus Motion Library (MIT)**.
Rama de trabajo: **`datologo-7`** · respaldo estable: `datologo-7-estable` · sistema anterior (HyperFrames, carpeta `video/`, `main`): **no tocar**.

## Formato oficial
9:10 exacto · **1080 × 1200** · 30 fps · 60–100 s (lo marca el audio) · subtítulos palabra por palabra abajo · voz 1.0, efectos ≈ 0.3–0.5, ambiente ≈ 0.28, música 0.12.

## Dónde está todo (lee SOLO lo que necesites)
| Necesito… | Archivo |
|---|---|
| Qué piezas existen y cómo se usan | `d7/CATALOGO.md` (índice) + `d7/catalog/hoja.jpg` (vista de todas) |
| Flujo completo y entrega al usuario | `d7/docs/PRODUCCION.md` |
| Reglas de render (3D, rendimiento) | `d7/docs/RENDER.md` |
| Control de calidad técnico y artístico | `d7/docs/CALIDAD.md` |
| Ahorro de uso: Sonnet/Opus, lectura mínima | `d7/docs/EFICIENCIA.md` (**leer en cada sesión de producción**) |
| Historial de cambios y mediciones | `d7/docs/CAMBIOS.md` · `d7/registros/` |
| Ejemplo completo de episodio | `d7/src/episodes/internet-muerto/` (Episode.tsx = mapa de escenas) |

## Reglas que no se rompen
1. **Reutilizar antes de crear**: busca en `CATALOGO.md`. Lo nuevo y reutilizable va a `d7/src/dl/<categoría>/`, se añade al catálogo y a `src/catalog/Showcase.tsx`.
2. **Cada tema tiene su propia dirección artística** (paleta, materiales, luz, tipografía de acento). «Internet muerto» es el nivel mínimo, no la plantilla.
3. **Escenas ancladas a palabras** (`lw(i)`), nunca a segundos.
4. **3D real (three.js) solo dentro de `<Clip3D>`** y registrado en `src/clips.ts`. Por defecto: `ParticleForm` (Canvas 2D), CSS 3D y paralaje.
5. **Render definitivo solo en GitHub Actions**. Aquí: `node tools/check.mjs` + hojas de fotogramas (`tools/qa-stills.mjs`), nunca el video completo.
6. Datos reales y fieles a la fuente; cifras siempre con `SourceTag`.
7. El usuario trabaja **solo desde iPhone**: entrega en una sola acción (ver PRODUCCION.md).
8. **Eficiencia permanente**: contexto mínimo, sin lecturas ni comandos redundantes; producción habitual apta para Sonnet, arquitectura para Opus (EFICIENCIA.md). Nunca a costa de la calidad.

## Arranque técnico de una sesión
```bash
git clone --depth 1 -b datologo-7 https://github.com/Milveltan/-hf-test-video && cd ./-hf-test-video/d7 && npm ci
```
(Si tienes permiso de escritura, se publica con `git push`; si no, se entrega `datologo7.zip` — ver PRODUCCION.md.)
