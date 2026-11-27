/**
 * CLIP 3D · Dentro de una célula. Una sola toma de 2½ min: tejido → entramos a la célula → fábrica (mitocondrias,
 * retículo, ribosomas) → se acumula basura → una burbuja (fagóforo) la atrapa → viaja al lisosoma ("horno") → se
 * deshace en partículas que reconstruyen una pieza nueva → levaduras con los genes encendidos → sin alimento el
 * reciclaje se acelera → cuando falla, la basura se acumula → salimos al tejido y la última célula se apaga.
 * Solo esferas, icosaedros, cajas, planos y puntos (los conos/cilindros fallan en WebGL por software).
 */
import React, {useMemo} from 'react';
import * as THREE from 'three';
import {useCurrentFrame} from 'remotion';
import {Drift, Label3D, World3D, fbm3, noise3} from '../../dl/world3d/kit';
import {C1, CELL_R, FRAMES, LYSO, NEWPART, YEAST, camAt, sm, span, wf} from './world';

const h = (i: number, k: number) => { const v = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453; return v - Math.floor(v); };
const V = (a: [number, number, number]) => new THREE.Vector3(...a);

/* ───────── piezas ───────── */
const NoisySphere: React.FC<{r: number; amp?: number; seed?: number; color: string; emissive?: string; ei?: number; opacity?: number; seg?: number}> = ({r, amp = 0.08, seed = 1, color, emissive = '#000', ei = 0, opacity = 1, seg = 64}) => {
  const geo = useMemo(() => {
    const g = new THREE.SphereGeometry(r, seg, Math.round(seg * 0.6)); const p = g.attributes.position as THREE.BufferAttribute; const v = new THREE.Vector3();
    for (let i = 0; i < p.count; i++) { v.fromBufferAttribute(p, i); const n = fbm3(v.x / r * 1.8 + seed, v.y / r * 1.8, v.z / r * 1.8, 4, seed); v.multiplyScalar(1 + n * amp); p.setXYZ(i, v.x, v.y, v.z); }
    g.computeVertexNormals(); return g;
  }, [r, amp, seed, seg]);
  return <mesh geometry={geo}><meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={ei} roughness={0.55} transparent={opacity < 1} opacity={opacity} depthWrite={opacity >= 1} /></mesh>;
};

/** Célula genérica del tejido. */
const TissueCell: React.FC<{p: [number, number, number]; r: number; i: number; f: number; dim?: number}> = ({p, r, i, f, dim = 0}) => {
  const flash = Math.pow(Math.max(0, Math.sin(f * 0.05 + i * 1.7)), 30);
  return (
    <group position={p} rotation={[i, i * 2, 0]}>
      <mesh><sphereGeometry args={[r, 28, 18]} /><meshStandardMaterial color="#E9708A" emissive="#7A1430" emissiveIntensity={0.35 * (1 - dim)} transparent opacity={0.32} depthWrite={false} roughness={0.4} /></mesh>
      <mesh position={[r * 0.2, 0, 0]}><sphereGeometry args={[r * 0.36, 20, 14]} /><meshStandardMaterial color="#6A2A8C" emissive="#3A0E52" emissiveIntensity={0.4} /></mesh>
      <mesh position={[-r * 0.4, r * 0.2, r * 0.3]}><sphereGeometry args={[r * 0.12, 10, 8]} /><meshBasicMaterial color="#FFB070" transparent opacity={0.3 + flash * 0.7 * (1 - dim)} fog={false} /></mesh>
    </group>
  );
};

