/** Trayectoria de cámara y constantes del piloto (compartidas por la capa 3D y la capa 2D). 1 unidad = 100 m. */
import {camPath} from '../../dl/world3d/kit';
export const FRAMES = 450;
export const DEPTH = 109.2;          // fosa ≈ 10.920 m
export const EVEREST = 88.49;        // 8.849 m
export const MX = 14;                // x del Everest
export const camAt = camPath([
  {f: 0, pos: [0, -1.2, 6], look: [0, 1.5, -12], fov: 60},
  {f: 70, pos: [0, -4, 0], look: [6, -8, -10], fov: 55},
  {f: 160, pos: [-10, -18, 16], look: [MX, -22, 0], fov: 50},
  {f: 250, pos: [-42, -60, 34], look: [MX - 6, -72, 0], fov: 50},
  {f: 330, pos: [-70, -100, 40], look: [-26, -104, 0], fov: 52},
  {f: 360, pos: [-90, -92, 80], look: [0, -86, 0], fov: 52},
  {f: 450, pos: [-150, -52, 175], look: [MX, -56, 0], fov: 48},
]);
export const depthAt = (f: number) => Math.max(0, -camAt(f).pos[1] * 100);
