/**
 * Biblioteca DROGMAN · Motor de episodio (mapa de escenas → video).
 * El episodio solo declara QUÉ escenas van, entre qué palabras y con qué salida; el motor resuelve
 * Sequences, solapes, transiciones (la escena que sale queda encima), acabado, subtítulos y mezcla.
 * Las escenas siguen siendo componentes libres: esto organiza, no diseña.
 */
import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {filmLook} from '../../opus-motion';
import {Captions} from '../Captions';
import {SfxTrack, SfxCue} from '../Sfx';
import {makeTiming, Word} from '../timing';
import {E, prog} from '../motion';
import {Transit, TransitType} from '../transitions/Transit';

export type LW = (i: number, off?: number) => number;
export type SceneComp = React.FC<{lw: LW}>;
export type SceneDef = {C: SceneComp; from: number; to: number; out?: TransitType; outLen?: number; dir?: 1 | -1};
export type Mix = {voice: string; ambient?: string; ambientVol?: number; music?: string; musicVol?: number};

export const episodeFrames = (words: Word[], tail = 0.75) => Math.ceil((words[words.length - 1].e + tail) * 30);

export const EpisodeRunner: React.FC<{
  words: Word[]; scenes: SceneDef[]; sfx: SfxCue[]; mix: Mix; bg?: string;
  overlays?: (frame: number) => React.ReactNode; grain?: number; vignette?: number; captionSize?: number;
}> = ({words, scenes, sfx, mix, bg = '#03060A', overlays, grain = 0.07, vignette = 0.32, captionSize = 60}) => {
  const frame = useCurrentFrame();
  const {w} = makeTiming(words);
  return (
    <AbsoluteFill style={{background: bg}}>
      {scenes.map((s, i) => ({s, i})).reverse().map(({s, i}) => {
        const out = s.out ?? 'none';
        const len = s.outLen ?? 8;
        const dur = s.to - s.from + (out === 'none' ? 2 : len);
        return (
          <Sequence key={i} from={s.from} durationInFrames={dur}>
            <Transit type={out} k={prog(frame, s.to - 2, s.to - 2 + len, E.in)} dir={s.dir}>
              <s.C lw={(idx, off = 0) => w(idx, off) - s.from} />
            </Transit>
          </Sequence>
        );
      })}
      {overlays?.(frame)}
      <AbsoluteFill style={{pointerEvents: 'none'}}>
        <filmLook.component {...filmLook.defaultProps} overlay grain={grain} vignette={vignette} bloom={0} flare={false} letterbox="off" weave={0.3} push={0} fringe={1.2} />
      </AbsoluteFill>
      <Captions words={words} bottom={64} size={captionSize} />
      <Audio src={staticFile(mix.voice)} volume={1} />
      {mix.ambient && <Audio src={staticFile(mix.ambient)} volume={(f) => (mix.ambientVol ?? 0.28) * Math.min(1, f / 15)} loop />}
      {mix.music && <Audio src={staticFile(mix.music)} volume={mix.musicVol ?? 0.12} loop />}
      <SfxTrack cues={sfx} />
    </AbsoluteFill>
  );
};
