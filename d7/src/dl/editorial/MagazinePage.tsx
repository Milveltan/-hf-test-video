/**
 * Biblioteca Datologo · Página de revista genérica (papel con textura, cabecera con el nombre en nuestra tipografía,
 * titular, columnas de texto simulado). Para citar medios: el nombre va como texto, nunca su logotipo.
 */
import React from 'react';
import {F} from '../fonts';

export const MagazinePage: React.FC<{masthead: string; kicker?: string; headline: React.ReactNode; width?: number; seed?: number}> = ({masthead, kicker, headline, width = 760}) => (
  <div style={{position: 'relative', width, height: width * 1.3, background: 'linear-gradient(160deg, #F4EFE4, #E3DACA)', boxShadow: '0 50px 100px rgba(0,0,0,0.65)', padding: width * 0.07, boxSizing: 'border-box', overflow: 'hidden'}}>
    <svg width="100%" height="100%" style={{position: 'absolute', inset: 0, mixBlendMode: 'multiply', opacity: 0.35}}>
      <filter id="mpPaper"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="4" /><feColorMatrix type="saturate" values="0" /></filter>
      <rect width="100%" height="100%" filter="url(#mpPaper)" />
    </svg>
    <div style={{position: 'relative', fontFamily: F.serif, fontSize: width * 0.1, lineHeight: 1, color: '#14110D', borderBottom: '3px solid #14110D', paddingBottom: 14, textAlign: 'center'}}>{masthead}</div>
    {kicker ? <div style={{position: 'relative', fontFamily: F.mono, fontSize: width * 0.026, letterSpacing: '0.2em', color: '#B2341F', marginTop: 26}}>{kicker}</div> : null}
    <div style={{position: 'relative', fontFamily: F.serif, fontSize: width * 0.085, lineHeight: 1.04, color: '#14110D', marginTop: 16}}>{headline}</div>
    <div style={{position: 'relative', display: 'flex', gap: 26, marginTop: 30}}>
      {[0, 1].map((c) => (
        <div key={c} style={{flex: 1}}>
          {Array.from({length: 13}, (_, i) => <div key={i} style={{height: 9, marginBottom: 12, borderRadius: 2, background: '#3B342B', opacity: 0.32, width: `${i % 5 === 4 ? 62 : 100 - ((i * 7 + c * 3) % 9)}%`}} />)}
        </div>
      ))}
    </div>
  </div>
);
