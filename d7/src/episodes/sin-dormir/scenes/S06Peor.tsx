/**
 * ESCENA 6 · "Así que un día sin dormir no solo cansa: tu cuerpo y tu cerebro rinden peor."
 * Dos baterías —CUERPO y CEREBRO— con su ícono; se vacían de verde a coral, sincronizadas con cada palabra. En "peor" parpadean en rojo.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Brain} from '../../../dl/anatomy/Anatomy';
import {Glow} from '../../../dl/light/Light';
import {spr} from '../../../dl/motion';
import {Battery, E, LW, NightBg, Person, Vig, lerp, prog} from './common';
import {P} from './palette';

export const S06Peor: React.FC<{lw: LW}> = ({lw}) => {
  const f = useCurrentFrame();
  const a = spr(f, lw(70), {damping: 13, stiffness: 140});
  const b = spr(f, lw(73), {damping: 13, stiffness: 140});
  const drain = prog(f, lw(74), lw(75) + 8, E.inOut);
  const lvl = lerp(0.7, 0.14, drain);
  const warn = f >= lw(75) && Math.floor(f / 5) % 2 === 0 ? 1 : 0;
  const pre = prog(f, 0, lw(68), E.out);
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <NightBg f={f} />
      <Glow x={540} y={640} r={560} color={drain > 0.6 ? P.coral : P.screen} opacity={0.18 + 0.12 * warn} />
      <div style={{position: 'absolute', inset: 0, opacity: 1 - prog(f, lw(68), lw(70)), transform: `translateY(${lerp(40, 0, pre)}px)`}}>
        <Person x={540} s={0.85} foot={1150} rot={lerp(0, 5, pre)} expression="neutral" blink={0.65} id="s6" />
      </div>
      <div style={{position: 'absolute', left: 280 - 110, top: 300, opacity: a, transform: `scale(${a})`}}>
        <svg width={220} height={300} viewBox="0 0 220 300"><circle cx={110} cy={50} r={40} fill={P.muted} /><rect x={50} y={100} width={120} height={180} rx={50} fill={P.muted} /></svg>
      </div>
      <div style={{position: 'absolute', left: 800 - 147, top: 330, opacity: b, transform: `scale(${b})`}}>
        <Brain frame={f} color="#E8A9A0" scale={0.7} id="b6" />
      </div>
      <div style={{opacity: a}}><Battery x={280} y={760} level={lvl} label="CUERPO" /></div>
      <div style={{opacity: b}}><Battery x={800} y={760} level={lvl - 0.04} label="CEREBRO" /></div>
      <Vig />
    </AbsoluteFill>
  );
};
