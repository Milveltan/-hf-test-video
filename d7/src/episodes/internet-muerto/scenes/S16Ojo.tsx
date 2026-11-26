/**
 * ESCENA 16 · "Pero ojo: eso no prueba la teoría completa. Tráfico no es lo mismo que personas, y no hay pruebas de un complot."
 * Verificación (paleta ámbar de advertencia): "OJO" golpea → dos cajas "TRÁFICO" y "PERSONAS" con un ≠ que se dibuja →
 * regresa el edificio de gobierno: los hilos se cortan, las ventanas se apagan y cae el sello "SIN PRUEBAS".
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {F} from '../../../dl/fonts';
import {E, prog, spr} from '../../../dl/motion';
import {GovBuilding} from '../../../dl/environments/GovBuilding';
import {Pictogram} from '../../../dl/characters/Bot';
import {SlamWord, MaskRise} from '../../../dl/type/Type';
import {Stamp} from '../../../dl/fx/Fx';
import {StreamSplit} from '../../../dl/data/Data';
import {P} from './palette';

const AMBER = '#FFB020';

const Box: React.FC<{label: string; color: string; k: number; children: React.ReactNode}> = ({label, color, k, children}) => (
  <div style={{width: 400, height: 430, borderRadius: 28, border: `3px solid ${color}`, background: 'rgba(10,18,26,0.85)', overflow: 'hidden', position: 'relative', transform: `translateY(${(1 - k) * 160}px)`, opacity: k}}>
    <div style={{position: 'absolute', left: 0, right: 0, top: 26, textAlign: 'center', fontFamily: F.mono, fontWeight: 700, fontSize: 34, letterSpacing: '0.18em', color}}>{label}</div>
    {children}
  </div>
);

export const S16Ojo: React.FC<{lw: (i: number, off?: number) => number}> = ({lw}) => {
  const frame = useCurrentFrame();
  const ojo = lw(160, -2);
  const ojoOut = prog(frame, lw(167, -8), lw(167, 0), E.in);
  const boxes = spr(frame, lw(167, -4), {damping: 14, stiffness: 130});
  const neq = prog(frame, lw(168, -2), lw(171, 4), E.out);
  const toGov = prog(frame, lw(174, -6), lw(175, 6), E.inOut);
  const cut = lw(177, -2);
  const cutK = prog(frame, cut, cut + 10, E.in);
  const lit = 1 - prog(frame, cut + 4, cut + 26);
  return (
    <AbsoluteFill style={{background: `radial-gradient(90% 80% at 50% 40%, #1A1408, ${P.void} 75%)`, overflow: 'hidden'}}>
      {/* OJO + aclaración */}
      {ojoOut < 1 && (
        <AbsoluteFill style={{opacity: 1 - ojoOut, transform: `translateY(${-ojoOut * 120}px)`}}>
          <div style={{position: 'absolute', left: 0, right: 0, top: 260, textAlign: 'center'}}>
            <SlamWord frame={frame} at={ojo} text="OJO" colorA={AMBER} colorB="#FFFFFF" style={{fontFamily: F.display, fontSize: 330, color: AMBER, lineHeight: 1}} />
          </div>
          {frame >= lw(161) && (
            <div style={{position: 'absolute', left: 80, right: 80, top: 640, textAlign: 'center'}}>
              <MaskRise frame={frame} at={lw(161)} by="word" text="no prueba la teoría completa" each={3} style={{fontFamily: F.serif, fontStyle: 'italic', fontSize: 74, color: P.cream, whiteSpace: 'normal'}} />
            </div>
          )}
        </AbsoluteFill>
      )}

      {/* TRÁFICO ≠ PERSONAS */}
      {frame >= lw(167, -6) && toGov < 1 && (
        <AbsoluteFill style={{opacity: 1 - toGov, transform: `scale(${1 - 0.1 * toGov})`}}>
          <div style={{position: 'absolute', left: 50, top: 300}}>
            <Box label="TRÁFICO" color={P.alarm} k={boxes}>
              <div style={{position: 'absolute', left: -340, top: -360, transform: 'scale(1)', width: 1080, height: 1200}}>
                <StreamSplit frame={frame} share={1} splitK={0} y={590} count={40} seed={8} />
              </div>
            </Box>
          </div>
          <div style={{position: 'absolute', right: 50, top: 300}}>
            <Box label="PERSONAS" color={P.ui} k={spr(frame, lw(173, -6), {damping: 14, stiffness: 130})}>
              <div style={{position: 'absolute', left: 60, top: 140, display: 'flex', flexWrap: 'wrap', gap: 20, width: 300}}>
                {Array.from({length: 6}, (_, i) => <Pictogram key={i} color={P.ui} size={70} />)}
              </div>
            </Box>
          </div>
          <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
            <line x1={500} y1={480} x2={500 + 80 * Math.min(1, neq * 2)} y2={480} stroke={AMBER} strokeWidth={14} strokeLinecap="round" />
            <line x1={500} y1={540} x2={500 + 80 * Math.min(1, Math.max(0, neq * 2 - 0.5))} y2={540} stroke={AMBER} strokeWidth={14} strokeLinecap="round" />
            <line x1={560} y1={440} x2={560 - 60 * Math.max(0, neq * 2 - 1)} y2={440 + 140 * Math.max(0, neq * 2 - 1)} stroke={AMBER} strokeWidth={14} strokeLinecap="round" />
          </svg>
        </AbsoluteFill>
      )}

      {/* el "complot": edificio, hilos cortados, ventanas que se apagan */}
      {toGov > 0 && (
        <AbsoluteFill style={{opacity: toGov}}>
          <div style={{position: 'absolute', left: 90, top: 170, transform: `scale(${0.96 + 0.04 * toGov})`, filter: `saturate(${0.4 + 0.6 * lit})`}}>
            <GovBuilding lit={lit} frame={frame} />
          </div>
          <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
            {[300, 460, 620, 780].map((x, i) => (
              <g key={i}>
                <line x1={x} y1={870} x2={x} y2={870 + 330 - cutK * 20} stroke={P.cream} strokeOpacity={0.55 * (1 - cutK * 0.4)} strokeWidth={2} />
                <line x1={x} y1={870 + 330} x2={x + (i % 2 ? 1 : -1) * cutK * 30} y2={1200 + cutK * 260} stroke={P.cream} strokeOpacity={0.55} strokeWidth={2} />
              </g>
            ))}
          </svg>
          <Stamp frame={frame} at={lw(177, 2)} text="SIN PRUEBAS" size={120} x={540} y={760} rot={-7} color={AMBER} />
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
