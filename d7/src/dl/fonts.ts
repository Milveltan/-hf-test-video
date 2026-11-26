/**
 * Datologo 7 · Fuentes locales (todas SIL OFL 1.1, vía @fontsource, en public/fonts).
 * Nada se descarga durante el render.
 */
import {loadFont} from '@remotion/fonts';
import {staticFile} from 'remotion';

const FILES: [family: string, file: string, weight: string, style?: string][] = [
  ['Montserrat', 'Montserrat-500', '500'], ['Montserrat', 'Montserrat-700', '700'], ['Montserrat', 'Montserrat-800', '800'], ['Montserrat', 'Montserrat-900', '900'],
  ['Space Grotesk', 'SpaceGrotesk-500', '500'], ['Space Grotesk', 'SpaceGrotesk-700', '700'],
  ['JetBrains Mono', 'JetBrainsMono-400', '400'], ['JetBrains Mono', 'JetBrainsMono-700', '700'], ['JetBrains Mono', 'JetBrainsMono-800', '800'],
  ['Inter', 'Inter-400', '400'], ['Inter', 'Inter-600', '600'], ['Inter', 'Inter-800', '800'],
  ['Archivo Black', 'ArchivoBlack-400', '400'],
  ['Instrument Serif', 'InstrumentSerif-400', '400'], ['Instrument Serif', 'InstrumentSerif-400i', '400', 'italic'],
  ['Barlow Semi Condensed', 'BarlowSemiCondensed-500', '500'], ['Barlow Semi Condensed', 'BarlowSemiCondensed-700', '700'], ['Barlow Semi Condensed', 'BarlowSemiCondensed-800', '800'],
  ['IBM Plex Mono', 'IBMPlexMono-400', '400'], ['IBM Plex Mono', 'IBMPlexMono-600', '600'],
  ['Anton', 'Anton-400', '400'],
];

let started = false;
export const ensureFonts = () => {
  if (started) return;
  started = true;
  for (const [family, file, weight, style] of FILES) {
    loadFont({family, url: staticFile(`fonts/${file}.woff2`), weight, style: style ?? 'normal'}).catch(() => {});
  }
};
ensureFonts();

export const F = {
  caption: 'Montserrat, sans-serif',
  display: 'Anton, "Archivo Black", sans-serif',
  grotesk: '"Space Grotesk", Inter, sans-serif',
  mono: '"JetBrains Mono", "IBM Plex Mono", monospace',
  serif: '"Instrument Serif", Georgia, serif',
  ui: 'Inter, sans-serif',
  cond: '"Barlow Semi Condensed", sans-serif',
};
