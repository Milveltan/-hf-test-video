/**
 * EPISODIO · "El huevo de chocolate prohibido en Estados Unidos" — DROGMAN 7.0 (≈ 28 s).
 * Dirección artística "Aduana de caramelo": azul marino de aduana y papel kraft de expediente contra el brillo del dulce
 * (aluminio con franjas naranja, cápsula amarilla). Sellos de goma rojo/verde. Productos genéricos, sin marcas.
 * Metáfora: la ley mira el papel, y en el papel el juguete nunca está "dentro".
 */
import React from 'react';
import {makeTiming, Word} from '../../dl/timing';
import {SfxCue} from '../../dl/Sfx';
import {EpisodeRunner, SceneDef, episodeFrames} from '../../dl/episode/EpisodeRunner';
import WORDS_JSON from './words.json';
import {P} from './scenes/palette';
import {S01Huevo} from './scenes/S01Huevo';
import {S02Ley} from './scenes/S02Ley';
import {S03Frontera} from './scenes/S03Frontera';
import {S04Super} from './scenes/S04Super';
import {S05Mitades} from './scenes/S05Mitades';
import {S06Ley} from './scenes/S06Ley';
import {S07Papel} from './scenes/S07Papel';

const WORDS = WORDS_JSON as Word[];
const {w} = makeTiming(WORDS);
export const EPISODE_FRAMES = episodeFrames(WORDS, 1.6);

const SCENES: SceneDef[] = [
  {C: S01Huevo, from: 0, to: w(14), out: 'zoom', outLen: 8},
  {C: S02Ley, from: w(14, -2), to: w(19), out: 'whip', outLen: 8},
  {C: S03Frontera, from: w(19, -2), to: w(29), out: 'iris', outLen: 9},
  {C: S04Super, from: w(29, -2), to: w(44), out: 'zoom', outLen: 8},
  {C: S05Mitades, from: w(44, -2), to: w(61), out: 'whip', outLen: 8, dir: -1},
  {C: S06Ley, from: w(61, -2), to: w(70), out: 'fade', outLen: 10},
  {C: S07Papel, from: w(70, -4), to: EPISODE_FRAMES, out: 'none'},
];

const sfx: SfxCue[] = [
  {at: 0, file: 'whoosh', vol: 0.25}, {at: w(4), file: 'stamp', vol: 0.6}, {at: w(4), file: 'impact', vol: 0.35},
  {at: w(11), file: 'riser', vol: 0.25, dur: 30}, {at: w(12), file: 'deadnet_ping', vol: 0.4},
  {at: w(14, -6), file: 'whoosh', vol: 0.3}, {at: w(16), file: 'flap_clatter', vol: 0.35}, {at: w(18, 6), file: 'stamp', vol: 0.35},
  {at: w(19, -6), file: 'whoosh', vol: 0.3}, {at: w(24), file: 'alarm', vol: 0.3, dur: 25}, {at: w(25), file: 'impact', vol: 0.35}, {at: w(26), file: 'tick', vol: 0.3}, {at: w(27), file: 'tick', vol: 0.3},
  {at: w(29, -6), file: 'whoosh', vol: 0.3}, {at: w(35), file: 'reveal_swell', vol: 0.35, dur: 40}, {at: w(41), file: 'flip', vol: 0.5},
  {at: w(44, -6), file: 'whoosh', vol: 0.3}, {at: w(45), file: 'click_ui', vol: 0.5}, {at: w(51), file: 'glitch', vol: 0.3}, {at: w(55), file: 'whoosh', vol: 0.3}, {at: w(59), file: 'reveal_swell', vol: 0.3, dur: 40},
  {at: w(61, -6), file: 'whoosh', vol: 0.25}, {at: w(65), file: 'click_ui', vol: 0.45}, {at: w(69), file: 'stamp', vol: 0.6},
  {at: w(70, -6), file: 'whoosh', vol: 0.25}, {at: w(72), file: 'flip', vol: 0.35}, {at: w(76), file: 'reveal_swell', vol: 0.3, dur: 60},
];

export const Episode: React.FC = () => (
  <EpisodeRunner words={WORDS} scenes={SCENES} sfx={sfx} bg={P.navy} mix={{voice: 'audio/voz-huevo-prohibido.wav', music: 'sfx/music_drone.wav', musicVol: 0.12}} />
);
