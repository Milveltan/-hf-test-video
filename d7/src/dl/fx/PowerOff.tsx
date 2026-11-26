/**
 * PowerOff — apagado de tubo de rayos catódicos sobre cualquier escena.
 * k 0..1: 0–0.55 el cuadro se aplasta en una línea brillante, 0.55–0.85 la línea se encoge a un punto, después negro.
 */
import React from 'react';
import {AbsoluteFill} from 'remotion';
import {clamp01, E} from '../motion';

export const PowerOff: React.FC<{k: number; color?: string; children: React.ReactNode}> = ({k, color = '#E8FFFF', children}) => {
  if (k <= 0) return <>{children}</>;
  const a = E.in(clamp01(k / 0.55));
  const b = E.inOut(clamp01((k - 0.55) / 0.3));
  const fade = clamp01((k - 0.85) / 0.15);
  return (
    <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
      <AbsoluteFill style={{transform: `scale(${1 - b * 0.995}, ${Math.max(0.004, 1 - a)})`, filter: `brightness(${1 + a * 3}) saturate(${1 - a * 0.7})`, opacity: k < 0.55 ? 1 : 0}}>{children}</AbsoluteFill>
      {k >= 0.5 && (
        <div style={{position: 'absolute', left: 540 - 560 * (1 - b), width: 1120 * (1 - b) + 8, top: 597, height: 6, borderRadius: 3, background: color, boxShadow: `0 0 40px 10px ${color}`, opacity: 1 - fade}} />
      )}
    </AbsoluteFill>
  );
};
