/**
 * ESCENAS 7–8 · "Bots creando contenido para otros bots. Y detrás, decía, estaría el gobierno."
 * Plano continuo: una banda transportadora entre dos bots (uno fabrica publicaciones, el otro las "lee").
 * En "Y detrás" la cámara retrocede y sube: la fábrica queda pequeña abajo y aparece, entre niebla,
 * un edificio de gobierno con hilos de marioneta que bajan hasta los bots; sus ventanas se encienden en "gobierno".
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {F} from '../../../dl/fonts';
import {E, keys, prog, spr} from '../../../dl/motion';
import {Bot} from '../../../dl/characters/Bot';
import {Conveyor} from '../../../dl/mechanisms/Conveyor';
import {GovBuilding} from '../../../dl/environments/GovBuilding';
import {SourceTag} from '../../../dl/editorial/Editorial';
import {Beam, Glow} from '../../../dl/light/Light';
import {P} from './palette';

const MiniPost: React.FC<{i: number}> = ({i}) => (
  <div style={{width: 150, height: 112, borderRadius: 14, background: 'linear-gradient(160deg,#1A2A38,#0F1A24)', border: `2px solid ${i % 3 === 0 ? P.alarm : '#2A4458'}`, padding: 14, boxSizing: 'border-box', boxShadow: '0 14px 26px rgba(0,0,0,0.5)'}}>
    <div style={{display: 'flex', gap: 8, alignItems: 'center'}}>
      <div style={{width: 26, height: 26, borderRadius: 7, background: '#4A5864', border: `2px solid ${P.alarm}`}} />
      <div style={{height: 9, width: 60, borderRadius: 4, background: '#C9555A'}} />
    </div>
    <div style={{height: 7, width: '92%', background: '#5E7486', borderRadius: 3, marginTop: 14, opacity: 0.7}} />
    <div style={{height: 7, width: '70%', background: '#5E7486', borderRadius: 3, marginTop: 8, opacity: 0.7}} />
    <div style={{height: 22, width: '100%', borderRadius: 5, marginTop: 10, background: `hsl(${(i * 47) % 360} 45% 30%)`}} />
  </div>
);

export const S7Fabrica: React.FC<{lw: (i: number, off?: number) => number}> = ({lw}) => {
  const frame = useCurrentFrame();
  const back = prog(frame, lw(60, -2), lw(63, 6), E.inOut); // "Y detrás": la cámara retrocede
  const zoom = 1.32 - 0.87 * back;
  const camY = keys(frame, [[lw(60, -2), 0], [lw(63, 6), 260]], E.inOut);
  const lit = prog(frame, lw(64, -2), lw(65, 14), E.out);
  const strings = prog(frame, lw(62), lw(63, 10), E.out);
  const period = 26; // ritmo de fabricación
  const stampPhase = (frame % period) / period;
  const arm = stampPhase < 0.3 ? stampPhase / 0.3 : 1 - (stampPhase - 0.3) / 0.7;
  const readTilt = Math.sin(frame * 0.24) * 8;
  const speed = 7;
  const govIn = spr(frame, lw(60, 4), {damping: 20, stiffness: 60});

  return (
    <AbsoluteFill style={{background: `linear-gradient(180deg, #04070B 0%, #0A121A 55%, #05080B 100%)`, overflow: 'hidden'}}>
      {/* EDIFICIO entre la niebla (se revela al retroceder) */}
      <div style={{position: 'absolute', left: 90, top: -60 + (1 - govIn) * 120 + camY * 0.4, opacity: back, transform: `scale(${0.9 + 0.1 * back})`, transformOrigin: '450px 700px'}}>
        <GovBuilding lit={lit} frame={frame} />
      </div>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, transparent 30%, rgba(10,18,26,0.85) 62%, transparent 85%)', opacity: back}} />
      {lit > 0 && <Beam x={540} y={120} angle={100} spread={10} length={1200} color={P.alarm} opacity={0.12 * lit} />}
      {lit > 0 && <Beam x={360} y={140} angle={78} spread={8} length={1200} color={P.alarm} opacity={0.08 * lit} />}

      {/* FÁBRICA (todo el grupo se aleja con la cámara) */}
      <div style={{position: 'absolute', inset: 0, transformOrigin: '540px 1080px', transform: `translateY(${camY}px) scale(${zoom})`}}>
        <Glow x={540} y={720} r={520} color="rgba(255,59,59,0.12)" />
        <Conveyor frame={frame} y={880} speed={speed} spacing={240} count={8} width={1400} item={(i) => <MiniPost i={i} />} />
        {/* bot fabricante (izquierda) con brazo que sella */}
        <div style={{position: 'absolute', left: -20, top: 520}}>
          <Bot id="bL" arm={arm * 0.8} headTilt={-6 + arm * 6} led={0.75} glow={0.6 + 0.4 * arm} scale={1.05} />
        </div>
        {/* chispa de "fabricación" */}
        {arm > 0.85 && <div style={{position: 'absolute', left: 230, top: 800, width: 60, height: 60, borderRadius: 30, background: P.alarm, filter: 'blur(14px)', opacity: 0.7}} />}
        {/* bot lector (derecha) que inclina la cabeza con cada publicación */}
        <div style={{position: 'absolute', left: 820, top: 520}}>
          <Bot id="bR" headTilt={readTilt} armR={0.25 + 0.15 * Math.sin(frame * 0.2)} led={0.5 + 0.45 * Math.sin(frame * 0.24)} glow={0.9} scale={1.05} />
        </div>
        {/* hilos de marioneta que bajan desde arriba */}
        <svg width={1080} height={1200} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
          {[[100, 545], [230, 640], [930, 545], [1060, 640]].map(([x, y], i) => (
            <line key={i} x1={x + Math.sin(frame * 0.05 + i) * 6} y1={-900} x2={x} y2={-900 + (y + 900) * strings} stroke={P.cream} strokeOpacity={0.5} strokeWidth={2} />
          ))}
        </svg>
      </div>

      {/* rótulos */}
      <div style={{position: 'absolute', left: 0, right: 0, top: 110, textAlign: 'center', opacity: 1 - back, fontFamily: F.mono, fontSize: 30, letterSpacing: '0.25em', color: P.alarm}}>
        BOT → CONTENIDO → BOT
      </div>
      <SourceTag frame={frame} at={lw(62)} text="SEGÚN LA TEORÍA" x={70} y={90} color={P.cream} />
    </AbsoluteFill>
  );
};
