/**
 * ESCENA 8 · "Entonces tu cuerpo activa un protocolo de emergencia. Tu corazón late más lento."
 * Un aviso de sistema se escribe sobre fondo pulsante; el corazón entra al centro con su monitor.
 * En "más lento" los latidos se separan: el corazón y el trazo del monitor frenan juntos (misma fase).
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {F} from '../../../dl/fonts';
import {E, lerp, prog, spr} from '../../../dl/motion';
import {Heart} from '../../../dl/anatomy/Anatomy';
import {TypeOn} from '../../../dl/type/Type';
import {Glow} from '../../../dl/light/Light';
import {Abyss} from './common';
import {P} from './palette';

const beatShape = (ph: number) => (ph < 0.04 ? -0.15 * Math.sin((ph / 0.04) * Math.PI) : ph < 0.1 ? Math.sin(((ph - 0.04) / 0.06) * Math.PI) * (ph < 0.07 ? 1 : -0.35) : ph < 0.28 && ph > 0.18 ? 0.22 * Math.sin(((ph - 0.18) / 0.1) * Math.PI) : 0);

export const S08Corazon: React.FC<{lw: (i: number, off?: number) => number}> = ({lw}) => {
  const f = useCurrentFrame();
  const slowA = lw(95), slowB = lw(98, 14);
  const bpmAt = (t: number) => lerp(84, 50, prog(t, slowA, slowB, E.inOut));
  const acc = (t: number) => { let a = 0; for (let i = 0; i < t; i++) a += bpmAt(i) / 60; return a; };
  const beatF = acc(f);
  const heartIn = spr(f, lw(88), {damping: 16});
  const warn = prog(f, lw(86), lw(87)) * (1 - prog(f, lw(93), lw(94, 4)));
  const red = 0.5 + 0.5 * Math.sin(f * 0.35);
  const cache: number[] = [];
  const pts: string[] = [];
  const base = acc(Math.max(0, f - 150));
  for (let x = 0; x <= 1080; x += 6) {
    const t = f - (1080 - x) / 7.2;
    if (t < 0) continue;
    const a = t < f - 150 ? base : acc(t);
    const ph = (a % 30) / 30;
    cache.push(ph);
    pts.push(`${x},${960 - beatShape(ph) * 100}`);
  }
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <Abyss frame={f + 1100} tint={warn > 0.1 ? '#2A0E14' : '#0B2433'} light={0.4} />
      <AbsoluteFill style={{background: `radial-gradient(70% 50% at 50% 30%, rgba(255,46,77,${0.22 * warn * red}), transparent 70%)`}} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center', opacity: warn}}>
        <div style={{display: 'inline-block', padding: '18px 34px', border: `3px solid ${P.alarm}`, borderRadius: 14, background: 'rgba(40,6,12,0.75)', boxShadow: `0 0 40px ${P.alarm}66`}}>
          <div style={{fontFamily: F.mono, fontSize: 30, color: P.co2, letterSpacing: '0.2em'}}>⚠ SISTEMA NERVIOSO</div>
          <TypeOn frame={f} at={lw(89, -2)} text="PROTOCOLO DE EMERGENCIA" cps={26} style={{fontFamily: F.mono, fontWeight: 700, fontSize: 44, color: P.bone}} />
        </div>
      </div>
      <div style={{position: 'absolute', left: 540 - 260, top: 300 + (1 - heartIn) * 500, opacity: heartIn, transform: `scale(${0.9 + heartIn * 0.1})`}}>
        <Glow x={260} y={300} r={360} color={P.blood} opacity={0.25} />
        <Heart frame={beatF} bpm={60} o2={0.85} glow={0.8} scale={2.0} id="s8ht" />
      </div>
      <svg width={1080} height={1200} style={{position: 'absolute', inset: 0, opacity: prog(f, lw(89), lw(91))}}>
        <line x1={0} x2={1080} y1={960} y2={960} stroke={P.o2dim} strokeOpacity={0.3} strokeWidth={2} strokeDasharray="4 10" />
        <polyline points={pts.join(' ')} fill="none" stroke={P.o2} strokeWidth={6} strokeLinejoin="round" style={{filter: `drop-shadow(0 0 10px ${P.o2})`}} />
        <circle cx={1080} cy={960 - beatShape((beatF % 30) / 30) * 100} r={10} fill="#FFF" />
      </svg>
      <div style={{position: 'absolute', right: 60, top: 820, fontFamily: F.mono, fontSize: 30, color: P.o2, opacity: prog(f, lw(95), lw(96))}}>FRECUENCIA ↓</div>
    </AbsoluteFill>
  );
};
