/**
 * EPISODIO COMPLETO · "La teoría del internet muerto" — Datologo 7.0 (video de validación).
 * 1080×1200 · 30 fps · duración = audio (≈ 81 s). Cada escena empieza y termina en una palabra de la narración;
 * si Faster-Whisper corrige los tiempos (words.json), todo se reajusta solo.
 */
import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {filmLook} from '../../opus-motion';
import {Captions} from '../../dl/Captions';
import {SfxTrack, SfxCue} from '../../dl/Sfx';
import {makeTiming, Word} from '../../dl/timing';
import {E, prog} from '../../dl/motion';
import {TransitType} from '../../dl/transitions/Transit';
import {EpisodeRunner, SceneDef} from '../../dl/episode/EpisodeRunner';
import {GlitchBands} from '../../dl/transitions/GlitchBands';
import {Flash} from '../../dl/fx/Fx';
import WORDS_JSON from './words.json';
import {P} from './scenes/palette';
import {S1Feed} from './scenes/S1Feed';
import {S2Taller} from './scenes/S2Taller';
import {S4Muerto} from './scenes/S4Muerto';
import {S5Linea} from './scenes/S5Linea';
import {S6Falso} from './scenes/S6Falso';
import {S7Fabrica} from './scenes/S7Fabrica';
import {S9Nadie} from './scenes/S9Nadie';
import {S10Revista} from './scenes/S10Revista';
import {S11IA} from './scenes/S11IA';
import {S13Altman} from './scenes/S13Altman';
import {S14Trafico} from './scenes/S14Trafico';
import {S16Ojo} from './scenes/S16Ojo';
import {S17Final} from './scenes/S17Final';

const WORDS = WORDS_JSON as Word[];
const {w} = makeTiming(WORDS);
export const EPISODE_FRAMES = Math.ceil((WORDS[WORDS.length - 1].e + 0.75) * 30);

type SceneComp = React.FC<{lw: (i: number, off?: number) => number}>;
type Def = {C: SceneComp | 'S1'; from: number; to: number; out: TransitType; outLen?: number; dir?: 1 | -1};

// Escenas ancladas a palabras. `to` = inicio de la siguiente; la salida se solapa unos fotogramas.
const SCENES: Def[] = [
  {C: 'S1', from: 0, to: 124, out: 'none'},
  {C: S2Taller, from: 122, to: 334, out: 'zoom', outLen: 8},
  {C: S4Muerto, from: 332, to: w(38), out: 'none'},
  {C: S5Linea, from: w(38), to: w(47), out: 'whip', outLen: 9},
  {C: S6Falso, from: w(47, -2), to: w(54), out: 'none', outLen: 12},
  {C: S7Fabrica, from: w(54, -2), to: w(66), out: 'zoom', outLen: 8},
  {C: S9Nadie, from: w(66, -2), to: w(72), out: 'drop', outLen: 10},
  {C: S10Revista, from: w(72, -4), to: w(88), out: 'iris', outLen: 10},
  {C: S11IA, from: w(88, -2), to: w(99), out: 'whip', outLen: 8, dir: -1},
  {C: S13Altman, from: w(99, -2), to: w(130), out: 'zoom', outLen: 10},
  {C: S14Trafico, from: w(130, -4), to: w(159), out: 'wipe', outLen: 14},
  {C: S16Ojo, from: w(159, -6), to: w(181), out: 'fade', outLen: 10},
  {C: S17Final, from: w(181, -4), to: EPISODE_FRAMES, out: 'none'},
];

