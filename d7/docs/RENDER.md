# Render en DROGMAN 7.0

## Modo por defecto: rápido (`--gl=angle`)
Todo el episodio se renderiza con `angle`. Es el modo rápido, pero **no puede crear contextos WebGL** en el runner de GitHub (sin GPU).

## 3D real = clip aparte
- Envolver la capa three.js en `<Clip3D id="<slug>-<nombre>" live={<Capa3D/>} />` y registrarla en `src/clips.ts` (id, frames, component, episode).
- El workflow renderiza esos clips **antes** con `--gl=swangle` (WebGL por software) en WebM VP8 con alfa (`yuva420p`) → `public/clips/<id>.webm`, y los guarda en la rama: **la siguiente vez se reutilizan** (forzar con `"rerenderClips": true` en episode.json si cambia la capa).
- En el episodio, `<Clip3D>` usa el WebM (`OffthreadVideo transparent`), así que el render principal nunca toca WebGL.
- El clip ocupa el cuadro completo y se alinea con el fotograma 0 de su escena; las transformaciones de cámara de la escena (escala, posición, opacidad) se aplican encima del clip.
- Limitación: el clip está "horneado" — cambiar sus props exige re-renderizarlo.

## Alternativas sin WebGL (usar primero)
- `ParticleForm` (Canvas 2D con proyección 3D): esfera, toro, hélice/ADN, anillo, galaxia, nube, corazón; morph entre formas.
- CSS 3D (`perspective`, `rotateX/Y`, `preserve-3d`): tarjetas, páginas, planos, feeds.
- Paralaje por capas (`Cam` + `Layer depth`).

## Mediciones (GitHub, 4 núcleos, 1080×1200)
| Configuración | Resultado | Estado |
|---|---|---|
| Todo con `swangle` (internet-muerto, 81 s) | 1859 s · 1.31 fps | ✅ medido |
| `angle` sin WebGL (parcial, 1099 fotogramas) | ≈ 6 fps | ✅ medido (parcial) |
| Híbrido (`angle` + clip 3D) | ver `docs/CAMBIOS.md` | se mide en cada render |
| Clip 3D local (180 fotogramas, 2 núcleos, angle con GPU emulada) | 89 s | ✅ medido local |

## Costos relativos (orientativos)
SVG/HTML simple: bajo · filtros de desenfoque grandes y `feTurbulence` animado: medio · Canvas con miles de partículas: medio · three.js: alto (solo en clip).

## Kit de mundos 3D (`dl/world3d/kit.tsx`) — piloto `piloto-fosa`
- Toma continua con `World3D` + `camPath` (cámara por llaves), `RockSurface`, `Mountain`, `GodRays`, `Drift`, `Label3D`, `MeasureLine`.
- La capa 2D (profundímetro, rótulos) usa la MISMA función de cámara (`world.ts`) para quedar sincronizada.
- ⚠ En el entorno local de Claude el WebGL por software (SwiftShader de /opt/pw-browsers) dibuja solo la mitad de los triángulos
  de cualquier malla (se reproduce con three.js puro). Las partículas y sprites salen bien. Validar las mallas con la hoja de control de GitHub.
