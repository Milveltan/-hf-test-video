/**
 * ESCENA 2 · "Porque tu cuerpo cambia de modo. Deja el modo alerta y entra en modo descanso y digestión."
 * Un selector gigante de dos posiciones: ALERTA (rayo amarillo) → DESCANSO Y DIGESTIÓN (luna turquesa). La perilla gira y el fondo cambia de temperatura.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Glow} from '../../../dl/light/Light';
import {F} from '../../../dl/fonts';
import {spr} from '../../../dl/motion';
import {E, LW, Vig, lerp, prog} from './common';
import {P} from './palette';

export const S02Modo: React.FC<{lw: LW}> = ({lw}) => {
  const f = useCurrentFrame();
  const inK = spr(f, 0, {damping: 13, stiffness: 120});
  const turn = prog(f, lw(22), lw(25), E.inOut);
  const rest = prog(f, lw(25), lw(28), E.out);
  const ang = lerp(-50, 50, turn);
  const bg = `radial-gradient(80% 65% at 50% 45%, ${turn < 0.5 ? '#5A3A12' : '#123C44'}, ${P.night})`;
  const alertK = 1 - turn, calmK = turn;
  return (
    <AbsoluteFill style={{overflow: 'hidden', background: bg}}>
      <Glow x={540} y={600} r={520} color={turn < 0.5 ? P.alert : P.calm} opacity={0.3} />
      <div style={{position: 'absolute', inset: 0, transform: `scale(${lerp(0.7, 1, inK)})`, opacity: inK}}>
        <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
          <circle cx={540} cy={620} r={270} fill="#1C1A26" stroke="#3B3850" strokeWidth={16} />
          <path d="M540 620 m-230 -10 a230 230 0 0 1 120 -196" stroke={P.alert} strokeWidth={22} fill="none" opacity={0.3 + 0.7 * alertK} strokeLinecap="round" />
          <path d="M540 620 m230 -10 a230 230 0 0 0 -120 -196" stroke={P.calm} strokeWidth={22} fill="none" opacity={0.3 + 0.7 * calmK} strokeLinecap="round" />
          <g transform={`rotate(${ang} 540 620)`}>
            <circle cx={540} cy={620} r={150} fill="#E9E4F2" /><circle cx={540} cy={620} r={130} fill="#D2CCE0" />
            <rect x={528} y={470} width={24} height={110} rx={12} fill={P.ink} />
          </g>
          {/* rayo */}
          <path d="M290 330 l-40 90 h40 l-30 90 l90 -120 h-44 l34 -60 z" fill={P.alert} opacity={0.3 + 0.7 * alertK} style={{filter: alertK > 0.5 ? `drop-shadow(0 0 20px ${P.alert})` : undefined}} transform={`translate(-20 -60) rotate(${Math.sin(f * 0.6) * 4 * alertK} 300 400)`} />
          {/* luna */}
          <path d="M820 300 a70 70 0 1 0 60 100 a56 56 0 1 1 -60 -100 z" fill={P.calm} opacity={0.3 + 0.7 * calmK} style={{filter: calmK > 0.5 ? `drop-shadow(0 0 24px ${P.calm})` : undefined}} />
        </svg>
        <div style={{position: 'absolute', left: 70, top: 470, width: 300, fontFamily: F.display, fontSize: 56, color: P.alert, opacity: 0.35 + 0.65 * alertK}}>ALERTA</div>
        <div style={{position: 'absolute', left: 0, width: 1080, top: 940, textAlign: 'center', fontFamily: F.display, fontSize: 74, lineHeight: 1.05, color: P.calm, opacity: rest, transform: `translateY(${(1 - rest) * 30}px)`, textShadow: `0 0 30px ${P.calm}66`}}>DESCANSO Y DIGESTIÓN</div>
      </div>
      <Vig k={0.6} />
    </AbsoluteFill>
  );
};
