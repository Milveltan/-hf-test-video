/**
 * Dirección artística: "Abismo fisiológico".
 * El cuerpo como un océano interior de noche: negro abisal y azul profundo; el oxígeno es luz turquesa bioluminiscente,
 * el CO₂ es un ámbar que se calienta hasta carmesí. Materiales translúcidos (rayos X, tejido húmedo), luz desde arriba
 * como bajo el agua. Tipografía de acento: Barlow Semi Condensed (rótulos) + JetBrains Mono (instrumentos).
 */
import {PersonLook} from '../../../dl/characters/HumanRig';

export const P = {
  void: '#02060B',
  deep: '#051220',
  abyss: '#0A2236',
  line: '#17344A',
  o2: '#5FF2E6',
  o2dim: '#1F8F8C',
  co2: '#FFB347',
  co2hot: '#FF6A2B',
  alarm: '#FF2E4D',
  blood: '#E8323C',
  bone: '#F2EEE6',
  muted: '#86A0B3',
  xray: '#9FE8FF',
};

/** Protagonista: buceador en camiseta térmica azul petróleo. */
export const DIVER: PersonLook = {
  skin: ['#E3B08C', '#A8714F'], hair: ['#2A1E16', '#0E0805'], hairStyle: 'short',
  top: ['#1F5D6E', '#0D2E38'], pants: ['#17222D', '#0A1016'], shoes: '#5FF2E6', iris: '#4A3020',
};
