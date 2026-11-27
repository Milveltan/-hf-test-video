/**
 * Mundo de la célula (autofagia). Todo anclado a palabras (words.json; Whisper lo corrige antes de hornear el clip).
 * Zonas: tejido (alrededor del origen) · célula protagonista (origen, r = 30) · levaduras (x = 400).
 */
import {camPath} from '../../dl/world3d/kit';
import WORDS from './words.json';

const W = WORDS as {t: string; s: number; e: number}[];
export const wf = (i: number, off = 0) => Math.round(W[Math.min(i, W.length - 1)].s * 30) + off;
export const FRAMES = Math.ceil((W[W.length - 1].e + 1.4) * 30);
export const CELL_R = 30;
export const C1: [number, number, number] = [10, -6, 8];      // basura que se atrapa
export const LYSO: [number, number, number] = [-10, 5, 4];     // lisosoma ("horno")
export const NEWPART: [number, number, number] = [-2, -10, -6]; // pieza que se reconstruye
export const YEAST: [number, number, number] = [400, 0, 0];

export const sm = (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t));
export const span = (f: number, a: number, b: number) => sm((f - a) / Math.max(1, b - a));

export const camAt = camPath([
  {f: 0, pos: [0, 40, 520], look: [0, 0, 0], fov: 45},
  {f: wf(8), pos: [26, 14, 260], look: [0, 0, 0], fov: 45},
  {f: wf(22), pos: [8, 4, 96], look: [0, 0, 0], fov: 45},
  {f: wf(27), pos: [4, 2, 44], look: [0, 0, 0], fov: 50},
  {f: wf(31), pos: [2, 0, 18], look: [6, 0, -4], fov: 58},
  {f: wf(50), pos: [-10, 3, 10], look: [5, 0, -2], fov: 58},
  {f: wf(66), pos: [-12, -2, -6], look: [4, 0, 2], fov: 58},
  {f: wf(85), pos: [6, 6, -14], look: [0, -2, 4], fov: 58},
  {f: wf(102), pos: [16, 2, 12], look: [4, -2, 0], fov: 56},
  {f: wf(112), pos: [18, -1, 20], look: [8, -4, 4], fov: 54},
  {f: wf(120), pos: [17, -4, 19], look: C1, fov: 54},
  {f: wf(136), pos: [15, -5, 16], look: C1, fov: 52},
  {f: wf(150), pos: [15, -4, 15], look: C1, fov: 50},
  {f: wf(157), pos: [-2, 9, 17], look: LYSO, fov: 52},
  {f: wf(162), pos: [-4, 7, 13], look: LYSO, fov: 52},
  {f: wf(168), pos: [-7, 1, 14], look: [-6, -4, -1], fov: 54},
  {f: wf(175), pos: [3, -6, 9], look: NEWPART, fov: 56},
  {f: wf(185), pos: [0, 5, 25], look: [0, 0, 0], fov: 58},
  {f: wf(191), pos: [380, 12, 64], look: YEAST, fov: 50},
  {f: wf(199), pos: [400, 2, 32], look: YEAST, fov: 50},
  {f: wf(212), pos: [402, 3, 15], look: [400, 0, 0], fov: 50},
  {f: wf(220), pos: [420, 6, 56], look: [421, 2, 0], fov: 50},
  {f: wf(226), pos: [44, 18, 92], look: [0, 0, 0], fov: 50},
  {f: wf(236), pos: [30, 6, 62], look: [0, 0, 0], fov: 50},
  {f: wf(243), pos: [10, 1, 20], look: [0, -2, 0], fov: 58},
  {f: wf(257), pos: [0, 6, 18], look: [2, -2, 0], fov: 58},
  {f: wf(284), pos: [-9, 0, 16], look: [2, -2, 0], fov: 58},
  {f: wf(296), pos: [13, -3, 15], look: C1, fov: 54},
  {f: wf(316), pos: [7, -2, 11], look: [4, -3, 2], fov: 56},
  {f: wf(326), pos: [0, 8, 70], look: [0, 0, 0], fov: 50},
  {f: wf(336), pos: [0, 40, 400], look: [0, 0, 0], fov: 45},
  {f: FRAMES, pos: [0, 30, 300], look: [0, 0, 0], fov: 45},
]);
