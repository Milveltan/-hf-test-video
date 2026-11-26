/**
 * ESCENA 5 · "Y cruzar una puerta es cambio de capítulo."
 * La persona cruza el umbral: la sala queda atrás (se apaga un poco) y la cocina se enciende. En "capítulo" cae una claqueta que cierra de golpe.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Flash} from '../../../dl/fx/Fx';
import {spr} from '../../../dl/motion';
import {POSES, mixPose} from '../../../dl/characters/HumanRig';
import {Clapper, E, HouseWorld, Idea, LW, Person, Vig, WorldCam, lerp, prog, walkPose} from './common';
import {P} from './palette';

export const S05Puerta: React.FC<{lw: LW}> = ({lw}) => {
  const f = useCurrentFrame();
  const walkK = prog(f, 0, lw(66) + 6, E.inOut);
  const x = lerp(700, 1400, walkK);
  const pose = walkK < 0.99 ? walkPose(f, 0.115) : mixPose(POSES.idle, POSES.idle, 0);
  const crossed = prog(f, 0, 1) * 0 + Math.max(0, Math.min(1, (x - 1040) / 120));
  const cam = lerp(780, 1250, E.inOut(prog(f, 0, lw(66))));
  const clapIn = spr(f, lw(65), {damping: 13, stiffness: 150});
  const clapK = prog(f, lw(67) - 4, lw(67), E.in);
  const hit = f >= lw(67) && f < lw(67) + 8 ? 0.55 * (1 - (f - lw(67)) / 8) : 0;
  const shake = f >= lw(67) && f < lw(67) + 10 ? Math.sin(f * 4) * 9 * (1 - (f - lw(67)) / 10) : 0;
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, transform: `translate(${shake}px, ${-shake * 0.6}px)`}}>
        <WorldCam cx={cam} cy={620} zoom={1.02}>
          <HouseWorld f={f} litL={1 - 0.45 * crossed} litR={0.7 + 0.3 * crossed}>
            <Person x={x} s={0.7} pose={pose} id="g5" />
            <Idea x={Math.min(x + 4, 930)} y={150} f={f} s={0.6} glow={1 - 0.2 * crossed} />
          </HouseWorld>
        </WorldCam>
        {clapIn > 0.01 && (
          <div style={{position: 'absolute', inset: 0, transform: `translateY(${(1 - clapIn) * -500}px)`}}>
            <Clapper k={clapK} x={300} y={260} s={0.78} scene="2" take="1" />
          </div>
        )}
      </div>
      <Flash k={hit} color={P.cream} />
      <Vig />
    </AbsoluteFill>
  );
};
