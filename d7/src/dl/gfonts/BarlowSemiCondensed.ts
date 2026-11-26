// Sustituto local de @remotion/google-fonts/BarlowSemiCondensed (render offline).
import '../fonts';
const fontFamily = '"Barlow Semi Condensed", sans-serif';
export const loadFont = (..._a: unknown[]) => ({fontFamily, fonts: {}, unicodeRanges: {}, waitUntilDone: () => Promise.resolve()});
export const getInfo = () => ({fontFamily, fonts: {}});
