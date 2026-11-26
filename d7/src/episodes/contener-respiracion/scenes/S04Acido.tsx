/**
 * ESCENA 4 · "Ese gas se acumula en tu sangre… y la vuelve más ácida."
 * Dentro de un vaso sanguíneo: las moléculas de CO₂ se van acumulando entre los glóbulos y la sangre se enturbia.
 * En "ácida" baja una escala de pH y la aguja se desliza hacia el lado ácido.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {F} from '../../../dl/fonts';
import {E, lerp, prog, rng, spr} from '../../../dl/motion';
import {BloodFlow} from '../../../dl/anatomy/Anatomy';
import {PhScale} from '../../../dl/data/Data';
import {Glow} from '../../../dl/light/Light';
import {P} from './palette';

export const S04Acido: React.FC<{lw: (i: number, off?: number) => number}> = ({lw}) => {
  const f = useCurrentFrame();
  const fill = prog(f, lw(29), lw(35, 10), E.out);
  const acid = prog(f, lw(37), lw(40, 12), E.inOut);
  const phIn = spr(f, lw(38, -6), {damping: 15});
  const n = Math.round(fill * 70);
  const r = rng(21);
  const mol = Array.from({length: 70}, () => ({x: r() * 1300, y: 430 + r() * 300, sp: 2 + r() * 3, ph: r() * 6, z: 0.7 + r() * 0.6}));
  const cam = lerp(1.05, 1.18, prog(f, 0, lw(41), E.linear));
  return (
    <AbsoluteFill style={{background: `radial-gradient(80% 60% at 50% 50%, #2A0A14, ${P.void})`, overflow: 'hidden'}}>
      <AbsoluteFill style={{transform: `scale(${cam})`, transformOrigin: '540px 580px'}}>
        <Glow x={540} y={580} r={600} color="#FF3B4A" opacity={0.18 - acid * 0.08} />
        <BloodFlow frame={f} d="M-120 580 C 300 520 780 640 1200 580" width={330} o2={lerp(1, 0.62, acid)} speed={lerp(5, 3.5, fill)} cells={34} wall="#5A1424" id="s4bf" />
        <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
          {mol.slice(0, n).map((m, i) => {
            const x = ((m.x + f * m.sp) % 1300) - 110;
            const y = m.y + Math.sin(f * 0.06 + m.ph) * 16 + (x - 540) * 0.04;
            const s = m.z * (i >= n - 3 ? spr(f, lw(29) + i * 2, {damping: 10}) : 1);
            return (
              <g key={i} transform={`translate(${x} ${y}) scale(${s})`} opacity={0.95}>
                <circle r={18} fill={P.co2} opacity={0.25} />
                <circle r={9} fill="#2B2F35" stroke={P.co2} strokeWidth={2.5} />
                <circle cx={-14} r={7} fill={P.co2} /><circle cx={14} r={7} fill={P.co2} />
              </g>
            );
          })}
        </svg>
        <AbsoluteFill style={{background: '#FF8A3D', mixBlendMode: 'overlay', opacity: acid * 0.35}} />
      </AbsoluteFill>
      <div style={{position: 'absolute', left: 160, top: 150, opacity: phIn, transform: `translateY(${(1 - phIn) * -60}px)`}}>
        <div style={{fontFamily: F.cond, fontWeight: 700, fontSize: 34, letterSpacing: '0.2em', color: P.bone, marginBottom: 2}}>TU SANGRE</div>
        <PhScale value={lerp(0.5, 0.36, acid)} mark={0.5} width={760} />
      </div>
    </AbsoluteFill>
  );
};
