/**
 * Biblioteca DROGMAN · Primer plano de rostro (frente, 2.5D) con bostezo real, y cabeza de perro con bostezo.
 * FaceCloseUp — yawn 0–1 (la mandíbula baja, la boca se abre con lengua y dientes, los ojos se aprietan, las cejas suben,
 * la cabeza se inclina atrás y aparece una lágrima en el pico), blink, look (−1..1), tilt (grados), rim (luz de contorno).
 * Lienzo 600×720 por `scale`. Útil para emociones en primer plano, reacciones y contagio.
 * DogHead — yawn 0–1, blink. Lienzo 500×460 por `scale`.
 * yawnCurve(f, at, dur) — curva natural de bostezo (sube lento, sostiene, cierra rápido).
 */
import React from 'react';

export type FaceLook = {skin: [string, string]; hair: [string, string]; hairStyle?: 'short' | 'long' | 'bun' | 'curly'; shirt?: string; iris?: string};

export const yawnCurve = (f: number, at: number, dur = 54) => {
  const t = (f - at) / dur;
  if (t <= 0 || t >= 1) return 0;
  if (t < 0.45) { const u = t / 0.45; return u * u * (3 - 2 * u); }
  if (t < 0.7) return 1;
  const u = (t - 0.7) / 0.3; return 1 - u * u * (3 - 2 * u);
};

