/**
 * Casas y edificios nocturnos con ventanas que se encienden/apagan una por una.
 * `House`: casa de dos pisos + ático (900×1000). `off[i]` 0..1 apaga la ventana i (0..7 fachada, 8 = ático).
 * `ApartmentBlock`: edificio de cols×rows ventanas; `lit(i)` 0..1 y `jolt(i)` desplaza la silueta interior.
 */
import React from 'react';

export const House: React.FC<{off: number[]; warm?: string; wall?: string; roof?: string; frame: number; id?: string}> = ({off, warm = '#FFC27A', wall = '#1B1F45', roof = '#0E1030', frame, id = 'nh'}) => {
  const wins: [number, number][] = [[170, 520], [390, 520], [610, 520], [170, 740], [610, 740], [390, 740], [170, 300], [610, 300]];
  const win = (x: number, y: number, k: number, i: number, w = 120, h = 140) => {
    const flick = 1 + Math.sin(frame * 0.2 + i * 1.7) * 0.03;
    const on = 1 - k;
    return (
      <g key={i}>
        <rect x={x - 14} y={y - 14} width={w + 28} height={h + 28} rx={8} fill="#0A0C24" />
        <rect x={x} y={y} width={w} height={h} rx={4} fill={on > 0.02 ? warm : '#0D1130'} opacity={0.25 + 0.75 * on * flick} />
        {on > 0.02 && <rect x={x - 60} y={y - 60} width={w + 120} height={h + 120} fill={warm} opacity={0.18 * on} style={{filter: 'blur(30px)'}} />}
        <rect x={x + w / 2 - 3} y={y} width={6} height={h} fill="#0A0C24" />
        <rect x={x} y={y + h / 2 - 3} width={w} height={6} fill="#0A0C24" />
      </g>
    );
  };
  return (
    <svg width={900} height={1000} viewBox="0 0 900 1000" style={{overflow: 'visible'}}>
      <defs><linearGradient id={`${id}w`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={wall} /><stop offset="1" stopColor="#0B0D26" /></linearGradient></defs>
      <polygon points="40,250 450,20 860,250" fill={roof} />
      <polygon points="40,250 450,20 860,250" fill="none" stroke="#2C3270" strokeWidth={6} />
      <rect x={90} y={250} width={720} height={720} fill={`url(#${id}w)`} />
      {Array.from({length: 18}, (_, i) => <rect key={i} x={90} y={262 + i * 40} width={720} height={2} fill="#00000040" />)}
      {win(390, 120, off[8] ?? 0, 8, 120, 100)}
      {wins.map(([x, y], i) => win(x, y, off[i] ?? 0, i))}
      <rect x={395} y={930} width={110} height={40} fill="#0A0C24" />
      <rect x={40} y={966} width={820} height={14} rx={4} fill="#07081A" />
    </svg>
  );
};

export const ApartmentBlock: React.FC<{cols: number; rows: number; lit: (i: number) => number; jolt?: (i: number) => number; warm?: string; wall?: string; figure?: string; cell?: number}> = ({cols, rows, lit, jolt = () => 0, warm = '#FFC27A', wall = '#161A3E', figure = '#2A1E3A', cell = 150}) => {
  const W = cols * cell + 60, H = rows * cell + 80;
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{overflow: 'visible'}}>
      <rect x={0} y={0} width={W} height={H} fill={wall} />
      <rect x={0} y={0} width={W} height={18} fill="#0B0D26" />
      {Array.from({length: cols * rows}, (_, i) => {
        const c = i % cols, r = Math.floor(i / cols);
        const x = 30 + c * cell + cell * 0.14, y = 50 + r * cell + cell * 0.1, w = cell * 0.72, h = cell * 0.8;
        const k = lit(i), j = jolt(i);
        return (
          <g key={i}>
            <rect x={x} y={y} width={w} height={h} rx={4} fill={k > 0.02 ? warm : '#0D1130'} opacity={0.2 + 0.8 * k} />
            {k > 0.02 && (
              <g opacity={k} transform={`translate(${x + w / 2} ${y + h * 0.98 - j * h * 0.12})`}>
                <circle cx={0} cy={-h * 0.62} r={h * 0.1} fill={figure} />
                <path d={`M${-w * 0.18} 0 L${-w * 0.18} ${-h * 0.36} Q0 ${-h * 0.52} ${w * 0.18} ${-h * 0.36} L${w * 0.18} 0 Z`} fill={figure} />
              </g>
            )}
            <rect x={x} y={y + h - 6} width={w} height={6} fill="#0A0C24" />
          </g>
        );
      })}
    </svg>
  );
};
