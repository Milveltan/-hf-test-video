/**
 * PILOTO Datologo 7.0 · "La teoría del internet muerto" (primeros 14 s de la narración real).
 * 1080×1200 · 9:10 · 30 fps.
 */
import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {filmLook} from '../../opus-motion';
import {Captions} from '../../dl/Captions';
import {SfxTrack, SfxCue} from '../../dl/Sfx';
import {makeTiming} from '../../dl/timing';
import {E, prog} from '../../dl/motion';
import {S1Feed} from '../internet-muerto/scenes/S1Feed';
import {S2Taller} from '../internet-muerto/scenes/S2Taller';
import {S4Muerto} from '../internet-muerto/scenes/S4Muerto';
import {WORDS} from './words';
import {P} from '../internet-muerto/scenes/palette';

export const PILOT_FRAMES = 444;
const {w} = makeTiming(WORDS);

const S2_FROM = 122;
const S4_FROM = 332;

const sfx: SfxCue[] = [
  {at: w(7, -6), file: 'whoosh', vol: 0.35},
  {at: w(11, 2), file: 'flip', vol: 0.3},
  {at: w(12, 4), file: 'flip', vol: 0.25},
  {at: w(14, -2), file: 'glitch', vol: 0.35},
  {at: 114, file: 'deadnet_glitch', vol: 0.45},
  {at: w(16, -2), file: 'flap_clatter', vol: 0.55},
  {at: w(19, -4), file: 'whoosh', vol: 0.4},
  {at: w(21, 2), file: 'tick', vol: 0.4},
  {at: w(19, 10), file: 'typing', vol: 0.3, dur: 50},
  {at: w(23, 2), file: 'deadnet_ping', vol: 0.3},
  {at: w(23, 12), file: 'riser', vol: 0.3, dur: 26},
  {at: w(24), file: 'click_ui', vol: 0.6},
  {at: w(24, 4), file: 'deadnet_ping', vol: 0.25},
  {at: w(28, -4), file: 'tick', vol: 0.25},
  {at: w(28, 3), file: 'tick', vol: 0.2},
  {at: w(30, 2), file: 'deadnet_thump', vol: 0.5},
  {at: S4_FROM, file: 'impact', vol: 0.35},
  {at: S4_FROM + 4, file: 'ecg_beep', vol: 0.25},
  {at: w(34, 2), file: 'ecg_beep', vol: 0.25},
  {at: w(36, 1), file: 'ecg_beep', vol: 0.25},
  {at: w(37), file: 'ecg_flat', vol: 0.12, dur: 66},
  {at: w(37, 2), file: 'deadnet_thump', vol: 0.45},
];

export const Piloto: React.FC = () => {
  const frame = useCurrentFrame();
  const flash = interpolate(frame, [S4_FROM - 2, S4_FROM, S4_FROM + 7], [0, 0.28, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const s3Whip = prog(frame, S4_FROM - 7, S4_FROM + 1, E.in);
  const endFade = prog(frame, PILOT_FRAMES - 7, PILOT_FRAMES - 1, E.inOut);
  return (
    <AbsoluteFill style={{background: P.void}}>
      <Sequence durationInFrames={S2_FROM + 6}>
        <S1Feed w={w} />
      </Sequence>
      <Sequence from={S2_FROM} durationInFrames={S4_FROM - S2_FROM + 2}>
        <AbsoluteFill style={{opacity: prog(frame, S2_FROM, S2_FROM + 5, E.linear), transform: `scale(${1 + 0.6 * s3Whip})`, filter: s3Whip > 0 ? `blur(${s3Whip * 10}px)` : undefined}}>
          <S2Taller lw={(i, off = 0) => w(i, off) - S2_FROM} />
        </AbsoluteFill>
      </Sequence>
      <Sequence from={S4_FROM}>
        <S4Muerto lw={(i, off = 0) => w(i, off) - S4_FROM} />
      </Sequence>

      {/* acabado de película (Opus film-look en modo overlay): grano, viñeta, aberración */}
      <AbsoluteFill style={{pointerEvents: 'none'}}>
        <filmLook.component {...filmLook.defaultProps} overlay grain={0.07} vignette={0.32} bloom={0} flare={false} letterbox="off" weave={0.3} push={0} fringe={1.2} />
      </AbsoluteFill>
      <AbsoluteFill style={{background: '#FFFFFF', opacity: flash, mixBlendMode: 'screen'}} />

      <Captions words={WORDS} bottom={64} size={60} />
      <AbsoluteFill style={{background: '#000', opacity: endFade}} />

      <Audio src={staticFile('audio/voz-piloto.wav')} volume={1} />
      <Audio src={staticFile('sfx/deadnet_ambient.wav')} volume={(f) => 0.32 * Math.min(1, f / 15)} />
      <Audio src={staticFile('sfx/music_drone.wav')} volume={0.12} />
      <SfxTrack cues={sfx} />
    </AbsoluteFill>
  );
};
