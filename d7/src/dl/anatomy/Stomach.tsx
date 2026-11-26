/**
 * Biblioteca DROGMAN · Estómago estilizado 2.5D. churn 0–1 = intensidad de las contracciones (ondas que lo recorren);
 * fill 0–1 = nivel de comida dentro; glow = halo de actividad. Medida base ≈ 260×220 por `scale` (episodio sueno-comer).
 */
import React from 'react';

export const Stomach: React.FC<{frame: number; churn?: number; fill?: number; glow?: number; scale?: number; id?: string; color?: string}> = ({frame, churn = 0.5, fill = 0.6, glow = 0.5, scale = 1, id = 'st', color = '#E58A7E'}) => {
  const w = Math.sin(frame * 0.18) * 6 * churn;
  const body = `M70 30 C 60 70 40 90 40 130 C 40 190 110 215 170 205 C 230 195 250 150 236 110 C 226 80 200 78 186 96 C 172 116 150 120 130 100 C 112 80 120 50 112 24`;
  return (
    <svg width={260 * scale} height={230 * scale} viewBox="0 0 260 230" style={{overflow: 'visible'}}>
      <defs>
        <radialGradient id={`${id}g`} cx="0.4" cy="0.35" r="0.8"><stop offset="0" stopColor="#FFC7B8" /><stop offset="0.6" stopColor={color} /><stop offset="1" stopColor="#9C4A44" /></radialGradient>
        <clipPath id={`${id}c`}><path d={`${body} L 98 24 C 104 50 94 70 70 30 Z`} /></clipPath>
      </defs>
      <ellipse cx={140} cy={140} rx={150} ry={110} fill="#FFB27A" opacity={0.25 * glow} style={{filter: 'blur(18px)'}} />
      <g transform={`translate(${w * 0.3} 0) scale(${1 + w * 0.004} ${1 - w * 0.004})`} style={{transformOrigin: '140px 130px'}}>
        <path d="M84 0 C 84 14 80 22 70 30 L 98 26 C 104 18 106 10 106 0 Z" fill="#C46A5E" />
        <path d={`${body} L 98 24 C 104 50 94 70 70 30 Z`} fill={`url(#${id}g)`} stroke="#7A3530" strokeWidth={4} />
        <g clipPath={`url(#${id}c)`}>
          <path d={`M0 ${230 - fill * 170} Q 65 ${222 - fill * 170 + w * 2} 130 ${230 - fill * 170} T 260 ${230 - fill * 170} V 240 H 0 Z`} fill="#D9A25A" opacity={0.75} />
          {Array.from({length: 4}, (_, i) => {
            const t = ((frame * 0.02 * (0.5 + churn) + i / 4) % 1);
            return <path key={i} d={`M ${40 + t * 200} 30 Q ${60 + t * 200} 120 ${50 + t * 190} 220`} stroke="#FFFFFF" strokeWidth={10} fill="none" opacity={0.18 * churn * Math.sin(t * Math.PI)} strokeLinecap="round" />;
          })}
        </g>
        <path d="M200 96 C 214 120 222 150 214 170" stroke="#FFFFFF" strokeWidth={8} fill="none" opacity={0.25} strokeLinecap="round" />
        <path d="M236 116 C 250 130 254 150 240 168 L 226 160" stroke="#C46A5E" strokeWidth={18} fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
};
