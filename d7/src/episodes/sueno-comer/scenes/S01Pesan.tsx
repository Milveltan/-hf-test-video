/**
 * ESCENA 1 · "Terminas de comer… y de pronto, los párpados te pesan. ¿Por qué?"
 * Plato vacío en primer plano, la persona detrás satisfecha; la luz se vuelve lavanda, los párpados caen y la cabeza cabecea. Zzz y signo de pregunta.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {spr} from '../../../dl/motion';
import {F} from '../../../dl/fonts';
import {POSES, mixPose} from '../../../dl/characters/HumanRig';
import {Dining, E, LW, Person, Plate, Vig, Zzz, lerp, prog} from './common';
import {P} from './palette';

export const S01Pesan: React.FC<{lw: LW}> = ({lw}) => {
  const f = useCurrentFrame();
  const heavy = prog(f, lw(6), lw(9) + 8, E.inOut);
  const nod = heavy > 0.6 ? Math.max(0, Math.sin((f - lw(9)) * 0.12)) * 10 : 0;
  const q = spr(f, lw(10), {damping: 9, stiffness: 180});
  const zoom = lerp(1, 1.12, prog(f, 0, lw(11) + 10));
  const pose = mixPose(POSES.idle, {head: nod, shL: 18, elL: -60, shR: -18, elR: 60}, Math.max(0.3, heavy));
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, transformOrigin: '540px 520px', transform: `scale(${zoom})`}}>
        <Dining f={f} sleepy={heavy} />
        <Person x={540} s={0.95} foot={1260} pose={pose} expression={heavy > 0.5 ? 'relief' : 'smile'} blink={lerp(0, 0.82, heavy)} id="c1" />
        <Plate x={540} y={880} s={1.1}>
          <svg width={440} height={154} viewBox="0 0 400 140" style={{position: 'absolute', inset: 0}}>
            <path d="M150 70 q30 -14 60 0" stroke="#C8553D" strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.6} />
            <circle cx={250} cy={66} r={6} fill="#7C8A3E" /><circle cx={130} cy={78} r={4} fill="#D9A25A" />
            <path d="M300 30 l60 70" stroke="#B8B2A6" strokeWidth={8} strokeLinecap="round" /><path d="M90 30 l-40 70" stroke="#B8B2A6" strokeWidth={8} strokeLinecap="round" />
          </svg>
        </Plate>
        <Zzz x={640} y={250} f={f} k={heavy} />
      </div>
      {q > 0.01 && <div style={{position: 'absolute', left: 230, top: 200, transform: `translate(-50%,-50%) scale(${q}) rotate(-10deg)`, fontFamily: F.display, fontSize: 190, color: P.terra, textShadow: '0 10px 30px rgba(0,0,0,0.4)'}}>?</div>}
      <Vig />
    </AbsoluteFill>
  );
};
