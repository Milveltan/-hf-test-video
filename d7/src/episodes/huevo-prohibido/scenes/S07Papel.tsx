/**
 * ESCENA 7 · "Y sobre el papel, nadie ha escondido un juguete en un dulce."
 * Plano técnico del huevo partido sobre el papel, con cotas: "chocolate" | "juguete". Remate irónico en cursiva y guiño de la cápsula.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {MaskRise} from '../../../dl/type/Type';
import {F} from '../../../dl/fonts';
import {spr} from '../../../dl/motion';
import {Bg, LW, Mono, Paper, SplitEgg, Vig, lerp, prog} from './common';
import {P} from './palette';

export const S07Papel: React.FC<{lw: LW}> = ({lw}) => {
  const f = useCurrentFrame();
  const inK = spr(f, 0, {damping: 14, stiffness: 120});
  const draw = prog(f, lw(71), lw(74));
  const zoom = lerp(1.15, 1, inK) * lerp(1, 0.94, prog(f, lw(74), lw(81) + 20));
  const end = prog(f, lw(81) + 22, lw(81) + 40);
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <Bg tint={P.navy2} />
      <div style={{position: 'absolute', inset: 0, transform: `scale(${zoom})`, transformOrigin: '540px 560px'}}>
        <Paper x={540} y={520} w={900} h={800} rot={-1}>
          <div style={{position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${P.kraftDark}22 2px, transparent 2px), linear-gradient(90deg, ${P.kraftDark}22 2px, transparent 2px)`, backgroundSize: '50px 50px'}} />
          <div style={{position: 'absolute', left: 60, top: 50}}><Mono size={30} color={P.kraftDark}>PLANO · ENVASE DE DOS MITADES</Mono></div>
          <div style={{position: 'absolute', left: 450 - 279, top: 280, opacity: draw, filter: 'grayscale(0.2)'}}><SplitEgg s={0.9} open={1} /></div>
          <svg width={900} height={900} style={{position: 'absolute', inset: 0}}>
            {[[260, 'CHOCOLATE'], [640, 'JUGUETE']].map(([x, t], i) => (
              <g key={i} opacity={prog(f, lw(72) + i * 6, lw(72) + i * 6 + 8)}>
                <line x1={x as number} y1={300} x2={x as number} y2={230} stroke={P.ink} strokeWidth={3} strokeDasharray="8 8" />
                <text x={x as number} y={210} textAnchor="middle" fontFamily={F.mono} fontWeight={700} fontSize={34} fill={P.ink}>{t}</text>
              </g>
            ))}
          </svg>
        </Paper>
      </div>
      <div style={{position: 'absolute', left: 0, width: 1080, top: 935, display: 'flex', justifyContent: 'center', fontFamily: F.serif, fontStyle: 'italic', fontSize: 84, color: P.text, textShadow: '0 8px 30px rgba(0,0,0,0.85)'}}>
        <MaskRise frame={f} at={lw(74)} text="nadie escondió nada" by="word" each={4} />
      </div>
      <AbsoluteFill style={{background: '#000', opacity: end}} />
      <Vig />
    </AbsoluteFill>
  );
};
