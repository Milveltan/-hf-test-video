/**
 * Biblioteca Datologo · Transición glitch: bandas desplazadas + separación RGB y fundido a negro.
 * k: 0→1 progreso de la transición.
 */
import React from 'react';
import {AbsoluteFill} from 'remotion';
import {keys, noise1} from '../motion';

const VOID = '#03060A';

/** bandas horizontales desplazadas + separación RGB (salida de escena) */
export const GlitchBands: React.FC<{k: number; frame: number}> = ({k, frame}) => {
  const bands = 14;
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {Array.from({length: bands}, (_, i) => {
        const n = noise1(i * 3.1 + Math.floor(frame / 2) * 7.7, 9);
        const on = Math.abs(n) < k * 0.9;
        if (!on) return null;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: `${(i / bands) * 100}%`,
              height: `${100 / bands + 0.5}%`,
              background: i % 3 === 0 ? `rgba(255,59,59,${0.5 * k})` : i % 3 === 1 ? `rgba(127,227,255,${0.35 * k})` : `rgba(3,6,10,${0.9 * k})`,
              transform: `translateX(${n * 260 * k}px)`,
              mixBlendMode: i % 3 === 2 ? 'normal' : 'screen',
            }}
          />
        );
      })}
      <AbsoluteFill style={{background: VOID, opacity: keys(k, [[0, 0], [0.75, 0.2], [1, 1]])}} />
    </AbsoluteFill>
  );
};
