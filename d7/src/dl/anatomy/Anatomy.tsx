/**
 * Biblioteca DROGMAN · Anatomía estilizada (precisión de forma y posición; estilo editorial con volumen e iluminación interna).
 *  - Lungs: pulmones con árbol bronquial, se inflan (inflate 0..1), saturación de oxígeno (o2 0..1 tiñe de rojo vivo a violáceo),
 *           alvéolos que brillan (glow). Caja 400×380.
 *  - Heart: corazón con aurículas, ventrículos y grandes vasos; late a `bpm` con sístole/diástole. Caja 260×300.
 *  - BloodFlow: vaso sanguíneo (trayectoria SVG) con glóbulos rojos que circulan; o2 cambia el color; speed en px/fotograma.
 *  - Brain: cerebro lateral con circunvoluciones y tronco encefálico; `highlight` ilumina una región (brainstem, cortex, all).
 *  - Diaphragm: cúpula del diafragma que baja al inspirar (inflate).
 * Todos aceptan `frame` para su animación propia.
 */
import React from 'react';
import {getLength, getPointAtLength} from '@remotion/paths';

const mixHex = (a: string, b: string, t: number) => {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return '#' + pa.map((v, i) => Math.round(v + (pb[i] - v) * t).toString(16).padStart(2, '0')).join('');
};
export const o2Color = (o2: number) => mixHex('#6E2A5C', '#E8323C', Math.max(0, Math.min(1, o2)));

export const Lungs: React.FC<{frame: number; inflate?: number; o2?: number; glow?: number; scale?: number; id?: string}> = ({frame, inflate = 0.5, o2 = 1, glow = 0.5, scale = 1, id = 'lg'}) => {
  const s = 0.9 + inflate * 0.16;
  const tint = o2Color(o2);
  const lobe = (side: 1 | -1) => (
    <g transform={`translate(${200 + side * 18} 60) scale(${side * s} ${s})`}>
      <path d="M10 30 C 40 10 120 20 150 90 C 175 150 170 250 150 300 C 130 330 70 330 40 310 C 20 295 18 260 22 230 C 10 180 0 90 10 30 Z" fill={`url(#${id}tissue)`} stroke="#F7B8B0" strokeOpacity={0.5} strokeWidth={2} />
      <path d="M10 30 C 40 10 120 20 150 90 C 175 150 170 250 150 300" fill="none" stroke="#FFE3DC" strokeOpacity={0.55} strokeWidth={3} />
      {side === 1 && <path d="M60 140 Q100 150 160 130 M50 220 Q100 225 155 210" stroke="#B4525A" strokeOpacity={0.6} strokeWidth={2} fill="none" />}
      {side === -1 && <path d="M50 180 Q100 185 158 160" stroke="#B4525A" strokeOpacity={0.6} strokeWidth={2} fill="none" />}
    </g>
  );
  const branches = (side: 1 | -1) =>
    [[0, 0, 40, 40], [40, 40, 70, 90], [40, 40, 90, 60], [70, 90, 80, 150], [70, 90, 110, 120], [80, 150, 70, 210], [80, 150, 115, 190], [90, 60, 130, 70], [110, 120, 140, 140]].map(([x1, y1, x2, y2], i) => (
      <line key={i} x1={200 + side * (8 + x1 * s)} y1={110 + y1 * s} x2={200 + side * (8 + x2 * s)} y2={110 + y2 * s} stroke="#F4D7CF" strokeWidth={9 - i * 0.7} strokeLinecap="round" />
    ));
  return (
    <svg width={400 * scale} height={380 * scale} viewBox="0 0 400 380" style={{overflow: 'visible'}}>
      <defs>
        <radialGradient id={`${id}tissue`} cx="0.45" cy="0.4" r="0.75">
          <stop offset="0" stopColor={mixHex(tint, '#FFC2B8', 0.45)} />
          <stop offset="0.7" stopColor={tint} />
          <stop offset="1" stopColor={mixHex(tint, '#2A0A14', 0.55)} />
        </radialGradient>
        <filter id={`${id}blur`}><feGaussianBlur stdDeviation="10" /></filter>
      </defs>
      <ellipse cx={200} cy={210} rx={190 * s} ry={150 * s} fill={tint} opacity={0.18 * glow} filter={`url(#${id}blur)`} />
      {lobe(-1)}
      {lobe(1)}
      {/* tráquea */}
      <rect x={188} y={0} width={24} height={116} rx={10} fill="#F1D3CA" />
      {Array.from({length: 8}, (_, i) => <rect key={i} x={186} y={8 + i * 13} width={28} height={5} rx={2.5} fill="#D9AFA4" />)}
      {branches(-1)}
      {branches(1)}
      {/* alvéolos que brillan */}
      {Array.from({length: 26}, (_, i) => {
        const side = i % 2 ? 1 : -1;
        const x = 200 + side * (60 + ((i * 37) % 90)) * s, y = 150 + ((i * 53) % 180) * s;
        return <circle key={i} cx={x} cy={y} r={5 + inflate * 3} fill="#FFE6DF" opacity={glow * (0.25 + 0.35 * Math.sin(frame * 0.12 + i))} />;
      })}
    </svg>
  );
};

