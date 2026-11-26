/**
 * PILOTO 3D · Capa three.js (se renderiza aparte como clip). Descenso continuo desde la superficie del océano:
 * rayos de sol → zona de penumbra (profundidad del Titanic) → junto a la cima de un Everest sumergido → fondo de la fosa →
 * la cámara se aleja para revelar el Everest completo dentro de la fosa con sus medidas.
 */
import React, {useMemo} from 'react';
import * as THREE from 'three';
import {useCurrentFrame} from 'remotion';
import {Drift, GodRays, Label3D, MeasureLine, Mountain, RockSurface, World3D} from '../../dl/world3d/kit';
import {DEPTH, EVEREST, MX, camAt} from './world';

const mix = (a: string, b: string, t: number) => '#' + new THREE.Color(a).lerp(new THREE.Color(b), Math.max(0, Math.min(1, t))).getHexString();
const fog = (f: number) => {
  const d = -camAt(f).pos[1];
  if (f > 335) { const t = Math.min(1, (f - 335) / 40); return {color: mix('#010A16', '#062743', t), density: 0.03 + (0.0035 - 0.03) * t}; }
  return {color: d < 12 ? mix('#2390B8', '#06304F', d / 12) : mix('#06304F', '#031426', (d - 12) / 40), density: 0.014 + Math.min(0.008, d * 0.0002)};
};

const Headlamp: React.FC = () => {
  const f = useCurrentFrame();
  const c = camAt(f).pos;
  return <pointLight position={c} intensity={f > 335 ? 0 : 2200} distance={90} decay={1.6} color="#CFEFFF" />;
};

const Surface: React.FC = () => {
  const f = useCurrentFrame();
  const tex = useMemo(() => {
    const c = document.createElement('canvas'); c.width = c.height = 512; const g = c.getContext('2d')!;
    g.fillStyle = '#7FD6F0'; g.fillRect(0, 0, 512, 512);
    g.strokeStyle = 'rgba(255,255,255,0.55)';
    for (let i = 0; i < 140; i++) { g.lineWidth = 1 + (i % 4); g.beginPath(); const x = (i * 97) % 512, y = (i * 61) % 512; g.ellipse(x, y, 20 + (i % 7) * 9, 10 + (i % 5) * 6, i, 0, Math.PI * 2); g.stroke(); }
    const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(6, 6); return t;
  }, []);
  tex.offset.set(f * 0.0015, f * 0.001);
  return <mesh position={[0, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]}><planeGeometry args={[400, 400]} /><meshBasicMaterial map={tex} color="#BFF3FF" transparent opacity={0.9} side={THREE.DoubleSide} fog={false} /></mesh>;
};

export const Ocean3D: React.FC = () => {
  const f = useCurrentFrame();
  const reveal = Math.max(0, Math.min(1, (f - 360) / 50));
  const lab = (a: number, b: number) => Math.max(0, Math.min(1, (f - a) / (b - a)));
  const floorY = -DEPTH;
  return (
    <World3D camAt={camAt} fog={fog}>
      <hemisphereLight args={['#9FDFFF', '#061420', 1.1]} />
      <directionalLight position={[30, 60, 40]} intensity={f > 335 ? 3.2 * Math.max(0.3, reveal) : 1.6} color="#BFE6FF" />
      <Headlamp />
      <Surface />
      <GodRays origin={[0, 0, -6]} count={14} spread={16} length={70} width={3.5} opacity={0.22} color="#CFF4FF" />
      <Drift camAt={camAt} count={2200} box={26} size={0.09} opacity={0.75} vy={0.004} />
      <Drift camAt={camAt} count={500} box={40} size={0.28} color="#5BFFD8" opacity={Math.max(0, Math.min(1, (-camAt(f).pos[1] - 15) / 20)) * 0.9} vy={0.002} seed={11} />
      {/* fosa: fondo y paredes */}
      <RockSurface w={400} h={260} seg={150} amp={6} scale={0.04} seed={2} position={[0, floorY, 0]} rotation={[-Math.PI / 2, 0, 0]} colors={['#1D2A30', '#3C4A4E', '#6E7A76']} />
      <RockSurface w={420} h={140} seg={170} amp={9} scale={0.05} seed={5} position={[0, floorY + 60, -46]} colors={['#18242A', '#34444A', '#5E6C6A']} />
      <RockSurface w={260} h={140} seg={140} amp={9} scale={0.05} seed={8} position={[78, floorY + 60, 0]} rotation={[0, -Math.PI / 2, 0]} colors={['#18242A', '#34444A', '#5E6C6A']} />
      {/* Everest sumergido */}
      <Mountain height={EVEREST} radius={40} seed={7} position={[MX, floorY + EVEREST / 2, 0]} snow={0.84} colors={['#4E5A60', '#9AA3A2']} />
      {/* marcas de profundidad */}
      <group position={[-16, -38, 22]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[9, 0.06, 6, 90]} /><meshBasicMaterial color="#6FE6FF" fog={false} transparent opacity={0.8 * lab(170, 200) * (1 - lab(250, 270))} /></mesh>
        <Label3D text="3.800 m" sub="PROFUNDIDAD DEL TITANIC" position={[6, 1.5, -6]} height={2} accent="#6FE6FF" opacity={lab(175, 200) * (1 - lab(250, 270))} />
      </group>
      <Label3D text="EVEREST" sub="SU CIMA, AÚN BAJO EL AGUA" position={[MX - 3, floorY + EVEREST + 2.4 + reveal * 8, 2]} height={1.8 + reveal * 14} opacity={lab(110, 140) * (1 - lab(230, 250)) + reveal} />
      <Label3D text="≈ 10.900 m" sub="FOSA DE LAS MARIANAS" position={[-30, floorY + 6, 14]} height={2.4 + reveal * 11} accent="#FF6B6B" opacity={lab(300, 325)} />
      {/* medidas del final */}
      <MeasureLine from={[MX + 46, floorY, 0]} to={[MX + 46, floorY + EVEREST, 0]} progress={lab(370, 410)} cap={4} />
      <MeasureLine from={[MX + 46, floorY + EVEREST, 0]} to={[MX + 46, 0, 0]} color="#6FE6FF" progress={lab(405, 430)} cap={4} />
      <Label3D text="8.849 m" sub="ALTURA DEL EVEREST" position={[MX + 76, floorY + EVEREST / 2, 0]} height={18} opacity={lab(395, 415)} />
      <Label3D text="+2 km" sub="DE AGUA ENCIMA" position={[MX + 76, floorY + EVEREST + 12, 0]} height={15} accent="#6FE6FF" opacity={lab(420, 440)} />
      <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} visible={reveal > 0}><planeGeometry args={[500, 500]} /><meshBasicMaterial color="#5FC8E8" transparent opacity={0.35 * reveal} side={THREE.DoubleSide} fog={false} /></mesh>
    </World3D>
  );
};
