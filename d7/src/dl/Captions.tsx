/**
 * Datologo 7 · Subtítulos palabra por palabra (regla de la Biblia: solo abajo, una fuente, un color).
 * Grupos de máx. 3 palabras cortados en puntuación; el grupo entra con rebote y la palabra hablada hace "pop".
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {measureText} from '@remotion/layout-utils';
import {F} from './fonts';
import {FPS, clamp01, spr} from './motion';
import type {Word} from './timing';

type Group = {words: Word[]; s: number; e: number};

export const groupWords = (words: Word[], max = 3): Group[] => {
  const out: Group[] = [];
  let cur: Word[] = [];
  const flush = () => {
    if (cur.length) out.push({words: cur, s: cur[0].s, e: cur[cur.length - 1].e});
    cur = [];
  };
  words.forEach((wd, i) => {
    cur.push(wd);
    const next = words[i + 1];
    const punct = /[.,:;?!…]$/.test(wd.t);
    const pause = next ? next.s - wd.e > 0.28 : true;
    if (cur.length >= max || punct || pause) flush();
  });
  flush();
  return out;
};

export const Captions: React.FC<{words: Word[]; bottom?: number; size?: number; endAt?: number}> = ({words, bottom = 70, size = 62, endAt}) => {
  const frame = useCurrentFrame();
  const {width} = useVideoConfig();
  const t = frame / FPS;
  const groups = React.useMemo(() => groupWords(words), [words]);
  const gi = groups.findIndex((g, i) => t >= g.s - 0.05 && t < (groups[i + 1] ? groups[i + 1].s - 0.05 : g.e + 0.6));
  if (gi < 0 || (endAt !== undefined && frame > endAt)) return null;
  const g = groups[gi];
  const enter = spr(frame, Math.round((g.s - 0.05) * FPS), {damping: 11, stiffness: 220, mass: 0.6});
  // ajuste automático: si el grupo no cabe en el 86 % del ancho, se reduce (hasta 62 %) y si aún no cabe, pasa a 2 líneas
  const label = g.words.map((wd) => wd.t.replace(/[¡!.,:;…]/g, '')).join(' ').toUpperCase();
  const maxW = width * 0.86 - 40;
  let fit = 1;
  let wrap = false;
  try {
    const m = measureText({text: label, fontFamily: 'Montserrat', fontSize: size, fontWeight: '900', letterSpacing: '-0.01em'});
    const wTotal = m.width * 1.06 + g.words.length * size * 0.36;
    if (wTotal > maxW) fit = Math.max(0.62, maxW / wTotal);
    if (wTotal * fit > maxW) wrap = true;
  } catch {
    fit = label.length > 18 ? 0.75 : 1;
  }
  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: bottom, pointerEvents: 'none'}}>
      <div
        style={{
          maxWidth: width * 0.86,
          textAlign: 'center',
          fontFamily: F.caption,
          fontWeight: 900,
          fontSize: size * fit,
          lineHeight: 1.05,
          letterSpacing: '-0.01em',
          color: '#FFFFFF',
          textTransform: 'uppercase',
          transform: `translateY(${(1 - enter) * 26}px) scale(${0.86 + 0.14 * enter})`,
          opacity: clamp01(enter * 1.6),
          WebkitTextStroke: '10px rgba(6,8,12,0.92)',
          paintOrder: 'stroke fill',
          textShadow: '0 6px 18px rgba(0,0,0,0.55)',
          whiteSpace: wrap ? 'normal' : 'nowrap',
        }}
      >
        {g.words.map((wd, i) => {
          const on = t >= wd.s - 0.03;
          const pop = on ? spr(frame, Math.round((wd.s - 0.03) * FPS), {damping: 10, stiffness: 260, mass: 0.5}) : 0;
          const k = on ? 1 + 0.12 * Math.sin(Math.PI * clamp01(pop)) * (1 - clamp01((t - wd.s) / 0.3)) : 1;
          return (
            <span key={i} style={{display: 'inline-block', margin: '0 0.18em', transform: `scale(${k})`, opacity: on ? 1 : 0.45}}>
              {wd.t.replace(/[¿?¡!.,:;…]/g, (m) => (m === '¿' || m === '?' ? m : ''))}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
