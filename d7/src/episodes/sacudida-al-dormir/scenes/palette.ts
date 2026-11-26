/**
 * Dirección artística: "Vértigo de medianoche".
 * Un dormitorio visto desde el techo, bañado de luna azul índigo; la caída es un vacío violeta con estelas.
 * El calor de la lámpara (ámbar) es la vigilia que se apaga; la alarma del cerebro es un rojo coral eléctrico.
 * Materiales: sábanas de algodón suaves, madera oscura, cerebro translúcido con brillo interno.
 * Tipografía de acento: Anton (golpes) + Instrument Serif (frases suaves del cierre).
 */
import {PersonLook} from '../../../dl/characters/HumanRig';

export const P = {
  night: '#04050E',
  ink: '#0A0D24',
  indigo: '#161B45',
  dusk: '#252B66',
  moon: '#A9C2FF',
  moonDim: '#4E66B8',
  lamp: '#FFC27A',
  lampHot: '#FF9A4A',
  dream: '#9B7BFF',
  dreamDeep: '#2A1550',
  alarm: '#FF4D5E',
  sheet: '#D9DEF2',
  sheetShade: '#8E97C2',
  wood: '#2B2235',
  woodLight: '#3D3150',
  text: '#F4F2FF',
  muted: '#9AA3D1',
};

/** Protagonista: pijama azul pizarra, pelo castaño oscuro. */
export const SLEEPER: PersonLook = {
  skin: ['#E4B48F', '#A8714F'], hair: ['#3A2618', '#140B06'], hairStyle: 'short',
  top: ['#4A5A9C', '#26305E'], pants: ['#3A4580', '#1C2350'], shoes: '#D9DEF2', iris: '#4A3020',
};
