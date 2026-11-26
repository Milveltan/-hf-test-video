/**
 * Biblioteca Datologo · Tipografía cinética.
 *  - MaskRise: letras o palabras que suben desde una máscara, escalonadas (editorial).
 *  - SlamWord: palabra que golpea con rebote y separación RGB (impacto).
 *  - Odometer: dígitos que ruedan como un contador mecánico (años, cifras, porcentajes).
 *  - TypeOn: texto que se escribe con cursor.
 * Todos reciben `frame` y un fotograma de inicio `at` (anclado a palabra).
 */
import React from 'react';
import {clamp01, prog, spr, stagger, E} from '../motion';

type Base = {frame: number; at: number; style?: React.CSSProperties};

export const MaskRise: React.FC<Base & {text: string; by?: 'letter' | 'word'; each?: number; from?: 'start' | 'center' | 'end'; out?: number}> = ({frame, at, text, by = 'letter', each = 1, from = 'start', out, style}) => {
  const parts = by === 'letter' ? text.split('') : text.split(' ');
  const outK = out !== undefined ? prog(frame, out, out + 10, E.in) : 0;
  return (
    <div style={{whiteSpace: 'pre', ...style}}>
      {parts.map((p, i) => {
        const k = spr(frame, at + stagger(i, parts.length, each, from), {damping: 14, stiffness: 180, mass: 0.7});
        return (
          <React.Fragment key={i}>
            <span style={{display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', paddingTop: '0.08em', paddingBottom: '0.04em'}}>
              <span style={{display: 'inline-block', transform: `translateY(${(1 - k) * 108 + outK * -108}%)`}}>{p}</span>
            </span>
            {by === 'word' && i < parts.length - 1 ? ' ' : null}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export const SlamWord: React.FC<Base & {text: string; colorA?: string; colorB?: string; split?: number}> = ({frame, at, text, colorA = '#FF3B3B', colorB = '#7FE3FF', split = 14, style}) => {
  if (frame < at) return null;
  const k = spr(frame, at, {damping: 9, stiffness: 180, mass: 0.8});
  const s = (1 - clamp01((frame - at) / 8)) * split;
  return (
    <div style={{position: 'relative', display: 'inline-block', transform: `scale(${0.6 + 0.4 * k})`, ...style}}>
      <span style={{position: 'absolute', left: -s, top: 0, color: colorA, opacity: 0.7, mixBlendMode: 'screen'}}>{text}</span>
      <span style={{position: 'absolute', left: s, top: 0, color: colorB, opacity: 0.7, mixBlendMode: 'screen'}}>{text}</span>
      <span style={{position: 'relative'}}>{text}</span>
    </div>
  );
};

/** Contador mecánico: cada dígito rueda hasta su valor; `value` puede animarse desde fuera */
export const Odometer: React.FC<{value: number; digits: number; style?: React.CSSProperties; digitStyle?: React.CSSProperties; suffix?: string}> = ({value, digits, style, digitStyle, suffix}) => {
  const v = Math.max(0, value);
  return (
    <div style={{display: 'inline-flex', lineHeight: 1, ...style}}>
      {Array.from({length: digits}, (_, i) => {
        const p = Math.pow(10, digits - 1 - i);
        // posición continua de este dígito (con arrastre suave del de la derecha)
        const raw = v / p;
        const base = Math.floor(raw) % 10;
        const frac = raw - Math.floor(raw);
        const carry = p > 1 ? Math.max(0, (frac - 0.9) * 10) : frac;
        const pos = base + (p > 1 ? carry : 0);
        return (
          <span key={i} style={{display: 'inline-block', width: '0.56em', textAlign: 'center', height: '1em', lineHeight: '1em', overflow: 'hidden', position: 'relative', ...digitStyle}}>
            <span style={{display: 'block', transform: `translateY(${-pos}em)`}}>
              {Array.from({length: 11}, (_, d) => (
                <span key={d} style={{display: 'block', height: '1em', lineHeight: '1em'}}>{d % 10}</span>
              ))}
            </span>
          </span>
        );
      })}
      {suffix ? <span>{suffix}</span> : null}
    </div>
  );
};

export const TypeOn: React.FC<Base & {text: string; cps?: number; caret?: string}> = ({frame, at, text, cps = 22, caret = '▍', style}) => {
  const n = Math.max(0, Math.min(text.length, Math.floor(((frame - at) / 30) * cps)));
  const done = n >= text.length;
  return (
    <span style={style}>
      {text.slice(0, n)}
      {(!done || Math.floor(frame / 9) % 2 === 0) && frame >= at ? <span style={{opacity: 0.9}}>{caret}</span> : null}
    </span>
  );
};
