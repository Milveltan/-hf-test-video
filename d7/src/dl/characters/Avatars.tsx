/**
 * Biblioteca Datologo · Avatares de perfil: humano estilizado (pelo, piel sombreada) y bot (carcasa metálica + LED que escanea).
 * Uso: <HumanFace hue={120} size={84}/> · <BotFace scan={0..1} size={84}/>
 */
import React from 'react';

const ALARM = '#FF3B3B';

/** Cabeza humana estilizada: pelo con masa, piel con sombreado */
export const HumanFace: React.FC<{hue: number; size?: number}> = ({hue, size = 84}) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <defs>
      <radialGradient id={`sk${hue}`} cx="40%" cy="35%" r="70%">
        <stop offset="0%" stopColor="#F3C9A6" />
        <stop offset="100%" stopColor="#B87A55" />
      </radialGradient>
    </defs>
    <circle cx={32} cy={32} r={32} fill={`hsl(${hue} 45% 32%)`} />
    <path d="M12 64 Q14 44 32 44 Q50 44 52 64 Z" fill={`hsl(${(hue + 40) % 360} 35% 55%)`} />
    <ellipse cx={32} cy={30} rx={12} ry={14} fill={`url(#sk${hue})`} />
    <path d={`M19 28 Q20 ${12 + (hue % 6)} 32 ${14 + (hue % 4)} Q45 13 45 28 Q40 20 32 21 Q24 21 19 28 Z`} fill={`hsl(${(hue * 7) % 40 + 10} 40% ${14 + (hue % 20)}%)`} />
    <circle cx={27.5} cy={31} r={1.6} fill="#2A1A12" />
    <circle cx={36.5} cy={31} r={1.6} fill="#2A1A12" />
    <path d="M28 37 Q32 40 36 37" stroke="#7A3B2A" strokeWidth={1.6} fill="none" strokeLinecap="round" />
  </svg>
);

/** Cabeza de bot: carcasa metálica, visor y un único LED que escanea */
export const BotFace: React.FC<{scan: number; size?: number; color?: string}> = ({scan, size = 84, color = ALARM}) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <defs>
      <linearGradient id="botm" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#5B6B78" />
        <stop offset="55%" stopColor="#26323C" />
        <stop offset="100%" stopColor="#11181E" />
      </linearGradient>
    </defs>
    <circle cx={32} cy={32} r={32} fill="#1A0507" />
    <line x1={32} y1={8} x2={32} y2={15} stroke="#8A97A2" strokeWidth={2} />
    <circle cx={32} cy={7} r={2.6} fill={color} />
    <rect x={15} y={15} width={34} height={30} rx={9} fill="url(#botm)" stroke="#8796A2" strokeWidth={1} />
    <rect x={19} y={24} width={26} height={9} rx={4.5} fill="#05080B" />
    <circle cx={23 + scan * 18} cy={28.5} r={3.4} fill={color} />
    <circle cx={23 + scan * 18} cy={28.5} r={7} fill={color} opacity={0.25} />
    <path d="M14 64 Q16 47 32 47 Q48 47 50 64 Z" fill="#2B343C" />
  </svg>
);

