/**
 * ESCENA 2 · "Tu cuerpo da un brinco y despiertas con el corazón acelerado."
 * Sigue la caída unos instantes; en "brinco" todo regresa de golpe a la cama: destello, sacudida y ojos abiertos.
 * En "corazón acelerado" el pecho late con luz coral, cada vez más rápido.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {E, lerp, prog} from '../../../dl/motion';
import {POSES, mixPose} from '../../../dl/characters/HumanRig';
import {FallVoid} from '../../../dl/fx/FallVoid';
import {Flash} from '../../../dl/fx/Fx';
import {Bedroom, Night, jolt, shakeXY} from './common';
import {P} from './palette';

export const S02Brinco: React.FC<{lw: (i: number, off?: number) => number}> = ({lw}) => {
  const f = useCurrentFrame();
  const back = f >= lw(14, -2);
  const j = jolt(f, lw(14, -2), 18);
  const [dx, dy] = shakeXY(f, j, 40);
  const fallS = lerp(0.32, 0.18, prog(f, 0, lw(14, -2), E.in));
  const push = prog(f, lw(15), lw(21), E.inOut);
  const heart = prog(f, lw(18, -4), lw(19));
  const rate = lerp(0.35, 0.7, prog(f, lw(19), lw(21)));
  const beat = heart * Math.pow(Math.max(0, Math.sin(f * rate)), 6);
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <Night frame={f} />
      {!back && <FallVoid frame={f + 40} k={1} speed={2} />}
      <Bedroom
        frame={f} s={back ? lerp(1.0, 1.35, push) * (1 + j * 0.12) : fallS} ax={800} ay={back ? lerp(820, 760, push) : 760}
        sx={540 + dx} sy={600 + dy} rot={back ? j * 4 : 160 + f * 4} roomOpacity={back ? 1 : 0} bedOpacity={back ? 1 : 0}
        ripple={back ? j * 2.5 : 1.4} expression="surprise" pose={mixPose(POSES.idle, POSES.handsUp, back ? j * 0.6 : 0.5)}
        breath={back ? 0.6 + Math.sin(f * 0.5) * 0.4 : 0.5} flush={heart * 0.5}
        lights={[0, beat, 0, 0, 0, 0]} lightColor={P.alarm}
      />
      <Flash k={Math.max(0, 1 - Math.abs(f - lw(14, -2)) / 5) * 0.7} color={P.moon} />
    </AbsoluteFill>
  );
};
