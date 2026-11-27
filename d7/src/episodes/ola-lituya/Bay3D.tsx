/**
 * CLIP 3D · Bahía Lituya, 1958. Fiordo al anochecer; la ladera este se desploma, el agua se levanta en un anillo,
 * sube por la ladera oeste arrancando el bosque hasta 524 m (holograma del Empire State al lado como escala),
 * un barco cabalga la ola que baja por la bahía y la cámara se eleva para mostrar la marca en la montaña.
 */
import React, {useMemo} from 'react';
import * as THREE from 'three';
import {useCurrentFrame} from 'remotion';
import {Drift, Label3D, MeasureLine, Mountain, World3D, fbm3, noise3} from '../../dl/world3d/kit';
import {BOAT_Z, EMPIRE, FRAMES, IMPACT, RUNUP, T_IMPACT, T_SLIDE, camAt, runupAt, waterY, wf} from './world';

const sm = (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t));
const C = (h: string) => new THREE.Color(h);

/** Ladera oeste (x < −28): relieve con colores dinámicos (agua/espuma mientras sube, tierra desnuda después). */
const slopeH = (x: number, z: number) => {
  const d = Math.max(0, -28 - x);
  return -3 + d * 0.95 + fbm3(x * 0.03, z * 0.03, 2, 4, 3) * 9 + Math.pow(d / 110, 2) * 30;
};
const WestSlope: React.FC = () => {
  const f = useCurrentFrame();
  const ru = runupAt(f), live = f > T_IMPACT + 40 && f < T_IMPACT + 140;
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(130, 380, 130, 300);
    g.rotateX(-Math.PI / 2); g.translate(-28 - 65, 0, -10);
    const p = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) p.setY(i, slopeH(p.getX(i), p.getZ(i)));
    g.computeVertexNormals();
    g.setAttribute('color', new THREE.BufferAttribute(new Float32Array(p.count * 3), 3));
    return g;
  }, []);
  const p = geo.attributes.position as THREE.BufferAttribute, col = geo.attributes.color as THREE.BufferAttribute;
  const forest = C('#24402C'), forest2 = C('#3A5A36'), rock = C('#6E6A62'), snow = C('#E8EEF4'), scar = C('#9C8A6E'), foam = C('#DDF2F6'), tmp = new THREE.Color();
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    const n = noise3(x * 0.2, z * 0.2, 1, 5);
    tmp.copy(forest).lerp(forest2, 0.5 + n * 0.5);
    if (y > 75) tmp.lerp(rock, sm((y - 75) / 20));
    if (y > 100 + n * 6) tmp.copy(snow);
    const inZone = z > -190 && z < -40;
    const edge = RUNUP * (1 - Math.pow(Math.abs(z + 118) / 80, 2)) + n * 4;
    const reach = Math.min(ru, edge);
    if (inZone && y < reach && y > -1) {
      tmp.copy(scar).lerp(C('#B7A889'), 0.5 + n * 0.5);
      if (live && y > reach - 10) tmp.lerp(foam, sm((y - (reach - 10)) / 10));
    }
    col.setXYZ(i, tmp.r, tmp.g, tmp.b);
  }
  col.needsUpdate = true;
  return <mesh geometry={geo}><meshStandardMaterial vertexColors roughness={0.95} /></mesh>;
};

