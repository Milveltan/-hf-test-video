/**
 * Datologo 7 · Motor de movimiento (funciones puras del fotograma).
 * Todo lo que se mueve en un video sale de aquí: resortes, curvas, inercia, escalonados, trayectorias.
 * Determinista: sin Math.random ni relojes.
 */
import {Easing, interpolate, spring} from 'remotion';

export const FPS = 30;
export const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** progreso 0..1 entre dos fotogramas con easing */
export const prog = (f: number, a: number, b: number, ease: (t: number) => number = E.inOut) =>
  ease(clamp01((f - a) / Math.max(1, b - a)));

/** curvas de easing con nombre de motion design */
export const E = {
  linear: (t: number) => t,
  out: Easing.bezier(0.16, 1, 0.3, 1), // expo-out: entrada decidida que frena
  in: Easing.bezier(0.7, 0, 0.84, 0), // aceleración hacia una salida
  inOut: Easing.bezier(0.83, 0, 0.17, 1), // movimiento de cámara
  snap: Easing.bezier(0.2, 0.9, 0.1, 1.05),
  back: Easing.bezier(0.34, 1.56, 0.64, 1), // overshoot
  sine: Easing.inOut(Easing.sin),
};

/** resorte físico que empieza en `at` */
export const spr = (f: number, at: number, cfg: {damping?: number; stiffness?: number; mass?: number} = {}) =>
  spring({frame: f - at, fps: FPS, config: {damping: cfg.damping ?? 14, stiffness: cfg.stiffness ?? 140, mass: cfg.mass ?? 0.9}});

/** resorte con rebote (para golpes tipográficos) */
export const bounce = (f: number, at: number) => spr(f, at, {damping: 9, stiffness: 180, mass: 0.8});

/** valor animado por keyframes [fotograma, valor] con easing por tramo */
export const keys = (f: number, k: [number, number][], ease: (t: number) => number = E.inOut) => {
  if (f <= k[0][0]) return k[0][1];
  for (let i = 1; i < k.length; i++) {
    if (f <= k[i][0]) return lerp(k[i - 1][1], k[i][1], ease(clamp01((f - k[i - 1][0]) / (k[i][0] - k[i - 1][0]))));
  }
  return k[k.length - 1][1];
};

/**
 * Inercia: suma de "impulsos" (flicks). Cada impulso arranca con velocidad v (px/fotograma)
 * y frena exponencialmente (fricción k). Da el scroll natural de una app.
 */
export const inertia = (f: number, flicks: {at: number; v: number; k?: number}[]) =>
  flicks.reduce((acc, {at, v, k = 0.07}) => (f < at ? acc : acc + (v / k) * (1 - Math.exp(-k * (f - at)))), 0);

/** retraso escalonado para el elemento i de n (orden: desde el centro, desde un lado...) */
export const stagger = (i: number, n: number, each: number, from: 'start' | 'center' | 'end' = 'start') => {
  if (from === 'center') return Math.abs(i - (n - 1) / 2) * each;
  if (from === 'end') return (n - 1 - i) * each;
  return i * each;
};

/** punto sobre una curva Bézier cúbica (trayectorias curvas de cursores y objetos) */
export const bezier = (t: number, p0: [number, number], p1: [number, number], p2: [number, number], p3: [number, number]): [number, number] => {
  const u = 1 - t;
  const a = u * u * u, b = 3 * u * u * t, c = 3 * u * t * t, d = t * t * t;
  return [a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0], a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1]];
};

/** ruido suave determinista 1D (temblor de cámara, parpadeo de luces) */
const h = (n: number) => {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
};
export const noise1 = (x: number, seed = 0) => {
  const i = Math.floor(x), fr = x - i;
  const t = fr * fr * (3 - 2 * fr);
  return lerp(h(i + seed * 101), h(i + 1 + seed * 101), t) * 2 - 1;
};

/** generador pseudoaleatorio con semilla */
export const rng = (seed: number) => {
  let s = seed >>> 0 || 1;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
};

export const ip = interpolate;
