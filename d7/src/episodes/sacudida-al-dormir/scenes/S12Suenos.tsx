/**
 * ESCENA 12 · "Por eso a veces hasta sueñas que pisas en falso, o que te resbalas de una orilla."
 * Mundo de sueño violeta flotando en el vacío. Primero una escalera flotante: en "falso" el escalón se desvanece bajo el pie.
 * La cámara se desliza a una orilla de roca: en "resbalas" el pie patina y el cuerpo se va hacia el borde.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {E, lerp, prog} from '../../../dl/motion';
import {HumanRig, POSES, mixPose} from '../../../dl/characters/HumanRig';
import {Glow} from '../../../dl/light/Light';
import {Particles} from '../../../dl/fx/Fx';
import {place} from './common';
import {P, SLEEPER} from './palette';

export const S12Suenos: React.FC<{lw: (i: number, off?: number) => number}> = ({lw}) => {
  const f = useCurrentFrame();
  const pan = prog(f, lw(143, -6), lw(144, 6), E.inOut);
  const gap = prog(f, lw(140, -2), lw(141), E.in);
  const dropA = prog(f, lw(140), lw(142, 6), E.in);
  const slip = prog(f, lw(146, -2), lw(146, 8), E.out);
  const fallB = prog(f, lw(147), lw(149, 10), E.in);
  const walk = mixPose(POSES.walkA, POSES.walkB, (Math.sin(Math.min(f, lw(140)) * 0.3) + 1) / 2);
  const poseA = mixPose(walk, POSES.handsUp, dropA * 0.8);
  const poseB = mixPose(POSES.idle, {shL: 140, shR: -60, elL: -20, elR: 40, hipL: -25, hipR: 20, knL: 10, knR: 30}, slip);
  const camX = lerp(0, -1080, pan);
  const float = Math.sin(f * 0.05) * 10;
  return (
    <AbsoluteFill style={{overflow: 'hidden', background: `radial-gradient(70% 60% at 50% 45%, ${P.dreamDeep}, ${P.night} 80%)`}}>
      <Particles frame={f} count={60} color={P.dream} vy={-0.4} size={[1, 3]} opacity={0.6} />
      <Glow x={540} y={420} r={520} color={P.dream} opacity={0.25} />
      <div style={{position: 'absolute', left: camX, top: float, width: 2160, height: 1200}}>
        {/* A · escalera flotante */}
        <svg width={1080} height={1200} style={{position: 'absolute', left: 0, top: 0}}>
          {Array.from({length: 6}, (_, i) => {
            const x = 140 + i * 140, y = 360 + i * 110;
            const op = i === 3 ? 1 - gap : 1;
            return <g key={i} opacity={op}><rect x={x} y={y} width={190} height={34} rx={6} fill="#5A44A8" /><rect x={x} y={y + 34} width={190} height={24} rx={6} fill="#2C1F5E" /><rect x={x} y={y} width={190} height={4} fill={P.moon} opacity={0.5} /></g>;
          })}
        </svg>
        <div style={place(0.42, 200, 940, 650, 690 + dropA * 520)}>
          <div style={{transform: `rotate(${dropA * 25}deg)`, transformOrigin: '50% 50%'}}><HumanRig id="s12a" person={SLEEPER} pose={poseA} expression={dropA > 0.1 ? 'surprise' : 'neutral'} rim={P.dream} scale={0.42} /></div>
        </div>
        {/* B · orilla */}
        <svg width={1080} height={1200} style={{position: 'absolute', left: 1080, top: 0}}>
          <path d="M-40 760 L620 760 Q660 770 650 820 L600 1300 L-40 1300 Z" fill="#2C1F5E" />
          <path d="M-40 760 L620 760 Q660 770 650 820" stroke={P.moon} strokeWidth={5} fill="none" opacity={0.5} />
        </svg>
        <div style={place(0.42, 200, 940, 1080 + 560 + slip * 60 + fallB * 120, 764 + fallB * 700)}>
          <div style={{transform: `rotate(${slip * -20 + fallB * 60}deg)`, transformOrigin: '50% 100%'}}><HumanRig id="s12b" person={SLEEPER} pose={poseB} expression={slip > 0.1 ? 'surprise' : 'neutral'} rim={P.dream} scale={0.42} /></div>
        </div>
      </div>
      <AbsoluteFill style={{boxShadow: `inset 0 0 220px 80px ${P.night}`}} />
    </AbsoluteFill>
  );
};