/** Bosque instanciado en la ladera oeste; los árboles bajo la marca caen y desaparecen. */
const Forest: React.FC = () => {
  const f = useCurrentFrame();
  const trees = useMemo(() => {
    const out: {x: number; z: number; y: number; s: number; r: number}[] = [];
    let k = 0;
    for (let i = 0; i < 9000 && out.length < 1400; i++) {
      const x = -32 - ((Math.sin(i * 12.9898) * 43758.5453) % 1 + 1) % 1 * 90;
      const z = -190 + ((Math.sin(i * 78.233) * 12345.678) % 1 + 1) % 1 * 300;
      const y = slopeH(x, z);
      if (y < 1 || y > 82) continue;
      out.push({x, z, y, s: 0.9 + ((k++ * 0.618) % 1) * 0.8, r: (i % 7) * 0.9});
    }
    return out;
  }, []);
  const ru = runupAt(f);
  const trunk = useMemo(() => new THREE.BoxGeometry(0.35, 2.2, 0.35), []);
  const crown = useMemo(() => new THREE.SphereGeometry(1, 8, 6), []);
  const refs = React.useRef<{a: THREE.InstancedMesh | null; b: THREE.InstancedMesh | null}>({a: null, b: null});
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler();
  const apply = () => {
    const {a, b} = refs.current; if (!a || !b) return;
    trees.forEach((t, i) => {
      const edge = RUNUP * (1 - Math.pow(Math.abs(t.z + 118) / 80, 2));
      const hit = t.z > -190 && t.z < -40 && t.y < Math.min(ru, edge);
      const k = hit ? 0 : 1;
      e.set(hit ? 1.2 : 0, t.r, 0); q.setFromEuler(e);
      m.compose(new THREE.Vector3(t.x, t.y + 1.1 * t.s, t.z), q, new THREE.Vector3(t.s * k, t.s * k, t.s * k)); a.setMatrixAt(i, m);
      m.compose(new THREE.Vector3(t.x, t.y + 3.2 * t.s, t.z), q, new THREE.Vector3(1.1 * t.s * k, 2.1 * t.s * k, 1.1 * t.s * k)); b.setMatrixAt(i, m);
    });
    a.instanceMatrix.needsUpdate = true; b.instanceMatrix.needsUpdate = true;
  };
  React.useLayoutEffect(apply);
  return (
    <group>
      <instancedMesh ref={(r) => { refs.current.a = r; apply(); }} args={[trunk, undefined, trees.length]}><meshStandardMaterial color="#3A2A1E" roughness={1} /></instancedMesh>
      <instancedMesh ref={(r) => { refs.current.b = r; apply(); }} args={[crown, undefined, trees.length]}><meshStandardMaterial color="#1F3A26" roughness={1} /></instancedMesh>
    </group>
  );
};

/** Pared este (x > 28) con el bloque que se desploma. */
const EastWall: React.FC = () => {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(110, 380, 110, 240);
    g.rotateX(-Math.PI / 2); g.translate(28 + 55, 0, -10);
    const p = g.attributes.position as THREE.BufferAttribute;
    const col = new Float32Array(p.count * 3); const a = C('#4A4A46'), b = C('#7C786E'), s = C('#EEF2F6'), fo = C('#22382A'), tmp = new THREE.Color();
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), z = p.getZ(i), d = Math.max(0, x - 28);
      const y = -3 + Math.min(d * 2.4, 60) + d * 0.5 + fbm3(x * 0.04, z * 0.04, 5, 4, 7) * 12;
      p.setY(i, y);
      const n = noise3(x * 0.15, z * 0.15, 2, 9);
      tmp.copy(a).lerp(b, 0.5 + n * 0.5); if (y < 40 && z > -100) tmp.lerp(fo, 0.6); if (y > 95 + n * 8) tmp.copy(s);
      col.set([tmp.r, tmp.g, tmp.b], i * 3);
    }
    g.setAttribute('color', new THREE.BufferAttribute(col, 3)); g.computeVertexNormals(); return g;
  }, []);
  return <mesh geometry={geo}><meshStandardMaterial vertexColors roughness={0.95} /></mesh>;
};

const Slide: React.FC = () => {
  const f = useCurrentFrame();
  const t = sm((f - T_SLIDE) / Math.max(20, T_IMPACT - T_SLIDE));
  const rocks = useMemo(() => Array.from({length: 90}, (_, i) => ({x: 33 + (i % 9) * 2.2, y: 36 + Math.floor(i / 9) * 3.6, z: -148 + ((i * 7) % 13) * 3, s: 1.3 + (i % 4) * 0.6, r: i})), []);
  const geo = useMemo(() => new THREE.IcosahedronGeometry(1, 1), []);
  return (
    <group>
      {rocks.map((r, i) => {
        const k = sm(t * 1.2 - (i % 6) * 0.03);
        const x = r.x - k * (14 + (i % 3) * 3), y = r.y - k * (r.y + 4) + Math.sin(k * Math.PI) * 3;
        return <mesh key={i} geometry={geo} position={[x, y, r.z]} rotation={[k * 3 + r.r, k * 2, 0]} scale={r.s} visible={f < T_IMPACT + 18}><meshStandardMaterial color={i % 2 ? '#5A5650' : '#6E6A62'} roughness={1} flatShading /></mesh>;
      })}
    </group>
  );
};

