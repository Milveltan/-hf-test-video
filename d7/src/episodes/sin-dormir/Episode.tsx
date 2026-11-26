/**
 * EPISODIO · "Qué pasa en tu cuerpo cuando no duermes en 24 horas" — DROGMAN 7.0 (≈ 28 s).
 * Dirección artística "Insomnio fluorescente": madrugada de pantalla (azul monitor, verde fluorescente), reloj ámbar,
 * alarma coral; el cierre rompe con un amanecer cálido. Metáfora: el cuerpo y el cerebro como baterías que solo el sueño recarga.
 * Rótulos Anton + Instrument Serif cursiva.
 */
import React from 'react';
import {makeTiming, Word} from '../../dl/timing';
import {SfxCue} from '../../dl/Sfx';
import {EpisodeRunner, SceneDef, episodeFrames} from '../../dl/episode/EpisodeRunner';
import WORDS_JSON from './words.json';
import {P} from './scenes/palette';
import {S01Gancho} from './scenes/S01Gancho';
import {S02Niebla} from './scenes/S02Niebla';
import {S03Apagones} from './scenes/S03Apagones';
import {S04Microsueno} from './scenes/S04Microsueno';
import {S05Animo} from './scenes/S05Animo';
import {S06Peor} from './scenes/S06Peor';
import {S07Reinicia} from './scenes/S07Reinicia';

const WORDS = WORDS_JSON as Word[];
const {w} = makeTiming(WORDS);
export const EPISODE_FRAMES = episodeFrames(WORDS, 1.6);

const SCENES: SceneDef[] = [
  {C: S01Gancho, from: 0, to: w(13), out: 'zoom', outLen: 8},
  {C: S02Niebla, from: w(13, -2), to: w(27), out: 'fade', outLen: 8},
  {C: S03Apagones, from: w(27, -2), to: w(37), out: 'none'},
  {C: S04Microsueno, from: w(37), to: w(49), out: 'whip', outLen: 8},
  {C: S05Animo, from: w(49, -2), to: w(60), out: 'iris', outLen: 9},
  {C: S06Peor, from: w(60, -2), to: w(76), out: 'fade', outLen: 10},
  {C: S07Reinicia, from: w(76, -4), to: EPISODE_FRAMES, out: 'none'},
];

const sfx: SfxCue[] = [
  {at: 0, file: 'tick', vol: 0.35}, {at: 8, file: 'tick', vol: 0.35}, {at: 16, file: 'tick', vol: 0.35}, {at: 2, file: 'riser', vol: 0.25, dur: 35},
  {at: w(5), file: 'impact', vol: 0.45}, {at: w(11), file: 'heartbeat', vol: 0.45}, {at: w(12, 10), file: 'heartbeat', vol: 0.45},
  {at: w(13, -6), file: 'whoosh', vol: 0.3}, {at: w(16), file: 'underwater', vol: 0.25, dur: 90}, {at: w(19), file: 'flip', vol: 0.35},
  {at: w(27, -6), file: 'whoosh', vol: 0.25}, {at: w(30), file: 'power_off', vol: 0.2}, {at: w(33), file: 'glitch', vol: 0.25}, {at: w(36), file: 'deadnet_thump', vol: 0.5},
  {at: w(38), file: 'stamp', vol: 0.35}, {at: w(43), file: 'breath_in', vol: 0.3}, {at: w(44, 6), file: 'impact', vol: 0.5}, {at: w(44, 6), file: 'gasp', vol: 0.4},
  {at: w(49, -6), file: 'whoosh', vol: 0.3}, {at: w(53), file: 'click_ui', vol: 0.4}, {at: w(54), file: 'alarm', vol: 0.3, dur: 25}, {at: w(56), file: 'click_ui', vol: 0.4},
  {at: w(58), file: 'reveal_swell', vol: 0.3, dur: 40},
  {at: w(60, -6), file: 'whoosh', vol: 0.25}, {at: w(70), file: 'click_ui', vol: 0.4}, {at: w(73), file: 'click_ui', vol: 0.4}, {at: w(75), file: 'ecg_beep', vol: 0.4},
  {at: w(76, -6), file: 'whoosh', vol: 0.25}, {at: w(77), file: 'breath_in', vol: 0.3}, {at: w(79), file: 'reveal_swell', vol: 0.45, dur: 80},
];

export const Episode: React.FC = () => (
  <EpisodeRunner words={WORDS} scenes={SCENES} sfx={sfx} bg={P.night} mix={{voice: 'audio/voz-sin-dormir.wav', music: 'sfx/music_drone.wav', musicVol: 0.12}} />
);
