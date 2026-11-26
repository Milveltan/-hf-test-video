/**
 * ESCENA 1 · "Toma aire… y no lo sueltes. Los primeros segundos parecen tranquilos."
 * Gancho: primerísimo plano de una cara que aspira; un chorro de partículas de aire entra por la boca desde el fotograma 0.
 * En "sueltes" los labios se sellan y las mejillas se inflan; la cámara se aleja con calma hasta el plano entero.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {E, keys, lerp, prog, rng} from '../../../dl/motion';
import {HumanRig, POSES} from '../../../dl/characters/HumanRig';
import {Glow} from '../../../dl/light/Light';
import {Abyss, place} from './common';
import {DIVER, P} from './palette';

export const S01Gancho: React.FC<{lw: (i: number, off?: number) => number}> = ({lw}) => {
  const f = useCurrentFrame();
  const pull = prog(f, lw(6, -4), lw(11, 6), E.inOut);
  const s = lerp(3.1, 1.0, pull);
  const ax = 200, ay = lerp(165, 480, pull);
  const sx = 540, sy = lerp(470, 610, pull);
  const breath = keys(f, [[0, 0.25], [lw(1, 8), 1]], E.out);
  const inhale = 1 - prog(f, lw(1, 4), lw(2, 2));
  const cheeks = prog(f, lw(5, -4), lw(5, 6), E.back) * 0.75;
  const blink = Math.max(0, 1 - Math.abs(f - lw(8)) / 3);
  // boca en pantalla
  const mx = sx + (200 - ax) * s, my = sy + (190 - ay) * s;
  const r = rng(5);
  const air = Array.from({length: 80}, () => ({a: r() * Math.PI * 2, d: 520 + r() * 420, o: r(), z: 0.5 + r()}));
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <Abyss frame={f} />
      <Glow x={300} y={140} r={520} color={P.o2} opacity={0.18} />
      <div style={place(s, ax, ay, sx, sy)}>
        <HumanRig id="s1" person={DIVER} pose={POSES.idle} breath={breath} cheeks={cheeks} blink={blink} expression={f < lw(5, -2) ? 'surprise' : 'neutral'} rim={P.xray} scale={s} />
      </div>
      {inhale > 0.01 && <div style={{position: 'absolute', left: mx - 160, top: my - 120, width: 320, height: 240, borderRadius: '50%', background: P.o2, filter: 'blur(60px)', opacity: 0.35 * inhale}} />}
      {/* aire que entra */}
      {inhale > 0.01 && (
        <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
          {air.map((p, i) => {
            const t = ((f * 0.045 * p.z + p.o) % 1);
            const k = E.in(t);
            const x = mx + Math.cos(p.a) * p.d * (1 - k) + Math.sin(t * 9 + i) * 14 * (1 - k);
            const y = my + Math.sin(p.a) * p.d * 0.8 * (1 - k);
            return <circle key={i} cx={x} cy={y} r={(4 + p.z * 5) * (1 - k * 0.5)} fill={P.o2} opacity={inhale * Math.min(1, t * 4) * (0.55 + 0.45 * k)} style={{filter: `drop-shadow(0 0 6px ${P.o2})`}} />;
          })}
        </svg>
      )}
    </AbsoluteFill>
  );
};
