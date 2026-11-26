/**
 * ESCENA 6 · "Tu cerebro cierra la escena anterior y abre una nueva, para mantener todo ordenado."
 * El cerebro dirige: la tarjeta de la sala se cierra (barras de cine), se archiva en una pila; la de la cocina se abre; todo queda alineado.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Brain} from '../../../dl/anatomy/Anatomy';
import {Glow, Sweep} from '../../../dl/light/Light';
import {spr} from '../../../dl/motion';
import {E, FilmCard, Idea, Kitchen, LW, Sala, Vig, lerp, prog} from './common';
import {P} from './palette';

const Bars: React.FC<{k: number}> = ({k}) => (
  <>
    <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 610 * k, background: P.film}} />
    <div style={{position: 'absolute', left: 0, bottom: 0, width: 1080, height: 610 * k, background: P.film}} />
  </>
);

export const S06Archivo: React.FC<{lw: LW}> = ({lw}) => {
  const f = useCurrentFrame();
  const brainIn = spr(f, 3, {damping: 14, stiffness: 120});
  const close = prog(f, lw(70), lw(72), E.inOut);
  const file = prog(f, lw(72), lw(74) + 4, E.inOut);
  const open = prog(f, lw(75), lw(77) + 4, E.out);
  const newIn = spr(f, lw(75) - 3, {damping: 14, stiffness: 140});
  const tidy = prog(f, lw(78), lw(80), E.out);
  const oldX = lerp(290, 200, file), oldY = lerp(770, 900, file), oldW = lerp(310, 170, file);
  const newW = lerp(300, 340, tidy);
  const tick = prog(f, lw(80), lw(81) + 3, E.out);
  return (
    <AbsoluteFill style={{overflow: 'hidden', background: `radial-gradient(80% 60% at 50% 30%, ${P.kTop}, ${P.night} 80%)`}}>
      <Glow x={540} y={290} r={430} color={P.tungsten} opacity={0.35 * brainIn} />
      <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
        {[[oldX, oldY - 30], [770, 760]].map(([tx, ty], i) => {
          const a = i === 0 ? 1 - file * 0.7 : newIn;
          const t = (f * 0.03 + i * 0.5) % 1;
          return (
            <g key={i} opacity={a}>
              <path d={`M540 420 Q${(540 + (tx as number)) / 2} 520 ${tx} ${(ty as number) - 190}`} stroke={P.cream} strokeWidth={4} strokeDasharray="3 12" fill="none" opacity={0.5} />
              <circle cx={lerp(540, tx as number, t)} cy={lerp(430, (ty as number) - 190, t)} r={9} fill={P.tungsten} style={{filter: `drop-shadow(0 0 10px ${P.tungsten})`}} />
            </g>
          );
        })}
      </svg>
      <div style={{position: 'absolute', left: 540 - 158, top: 90, opacity: brainIn, transform: `scale(${lerp(0.6, 1, brainIn)})`}}>
        <Brain frame={f} highlight="all" color="#F2B6A0" scale={0.75} id="b6" />
      </div>
      {/* pila de archivo */}
      {[2, 1, 0].map((i) => (
        <div key={i} style={{position: 'absolute', left: 200 - 87 - 10 + i * 12, top: 900 - 111 - 10 - i * 10, opacity: file}}>
          <FilmCard w={170} dim={0.4 + i * 0.1}><Sala f={0} lit={0.7} /></FilmCard>
          <div style={{position: 'absolute', right: -18, top: 40 + i * 10, width: 22, height: 36, borderRadius: '0 8px 8px 0', background: [P.coral, P.teal, P.idea][i]}} />
        </div>
      ))}
      {file > 0.98 && tick > 0 && (
        <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
          <circle cx={330} cy={840} r={34} fill={P.ok} opacity={tick} /><path d="M315 840 l12 14 l24 -28" stroke={P.film} strokeWidth={8} fill="none" strokeLinecap="round" strokeDasharray={60} strokeDashoffset={60 * (1 - tick)} />
        </svg>
      )}
      {/* tarjeta que sale */}
      {file < 0.999 && (
        <div style={{position: 'absolute', left: oldX - (oldW + 16 * (oldW / 300)) / 2, top: oldY - (oldW * 1200 / 1080 + 60 * (oldW / 300)) / 2}}>
          <FilmCard w={oldW} dim={0.4 * file}>
            <Sala f={f} />
            <Idea x={800} y={380} f={f} s={1.5} glow={1 - file * 0.6} />
            <Bars k={close} />
          </FilmCard>
        </div>
      )}
      {/* tarjeta nueva */}
      <div style={{position: 'absolute', left: 770 - (newW + 16 * (newW / 300)) / 2, top: 770 - (newW * 1200 / 1080 + 60 * (newW / 300)) / 2 + (1 - newIn) * 80, opacity: newIn}}>
        <FilmCard w={newW} glow={tidy * 0.6}>
          <Kitchen f={f} />
          <Bars k={1 - open} />
        </FilmCard>
      </div>
      <Sweep k={prog(f, lw(78), lw(81))} color="rgba(255,226,122,0.18)" width={14} />
      <Vig />
    </AbsoluteFill>
  );
};
