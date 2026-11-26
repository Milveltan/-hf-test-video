/**
 * EPISODIO · "Por qué bostezamos, y por qué se contagia" — DROGMAN 7.0 (≈ 28 s).
 * Dirección artística "Termografía nocturna": laboratorio a oscuras, una luz de contorno por rostro, cerebro en paleta de
 * cámara térmica y aire cian. El contagio es una señal roja que salta de rostro en rostro. Pieza nueva: dl/characters/Face.tsx.
 */
import React from 'react';
import {makeTiming, Word} from '../../dl/timing';
import {SfxCue} from '../../dl/Sfx';
import {EpisodeRunner, SceneDef, episodeFrames} from '../../dl/episode/EpisodeRunner';
import WORDS_JSON from './words.json';
import {P} from './scenes/palette';
import {S01Permiso} from './scenes/S01Permiso';
import {S02Titulo} from './scenes/S02Titulo';
import {S03Termico} from './scenes/S03Termico';
import {S04Contagio} from './scenes/S04Contagio';
import {S05Perro} from './scenes/S05Perro';
import {S06Cierre} from './scenes/S06Cierre';

const WORDS = WORDS_JSON as Word[];
const {w} = makeTiming(WORDS);
export const EPISODE_FRAMES = episodeFrames(WORDS, 1.4);

const SCENES: SceneDef[] = [
  {C: S01Permiso, from: 0, to: w(15), out: 'none'},
  {C: S02Titulo, from: w(15), to: w(17), out: 'zoom', outLen: 8},
  {C: S03Termico, from: w(17, -2), to: w(41), out: 'whip', outLen: 8},
  {C: S04Contagio, from: w(41, -2), to: w(57), out: 'whip', outLen: 8},
  {C: S05Perro, from: w(57, -2), to: w(64), out: 'fade', outLen: 8},
  {C: S06Cierre, from: w(64, -2), to: EPISODE_FRAMES, out: 'none'},
];

const sfx: SfxCue[] = [
  {at: 4, file: 'heartbeat', vol: 0.35}, {at: w(5), file: 'heartbeat', vol: 0.3},
  {at: w(9), file: 'whoosh', vol: 0.35}, {at: w(11), file: 'breath_in', vol: 0.4}, {at: w(13), file: 'breath_in', vol: 0.4},
  {at: w(15), file: 'impact', vol: 0.6}, {at: w(15), file: 'deadnet_thump', vol: 0.4}, {at: w(16) + 4, file: 'reveal_swell', vol: 0.3, dur: 30},
  {at: w(17, -6), file: 'whoosh', vol: 0.3}, {at: w(24), file: 'riser', vol: 0.3, dur: 60}, {at: w(30), file: 'glitch', vol: 0.25},
  {at: w(31), file: 'breath_in', vol: 0.45}, {at: w(35), file: 'whoosh', vol: 0.35}, {at: w(38), file: 'reveal_swell', vol: 0.3, dur: 50},
  {at: w(41, -6), file: 'glitch', vol: 0.35}, {at: w(43), file: 'deadnet_thump', vol: 0.5}, {at: w(46), file: 'breath_in', vol: 0.35},
  {at: w(48), file: 'deadnet_ping', vol: 0.3}, {at: w(50), file: 'deadnet_ping', vol: 0.3}, {at: w(52), file: 'deadnet_ping', vol: 0.3}, {at: w(53), file: 'riser', vol: 0.3, dur: 40},
  {at: w(57, -6), file: 'whoosh', vol: 0.3}, {at: w(59), file: 'deadnet_ping', vol: 0.35}, {at: w(61), file: 'breath_in', vol: 0.35},
  {at: w(64, -6), file: 'whoosh', vol: 0.3}, {at: w(66), file: 'reveal_swell', vol: 0.3, dur: 50}, {at: w(69), file: 'whoosh', vol: 0.3},
  {at: w(73) + 12, file: 'breath_in', vol: 0.4}, {at: w(73) + 26, file: 'impact', vol: 0.45},
];

export const Episode: React.FC = () => (
  <EpisodeRunner words={WORDS} scenes={SCENES} sfx={sfx} bg={P.void} mix={{voice: 'audio/voz-bostezo.wav', music: 'sfx/music_drone.wav', musicVol: 0.12}} />
);
