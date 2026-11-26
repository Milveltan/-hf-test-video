# Datologo 7.0 — Arquitectura (rama experimental `datologo-7`)

Motor: **Remotion 4.0.532** (React → video) + componentes adaptados de **Opus Motion Library 1.2.0** (MIT).
Formato: **1080 × 1200 (9:10) · 30 fps · H.264 · bt709**. Render en GitHub Actions (CPU, sin GPU).
El sistema anterior (HyperFrames, carpeta `video/`, `render.yml`) no se toca.

```
d7/
├─ CATALOGO.md               índice de TODA la biblioteca (leer antes de crear escenas)
├─ registros/                tiempos reales: producción (Claude) y render (GitHub Actions), por episodio
├─ episode.json              qué episodio renderizar (composición, voz, guion, ¿sincronizar?, fotogramas de control)
├─ remotion.config.ts        calidad de salida + fuentes locales
├─ public/
│  ├─ audio/                 voz del episodio (normalizada a −16 LUFS)
│  ├─ sfx/                   efectos propios (sin licencias de terceros)
│  └─ fonts/                 fuentes OFL locales (Montserrat, Anton, Instrument Serif, Space Grotesk, JetBrains Mono…)
├─ src/
│  ├─ Root.tsx               registro de composiciones
│  ├─ dl/                    BIBLIOTECA DATOLOGO (crece con cada video)
│  │  ├─ motion.ts           resortes, easing, inercia, escalonados, Bézier, ruido determinista
│  │  ├─ timing.ts           escenas ancladas a índices de palabra (w(i))
│  │  ├─ Captions.tsx        subtítulos palabra por palabra (solo abajo, un color, "pop")
│  │  ├─ Sfx.tsx             efectos anclados a fotogramas/palabras
│  │  ├─ fonts.ts            carga de fuentes locales
│  │  └─ gfonts/             sustitutos locales de @remotion/google-fonts (render 100 % offline)
│  ├─ opus-motion/           componentes copiados de Opus Motion Library (MIT, ver LICENSE-OPUS-MIT.txt)
│  └─ episodes/<slug>/       escenas del episodio (dirección artística propia) + words.json + script.txt
└─ tools/
   ├─ sync.py                Faster-Whisper → words.json (tiempos reales por palabra)
   ├─ qa-stills.mjs          hoja de control de calidad (fotogramas clave)
   └─ webpack-fonts.mjs      redirección de fuentes
```

## Flujo de producción (10 fases)
1. Análisis de la narración → 2. Dirección artística del tema (paleta, tipografía, materiales) →
3. Guion de escenas y plan de movimiento (cada escena anclada a palabras) → 4. Selección/adaptación de Opus →
5. Recursos extra (ilustraciones IA solo si la narración lo justifica, 4–7 máx.) → 6. Composición en Remotion →
7. Sincronización (Faster-Whisper en Actions) + subtítulos + efectos → 8. Render de prueba →
9. Evaluación visual con hoja de control (y corrección) → 10. Render definitivo.

## Reglas de movimiento
- Cada escena tiene un **objeto protagonista que actúa** (no imágenes con zoom).
- Movimiento con física: resortes (`spr`, `bounce`), inercia (`inertia`), Bézier (`bezier`), escalonados (`stagger`).
- La cámara cuenta algo: paneo que revela, entrada a una pantalla (match-cut), empuje en la tensión.
- Transiciones narrativas y distintas entre sí (glitch, paneo vertical, entrada a pantalla, destello).

## Compatibilidad CPU (pruebas reales, 1080×1200)
52 motions de Opus probadas: **52/52 renderizan** en Chrome sin GPU (SwiftShader).
Velocidad medida con 2 núcleos: SVG/HTML 6–8 fps · redes y partículas 4 fps · three.js 3–4 fps.
En GitHub (4 núcleos) un video de 80 s tarda ≈ 5–9 min. three.js: usar con moderación (1–2 escenas).

## Licencias
- Remotion: gratis para personas y empresas de hasta 3 empleados (también uso comercial). Si Datologo crece a más de 3 empleados, hace falta la licencia de empresa.
- Opus Motion Library: MIT (uso comercial libre conservando el aviso de copyright).
- Fuentes: SIL OFL 1.1. Efectos de sonido: sintetizados por nosotros.
- Ojo: las motions de Opus descargan Google Fonts en cada render; aquí se sustituyen por archivos locales.

## Medición de tiempos (independiente)
- **Producción** (trabajo de Claude, de recibir la narración a entregar el ZIP): `registros/<slug>-produccion.md`.
- **Render** (GitHub Actions): el workflow escribe `registros/<slug>-render.txt` (segundos de sincronización, segundos de render, fps de render, núcleos) y lo guarda en la rama.
- Costo de GitHub: el repositorio es público → los minutos de Actions en runners estándar son gratuitos.

## Regla de render
Render definitivo **solo en GitHub Actions**. En el entorno de Claude solo se hacen hojas de fotogramas sueltos para control de calidad (segundos), nunca el video completo.

## Eficiencia de uso
Objetivo permanente: producción habitual con Sonnet usando los estándares y piezas creados con Opus; lectura y ejecución mínimas. Reglas: `docs/EFICIENCIA.md`.
