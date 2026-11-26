/**
 * ESCENA 2 · "Pero tu cuerpo ya empezó la cuenta regresiva."
 * Un barrido de escáner baja por el cuerpo y lo vuelve rayos X: pulmones llenos, corazón latiendo.
 * En "cuenta regresiva" aparecen los medidores (capa global) y la cámara se mete en el pecho.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {E, lerp, prog} from '../../../dl/motion';
import {HumanRig, POSES} from '../../../dl/characters/HumanRig';
import {Glow} from '../../../dl/light/Light';
import {Abyss, XDiver, place} from './common';
import {DIVER, P} from './palette';

export const S02RayosX: React.FC<{lw: (i: number, off?: number) => number}> = ({lw}) => {
  const f = useCurrentFrame();
  const scan = prog(f, lw(11, 2), lw(14, 4), E.inOut);
  const push = prog(f, lw(16), lw(19, 4), E.in);
  const s = lerp(1.0, 2.1, push);
  const ay = lerp(480, 360, push), sy = lerp(610, 600, push);
  const top = 130, bottom = 1090;
  const lineY = lerp(top - 20, bottom, scan);
  const body = (x: number) => <HumanRig id="s2n" person={DIVER} pose={POSES.idle} breath={1} cheeks={0.75} rim={P.xray} scale={s} xray={x} />;
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <Abyss frame={f + 140} light={1 - push * 0.6} />
      <Glow x={540} y={520} r={420} color={P.o2} opacity={0.12 + scan * 0.12} />
      <div style={place(s, 200, ay, 540, sy)}>{body(0)}</div>
      <div style={{...place(s, 200, ay, 540, sy), clipPath: `inset(0 0 ${Math.max(0, 100 - ((lineY - (sy - ay * s)) / (960 * s)) * 100)}% 0)`}}>
        <XDiver frame={f} id="s2x" scale={s} inflate={1} cheeks={0.75} />
      </div>
      {scan > 0 && scan < 1 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: lineY - 3, height: 6, background: P.o2, boxShadow: `0 0 40px 12px ${P.o2}88`, opacity: 0.9}} />
      )}
    </AbsoluteFill>
  );
};
