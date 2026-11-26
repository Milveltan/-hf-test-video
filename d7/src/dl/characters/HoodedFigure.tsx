/**
 * Biblioteca Datologo · Figura encapuchada de espaldas (usuario anónimo), con volumen, pliegues,
 * luz de contorno del monitor y luz fría de ventana; respira y teclea. Capa propia para paralaje.
 */
import React from 'react';

const P = {phosphor: '#39FF8E', phosphorDim: '#1B8F55'};

/** Figura encapuchada en su propia capa (primer plano) para que tenga paralaje propio */
export const HoodedFigure: React.FC<{frame: number; flicker: number; typing: number; breathe: number}> = ({frame, flicker, typing, breathe}) => {
  const glow = 0.85 + 0.15 * flicker;
  return (
    <svg width={1080} height={1200} viewBox="0 0 1080 1200" style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
      <defs>
        <linearGradient id="hood" x1="0.2" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#1A2430" />
          <stop offset="60%" stopColor="#0B1118" />
          <stop offset="100%" stopColor="#04070A" />
        </linearGradient>
        <linearGradient id="back" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#151E28" />
          <stop offset="100%" stopColor="#05080B" />
        </linearGradient>
        <linearGradient id="hoodLit" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0.55" stopColor={P.phosphor} stopOpacity={0} />
          <stop offset="1" stopColor={P.phosphor} stopOpacity={0.22} />
        </linearGradient>
        <filter id="fsoft"><feGaussianBlur stdDeviation="6" /></filter>
      </defs>
      {/* FIGURA ENCAPUCHADA (de espaldas, primer plano izquierdo) */}
      <g transform={`translate(0 ${-breathe * 4}) scale(1 ${1 + breathe * 0.004})`}>
        {/* espalda y hombros */}
        <path d="M-90 1200 L-90 930 C -50 800 70 742 205 732 C 340 724 478 752 566 832 C 620 884 650 980 660 1200 Z" fill="url(#back)" />
        {/* brazo derecho hacia el teclado */}
        <path d={`M470 846 C 560 832 640 812 ${712 + typing * 3} ${804 + typing * 2} L ${732 + typing * 3} ${836 + typing * 2} C 652 868 576 896 488 914 Z`} fill="#0E151C" />
        <ellipse cx={738 + typing * 3} cy={818 + typing * 2 + Math.sin(frame * 1.3) * typing * 4} rx={30} ry={18} fill="#0C1217" stroke={P.phosphor} strokeOpacity={0.35} />
        {/* capucha */}
        <path d="M112 772 C 70 650 88 478 192 404 C 272 348 386 362 436 434 C 488 506 478 650 426 752 C 362 806 202 812 112 772 Z" fill="url(#hood)" />
        {/* volumen: luz reflejada del monitor en el lado derecho de la capucha + núcleo de sombra */}
        <path d="M112 772 C 70 650 88 478 192 404 C 272 348 386 362 436 434 C 488 506 478 650 426 752 C 362 806 202 812 112 772 Z" fill="url(#hoodLit)" />
        <path d="M150 520 C 170 470 230 430 300 430 C 250 470 220 560 215 700 C 190 690 160 640 150 520 Z" fill="#000" opacity={0.25} />
        {/* pliegues de tela */}
        <path d="M180 470 C 210 560 205 660 170 760" stroke="#05080B" strokeWidth={10} strokeOpacity={0.6} fill="none" strokeLinecap="round" />
        <path d="M300 410 C 330 520 340 640 320 790" stroke="#05080B" strokeWidth={8} strokeOpacity={0.5} fill="none" strokeLinecap="round" />
        <path d="M120 900 C 220 870 330 870 450 905" stroke="#05080B" strokeWidth={9} strokeOpacity={0.5} fill="none" strokeLinecap="round" />
        {/* mejilla iluminada por el monitor (asomando por la abertura de la capucha) */}
        <path d="M418 488 C 458 532 462 650 420 724 C 404 650 404 548 418 488 Z" fill="#2E5B44" opacity={0.75 * glow} />
        {/* luz de contorno verde del monitor sobre capucha y hombro */}
        <path d="M192 404 C 272 348 386 362 436 434 C 488 506 478 650 426 752" stroke={P.phosphor} strokeWidth={4} fill="none" opacity={0.75 * glow} />
        <path d="M192 404 C 272 348 386 362 436 434 C 488 506 478 650 426 752" stroke={P.phosphor} strokeWidth={16} fill="none" opacity={0.18 * glow} filter="url(#fsoft)" />
        <path d="M430 760 C 480 770 528 790 566 832 C 610 874 636 940 650 1020" stroke={P.phosphor} strokeWidth={3} fill="none" opacity={0.55 * glow} />
        {/* luz fría de la ventana en el borde izquierdo */}
        <path d="M112 772 C 70 650 88 478 192 404" stroke="#7FB6FF" strokeWidth={3} fill="none" opacity={0.35} />
      </g>
    </svg>
  );
};

