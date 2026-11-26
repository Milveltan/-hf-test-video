/**
 * ESCENA 8 · "¿Y por qué lo recuerdas cuando regresas? Porque ahí fue donde lo guardó. Vuelves al lugar, y… ¡ahí está!"
 * Duda en la cocina → la cámara viaja a la idea guardada (chincheta) → la persona vuelve por la puerta → la idea se enciende al verla.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Flash, Particles} from '../../../dl/fx/Fx';
import {POSES, mixPose} from '../../../dl/characters/HumanRig';
import {spr} from '../../../dl/motion';
import {E, HouseWorld, Idea, LW, Person, Q, Vig, WorldCam, lerp, prog, walkPose} from './common';
import {P} from './palette';

export const S08Regresa: React.FC<{lw: LW}> = ({lw}) => {
  const f = useCurrentFrame();
  const BX = 930, BY = 150;
  const walkK = prog(f, lw(110), lw(114) - 2, E.inOut);
  const x = lerp(1250, 960, walkK);
  const walking = walkK > 0 && walkK < 0.99;
  const pose = walking ? walkPose(f, 0.115) : mixPose(POSES.idle, POSES.idle, 0);
  const pan = prog(f, lw(103), lw(105), E.inOut);
  const toPerson = prog(f, lw(110), lw(114), E.inOut);
  const cx = lerp(lerp(1130, 880, pan), 940, toPerson);
  const zoom = lerp(lerp(1.0, 1.12, pan), 1.2, toPerson);
  const cy = lerp(600, 480, toPerson);
  const q = spr(f, lw(97), {damping: 10, stiffness: 160}) * (1 - prog(f, lw(103), lw(105)));
  const pin = spr(f, lw(106), {damping: 9, stiffness: 190});
  const ignite = f >= lw(114);
  const ik = prog(f, lw(114), lw(114) + 10, E.out);
  const glow = 1 + 1.4 * ik;
  const hit = f >= lw(114) && f < lw(114) + 7 ? 0.5 * (1 - (f - lw(114)) / 7) : 0;
  const expr = f >= lw(115) ? 'smile' : f >= lw(114) ? 'surprise' : 'neutral';
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <WorldCam cx={cx} cy={cy} zoom={zoom}>
        <HouseWorld f={f} litL={0.78 + 0.22 * ik} litR={0.95}>
          <Idea x={BX} y={BY} f={f} s={0.62} glow={glow} rays={1 + ik} />
          <Person x={x} s={0.7} pose={pose} expression={expr} look={0.2} id="g8" />
          {q > 0.01 && <Q x={x + 90} y={190} k={q} s={0.9} rot={8} />}
          {pin > 0.01 && (
            <svg width={120} height={140} viewBox="-60 -70 120 140" style={{position: 'absolute', left: BX + 60, top: BY - 120, transform: `scale(${pin})`, transformOrigin: '50% 100%', overflow: 'visible'}}>
              <circle r={26} fill={P.coral} stroke="#00000055" strokeWidth={3} /><circle cx={-8} cy={-8} r={7} fill="#FFFFFF" opacity={0.5} />
              <path d="M0 24 v34" stroke={P.metal} strokeWidth={6} strokeLinecap="round" />
            </svg>
          )}
          {ignite && ik < 1 && (
            <svg width={2160} height={1200} style={{position: 'absolute', inset: 0}}>
              {[0, 1].map((i) => <circle key={i} cx={BX} cy={BY} r={70 + (ik + i * 0.25) * 260} fill="none" stroke={P.idea} strokeWidth={6 * (1 - ik)} opacity={0.8 * (1 - ik)} />)}
            </svg>
          )}
          {ignite && f < lw(114) + 34 && <Particles frame={f} count={30} seed={13} x={BX - 160} y={BY - 130} w={320} h={280} vy={-1.2} color={P.idea} size={[1.5, 4]} opacity={0.85} />}
        </HouseWorld>
      </WorldCam>
      <Flash k={hit} color={P.idea} />
      <Vig />
    </AbsoluteFill>
  );
};
