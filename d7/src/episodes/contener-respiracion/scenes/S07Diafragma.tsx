/**
 * ESCENA 7 · "Tu diafragma empieza a contraerse solo… como si tu cuerpo intentara respirar sin tu permiso."
 * Torso en rayos X: el diafragma da sacudidas involuntarias que tiran del cuerpo; cada espasmo sacude la cámara
 * y se vuelven más seguidos en "sin tu permiso".
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {E, lerp, prog} from '../../../dl/motion';
import {POSES, mixPose} from '../../../dl/characters/HumanRig';
import {Annotation} from '../../../dl/editorial/Editorial';
import {Glow} from '../../../dl/light/Light';
import {Abyss, XDiver, place} from './common';
import {P} from './palette';

export const spasmsAt = (lw: (i: number, off?: number) => number) => [lw(75, 4), lw(77, 4), lw(80), lw(82), lw(83, 6), lw(84, 10), lw(85, 6)];

export const S07Diafragma: React.FC<{lw: (i: number, off?: number) => number}> = ({lw}) => {
  const f = useCurrentFrame();
  const sp = spasmsAt(lw).reduce((a, e) => { const d = f - e; return a + (d < 0 ? 0 : d < 3 ? d / 3 : Math.exp(-(d - 3) / 5)); }, 0);
  const k = Math.min(1, sp);
  const s = lerp(1.75, 1.95, prog(f, 0, lw(86), E.linear));
  const sx = 540 + Math.sin(f * 0.9) * 10 * k, sy = 720 + k * 14;
  const pose = mixPose(POSES.idle, POSES.handsChest, prog(f, lw(80), lw(83)) * 0.6);
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <Abyss frame={f + 900} light={0.5} tint="#0B2433" />
      <Glow x={540} y={760} r={460} color={P.alarm} opacity={0.08 + k * 0.25} />
      <div style={{...place(s, 200, 400, sx, sy), transform: `scaleY(${1 - k * 0.025})`}}>
        <XDiver frame={f} id="s7" scale={s} inflate={0.85 + k * 0.1} dia={0.35 + k * 0.65} o2={0.8} bpm={84} expression="strain" cheeks={0.8} flush={lerp(0.4, 0.85, prog(f, 0, lw(86)))} pose={pose} breath={1 - k * 0.15} />
      </div>
      <Annotation frame={f} at={lw(75, -2)} x={640} y={sy + 150} tx={600} ty={sy + (450 - 400) * s} kicker="DIAFRAGMA" label="espasmos involuntarios" color={P.bone} accent={P.alarm} size={40} />
    </AbsoluteFill>
  );
};
