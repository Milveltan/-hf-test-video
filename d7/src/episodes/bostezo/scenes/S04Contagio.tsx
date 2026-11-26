/**
 * ESCENA 4 · "Pero lo inquietante es el contagio. Tu cerebro copia lo que ve, sin que tú decidas."
 * Una cuadrícula de 9 rostros en la oscuridad, cada uno con su luz. El del centro bosteza; una señal roja salta de sus ojos a los
 * vecinos y el bostezo se propaga en anillos hasta las esquinas. En "sin que tú decidas" la cámara se cierra sobre el último.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {FaceCloseUp, yawnCurve} from '../../../dl/characters/Face';
import {Glow} from '../../../dl/light/Light';
import {F} from '../../../dl/fonts';
import {Dark, E, Grain, LW, Vig, lerp, prog} from './common';
import {LOOKS, P} from './palette';

const CELLS = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const ring = (i: number) => (i === 4 ? 0 : i % 2 === 1 ? 1 : 2);

export const S04Contagio: React.FC<{lw: LW}> = ({lw}) => {
  const f = useCurrentFrame();
  const t0 = lw(46) - 6, gap = Math.max(10, (lw(52) - t0) / 2.2);
  const at = (i: number) => t0 + ring(i) * gap + (i % 3) * 3;
  const zoom = lerp(1, 1.9, prog(f, lw(53), lw(56) + 8, E.inOut));
  const word = prog(f, lw(43), lw(44));
  return (
    <AbsoluteFill style={{overflow: 'hidden', background: P.void}}>
      <Dark f={f} k={0.5} />
      <div style={{position: 'absolute', inset: 0, transformOrigin: '900px 1000px', transform: `scale(${zoom})`}}>
        {CELLS.map((i) => {
          const cx = 180 + (i % 3) * 360, cy = 240 + Math.floor(i / 3) * 360;
          const y = yawnCurve(f, at(i), 50);
          const hit = prog(f, at(i) - 8, at(i));
          const on = f >= at(i) - 8;
          return (
            <div key={i}>
              <Glow x={cx} y={cy} r={170} color={on ? P.signal : P.rim} opacity={0.12 + 0.18 * hit} />
              <div style={{position: 'absolute', left: cx - 300 * 0.5, top: cy - 360 * 0.5, filter: `brightness(${0.45 + 0.55 * Math.max(hit, i === 4 ? 1 : 0)})`}}>
                <FaceCloseUp look={LOOKS[(i * 2) % 5]} scale={0.5} yawn={y} gaze={((i % 3) - 1) * -0.7} rim={on ? P.signal : P.rim} id={`g${i}`} />
              </div>
            </div>
          );
        })}
        <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
          {CELLS.filter((i) => i !== 4).map((i) => {
            const src = ring(i) === 1 ? 4 : [1, 3, 5, 7].find((n) => Math.abs((n % 3) - (i % 3)) + Math.abs(Math.floor(n / 3) - Math.floor(i / 3)) === 1)!;
            const k = prog(f, at(i) - 14, at(i) - 4, E.out);
            const sx = 180 + (src % 3) * 360, sy = 210 + Math.floor(src / 3) * 360, tx = 180 + (i % 3) * 360, ty = 210 + Math.floor(i / 3) * 360;
            return k > 0 ? <g key={i}><line x1={sx} y1={sy} x2={lerp(sx, tx, k)} y2={lerp(sy, ty, k)} stroke={P.signal} strokeWidth={5} opacity={0.85 * (1 - prog(f, at(i) + 10, at(i) + 30))} style={{filter: `drop-shadow(0 0 10px ${P.signal})`}} /><circle cx={lerp(sx, tx, k)} cy={lerp(sy, ty, k)} r={9} fill={P.signal} opacity={k < 1 ? 1 : 0} /></g> : null;
          })}
        </svg>
      </div>
      <div style={{position: 'absolute', left: 0, width: 1080, top: 520, textAlign: 'center', fontFamily: F.display, fontSize: 150, color: P.signal, letterSpacing: '0.04em', opacity: word * (1 - prog(f, lw(46) + 6, lw(47))), transform: `scale(${lerp(1.3, 1, word)})`, textShadow: `0 0 40px ${P.signal}`}}>CONTAGIO</div>
      <Grain f={f} />
      <Vig k={0.8} />
    </AbsoluteFill>
  );
};
