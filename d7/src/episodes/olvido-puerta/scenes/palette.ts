/**
 * Dirección artística: "Cine de hogar" — el hogar como película en capítulos.
 * Corrección de color de cine: sombras verde-azuladas (cocina), tungsteno ámbar (sala), crema de celuloide en los marcos.
 * La idea pendiente es una bombilla amarilla que brilla como un faro pequeño. Alarma/duda en coral.
 * Materiales: madera cálida, azulejo teal, tela de sofá, celuloide negro con perforaciones.
 * Tipografía de acento: Anton (rótulos de capítulo) + Instrument Serif cursiva (frases suaves).
 */
import {PersonLook} from '../../../dl/characters/HumanRig';

export const P = {
  night: '#050E12',
  ink: '#0A171C',
  kTop: '#0F3A40',
  kWall: '#185058',
  kTile: '#2A7A80',
  kTileLine: '#12474D',
  cab: '#7A4A2C',
  cabLight: '#A8683C',
  metal: '#C9D6D8',
  metalDark: '#7C9094',
  sTop: '#4A2630',
  sWall: '#7A3E36',
  sofa: '#2E7F83',
  sofaDark: '#154A50',
  wood: '#2C1A12',
  woodLight: '#4A2E20',
  tungsten: '#FFB45A',
  tungstenHot: '#FF8A3D',
  idea: '#FFE27A',
  ideaDeep: '#FFB020',
  cream: '#F3E7CF',
  film: '#0B0F11',
  coral: '#FF5A4D',
  teal: '#35B8B0',
  text: '#FFF6E4',
  muted: '#8FB3B3',
  ok: '#5BE3A0',
};

/** Protagonista: suéter coral, pelo oscuro corto, pantalón azul pizarra. */
export const VIEWER: PersonLook = {
  skin: ['#E4B48F', '#A8714F'], hair: ['#2E1D14', '#100904'], hairStyle: 'short',
  top: ['#E9795A', '#9A3F2B'], pants: ['#34465A', '#18222E'], shoes: '#F1EBDD', iris: '#4A3020',
};
