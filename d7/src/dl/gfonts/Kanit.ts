// Sustituto local de @remotion/google-fonts/Kanit (render offline).
import '../fonts';
const fontFamily = 'Montserrat, sans-serif';
export const loadFont = (..._a: unknown[]) => ({fontFamily, fonts: {}, unicodeRanges: {}, waitUntilDone: () => Promise.resolve()});
export const getInfo = () => ({fontFamily, fonts: {}});
