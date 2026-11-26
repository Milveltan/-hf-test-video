/**
 * ESCENA 6 · "Comentarios, perfiles, conversaciones… casi todo sería falso."
 * Tres objetos entran con resorte, cada uno en su palabra y desde un lado distinto, en tres profundidades.
 * En "casi todo" una línea de escaneo los recorre y los vuelve "huecos" (alambre rojo, glitch);
 * en "falso" golpea el sello.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {E, clamp01, noise1, prog, spr} from '../../../dl/motion';
import {ChatThread, CommentBubble, ProfileCard} from '../../../dl/ui/Social';
import {Scanline, Stamp} from '../../../dl/fx/Fx';
import {Cam, Layer} from '../../../dl/camera/Camera';
import {P} from './palette';

const Obj: React.FC<{frame: number; at: number; from: [number, number]; x: number; y: number; scanAt: number; rot?: number; children: React.ReactNode}> = ({frame, at, from, x, y, scanAt, rot = 0, children}) => {
  const k = spr(frame, at, {damping: 13, stiffness: 120, mass: 1});
  const hit = clamp01((frame - scanAt) / 6);
  const jit = hit > 0 && hit < 1 ? noise1(frame * 3, x) * 16 : 0;
  const float = Math.sin(frame * 0.05 + x) * 8;
  return (
    <div style={{position: 'absolute', left: x + from[0] * (1 - k) + jit, top: y + from[1] * (1 - k) + float, transform: `rotate(${rot * (1 - k) + rot * 0.15}deg)`, opacity: clamp01(k * 2)}}>
      <div style={{filter: hit > 0 ? `grayscale(${hit}) brightness(${1 - 0.45 * hit}) sepia(${hit * 0.6}) hue-rotate(${-30 * hit}deg) saturate(${1 + 3 * hit})` : undefined, outline: hit > 0 ? `${3 * hit}px solid rgba(255,59,59,${hit})` : undefined, outlineOffset: 10, borderRadius: 28}}>
        {children}
      </div>
    </div>
  );
};

export const S6Falso: React.FC<{lw: (i: number, off?: number) => number}> = ({lw}) => {
  const frame = useCurrentFrame();
  const scanFrom = lw(50), scanTo = lw(53, -2);
  const scan = prog(frame, scanFrom, scanTo, E.inOut);
  const yAtScan = (y: number) => scanFrom + ((y + 80) / 1200) * (scanTo - scanFrom);
  const falso = lw(53);
  const shake = frame >= falso ? 10 * (1 - prog(frame, falso, falso + 12)) : 0;
  const camX = 540 + Math.sin(frame * 0.02) * 30;
  const redK = prog(frame, scanFrom, falso + 6);
  return (
    <AbsoluteFill style={{background: `radial-gradient(90% 80% at 40% 30%, #0E1C28, ${P.void} 75%)`}}>
      <AbsoluteFill style={{background: `radial-gradient(70% 60% at 50% 60%, rgba(255,59,59,${0.16 * redK}), transparent 70%)`}} />
      <Cam x={camX} y={560} zoom={1.14 + 0.08 * prog(frame, 0, 130, E.inOut)} shake={shake} frame={frame}>
        <Layer depth={0.6}>
          <Obj frame={frame} at={lw(48)} from={[700, 0]} x={560} y={330} scanAt={yAtScan(330)} rot={6}>
            <ProfileCard hue={210} />
          </Obj>
        </Layer>
        <Layer depth={1}>
          <Obj frame={frame} at={lw(47)} from={[-900, -60]} x={70} y={150} scanAt={yAtScan(150)} rot={-5}>
            <CommentBubble hue={30} lines={2} />
          </Obj>
        </Layer>
        <Layer depth={1.35}>
          <Obj frame={frame} at={lw(49)} from={[0, 900]} x={90} y={560} scanAt={yAtScan(560)} rot={-3}>
            <ChatThread frame={frame} at={lw(49, 4)} />
          </Obj>
        </Layer>
      </Cam>
      <Scanline k={scan} color={P.alarm} />
      <Stamp frame={frame} at={falso} text="FALSO" size={170} x={540} y={520} rot={-8} color={P.alarm} />
    </AbsoluteFill>
  );
};
