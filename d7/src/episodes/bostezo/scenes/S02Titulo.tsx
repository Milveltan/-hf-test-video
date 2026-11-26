/**
 * ESCENA 2 · "El bostezo."
 * Golpe de título: la palabra BOSTEZO se abre como una mandíbula (mitad superior sube, inferior baja) y deja ver un rostro
 * gigante en pleno bostezo detrás.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {FaceCloseUp, yawnCurve} from '../../../dl/characters/Face';
import {Flash} from '../../../dl/fx/Fx';
import {F} from '../../../dl/fonts';
import {Dark, E, Grain, LW, Vig, lerp, prog} from './common';
import {LOOKS, P} from './palette';

export const S02Titulo: React.FC<{lw: LW}> = ({lw}) => {
  const f = useCurrentFrame();
  const slam = prog(f, 0, 6, E.out);
  const open = prog(f, lw(16) + 4, lw(16) + 18, E.inOut);
  const y = yawnCurve(f, lw(16) - 4, 46);
  const word = (half: 0 | 1) => (
    <div style={{position: 'absolute', left: 0, width: 1080, top: 470, textAlign: 'center', fontFamily: F.display, fontSize: 250, lineHeight: 1, color: P.text, letterSpacing: '0.02em',
      clipPath: half === 0 ? 'inset(0 0 50% 0)' : 'inset(50% 0 0 0)', transform: `translateY(${(half === 0 ? -1 : 1) * open * 320}px) scale(${lerp(1.4, 1, slam)})`, textShadow: `0 0 40px ${P.rim}88`}}>BOSTEZO</div>
  );
  return (
    <AbsoluteFill style={{overflow: 'hidden', background: P.void}}>
      <Dark f={f} glow="#101E34" />
      <div style={{position: 'absolute', left: 540 - 300 * 1.6, top: 610 - 360 * 1.6, opacity: open, transform: `scale(${lerp(1.15, 1, open)})`, transformOrigin: '540px 600px'}}>
        <FaceCloseUp look={LOOKS[2]} scale={1.6} yawn={Math.max(y, open * 0.9)} rim={P.rim} id="ft" />
      </div>
      {word(0)}{word(1)}
      <Flash k={f < 5 ? 0.5 * (1 - f / 5) : 0} color="#FFFFFF" />
      <Grain f={f} />
      <Vig k={0.8} />
    </AbsoluteFill>
  );
};
