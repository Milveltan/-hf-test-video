/**
 * ESCENA 4 · "Pero entras a un súper y ahí está, junto a la caja, con otro nombre."
 * Pasillo cálido de supermercado que avanza hacia la caja; en "ahí está" un huevo de dos mitades brilla en el exhibidor;
 * en "otro nombre" su etiqueta da la vuelta y cambia (signo de pregunta).
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Glow} from '../../../dl/light/Light';
import {F} from '../../../dl/fonts';
import {spr} from '../../../dl/motion';
import {E, LW, SplitEgg, Vig, lerp, prog} from './common';
import {P} from './palette';

export const S04Super: React.FC<{lw: LW}> = ({lw}) => {
  const f = useCurrentFrame();
  const walk = prog(f, 0, lw(35), E.inOut);
  const zoom = lerp(1, 1.35, walk);
  const hero = spr(f, lw(35), {damping: 11, stiffness: 150});
  const flip = prog(f, lw(41), lw(42) + 4, E.inOut);
  const shelfColors = ['#E85D4A', '#F2B134', '#3FA7D6', '#59C08A', '#C46BD8'];
  return (
    <AbsoluteFill style={{overflow: 'hidden', background: '#F1E6D2'}}>
      <div style={{position: 'absolute', inset: 0, transformOrigin: '470px 540px', transform: `scale(${zoom})`}}>
        <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
          <rect width={1080} height={1200} fill="#EFE3CB" />
          {Array.from({length: 6}, (_, i) => <rect key={i} x={140 + i * 150} y={40} width={90} height={14} rx={7} fill="#FFFFFF" opacity={0.9} />)}
          {/* estanterías laterales */}
          {[0, 1].map((side) => Array.from({length: 4}, (_, row) => (
            <g key={`${side}-${row}`}>
              <rect x={side ? 820 : 0} y={160 + row * 170} width={260} height={16} fill="#B9A27C" />
              {Array.from({length: 5}, (_, k) => <rect key={k} x={(side ? 830 : 10) + k * 50} y={90 + row * 170} width={42} height={70} rx={6} fill={shelfColors[(k + row + side) % 5]} />)}
            </g>
          )))}
          <rect y={860} width={1080} height={340} fill="#CDBB98" />
          {/* caja registradora */}
          <rect x={300} y={600} width={480} height={260} rx={14} fill="#3A4656" />
          <rect x={300} y={590} width={480} height={30} rx={8} fill="#5A6676" />
          <rect x={560} y={470} width={180} height={120} rx={10} fill="#1F2833" /><rect x={575} y={485} width={150} height={70} rx={6} fill={P.scan} opacity={0.6} />
          {/* exhibidor junto a la caja */}
          <rect x={330} y={470} width={200} height={130} rx={10} fill="#C8423A" />
        </svg>
        <Glow x={430} y={500} r={200} color="#FFD27A" opacity={0.5 * hero} />
        <div style={{position: 'absolute', left: 430 - 93, top: 452, transform: `scale(${1 + 0.15 * hero})`, transformOrigin: '50% 100%'}}><SplitEgg s={0.3} /></div>
        {/* etiqueta que gira */}
        <div style={{position: 'absolute', left: 350, top: 560, width: 160, height: 34, perspective: 400}}>
          <div style={{width: '100%', height: '100%', borderRadius: 6, background: flip < 0.5 ? P.cream : P.capsule, transform: `rotateX(${flip * 360}deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.display, fontSize: 30, color: P.ink}}>{flip < 0.5 ? 'HUEVO' : '¿ ? ? ?'}</div>
        </div>
      </div>
      <Vig k={0.45} />
    </AbsoluteFill>
  );
};