const Tissue: React.FC = () => {
  const f = useCurrentFrame();
  const cells = useMemo(() => {
    const out: {p: [number, number, number]; r: number}[] = [];
    for (let i = 0; out.length < 70 && i < 600; i++) {
      const p: [number, number, number] = [(h(i, 1) - 0.5) * 520, (h(i, 2) - 0.5) * 260, (h(i, 3) - 0.5) * 520 - 60];
      const r = 18 + h(i, 4) * 16;
      if (Math.hypot(...p) < 75) continue;
      if (out.some((o) => Math.hypot(o.p[0] - p[0], o.p[1] - p[1], o.p[2] - p[2]) < o.r + r + 6)) continue;
      out.push({p, r});
    }
    return out;
  }, []);
  return <group>{cells.map((c, i) => <TissueCell key={i} p={c.p} r={c.r} i={i} f={f} />)}</group>;
};

/** Mitocondria: elipsoide naranja con bandas (crestas) por vértice. */
const Mito: React.FC<{p: [number, number, number]; rot: [number, number, number]; s?: number; glow?: number}> = ({p, rot, s = 1, glow = 1}) => {
  const geo = useMemo(() => {
    const g = new THREE.SphereGeometry(1, 40, 24); g.scale(3.2, 1.2, 1.2);
    const pp = g.attributes.position as THREE.BufferAttribute; const col = new Float32Array(pp.count * 3); const a = new THREE.Color('#FF8A3D'), b = new THREE.Color('#B8461E'), t = new THREE.Color();
    for (let i = 0; i < pp.count; i++) { const x = pp.getX(i); t.copy(a).lerp(b, 0.5 + 0.5 * Math.sin(x * 4.2)); col.set([t.r, t.g, t.b], i * 3); }
    g.setAttribute('color', new THREE.BufferAttribute(col, 3)); return g;
  }, []);
  return <mesh geometry={geo} position={p} rotation={rot} scale={s}><meshStandardMaterial vertexColors emissive="#FF6A1A" emissiveIntensity={0.25 * glow} roughness={0.5} /></mesh>;
};

/** Retículo: hoja ondulada translúcida. */
const ERSheet: React.FC<{p: [number, number, number]; rot: [number, number, number]; seed: number}> = ({p, rot, seed}) => {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(14, 6, 60, 24); const pp = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pp.count; i++) { const x = pp.getX(i), y = pp.getY(i); pp.setZ(i, Math.sin(x * 0.9 + seed) * 0.8 + noise3(x * 0.3, y * 0.3, seed, seed) * 0.8); }
    g.computeVertexNormals(); return g;
  }, [seed]);
  return <mesh geometry={geo} position={p} rotation={rot}><meshStandardMaterial color="#3FC1B5" emissive="#0E5A54" emissiveIntensity={0.4} transparent opacity={0.55} side={THREE.DoubleSide} depthWrite={false} /></mesh>;
};

/** Basura: proteína rota (icosaedro irregular). */
const junkGeo = (() => { let g: THREE.BufferGeometry | null = null; return () => { if (g) return g; g = new THREE.IcosahedronGeometry(1, 0); const p = g.attributes.position as THREE.BufferAttribute; for (let i = 0; i < p.count; i++) p.setXYZ(i, p.getX(i) * (0.7 + h(i, 9) * 0.6), p.getY(i) * (0.6 + h(i, 8) * 0.7), p.getZ(i) * (0.7 + h(i, 7) * 0.5)); g.computeVertexNormals(); return g; }; })();

type Junk = {home: [number, number, number]; s: number; cargo: number; at: number; c: string};
const makeJunk = (): Junk[] => {
  const out: Junk[] = [];
  for (let i = 0; i < 170; i++) {
    const cargo = i < 9 ? 0 : i < 15 ? 1 : i < 21 ? 2 : i < 27 ? 3 : -1;
    const center = cargo === 0 ? C1 : cargo === 1 ? [-6, -8, 10] : cargo === 2 ? [4, 9, 9] : cargo === 3 ? [-12, -4, -6] : null;
    const r = center ? 2.2 : 6 + h(i, 5) * 16;
    const th = h(i, 1) * Math.PI * 2, ph = Math.acos(2 * h(i, 2) - 1);
    const base: [number, number, number] = center ? (center as [number, number, number]) : [0, 0, 0];
    const home: [number, number, number] = [base[0] + r * Math.sin(ph) * Math.cos(th), base[1] + r * Math.cos(ph) * 0.7, base[2] + r * Math.sin(ph) * Math.sin(th)];
    const at = i < 40 ? wf(117) + (i % 40) * 1.5 : wf(292) + (i - 40) * 0.5;
    out.push({home, s: 0.35 + h(i, 6) * 0.45, cargo, at, c: ['#8C7A6A', '#6E6058', '#A08A5A', '#5A5248'][i % 4]});
  }
  return out;
};

