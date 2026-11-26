/**
 * Biblioteca DROGMAN · Personaje humano de cuerpo completo, articulado (vista frontal ligeramente en 3/4).
 * Caja 400×960 (origen arriba-izquierda). Escálalo con `scale`. Estilo editorial con volumen: degradados, luz de contorno,
 * sombra de contacto, pliegues de ropa, manos con dedos.
 *
 * Articulaciones (grados): head (inclinación), torso, shL/shR (hombros), elL/elR (codos), hipL/hipR, knL/knR.
 * breath 0..1: expansión del pecho (respirar / contener). expression: neutral · tense · strain · relief · surprise · smile · eyesClosed.
 * look: −1..1 mirada. blink 0..1. cheeks 0..1 (mejillas infladas al contener el aire). flush 0..1 (rubor por esfuerzo).
 * xray 0..1: el torso se vuelve translúcido y muestra `inside` (órganos) alineado al pecho (zona 120..280 × 250..520).
 * Ficha de rasgos: `look` de piel/pelo/ropa con PersonLook (presets: PERSONA_A, PERSONA_B, ATLETA).
 */
import React from 'react';

export type PersonLook = {skin: [string, string]; hair: [string, string]; hairStyle: 'short' | 'long' | 'curly' | 'bun' | 'bald'; top: [string, string]; pants: [string, string]; shoes: string; iris: string};
export const PERSONA_A: PersonLook = {skin: ['#E9B996', '#B9805E'], hair: ['#3A2A20', '#160E08'], hairStyle: 'short', top: ['#2F6F8F', '#173A4D'], pants: ['#1E2733', '#0E131A'], shoes: '#EDEDED', iris: '#5A3A22'};
export const PERSONA_B: PersonLook = {skin: ['#C98E68', '#8C5A3C'], hair: ['#1C1410', '#060403'], hairStyle: 'long', top: ['#C2553D', '#6E2A1C'], pants: ['#2A2D3A', '#12141B'], shoes: '#F2EEE6', iris: '#3B2414'};
export const ATLETA: PersonLook = {skin: ['#F1C8A6', '#C08A66'], hair: ['#8A6240', '#4A321F'], hairStyle: 'bun', top: ['#1F2A36', '#0B1118'], pants: ['#1F2A36', '#0B1118'], shoes: '#39FF8E', iris: '#4E7A94'};

type Pose = {flL?: number; flR?: number; head?: number; torso?: number; shL?: number; shR?: number; elL?: number; elR?: number; hipL?: number; hipR?: number; knL?: number; knR?: number};
export const POSES: Record<string, Pose> = {
  idle: {shL: 8, shR: -8, elL: -6, elR: 6},
  handsChest: {shL: 38, shR: -38, elL: -128, elR: 128},
  handsUp: {shL: 160, shR: -160, elL: -10, elR: 10},
  holdNose: {shL: 10, elL: -8, shR: 15, flR: 0.4, elR: 143, head: -4},
  walkA: {shL: -18, shR: -14, elL: -20, elR: 24, hipL: 16, hipR: -14, knL: -4, knR: 22},
  walkB: {shL: 14, shR: 18, elL: -24, elR: 20, hipL: -14, hipR: 16, knL: 22, knR: -4},
  point: {shL: 8, shR: -100, elL: -6, elR: 0},
};
export const mixPose = (a: Pose, b: Pose, t: number): Pose => {
  const o: Pose = {};
  (Object.keys({...a, ...b}) as (keyof Pose)[]).forEach((k) => (o[k] = (a[k] ?? (k.startsWith('fl') ? 1 : 0)) + ((b[k] ?? (k.startsWith('fl') ? 1 : 0)) - (a[k] ?? (k.startsWith('fl') ? 1 : 0))) * t));
  return o;
};

