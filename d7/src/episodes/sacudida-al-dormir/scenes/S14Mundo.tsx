/**
 * ESCENA 14 · "Y si te ha pasado, no eres el único: le pasa a casi todo el mundo."
 * Empieza en una sola ventana encendida con alguien que da un brinco; la cámara se aleja y revela el edificio entero,
 * luego la ciudad: ventanas que se encienden y siluetas que se sacuden por todas partes.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {E, lerp, prog, rng} from '../../../dl/motion';
import {ApartmentBlock} from '../../../dl/environments/NightHouse';
import {Night, jolt, place} from './common';
import {P} from './palette';

const COLS = 6, ROWS = 7, CELL = 150;
const W = COLS * CELL + 60, H = ROWS * CELL + 80;
const FOCUS = 3 * COLS + 2;

export const S14Mundo: React.FC<{lw: (i: number, off?: number) => number}> = ({lw}) => {
  const f = useCurrentFrame();
  const r = rng(21);
  const seeds = Array.from({length: COLS * ROWS * 3}, () => r());
  const pull = prog(f, lw(164), lw(177), E.inOut);
  const s = lerp(3.2, 0.42, pull);
  const fx = 30 + 2 * CELL + CELL * 0.5, fy = 50 + 3 * CELL + CELL * 0.5;
  const ax = lerp(fx, W / 2, pull), ay = lerp(fy, H / 2, pull);
  const litAt = (i: number) => (i === FOCUS ? 0 : lw(166) + seeds[i] * (lw(177) - lw(166)));
  const lit = (i: number) => (seeds[i] < 0.12 ? 0 : prog(f, litAt(i), litAt(i) + 6));
  const jo = (i: number) => (i === FOCUS ? jolt(f, lw(163), 14) + jolt(f, lw(170), 14) : jolt(f, litAt(i) + 8 + seeds[i] * 20, 14));
  const side = prog(f, lw(173), lw(177, 10));
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <Night frame={f} tint={P.dusk} />
      {[-1, 1].map((d) => (
        <div key={d} style={{...place(s * 0.9, W / 2, H / 2, 540 + d * W * s * 1.05, 600 + H * s * 0.08), opacity: side}}>
          <div style={{transform: `scale(${s * 0.9})`, transformOrigin: '0 0'}}>
            <ApartmentBlock cols={COLS} rows={ROWS} lit={(i) => (seeds[(i + 7 * (d + 2)) % seeds.length] < 0.3 ? 0 : side)} jolt={(i) => jolt(f, lw(173) + seeds[(i * 3 + d + 5) % seeds.length] * 40, 14)} warm={P.lamp} figure="#3A2850" cell={CELL} />
          </div>
        </div>
      ))}
      <div style={place(s, ax, ay, 540, 560)}>
        <div style={{transform: `scale(${s})`, transformOrigin: '0 0'}}>
          <ApartmentBlock cols={COLS} rows={ROWS} lit={lit} jolt={jo} warm={P.lamp} figure="#3A2850" cell={CELL} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
