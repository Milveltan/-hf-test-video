/**
 * Biblioteca DROGMAN · Interiores de casa (vista lateral, corte de maqueta): Kitchen (cocina teal con lámpara colgante y vapor),
 * Sala (sofá, ventana nocturna, lámpara de pie, cuadros-fotograma), DoorWall (muro con puerta) y HouseWorld (sala | puerta | cocina, 2160×1200).
 * Cada cuarto mide 1080×1200 y acepta `lit` (0–1) para oscurecerse. El piso está en y = FLOOR (880). Usar con WorldCam (episodio olvido-puerta).
 */
import React from 'react';
import {rng} from '../motion';

export const HOME_COLORS = {
  night: '#050E12',
  ink: '#0A171C',
  kTop: '#0F3A40',
  kWall: '#185058',
  kTile: '#2A7A80',
  kTileLine: '#12474D',
  cab: '#7A4A2C',
  cabLight: '#A8683C',
  metal: '#C9D6D8',
  metalDark: '#7C9094',
  sTop: '#4A2630',
  sWall: '#7A3E36',
  sofa: '#2E7F83',
  sofaDark: '#154A50',
  wood: '#2C1A12',
  woodLight: '#4A2E20',
  tungsten: '#FFB45A',
  tungstenHot: '#FF8A3D',
  idea: '#FFE27A',
  ideaDeep: '#FFB020',
  cream: '#F3E7CF',
  film: '#0B0F11',
  coral: '#FF5A4D',
  teal: '#35B8B0',
  text: '#FFF6E4',
  muted: '#8FB3B3',
  ok: '#5BE3A0',
};
export const FLOOR = 880;
const P = HOME_COLORS;