const Water: React.FC = () => {
  const f = useCurrentFrame();
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(120, 420, 120, 360); g.rotateX(-Math.PI / 2); g.translate(0, 0, -10);
    g.setAttribute('color', new THREE.BufferAttribute(new Float32Array(g.attributes.position.count * 3), 3)); return g;
  }, []);
  const p = geo.attributes.position as THREE.BufferAttribute, col = geo.attributes.color as THREE.BufferAttribute;
  const deep = C('#082A33'), shal = C('#1E5A62'), foam = C('#E9F7F8'), tmp = new THREE.Color();
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), z = p.getZ(i), y = waterY(x, z, f);
    p.setY(i, y);
    const top = Math.max(0, y - waterY(x, z + 2.5, f));
    tmp.copy(deep).lerp(shal, sm(y / 14) * 0.8).lerp(foam, Math.min(0.9, sm((top - 1.5) / 3) * 0.9 + sm((y - 18) / 8) * 0.3));
    col.setXYZ(i, tmp.r, tmp.g, tmp.b);
  }
  p.needsUpdate = true; col.needsUpdate = true; geo.computeVertexNormals();
  return <mesh geometry={geo}><meshStandardMaterial vertexColors roughness={0.42} metalness={0.25} /></mesh>;
};

const Spray: React.FC = () => {
  const f = useCurrentFrame();
  const dt = f - T_IMPACT;
  const N = 2600;
  const geo = useMemo(() => new THREE.BufferGeometry(), []);
  const arr = useMemo(() => new Float32Array(N * 3), []);
  const tex = useMemo(() => {
    const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d')!;
    const rg = g.createRadialGradient(32, 32, 0, 32, 32, 32); rg.addColorStop(0, 'rgba(255,255,255,0.9)'); rg.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = rg; g.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  }, []);
  for (let i = 0; i < N; i++) {
    const hr = (k: number) => { const v = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453; return v - Math.floor(v); };
    const a = hr(1) * Math.PI * 2, sp = 0.4 + hr(2) * 1.1, up = 0.6 + hr(3) * 1.8, t = Math.max(0, dt);
    const ring = i % 2 === 0;
    const R = ring ? t * (58 / Math.max(40, wf(24) - wf(13))) : t * sp * 0.35;
    arr[i * 3] = IMPACT[0] + Math.cos(a) * R; arr[i * 3 + 2] = IMPACT[1] + Math.sin(a) * R * 1.2;
    arr[i * 3 + 1] = ring ? waterY(arr[i * 3], arr[i * 3 + 2], f) * (0.6 + hr(4) * 0.7) + hr(5) * 2 : Math.max(0, up * 1.6 * t - 0.03 * t * t);
  }
  geo.setAttribute('position', new THREE.BufferAttribute(arr, 3));
  const op = dt > 0 ? Math.max(0, 1 - dt / 160) : 0;
  return <points geometry={geo}><pointsMaterial map={tex} size={1.3} color="#F2FBFF" transparent alphaTest={0.02} opacity={op} depthWrite={false} sizeAttenuation /></points>;
};

/** Holograma del Empire State (cajas escalonadas + antena) como escala. */
const Empire: React.FC<{k: number}> = ({k}) => {
  const parts: [number, number, number][] = [[6, 8.6, 6], [5.2, 14, 5.2], [4.2, 10, 4.2], [3, 4.4, 3], [2.2, 1.6, 2.2], [0.7, 2.6, 0.7], [0.25, 2.9, 0.25]];
  let y = 0;
  return (
    <group position={[-20, 0, -96]} scale={[1, k, 1]}>
      {parts.map(([w, h, d], i) => { const cy = y + h / 2; y += h; return (
        <group key={i}>
          <mesh position={[0, cy, 0]}><boxGeometry args={[w, h, d]} /><meshBasicMaterial color="#7FE8FF" transparent opacity={0.18} depthWrite={false} fog={false} /></mesh>
          <mesh position={[0, cy, 0]}><boxGeometry args={[w, h, d]} /><meshBasicMaterial color="#BFF6FF" wireframe transparent opacity={0.7} fog={false} /></mesh>
        </group>); })}
      <group>{Array.from({length: 18}, (_, i) => <mesh key={i} position={[0, 1 + i * 2, 0]}><boxGeometry args={[i < 4 ? 6.05 : i < 11 ? 5.25 : 4.25, 0.08, i < 4 ? 6.05 : i < 11 ? 5.25 : 4.25]} /><meshBasicMaterial color="#BFF6FF" transparent opacity={0.4} fog={false} /></mesh>)}</group>
    </group>
  );
};

