/**
 * ESCENA 10 · "Hasta tu bazo se contrae y libera glóbulos rojos de reserva."
 * El bazo, órgano oculto, se exprime en "contrae": de su hilio sale una ráfaga de glóbulos rojos que viaja por un vaso.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {getPointAtLength, getLength} from '@remotion/paths';
import {E, prog, spr} from '../../../dl/motion';
import {Spleen} from '../../../dl/anatomy/Anatomy';
import {Annotation} from '../../../dl/editorial/Editorial';
import {Glow} from '../../../dl/light/Light';
import {Abyss} from './common';
import {P} from './palette';

const PATH = 'M330 600 C 470 640 560 520 700 480 C 820 446 940 470 1160 400';
const LEN = getLength(PATH);

export const S10Bazo: React.FC<{lw: (i: number, off?: number) => number}> = ({lw}) => {
  const f = useCurrentFrame();
  const squeeze = Math.min(1, prog(f, lw(117, 2), lw(118, 6), E.out) + 0.12 * Math.max(0, Math.sin((f - lw(118)) * 0.3)) * (f > lw(118) ? 1 : 0));
  const enter = spr(f, 0, {damping: 18});
  const emit = lw(118, 2);
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <Abyss frame={f + 1500} tint="#2A1022" light={0.4} />
      <Glow x={330} y={560} r={420} color="#FF4D6A" opacity={0.14 + squeeze * 0.2} />
      <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
        <path d={PATH} stroke="#4A0E1C" strokeWidth={96} fill="none" strokeLinecap="round" />
        <path d={PATH} stroke="#7A1E30" strokeWidth={80} fill="none" strokeLinecap="round" opacity={0.7} />
        {Array.from({length: 60}, (_, i) => {
          const at = emit + i * 1.1;
          if (f < at) return null;
          const d = (f - at) * (16 - (i % 5));
          if (d > LEN) return null;
          const p = getPointAtLength(PATH, d);
          const off = ((i * 37) % 50) - 25;
          return <g key={i} transform={`translate(${p.x} ${p.y + off}) rotate(${(f * 4 + i * 40) % 360})`}><ellipse rx={17} ry={13} fill="#E8323C" /><ellipse rx={8} ry={5} fill="#A01B28" /></g>;
        })}
      </svg>
      <div style={{position: 'absolute', left: 80, top: 330, transform: `translateX(${(1 - enter) * -400}px)`}}>
        <Spleen frame={f} squeeze={squeeze} glow={0.6 + squeeze * 0.4} scale={1.75} id="s10sp" />
      </div>
      <Annotation frame={f} at={lw(115)} x={90} y={190} tx={250} ty={380} kicker="ÓRGANO DE RESERVA" label="bazo" color={P.bone} accent="#FF7A90" size={56} />
      <Annotation frame={f} at={lw(121, 4)} x={600} y={680} tx={760} ty={470} kicker="RESERVA EXTRA" label="glóbulos rojos" color={P.bone} accent={P.blood} size={46} />
    </AbsoluteFill>
  );
};
