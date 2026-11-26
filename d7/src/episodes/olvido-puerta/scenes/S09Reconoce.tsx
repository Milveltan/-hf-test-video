/**
 * ESCENA 9 · "Tu cerebro reconoce la escena y te lo devuelve."
 * Dos fotogramas —el guardado y el de ahora— se acercan y encajan (reconocimiento); la idea sale del fotograma y vuela al cerebro, que se ilumina.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Brain} from '../../../dl/anatomy/Anatomy';
import {Flash} from '../../../dl/fx/Fx';
import {Glow} from '../../../dl/light/Light';
import {bezier, spr} from '../../../dl/motion';
import {F} from '../../../dl/fonts';
import {E, FilmCard, Idea, LW, Sala, Vig, lerp, prog} from './common';
import {P} from './palette';

const W = 300, CW = W + 16 * (W / 300), CH = (W * 1200) / 1080 + 60 * (W / 300);

export const S09Reconoce: React.FC<{lw: LW}> = ({lw}) => {
  const f = useCurrentFrame();
  const inK = spr(f, 2, {damping: 14, stiffness: 130});
  const slide = prog(f, lw(117), lw(119), E.inOut);
  const snap = f >= lw(119);
  const sk = prog(f, lw(119), lw(119) + 14, E.out);
  const out = prog(f, lw(122), lw(124), E.inOut);
  const [bx, by] = bezier(out, [540, 790], [700, 640], [420, 480], [540, 330]);
  const brainHot = prog(f, lw(124), lw(124) + 10, E.out);
  const lx = lerp(230, 540, slide), rx = lerp(850, 540, slide);
  const hit = f >= lw(119) && f < lw(119) + 7 ? 0.45 * (1 - (f - lw(119)) / 7) : f >= lw(124) && f < lw(124) + 8 ? 0.5 * (1 - (f - lw(124)) / 8) : 0;
  const lab = 1 - prog(f, lw(117), lw(118));
  return (
    <AbsoluteFill style={{overflow: 'hidden', background: `radial-gradient(80% 60% at 50% 30%, ${P.kTop}, ${P.night} 80%)`}}>
      <Glow x={540} y={290} r={430 + brainHot * 160} color={P.tungsten} opacity={0.3 * inK + 0.5 * brainHot} />
      <div style={{position: 'absolute', left: 540 - 168, top: 100, opacity: inK, transform: `scale(${lerp(0.7, 1, inK)})`}}>
        <Brain frame={f} highlight={brainHot > 0.1 ? 'all' : 'cortex'} color="#F2B6A0" scale={0.8} id="b9" />
      </div>
      {/* fotograma guardado */}
      <div style={{position: 'absolute', left: lx - CW / 2, top: 800 - CH / 2, opacity: 1 - 0.0 * sk}}>
        <FilmCard w={W} glow={sk * 0.9}><Sala f={f} /><Idea x={790} y={380} f={f} s={1.5} glow={1 - out} opacity={1 - out} /></FilmCard>
      </div>
      {/* fotograma de ahora */}
      <div style={{position: 'absolute', left: rx - CW / 2, top: 800 - CH / 2, opacity: snap ? 0.5 : 1}}>
        <FilmCard w={W}><Sala f={f} /></FilmCard>
      </div>
      {[['GUARDADO', 230], ['AHORA', 850]].map(([t, x]) => (
        <div key={t as string} style={{position: 'absolute', left: (x as number) - 150, width: 300, top: 570, textAlign: 'center', fontFamily: F.mono, fontWeight: 700, fontSize: 34, letterSpacing: '0.22em', color: P.cream, opacity: lab}}>{t}</div>
      ))}
      {snap && sk < 1 && (
        <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
          {[0, 1].map((i) => <circle key={i} cx={540} cy={800} r={140 + (sk + i * 0.3) * 300} fill="none" stroke={P.ok} strokeWidth={6 * (1 - sk)} opacity={0.9 * (1 - sk)} />)}
        </svg>
      )}
      {snap && (
        <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}} opacity={1 - out}>
          <circle cx={700} cy={680} r={36} fill={P.ok} opacity={sk} /><path d="M684 680 l12 14 l24 -28" stroke={P.film} strokeWidth={8} fill="none" strokeLinecap="round" strokeDasharray={60} strokeDashoffset={60 * (1 - sk)} />
        </svg>
      )}
      {out > 0 && out < 1 && <Idea x={bx} y={by} f={f} s={lerp(0.55, 0.3, out)} glow={1} />}
      <Flash k={hit} color={P.idea} />
      <Vig />
    </AbsoluteFill>
  );
};
