/**
 * Datologo 7 · Efectos de sonido anclados a fotogramas (que vienen de índices de palabra).
 * Mezcla de la Biblia: voz 1.0 · efectos 0.5 · música/ambiente bajo.
 */
import React from 'react';
import {Audio, Sequence, staticFile} from 'remotion';

export type SfxCue = {at: number; file: string; vol?: number; dur?: number};

export const SfxTrack: React.FC<{cues: SfxCue[]}> = ({cues}) => (
  <>
    {cues.map((c, i) => (
      <Sequence key={i} from={Math.max(0, c.at)} durationInFrames={c.dur ?? 120} layout="none">
        <Audio src={staticFile(`sfx/${c.file}.wav`)} volume={c.vol ?? 0.5} />
      </Sequence>
    ))}
  </>
);
