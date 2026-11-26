/**
 * Interfaz del foro (lienzo virtual 1600×1000). Se ve pequeña dentro del monitor y, cuando la cámara
 * entra en la pantalla, a pantalla completa: es el mismo objeto, así que el paso es continuo.
 * Título real del hilo original de enero de 2021: "Dead Internet Theory: Most Of The Internet Is Fake".
 */
import React from 'react';
import {F} from '../fonts';
import {E, bezier, clamp01, prog, spr, stagger} from '../motion';
const P = {phosphor: '#39FF8E', phosphorDim: '#1B8F55', alarm: '#FF3B3B'};

export const FORUM_W = 1600;
export const FORUM_H = 1000;
const TITLE_A = 'Dead Internet Theory:';
const TITLE_B = 'Most Of The Internet Is Fake';
const USER = 'IlluminatiPirate';
const GLYPHS = '#$%&@!?01XZ';

export type ForumTimes = {
  typeFrom: number; typeTo: number; redactAt: number; userAt: number;
  clickAt: number; repliesAt: number; markAt: number;
};

export const ForumScreen: React.FC<{frame: number; t: ForumTimes}> = ({frame, t}) => {
  const full = TITLE_A.length + TITLE_B.length;
  const typed = Math.floor(full * prog(frame, t.typeFrom, t.typeTo, E.linear));
  const tA = TITLE_A.slice(0, typed);
  const tB = TITLE_B.slice(0, Math.max(0, typed - TITLE_A.length));
  const caretOn = Math.floor(frame / 8) % 2 === 0 && frame < t.clickAt;

  // campo "publicado por": barra de censura que barre y luego decodificación del usuario
  const redact = prog(frame, t.redactAt, t.redactAt + 10, E.out);
  const decodeK = prog(frame, t.userAt, t.userAt + 14, E.linear);
  const userTxt = USER.split('')
    .map((ch, i) => (i / USER.length < decodeK ? ch : frame >= t.userAt ? GLYPHS[(i * 7 + Math.floor(frame / 1)) % GLYPHS.length] : ''))
    .join('');

  // clic en PUBLICAR
  const press = frame >= t.clickAt ? spr(frame, t.clickAt, {damping: 8, stiffness: 320, mass: 0.5}) : 0;
  const btnScale = frame < t.clickAt ? 1 : 0.9 + 0.1 * press;
  const ripple = prog(frame, t.clickAt, t.clickAt + 16, E.out);
  const posted = spr(frame, t.clickAt + 3, {damping: 13, stiffness: 150});
  const lift = frame >= t.clickAt + 3 ? posted : 0;

  // cursor: trayectoria curva hacia el botón
  const cur = bezier(prog(frame, t.clickAt - 26, t.clickAt - 1, E.inOut), [560, 960], [760, 1010], [1120, 700], [1040, 530]);

  // marcador rojo sobre la idea
  const mark = prog(frame, t.markAt, t.markAt + 14, E.out);

  return (
    <div style={{position: 'absolute', width: FORUM_W, height: FORUM_H, background: '#081210', overflow: 'hidden', fontFamily: F.ui}}>
      {/* trama de líneas de monitor */}
      <div style={{position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, rgba(57,255,142,0.035) 0 2px, transparent 2px 5px)'}} />
      {/* barra superior */}
      <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 74, background: '#0C1C17', borderBottom: `2px solid ${P.phosphorDim}`, display: 'flex', alignItems: 'center', padding: '0 40px', gap: 30, fontFamily: F.mono, fontSize: 26, color: P.phosphor}}>
        <span style={{fontWeight: 800}}>FORO</span>
        <span style={{opacity: 0.6}}>/ café / hilos</span>
        <span style={{marginLeft: 'auto', opacity: 0.6}}>ENE 2021</span>
      </div>
      {/* columnas laterales (contexto del foro) */}
      {[0, 1].map((s) => (
        <div key={s} style={{position: 'absolute', top: 110, [s ? 'right' : 'left']: 40, width: 250}}>
          {Array.from({length: 9}, (_, i) => (
            <div key={i} style={{height: 18, width: `${60 + ((i * 37) % 40)}%`, background: P.phosphorDim, opacity: 0.22, borderRadius: 4, marginBottom: 26}} />
          ))}
        </div>
      ))}
      {/* tarjeta central: compositor → hilo publicado */}
      <div
        style={{
          position: 'absolute',
          left: 400,
          top: 120,
          width: 800,
          padding: '34px 40px 36px',
          boxSizing: 'border-box',
          borderRadius: 18,
          background: `linear-gradient(170deg, #10241D, #0B1915)`,
          border: `2px solid ${lift > 0.01 ? P.phosphor : P.phosphorDim}`,
          boxShadow: `0 ${20 + 40 * lift}px ${60 + 60 * lift}px rgba(0,0,0,${0.5 + 0.2 * lift}), 0 0 ${40 * lift}px rgba(57,255,142,${0.25 * lift})`,
          transform: `translateY(${-14 * lift}px) scale(${1 + 0.025 * lift})`,
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: 16, fontFamily: F.mono, fontSize: 22, color: P.phosphor, letterSpacing: '0.12em'}}>
          <span style={{padding: '6px 14px', border: `2px solid ${P.phosphor}`, borderRadius: 6, transform: `scale(${frame >= t.clickAt + 4 ? 1 + 0.25 * (1 - spr(frame, t.clickAt + 4, {damping: 9, stiffness: 260})) : 1})`, background: frame >= t.clickAt + 4 ? P.phosphor : 'transparent', color: frame >= t.clickAt + 4 ? '#06110C' : P.phosphor}}>
            {frame >= t.clickAt + 4 ? 'HILO PUBLICADO' : 'NUEVO HILO'}
          </span>
        </div>
        <div style={{marginTop: 26, fontFamily: F.grotesk, fontWeight: 700, fontSize: 56, lineHeight: 1.1, color: '#E9FFF2', minHeight: 140}}>
          <div>{tA}{typed <= TITLE_A.length && caretOn ? <span style={{color: P.phosphor}}>▍</span> : null}</div>
          <div style={{position: 'relative', display: 'inline-block'}}>
            <span style={{position: 'absolute', left: -8, right: -8, top: '12%', bottom: '6%', background: P.alarm, opacity: 0.85, transformOrigin: 'left center', transform: `scaleX(${mark})`, borderRadius: 6}} />
            <span style={{position: 'relative', color: mark > 0.6 ? '#FFFFFF' : '#E9FFF2'}}>{tB}</span>
            {typed > TITLE_A.length && caretOn ? <span style={{color: P.phosphor}}>▍</span> : null}
          </div>
        </div>
        {Array.from({length: 3}, (_, i) => (
          <div key={i} style={{height: 16, borderRadius: 6, marginTop: 20, width: `${[94, 88, 62][i]}%`, background: '#3E6B57', opacity: 0.45 * clamp01((frame - t.typeFrom) / 12)}} />
        ))}
        <div style={{marginTop: 34, display: 'flex', alignItems: 'center', gap: 16, fontFamily: F.mono, fontSize: 28, color: '#9FD8B8'}}>
          <span style={{opacity: 0.8, whiteSpace: 'nowrap'}}>publicado por:</span>
          <span style={{position: 'relative', minWidth: 290, height: 40, display: 'inline-flex', alignItems: 'center', color: P.phosphor, fontWeight: 800}}>
            <span style={{position: 'absolute', left: 0, top: 2, height: 36, width: 290 * redact * (1 - decodeK), background: '#E9FFF2'}} />
            <span style={{position: 'relative'}}>{userTxt}</span>
          </span>
          <div
            style={{
              marginLeft: 'auto',
              position: 'relative',
              padding: '16px 34px',
              borderRadius: 12,
              background: P.phosphor,
              color: '#06110C',
              fontWeight: 800,
              letterSpacing: '0.1em',
              transform: `scale(${btnScale})`,
              boxShadow: `0 0 ${30 + 30 * ripple}px rgba(57,255,142,0.45)`,
            }}
          >
            PUBLICAR
            {ripple > 0 && ripple < 1 && (
              <span style={{position: 'absolute', left: '50%', top: '50%', width: 300 * ripple, height: 300 * ripple, marginLeft: -150 * ripple, marginTop: -150 * ripple, borderRadius: '50%', border: `4px solid ${P.phosphor}`, opacity: 1 - ripple}} />
            )}
          </div>
        </div>
      </div>
      {/* respuestas que llegan en cascada */}
      {Array.from({length: 5}, (_, i) => {
        const k = spr(frame, t.repliesAt + stagger(i, 5, 3.5), {damping: 14, stiffness: 170});
        if (frame < t.repliesAt) return null;
        return (
          <div key={i} style={{position: 'absolute', left: 440 + (i % 2) * 30, top: 660 + i * 84, width: 720 - (i % 2) * 30, height: 68, borderRadius: 14, background: '#0E1F19', border: `1.5px solid ${P.phosphorDim}`, opacity: k, transform: `translateY(${(1 - k) * 60}px)`, display: 'flex', alignItems: 'center', gap: 18, padding: '0 22px', boxSizing: 'border-box'}}>
            <div style={{width: 38, height: 38, borderRadius: 19, background: `hsl(${140 + i * 25} 30% ${25 + i * 4}%)`}} />
            <div style={{height: 14, width: `${50 + ((i * 23) % 35)}%`, background: '#3E6B57', borderRadius: 6, opacity: 0.6}} />
          </div>
        );
      })}
      {/* cursor */}
      {frame >= t.clickAt - 30 && frame < t.clickAt + 24 && (
        <svg width={56} height={70} viewBox="0 0 28 35" style={{position: 'absolute', left: cur[0], top: cur[1], transform: `scale(${frame >= t.clickAt && frame < t.clickAt + 4 ? 0.85 : 1})`, filter: 'drop-shadow(0 6px 8px rgba(0,0,0,0.6))'}}>
          <path d="M2 2 L2 28 L9 21 L14 33 L19 31 L14 19 L24 19 Z" fill="#F4FFF8" stroke="#06110C" strokeWidth={2} strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
};
