/**
 * ESCENA 12 · "Así que la próxima vez que olvides a qué venías, no es mala memoria."
 * Eco del gancho (la persona entra y duda) → la cocina se oscurece, "MALA MEMORIA" aparece y es tachada; el cerebro sano la reemplaza.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Brain} from '../../../dl/anatomy/Anatomy';
import {Glow} from '../../../dl/light/Light';
import {F} from '../../../dl/fonts';
import {spr} from '../../../dl/motion';
import {E, Kitchen, LW, Person, Q, Vig, lerp, prog, walkPose} from './common';
import {POSES, mixPose} from '../../../dl/characters/HumanRig';
import {P} from './palette';

export const S12Mala: React.FC<{lw: LW}> = ({lw}) => {
  const f = useCurrentFrame();
  const walkK = prog(f, 0, lw(153), E.out);
  const x = lerp(-120, 400, walkK);
  const pose = walkK < 0.985 ? walkPose(f) : mixPose(POSES.idle, {shL: 24, elL: -40}, 0.6);
  const q = spr(f, lw(155), {damping: 9, stiffness: 180});
  const dark = prog(f, lw(158) - 3, lw(158) + 5, E.out);
  const txt = spr(f, lw(158), {damping: 12, stiffness: 150});
  const strike = prog(f, lw(160), lw(160) + 7, E.out);
  const fade = prog(f, lw(161), lw(161) + 10, E.in);
  const sane = spr(f, lw(161), {damping: 13, stiffness: 120});
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <Kitchen f={f} lit={1 - 0.7 * dark} />
      <Person x={x} s={0.7} pose={pose} expression={dark > 0.3 ? 'neutral' : f >= lw(154) ? 'surprise' : 'neutral'} look={f > lw(154) ? Math.sin(f * 0.1) * 0.8 : 0.3} id="g12" opacity={1 - 0.6 * dark} />
      {q > 0.01 && dark < 0.5 && <Q x={x + 70} y={170} k={q * (1 - dark * 2)} rot={6} />}
      <div style={{position: 'absolute', inset: 0, background: `rgba(5,14,18,${0.45 * dark})`}} />
      {txt > 0.01 && (
        <div style={{position: 'absolute', left: 0, width: 1080, top: 330, textAlign: 'center', transform: `scale(${0.7 + 0.3 * txt})`, opacity: Math.min(1, txt) * (1 - 0.7 * fade)}}>
          <div style={{display: 'inline-block', position: 'relative', fontFamily: F.display, fontSize: 150, lineHeight: 1, color: P.cream, textShadow: '0 10px 40px rgba(0,0,0,0.85)', letterSpacing: '0.02em'}}>
            MALA MEMORIA
            <svg width={960} height={80} viewBox="0 0 960 80" style={{position: 'absolute', left: -20, top: 36, overflow: 'visible'}}>
              <path d="M0 50 L960 18" stroke={P.coral} strokeWidth={22} strokeLinecap="round" strokeDasharray={980} strokeDashoffset={980 * (1 - strike)} style={{filter: `drop-shadow(0 0 16px ${P.coral})`}} />
            </svg>
          </div>
        </div>
      )}
      {sane > 0.01 && (
        <>
          <Glow x={540} y={640} r={380} color={P.ok} opacity={0.28 * sane} />
          <div style={{position: 'absolute', left: 540 - 126, top: 640 - 108, opacity: sane, transform: `scale(${0.6 + 0.4 * sane})`}}>
            <Brain frame={f} highlight="all" color="#F2B6A0" scale={0.6} id="b12" />
          </div>
          <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
            <circle cx={720} cy={560} r={34} fill={P.ok} opacity={sane} /><path d="M704 560 l12 14 l24 -28" stroke={P.film} strokeWidth={8} fill="none" strokeLinecap="round" />
          </svg>
        </>
      )}
      <Vig />
    </AbsoluteFill>
  );
};
