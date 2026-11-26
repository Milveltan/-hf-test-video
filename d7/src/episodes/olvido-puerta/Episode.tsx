/**
 * EPISODIO · "Por qué se te olvida lo que ibas a hacer al entrar a un cuarto" — DROGMAN 7.0.
 * Dirección artística "Cine de hogar": sombras verde-azuladas (cocina) y tungsteno ámbar (sala), como un color grading de película.
 * La vida es una película en capítulos: cada cuarto es un fotograma con perforaciones; la puerta es la claqueta que cierra el capítulo.
 * La idea pendiente es una bombilla amarilla que se queda brillando en el cuarto anterior. Rótulos Anton + Instrument Serif cursiva.
 * Metáfora central: el cerebro archiva cada escena y, al cruzar la puerta, deja la idea en el fotograma de atrás.
 */
import React from 'react';
import {makeTiming, Word} from '../../dl/timing';
import {SfxCue} from '../../dl/Sfx';
import {EpisodeRunner, SceneDef, episodeFrames} from '../../dl/episode/EpisodeRunner';
import WORDS_JSON from './words.json';
import {P} from './scenes/palette';
import {S01Gancho} from './scenes/S01Gancho';
import {S02Tranquilo} from './scenes/S02Tranquilo';
import {S03Capitulos} from './scenes/S03Capitulos';
import {S04Sala} from './scenes/S04Sala';
import {S05Puerta} from './scenes/S05Puerta';
import {S06Archivo} from './scenes/S06Archivo';
import {S07Atras} from './scenes/S07Atras';
import {S08Regresa} from './scenes/S08Regresa';
import {S09Reconoce} from './scenes/S09Reconoce';
import {S10Blanco} from './scenes/S10Blanco';
import {S11Repite} from './scenes/S11Repite';
import {S12Mala} from './scenes/S12Mala';
import {S13Final} from './scenes/S13Final';

const WORDS = WORDS_JSON as Word[];
const {w} = makeTiming(WORDS);
export const EPISODE_FRAMES = episodeFrames(WORDS, 2);

const SCENES: SceneDef[] = [
  {C: S01Gancho, from: 0, to: w(14), out: 'zoom', outLen: 8},
  {C: S02Tranquilo, from: w(14, -2), to: w(27), out: 'whip', outLen: 9},
  {C: S03Capitulos, from: w(27, -2), to: w(45), out: 'zoom', outLen: 8},
  {C: S04Sala, from: w(45, -2), to: w(60), out: 'iris', outLen: 10},
  {C: S05Puerta, from: w(60, -2), to: w(68), out: 'zoom', outLen: 8},
  {C: S06Archivo, from: w(68, -2), to: w(82), out: 'whip', outLen: 9},
  {C: S07Atras, from: w(82, -2), to: w(97), out: 'drop', outLen: 10},
  {C: S08Regresa, from: w(97, -2), to: w(116), out: 'iris', outLen: 10},
  {C: S09Reconoce, from: w(116, -2), to: w(125), out: 'whip', outLen: 9, dir: -1},
  {C: S10Blanco, from: w(125, -2), to: w(139), out: 'wipe', outLen: 12},
  {C: S11Repite, from: w(139, -2), to: w(148), out: 'zoom', outLen: 8},
  {C: S12Mala, from: w(148, -2), to: w(162), out: 'fade', outLen: 10},
  {C: S13Final, from: w(162, -2), to: EPISODE_FRAMES, out: 'none'},
];

const sfx: SfxCue[] = [
  {at: 0, file: 'whoosh', vol: 0.2}, {at: w(6, -4), file: 'riser', vol: 0.25, dur: 40},
  {at: w(10), file: 'power_off', vol: 0.3}, {at: w(10), file: 'impact', vol: 0.3},
  {at: w(11), file: 'tick', vol: 0.35}, {at: w(12), file: 'tick', vol: 0.35}, {at: w(13), file: 'tick', vol: 0.35},
  {at: w(14, -6), file: 'whoosh', vol: 0.3}, {at: w(14), file: 'reveal_swell', vol: 0.25, dur: 50}, {at: w(19), file: 'click_ui', vol: 0.45},
  {at: w(27, -6), file: 'whoosh', vol: 0.3}, {at: w(38), file: 'riser', vol: 0.25, dur: 30},
  {at: w(40), file: 'impact', vol: 0.6}, {at: w(40), file: 'whoosh', vol: 0.5},
  {at: w(43), file: 'flip', vol: 0.35}, {at: w(44), file: 'flip', vol: 0.35}, {at: w(44, 8), file: 'flip', vol: 0.35},
  {at: w(45, -6), file: 'whoosh', vol: 0.3}, {at: w(56), file: 'click_ui', vol: 0.4}, {at: w(59), file: 'stamp', vol: 0.4},
  {at: w(60, -6), file: 'whoosh', vol: 0.25}, {at: w(63), file: 'whoosh', vol: 0.3}, {at: w(67), file: 'stamp', vol: 0.6}, {at: w(67), file: 'impact', vol: 0.35},
  {at: w(68, -6), file: 'whoosh', vol: 0.3}, {at: w(72), file: 'click_ui', vol: 0.4}, {at: w(75), file: 'reveal_swell', vol: 0.3, dur: 40}, {at: w(80), file: 'click_ui', vol: 0.4},
  {at: w(82, -6), file: 'whoosh', vol: 0.3}, {at: w(89), file: 'glitch', vol: 0.25}, {at: w(89), file: 'tick', vol: 0.4}, {at: w(91), file: 'reveal_swell', vol: 0.3, dur: 60},
  {at: w(97), file: 'tick', vol: 0.35}, {at: w(106), file: 'click_ui', vol: 0.4}, {at: w(110), file: 'riser', vol: 0.3, dur: 60},
  {at: w(114), file: 'impact', vol: 0.5}, {at: w(114), file: 'reveal_swell', vol: 0.4, dur: 60},
  {at: w(116, -6), file: 'whoosh', vol: 0.3}, {at: w(119), file: 'click_ui', vol: 0.5}, {at: w(119), file: 'impact', vol: 0.3},
  {at: w(121), file: 'riser', vol: 0.3, dur: 40}, {at: w(124), file: 'reveal_swell', vol: 0.4, dur: 60},
  {at: w(125, -6), file: 'whoosh', vol: 0.25}, {at: w(132), file: 'tick', vol: 0.3},
  {at: w(135), file: 'click_ui', vol: 0.3}, {at: w(136), file: 'click_ui', vol: 0.3}, {at: w(137), file: 'click_ui', vol: 0.3}, {at: w(138), file: 'click_ui', vol: 0.3},
  {at: w(139, -6), file: 'whoosh', vol: 0.25}, {at: w(141), file: 'reveal_swell', vol: 0.25, dur: 60},
  {at: w(148, -6), file: 'whoosh', vol: 0.25}, {at: w(158), file: 'impact', vol: 0.4}, {at: w(160), file: 'stamp', vol: 0.4}, {at: w(161), file: 'click_ui', vol: 0.4},
  {at: w(162, -6), file: 'whoosh', vol: 0.3}, {at: w(163), file: 'flip', vol: 0.5},
  {at: w(168), file: 'reveal_swell', vol: 0.4, dur: 80}, {at: w(175), file: 'breath_in', vol: 0.25},
];

export const Episode: React.FC = () => (
  <EpisodeRunner
    words={WORDS}
    scenes={SCENES}
    sfx={sfx}
    bg={P.night}
    mix={{voice: 'audio/voz-olvido-puerta.wav', music: 'sfx/music_drone.wav', musicVol: 0.12}}
  />
);
