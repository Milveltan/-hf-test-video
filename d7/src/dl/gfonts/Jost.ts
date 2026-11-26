// Sustituto local de @remotion/google-fonts/Jost (render offline).
import '../fonts';
const fontFamily = 'Inter, sans-serif';
export const loadFont = (..._a: unknown[]) => ({fontFamily, fonts: {}, unicodeRanges: {}, waitUntilDone: () => Promise.resolve()});
export const getInfo = () => ({fontFamily, fonts: {}});