/* ───────────── Cocina (1080×1200) ───────────── */
export const Kitchen: React.FC<{f: number; lit?: number; steam?: boolean}> = ({f, lit = 1, steam = true}) => {
  const r = rng(11);
  return (
    <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1200, overflow: 'hidden'}}>
      <svg width={1080} height={1200} viewBox="0 0 1080 1200">
        <defs>
          <linearGradient id="kWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={P.kTop} /><stop offset="1" stopColor={P.kWall} /></linearGradient>
          <linearGradient id="kFloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={P.woodLight} /><stop offset="1" stopColor={P.wood} /></linearGradient>
          <linearGradient id="kCab" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={P.cabLight} /><stop offset="1" stopColor={P.cab} /></linearGradient>
          <linearGradient id="kFridge" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor={P.metal} /><stop offset="1" stopColor={P.metalDark} /></linearGradient>
          <radialGradient id="kPend"><stop offset="0" stopColor={P.tungsten} stopOpacity={0.75} /><stop offset="1" stopColor={P.tungsten} stopOpacity={0} /></radialGradient>
        </defs>
        <rect width={1080} height={FLOOR} fill="url(#kWall)" />
        {/* azulejo */}
        {Array.from({length: 4}, (_, row) => Array.from({length: 13}, (_, c) => (
          <rect key={`${row}-${c}`} x={c * 84 + (row % 2) * 42 - 42} y={500 + row * 66} width={80} height={62} rx={5} fill={P.kTile} stroke={P.kTileLine} strokeWidth={3} opacity={0.9} />
        )))}
        {/* gabinetes altos */}
        <rect x={110} y={120} width={560} height={300} rx={10} fill="url(#kCab)" stroke="#00000066" strokeWidth={4} />
        {[0, 1, 2].map((i) => <rect key={i} x={126 + i * 183} y={136} width={170} height={268} rx={6} fill="none" stroke="#00000055" strokeWidth={3} />)}
        {[0, 1, 2].map((i) => <rect key={`h${i}`} x={246 + i * 183} y={360} width={30} height={8} rx={4} fill={P.cream} opacity={0.8} />)}
        {/* mesón */}
        <rect x={0} y={748} width={760} height={132} fill="url(#kCab)" />
        <rect x={0} y={730} width={760} height={26} fill={P.cream} opacity={0.92} />
        {[0, 1, 2, 3].map((i) => <rect key={`d${i}`} x={14 + i * 186} y={776} width={170} height={96} rx={6} fill="none" stroke="#00000055" strokeWidth={3} />)}
        {/* estufa con olla y vapor */}
        <rect x={420} y={706} width={190} height={26} rx={6} fill="#1C2428" />
        <path d="M450 706 h130 l-8 -70 h-114 z" fill={P.metalDark} stroke="#00000066" strokeWidth={3} />
        <rect x={436} y={632} width={158} height={14} rx={6} fill={P.metal} />
        {steam && Array.from({length: 5}, (_, i) => {
          const t = ((f * 0.9 + i * 22) % 110) / 110;
          return <circle key={i} cx={515 + Math.sin(t * 7 + i) * 22} cy={610 - t * 170} r={10 + t * 26} fill="#FFFFFF" opacity={(1 - t) * 0.16 * lit} />;
        })}
        {/* fregadero */}
        <rect x={140} y={716} width={190} height={18} rx={6} fill={P.metalDark} />
        <path d="M228 716 v-70 q0 -22 22 -22 h24" stroke={P.metal} strokeWidth={10} fill="none" strokeLinecap="round" />
        {/* refrigerador */}
        <rect x={800} y={170} width={230} height={710} rx={22} fill="url(#kFridge)" stroke="#00000066" strokeWidth={4} />
        <rect x={800} y={420} width={230} height={8} fill="#00000066" />
        <rect x={1000} y={260} width={10} height={110} rx={5} fill="#00000055" />
        <rect x={1000} y={470} width={10} height={170} rx={5} fill="#00000055" />
        {[[850, 250, P.coral], [920, 300, P.idea], [866, 350, P.teal]].map(([x, y, c], i) => <rect key={i} x={x as number} y={y as number} width={52} height={64} rx={4} fill={c as string} transform={`rotate(${i * 6 - 6} ${x} ${y})`} opacity={0.95} />)}
        {/* lámpara colgante */}
        <line x1={540} y1={0} x2={540} y2={238} stroke="#00000088" strokeWidth={5} />
        <path d="M470 292 L505 236 h70 L610 292 z" fill={P.tungstenHot} stroke="#00000066" strokeWidth={4} />
        <circle cx={540} cy={560} r={520} fill="url(#kPend)" opacity={0.5 * lit} />
        <ellipse cx={540} cy={296} rx={62} ry={9} fill={P.idea} opacity={0.9 * lit} />
        {/* piso */}
        <rect y={FLOOR} width={1080} height={320} fill="url(#kFloor)" />
        {Array.from({length: 9}, (_, i) => <line key={i} x1={i * 135 - 20} y1={FLOOR} x2={(i - 4) * 260 + 540} y2={1200} stroke="#00000055" strokeWidth={3} />)}
        <rect y={FLOOR - 4} width={1080} height={8} fill="#00000077" />
        {Array.from({length: 18}, (_, i) => <circle key={`m${i}`} cx={r() * 1080} cy={150 + r() * 600} r={1 + r() * 2} fill={P.tungsten} opacity={0.12 + 0.1 * Math.sin(f * 0.05 + i)} />)}
        <rect width={1080} height={1200} fill={P.night} opacity={(1 - lit) * 0.62} />
      </svg>
    </div>
  );
};

