/**
 * Biblioteca DROGMAN · Naturaleza y atmósfera (procedural, determinista, sin imágenes).
 *  - Sky: cielo por hora del día (t 0 = noche, 0.25 = amanecer, 0.5 = día, 0.75 = atardecer) con sol/luna y nubes que derivan.
 *  - Hills: capas de colinas para paralaje (cada capa con su color y profundidad).
 *  - Grass: pasto/vegetación que se mece con el viento (wind 0..1), con variación de altura y color.
 *  - Underwater: agua con cáusticas, rayos de luz y burbujas (buceo, apnea, océano).
 *  - Fog: niebla en bandas que deriva (profundidad atmosférica).
 *  - GodRays: rayos de luz volumétrica desde un punto.
 */
import React from 'react';
import {AbsoluteFill} from 'remotion';
import {noise1, rng} from '../motion';

const lerpC = (a: number[], b: number[], t: number) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
const SKY: [number, number[], number[]][] = [
  [0, [6, 10, 24], [18, 26, 52]], [0.22, [40, 40, 90], [240, 140, 110]], [0.32, [90, 150, 220], [250, 210, 170]],
  [0.5, [70, 140, 225], [190, 225, 250]], [0.7, [80, 100, 180], [255, 170, 110]], [0.8, [40, 30, 80], [230, 100, 90]], [1, [6, 10, 24], [18, 26, 52]],
];
export const skyColors = (t: number) => {
  const x = ((t % 1) + 1) % 1;
  let i = 0;
  while (i < SKY.length - 2 && x > SKY[i + 1][0]) i++;
  const [t0, a0, b0] = SKY[i], [t1, a1, b1] = SKY[i + 1];
  const k = (x - t0) / (t1 - t0);
  return {top: `rgb(${lerpC(a0, a1, k)})`, bottom: `rgb(${lerpC(b0, b1, k)})`};
};

