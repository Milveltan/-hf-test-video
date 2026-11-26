/**
 * ESCENA 1 · "Estás a punto de quedarte dormido… y de repente, ¡caes!"
 * Gancho: primerísimo plano cenital de una cara que se duerme bajo la luna; la cámara sube despacio.
 * La lámpara se apaga en "quedarte"; en "¡caes!" la cama y el cuarto desaparecen y el cuerpo cae girando a un vacío violeta.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {E, keys, lerp, prog} from '../../../dl/motion';
import {POSES, mixPose} from '../../../dl/characters/HumanRig';
import {FallVoid} from '../../../dl/fx/FallVoid';
import {Glow} from '../../../dl/light/Light';
import {Bedroom, Night, shakeXY} from './common';
import {P} from './palette';

export const S01Gancho: React.FC<{lw: (i: number, off?: number) => number}> = ({lw}) => {
  const f = useCurrentFrame();
  const settle = prog(f, 0, lw(8), E.inOut);
  const fall = prog(f, lw(9, -3), lw(9, 8), E.out);
  const away = prog(f, lw(9, -2), lw(9, 60), E.in);
  const s = lerp(2.4, 1.15, settle) * lerp(1, 0.32, away);
  const ay = lerp(520, 760, settle);
  const lamp = 1 - prog(f, lw(4), lw(4, 5));
  const drowsy = Math.min(1, prog(f, 0, lw(2)) * 0.6 + Math.max(0, Math.sin(f * 0.25)) * 0.35);
  const tremor = prog(f, lw(6, -4), lw(9, -3)) * (1 - fall);
  const [dx, dy] = shakeXY(f, tremor, 6);
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <Night frame={f} />
      <FallVoid frame={f} k={fall} speed={1.6} color={P.dream} />
      <Bedroom
        frame={f} s={s} ax={800} ay={ay} sx={540 + dx} sy={600 + dy} rot={away * 160} lamp={lamp}
        roomOpacity={1 - fall} bedOpacity={1 - fall} ripple={fall * 1.4}
        expression={fall > 0.2 ? 'surprise' : f > lw(3) ? 'eyesClosed' : 'neutral'} blink={f > lw(3) ? 0 : drowsy}
        pose={mixPose(POSES.idle, POSES.handsUp, fall * 0.5)} breath={keys(f, [[0, 0.3], [lw(5), 0.6]])}
      />
      <Glow x={540} y={260} r={500} color={P.moon} opacity={0.12 * (1 - fall)} />
    </AbsoluteFill>
  );
};
