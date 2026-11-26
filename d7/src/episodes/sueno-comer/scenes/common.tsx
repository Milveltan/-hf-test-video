import React from 'react';
import {AbsoluteFill} from 'remotion';
import {E, lerp, prog} from '../../../dl/motion';
import {HumanRig} from '../../../dl/characters/HumanRig';
import {F} from '../../../dl/fonts';
import {P, EATER} from './palette';

export {E, lerp, prog};
export type LW = (i: number, off?: number) => number;
type RigProps = Omit<React.ComponentProps<typeof HumanRig>, 'scale' | 'person'>;
export const Person: React.FC<{x: number; s?: number; foot?: number; rot?: number} & RigProps> = ({x, s = 0.8, foot = 1000, rot = 0, ...rig}) => (
  <div style={{position: 'absolute', left: x - 200 * s, top: foot - 960 * s, width: 400 * s, height: 960 * s, transform: rot ? `rotate(${rot}deg)` : undefined, transformOrigin: '50% 100%'}}>
    <HumanRig rim={P.honey} {...rig} person={EATER} scale={s} />
  </div>
);

/** Comedor de tarde: pared cálida, ventana con haz de luz, mesa con mantel. sleepy 0–1 tiñe de lavanda. */
export const Dining: React.FC<{f: number; sleepy?: number; table?: boolean}> = ({f, sleepy = 0, table = true}) => (
  <AbsoluteFill>
    <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
      <defs>
        <linearGradient id="dW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={P.wall} /><stop offset="1" stopColor={P.wallDark} /></linearGradient>
        <linearGradient id="dBeam" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFE2A8" stopOpacity={0.55} /><stop offset="1" stopColor="#FFE2A8" stopOpacity={0} /></linearGradient>
      </defs>
      <rect width={1080} height={1200} fill="url(#dW)" />
      <rect x={640} y={120} width={330} height={400} rx={12} fill="#FFE9B8" stroke={P.wood} strokeWidth={14} />
      <line x1={805} y1={120} x2={805} y2={520} stroke={P.wood} strokeWidth={10} /><line x1={640} y1={320} x2={970} y2={320} stroke={P.wood} strokeWidth={10} />
      <path d="M640 520 L970 120 L700 1200 L120 1200 Z" fill="url(#dBeam)" opacity={0.8} />
      {Array.from({length: 18}, (_, i) => <circle key={i} cx={500 + ((i * 97) % 420) + Math.sin(f * 0.02 + i) * 20} cy={300 + ((i * 131 + f * 0.5) % 700)} r={2 + (i % 3)} fill="#FFF4D6" opacity={0.5} />)}
      <rect x={70} y={180} width={180} height={230} rx={8} fill={P.olive} opacity={0.85} /><rect x={86} y={196} width={148} height={198} rx={4} fill={P.honey} opacity={0.6} />
      {table && <g>
        <rect x={-20} y={840} width={1120} height={40} rx={8} fill={P.cloth} />
        <path d="M-20 880 h1120 v90 q-40 20 -80 0 q-40 20 -80 0 q-40 20 -80 0 q-40 20 -80 0 q-40 20 -80 0 q-40 20 -80 0 q-40 20 -80 0 q-40 20 -80 0 q-40 20 -80 0 q-40 20 -80 0 q-40 20 -80 0 q-40 20 -80 0 q-40 20 -80 0 q-40 20 -80 0 z" fill={P.cloth} />
        <rect x={-20} y={960} width={1120} height={240} fill={P.woodDark} />
      </g>}
    </svg>
    <AbsoluteFill style={{background: P.lavDeep, opacity: sleepy * 0.35, mixBlendMode: 'multiply'}} />
  </AbsoluteFill>
);

/** Plato con restos (empty) o lleno (food: lista de tipos). */
export const Plate: React.FC<{x: number; y: number; s?: number; children?: React.ReactNode}> = ({x, y, s = 1, children}) => (
  <div style={{position: 'absolute', left: x - 200 * s, top: y - 70 * s, width: 400 * s, height: 140 * s}}>
    <svg width={400 * s} height={140 * s} viewBox="0 0 400 140" style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
      <ellipse cx={200} cy={80} rx={200} ry={60} fill="#00000033" />
      <ellipse cx={200} cy={70} rx={196} ry={58} fill="#FFFFFF" /><ellipse cx={200} cy={70} rx={140} ry={38} fill="#F1ECE2" />
    </svg>
    {children}
  </div>
);

/** "Z" flotantes de sueño. */
export const Zzz: React.FC<{x: number; y: number; f: number; k: number; s?: number}> = ({x, y, f, k, s = 1}) => (
  <>{[0, 1, 2].map((i) => {
    const t = ((f * 0.012 + i / 3) % 1);
    return <div key={i} style={{position: 'absolute', left: x + t * 120 * s + i * 10, top: y - t * 220 * s, fontFamily: F.display, fontSize: (50 + i * 22) * s, color: P.lav, opacity: k * Math.sin(t * Math.PI), textShadow: `0 0 20px ${P.lavDeep}`, transform: `rotate(${-10 + i * 6}deg)`}}>Z</div>;
  })}</>
);

export const Vig: React.FC<{k?: number}> = ({k = 0.5}) => <AbsoluteFill style={{background: `radial-gradient(120% 90% at 50% 45%, transparent 55%, rgba(30,15,5,${k}) 100%)`, pointerEvents: 'none'}} />;
