/**
 * Biblioteca Datologo · Robot "bot" articulado (cuerpo completo, estilo industrial con materiales metálicos).
 * Props animables: headTilt (°), arm (0..1 sube el brazo), led (0..1 posición del ojo que escanea), glow (intensidad).
 * Se dibuja en una caja de 240×360 con el origen arriba a la izquierda; escálalo con `scale`.
 */
import React from 'react';

export const Bot: React.FC<{headTilt?: number; arm?: number; armR?: number; led?: number; glow?: number; color?: string; scale?: number; id?: string}> = ({
  headTilt = 0, arm = 0, armR = 0, led = 0.5, glow = 1, color = '#FF3B3B', scale = 1, id = 'b',
}) => (
  <svg width={240 * scale} height={360 * scale} viewBox="0 0 240 360" style={{overflow: 'visible'}}>
    <defs>
      <linearGradient id={`${id}m`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#8796A3" />
        <stop offset="0.45" stopColor="#3A4752" />
        <stop offset="1" stopColor="#151C22" />
      </linearGradient>
      <linearGradient id={`${id}d`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#2A343D" />
        <stop offset="1" stopColor="#0D1216" />
      </linearGradient>
      <radialGradient id={`${id}g`}>
        <stop offset="0" stopColor={color} stopOpacity={0.55 * glow} />
        <stop offset="1" stopColor={color} stopOpacity={0} />
      </radialGradient>
    </defs>
    {/* sombra de contacto */}
    <ellipse cx={120} cy={352} rx={78} ry={9} fill="#000" opacity={0.45} />
    {/* piernas */}
    <rect x={82} y={262} width={28} height={88} rx={10} fill={`url(#${id}d)`} />
    <rect x={130} y={262} width={28} height={88} rx={10} fill={`url(#${id}d)`} />
    {/* brazo izquierdo (fijo/colgando) */}
    <g transform={`rotate(${-8 - armR * 70} 52 170)`}>
      <rect x={38} y={166} width={26} height={92} rx={12} fill={`url(#${id}m)`} />
      <circle cx={51} cy={262} r={14} fill="#1B232A" stroke="#6E7C88" />
    </g>
    {/* torso */}
    <rect x={56} y={150} width={128} height={124} rx={26} fill={`url(#${id}m)`} stroke="#9AA8B3" strokeOpacity={0.5} />
    <rect x={78} y={176} width={84} height={46} rx={10} fill="#06090C" />
    {[0, 1, 2, 3].map((i) => <rect key={i} x={86 + i * 19} y={188} width={12} height={22} rx={3} fill={color} opacity={0.25 + 0.6 * glow * ((i + Math.round(led * 4)) % 2)} />)}
    {/* brazo derecho (animable) */}
    <g transform={`rotate(${8 + arm * -110} 188 170)`}>
      <rect x={176} y={166} width={26} height={92} rx={12} fill={`url(#${id}m)`} />
      <circle cx={189} cy={262} r={14} fill="#1B232A" stroke="#6E7C88" />
    </g>
    {/* cuello */}
    <rect x={106} y={128} width={28} height={26} rx={6} fill="#20292F" />
    {/* cabeza */}
    <g transform={`rotate(${headTilt} 120 120)`}>
      <circle cx={120} cy={70} r={60} fill={`url(#${id}g)`} />
      <line x1={120} y1={18} x2={120} y2={36} stroke="#8796A3" strokeWidth={4} />
      <circle cx={120} cy={14} r={7} fill={color} opacity={0.6 + 0.4 * glow} />
      <rect x={62} y={34} width={116} height={96} rx={30} fill={`url(#${id}m)`} stroke="#B3C0CA" strokeOpacity={0.6} strokeWidth={1.5} />
      <rect x={76} y={64} width={88} height={30} rx={15} fill="#04070A" />
      <circle cx={92 + led * 56} cy={79} r={10} fill={color} />
      <circle cx={92 + led * 56} cy={79} r={22} fill={color} opacity={0.25 * glow} />
      <path d="M74 44 Q120 30 166 44" stroke="#FFFFFF" strokeOpacity={0.25} strokeWidth={3} fill="none" />
    </g>
  </svg>
);

/** Pictograma de persona (isotipo): para conteos y proporciones */
export const Pictogram: React.FC<{color: string; size?: number; bot?: boolean}> = ({color, size = 40, bot}) => (
  <svg width={size} height={size * 1.6} viewBox="0 0 40 64">
    {bot ? <rect x={9} y={2} width={22} height={18} rx={5} fill={color} /> : <circle cx={20} cy={11} r={9} fill={color} />}
    {bot ? <rect x={14} y={8} width={12} height={5} rx={2.5} fill="#03060A" /> : null}
    <path d="M6 62 L6 34 Q6 24 20 24 Q34 24 34 34 L34 62 Z" fill={color} />
  </svg>
);
