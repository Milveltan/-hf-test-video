// Sustituto local de @remotion/google-fonts/Cormorant (render offline).
import '../fonts';
const fontFamily = '"Instrument Serif", sans-serif';
export const loadFont = (..._a: unknown[]) => ({fontFamily, fonts: {}, unicodeRanges: {}, waitUntilDone: () => Promise.resolve()});
export const getInfo = () => ({fontFamily, fonts: {}});
