/**
 * ESCENA 3 · "Pero no te caíste de ningún lado. Sigues en tu cama, en la oscuridad, sin entender nada. Entonces… ¿qué acaba de pasar?"
 * La cámara se eleva hasta ver el cuarto entero: la persona inmóvil en su cama, mirando a los lados en la oscuridad.
 * La luz de luna se apaga en "oscuridad"; la pregunta aparece arriba en "¿qué acaba de pasar?".
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {E, lerp, prog} from '../../../dl/motion';
import {MaskRise} from '../../../dl/type/Type';
import {F} from '../../../dl/fonts';
import {Bedroom, Night} from './common';
import {P} from './palette';

export const S03Cama: React.FC<{lw: (i: number, off?: number) => number}> = ({lw}) => {
  const f = useCurrentFrame();
  const rise = prog(f, 0, lw(38), E.inOut);
  const dark = prog(f, lw(34, -4), lw(34, 10));
  const look = Math.sin(f * 0.07) * prog(f, lw(28), lw(31));
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <Night frame={f} />
      <Bedroom frame={f} s={lerp(1.35, 0.6, rise)} ax={800} ay={lerp(760, 960, rise)} sy={lerp(600, 760, rise)} expression="surprise" look={look}
        breath={0.5 + Math.sin(f * lerp(0.45, 0.22, rise)) * 0.4} />
      <AbsoluteFill style={{background: P.night, opacity: dark * 0.45}} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 70, textAlign: 'center'}}>
        <MaskRise frame={f} at={lw(38)} text="¿QUÉ ACABA" by="letter" each={1} style={{fontFamily: F.display, fontSize: 104, color: P.text, letterSpacing: 2, textShadow: `0 0 30px ${P.dream}`}} />
        <MaskRise frame={f} at={lw(40)} text="DE PASAR?" by="letter" each={1} style={{fontFamily: F.display, fontSize: 104, color: P.dream, letterSpacing: 2}} />
      </div>
    </AbsoluteFill>
  );
};
