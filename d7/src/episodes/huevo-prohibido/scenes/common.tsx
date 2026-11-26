import React from 'react';
import {AbsoluteFill} from 'remotion';
import {E, lerp, prog, rng} from '../../../dl/motion';
import {F} from '../../../dl/fonts';
import {P} from './palette';

export {E, lerp, prog};
export type LW = (i: number, off?: number) => number;

/** Juguete genérico: carrito rojo. */
export const ToyG: React.FC = () => (
  <g>
    <path d="M-50 10 h100 v-14 q-8 -4 -22 -6 l-12 -18 h-34 l-14 18 q-14 2 -18 8 z" fill={P.red} />
    <path d="M-20 -24 h22 l10 14 h-42 z" fill="#BFE8FF" />
    {[-30, 30].map((x) => <g key={x}><circle cx={x} cy={12} r={13} fill="#1E1E24" /><circle cx={x} cy={12} r={5} fill={P.foilShade} /></g>)}
  </g>
);
export const Toy: React.FC<{s?: number}> = ({s = 1}) => <svg width={120 * s} height={80 * s} viewBox="-60 -40 120 80" style={{overflow: 'visible'}}><ToyG /></svg>;

/** Cápsula amarilla de plástico (contenedor del juguete). open 0–1 separa las mitades. */
export const CapsuleG: React.FC<{open?: number; toy?: boolean}> = ({open = 0, toy = true}) => (
  <g>
    <defs><radialGradient id="capG" cx="0.35" cy="0.3" r="0.8"><stop offset="0" stopColor="#FFF1B8" /><stop offset="0.6" stopColor={P.capsule} /><stop offset="1" stopColor={P.capsuleDark} /></radialGradient></defs>
    {toy && open > 0.05 && <g transform={`translate(0 ${-open * 10}) scale(0.8)`}><ToyG /></g>}
    <path d={`M-48 ${-4 - open * 40} v-22 a48 48 0 0 1 96 0 v22 z`} fill="url(#capG)" stroke={P.capsuleDark} strokeWidth={3} />
    <path d={`M-48 ${4 + open * 40} v26 a48 48 0 0 0 96 0 v-26 z`} fill="url(#capG)" stroke={P.capsuleDark} strokeWidth={3} />
    <ellipse cx={-18} cy={-50 - open * 40} rx={10} ry={16} fill="#FFFFFF" opacity={0.5} />
  </g>
);
export const Capsule: React.FC<{s?: number; open?: number; toy?: boolean}> = ({s = 1, ...p}) => <svg width={140 * s} height={180 * s} viewBox="-70 -90 140 180" style={{overflow: 'visible'}}><CapsuleG {...p} /></svg>;

/** Huevo de chocolate envuelto en aluminio (genérico, sin marca). xray 0–1 muestra el interior con la cápsula. */
export const ChocEgg: React.FC<{s?: number; xray?: number; f?: number; id?: string}> = ({s = 1, xray = 0, f = 0, id = 'eg'}) => (
  <div style={{position: 'relative', width: 300 * s, height: 380 * s}}>
    <svg width={300 * s} height={380 * s} viewBox="0 0 300 380" style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
      <defs>
        <radialGradient id={`${id}f`} cx="0.35" cy="0.3" r="0.85"><stop offset="0" stopColor="#FFFFFF" /><stop offset="0.55" stopColor={P.foil} /><stop offset="1" stopColor={P.foilShade} /></radialGradient>
        <radialGradient id={`${id}c`} cx="0.4" cy="0.35" r="0.8"><stop offset="0" stopColor={P.chocLight} /><stop offset="1" stopColor={P.chocDark} /></radialGradient>
        <clipPath id={`${id}k`}><path d="M150 10 C 250 10 290 170 290 240 C 290 320 230 370 150 370 C 70 370 10 320 10 240 C 10 170 50 10 150 10 Z" /></clipPath>
      </defs>
      <ellipse cx={150} cy={372} rx={110} ry={14} fill="#000" opacity={0.35} />
      <g clipPath={`url(#${id}k)`}>
        <rect width={300} height={380} fill={`url(#${id}f)`} />
        <path d="M0 150 Q150 120 300 150 v40 Q150 160 0 190 Z" fill={P.foilStripe} />
        <path d="M0 290 Q150 260 300 290 v18 Q150 280 0 308 Z" fill={P.foilStripe} opacity={0.85} />
        {Array.from({length: 9}, (_, i) => <path key={i} d={`M${20 + i * 34} 20 l-10 340`} stroke="#FFFFFF" strokeWidth={2} opacity={0.25} />)}
        {/* corte de rayos X */}
        <g opacity={xray}>
          <rect width={300} height={380} fill={P.navy} opacity={0.9} />
          <path d="M150 34 C 236 34 268 176 268 240 C 268 306 218 348 150 348 C 82 348 32 306 32 240 C 32 176 64 34 150 34 Z" fill={`url(#${id}c)`} opacity={0.55} />
          <path d="M150 64 C 214 64 238 180 238 238 C 238 292 200 320 150 320 C 100 320 62 292 62 238 C 62 180 86 64 150 64 Z" fill={P.scan} opacity={0.12} />
        </g>
      </g>
      <path d="M150 10 C 250 10 290 170 290 240 C 290 320 230 370 150 370 C 70 370 10 320 10 240 C 10 170 50 10 150 10 Z" fill="none" stroke={xray > 0.5 ? P.scan : '#00000022'} strokeWidth={4} />
      <ellipse cx={95} cy={110} rx={22} ry={46} fill="#FFFFFF" opacity={0.55 * (1 - xray)} transform="rotate(20 95 110)" />
    </svg>
    {xray > 0.05 && (
      <div style={{position: 'absolute', left: 150 * s - 70 * s * 0.9, top: 200 * s - 90 * s * 0.9, opacity: xray, filter: `drop-shadow(0 0 ${18 * xray}px ${P.capsule})`}}>
        <Capsule s={0.9 * s} />
      </div>
    )}
  </div>
);

