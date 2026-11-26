/**
 * Biblioteca Datologo · Transiciones de salida/entrada aplicadas a una escena completa.
 * type: whip (barrido lateral con desenfoque) · zoom (empuje con desenfoque) · iris (círculo que se cierra) ·
 *       fade · drop (cae y sale) · wipe (cortina diagonal de color).
 * k: 0 = escena intacta → 1 = escena fuera. Varía el tipo entre escenas (regla: nunca la misma dos veces seguidas).
 */
import React from 'react';
import {AbsoluteFill} from 'remotion';

export type TransitType = 'whip' | 'zoom' | 'iris' | 'fade' | 'drop' | 'wipe' | 'none';

export const Transit: React.FC<{type: TransitType; k: number; color?: string; dir?: 1 | -1; children: React.ReactNode}> = ({type, k, color = '#FFB020', dir = 1, children}) => {
  if (k <= 0 || type === 'none') return <AbsoluteFill>{children}</AbsoluteFill>;
  const s: React.CSSProperties = {};
  if (type === 'whip') Object.assign(s, {transform: `translateX(${-dir * k * 1000}px) scaleX(${1 + k * 0.25})`, filter: `blur(${k * 18}px)`});
  if (type === 'zoom') Object.assign(s, {transform: `scale(${1 + k * 1.4})`, filter: `blur(${k * 14}px)`, opacity: 1 - k * 0.6});
  if (type === 'iris') Object.assign(s, {clipPath: `circle(${(1 - k) * 80}% at 50% 45%)`});
  if (type === 'fade') Object.assign(s, {opacity: 1 - k});
  if (type === 'wipe') Object.assign(s, {clipPath: `polygon(${-10 + k * 180}% 0, 110% 0, 110% 100%, ${-60 + k * 180}% 100%)`});
  if (type === 'drop') Object.assign(s, {transform: `translateY(${k * k * 1300}px) rotate(${k * 6}deg)`});
  return (
    <AbsoluteFill>
      <AbsoluteFill style={s}>{children}</AbsoluteFill>
      {type === 'wipe' && (
        <AbsoluteFill style={{background: color, clipPath: `polygon(${-40 + k * 180}% 0, ${-10 + k * 180}% 0, ${-60 + k * 180}% 100%, ${-90 + k * 180}% 100%)`}} />
      )}
    </AbsoluteFill>
  );
};
