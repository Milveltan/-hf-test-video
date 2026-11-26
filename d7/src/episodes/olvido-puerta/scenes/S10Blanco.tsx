/**
 * ESCENA 10 · "Por eso, si te quedas en blanco, no te frustres: regresa por tus pasos,"
 * Burbuja vacía con puntos suspensivos → la persona se calma y la burbuja se desvanece → huellas luminosas marcan el camino de regreso.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Kitchen, E, FLOOR, LW, Person, Vig, lerp, prog, walkPose, CALM} from './common';
import {POSES, mixPose} from '../../../dl/characters/HumanRig';
import {spr} from '../../../dl/motion';
import {P} from './palette';

export const S10Blanco: React.FC<{lw: LW}> = ({lw}) => {
  const f = useCurrentFrame();
  const bub = spr(f, lw(127), {damping: 11, stiffness: 150});
  const pop = prog(f, lw(132), lw(133) + 4, E.out);
  const calm = prog(f, lw(132), lw(132) + 12);
  const go = prog(f, lw(135), lw(139), E.inOut);
  const x = lerp(400, -170, go);
  const moving = go > 0 && go < 0.99;
  const pose = moving ? walkPose(f) : mixPose(POSES.idle, CALM, calm);
  const expr = f >= lw(132) ? 'relief' : f >= lw(127) ? 'tense' : 'neutral';
  const steps = Array.from({length: 7}, (_, i) => i);
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <Kitchen f={f} lit={0.85} />
      {/* huellas */}
      <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
        {steps.map((i) => {
          const sx = 340 - i * 56, sy = FLOOR + 58 + (i % 2 ? 16 : -16);
          const a = prog(f, lw(134) + i * 2, lw(134) + i * 2 + 6, E.out);
          return <ellipse key={i} cx={sx} cy={sy} rx={32} ry={15} fill={P.idea} opacity={0.85 * a * (1 - prog(f, lw(139), lw(139) + 20))} style={{filter: `drop-shadow(0 0 14px ${P.idea})`}} transform={`rotate(${i % 2 ? 6 : -6} ${sx} ${sy})`} />;
        })}
      </svg>
      <Person x={x} s={0.7} pose={pose} expression={expr} look={0} id="g10" />
      {bub * (1 - pop) > 0.01 && (
        <div style={{position: 'absolute', inset: 0, opacity: 1 - pop, transform: `scale(${bub * (1 + pop * 0.3)})`, transformOrigin: `${x + 150}px 260px`}}>
          <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
            <circle cx={x + 66} cy={370} r={14} fill="#F6F1E4" opacity={0.95} /><circle cx={x + 100} cy={320} r={22} fill="#F6F1E4" opacity={0.95} />
            <ellipse cx={x + 190} cy={210} rx={140} ry={96} fill="#F6F1E4" stroke="#00000033" strokeWidth={4} />
            {[0, 1, 2].map((i) => <circle key={i} cx={x + 130 + i * 60} cy={210} r={13} fill={P.film} opacity={0.25 + 0.75 * (Math.floor(f / 9) % 4 > i ? 1 : 0)} />)}
          </svg>
        </div>
      )}
      <Vig />
    </AbsoluteFill>
  );
};
