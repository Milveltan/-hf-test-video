/**
 * ESCENA 2 · "Es una ley de 1938,"
 * Expediente de papel kraft que entra con giro; el año rueda en un contador mecánico hasta 1938. Fuente del dato abajo.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {SourceTag} from '../../../dl/editorial/Editorial';
import {F} from '../../../dl/fonts';
import {spr} from '../../../dl/motion';
import {Bg, ChocEgg, E, LW, Mono, Paper, Vig, lerp, prog} from './common';
import {P} from './palette';

export const S02Ley: React.FC<{lw: LW}> = ({lw}) => {
  const f = useCurrentFrame();
  const inK = spr(f, 0, {damping: 14, stiffness: 120});
  const year = Math.round(lerp(2026, 1938, prog(f, lw(16), lw(18) + 6, E.out)));
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <Bg tint={P.navy2} spot={0.8} />
      <div style={{position: 'absolute', inset: 0, transform: `translateY(${(1 - inK) * 500}px) rotate(${(1 - inK) * 12}deg)`, transformOrigin: '540px 1200px'}}>
        <Paper x={540} y={560} w={760} h={860} rot={-2}>
          <div style={{padding: '56px 60px'}}>
            <Mono size={28} color={P.kraftDark}>EE. UU. · LEY FEDERAL</Mono>
            <div style={{fontFamily: F.display, fontSize: 70, color: P.ink, lineHeight: 1.05, marginTop: 12}}>ALIMENTOS, MEDICAMENTOS Y COSMÉTICOS</div>
            <div style={{height: 4, background: P.ink, opacity: 0.6, margin: '24px 0'}} />
            {[0.92, 0.8, 0.95, 0.6, 0.85].map((wd, i) => <div key={i} style={{height: 16, width: `${wd * 100}%`, background: P.ink, opacity: 0.18, borderRadius: 6, marginBottom: 18}} />)}
            <div style={{display: 'flex', justifyContent: 'center', marginTop: 30}}>
              <div style={{fontFamily: F.display, fontSize: 210, lineHeight: 1, color: P.red, letterSpacing: '0.02em', filter: `blur(${year === 1938 ? 0 : 2}px)`}}>{year}</div>
            </div>
          </div>
          <div style={{position: 'absolute', right: 40, bottom: 50, transform: 'rotate(8deg) scale(0.45)', transformOrigin: '100% 100%', opacity: 0.9}}><ChocEgg s={0.9} id="e2" /></div>
        </Paper>
      </div>
      <SourceTag frame={f} at={lw(18)} text="Fuente: Ley FD&C de EE. UU. (1938)" x={70} y={1020} color={P.muted} />
      <Vig />
    </AbsoluteFill>
  );
};
