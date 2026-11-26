/**
 * Biblioteca Datologo · Cámara 2.5D.
 *  - <Cam>: mueve todo lo de adentro como una cámara (x, y = punto del mundo al centro; zoom; rot; shake).
 *  - <Layer depth>: capa con paralaje. depth 0 = fondo lejano (se mueve poco), 1 = plano de la cámara, >1 = primer plano.
 *    Las capas leen la cámara del contexto, así el paralaje sale solo.
 *  - Whip: envoltorio de transición barrido (escala + desenfoque direccional simulado).
 */
import React, {createContext, useContext} from 'react';
import {AbsoluteFill} from 'remotion';
import {noise1} from '../motion';

type CamState = {x: number; y: number; zoom: number; rot: number; w: number; h: number};
const Ctx = createContext<CamState>({x: 540, y: 600, zoom: 1, rot: 0, w: 1080, h: 1200});

export const Cam: React.FC<{x?: number; y?: number; zoom?: number; rot?: number; shake?: number; frame?: number; children: React.ReactNode; w?: number; h?: number}> = ({
  x = 540, y = 600, zoom = 1, rot = 0, shake = 0, frame = 0, children, w = 1080, h = 1200,
}) => {
  const sx = shake ? noise1(frame * 0.7, 1) * shake : 0;
  const sy = shake ? noise1(frame * 0.7, 2) * shake : 0;
  return (
    <Ctx.Provider value={{x: x + sx, y: y + sy, zoom, rot, w, h}}>
      <AbsoluteFill style={{overflow: 'hidden'}}>{children}</AbsoluteFill>
    </Ctx.Provider>
  );
};

export const Layer: React.FC<{depth?: number; children: React.ReactNode; blur?: number; style?: React.CSSProperties}> = ({depth = 1, children, blur, style}) => {
  const c = useContext(Ctx);
  const z = 1 + (c.zoom - 1) * depth;
  const dx = (c.w / 2 - c.x) * depth;
  const dy = (c.h / 2 - c.y) * depth;
  return (
    <AbsoluteFill
      style={{
        transformOrigin: `${c.w / 2}px ${c.h / 2}px`,
        transform: `translate(${dx}px, ${dy}px) scale(${z}) rotate(${c.rot * depth}deg)`,
        filter: blur ? `blur(${blur}px)` : undefined,
        ...style,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

export const Whip: React.FC<{k: number; dir?: 1 | -1; children: React.ReactNode}> = ({k, dir = 1, children}) => (
  <AbsoluteFill style={{transform: `translateX(${dir * k * 900}px) scaleX(${1 + k * 0.3})`, filter: k > 0.02 ? `blur(${k * 16}px)` : undefined, opacity: 1 - k * 0.3}}>{children}</AbsoluteFill>
);
