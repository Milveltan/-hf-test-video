/**
 * Biblioteca Datologo · Ficha "altman" — Sam Altman ilustrado (retrato editorial, no fotográfico).
 * Rasgos firma: cabello castaño claro corto, cara delgada, ojos claros, suéter gris de cuello redondo. Nunca gorra ni capucha.
 * Busto en tres cuartos hacia la derecha (viewBox 400×520). Props: blink (0..1), talk (0..1), look (−1..1), light (color de la luz de relleno).
 */
import React from 'react';

export type BustLook = {skin: [string, string, string]; hair: [string, string, string]; sweater: [string, string, string]; iris: string; brow: string; hairShine: string};
/** Ficha altman: cabello castaño claro, ojos claros, suéter gris */
export const ALTMAN: BustLook = {skin: ['#F2CBB0', '#D9A285', '#A9705A'], hair: ['#B88B5E', '#8E6A47', '#5E4430'], sweater: ['#9EA4AA', '#6E747A', '#3F4449'], iris: '#6F9BB8', brow: '#6B4C33', hairShine: '#E2B98A'};
/** Persona genérica (para "alguien"): pelo oscuro, piel media, suéter mostaza */
export const PERSONA: BustLook = {skin: ['#E3B08E', '#C08560', '#8A5638'], hair: ['#3A2A20', '#24180F', '#120B06'], sweater: ['#D7A23E', '#A87A26', '#6B4C14'], iris: '#5A3A22', brow: '#2A1A10', hairShine: '#6A5040'};

export const AltmanBust: React.FC<{blink?: number; talk?: number; look?: number; light?: string; scale?: number; looks?: BustLook}> = (p) => <Bust {...p} />;

