/**
 * Biblioteca Datologo · Interfaces sociales genéricas (sin logotipos ni marcas).
 *  - PostCard: publicación con autor, texto (palabras *resaltadas*), revelado palabra por palabra.
 *  - CommentBubble, ProfileCard, ChatThread: piezas para "comentarios, perfiles, conversaciones".
 *  - ChatWindow: interfaz de asistente de IA con respuesta que se escribe.
 *  - PhoneFrame: teléfono con pantalla (children) y reflejo.
 */
import React from 'react';
import {F} from '../fonts';
import {clamp01, spr} from '../motion';
import {HumanFace} from '../characters/Avatars';

const C = {card: '#0F1B26', line: '#22384A', ink: '#E8F1F7', muted: '#8399AB', ui: '#7FE3FF'};

const renderEm = (text: string, shown: number, accent: string) => {
  const words = text.split(' ');
  return words.map((wd, i) => {
    const em = /^\*.*\*[.,:;]?$/.test(wd);
    const clean = wd.replace(/\*/g, '');
    return (
      <span key={i} style={{opacity: i < shown ? 1 : 0.12, color: em ? accent : undefined, fontWeight: em ? 700 : undefined}}>
        {clean}{' '}
      </span>
    );
  });
};

export const PostCard: React.FC<{frame: number; at: number; name: string; handle: string; avatar?: React.ReactNode; text: string; meta?: string; wps?: number; accent?: string; width?: number; fontSize?: number}> = ({
  frame, at, name, handle, avatar, text, meta, wps = 7, accent = '#FFB45A', width = 900, fontSize = 44,
}) => {
  const k = spr(frame, at, {damping: 15, stiffness: 150});
  const shown = Math.floor(Math.max(0, frame - at - 6) / (30 / wps));
  return (
    <div style={{width, padding: 40, boxSizing: 'border-box', borderRadius: 30, background: `linear-gradient(165deg, #142433, ${C.card})`, border: `2px solid ${C.line}`, boxShadow: '0 40px 90px rgba(0,0,0,0.6)', transform: `translateY(${(1 - k) * 80}px) scale(${0.94 + 0.06 * k})`, opacity: clamp01(k * 1.5)}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
        <div style={{width: 92, height: 92, borderRadius: 46, overflow: 'hidden', background: '#22313D', flex: '0 0 auto'}}>{avatar}</div>
        <div>
          <div style={{fontFamily: F.ui, fontWeight: 800, fontSize: 36, color: C.ink}}>{name}</div>
          <div style={{fontFamily: F.mono, fontSize: 28, color: C.muted, marginTop: 4}}>{handle}</div>
        </div>
      </div>
      <div style={{marginTop: 28, fontFamily: F.ui, fontWeight: 600, fontSize, lineHeight: 1.3, color: C.ink}}>{renderEm(text, shown, accent)}</div>
      {meta ? <div style={{marginTop: 24, fontFamily: F.mono, fontSize: 28, color: C.muted}}>{meta}</div> : null}
    </div>
  );
};

export const CommentBubble: React.FC<{hue: number; lines?: number; width?: number}> = ({hue, lines = 2, width = 520}) => (
  <div style={{display: 'flex', gap: 18, alignItems: 'flex-start'}}>
    <div style={{width: 84, height: 84, borderRadius: 42, overflow: 'hidden', flex: '0 0 auto'}}><HumanFace hue={hue} size={84} /></div>
    <div style={{width, padding: '24px 28px', borderRadius: '8px 28px 28px 28px', background: C.card, border: `2px solid ${C.line}`, boxSizing: 'border-box'}}>
      <div style={{height: 14, width: 150, borderRadius: 7, background: '#C9D6E0', opacity: 0.85}} />
      {Array.from({length: lines}, (_, i) => <div key={i} style={{height: 13, borderRadius: 6, marginTop: 14, width: `${[92, 70, 80][i % 3]}%`, background: '#5E7486', opacity: 0.6}} />)}
    </div>
  </div>
);

export const ProfileCard: React.FC<{hue: number; width?: number}> = ({hue, width = 420}) => (
  <div style={{width, borderRadius: 28, overflow: 'hidden', background: C.card, border: `2px solid ${C.line}`}}>
    <div style={{height: 120, background: `linear-gradient(120deg, hsl(${hue} 50% 35%), hsl(${(hue + 60) % 360} 55% 20%))`}} />
    <div style={{padding: '0 30px 30px', marginTop: -56}}>
      <div style={{width: 112, height: 112, borderRadius: 56, overflow: 'hidden', border: `6px solid ${C.card}`}}><HumanFace hue={hue} size={100} /></div>
      <div style={{height: 20, width: 200, borderRadius: 10, background: '#E2EBF2', marginTop: 16}} />
      <div style={{height: 13, width: 130, borderRadius: 6, background: C.muted, marginTop: 12, opacity: 0.7}} />
      <div style={{display: 'flex', gap: 26, marginTop: 22}}>
        {[0, 1, 2].map((i) => <div key={i} style={{height: 34, width: 80, borderRadius: 10, background: '#1A2C3B'}} />)}
      </div>
    </div>
  </div>
);

export const ChatThread: React.FC<{frame: number; at: number; width?: number}> = ({frame, at, width = 460}) => (
  <div style={{width, padding: 26, borderRadius: 28, background: C.card, border: `2px solid ${C.line}`, boxSizing: 'border-box'}}>
    {[0, 1, 2, 3].map((i) => {
      const me = i % 2 === 1;
      const k = spr(frame, at + i * 5, {damping: 14, stiffness: 200});
      return (
        <div key={i} style={{display: 'flex', justifyContent: me ? 'flex-end' : 'flex-start', marginTop: i ? 14 : 0, transform: `scale(${k})`, transformOrigin: me ? 'right' : 'left'}}>
          <div style={{height: 46, width: [240, 180, 300, 150][i], borderRadius: 23, background: me ? '#2A6C8F' : '#1C3042'}} />
        </div>
      );
    })}
  </div>
);

export const ChatWindow: React.FC<{frame: number; at: number; title: string; prompt: string; answerLines?: number; width?: number; accent?: string}> = ({frame, at, title, prompt, answerLines = 4, width = 820, accent = '#7FE3FF'}) => {
  const k = spr(frame, at, {damping: 16, stiffness: 140});
  const typed = Math.floor(clamp01((frame - at - 8) / 22) * prompt.length);
  return (
    <div style={{width, borderRadius: 30, background: '#0C141B', border: `2px solid ${C.line}`, overflow: 'hidden', boxShadow: '0 40px 90px rgba(0,0,0,0.6)', transform: `translateY(${(1 - k) * 70}px)`, opacity: clamp01(k * 1.5)}}>
      <div style={{padding: '22px 30px', borderBottom: `2px solid ${C.line}`, fontFamily: F.grotesk, fontWeight: 700, fontSize: 32, color: C.ink, display: 'flex', alignItems: 'center', gap: 14}}>
        <span style={{width: 18, height: 18, borderRadius: 9, background: accent, boxShadow: `0 0 18px ${accent}`}} />
        {title}
      </div>
      <div style={{padding: 30}}>
        <div style={{marginLeft: 'auto', width: 'fit-content', maxWidth: '80%', padding: '18px 24px', borderRadius: 22, background: '#1F3A4F', fontFamily: F.ui, fontSize: 30, color: C.ink}}>{prompt.slice(0, typed) || ' '}</div>
        {Array.from({length: answerLines}, (_, i) => {
          const g = clamp01((frame - at - 34 - i * 4) / 10);
          return <div key={i} style={{height: 18, borderRadius: 9, marginTop: i ? 16 : 30, width: `${g * [96, 88, 92, 60][i % 4]}%`, background: accent, opacity: 0.35}} />;
        })}
      </div>
    </div>
  );
};

export const PhoneFrame: React.FC<{width?: number; children: React.ReactNode; glare?: number}> = ({width = 520, children, glare = 0.3}) => (
  <div style={{position: 'relative', width, height: width * 2.05, borderRadius: width * 0.14, background: 'linear-gradient(160deg, #2A333B, #0B0F13)', padding: width * 0.035, boxSizing: 'border-box', boxShadow: '0 60px 120px rgba(0,0,0,0.7), inset 0 0 0 2px rgba(255,255,255,0.08)'}}>
    <div style={{position: 'relative', width: '100%', height: '100%', borderRadius: width * 0.11, overflow: 'hidden', background: '#05090D'}}>
      {children}
      <div style={{position: 'absolute', inset: 0, background: `linear-gradient(125deg, rgba(255,255,255,${glare * 0.35}) 0%, transparent 35%)`, pointerEvents: 'none'}} />
      <div style={{position: 'absolute', top: width * 0.03, left: '50%', width: width * 0.3, height: width * 0.07, marginLeft: -width * 0.15, borderRadius: 40, background: '#000'}} />
    </div>
  </div>
);
