/**
 * ESCENAS 2–3 · "En enero de 2021, un usuario anónimo llamado IlluminatiPirate publicó en un foro una idea inquietante."
 * Plano continuo: tablero split-flap de Opus (ENERO 2021) → la cámara baja (paneo vertical con paralaje) →
 * cuarto oscuro, figura encapuchada de espaldas frente al monitor → la cámara entra en la pantalla →
 * el foro: clic en PUBLICAR, el hilo se levanta, llegan respuestas, el marcador rojo subraya la idea.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {splitFlapBoard} from '../../../opus-motion';
import {F} from '../../../dl/fonts';
import {E, clamp01, keys, lerp, noise1, prog, rng, spr} from '../../../dl/motion';
import {FORUM_H, FORUM_W, ForumScreen, ForumTimes} from '../../../dl/ui/ForumScreen';
import {P} from './palette';
import {Room, SCR} from '../../../dl/environments/DarkRoom';
import {HoodedFigure} from '../../../dl/characters/HoodedFigure';
import {Dust} from '../../../dl/fx/Dust';

const SCALE_IN = SCR.w / FORUM_W; // 0.4
// recorte final de la cámara: columna central del foro (900×1000 virtuales) → cuadro completo
const CROP = {x: SCR.x + 350 * SCALE_IN, y: SCR.y, w: 900 * SCALE_IN};
const ZOOM_END = 1080 / CROP.w; // 3

export const S2Taller: React.FC<{lw: (i: number, off?: number) => number}> = ({lw}) => {
  const frame = useCurrentFrame();

  // --- tiempos (fotogramas locales, anclados a palabras) ---
  const tiltAt = lw(19, -4); // "un usuario": la cámara baja
  const anonAt = lw(21); // "anónimo"
  const userAt = lw(23); // "IlluminatiPirate"
  const pushFrom = lw(23, 14);
  const pushTo = lw(24, -4); // entra antes de "publicó"
  const t: ForumTimes = {
    typeFrom: lw(19, 10), typeTo: lw(23, -4), redactAt: anonAt, userAt,
    clickAt: lw(24), repliesAt: lw(28, -4), markAt: lw(30, 2),
  };

  // --- tablero (Opus split-flap) ---
  const tilt = prog(frame, tiltAt, tiltAt + 30, E.inOut);
  const boardIn = spr(frame, 0, {damping: 18, stiffness: 90});

  // --- cámara del cuarto: paneo vertical y luego entrada a la pantalla (zoom exponencial) ---
  const zk = prog(frame, pushFrom, pushTo, E.inOut);
  const zoom = Math.exp(Math.log(ZOOM_END) * zk);
  // ancla del zoom: interpolamos el punto del mundo que queda en la esquina superior izquierda
  const ax = lerp(0, CROP.x, (zoom - 1) / (ZOOM_END - 1));
  const ay = lerp(0, CROP.y, (zoom - 1) / (ZOOM_END - 1));
  const roomY = (1 - tilt) * 1150;
  const drift = (1 - zk) * keys(frame, [[tiltAt, 30], [pushFrom, 0]], E.out);
  // travelling lateral lento durante el plano del cuarto; el primer plano se mueve más (paralaje)
  const truck = keys(frame, [[tiltAt + 10, 26], [pushFrom, -18]], E.inOut) * (1 - zk);
  const fgX = truck * 2.4 - zk * 520;
  const fgBlur = zk * 7;

  // en el foro (después de entrar) la cámara sigue viva: leve deriva y empuje en "inquietante"
  const inForum = frame >= pushTo;
  const fDrift = inForum ? keys(frame, [[pushTo, 0], [t.repliesAt, -40], [t.markAt + 30, -50]], E.inOut) : 0;
  const fPush = inForum ? 1 + 0.08 * prog(frame, t.markAt - 6, t.markAt + 40, E.inOut) : 1;
  const flicker = noise1(frame * 0.5, 2) * 0.5 + (frame >= t.markAt && frame < t.markAt + 10 ? -0.6 * Math.sin(frame * 2.2) : 0);
  const typing = frame > t.typeFrom && frame < t.typeTo ? 1 : 0;
  const breathe = Math.sin(frame * 0.09);

  // anotación editorial "anónimo"
  const annot = spr(frame, anonAt, {damping: 15, stiffness: 140});
  const annotOut = prog(frame, pushFrom - 2, pushFrom + 8, E.in);

  return (
    <AbsoluteFill style={{background: P.void, overflow: 'hidden'}}>
      {/* MUNDO DEL CUARTO */}
      <AbsoluteFill style={{transform: `translateY(${roomY}px)`}}>
        <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1200, transformOrigin: '0 0', transform: `scale(${zoom}) translate(${-ax}px, ${-ay}px) translateY(${drift}px)`}}>
          <div style={{position: 'absolute', inset: 0, transform: `translateX(${truck}px)`}}>
            <Room frame={frame} flicker={flicker} typing={typing} breathe={breathe} />
          {/* la pantalla: el mismo foro que veremos a pantalla completa */}
          <div style={{position: 'absolute', left: SCR.x, top: SCR.y, width: SCR.w, height: SCR.h, overflow: 'hidden', borderRadius: 4, filter: `brightness(${1 + 0.08 * flicker})`}}>
            <div style={{transformOrigin: '0 0', transform: `scale(${SCALE_IN})`}}>
              <ForumScreen frame={frame} t={t} />
            </div>
            <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(120% 120% at 50% 50%, transparent 55%, rgba(0,0,0,0.55))', opacity: 1 - zk}} />
          </div>
          <Dust frame={frame} />
          </div>
          <div style={{position: 'absolute', inset: 0, transform: `translateX(${fgX}px)`, filter: fgBlur > 0.3 ? `blur(${fgBlur}px)` : undefined}}>
            <HoodedFigure frame={frame} flicker={flicker} typing={typing} breathe={breathe} />
          </div>
        </div>
        {/* anotación editorial con línea guía */}
        {frame >= anonAt - 2 && annotOut < 1 && (
          <div style={{position: 'absolute', left: 70, top: 160 - 30 * (1 - annot), opacity: annot * (1 - annotOut)}}>
            <div style={{fontFamily: F.mono, fontSize: 24, letterSpacing: '0.3em', color: P.phosphor}}>USUARIO</div>
            <div style={{fontFamily: F.serif, fontStyle: 'italic', fontSize: 104, lineHeight: 1, color: P.cream, textShadow: '0 10px 30px rgba(0,0,0,0.9)'}}>anónimo</div>
            <svg width={220} height={140} style={{position: 'absolute', left: 120, top: 128, overflow: 'visible'}}>
              <path d="M10 0 C 30 60 70 90 150 120" stroke={P.cream} strokeWidth={2} fill="none" strokeDasharray={260} strokeDashoffset={260 * (1 - prog(frame, anonAt + 4, anonAt + 18, E.out))} />
              <circle cx={150} cy={120} r={6} fill={P.phosphor} opacity={prog(frame, anonAt + 16, anonAt + 20)} />
            </svg>
          </div>
        )}
      </AbsoluteFill>

      {/* PARED CON EL TABLERO (Opus split-flap) — sube y sale con el paneo */}
      {tilt < 1 && (
        <AbsoluteFill style={{transform: `translateY(${-tilt * 1250}px)`}}>
          <AbsoluteFill style={{background: `radial-gradient(70% 55% at 50% 40%, #16202A 0%, #070B10 70%)`}} />
          {/* lámpara práctica sobre el tablero */}
          <AbsoluteFill style={{background: `radial-gradient(40% 25% at 50% 8%, rgba(255,180,90,${0.28 + 0.04 * noise1(frame * 0.3, 4)}), transparent 70%)`}} />
          <AbsoluteFill style={{perspective: 1600}}>
            <AbsoluteFill style={{transform: `translateY(-40px) rotateY(${keys(frame, [[0, -16], [tiltAt + 20, 6]], E.inOut)}deg) scale(${0.9 + 0.1 * boardIn})`, opacity: clamp01(boardIn * 1.4)}}>
              <splitFlapBoard.component
                {...splitFlapBoard.defaultProps}
                messages={['ENERO\n2021']}
                title=""
                accentRows={[1]}
                columns={5}
                flipFrames={2}
                maxFlips={10}
                colStagger={1.5}
                rowStagger={6}
                jitter={3}
                startAt={lw(16, -2)}
                hold={600}
                background="transparent"
                accent={P.warm}
              />
            </AbsoluteFill>
          </AbsoluteFill>
          {/* reflejo cálido que barre las fichas */}
          <AbsoluteFill style={{background: `linear-gradient(105deg, transparent ${lerp(-20, 90, prog(frame, 20, 70, E.inOut))}%, rgba(255,220,170,0.10) ${lerp(-10, 100, prog(frame, 20, 70, E.inOut))}%, transparent ${lerp(0, 110, prog(frame, 20, 70, E.inOut))}%)`}} />
        </AbsoluteFill>
      )}

      {/* FORO A PANTALLA COMPLETA (continúa el mismo objeto tras la entrada de cámara) */}
      {inForum && (
        <AbsoluteFill>
          <div style={{position: 'absolute', left: 0, top: 0, transformOrigin: '540px 380px', transform: `scale(${fPush}) translateY(${fDrift}px)`}}>
            <div style={{transformOrigin: '0 0', transform: `scale(${1080 / 900}) translate(-350px, 0px)`, width: FORUM_W, height: FORUM_H}}>
              <ForumScreen frame={frame} t={t} />
            </div>
          </div>
          {/* viñeta y parpadeo inquietante */}
          <AbsoluteFill style={{background: `radial-gradient(90% 80% at 50% 40%, transparent 50%, rgba(0,0,0,${0.55 + 0.25 * prog(frame, t.markAt, t.markAt + 30)}))`}} />
          <AbsoluteFill style={{background: P.alarm, mixBlendMode: 'multiply', opacity: frame >= t.markAt ? 0.18 * prog(frame, t.markAt, t.markAt + 20) : 0}} />
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
