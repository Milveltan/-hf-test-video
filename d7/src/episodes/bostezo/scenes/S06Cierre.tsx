/**
 * ESCENA 6 · "Bostezar es tu cerebro enfriándose… y copiando a los demás."
 * Resumen en dos golpes: el cerebro térmico pasa a frío ("enfriándose"); luego una fila de rostros bosteza en cadena ("copiando").
 * Cierre: un último rostro mira a cámara, empieza a bostezar… corte a negro.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Brain} from '../../../dl/anatomy/Anatomy';
import {FaceCloseUp, yawnCurve} from '../../../dl/characters/Face';
import {MaskRise} from '../../../dl/type/Type';
import {F} from '../../../dl/fonts';
import {spr} from '../../../dl/motion';
import {Dark, E, Grain, LW, Vig, lerp, prog} from './common';
import {LOOKS, P, thermal} from './palette';

export const S06Cierre: React.FC<{lw: LW}> = ({lw}) => {
  const f = useCurrentFrame();
  const cool = prog(f, lw(66), lw(68) + 10, E.inOut);
  const toRow = prog(f, lw(69) - 4, lw(69) + 8, E.inOut);
  const last = prog(f, lw(73) + 6, lw(73) + 20, E.inOut);
  const end = prog(f, lw(73) + 26, lw(73) + 32);
  const col = thermal(lerp(0.85, 0.12, cool));
  return (
    <AbsoluteFill style={{overflow: 'hidden', background: P.void}}>
      <Dark f={f} glow={cool > 0.5 ? '#0A2030' : '#24101A'} />
      {/* golpe 1: cerebro que se enfría */}
      <div style={{position: 'absolute', inset: 0, opacity: 1 - toRow, transform: `translateY(${-toRow * 200}px)`}}>
        <div style={{position: 'absolute', left: 540 - 1.3 * 210, top: 420 - 1.3 * 180, filter: `drop-shadow(0 0 50px ${col})`}}><Brain frame={f} color={col} highlight="all" scale={1.3} id="bc" /></div>
        <div style={{position: 'absolute', left: 0, width: 1080, top: 760, display: 'flex', justifyContent: 'center', fontFamily: F.serif, fontStyle: 'italic', fontSize: 100, color: P.ice, textShadow: `0 0 30px ${P.ice}88`}}>
          <MaskRise frame={f} at={lw(68)} text="enfriándose" by="word" each={4} />
        </div>
      </div>
      {/* golpe 2: cadena de rostros */}
      {toRow > 0 && (
        <div style={{position: 'absolute', inset: 0, opacity: toRow * (1 - last), transform: `translateY(${(1 - toRow) * 200}px)`}}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{position: 'absolute', left: 135 + i * 270 - 135, top: 330}}>
              <FaceCloseUp look={LOOKS[(i + 1) % 5]} scale={0.45} yawn={yawnCurve(f, lw(70) + i * 7, 44)} gaze={0.6} rim={P.signal} id={`r${i}`} />
            </div>
          ))}
          <div style={{position: 'absolute', left: 0, width: 1080, top: 760, display: 'flex', justifyContent: 'center', fontFamily: F.serif, fontStyle: 'italic', fontSize: 100, color: P.text}}>
            <MaskRise frame={f} at={lw(70)} text="y copiando a los demás" by="word" each={3} />
          </div>
        </div>
      )}
      {/* último rostro: mira a cámara */}
      {last > 0 && (
        <div style={{position: 'absolute', left: 540 - 300 * 1.5, top: 640 - 360 * 1.5, opacity: last, transform: `scale(${lerp(1.2, 1, last)})`, transformOrigin: '540px 640px'}}>
          <FaceCloseUp look={LOOKS[0]} scale={1.5} yawn={prog(f, lw(73) + 12, lw(73) + 30) * 0.7} rim={P.rim} id="fl" />
        </div>
      )}
      <Grain f={f} />
      <Vig k={0.85} />
      <AbsoluteFill style={{background: '#000', opacity: end}} />
    </AbsoluteFill>
  );
};
