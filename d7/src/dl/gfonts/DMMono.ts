// Sustituto local de @remotion/google-fonts/DMMono (render offline).
import '../fonts';
const fontFamily = '"IBM Plex Mono", sans-serif';
export const loadFont = (..._a: unknown[]) => ({fontFamily, fonts: {}, unicodeRanges: {}, waitUntilDone: () => Promise.resolve()});
export const getInfo = () => ({fontFamily, fonts: {}});
