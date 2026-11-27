/**
 * EPISODIO · "Autofagia: tus células se comen a sí mismas" (Nobel 2016, Yoshinori Ohsumi) — DROGMAN 7.0, 3D.
 * Dirección artística "Biología nocturna": interior celular rojo vino y rosa translúcido, mitocondrias naranja,
 * retículo turquesa, basura gris-café; la autofagia se ve en cian (burbuja) y magenta-fuego (lisosoma).
 * La capa 2D cuenta la historia y la polémica: tarjeta del Nobel, publicación viral genérica, sellos MITO / REALIDAD.
 * Sin retrato de la persona real: solo nombre, año e institución.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {makeTiming, Word} from '../../dl/timing';
import {SfxCue} from '../../dl/Sfx';
import {EpisodeRunner, SceneDef} from '../../dl/episode/EpisodeRunner';
import {Clip3D} from '../../dl/render/Clip3D';
import {SourceTag} from '../../dl/editorial/Editorial';
import {Stamp} from '../../dl/fx/Fx';
import {F} from '../../dl/fonts';
import {spr} from '../../dl/motion';
import WORDS_JSON from './words.json';
import {Cell3D} from './Cell3D';
import {FRAMES, span} from './world';

const WORDS = WORDS_JSON as Word[];
const {w} = makeTiming(WORDS);
export const EPISODE_FRAMES = FRAMES;
type LW = (i: number, o?: number) => number;

const win = (f: number, a: number, b: number, fade = 10) => span(f, a, a + fade) * (1 - span(f, b - fade, b));

const Medal: React.FC<{s: number}> = ({s}) => (
  <svg width={260 * s} height={260 * s} viewBox="0 0 260 260">
    <defs><radialGradient id="md" cx="0.35" cy="0.3" r="0.8"><stop offset="0" stopColor="#FFF0B8" /><stop offset="0.55" stopColor="#E3B24A" /><stop offset="1" stopColor="#8A5E14" /></radialGradient></defs>
    <circle cx={130} cy={130} r={122} fill="url(#md)" stroke="#6E4A10" strokeWidth={6} />
    <circle cx={130} cy={130} r={98} fill="none" stroke="#FFF2C4" strokeWidth={3} opacity={0.6} />
    {Array.from({length: 14}, (_, i) => { const a = Math.PI * 0.62 + (i / 13) * Math.PI * 0.76; return [-1, 1].map((sd) => <ellipse key={`${i}${sd}`} cx={130 + sd * Math.cos(a) * 82} cy={130 + Math.sin(a) * 82} rx={12} ry={6} fill="#B98A2A" transform={`rotate(${sd * (a * 57 - 90)} ${130 + sd * Math.cos(a) * 82} ${130 + Math.sin(a) * 82})`} />); })}
    <text x={130} y={142} textAnchor="middle" fontFamily={F.display} fontSize={46} fill="#6E4A10">2016</text>
  </svg>
);

const Post: React.FC<{f: number; at: number; text: string; likes: number; k: number}> = ({f, at, text, likes, k}) => {
  const n = Math.round(likes * span(f, at, at + 60));
  return (
    <div style={{width: 700, background: '#0F1116', borderRadius: 28, padding: '30px 34px', boxShadow: '0 30px 80px rgba(0,0,0,0.7)', border: '2px solid #2A2E38', opacity: k, transform: `translateY(${(1 - k) * 60}px) scale(${0.94 + 0.06 * k})`}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
        <div style={{width: 64, height: 64, borderRadius: 32, background: 'linear-gradient(135deg,#FF5A7A,#FFB34A)'}} />
        <div><div style={{fontFamily: F.grotesk, fontWeight: 800, fontSize: 30, color: '#FFF'}}>Salud Viral ✔</div><div style={{fontFamily: F.mono, fontSize: 22, color: '#8890A0'}}>hace 2 h</div></div>
      </div>
      <div style={{fontFamily: F.grotesk, fontWeight: 700, fontSize: 40, lineHeight: 1.25, color: '#F2F4F8', marginTop: 22}}>{text}</div>
      <div style={{display: 'flex', gap: 40, marginTop: 24, fontFamily: F.mono, fontWeight: 700, fontSize: 28, color: '#FF6A86'}}>
        <span>♥ {n.toLocaleString('es-MX')}</span><span style={{color: '#8FD0FF'}}>↻ {Math.round(n * 0.4).toLocaleString('es-MX')}</span>
      </div>
    </div>
  );
};

const Chip: React.FC<{t: string; k: number; c: string}> = ({t, k, c}) => (
  <div style={{display: 'inline-block', padding: '14px 30px', borderRadius: 999, border: `4px solid ${c}`, background: 'rgba(8,4,10,0.75)', fontFamily: F.display, fontSize: 56, color: '#FFF', letterSpacing: '0.04em', opacity: k, transform: `scale(${0.8 + 0.2 * k})`, boxShadow: `0 0 30px ${c}66`}}>{t}</div>
);

const S01: React.FC<{lw: LW}> = ({lw}) => {
  const f = useCurrentFrame();
  const nobel = win(f, lw(36), lw(51), 12), name = spr(f, lw(47), {damping: 14, stiffness: 120});
  const post1 = win(f, lw(67), lw(96), 12);
  const dim = Math.max(nobel, post1, win(f, lw(251), lw(285), 12)) * 0.55;
  const verdad = win(f, lw(88), lw(103), 10);
  const real = win(f, lw(96), lw(104), 8);
  const post2 = win(f, lw(251), lw(285), 12);
  const hunt = win(f, lw(273), lw(285), 8);
  const chips = (i: number) => spr(f, lw([308, 312, 316][i]), {damping: 12, stiffness: 160}) * (1 - span(f, lw(317), lw(320)));
  const end = span(f, lw(347) + 10, lw(347) + 30);
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <Clip3D id="autofagia-celula" live={<Cell3D />} />
      <AbsoluteFill style={{background: `rgba(6,2,6,${dim})`}} />
      <AbsoluteFill style={{background: 'radial-gradient(120% 90% at 50% 45%, transparent 50%, rgba(0,0,0,0.6) 100%)'}} />
      {/* Nobel */}
      {nobel > 0 && (
        <div style={{position: 'absolute', left: 0, width: 1080, top: 170, textAlign: 'center', opacity: nobel}}>
          <div style={{display: 'inline-block', transform: `rotate(${(1 - nobel) * -30}deg) scale(${0.7 + 0.3 * nobel})`, filter: 'drop-shadow(0 20px 40px rgba(255,190,80,0.35))'}}><Medal s={1.2} /></div>
          <div style={{fontFamily: F.mono, fontWeight: 700, fontSize: 30, letterSpacing: '0.3em', color: '#F2CF7A', marginTop: 24}}>PREMIO NOBEL DE MEDICINA</div>
          <div style={{fontFamily: F.display, fontSize: 96, color: '#FFF', lineHeight: 1.05, marginTop: 10, opacity: Math.min(1, name), transform: `translateY(${(1 - name) * 30}px)`}}>YOSHINORI OHSUMI</div>
          <div style={{display: 'inline-flex', alignItems: 'center', gap: 16, marginTop: 14, opacity: Math.min(1, name)}}>
            <div style={{width: 54, height: 36, background: '#FFF', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><div style={{width: 22, height: 22, borderRadius: 11, background: '#BC002D'}} /></div>
            <div style={{fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: '#D8DCE6', letterSpacing: '0.12em'}}>INSTITUTO DE TECNOLOGÍA DE TOKIO</div>
          </div>
        </div>
      )}
      <div style={{opacity: 1 - span(f, lw(52), lw(56))}}><SourceTag frame={f} at={lw(44)} text="Fuente: NobelPrize.org (2016)" x={60} y={70} color="#E8D8C0" /></div>
      {/* publicación viral */}
      {post1 > 0 && (
        <div style={{position: 'absolute', left: 190, top: 230}}>
          <Post f={f} at={lw(72)} text="Deja de comer y tu cuerpo se devora a sí mismo para curarse 😱" likes={2400000} k={post1} />
        </div>
      )}
      {verdad > 0 && (
        <div style={{position: 'absolute', left: 0, width: 1080, top: 760, display: 'flex', justifyContent: 'center', gap: 40}}>
          <Chip t="¿VERDAD?" k={verdad} c="#5BE3A0" /><Chip t="¿MITO?" k={verdad} c="#FF4A5A" />
        </div>
      )}
      {real > 0 && <div style={{position: 'absolute', left: 0, width: 1080, top: 140, textAlign: 'center'}}><Chip t="LO QUE SÍ ES REAL" k={real} c="#5BE3A0" /></div>}
      {/* polémica */}
      {post2 > 0 && (
        <div style={{position: 'absolute', left: 190, top: 120}}>
          <Post f={f} at={lw(253)} text="El ayuno cura. Lo dijo un Premio Nobel 🔥" likes={5100000} k={post2} />
        </div>
      )}
      {post2 > 0 && <div style={{opacity: post2}}><Stamp frame={f} at={lw(258)} text="NO FUE SU DESCUBRIMIENTO" color="#FF4A5A" size={64} rot={-8} x={540} y={560} /></div>}
      {post2 > 0 && <div style={{opacity: post2}}><Stamp frame={f} at={lw(265)} text="NUNCA LO DEMOSTRÓ" color="#FF4A5A" size={86} rot={6} x={540} y={760} /></div>}
      {hunt > 0 && (
        <div style={{position: 'absolute', left: 0, width: 1080, top: 930, textAlign: 'center', opacity: hunt}}>
          <span style={{fontFamily: F.display, fontSize: 52, color: '#FFF', background: 'rgba(8,4,10,0.75)', padding: '10px 26px', borderRadius: 16, border: '3px solid #FF4A5A'}}>✕ NO "CAZA" CÉLULAS ENFERMAS</span>
        </div>
      )}
      {/* dónde se investiga */}
      <div style={{position: 'absolute', left: 0, width: 1080, top: 150, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22}}>
        {['ENVEJECIMIENTO', 'CEREBRO', 'CÁNCER'].map((t, i) => chips(i) > 0.01 ? <Chip key={t} t={t} k={Math.min(1, chips(i))} c={['#C9B48A', '#9F8AFF', '#FF4A5A'][i]} /> : null)}
      </div>
      {/* cierre */}
      <div style={{position: 'absolute', left: 0, width: 1080, top: 160, textAlign: 'center', fontFamily: F.serif, fontStyle: 'italic', fontSize: 78, lineHeight: 1.1, color: '#FFE2EA', textShadow: '0 8px 30px rgba(0,0,0,0.85)', opacity: win(f, lw(337), lw(347) + 30, 10)}}>¿y el día<br />que deja de hacerlo?</div>
      <AbsoluteFill style={{background: '#000', opacity: end}} />
    </AbsoluteFill>
  );
};

