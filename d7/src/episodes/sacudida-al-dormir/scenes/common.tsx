import React from 'react';
import {AbsoluteFill} from 'remotion';
import {E, lerp, prog, rng} from '../../../dl/motion';
import {HumanRig, POSES} from '../../../dl/characters/HumanRig';
import {P, SLEEPER} from './palette';

type Expr = React.ComponentProps<typeof HumanRig>['expression'];
type Pose = typeof POSES.idle;

/** Coloca un elemento de coordenadas nativas: el ancla (ax, ay)·s cae en (sx, sy) de pantalla. */
export const place = (s: number, ax: number, ay: number, sx: number, sy: number): React.CSSProperties => ({position: 'absolute', left: sx - ax * s, top: sy - ay * s});

/** Fondo nocturno: degradado índigo con polvo que flota en la luz de luna. */
export const Night: React.FC<{frame: number; tint?: string; motes?: number; seed?: number}> = ({frame, tint = P.indigo, motes = 50, seed = 4}) => {
  const r = rng(seed);
  return (
    <AbsoluteFill style={{background: `radial-gradient(85% 70% at 50% 30%, ${tint}, ${P.ink} 60%, ${P.night} 100%)`}}>
      <svg width={1080} height={1200} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: motes}, (_, i) => {
          const x = r() * 1080, y0 = r() * 1200, z = 0.3 + r() * 0.9, ph = r() * 6;
          const y = ((y0 - frame * 0.35 * z) % 1200 + 1200) % 1200;
          return <circle key={i} cx={x + Math.sin(frame * 0.02 + ph) * 12 * z} cy={y} r={1 + z * 2} fill={P.moon} opacity={0.08 + 0.22 * z} />;
        })}
      </svg>
    </AbsoluteFill>
  );
};

/** Puntos de luz del cuerpo (coordenadas del HumanRig 400×960). Orden: cabeza, pecho, brazo izq., brazo der., pierna izq., pierna der. */
export const NODES: [number, number][] = [[200, 110], [200, 330], [86, 470], [314, 470], [160, 760], [240, 760]];

export const BodyLights: React.FC<{levels: number[]; color?: string; frame: number}> = ({levels, color = P.lamp, frame}) => (
  <g>
    {NODES.map(([x, y], i) => {
      const k = levels[i] ?? 0;
      if (k < 0.01) return null;
      const pulse = 1 + Math.sin(frame * 0.12 + i) * 0.06;
      return (
        <g key={i}>
          <circle cx={x} cy={y} r={70 * pulse} fill={color} opacity={0.22 * k} style={{filter: 'blur(18px)'}} />
          <circle cx={x} cy={y} r={14} fill={color} opacity={0.95 * k} style={{filter: `drop-shadow(0 0 12px ${color})`}} />
        </g>
      );
    })}
  </g>
);

/** Habitación vista desde el techo (1080×1200 de pantalla, cámara con s y desplazamiento). */
export const RoomTop: React.FC<{lamp?: number; frame: number}> = ({lamp = 0, frame}) => (
  <svg width={1600} height={1800} viewBox="0 0 1600 1800" style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
    <defs>
      <linearGradient id="rtFloor" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={P.woodLight} /><stop offset="1" stopColor={P.wood} /></linearGradient>
      <radialGradient id="rtLamp"><stop offset="0" stopColor={P.lamp} stopOpacity={0.55} /><stop offset="1" stopColor={P.lamp} stopOpacity={0} /></radialGradient>
    </defs>
    <rect width={1600} height={1800} fill="url(#rtFloor)" />
    {Array.from({length: 17}, (_, i) => <rect key={i} x={i * 96} y={0} width={2} height={1800} fill="#00000055" />)}
    {Array.from({length: 40}, (_, i) => <rect key={`j${i}`} x={(i % 17) * 96} y={((i * 373) % 1800)} width={96} height={2} fill="#00000044" />)}
    {/* alfombra */}
    <rect x={380} y={1240} width={840} height={360} rx={30} fill="#2E2A5A" opacity={0.85} />
    <rect x={410} y={1270} width={780} height={300} rx={22} fill="none" stroke={P.moonDim} strokeWidth={4} opacity={0.5} />
    {/* mesita y lámpara */}
    <rect x={1150} y={330} width={220} height={220} rx={18} fill="#3A2B44" />
    <rect x={1150} y={330} width={220} height={220} rx={18} fill="none" stroke="#00000066" strokeWidth={6} />
    <circle cx={1260} cy={440} r={70} fill={lamp > 0.05 ? P.lamp : '#5A4D60'} opacity={0.4 + 0.6 * lamp} />
    <circle cx={1260} cy={440} r={420} fill="url(#rtLamp)" opacity={lamp} />
    {/* luz de luna desde la ventana */}
    <polygon points="0,180 0,620 900,1700 1260,1700" fill={P.moon} opacity={0.07 + Math.sin(frame * 0.03) * 0.01} style={{filter: 'blur(20px)'}} />
  </svg>
);