/* ───────────── Sala (1080×1200) ───────────── */
export const Sala: React.FC<{f: number; lit?: number}> = ({f, lit = 1}) => (
  <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1200, overflow: 'hidden'}}>
    <svg width={1080} height={1200} viewBox="0 0 1080 1200">
      <defs>
        <linearGradient id="sWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={P.sTop} /><stop offset="1" stopColor={P.sWall} /></linearGradient>
        <linearGradient id="sFloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={P.woodLight} /><stop offset="1" stopColor={P.wood} /></linearGradient>
        <linearGradient id="sSofa" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={P.sofa} /><stop offset="1" stopColor={P.sofaDark} /></linearGradient>
        <radialGradient id="sLamp"><stop offset="0" stopColor={P.tungsten} stopOpacity={0.8} /><stop offset="1" stopColor={P.tungsten} stopOpacity={0} /></radialGradient>
        <linearGradient id="sWin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1B3C6E" /><stop offset="1" stopColor="#3C6EA8" /></linearGradient>
      </defs>
      <rect width={1080} height={FLOOR} fill="url(#sWall)" />
      <rect y={650} width={1080} height={FLOOR - 650} fill="#00000033" />
      <rect y={646} width={1080} height={8} fill={P.cream} opacity={0.35} />
      {/* ventana nocturna */}
      <rect x={70} y={200} width={250} height={340} rx={10} fill="url(#sWin)" stroke={P.cream} strokeWidth={10} opacity={0.97} />
      <line x1={195} y1={200} x2={195} y2={540} stroke={P.cream} strokeWidth={8} /><line x1={70} y1={370} x2={320} y2={370} stroke={P.cream} strokeWidth={8} />
      <circle cx={256} cy={268} r={26} fill="#E8F0FF" opacity={0.9} />
      <path d="M52 190 q40 160 18 360 h40 q22 -200 -18 -360 z" fill="#B24A3C" opacity={0.9} /><path d="M338 190 q-40 160 -18 360 h-40 q-22 -200 18 -360 z" fill="#B24A3C" opacity={0.9} />
      {/* cuadros de pared (fotogramas) */}
      {[[430, 210], [560, 250], [690, 210]].map(([x, y], i) => (
        <g key={i} transform={`rotate(${(i - 1) * 3} ${(x as number) + 55} ${(y as number) + 70})`}>
          <rect x={x as number} y={y as number} width={110} height={140} rx={6} fill={P.film} stroke={P.cream} strokeWidth={4} />
          <rect x={(x as number) + 12} y={(y as number) + 22} width={86} height={96} fill={['#2A7A80', '#E9795A', '#FFB45A'][i]} opacity={0.85} />
          {[0, 1, 2, 3].map((k) => <rect key={k} x={(x as number) + 8 + k * 26} y={(y as number) + 6} width={12} height={10} rx={2} fill={P.cream} opacity={0.7} />)}
        </g>
      ))}
      {/* tapete */}
      <ellipse cx={420} cy={FLOOR + 80} rx={420} ry={70} fill="#7A2E2A" opacity={0.85} />
      <ellipse cx={420} cy={FLOOR + 80} rx={380} ry={52} fill="none" stroke={P.tungsten} strokeWidth={4} opacity={0.5} />
      {/* sofá */}
      <rect x={90} y={640} width={520} height={110} rx={34} fill="url(#sSofa)" />
      <rect x={70} y={700} width={90} height={180} rx={30} fill="url(#sSofa)" stroke="#00000044" strokeWidth={3} />
      <rect x={560} y={700} width={90} height={180} rx={30} fill="url(#sSofa)" stroke="#00000044" strokeWidth={3} />
      <rect x={140} y={728} width={420} height={120} rx={26} fill={P.sofa} stroke="#00000044" strokeWidth={3} />
      <line x1={280} y1={736} x2={280} y2={842} stroke="#00000044" strokeWidth={3} /><line x1={420} y1={736} x2={420} y2={842} stroke="#00000044" strokeWidth={3} />
      <rect x={160} y={690} width={80} height={70} rx={18} fill="#E9795A" transform="rotate(-8 200 725)" /><rect x={470} y={696} width={76} height={66} rx={18} fill={P.idea} transform="rotate(7 508 730)" />
      <rect x={110} y={864} width={20} height={16} fill="#00000088" /><rect x={590} y={864} width={20} height={16} fill="#00000088" />
      {/* lámpara de pie */}
      <rect x={742} y={470} width={10} height={410} fill={P.metalDark} /><rect x={712} y={868} width={70} height={12} rx={6} fill={P.metalDark} />
      <path d="M700 480 L726 392 h42 L794 480 z" fill={P.cream} opacity={0.96} />
      <circle cx={747} cy={520} r={460} fill="url(#sLamp)" opacity={0.46 * lit} />
      <ellipse cx={747} cy={484} rx={46} ry={8} fill={P.idea} opacity={0.9 * lit} />
      {/* repisa y planta */}
      <rect x={880} y={470} width={190} height={14} rx={4} fill={P.woodLight} />
      <rect x={940} y={420} width={50} height={50} rx={6} fill={P.cream} opacity={0.9} /><rect x={1000} y={440} width={30} height={30} rx={4} fill={P.coral} />
      <rect x={930} y={780} width={90} height={100} rx={12} fill="#C9683C" /><path d="M975 780 q-60 -80 -30 -150 M975 780 q10 -90 60 -140 M975 780 q-10 -60 -70 -90" stroke="#2F8F5A" strokeWidth={14} fill="none" strokeLinecap="round" />
      <rect y={FLOOR} width={1080} height={320} fill="url(#sFloor)" />
      {Array.from({length: 9}, (_, i) => <line key={i} x1={i * 135 - 20} y1={FLOOR} x2={(i - 4) * 260 + 540} y2={1200} stroke="#00000055" strokeWidth={3} />)}
      <rect y={FLOOR - 4} width={1080} height={8} fill="#00000077" />
      {Array.from({length: 16}, (_, i) => <circle key={`m${i}`} cx={(i * 211) % 1080} cy={170 + ((i * 97 + f * 0.4) % 640)} r={1.6 + (i % 3)} fill={P.tungsten} opacity={0.14 + 0.1 * Math.sin(f * 0.05 + i)} />)}
      <rect width={1080} height={1200} fill={P.night} opacity={(1 - lit) * 0.62} />
    </svg>
  </div>
);

