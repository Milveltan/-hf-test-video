/**
 * Datologo 7 · Tiempos de la narración.
 * Las escenas se anclan a ÍNDICES DE PALABRA, no a segundos: si Faster-Whisper corrige los tiempos,
 * todo el video se reajusta solo.
 */
import {FPS} from './motion';

export type Word = {t: string; s: number; e: number};

export const makeTiming = (words: Word[]) => {
  /** fotograma en que empieza la palabra i (con desplazamiento opcional en fotogramas) */
  const w = (i: number, off = 0) => Math.round(words[Math.min(i, words.length - 1)].s * FPS) + off;
  /** fotograma en que termina la palabra i */
  const we = (i: number, off = 0) => Math.round(words[Math.min(i, words.length - 1)].e * FPS) + off;
  return {words, w, we};
};
