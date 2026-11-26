/**
 * ESCENA 9 · "Así que hace lo mismo que si tropezaras en una escalera."
 * Comparación cotidiana: la persona baja una escalera hacia la cámara, paso a paso; en "tropezaras" el pie no encuentra
 * el escalón, el cuerpo se va de frente con los brazos arriba y la cámara se sacude.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {E, lerp, prog} from '../../../dl/motion';
import {HumanRig, POSES, mixPose} from '../../../dl/characters/HumanRig';
import {Glow} from '../../../dl/light/Light';
import {Night, place, shakeXY} from './common';
import {P, SLEEPER} from './palette';

export const S09Escalera: React.FC<{lw: (i: number, off?: number) => number}> = ({lw}) => {
  const f = useCurrentFrame();
  const trip = prog(f, lw(115, -3), lw(115, 10), E.out);
  const walkT = Math.min(f, lw(115, -3));
  const step = (Math.sin(walkT * 0.32) + 1) / 2;
  const walk = mixPose(POSES.walkA, POSES.walkB, step);
  const pose = mixPose(walk, {shL: 150, shR: -150, elL: -30, elR: 30, hipL: 10, hipR: -30, knL: 10, knR: 40}, trip);
  const near = prog(f, 0, lw(115), E.linear);
  const s = lerp(0.42, 0.62, near) * (1 + trip * 0.25);
  const [dx, dy] = shakeXY(f, Math.max(0, 1 - Math.abs(f - lw(115, 4)) / 10), 22);
  const steps = Array.from({length: 9}, (_, i) => i);
  return (
    <AbsoluteFill style={{overflow: 'hidden', transform: `translate(${dx}px, ${dy}px)`}}>
      <Night frame={f} tint={P.dusk} />
      <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
        {steps.map((i) => {
          const y = 300 + i * 95 + i * i * 4, w = 380 + i * 80, h = 34 + i * 6;
          return (
            <g key={i}>
              <rect x={540 - w / 2} y={y} width={w} height={h} fill={P.woodLight} />
              <rect x={540 - w / 2} y={y + h} width={w} height={95 + i * 8 - h} fill={P.wood} />
              <rect x={540 - w / 2} y={y} width={w} height={4} fill={P.moon} opacity={0.35} />
            </g>
          );
        })}
      </svg>
      <Glow x={540} y={200} r={500} color={P.moon} opacity={0.15} />
      <div style={{...place(s, 200, 940, 540 + trip * 30, lerp(700, 900, near) + trip * 120), transform: `rotate(${trip * 18}deg)`, transformOrigin: '50% 100%'}}>
        <HumanRig id="s9" person={SLEEPER} pose={pose} expression={trip > 0.2 ? 'surprise' : 'neutral'} rim={P.moon} scale={s} />
      </div>
    </AbsoluteFill>
  );
};
