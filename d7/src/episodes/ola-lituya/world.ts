/**
 * Mundo de la bahía Lituya (1 unidad = 10 m). Compartido por la capa 3D (clip) y la capa 2D.
 * Las llaves de cámara y los eventos se anclan a las palabras (words.json; Whisper lo corrige antes de hornear el clip).
 */
import {camPath} from '../../dl/world3d/kit';
import WORDS from './words.json';

const W = WORDS as {t: string; s: number; e: number}[];
export const wf = (i: number, off = 0) => Math.round(W[Math.min(i, W.length - 1)].s * 30) + off;
export const FRAMES = Math.ceil((W[W.length - 1].e + 1.4) * 30);

export const RUNUP = 52.4;            // 524 m
export const EMPIRE = 44.3;           // 443 m con antena
export const IMPACT: [number, number] = [24, -130];
export const T_SLIDE = wf(7);         // "montaña"
export const T_IMPACT = wf(13);       // "cayó"
export const V_RING = 58 / Math.max(40, wf(24) - wf(13)); // el anillo llega a la ladera oeste en "Arrasó"
export const BOAT_Z = 34;
export const V_BAY = (BOAT_Z + 130) / Math.max(30, wf(38) - T_IMPACT); // llega al barco en "montado"

const sm = (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t));
/** Altura alcanzada por el agua en la ladera oeste (sube rápido y queda la marca). */
export const runupAt = (f: number) => {
  const arrive = T_IMPACT + 52 / V_RING;
  return RUNUP * sm((f - arrive) / 34);
};
/** Superficie del agua en (x, z) en el fotograma f. */
export const waterY = (x: number, z: number, f: number) => {
  let y = Math.sin(x * 0.15 + f * 0.05) * 0.12 + Math.cos(z * 0.11 + f * 0.04) * 0.12;
  const dt = f - T_IMPACT;
  if (dt > 0) {
    const r = Math.hypot(x - IMPACT[0], (z - IMPACT[1]) * 0.8), R = dt * V_RING;
    const A = 26 * Math.exp(-dt / 260) * sm(dt / 10);
    y += A * Math.exp(-Math.pow((r - R) / (r < R ? 5 : 11), 2));
    const zc = IMPACT[1] + dt * V_BAY;
    const B = 13 * sm(dt / 30) * Math.exp(-Math.max(0, dt - 40) / 260);
    y += B * Math.exp(-Math.pow((z - zc) / (z < zc ? 6 : 12), 2)) * (zc > IMPACT[1] + 30 ? 1 : 0);
    y += 3 * Math.exp(-dt / 10) * Math.exp(-Math.pow(r / 6, 2));
  }
  return y;
};
export const camAt = camPath([
  {f: 0, pos: [0, 62, 175], look: [0, 12, -120], fov: 50},
  {f: wf(5), pos: [6, 20, 50], look: [12, 22, -140], fov: 50},
  {f: wf(9), pos: [-22, 26, -40], look: [36, 46, -130], fov: 52},
  {f: wf(15), pos: [-28, 18, -62], look: [20, 6, -130], fov: 55},
  {f: wf(19), pos: [-22, 10, -88], look: [16, 12, -126], fov: 60},
  {f: wf(23), pos: [-20, 34, -60], look: [-8, 12, -118], fov: 60},
  {f: wf(26), pos: [14, 36, -58], look: [-58, 32, -122], fov: 55},
  {f: wf(31), pos: [22, 32, -38], look: [-26, 26, -100], fov: 55},
  {f: wf(34), pos: [52, 20, 44], look: [0, 6, 26], fov: 50},
  {f: wf(40), pos: [46, 18, 56], look: [0, 9, 34], fov: 50},
  {f: wf(44), pos: [70, 120, 130], look: [-20, 12, -90], fov: 50},
  {f: FRAMES, pos: [95, 175, 150], look: [-25, 10, -100], fov: 48},
]);
