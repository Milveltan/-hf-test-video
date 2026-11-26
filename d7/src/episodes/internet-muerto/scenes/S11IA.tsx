/**
 * ESCENAS 11–12 · "Entonces llegó la inteligencia artificial. Y en 2025 pasó algo inesperado."
 * 3D real (Opus particle-shape-morph, three.js): las letras "IA" se deshacen en miles de partículas que forman
 * una esfera alrededor de un núcleo. Luego el contador rueda a 2025 y una notificación cae de golpe.
 */
import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame} from 'remotion';
import {particleShapeMorph} from '../../../opus-motion';
import {F} from '../../../dl/fonts';
import {E, keys, noise1, prog, spr} from '../../../dl/motion';
import {MaskRise, Odometer} from '../../../dl/type/Type';
import {Glow} from '../../../dl/light/Light';
import {P} from './palette';
import {Clip3D} from '../../../dl/render/Clip3D';


/** Capa 3D real (three.js) de la escena: se renderiza aparte como clip con alfa (ver dl/render/Clip3D). */
export const IAParticles: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={-8} layout="none">
          <particleShapeMorph.component
            {...particleShapeMorph.defaultProps}
            text="IA"
            count={4200}
            shapes={['glyph', 'sphere', 'torus']}
            holdFrames={26}
            morphFrames={26}
            collapse={false}
            colors={['#CFEFFF', '#7FE3FF', '#39FF8E']}
            colorMix={[80, 12, 8]}
            background="transparent"
            coreColor="#7FE3FF"
            rotation={40}
            particleSize={3}
            captions={false}
            hud={false}
            label=""
            seed={5}
          />
        </Sequence>
  </AbsoluteFill>
);
export const IA_CLIP_FRAMES = 180;

export const S11IA: React.FC<{lw: (i: number, off?: number) => number}> = ({lw}) => {
  const frame = useCurrentFrame();
  const yearAt = lw(93, -6);
  const shrink = prog(frame, yearAt - 6, yearAt + 14, E.inOut);
  const year = keys(frame, [[yearAt, 2021], [lw(95, 6), 2025]], E.out);
  const notif = spr(frame, lw(98, -2), {damping: 10, stiffness: 220, mass: 0.7});
  const shake = frame >= lw(98, -2) ? noise1(frame * 1.1, 6) * 12 * (1 - prog(frame, lw(98, -2), lw(98, 14))) : 0;
  return (
    <AbsoluteFill style={{background: '#04070C', overflow: 'hidden', transform: `translate(${shake}px, ${shake * 0.4}px)`}}>
      {/* esfera de partículas 3D (Opus) que se encoge cuando llega el año */}
      <AbsoluteFill style={{transform: `translateY(${-60 - shrink * 260}px) scale(${1 - shrink * 0.62})`, opacity: 1 - shrink * 0.35}}>
        <Clip3D id="im-ia-particulas" live={<IAParticles />} />
      </AbsoluteFill>
      <Glow x={540} y={540 - shrink * 260} r={460} color="rgba(127,227,255,0.14)" />
      {frame < yearAt + 4 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 880, textAlign: 'center', opacity: 1 - prog(frame, yearAt - 6, yearAt + 4)}}>
          <MaskRise frame={frame} at={lw(91, -4)} by="word" text="INTELIGENCIA ARTIFICIAL" each={4} style={{fontFamily: F.display, fontSize: 104, color: P.cream, letterSpacing: '0.01em'}} />
        </div>
      )}
      {frame >= yearAt && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 520, display: 'flex', justifyContent: 'center', transform: `scale(${0.8 + 0.2 * spr(frame, yearAt, {damping: 12, stiffness: 140})})`}}>
          <Odometer value={year} digits={4} style={{fontFamily: F.display, fontSize: 300, color: P.cream, textShadow: '0 20px 60px rgba(0,0,0,0.85)'}} />
        </div>
      )}
      {/* notificación inesperada */}
      {frame >= lw(98, -2) && (
        <div style={{position: 'absolute', left: 90, right: 90, top: 70 + (1 - notif) * -260, padding: '26px 30px', borderRadius: 32, background: 'rgba(28,36,46,0.92)', border: '2px solid rgba(255,255,255,0.12)', boxShadow: '0 30px 70px rgba(0,0,0,0.7)', display: 'flex', gap: 22, alignItems: 'center'}}>
          <div style={{width: 76, height: 76, borderRadius: 20, background: '#0A0F14', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.display, fontSize: 44, color: P.cream}}>@</div>
          <div style={{flex: 1}}>
            <div style={{fontFamily: F.ui, fontWeight: 800, fontSize: 32, color: '#F2F6FA'}}>@sama publicó</div>
            <div style={{height: 14, width: '80%', borderRadius: 7, background: '#7C93A6', marginTop: 12, opacity: 0.7}} />
          </div>
          <div style={{width: 22, height: 22, borderRadius: 11, background: P.alarm, boxShadow: `0 0 16px ${P.alarm}`}} />
        </div>
      )}
    </AbsoluteFill>
  );
};
