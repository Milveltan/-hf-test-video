/**
 * Biblioteca DROGMAN · Kit de mundos 3D (three.js). Todo es determinista (ruido con semilla) para que cada fotograma
 * se renderice igual. Se usa SIEMPRE dentro de un clip 3D (ver dl/render/Clip3D y docs/RENDER.md).
 *
 *  World3D            ThreeCanvas 1080×1200 + niebla exponencial + cámara controlada por fotograma (camAt).
 *  camPath(keys)      trayectoria de cámara suave (Catmull-Rom) entre llaves {f, pos, look}.
 *  noise3 / fbm3      ruido de valor 3D con semilla (relieve de roca, montañas).
 *  RockSurface        plano desplazado por fbm con colores por vértice (paredes, terreno, cuevas).
 *  Mountain           montaña procedural (cono desplazado) con nieve opcional en la cima.
 *  GodRays            haces de luz volumétricos (planos aditivos que giran hacia la cámara).
 *  Drift              partículas flotantes alrededor de la cámara (polvo, nieve marina, chispas).
 *  Label3D            etiqueta de texto en el mundo (sprite con textura de canvas), siempre legible.
 *  MeasureLine        línea de medida vertical u horizontal con topes y etiqueta (comparaciones de escala).
 */
import React, {useMemo} from 'react';
import * as THREE from 'three';
import {useThree} from '@react-three/fiber';
import {ThreeCanvas} from '@remotion/three';
import {continueRender, delayRender, useCurrentFrame} from 'remotion';
import '../fonts';

/* ───────── ruido ───────── */
const hash = (x: number, y: number, z: number, s: number) => {
  const h = Math.sin(x * 127.1 + y * 311.7 + z * 74.7 + s * 19.19) * 43758.5453;
  return h - Math.floor(h);
};
const sm = (t: number) => t * t * (3 - 2 * t);
export const noise3 = (x: number, y: number, z: number, s = 1) => {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z), xf = sm(x - xi), yf = sm(y - yi), zf = sm(z - zi);
  const L = (a: number, b: number, t: number) => a + (b - a) * t;
  const c = (dx: number, dy: number, dz: number) => hash(xi + dx, yi + dy, zi + dz, s);
  return L(L(L(c(0, 0, 0), c(1, 0, 0), xf), L(c(0, 1, 0), c(1, 1, 0), xf), yf), L(L(c(0, 0, 1), c(1, 0, 1), xf), L(c(0, 1, 1), c(1, 1, 1), xf), yf), zf) * 2 - 1;
};
export const fbm3 = (x: number, y: number, z: number, oct = 5, s = 1) => {
  let a = 0.5, f = 1, v = 0;
  for (let i = 0; i < oct; i++) { v += a * noise3(x * f, y * f, z * f, s + i); a *= 0.5; f *= 2.03; }
  return v;
};

/* ───────── cámara ───────── */
export type CamKey = {f: number; pos: [number, number, number]; look: [number, number, number]; fov?: number};
const ease = (t: number) => t * t * (3 - 2 * t);
export const camPath = (keys: CamKey[]) => (frame: number) => {
  const k = keys;
  if (frame <= k[0].f) return k[0];
  if (frame >= k[k.length - 1].f) return k[k.length - 1];
  let i = 0; while (frame > k[i + 1].f) i++;
  const t = ease((frame - k[i].f) / (k[i + 1].f - k[i].f));
  const p = (j: number) => k[Math.max(0, Math.min(k.length - 1, j))];
  const cr = (a: number, b: number, c: number, d: number) => 0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t * t + (-a + 3 * b - 3 * c + d) * t * t * t);
  const v = (sel: (c: CamKey) => [number, number, number]) => [0, 1, 2].map((n) => cr(sel(p(i - 1))[n], sel(p(i))[n], sel(p(i + 1))[n], sel(p(i + 2))[n])) as [number, number, number];
  return {f: frame, pos: v((c) => c.pos), look: v((c) => c.look), fov: (p(i).fov ?? 50) + ((p(i + 1).fov ?? 50) - (p(i).fov ?? 50)) * t};
};

