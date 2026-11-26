/**
 * ESCENA 5 · "En la base de tu cerebro, unos sensores lo detectan. Y encienden la alarma."
 * El CO₂ sube por el cuello hasta el bulbo raquídeo; sus quimiorreceptores emiten pulsos de detección
 * y en "alarma" todo el tronco cerebral se enciende en rojo con ondas que sacuden el cuadro.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Cam, Layer} from '../../../dl/camera/Camera';
import {E, keys, lerp, prog, rng} from '../../../dl/motion';
import {Brain, BloodFlow} from '../../../dl/anatomy/Anatomy';
import {Annotation} from '../../../dl/editorial/Editorial';
import {Glow} from '../../../dl/light/Light';
import {Abyss} from './common';
import {P} from './palette';

const SX = 540, SY = 820; // bulbo raquídeo en pantalla

export const S05Alarma: React.FC<{lw: (i: number, off?: number) => number}> = ({lw}) => {
  const f = useCurrentFrame();
  const alarm = prog(f, lw(54, -3), lw(54, 6), E.out);
  const zoom = keys(f, [[0, 1], [lw(47), 1.12], [lw(54), 1.3]], E.inOut);
  const shake = alarm * (1 - prog(f, lw(54, 6), lw(54, 30))) * 16;
  const pulses = [lw(48), lw(49, 6), lw(50), lw(51, 2)];
  const r = rng(4);
  const mol = Array.from({length: 18}, () => ({o: r(), dx: (r() - 0.5) * 40}));
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <Abyss frame={f + 500} tint={alarm > 0 ? '#3A0E1A' : P.abyss} light={0.5} />
      <Cam frame={f} x={540} y={lerp(600, 760, prog(f, 0, lw(54)))} zoom={zoom} shake={shake}>
        <Layer depth={0.4}><Glow x={SX} y={SY} r={500} color={alarm > 0 ? P.alarm : P.co2} opacity={0.15 + alarm * 0.35} /></Layer>
        <Layer depth={1}>
          <BloodFlow frame={f} d={`M${SX} 1300 C ${SX - 10} 1150 ${SX + 10} 1000 ${SX} 890`} width={70} o2={0.7} speed={4} cells={10} id="s5bf" />
          <div style={{position: 'absolute', left: SX - 529, top: SY - 710}}><Brain frame={f} highlight="brainstem" color="#E9A7B4" scale={2.15} id="s5br" /></div>
          <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
            {mol.map((m, i) => {
              const t = (f * 0.02 + m.o) % 1;
              return <g key={i} transform={`translate(${SX + m.dx * (1 - t)} ${lerp(1240, SY + 20, t)})`} opacity={Math.min(1, t * 4) * (1 - prog(t, 0.85, 1))}><circle r={7} fill="#2B2F35" stroke={P.co2} strokeWidth={2} /><circle cx={-11} r={5.5} fill={P.co2} /><circle cx={11} r={5.5} fill={P.co2} /></g>;
            })}
            {pulses.map((p, i) => {
              const t = prog(f, p, p + 26, E.out);
              return f >= p && t < 1 ? <circle key={i} cx={SX} cy={SY} r={20 + t * 150} fill="none" stroke={P.co2} strokeWidth={5 * (1 - t)} opacity={1 - t} /> : null;
            })}
            {alarm > 0 && [0, 1, 2, 3].map((i) => {
              const t = ((f - lw(54) + i * 9) % 36) / 36;
              return <circle key={`a${i}`} cx={SX} cy={SY} r={30 + t * 520} fill="none" stroke={P.alarm} strokeWidth={14 * (1 - t)} opacity={alarm * (1 - t)} />;
            })}
            <circle cx={SX} cy={SY} r={46} fill={alarm > 0 ? P.alarm : P.co2} opacity={0.35 + 0.5 * alarm * (0.6 + 0.4 * Math.sin(f * 0.6))} style={{filter: 'blur(8px)'}} />
          </svg>
        </Layer>
      </Cam>
      <Annotation frame={f} at={lw(42)} x={70} y={760} tx={SX - 20} ty={SY + 10} kicker="BULBO RAQUÍDEO" label="sensores de CO₂" color={P.bone} accent={alarm > 0 ? P.alarm : P.co2} size={44} out={lw(52)} />
    </AbsoluteFill>
  );
};