const Limb: React.FC<{x: number; y: number; a1: number; a2: number; l1: number; l2: number; w1: number; w2: number; fill: string; shade: string; end?: React.ReactNode; id: string}> = ({x, y, a1, a2, l1, l2, w1, w2, fill, shade, end, id}) => (
  <g transform={`translate(${x} ${y}) rotate(${a1})`}>
    <path d={`M${-w1 / 2} 0 Q${-w1 / 2 - 2} ${l1 / 2} ${-w2 / 2} ${l1} L${w2 / 2} ${l1} Q${w1 / 2 + 2} ${l1 / 2} ${w1 / 2} 0 Z`} fill={`url(#${id})`} />
    <path d={`M${w1 / 2 - 4} 4 Q${w1 / 2} ${l1 / 2} ${w2 / 2 - 2} ${l1 - 4}`} stroke={shade} strokeWidth={5} opacity={0.5} fill="none" />
    <g transform={`translate(0 ${l1}) rotate(${a2})`}>
      <circle r={w2 / 2} fill={fill} />
      <path d={`M${-w2 / 2} 0 L${-w2 / 2 + 2} ${l2} L${w2 / 2 - 2} ${l2} L${w2 / 2} 0 Z`} fill={`url(#${id})`} />
      <g transform={`translate(0 ${l2})`}>{end}</g>
    </g>
  </g>
);

const Hand: React.FC<{skin: string; shade: string; flip?: boolean}> = ({skin, shade, flip}) => (
  <g transform={flip ? 'scale(-1 1)' : undefined}>
    <path d="M-12 -4 Q-15 14 -10 24 Q-2 30 8 26 Q14 18 13 2 Z" fill={skin} />
    {[-8, -3, 2, 7].map((fx, i) => <rect key={i} x={fx - 2.4} y={20} width={5} height={14 - Math.abs(i - 1.5) * 2} rx={2.5} fill={skin} />)}
    <path d="M11 4 Q20 10 18 18" stroke={skin} strokeWidth={6} strokeLinecap="round" fill="none" />
    <path d="M-10 22 Q0 26 10 22" stroke={shade} strokeWidth={1.5} opacity={0.5} fill="none" />
  </g>
);