export const FaceCloseUp: React.FC<{look: FaceLook; yawn?: number; blink?: number; gaze?: number; tilt?: number; rim?: string; scale?: number; id?: string; shade?: number}> = ({look, yawn = 0, blink = 0, gaze = 0, tilt = 0, rim = '#7FE3FF', scale = 1, id = 'fc', shade = 0.5}) => {
  const y = yawn, [sk, skD] = look.skin, [hr, hrD] = look.hair;
  const jaw = y * 70;
  const eyeOpen = Math.max(0, (1 - blink) * (1 - y * 0.95));
  const brow = -y * 16;
  const mw = 34 + y * 30, mh = 6 + y * 92;
  const head = `M300 110 C 410 110 470 190 470 300 C 470 ${380 + jaw * 0.5} 440 ${460 + jaw} 380 ${505 + jaw} C 345 ${530 + jaw} 255 ${530 + jaw} 220 ${505 + jaw} C 160 ${460 + jaw} 130 ${380 + jaw * 0.5} 130 300 C 130 190 190 110 300 110 Z`;
  return (
    <svg width={600 * scale} height={720 * scale} viewBox="0 0 600 720" style={{overflow: 'visible'}}>
      <defs>
        <radialGradient id={`${id}s`} cx="0.42" cy="0.38" r="0.75"><stop offset="0" stopColor={sk} /><stop offset="1" stopColor={skD} /></radialGradient>
        <linearGradient id={`${id}h`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={hr} /><stop offset="1" stopColor={hrD} /></linearGradient>
        <linearGradient id={`${id}sh`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#000" stopOpacity={0} /><stop offset="1" stopColor="#000" stopOpacity={0.45 * shade} /></linearGradient>
        <clipPath id={`${id}c`}><path d={head} /></clipPath>
      </defs>
      <g transform={`rotate(${tilt - y * 6} 300 600)`}>
        {/* hombros y cuello */}
        <path d="M60 720 C 80 600 190 580 240 560 L 360 560 C 410 580 520 600 540 720 Z" fill={look.shirt ?? '#2E3A4E'} />
        <path d={`M235 ${470 + jaw * 0.6} L 232 580 Q 300 610 368 580 L 365 ${470 + jaw * 0.6} Z`} fill={skD} />
        {look.hairStyle === 'long' && <path d="M120 260 C 110 420 130 560 170 620 L 430 620 C 470 560 490 420 480 260 Z" fill={`url(#${id}h)`} />}
        {/* orejas */}
        <ellipse cx={128} cy={320} rx={26} ry={44} fill={skD} /><ellipse cx={472} cy={320} rx={26} ry={44} fill={skD} />
        <path d={head} fill={`url(#${id}s)`} />
        <g clipPath={`url(#${id}c)`}><rect x={300} y={80} width={200} height={560} fill={`url(#${id}sh)`} /></g>
        {/* mejillas */}
        <ellipse cx={205} cy={395} rx={34} ry={20} fill="#E5604A" opacity={0.18 + y * 0.12} /><ellipse cx={395} cy={395} rx={34} ry={20} fill="#E5604A" opacity={0.18 + y * 0.12} />
        {/* ojos */}
        {[[225, -1], [375, 1]].map(([cx, side]) => (
          <g key={cx}>
            <ellipse cx={cx} cy={318} rx={34} ry={Math.max(1.5, 22 * eyeOpen)} fill="#FFFFFF" />
            {eyeOpen > 0.15 && <circle cx={cx + gaze * 12} cy={320} r={14 * Math.min(1, eyeOpen * 1.4)} fill={look.iris ?? '#3A2418'} />}
            {eyeOpen > 0.15 && <circle cx={cx + gaze * 12 + 5} cy={314} r={4} fill="#FFFFFF" />}
            <path d={`M${cx - 38} ${318 - 22 * eyeOpen} Q ${cx} ${318 - 32 * eyeOpen - 4} ${cx + 38} ${318 - 22 * eyeOpen}`} stroke={skD} strokeWidth={5} fill="none" />
            {y > 0.5 && <path d={`M${cx - 30} 320 Q ${cx} ${330 + y * 6} ${cx + 30} 320`} stroke="#5A3A2A" strokeWidth={5} fill="none" strokeLinecap="round" />}
            <path d={`M${cx - 40} ${270 + brow + (side as number) * 0} Q ${cx} ${254 + brow} ${cx + 40} ${270 + brow}`} stroke={hrD} strokeWidth={12} fill="none" strokeLinecap="round" />
          </g>
        ))}
        {/* lágrima */}
        {y > 0.85 && <ellipse cx={398} cy={345 + (y - 0.85) * 120} rx={6} ry={9} fill="#BFE8FF" opacity={(y - 0.85) * 6} />}
        {/* nariz */}
        <path d={`M300 330 Q 292 ${390 + jaw * 0.1} 280 ${405 + jaw * 0.12} Q 300 ${418 + jaw * 0.12} 320 ${405 + jaw * 0.12}`} stroke={skD} strokeWidth={6} fill="none" strokeLinecap="round" />
        {/* boca */}
        <g transform={`translate(300 ${452 + jaw * 0.55})`}>
          <ellipse rx={mw} ry={mh / 2} fill="#3A1414" />
          {y > 0.2 && <>
            <path d={`M${-mw * 0.7} ${-mh / 2 + 4} Q 0 ${-mh / 2 + 14} ${mw * 0.7} ${-mh / 2 + 4}`} fill="#F4EFE6" opacity={Math.min(1, (y - 0.2) * 3)} />
            <ellipse cy={mh / 2 - 14 * y} rx={mw * 0.62} ry={16 * y} fill="#D9616A" />
          </>}
          <ellipse rx={mw + 3} ry={mh / 2 + 3} fill="none" stroke="#8C4E40" strokeWidth={4} />
        </g>
        {/* pelo */}
        {look.hairStyle === 'curly'
          ? <g>{Array.from({length: 13}, (_, i) => <circle key={i} cx={150 + i * 25} cy={150 + Math.abs(i - 6) * 9 + (i % 2) * 10} r={38} fill={`url(#${id}h)`} />)}</g>
          : <path d="M128 290 C 120 160 200 92 300 92 C 410 92 485 160 472 290 C 450 220 420 190 380 182 C 330 214 230 214 170 196 C 150 220 136 250 128 290 Z" fill={`url(#${id}h)`} />}
        {look.hairStyle === 'bun' && <circle cx={300} cy={78} r={56} fill={`url(#${id}h)`} />}
        {/* luz de contorno */}
        <path d={head} fill="none" stroke={rim} strokeWidth={5} opacity={0.55} strokeDasharray="0 0" style={{filter: `drop-shadow(0 0 10px ${rim})`}} clipPath={`url(#${id}c)`} />
      </g>
    </svg>
  );
};

export const DogHead: React.FC<{yawn?: number; blink?: number; scale?: number; fur?: [string, string]; id?: string; rim?: string}> = ({yawn = 0, blink = 0, scale = 1, fur = ['#D9A35C', '#8A5A2A'], id = 'dg', rim = '#FFD9A0'}) => {
  const y = yawn, eo = Math.max(0, (1 - blink) * (1 - y * 0.95)), jaw = y * 80;
  return (
    <svg width={500 * scale} height={460 * scale} viewBox="0 0 500 460" style={{overflow: 'visible'}}>
      <defs><radialGradient id={`${id}f`} cx="0.45" cy="0.35" r="0.8"><stop offset="0" stopColor={fur[0]} /><stop offset="1" stopColor={fur[1]} /></radialGradient></defs>
      <g transform={`rotate(${-y * 8} 250 400)`}>
        <path d="M120 120 C 60 120 40 260 80 300 C 110 290 130 220 150 170 Z" fill={fur[1]} />
        <path d="M380 120 C 440 120 460 260 420 300 C 390 290 370 220 350 170 Z" fill={fur[1]} />
        <ellipse cx={250} cy={210} rx={150} ry={140} fill={`url(#${id}f)`} />
        {/* mandíbula inferior */}
        <path d={`M170 ${300 + jaw * 0.3} Q 250 ${380 + jaw} 330 ${300 + jaw * 0.3} Z`} fill={fur[0]} />
        {/* boca abierta */}
        <g transform={`translate(250 ${312 + jaw * 0.45})`}>
          <ellipse rx={50 + y * 20} ry={4 + y * 50} fill="#3A1414" />
          {y > 0.3 && <path d={`M-30 ${y * 40} q30 ${-30 * y} 60 0 q-10 ${50 * y} -30 ${55 * y} q-20 ${-5 * y} -30 ${-55 * y} z`} fill="#E06A7A" transform={`rotate(${Math.sin(y * 6) * 6})`} />}
          {y > 0.3 && [-34, 34].map((x) => <path key={x} d={`M${x} ${-4 - y * 44} l6 18 l6 -18 z`} fill="#FFFFFF" />)}
        </g>
        {/* hocico */}
        <ellipse cx={250} cy={268} rx={74} ry={48} fill="#F2D3A6" />
        <ellipse cx={250} cy={248} rx={30} ry={20} fill="#2A1A14" /><ellipse cx={242} cy={242} rx={8} ry={5} fill="#FFFFFF" opacity={0.5} />
        {/* ojos */}
        {[190, 310].map((cx) => <g key={cx}><ellipse cx={cx} cy={185} rx={20} ry={Math.max(1.5, 20 * eo)} fill="#2A1A14" />{eo > 0.3 && <circle cx={cx + 6} cy={178} r={5} fill="#FFFFFF" />}{y > 0.5 && <path d={`M${cx - 20} 185 q20 10 40 0`} stroke="#2A1A14" strokeWidth={5} fill="none" />}</g>)}
        <ellipse cx={250} cy={210} rx={150} ry={140} fill="none" stroke={rim} strokeWidth={4} opacity={0.4} />
      </g>
    </svg>
  );
};
