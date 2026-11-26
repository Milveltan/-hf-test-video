/** Túnel de caída: estelas radiales que huyen del centro (vista hacia abajo mientras caes). Colores por props. */
import React from 'react';
import {AbsoluteFill} from 'remotion';
import {E, rng} from '../motion';

export const FallVoid: React.FC<{frame: number; k: number; speed?: number; cx?: number; cy?: number; color?: string; deep?: string; streak?: string; bg?: string}> = ({frame, k, speed = 1, cx = 540, cy = 600, color = '#9B7BFF', deep = '#2A1550', streak = '#A9C2FF', bg = '#04050E'}) => {
  if (k < 0.01) return null;
  const r = rng(11);
  return (
    <AbsoluteFill style={{opacity: k}}>
      <AbsoluteFill style={{background: `radial-gradient(60% 55% at ${cx / 10.8}% ${cy / 12}%, ${bg}, ${deep} 55%, ${bg} 100%)`}} />
      <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 90}, (_, i) => {
          const a = r() * Math.PI * 2, ph = r(), z = 0.4 + r() * 0.8;
          const t = (ph + frame * 0.03 * speed * z) % 1;
          const d0 = 40 + E.in(t) * 900, d1 = d0 + 30 + E.in(t) * 260 * speed;
          return <line key={i} x1={cx + Math.cos(a) * d0} y1={cy + Math.sin(a) * d0} x2={cx + Math.cos(a) * d1} y2={cy + Math.sin(a) * d1} stroke={i % 5 === 0 ? streak : color} strokeWidth={1.5 + z * 3} strokeLinecap="round" opacity={0.15 + t * 0.7} />;
        })}
      </svg>
    </AbsoluteFill>
  );
};

