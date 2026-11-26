/**
 * ESCENA 11 · "Por eso el brinco."
 * Regreso a la cama cenital: cuerpo tranquilo; en "brinco" la sacudida completa, con la cobija levantándose.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {POSES, mixPose} from '../../../dl/characters/HumanRig';
import {Flash} from '../../../dl/fx/Fx';
import {Bedroom, Night, jolt, shakeXY} from './common';
import {P} from './palette';

export const S11Brinco: React.FC<{lw: (i: number, off?: number) => number}> = ({lw}) => {
  const f = useCurrentFrame();
  const at = lw(132, -2);
  const j = jolt(f, at, 16);
  const [dx, dy] = shakeXY(f, j, 34);
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <Night frame={f} />
      <Bedroom frame={f} s={1.05 + j * 0.15 + f * 0.002} ax={800} ay={850} sx={540 + dx} sy={600 + dy} rot={j * 3}
        expression={f > at ? 'surprise' : 'eyesClosed'} ripple={j * 3} pose={mixPose(POSES.idle, POSES.handsUp, j * 0.7)} breath={0.4} />
      <Flash k={Math.max(0, 1 - Math.abs(f - at) / 4) * 0.5} color={P.moon} />
    </AbsoluteFill>
  );
};
