/**
 * ESCENA 8 · "Para él, eso solo puede significar una cosa: te estás cayendo."
 * Punto de vista del cerebro: el cuarto cenital se tiñe de rojo y se inclina. En "cosa:" todo se congela un instante;
 * en "te estás cayendo" la cama se desploma girando al vacío y golpea la palabra en pantalla.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {E, lerp, prog} from '../../../dl/motion';
import {FallVoid} from '../../../dl/fx/FallVoid';
import {SlamWord} from '../../../dl/type/Type';
import {F} from '../../../dl/fonts';
import {Bedroom, Night} from './common';
import {P} from './palette';

export const S08Cayendo: React.FC<{lw: (i: number, off?: number) => number}> = ({lw}) => {
  const f = useCurrentFrame();
  const tilt = prog(f, 0, lw(104), E.inOut);
  const fall = prog(f, lw(105, -2), lw(107, 10), E.in);
  const red = prog(f, lw(99), lw(104)) * 0.35;
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <Night frame={f} />
      <FallVoid frame={f} k={prog(f, lw(105, -2), lw(105, 6))} speed={2.2} color={P.alarm} />
      <Bedroom frame={f} s={lerp(0.8, 0.95, tilt) * lerp(1, 0.08, fall)} ax={800} ay={900} rot={tilt * 8 + fall * 300}
        roomOpacity={1 - prog(f, lw(105, -2), lw(105, 6))} expression="eyesClosed" ripple={fall * 2} />
      <AbsoluteFill style={{background: `radial-gradient(70% 60% at 50% 50%, transparent, ${P.alarm})`, opacity: red * (1 - fall)}} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center'}}>
        <SlamWord frame={f} at={lw(106)} text="¡CAYENDO!" colorA={P.alarm} colorB={P.moon} style={{fontFamily: F.display, fontSize: 150, color: P.text}} />
      </div>
    </AbsoluteFill>
  );
};
