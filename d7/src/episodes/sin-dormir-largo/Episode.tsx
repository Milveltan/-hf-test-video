/**
 * EPISODIO · "Qué pasa en tu cuerpo cuando no duermes en 24 horas" — versión larga (≈ 62 s). DROGMAN 7.0.
 * Misma dirección artística "Insomnio fluorescente" que la versión corta (sin-dormir); escenas copiadas y re-ancladas
 * con un mapa de palabras (índice viejo → nuevo) + escena nueva S06Cafe (batería en rojo, el café solo la maquilla).
 */
import React from 'react';
import {makeTiming, Word} from '../../dl/timing';
import {SfxCue} from '../../dl/Sfx';
import {EpisodeRunner, SceneDef, SceneComp, episodeFrames} from '../../dl/episode/EpisodeRunner';
import WORDS_JSON from './words.json';
import {P} from './scenes/palette';
import {S01Gancho} from './scenes/S01Gancho';
import {S02Niebla} from './scenes/S02Niebla';
import {S03Apagones} from './scenes/S03Apagones';
import {S04Microsueno} from './scenes/S04Microsueno';
import {S05Animo} from './scenes/S05Animo';
import {S06Cafe} from './scenes/S06Cafe';
import {S06Peor} from './scenes/S06Peor';
import {S07Reinicia} from './scenes/S07Reinicia';

const WORDS = WORDS_JSON as Word[];
const {w} = makeTiming(WORDS);
export const EPISODE_FRAMES = episodeFrames(WORDS, 1.6);

/** Índices de la versión corta → índices de esta narración (interpolado entre anclas). */
const ANCHORS: [number, number][] = [[0, 0], [5, 5], [11, 18], [12, 19], [13, 20], [16, 23], [18, 25], [19, 33], [21, 35], [26, 40], [27, 45], [30, 52], [36, 58],
  [37, 59], [38, 61], [43, 66], [44, 67], [48, 71], [49, 78], [52, 82], [54, 84], [56, 94], [57, 95], [59, 98], [60, 142], [68, 151], [70, 153], [73, 156],
  [74, 157], [75, 158], [76, 161], [77, 164], [79, 168], [80, 170], [81, 172]];
const remap = (i: number) => {
  for (let k = 0; k < ANCHORS.length - 1; k++) {
    const [a0, b0] = ANCHORS[k], [a1, b1] = ANCHORS[k + 1];
    if (i <= a1) return Math.round(b0 + ((i - a0) / (a1 - a0)) * (b1 - b0));
  }
  return ANCHORS[ANCHORS.length - 1][1];
};
const R = (C: SceneComp): SceneComp => ({lw}) => <C lw={(i, off) => lw(remap(i), off)} />;

const SCENES: SceneDef[] = [
  {C: R(S01Gancho), from: 0, to: w(20), out: 'zoom', outLen: 8},
  {C: R(S02Niebla), from: w(20, -2), to: w(45), out: 'fade', outLen: 8},
  {C: R(S03Apagones), from: w(45, -2), to: w(59), out: 'none'},
  {C: R(S04Microsueno), from: w(59), to: w(78), out: 'whip', outLen: 8},
  {C: R(S05Animo), from: w(78, -2), to: w(107), out: 'iris', outLen: 9},
  {C: S06Cafe, from: w(107, -2), to: w(142), out: 'fade', outLen: 10},
  {C: R(S06Peor), from: w(142, -2), to: w(161), out: 'fade', outLen: 10},
  {C: R(S07Reinicia), from: w(161, -4), to: EPISODE_FRAMES, out: 'none'},
];

const sfx: SfxCue[] = [
  {at: 0, file: 'tick', vol: 0.35}, {at: 8, file: 'tick', vol: 0.35}, {at: 16, file: 'tick', vol: 0.35}, {at: 2, file: 'riser', vol: 0.25, dur: 35},
  {at: w(5), file: 'impact', vol: 0.45}, {at: w(18), file: 'heartbeat', vol: 0.45}, {at: w(19, 10), file: 'heartbeat', vol: 0.45},
  {at: w(20, -6), file: 'whoosh', vol: 0.3}, {at: w(23), file: 'underwater', vol: 0.25, dur: 120}, {at: w(33), file: 'flip', vol: 0.35},
  {at: w(45, -6), file: 'whoosh', vol: 0.25}, {at: w(52), file: 'power_off', vol: 0.2}, {at: w(55), file: 'glitch', vol: 0.25}, {at: w(58), file: 'deadnet_thump', vol: 0.5},
  {at: w(61), file: 'stamp', vol: 0.35}, {at: w(66), file: 'breath_in', vol: 0.3}, {at: w(67, 6), file: 'impact', vol: 0.5}, {at: w(67, 6), file: 'gasp', vol: 0.4},
  {at: w(78, -6), file: 'whoosh', vol: 0.3}, {at: w(83), file: 'click_ui', vol: 0.4}, {at: w(84), file: 'alarm', vol: 0.3, dur: 25}, {at: w(86), file: 'click_ui', vol: 0.4}, {at: w(88), file: 'click_ui', vol: 0.4},
  {at: w(97), file: 'reveal_swell', vol: 0.3, dur: 40},
  {at: w(107, -6), file: 'whoosh', vol: 0.25}, {at: w(110), file: 'ecg_beep', vol: 0.35}, {at: w(116), file: 'alarm', vol: 0.25, dur: 20},
  {at: w(117, 14), file: 'impact', vol: 0.45}, {at: w(121), file: 'glitch', vol: 0.3}, {at: w(126), file: 'reveal_swell', vol: 0.3, dur: 40}, {at: w(140), file: 'deadnet_thump', vol: 0.45},
  {at: w(142, -6), file: 'whoosh', vol: 0.25}, {at: w(153), file: 'click_ui', vol: 0.4}, {at: w(156), file: 'click_ui', vol: 0.4}, {at: w(158), file: 'ecg_beep', vol: 0.4},
  {at: w(161, -6), file: 'whoosh', vol: 0.25}, {at: w(164), file: 'breath_in', vol: 0.3}, {at: w(168), file: 'reveal_swell', vol: 0.45, dur: 80},
];

export const Episode: React.FC = () => (
  <EpisodeRunner words={WORDS} scenes={SCENES} sfx={sfx} bg={P.night} mix={{voice: 'audio/voz-sin-dormir-largo.wav', music: 'sfx/music_drone.wav', musicVol: 0.12}} />
);
