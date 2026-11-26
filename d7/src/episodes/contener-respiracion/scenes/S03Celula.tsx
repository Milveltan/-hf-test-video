/**
 * ESCENA 3 · "Tus células siguen consumiendo oxígeno… y fabricando dióxido de carbono."
 * Cambio de escala: dentro del pecho, una célula. El O₂ (turquesa) entra desde un capilar y sus mitocondrias lo queman;
 * en "fabricando" empiezan a salir moléculas de CO₂ (ámbar) de vuelta a la sangre.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {F} from '../../../dl/fonts';
import {E, clamp01, lerp, prog, rng} from '../../../dl/motion';
import {BloodFlow} from '../../../dl/anatomy/Anatomy';
import {Annotation} from '../../../dl/editorial/Editorial';
import {Abyss} from './common';
import {P} from './palette';

const MITO = [[430, 560, 20], [640, 520, -30], [560, 720, 10], [720, 680, 40], [390, 720, -50]];

export const S03Celula: React.FC<{lw: (i: number, off?: number) => number}> = ({lw}) => {
  const f = useCurrentFrame();
  const zoom = lerp(1.7, 1, prog(f, 0, 26, E.out));
  const co2On = prog(f, lw(25, -4), lw(26, 6));
  const r = rng(9);
  const o2 = Array.from({length: 26}, (_, i) => ({sx: 80 + r() * 520, m: i % 5, o: r(), sp: 0.018 + r() * 0.012}));
  const co2 = Array.from({length: 26}, (_, i) => ({ex: 560 + r() * 460, m: i % 5, o: r(), sp: 0.016 + r() * 0.01}));
  const capY = (x: number) => 250 - Math.sin((x / 1080) * Math.PI) * 80;
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <Abyss frame={f + 300} tint="#0E2A3A" light={0.5} />
      <AbsoluteFill style={{transform: `scale(${zoom})`, transformOrigin: '540px 600px'}}>
        <BloodFlow frame={f} d="M-80 290 C 300 130 780 130 1160 290" width={96} o2={0.95} speed={5} cells={20} id="s3bf" />
        <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
          <defs>
            <radialGradient id="s3c" cx="0.45" cy="0.4" r="0.7"><stop offset="0" stopColor="#1C5F6E" /><stop offset="0.7" stopColor="#0F3646" /><stop offset="1" stopColor="#0A2230" /></radialGradient>
            <radialGradient id="s3n" cx="0.4" cy="0.35" r="0.7"><stop offset="0" stopColor="#7C5FC9" /><stop offset="1" stopColor="#2F2061" /></radialGradient>
            <filter id="s3g"><feGaussianBlur stdDeviation="6" /></filter>
          </defs>
          {/* membrana */}
          <path d={Array.from({length: 49}, (_, i) => { const a = (i / 48) * Math.PI * 2; const rr = 330 + Math.sin(a * 5 + f * 0.05) * 9 + Math.sin(a * 3 - f * 0.03) * 7; return `${i ? 'L' : 'M'}${540 + Math.cos(a) * rr} ${640 + Math.sin(a) * rr * 0.92}`; }).join(' ') + 'Z'} fill="url(#s3c)" stroke="#7FE9E0" strokeOpacity={0.55} strokeWidth={7} />
          <circle cx={600} cy={610} r={96} fill="url(#s3n)" stroke="#B9A6FF" strokeOpacity={0.5} strokeWidth={4} />
          <circle cx={575} cy={590} r={28} fill="#A58BFF" opacity={0.45} />
          {MITO.map(([x, y, a], i) => {
            const burn = 0.5 + 0.5 * Math.sin(f * 0.2 + i * 1.7);
            return (
              <g key={i} transform={`translate(${x} ${y}) rotate(${a})`}>
                <ellipse rx={62} ry={30} fill={P.co2hot} opacity={0.25 + 0.35 * burn * co2On} filter="url(#s3g)" />
                <ellipse rx={56} ry={26} fill="#C9632E" stroke="#FFC28A" strokeWidth={3} />
                <path d="M-40 0 q8 -18 16 0 t16 0 t16 0 t16 0 t16 0" stroke="#FFD9B0" strokeWidth={3} fill="none" opacity={0.8} />
              </g>
            );
          })}
          {/* O₂ entra */}
          {o2.map((p, i) => {
            const t = (f * p.sp + p.o) % 1;
            const [mx, my] = MITO[p.m];
            const k = E.inOut(t);
            const x = lerp(p.sx, mx, k), y = lerp(capY(p.sx), my, k) - Math.sin(k * Math.PI) * 40;
            return <g key={`o${i}`} opacity={Math.min(1, t * 6) * (1 - clamp01((t - 0.88) / 0.12))}><circle cx={x - 7} cy={y} r={9} fill={P.o2} /><circle cx={x + 7} cy={y} r={9} fill={P.o2} /></g>;
          })}
          {/* CO₂ sale */}
          {co2On > 0 && co2.map((p, i) => {
            const t = ((f - lw(25)) * p.sp + p.o) % 1;
            if (f < lw(25) + p.o * 30) return null;
            const [mx, my] = MITO[p.m];
            const k = E.inOut(t);
            const x = lerp(mx, p.ex, k), y = lerp(my, capY(p.ex), k) - Math.sin(k * Math.PI) * 30;
            return <g key={`c${i}`} opacity={co2On * Math.min(1, t * 6) * (1 - clamp01((t - 0.85) / 0.15))}><circle cx={x} cy={y} r={11} fill="#3A3F46" stroke={P.co2} strokeWidth={3} /><circle cx={x - 15} cy={y} r={8} fill={P.co2} /><circle cx={x + 15} cy={y} r={8} fill={P.co2} /></g>;
          })}
        </svg>
      </AbsoluteFill>
      <Annotation frame={f} at={lw(22)} x={110} y={420} tx={330} ty={300} kicker="ENTRA" label="O₂" color={P.o2} accent={P.o2} size={56} />
      <Annotation frame={f} at={lw(26, 4)} x={800} y={430} tx={850} ty={290} kicker="SALE" label="CO₂" color={P.co2} accent={P.co2} size={56} />
    </AbsoluteFill>
  );
};
