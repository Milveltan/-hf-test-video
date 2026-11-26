/**
 * ESCENA 11 · "Es un reflejo antiguo… el mismo que usan las focas y las ballenas para sumergirse."
 * Cambio de mundo: bajo el mar, un apneísta se desliza; en "focas" cruza una foca y en "ballenas" una jorobada
 * enorme pasa al fondo. En "sumergirse" la cámara desciende y el agua se oscurece.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {F} from '../../../dl/fonts';
import {E, lerp, prog} from '../../../dl/motion';
import {Underwater, GodRays} from '../../../dl/nature/Nature';
import {Whale, Seal} from '../../../dl/nature/Marine';
import {HumanRig, POSES} from '../../../dl/characters/HumanRig';
import {MaskRise} from '../../../dl/type/Type';
import {DIVER, P} from './palette';

export const S11Ballenas: React.FC<{lw: (i: number, off?: number) => number}> = ({lw}) => {
  const f = useCurrentFrame();
  const dive = prog(f, lw(138), lw(140, 6), E.in);
  const depth = lerp(0.25, 0.62, prog(f, 0, lw(140, 6), E.inOut));
  const camY = -dive * 260;
  const sealX = lerp(-560, 1120, prog(f, lw(132), lw(140, 6), E.sine));
  const whaleX = lerp(-1350, 260, prog(f, lw(128), lw(140, 10), E.out));
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <Underwater frame={f} depth={depth} bubbles={26} />
      <div style={{position: 'absolute', inset: 0, transform: `translateY(${camY * 0.3}px)`}}><GodRays frame={f} x={540} y={-120} color="#CFF7FF" opacity={0.1 * (1 - depth)} /></div>
      {/* ballena (fondo) */}
      <div style={{position: 'absolute', left: whaleX, top: 230 + camY * 0.5, opacity: 0.85, filter: 'blur(1.5px)'}}>
        <Whale frame={f} scale={1.5} color="#16314A" belly="#47708C" />
      </div>
      {/* apneísta (plano medio) */}
      <div style={{position: 'absolute', left: lerp(260, 420, prog(f, 0, lw(140, 10), E.linear)), top: 560 + camY + Math.sin(f * 0.08) * 8, transform: 'rotate(78deg)', transformOrigin: '0 0'}}>
        <HumanRig id="s11" person={DIVER} pose={POSES.handsUp} expression="eyesClosed" cheeks={0.4} scale={0.62} rim="#CFF7FF" shadow={false} />
      </div>
      {/* foca (primer plano) */}
      <div style={{position: 'absolute', left: sealX, top: 790 + camY * 1.2 + Math.sin(f * 0.1) * 14, transform: 'rotate(-6deg)'}}>
        <Seal frame={f} scale={1.25} />
      </div>
      <AbsoluteFill style={{background: '#000814', opacity: dive * 0.35}} />
      <div style={{position: 'absolute', left: 70, top: 150}}>
        <div style={{fontFamily: F.mono, fontSize: 30, letterSpacing: '0.24em', color: '#CFF7FF', opacity: prog(f, lw(126), lw(127))}}>MAMÍFEROS</div>
        <MaskRise frame={f} at={lw(127)} by="word" each={4} text="REFLEJO DE INMERSIÓN" style={{fontFamily: F.cond, fontWeight: 700, fontSize: 74, lineHeight: 1, color: P.bone, textShadow: '0 4px 24px rgba(0,0,0,0.5)'}} />
      </div>
    </AbsoluteFill>
  );
};
