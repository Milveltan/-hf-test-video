/**
 * Biblioteca Datologo · Escenario "cuarto oscuro con monitor" (1080×1200): pared con luz del monitor,
 * ventana nocturna con bokeh y lluvia, repisa, cable que oscila, escritorio, monitor y teclado en perspectiva.
 * La pantalla está en SCR (coordenadas del mundo) para colocar cualquier interfaz dentro y entrar con la cámara.
 * Props: flicker (−1..1 parpadeo), typing (0/1 teclas encendidas), glowColor.
 */
import React from 'react';
import {noise1, rng} from '../motion';

const P = {phosphor: '#39FF8E', phosphorDim: '#1B8F55'};
export const SCR = {x: 300, y: 250, w: 640, h: 400};

const Rain: React.FC<{frame: number}> = ({frame}) => {
  const r = rng(7);
  return (
    <>
      {Array.from({length: 40}, (_, i) => {
        const x = r() * 260, sp = 14 + r() * 10, len = 18 + r() * 26, ph = r() * 400;
        const y = ((frame * sp + ph) % 420) - 40;
        return <line key={i} x1={x} y1={y} x2={x - 3} y2={y + len} stroke="#9CC9FF" strokeOpacity={0.25 + r() * 0.25} strokeWidth={1.4} />;
      })}
    </>
  );
};

export const Room: React.FC<{frame: number; flicker: number; typing: number; breathe: number}> = ({frame, flicker, typing, breathe}) => {
  const r = rng(11);
  const bokeh = React.useMemo(() => Array.from({length: 26}, () => ({x: r() * 250, y: 120 + r() * 260, s: 6 + r() * 16, c: r() < 0.6 ? '#FFB45A' : '#6FB7FF', o: 0.25 + r() * 0.5})), []);
  const glow = 0.85 + 0.15 * flicker;
  return (
    <svg width={1080} height={1200} viewBox="0 0 1080 1200" style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
      <defs>
        <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0A1218" />
          <stop offset="100%" stopColor="#04080B" />
        </linearGradient>
        <radialGradient id="mglow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor={P.phosphor} stopOpacity={0.32} />
          <stop offset="100%" stopColor={P.phosphor} stopOpacity={0} />
        </radialGradient>
        <linearGradient id="desk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A1712" />
          <stop offset="100%" stopColor="#090807" />
        </linearGradient>
        <linearGradient id="hood" x1="0.2" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#1A2430" />
          <stop offset="60%" stopColor="#0B1118" />
          <stop offset="100%" stopColor="#04070A" />
        </linearGradient>
        <linearGradient id="back" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#151E28" />
          <stop offset="100%" stopColor="#05080B" />
        </linearGradient>
        <linearGradient id="hoodLit" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0.55" stopColor={P.phosphor} stopOpacity={0} />
          <stop offset="1" stopColor={P.phosphor} stopOpacity={0.22} />
        </linearGradient>
        <filter id="soft"><feGaussianBlur stdDeviation="6" /></filter>
        <filter id="bk"><feGaussianBlur stdDeviation="3.5" /></filter>
        <clipPath id="win"><rect x={40} y={90} width={250} height={330} rx={6} /></clipPath>
      </defs>
      {/* pared y luz verde del monitor proyectada */}
      <rect width={1080} height={1200} fill="url(#wall)" />
      <ellipse cx={620} cy={430} rx={560} ry={420} fill="url(#mglow)" opacity={glow} />
      {/* ventana con ciudad nocturna y lluvia */}
      <g clipPath="url(#win)">
        <rect x={40} y={90} width={250} height={330} fill="#08182A" />
        <g filter="url(#bk)">{bokeh.map((b, i) => <circle key={i} cx={40 + b.x} cy={b.y} r={b.s} fill={b.c} opacity={b.o * (0.8 + 0.2 * Math.sin(frame * 0.05 + i))} />)}</g>
        <g transform="translate(40 90)"><Rain frame={frame} /></g>
      </g>
      <rect x={40} y={90} width={250} height={330} rx={6} fill="none" stroke="#1E2A33" strokeWidth={10} />
      <line x1={165} y1={90} x2={165} y2={420} stroke="#1E2A33" strokeWidth={7} />
      {/* repisa con objetos (silueta con borde iluminado) */}
      <rect x={830} y={150} width={250} height={10} fill="#16202A" />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={850 + i * 52} y={150 - 40 - (i % 2) * 22} width={40} height={40 + (i % 2) * 22} fill="#0E161D" stroke={P.phosphor} strokeOpacity={0.18} />)}
      {/* cable colgando que oscila */}
      <path d={`M1000 0 C ${990 + 8 * Math.sin(frame * 0.04)} 120 ${1010 + 6 * Math.sin(frame * 0.05)} 220 ${985} 330`} stroke="#0F1A22" strokeWidth={5} fill="none" />
      {/* escritorio */}
      <path d="M0 760 L1080 740 L1080 1200 L0 1200 Z" fill="url(#desk)" />
      <ellipse cx={620} cy={790} rx={380} ry={60} fill={P.phosphor} opacity={0.12 * glow} filter="url(#soft)" />
      {/* monitor */}
      <rect x={SCR.x - 22} y={SCR.y - 22} width={SCR.w + 44} height={SCR.h + 44} rx={16} fill="#0B0F12" stroke="#222C33" strokeWidth={2} />
      <path d={`M${SCR.x + SCR.w / 2 - 40} ${SCR.y + SCR.h + 22} L${SCR.x + SCR.w / 2 + 40} ${SCR.y + SCR.h + 22} L${SCR.x + SCR.w / 2 + 60} 752 L${SCR.x + SCR.w / 2 - 60} 752 Z`} fill="#0D1216" />
      <rect x={SCR.x + SCR.w / 2 - 120} y={748} width={240} height={14} rx={5} fill="#141B20" />
      {/* teclado en perspectiva */}
      <path d="M560 812 L930 800 L960 868 L540 884 Z" fill="#0E1418" stroke="#24313A" />
      {Array.from({length: 3}, (_, row) =>
        Array.from({length: 12}, (_, k) => (
          <rect key={`${row}-${k}`} x={572 + k * 30 + row * 5} y={820 - row * -18 + row * 2} width={24} height={12} rx={2} fill={P.phosphor} opacity={0.05 + (typing > 0 && (k * 7 + row * 3 + Math.floor(frame / 2)) % 9 === 0 ? 0.35 : 0)} />
        )),
      )}
    </svg>
  );
};


