/**
 * ESCENA 3 · "Luego tu cerebro empieza a apagarse por momentos, sin avisarte:"
 * El cerebro tiene zonas encendidas como ventanas; se apagan una a una a destiempo. En "sin avisarte" todo cae a negro de golpe.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Brain} from '../../../dl/anatomy/Anatomy';
import {Glow} from '../../../dl/light/Light';
import {spr} from '../../../dl/motion';
import {LW, NightBg, Vig, lerp, prog} from './common';
import {P} from './palette';

const SPOTS: [number, number][] = [[150, 110], [250, 90], [330, 150], [120, 190], [220, 180], [310, 230], [180, 250]];

export const S03Apagones: React.FC<{lw: LW}> = ({lw}) => {
  const f = useCurrentFrame();
  const inK = spr(f, 2, {damping: 14, stiffness: 120});
  const s = 1.7, ox = 540 - 210 * s, oy = 560 - 180 * s;
  const black = f >= lw(36) && f < lw(36) + 9;
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <NightBg f={f} />
      <Glow x={540} y={560} r={520} color={P.screen} opacity={0.25 * inK} />
      <div style={{position: 'absolute', left: ox, top: oy, opacity: inK, transform: `scale(${lerp(0.8, 1, inK)})`, transformOrigin: '50% 50%'}}>
        <Brain frame={f} highlight="none" color="#E8A9A0" scale={s} id="b3" />
      </div>
      <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
        {SPOTS.map(([x, y], i) => {
          const at = lw(30) + i * 5 + (i % 3) * 3;
          const offK = prog(f, at, at + 3);
          const back = prog(f, at + 14 + (i % 2) * 8, at + 18 + (i % 2) * 8);
          const flick = f > at - 4 && f < at && Math.sin(f * 5 + i) > 0 ? 0.4 : 0;
          const k = Math.max(0, 1 - offK + back * (i % 2) - flick);
          const cx = ox + x * s, cy = oy + y * s;
          return (
            <g key={i}>
              <circle cx={cx} cy={cy} r={80} fill={P.fluo} opacity={0.5 * k} style={{filter: 'blur(16px)'}} />
              <circle cx={cx} cy={cy} r={20} fill={k > 0.3 ? P.fluo : '#1A2533'} opacity={0.4 + 0.6 * k} style={{filter: k > 0.3 ? `drop-shadow(0 0 12px ${P.fluo})` : undefined}} />
            </g>
          );
        })}
      </svg>
      {black && <AbsoluteFill style={{background: '#000'}} />}
      <Vig />
    </AbsoluteFill>
  );
};