export const Sky: React.FC<{frame: number; t?: number; clouds?: number; sunX?: number}> = ({frame, t = 0.5, clouds = 6, sunX = 0.7}) => {
  const {top, bottom} = skyColors(t);
  const night = t < 0.2 || t > 0.85;
  const sunY = 900 - Math.sin(Math.max(0, Math.min(1, (t - 0.2) / 0.65)) * Math.PI) * 700;
  const r = rng(4);
  return (
    <AbsoluteFill style={{background: `linear-gradient(180deg, ${top}, ${bottom})`}}>
      <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
        <defs><radialGradient id="skySun"><stop offset="0" stopColor={night ? '#E8F0FF' : '#FFF4D6'} /><stop offset="0.25" stopColor={night ? '#C9D6F2' : '#FFD27A'} stopOpacity={0.9} /><stop offset="1" stopColor="#FFD27A" stopOpacity={0} /></radialGradient></defs>
        {night && Array.from({length: 90}, (_, i) => <circle key={i} cx={r() * 1080} cy={r() * 700} r={0.6 + r() * 1.6} fill="#FFF" opacity={0.3 + 0.5 * Math.abs(Math.sin(frame * 0.05 + i))} />)}
        <circle cx={sunX * 1080} cy={sunY} r={night ? 150 : 260} fill="url(#skySun)" />
        <circle cx={sunX * 1080} cy={sunY} r={night ? 40 : 56} fill={night ? '#EEF3FF' : '#FFF6DE'} />
        {Array.from({length: clouds}, (_, i) => {
          const y = 120 + r() * 420, w = 180 + r() * 260, sp = 0.2 + r() * 0.5, x0 = r() * 1400;
          const x = ((x0 + frame * sp) % 1500) - 250;
          return (
            <g key={i} opacity={night ? 0.25 : 0.85} transform={`translate(${x} ${y})`}>
              {[0, 0.3, 0.6].map((k, j) => <ellipse key={j} cx={k * w} cy={-j % 2 * 18} rx={w * 0.32} ry={w * 0.14} fill="#FFFFFF" opacity={0.75} />)}
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

export const Hills: React.FC<{y: number; color: string; amp?: number; seed?: number; rim?: string}> = ({y, color, amp = 60, seed = 1, rim}) => {
  let d = `M-20 1200 L-20 ${y}`;
  for (let x = 0; x <= 1100; x += 40) d += ` L${x} ${y - amp * (0.5 + 0.5 * noise1(x * 0.004, seed)) - amp * 0.4 * noise1(x * 0.013, seed + 3)}`;
  d += ' L1100 1200 Z';
  return (
    <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
      <path d={d} fill={color} />
      {rim && <path d={d.replace(/ L1100 1200 Z$/, '').replace('M-20 1200 L', 'M')} stroke={rim} strokeWidth={3} fill="none" opacity={0.5} />}
    </svg>
  );
};

export const Grass: React.FC<{frame: number; y: number; count?: number; height?: number; colors?: string[]; wind?: number; seed?: number}> = ({frame, y, count = 160, height = 120, colors = ['#2E6B3A', '#3F8A47', '#5DAA55', '#1E4A2A'], wind = 0.5, seed = 2}) => {
  const r = rng(seed);
  return (
    <svg width={1080} height={1200} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
      {Array.from({length: count}, (_, i) => {
        const x = r() * 1100 - 10, h = height * (0.5 + r() * 0.8), c = colors[i % colors.length];
        const sway = (noise1(frame * 0.03 + x * 0.004, 7) * 0.8 + 0.4) * wind * h * 0.35;
        const yy = y + r() * 40;
        return <path key={i} d={`M${x - 4} ${yy} Q${x + sway * 0.4} ${yy - h * 0.55} ${x + sway} ${yy - h} Q${x + sway * 0.4 + 2} ${yy - h * 0.5} ${x + 5} ${yy} Z`} fill={c} />;
      })}
    </svg>
  );
};

export const Underwater: React.FC<{frame: number; depth?: number; bubbles?: number}> = ({frame, depth = 0.3, bubbles = 30}) => {
  const r = rng(11);
  const top = `rgb(${lerpC([40, 150, 190], [6, 30, 60], depth)})`, bot = `rgb(${lerpC([8, 60, 100], [2, 8, 20], depth)})`;
  return (
    <AbsoluteFill style={{background: `linear-gradient(180deg, ${top}, ${bot})`}}>
      <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
        <defs><filter id="uwC"><feTurbulence type="fractalNoise" baseFrequency="0.012 0.03" numOctaves="2" seed={Math.floor(frame / 3)} /><feColorMatrix values="0 0 0 0 0.7  0 0 0 0 0.95  0 0 0 0 1  0 0 0 1.4 -0.7" /></filter></defs>
        <rect width={1080} height={500} filter="url(#uwC)" opacity={0.35 * (1 - depth)} />
        {Array.from({length: 7}, (_, i) => {
          const x = 100 + i * 150 + noise1(frame * 0.01 + i, 3) * 40;
          return <path key={i} d={`M${x} -20 L${x + 60} -20 L${x + 160} 1200 L${x - 40} 1200 Z`} fill="#BFF4FF" opacity={(0.05 + 0.04 * Math.sin(frame * 0.04 + i)) * (1 - depth)} />;
        })}
        {Array.from({length: bubbles}, (_, i) => {
          const x0 = r() * 1080, s = 3 + r() * 9, sp = 1.5 + r() * 2.5, ph = r() * 1300;
          const y = 1250 - ((frame * sp + ph) % 1400);
          return <circle key={i} cx={x0 + Math.sin(frame * 0.08 + i) * 10} cy={y} r={s} fill="none" stroke="#DFFBFF" strokeOpacity={0.6} strokeWidth={1.5} />;
        })}
      </svg>
    </AbsoluteFill>
  );
};

export const Fog: React.FC<{frame: number; y?: number; color?: string; opacity?: number}> = ({frame, y = 700, color = '200,215,230', opacity = 0.35}) => (
  <AbsoluteFill style={{pointerEvents: 'none'}}>
    {[0, 1, 2].map((i) => (
      <div key={i} style={{position: 'absolute', left: -300 + ((frame * (0.3 + i * 0.2)) % 300), top: y - 120 + i * 90, width: 1700, height: 220, background: `radial-gradient(50% 50% at 50% 50%, rgba(${color},${opacity}) 0%, rgba(${color},0) 70%)`, filter: 'blur(10px)'}} />
    ))}
  </AbsoluteFill>
);

export const GodRays: React.FC<{frame: number; x: number; y: number; color?: string; count?: number; opacity?: number}> = ({frame, x, y, color = '#FFE9B8', count = 9, opacity = 0.12}) => (
  <svg width={1080} height={1200} style={{position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'screen'}}>
    <defs><radialGradient id="grG" cx={x} cy={y} r={1400} gradientUnits="userSpaceOnUse"><stop offset="0" stopColor={color} stopOpacity={1} /><stop offset="1" stopColor={color} stopOpacity={0} /></radialGradient></defs>
    {Array.from({length: count}, (_, i) => {
      const a = ((i / count) * 120 + 30 + Math.sin(frame * 0.01 + i) * 3) * (Math.PI / 180), w = 0.05 + (i % 3) * 0.03;
      return <path key={i} d={`M${x} ${y} L${x + Math.cos(a - w) * 1600} ${y + Math.sin(a - w) * 1600} L${x + Math.cos(a + w) * 1600} ${y + Math.sin(a + w) * 1600} Z`} fill="url(#grG)" opacity={opacity * (0.6 + 0.4 * Math.sin(frame * 0.05 + i * 2))} />;
    })}
  </svg>
);
