/**
 * Biblioteca DROGMAN · Render híbrido del 3D real.
 * Una escena con WebGL (three.js) se envuelve en <Clip3D id="…" live={<…/>} />.
 *  - Si existe public/clips/<id>.webm (renderizado aparte con --gl=swangle y canal alfa), se usa ese video:
 *    el episodio completo se renderiza en modo rápido (--gl=angle) sin tocar WebGL.
 *  - Si no existe (vista previa local), se dibuja el componente en vivo.
 * Cada clip se registra en src/clips.ts → composición "Clip-<id>" (fondo transparente).
 */
import React from 'react';
import {AbsoluteFill, OffthreadVideo, getStaticFiles, staticFile} from 'remotion';

export const clipFile = (id: string) => `clips/${id}.webm`;

export const Clip3D: React.FC<{id: string; live: React.ReactNode}> = ({id, live}) => {
  const has = getStaticFiles().some((f) => f.name === clipFile(id));
  if (!has) return <AbsoluteFill>{live}</AbsoluteFill>;
  return (
    <AbsoluteFill>
      <OffthreadVideo src={staticFile(clipFile(id))} transparent muted style={{width: '100%', height: '100%'}} />
    </AbsoluteFill>
  );
};
