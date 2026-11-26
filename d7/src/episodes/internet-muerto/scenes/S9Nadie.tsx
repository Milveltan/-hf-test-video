/**
 * ESCENA 9 · "Casi nadie lo tomó en serio."
 * Un teléfono en mano: el hilo de la teoría aparece en el feed y un pulgar lo desliza sin detenerse;
 * el scroll con inercia lo entierra entre otras publicaciones.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {F} from '../../../dl/fonts';
import {E, inertia, keys, prog, spr} from '../../../dl/motion';
import {PhoneFrame} from '../../../dl/ui/Social';
import {HumanFace} from '../../../dl/characters/Avatars';
import {MaskRise} from '../../../dl/type/Type';
import {P} from './palette';

const Row: React.FC<{hue: number; img?: boolean}> = ({hue, img}) => (
  <div style={{margin: '0 22px 22px', padding: 22, borderRadius: 22, background: '#101C27'}}>
    <div style={{display: 'flex', gap: 14, alignItems: 'center'}}>
      <div style={{width: 60, height: 60, borderRadius: 30, overflow: 'hidden'}}><HumanFace hue={hue} size={60} /></div>
      <div style={{height: 13, width: 140, borderRadius: 6, background: '#C9D6E0'}} />
    </div>
    <div style={{height: 11, width: '90%', borderRadius: 5, background: '#5E7486', marginTop: 16, opacity: 0.6}} />
    <div style={{height: 11, width: '65%', borderRadius: 5, background: '#5E7486', marginTop: 10, opacity: 0.6}} />
    {img && <div style={{height: 200, borderRadius: 14, marginTop: 16, background: `linear-gradient(${hue}deg, hsl(${hue} 55% 40%), hsl(${(hue + 80) % 360} 55% 22%))`}} />}
  </div>
);

const Thread = () => (
  <div style={{margin: '0 22px 22px', padding: 24, borderRadius: 22, background: '#0E211A', border: `2px solid ${P.phosphor}`}}>
    <div style={{fontFamily: F.mono, fontSize: 18, color: P.phosphor, letterSpacing: '0.1em'}}>FORO · ILLUMINATIPIRATE</div>
    <div style={{fontFamily: F.grotesk, fontWeight: 700, fontSize: 32, lineHeight: 1.1, color: '#E9FFF2', marginTop: 10}}>Dead Internet Theory: Most Of The Internet Is Fake</div>
    <div style={{fontFamily: F.mono, fontSize: 18, color: '#8FB8A2', marginTop: 12}}>♥ 0 · ↺ 0</div>
  </div>
);

export const S9Nadie: React.FC<{lw: (i: number, off?: number) => number}> = ({lw}) => {
  const frame = useCurrentFrame();
  const swipe = lw(69, -4);
  const scroll = inertia(frame, [{at: 0, v: 9, k: 0.12}, {at: swipe, v: 78, k: 0.08}]);
  const thumb = prog(frame, swipe - 8, swipe + 8, E.inOut);
  const phoneIn = spr(frame, 0, {damping: 16, stiffness: 120});
  const tilt = keys(frame, [[0, -8], [52, 4]], E.inOut);
  return (
    <AbsoluteFill style={{background: `radial-gradient(80% 70% at 50% 40%, #13202B, ${P.void} 75%)`, overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 290, top: 120 + (1 - phoneIn) * 500, transform: `rotate(${tilt}deg)`, transformOrigin: '250px 900px'}}>
        <PhoneFrame width={500}>
          <div style={{position: 'absolute', left: 0, right: 0, top: 120 - scroll}}>
            <Row hue={20} img />
            <Row hue={200} />
            <Thread />
            <Row hue={320} img />
            <Row hue={90} />
            <Row hue={150} img />
            <Row hue={260} />
            <Row hue={40} img />
            <Row hue={180} img />
          </div>
        </PhoneFrame>
      </div>
      {/* pulgar que desliza */}
      <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
        <path d={`M${660 + 40 * thumb} ${1250 - 30 * Math.sin(Math.PI * thumb)} q 40 -260 -40 ${-330 - 220 * thumb + 120} q -80 -40 -120 40 q -40 160 -20 520 z`} fill="#C99272" opacity={keys(frame, [[swipe - 14, 0], [swipe - 8, 1], [swipe + 14, 1], [swipe + 22, 0]])} />
      </svg>
      <div style={{position: 'absolute', left: 70, top: 260, width: 300}}>
        <MaskRise frame={frame} at={lw(66, -2)} by="word" text="casi nadie" each={3} style={{fontFamily: F.serif, fontStyle: 'italic', fontSize: 96, lineHeight: 1, color: P.cream, whiteSpace: 'normal'}} />
      </div>
    </AbsoluteFill>
  );
};
