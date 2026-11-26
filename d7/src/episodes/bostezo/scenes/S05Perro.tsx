/**
 * ESCENA 5 · "Hasta un perro puede contagiarse del tuyo."
 * La persona (izquierda) bosteza; la señal roja viaja hacia el perro (derecha), que lo mira y bosteza también en "contagiarse".
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {DogHead, FaceCloseUp, yawnCurve} from '../../../dl/characters/Face';
import {Glow} from '../../../dl/light/Light';
import {spr} from '../../../dl/motion';
import {Dark, E, Grain, LW, Vig, lerp, prog} from './common';
import {LOOKS, P} from './palette';

export const S05Perro: React.FC<{lw: LW}> = ({lw}) => {
  const f = useCurrentFrame();
  const yH = yawnCurve(f, lw(57) - 4, 50);
  const sig = prog(f, lw(59), lw(61), E.inOut);
  const yD = yawnCurve(f, lw(61), 54);
  const dogIn = spr(f, lw(58), {damping: 13, stiffness: 120});
  return (
    <AbsoluteFill style={{overflow: 'hidden', background: P.void}}>
      <Dark f={f} glow="#141A2A" />
      <Glow x={290} y={560} r={330} color={P.rim} opacity={0.2} />
      <Glow x={790} y={640} r={330} color="#FFB36A" opacity={0.18 * dogIn} />
      <div style={{position: 'absolute', left: 290 - 300 * 0.95, top: 560 - 360 * 0.95}}><FaceCloseUp look={LOOKS[3]} scale={0.95} yawn={yH} gaze={0.7} id="fp" /></div>
      <div style={{position: 'absolute', left: 790 - 250 * 1.05, top: 650 - 230 * 1.05, opacity: dogIn, transform: `translateX(${(1 - dogIn) * 120}px)`}}><DogHead scale={1.05} yawn={yD} id="dg5" /></div>
      <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
        {sig > 0 && sig < 1 && <>
          <path d={`M400 480 Q560 380 ${lerp(400, 720, sig)} ${lerp(480, 560, sig)}`} stroke={P.signal} strokeWidth={6} fill="none" style={{filter: `drop-shadow(0 0 12px ${P.signal})`}} />
          <circle cx={lerp(400, 720, sig)} cy={lerp(480, 560, sig) - Math.sin(sig * Math.PI) * 60} r={12} fill={P.signal} />
        </>}
      </svg>
      <Grain f={f} />
      <Vig k={0.8} />
    </AbsoluteFill>
  );
};
