/**
 * ESCENA 5 · "Tu ánimo cambia: todo te irrita y el cuerpo pide azúcar."
 * La persona se tensa y se enrojece; notificaciones la bombardean (coral). En "azúcar" dulces brillantes vuelan y orbitan; los mira.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Glow} from '../../../dl/light/Light';
import {Flash} from '../../../dl/fx/Fx';
import {spr} from '../../../dl/motion';
import {POSES, mixPose} from '../../../dl/characters/HumanRig';
import {E, LW, NightBg, Person, Vig, lerp, prog} from './common';
import {P} from './palette';

const Sweet: React.FC<{kind: number}> = ({kind}) => (
  <svg width={130} height={130} viewBox="-65 -65 130 130" style={{overflow: 'visible'}}>
    {kind === 0 && <g><circle r={52} fill="#E8A35C" /><circle r={46} fill={P.sugar} /><circle r={16} fill="#E8A35C" />{[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={Math.cos(i) * 30 - 4} y={Math.sin(i * 1.7) * 30 - 2} width={8} height={4} rx={2} fill={['#FFF', '#5BE3A0', '#FFE27A'][i % 3]} transform={`rotate(${i * 40})`} />)}</g>}
    {kind === 1 && <g><rect x={-38} y={-38} width={76} height={76} rx={10} fill="#FFFFFF" /><rect x={-38} y={-38} width={76} height={20} rx={8} fill="#E6ECF5" /></g>}
    {kind === 2 && <g><path d="M-58 -16 l-14 -16 v64 l14 -16 z M58 -16 l14 -16 v64 l14 -16 z" fill={P.amber} /><ellipse rx={58} ry={34} fill={P.coral} /><path d="M-30 -20 q30 40 60 0" stroke="#FFF" strokeWidth={6} fill="none" opacity={0.6} /></g>}
  </svg>
);

export const S05Animo: React.FC<{lw: LW}> = ({lw}) => {
  const f = useCurrentFrame();
  const irr = prog(f, lw(52), lw(54) + 4, E.out);
  const sugar = prog(f, lw(57), lw(59) + 4, E.out);
  const hit = f >= lw(54) && f < lw(54) + 6 ? 0.3 * (1 - (f - lw(54)) / 6) : 0;
  const shake = irr * (1 - sugar) * Math.sin(f * 2.3) * 4;
  const pose = mixPose(mixPose(POSES.idle, {shL: 30, elL: -110, shR: -30, elR: 110}, irr * (1 - sugar)), {shR: -60, elR: 40, shL: 8}, sugar);
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <NightBg f={f} tint={irr > 0.3 && sugar < 0.5 ? '#3A1420' : '#12283A'} />
      <Glow x={540} y={500} r={480} color={sugar > 0.3 ? P.sugar : P.coral} opacity={0.25 * Math.max(irr, sugar)} />
      <div style={{position: 'absolute', inset: 0, transform: `translateX(${shake}px)`}}>
        <Person x={540} s={1.05} foot={1360} pose={pose} expression={sugar > 0.4 ? 'surprise' : irr > 0.2 ? 'tense' : 'neutral'} flush={irr * 0.9} blink={0.35} look={sugar > 0.4 ? Math.sin(f * 0.1) : 0} id="s5" />
      </div>
      {/* notificaciones */}
      {[[200, 300, 0], [860, 250, 1], [150, 620, 2], [900, 560, 3], [520, 140, 4]].map(([x, y, i]) => {
        const k = spr(f, lw(53) + i * 3, {damping: 10, stiffness: 200}) * (1 - sugar);
        return k > 0.01 ? (
          <div key={i} style={{position: 'absolute', left: x - 70, top: y - 50, width: 140, height: 100, borderRadius: 26, background: P.coral, transform: `scale(${k}) rotate(${(i - 2) * 6}deg)`, boxShadow: `0 0 30px ${P.coral}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 60, fontWeight: 900, color: '#FFF', fontFamily: 'Anton, sans-serif'}}>!</div>
        ) : null;
      })}
      {/* dulces orbitando */}
      {sugar > 0.01 && Array.from({length: 6}, (_, i) => {
        const a = f * 0.04 + (i / 6) * Math.PI * 2;
        const R = lerp(2.4, 1, sugar);
        const x = 540 + Math.cos(a) * 400 * R, y = 430 + Math.sin(a) * 310 * R;
        return <div key={i} style={{position: 'absolute', left: x - 65, top: y - 65, transform: `rotate(${f * 2 + i * 40}deg) scale(${0.9 + 0.2 * Math.sin(a)})`, filter: `drop-shadow(0 0 18px ${P.sugar})`}}><Sweet kind={i % 3} /></div>;
      })}
      <Flash k={hit} color={P.coral} />
      <Vig />
    </AbsoluteFill>
  );
};
