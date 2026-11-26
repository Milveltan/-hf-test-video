/**
 * Catálogo visual: cada pieza de la biblioteca en una escena mínima. tools/catalog-thumbs.mjs genera catalog/thumbs/<id>.jpg
 * Para agregar una pieza nueva al catálogo: añadir una entrada aquí (id + render).
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {F} from '../dl/fonts';
import {HumanRig, POSES, PERSONA_A, PERSONA_B, ATLETA} from '../dl/characters/HumanRig';
import {Bust, ALTMAN, PERSONA} from '../dl/characters/AltmanBust';
import {Bot} from '../dl/characters/Bot';
import {Lungs, Heart, BloodFlow, Brain, Diaphragm, Spleen} from '../dl/anatomy/Anatomy';
import {VascularBody} from '../dl/anatomy/VascularBody';
import {Whale, Seal} from '../dl/nature/Marine';
import {PowerOff} from '../dl/fx/PowerOff';
import {ParticleForm} from '../dl/render/ParticleForm';
import {Sky, Hills, Grass, Underwater, Fog, GodRays} from '../dl/nature/Nature';
import {GovBuilding} from '../dl/environments/GovBuilding';
import {PercentRing, StreamSplit, IsoGrid, TimelineRuler, PhScale} from '../dl/data/Data';
import {EcgTrace} from '../dl/data/EcgTrace';
import {MagazinePage} from '../dl/editorial/MagazinePage';
import {LowerThird, Annotation} from '../dl/editorial/Editorial';
import {ChatWindow, PostCard, PhoneFrame} from '../dl/ui/Social';
import {Stamp} from '../dl/fx/Fx';
import {Odometer, SlamWord} from '../dl/type/Type';
import {Conveyor} from '../dl/mechanisms/Conveyor';
import {Kitchen, Sala, HouseWorld} from '../dl/environments/Home';
import {Idea, FilmCard, Clapper} from '../dl/film/Film';

const C: React.FC<{children: React.ReactNode; bg?: string}> = ({children, bg = 'radial-gradient(80% 70% at 50% 40%, #13202B, #03060A 80%)'}) => <AbsoluteFill style={{background: bg, alignItems: 'center', justifyContent: 'center'}}>{children}</AbsoluteFill>;

export const PIECES: {id: string; render: (f: number) => React.ReactNode}[] = [
  {id: 'Home-cocina', render: (f) => <Kitchen f={f} />},
  {id: 'Home-sala', render: (f) => <Sala f={f} />},
  {id: 'Home-mundo-dos-cuartos', render: (f) => <AbsoluteFill style={{overflow: 'hidden'}}><div style={{transform: 'scale(0.5)', transformOrigin: '0 300px'}}><HouseWorld f={f} /></div></AbsoluteFill>},
  {id: 'Film-idea', render: (f) => <C><Idea x={540} y={600} f={f} s={1.6} /></C>},
  {id: 'Film-card', render: (f) => <C><FilmCard w={560} glow={1}><Sala f={f} /></FilmCard></C>},
  {id: 'Film-claqueta', render: (f) => <C><Clapper k={f > 30 ? 1 : 0} x={540} y={600} s={1.7} /></C>},
  {id: 'HumanRig-idle', render: () => <C><HumanRig person={PERSONA_A} scale={1.15} /></C>},
  {id: 'HumanRig-contener-aire', render: (f) => <C><HumanRig person={ATLETA} pose={POSES.holdNose} expression="strain" cheeks={1} flush={0.7} breath={1} scale={1.15} /></C>},
  {id: 'HumanRig-rayosX', render: (f) => <C><HumanRig person={PERSONA_B} pose={POSES.idle} xray={1} breath={0.6} scale={1.15} inside={<g><g transform="translate(110 250) scale(0.45)"><Lungs frame={f} inflate={0.7} /></g><g transform="translate(185 340) scale(0.28)"><Heart frame={f} /></g></g>} /></C>},
  {id: 'HumanRig-poses', render: () => <C><div style={{display: 'flex', gap: 10}}>{(['handsChest', 'handsUp', 'point', 'walkA'] as const).map((p, i) => <HumanRig key={p} id={`p${i}`} pose={POSES[p]} person={[PERSONA_A, PERSONA_B, ATLETA, PERSONA_A][i]} expression={(['tense', 'surprise', 'smile', 'neutral'] as const)[i]} scale={0.55} />)}</div></C>},
  {id: 'Bust-fichas', render: () => <C><div style={{display: 'flex'}}><Bust looks={ALTMAN} scale={1.1} /><Bust looks={PERSONA} scale={1.1} /></div></C>},
  {id: 'Bot', render: () => <C><Bot scale={2} /></C>},
  {id: 'Lungs', render: (f) => <C><Lungs frame={f} inflate={0.8} scale={2.2} /></C>},
  {id: 'Lungs-sin-oxigeno', render: (f) => <C><Lungs frame={f} inflate={0.3} o2={0.15} scale={2.2} id="lg2" /></C>},
  {id: 'Heart', render: (f) => <C><Heart frame={f} scale={2.6} /></C>},
  {id: 'BloodFlow', render: (f) => <C><BloodFlow frame={f} d="M-40 900 C 300 900 300 300 600 300 S 900 700 1120 600" width={90} /></C>},
  {id: 'Brain-tronco', render: (f) => <C><Brain frame={f} highlight="brainstem" scale={2.2} /></C>},
  {id: 'Diaphragm', render: () => <C><Diaphragm inflate={0.5} width={800} /></C>},
  {id: 'ParticleForm-esfera', render: (f) => <C bg="#04070C"><ParticleForm shape="sphere" count={3500} /></C>},
  {id: 'ParticleForm-ADN', render: (f) => <C bg="#04070C"><ParticleForm shape="helix" count={2600} colors={['#7FE3FF', '#FF6FB0']} radius={420} rotX={10} /></C>},
  {id: 'ParticleForm-galaxia', render: (f) => <C bg="#04070C"><ParticleForm shape="disc" count={5000} colors={['#FFE6C2', '#9FC6FF', '#C59BFF']} rotX={62} radius={460} /></C>},
  {id: 'Sky-atardecer', render: (f) => <Sky frame={f} t={0.74} />},
  {id: 'Paisaje-capas', render: (f) => <AbsoluteFill><Sky frame={f} t={0.3} /><Hills y={760} color="#5C7FA0" amp={140} seed={2} /><Hills y={860} color="#2F5A4A" amp={90} seed={5} /><Grass frame={f} y={1000} /><Fog frame={f} y={820} /></AbsoluteFill>},
  {id: 'Underwater', render: (f) => <Underwater frame={f} depth={0.3} />},
  {id: 'GodRays', render: (f) => <C bg="#0A0D14"><GodRays frame={f} x={540} y={-60} opacity={0.18} /></C>},
  {id: 'GovBuilding', render: (f) => <C><GovBuilding lit={1} frame={f} /></C>},
  {id: 'Conveyor', render: (f) => <C><Conveyor frame={f} y={700} item={(i) => <div style={{width: 120, height: 90, background: '#2A4458', borderRadius: 12}} />} /></C>},
  {id: 'PercentRing', render: () => <C><PercentRing value={53} label="DEL TRÁFICO WEB" /></C>},
  {id: 'StreamSplit', render: (f) => <C><StreamSplit frame={f} share={0.53} splitK={1} /></C>},
  {id: 'IsoGrid', render: (f) => <C><IsoGrid frame={f} at={0} marked={53} cols={20} size={38} /></C>},
  {id: 'TimelineRuler', render: (f) => <C><TimelineRuler frame={f} from={2010} to={2025} center={2017} range={[2016, 2018]} rangeK={1} /></C>},
  {id: 'EcgTrace', render: (f) => <C><EcgTrace frame={f} y={600} beats={[{at: 5, x: 250}, {at: 20, x: 520}]} flat={{at: 32, x: 700}} /></C>},
  {id: 'MagazinePage', render: () => <C bg="#2A1C12"><MagazinePage masthead="Revista" kicker="CIENCIA · 2026" headline={<span>Titular de ejemplo</span>} /></C>},
  {id: 'PostCard', render: (f) => <C><PostCard frame={f} at={-60} name="Nombre" handle="@usuario" text="Texto con *palabras resaltadas* en la publicación." /></C>},
  {id: 'ChatWindow', render: (f) => <C><ChatWindow frame={f} at={-60} title="Asistente" prompt="¿Pregunta de ejemplo?" /></C>},
  {id: 'PhoneFrame', render: () => <C><PhoneFrame width={460}><div style={{position: 'absolute', inset: 0, background: 'linear-gradient(#1A2A38,#0A121A)'}} /></PhoneFrame></C>},
  {id: 'Tipografia', render: (f) => <C><div style={{textAlign: 'center'}}><Odometer value={2025} digits={4} style={{fontFamily: F.display, fontSize: 220, color: '#F2EEE6'}} /><br /><SlamWord frame={f} at={0} text="IMPACTO" style={{fontFamily: F.display, fontSize: 160, color: '#F2EEE6'}} /></div></C>},
  {id: 'Stamp-LowerThird-Annotation', render: (f) => <C><Stamp frame={f} at={0} text="SELLO" x={540} y={420} /><LowerThird frame={f} at={0} name="NOMBRE APELLIDO" role="CARGO O DESCRIPCIÓN" y={700} /><Annotation frame={f} at={0} x={600} y={900} tx={800} ty={1100} kicker="ETIQUETA" label="anotación" size={70} /></C>},
  {id: 'Spleen', render: (f) => <C><Spleen frame={f} squeeze={0.3} scale={2} /></C>},
  {id: 'VascularBody', render: (f) => <C><VascularBody frame={f} constrict={0.7} core={0.9} scale={1.1} /></C>},
  {id: 'Marine-ballena-foca', render: (f) => <AbsoluteFill><Underwater frame={f} depth={0.4} /><div style={{position: 'absolute', left: -80, top: 260}}><Whale frame={f} scale={1.3} /></div><div style={{position: 'absolute', left: 300, top: 760}}><Seal frame={f} scale={1.2} /></div></AbsoluteFill>},
  {id: 'PowerOff', render: () => <PowerOff k={0.6}><C><Heart frame={0} scale={2.4} /></C></PowerOff>},
  {id: 'PhScale', render: () => <C><PhScale value={0.36} mark={0.5} width={820} /></C>},
];

export const Showcase: React.FC<{piece: string}> = ({piece}) => {
  const f = useCurrentFrame();
  const p = PIECES.find((x) => x.id === piece) ?? PIECES[0];
  return (
    <AbsoluteFill>
      {p.render(f)}
      <div style={{position: 'absolute', left: 30, top: 24, fontFamily: F.mono, fontSize: 34, fontWeight: 700, color: '#FFB45A', textShadow: '0 2px 8px #000'}}>{p.id}</div>
    </AbsoluteFill>
  );
};
