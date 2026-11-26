/**
 * ESCENA 4 · "Mientras estás en la sala, ese plan de ir por algo vive en ese capítulo."
 * La persona entra a la sala; la idea aparece sobre su cabeza. Un visor de cámara se cierra en "vive" y rotula CAPÍTULO 2.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Particles} from '../../../dl/fx/Fx';
import {MaskRise} from '../../../dl/type/Type';
import {F} from '../../../dl/fonts';
import {POSES, mixPose} from '../../../dl/characters/HumanRig';
import {spr} from '../../../dl/motion';
import {E, Idea, LW, Person, Sala, Vig, lerp, prog, walkPose} from './common';
import {P} from './palette';

export const S04Sala: React.FC<{lw: LW}> = ({lw}) => {
  const f = useCurrentFrame();
  const walkK = prog(f, 0, lw(50), E.out);
  const x = lerp(-120, 800, walkK);
  const pose = walkK < 0.98 ? walkPose(f, 0.115) : mixPose(POSES.idle, {shR: -14, elR: 10}, 0.5 + 0.5 * Math.sin(f * 0.05));
  const ideaK = spr(f, lw(50), {damping: 11, stiffness: 150});
  const zoom = lerp(1.02, 1.1, prog(f, 0, lw(59)));
  const vf = prog(f, lw(56), lw(58), E.out);
  const blink = Math.floor(f / 14) % 2 === 0;
  const m = 46, L = 92;
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, transformOrigin: '700px 700px', transform: `scale(${zoom})`}}>
        <Sala f={f} />
        <Particles frame={f} count={22} seed={5} y={160} h={680} vy={-0.25} color={P.tungsten} size={[1, 2.4]} opacity={0.4} />
        <Person x={x} s={0.72} pose={pose} expression="neutral" look={-0.4} id="g4" />
        {ideaK > 0.01 && <Idea x={x + 4} y={150} f={f} s={0.7 * ideaK} glow={ideaK} opacity={Math.min(1, ideaK)} />}
      </div>
      {vf > 0 && (
        <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}} opacity={vf}>
          {[[m, m, 1, 1], [1080 - m, m, -1, 1], [m, 1060 - m, 1, -1], [1080 - m, 1060 - m, -1, -1]].map(([x0, y0, sx, sy], i) => (
            <path key={i} d={`M${x0} ${(y0 as number) + (sy as number) * L} V${y0} H${(x0 as number) + (sx as number) * L}`} stroke={P.cream} strokeWidth={7} fill="none" strokeLinecap="round" />
          ))}
          <circle cx={m + 36} cy={m + 40} r={11} fill={P.coral} opacity={blink ? 1 : 0.25} />
          <text x={m + 58} y={m + 52} fontFamily={F.mono} fontWeight={700} fontSize={30} fill={P.cream} letterSpacing={4}>REC</text>
        </svg>
      )}
      <div style={{position: 'absolute', left: 540, top: 150, width: 0, display: 'flex', justifyContent: 'center', fontFamily: F.display, fontSize: 96, color: P.cream, textShadow: `0 6px 30px rgba(0,0,0,0.9), 0 0 40px ${P.tungsten}88`, letterSpacing: '0.03em', whiteSpace: 'pre'}}>
        <MaskRise frame={f} at={lw(59, -3)} text="CAPÍTULO 2" each={1} from="center" />
      </div>
      <Vig />
    </AbsoluteFill>
  );
};
