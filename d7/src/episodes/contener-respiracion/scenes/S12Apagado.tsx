/**
 * ESCENA 12 · "Pero si lograras resistir lo suficiente… tu cerebro tomaría la decisión por ti. Te apagaría."
 * Vuelve el primerísimo plano del gancho, ahora en tensión: rojo, temblor y visión de túnel que se cierra al ritmo del pulso.
 * El cerebro se enciende dentro de la cabeza y en "Te apagaría" la imagen se apaga como un televisor viejo.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {E, lerp, prog} from '../../../dl/motion';
import {HumanRig, POSES} from '../../../dl/characters/HumanRig';
import {Brain} from '../../../dl/anatomy/Anatomy';
import {PowerOff} from '../../../dl/fx/PowerOff';
import {Glow} from '../../../dl/light/Light';
import {Abyss, place} from './common';
import {DIVER, P} from './palette';

export const S12Apagado: React.FC<{lw: (i: number, off?: number) => number}> = ({lw}) => {
  const f = useCurrentFrame();
  const t = prog(f, 0, lw(153), E.linear);
  const beat = Math.pow(Math.max(0, Math.sin(f * lerp(0.2, 0.3, t))), 12);
  const tunnel = lerp(78, 30, prog(f, 0, lw(153), E.in));
  const s = lerp(2.6, 3.4, prog(f, 0, lw(154), E.in)) * (1 + beat * 0.012);
  const trem = lerp(1, 7, t);
  const brain = prog(f, lw(146), lw(148, 6));
  const off = prog(f, lw(153, 2), lw(154, 14), E.linear);
  return (
    <PowerOff k={off}>
      <AbsoluteFill style={{overflow: 'hidden'}}>
        <Abyss frame={f + 1700} tint="#2E0A14" light={0.3} />
        <Glow x={540} y={420} r={500} color={P.alarm} opacity={0.15 + beat * 0.2} />
        <div style={place(s, 200, 150, 540 + Math.sin(f * 1.3) * trem, 470 + Math.cos(f * 1.1) * trem)}>
          <HumanRig id="s12" person={DIVER} pose={POSES.idle} breath={1} cheeks={0.85} flush={lerp(0.7, 1, t)} expression={f > lw(150) ? 'eyesClosed' : 'strain'} rim={P.alarm} scale={s} />
        </div>
        {brain > 0 && (
          <div style={{position: 'absolute', left: 540 - 220 * (110 * s / 420), top: 470 - 72 * s - 165 * (110 * s / 420), opacity: brain * 0.7, mixBlendMode: 'screen'}}>
            <Brain frame={f} highlight="all" color="#9FE8FF" scale={110 * s / 420} id="s12br" />
          </div>
        )}
        <AbsoluteFill style={{background: `radial-gradient(circle at 50% 42%, transparent ${tunnel - 18}%, rgba(0,0,0,0.92) ${tunnel}%)`}} />
        <AbsoluteFill style={{background: P.alarm, mixBlendMode: 'multiply', opacity: 0.18 + beat * 0.12}} />
      </AbsoluteFill>
    </PowerOff>
  );
};
