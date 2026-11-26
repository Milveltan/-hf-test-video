/**
 * ESCENA 13 · "Sam Altman, el jefe de OpenAI, la empresa que creó ChatGPT, escribió que nunca se había tomado en serio
 * esta teoría… pero que ahora veía muchísimas cuentas manejadas por inteligencia artificial."
 * Un plano que evoluciona en 4 tiempos: retrato (ficha altman) con rótulo → la ventana de ChatGPT entra →
 * su publicación real (cita textual en inglés) → la cámara retrocede y la publicación queda rodeada
 * por una marea de cuentas bot que se multiplica.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {F} from '../../../dl/fonts';
import {E, clamp01, keys, noise1, prog, spr} from '../../../dl/motion';
import {AltmanBust} from '../../../dl/characters/AltmanBust';
import {BotFace} from '../../../dl/characters/Avatars';
import {LowerThird} from '../../../dl/editorial/Editorial';
import {ChatWindow, PostCard} from '../../../dl/ui/Social';
import {Glow} from '../../../dl/light/Light';
import {P} from './palette';

// Publicación real de Sam Altman en X (septiembre de 2025), texto original.
const QUOTE = 'i never took the *dead internet theory* that seriously but it seems like there are really a lot of *LLM-run twitter accounts* now';

export const S13Altman: React.FC<{lw: (i: number, off?: number) => number}> = ({lw}) => {
  const frame = useCurrentFrame();
  const chatAt = lw(105, -4);
  const postAt = lw(110, -6);
  const swarmAt = lw(120, -2);

  // retrato: entra por máscara circular, luego se corre a la izquierda y se aleja
  const iris = prog(frame, 0, 18, E.out);
  const bustX = keys(frame, [[chatAt - 4, 340], [chatAt + 14, 40], [postAt, 40], [postAt + 16, 300]], E.inOut);
  const bustS = keys(frame, [[0, 1.12], [chatAt, 1.12], [chatAt + 14, 0.86], [postAt, 0.86], [postAt + 16, 0.7]], E.inOut);
  const bustDim = prog(frame, postAt, postAt + 14);
  const blink = frame % 96 > 90 ? 1 : 0;
  const talk = 0;
  const chatK = keys(frame, [[postAt - 2, 1], [postAt + 10, 0]], E.in);
  // publicación y retroceso de cámara
  const pull = prog(frame, swarmAt, lw(126), E.inOut);
  const postScale = 1 - 0.42 * pull;
  // marea de bots
  const cols = 9, rows = 10, cell = 124;
  const sync = frame >= lw(128) ? 0.5 + 0.5 * Math.sin(frame * 0.6) : -1;

  return (
    <AbsoluteFill style={{background: `radial-gradient(90% 80% at 55% 35%, #10202D 0%, ${P.void} 75%)`, overflow: 'hidden'}}>
      {/* marea de cuentas bot (detrás) */}
      {frame >= swarmAt - 2 && (
        <div style={{position: 'absolute', left: (1080 - cols * cell) / 2, top: (1200 - rows * cell) / 2 - 40, display: 'grid', gridTemplateColumns: `repeat(${cols}, ${cell}px)`}}>
          {Array.from({length: cols * rows}, (_, i) => {
            const cx = (i % cols) - (cols - 1) / 2, cy = Math.floor(i / cols) - (rows - 1) / 2;
            const d = Math.hypot(cx, cy);
            const at = swarmAt + d * 5 - (frame > lw(124) ? (frame - lw(124)) * 0.25 * d : 0);
            const k = spr(frame, at, {damping: 12, stiffness: 200, mass: 0.6});
            const led = sync >= 0 ? sync : 0.5 + 0.5 * Math.sin(frame * 0.3 + i * 1.7);
            return (
              <div key={i} style={{width: cell, height: cell, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${k * 0.9})`, opacity: clamp01(k) * (0.35 + 0.65 * clamp01(1 - d / 7))}}>
                <BotFace scan={led} size={100} />
              </div>
            );
          })}
        </div>
      )}
      {frame >= swarmAt && <AbsoluteFill style={{background: `radial-gradient(40% 32% at 50% 44%, rgba(3,6,10,0.92) 40%, rgba(3,6,10,0) 100%)`, opacity: pull}} />}

      <Glow x={bustX + 200 * bustS} y={520} r={420} color={`rgba(127,227,255,${0.16 * (1 - pull)})`} />
      {/* retrato de Sam Altman (ficha) */}
      <div style={{position: 'absolute', left: bustX, top: 270, transform: `scale(${bustS})`, transformOrigin: '200px 520px', clipPath: `circle(${iris * 75}% at 50% 45%)`, opacity: (1 - bustDim * 0.75) * (1 - pull), filter: bustDim > 0 ? `blur(${bustDim * 5}px)` : undefined}}>
        <div style={{transform: `translateY(${noise1(frame * 0.03, 2) * 4}px) rotate(${noise1(frame * 0.02, 3) * 1.5}deg)`}}>
          <AltmanBust blink={blink} talk={talk} look={-0.3} />
        </div>
      </div>
      <LowerThird frame={frame} at={lw(99, 4)} name="SAM ALTMAN" role="DIRECTOR GENERAL DE OPENAI" x={70} y={160} out={postAt - 6} />

      {/* ventana de ChatGPT */}
      {frame >= chatAt && chatK > 0 && (
        <div style={{position: 'absolute', left: 430, top: 380, transform: `scale(0.72) translateX(${(1 - chatK) * 300}px)`, transformOrigin: '0 0', opacity: chatK}}>
          <ChatWindow frame={frame} at={chatAt} title="ChatGPT" prompt="¿Qué es la teoría del internet muerto?" />
        </div>
      )}

      {/* publicación real */}
      {frame >= postAt && (
        <div style={{position: 'absolute', left: 90, top: 340, transform: `scale(${postScale}) translateY(${-60 * pull}px)`, transformOrigin: '450px 260px'}}>
          <PostCard frame={frame} at={postAt} name="Sam Altman" handle="@sama · 2025" text={QUOTE} wps={6.5} accent="#FFB45A" fontSize={44} avatar={<div style={{transform: 'translate(-31px,-38px) scale(0.36)', transformOrigin: '0 0'}}><AltmanBust /></div>} />
          <div style={{marginTop: 18, fontFamily: F.mono, fontSize: 28, color: '#8399AB', opacity: prog(frame, postAt + 20, postAt + 30)}}>Publicación original en inglés · X</div>
        </div>
      )}
    </AbsoluteFill>
  );
};
