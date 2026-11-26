/**
 * ESCENA 10 · "Enciende una alarma y tensa todos tus músculos para atraparte."
 * El cerebro se enciende en rojo con ondas de alarma; rayos nerviosos bajan al cuerpo. En "tensa" cada extremidad
 * se ilumina y el cuerpo se pone rígido; en "atraparte" los brazos se abren de golpe para agarrarse.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {E, prog} from '../../../dl/motion';
import {Brain} from '../../../dl/anatomy/Anatomy';
import {HumanRig, POSES, mixPose} from '../../../dl/characters/HumanRig';
import {Glow} from '../../../dl/light/Light';
import {Flash} from '../../../dl/fx/Fx';
import {BodyLights, Night, NODES, place, shakeXY} from './common';
import {P, SLEEPER} from './palette';

const BS = 0.62, BX = 540, BY = 1150; // cuerpo: pies en (BX, BY)
const toScreen = ([x, y]: [number, number]): [number, number] => [BX + (x - 200) * BS, BY + (y - 940) * BS];

export const S10Alarma: React.FC<{lw: (i: number, off?: number) => number}> = ({lw}) => {
  const f = useCurrentFrame();
  const alarm = prog(f, lw(121, -3), lw(121, 3));
  const tense = prog(f, lw(123, -2), lw(123, 4), E.out);
  const grab = prog(f, lw(128, -3), lw(128, 4), E.back);
  const pose = mixPose(mixPose(POSES.idle, {shL: 20, shR: -20, elL: -40, elR: 40, hipL: 4, hipR: -4}, tense), {shL: 95, shR: -95, elL: -15, elR: 15, hipL: 8, hipR: -8, knL: 10, knR: -10}, grab);
  const bolts = prog(f, lw(122), lw(123, 2));
  const [dx, dy] = shakeXY(f, Math.max(0, 1 - Math.abs(f - lw(123, 2)) / 8), 16);
  const lv = tense * (0.75 + 0.25 * Math.sin(f * 0.9));
  return (
    <AbsoluteFill style={{overflow: 'hidden', transform: `translate(${dx}px, ${dy}px)`}}>
      <Night frame={f} />
      <Glow x={540} y={200} r={380} color={P.alarm} opacity={0.15 + alarm * 0.45 * (0.7 + 0.3 * Math.sin(f * 0.8))} />
      <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
        {[0, 1, 2].map((i) => {
          const r = ((f - lw(121) + i * 12) % 36) / 36;
          return alarm > 0 ? <circle key={i} cx={540} cy={200} r={120 + r * 320} fill="none" stroke={P.alarm} strokeWidth={6} opacity={alarm * (1 - r) * 0.7} /> : null;
        })}
        {NODES.slice(1).map((n, i) => {
          const [x, y] = toScreen(n);
          const k = Math.min(1, Math.max(0, bolts * 1.6 - i * 0.12));
          const mx = (540 + x) / 2 + Math.sin(f * 0.9 + i) * 30;
          return k > 0 ? <path key={i} d={`M540 300 L${mx} ${(300 + y) / 2} L${x} ${y}`} stroke={P.alarm} strokeWidth={5} fill="none" strokeDasharray={900} strokeDashoffset={900 * (1 - k)} style={{filter: `drop-shadow(0 0 10px ${P.alarm})`}} opacity={0.9} /> : null;
        })}
      </svg>
      <div style={place(0.72, 210, 180, 540, 200)}><Brain frame={f} highlight="all" color={alarm > 0.5 ? '#FF8E9C' : '#F2B6A0'} scale={0.72} /></div>
      <div style={place(BS, 200, 940, BX, BY)}>
        <svg width={400 * BS} height={960 * BS} viewBox="0 0 400 960" style={{overflow: 'visible'}}>
          <HumanRig id="s10" person={SLEEPER} pose={pose} expression={tense > 0.3 ? 'strain' : 'neutral'} rim={P.alarm} />
          <BodyLights levels={[0, lv, lv, lv, lv, lv]} color={P.alarm} frame={f} />
        </svg>
      </div>
      <Flash k={Math.max(0, 1 - Math.abs(f - lw(121)) / 5) * 0.25} color={P.alarm} />
    </AbsoluteFill>
  );
};
