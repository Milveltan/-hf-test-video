/**
 * ESCENA 17 · "Aun así, la próxima vez que leas un comentario… pregúntate quién lo escribió. ¿Fue alguien… o algo?"
 * Regresa el teléfono (eco de la escena 9): un comentario → la cámara entra al avatar → el avatar se pixela →
 * cierre en espejo: mitad rostro humano, mitad bot; "¿ALGUIEN…" / "…O ALGO?" y el LED parpadea antes del negro.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {F} from '../../../dl/fonts';
import {E, clamp01, keys, prog, spr} from '../../../dl/motion';
import {PhoneFrame, CommentBubble} from '../../../dl/ui/Social';
import {Bust, PERSONA} from '../../../dl/characters/AltmanBust';
import {Bot} from '../../../dl/characters/Bot';
import {MaskRise} from '../../../dl/type/Type';
import {P} from './palette';

export const S17Final: React.FC<{lw: (i: number, off?: number) => number}> = ({lw}) => {
  const frame = useCurrentFrame();
  const phoneK = spr(frame, 0, {damping: 16, stiffness: 110});
  const comment = spr(frame, lw(188, -6), {damping: 13, stiffness: 160});
  const dive = prog(frame, lw(190, -2), lw(193, 4), E.inOut);
  const zoom = Math.exp(Math.log(4.2) * dive);
  const pixel = prog(frame, lw(191), lw(193, 6));
  const splitAt = lw(194, -8);
  const split = prog(frame, splitAt, splitAt + 14, E.inOut);
  const blink = frame >= lw(197, 4) ? (Math.floor((frame - lw(197, 4)) / 4) % 2 === 0 ? 1 : 0.15) : 1;
  return (
    <AbsoluteFill style={{background: `radial-gradient(80% 70% at 50% 40%, #121E28, ${P.void} 75%)`, overflow: 'hidden'}}>
      {split < 1 && (
        <AbsoluteFill style={{opacity: 1 - split}}>
          {/* cámara que entra al avatar del comentario (avatar en ~ (300, 470) del mundo) */}
          <div style={{position: 'absolute', inset: 0, transformOrigin: '316px 470px', transform: `scale(${zoom})`}}>
            <div style={{position: 'absolute', left: 290, top: 110 + (1 - phoneK) * 500, transform: `rotate(${keys(frame, [[0, 5], [lw(189), -2]], E.inOut)}deg)`, transformOrigin: '250px 900px'}}>
              <PhoneFrame width={500}>
                <div style={{position: 'absolute', left: 22, top: 130, fontFamily: F.ui, fontWeight: 800, fontSize: 30, color: '#E8F1F7'}}>Comentarios</div>
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} style={{position: 'absolute', left: 18, top: 210 + i * 170, transform: i === 1 ? `scale(${1 + 0.04 * comment})` : undefined, transformOrigin: 'left center', opacity: i === 1 ? 1 : 0.45 + 0.55 * (1 - comment)}}>
                    <div style={{transform: 'scale(0.78)', transformOrigin: '0 0', position: 'relative'}}>
                      <CommentBubble hue={[40, 200, 300, 120][i]} lines={2} width={440} />
                      {i === 1 && pixel > 0 && (
                        <div style={{position: 'absolute', left: 0, top: 0, width: 84, height: 84, borderRadius: 42, overflow: 'hidden', opacity: pixel}}>
                          <div style={{width: 84, height: 84, imageRendering: 'pixelated', filter: `blur(${pixel * 2}px) contrast(${1 + pixel})`, background: `repeating-conic-gradient(#C9555A 0 25%, #2B343C 0 50%) 0 0 / ${Math.max(6, 28 - pixel * 20)}px ${Math.max(6, 28 - pixel * 20)}px`}} />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </PhoneFrame>
            </div>
          </div>
          {frame >= lw(190, -2) && (
            <div style={{position: 'absolute', left: 0, right: 0, top: 200, textAlign: 'center', opacity: 1 - prog(frame, splitAt - 4, splitAt + 4)}}>
              <MaskRise frame={frame} at={lw(190, -2)} by="word" text="¿quién lo escribió?" each={3} style={{fontFamily: F.serif, fontStyle: 'italic', fontSize: 100, color: P.cream, textShadow: '0 10px 40px rgba(0,0,0,0.9)'}} />
            </div>
          )}
        </AbsoluteFill>
      )}

      {/* cierre en espejo */}
      {split > 0 && (
        <AbsoluteFill style={{opacity: split}}>
          <div style={{position: 'absolute', left: 0, top: 0, width: 540, height: 1200, overflow: 'hidden', background: '#0E1B26'}}>
            <div style={{position: 'absolute', left: 114, top: 120, transform: `translateX(${(1 - split) * -200}px)`}}><Bust looks={PERSONA} scale={2} light="#FFB45A" blink={frame % 80 > 76 ? 1 : 0} look={0.4} /></div>
          </div>
          <div style={{position: 'absolute', left: 540, top: 0, width: 540, height: 1200, overflow: 'hidden', background: '#1A0709'}}>
            <div style={{position: 'absolute', left: 108 - 540, top: 300, transform: `translateX(${(1 - split) * 200}px)`}}><Bot id="fin" scale={3.6} led={blink > 0.5 ? 0.2 : 0.8} glow={blink} headTilt={0} /></div>
          </div>
          <div style={{position: 'absolute', left: 538, top: 0, width: 4, height: 1200, background: P.cream, transform: `scaleY(${split})`}} />
          <div style={{position: 'absolute', left: 40, top: 110, width: 480}}>
            <MaskRise frame={frame} at={lw(195, -2)} text="¿ALGUIEN…" each={0.8} style={{fontFamily: F.display, fontSize: 112, color: P.cream}} />
          </div>
          <div style={{position: 'absolute', left: 580, top: 110, width: 480}}>
            {frame >= lw(196, -2) && <MaskRise frame={frame} at={lw(196, -2)} text="…O ALGO?" each={0.8} style={{fontFamily: F.display, fontSize: 112, color: P.alarm}} />}
          </div>
          <div style={{position: 'absolute', inset: 0, background: '#000', opacity: clamp01((frame - (lw(197) + 26)) / 10)}} />
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
