/**
 * ESCENA 1 · "Hay algo que tu cuerpo hace sin pedirte permiso. Y basta con verlo… para repetirlo."
 * Rostro en penumbra con una sola luz de contorno; la cámara se acerca lentamente a los ojos. En "verlo" la pantalla se parte:
 * el rostro de la izquierda empieza a bostezar y, en "repetirlo", el de la derecha lo copia.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {FaceCloseUp, yawnCurve} from '../../../dl/characters/Face';
import {Dark, E, Grain, LW, Vig, lerp, prog} from './common';
import {LOOKS, P} from './palette';

export const S01Permiso: React.FC<{lw: LW}> = ({lw}) => {
  const f = useCurrentFrame();
  const split = prog(f, lw(9), lw(10) + 6, E.inOut);
  const push = lerp(1.35, 1.6, prog(f, 0, lw(9)));
  const reveal = prog(f, 0, 24);
  const yA = yawnCurve(f, lw(11), 52), yB = yawnCurve(f, lw(13), 52);
  const blinkA = f % 70 > 66 ? 1 : 0;
  const gazeA = lerp(0, 0.6, split);
  return (
    <AbsoluteFill style={{overflow: 'hidden', background: P.void}}>
      <Dark f={f} k={0.6} />
      {/* rostro A */}
      <div style={{position: 'absolute', inset: 0, clipPath: `inset(0 ${lerp(0, 50, split)}% 0 0)`}}>
        <div style={{position: 'absolute', left: lerp(540, 270, split) - 300 * lerp(push, 1.05, split), top: lerp(450, 600, split) - 360 * lerp(push, 1.05, split), opacity: reveal, filter: `brightness(${0.35 + 0.65 * reveal})`}}>
          <FaceCloseUp look={LOOKS[0]} scale={lerp(push, 1.05, split)} yawn={yA} blink={blinkA} gaze={gazeA} id="fa" />
        </div>
      </div>
      {/* rostro B */}
      {split > 0.01 && (
        <div style={{position: 'absolute', inset: 0, clipPath: `inset(0 0 0 ${lerp(100, 50, split)}%)`}}>
          <Dark f={f + 40} k={0.6} glow="#0E1A2C" seed={7} />
          <div style={{position: 'absolute', left: 810 - 315, top: 600 - 378}}>
            <FaceCloseUp look={LOOKS[1]} scale={1.05} yawn={yB} gaze={-0.6} rim="#FF9AB8" id="fb" />
          </div>
        </div>
      )}
      {split > 0.01 && <div style={{position: 'absolute', left: 538, top: 0, width: 4, height: 1200, background: P.rim, opacity: split * 0.8, boxShadow: `0 0 20px ${P.rim}`}} />}
      <Grain f={f} />
      <Vig k={0.85} />
    </AbsoluteFill>
  );
};