/** Cama vista desde arriba con la persona boca arriba. Nativo 600×1100. */
export const BedTop: React.FC<{
  frame: number; pose?: Pose; expression?: Expr; blink?: number; breath?: number; ripple?: number;
  lights?: number[]; lightColor?: string; rim?: string; flush?: number; bedOpacity?: number; look?: number;
}> = ({frame, pose = POSES.idle, expression = 'eyesClosed', blink = 0, breath = 0, ripple = 0, lights, lightColor, rim = P.moon, flush = 0, bedOpacity = 1, look = 0}) => {
  const wave = (x: number) => Math.sin(x * 0.03 + frame * 0.6) * 18 * ripple;
  const top = 560 + wave(0);
  return (
    <svg width={600} height={1100} viewBox="0 0 600 1100" style={{overflow: 'visible'}}>
      <defs>
        <linearGradient id="btSheet" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={P.sheet} /><stop offset="1" stopColor={P.sheetShade} /></linearGradient>
        <linearGradient id="btBlanket" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#5B66B5" /><stop offset="1" stopColor="#262E6E" /></linearGradient>
      </defs>
      <g opacity={bedOpacity}>
        <rect x={-10} y={-10} width={620} height={1120} rx={34} fill="#1A1426" />
        <rect x={10} y={10} width={580} height={1080} rx={26} fill="url(#btSheet)" />
        <rect x={70} y={36} width={460} height={190} rx={60} fill="#EEF1FF" />
        <path d="M110 200 Q300 230 490 200" stroke={P.sheetShade} strokeWidth={6} fill="none" opacity={0.5} />
      </g>
      <g transform="translate(100 60)">
        <HumanRig id="bt" person={SLEEPER} pose={pose} expression={expression} blink={blink} breath={breath} rim={rim} flush={flush} look={look} shadow={false} />
        {lights && <BodyLights levels={lights} color={lightColor} frame={frame} />}
      </g>
      {/* cobija */}
      <path d={`M0 ${top} C150 ${top - 30 + wave(150)} 450 ${top + 30 + wave(450)} 600 ${top + wave(600)} L600 1090 Q300 1110 0 1090 Z`} fill="url(#btBlanket)" opacity={bedOpacity} />
      <path d={`M0 ${top} C150 ${top - 30 + wave(150)} 450 ${top + 30 + wave(450)} 600 ${top + wave(600)}`} stroke="#8D98E6" strokeWidth={10} fill="none" opacity={0.7 * bedOpacity} />
      {[220, 380].map((x, i) => <path key={i} d={`M${x} ${top + 60} Q${x + 20 + wave(x)} 820 ${x - 10} 1060`} stroke="#1C2258" strokeWidth={8} fill="none" opacity={0.5 * bedOpacity} />)}
    </svg>
  );
};

/** Sacudida: pico rápido con rebote, 0 → 1 → 0. */
export const jolt = (f: number, at: number, len = 14) => {
  const t = (f - at) / len;
  if (t < 0 || t > 1) return 0;
  return Math.sin(t * Math.PI) * Math.exp(-t * 2.2);
};

export const shakeXY = (f: number, k: number, amp = 26): [number, number] => [Math.sin(f * 2.7) * amp * k, Math.cos(f * 3.3) * amp * k];

/** Mundo del dormitorio: habitación + cama. Cama en (500, 350) del mundo; cara ≈ (800, 520); centro cama (800, 900).
 * La cámara coloca el punto del mundo (ax, ay) en (sx, sy) con escala s. */
export const Bedroom: React.FC<{frame: number; s: number; ax: number; ay: number; sx?: number; sy?: number; rot?: number; lamp?: number; roomOpacity?: number} & React.ComponentProps<typeof BedTop>> = ({s, ax, ay, sx = 540, sy = 600, rot = 0, lamp = 0, roomOpacity = 1, ...bed}) => (
  <AbsoluteFill style={{overflow: 'hidden'}}>
    <div style={{position: 'absolute', left: sx, top: sy, transform: `rotate(${rot}deg) scale(${s})`, transformOrigin: '0 0'}}>
      <div style={{position: 'absolute', left: -ax, top: -ay, width: 1600, height: 1800}}>
        <div style={{opacity: roomOpacity}}><RoomTop lamp={lamp} frame={bed.frame} /></div>
        <div style={{position: 'absolute', left: 500, top: 350}}><BedTop {...bed} /></div>
      </div>
    </div>
  </AbsoluteFill>
);

export {lerp, prog, E};
