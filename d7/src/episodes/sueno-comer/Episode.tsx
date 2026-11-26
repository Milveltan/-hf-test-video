/**
 * EPISODIO · "Por qué te da sueño después de comer" — DROGMAN 7.0 (≈ 32 s).
 * Dirección artística "Siesta de sobremesa": luz de tarde (miel, terracota, oliva, mantel crema); el sueño llega en lavanda.
 * Metáfora: el cuerpo tiene un selector de modos (alerta ↔ descanso y digestión) y al final cuelga el letrero de OCUPADO.
 */
import React from 'react';
import {makeTiming, Word} from '../../dl/timing';
import {SfxCue} from '../../dl/Sfx';
import {EpisodeRunner, SceneDef, episodeFrames} from '../../dl/episode/EpisodeRunner';
import WORDS_JSON from './words.json';
import {P} from './scenes/palette';
import {S01Pesan} from './scenes/S01Pesan';
import {S02Modo} from './scenes/S02Modo';
import {S03Estomago} from './scenes/S03Estomago';
import {S04Plato} from './scenes/S04Plato';
import {S05Reloj} from './scenes/S05Reloj';
import {S06Ocupado} from './scenes/S06Ocupado';

const WORDS = WORDS_JSON as Word[];
const {w} = makeTiming(WORDS);
export const EPISODE_FRAMES = episodeFrames(WORDS, 1.6);

const SCENES: SceneDef[] = [
  {C: S01Pesan, from: 0, to: w(12), out: 'zoom', outLen: 8},
  {C: S02Modo, from: w(12, -2), to: w(29), out: 'iris', outLen: 9},
  {C: S03Estomago, from: w(29, -2), to: w(48), out: 'whip', outLen: 8},
  {C: S04Plato, from: w(48, -2), to: w(64), out: 'wipe', outLen: 10},
  {C: S05Reloj, from: w(64, -2), to: w(84), out: 'fade', outLen: 10},
  {C: S06Ocupado, from: w(84, -3), to: EPISODE_FRAMES, out: 'none'},
];

const sfx: SfxCue[] = [
  {at: 0, file: 'whoosh', vol: 0.2}, {at: w(7), file: 'breath_in', vol: 0.25}, {at: w(10), file: 'tick', vol: 0.4},
  {at: w(12, -6), file: 'whoosh', vol: 0.3}, {at: w(15), file: 'click_ui', vol: 0.4}, {at: w(22), file: 'riser', vol: 0.25, dur: 30}, {at: w(25), file: 'stamp', vol: 0.4}, {at: w(26), file: 'reveal_swell', vol: 0.3, dur: 50},
  {at: w(29, -6), file: 'whoosh', vol: 0.3}, {at: w(32), file: 'underwater', vol: 0.25, dur: 70}, {at: w(38), file: 'heartbeat', vol: 0.35}, {at: w(42), file: 'heartbeat', vol: 0.3},
  {at: w(48, -6), file: 'whoosh', vol: 0.3}, {at: w(51), file: 'impact', vol: 0.3}, {at: w(55), file: 'flip', vol: 0.35}, {at: w(58), file: 'flip', vol: 0.35}, {at: w(60), file: 'riser', vol: 0.3, dur: 40},
  {at: w(64, -6), file: 'whoosh', vol: 0.25}, {at: w(69), file: 'reveal_swell', vol: 0.25, dur: 60}, {at: w(81), file: 'power_off', vol: 0.25},
  {at: w(84, -6), file: 'whoosh', vol: 0.25}, {at: w(88), file: 'stamp', vol: 0.45}, {at: w(93), file: 'click_ui', vol: 0.4}, {at: w(94), file: 'breath_in', vol: 0.25},
];

export const Episode: React.FC = () => (
  <EpisodeRunner words={WORDS} scenes={SCENES} sfx={sfx} bg={P.night} mix={{voice: 'audio/voz-sueno-comer.wav', music: 'sfx/music_drone.wav', musicVol: 0.12}} />
);
