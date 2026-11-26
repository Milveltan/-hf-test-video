/**
 * ESCENA 1 · "Entras a la cocina con una misión… y de pronto, nada. ¿A qué venías?"
 * Gancho: caminata decidida con la idea brillando sobre la cabeza → se apaga de golpe y la luz de la cocina baja.
 * Tres signos de interrogación brotan mientras la persona mira a su alrededor.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Particles} from '../../../dl/fx/Fx';
import {POSES, mixPose} from '../../../dl/characters/HumanRig';
import {spr} from '../../../dl/motion';
import {E, FLOOR, Idea, Kitchen, LW, Person, Q, Vig, lerp, prog, walkPose} from './common';
import {P} from './palette';

export const S01Gancho: React.FC<{lw: LW}> = ({lw}) => {
  const f = useCurrentFrame();
  const stopAt = lw(9);
  const walkK = prog(f, 0, stopAt, E.out);
  const x = lerp(100, 400, walkK);
  const moving = walkK < 0.985;
  const pose = moving ? walkPose(f, 0.115) : mixPose(POSES.idle, {shL: 24, elL: -40}, prog(f, lw(11), lw(11) + 10));
  const out = prog(f, lw(10), lw(10) + 5, (t) => t);
  const lit = 1 - 0.3 * out;
  const glow = (1 + 0.6 * prog(f, lw(5), lw(6))) * (1 - out);
  const flick = f > lw(10) - 6 && f < lw(10) && Math.sin(f * 4) > 0 ? 0.3 : 1;
  const zoom = lerp(1, 1.12, prog(f, 0, lw(14)));
  const look = f > lw(11) ? Math.sin((f - lw(11)) * 0.12) * 0.9 : 0.3;
  const expr = f >= lw(10) ? 'surprise' : 'neutral';
  const sink = out * 14;
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, transformOrigin: '540px 640px', transform: `scale(${zoom})`}}>
        <Kitchen f={f} lit={lit} />
        <Particles frame={f} count={26} seed={3} y={140} h={700} vy={-0.3} color={P.tungsten} size={[1, 2.6]} opacity={0.4} />
        <Person x={x} s={0.7} pose={pose} expression={expr} look={look} id="g1" />
        {f < lw(10) + 8 && <Idea x={x + 8} y={150 + sink} f={f} s={0.62} glow={glow * flick} opacity={1 - out * 0.5} />}
        {out > 0.3 && out < 1 && <Particles frame={f} count={14} seed={9} x={x - 60} y={90} w={140} h={120} vy={-1.2} color="#FFFFFF" size={[1, 3]} opacity={0.6 * (1 - out)} />}
        {[[-190, 240, 0, -12], [150, 190, 1, 10], [-20, 110, 2, -4]].map(([dx, dy, i, r]) => (
          <Q key={i} x={x + dx} y={dy} s={0.9 + i * 0.15} k={spr(f, lw(11 + i), {damping: 9, stiffness: 190})} rot={r} />
        ))}
      </div>
      <Vig />
    </AbsoluteFill>
  );
};
