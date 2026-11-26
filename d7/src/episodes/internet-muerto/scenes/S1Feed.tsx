/**
 * ESCENA 1 · "¿Y si la mayoría de lo que ves en internet… no lo hizo una persona?"
 * Un feed infinito en perspectiva se desliza con inercia real (impulsos en "ves" e "internet");
 * en "no lo hizo una persona" los avatares giran uno a uno, en onda desde el centro, y revelan bots.
 * Cierra con el texto decodificado de Opus (text-scramble-decode) y un corte glitch.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {textScrambleDecode} from '../../../opus-motion';
import {F} from '../../../dl/fonts';
import {E, bounce, clamp01, inertia, keys, noise1, prog, rng, spr, stagger} from '../../../dl/motion';
import {P} from './palette';
import {CARD_GAP, CARD_W, FeedCard, makeCards} from '../../../dl/ui/FeedCard';
import {GlitchBands} from '../../../dl/transitions/GlitchBands';

const COLS = 3;
const ROWS = 9;
const CARDS = makeCards(COLS, ROWS);

export const S1Feed: React.FC<{w: (i: number, off?: number) => number}> = ({w}) => {
  const frame = useCurrentFrame();
  // impulsos de scroll: arranque, "ves", "internet"
  const scroll = inertia(frame, [
    {at: 0, v: 26},
    {at: w(7, -3), v: 30},
    {at: w(9, -2), v: 44},
  ]);
  // cámara: plano inclinado que se endereza y empuja cuando aparece la duda
  const doubt = prog(frame, w(10), w(14), E.inOut);
  const tiltX = 34 - 16 * doubt;
  const tiltZ = -12 + 7 * doubt;
  const push = 1 + 0.75 * doubt;
  const shake = frame > w(14) ? noise1(frame * 0.6, 3) * 3 : 0;

  const flipStart = w(11, 2);
  const textIn = w(13, 2);
  const exitGlitch = prog(frame, 112, 126, E.in);

  return (
    <AbsoluteFill style={{background: `radial-gradient(120% 90% at 50% 30%, #0B1824 0%, ${P.void} 70%)`, overflow: 'hidden'}}>
      {/* luz ambiental fría que barre el plano */}
      <AbsoluteFill style={{background: `radial-gradient(60% 40% at ${30 + 40 * prog(frame, 0, 120, E.sine)}% 20%, rgba(127,227,255,0.16), transparent 70%)`}} />
      <AbsoluteFill style={{perspective: 1500, perspectiveOrigin: '50% 35%'}}>
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: COLS * (CARD_W + 40),
            transformStyle: 'preserve-3d',
            transform: `translate(-50%, -48%) translate(${shake}px, ${shake * 0.6}px) scale(${push}) rotateX(${tiltX}deg) rotateZ(${tiltZ}deg)`,
          }}
        >
          <div style={{display: 'flex', gap: 40, alignItems: 'flex-start'}}>
            {CARDS.map((col, ci) => {
              const speed = [1, 1.28, 0.86][ci];
              const total = col.reduce((a, c) => a + c.h + CARD_GAP, 0);
              const y = -((scroll * speed + ci * 210) % total);
              return (
                <div key={ci} style={{transform: `translateY(${y}px)`}}>
                  {[...col, ...col].map((c, ri) => {
                    const idx = ci * ROWS + (ri % ROWS);
                    // onda de "bots" desde la columna central
                    const delay = stagger(ci, COLS, 4, 'center') + ((ri * 5) % 7) * 2;
                    const flip = prog(frame, flipStart + delay, flipStart + delay + 9, E.inOut);
                    return <FeedCard key={ri} c={c} flip={flip} frame={frame} idx={idx} />;
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>
      {/* niebla de profundidad: oscurece lo lejano (arriba) */}
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${P.void} 0%, rgba(3,6,10,0.75) 22%, rgba(3,6,10,0) 50%, rgba(3,6,10,0.35) 100%)`}} />

      {/* tipografía cinética: "LO QUE VES" */}
      <KineticVes frame={frame} at={w(5)} vesAt={w(7)} outAt={w(10, -4)} />

      {/* "¿UNA PERSONA?" decodificado con Opus Motion Library */}
      {frame >= textIn - 20 && (
        <AbsoluteFill style={{opacity: clamp01((frame - textIn + 4) / 6), background: `rgba(3,6,10,${0.55 * clamp01((frame - textIn + 8) / 10)})`}}>
          <AbsoluteFill style={{transform: 'translateY(-90px)'}}>
            <textScrambleDecode.component
              {...textScrambleDecode.defaultProps}
              text={'¿UNA PERSONA?'}
              eyebrow=""
              showProgress={false}
              charset="01#$%&@!?ABCDEFXYZ"
              order="center"
              size={150}
              weight={800}
              startAt={textIn - 4}
              revealFrames={9}
              scrambleEvery={1}
              exit="none"
              background="transparent"
              ink={P.cream}
              accent={P.alarm}
            />
          </AbsoluteFill>
        </AbsoluteFill>
      )}

      {/* corte glitch de salida */}
      {exitGlitch > 0 && <GlitchBands k={exitGlitch} frame={frame} />}
    </AbsoluteFill>
  );
};

const KineticVes: React.FC<{frame: number; at: number; vesAt: number; outAt: number}> = ({frame, at, vesAt, outAt}) => {
  if (frame < at - 2 || frame > outAt + 14) return null;
  const a = spr(frame, at, {damping: 16, stiffness: 160});
  const v = bounce(frame, vesAt);
  const out = prog(frame, outAt, outAt + 12, E.in);
  const split = (1 - clamp01((frame - vesAt) / 8)) * 14 * (frame >= vesAt ? 1 : 0);
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', transform: `translateY(${-140 - out * 220}px)`, opacity: 1 - out}}>
      <div style={{fontFamily: F.serif, fontStyle: 'italic', fontSize: 86, color: P.cream, opacity: a, transform: `translateY(${(1 - a) * 40}px)`, letterSpacing: '-0.01em', textShadow: '0 8px 30px rgba(0,0,0,0.8)'}}>
        lo que
      </div>
      <div style={{position: 'relative', fontFamily: F.display, fontSize: 330, lineHeight: 0.9, color: P.cream, transform: `scale(${frame >= vesAt ? 0.6 + 0.4 * v : 0})`, textShadow: '0 20px 60px rgba(0,0,0,0.85)'}}>
        <span style={{position: 'absolute', left: -split, top: 0, color: P.alarm, opacity: 0.7, mixBlendMode: 'screen'}}>VES</span>
        <span style={{position: 'absolute', left: split, top: 0, color: P.ui, opacity: 0.7, mixBlendMode: 'screen'}}>VES</span>
        <span style={{position: 'relative'}}>VES</span>
      </div>
    </AbsoluteFill>
  );
};

