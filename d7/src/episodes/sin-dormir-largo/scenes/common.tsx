import React from 'react';
import {AbsoluteFill} from 'remotion';
import {E, lerp, prog, rng} from '../../../dl/motion';
import {HumanRig} from '../../../dl/characters/HumanRig';
import {F} from '../../../dl/fonts';
import {P, TIRED} from './palette';

export {E, lerp, prog};
export type LW = (i: number, off?: number) => number;
type RigProps = Omit<React.ComponentProps<typeof HumanRig>, 'scale' | 'person'>;

/** Persona con los pies en (x, foot). */
export const Person: React.FC<{x: number; s?: number; foot?: number; rot?: number} & RigProps> = ({x, s = 0.8, foot = 1000, rot = 0, ...rig}) => (
  <div style={{position: 'absolute', left: x - 200 * s, top: foot - 960 * s, width: 400 * s, height: 960 * s, transform: rot ? `rotate(${rot}deg)` : undefined, transformOrigin: '50% 100%'}}>
    <HumanRig rim={P.screen} {...rig} person={TIRED} scale={s} />
  </div>
);

/** Fondo de madrugada con polvo flotante iluminado por pantalla. */
export const NightBg: React.FC<{f: number; tint?: string; seed?: number}> = ({f, tint = P.deep, seed = 3}) => {
  const r = rng(seed);
  return (
    <AbsoluteFill style={{background: `radial-gradient(85% 70% at 50% 35%, ${tint}, ${P.ink} 60%, ${P.night})`}}>
      <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 46}, (_, i) => {
          const x = r() * 1080, y0 = r() * 1200, z = 0.3 + r() * 0.9;
          const y = ((y0 - f * 0.4 * z) % 1200 + 1200) % 1200;
          return <circle key={i} cx={x + Math.sin(f * 0.03 + i) * 10} cy={y} r={1 + z * 2} fill={P.screen} opacity={0.08 + 0.2 * z} />;
        })}
      </svg>
    </AbsoluteFill>
  );
};

/** Reloj de 24 horas (vidrio y bisel). turns = vueltas de la manecilla (1 = 24 h). */
export const Clock24: React.FC<{x: number; y: number; r?: number; turns: number; glow?: number}> = ({x, y, r = 210, turns, glow = 0}) => {
  const a = turns * 360;
  return (
    <svg width={r * 2 + 80} height={r * 2 + 80} viewBox={`${-r - 40} ${-r - 40} ${r * 2 + 80} ${r * 2 + 80}`} style={{position: 'absolute', left: x - r - 40, top: y - r - 40, overflow: 'visible'}}>
      <defs>
        <radialGradient id="ckFace" cx="0.4" cy="0.35" r="0.8"><stop offset="0" stopColor="#16253D" /><stop offset="1" stopColor={P.night} /></radialGradient>
        <linearGradient id="ckRim" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#C9D6E6" /><stop offset="1" stopColor="#4A5A72" /></linearGradient>
      </defs>
      <circle r={r + 30} fill={P.amber} opacity={0.12 * glow} style={{filter: 'blur(20px)'}} />
      <circle r={r + 14} fill="url(#ckRim)" />
      <circle r={r} fill="url(#ckFace)" />
      {/* arco recorrido */}
      <circle r={r - 26} fill="none" stroke={P.amber} strokeWidth={14} strokeDasharray={`${(2 * Math.PI * (r - 26)) * Math.min(1, turns)} 9999`} transform="rotate(-90)" opacity={0.85} strokeLinecap="round" />
      {Array.from({length: 24}, (_, i) => {
        const t = (i / 24) * Math.PI * 2, big = i % 6 === 0;
        return <line key={i} x1={Math.sin(t) * (r - 50)} y1={-Math.cos(t) * (r - 50)} x2={Math.sin(t) * (r - (big ? 80 : 64))} y2={-Math.cos(t) * (r - (big ? 80 : 64))} stroke={P.cream} strokeWidth={big ? 7 : 3} opacity={big ? 0.95 : 0.5} strokeLinecap="round" />;
      })}
      {[0, 6, 12, 18].map((h) => {
        const t = (h / 24) * Math.PI * 2;
        return <text key={h} x={Math.sin(t) * (r - 112)} y={-Math.cos(t) * (r - 112) + 16} textAnchor="middle" fontFamily={F.display} fontSize={44} fill={P.cream}>{h === 0 ? 24 : h}</text>;
      })}
      <g transform={`rotate(${a})`}>
        <path d={`M-9 22 L0 ${-r + 58} L9 22 Z`} fill={P.amber} style={{filter: `drop-shadow(0 0 10px ${P.amber})`}} />
      </g>
      <circle r={16} fill={P.cream} /><circle r={7} fill={P.amber} />
      <path d={`M${-r * 0.6} ${-r * 0.55} Q0 ${-r * 0.95} ${r * 0.6} ${-r * 0.55}`} stroke="#FFFFFF" strokeWidth={10} fill="none" opacity={0.08} strokeLinecap="round" />
    </svg>
  );
};

/** Batería con nivel 0–1 (verde → ámbar → coral). */
export const Battery: React.FC<{x: number; y: number; level: number; label: string; w?: number}> = ({x, y, level, label, w = 300}) => {
  const c = level > 0.55 ? P.ok : level > 0.28 ? P.amber : P.coral;
  const h = w * 0.46;
  return (
    <div style={{position: 'absolute', left: x - w / 2, top: y - h / 2, width: w, textAlign: 'center'}}>
      <svg width={w + 30} height={h} viewBox={`0 0 ${w + 30} ${h}`} style={{overflow: 'visible'}}>
        <rect x={3} y={3} width={w - 6} height={h - 6} rx={22} fill="#0B1424" stroke={P.cream} strokeWidth={6} />
        <rect x={w} y={h * 0.32} width={22} height={h * 0.36} rx={6} fill={P.cream} />
        <rect x={16} y={16} width={Math.max(0, (w - 32) * level)} height={h - 32} rx={12} fill={c} style={{filter: `drop-shadow(0 0 14px ${c})`}} />
      </svg>
      <div style={{fontFamily: F.mono, fontWeight: 700, fontSize: 34, letterSpacing: '0.22em', color: P.cream, marginTop: 14}}>{label}</div>
    </div>
  );
};

export const Vig: React.FC<{k?: number}> = ({k = 0.6}) => <AbsoluteFill style={{background: `radial-gradient(120% 90% at 50% 45%, transparent 55%, rgba(0,0,0,${k}) 100%)`, pointerEvents: 'none'}} />;
