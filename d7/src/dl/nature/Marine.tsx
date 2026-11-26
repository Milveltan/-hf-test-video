/**
 * Fauna marina en silueta iluminada (vista lateral, nada hacia la derecha).
 * Whale: ballena jorobada 900×340 · Seal: foca 420×170. La cola ondula con el fotograma.
 * color = cuerpo, belly = vientre, rim = luz de contorno desde la superficie.
 */
import React from 'react';

export const Whale: React.FC<{frame: number; scale?: number; color?: string; belly?: string; rim?: string; id?: string}> = ({frame, scale = 1, color = '#1D3A55', belly = '#5B7F99', rim = '#BFF4FF', id = 'wh'}) => {
  const t = Math.sin(frame * 0.07) * 18;
  const fin = Math.sin(frame * 0.07 + 1) * 8;
  return (
    <svg width={900 * scale} height={340 * scale} viewBox="0 0 900 340" style={{overflow: 'visible'}}>
      <defs>
        <linearGradient id={`${id}b`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={color} /><stop offset="0.62" stopColor={color} /><stop offset="1" stopColor={belly} /></linearGradient>
      </defs>
      {/* aleta pectoral larga (lejana) */}
      <path d={`M560 210 C 520 260 470 300 400 ${318 + fin} C 450 300 510 262 540 214 Z`} fill={color} opacity={0.75} />
      <path d={`M120 ${170 + t * 0.3} C 80 ${150 + t} 40 ${120 + t * 1.3} 0 ${95 + t * 1.6} C 30 ${150 + t * 1.2} 50 ${190 + t} 20 ${250 + t * 1.6} C 70 ${215 + t} 110 ${200 + t * 0.6} 140 ${200 + t * 0.3} Z`} fill={color} />
      <path d={`M130 ${185 + t * 0.3} C 260 120 420 90 600 110 C 720 122 820 150 870 190 C 885 205 880 222 860 232 C 800 262 700 270 600 262 C 460 252 300 236 130 ${205 + t * 0.3} Z`} fill={`url(#${id}b)`} />
      <path d={`M130 ${185 + t * 0.3} C 260 120 420 90 600 110 C 720 122 820 150 870 190`} stroke={rim} strokeOpacity={0.55} strokeWidth={3} fill="none" />
      {/* surcos ventrales */}
      {[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M${640 + i * 4} ${232 + i * 6} C 720 ${236 + i * 5} 800 ${226 + i * 3} 852 ${214 + i * 2}`} stroke="#0E2234" strokeOpacity={0.5} strokeWidth={2} fill="none" />)}
      <path d="M440 108 L470 88 L486 104 Z" fill={color} />
      <circle cx={780} cy={196} r={5} fill="#08121C" />
      {/* aleta pectoral cercana */}
      <path d={`M640 225 C 610 270 560 310 490 ${330 + fin} C 540 312 600 278 628 236 Z`} fill={belly} opacity={0.9} />
    </svg>
  );
};

export const Seal: React.FC<{frame: number; scale?: number; color?: string; belly?: string; rim?: string; id?: string}> = ({frame, scale = 1, color = '#3B4A57', belly = '#8E9DA8', rim = '#DFFBFF', id = 'se'}) => {
  const t = Math.sin(frame * 0.22) * 12;
  return (
    <svg width={420 * scale} height={170 * scale} viewBox="0 0 420 170" style={{overflow: 'visible'}}>
      <defs><linearGradient id={`${id}b`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={color} /><stop offset="0.6" stopColor={color} /><stop offset="1" stopColor={belly} /></linearGradient></defs>
      <path d={`M70 ${88 + t * 0.4} C 40 ${70 + t} 18 ${60 + t * 1.3} 0 ${56 + t * 1.5} C 14 ${86 + t} 14 ${100 + t} 2 ${124 + t * 1.5} C 26 ${112 + t} 50 ${104 + t * 0.7} 76 ${100 + t * 0.4} Z`} fill={color} />
      <path d={`M70 ${84 + t * 0.4} C 150 50 260 40 340 58 C 380 66 412 82 418 96 C 420 108 404 116 380 118 C 300 128 180 126 70 ${106 + t * 0.4} Z`} fill={`url(#${id}b)`} />
      <path d={`M70 ${84 + t * 0.4} C 150 50 260 40 340 58 C 380 66 412 82 418 96`} stroke={rim} strokeOpacity={0.6} strokeWidth={2.5} fill="none" />
      <path d={`M270 112 C 250 140 230 152 200 ${160 + t * 0.3} C 228 140 244 126 252 112 Z`} fill={color} />
      <circle cx={382} cy={84} r={5} fill="#05090D" /><circle cx={383.5} cy={82.5} r={1.5} fill="#FFF" />
      <path d="M404 98 l18 -4 M404 101 l18 3" stroke={rim} strokeOpacity={0.5} strokeWidth={1.2} />
    </svg>
  );
};
