import React from 'react';
import {AbsoluteFill} from 'remotion';
import {E, lerp, prog, rng} from '../../../dl/motion';
import {P} from './palette';
export {E, lerp, prog};
export type LW = (i: number, off?: number) => number;

/** Fondo de laboratorio a oscuras con niebla fría y polvo. */
export const Dark: React.FC<{f: number; glow?: string; k?: number; seed?: number}> = ({f, glow = P.deep, k = 1, seed = 2}) => {
  const r = rng(seed);
  return (
    <AbsoluteFill style={{background: `radial-gradient(70% 60% at 50% 42%, ${glow}, ${P.ink} 60%, ${P.void})`}}>
      <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 50}, (_, i) => {
          const x = r() * 1080, y0 = r() * 1200, z = 0.3 + r();
          return <circle key={i} cx={x + Math.sin(f * 0.02 + i) * 16} cy={((y0 - f * 0.35 * z) % 1200 + 1200) % 1200} r={0.8 + z * 1.6} fill={P.rim} opacity={(0.06 + 0.16 * z) * k} />;
        })}
      </svg>
    </AbsoluteFill>
  );
};
export const Grain: React.FC<{f: number}> = ({f}) => (
  <AbsoluteFill style={{opacity: 0.07, mixBlendMode: 'overlay', backgroundImage: `repeating-radial-gradient(circle at ${(f * 37) % 100}% ${(f * 53) % 100}%, #fff 0 1px, transparent 1px 3px)`}} />
);
export const Vig: React.FC<{k?: number}> = ({k = 0.75}) => <AbsoluteFill style={{background: `radial-gradient(110% 85% at 50% 45%, transparent 45%, rgba(0,0,0,${k}) 100%)`, pointerEvents: 'none'}} />;
