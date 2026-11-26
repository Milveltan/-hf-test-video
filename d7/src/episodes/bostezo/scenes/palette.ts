/**
 * Dirección artística: "Termografía nocturna".
 * Negro azulado de laboratorio a oscuras, una sola luz de contorno cian por personaje (misterio). El calor del cerebro se ve
 * con paleta de cámara térmica (violeta → magenta → naranja → amarillo) y el aire que entra, en cian helado.
 * El contagio es una señal roja que salta de rostro en rostro. Tipografía: Anton (golpes) + Instrument Serif cursiva (cierre).
 */
import {FaceLook} from '../../../dl/characters/Face';
export const P = {
  void: '#03050A', ink: '#070C16', deep: '#0C1626', rim: '#6FE6FF', ice: '#9FF4FF', signal: '#FF3B5C',
  t0: '#2A0F5C', t1: '#7A1FA8', t2: '#E0306E', t3: '#FF7A2A', t4: '#FFE14D', text: '#EEF6FF', muted: '#7F93AD',
};
export const thermal = (k: number) => {
  const stops = [P.t0, P.t1, P.t2, P.t3, P.t4];
  const x = Math.max(0, Math.min(0.999, k)) * (stops.length - 1), i = Math.floor(x), t = x - i;
  const a = parseInt(stops[i].slice(1), 16), b = parseInt(stops[i + 1].slice(1), 16);
  const ch = (s: number) => Math.round(((a >> s) & 255) * (1 - t) + ((b >> s) & 255) * t);
  return `rgb(${ch(16)},${ch(8)},${ch(0)})`;
};
export const LOOKS: FaceLook[] = [
  {skin: ['#E2B08A', '#9E6A48'], hair: ['#2A1A10', '#0C0604'], hairStyle: 'short', shirt: '#2E3A4E'},
  {skin: ['#F1C9A8', '#B98763'], hair: ['#8A4A22', '#4A220C'], hairStyle: 'long', shirt: '#5A2E3E'},
  {skin: ['#B9805A', '#6E4428'], hair: ['#151010', '#000000'], hairStyle: 'curly', shirt: '#2F5A4E'},
  {skin: ['#F4D2B4', '#C29674'], hair: ['#D9B26A', '#8F6A2E'], hairStyle: 'bun', shirt: '#3A3A6A'},
  {skin: ['#8E5A3C', '#4E2E1A'], hair: ['#1A1210', '#050302'], hairStyle: 'short', shirt: '#6A4A2A'},
];