/** Capa de membrana (casquete esférico que se cierra: fagóforo → autofagosoma). */
const Cap: React.FC<{r: number; close: number; color: string; opacity: number}> = ({r, close, color, opacity}) => {
  const theta = Math.PI * (0.25 + 0.75 * close);
  return <mesh rotation={[Math.PI, 0, 0.6]}><sphereGeometry args={[r, 40, 24, 0, Math.PI * 2, 0, theta]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} transparent opacity={opacity} side={THREE.DoubleSide} depthWrite={false} roughness={0.3} /></mesh>;
};

/** Hélice de genes (cadena de esferas brillantes). */
const Genes: React.FC<{p: [number, number, number]; k: number; f: number; s?: number}> = ({p, k, f, s = 1}) => (
  <group position={p} rotation={[0.4, f * 0.02, 0.3]} scale={s}>
    {Array.from({length: 36}, (_, i) => {
      const a = i * 0.55, y = (i - 18) * 0.28, on = i >= 14 && i <= 22;
      return [0, Math.PI].map((o) => (
        <mesh key={`${i}-${o}`} position={[Math.cos(a + o) * 1.1, y, Math.sin(a + o) * 1.1]}><sphereGeometry args={[0.2, 10, 8]} /><meshBasicMaterial color={on ? '#7DFFB2' : '#9FB4FF'} transparent opacity={(on ? 0.3 + 0.7 * k : 0.6) * Math.min(1, k * 3)} fog={false} /></mesh>
      ));
    })}
  </group>
);

const Yeast: React.FC<{f: number}> = ({f}) => {
  const genes = span(f, wf(210), wf(214));
  const human = span(f, wf(218), wf(221));
  const cells = [[0, 0, 0], [7, 3, -4], [-6, 2, -3], [3, -6, -2], [-4, -5, 4], [8, -3, 5], [-9, -2, -8], [2, 7, 6]] as [number, number, number][];
  return (
    <group position={YEAST}>
      {cells.map((c, i) => (
        <group key={i} position={c} rotation={[i, i * 0.7, 0]}>
          <mesh scale={[2.6, 2.1, 2.1]}><sphereGeometry args={[1, 32, 20]} /><meshStandardMaterial color="#F2C86A" emissive="#8A5A12" emissiveIntensity={0.3} transparent opacity={0.85} roughness={0.45} /></mesh>
          <mesh position={[2.6, 1, 0]} scale={0.9 + (i % 3) * 0.2}><sphereGeometry args={[1, 20, 14]} /><meshStandardMaterial color="#F7D88A" emissive="#8A5A12" emissiveIntensity={0.3} /></mesh>
        </group>
      ))}
      <Genes p={[0, 0, 2.6]} k={genes} f={f} s={0.9} />
      <group position={[30, 0, 0]} scale={human}>
        <mesh><sphereGeometry args={[7, 40, 26]} /><meshStandardMaterial color="#E9708A" emissive="#7A1430" emissiveIntensity={0.4} transparent opacity={0.4} depthWrite={false} /></mesh>
        <mesh><sphereGeometry args={[3, 28, 18]} /><meshStandardMaterial color="#6A2A8C" emissive="#3A0E52" emissiveIntensity={0.4} transparent opacity={0.7} /></mesh>
        <Genes p={[0, 0, 0]} k={human} f={f} s={1.1} />
      </group>
      <Label3D text="LEVADURA" sub="EL HONGO DEL PAN" position={[0, 9, 0]} height={2.4} accent="#F2C86A" opacity={span(f, wf(199), wf(203)) * (1 - span(f, wf(209), wf(211)))} />
      <Label3D text="GENES DE LA AUTOFAGIA" position={[0, 5.5, 3]} height={1.6} accent="#7DFFB2" opacity={genes * (1 - span(f, wf(217), wf(219)))} />
      <Label3D text="LOS MISMOS EN TI" position={[30, 10, 0]} height={2.4} accent="#7DFFB2" opacity={human} />
    </group>
  );
};

