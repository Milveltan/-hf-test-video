/**
 * Biblioteca DROGMAN · Cine: Idea (bombilla luminosa con rayos; glow 0 = apagada en gris), FilmCard (fotograma con perforaciones que
 * encierra cualquier contenido 1080×1200 escalado a `w`; glow resalta, dim oscurece) y Clapper (claqueta: k 0 abierta → 1 cerrada).
 */
import React from 'react';
import {F} from '../fonts';
import {HOME_COLORS as P} from '../environments/Home';

/** La idea pendiente: bombilla luminosa con rayos que respiran. */
export const Idea: React.FC<{x: number; y: number; f: number; s?: number; glow?: number; opacity?: number; rays?: number}> = ({x, y, f, s = 1, glow = 1, opacity = 1, rays = 1}) => {
  const bob = Math.sin(f * 0.09) * 6 * s;
  const pulse = 1 + Math.sin(f * 0.14) * 0.05;
  return (
    <div style={{position: 'absolute', left: x, top: y + bob, width: 0, height: 0, opacity, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: -260 * s * pulse, top: -260 * s * pulse, width: 520 * s * pulse, height: 520 * s * pulse, borderRadius: '50%', background: `radial-gradient(circle, ${P.idea}${Math.round(Math.min(1, 0.7 * glow) * 255).toString(16).padStart(2, '0')} 0%, ${P.ideaDeep}00 68%)`}} />
      <svg width={220 * s} height={260 * s} viewBox="-110 -130 220 260" style={{position: 'absolute', left: -110 * s, top: -130 * s, overflow: 'visible', filter: glow < 1 ? `grayscale(${1 - Math.max(0, glow)}) brightness(${0.55 + 0.45 * Math.max(0, glow)})` : undefined}}>
        <defs><radialGradient id="ideaG" cx="0.4" cy="0.35" r="0.8"><stop offset="0" stopColor="#FFFBE0" /><stop offset="0.55" stopColor={P.idea} /><stop offset="1" stopColor={P.ideaDeep} /></radialGradient></defs>
        {Array.from({length: 10}, (_, i) => {
          const a = (i / 10) * Math.PI * 2 + f * 0.012, l0 = 64, l1 = 84 + Math.sin(f * 0.2 + i * 1.7) * 8;
          return <line key={i} x1={Math.cos(a) * l0} y1={Math.sin(a) * l0 - 10} x2={Math.cos(a) * l1} y2={Math.sin(a) * l1 - 10} stroke={P.idea} strokeWidth={6} strokeLinecap="round" opacity={0.75 * glow * rays} />;
        })}
        <path d="M-36 20 C-62 -6 -56 -62 0 -66 C56 -62 62 -6 36 20 C26 32 24 40 24 52 H-24 C-24 40 -26 32 -36 20 Z" fill="url(#ideaG)" stroke="#00000033" strokeWidth={3} opacity={0.4 + 0.6 * Math.min(1, glow)} />
        <path d="M-14 46 v-22 l14 -18 l14 18 v22" stroke={P.ideaDeep} strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={glow} />
        <rect x={-24} y={52} width={48} height={14} rx={5} fill={P.metalDark} /><rect x={-20} y={66} width={40} height={12} rx={5} fill={P.metal} /><rect x={-10} y={78} width={20} height={8} rx={4} fill={P.metalDark} />
      </svg>
    </div>
  );
};

/** Tarjeta de capítulo estilo fotograma de película. Contenido interno 1080×1200 escalado a `w`. */
export const FilmCard: React.FC<{w: number; children?: React.ReactNode; glow?: number; dim?: number; style?: React.CSSProperties}> = ({w, children, glow = 0, dim = 0, style}) => {
  const sc = w / 300, h = (w * 1200) / 1080, bar = 30 * sc, hole = 12 * sc;
  const n = Math.floor(w / (22 * sc));
  return (
    <div style={{position: 'relative', width: w + 16 * sc, height: h + bar * 2, background: P.film, borderRadius: 10 * sc, boxShadow: glow > 0 ? `0 0 ${50 * glow}px ${P.tungsten}, 0 0 0 ${3 * sc}px ${P.tungsten}` : '0 14px 40px rgba(0,0,0,0.55)', ...style}}>
      {[0, 1].map((side) => Array.from({length: n}, (_, i) => (
        <div key={`${side}-${i}`} style={{position: 'absolute', left: 8 * sc + (i + 0.5) * ((w) / n) - hole / 2, top: side === 0 ? (bar - hole * 0.8) / 2 : bar + h + (bar - hole * 0.8) / 2, width: hole, height: hole * 0.8, borderRadius: 3 * sc, background: P.cream, opacity: 0.85}} />
      )))}
      <div style={{position: 'absolute', left: 8 * sc, top: bar, width: w, height: h, overflow: 'hidden', borderRadius: 4 * sc}}>
        <div style={{width: 1080, height: 1200, transformOrigin: '0 0', transform: `scale(${w / 1080})`, position: 'relative'}}>{children}</div>
        {dim > 0 && <div style={{position: 'absolute', inset: 0, background: P.night, opacity: dim}} />}
      </div>
    </div>
  );
};

/** Claqueta de cine. k: 0 abierta → 1 cerrada. */
export const Clapper: React.FC<{k: number; x: number; y: number; s?: number; scene?: string; take?: string}> = ({k, x, y, s = 1, scene = '2', take = '1'}) => (
  <svg width={520 * s} height={420 * s} viewBox="0 0 520 420" style={{position: 'absolute', left: x - 260 * s, top: y - 210 * s, overflow: 'visible'}}>
    <rect x={10} y={120} width={500} height={290} rx={14} fill={P.film} stroke={P.cream} strokeWidth={6} />
    {[0, 1, 2].map((i) => <line key={i} x1={10} y1={200 + i * 70} x2={510} y2={200 + i * 70} stroke={P.cream} strokeWidth={3} opacity={0.5} />)}
    <text x={36} y={186} fontFamily={F.mono} fontWeight={700} fontSize={30} fill={P.muted}>ESC.</text><text x={170} y={190} fontFamily={F.display} fontSize={56} fill={P.cream}>{scene}</text>
    <text x={270} y={186} fontFamily={F.mono} fontWeight={700} fontSize={30} fill={P.muted}>TOMA</text><text x={404} y={190} fontFamily={F.display} fontSize={56} fill={P.cream}>{take}</text>
    <text x={36} y={330} fontFamily={F.mono} fontWeight={700} fontSize={30} fill={P.muted}>CAPÍTULO</text><text x={250} y={336} fontFamily={F.display} fontSize={64} fill={P.tungsten}>NUEVO</text>
    <rect x={10} y={96} width={500} height={34} fill={P.film} stroke={P.cream} strokeWidth={4} />
    {Array.from({length: 7}, (_, i) => <polygon key={i} points={`${10 + i * 71},96 ${50 + i * 71},96 ${22 + i * 71},130 ${-18 + i * 71 + 10},130`} fill={P.cream} opacity={0.9} />)}
    <g transform={`rotate(${-30 * (1 - k)} 10 96)`}>
      <rect x={10} y={46} width={500} height={50} fill={P.film} stroke={P.cream} strokeWidth={4} />
      {Array.from({length: 7}, (_, i) => <polygon key={i} points={`${10 + i * 71},46 ${50 + i * 71},46 ${22 + i * 71},96 ${-18 + i * 71 + 10},96`} fill={P.cream} opacity={0.9} />)}
    </g>
  </svg>
);
