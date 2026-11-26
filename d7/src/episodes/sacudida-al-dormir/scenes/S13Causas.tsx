/**
 * ESCENA 13 · "Y te pasa más cuando estás cansado, estresado o tomaste mucho café."
 * Arriba, la cama pequeña; abajo aparecen tres iconos con resorte, cada uno en su palabra: batería baja, reloj tenso, taza humeante.
 * Con cada icono la persona da una pequeña sacudida: más motivos, más brincos.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {spr} from '../../../dl/motion';
import {F} from '../../../dl/fonts';
import {BedTop, Night, jolt, place} from './common';
import {P} from './palette';

const Battery: React.FC<{f: number}> = ({f}) => (
  <svg width={200} height={200} viewBox="0 0 200 200"><rect x={30} y={60} width={130} height={80} rx={12} fill="none" stroke={P.text} strokeWidth={8} /><rect x={160} y={85} width={14} height={30} rx={4} fill={P.text} /><rect x={42} y={72} width={22} height={56} rx={4} fill={P.alarm} opacity={0.6 + 0.4 * Math.sin(f * 0.4)} /></svg>
);
const Clock: React.FC<{f: number}> = ({f}) => (
  <svg width={200} height={200} viewBox="0 0 200 200"><circle cx={100} cy={105} r={62} fill="none" stroke={P.text} strokeWidth={8} /><line x1={100} y1={105} x2={100 + Math.cos(f * 0.5) * 44} y2={105 + Math.sin(f * 0.5) * 44} stroke={P.lamp} strokeWidth={8} strokeLinecap="round" /><line x1={100} y1={105} x2={100} y2={70} stroke={P.text} strokeWidth={8} strokeLinecap="round" /><path d="M48 50 L36 38 M152 50 L164 38" stroke={P.text} strokeWidth={8} strokeLinecap="round" /></svg>
);
const Cup: React.FC<{f: number}> = ({f}) => (
  <svg width={200} height={200} viewBox="0 0 200 200"><path d="M45 90 L155 90 L145 165 Q100 178 55 165 Z" fill={P.text} /><path d="M152 105 Q185 110 168 140 Q160 150 148 148" stroke={P.text} strokeWidth={8} fill="none" />{[70, 100, 130].map((x, i) => <path key={i} d={`M${x} 78 q${12 * Math.sin(f * 0.15 + i)} -18 0 -36 q${-12 * Math.sin(f * 0.15 + i)} -18 0 -30`} stroke={P.lamp} strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.8} />)}</svg>
);

export const S13Causas: React.FC<{lw: (i: number, off?: number) => number}> = ({lw}) => {
  const f = useCurrentFrame();
  const items = [{at: lw(156), C: Battery, label: 'CANSANCIO'}, {at: lw(157), C: Clock, label: 'ESTRÉS'}, {at: lw(160), C: Cup, label: 'CAFÉ'}];
  const j = Math.max(...items.map((it) => jolt(f, it.at + 2, 12)));
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <Night frame={f} />
      <div style={place(0.4, 300, 550, 540, 330 - j * 10)}>
        <div style={{transform: `scale(${0.4 + j * 0.03})`, transformOrigin: '0 0'}}><BedTop frame={f} expression={j > 0.2 ? 'surprise' : 'eyesClosed'} ripple={j * 3} breath={0.4} /></div>
      </div>
      {items.map((it, i) => {
        const k = spr(f, it.at, {damping: 11, stiffness: 160});
        return (
          <div key={i} style={{position: 'absolute', left: 60 + i * 330, top: 680, width: 300, textAlign: 'center', opacity: Math.min(1, k * 1.5), transform: `translateY(${(1 - k) * 80}px) scale(${0.6 + 0.4 * k})`}}>
            <div style={{display: 'flex', justifyContent: 'center'}}><it.C f={f} /></div>
            <div style={{fontFamily: F.display, fontSize: 54, color: i === 2 ? P.lamp : P.text, letterSpacing: 2}}>{it.label}</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
