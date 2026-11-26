/**
 * ESCENA 13 · "Y apenas pierdes el conocimiento… vuelves a respirar. Sin pensarlo."
 * Desde negro: unos pulmones apagados y morados. En "vuelves a respirar" una bocanada los infla de golpe,
 * el oxígeno los tiñe de rojo vivo y siguen respirando solos, con ritmo automático.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {F} from '../../../dl/fonts';
import {E, lerp, prog, rng, spr} from '../../../dl/motion';
import {Lungs} from '../../../dl/anatomy/Anatomy';
import {Flash} from '../../../dl/fx/Fx';
import {Glow} from '../../../dl/light/Light';
import {Abyss} from './common';
import {P} from './palette';

export const S13Respira: React.FC<{lw: (i: number, off?: number) => number}> = ({lw}) => {
  const f = useCurrentFrame();
  const g = lw(160, -2);
  const gasp = spr(f, g, {damping: 9, stiffness: 160});
  const auto = f > g + 24 ? 0.5 + 0.5 * Math.cos((f - g - 24) * 0.11) : 1;
  const inflate = f < g ? 0.15 : lerp(0.15, 1, gasp) * lerp(1, 0.55 + 0.45 * auto, prog(f, g + 20, g + 40));
  const o2 = f < g ? 0.12 : lerp(0.12, 1, prog(f, g, g + 30, E.out));
  const light = prog(f, 0, 30) * 0.35 + prog(f, g, g + 10) * 0.65;
  const r = rng(13);
  const air = Array.from({length: 40}, () => ({a: r() * Math.PI * 2, d: 500 + r() * 400, o: r()}));
  return (
    <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
      <AbsoluteFill style={{opacity: light}}><Abyss frame={f + 1900} light={0.7} /></AbsoluteFill>
      <Glow x={540} y={600} r={520} color={o2 > 0.5 ? P.blood : '#6E2A5C'} opacity={0.12 + 0.25 * o2 * light} />
      <div style={{position: 'absolute', left: 540 - 440, top: 250, opacity: 0.3 + 0.7 * light, filter: `saturate(${0.4 + 0.6 * o2})`}}>
        <Lungs frame={f} inflate={inflate} o2={o2} glow={0.4 + o2 * 0.5} scale={2.2} id="s13lg" />
      </div>
      {f >= g && f < g + 30 && (
        <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
          {air.map((p, i) => {
            const t = prog(f, g + p.o * 8, g + 16 + p.o * 10, E.in);
            return <circle key={i} cx={540 + Math.cos(p.a) * p.d * (1 - t)} cy={290 + Math.sin(p.a) * p.d * (1 - t)} r={5 * (1 - t * 0.5)} fill={P.o2} opacity={(1 - t) * 0.9} />;
          })}
        </svg>
      )}
      <div style={{position: 'absolute', left: 0, right: 0, top: 170, textAlign: 'center', fontFamily: F.mono, fontSize: 32, letterSpacing: '0.3em', color: P.o2, opacity: prog(f, lw(163, -4), lw(163, 6))}}>● RESPIRACIÓN AUTOMÁTICA</div>
      <Flash k={Math.max(0, 1 - Math.abs(f - g - 2) / 6) * 0.45} color={P.o2} />
    </AbsoluteFill>
  );
};
