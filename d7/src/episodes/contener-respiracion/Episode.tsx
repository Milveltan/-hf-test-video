/**
 * EPISODIO · "Lo que pasa en tu cuerpo cuando contienes la respiración" — DROGMAN 7.0.
 * Dirección artística "Abismo fisiológico": el cuerpo como océano nocturno; O₂ turquesa bioluminiscente, CO₂ ámbar→carmesí.
 * Luz desde arriba como bajo el agua, materiales translúcidos (rayos X). Rótulos Barlow Semi Condensed + instrumentos en mono.
 * Metáfora central: una cuenta regresiva interna (medidores O₂/CO₂) que el cuerpo resuelve sin pedir permiso.
 */
import React from 'react';
import {makeTiming, Word} from '../../dl/timing';
import {E, keys, prog} from '../../dl/motion';
import {SfxCue} from '../../dl/Sfx';
import {TransitType} from '../../dl/transitions/Transit';
import {EpisodeRunner, SceneDef, episodeFrames} from '../../dl/episode/EpisodeRunner';
import {Flash} from '../../dl/fx/Fx';
import WORDS_JSON from './words.json';
import {P} from './scenes/palette';
import {Gauges} from './scenes/common';
import {S01Gancho} from './scenes/S01Gancho';
import {S02RayosX} from './scenes/S02RayosX';
import {S03Celula} from './scenes/S03Celula';
import {S04Acido} from './scenes/S04Acido';
import {S05Alarma} from './scenes/S05Alarma';
import {S06Exceso} from './scenes/S06Exceso';
import {S07Diafragma, spasmsAt} from './scenes/S07Diafragma';
import {S08Corazon} from './scenes/S08Corazon';
import {S09Vasos} from './scenes/S09Vasos';
import {S10Bazo} from './scenes/S10Bazo';
import {S11Ballenas} from './scenes/S11Ballenas';
import {S12Apagado} from './scenes/S12Apagado';
import {S13Respira} from './scenes/S13Respira';
import {S14Final} from './scenes/S14Final';

const WORDS = WORDS_JSON as Word[];
const {w} = makeTiming(WORDS);
export const EPISODE_FRAMES = episodeFrames(WORDS);

const SCENES: SceneDef[] = [
  {C: S01Gancho, from: 0, to: w(11), out: 'none'},
  {C: S02RayosX, from: w(11, -2), to: w(19), out: 'zoom', outLen: 8},
  {C: S03Celula, from: w(19, -2), to: w(29), out: 'whip', outLen: 9},
  {C: S04Acido, from: w(29, -2), to: w(41), out: 'drop', outLen: 10},
  {C: S05Alarma, from: w(41, -4), to: w(55), out: 'iris', outLen: 10},
  {C: S06Exceso, from: w(55, -2), to: w(71), out: 'wipe', outLen: 12},
  {C: S07Diafragma, from: w(71, -4), to: w(86), out: 'zoom', outLen: 8},
  {C: S08Corazon, from: w(86, -2), to: w(99), out: 'fade', outLen: 10},
  {C: S09Vasos, from: w(99, -4), to: w(114), out: 'whip', outLen: 9, dir: -1},
  {C: S10Bazo, from: w(114, -2), to: w(125), out: 'drop', outLen: 10},
  {C: S11Ballenas, from: w(125, -4), to: w(140), out: 'iris', outLen: 10},
  {C: S12Apagado, from: w(140, -2), to: w(155), out: 'none'},
  {C: S13Respira, from: w(155), to: w(165), out: 'fade', outLen: 12},
  {C: S14Final, from: w(165, -4), to: EPISODE_FRAMES, out: 'none'},
];

const spasms = spasmsAt((i, off = 0) => w(i, off));
const beats = (a: number, b: number, every: number) => Array.from({length: Math.max(0, Math.floor((b - a) / every))}, (_, i) => a + Math.round(i * every));

