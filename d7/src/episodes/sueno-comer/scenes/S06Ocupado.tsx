/**
 * ESCENA 6 · "Así que no es flojera: es tu cuerpo diciéndote 'ahora estoy ocupado digiriendo'."
 * "FLOJERA" aparece y se tacha; la persona dormita en el sofá con un letrero colgado: OCUPADO · DIGIRIENDO. Zzz, luz de tarde que se apaga.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Sala} from '../../../dl/environments/Home';
import {F} from '../../../dl/fonts';
import {spr} from '../../../dl/motion';
import {LW, Person, Vig, Zzz, lerp, prog} from './common';
import {P} from './palette';

export const S06Ocupado: React.FC<{lw: LW}> = ({lw}) => {
  const f = useCurrentFrame();
  const word = spr(f, lw(87), {damping: 12, stiffness: 160});
  const strike = prog(f, lw(88), lw(88) + 7);
  const out = prog(f, lw(89), lw(90));
  const sign = spr(f, lw(93), {damping: 9, stiffness: 160});
  const end = prog(f, lw(96) + 26, lw(96) + 46);
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, transform: `scale(${lerp(1.15, 1.05, prog(f, 0, lw(96)))})`, transformOrigin: '380px 700px'}}>
        <Sala f={f} lit={0.85} />
        <AbsoluteFill style={{background: P.honey, opacity: 0.12, mixBlendMode: 'overlay'}} />
        <Person x={600} s={0.46} foot={770} rot={-90} expression="eyesClosed" breath={0.3 + 0.3 * Math.sin(f * 0.08)} id="c6" />
        {sign > 0.01 && (
          <div style={{position: 'absolute', left: 400 - 120, top: 610, width: 240, transformOrigin: '50% -40px', transform: `scale(${Math.min(1.1, sign)}) rotate(${Math.sin(f * 0.08) * 4}deg)`}}>
            <svg width={240} height={60} style={{position: 'absolute', top: -50}}><path d="M40 60 L120 6 L200 60" stroke={P.ink} strokeWidth={4} fill="none" /></svg>
            <div style={{background: P.terra, borderRadius: 14, padding: '14px 10px', textAlign: 'center', border: `4px solid ${P.cloth}`, boxShadow: '0 10px 24px rgba(0,0,0,0.4)'}}>
              <div style={{fontFamily: F.display, fontSize: 44, color: P.text, lineHeight: 1}}>OCUPADO</div>
              <div style={{fontFamily: F.mono, fontWeight: 700, fontSize: 28, color: P.cloth, letterSpacing: '0.12em'}}>DIGIRIENDO</div>
            </div>
          </div>
        )}
        <Zzz x={170} y={560} f={f} k={sign} />
      </div>
      {word > 0.01 && out < 1 && (
        <div style={{position: 'absolute', left: 0, width: 1080, top: 160, textAlign: 'center', opacity: Math.min(1, word) * (1 - out), transform: `scale(${0.8 + 0.2 * word})`}}>
          <span style={{position: 'relative', fontFamily: F.display, fontSize: 170, color: P.text, textShadow: '0 10px 40px rgba(0,0,0,0.7)'}}>
            FLOJERA
            <span style={{position: 'absolute', left: -20, right: -20, top: '52%', height: 22, borderRadius: 11, background: P.terra, transform: `scaleX(${strike}) rotate(-4deg)`, transformOrigin: '0 50%', boxShadow: `0 0 16px ${P.terra}`}} />
          </span>
        </div>
      )}
      <Vig />
      <AbsoluteFill style={{background: '#000', opacity: end}} />
    </AbsoluteFill>
  );
};
