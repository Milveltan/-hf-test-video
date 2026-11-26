/**
 * ESCENA 2 · "Primero se te nubla la mente. Te cuesta concentrarte, hasta en lo más simple."
 * El cerebro, nítido, se cubre de niebla en "nubla". Una tarea simple (una nota de dos renglones) se desenfoca y se mueve.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Brain} from '../../../dl/anatomy/Anatomy';
import {Glow} from '../../../dl/light/Light';
import {F} from '../../../dl/fonts';
import {spr} from '../../../dl/motion';
import {E, LW, NightBg, Vig, lerp, prog} from './common';
import {P} from './palette';

export const S02Niebla: React.FC<{lw: LW}> = ({lw}) => {
  const f = useCurrentFrame();
  const inK = spr(f, 2, {damping: 14, stiffness: 120});
  const fog = prog(f, lw(15), lw(18) + 6, E.out);
  const note = spr(f, lw(19), {damping: 13, stiffness: 140});
  const blur = prog(f, lw(21), lw(26), E.inOut);
  const up = lerp(0, -170, prog(f, lw(19) - 4, lw(19) + 10, E.inOut));
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <NightBg f={f} tint="#12283A" />
      <Glow x={540} y={480 + up} r={420} color={P.fluo} opacity={0.22 * inK * (1 - fog * 0.6)} />
      <div style={{position: 'absolute', left: 540 - 252, top: 300 + up, transform: `scale(${lerp(0.7, 1, inK)})`, filter: `blur(${fog * 7}px) saturate(${1 - fog * 0.7})`, opacity: inK}}>
        <Brain frame={f} highlight="cortex" color="#F2B6A0" scale={1.2} id="b2" />
      </div>
      {/* niebla en capas */}
      {[0, 1, 2, 3].map((i) => {
        const x = ((f * (0.8 + i * 0.4) + i * 300) % 1600) - 500;
        return <div key={i} style={{position: 'absolute', left: x, top: 280 + up + i * 60, width: 900, height: 320, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(205,220,235,0.55), rgba(205,220,235,0))', opacity: fog * (0.7 - i * 0.1), filter: 'blur(10px)'}} />;
      })}
      {note > 0.01 && (
        <div style={{position: 'absolute', left: 540 - 360, top: 690, width: 720, padding: '34px 40px', background: '#FFF3A8', borderRadius: 10, boxShadow: '0 20px 50px rgba(0,0,0,0.6)', transform: `translateY(${(1 - note) * 120}px) rotate(${-3 + Math.sin(f * 0.13) * 3 * blur}deg)`, opacity: Math.min(1, note)}}>
          {['☐ responder un mensaje', '☐ comprar pan'].map((t, i) => (
            <div key={i} style={{fontFamily: F.grotesk, fontWeight: 700, fontSize: 50, whiteSpace: 'nowrap', color: '#2A2418', lineHeight: 1.5, filter: `blur(${blur * (5 + i * 2)}px)`, transform: `translateX(${Math.sin(f * 0.3 + i) * 12 * blur}px)`, opacity: 1 - blur * 0.3}}>{t}</div>
          ))}
        </div>
      )}
      <Vig />
    </AbsoluteFill>
  );
};
