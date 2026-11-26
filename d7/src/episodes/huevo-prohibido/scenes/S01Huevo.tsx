/**
 * ESCENA 1 · "En Estados Unidos es ilegal vender un huevo de chocolate con un juguete dentro."
 * Un huevo de chocolate gira bajo un foco; en "ilegal" cae un sello rojo; en "juguete dentro" un escáner lo atraviesa y revela la cápsula.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Stamp, Particles} from '../../../dl/fx/Fx';
import {spr} from '../../../dl/motion';
import {Bg, ChocEgg, E, LW, Vig, lerp, prog} from './common';
import {P} from './palette';

export const S01Huevo: React.FC<{lw: LW}> = ({lw}) => {
  const f = useCurrentFrame();
  const inK = spr(f, 0, {damping: 12, stiffness: 120});
  const scan = prog(f, lw(11), lw(13), E.inOut);
  const xr = prog(f, lw(12), lw(13), E.out);
  const tilt = Math.sin(f * 0.07) * 6;
  const zoom = lerp(1, 1.12, prog(f, lw(9), lw(13) + 10));
  const stampOut = prog(f, lw(10), lw(11));
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <Bg spot={1} />
      <Particles frame={f} count={30} seed={4} vy={-0.3} color={P.cream} size={[1, 2.5]} opacity={0.35} />
      <div style={{position: 'absolute', inset: 0, transformOrigin: '540px 560px', transform: `scale(${zoom})`}}>
        <div style={{position: 'absolute', left: 540 - 195, top: 560 - 247, transform: `scale(${inK}) rotate(${tilt}deg)`, transformOrigin: '50% 90%'}}>
          <ChocEgg s={1.3} xray={xr} f={f} id="e1" />
        </div>
        {scan > 0 && scan < 1 && <div style={{position: 'absolute', left: 300, width: 480, top: lerp(260, 900, scan), height: 6, background: P.scan, boxShadow: `0 0 30px 10px ${P.scan}`}} />}
      </div>
      <div style={{opacity: 1 - stampOut * 0.6}}><Stamp frame={f} at={lw(4)} text="ILEGAL" color={P.red} size={170} rot={-10} x={540} y={250} /></div>
      <Vig />
    </AbsoluteFill>
  );
};
