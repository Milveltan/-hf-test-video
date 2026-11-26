/**
 * ESCENA 7 · "Y en ese cambio… el pendiente se queda atrás. En el cuarto de donde saliste."
 * La idea sigue a la persona hasta el umbral y se queda; un hilo se estira y se corta. La cámara regresa a la sala: la idea espera sola.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Particles} from '../../../dl/fx/Fx';
import {F} from '../../../dl/fonts';
import {spr} from '../../../dl/motion';
import {POSES, mixPose} from '../../../dl/characters/HumanRig';
import {E, HouseWorld, Idea, LW, Person, Vig, WorldCam, lerp, prog, walkPose} from './common';
import {P} from './palette';

export const S07Atras: React.FC<{lw: LW}> = ({lw}) => {
  const f = useCurrentFrame();
  const cut = lw(89);
  const walkK = prog(f, 0, lw(91), E.inOut);
  const x = lerp(780, 1560, walkK);
  const pose = walkK < 0.99 ? walkPose(f, 0.115) : mixPose(POSES.idle, POSES.idle, 0);
  const bx = Math.min(x + 4, 930), by = 150 + (x > 930 ? Math.sin(f * 0.06) * 4 : 0);
  const pan = prog(f, lw(91), lw(91) + 22, E.inOut);
  const cx = lerp(Math.max(760, Math.min(1400, (x + 930) / 2)), 640, pan);
  const zoom = lerp(0.94, 1.06, pan);
  const stretch = Math.max(0, x - 930);
  const snap = f >= cut;
  const sinceCut = Math.max(0, f - cut);
  const sx = 540 + (bx - cx) * zoom, sy = 600 + (by - 600) * zoom;
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <WorldCam cx={cx} cy={600} zoom={zoom}>
        <HouseWorld f={f} litL={1} litR={0.85}>
          <svg width={2160} height={1200} style={{position: 'absolute', inset: 0}}>
            {x > 940 && (
              <path d={snap ? `M${bx} ${by + 40} q-10 ${28 - sinceCut} -22 ${40 - sinceCut * 1.5}` : `M${bx} ${by + 40} Q${(bx + x) / 2} ${by + 40 + Math.max(0, 200 - stretch * 0.35)} ${x} 235`}
                stroke={P.cream} strokeWidth={4} strokeDasharray="6 9" fill="none" opacity={snap ? Math.max(0, 1 - sinceCut / 14) : 0.85} />
            )}
          </svg>
          <Person x={x} s={0.7} pose={pose} id="g7" expression={snap ? 'neutral' : 'neutral'} />
          <Idea x={bx} y={by} f={f} s={0.62} glow={1} />
          {snap && sinceCut < 20 && <Particles frame={f} count={16} seed={7} x={bx - 70} y={by - 20} w={140} h={120} vy={-0.8} color={P.idea} size={[1.5, 3.5]} opacity={0.7 * (1 - sinceCut / 20)} />}
        </HouseWorld>
      </WorldCam>
      <div style={{position: 'absolute', left: 40, width: 460, top: 560, textAlign: 'center', opacity: spr(f, lw(93), {damping: 15, stiffness: 140}), transform: `translateY(${(1 - spr(f, lw(93), {damping: 15, stiffness: 140})) * -20}px)`}}>
        <div style={{fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: '0.22em', color: P.tungsten}}>CAPÍTULO ANTERIOR</div>
        <div style={{fontFamily: F.serif, fontStyle: 'italic', fontSize: 84, lineHeight: 1, color: P.cream, textShadow: '0 10px 30px rgba(0,0,0,0.9)'}}>ahí se quedó</div>
      </div>
      <Vig />
    </AbsoluteFill>
  );
};