const HeroCell: React.FC = () => {
  const f = useCurrentFrame();
  const junk = useMemo(makeJunk, []);
  const fail = span(f, wf(292), wf(299));
  const starve = span(f, wf(234), wf(239));
  const endDim = span(f, wf(343), wf(347));
  // fagóforo principal
  const capGrow = span(f, wf(143), wf(146)), capClose = span(f, wf(146), wf(150));
  const travel = span(f, wf(152), wf(157)), fuse = span(f, wf(157), wf(160)), digest = span(f, wf(160), wf(162));
  const recycle = span(f, wf(166), wf(168)), build = span(f, wf(168), wf(175));
  const apos = V(C1).lerp(V(LYSO).add(new THREE.Vector3(2.2, -0.6, 1.2)), travel);
  // fagóforos extra cuando falta alimento
  const extra = [1, 2, 3].map((k) => ({k, grow: span(f, wf(240) + (k - 1) * 10, wf(243) + (k - 1) * 10), close: span(f, wf(243) + (k - 1) * 10, wf(246) + (k - 1) * 10)}));
  const centers: Record<number, [number, number, number]> = {0: C1, 1: [-6, -8, 10], 2: [4, 9, 9], 3: [-12, -4, -6]};
  const glow = 1 - 0.7 * fail * (1 - span(f, wf(317), wf(326)));
  // partículas de reciclaje
  const recGeo = useMemo(() => new THREE.BufferGeometry(), []);
  const recArr = useMemo(() => new Float32Array(260 * 3), []);
  const np = V(NEWPART), lp = V(LYSO);
  for (let i = 0; i < 260; i++) {
    const t = Math.max(0, Math.min(1, build * 1.3 - h(i, 3) * 0.3));
    const sp = new THREE.Vector3((h(i, 1) - 0.5) * 3, (h(i, 2) - 0.5) * 3, (h(i, 4) - 0.5) * 3).multiplyScalar(0.5 + recycle);
    const a = lp.clone().add(sp), b = np.clone().add(new THREE.Vector3((h(i, 5) - 0.5) * 2.5, (h(i, 6) - 0.5) * 1, (h(i, 7) - 0.5) * 1));
    const m = a.clone().lerp(b, t); m.y += Math.sin(t * Math.PI) * 4;
    recArr.set([m.x, m.y, m.z], i * 3);
  }
  recGeo.setAttribute('position', new THREE.BufferAttribute(recArr, 3));
  // nutrientes que entran (se cortan al faltar alimento)
  const nutGeo = useMemo(() => new THREE.BufferGeometry(), []);
  const nutArr = useMemo(() => new Float32Array(300 * 3), []);
  for (let i = 0; i < 300; i++) {
    const th = h(i, 1) * Math.PI * 2, ph = Math.acos(2 * h(i, 2) - 1);
    const t = ((f * 0.006 + h(i, 3)) % 1);
    const r = CELL_R + 30 - t * 34;
    nutArr.set([r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph), r * Math.sin(ph) * Math.sin(th)], i * 3);
  }
  nutGeo.setAttribute('position', new THREE.BufferAttribute(nutArr, 3));
  const nutOn = span(f, wf(226), wf(229)) * (1 - starve);
  return (
    <group>
      {/* membrana */}
      <NoisySphere r={CELL_R} amp={0.05} seed={3} color="#F07C96" emissive="#8A1A38" ei={0.35 * glow * (1 - endDim)} opacity={0.3} seg={96} />
      <mesh><sphereGeometry args={[CELL_R * 0.985, 64, 40]} /><meshStandardMaterial color="#5A0E22" emissive="#2A0410" emissiveIntensity={0.6} transparent opacity={0.18} side={THREE.BackSide} depthWrite={false} /></mesh>
      {/* núcleo */}
      <group position={[9, 2, -9]}><NoisySphere r={7} amp={0.07} seed={8} color="#7A3AA8" emissive="#3A0E52" ei={0.5 * glow} /></group>
      {/* mitocondrias */}
      {[[14, 6, 2, 0.3, 0.8], [-14, 2, -4, 1.2, 0.2], [-4, 12, -10, 0.7, 1.5], [2, -14, 4, 2.0, 0.4], [-16, -8, 6, 0.4, 2.2], [16, -10, -8, 1.6, 1.0]].map(([x, y, z, a, b], i) => (
        <Mito key={i} p={[x + Math.sin(f * 0.01 + i) * 0.6, y + Math.cos(f * 0.012 + i) * 0.6, z]} rot={[a + f * 0.002, b, i]} glow={glow} />
      ))}
      {build > 0 && <Mito p={NEWPART} rot={[0.3, 1.1, 0.2]} s={build} glow={1 + (1 - build)} />}
      {/* retículo */}
      <ERSheet p={[2, 6, -2]} rot={[0.4, 0.8, 0.2]} seed={1} />
      <ERSheet p={[0, 2, -12]} rot={[-0.2, 0.3, 0.9]} seed={4} />
      <ERSheet p={[-6, 10, 2]} rot={[1.1, 0.2, 0.4]} seed={7} />
      {/* ribosomas */}
      <Drift camAt={() => ({f: 0, pos: [0, 0, 0], look: [0, 0, 1]})} count={1600} box={50} size={0.18} color="#FFD0E0" opacity={0.6 * glow} vy={0.001} seed={21} />
      {/* lisosoma ("horno") */}
      <group position={LYSO}>
        <NoisySphere r={3.4 + fuse * 0.8} amp={0.12} seed={12} color="#FF5AA0" emissive="#FF3A2A" ei={0.6 + 1.6 * fuse * (1 - recycle * 0.5) + 0.3 * Math.sin(f * 0.1)} opacity={0.9} seg={48} />
        <Label3D text="HORNO INTERNO" sub="LISOSOMA" position={[0, 6.5, 0]} height={1.5} accent="#FF8AB8" opacity={span(f, wf(155), wf(157)) * (1 - span(f, wf(163), wf(165)))} />
      </group>
      {/* basura */}
      {junk.map((j, i) => {
        const appear = sm((f - j.at) / 10);
        if (appear <= 0) return null;
        let p = V(j.home), s = j.s * appear, vis = true;
        if (j.cargo === 0) {
          const inside = capGrow;
          p = V(C1).lerp(V(j.home), 1 - inside * 0.55).add(apos.clone().sub(V(C1)));
          s *= 1 - digest;
          vis = digest < 1;
        }
        if (j.cargo > 0) { const e = extra[j.cargo - 1]; p = V(centers[j.cargo]).lerp(V(j.home), 1 - e.grow * 0.55); s *= 1 - span(f, wf(250), wf(256)); }
        p.x += Math.sin(f * 0.02 + i) * 0.15; p.y += Math.cos(f * 0.017 + i) * 0.15;
        return vis && s > 0.01 ? <mesh key={i} geometry={junkGeo()} position={p} rotation={[i + f * 0.005, i * 2, 0]} scale={s}><meshStandardMaterial color={j.c} roughness={0.9} flatShading /></mesh> : null;
      })}
      <Label3D text="BASURA" sub="PROTEÍNAS DAÑADAS" position={[C1[0] + 1, C1[1] + 5.5, C1[2]]} height={1.4} accent="#C9B48A" opacity={span(f, wf(118), wf(121)) * (1 - span(f, wf(140), wf(143)))} />
      {/* fagóforo / autofagosoma principal */}
      {capGrow > 0 && digest < 1 && (
        <group position={apos} scale={1 - fuse * 0.35}>
          <Cap r={3.6} close={capClose} color="#7FE3FF" opacity={0.42 * (1 - fuse)} />
          <Cap r={3.2} close={capClose} color="#B8F2FF" opacity={0.3 * (1 - fuse)} />
          <Label3D text="BURBUJA" sub="AUTOFAGOSOMA" position={[0, 5.4, 0]} height={1.4} accent="#7FE3FF" opacity={span(f, wf(149), wf(151)) * (1 - span(f, wf(155), wf(156)))} />
        </group>
      )}
      {extra.map((e) => e.grow > 0 && span(f, wf(250), wf(256)) < 1 ? (
        <group key={e.k} position={centers[e.k]}>
          <Cap r={3.4} close={e.close} color="#7FE3FF" opacity={0.4} />
        </group>
      ) : null)}
      {recycle > 0 && build < 1 && <points geometry={recGeo}><pointsMaterial size={0.35} color="#9CFFD8" transparent opacity={0.9} depthWrite={false} blending={THREE.AdditiveBlending} /></points>}
      {nutOn > 0.01 && <points geometry={nutGeo}><pointsMaterial size={0.6} color="#7DFF8A" transparent opacity={0.7 * nutOn} depthWrite={false} blending={THREE.AdditiveBlending} /></points>}
      <Label3D text="ALIMENTO" position={[0, CELL_R + 12, 0]} height={4} accent="#7DFF8A" opacity={span(f, wf(229), wf(231)) * (1 - span(f, wf(238), wf(240)))} />
      {/* parpadeo de falla */}
      <pointLight position={[4, -2, 6]} intensity={fail > 0 && fail < 1 ? 0 : 0} />
    </group>
  );
};

