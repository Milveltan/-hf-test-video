/**
 * VascularBody — silueta humana translúcida (400×960, mismas proporciones que HumanRig) con su red de vasos.
 * constrict 0..1: los vasos de brazos y piernas se estrechan y apagan (vasoconstricción periférica).
 * core 0..1: el flujo se concentra y brilla en cerebro y corazón. flow = velocidad del pulso de sangre.
 */
import React from 'react';
import {lerp} from '../motion';

const LIMBS = [
  'M178 318 C 150 300 128 290 118 300 C 104 380 96 470 88 560 C 84 610 82 640 80 660',
  'M222 318 C 250 300 272 290 282 300 C 296 380 304 470 312 560 C 316 610 318 640 320 660',
  'M196 470 C 190 520 178 560 176 640 C 174 740 172 840 170 920',
  'M204 470 C 210 520 222 560 224 640 C 226 740 228 840 230 920',
];
const CORE = ['M200 330 C 200 300 198 280 196 250 C 194 230 188 215 186 196', 'M200 330 C 200 300 202 280 204 250 C 206 230 212 215 214 196', 'M200 330 C 200 380 200 420 200 470'];

export const VascularBody: React.FC<{frame: number; constrict?: number; core?: number; flow?: number; skin?: string; id?: string; scale?: number}> = ({
  frame, constrict = 0, core = 0.3, flow = 1, skin = '#9FE8FF', id = 'vb', scale = 1,
}) => {
  const limbW = lerp(13, 3.5, constrict);
  const coreW = lerp(14, 20, core);
  const dash = (len: number) => ({strokeDasharray: `${len} ${len * 1.6}`, strokeDashoffset: -frame * 6 * flow});
  return (
    <svg width={400 * scale} height={960 * scale} viewBox="0 0 400 960" style={{overflow: 'visible'}}>
      <defs>
        <filter id={`${id}gl`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="9" /></filter>
        <radialGradient id={`${id}hb`}><stop offset="0" stopColor="#FF5A66" stopOpacity={0.9} /><stop offset="1" stopColor="#FF5A66" stopOpacity={0} /></radialGradient>
      </defs>
      {/* silueta */}
      <g fill={skin} fillOpacity={0.06} stroke={skin} strokeOpacity={0.45} strokeWidth={2.5}>
        <circle cx={200} cy={135} r={72} />
        <path d="M180 205 L180 248 L120 262 Q100 300 100 340 L82 560 Q76 640 80 676 L100 676 Q108 600 116 560 L124 420 L128 520 L150 930 L196 930 L198 560 L202 560 L204 930 L250 930 L272 520 L276 420 L284 560 Q292 600 300 676 L320 676 Q324 640 318 560 L300 340 Q300 300 280 262 L220 248 L220 205 Z" />
      </g>
      {/* extremidades: se estrechan */}
      {LIMBS.map((d, i) => (
        <g key={i} opacity={lerp(1, 0.35, constrict)}>
          <path d={d} stroke="#7A1426" strokeWidth={limbW + 6} fill="none" strokeLinecap="round" />
          <path d={d} stroke="#E8323C" strokeWidth={limbW} fill="none" strokeLinecap="round" />
          <path d={d} stroke="#FFB3B8" strokeWidth={limbW * 0.4} fill="none" strokeLinecap="round" style={dash(14)} opacity={lerp(0.9, 0.2, constrict)} />
        </g>
      ))}
      {/* núcleo: cerebro y corazón */}
      {CORE.map((d, i) => (
        <g key={i}>
          <path d={d} stroke="#FF4D5E" strokeWidth={coreW + 14} fill="none" opacity={0.35 * core} filter={`url(#${id}gl)`} />
          <path d={d} stroke="#7A1426" strokeWidth={coreW + 6} fill="none" strokeLinecap="round" />
          <path d={d} stroke="#F23A46" strokeWidth={coreW} fill="none" strokeLinecap="round" />
          <path d={d} stroke="#FFD0D3" strokeWidth={coreW * 0.4} fill="none" strokeLinecap="round" style={dash(12)} />
        </g>
      ))}
      {/* cerebro */}
      <ellipse cx={200} cy={128} rx={60} ry={50} fill="#FFB3C2" opacity={0.18 + 0.5 * core} />
      <ellipse cx={200} cy={128} rx={80} ry={70} fill={`url(#${id}hb)`} opacity={core} />
      <path d="M150 128 C 150 90 180 74 200 80 C 222 74 252 92 250 128 C 252 160 226 176 200 170 C 172 176 148 160 150 128 Z M200 82 L200 168 M168 108 Q182 116 176 132 M232 108 Q218 116 224 132" stroke="#FFD6DE" strokeOpacity={0.7} strokeWidth={3} fill="none" />
      {/* corazón */}
      <circle cx={204} cy={336} r={60} fill={`url(#${id}hb)`} opacity={0.4 + 0.6 * core} />
      <path d="M204 368 C 170 345 168 312 186 305 C 196 301 203 309 204 316 C 205 309 212 301 222 305 C 240 312 238 345 204 368 Z" fill="#E8323C" stroke="#FFC2C7" strokeWidth={2.5} transform={`translate(204 336) scale(${1 + 0.06 * Math.max(0, Math.sin(frame * 0.35))}) translate(-204 -336)`} />
    </svg>
  );
};
