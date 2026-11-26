/**
 * ESCENA 6 · "pero tu cerebro todavía no termina de desconectarse. Sigue despierto, vigilando."
 * Zoom a la cabeza encendida → el cerebro, cálido y translúcido, en el centro de la oscuridad.
 * En "vigilando" un haz de faro barre el cuarto desde el cerebro, como un vigía nocturno.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {E, lerp, prog} from '../../../dl/motion';
import {Brain} from '../../../dl/anatomy/Anatomy';
import {Beam, Glow} from '../../../dl/light/Light';
import {Night, place} from './common';
import {P} from './palette';

export const S06Cerebro: React.FC<{lw: (i: number, off?: number) => number}> = ({lw}) => {
  const f = useCurrentFrame();
  const inK = prog(f, 0, 16, E.out);
  const s = lerp(0.4, 1.6, inK) * (1 + Math.sin(f * 0.08) * 0.015);
  const beam = prog(f, lw(81, -4), lw(82));
  const ang = 90 + Math.sin((f - lw(81)) * 0.07) * 70;
  const flick = prog(f, lw(77), lw(79)) * (Math.sin(f * 1.3) > 0.6 ? 0.25 : 0);
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <Night frame={f} motes={70} />
      {beam > 0 && <Beam x={540} y={560} angle={ang} spread={16} length={1500} color={P.lamp} opacity={0.22 * beam} />}
      <Glow x={540} y={580} r={460} color={P.lamp} opacity={0.32 * inK} />
      <div style={{...place(s, 210, 180, 540, 580), opacity: 1 - flick}}>
        <Brain frame={f} highlight="cortex" color="#F2B6A0" scale={s} />
      </div>
    </AbsoluteFill>
  );
};