const sfx: SfxCue[] = [
  // bloque piloto (0–14 s)
  {at: w(7, -6), file: 'whoosh', vol: 0.35}, {at: w(11, 2), file: 'flip', vol: 0.3}, {at: w(12, 4), file: 'flip', vol: 0.25},
  {at: w(14, -2), file: 'glitch', vol: 0.35}, {at: 114, file: 'deadnet_glitch', vol: 0.45}, {at: w(16, -2), file: 'flap_clatter', vol: 0.55},
  {at: w(19, -4), file: 'whoosh', vol: 0.4}, {at: w(21, 2), file: 'tick', vol: 0.4}, {at: w(19, 10), file: 'typing', vol: 0.3, dur: 50},
  {at: w(23, 2), file: 'deadnet_ping', vol: 0.3}, {at: w(23, 12), file: 'riser', vol: 0.3, dur: 26}, {at: w(24), file: 'click_ui', vol: 0.6},
  {at: w(28, -4), file: 'tick', vol: 0.25}, {at: w(30, 2), file: 'deadnet_thump', vol: 0.5},
  {at: 332, file: 'impact', vol: 0.35}, {at: w(31, 4), file: 'ecg_beep', vol: 0.25}, {at: w(34, 2), file: 'ecg_beep', vol: 0.25}, {at: w(36, 1), file: 'ecg_beep', vol: 0.25},
  {at: w(37), file: 'ecg_flat', vol: 0.12, dur: 60}, {at: w(37, 2), file: 'deadnet_thump', vol: 0.45},
  // línea de tiempo
  {at: w(40, -4), file: 'tick', vol: 0.3}, {at: w(44, -2), file: 'stamp', vol: 0.35}, {at: w(47, -10), file: 'whoosh', vol: 0.4},
  // comentarios, perfiles, conversaciones → falso
  {at: w(47), file: 'whoosh', vol: 0.3}, {at: w(48), file: 'whoosh', vol: 0.25}, {at: w(49), file: 'whoosh', vol: 0.25},
  {at: w(50), file: 'deadnet_glitch', vol: 0.3}, {at: w(53), file: 'stamp', vol: 0.55},
  // fábrica y gobierno
  {at: w(54, 2), file: 'impact', vol: 0.2}, {at: w(56), file: 'impact', vol: 0.18}, {at: w(58), file: 'impact', vol: 0.18},
  {at: w(60, -2), file: 'riser', vol: 0.3, dur: 50}, {at: w(65), file: 'deadnet_thump', vol: 0.5},
  // feed, revista
  {at: w(69, -6), file: 'whoosh', vol: 0.35}, {at: w(72, 2), file: 'impact', vol: 0.3}, {at: w(82, 4), file: 'tick', vol: 0.35}, {at: w(83, 2), file: 'flip', vol: 0.4},
  // IA, 2025, notificación
  {at: w(88, -2), file: 'reveal_swell', vol: 0.4, dur: 70}, {at: w(93, -4), file: 'tick', vol: 0.3}, {at: w(98, -2), file: 'deadnet_ping', vol: 0.5},
  // Altman
  {at: w(99, -2), file: 'whoosh', vol: 0.3}, {at: w(105, -4), file: 'click_ui', vol: 0.35}, {at: w(105, 4), file: 'typing', vol: 0.2, dur: 26},
  {at: w(110, -6), file: 'deadnet_ping', vol: 0.3}, {at: w(120, -2), file: 'riser', vol: 0.25, dur: 60}, {at: w(128), file: 'deadnet_glitch', vol: 0.3},
  // Thales
  {at: w(130, -4), file: 'flip', vol: 0.35}, {at: w(142), file: 'tick', vol: 0.3}, {at: w(144, 4), file: 'impact', vol: 0.35}, {at: w(148, -4), file: 'whoosh', vol: 0.3},
  {at: w(154, -6), file: 'tick', vol: 0.25}, {at: w(158, -2), file: 'deadnet_thump', vol: 0.45},
  // ojo, ≠, sin pruebas
  {at: w(160, -2), file: 'impact', vol: 0.45}, {at: w(168, -2), file: 'tick', vol: 0.3}, {at: w(177, -2), file: 'glitch', vol: 0.3}, {at: w(177, 2), file: 'stamp', vol: 0.55},
  // final
  {at: w(188, -6), file: 'deadnet_ping', vol: 0.25}, {at: w(190, -2), file: 'riser', vol: 0.3, dur: 40}, {at: w(194, -8), file: 'deadnet_glitch', vol: 0.4},
  {at: w(197), file: 'deadnet_thump', vol: 0.5},
];

export const Episode: React.FC = () => (
  <EpisodeRunner
    words={WORDS}
    scenes={SCENES.map((s) => (s.C === 'S1' ? {...s, C: S1Wrap} : s)) as SceneDef[]}
    sfx={sfx}
    bg={P.void}
    mix={{voice: 'audio/voz-internet-muerto.wav', ambient: 'sfx/deadnet_ambient.wav', ambientVol: 0.28, music: 'sfx/music_drone.wav', musicVol: 0.12}}
    overlays={(frame) => {
      const glitch = prog(frame, w(54, -8), w(54, 4), E.in) * (1 - prog(frame, w(54, 4), w(54, 8)));
      const warmFlash = Math.max(0, 1 - Math.abs(frame - w(72, -2)) / 5) * 0.35;
      const flash332 = Math.max(0, 1 - Math.abs(frame - 334) / 5) * 0.28;
      return (
        <>
          {glitch > 0 && <GlitchBands k={glitch} frame={frame} />}
          <Flash k={warmFlash} color="#FFD7A0" />
          <Flash k={flash332} />
        </>
      );
    }}
  />
);

// la escena 1 recibe el cronómetro global (empieza en 0)
const S1Wrap: React.FC<{lw: (i: number, off?: number) => number}> = () => <S1Feed w={w} />;
