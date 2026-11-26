// Sustituto local de @remotion/google-fonts/TiltNeon (render offline).
import '../fonts';
const fontFamily = '"Space Grotesk", sans-serif';
export const loadFont = (..._a: unknown[]) => ({fontFamily, fonts: {}, unicodeRanges: {}, waitUntilDone: () => Promise.resolve()});
export const getInfo = () => ({fontFamily, fonts: {}});
