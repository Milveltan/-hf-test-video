/**
 * Biblioteca Datologo · Recursos editoriales.
 *  - Annotation: etiqueta con línea guía que se dibuja hasta un punto (estilo revista / documental).
 *  - LowerThird: rótulo de nombre y cargo (personas reales).
 *  - SourceTag: etiqueta de fuente de un dato ("Fuente: …") — obligatoria cuando mostramos cifras.
 */
import React from 'react';
import {F} from '../fonts';
import {E, prog, spr} from '../motion';

export const Annotation: React.FC<{frame: number; at: number; x: number; y: number; tx: number; ty: number; kicker?: string; label: string; color?: string; accent?: string; size?: number; out?: number}> = ({
  frame, at, x, y, tx, ty, kicker, label, color = '#F2EEE6', accent = '#39FF8E', size = 96, out,
}) => {
  if (frame < at - 1) return null;
  const k = spr(frame, at, {damping: 15, stiffness: 140});
  const o = out !== undefined ? 1 - prog(frame, out, out + 8, E.in) : 1;
  const draw = prog(frame, at + 4, at + 18, E.out);
  const sx = x + 120, sy = y + size * 1.25;
  const len = Math.hypot(tx - sx, ty - sy) * 1.3;
  return (
    <div style={{position: 'absolute', inset: 0, opacity: k * o, pointerEvents: 'none'}}>
      <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
        <path d={`M${sx} ${sy} C ${sx + 20} ${sy + 60} ${tx - 80} ${ty - 20} ${tx} ${ty}`} stroke={color} strokeWidth={2} fill="none" strokeDasharray={len} strokeDashoffset={len * (1 - draw)} />
        <circle cx={tx} cy={ty} r={6} fill={accent} opacity={prog(frame, at + 16, at + 20)} />
      </svg>
      <div style={{position: 'absolute', left: x, top: y - 30 * (1 - k)}}>
        {kicker ? <div style={{fontFamily: F.mono, fontSize: 24, letterSpacing: '0.3em', color: accent}}>{kicker}</div> : null}
        <div style={{fontFamily: F.serif, fontStyle: 'italic', fontSize: size, lineHeight: 1, color, textShadow: '0 10px 30px rgba(0,0,0,0.9)'}}>{label}</div>
      </div>
    </div>
  );
};

export const LowerThird: React.FC<{frame: number; at: number; name: string; role: string; x?: number; y?: number; accent?: string; out?: number}> = ({frame, at, name, role, x = 70, y = 760, accent = '#7FE3FF', out}) => {
  if (frame < at) return null;
  const bar = prog(frame, at, at + 12, E.out);
  const t1 = spr(frame, at + 5, {damping: 16, stiffness: 160});
  const t2 = spr(frame, at + 10, {damping: 16, stiffness: 160});
  const o = out !== undefined ? 1 - prog(frame, out, out + 10, E.in) : 1;
  return (
    <div style={{position: 'absolute', left: x, top: y, opacity: o}}>
      <div style={{width: 8, height: 120, background: accent, position: 'absolute', left: 0, top: 0, transform: `scaleY(${bar})`, transformOrigin: 'top'}} />
      <div style={{marginLeft: 28, overflow: 'hidden'}}>
        <div style={{fontFamily: F.display, fontSize: 76, lineHeight: 1, color: '#F2EEE6', transform: `translateY(${(1 - t1) * 100}%)`}}>{name}</div>
      </div>
      <div style={{marginLeft: 28, overflow: 'hidden', marginTop: 8}}>
        <div style={{fontFamily: F.mono, fontSize: 28, letterSpacing: '0.14em', color: accent, transform: `translateY(${(1 - t2) * 100}%)`}}>{role}</div>
      </div>
    </div>
  );
};

export const SourceTag: React.FC<{frame: number; at: number; text: string; x?: number; y?: number; color?: string}> = ({frame, at, text, x = 70, y = 90, color = '#9FB3C4'}) => {
  const k = prog(frame, at, at + 10, E.out);
  return <div style={{position: 'absolute', left: x, top: y, fontFamily: F.mono, fontSize: 22, letterSpacing: '0.12em', color, opacity: k, transform: `translateX(${(1 - k) * -20}px)`}}>{text}</div>;
};
