/**
 * ESCENA 13 · "Es tu cerebro cambiando de capítulo. Y tu pendiente sigue esperándote en el cuarto anterior."
 * Cerebro entre dos fotogramas: sale el de la cocina, entra el de la sala; el fotograma crece hasta ocupar la pantalla y la idea espera, brillando.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Brain} from '../../../dl/anatomy/Anatomy';
import {Glow} from '../../../dl/light/Light';
import {MaskRise} from '../../../dl/type/Type';
import {Particles} from '../../../dl/fx/Fx';
import {F} from '../../../dl/fonts';
import {spr} from '../../../dl/motion';
import {E, FilmCard, Idea, Kitchen, LW, Sala, Vig, lerp, prog} from './common';
import {P} from './palette';

const W = 290, CW = W + 16 * (W / 300), CH = (W * 1200) / 1080 + 60 * (W / 300);

export const S13Final: React.FC<{lw: LW}> = ({lw}) => {
  const f = useCurrentFrame();
  const inK = spr(f, 2, {damping: 14, stiffness: 130});
  const swap = prog(f, lw(163), lw(165), E.inOut);
  const full = prog(f, lw(168), lw(170) + 6, E.inOut);
  const dots = Math.floor(Math.max(0, f - lw(171)) / 10) % 4;
  const end = prog(f, lw(176) + 28, lw(176) + 70, E.in);
  const zoom = lerp(1.0, 1.1, prog(f, lw(168), lw(176) + 60));
  return (
    <AbsoluteFill style={{overflow: 'hidden', background: `radial-gradient(80% 60% at 50% 30%, ${P.kTop}, ${P.night} 80%)`}}>
      <Glow x={540} y={270} r={420} color={P.tungsten} opacity={0.3 * inK} />
      <div style={{position: 'absolute', left: 540 - 147, top: 112, opacity: inK * (1 - full), transform: `scale(${lerp(0.7, 1, inK)})`}}>
        <Brain frame={f} highlight="all" color="#F2B6A0" scale={0.7} id="b13" />
      </div>
      <div style={{position: 'absolute', left: 540 - 400, width: 800, top: 450, display: 'flex', justifyContent: 'center', fontFamily: F.serif, fontStyle: 'italic', fontSize: 86, color: P.cream, textShadow: '0 8px 30px rgba(0,0,0,0.9)', opacity: 1 - full}}>
        <MaskRise frame={f} at={lw(165)} text="cambiando de capítulo" by="word" each={4} />
      </div>
      {/* fotogramas */}
      <div style={{position: 'absolute', left: lerp(300, -260, swap) - CW / 2, top: 790 - CH / 2, opacity: (1 - full)}}>
        <FilmCard w={W} dim={0.5 * swap}><Kitchen f={f} steam={false} /></FilmCard>
      </div>
      <div style={{position: 'absolute', left: lerp(1340, 540, swap) - CW / 2, top: 790 - CH / 2, opacity: (1 - full)}}>
        <FilmCard w={W} glow={swap}><Sala f={f} /><Idea x={790} y={380} f={f} s={1.5} glow={1} /></FilmCard>
      </div>
      {/* sala a pantalla completa con la idea esperando */}
      {full > 0 && (
        <div style={{position: 'absolute', inset: 0, opacity: full, transformOrigin: '800px 420px', transform: `scale(${zoom})`}}>
          <Sala f={f} lit={0.9} />
          <Particles frame={f} count={28} seed={21} y={160} h={700} vy={-0.3} color={P.idea} size={[1, 3]} opacity={0.5} />
          <Idea x={800} y={380} f={f} s={1.15} glow={1.25} />
          <div style={{position: 'absolute', left: 800 - 90, top: 590, width: 180, display: 'flex', justifyContent: 'center', gap: 22}}>
            {[0, 1, 2].map((i) => <div key={i} style={{width: 18, height: 18, borderRadius: 9, background: P.idea, opacity: dots > i ? 0.95 : 0.2, boxShadow: `0 0 16px ${P.idea}`}} />)}
          </div>
        </div>
      )}
      <Vig />
      <div style={{position: 'absolute', inset: 0, background: '#000', opacity: end}} />
    </AbsoluteFill>
  );
};
