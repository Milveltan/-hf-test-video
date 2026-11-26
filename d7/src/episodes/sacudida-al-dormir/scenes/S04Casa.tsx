/**
 * ESCENA 4 · "Cuando empiezas a dormirte, tu cuerpo se apaga por partes, como una casa que va apagando sus luces una por una."
 * Metáfora central: una casa de noche bajo la luna. Las ventanas se apagan ancladas a cada palabra de "una por una";
 * solo la ventana del ático (la mente) sigue encendida, y la cámara se acerca a ella.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {E, lerp, prog} from '../../../dl/motion';
import {House} from '../../../dl/environments/NightHouse';
import {Glow} from '../../../dl/light/Light';
import {Night, place} from './common';
import {P} from './palette';

export const S04Casa: React.FC<{lw: (i: number, off?: number) => number}> = ({lw}) => {
  const f = useCurrentFrame();
  const at = [lw(50), lw(52), lw(56), lw(58), lw(59), lw(60), lw(61), lw(62)];
  const off = [...at.map((a) => prog(f, a, a + 3)), 0];
  const push = prog(f, 0, lw(64), E.inOut);
  const s = lerp(0.95, 1.25, push);
  const ay = lerp(520, 300, push);
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <Night frame={f} tint={P.dusk} />
      <Glow x={860} y={170} r={160} color={P.moon} opacity={0.5} />
      <div style={{position: 'absolute', left: 820, top: 130, width: 80, height: 80, borderRadius: '50%', background: '#E8EEFF', boxShadow: `0 0 60px ${P.moon}`}} />
      <div style={place(s, 450, ay, 540, lerp(640, 600, push))}>
        <div style={{transform: `scale(${s})`, transformOrigin: '0 0'}}><House off={off} frame={f} warm={P.lamp} /></div>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 140, background: `linear-gradient(0deg, ${P.night}, transparent)`}} />
    </AbsoluteFill>
  );
};