/** Muro de la puerta entre sala (izq.) y cocina (der.), centrado en x = 1080. */
export const DoorWall: React.FC<{open?: number}> = ({open = 1}) => (
  <svg width={160} height={1200} viewBox="0 0 160 1200" style={{position: 'absolute', left: 1000, top: 0}}>
    <rect x={50} y={0} width={60} height={286} fill="#2A1710" />
    <rect x={44} y={274} width={72} height={22} fill={P.woodLight} />
    <rect x={44} y={296} width={10} height={FLOOR - 296} fill={P.woodLight} opacity={0.9} />
    <rect x={106} y={296} width={10} height={FLOOR - 296} fill={P.woodLight} opacity={0.9} />
    <rect x={50} y={0} width={60} height={286} fill="none" stroke="#00000088" strokeWidth={4} />
    <path d={`M110 296 L${110 + 44 * open} 312 V${FLOOR + 12} L110 ${FLOOR - 2} z`} fill="#6B3E24" stroke="#00000066" strokeWidth={4} opacity={0.96} />
    <circle cx={110 + 38 * open} cy={600} r={7} fill={P.tungsten} />
  </svg>
);

/** Mundo de dos cuartos: sala (0–1080) · puerta (1080) · cocina (1080–2160). */
export const HouseWorld: React.FC<{f: number; litL?: number; litR?: number; children?: React.ReactNode}> = ({f, litL = 1, litR = 1, children}) => (
  <div style={{position: 'absolute', left: 0, top: 0, width: 2160, height: 1200}}>
    <div style={{position: 'absolute', left: 0, top: 0}}><Sala f={f} lit={litL} /></div>
    <div style={{position: 'absolute', left: 1080, top: 0}}><Kitchen f={f} lit={litR} /></div>
    <DoorWall />
    {children}
  </div>
);
