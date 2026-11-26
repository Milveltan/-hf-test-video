import React from 'react';
import {AbsoluteFill} from 'remotion';
import {E, lerp, prog, rng} from '../../../dl/motion';
import {HumanRig, POSES, mixPose} from '../../../dl/characters/HumanRig';
import {F} from '../../../dl/fonts';
import {P} from './palette';
import {VIEWER} from './palette';

export {E, lerp, prog};
import {FLOOR} from '../../../dl/environments/Home';
export {FLOOR};
export type LW = (i: number, off?: number) => number;

/** Paso de caminata (alterna walkA/walkB). */
export const walkPose = (f: number, speed = 0.115) => mixPose(POSES.walkA, POSES.walkB, 0.5 + 0.5 * Math.sin(f * speed * Math.PI));
export const CALM = {shL: 8, elL: -6, shR: -48, elR: 78};
export const SHRUG = {shL: 40, shR: -40, elL: -70, elR: 70};

type RigProps = Omit<React.ComponentProps<typeof HumanRig>, 'scale' | 'person'>;
/** Persona con los pies en (x, foot). */
export const Person: React.FC<{x: number; s?: number; foot?: number; flip?: boolean; opacity?: number} & RigProps> = ({x, s = 0.7, foot = FLOOR, flip, opacity = 1, ...rig}) => (
  <div style={{position: 'absolute', left: x - 200 * s, top: foot - 960 * s, width: 400 * s, height: 960 * s, transform: flip ? 'scaleX(-1)' : undefined, opacity}}>
    <HumanRig rim={P.tungsten} {...rig} person={VIEWER} scale={s} />
  </div>
);

/** Cámara de mundo: coloca (cx, cy) del mundo en el centro de la pantalla. */
export const WorldCam: React.FC<{cx: number; cy?: number; zoom?: number; w?: number; children: React.ReactNode}> = ({cx, cy = 600, zoom = 1, w = 2160, children}) => (
  <AbsoluteFill style={{overflow: 'hidden'}}>
    <div style={{position: 'absolute', left: 0, top: 0, width: w, height: 1200, transformOrigin: '0 0', transform: `translate(${540 - cx * zoom}px, ${600 - cy * zoom}px) scale(${zoom})`}}>{children}</div>
  </AbsoluteFill>
);

export {Kitchen, Sala, DoorWall, HouseWorld} from '../../../dl/environments/Home';
export {Idea, FilmCard, Clapper} from '../../../dl/film/Film';

/** Fondo de fotograma: viñeta de cine para cualquier escena. */
export const Vig: React.FC<{k?: number}> = ({k = 0.55}) => <AbsoluteFill style={{background: `radial-gradient(120% 90% at 50% 45%, transparent 55%, rgba(0,0,0,${k}) 100%)`, pointerEvents: 'none'}} />;

/** Signo de interrogación flotante. */
export const Q: React.FC<{x: number; y: number; s?: number; k: number; rot?: number}> = ({x, y, s = 1, k, rot = 0}) => (
  <div style={{position: 'absolute', left: x, top: y, transform: `translate(-50%, -50%) scale(${k * s}) rotate(${rot}deg)`, fontFamily: F.display, fontSize: 150, lineHeight: 1, color: P.coral, textShadow: '0 8px 30px rgba(0,0,0,0.7)', opacity: Math.min(1, k)}}>?</div>
);
