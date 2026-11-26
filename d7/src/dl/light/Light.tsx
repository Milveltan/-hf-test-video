/**
 * Biblioteca Datologo · Iluminación.
 *  - Glow: halo radial de una fuente concreta (lámpara, pantalla, sol).
 *  - Beam: haz cónico (proyector, reflector, luz de ventana) con intensidad animable.
 *  - Sweep: reflejo que barre una superficie (vidrio, metal, papel satinado).
 *  - Vignette / Grade: cierre del cuadro y tinte de color.
 */
import React from 'react';
import {AbsoluteFill} from 'remotion';

export const Glow: React.FC<{x: number; y: number; r: number; color: string; opacity?: number}> = ({x, y, r, color, opacity = 1}) => (
  <AbsoluteFill style={{background: `radial-gradient(circle ${r}px at ${x}px ${y}px, ${color}, transparent 100%)`, opacity, pointerEvents: 'none'}} />
);

export const Beam: React.FC<{x: number; y: number; angle: number; spread?: number; length?: number; color?: string; opacity?: number}> = ({x, y, angle, spread = 18, length = 1400, color = '#FFFFFF', opacity = 0.18}) => {
  const a1 = ((angle - spread) * Math.PI) / 180;
  const a2 = ((angle + spread) * Math.PI) / 180;
  const id = `beam${Math.round(x)}${Math.round(y)}${Math.round(angle)}`;
  return (
    <svg width={1080} height={1200} style={{position: 'absolute', inset: 0, overflow: 'visible', pointerEvents: 'none', mixBlendMode: 'screen'}}>
      <defs>
        <radialGradient id={id} cx={x} cy={y} r={length} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={color} stopOpacity={opacity} />
          <stop offset="1" stopColor={color} stopOpacity={0} />
        </radialGradient>
      </defs>
      <path d={`M${x} ${y} L${x + Math.cos(a1) * length} ${y + Math.sin(a1) * length} L${x + Math.cos(a2) * length} ${y + Math.sin(a2) * length} Z`} fill={`url(#${id})`} />
    </svg>
  );
};

export const Sweep: React.FC<{k: number; angle?: number; color?: string; width?: number}> = ({k, angle = 105, color = 'rgba(255,255,255,0.14)', width = 10}) => {
  const p = -30 + k * 160;
  return <AbsoluteFill style={{background: `linear-gradient(${angle}deg, transparent ${p - width}%, ${color} ${p}%, transparent ${p + width}%)`, pointerEvents: 'none'}} />;
};

export const Vignette: React.FC<{strength?: number; color?: string}> = ({strength = 0.6, color = '0,0,0'}) => (
  <AbsoluteFill style={{background: `radial-gradient(85% 75% at 50% 45%, transparent 45%, rgba(${color},${strength}) 100%)`, pointerEvents: 'none'}} />
);