export const Heart: React.FC<{frame: number; bpm?: number; o2?: number; glow?: number; scale?: number; id?: string}> = ({frame, bpm = 70, o2 = 1, glow = 0.6, scale = 1, id = 'ht'}) => {
  const period = (60 / bpm) * 30;
  const ph = (frame % period) / period;
  const beat = ph < 0.12 ? Math.sin((ph / 0.12) * Math.PI) : ph < 0.3 ? 0.45 * Math.sin(((ph - 0.12) / 0.18) * Math.PI) : 0;
  const k = 1 + beat * 0.07;
  const muscle = mixHex('#7A1E2A', '#C8323A', 0.4 + 0.6 * o2);
  return (
    <svg width={260 * scale} height={300 * scale} viewBox="0 0 260 300" style={{overflow: 'visible'}}>
      <defs>
        <radialGradient id={`${id}m`} cx="0.4" cy="0.35" r="0.8">
          <stop offset="0" stopColor={mixHex(muscle, '#FFB0A0', 0.45)} />
          <stop offset="0.6" stopColor={muscle} />
          <stop offset="1" stopColor="#2A060C" />
        </radialGradient>
        <filter id={`${id}b`}><feGaussianBlur stdDeviation="12" /></filter>
      </defs>
      <ellipse cx={130} cy={170} rx={120} ry={120} fill="#FF3B3B" opacity={glow * (0.15 + beat * 0.25)} filter={`url(#${id}b)`} />
      {/* grandes vasos */}
      <path d="M118 90 C 112 40 150 10 190 26 C 214 36 214 66 200 80" stroke="#C83A3A" strokeWidth={26} fill="none" strokeLinecap="round" />
      <path d="M150 96 C 150 60 120 40 90 48" stroke="#5A6FB4" strokeWidth={22} fill="none" strokeLinecap="round" />
      <path d="M84 110 L 70 40" stroke="#4E62A6" strokeWidth={22} strokeLinecap="round" />
      <g transform={`translate(130 170) scale(${k}) rotate(-12) translate(-130 -170)`}>
        <path d="M130 270 C 70 230 30 180 40 130 C 48 95 85 80 110 96 C 120 102 126 110 130 118 C 136 104 152 88 178 88 C 214 90 232 126 222 168 C 210 212 170 244 130 270 Z" fill={`url(#${id}m)`} stroke="#FF9A8A" strokeOpacity={0.35} strokeWidth={2} />
        <path d="M130 118 C 126 160 120 210 128 262" stroke="#4A0E16" strokeWidth={4} fill="none" opacity={0.7} />
        <path d="M128 140 C 150 150 170 180 168 214" stroke="#E2B04A" strokeWidth={3} fill="none" opacity={0.7} />
        <path d="M60 120 C 70 100 96 94 108 104" stroke="#FFFFFF" strokeOpacity={0.3} strokeWidth={5} fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
};

export const BloodFlow: React.FC<{frame: number; d: string; width?: number; o2?: number; speed?: number; cells?: number; wall?: string; id?: string}> = ({frame, d, width = 70, o2 = 1, speed = 4, cells = 22, wall = '#7A2030', id = 'bf'}) => {
  const L = React.useMemo(() => getLength(d), [d]);
  const col = o2Color(o2);
  return (
    <svg width={1080} height={1200} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
      <path d={d} stroke={wall} strokeWidth={width + 14} fill="none" strokeLinecap="round" opacity={0.9} />
      <path d={d} stroke="#3A0A12" strokeWidth={width} fill="none" strokeLinecap="round" />
      <path d={d} stroke={col} strokeWidth={width * 0.5} fill="none" strokeLinecap="round" opacity={0.25} />
      {Array.from({length: cells}, (_, i) => {
        const at = (((i / cells) * L + frame * speed * (0.85 + ((i * 7) % 5) * 0.06)) % L + L) % L;
        const p = getPointAtLength(d, at);
        const q = getPointAtLength(d, Math.min(L, at + 1));
        const ang = (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI;
        const off = (((i * 37) % 11) - 5) * (width / 16);
        return (
          <g key={i} transform={`translate(${p.x} ${p.y}) rotate(${ang + ((i * 53) % 40)}) translate(0 ${off})`}>
            <ellipse rx={width * 0.2} ry={width * 0.13} fill={col} />
            <ellipse rx={width * 0.1} ry={width * 0.06} fill="#000" opacity={0.25} />
            <ellipse rx={width * 0.2} ry={width * 0.13} fill="none" stroke="#FFFFFF" strokeOpacity={0.25} strokeWidth={1.5} />
          </g>
        );
      })}
    </svg>
  );
};

export const Brain: React.FC<{frame: number; highlight?: 'none' | 'brainstem' | 'cortex' | 'all'; color?: string; scale?: number; id?: string}> = ({frame, highlight = 'none', color = '#E7A4B0', scale = 1, id = 'br'}) => {
  const pulse = 0.5 + 0.5 * Math.sin(frame * 0.25);
  const hi = (r: string) => highlight === r || highlight === 'all';
  return (
    <svg width={420 * scale} height={360 * scale} viewBox="0 0 420 360" style={{overflow: 'visible'}}>
      <defs>
        <radialGradient id={`${id}g`} cx="0.4" cy="0.35" r="0.8"><stop offset="0" stopColor="#FFD9DF" /><stop offset="0.6" stopColor={color} /><stop offset="1" stopColor="#7A3A4A" /></radialGradient>
        <filter id={`${id}b`}><feGaussianBlur stdDeviation="10" /></filter>
      </defs>
      <path d="M60 190 C 40 110 110 40 200 40 C 300 36 380 90 380 170 C 382 230 340 260 290 262 C 270 290 230 296 200 280 C 160 296 110 280 96 252 C 70 240 62 218 60 190 Z" fill={`url(#${id}g)`} stroke="#FFFFFF" strokeOpacity={0.3} strokeWidth={2} />
      {['M100 120 Q140 90 170 120 Q200 150 240 110 Q280 80 320 120', 'M90 170 Q130 150 160 180 Q190 205 230 170 Q270 140 340 170', 'M110 220 Q150 200 180 230 Q220 250 260 220 Q300 200 330 220', 'M200 44 Q190 90 210 130 Q230 170 210 210', 'M300 70 Q280 110 300 150'].map((p, i) => (
        <path key={i} d={p} stroke="#9A4E5E" strokeWidth={4} fill="none" opacity={0.55} strokeLinecap="round" />
      ))}
      {/* cerebelo */}
      <path d="M270 262 C 300 240 350 248 352 280 C 352 306 310 314 280 300 Z" fill="#D7909E" stroke="#9A4E5E" strokeOpacity={0.6} />
      {/* tronco encefálico */}
      <path d="M228 270 C 230 300 236 330 232 360 L 258 360 C 262 330 262 296 262 270 Z" fill={hi('brainstem') ? '#FFB45A' : '#C88290'} />
      {hi('brainstem') && <ellipse cx={246} cy={300} rx={50} ry={50} fill="#FFB45A" opacity={0.35 + 0.35 * pulse} filter={`url(#${id}b)`} />}
      {hi('cortex') && <path d="M60 190 C 40 110 110 40 200 40 C 300 36 380 90 380 170" stroke="#7FE3FF" strokeWidth={10} opacity={0.4 + 0.4 * pulse} fill="none" filter={`url(#${id}b)`} />}
      <path d="M90 110 Q130 70 190 60" stroke="#FFFFFF" strokeOpacity={0.35} strokeWidth={6} fill="none" strokeLinecap="round" />
    </svg>
  );
};

export const Diaphragm: React.FC<{inflate?: number; width?: number; color?: string}> = ({inflate = 0.5, width = 320, color = '#C4505E'}) => {
  const dy = inflate * 34;
  return (
    <svg width={width} height={120} viewBox={`0 0 ${width} 120`} style={{overflow: 'visible'}}>
      <path d={`M0 ${80} Q${width * 0.25} ${10 + dy} ${width / 2} ${40 + dy} Q${width * 0.75} ${10 + dy} ${width} 80`} stroke={color} strokeWidth={14} fill="none" strokeLinecap="round" />
      <path d={`M0 ${80} Q${width * 0.25} ${10 + dy} ${width / 2} ${40 + dy} Q${width * 0.75} ${10 + dy} ${width} 80`} stroke="#FFD0D4" strokeWidth={3} fill="none" opacity={0.5} transform="translate(0 -4)" />
    </svg>
  );
};
