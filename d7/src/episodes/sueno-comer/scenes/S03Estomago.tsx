/**
 * ESCENA 3 · "Tu estómago se pone a trabajar, y el cuerpo baja el ritmo para que todo se procese con calma."
 * Rayos X: el estómago se ilumina y se contrae; el corazón y unas líneas de velocidad alrededor del cuerpo desaceleran hasta "calma".
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Stomach} from '../../../dl/anatomy/Stomach';
import {Glow} from '../../../dl/light/Light';
import {Dining, E, LW, Person, Vig, lerp, prog} from './common';
import {P} from './palette';

export const S03Estomago: React.FC<{lw: LW}> = ({lw}) => {
  const f = useCurrentFrame();
  const xr = prog(f, lw(29), lw(30) + 6, E.out);
  const work = prog(f, lw(32), lw(34), E.out);
  const slow = prog(f, lw(38), lw(47), E.inOut);
  const speed = lerp(1, 0.2, slow);
  const zoom = lerp(1.25, 1.45, prog(f, 0, lw(47)));
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, transformOrigin: '540px 560px', transform: `scale(${zoom})`}}>
        <Dining f={f} sleepy={0.4 + 0.4 * slow} table={false} />
        <Glow x={540} y={560} r={260} color={P.honey} opacity={0.4 * work} />
        <Person x={540} s={0.9} foot={1220} expression="relief" blink={0.6 + 0.25 * slow} breath={0.3 + 0.25 * Math.sin(f * 0.12 * speed)} xray={xr} id="c3"
          inside={<g transform="translate(118 330) scale(0.62)"><Stomach frame={f} churn={0.3 + 0.7 * work} fill={0.6} glow={work} id="st3" /></g>} />
        <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
          {Array.from({length: 8}, (_, i) => {
            const side = i % 2 ? 1 : -1, y = 380 + (i >> 1) * 90;
            const t = ((f * 0.04 * speed + i * 0.17) % 1);
            return <line key={i} x1={540 + side * (190 + t * 140)} y1={y} x2={540 + side * (240 + t * 140)} y2={y} stroke={P.cloth} strokeWidth={6} strokeLinecap="round" opacity={(1 - slow) * 0.7 * Math.sin(t * Math.PI)} />;
          })}
        </svg>
      </div>
      <Vig />
    </AbsoluteFill>
  );
};
