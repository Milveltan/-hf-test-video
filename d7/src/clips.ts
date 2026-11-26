/**
 * Registro de clips 3D (WebGL) que se renderizan aparte con --gl=swangle.
 * El workflow los renderiza primero (public/clips/<id>.webm, con alfa) y después el episodio en modo rápido.
 * Agregar un clip: exportar el componente de la capa 3D y añadirlo aquí con su duración.
 */
import React from 'react';
import {Ocean3D} from './episodes/piloto-fosa/Ocean3D';
import {FRAMES as PF_FRAMES} from './episodes/piloto-fosa/world';
import {IAParticles, IA_CLIP_FRAMES} from './episodes/internet-muerto/scenes/S11IA';

export type ClipDef = {id: string; frames: number; component: React.FC; episode: string};

export const CLIPS: ClipDef[] = [
  {id: 'im-ia-particulas', frames: IA_CLIP_FRAMES, component: IAParticles, episode: 'internet-muerto'},
  {id: 'piloto-fosa-oceano', frames: PF_FRAMES, component: Ocean3D, episode: 'piloto-fosa'},
];
