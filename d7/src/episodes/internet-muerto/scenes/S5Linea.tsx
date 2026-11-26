/**
 * ESCENA 5 · "Según él, internet había muerto entre 2016 y 2017."
 * Continuidad: la línea plana roja del electrocardiograma se convierte en la regla del tiempo.
 * La regla retrocede de 2021 a 2016 (travelling), el contador mecánico rueda los años y un corchete marca 2016–2017.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {F} from '../../../dl/fonts';
import {E, keys, noise1, prog, spr} from '../../../dl/motion';
import {TimelineRuler} from '../../../dl/data/Data';
import {Odometer, MaskRise} from '../../../dl/type/Type';
import {SourceTag} from '../../../dl/editorial/Editorial';
import {Particles} from '../../../dl/fx/Fx';
import {Glow} from '../../../dl/light/Light';
import {P} from './palette';

export const S5Linea: React.FC<{lw: (i: number, off?: number) => number}> = ({lw}) => {
  const frame = useCurrentFrame();
  const center = keys(frame, [[0, 2021.6], [lw(43), 2016.9], [lw(46, 10), 2016.7]], E.inOut);
  const year = keys(frame, [[lw(40), 2021], [lw(44), 2016], [lw(46), 2016], [lw(46, 6), 2017]], E.inOut);
  const bracket = prog(frame, lw(44, -4), lw(46, 4), E.inOut);
  const lineIn = prog(frame, 0, 10, E.out);
  const tilt = keys(frame, [[0, 0], [lw(46, 20), -4]], E.inOut);
  const pulse = 0.5 + 0.5 * Math.sin(frame * 0.25);
  return (
    <AbsoluteFill style={{background: `radial-gradient(90% 70% at 50% 55%, #0B1620 0%, ${P.void} 70%)`, overflow: 'hidden'}}>
      <Particles frame={frame} count={50} seed={9} vx={0.8} vy={-0.15} color="#9FC6E0" opacity={0.25} />
      <AbsoluteFill style={{perspective: 1400}}>
        <AbsoluteFill style={{transform: `rotateX(${tilt}deg) translateY(${noise1(frame * 0.05, 4) * 6}px)`, opacity: lineIn}}>
          <TimelineRuler frame={frame} from={2010} to={2025} center={center} y={700} range={[2016, 2018]} rangeK={bracket} color="#A9BDCC" accent={P.alarm} />
          {/* aguja del presente */}
          <div style={{position: 'absolute', left: 538, top: 520, width: 4, height: 230, background: P.alarm, boxShadow: `0 0 ${20 + 14 * pulse}px ${P.alarm}`}} />
          <div style={{position: 'absolute', left: 528, top: 506, width: 24, height: 24, borderRadius: 12, background: P.alarm}} />
        </AbsoluteFill>
      </AbsoluteFill>
      <Glow x={540} y={700} r={420} color="rgba(255,59,59,0.10)" />

      {/* contador mecánico del año */}
      <div style={{position: 'absolute', left: 0, right: 0, top: 180, display: 'flex', justifyContent: 'center', transform: `scale(${0.85 + 0.15 * spr(frame, lw(40, -4), {damping: 14, stiffness: 120})})`}}>
        <Odometer value={year} digits={4} style={{fontFamily: F.display, fontSize: 250, color: P.cream, textShadow: '0 20px 60px rgba(0,0,0,0.8)'}} />
      </div>
      {frame >= lw(44, -6) && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 455, textAlign: 'center'}}>
          <MaskRise frame={frame} at={lw(44, -6)} text="FECHA DE «MUERTE»" each={0.8} style={{fontFamily: F.mono, fontSize: 34, letterSpacing: '0.3em', color: P.alarm}} />
        </div>
      )}
      <SourceTag frame={frame} at={lw(38, 2)} text="SEGÚN ILLUMINATIPIRATE · 2021" x={70} y={90} />
      {/* fin: "2016 – 2017" editorial en serif */}
      {frame >= lw(46, -2) && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 820, textAlign: 'center'}}>
          <MaskRise frame={frame} at={lw(46, -2)} by="word" text="entre 2016 y 2017" each={2} style={{fontFamily: F.serif, fontStyle: 'italic', fontSize: 78, color: P.cream}} />
        </div>
      )}
    </AbsoluteFill>
  );
};
