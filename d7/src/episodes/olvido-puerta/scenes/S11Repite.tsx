/**
 * ESCENA 11 · "o repite en tu mente lo que estabas haciendo."
 * Burbuja de pensamiento que reproduce en bucle los últimos pasos (mini-película) con flechas de rebobinado alrededor.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {spr} from '../../../dl/motion';
import {POSES, mixPose} from '../../../dl/characters/HumanRig';
import {E, FLOOR, Idea, Kitchen, LW, Person, Sala, Vig, lerp, prog, walkPose} from './common';
import {P} from './palette';

export const S11Repite: React.FC<{lw: LW}> = ({lw}) => {
  const f = useCurrentFrame();
  const bub = spr(f, 4, {damping: 12, stiffness: 130});
  const t = 0.5 + 0.5 * Math.sin(f * 0.055 - 1.2);
  const mx = lerp(110, 430, t), mini = 0.5;
  const pose = walkPose(f);
  const tilt = mixPose(POSES.idle, {head: 7, shR: -12, elR: 8}, prog(f, 0, 14));
  const R = 245, cx = 690, cy = 330;
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <Kitchen f={f} lit={0.7} />
      <Person x={290} s={0.78} pose={tilt} expression="neutral" look={0.8} id="g11" foot={FLOOR + 10} />
      <div style={{position: 'absolute', inset: 0, opacity: bub, transform: `scale(${0.4 + 0.6 * bub})`, transformOrigin: '420px 330px'}}>
        <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
          <circle cx={430} cy={380} r={13} fill="#F6F1E4" /><circle cx={478} cy={346} r={20} fill="#F6F1E4" />
          <circle cx={cx} cy={cy} r={R + 12} fill="#F6F1E4" />
        </svg>
        <div style={{position: 'absolute', left: cx - R, top: cy - R, width: R * 2, height: R * 2, borderRadius: '50%', overflow: 'hidden', background: P.film}}>
          <div style={{position: 'absolute', left: -20, top: -50, width: 540, height: 600, transform: 'scale(1)', transformOrigin: '0 0'}}>
            <div style={{width: 1080, height: 1200, transform: `scale(${mini})`, transformOrigin: '0 0', position: 'relative'}}>
              <Sala f={f} />
              <Idea x={810} y={150} f={f} s={0.8} glow={1} />
              <Person x={mx * 2} s={0.7} pose={pose} id="g11m" />
            </div>
          </div>
        </div>
        <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
          <g transform={`rotate(${-f * 3.2} ${cx} ${cy})`}>
            {[0, 1].map((i) => {
              const a0 = i * Math.PI + 0.3, a1 = a0 + 1.9, r = R + 44;
              const p = (a: number) => [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
              const [x0, y0] = p(a0), [x1, y1] = p(a1);
              return <g key={i}><path d={`M${x1} ${y1} A${r} ${r} 0 0 0 ${x0} ${y0}`} stroke={P.idea} strokeWidth={9} fill="none" strokeLinecap="round" /><circle cx={x0} cy={y0} r={13} fill={P.idea} /></g>;
            })}
          </g>
        </svg>
      </div>
      <Vig />
    </AbsoluteFill>
  );
};