const sfx: SfxCue[] = [
  {at: 0, file: 'breath_in', vol: 0.5}, {at: w(5, -2), file: 'impact', vol: 0.2},
  {at: w(11, 2), file: 'riser', vol: 0.25, dur: 40}, {at: w(17), file: 'tick', vol: 0.4}, {at: w(18), file: 'tick', vol: 0.4},
  {at: w(19, -6), file: 'whoosh', vol: 0.35}, {at: w(25, -2), file: 'deadnet_ping', vol: 0.2},
  {at: w(29, -6), file: 'whoosh', vol: 0.35}, {at: w(40), file: 'reveal_swell', vol: 0.3, dur: 50},
  {at: w(41, -6), file: 'whoosh', vol: 0.3}, {at: w(48), file: 'ecg_beep', vol: 0.25}, {at: w(50), file: 'ecg_beep', vol: 0.25},
  {at: w(54, -3), file: 'alarm', vol: 0.4}, {at: w(54, -2), file: 'impact', vol: 0.45},
  {at: w(55, -6), file: 'whoosh', vol: 0.3}, {at: w(66), file: 'riser', vol: 0.3, dur: 50}, {at: w(70, -2), file: 'stamp', vol: 0.55},
  ...spasms.map((at) => ({at, file: 'spasm', vol: 0.6})),
  {at: w(86, -2), file: 'alarm', vol: 0.18}, {at: w(89, -2), file: 'typing', vol: 0.25, dur: 30},
  ...beats(w(92), w(95), 21).map((at) => ({at, file: 'heartbeat', vol: 0.5})), ...[w(95, 6), w(97), w(98, 14)].map((at) => ({at, file: 'heartbeat', vol: 0.5})),
  {at: w(99, -4), file: 'whoosh', vol: 0.3}, {at: w(103), file: 'deadnet_thump', vol: 0.3},
  {at: w(114, -4), file: 'whoosh', vol: 0.3}, {at: w(118), file: 'impact', vol: 0.3}, {at: w(118, 4), file: 'reveal_swell', vol: 0.25, dur: 40},
  {at: w(125, -4), file: 'underwater', vol: 0.5, dur: 470}, {at: w(138), file: 'riser', vol: 0.2, dur: 50},
  ...beats(w(140), w(153), 24).map((at) => ({at, file: 'heartbeat', vol: 0.6})),
  {at: w(153, 2), file: 'power_off', vol: 0.55},
  {at: w(160, -4), file: 'gasp', vol: 0.7}, {at: w(160, -2), file: 'impact', vol: 0.25}, {at: w(163, 10), file: 'breath_in', vol: 0.3},
  {at: w(176), file: 'breath_in', vol: 0.35}, {at: w(176, 6), file: 'reveal_swell', vol: 0.3, dur: 60},
];

export const Episode: React.FC = () => (
  <EpisodeRunner
    words={WORDS}
    scenes={SCENES}
    sfx={sfx}
    bg={P.void}
    mix={{voice: 'audio/voz-contener-respiracion.wav', ambient: 'sfx/body_ambient.wav', ambientVol: 0.28, music: 'sfx/music_drone.wav', musicVol: 0.12}}
    overlays={(frame) => {
      const o2 = keys(frame, [[w(17), 1], [w(55), 0.9], [w(140), 0.8], [w(153), 0.74], [w(160, -2), 0.74], [w(160, 26), 1]], E.inOut);
      const co2 = keys(frame, [[w(17), 0.15], [w(29), 0.3], [w(41), 0.5], [w(55), 0.65], [w(86), 0.75], [w(140), 0.85], [w(153), 0.97], [w(160, -2), 0.97], [w(160, 40), 0.25]], E.inOut);
      const alarm = prog(frame, w(54, -3), w(54, 4)) * (1 - prog(frame, w(160), w(160, 30)));
      const show = prog(frame, w(17, -4), w(17, 8), E.out) * (1 - prog(frame, w(55, -6), w(55, 4)) + prog(frame, w(71, -2), w(71, 8))) * (1 - prog(frame, w(153, 2), w(153, 8)) + prog(frame, w(160), w(160, 10))) * (1 - prog(frame, w(165, -6), w(165, 6)));
      const alarmFlash = Math.max(0, 1 - Math.abs(frame - w(54, 1)) / 6) * 0.3;
      return (
        <>
          <Gauges o2={o2} co2={co2} alarm={alarm} frame={frame} show={Math.max(0, Math.min(1, show))} />
          <Flash k={alarmFlash} color={P.alarm} />
        </>
      );
    }}
  />
);
