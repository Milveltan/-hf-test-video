/**
 * ESCENA 4 · "son microsueños, segundos en los que parpadeas… y ya no estabas ahí."
 * Vista en primera persona de la sala de madrugada con párpados que pesan. En "parpadeas" se cierran; al abrir, el reloj saltó y la taza se volcó.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Sala} from '../../../dl/environments/Home';
import {MaskRise} from '../../../dl/type/Type';
import {F} from '../../../dl/fonts';
import {Clock24, LW, Vig, lerp, prog} from './common';
import {P} from './palette';

export const S04Microsueno: React.FC<{lw: LW}> = ({lw}) => {
  const f = useCurrentFrame();
  const closeAt = lw(43), openAt = lw(44, 6);
  const heavy = 0.12 + 0.1 * Math.sin(f * 0.09);
  const shut = f >= closeAt + 6 && f < openAt ? 1 : f < closeAt + 6 ? heavy + (1 - heavy) * prog(f, closeAt, closeAt + 6) : 1 - prog(f, openAt, openAt + 8);
  const jumped = f >= openAt;
  const sway = Math.sin(f * 0.05) * 14 + (jumped ? 0 : prog(f, 0, closeAt) * 24);
  const lid = 600 * shut;
  return (
    <AbsoluteFill style={{overflow: 'hidden', background: '#000'}}>
      <div style={{position: 'absolute', inset: 0, transformOrigin: '540px 600px', transform: `scale(1.08) rotate(${sway * 0.08}deg) translateY(${sway * 0.4}px)`, filter: `blur(${shut * 6}px)`}}>
        <Sala f={f} lit={0.35} />
        <div style={{position: 'absolute', inset: 0, background: `radial-gradient(60% 50% at 50% 70%, ${P.screen}33, transparent 70%)`}} />
        <Clock24 x={900} y={500} r={90} turns={jumped ? 0.72 : 0.66} />
        {/* mesa con taza */}
        <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
          <rect x={170} y={980} width={740} height={40} rx={10} fill="#3A2A20" /><rect x={170} y={1016} width={740} height={200} fill="#22180F" />
          <g transform={jumped ? 'translate(520 952) rotate(95)' : 'translate(520 940)'}>
            <rect x={-46} y={-70} width={92} height={110} rx={14} fill={P.cream} /><path d="M46 -40 q40 0 40 30 q0 30 -40 30" stroke={P.cream} strokeWidth={14} fill="none" />
          </g>
          {jumped && <ellipse cx={640} cy={994} rx={190} ry={18} fill="#5A3518" opacity={0.95} />}
        </svg>
      </div>
      <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: lid, background: '#000', borderBottomLeftRadius: '50% 120px', borderBottomRightRadius: '50% 120px'}} />
      <div style={{position: 'absolute', left: 0, bottom: 0, width: 1080, height: lid, background: '#000', borderTopLeftRadius: '50% 120px', borderTopRightRadius: '50% 120px'}} />
      <div style={{position: 'absolute', left: 0, width: 1080, top: 110, display: 'flex', justifyContent: 'center', fontFamily: F.display, fontSize: 120, color: P.text, textShadow: `0 0 40px ${P.screen}`, opacity: 1 - prog(f, closeAt - 6, closeAt)}}>
        <MaskRise frame={f} at={lw(38)} text="MICROSUEÑO" each={1} from="center" />
      </div>
      <Vig k={0.7} />
    </AbsoluteFill>
  );
};
