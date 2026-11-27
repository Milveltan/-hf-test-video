// Datologo 7.0 — configuración de Remotion
import {Config} from '@remotion/cli/config';
// @ts-ignore módulo .mjs compartido con tools/
import {withLocalFonts} from './tools/webpack-fonts.mjs';

Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(96);
Config.setPixelFormat('yuv420p');
Config.setColorSpace('bt709');
Config.setCodec('h264');
// Los clips 3D se exportan por bitrate (CLIP_RENDER=1); crf y bitrate no se pueden combinar.
if (!process.env.CLIP_RENDER) Config.setCrf(15);
Config.setChromiumOpenGlRenderer('angle');
Config.setTimeoutInMilliseconds(120000);
// Las motions de Opus importan @remotion/google-fonts (descarga en cada render): las sustituimos por fuentes locales OFL.
Config.overrideWebpackConfig((c) => withLocalFonts(c));