export const HumanRig: React.FC<{
  pose?: Pose; breath?: number; expression?: 'neutral' | 'tense' | 'strain' | 'relief' | 'surprise' | 'smile' | 'eyesClosed';
  look?: number; blink?: number; cheeks?: number; flush?: number; xray?: number; inside?: React.ReactNode;
  person?: PersonLook; rim?: string; scale?: number; id?: string; shadow?: boolean;
}> = ({pose = POSES.idle, breath = 0, expression = 'neutral', look = 0, blink = 0, cheeks = 0, flush = 0, xray = 0, inside, person = PERSONA_A, rim = '#7FE3FF', scale = 1, id = 'hr', shadow = true}) => {
  const P = person;
  const chest = 1 + breath * 0.07;
  const eyeOpen = expression === 'eyesClosed' ? 0 : (1 - blink) * (expression === 'surprise' ? 1.25 : expression === 'strain' ? 0.55 : expression === 'tense' ? 0.8 : 1);
  const brow = expression === 'strain' || expression === 'tense' ? 1 : expression === 'surprise' ? -1 : 0;
  const mouth = {neutral: 'M-12 0 Q0 3 12 0', tense: 'M-12 2 L12 2', strain: 'M-13 3 Q0 -2 13 3', relief: 'M-14 -2 Q0 10 14 -2', surprise: '', smile: 'M-14 -3 Q0 12 14 -3', eyesClosed: 'M-12 0 Q0 4 12 0'}[expression];
  const g = (gid: string, a: string, b: string) => (
    <linearGradient id={`${id}${gid}`} x1="0" y1="0" x2="1" y2="0.3">
      <stop offset="0" stopColor={a} /><stop offset="1" stopColor={b} />
    </linearGradient>
  );
  const pz = {flL: 1, flR: 1, head: 0, torso: 0, shL: 0, shR: 0, elL: 0, elR: 0, hipL: 0, hipR: 0, knL: 0, knR: 0, ...pose};
  return (
    <svg width={400 * scale} height={960 * scale} viewBox="0 0 400 960" style={{overflow: 'visible'}}>
      <defs>
        {g('sk', P.skin[0], P.skin[1])}{g('hr', P.hair[0], P.hair[1])}{g('tp', P.top[0], P.top[1])}{g('pn', P.pants[0], P.pants[1])}
        <radialGradient id={`${id}face`} cx="0.4" cy="0.38" r="0.7"><stop offset="0" stopColor={P.skin[0]} /><stop offset="1" stopColor={P.skin[1]} /></radialGradient>
        <linearGradient id={`${id}rim`} x1="1" y1="0" x2="0" y2="0"><stop offset="0" stopColor={rim} stopOpacity={0.55} /><stop offset="0.3" stopColor={rim} stopOpacity={0} /></linearGradient>
        <clipPath id={`${id}chest`}><path d="M118 250 Q200 236 282 250 L292 520 Q200 540 108 520 Z" /></clipPath>
      </defs>
      {shadow && <ellipse cx={200} cy={948} rx={130} ry={14} fill="#000" opacity={0.45} />}
      <g transform={`rotate(${pz.torso} 200 520)`}>
        {/* piernas */}
        <Limb id={`${id}pn`} x={168} y={510} a1={pz.hipL} a2={pz.knL} l1={210} l2={200} w1={62} w2={46} fill={P.pants[1]} shade="#000" end={<rect x={-26} y={-4} width={52} height={24} rx={11} fill={P.shoes} />} />
        <Limb id={`${id}pn`} x={232} y={510} a1={pz.hipR} a2={pz.knR} l1={210} l2={200} w1={62} w2={46} fill={P.pants[1]} shade="#000" end={<rect x={-26} y={-4} width={52} height={24} rx={11} fill={P.shoes} />} />
        {/* brazo izquierdo (atrás) */}
        <Limb id={`${id}tp`} x={120} y={268} a1={pz.shL} a2={pz.elL} l1={150 * pz.flL} l2={130} w1={44} w2={34} fill={P.top[1]} shade="#000" end={<Hand skin={P.skin[0]} shade={P.skin[1]} />} />
        {/* torso con respiración */}
        <g transform={`translate(200 380) scale(${chest} ${1 + breath * 0.025}) translate(-200 -380)`}>
          <path d="M118 250 Q200 232 282 250 Q300 300 292 400 L288 520 Q200 540 112 520 L108 400 Q100 300 118 250 Z" fill={`url(#${id}tp)`} opacity={1 - 0.82 * xray} />
          <path d="M282 250 Q300 300 292 400 L288 520" stroke={rim} strokeWidth={4} opacity={0.6} fill="none" />
          <path d="M150 300 Q160 400 150 500 M250 300 Q240 400 252 500" stroke="#000" strokeOpacity={0.18 * (1 - xray)} strokeWidth={6} fill="none" />
          <path d="M168 246 Q200 270 232 246" stroke={P.top[1]} strokeWidth={10} fill="none" opacity={1 - xray} />
          {xray > 0.01 && (
            <g clipPath={`url(#${id}chest)`} opacity={xray}>
              <rect x={100} y={236} width={200} height={310} fill="#0A1A26" opacity={0.55} />
              <path d="M118 250 Q200 232 282 250 Q300 300 292 400 L288 520 Q200 540 112 520 L108 400 Q100 300 118 250 Z" fill="none" stroke={rim} strokeWidth={3} strokeDasharray="6 8" />
              {inside}
            </g>
          )}
        </g>
        {/* cuello */}
        <path d="M180 208 L180 250 Q200 262 220 250 L220 208 Z" fill={`url(#${id}sk)`} />
        {/* cabeza */}
        <g transform={`rotate(${pz.head} 200 210)`}>
          {P.hairStyle === 'long' && <><path d="M142 110 Q124 220 140 290 L176 290 Q160 220 164 150 Z" fill={`url(#${id}hr)`} /><path d="M258 110 Q276 220 260 290 L224 290 Q240 220 236 150 Z" fill={`url(#${id}hr)`} /></>}
          <path d={`M146 120 Q144 60 200 56 Q256 60 254 120 Q256 178 ${236 + cheeks * 10} 200 Q218 222 200 222 Q182 222 ${164 - cheeks * 10} 200 Q144 178 146 120 Z`} fill={`url(#${id}face)`} />
          <path d="M146 120 Q144 60 200 56 Q256 60 254 120 Q256 178 236 200" fill={`url(#${id}rim)`} />
          <ellipse cx={142} cy={140} rx={10} ry={17} fill={P.skin[1]} />
          <ellipse cx={258} cy={140} rx={10} ry={17} fill={P.skin[1]} />
          {/* pelo */}
          {P.hairStyle !== 'bald' && <path d={P.hairStyle === 'curly' ? 'M140 128 Q126 60 170 46 Q200 26 236 44 Q276 62 260 128 Q250 98 232 92 Q200 100 170 92 Q152 100 140 128 Z' : 'M142 126 Q136 58 200 50 Q264 58 258 126 Q250 92 228 86 Q200 96 172 86 Q150 92 142 126 Z'} fill={`url(#${id}hr)`} />}
          {P.hairStyle === 'bun' && <circle cx={200} cy={40} r={22} fill={`url(#${id}hr)`} />}
          {P.hairStyle !== 'bald' && <path d="M168 66 Q200 56 236 68" stroke="#FFFFFF" strokeOpacity={0.22} strokeWidth={4} fill="none" strokeLinecap="round" />}
          {/* cejas */}
          <path d={`M166 ${116 + brow * 3} Q180 ${108 + brow * -2} 192 ${114 + brow * 4}`} stroke={P.hair[1]} strokeWidth={5} strokeLinecap="round" fill="none" />
          <path d={`M208 ${114 + brow * 4} Q220 ${108 + brow * -2} 234 ${116 + brow * 3}`} stroke={P.hair[1]} strokeWidth={5} strokeLinecap="round" fill="none" />
          {/* ojos */}
          {[178, 222].map((ex, i) => (
            <g key={i}>
              <ellipse cx={ex} cy={134} rx={11} ry={Math.max(0.8, 7 * eyeOpen)} fill="#F8F4EF" />
              {eyeOpen > 0.25 && <><circle cx={ex + look * 3} cy={134} r={5} fill={P.iris} /><circle cx={ex + look * 3} cy={134} r={2.2} fill="#120B06" /><circle cx={ex + look * 3 + 1.6} cy={132.4} r={1.3} fill="#FFF" /></>}
              <path d={`M${ex - 12} ${134 - 7 * eyeOpen + 1} Q${ex} ${134 - 7 * eyeOpen - 4} ${ex + 12} ${134 - 7 * eyeOpen + 1}`} stroke={P.skin[1]} strokeWidth={2.2} fill="none" />
            </g>
          ))}
          {/* nariz y boca */}
          <path d="M200 140 Q204 160 208 168 Q202 174 194 170" stroke={P.skin[1]} strokeWidth={2.6} fill="none" strokeLinecap="round" />
          {expression === 'surprise' ? <ellipse cx={200} cy={190} rx={9} ry={11} fill="#5A2C25" /> : <path d={mouth} transform="translate(200 190)" stroke="#8C4E40" strokeWidth={4} fill="none" strokeLinecap="round" />}
          {/* rubor / esfuerzo */}
          <ellipse cx={166} cy={168} rx={16} ry={9} fill="#E5604A" opacity={0.12 + flush * 0.45} />
          <ellipse cx={234} cy={168} rx={16} ry={9} fill="#E5604A" opacity={0.12 + flush * 0.45} />
        </g>
        {/* brazo derecho (adelante) */}
        <Limb id={`${id}tp`} x={280} y={268} a1={pz.shR} a2={pz.elR} l1={150 * pz.flR} l2={130} w1={44} w2={34} fill={P.top[1]} shade="#000" end={<Hand skin={P.skin[0]} shade={P.skin[1]} flip />} />
      </g>
    </svg>
  );
};
