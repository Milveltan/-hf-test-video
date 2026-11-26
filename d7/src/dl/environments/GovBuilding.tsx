/**
 * Biblioteca Datologo · Edificio de gobierno genérico (fachada neoclásica con cúpula, sin país identificable).
 * Columnas con volumen, ventanas que se encienden (lit 0..1), reflectores. Caja 900×700.
 */
import React from 'react';

export const GovBuilding: React.FC<{lit?: number; frame?: number; color?: string; stone?: string}> = ({lit = 0, frame = 0, color = '#FF3B3B', stone = '#1B2530'}) => (
  <svg width={900} height={700} viewBox="0 0 900 700" style={{overflow: 'visible'}}>
    <defs>
      <linearGradient id="gbStone" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={stone} />
        <stop offset="1" stopColor="#070B10" />
      </linearGradient>
      <linearGradient id="gbCol" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#0B1016" />
        <stop offset="0.35" stopColor="#3A4A58" />
        <stop offset="0.6" stopColor="#1C2630" />
        <stop offset="1" stopColor="#080C10" />
      </linearGradient>
      <radialGradient id="gbWin">
        <stop offset="0" stopColor={color} stopOpacity={0.9} />
        <stop offset="1" stopColor={color} stopOpacity={0} />
      </radialGradient>
    </defs>
    {/* cúpula */}
    <path d="M330 210 C 330 120 570 120 570 210 Z" fill="url(#gbStone)" stroke="#3B4B5A" strokeOpacity={0.6} />
    <rect x={310} y={206} width={280} height={24} fill="#141C24" />
    {Array.from({length: 9}, (_, i) => <rect key={i} x={326 + i * 30} y={230} width={12} height={46} fill="url(#gbCol)" />)}
    <rect x={300} y={274} width={300} height={16} fill="#141C24" />
    <rect x={442} y={70} width={16} height={60} fill="#2A3642" />
    <circle cx={450} cy={66} r={9} fill={color} opacity={0.4 + 0.6 * lit * (0.6 + 0.4 * Math.sin(frame * 0.3))} />
    {/* frontón */}
    <path d="M90 360 L450 280 L810 360 Z" fill="url(#gbStone)" stroke="#3B4B5A" strokeOpacity={0.7} />
    <path d="M150 352 L450 298 L750 352 Z" fill="#0A0F14" opacity={0.6} />
    <rect x={80} y={358} width={740} height={26} fill="#18212A" />
    {/* columnas */}
    {Array.from({length: 8}, (_, i) => (
      <g key={i}>
        <rect x={112 + i * 92} y={384} width={44} height={236} fill="url(#gbCol)" />
        <rect x={106 + i * 92} y={384} width={56} height={12} fill="#26323D" />
        <rect x={106 + i * 92} y={608} width={56} height={14} fill="#26323D" />
      </g>
    ))}
    {/* ventanas detrás de las columnas que se encienden en cascada */}
    {Array.from({length: 7}, (_, i) => {
      const on = Math.max(0, Math.min(1, lit * 9 - i * 0.9));
      return (
        <g key={i}>
          <rect x={164 + i * 92} y={430} width={32} height={120} fill="#05080B" />
          <rect x={164 + i * 92} y={430} width={32} height={120} fill={color} opacity={0.65 * on} />
          <ellipse cx={180 + i * 92} cy={490} rx={70} ry={110} fill="url(#gbWin)" opacity={0.35 * on} />
        </g>
      );
    })}
    {/* escalinata */}
    {Array.from({length: 5}, (_, i) => <rect key={i} x={60 - i * 14} y={622 + i * 15} width={780 + i * 28} height={15} fill={i % 2 ? '#111820' : '#16202A'} />)}
  </svg>
);
