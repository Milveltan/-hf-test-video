/**
 * ESCENA 5 · "Tus músculos se aflojan, tu respiración se calma…"
 * Match cut de las ventanas a puntos de luz del cuerpo (vista cenital): brazos y piernas se apagan en "aflojan";
 * el pecho se atenúa y la respiración se hace lenta en "calma". La cabeza sigue encendida.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {E, lerp, prog} from '../../../dl/motion';
import {Bedroom, Night} from './common';
import {P} from './palette';

export const S05Cuerpo: React.FC<{lw: (i: number, off?: number) => number}> = ({lw}) => {
  const f = useCurrentFrame();
  const limbs = 1 - prog(f, lw(66, -2), lw(67, 8));
  const chest = 1 - prog(f, lw(69), lw(71, 10)) * 0.75;
  const slow = prog(f, lw(68), lw(71, 10));
  const breath = 0.5 + Math.sin(f * lerp(0.3, 0.1, slow)) * lerp(0.45, 0.2, slow);
  const s = lerp(1.0, 1.08, prog(f, 0, lw(72), E.inOut));
  const appear = prog(f, 0, 8, E.out);
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <Night frame={f} />
      <Bedroom frame={f} s={s} ax={800} ay={900} lamp={0} expression="eyesClosed" breath={breath}
        lights={[appear, chest * appear, limbs * appear, limbs * appear, limbs * appear, limbs * appear]} lightColor={P.lamp} />
      <AbsoluteFill style={{background: P.night, opacity: 0.25}} />
    </AbsoluteFill>
  );
};
