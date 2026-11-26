// Sustituto local de @remotion/google-fonts/SpaceGrotesk (render offline).
import '../fonts';
const fontFamily = '"Space Grotesk", sans-serif';
export const loadFont = (..._a: unknown[]) => ({fontFamily, fonts: {}, unicodeRanges: {}, waitUntilDone: () => Promise.resolve()});
export const getInfo = () => ({fontFamily, fonts: {}});
