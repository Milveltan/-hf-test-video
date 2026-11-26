/**
 * ESCENA 6 · "Esa desesperación que sientes no viene de la falta de oxígeno. Viene del exceso de CO₂."
 * Dos columnas de vidrio: el O₂ casi no baja; el CO₂ sube, burbujea y se pone rojo. La cámara viaja de una a otra
 * y en "CO₂" la columna se desborda y la palabra golpea.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {F} from '../../../dl/fonts';
import {E, keys, lerp, prog, rng} from '../../../dl/motion';
import {SlamWord} from '../../../dl/type/Type';
import {Annotation} from '../../../dl/editorial/Editorial';
import {Glow} from '../../../dl/light/Light';
import {Abyss} from './common';
import {P} from './palette';

const Tube: React.FC<{x: number; level: number; color: string; frame: number; label: string; boil: number; seed: number}> = ({x, level, color, frame, label, boil, seed}) => {
  const top = 250, h = 680, w = 230;
  const ly = top + h * (1 - level);
  const r = rng(seed);
  return (
    <>
      <div style={{position: 'absolute', left: x, top: 150, width: w, textAlign: 'center', fontFamily: F.cond, fontWeight: 700, fontSize: 76, color, textShadow: `0 0 30px ${color}88`}}>{label}</div>
      <svg width={w + 40} height={h + 40} style={{position: 'absolute', left: x - 20, top: top - 20, overflow: 'visible'}}>
        <defs><linearGradient id={`tb${seed}`} x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor={color} stopOpacity={0.95} /><stop offset="1" stopColor={color} stopOpacity={0.45} /></linearGradient></defs>
        <rect x={20} y={20} width={w} height={h} rx={40} fill="rgba(160,230,255,0.05)" stroke="rgba(190,240,255,0.5)" strokeWidth={4} />
        <path d={`M24 ${ly - top + 20 + Math.sin(frame * 0.15) * 5} Q ${20 + w / 2} ${ly - top + 8} ${16 + w} ${ly - top + 20 - Math.sin(frame * 0.15) * 5} L ${16 + w} ${h - 20} Q ${20 + w} ${h + 16} ${20 + w - 40} ${h + 16} L 60 ${h + 16} Q 24 ${h + 16} 24 ${h - 20} Z`} fill={`url(#tb${seed})`} />
        {Array.from({length: Math.round(8 + boil * 22)}, (_, i) => {
          const bx = 40 + r() * (w - 40), sp = 2 + r() * 4 + boil * 4, ph = r() * 600;
          const by = h + 10 - ((frame * sp + ph) % Math.max(10, h + 10 - (ly - top + 20)));
          return <circle key={i} cx={bx} cy={by} r={3 + r() * 6} fill="none" stroke="#FFF" strokeOpacity={0.55} strokeWidth={2} />;
        })}
        <rect x={34} y={36} width={16} height={h - 60} rx={8} fill="#FFF" opacity={0.12} />
      </svg>
    </>
  );
};

export const S06Exceso: React.FC<{lw: (i: number, off?: number) => number}> = ({lw}) => {
  const f = useCurrentFrame();
  const co2 = keys(f, [[0, 0.38], [lw(64), 0.7], [lw(70), 0.97]], E.inOut);
  const hot = prog(f, lw(66), lw(70));
  const o2 = lerp(0.86, 0.82, prog(f, 0, lw(71)));
  const camX = keys(f, [[0, 60], [lw(62), 40], [lw(67), -70]], E.inOut);
  const slam = f >= lw(70, -2);
  const overflow = prog(f, lw(70), lw(70, 10), E.out);
  const coC = hot > 0.5 ? P.alarm : P.co2hot;
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <Abyss frame={f + 700} light={0.6} />
      <AbsoluteFill style={{transform: `translateX(${camX}px) scale(${1 + overflow * 0.04})`}}>
        <Glow x={840} y={700} r={480} color={coC} opacity={0.12 + hot * 0.3} />
        <Glow x={300} y={600} r={380} color={P.o2} opacity={0.14} />
        <Tube x={190} level={o2} color={P.o2} frame={f} label="O₂" boil={0} seed={3} />
        <Tube x={660} level={co2} color={coC} frame={f} label="CO₂" boil={hot} seed={7} />
        {overflow > 0 && <div style={{position: 'absolute', left: 640, top: 200, width: 270, height: 120, borderRadius: '50%', background: P.alarm, filter: 'blur(40px)', opacity: overflow * 0.6}} />}
      </AbsoluteFill>
      <Annotation frame={f} at={lw(63)} x={450 + camX} y={280} tx={340 + camX} ty={385} kicker="OXÍGENO" label="aún alto" color={P.o2} accent={P.o2} size={46} />
      {slam && <div style={{position: 'absolute', left: 0, right: 0, top: 470, display: 'flex', justifyContent: 'center', transform: `translateX(${camX + 230}px)`}}><SlamWord frame={f} at={lw(70, -2)} text="EXCESO" colorA={P.alarm} colorB={P.co2} style={{fontFamily: F.display, fontSize: 150, color: P.bone}} /></div>}
    </AbsoluteFill>
  );
};
