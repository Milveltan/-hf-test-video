/** Piezas compartidas del episodio "Contener la respiración": fondo abisal, medidores O₂/CO₂ y cuerpo con rayos X. */
import React from 'react';
import {AbsoluteFill} from 'remotion';
import {F} from '../../../dl/fonts';
import {rng} from '../../../dl/motion';
import {HumanRig, POSES} from '../../../dl/characters/HumanRig';
import {Lungs, Heart, Diaphragm} from '../../../dl/anatomy/Anatomy';
import {DIVER, P} from './palette';

/** Fondo de agua profunda: degradado, haz de luz desde arriba y partículas en suspensión con paralaje. */
export const Abyss: React.FC<{frame: number; tint?: string; light?: number; motes?: number; seed?: number}> = ({frame, tint = P.abyss, light = 1, motes = 60, seed = 3}) => {
  const r = rng(seed);
  return (
    <AbsoluteFill style={{background: `radial-gradient(90% 70% at 50% 18%, ${tint}, ${P.deep} 55%, ${P.void} 100%)`}}>
      <div style={{position: 'absolute', left: 180, top: -200, width: 720, height: 1300, background: 'linear-gradient(180deg, rgba(150,240,255,0.16), rgba(150,240,255,0) 75%)', clipPath: 'polygon(38% 0, 62% 0, 100% 100%, 0 100%)', opacity: light, filter: 'blur(18px)'}} />
      <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: motes}, (_, i) => {
          const x = r() * 1080, y0 = r() * 1200, z = 0.3 + r() * 0.9, ph = r() * 6;
          const y = ((y0 - frame * 0.6 * z) % 1200 + 1200) % 1200;
          return <circle key={i} cx={x + Math.sin(frame * 0.02 + ph) * 14 * z} cy={y} r={1.2 + z * 2.2} fill="#BFF8FF" opacity={0.12 + 0.3 * z} />;
        })}
      </svg>
    </AbsoluteFill>
  );
};

/** Medidores de O₂ y CO₂ (arriba). Valores 0..1; alarm 0..1 hace parpadear el CO₂ en rojo. */
export const Gauges: React.FC<{o2: number; co2: number; alarm?: number; frame: number; show?: number}> = ({o2, co2, alarm = 0, frame, show = 1}) => {
  if (show <= 0) return null;
  const blink = alarm * (0.5 + 0.5 * Math.sin(frame * 0.5));
  const co2c = co2 > 0.62 ? P.alarm : co2 > 0.4 ? P.co2hot : P.co2;
  const bar = (label: string, v: number, c: string, glow: number) => (
    <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
      <div style={{fontFamily: F.mono, fontWeight: 700, fontSize: 30, color: c, width: 84, textAlign: 'right'}}>{label}</div>
      <div style={{width: 330, height: 24, borderRadius: 12, background: 'rgba(10,30,45,0.85)', border: `2px solid ${c}55`, overflow: 'hidden'}}>
        <div style={{width: `${Math.max(0, Math.min(1, v)) * 100}%`, height: '100%', borderRadius: 12, background: `linear-gradient(90deg, ${c}88, ${c})`, boxShadow: `0 0 ${12 + glow * 26}px ${c}`}} />
      </div>
    </div>
  );
  return (
    <div style={{position: 'absolute', top: 44, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 34, opacity: show, transform: `translateY(${(1 - show) * -40}px)`}}>
      {bar('O₂', o2, P.o2, 0)}
      <div style={{opacity: 1 - blink * 0.55}}>{bar('CO₂', co2, co2c, blink)}</div>
    </div>
  );
};

/** Buceador con pecho en rayos X: pulmones, corazón y diafragma alineados al tórax del HumanRig. */
export const XDiver: React.FC<{frame: number; xray?: number; inflate?: number; o2?: number; bpm?: number; heartFrame?: number; dia?: number; pose?: typeof POSES.idle; expression?: React.ComponentProps<typeof HumanRig>['expression']; cheeks?: number; flush?: number; breath?: number; look?: number; blink?: number; scale?: number; id?: string}> = ({
  frame, xray = 1, inflate = 1, o2 = 1, bpm = 70, heartFrame, dia, pose = POSES.idle, expression = 'neutral', cheeks = 0, flush = 0, breath = 1, look = 0, blink = 0, scale = 1, id = 'xd',
}) => (
  <HumanRig
    id={id} person={DIVER} pose={pose} expression={expression} cheeks={cheeks} flush={flush} breath={breath} look={look} blink={blink} scale={scale} rim={P.xray} xray={xray}
    inside={
      <g>
        <g transform="translate(112 252) scale(0.44)"><Lungs frame={frame} inflate={inflate} o2={o2} glow={0.6} id={`${id}lg`} /></g>
        <g transform="translate(184 346) scale(0.27)"><Heart frame={heartFrame ?? frame} bpm={bpm} o2={o2} id={`${id}ht`} /></g>
        <g transform={`translate(112 ${452 - (dia ?? inflate) * 10})`}><Diaphragm inflate={dia ?? inflate} width={176} color="#D2606E" /></g>
      </g>
    }
  />
);

/** Coloca un HumanRig de modo que su punto (ax, ay) del lienzo 400×960 quede en (sx, sy) de la pantalla. */
export const place = (s: number, ax: number, ay: number, sx: number, sy: number): React.CSSProperties => ({position: 'absolute', left: sx - ax * s, top: sy - ay * s});