const CamRig: React.FC<{camAt: (f: number) => CamKey; fog?: (f: number) => {color: string; density: number}; onFrame?: (f: number, scene: THREE.Scene) => void}> = ({camAt, fog, onFrame}) => {
  const frame = useCurrentFrame();
  const {camera, scene} = useThree();
  const c = camAt(frame);
  camera.position.set(...c.pos);
  (camera as THREE.PerspectiveCamera).fov = c.fov ?? 50;
  (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
  camera.lookAt(...c.look);
  if (fog) {
    const fg = fog(frame);
    if (!(scene.fog instanceof THREE.FogExp2)) scene.fog = new THREE.FogExp2(fg.color, fg.density);
    (scene.fog as THREE.FogExp2).color.set(fg.color); (scene.fog as THREE.FogExp2).density = fg.density;
    scene.background = new THREE.Color(fg.color);
  }
  onFrame?.(frame, scene);
  return null;
};

export const World3D: React.FC<{camAt: (f: number) => CamKey; fog?: (f: number) => {color: string; density: number}; children: React.ReactNode; transparent?: boolean}> = ({camAt, fog, children, transparent}) => {
  // espera a que las fuentes estén listas: las etiquetas 3D se dibujan en canvas con Anton / JetBrains Mono
  const [handle] = React.useState(() => delayRender('fuentes 3D'));
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    Promise.all([document.fonts.load('400 96px Anton'), document.fonts.load('700 40px "JetBrains Mono"')]).catch(() => null).then(() => { setReady(true); continueRender(handle); });
  }, [handle]);
  if (!ready) return null;
  return <World3DInner camAt={camAt} fog={fog} transparent={transparent}>{children}</World3DInner>;
};
const World3DInner: React.FC<{camAt: (f: number) => CamKey; fog?: (f: number) => {color: string; density: number}; children: React.ReactNode; transparent?: boolean}> = ({camAt, fog, children, transparent}) => (
  <ThreeCanvas width={1080} height={1200} camera={{fov: 50, near: 0.5, far: 1200, position: [0, 0, 5]}} gl={{antialias: false, alpha: !!transparent, preserveDrawingBuffer: true, logarithmicDepthBuffer: false}} style={{background: transparent ? 'transparent' : '#000'}}>
    <CamRig camAt={camAt} fog={fog} />
    {children}
  </ThreeCanvas>
);

/* ───────── geometría procedural ───────── */
export const RockSurface: React.FC<{w: number; h: number; seg?: number; amp?: number; scale?: number; seed?: number; colors?: [string, string, string]; position?: [number, number, number]; rotation?: [number, number, number]; bend?: number}> = ({w, h, seg = 160, amp = 3, scale = 0.08, seed = 1, colors = ['#3A4A52', '#6B7A7E', '#A9B4B0'], position, rotation, bend = 0}) => {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(w, h, seg, seg);
    const pos = g.attributes.position as THREE.BufferAttribute;
    const col = new Float32Array(pos.count * 3);
    const [c0, c1, c2] = colors.map((c) => new THREE.Color(c));
    const tmp = new THREE.Color();
    // octavas limitadas a la resolución de la malla (evita el patrón de triángulos por aliasing)
    const spacing = Math.max(w, h) / seg, oct = Math.max(1, Math.min(6, Math.floor(Math.log2(0.5 / (scale * spacing))) + 1));
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), y = pos.getY(i);
      const n = fbm3(x * scale, y * scale, seed * 3.1, oct, seed);
      const ridge = 1 - Math.abs(noise3(x * scale * 0.5, y * scale * 2.2, seed, seed + 9));
      const z = n * amp + ridge * amp * 0.6 + bend * (x / w) * (x / w) * w * 0.5;
      pos.setZ(i, z);
      const t = Math.max(0, Math.min(1, 0.5 + n * 0.9));
      tmp.copy(c0).lerp(c1, t); if (t > 0.6) tmp.lerp(c2, (t - 0.6) * 2);
      col[i * 3] = tmp.r; col[i * 3 + 1] = tmp.g; col[i * 3 + 2] = tmp.b;
    }
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    g.computeVertexNormals();
    return g;
  }, [w, h, seg, amp, scale, seed, colors.join(), bend]);
  return <mesh geometry={geo} position={position} rotation={rotation}><meshStandardMaterial vertexColors roughness={0.95} metalness={0.02} side={THREE.DoubleSide} /></mesh>;
};

/** Montaña procedural como relieve sobre un plano (no usa ConeGeometry: en WebGL por software pierde triángulos).
 *  La base queda en `position` (y) y la cima exactamente a `height` sobre ella, en el centro. */
