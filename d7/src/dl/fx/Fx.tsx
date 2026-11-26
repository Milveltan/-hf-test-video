/**
 * Biblioteca Datologo · Efectos.
 *  - Stamp: sello de goma que golpea (rotado, con tinta irregular y sacudida).
 *  - Particles: partículas deterministas (chispas, ceniza, nieve, burbujas) con dirección y velocidad.
 *  - Flash: destello de transición.
 *  - Scanline: línea de escaneo que recorre un objeto.
 */
import React from 'react';
import {AbsoluteFill} from 'remotion';
import {clamp01, rng, spr} from '../motion';

export const Stamp: React.FC<{frame: number; at: number; text: string; color?: string; size?: number; rot?: number; x?: number; y?: number; font?: string}> = ({frame, at, text, color = '#FF3B3B', size = 120, rot = -9, x = 540, y = 600, font = 'Anton, sans-serif'}) => {
  if (frame < at) return null;
  const k = spr(frame, at, {damping: 11, stiffness: 320, mass: 0.6});
  const sc = 2.2 - 1.2 * k;
  return (
    <div style={{position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) rotate(${rot}deg) scale(${sc})`, opacity: clamp01(k * 2)}}>
      <div style={{fontFamily: font, fontSize: size, lineHeight: 1, color, padding: `${size * 0.12}px ${size * 0.28}px`, border: `${size * 0.07}px solid ${color}`, borderRadius: size * 0.12, letterSpacing: '0.04em', mixBlendMode: 'screen', WebkitMaskImage: 'repeating-radial-gradient(circle at 30% 40%, #000 0 6px, rgba(0,0,0,0.75) 7px 9px)', maskImage: 'repeating-radial-gradient(circle at 30% 40%, #000 0 6px, rgba(0,0,0,0.75) 7px 9px)'}}>
        {text}
      </div>
    </div>
  );
};

export const Particles: React.FC<{frame: number; count?: number; seed?: number; x?: number; y?: number; w?: number; h?: number; vx?: number; vy?: number; size?: [number, number]; color?: string; opacity?: number}> = ({
  frame, count = 40, seed = 1, x = 0, y = 0, w = 1080, h = 1200, vx = 0, vy = -0.6, size = [1, 3], color = '#FFFFFF', opacity = 0.5,
}) => {
  const r = rng(seed);
  return (
    <svg width={1080} height={1200} style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
      {Array.from({length: count}, (_, i) => {
        const px = r() * w, py = r() * h, s = size[0] + r() * (size[1] - size[0]), sp = 0.5 + r(), ph = r() * 6.28;
        const cx = x + ((((px + vx * sp * frame) % w) + w) % w);
        const cy = y + ((((py + vy * sp * frame) % h) + h) % h);
        return <circle key={i} cx={cx} cy={cy} r={s} fill={color} opacity={opacity * (0.5 + 0.5 * Math.sin(frame * 0.08 + ph))} />;
      })}
    </svg>
  );
};

export const Flash: React.FC<{k: number; color?: string}> = ({k, color = '#FFFFFF'}) => (k > 0 ? <AbsoluteFill style={{background: color, opacity: k, mixBlendMode: 'screen', pointerEvents: 'none'}} /> : null);

export const Scanline: React.FC<{k: number; color?: string; vertical?: boolean}> = ({k, color = '#7FE3FF', vertical}) =>
  k <= 0 || k >= 1 ? null : (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div style={{position: 'absolute', ...(vertical ? {top: 0, bottom: 0, left: `${k * 100}%`, width: 4} : {left: 0, right: 0, top: `${k * 100}%`, height: 4}), background: color, boxShadow: `0 0 30px 8px ${color}`}} />
    </AbsoluteFill>
  );
