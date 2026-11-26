/**
 * ESCENA 4 · "La llamó: la teoría del internet muerto."
 * Fondo: red de nodos de Opus (node-network) viva. Un trazo de electrocardiograma recorre el cuadro
 * latiendo con la voz; en "muerto" se aplana, se vuelve rojo, revela la palabra y la red se apaga
 * en onda desde el punto donde murió el pulso.
 */
import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame} from 'remotion';
import {nodeNetwork} from '../../../opus-motion';
import {F} from '../../../dl/fonts';
import {E, clamp01, keys, noise1, prog, spr, stagger} from '../../../dl/motion';
import {P} from './palette';
import {EcgTrace, ecgHead} from '../../../dl/data/EcgTrace';

const BASE_Y = 640;

export const S4Muerto: React.FC<{lw: (i: number, off?: number) => number}> = ({lw}) => {
  const frame = useCurrentFrame();
  const teoriaAt = lw(34);
  const internetAt = lw(36);
  const muertoAt = lw(37);
  const beats = [lw(31, 4), lw(34, 2), lw(36, 1)];
  const XB = [210, 450, 690];
  const X_FLAT = 790;

  const BEATS = beats.map((at, i) => ({at, x: XB[i]}));
  const FLAT = {at: muertoAt, x: X_FLAT};
  const headX = ecgHead(frame, BEATS, FLAT);
  const dead = frame >= muertoAt;

  // muerte de la red
  const death = prog(frame, muertoAt, muertoAt + 40, E.out);
  const shake = dead ? noise1(frame * 0.9, 5) * 8 * (1 - prog(frame, muertoAt, muertoAt + 18)) : 0;
  const push = 1 + 0.07 * prog(frame, 0, 120, E.inOut);

  const T1 = 'LA TEORÍA DEL';
  const T2 = 'INTERNET';
  const T3 = 'MUERTO';

  return (
    <AbsoluteFill style={{background: P.void, overflow: 'hidden'}}>
      <AbsoluteFill style={{transform: `translate(${shake}px, ${shake * 0.5}px) scale(${push})`}}>
        {/* red de nodos (Opus) ya crecida, ampliada para dejar fuera sus contadores */}
        <AbsoluteFill style={{transform: 'scale(1.55) translate(-110px, 70px)', opacity: 0.62, filter: `grayscale(${death}) brightness(${1 - 0.55 * death})`}}>
          <Sequence from={-150} layout="none">
            <nodeNetwork.component
              {...nodeNetwork.defaultProps}
              title=""
              count={96}
              clusters={3}
              seed={21}
              growthCurve="linear"
              highlightPath={false}
              nodesLabel=""
              linksLabel=""
              potentialLabel=""
              background={P.void}
              colors={['#39FF8E', '#7FE3FF', '#2BB673']}
              linkColor="#3E7F67"
              accent={P.alarm}
              drift={1.4}
            />
          </Sequence>
        </AbsoluteFill>
        {/* onda de oscuridad que se expande desde donde murió el pulso */}
        <AbsoluteFill style={{background: `radial-gradient(circle at ${X_FLAT}px ${BASE_Y}px, rgba(3,6,10,0.92) ${death * 140}%, rgba(3,6,10,0) ${death * 140 + 25}%)`, opacity: dead ? 1 : 0}} />
        <AbsoluteFill style={{background: `radial-gradient(70% 60% at 50% 50%, transparent 30%, ${P.void} 95%)`}} />
        <AbsoluteFill style={{background: `linear-gradient(180deg, ${P.void} 0%, rgba(3,6,10,0.85) 12%, rgba(3,6,10,0) 30%)`}} />

        <EcgTrace frame={frame} y={BASE_Y} beats={BEATS} flat={FLAT} />

        {/* "la teoría del" — editorial, letras que suben desde una máscara */}
        <div style={{position: 'absolute', left: 0, right: 0, top: 215, textAlign: 'center', fontFamily: F.serif, fontStyle: 'italic', fontSize: 92, color: P.cream, letterSpacing: '0.01em'}}>
          {T1.split('').map((ch, i) => {
            const k = spr(frame, teoriaAt - 6 + stagger(i, T1.length, 0.9), {damping: 15, stiffness: 170});
            return (
              <span key={i} style={{display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom'}}>
                <span style={{display: 'inline-block', transform: `translateY(${(1 - k) * 110}%)`, whiteSpace: 'pre'}}>{ch.toLowerCase()}</span>
              </span>
            );
          })}
        </div>

        {/* "INTERNET" — golpe letra por letra con resorte */}
        <div style={{position: 'absolute', left: 0, right: 0, top: 375, textAlign: 'center', fontFamily: F.display, fontSize: 228, lineHeight: 1, color: P.cream, textShadow: '0 18px 50px rgba(0,0,0,0.9)'}}>
          {T2.split('').map((ch, i) => {
            const at = internetAt - 3 + stagger(i, T2.length, 1.6);
            const k = spr(frame, at, {damping: 12, stiffness: 210, mass: 0.7});
            const on = frame >= at;
            const dim = dead ? 1 - 0.45 * prog(frame, muertoAt + 4 + i * 2, muertoAt + 24 + i * 2) : 1;
            return (
              <span key={i} style={{display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', paddingTop: 10}}>
                <span style={{display: 'inline-block', opacity: on ? dim : 0, transform: `translateY(${(1 - k) * 105}%)`}}>{ch}</span>
              </span>
            );
          })}
        </div>

        {/* "MUERTO" — se revela detrás del pulso plano y cae con gravedad */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 690,
            textAlign: 'center',
            fontFamily: F.display,
            fontSize: 262,
            lineHeight: 1,
            color: P.alarm,
            textShadow: `0 0 ${40 + 20 * Math.sin(frame * 0.4)}px rgba(255,59,59,0.45), 0 20px 50px rgba(0,0,0,0.9)`,
            clipPath: `inset(0 ${Math.max(0, 1080 - (headX - 60)) / 10.8}% 0 0)`,
            opacity: dead ? 1 : 0,
          }}
        >
          {T3.split('').map((ch, i) => {
            const fall = prog(frame, muertoAt + 14 + stagger(i, T3.length, 3, 'center'), muertoAt + 30 + stagger(i, T3.length, 3, 'center'), E.in);
            const settle = spr(frame, muertoAt + 30 + stagger(i, T3.length, 3, 'center'), {damping: 8, stiffness: 200});
            const y = fall * 22 - (frame > muertoAt + 30 ? (1 - settle) * 10 : 0);
            return (
              <span key={i} style={{display: 'inline-block', transform: `translateY(${y}px) rotate(${(i - 2.5) * fall * 1.2}deg)`}}>
                {ch}
              </span>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
