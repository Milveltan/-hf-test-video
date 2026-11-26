/**
 * PILOTO 3D · "El lugar más profundo del océano" (15 s, sin narración). Valida el kit dl/world3d: una sola toma continua,
 * luz volumétrica, niebla, partículas, objetos de escala con medidas en el mundo. Capa 2D encima: profundímetro y rótulos.
 */
import React from 'react';
import {AbsoluteFill, Audio, staticFile, useCurrentFrame} from 'remotion';
import {Clip3D} from '../../dl/render/Clip3D';
import {F} from '../../dl/fonts';
import {E, prog, spr} from '../../dl/motion';
import {Ocean3D} from './Ocean3D';
import {depthAt} from './world';

const ZONES: [number, string][] = [[0, 'ZONA DE LUZ'], [200, 'ZONA DE PENUMBRA'], [1000, 'ZONA DE MEDIANOCHE'], [6000, 'ZONA HADAL']];

export const Piloto: React.FC = () => {
  const f = useCurrentFrame();
  const d = depthAt(f);
  const zone = [...ZONES].reverse().find(([m]) => d >= m)![1];
  const gauge = 1 - prog(f, 335, 355);
  const title = spr(f, 6, {damping: 14, stiffness: 120}) * (1 - prog(f, 62, 80));
  const endT = spr(f, 380, {damping: 14, stiffness: 120});
  return (
    <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
      <Clip3D id="piloto-fosa-oceano" live={<Ocean3D />} />
      <AbsoluteFill style={{background: 'radial-gradient(120% 90% at 50% 45%, transparent 50%, rgba(0,0,0,0.6) 100%)'}} />
      {/* título */}
      <div style={{position: 'absolute', left: 0, width: 1080, top: 760, textAlign: 'center', opacity: title, transform: `translateY(${(1 - title) * 30}px)`}}>
        <div style={{fontFamily: F.mono, fontWeight: 700, fontSize: 30, letterSpacing: '0.3em', color: '#BFF3FF'}}>BAJAMOS A</div>
        <div style={{fontFamily: F.display, fontSize: 96, lineHeight: 1, color: '#FFFFFF', textShadow: '0 8px 30px rgba(0,0,0,0.6)'}}>EL LUGAR MÁS PROFUNDO DEL OCÉANO</div>
      </div>
      {/* profundímetro */}
      <div style={{position: 'absolute', right: 50, top: 150, width: 380, opacity: gauge * prog(f, 40, 60)}}>
        <div style={{fontFamily: F.mono, fontWeight: 700, fontSize: 26, letterSpacing: '0.2em', color: '#6FE6FF', textAlign: 'right'}}>PROFUNDIDAD</div>
        <div style={{fontFamily: F.display, fontSize: 84, color: '#FFFFFF', textAlign: 'right', lineHeight: 1, whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums'}}>{Math.round(d).toLocaleString('es-MX')} m</div>
        <div style={{fontFamily: F.mono, fontWeight: 700, fontSize: 24, letterSpacing: '0.14em', color: '#BFD8E6', textAlign: 'right', marginTop: 8}}>{zone}</div>
        <div style={{position: 'relative', height: 420, marginTop: 20, marginLeft: 'auto', width: 8, borderRadius: 4, background: 'rgba(255,255,255,0.15)'}}>
          <div style={{position: 'absolute', left: -10, top: `${Math.min(100, (d / 10920) * 100)}%`, width: 28, height: 6, borderRadius: 3, background: '#6FE6FF', boxShadow: '0 0 14px #6FE6FF'}} />
        </div>
      </div>
      {/* remate */}
      <div style={{position: 'absolute', left: 0, width: 1080, top: 110, textAlign: 'center', opacity: endT, transform: `scale(${0.9 + 0.1 * endT})`}}>
        <div style={{fontFamily: F.display, fontSize: 84, lineHeight: 1.05, color: '#FFFFFF', textShadow: '0 8px 30px rgba(0,0,0,0.7)'}}>EL EVEREST CABE<br />Y AÚN SOBRA AGUA</div>
      </div>
      <Audio src={staticFile('audio/voz-piloto-fosa.wav')} />
    </AbsoluteFill>
  );
};