export const Mountain: React.FC<{height: number; radius: number; seed?: number; position?: [number, number, number]; snow?: number; colors?: [string, string]; seg?: number}> = ({height, radius, seed = 3, position, snow = 0.82, colors = ['#4A4440', '#8C857C'], seg = 220}) => {
  const geo = useMemo(() => {
    const W = radius * 2.6;
    const g = new THREE.PlaneGeometry(W, W, seg, seg);
    const pos = g.attributes.position as THREE.BufferAttribute;
    const col = new Float32Array(pos.count * 3);
    const a = new THREE.Color(colors[0]), b = new THREE.Color(colors[1]), sn = new THREE.Color('#EEF4FF'), tmp = new THREE.Color();
    const sc = 3 / radius;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), y = pos.getY(i);
      const r = Math.hypot(x, y), ang = Math.atan2(y, x);
      const warp = fbm3(x * sc * 0.6, y * sc * 0.6, seed, 3, seed) * 0.28;
      const ridges = Math.pow(1 - Math.abs(noise3(Math.cos(ang) * 3 + 5, Math.sin(ang) * 3, r * sc * 0.8, seed + 4)), 2);
      const rr = r / (radius * (1 + warp + ridges * 0.12));
      let h01 = Math.max(0, 1 - rr);
      h01 = Math.pow(h01, 1.35) * (1 + 0.08 * fbm3(x * sc * 2, y * sc * 2, seed + 2, 3, seed)) / (1 + Math.max(0, 0.08 * fbm3(0, 0, seed + 2, 3, seed)));
      const z = Math.min(1, h01) * height;
      pos.setZ(i, z);
      const n = fbm3(x * sc * 3, y * sc * 3, seed + 7, 3, seed);
      tmp.copy(a).lerp(b, Math.max(0, Math.min(1, 0.5 + n)));
      if (h01 > snow + n * 0.08) tmp.lerp(sn, 0.9);
      col[i * 3] = tmp.r; col[i * 3 + 1] = tmp.g; col[i * 3 + 2] = tmp.b;
    }
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    g.computeVertexNormals();
    return g;
  }, [height, radius, seed, snow, colors.join(), seg]);
  return <mesh geometry={geo} position={position} rotation={[-Math.PI / 2, 0, 0]}><meshStandardMaterial vertexColors roughness={0.88} /></mesh>;
};

/* ───────── luz y atmósfera ───────── */
const rayTexture = (() => {
  let t: THREE.CanvasTexture | null = null;
  return () => {
    if (t) return t;
    const c = document.createElement('canvas'); c.width = 64; c.height = 256;
    const g = c.getContext('2d')!;
    const lg = g.createLinearGradient(0, 0, 0, 256); lg.addColorStop(0, 'rgba(255,255,255,1)'); lg.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = lg; g.fillRect(0, 0, 64, 256);
    const id = g.getImageData(0, 0, 64, 256);
    for (let y = 0; y < 256; y++) for (let x = 0; x < 64; x++) { const e = Math.sin((x / 63) * Math.PI); id.data[(y * 64 + x) * 4 + 3] *= e * e; }
    g.putImageData(id, 0, 0);
    t = new THREE.CanvasTexture(c); return t;
  };
})();

export const GodRays: React.FC<{count?: number; origin: [number, number, number]; spread?: number; length?: number; width?: number; color?: string; opacity?: number; seed?: number}> = ({count = 10, origin, spread = 14, length = 60, width = 3, color = '#BFEFFF', opacity = 0.18, seed = 2}) => {
  const frame = useCurrentFrame();
  const rays = useMemo(() => Array.from({length: count}, (_, i) => ({x: (hash(i, 1, 2, seed) - 0.5) * spread * 2, z: (hash(i, 3, 4, seed) - 0.5) * spread * 2, w: width * (0.5 + hash(i, 5, 6, seed)), tilt: (hash(i, 7, 8, seed) - 0.5) * 0.3, ph: hash(i, 9, 1, seed) * 6})), [count, spread, width, seed]);
  const tex = rayTexture();
  return (
    <group position={origin}>
      {rays.map((r, i) => (
        <mesh key={i} position={[r.x, -length / 2, r.z]} rotation={[0, frame * 0.004 + i, r.tilt]}>
          <planeGeometry args={[r.w, length]} />
          <meshBasicMaterial map={tex} color={color} transparent opacity={opacity * (0.6 + 0.4 * Math.sin(frame * 0.05 + r.ph))} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} fog={false} />
        </mesh>
      ))}
    </group>
  );
};

const dotTexture = (() => {
  let t: THREE.CanvasTexture | null = null;
  return () => {
    if (t) return t;
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const g = c.getContext('2d')!; const rg = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    rg.addColorStop(0, 'rgba(255,255,255,1)'); rg.addColorStop(0.4, 'rgba(255,255,255,0.5)'); rg.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = rg; g.fillRect(0, 0, 64, 64); t = new THREE.CanvasTexture(c); return t;
  };
})();

