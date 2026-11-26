/**
 * ESCENA 3 · "Resulta que tu mente no guarda la vida como una sola película. La corta en escenas, como capítulos."
 * Una cinta de película continua desfila; en "corta" un tajo de luz la separa en tarjetas con espacio y rótulos CAP. 1·2·3.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Glow} from '../../../dl/light/Light';
import {Flash} from '../../../dl/fx/Fx';
import {MaskRise} from '../../../dl/type/Type';
import {F} from '../../../dl/fonts';
import {E, FilmCard, Kitchen, LW, Sala, Vig, lerp, prog} from './common';
import {P} from './palette';

export const S03Capitulos: React.FC<{lw: LW}> = ({lw}) => {
  const f = useCurrentFrame();
  const W = 296, cardW = W + 16 * (W / 300), gapMax = 34;
  const cut = lw(40);
  const gk = prog(f, cut + 2, cut + 16, E.out);
  const c = lerp(0, 4, prog(f, 0, lw(44), E.out));
  const cutK = prog(f, cut - 2, cut + 6, E.out);
  const shake = f > cut - 1 && f < cut + 10 ? Math.sin(f * 3.1) * 8 * (1 - (f - cut) / 11) : 0;
  const cards = Array.from({length: 9}, (_, i) => i);
  return (
    <AbsoluteFill style={{overflow: 'hidden', background: `radial-gradient(80% 60% at 50% 48%, ${P.kTop}, ${P.night} 80%)`}}>
      <Glow x={540} y={560} r={520} color={P.tungsten} opacity={0.2 + 0.3 * prog(f, cut - 2, cut + 4)} />
      <div style={{position: 'absolute', inset: 0, transform: `translateX(${shake}px)`}}>
        {cards.map((i) => {
          const x = 540 + (i - c) * (cardW + gapMax * gk);
          if (x < -cardW || x > 1080 + cardW) return null;
          const rot = (i - 4) * 2.4 * gk;
          const y = 560 + Math.sin(f * 0.04 + i * 1.3) * 6 * gk + Math.abs(i - 4) * 10 * gk;
          const hero = i >= 3 && i <= 5;
          return (
            <div key={i} style={{position: 'absolute', left: x - cardW / 2, top: y - (W * 1200 / 1080 + 60 * (W / 300)) / 2, transform: `rotate(${rot}deg)`}}>
              <FilmCard w={W} glow={hero ? gk * 0.5 : 0} dim={hero ? 0 : 0.35 * gk}>
                {i % 2 === 0 ? <Sala f={f} /> : <Kitchen f={f} steam={false} />}
              </FilmCard>
            </div>
          );
        })}
        {[3, 4, 5].map((i, k) => (
          <div key={i} style={{position: 'absolute', left: 540 + (i - 4) * (cardW + gapMax) - 150, width: 300, top: 232, textAlign: 'center', fontFamily: F.display, fontSize: 64, color: P.cream, letterSpacing: '0.04em', textShadow: '0 6px 24px rgba(0,0,0,0.8)'}}>
            <MaskRise frame={f} at={lw(43) + k * 5} text={`CAP. ${k + 1}`} each={1} style={{justifyContent: 'center', display: 'flex'}} />
          </div>
        ))}
      </div>
      {cutK > 0 && cutK < 1 && (
        <div style={{position: 'absolute', left: 536, top: 0, width: 8, height: 1200 * cutK, background: '#FFFFFF', boxShadow: `0 0 40px 12px ${P.tungsten}`, borderRadius: 4}} />
      )}
      <Flash k={f >= cut && f < cut + 5 ? 0.5 * (1 - (f - cut) / 5) : 0} color={P.cream} />
      <Vig />
    </AbsoluteFill>
  );
};
