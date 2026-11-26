/**
 * Biblioteca Datologo · Banda transportadora (procesos, fábricas, "producción en serie" de cualquier cosa).
 * Rodillos que giran, banda con marcas que avanzan, y objetos (render prop) que viajan de izquierda a derecha.
 * speed en px/fotograma. item(i, x) dibuja el objeto i en la posición x.
 */
import React from 'react';

export const Conveyor: React.FC<{frame: number; width?: number; y?: number; speed?: number; spacing?: number; count?: number; item: (i: number, x: number) => React.ReactNode}> = ({
  frame, width = 1300, y = 760, speed = 6, spacing = 260, count = 8, item,
}) => {
  const off = (frame * speed) % spacing;
  const rot = (frame * speed * 180) / (Math.PI * 22);
  return (
    <div style={{position: 'absolute', left: (1080 - width) / 2, top: 0, width, height: 1200}}>
      {/* objetos */}
      {Array.from({length: count}, (_, i) => {
        const x = -spacing + i * spacing + off;
        return (
          <div key={i} style={{position: 'absolute', left: x, top: y, transform: 'translateY(-100%)'}}>
            {item(i - Math.floor((frame * speed) / spacing), x)}
          </div>
        );
      })}
      <svg width={width} height={120} style={{position: 'absolute', left: 0, top: y - 6}}>
        <defs>
          <linearGradient id="cvBelt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2B3540" />
            <stop offset="1" stopColor="#0C1116" />
          </linearGradient>
        </defs>
        <rect x={0} y={0} width={width} height={34} rx={17} fill="url(#cvBelt)" />
        {Array.from({length: Math.ceil(width / 40) + 2}, (_, i) => (
          <rect key={i} x={i * 40 - ((frame * speed) % 40)} y={4} width={4} height={8} fill="#5A6B7A" opacity={0.6} />
        ))}
        {Array.from({length: Math.ceil(width / 90)}, (_, i) => (
          <g key={i} transform={`translate(${45 + i * 90} 17) rotate(${rot})`}>
            <circle r={11} fill="#1A2229" stroke="#6E7F8E" strokeWidth={2} />
            <line x1={-9} y1={0} x2={9} y2={0} stroke="#6E7F8E" strokeWidth={2} />
          </g>
        ))}
        <rect x={0} y={34} width={width} height={70} fill="#070A0D" />
        {Array.from({length: 6}, (_, i) => <rect key={i} x={80 + i * (width / 6)} y={34} width={18} height={86} fill="#141B21" />)}
      </svg>
    </div>
  );
};
