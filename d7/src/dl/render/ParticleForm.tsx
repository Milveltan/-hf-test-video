/**
 * Biblioteca DROGMAN · Partículas "3D" sin WebGL (Canvas 2D + proyección en perspectiva).
 * Formas: sphere · torus · helix (ADN) · ring · disc (galaxia) · cloud · heart · lungs-cloud. Morph entre dos formas.
 * Rinde a velocidad normal en el modo rápido (--gl=angle): úsalo por defecto; three.js solo si hace falta malla/material real.
 * Props: shape / toShape + morph (0..1), count, radius, rotX/rotY (grados), colors, size, glow, cx/cy, seed, spread (0..1 dispersión).
 */
import React, {useEffect, useRef} from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {rng} from '../motion';

export type Shape = 'sphere' | 'torus' | 'helix' | 'ring' | 'disc' | 'cloud' | 'heart';
type V = [number, number, number];

const point = (shape: Shape, i: number, n: number, r: () => number): V => {
  const t = i / n;
  switch (shape) {
    case 'sphere': {
      const y = 1 - 2 * t, rad = Math.sqrt(1 - y * y), th = i * 2.399963;
      return [Math.cos(th) * rad, y, Math.sin(th) * rad];
    }
    case 'torus': {
      const u = t * Math.PI * 2 * 37, v = t * Math.PI * 2;
      return [(1 + 0.35 * Math.cos(u)) * Math.cos(v) * 0.75, 0.35 * Math.sin(u) * 0.75, (1 + 0.35 * Math.cos(u)) * Math.sin(v) * 0.75];
    }
    case 'helix': {
      const strand = i % 2, a = t * Math.PI * 8 + strand * Math.PI;
      const rung = i % 7 === 0 ? r() : 1;
      return [Math.cos(a) * 0.45 * rung, (t - 0.5) * 2.2, Math.sin(a) * 0.45 * rung];
    }
    case 'ring': {
      const a = t * Math.PI * 2;
      return [Math.cos(a) * (0.95 + r() * 0.1), (r() - 0.5) * 0.06, Math.sin(a) * (0.95 + r() * 0.1)];
    }
    case 'disc': {
      const arm = i % 3, d = Math.pow(r(), 0.7), a = d * 7 + (arm * Math.PI * 2) / 3 + (r() - 0.5) * 0.5;
      return [Math.cos(a) * d, (r() - 0.5) * 0.08 * (1 - d), Math.sin(a) * d];
    }
    case 'heart': {
      const a = t * Math.PI * 2 * 1, k = Math.sqrt(r());
      const x = 16 * Math.pow(Math.sin(a), 3), y = 13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a);
      return [(x / 17) * k, (-y / 17) * k, (r() - 0.5) * 0.4 * k];
    }
    default: {
      const u = r() * 2 - 1, th = r() * Math.PI * 2, d = Math.cbrt(r());
      return [Math.sqrt(1 - u * u) * Math.cos(th) * d, u * d, Math.sqrt(1 - u * u) * Math.sin(th) * d];
    }
  }
};

export const ParticleForm: React.FC<{
  shape: Shape; toShape?: Shape; morph?: number; count?: number; radius?: number; rotX?: number; rotY?: number;
  colors?: string[]; size?: number; glow?: number; cx?: number; cy?: number; seed?: number; spread?: number; fov?: number;
}> = ({shape, toShape, morph = 0, count = 3000, radius = 330, rotX = 15, rotY, colors = ['#CFEFFF', '#7FE3FF', '#39FF8E'], size = 2.2, glow = 0.6, cx, cy, seed = 1, spread = 0, fov = 900}) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const pts = React.useMemo(() => {
    const r = rng(seed), r2 = rng(seed + 7);
    const a = Array.from({length: count}, (_, i) => point(shape, i, count, r));
    const b = toShape ? Array.from({length: count}, (_, i) => point(toShape, i, count, r2)) : a;
    const jit = Array.from({length: count}, () => [r() - 0.5, r() - 0.5, r() - 0.5, r()] as number[]);
    return {a, b, jit};
  }, [shape, toShape, count, seed]);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const g = c.getContext('2d')!;
    g.clearRect(0, 0, width, height);
    const ry = (((rotY ?? frame * 0.8) % 360) * Math.PI) / 180, rx = (rotX * Math.PI) / 180;
    const cyy = Math.cos(ry), syy = Math.sin(ry), cxx = Math.cos(rx), sxx = Math.sin(rx);
    const X = cx ?? width / 2, Y = cy ?? height / 2;
    const proj: [number, number, number, number][] = [];
    for (let i = 0; i < count; i++) {
      const pa = pts.a[i], pb = pts.b[i], j = pts.jit[i];
      const m = Math.min(1, Math.max(0, morph * 1.3 - j[3] * 0.3)); // barrido escalonado
      let x = pa[0] + (pb[0] - pa[0]) * m + j[0] * spread * 2;
      let y = pa[1] + (pb[1] - pa[1]) * m + j[1] * spread * 2;
      let z = pa[2] + (pb[2] - pa[2]) * m + j[2] * spread * 2;
      const x1 = x * cyy + z * syy, z1 = -x * syy + z * cyy;
      const y1 = y * cxx - z1 * sxx, z2 = y * sxx + z1 * cxx;
      x = x1 * radius; y = y1 * radius; z = z2 * radius;
      const s = fov / (fov + z);
      proj.push([X + x * s, Y + y * s, s, i]);
    }
    proj.sort((p, q) => p[2] - q[2]);
    if (glow > 0) {
      g.globalCompositeOperation = 'lighter';
      for (const [px, py, s, i] of proj) {
        g.globalAlpha = 0.06 * glow * s;
        g.fillStyle = colors[i % colors.length];
        g.beginPath(); g.arc(px, py, size * 3.2 * s, 0, Math.PI * 2); g.fill();
      }
    }
    g.globalCompositeOperation = 'source-over';
    for (const [px, py, s, i] of proj) {
      g.globalAlpha = Math.min(1, 0.25 + 0.75 * (s - 0.6) * 1.8);
      g.fillStyle = colors[i % colors.length];
      g.fillRect(px - size * s * 0.5, py - size * s * 0.5, size * s, size * s);
    }
    g.globalAlpha = 1;
  }, [frame, pts, morph, rotX, rotY, radius, size, glow, colors, width, height, cx, cy, spread, fov, count]);
  return <canvas ref={ref} width={width} height={height} style={{position: 'absolute', inset: 0}} />;
};
