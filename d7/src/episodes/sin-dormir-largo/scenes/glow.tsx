import React from 'react';
import {GodRays} from '../../../dl/nature/Nature';
export {Glow} from '../../../dl/light/Light';
/** Rayos de amanecer que entran con k (0–1). */
export const GodRaysWrap: React.FC<{f: number; k: number}> = ({f, k}) => (k > 0.01 ? <div style={{position: 'absolute', inset: 0, opacity: k}}><GodRays frame={f} x={880} y={120} color="#FFD9A0" count={10} opacity={0.16} /></div> : null);