/** Partículas en un volumen que sigue a la cámara (se envuelven), con deriva lenta. */
export const Drift: React.FC<{camAt: (f: number) => CamKey; count?: number; box?: number; size?: number; color?: string; opacity?: number; vy?: number; seed?: number}> = ({camAt, count = 2500, box = 30, size = 0.08, color = '#DDEFFF', opacity = 0.7, vy = -0.01, seed = 4}) => {
  const frame = useCurrentFrame();
  const base = useMemo(() => Float32Array.from({length: count * 3}, (_, i) => hash(i, 0, 0, seed) * box), [count, box, seed]);
  const c = camAt(frame).pos;
  const arr = useMemo(() => new Float32Array(count * 3), [count]);
  for (let i = 0; i < count; i++) {
    for (let a = 0; a < 3; a++) {
      const drift = a === 1 ? vy * frame : Math.sin(frame * 0.01 + i) * 0.3;
      const v = base[i * 3 + a] + drift - (c[a] - box / 2);
      arr[i * 3 + a] = c[a] - box / 2 + (((v % box) + box) % box);
    }
  }
  const geo = useMemo(() => new THREE.BufferGeometry(), []);
  geo.setAttribute('position', new THREE.BufferAttribute(arr, 3));
  (geo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
  return <points geometry={geo}><pointsMaterial map={dotTexture()} size={size} color={color} transparent opacity={opacity} depthWrite={false} blending={THREE.AdditiveBlending} sizeAttenuation /></points>;
};

/* ───────── etiquetas y medidas ───────── */
const labelCache = new Map<string, {tex: THREE.CanvasTexture; aspect: number}>();
const labelTex = (text: string, accent: string, sub?: string) => {
  const key = `${text}|${accent}|${sub}`;
  if (labelCache.has(key)) return labelCache.get(key)!;
  const c = document.createElement('canvas'); const g = c.getContext('2d')!;
  const fs = 96, pad = 40;
  g.font = `400 ${fs}px Anton, Impact, sans-serif`; const w1 = g.measureText(text).width;
  g.font = `700 ${fs * 0.42}px "JetBrains Mono", monospace`; const w2 = sub ? g.measureText(sub).width : 0;
  c.width = Math.ceil(Math.max(w1, w2) + pad * 2 + 20); c.height = sub ? 220 : 160;
  g.fillStyle = 'rgba(6,14,24,0.78)'; g.strokeStyle = accent; g.lineWidth = 6;
  const r = 30; g.beginPath(); g.roundRect(3, 3, c.width - 6, c.height - 6, r); g.fill(); g.stroke();
  g.fillStyle = accent; g.fillRect(pad - 18, 40, 8, c.height - 80);
  g.fillStyle = '#FFFFFF'; g.font = `400 ${fs}px Anton, Impact, sans-serif`; g.textBaseline = 'middle'; g.fillText(text, pad, sub ? 78 : c.height / 2 + 4);
  if (sub) { g.fillStyle = accent; g.font = `700 ${fs * 0.42}px "JetBrains Mono", monospace`; g.fillText(sub, pad, 162); }
  const tex = new THREE.CanvasTexture(c); tex.anisotropy = 4;
  const v = {tex, aspect: c.width / c.height}; labelCache.set(key, v); return v;
};

export const Label3D: React.FC<{text: string; sub?: string; position: [number, number, number]; height?: number; accent?: string; opacity?: number}> = ({text, sub, position, height = 1.2, accent = '#FFD25A', opacity = 1}) => {
  const {tex, aspect} = labelTex(text, accent, sub);
  return <sprite position={position} scale={[height * aspect, height, 1]}><spriteMaterial map={tex} transparent opacity={opacity} depthTest={false} fog={false} /></sprite>;
};

export const MeasureLine: React.FC<{from: [number, number, number]; to: [number, number, number]; color?: string; progress?: number; cap?: number; thick?: number}> = ({from, to, color = '#FFD25A', progress = 1, cap = 0.8, thick = 0.05}) => {
  const a = new THREE.Vector3(...from), b = new THREE.Vector3(...to);
  const end = a.clone().lerp(b, progress);
  const mid = a.clone().lerp(end, 0.5), len = a.distanceTo(end);
  const dir = b.clone().sub(a).normalize();
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
  return (
    <group>
      {len > 0.01 && <mesh position={mid} quaternion={q}><boxGeometry args={[thick * 2, len, thick * 2]} /><meshBasicMaterial color={color} fog={false} /></mesh>}
      {[a, end].map((p, i) => <mesh key={i} position={p} quaternion={q}><boxGeometry args={[cap, thick * 1.4, thick * 1.4]} /><meshBasicMaterial color={color} fog={false} /></mesh>)}
    </group>
  );
};