const Boat: React.FC = () => {
  const f = useCurrentFrame();
  const x = 2, z = BOAT_Z + Math.min(0, -(f - wf(37)) * 0.02);
  const y = waterY(x, z, f), dz = waterY(x, z + 1.5, f) - waterY(x, z - 1.5, f);
  return (
    <group position={[x, y + 0.4, z]} rotation={[-Math.atan2(dz, 3), 0.35, Math.sin(f * 0.1) * 0.05]}>
      <mesh position={[0, 0.3, 0]}><boxGeometry args={[2.2, 1.2, 6]} /><meshStandardMaterial color="#B23A2E" roughness={0.6} /></mesh>
      <mesh position={[0, 0.95, 0]}><boxGeometry args={[2.3, 0.18, 6.1]} /><meshStandardMaterial color="#F2EDE2" /></mesh>
      <mesh position={[0, 1.7, -0.8]}><boxGeometry args={[1.6, 1.3, 1.8]} /><meshStandardMaterial color="#F2EDE2" /></mesh>
      <mesh position={[0, 3.2, 1]}><boxGeometry args={[0.12, 3.6, 0.12]} /><meshStandardMaterial color="#333" /></mesh>
      <pointLight position={[0, 2.6, -0.8]} intensity={40} distance={14} color="#FFD58A" />
    </group>
  );
};

const Sky: React.FC = () => {
  const geo = useMemo(() => {
    const g = new THREE.SphereGeometry(900, 32, 16); const p = g.attributes.position as THREE.BufferAttribute; const col = new Float32Array(p.count * 3);
    const top = C('#16203A'), mid = C('#3C4E72'), hor = C('#E7A27A'), tmp = new THREE.Color();
    for (let i = 0; i < p.count; i++) { const y = p.getY(i) / 900; tmp.copy(hor).lerp(mid, sm(y / 0.25)).lerp(top, sm((y - 0.25) / 0.6)); col.set([tmp.r, tmp.g, tmp.b], i * 3); }
    g.setAttribute('color', new THREE.BufferAttribute(col, 3)); return g;
  }, []);
  return <mesh geometry={geo}><meshBasicMaterial vertexColors side={THREE.BackSide} fog={false} /></mesh>;
};

const fog = () => ({color: '#5A6A84', density: 0.0042});

export const Bay3D: React.FC = () => {
  const f = useCurrentFrame();
  const emp = sm((f - wf(29)) / 18);
  const lab = (a: number, b: number) => sm((f - a) / (b - a));
  const ru = runupAt(f);
  return (
    <World3D camAt={camAt} fog={fog}>
      <Sky />
      <hemisphereLight args={['#B9C8E8', '#22303A', 0.9]} />
      <directionalLight position={[-200, 60, 120]} intensity={2.4} color="#FFC79A" />
      <directionalLight position={[150, 120, -60]} intensity={0.6} color="#9FB6E0" />
      <Mountain height={150} radius={120} seed={4} position={[-40, -2, -330]} snow={0.55} colors={['#4A4E54', '#8E9298']} />
      <Mountain height={120} radius={100} seed={9} position={[90, -2, -300]} snow={0.5} colors={['#4A4E54', '#8E9298']} />
      <WestSlope />
      <Forest />
      <EastWall />
      <Slide />
      <Water />
      <Spray />
      <Boat />
      <Drift camAt={camAt} count={600} box={60} size={0.25} color="#FFFFFF" opacity={0.25} vy={-0.01} />
      {emp > 0 && <Empire k={emp} />}
      <MeasureLine from={[-27, 0, -96]} to={[-27, RUNUP, -96]} progress={lab(wf(24), wf(27))} cap={4} thick={0.3} />
      <Label3D text="524 m" sub="HASTA DONDE LLEGÓ EL AGUA" position={[-33, Math.max(6, ru) + 4, -96]} height={5.5 + 9 * lab(wf(41), wf(46))} opacity={lab(wf(25), wf(27))} />
      <Label3D text="EMPIRE STATE" sub="443 m" position={[-12, EMPIRE + 5, -96]} height={4 + 7 * lab(wf(41), wf(46))} accent="#7FE8FF" opacity={emp} />
      <Label3D text="ALASKA · 1958" position={[0, 38, -60]} height={5} accent="#FFC79A" opacity={lab(4, 18) * (1 - lab(wf(5), wf(6)))} />
    </World3D>
  );
};
export {FRAMES};
