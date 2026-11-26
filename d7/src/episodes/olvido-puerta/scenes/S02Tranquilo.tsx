/**
 * ESCENA 2 · "Tranquilo. Tu cerebro no está fallando. Está haciendo justo lo que sabe hacer."
 * Plano medio con gesto de calma; el cerebro sobre la cabeza se estabiliza (palomita) y en "hacer" trabaja en órbita.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Brain} from '../../../dl/anatomy/Anatomy';
import {Glow} from '../../../dl/light/Light';
import {spr} from '../../../dl/motion';
import {POSES, mixPose} from '../../../dl/characters/HumanRig';
import {CALM, E, LW, Person, Vig, lerp, prog} from './common';
import {P} from './palette';

export const S02Tranquilo: React.FC<{lw: LW}> = ({lw}) => {
  const f = useCurrentFrame();
  const bx = 540, by = 215;
  const inK = spr(f, 2, {damping: 14, stiffness: 120});
  const calm = prog(f, lw(14), lw(14) + 14);
  const pose = mixPose(POSES.idle, CALM, calm);
  const expr = f >= lw(21) ? 'smile' : f >= lw(14) ? 'relief' : 'neutral';
  const tick = prog(f, lw(18), lw(19) + 4, E.out);
  const work = prog(f, lw(20), lw(21), E.out);
  const sway = Math.sin(f * 0.05) * 5;
  return (
    <AbsoluteFill style={{overflow: 'hidden', background: `radial-gradient(90% 70% at 50% 35%, ${P.kTile}55, ${P.ink} 65%, ${P.night})`}}>
      <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 14}, (_, i) => <circle key={i} cx={(i * 173) % 1080} cy={(i * 331) % 1200} r={30 + (i % 4) * 22} fill={P.tungsten} opacity={0.05 + 0.03 * Math.sin(f * 0.03 + i)} />)}
      </svg>
      <Glow x={bx} y={by + 40} r={420} color={P.tungsten} opacity={0.3 * inK + 0.15 * work} />
      <div style={{position: 'absolute', inset: 0, transform: `translateY(${sway}px)`}}>
        <Person x={540} s={1.0} foot={1330} pose={pose} expression={expr} look={0} id="g2" />
        <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
          <path d={`M${bx} ${by + 100} Q${bx - 20} ${by + 170} ${bx} ${by + 215}`} stroke={P.cream} strokeWidth={4} strokeDasharray="4 10" fill="none" opacity={0.6 * inK} />
          {[0, 1, 2].map((i) => {
            const t = prog(f, lw(15) + i * 7, lw(15) + i * 7 + 26, E.out);
            return t > 0 && t < 1 ? <circle key={i} cx={bx} cy={by} r={90 + t * 150} fill="none" stroke={P.ok} strokeWidth={5 * (1 - t)} opacity={0.8 * (1 - t)} /> : null;
          })}
          {Array.from({length: 6}, (_, i) => {
            const a = f * 0.07 + (i / 6) * Math.PI * 2;
            return <circle key={i} cx={bx + Math.cos(a) * 190} cy={by + Math.sin(a) * 64} r={9} fill={P.tungsten} opacity={work * (0.5 + 0.5 * Math.sin(a))} style={{filter: `drop-shadow(0 0 10px ${P.tungsten})`}} />;
          })}
          <path d={`M${bx + 120} ${by - 90} l26 30 l54 -62`} stroke={P.ok} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={170} strokeDashoffset={170 * (1 - tick)} style={{filter: `drop-shadow(0 0 14px ${P.ok})`}} />
        </svg>
        <div style={{position: 'absolute', left: bx - 105 * 1.0, top: by - 98, transform: `scale(${lerp(0.6, 1, inK)})`, transformOrigin: '50% 50%', opacity: inK}}>
          <Brain frame={f} highlight={work > 0.2 ? 'all' : 'none'} color="#F2B6A0" scale={0.5} id="b2" />
        </div>
      </div>
      <Vig />
    </AbsoluteFill>
  );
};
