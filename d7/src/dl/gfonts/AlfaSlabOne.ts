// Sustituto local de @remotion/google-fonts/AlfaSlabOne (render offline).
import '../fonts';
const fontFamily = '"Archivo Black", sans-serif';
export const loadFont = (..._a: unknown[]) => ({fontFamily, fonts: {}, unicodeRanges: {}, waitUntilDone: () => Promise.resolve()});
export const getInfo = () => ({fontFamily, fonts: {}});
