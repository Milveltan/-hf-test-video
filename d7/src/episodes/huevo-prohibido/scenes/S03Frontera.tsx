/**
 * ESCENA 3 · "y en la frontera los agentes confiscan miles cada año."
 * Banda de aduana: maletas y huevos pasan por el escáner; la pantalla marca en rojo la cápsula; en "confiscan" los huevos caen
 * a un contenedor de DECOMISO que se va llenando ("miles").
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Conveyor} from '../../../dl/mechanisms/Conveyor';
import {Beam} from '../../../dl/light/Light';
import {F} from '../../../dl/fonts';
import {rng, spr} from '../../../dl/motion';
import {Bg, ChocEgg, LW, Vig, lerp, prog} from './common';
import {P} from './palette';

export const S03Frontera: React.FC<{lw: LW}> = ({lw}) => {
  const f = useCurrentFrame();
  const conf = prog(f, lw(25), lw(28) + 10);
  const r = rng(8);
  const pile = Math.floor(lerp(3, 46, conf));
  const alert = f >= lw(24) && Math.floor(f / 6) % 2 === 0;
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <Bg tint={P.navy3} spot={0.4} />
      <Beam x={540} y={0} angle={90} spread={22} length={1200} color={alert ? '#FF7A7A' : P.scan} opacity={0.14} />
      {/* cartel */}
      <div style={{position: 'absolute', left: 0, width: 1080, top: 60, textAlign: 'center', fontFamily: F.display, fontSize: 64, color: P.text, letterSpacing: '0.06em'}}>ADUANA · FRONTERA</div>
      {/* escáner */}
      <div style={{position: 'absolute', left: 300, top: 180, width: 480, height: 330, background: '#1B2C40', borderRadius: 24, border: `6px solid ${P.muted}`}}>
        <div style={{position: 'absolute', left: 30, top: 30, width: 420, height: 270, background: '#030A12', borderRadius: 12, overflow: 'hidden'}}>
          <div style={{position: 'absolute', left: 120, top: 10, transform: 'scale(0.62)', transformOrigin: '0 0'}}><ChocEgg xray={1} id="e3s" /></div>
          {alert && <div style={{position: 'absolute', inset: 0, border: `8px solid ${P.red}`, borderRadius: 12}} />}
        </div>
      </div>
      <div style={{position: 'absolute', left: 0, top: 0}}>
        <Conveyor frame={f} y={650} speed={6} spacing={260} count={6} item={(i) => (i % 3 === 1
          ? <div style={{transform: 'scale(0.42)', transformOrigin: '50% 100%', marginTop: -160}}><ChocEgg id={`c${i}`} /></div>
          : <div style={{width: 170, height: 120, borderRadius: 16, background: ['#3B5B7A', '#7A4A2C', '#4C6B4A'][i % 3], border: '5px solid #0006', marginTop: -120}} />)} />
      </div>
      {/* contenedor de decomiso */}
      <div style={{position: 'absolute', left: 540 - 250, top: 740, width: 500, height: 300, transform: 'scale(0.85)', transformOrigin: '50% 0'}}>
        <svg width={500} height={300} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
          {Array.from({length: pile}, (_, i) => {
            const x = 40 + r() * 420, y = 120 - (i / 46) * 110 + r() * 40;
            const k = spr(f, lw(25) + i * 0.6, {damping: 12, stiffness: 160});
            return <ellipse key={i} cx={x} cy={lerp(-400, y, Math.min(1, k))} rx={30} ry={38} fill={i % 2 ? P.foil : P.foilStripe} stroke="#0004" strokeWidth={2} />;
          })}
          <path d="M0 80 h500 l-40 220 h-420 z" fill={P.red} stroke="#0006" strokeWidth={6} />
        </svg>
        <div style={{position: 'absolute', left: 0, width: 500, top: 150, textAlign: 'center', fontFamily: F.display, fontSize: 62, color: P.text, letterSpacing: '0.08em'}}>DECOMISO</div>
      </div>
      <Vig />
    </AbsoluteFill>
  );
};
