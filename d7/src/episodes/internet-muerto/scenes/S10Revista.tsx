/**
 * ESCENA 10 · "Hasta la revista The Atlantic escribió que la teoría era falsa… pero que se sentía cierta."
 * Cambio de luz y de materia: escritorio cálido, papel. La revista cae sobre la mesa y la cámara se acerca.
 * Dos citas editoriales se montan sobre la página: "falsa" (tachado) y, tras un giro de la tarjeta, "se sentía cierta".
 * (El titular real no se reproduce: solo resumimos lo que escribió, como dice la narración.)
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {F} from '../../../dl/fonts';
import {E, clamp01, keys, prog, spr} from '../../../dl/motion';
import {MagazinePage} from '../../../dl/editorial/MagazinePage';
import {Glow, Sweep} from '../../../dl/light/Light';
import {MaskRise} from '../../../dl/type/Type';

export const S10Revista: React.FC<{lw: (i: number, off?: number) => number}> = ({lw}) => {
  const frame = useCurrentFrame();
  const drop = spr(frame, lw(72, -6), {damping: 13, stiffness: 90, mass: 1.2});
  const push = keys(frame, [[lw(74), 1], [lw(80), 1.12], [lw(87, 10), 1.2]], E.inOut);
  const cardIn = spr(frame, lw(80, -4), {damping: 14, stiffness: 150});
  const strike = prog(frame, lw(82, 4), lw(82, 14), E.out);
  const flip = prog(frame, lw(83, -2), lw(84, 6), E.inOut);
  const angle = flip * 180;
  const front = angle < 90;
  return (
    <AbsoluteFill style={{background: 'linear-gradient(170deg, #3A2618 0%, #1C120B 60%, #0E0906 100%)', overflow: 'hidden'}}>
      {/* veta de madera */}
      <svg width={1080} height={1200} style={{position: 'absolute', inset: 0, opacity: 0.25, mixBlendMode: 'overlay'}}>
        <filter id="wood"><feTurbulence type="fractalNoise" baseFrequency="0.004 0.08" numOctaves="3" seed="7" /></filter>
        <rect width="1080" height="1200" filter="url(#wood)" />
      </svg>
      <Glow x={760} y={160} r={700} color="rgba(255,190,120,0.30)" />
      <AbsoluteFill style={{transform: `scale(${push})`, transformOrigin: '540px 520px'}}>
        {/* sombra proyectada que se ajusta al caer */}
        <div style={{position: 'absolute', left: 170 + 40 * (1 - drop), top: 130 + 60 * (1 - drop), width: 760, height: 988, background: 'rgba(0,0,0,0.55)', filter: `blur(${30 + 40 * (1 - drop)}px)`, transform: `rotate(${-4 + 10 * (1 - drop)}deg)`}} />
        <div style={{position: 'absolute', left: 160, top: 90 - 700 * (1 - drop), transform: `rotate(${-4 + 14 * (1 - drop)}deg) scale(${1 + 0.15 * (1 - drop)})`}}>
          <MagazinePage masthead="The Atlantic" kicker="TECNOLOGÍA · 2021" headline={<span style={{display: 'block', height: 190}}><span style={{display: 'block', height: 26, width: '92%', background: '#1E1A14', opacity: 0.8, marginBottom: 18}} /><span style={{display: 'block', height: 26, width: '78%', background: '#1E1A14', opacity: 0.8, marginBottom: 18}} /><span style={{display: 'block', height: 26, width: '60%', background: '#1E1A14', opacity: 0.8}} /></span>} />
          <Sweep k={prog(frame, lw(72, 6), lw(76, 10), E.inOut)} color="rgba(255,240,210,0.22)" />
        </div>
      </AbsoluteFill>

      {/* tarjeta de cita que gira: "falsa" → "se sentía cierta" */}
      {frame >= lw(80, -4) && (
        <AbsoluteFill style={{perspective: 1600}}>
          <div style={{position: 'absolute', left: 110, top: 560, width: 860, height: 300, transform: `translateY(${(1 - cardIn) * 120}px) rotateY(${angle}deg)`, transformStyle: 'preserve-3d', opacity: clamp01(cardIn * 1.5)}}>
            <div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', display: front ? 'flex' : 'none', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#14110D', borderRadius: 18, boxShadow: '0 40px 80px rgba(0,0,0,0.6)'}}>
              <div style={{fontFamily: F.mono, fontSize: 30, letterSpacing: '0.3em', color: '#E7B98A'}}>LA TEORÍA ERA…</div>
              <div style={{position: 'relative', fontFamily: F.serif, fontSize: 170, lineHeight: 1, color: '#F4EFE4', marginTop: 8}}>
                «falsa»
                <div style={{position: 'absolute', left: -10, right: -10, top: '55%', height: 10, background: '#D2452B', transform: `scaleX(${strike})`, transformOrigin: 'left'}} />
              </div>
            </div>
            <div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', display: front ? 'none' : 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#D2452B', borderRadius: 18, boxShadow: '0 40px 80px rgba(0,0,0,0.6)'}}>
              <div style={{fontFamily: F.mono, fontSize: 30, letterSpacing: '0.3em', color: '#2A0C06'}}>…PERO</div>
              <MaskRise frame={frame} at={lw(85, -2)} by="word" text="se sentía cierta" each={3} style={{fontFamily: F.serif, fontStyle: 'italic', fontSize: 118, lineHeight: 1.05, color: '#FFF4E8'}} />
            </div>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
