/**
 * Biblioteca Datologo · Trazo de electrocardiograma (pulso que late con la voz y puede "morir").
 * beats: fotogramas de cada latido con su x; flatAt: fotograma en que se aplana (opcional).
 * Sirve para: vida/muerte, signos vitales, anatomía, tensión narrativa.
 */
import React from 'react';
import {E, clamp01, keys} from '../motion';

const beatShape = (x: number, xb: number, amp: number) => {
  const g = (c: number, w: number, a: number) => a * Math.exp(-((x - c) ** 2) / (2 * w * w));
  return amp * (g(xb - 46, 9, -14) + g(xb - 9, 3.5, 22) + g(xb, 4, -170) + g(xb + 9, 4, 48) + g(xb + 52, 13, -30));
};

export const EcgTrace: React.FC<{
  frame: number; y: number; width?: number;
  beats: {at: number; x: number}[]; flat?: {at: number; x: number}; endX?: number; endAt?: number;
  color?: string; deadColor?: string; amp?: number;
}> = ({frame, y, width = 1080, beats, flat, endX = width + 40, endAt, color = '#39FF8E', deadColor = '#FF3B3B', amp = 1}) => {
  const k: [number, number][] = [[beats[0].at - 30, -30], ...beats.map((b) => [b.at, b.x] as [number, number])];
  if (flat) k.push([flat.at, flat.x]);
  k.push([endAt ?? (flat ? flat.at + 26 : beats[beats.length - 1].at + 30), endX]);
  const headX = keys(frame, k, E.linear);
  const xFlat = flat ? flat.x : 1e9;
  const dead = flat ? frame >= flat.at : false;
  const yAt = (x: number) => y + (x < xFlat ? beats.reduce((a, b) => a + beatShape(x, b.x, amp), 0) : 0);
  let d = '';
  for (let x = -30; x <= headX; x += 3) d += `${d ? 'L' : 'M'}${x.toFixed(1)} ${yAt(x).toFixed(1)} `;
  const id = `ecg${Math.round(y)}`;
  return (
    <svg width={width} height={1200} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2={width} y2="0" gradientUnits="userSpaceOnUse">
          <stop offset={0} stopColor={color} stopOpacity={0.05} />
          <stop offset={clamp01((headX - 420) / width)} stopColor={color} stopOpacity={0.35} />
          <stop offset={clamp01(Math.min(xFlat, width) / width)} stopColor={color} stopOpacity={1} />
          <stop offset={clamp01(Math.min(xFlat, width) / width) + 0.001} stopColor={deadColor} stopOpacity={1} />
          <stop offset={1} stopColor={deadColor} stopOpacity={1} />
        </linearGradient>
        <filter id={`${id}g`}><feGaussianBlur stdDeviation="7" /></filter>
      </defs>
      <path d={d} stroke={`url(#${id})`} strokeWidth={14} fill="none" opacity={0.45} filter={`url(#${id}g)`} />
      <path d={d} stroke={`url(#${id})`} strokeWidth={5} fill="none" strokeLinejoin="round" />
      {headX < width + 20 && d && (
        <>
          <circle cx={headX} cy={yAt(headX)} r={22} fill={dead ? deadColor : color} opacity={0.35} filter={`url(#${id}g)`} />
          <circle cx={headX} cy={yAt(headX)} r={7} fill="#FFFFFF" />
        </>
      )}
    </svg>
  );
};

/** x de la cabeza del trazo en un fotograma (para revelar texto detrás del pulso) */
export const ecgHead = (frame: number, beats: {at: number; x: number}[], flat?: {at: number; x: number}, endX = 1120) => {
  const k: [number, number][] = [[beats[0].at - 30, -30], ...beats.map((b) => [b.at, b.x] as [number, number])];
  if (flat) k.push([flat.at, flat.x], [flat.at + 26, endX]);
  return keys(frame, k, E.linear);
};
