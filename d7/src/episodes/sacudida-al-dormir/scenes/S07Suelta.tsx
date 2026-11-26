/**
 * ESCENA 7 · "Y en ese momento confuso, nota que todo tu cuerpo se suelta de golpe."
 * Arriba el cerebro vigía; abajo el cuerpo dormido unido por una línea nerviosa.
 * En "confuso" el cerebro parpadea; en "de golpe" todas las luces del cuerpo caen a la vez y una señal sube a toda velocidad al cerebro.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {E, lerp, prog} from '../../../dl/motion';
import {Brain} from '../../../dl/anatomy/Anatomy';
import {Glow} from '../../../dl/light/Light';
import {Flash} from '../../../dl/fx/Fx';
import {BedTop, Night, place} from './common';
import {P} from './palette';

export const S07Suelta: React.FC<{lw: (i: number, off?: number) => number}> = ({lw}) => {
  const f = useCurrentFrame();
  const drop = prog(f, lw(95, -2), lw(95, 4), E.out);
  const sink = prog(f, lw(95), lw(97, 8), E.out);
  const sig = prog(f, lw(95, 2), lw(96, 6), E.in);
  const hit = Math.max(0, 1 - Math.abs(f - lw(96, 6)) / 6);
  const confused = prog(f, lw(86), lw(87, 6)) * (1 - prog(f, lw(88, 6), lw(89, 6))) * (Math.sin(f * 1.7) > 0 ? 1 : 0.4);
  const lv = 0.7 * (1 - drop);
  const bs = lerp(0.46, 0.4, sink);
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <Night frame={f} />
      <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
        <path d="M540 330 C540 420 540 470 540 560" stroke={P.moonDim} strokeWidth={6} fill="none" opacity={0.6} strokeDasharray="4 14" />
        {sig > 0 && sig < 1 && <circle cx={540} cy={lerp(560, 330, sig)} r={16} fill={P.alarm} style={{filter: `drop-shadow(0 0 16px ${P.alarm})`}} />}
      </svg>
      <Glow x={540} y={200} r={300} color={hit > 0 ? P.alarm : P.lamp} opacity={0.3 + hit * 0.4} />
      <div style={{...place(0.75, 210, 180, 540, 200), opacity: 1 - confused * 0.5}}>
        <Brain frame={f} highlight="cortex" color={hit > 0.1 ? '#FF9AA6' : '#F2B6A0'} scale={0.75} />
      </div>
      <div style={{...place(bs, 300, 550, 540, lerp(840, 870, sink)), filter: `blur(${sink * 2}px)`}}>
        <div style={{transform: `scale(${bs})`, transformOrigin: '0 0'}}>
          <BedTop frame={f} expression="eyesClosed" breath={0.4} lights={[0.8, lv, lv, lv, lv, lv]} lightColor={P.lamp} ripple={drop * (1 - sink) * 1.5} />
        </div>
      </div>
      <Flash k={hit * 0.25} color={P.alarm} />
    </AbsoluteFill>
  );
};
