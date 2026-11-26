/**
 * ESCENA NUEVA · "Por dentro, tu cuerpo trabaja con la batería en rojo. Reaccionas más lento, te equivocas más,
 * y aunque tomes café, el cansancio vuelve. El café solo esconde el cansancio por un rato; no lo quita."
 * Rayos X: una batería roja late en el pecho. El celular se cae y la mano llega tarde. Con el café la batería sube a ámbar
 * (una capa encima, como maquillaje) y en "no lo quita" la capa se cae y vuelve el rojo.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Glow} from '../../../dl/light/Light';
import {spr} from '../../../dl/motion';
import {POSES, mixPose} from '../../../dl/characters/HumanRig';
import {F} from '../../../dl/fonts';
import {Battery, E, LW, NightBg, Person, Vig, lerp, prog} from './common';
import {P} from './palette';

export const S06Cafe: React.FC<{lw: LW}> = ({lw}) => {
  const f = useCurrentFrame();
  const xr = prog(f, lw(109), lw(111), E.out);
  const red = f >= lw(114) && Math.floor(f / 7) % 2 === 0;
  const dropAt = lw(117);
  const ph = prog(f, dropAt, dropAt + 14, E.in);
  const reach = prog(f, lw(119), lw(120) + 6, E.out);
  const cup = spr(f, lw(125), {damping: 13, stiffness: 140});
  const boost = prog(f, lw(126), lw(129), E.out);
  const crash = prog(f, lw(139), lw(141), E.in);
  const mask = boost * (1 - crash);
  const lvl = 0.14 + 0.46 * mask;
  const toBat = prog(f, lw(123), lw(125), E.inOut);
  const pose = mixPose(mixPose(POSES.idle, {shR: -40, elR: 30}, reach * (1 - toBat)), {shR: -40, elR: 120}, cup);
  const wrong = spr(f, lw(121), {damping: 10, stiffness: 190}) * (1 - toBat);
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <NightBg f={f} tint={red && mask < 0.5 ? '#2A1018' : P.deep} />
      <Glow x={380} y={560} r={420} color={mask > 0.4 ? P.amber : P.coral} opacity={0.22} />
      <Person x={380} s={1.0} foot={1230} pose={pose} expression={crash > 0.5 ? 'tense' : 'neutral'} blink={0.55 - 0.3 * mask} xray={xr * (1 - toBat * 0.6)} id="s6c"
        inside={<g transform="translate(140 330)"><rect width={120} height={64} rx={12} fill="#0B1424" stroke={P.cream} strokeWidth={5} /><rect x={120} y={20} width={10} height={24} rx={3} fill={P.cream} /><rect x={10} y={10} width={100 * lvl} height={44} rx={6} fill={lvl > 0.4 ? P.amber : P.coral} opacity={red || lvl > 0.4 ? 1 : 0.5} /></g>} />
      {/* celular que cae */}
      {f >= dropAt && f < lw(123) && (
        <div style={{position: 'absolute', left: 560 + ph * 40, top: lerp(560, 1120, ph), width: 70, height: 130, borderRadius: 14, background: '#111A28', border: `5px solid ${P.muted}`, transform: `rotate(${ph * 160}deg)`}}>
          <div style={{margin: 8, height: 100, borderRadius: 8, background: P.screen, opacity: 0.8}} />
        </div>
      )}
      {wrong > 0.01 && <div style={{position: 'absolute', left: 620, top: 320, fontFamily: F.display, fontSize: 130, color: P.coral, transform: `scale(${wrong}) rotate(-8deg)`, textShadow: `0 0 30px ${P.coral}`}}>✕</div>}
      {/* taza de café en la mano */}
      {cup > 0.01 && (
        <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}} opacity={Math.min(1, cup)}>
          <g transform={`translate(560 ${lerp(620, 470, cup)})`}>
            <rect x={-40} y={-60} width={80} height={96} rx={12} fill={P.cream} /><path d="M40 -36 q34 0 34 26 q0 26 -34 26" stroke={P.cream} strokeWidth={12} fill="none" />
            {[0, 1, 2].map((i) => { const t = ((f * 0.8 + i * 18) % 54) / 54; return <path key={i} d={`M${-18 + i * 18} ${-70 - t * 80} q10 -14 0 -28`} stroke="#FFFFFF" strokeWidth={5} fill="none" opacity={(1 - t) * 0.5} />; })}
          </g>
        </svg>
      )}
      <div style={{position: 'absolute', inset: 0, opacity: toBat}}>
        <Battery x={810} y={760} w={300} level={lvl} label={mask > 0.4 ? 'CON CAFÉ' : 'SIN DORMIR'} />
        {mask > 0.02 && <div style={{position: 'absolute', left: 810 - 150, top: 690 + crash * 220, width: 300, height: 140, borderRadius: 22, border: `4px dashed ${P.amber}`, opacity: mask, transform: `rotate(${crash * 25}deg)`}} />}
      </div>
      <Vig />
    </AbsoluteFill>
  );
};
