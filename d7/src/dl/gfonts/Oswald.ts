// Sustituto local de @remotion/google-fonts/Oswald (render offline).
import '../fonts';
const fontFamily = 'Anton, sans-serif';
export const loadFont = (..._a: unknown[]) => ({fontFamily, fonts: {}, unicodeRanges: {}, waitUntilDone: () => Promise.resolve()});
export const getInfo = () => ({fontFamily, fonts: {}});
