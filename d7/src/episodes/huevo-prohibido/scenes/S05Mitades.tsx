/**
 * ESCENA 5 · "Lo abres, y el juguete no está dentro del chocolate. Está al lado, en su propio compartimento."
 * El huevo de dos mitades se abre: una ✕ sobre el chocolate ("no está dentro"), una flecha a la cápsula ("al lado")
 * y la pared divisoria se ilumina en verde ("su propio compartimento").
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {spr} from '../../../dl/motion';
import {F} from '../../../dl/fonts';
import {Bg, E, LW, SplitEgg, Vig, lerp, prog} from './common';
import {P} from './palette';

export const S05Mitades: React.FC<{lw: LW}> = ({lw}) => {
  const f = useCurrentFrame();
  const inK = spr(f, 0, {damping: 13, stiffness: 120});
  const open = prog(f, lw(45), lw(46) + 8, E.out);
  const x = spr(f, lw(51), {damping: 10, stiffness: 200});
  const arrow = prog(f, lw(54), lw(56), E.out);
  const wall = prog(f, lw(58), lw(60), E.out);
  const zoom = lerp(1, 1.08, prog(f, lw(53), lw(60)));
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <Bg spot={1} />
      <div style={{position: 'absolute', inset: 0, transform: `scale(${zoom})`, transformOrigin: '540px 640px'}}>
        <div style={{position: 'absolute', left: 540 - 465, top: 640 - 345, transform: `scale(${inK})`}}><SplitEgg s={1.5} open={open} wall={wall} f={f} /></div>
        <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
          {x > 0.01 && <g transform={`translate(330 760) scale(${x})`}><circle r={70} fill={P.red} opacity={0.9} /><path d="M-30 -30 L30 30 M30 -30 L-30 30" stroke="#FFF" strokeWidth={14} strokeLinecap="round" /></g>}
          {arrow > 0 && <path d={`M540 420 Q700 380 ${lerp(540, 750, arrow)} ${lerp(420, 600, arrow)}`} stroke={P.capsule} strokeWidth={12} fill="none" strokeLinecap="round" />}
          {arrow > 0.95 && <polygon points="750,640 720,590 790,600" fill={P.capsule} />}
        </svg>
        <div style={{position: 'absolute', left: 0, width: 1080, top: 150, textAlign: 'center', fontFamily: F.display, fontSize: 80, color: P.text, opacity: arrow, letterSpacing: '0.04em'}}>AL LADO, NO DENTRO</div>
      </div>
      <Vig />
    </AbsoluteFill>
  );
};
