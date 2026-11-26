// Sustituto local de @remotion/google-fonts/BigShoulders (render offline).
import '../fonts';
const fontFamily = 'Anton, sans-serif';
export const loadFont = (..._a: unknown[]) => ({fontFamily, fonts: {}, unicodeRanges: {}, waitUntilDone: () => Promise.resolve()});
export const getInfo = () => ({fontFamily, fonts: {}});
