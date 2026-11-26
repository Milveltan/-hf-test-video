/**
 * ESCENA 5 · "Y si es a mediodía, se suma tu reloj interno, que a esa hora ya tiende a bajar la energía."
 * Sol en lo alto; una línea de energía del día se dibuja de la mañana a la noche y marca un valle después del mediodía.
 * El marcador cae al valle en "bajar la energía".
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Sky} from '../../../dl/nature/Nature';
import {F} from '../../../dl/fonts';
import {spr} from '../../../dl/motion';
import {E, LW, Vig, lerp, prog} from './common';
import {P} from './palette';

const curve = (x: number) => 520 - 220 * Math.sin(((x - 120) / 840) * Math.PI) + 150 * Math.exp(-Math.pow((x - 600) / 90, 2));

export const S05Reloj: React.FC<{lw: LW}> = ({lw}) => {
  const f = useCurrentFrame();
  const draw = prog(f, lw(69), lw(74), E.inOut);
  const mx = lerp(380, 600, prog(f, lw(79), lw(83), E.inOut));
  const pts = Array.from({length: 85}, (_, i) => 120 + i * 10).filter((x) => x <= 120 + draw * 840);
  const d = pts.map((x, i) => `${i ? 'L' : 'M'}${x} ${curve(x)}`).join(' ');
  const sun = spr(f, lw(66), {damping: 14, stiffness: 120});
  const dip = prog(f, lw(81), lw(83) + 4);
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <Sky frame={f} t={0.5} clouds={4} sunX={0.5} />
      <AbsoluteFill style={{background: `linear-gradient(transparent 30%, rgba(27,21,48,0.7))`}} />
      <div style={{position: 'absolute', left: 0, width: 1080, top: 120, textAlign: 'center', fontFamily: F.display, fontSize: 90, color: P.text, opacity: sun, textShadow: '0 6px 24px rgba(0,0,0,0.4)'}}>MEDIODÍA</div>
      <svg width={1080} height={1200} style={{position: 'absolute', inset: 0, top: 300}}>
        <line x1={120} y1={720} x2={960} y2={720} stroke={P.text} strokeWidth={4} opacity={0.6} />
        {[['MAÑANA', 220], ['TARDE', 600], ['NOCHE', 900]].map(([t, x]) => <text key={t as string} x={x as number} y={770} textAnchor="middle" fontFamily={F.mono} fontWeight={700} fontSize={32} fill={P.text}>{t as string}</text>)}
        <path d={d} stroke={P.honey} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" style={{filter: `drop-shadow(0 0 14px ${P.honey})`}} />
        {draw > 0.98 && <>
          <circle cx={mx} cy={curve(mx)} r={26} fill={dip > 0.5 ? P.lav : P.alert} stroke="#FFF" strokeWidth={6} />
          <ellipse cx={600} cy={curve(600) + 10} rx={110} ry={60} fill="none" stroke={P.lav} strokeWidth={6} strokeDasharray="10 10" opacity={dip} />
        </>}
      </svg>
      <div style={{position: 'absolute', left: 0, width: 1080, top: 300 + curve(600) + 90, textAlign: 'center', fontFamily: F.serif, fontStyle: 'italic', fontSize: 64, color: P.lav, opacity: dip, textShadow: '0 4px 20px rgba(0,0,0,0.8)'}}>bajón de la tarde</div>
      <Vig k={0.4} />
    </AbsoluteFill>
  );
};
