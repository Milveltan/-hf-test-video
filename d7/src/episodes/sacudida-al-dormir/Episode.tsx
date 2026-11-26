/**
 * EPISODIO · "La caída que nunca existió" (la sacudida al quedarte dormido) — DROGMAN 7.0.
 * Dirección artística "Vértigo de medianoche": dormitorio cenital bañado de luna índigo; la caída es un vacío violeta con estelas.
 * La lámpara ámbar es la vigilia que se apaga; la alarma del cerebro, rojo coral. Sábanas suaves, madera oscura, cerebro translúcido.
 * Rótulos Anton (golpes) + Instrument Serif (cierre). Metáfora central: el cuerpo como una casa que apaga sus luces
 * mientras el cerebro (la ventana del ático) sigue despierto y confunde el apagado con una caída.
 */
import React from 'react';
import {makeTiming, Word} from '../../dl/timing';
import {SfxCue} from '../../dl/Sfx';
import {EpisodeRunner, SceneDef, episodeFrames} from '../../dl/episode/EpisodeRunner';
import WORDS_JSON from './words.json';
import {P} from './scenes/palette';
import {S01Gancho} from './scenes/S01Gancho';
import {S02Brinco} from './scenes/S02Brinco';
import {S03Cama} from './scenes/S03Cama';
import {S04Casa} from './scenes/S04Casa';
import {S05Cuerpo} from './scenes/S05Cuerpo';
import {S06Cerebro} from './scenes/S06Cerebro';
import {S07Suelta} from './scenes/S07Suelta';
import {S08Cayendo} from './scenes/S08Cayendo';
import {S09Escalera} from './scenes/S09Escalera';
import {S10Alarma} from './scenes/S10Alarma';
import {S11Brinco} from './scenes/S11Brinco';
import {S12Suenos} from './scenes/S12Suenos';
import {S13Causas} from './scenes/S13Causas';
import {S14Mundo} from './scenes/S14Mundo';
import {S15Final} from './scenes/S15Final';

const WORDS = WORDS_JSON as Word[];
const {w} = makeTiming(WORDS);
export const EPISODE_FRAMES = episodeFrames(WORDS, 2);

const SCENES: SceneDef[] = [
  {C: S01Gancho, from: 0, to: w(10), out: 'none'},
  {C: S02Brinco, from: w(10), to: w(21), out: 'none'},
  {C: S03Cama, from: w(21), to: w(43), out: 'iris', outLen: 10},
  {C: S04Casa, from: w(43, -2), to: w(64), out: 'zoom', outLen: 8},
  {C: S05Cuerpo, from: w(64, -2), to: w(72), out: 'zoom', outLen: 8},
  {C: S06Cerebro, from: w(72, -2), to: w(83), out: 'fade', outLen: 10},
  {C: S07Suelta, from: w(83, -4), to: w(97), out: 'whip', outLen: 9},
  {C: S08Cayendo, from: w(97, -2), to: w(108), out: 'drop', outLen: 10},
  {C: S09Escalera, from: w(108, -2), to: w(119), out: 'whip', outLen: 9, dir: -1},
  {C: S10Alarma, from: w(119, -2), to: w(129), out: 'zoom', outLen: 8},
  {C: S11Brinco, from: w(129, -2), to: w(133), out: 'iris', outLen: 10},
  {C: S12Suenos, from: w(133, -2), to: w(150), out: 'wipe', outLen: 12},
  {C: S13Causas, from: w(150, -2), to: w(162), out: 'fade', outLen: 10},
  {C: S14Mundo, from: w(162, -2), to: w(178), out: 'zoom', outLen: 8},
  {C: S15Final, from: w(178, -2), to: EPISODE_FRAMES, out: 'none'},
];

const sfx: SfxCue[] = [
  {at: 0, file: 'breath_in', vol: 0.35}, {at: w(4), file: 'click_ui', vol: 0.5}, {at: w(6, -4), file: 'riser', vol: 0.3, dur: 25},
  {at: w(9, -3), file: 'whoosh', vol: 0.6}, {at: w(9, -2), file: 'impact', vol: 0.35},
  {at: w(14, -2), file: 'impact', vol: 0.7}, {at: w(14, -2), file: 'gasp', vol: 0.6},
  ...[0, 11, 21, 30, 38, 46].map((d) => ({at: w(19) + d, file: 'heartbeat', vol: 0.55})),
  {at: w(38), file: 'reveal_swell', vol: 0.3, dur: 50},
  {at: w(43, -6), file: 'whoosh', vol: 0.3},
  ...[50, 52, 56, 58, 59, 60, 61, 62].map((i) => ({at: w(i), file: 'click_ui', vol: 0.45})),
  {at: w(64, -6), file: 'whoosh', vol: 0.25}, {at: w(66, -2), file: 'power_off', vol: 0.2},
  {at: w(72, -6), file: 'whoosh', vol: 0.3}, {at: w(81, -4), file: 'reveal_swell', vol: 0.25, dur: 40},
  {at: w(83, -8), file: 'whoosh', vol: 0.25}, {at: w(87), file: 'glitch', vol: 0.25}, {at: w(95, -2), file: 'deadnet_thump', vol: 0.5}, {at: w(96, 6), file: 'ecg_beep', vol: 0.4},
  {at: w(99), file: 'riser', vol: 0.3, dur: 60}, {at: w(105, -2), file: 'whoosh', vol: 0.6}, {at: w(106), file: 'stamp', vol: 0.5},
  {at: w(108, -6), file: 'whoosh', vol: 0.3}, {at: w(115, -2), file: 'impact', vol: 0.5},
  {at: w(119, -6), file: 'whoosh', vol: 0.3}, {at: w(121, -3), file: 'alarm', vol: 0.4}, {at: w(123), file: 'spasm', vol: 0.6}, {at: w(128, -2), file: 'impact', vol: 0.4},
  {at: w(132, -2), file: 'impact', vol: 0.7},
  {at: w(133, -4), file: 'underwater', vol: 0.3, dur: 300}, {at: w(140, -2), file: 'whoosh', vol: 0.45}, {at: w(146, -2), file: 'whoosh', vol: 0.45},
  {at: w(156), file: 'flip', vol: 0.5}, {at: w(157), file: 'tick', vol: 0.5}, {at: w(160), file: 'flip', vol: 0.5},
  {at: w(163), file: 'impact', vol: 0.3}, {at: w(166), file: 'reveal_swell', vol: 0.3, dur: 80},
  {at: w(178, -6), file: 'whoosh', vol: 0.25}, {at: w(188, -4), file: 'reveal_swell', vol: 0.25, dur: 50},
  {at: w(197), file: 'breath_in', vol: 0.3}, {at: w(198, 8), file: 'reveal_swell', vol: 0.3, dur: 60},
];

export const Episode: React.FC = () => (
  <EpisodeRunner
    words={WORDS}
    scenes={SCENES}
    sfx={sfx}
    bg={P.night}
    mix={{voice: 'audio/voz-sacudida-al-dormir.wav', ambient: 'sfx/body_ambient.wav', ambientVol: 0.18, music: 'sfx/music_drone.wav', musicVol: 0.12}}
  />
);
