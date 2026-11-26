# Eficiencia de uso (objetivo permanente) — DROGMAN 7.0
Meta: gastar el mínimo del límite de uso de Claude **sin bajar la calidad**. Lo ahorrado se invierte en composición y animación.

## Reparto de modelos
| Tarea | Modelo |
|---|---|
| Producción habitual de un episodio con piezas existentes (narración aprobada → escenas → validación → entrega) | **Sonnet** |
| Correcciones por escena, títulos, descripción SEO | **Sonnet** |
| Arquitectura, piezas nuevas complejas (personajes, sistemas), cambios de workflow, dirección artística de un tema nuevo, auditorías | **Opus** |
Si Sonnet necesita una pieza que no existe y es compleja, la construye en versión simple y anota en CAMBIOS.md «pendiente de mejora (Opus)».

## Reglas de lectura (contexto mínimo)
1. Leer **solo** CLAUDE.md al arrancar. Abrir otros docs únicamente cuando la tarea lo pida.
2. Catálogo: buscar con `grep -n "<palabra>" d7/CATALOGO.md`; no leer el catálogo entero ni `hoja.jpg` salvo para elegir estilo.
3. No abrir el código de una pieza del catálogo si su firma basta. Si hace falta, leer solo el rango necesario (`sed -n`/Read con offset).
4. No leer `src/opus-motion/` ni `node_modules/`. No volver a investigar Remotion/Opus: lo resuelto está en docs/.
5. Partir del episodio ejemplo **copiándolo** (cp), no leyéndolo completo.

## Reglas de ejecución
- Clonar con `--depth 1 -b datologo-7`; `npm ci` una vez por sesión.
- Validación: `node tools/check.mjs` (6 s) — no correr `tsc` aparte.
- QA visual: **una** hoja por pasada con 8–12 fotogramas (`tools/qa-stills.mjs`), máx. 2–3 pasadas por episodio; en correcciones, solo fotogramas de la escena tocada.
- Nunca renderizar el video completo ni clips 3D localmente (lo hace GitHub; los clips se reutilizan).
- Agrupar comandos en una sola llamada; no repetir comprobaciones que el workflow ya hace (check, hoja de control, sync).
- Entregar por `git push` (sin ZIP intermedio cuando hay permiso).

## Respuestas al usuario
Breves y estructuradas: qué se entregó, enlace, pendientes. Sin repetir el contenido de archivos ni narrar pasos.

## Calidad intocable
La revisión artística de docs/CALIDAD.md no se omite por ahorrar: es la última línea de calidad.
