/**
 * ESCENA 14 · "Puedes desafiar a tu cuerpo. Pero esa discusión… jamás la vas a ganar."
 * El buceador, pequeño, frente a un gigante translúcido: su propio cuerpo en rayos X, que respira sobre él.
 * En "ganar" el gigante toma aire, la luz se abre y el cuadro se funde a negro.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {E, lerp, prog, spr} from '../../../dl/motion';
import {HumanRig, POSES} from '../../../dl/characters/HumanRig';
import {Glow} from '../../../dl/light/Light';
import {Abyss, XDiver, place} from './common';
import {DIVER, P} from './palette';

export const S14Final: React.FC<{lw: (i: number, off?: number) => number}> = ({lw}) => {
  const f = useCurrentFrame();
  const rise = spr(f, 0, {damping: 20, stiffness: 60});
  const big = lw(176);
  const inhale = prog(f, big, big + 24, E.out);
  const breath = 0.5 + 0.5 * Math.sin(f * 0.06);
  const end = prog(f, lw(177, 4), lw(177, 30));
  const s = 2.0 + inhale * 0.08;
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <Abyss frame={f + 2100} light={0.8} />
      <Glow x={540} y={500} r={600} color={P.o2} opacity={0.1 + inhale * 0.25} />
      <div style={{...place(s, 200, 300, 540, 520 + (1 - rise) * 200), opacity: 0.36 * rise, filter: `drop-shadow(0 0 30px ${P.o2}) hue-rotate(${-10}deg)`, mixBlendMode: 'screen'}}>
        <XDiver frame={f} id="s14g" scale={s} xray={1} inflate={lerp(0.6 + 0.3 * breath, 1, inhale)} breath={lerp(breath, 1, inhale)} expression="neutral" />
      </div>
      <div style={place(0.8, 200, 960, 540, 990)}>
        <HumanRig id="s14p" person={DIVER} pose={POSES.idle} breath={0.5 + 0.5 * Math.sin(f * 0.11)} expression={f > lw(170) ? 'relief' : 'neutral'} look={0} rim={P.xray} scale={0.8} />
      </div>
      <AbsoluteFill style={{background: '#000', opacity: end}} />
    </AbsoluteFill>
  );
};
