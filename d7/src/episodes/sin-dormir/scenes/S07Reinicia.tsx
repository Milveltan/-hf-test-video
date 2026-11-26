/**
 * ESCENA 7 · "Dormir es lo que los reinicia."
 * La persona por fin duerme (acostada); la noche se vuelve amanecer, el cerebro se enciende y las baterías se llenan en verde.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Sky} from '../../../dl/nature/Nature';
import {Brain} from '../../../dl/anatomy/Anatomy';
import {Glow, GodRaysWrap} from './glow';
import {MaskRise} from '../../../dl/type/Type';
import {F} from '../../../dl/fonts';
import {Battery, E, LW, Person, Vig, lerp, prog} from './common';
import {P} from './palette';

export const S07Reinicia: React.FC<{lw: LW}> = ({lw}) => {
  const f = useCurrentFrame();
  const dawn = prog(f, lw(77), lw(81) + 20, E.inOut);
  const fill = prog(f, lw(79), lw(81) + 16, E.inOut);
  const end = prog(f, lw(81) + 30, lw(81) + 46, E.in);
  return (
    <AbsoluteFill style={{overflow: 'hidden', background: P.night}}>
      <div style={{position: 'absolute', inset: 0}}><Sky frame={f} t={lerp(0.02, 0.3, dawn)} clouds={4} /></div>
      <GodRaysWrap f={f} k={dawn} />
      {/* cama */}
      <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
        <rect x={120} y={860} width={840} height={70} rx={20} fill="#E7E2F4" /><rect x={100} y={920} width={880} height={110} rx={16} fill="#3B2D4A" />
        <rect x={140} y={808} width={200} height={70} rx={34} fill="#FFFFFF" />
      </svg>
      <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1200, transform: 'translate(-190px, 220px) rotate(-90deg)', transformOrigin: '540px 660px'}}>
        <Person x={540} s={0.6} foot={1100} expression="eyesClosed" breath={0.3 + 0.3 * Math.sin(f * 0.09)} id="s7" />
      </div>
      <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
        <path d="M330 830 C 500 790 760 800 960 850 L960 930 L330 930 Z" fill="#7A8BD8" /><path d="M330 830 C 500 790 760 800 960 850" stroke="#B3C0F2" strokeWidth={8} fill="none" />
      </svg>
      <Glow x={540} y={330} r={300 + dawn * 120} color={P.dawn} opacity={0.2 + 0.4 * dawn} />
      <div style={{position: 'absolute', left: 540 - 126, top: 190, filter: `saturate(${0.5 + dawn})`}}>
        <Brain frame={f} highlight={fill > 0.5 ? 'all' : 'none'} color="#F2B6A0" scale={0.6} id="b7" />
      </div>
      <Battery x={210} y={330} w={220} level={lerp(0.12, 1, fill)} label="CUERPO" />
      <Battery x={870} y={330} w={220} level={lerp(0.1, 1, fill)} label="CEREBRO" />
      <div style={{position: 'absolute', left: 0, width: 1080, top: 560, display: 'flex', justifyContent: 'center', fontFamily: F.serif, fontStyle: 'italic', fontSize: 96, color: P.cream, textShadow: '0 8px 30px rgba(0,0,0,0.75)'}}>
        <MaskRise frame={f} at={lw(80)} text="dormir te reinicia" by="word" each={4} />
      </div>
      <Vig k={0.5} />
      <AbsoluteFill style={{background: '#000', opacity: end}} />
    </AbsoluteFill>
  );
};
