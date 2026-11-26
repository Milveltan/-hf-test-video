/**
 * ESCENA 9 · "Tus vasos sanguíneos se cierran para proteger lo más valioso: el cerebro y el corazón."
 * Mapa vascular de cuerpo entero: en "se cierran" los vasos de brazos y piernas se estrechan y se apagan;
 * el flujo se concentra y brilla en cerebro y corazón, que se señalan al nombrarlos.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {E, keys, lerp, prog} from '../../../dl/motion';
import {VascularBody} from '../../../dl/anatomy/VascularBody';
import {Annotation} from '../../../dl/editorial/Editorial';
import {Glow} from '../../../dl/light/Light';
import {Abyss, place} from './common';
import {P} from './palette';

export const S09Vasos: React.FC<{lw: (i: number, off?: number) => number}> = ({lw}) => {
  const f = useCurrentFrame();
  const constrict = prog(f, lw(102, -2), lw(104, 10), E.inOut);
  const core = keys(f, [[0, 0.2], [lw(105), 0.35], [lw(108), 0.85], [lw(113), 1]], E.inOut);
  const s = lerp(1.0, 1.12, prog(f, 0, lw(114), E.linear));
  const sx = 540, sy = 600;
  const pt = (x: number, y: number) => [sx + (x - 200) * s, sy + (y - 470) * s];
  const [bx, by] = pt(200, 128), [hx, hy] = pt(204, 336), [ax, ay] = pt(96, 470), [lx, ly] = pt(174, 760);
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <Abyss frame={f + 1300} light={0.6} />
      <Glow x={hx} y={hy} r={300} color={P.blood} opacity={0.12 + core * 0.2} />
      <div style={place(s, 200, 470, sx, sy)}><VascularBody frame={f} constrict={constrict} core={core} flow={lerp(1, 0.6, constrict)} skin={P.xray} scale={s} id="s9" /></div>
      <Annotation frame={f} at={lw(103)} x={40} y={860} tx={ax} ty={ay} kicker="PERIFERIA" label="se cierra" color={P.muted} accent={P.co2} size={40} out={lw(109)} />
      <Annotation frame={f} at={lw(110)} x={720} y={190} tx={bx + 60} ty={by} kicker="PROTEGIDO" label="cerebro" color={P.bone} accent={P.o2} size={48} />
      <Annotation frame={f} at={lw(113)} x={720} y={430} tx={hx + 40} ty={hy} kicker="PROTEGIDO" label="corazón" color={P.bone} accent={P.o2} size={48} />
      {constrict > 0 && <svg width={1080} height={1200} style={{position: 'absolute', inset: 0, opacity: constrict * (1 - prog(f, lw(109), lw(111)))}}>
        {[[ax, ay], [1080 - ax, ay], [lx, ly], [1080 - lx, ly]].map(([x, y], i) => <g key={i} stroke={P.co2} strokeWidth={4} fill="none"><path d={`M${x - 34} ${y - 14} l14 14 l-14 14 M${x + 34} ${y - 14} l-14 14 l14 14`} /></g>)}
      </svg>}
    </AbsoluteFill>
  );
};
