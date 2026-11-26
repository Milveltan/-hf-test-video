/**
 * Biblioteca Datologo · Tarjeta de publicación de red social (genérica, sin marcas).
 * flip 0→1 gira el avatar y convierte la publicación en "bot" (borde rojo, imagen desaturada).
 */
import React from 'react';
import {F} from '../fonts';
import {clamp01, rng} from '../motion';
import {BotFace, HumanFace} from '../characters/Avatars';

export const FEED = {panel: '#0D1822', panel2: '#132331', muted: '#7C93A6', ui: '#7FE3FF', alarm: '#FF3B3B'};
export const CARD_W = 330;
export const CARD_GAP = 34;
export type Card = {h: number; img: boolean; lines: number; hue: number; likes: number};

/** genera columnas de tarjetas deterministas */
export const makeCards = (cols: number, rows: number, seed = 2021): Card[][] => {
  const r = rng(seed);
  const out = Array.from({length: cols}, () =>
    Array.from({length: rows}, () => ({h: 0, img: r() < 0.45, lines: 2 + Math.floor(r() * 3), hue: Math.floor(r() * 360), likes: Math.floor(r() * 900) + 40})),
  );
  out.forEach((col) => col.forEach((c) => (c.h = 138 + c.lines * 26 + (c.img ? 190 : 0))));
  return out;
};

export const FeedCard: React.FC<{c: Card; flip: number; frame: number; idx: number}> = ({c, flip, frame, idx}) => {
  const isBot = flip > 0.5;
  const scaleX = Math.abs(Math.cos(flip * Math.PI));
  const scan = 0.5 + 0.5 * Math.sin(frame * 0.35 + idx);
  const red = clamp01((flip - 0.5) * 2);
  return (
    <div
      style={{
        width: CARD_W,
        height: c.h,
        marginBottom: CARD_GAP,
        borderRadius: 26,
        background: `linear-gradient(160deg, ${FEED.panel2}, ${FEED.panel})`,
        boxShadow: `0 30px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07), 0 0 0 ${1.5 + red * 1.5}px rgba(${Math.round(30 + red * 225)},${Math.round(52 - red * 20)},${Math.round(69 - red * 30)},1)`,
        padding: 22,
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
        <div style={{transform: `scaleX(${scaleX})`, width: 84, height: 84}}>{isBot ? <BotFace scan={scan} /> : <HumanFace hue={c.hue} />}</div>
        <div>
          <div style={{width: 120 + (c.hue % 60), height: 14, borderRadius: 7, background: isBot ? '#C9555A' : '#C9D6E0', opacity: 0.9}} />
          <div style={{width: 80, height: 10, borderRadius: 5, background: FEED.muted, opacity: 0.6, marginTop: 9}} />
        </div>
      </div>
      {Array.from({length: c.lines}, (_, i) => (
        <div key={i} style={{height: 12, borderRadius: 6, marginTop: 14, width: `${i === c.lines - 1 ? 55 + (c.hue % 30) : 92 - (i % 2) * 8}%`, background: '#5E7486', opacity: 0.55}} />
      ))}
      {c.img && (
        <div
          style={{
            marginTop: 18,
            height: 170,
            borderRadius: 16,
            background: `linear-gradient(${c.hue}deg, hsl(${c.hue} 55% 38%), hsl(${(c.hue + 70) % 360} 60% 22%))`,
            filter: isBot ? 'saturate(0.2) hue-rotate(-30deg)' : undefined,
          }}
        />
      )}
      <div style={{position: 'absolute', right: 22, bottom: 16, fontFamily: F.mono, fontSize: 18, color: isBot ? FEED.alarm : FEED.ui, opacity: 0.85}}>
        ♥ {c.likes + Math.floor(frame * (0.6 + (c.hue % 5) * 0.4))}
      </div>
    </div>
  );
};

