/**
 * ESCENA 15 · "Así que esa sacudida no es nada malo. Es tu cerebro… creyendo que te salva de una caída que nunca existió."
 * Regreso al dormitorio, ahora en calma: duerme tranquila. En "cerebro" la cabeza brilla cálida (el vigía);
 * en "caída" asoma un vacío fantasma bajo la cama que se disuelve en "nunca existió". La cámara sube y el cuarto queda en paz.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {E, lerp, prog} from '../../../dl/motion';
import {FallVoid} from '../../../dl/fx/FallVoid';
import {Glow} from '../../../dl/light/Light';
import {F} from '../../../dl/fonts';
import {Bedroom, Night} from './common';
import {P} from './palette';

export const S15Final: React.FC<{lw: (i: number, off?: number) => number}> = ({lw}) => {
  const f = useCurrentFrame();
  const rise = prog(f, 0, lw(198, 20), E.inOut);
  const head = prog(f, lw(188, -4), lw(188, 8)) * (1 - prog(f, lw(197), lw(198, 10)) * 0.6);
  const ghost = prog(f, lw(194), lw(195, 6)) * (1 - prog(f, lw(197), lw(198, 6)));
  const title = prog(f, lw(198, 8), lw(198, 24), E.out);
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <Night frame={f} />
      <FallVoid frame={f} k={ghost * 0.7} speed={0.6} color={P.dream} />
      <Bedroom frame={f} s={lerp(1.2, 0.7, rise)} ax={800} ay={lerp(760, 900, rise)} expression="eyesClosed" breath={0.5 + Math.sin(f * 0.12) * 0.3}
        roomOpacity={1 - ghost * 0.7} lights={[head, 0, 0, 0, 0, 0]} lightColor={P.lamp} />
      <Glow x={540} y={300} r={600} color={P.moon} opacity={0.1} />
      <div style={{position: 'absolute', inset: 0, background: P.night, opacity: title * 0.72}} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 470, textAlign: 'center', opacity: title, transform: `translateY(${(1 - title) * 20}px)`}}>
        <div style={{fontFamily: F.serif, fontSize: 96, color: P.text, fontStyle: 'italic', textShadow: `0 0 30px ${P.dream}`}}>La caída que</div>
        <div style={{fontFamily: F.serif, fontSize: 96, color: P.dream, fontStyle: 'italic'}}>nunca existió</div>
      </div>
    </AbsoluteFill>
  );
};
