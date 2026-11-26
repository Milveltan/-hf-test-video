/**
 * Biblioteca Datologo · Visualización de datos.
 *  - TimelineRuler: regla de años que se desliza con una aguja; resalta un rango con corchete.
 *  - PercentRing: anillo de porcentaje con contador (porcentajes reales, siempre con fuente).
 *  - StreamSplit: flujo de partículas que se divide en dos corrientes según una proporción (tráfico, población, energía).
 *  - IsoGrid: cuadrícula de pictogramas (n de 100) que cambian de estado en cascada.
 */
import React from 'react';
import {F} from '../fonts';
import {E, clamp01, prog, rng} from '../motion';
import {Pictogram} from '../characters/Bot';

export const TimelineRuler: React.FC<{frame: number; from: number; to: number; center: number; pxPerYear?: number; y?: number; range?: [number, number]; rangeK?: number; color?: string; accent?: string}> = ({
  frame, from, to, center, pxPerYear = 190, y = 640, range, rangeK = 0, color = '#9FB3C4', accent = '#FF3B3B',
}) => {
  const xOf = (yr: number) => 540 + (yr - center) * pxPerYear;
  const years = Array.from({length: to - from + 1}, (_, i) => from + i);
  return (
    <svg width={1080} height={1200} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
      <line x1={-100} y1={y} x2={1180} y2={y} stroke={color} strokeOpacity={0.5} strokeWidth={3} />
      {years.map((yr) => (
        <g key={yr}>
          {Array.from({length: 4}, (_, q) => <line key={q} x1={xOf(yr) + q * pxPerYear / 4} y1={y} x2={xOf(yr) + q * pxPerYear / 4} y2={y + (q ? 16 : 34)} stroke={color} strokeOpacity={q ? 0.35 : 0.8} strokeWidth={q ? 2 : 3} />)}
          <text x={xOf(yr)} y={y + 80} textAnchor="middle" fontFamily={F.mono} fontSize={40} fontWeight={700} fill={color} opacity={0.9}>{yr}</text>
        </g>
      ))}
      {range && rangeK > 0 && (
        <g>
          <rect x={xOf(range[0])} y={y - 70} width={(xOf(range[1]) - xOf(range[0])) * rangeK} height={70} fill={accent} opacity={0.18} />
          <path d={`M${xOf(range[0])} ${y - 20} L${xOf(range[0])} ${y - 90} L${xOf(range[0]) + (xOf(range[1]) - xOf(range[0])) * rangeK} ${y - 90} L${xOf(range[0]) + (xOf(range[1]) - xOf(range[0])) * rangeK} ${y - 20}`} stroke={accent} strokeWidth={6} fill="none" />
        </g>
      )}
    </svg>
  );
};

export const PercentRing: React.FC<{value: number; size?: number; stroke?: number; color?: string; track?: string; label?: string}> = ({value, size = 560, stroke = 46, color = '#FF3B3B', track = '#16324A', label}) => {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div style={{position: 'relative', width: size, height: size}}>
      <svg width={size} height={size} style={{transform: 'rotate(-90deg)'}}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke={track} strokeWidth={stroke} fill="none" />
        <circle cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={stroke} fill="none" strokeDasharray={c} strokeDashoffset={c * (1 - value / 100)} strokeLinecap="butt" style={{filter: `drop-shadow(0 0 18px ${color})`}} />
      </svg>
      <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{fontFamily: F.display, fontSize: size * 0.36, lineHeight: 1, color: '#F2EEE6'}}>{Math.round(value)}<span style={{fontSize: size * 0.18}}>%</span></div>
        {label ? <div style={{fontFamily: F.mono, fontSize: size * 0.045, letterSpacing: '0.18em', color, marginTop: 10}}>{label}</div> : null}
      </div>
    </div>
  );
};

/** partículas que entran por la izquierda y se bifurcan: share = fracción que toma la rama de arriba */
export const StreamSplit: React.FC<{frame: number; share: number; splitK: number; colorA?: string; colorB?: string; count?: number; y?: number; seed?: number}> = ({
  frame, share, splitK, colorA = '#FF3B3B', colorB = '#7FE3FF', count = 120, y = 600, seed = 3,
}) => {
  const r = rng(seed);
  return (
    <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
      {Array.from({length: count}, (_, i) => {
        const isA = i / count < share;
        const ph = r(), sp = 4 + r() * 3, lane = (r() - 0.5) * 60;
        const x = ((ph * 1300 + frame * sp) % 1300) - 110;
        const t = clamp01((x - 420) / 420) * splitK;
        const dy = (isA ? -1 : 1) * 260 * E.inOut(t);
        const col = splitK > 0.05 && x > 380 ? (isA ? colorA : colorB) : '#C9D6E0';
        return <rect key={i} x={x} y={y + lane + dy} width={18 + sp * 2} height={5} rx={2.5} fill={col} opacity={0.8} />;
      })}
    </svg>
  );
};

export const IsoGrid: React.FC<{frame: number; at: number; total?: number; marked: number; cols?: number; markColor?: string; baseColor?: string; size?: number; each?: number; botMarked?: boolean; dimMarked?: number}> = ({
  frame, at, total = 100, marked, cols = 10, markColor = '#FF3B3B', baseColor = '#7FE3FF', size = 66, each = 0.35, botMarked = true, dimMarked = 0,
}) => (
  <div style={{display: 'grid', gridTemplateColumns: `repeat(${cols}, ${size}px)`, gap: size * 0.28}}>
    {Array.from({length: total}, (_, i) => {
      const k = prog(frame, at + i * each, at + i * each + 6, E.out);
      const isM = i < marked;
      return (
        <div key={i} style={{transform: `scale(${isM ? 1 - 0.08 * k : 1 + 0.12 * dimMarked})`, opacity: isM ? 1 - 0.65 * dimMarked : 1}}>
          <Pictogram color={isM && k > 0.5 ? markColor : baseColor} size={size} bot={botMarked && isM && k > 0.5} />
        </div>
      );
    })}
  </div>
);
