// Sustituto local de @remotion/google-fonts/JetBrainsMono (render offline).
import '../fonts';
const fontFamily = '"JetBrains Mono", sans-serif';
export const loadFont = (..._a: unknown[]) => ({fontFamily, fonts: {}, unicodeRanges: {}, waitUntilDone: () => Promise.resolve()});
export const getInfo = () => ({fontFamily, fonts: {}});
