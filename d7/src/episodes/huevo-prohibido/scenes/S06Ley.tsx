/**
 * ESCENA 6 · "Para la ley, nada está metido dentro de nada."
 * Formulario de inspección: "¿Juguete DENTRO del dulce?" — la casilla NO se marca y cae el sello verde PERMITIDO.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Stamp} from '../../../dl/fx/Fx';
import {F} from '../../../dl/fonts';
import {spr} from '../../../dl/motion';
import {Bg, LW, Mono, Paper, Vig, prog} from './common';
import {P} from './palette';

export const S06Ley: React.FC<{lw: LW}> = ({lw}) => {
  const f = useCurrentFrame();
  const inK = spr(f, 0, {damping: 14, stiffness: 130});
  const mark = prog(f, lw(64), lw(66));
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <Bg tint={P.navy2} />
      <div style={{position: 'absolute', inset: 0, transform: `translateY(${(1 - inK) * 300}px) rotate(${(1 - inK) * -6}deg)`}}>
        <Paper x={540} y={560} w={800} h={760} rot={1.5}>
          <div style={{padding: '60px 64px'}}>
            <Mono size={30} color={P.kraftDark}>FORMULARIO DE INSPECCIÓN</Mono>
            <div style={{fontFamily: F.display, fontSize: 76, color: P.ink, lineHeight: 1.1, marginTop: 30}}>¿JUGUETE DENTRO DEL DULCE?</div>
            <div style={{display: 'flex', gap: 60, marginTop: 60}}>
              {['SÍ', 'NO'].map((t, i) => (
                <div key={t} style={{display: 'flex', alignItems: 'center', gap: 22}}>
                  <div style={{width: 84, height: 84, border: `6px solid ${P.ink}`, borderRadius: 10, position: 'relative'}}>
                    {i === 1 && <svg width={84} height={84} style={{position: 'absolute', inset: -6}}><path d="M14 44 l20 22 l36 -48" stroke={P.green} strokeWidth={12} fill="none" strokeLinecap="round" strokeDasharray={100} strokeDashoffset={100 * (1 - mark)} /></svg>}
                  </div>
                  <div style={{fontFamily: F.display, fontSize: 70, color: P.ink}}>{t}</div>
                </div>
              ))}
            </div>
          </div>
        </Paper>
      </div>
      <Stamp frame={f} at={lw(69)} text="PERMITIDO" color={P.green} size={130} rot={-12} x={560} y={820} />
      <Vig />
    </AbsoluteFill>
  );
};
