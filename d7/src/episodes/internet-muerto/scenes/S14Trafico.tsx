/**
 * ESCENAS 14–15 · "Según el informe anual de bots de la empresa Thales, en 2025 el 53 % de todo el tráfico web
 * lo generaron programas automáticos. Los humanos ya somos minoría."
 * El informe se abre → el tráfico fluye como partículas y se divide (rojo = programas automáticos),
 * el anillo cuenta hasta 53 % → 100 pictogramas de visitas: 53 se vuelven bots en cascada.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {F} from '../../../dl/fonts';
import {E, clamp01, keys, prog, spr} from '../../../dl/motion';
import {IsoGrid, PercentRing, StreamSplit} from '../../../dl/data/Data';
import {MaskRise} from '../../../dl/type/Type';
import {SourceTag} from '../../../dl/editorial/Editorial';
import {P} from './palette';

export const S14Trafico: React.FC<{lw: (i: number, off?: number) => number}> = ({lw}) => {
  const frame = useCurrentFrame();
  const reportK = spr(frame, 0, {damping: 15, stiffness: 120});
  const reportOut = prog(frame, lw(140, -6), lw(141, 4), E.inOut);
  const pct = keys(frame, [[lw(142), 0], [lw(144, 6), 53]], E.out);
  const split = prog(frame, lw(148, -4), lw(149, 10), E.inOut);
  const gridAt = lw(154, -6);
  const toGrid = prog(frame, gridAt - 8, gridAt + 6, E.inOut);
  const minor = prog(frame, lw(158, -2), lw(158, 14), E.inOut);
  return (
    <AbsoluteFill style={{background: `radial-gradient(90% 80% at 50% 40%, #0C1823, ${P.void} 75%)`, overflow: 'hidden'}}>
      {/* el informe */}
      {reportOut < 1 && (
        <div style={{position: 'absolute', left: 190, top: 190, width: 700, height: 820, transform: `translateY(${(1 - reportK) * 600 - reportOut * 900}px) rotate(${-3 + reportOut * -8}deg)`, background: 'linear-gradient(160deg,#F2F4F6,#D9DEE3)', borderRadius: 10, boxShadow: '0 50px 100px rgba(0,0,0,0.6)', padding: 54, boxSizing: 'border-box'}}>
          <div style={{fontFamily: F.mono, fontSize: 24, letterSpacing: '0.25em', color: '#C0392B'}}>INFORME ANUAL DE BOTS</div>
          <div style={{fontFamily: F.display, fontSize: 120, lineHeight: 1, color: '#0D1A26', marginTop: 20}}>THALES</div>
          <div style={{height: 6, width: 120, background: '#C0392B', marginTop: 26}} />
          {Array.from({length: 11}, (_, i) => <div key={i} style={{height: 12, borderRadius: 3, marginTop: 22, background: '#22303C', opacity: 0.25, width: `${[96, 90, 94, 70, 92, 88, 96, 60, 90, 86, 50][i]}%`}} />)}
        </div>
      )}
      <SourceTag frame={frame} at={lw(131)} text="FUENTE: INFORME ANUAL DE BOTS · THALES" x={70} y={90} />

      {/* flujo de tráfico + anillo */}
      {frame >= lw(140, -6) && toGrid < 1 && (
        <AbsoluteFill style={{opacity: clamp01(reportOut * 1.5) * (1 - toGrid)}}>
          <StreamSplit frame={frame} share={0.53} splitK={split} y={640} count={140} />
          <div style={{position: 'absolute', left: 290, top: 300, transform: `scale(${0.82 + 0.18 * spr(frame, lw(142), {damping: 12, stiffness: 120})})`}}>
            <div style={{position: 'absolute', inset: 0, borderRadius: '50%', background: 'rgba(3,6,10,0.88)'}} />
            <PercentRing value={pct} size={500} label="DEL TRÁFICO WEB" />
          </div>
          <div style={{position: 'absolute', right: 70, top: 260, textAlign: 'right', opacity: split, fontFamily: F.mono, fontSize: 26, letterSpacing: '0.12em', color: P.alarm}}>PROGRAMAS<br />AUTOMÁTICOS</div>
          <div style={{position: 'absolute', right: 70, top: 930, textAlign: 'right', opacity: split, fontFamily: F.mono, fontSize: 26, letterSpacing: '0.12em', color: P.ui}}>PERSONAS</div>
          <div style={{position: 'absolute', left: 70, top: 160, fontFamily: F.display, fontSize: 64, color: P.cream, opacity: prog(frame, lw(140), lw(141, 4))}}>2025</div>
        </AbsoluteFill>
      )}

      {/* 100 visitas: 53 bots */}
      {toGrid > 0 && (
        <AbsoluteFill style={{opacity: toGrid}}>
          <div style={{position: 'absolute', left: 70, top: 170, fontFamily: F.mono, fontSize: 26, letterSpacing: '0.2em', color: '#9FB3C4'}}>DE CADA 100 VISITAS WEB</div>
          <div style={{position: 'absolute', left: 54, top: 260, transformOrigin: '486px 180px', transform: `scale(${1 + 0.04 * minor})`}}>
            <IsoGrid frame={frame} at={gridAt} marked={53} each={0.42} size={38} cols={20} dimMarked={minor} />
          </div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 700, textAlign: 'center'}}>
            {frame >= lw(158, -4) && <MaskRise frame={frame} at={lw(158, -4)} text="MINORÍA" each={1.2} from="center" style={{fontFamily: F.display, fontSize: 150, color: P.ui, letterSpacing: '0.04em'}} />}
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