/** Huevo de dos mitades (envase partido): izquierda crema de chocolate, derecha cápsula con juguete. open 0–1 levanta la tapa. */
export const SplitEgg: React.FC<{s?: number; open?: number; wall?: number; f?: number}> = ({s = 1, open = 0, wall = 0, f = 0}) => (
  <svg width={620 * s} height={460 * s} viewBox="-310 -230 620 460" style={{overflow: 'visible'}}>
    <defs>
      <linearGradient id="spB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFFFFF" /><stop offset="1" stopColor={P.foilShade} /></linearGradient>
      <radialGradient id="spC" cx="0.4" cy="0.3" r="0.9"><stop offset="0" stopColor={P.cream} /><stop offset="1" stopColor="#D8B98A" /></radialGradient>
    </defs>
    <ellipse cx={0} cy={210} rx={290} ry={22} fill="#000" opacity={0.35} />
    {/* base (mitad inferior del huevo, acostado) */}
    <path d="M-290 0 C -290 140 -150 200 0 200 C 150 200 290 140 290 0 Z" fill="url(#spB)" stroke={P.foilShade} strokeWidth={4} />
    <path d="M-270 4 C -260 110 -150 170 -12 176 V4 Z" fill="url(#spC)" />
    {Array.from({length: 7}, (_, i) => <circle key={i} cx={-220 + i * 30} cy={50 + (i % 2) * 30} r={14} fill={P.choc} stroke={P.chocDark} strokeWidth={2} />)}
    <path d="M12 4 V176 C 150 170 260 110 270 4 Z" fill="#E9E4DA" />
    <g transform={`translate(140 ${70 - open * 30}) scale(0.85)`}><CapsuleG open={open > 0.9 ? (open - 0.9) * 10 * 0 : 0} /></g>
    {/* pared divisoria */}
    <rect x={-12} y={0} width={24} height={190} rx={6} fill={wall > 0.05 ? P.green : P.foilShade} opacity={1} style={{filter: wall > 0.05 ? `drop-shadow(0 0 ${30 * wall}px ${P.green})` : undefined}} />
    {/* tapa */}
    <g transform={`translate(0 ${-open * 420}) rotate(${-open * 8})`} opacity={1 - open}>
      <path d="M-290 0 C -290 -140 -150 -200 0 -200 C 150 -200 290 -140 290 0 Z" fill="url(#spB)" stroke={P.foilShade} strokeWidth={4} />
      <path d="M-290 -2 h580" stroke={P.foilStripe} strokeWidth={14} />
      <ellipse cx={-120} cy={-110} rx={60} ry={24} fill="#FFFFFF" opacity={0.6} />
    </g>
  </svg>
);

/** Expediente de papel con textura. */
export const Paper: React.FC<{x: number; y: number; w: number; h: number; rot?: number; children?: React.ReactNode}> = ({x, y, w, h, rot = 0, children}) => {
  const r = rng(5);
  return (
    <div style={{position: 'absolute', left: x - w / 2, top: y - h / 2, width: w, height: h, transform: `rotate(${rot}deg)`, background: `linear-gradient(160deg, ${P.paper}, #E6DABF)`, boxShadow: '0 30px 60px rgba(0,0,0,0.55)', borderRadius: 6, overflow: 'hidden'}}>
      <svg width={w} height={h} style={{position: 'absolute', inset: 0}}>{Array.from({length: 60}, (_, i) => <circle key={i} cx={r() * w} cy={r() * h} r={r() * 2} fill={P.kraftDark} opacity={0.2} />)}</svg>
      {children}
    </div>
  );
};

export const Bg: React.FC<{tint?: string; spot?: number}> = ({tint = P.navy3, spot = 0.5}) => (
  <AbsoluteFill style={{background: `radial-gradient(70% 55% at 50% 42%, ${tint}, ${P.navy2} 55%, ${P.navy})`}}>
    <AbsoluteFill style={{background: `radial-gradient(40% 35% at 50% 40%, rgba(255,240,210,${0.18 * spot}), transparent 70%)`}} />
  </AbsoluteFill>
);

export const Vig: React.FC<{k?: number}> = ({k = 0.6}) => <AbsoluteFill style={{background: `radial-gradient(120% 90% at 50% 45%, transparent 55%, rgba(0,0,0,${k}) 100%)`, pointerEvents: 'none'}} />;
export const Mono: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 34, color = P.ink, style}) => <div style={{fontFamily: F.mono, fontWeight: 700, fontSize: size, color, letterSpacing: '0.08em', ...style}}>{children}</div>;