const SCENES: SceneDef[] = [{C: S01, from: 0, to: EPISODE_FRAMES, out: 'none'}];

const sfx: SfxCue[] = [
  {at: 0, file: 'underwater', vol: 0.2, dur: 240}, {at: w(4), file: 'heartbeat', vol: 0.3}, {at: w(15), file: 'heartbeat', vol: 0.3},
  {at: w(23), file: 'riser', vol: 0.3, dur: 60}, {at: w(27), file: 'whoosh', vol: 0.45}, {at: w(30), file: 'deadnet_thump', vol: 0.5},
  {at: w(36), file: 'reveal_swell', vol: 0.35, dur: 60}, {at: w(47), file: 'stamp', vol: 0.4},
  {at: w(67), file: 'click_ui', vol: 0.4}, {at: w(72), file: 'deadnet_ping', vol: 0.35}, {at: w(85), file: 'glitch', vol: 0.3}, {at: w(88), file: 'tick', vol: 0.4}, {at: w(94), file: 'tick', vol: 0.4},
  {at: w(103), file: 'whoosh', vol: 0.3}, {at: w(117), file: 'glitch', vol: 0.25}, {at: w(129), file: 'riser', vol: 0.3, dur: 50}, {at: w(136), file: 'power_off', vol: 0.3},
  {at: w(143), file: 'underwater', vol: 0.35, dur: 90}, {at: w(150), file: 'click_ui', vol: 0.45}, {at: w(152), file: 'whoosh', vol: 0.35},
  {at: w(158), file: 'impact', vol: 0.45}, {at: w(161), file: 'deadnet_thump', vol: 0.4}, {at: w(166), file: 'reveal_swell', vol: 0.4, dur: 80},
  {at: w(181), file: 'stamp', vol: 0.45}, {at: w(187), file: 'whoosh', vol: 0.5}, {at: w(210), file: 'deadnet_ping', vol: 0.35}, {at: w(218), file: 'reveal_swell', vol: 0.35, dur: 50},
  {at: w(224), file: 'deadnet_thump', vol: 0.5}, {at: w(234), file: 'power_off', vol: 0.3}, {at: w(239), file: 'riser', vol: 0.3, dur: 60},
  {at: w(253), file: 'click_ui', vol: 0.4}, {at: w(258), file: 'stamp', vol: 0.6}, {at: w(265), file: 'stamp', vol: 0.6}, {at: w(279), file: 'glitch', vol: 0.3},
  {at: w(291), file: 'deadnet_thump', vol: 0.5}, {at: w(295), file: 'alarm', vol: 0.25, dur: 30}, {at: w(308), file: 'tick', vol: 0.4}, {at: w(312), file: 'tick', vol: 0.4}, {at: w(316), file: 'impact', vol: 0.45},
  {at: w(317), file: 'whoosh', vol: 0.35}, {at: w(332), file: 'reveal_swell', vol: 0.35, dur: 60}, {at: w(343), file: 'power_off', vol: 0.45}, {at: w(347), file: 'heartbeat', vol: 0.4},
];

export const Episode: React.FC = () => (
  <EpisodeRunner words={WORDS} scenes={SCENES} sfx={sfx} bg="#000" mix={{voice: 'audio/voz-autofagia.wav', music: 'sfx/music_drone.wav', musicVol: 0.12}} />
);