export const Bust: React.FC<{blink?: number; talk?: number; look?: number; light?: string; scale?: number; looks?: BustLook}> = ({blink = 0, talk = 0, look = 0, light = '#7FE3FF', scale = 1, looks = ALTMAN}) => {
  const L = looks;
  const uid = L.hair[0].slice(1);
  const eyeH = 6.5 * (1 - blink);
  const mouth = 2 + talk * 7;
  return (
    <svg width={400 * scale} height={520 * scale} viewBox="0 0 400 520" style={{overflow: 'visible'}}>
      <defs>
        <radialGradient id={`alSkin${uid}`} cx="0.42" cy="0.38" r="0.7">
          <stop offset="0" stopColor={L.skin[0]} />
          <stop offset="0.6" stopColor={L.skin[1]} />
          <stop offset="1" stopColor={L.skin[2]} />
        </radialGradient>
        <linearGradient id={`alHair${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={L.hair[0]} />
          <stop offset="0.5" stopColor={L.hair[1]} />
          <stop offset="1" stopColor={L.hair[2]} />
        </linearGradient>
        <linearGradient id={`alSweater${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={L.sweater[0]} />
          <stop offset="0.55" stopColor={L.sweater[1]} />
          <stop offset="1" stopColor={L.sweater[2]} />
        </linearGradient>
        <linearGradient id={`alRim${uid}`} x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" stopColor={light} stopOpacity={0.55} />
          <stop offset="0.35" stopColor={light} stopOpacity={0} />
        </linearGradient>
        <pattern id={`alKnit${uid}`} width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M0 8 L4 0 L8 8" stroke="#000" strokeOpacity={0.08} fill="none" />
        </pattern>
      </defs>
      {/* hombros y suéter de cuello redondo */}
      <path d="M30 520 C 34 430 90 382 170 368 L 238 368 C 318 382 372 430 378 520 Z" fill={`url(#alSweater${uid})`} />
      <path d="M30 520 C 34 430 90 382 170 368 L 238 368 C 318 382 372 430 378 520 Z" fill={`url(#alKnit${uid})`} />
      <path d="M150 372 C 170 404 236 404 258 372" stroke="#55595E" strokeWidth={14} fill="none" strokeLinecap="round" />
      <path d="M120 440 C 140 470 150 500 152 520" stroke="#3A3E42" strokeWidth={5} opacity={0.5} fill="none" />
      <path d="M300 440 C 286 470 276 500 274 520" stroke="#3A3E42" strokeWidth={5} opacity={0.5} fill="none" />
      {/* cuello */}
      <path d="M172 300 L 172 378 Q 205 396 238 378 L 238 300 Z" fill="#C88F73" />
      <path d="M172 330 Q 205 352 238 330 L 238 300 L 172 300 Z" fill="#9C6650" opacity={0.6} />
      {/* oreja */}
      <ellipse cx={136} cy={232} rx={14} ry={24} fill="#C98E72" />
      {/* cara delgada (tres cuartos) */}
      <path d="M140 170 C 142 120 182 96 222 100 C 262 104 288 132 286 178 C 285 230 278 270 258 300 C 242 324 222 336 204 336 C 184 336 164 320 152 296 C 140 270 138 220 140 170 Z" fill={`url(#alSkin${uid})`} />
      <path d="M140 170 C 142 120 182 96 222 100 C 262 104 288 132 286 178 C 285 230 278 270 258 300 C 242 324 222 336 204 336" fill={`url(#alRim${uid})`} />
      {/* sombra lateral de la mejilla */}
      <path d="M150 240 C 156 290 176 322 204 336 C 180 330 160 300 150 240 Z" fill="#8E5A46" opacity={0.35} />
      {/* cabello corto castaño claro, con masa y brillo */}
      <path d="M134 196 C 120 130 160 76 222 78 C 282 80 306 124 294 182 C 288 160 278 146 262 138 C 238 128 206 134 182 128 C 166 140 154 160 150 196 Z" fill={`url(#alHair${uid})`} />
      <path d="M176 104 C 210 88 252 92 278 116" stroke={L.hairShine} strokeWidth={5} strokeOpacity={0.55} fill="none" strokeLinecap="round" />
      <path d="M196 96 C 222 92 246 98 262 110" stroke="#F0CDA0" strokeWidth={3} strokeOpacity={0.4} fill="none" strokeLinecap="round" />
      {/* cejas */}
      <path d="M180 196 Q 198 186 214 192" stroke={L.brow} strokeWidth={5} fill="none" strokeLinecap="round" />
      <path d="M236 192 Q 254 186 270 194" stroke={L.brow} strokeWidth={5} fill="none" strokeLinecap="round" />
      {/* ojos claros */}
      {[[198, 214], [254, 214]].map(([cx, cy], i) => (
        <g key={i}>
          <ellipse cx={cx} cy={cy} rx={12} ry={Math.max(0.6, eyeH)} fill="#F7F3EE" />
          {eyeH > 1.5 && (
            <>
              <circle cx={cx + look * 3} cy={cy} r={5.5} fill={L.iris} />
              <circle cx={cx + look * 3} cy={cy} r={2.4} fill="#1B2630" />
              <circle cx={cx + look * 3 + 1.8} cy={cy - 1.8} r={1.4} fill="#FFFFFF" />
            </>
          )}
          <path d={`M${cx - 13} ${cy - eyeH + 1} Q ${cx} ${cy - eyeH - 4} ${cx + 13} ${cy - eyeH + 1}`} stroke="#7A4E3A" strokeWidth={2.4} fill="none" />
        </g>
      ))}
      {/* nariz */}
      <path d="M230 216 C 232 240 238 256 242 262 C 236 268 226 268 220 264" stroke="#9A604B" strokeWidth={3} fill="none" strokeLinecap="round" />
      {/* boca */}
      <path d={`M206 ${292} Q 226 ${292 + mouth * 0.4} 248 ${290}`} stroke="#8C4E40" strokeWidth={4} fill="none" strokeLinecap="round" />
      {talk > 0.1 && <ellipse cx={227} cy={294} rx={14} ry={mouth * 0.6} fill="#5A2C25" opacity={0.85} />}
      {/* rubor suave */}
      <ellipse cx={186} cy={258} rx={18} ry={9} fill="#E58F7A" opacity={0.18} />
      <ellipse cx={266} cy={256} rx={14} ry={8} fill="#E58F7A" opacity={0.15} />
    </svg>
  );
};
