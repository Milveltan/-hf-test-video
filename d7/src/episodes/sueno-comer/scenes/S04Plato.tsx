/**
 * ESCENA 4 · "Si la comida fue grande o con muchas harinas y azúcar, el efecto es más fuerte."
 * Vista cenital del plato: crece ("grande"), caen pan y pasta ("harinas") y terrones/pastel ("azúcar"). Un medidor de sueño sube a lavanda en "más fuerte".
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {F} from '../../../dl/fonts';
import {spr} from '../../../dl/motion';
import {E, LW, Vig, Zzz, lerp, prog} from './common';
import {P} from './palette';

const drop = (f: number, at: number) => spr(f, at, {damping: 11, stiffness: 170});

export const S04Plato: React.FC<{lw: LW}> = ({lw}) => {
  const f = useCurrentFrame();
  const big = prog(f, lw(50), lw(52) + 6, E.out);
  const R = lerp(250, 360, big);
  const flour = drop(f, lw(55)), sugar = drop(f, lw(58));
  const meter = prog(f, lw(59), lw(63) + 6, E.out);
  const lvl = 0.25 + 0.2 * big + 0.15 * flour + 0.15 * sugar + 0.2 * meter;
  return (
    <AbsoluteFill style={{overflow: 'hidden', background: `radial-gradient(70% 60% at 45% 50%, ${P.cloth}, #D9C3A0)`}}>
      <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 12}, (_, i) => <line key={i} x1={i * 100} y1={0} x2={i * 100} y2={1200} stroke={P.terra} strokeWidth={14} opacity={0.12} />)}
        <circle cx={430} cy={600} r={R + 20} fill="#00000022" />
        <circle cx={430} cy={590} r={R} fill="#FFFFFF" /><circle cx={430} cy={590} r={R * 0.72} fill="#F3EEE4" />
        {/* guisado base */}
        <path d={`M${430 - R * 0.5} 600 q${R * 0.5} -${R * 0.4} ${R} 0 q-${R * 0.5} ${R * 0.4} -${R} 0`} fill={P.terra} opacity={0.9} />
        {/* pasta */}
        <g transform={`translate(330 ${lerp(-300, 500, Math.min(1, flour))}) scale(${flour})`}>{Array.from({length: 7}, (_, i) => <path key={i} d={`M0 ${i * 8} q40 -30 80 0 t80 0`} stroke="#F2C66B" strokeWidth={10} fill="none" strokeLinecap="round" />)}</g>
        {/* pan */}
        <g transform={`translate(560 ${lerp(-300, 470, Math.min(1, flour))}) rotate(-20) scale(${flour})`}><ellipse rx={80} ry={46} fill="#D9984A" /><path d="M-50 -10 l20 -20 M-10 -14 l20 -20 M30 -10 l20 -20" stroke="#A86A2A" strokeWidth={8} strokeLinecap="round" /></g>
        {/* azúcar: pastel y terrones */}
        <g transform={`translate(420 ${lerp(-300, 720, Math.min(1, sugar))}) scale(${sugar})`}><path d="M-70 30 L0 -50 L70 30 Z" fill="#FFD7E4" /><path d="M-70 30 h140 v24 h-140 z" fill="#F08AA8" /><circle cy={-50} r={12} fill={P.terra} /></g>
        {[0, 1, 2].map((i) => <rect key={i} x={560 + i * 46} y={lerp(-300, 690 + (i % 2) * 20, Math.min(1, drop(f, lw(58) + i * 3)))} width={38} height={38} rx={6} fill="#FFFFFF" stroke="#DDD" strokeWidth={3} />)}
        {/* medidor */}
        <rect x={880} y={260} width={90} height={660} rx={45} fill="#2A2240" />
        <rect x={895} y={275 + 630 * (1 - lvl)} width={60} height={630 * lvl} rx={30} fill={P.lav} style={{filter: `drop-shadow(0 0 ${20 * meter}px ${P.lav})`}} />
      </svg>
      <div style={{position: 'absolute', left: 830, width: 190, top: 940, textAlign: 'center', fontFamily: F.display, fontSize: 46, color: P.lavDeep}}>SUEÑO</div>
      <Zzz x={880} y={230} f={f} k={meter} s={0.9} />
      {[['GRANDE', lw(51), 200], ['HARINAS', lw(56), 300], ['AZÚCAR', lw(58), 400]].map(([t, at, y], i) => {
        const k = spr(f, at as number, {damping: 12, stiffness: 160});
        return <div key={i} style={{position: 'absolute', left: 60, top: (y as number) - 140, fontFamily: F.display, fontSize: 64, color: [P.ink, '#B8862E', '#E0607E'][i], opacity: Math.min(1, k), transform: `translateX(${(1 - k) * -80}px)`}}>{t as string}</div>;
      })}
      <Vig k={0.35} />
    </AbsoluteFill>
  );
};
