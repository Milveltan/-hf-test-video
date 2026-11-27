/**
 * EPISODIO · "La ola más alta jamás registrada" (bahía Lituya, 1958) — DROGMAN 7.0, primer episodio con el kit 3D.
 * Dirección artística "Fiordo al anochecer": cielo de verano ártico (azul pizarra → horizonte salmón), bosque oscuro,
 * agua verde petróleo con espuma blanca; la escala se ve con un holograma cian del Empire State y una medida dorada.
 * Toda la imagen es un solo clip 3D continuo (Bay3D); encima: subtítulos, fuente del dato y título final.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {makeTiming, Word} from '../../dl/timing';
import {SfxCue} from '../../dl/Sfx';
import {EpisodeRunner, SceneDef} from '../../dl/episode/EpisodeRunner';
import {Clip3D} from '../../dl/render/Clip3D';
import {SourceTag} from '../../dl/editorial/Editorial';
import {F} from '../../dl/fonts';
import {spr} from '../../dl/motion';
import WORDS_JSON from './words.json';
import {Bay3D} from './Bay3D';
import {FRAMES} from './world';

const WORDS = WORDS_JSON as Word[];
const {w} = makeTiming(WORDS);
export const EPISODE_FRAMES = FRAMES;

const S01: React.FC<{lw: (i: number, o?: number) => number}> = ({lw}) => {
  const f = useCurrentFrame();
  const title = spr(f, lw(47), {damping: 14, stiffness: 120});
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <Clip3D id="ola-lituya-bahia" live={<Bay3D />} />
      <AbsoluteFill style={{background: 'radial-gradient(120% 90% at 50% 45%, transparent 55%, rgba(0,0,0,0.55) 100%)'}} />
      <SourceTag frame={f} at={lw(25)} text="Fuente: USGS · Miller (1960)" x={60} y={70} color="#D8E2F0" />
      <div style={{position: 'absolute', left: 0, width: 1080, top: 120, textAlign: 'center', opacity: Math.min(1, title), transform: `translateY(${(1 - title) * 30}px)`}}>
        <div style={{fontFamily: F.mono, fontWeight: 700, fontSize: 30, letterSpacing: '0.3em', color: '#FFC79A'}}>MEGATSUNAMI</div>
        <div style={{fontFamily: F.display, fontSize: 104, lineHeight: 1, color: '#FFFFFF', textShadow: '0 8px 30px rgba(0,0,0,0.7)'}}>BAHÍA LITUYA</div>
      </div>
    </AbsoluteFill>
  );
};

const SCENES: SceneDef[] = [{C: S01, from: 0, to: EPISODE_FRAMES, out: 'none'}];

const sfx: SfxCue[] = [
  {at: 0, file: 'underwater', vol: 0.18, dur: 150}, {at: 6, file: 'riser', vol: 0.15, dur: 60},
  {at: w(7), file: 'deadnet_thump', vol: 0.5}, {at: w(8), file: 'spasm', vol: 0.3}, {at: w(10), file: 'impact', vol: 0.5},
  {at: w(13), file: 'impact', vol: 0.7}, {at: w(13), file: 'whoosh', vol: 0.5}, {at: w(16), file: 'underwater', vol: 0.4, dur: 120}, {at: w(20), file: 'riser', vol: 0.35, dur: 50},
  {at: w(24), file: 'whoosh', vol: 0.45}, {at: w(24, 6), file: 'impact', vol: 0.4}, {at: w(29), file: 'reveal_swell', vol: 0.3, dur: 50},
  {at: w(33), file: 'whoosh', vol: 0.3}, {at: w(37), file: 'riser', vol: 0.3, dur: 40}, {at: w(38), file: 'impact', vol: 0.3},
  {at: w(41), file: 'reveal_swell', vol: 0.45, dur: 90}, {at: w(47), file: 'stamp', vol: 0.4},
];

export const Episode: React.FC = () => (
  <EpisodeRunner words={WORDS} scenes={SCENES} sfx={sfx} bg="#000" mix={{voice: 'audio/voz-ola-lituya.wav', music: 'sfx/music_drone.wav', musicVol: 0.12}} />
);
