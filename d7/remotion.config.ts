// Datologo 7.0 — configuración de Remotion
import {Config} from '@remotion/cli/config';
// @ts-ignore módulo .mjs compartido con tools/
import {withLocalFonts} from './tools/webpack-fonts.mjs';

Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(92);
Config.setPixelFormat('yuv420p');
Config.setColorSpace('bt709');
Config.setCodec('h264');
Config.setCrf(15);
Config.setChromiumOpenGlRenderer('swangle');
Config.setTimeoutInMilliseconds(120000);
// Las motions de Opus importan @remotion/google-fonts (descarga en cada render): las sustituimos por fuentes locales OFL.
Config.overrideWebpackConfig((c) => withLocalFonts(c));
