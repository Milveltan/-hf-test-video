# Control de calidad DROGMAN 7.0

## 1. Técnico (automático) — `node tools/check.mjs`
Tipos · palabras de script.txt = words.json · índices de palabra en rango · audios/efectos existen · composición registrada · duración vs audio · textos < 28 px (aviso).
En GitHub corre antes del render: si falla, el render no empieza.

## 2. Automático en el motor
- Subtítulos: se miden con `@remotion/layout-utils`; si no caben en el 86 % del ancho se reducen (hasta 62 %) y, si hace falta, pasan a 2 líneas.
- Mínimos de legibilidad en teléfono: textos secundarios ≥ 28–30 px, cifras ≥ 44 px, contraste alto (sombra en rótulos sobre fondos complejos).

## 3. Revisión artística (Claude, con hojas de fotogramas — no se omite)
Por escena, responder SÍ a todo:
- [ ] ¿Hay un **protagonista claro** (personaje/objeto) grande? Personaje narrativo ≥ 45 % del alto del cuadro.
- [ ] ¿El cuadro está **lleno con intención** (3 profundidades: fondo, medio, primer plano)? Sin zonas vacías sin motivo.
- [ ] ¿Hay **luz identificable** (fuente, contorno, sombra de contacto)?
- [ ] ¿Algo **se mueve con intención narrativa** durante toda la escena (no solo zoom)?
- [ ] ¿La escena **cuenta exactamente** lo que dice la narración en ese momento?
- [ ] ¿Textos legibles en un teléfono y fuera de la franja de subtítulos (y > 1000)?
- [ ] ¿La transición de salida es distinta de la anterior y está motivada?
- [ ] ¿La dirección artística corresponde al tema (no a la del episodio anterior)?
Si una escena falla 2 o más puntos: se rediseña antes de entregar.

## 4. Después del render (GitHub)
`qa-sheet.jpg` (fotogramas clave) + `render-report.txt` (tiempos, fps, sincronización ≥ 90 %).
