/**
 * ESCENA 3 · "Una de las ideas más fuertes es que enfría tu cerebro: cuando se calienta, abres la boca y entra aire para bajarle la temperatura."
 * Cabeza de perfil vista con cámara térmica. El cerebro sube de violeta a naranja/amarillo ("se calienta", con ondas de calor);
 * la boca se abre y un chorro de aire cian entra; el cerebro se enfría hasta violeta y el termómetro baja.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Brain} from '../../../dl/anatomy/Anatomy';
import {Glow} from '../../../dl/light/Light';
import {F} from '../../../dl/fonts';
import {spr} from '../../../dl/motion';
import {Dark, E, Grain, LW, Vig, lerp, prog} from './common';
import {P, thermal} from './palette';

export const S03Termico: React.FC<{lw: LW}> = ({lw}) => {
  const f = useCurrentFrame();
  const inK = spr(f, 0, {damping: 14, stiffness: 110});
  const heat = prog(f, lw(24), lw(30) + 6, E.inOut);
  const mouth = prog(f, lw(31), lw(33), E.out) * (1 - prog(f, lw(40) + 4, lw(40) + 18));
  const air = prog(f, lw(34), lw(36));
  const cool = prog(f, lw(37), lw(40) + 8, E.inOut);
  const temp = Math.max(0.12, 0.25 + 0.7 * heat - 0.78 * cool);
  const col = thermal(temp);
  const jaw = mouth * 60;
  const head = `M330 330 C 330 200 450 130 590 140 C 740 150 820 260 810 390 C 805 450 790 480 800 520 L 850 600 C 858 616 846 628 830 630 L 812 632 L 820 660 C 822 ${690 + jaw} 800 ${700 + jaw} 780 ${700 + jaw} L 780 ${730 + jaw} C 780 ${770 + jaw} 740 ${790 + jaw} 700 ${790 + jaw} L 640 ${790 + jaw} L 620 900 L 420 900 L 430 760 C 360 700 330 560 330 330 Z`;
  return (
    <AbsoluteFill style={{overflow: 'hidden', background: P.void}}>
      <Dark f={f} glow="#120A24" />
      <Glow x={570} y={420} r={360} color={col} opacity={0.5} />
      <div style={{position: 'absolute', inset: 0, opacity: inK, transform: `scale(${lerp(0.92, 1, inK) * 0.92}) translate(-30px, 110px)`, transformOrigin: '540px 600px'}}>
        <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
          <defs>
            <radialGradient id="th" cx="0.45" cy="0.3" r="0.75"><stop offset="0" stopColor={thermal(temp * 0.8)} /><stop offset="0.6" stopColor={thermal(temp * 0.45)} /><stop offset="1" stopColor={P.t0} /></radialGradient>
          </defs>
          <path d={head} fill="url(#th)" stroke={P.rim} strokeWidth={4} opacity={0.95} />
          {/* boca oscura */}
          {mouth > 0.02 && <ellipse cx={800} cy={668 + jaw * 0.5} rx={30} ry={8 + jaw * 0.45} fill={P.void} />}
          {/* ondas de calor */}
          {heat > 0.3 && cool < 0.6 && Array.from({length: 3}, (_, i) => {
            const t = ((f * 0.03 + i / 3) % 1);
            return <path key={i} d={`M${480 + i * 70} ${200 - t * 140} q20 -20 0 -40 q-20 -20 0 -40`} stroke={P.t3} strokeWidth={6} fill="none" opacity={(1 - t) * (heat - cool) * 0.9} strokeLinecap="round" />;
          })}
          {/* chorro de aire */}
          {air > 0 && Array.from({length: 26}, (_, i) => {
            const t = ((f * 0.045 + i / 26) % 1);
            const x = lerp(1120, 800, t), yy = 668 + Math.sin(i * 2.3 + f * 0.1) * 26 * (1 - t);
            const into = t > 0.98;
            return <circle key={i} cx={into ? 0 : x} cy={yy} r={4 + (i % 3) * 2} fill={P.ice} opacity={air * (1 - cool * 0.7) * (0.4 + 0.6 * t)} style={{filter: `drop-shadow(0 0 8px ${P.ice})`}} />;
          })}
          {air > 0 && <path d={`M800 660 C 760 640 700 560 640 460`} stroke={P.ice} strokeWidth={10} strokeDasharray="4 18" strokeDashoffset={-f * 4} fill="none" opacity={air * (1 - cool) * 0.9} strokeLinecap="round" />}
        </svg>
        <div style={{position: 'absolute', left: 570 - 0.95 * 210, top: 400 - 0.95 * 180 + 10, filter: `drop-shadow(0 0 ${30 + heat * 30}px ${col})`}}>
          <Brain frame={f} color={col} highlight={heat > 0.5 && cool < 0.5 ? 'all' : 'none'} scale={0.95} id="bt" />
        </div>
      </div>
      {/* termómetro */}
      <div style={{position: 'absolute', left: 940, top: 260, width: 70, height: 620}}>
        <div style={{position: 'absolute', inset: 0, borderRadius: 35, background: '#0E1424', border: `4px solid ${P.muted}`}} />
        <div style={{position: 'absolute', left: 12, right: 12, bottom: 12, height: `${temp * 92}%`, borderRadius: 24, background: `linear-gradient(0deg, ${P.t1}, ${col})`, boxShadow: `0 0 20px ${col}`}} />
      </div>
      <div style={{position: 'absolute', left: 60, top: 110, fontFamily: F.mono, fontWeight: 700, fontSize: 30, letterSpacing: '0.24em', color: P.muted}}>VISTA TÉRMICA</div>
      <div style={{position: 'absolute', left: 60, top: 150, fontFamily: F.display, fontSize: 92, color: cool > 0.5 ? P.ice : col, textShadow: `0 0 30px ${cool > 0.5 ? P.ice : col}`, opacity: prog(f, lw(29), lw(30))}}>{cool > 0.5 ? 'SE ENFRÍA' : 'SE CALIENTA'}</div>
      <Grain f={f} />
      <Vig k={0.7} />
    </AbsoluteFill>
  );
};
