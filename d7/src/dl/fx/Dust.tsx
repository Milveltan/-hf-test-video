/** Biblioteca Datologo · Partículas de polvo flotando en un haz de luz (deterministas). */
import React from 'react';
import {noise1, rng} from '../motion';

/** Partículas de polvo en el haz del monitor */
export const Dust: React.FC<{frame: number; x?: number; y?: number; w?: number; h?: number; count?: number; color?: string}> = ({frame, x: X = 330, y: Y = 250, w: W = 600, h: H = 500, count = 34, color = '#BFFFD9'}) => {
  const r = rng(5);
  return (
    <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
      {Array.from({length: count}, (_, i) => {
        const x0 = X + r() * W, y0 = Y + r() * H, s = 1 + r() * 2.2, ph = r() * 100;
        const x = x0 + noise1(frame * 0.02 + ph, i) * 30;
        const y = y0 - ((frame * (0.3 + r() * 0.4) + ph * 5) % 120);
        return <circle key={i} cx={x} cy={y} r={s} fill={color} opacity={0.25 + 0.25 * Math.sin(frame * 0.1 + ph)} />;
      })}
    </svg>
  );
};

