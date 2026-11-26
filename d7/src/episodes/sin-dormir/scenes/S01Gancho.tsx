/**
 * ESCENA 1 · "Llevas todo un día sin dormir. ¿Qué le está pasando a tu cuerpo?"
 * El reloj de 24 h da una vuelta completa sobre la persona (día → noche → día detrás); en "dormir" se clava.
 * En "cuerpo" el pecho se vuelve rayos X y aparecen corazón y pulmones: entramos al cuerpo.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Sky} from '../../../dl/nature/Nature';
import {Heart, Lungs} from '../../../dl/anatomy/Anatomy';
import {Flash} from '../../../dl/fx/Fx';
import {Clock24, E, LW, NightBg, Person, Vig, lerp, prog} from './common';

export const S01Gancho: React.FC<{lw: LW}> = ({lw}) => {
  const f = useCurrentFrame();
  const spin = prog(f, 0, lw(5), E.inOut);
  const t = 0.5 + spin;
  const sky = 1 - prog(f, lw(5), lw(6) + 6);
  const xr = prog(f, lw(11), lw(12) + 6, E.out);
  const push = lerp(1, 1.18, prog(f, lw(6), lw(13)));
  const hit = f >= lw(5) && f < lw(5) + 6 ? 0.4 * (1 - (f - lw(5)) / 6) : 0;
  const droop = 0.45 + 0.15 * Math.sin(f * 0.07) + (Math.sin(f * 0.21) > 0.97 ? 0.5 : 0);
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <NightBg f={f} />
      <div style={{position: 'absolute', inset: 0, opacity: sky * 0.85}}><Sky frame={f} t={t % 1} clouds={5} /></div>
      <div style={{position: 'absolute', inset: 0, transformOrigin: '540px 620px', transform: `scale(${push})`}}>
        <div style={{position: 'absolute', inset: 0, opacity: 1 - prog(f, lw(9), lw(11))}}>
          <Clock24 x={540} y={215} r={160} turns={spin} glow={1} />
        </div>
        <Person x={540} s={0.92} foot={1290} expression="neutral" blink={Math.min(0.9, droop)} breath={0.3 + 0.2 * Math.sin(f * 0.1)} xray={xr} id="s1"
          inside={<g><g transform="translate(118 262) scale(0.4)"><Lungs frame={f} inflate={0.5 + 0.2 * Math.sin(f * 0.1)} /></g><g transform="translate(176 330) scale(0.3)"><Heart frame={f} bpm={96} /></g></g>} />
      </div>
      <Flash k={hit} color="#FFFFFF" />
      <Vig />
    </AbsoluteFill>
  );
};