const fog = (f: number) => {
  const inside = Math.hypot(...camAt(f).pos) < CELL_R;
  const fail = span(f, wf(292), wf(299)) * (1 - span(f, wf(317), wf(326)));
  const c = new THREE.Color(inside ? '#3A0A18' : '#1A040C').lerp(new THREE.Color('#14100E'), fail * 0.7);
  return {color: '#' + c.getHexString(), density: inside ? 0.022 : 0.0035};
};

export const Cell3D: React.FC = () => {
  const f = useCurrentFrame();
  const fail = span(f, wf(292), wf(299)) * (1 - span(f, wf(317), wf(326)));
  const flick = fail > 0 && Math.sin(f * 0.9) > 0.7 ? 0.5 : 1;
  const endDim = span(f, wf(343), wf(347));
  return (
    <World3D camAt={camAt} fog={fog}>
      <hemisphereLight args={['#FFC2D2', '#2A0614', 0.9 * flick * (1 - endDim * 0.8)]} />
      <directionalLight position={[40, 60, 50]} intensity={1.4 * flick * (1 - endDim)} color="#FFE0E8" />
      <pointLight position={[-6, 4, 10]} intensity={260 * flick * (1 - endDim)} distance={45} decay={1.4} color="#FFB0C8" />
      <Tissue />
      <HeroCell />
      <Yeast f={f} />
      <Drift camAt={camAt} count={900} box={40} size={0.12} color="#FFC8D8" opacity={0.35} vy={0.002} seed={5} />
      <Label3D text="AUTOFAGIA" sub="COMERSE A UNO MISMO" position={[0, 9, 0]} height={4} accent="#7FE3FF" opacity={span(f, wf(180), wf(182)) * (1 - span(f, wf(186), wf(188)))} />
    </World3D>
  );
};
export {FRAMES};
