// Control de calidad: renderiza fotogramas sueltos y arma una hoja de contacto.
// Uso: node tools/qa-stills.mjs <Composición> <f1,f2,...> [salida.jpg]
import {bundle} from '@remotion/bundler';
import {openBrowser, renderStill, selectComposition} from '@remotion/renderer';
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {withLocalFonts} from './webpack-fonts.mjs';

const [id, list, out = 'out/qa-sheet.jpg'] = process.argv.slice(2);
const frames = list.split(',').map(Number);
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts'), publicDir: path.resolve('public'), webpackOverride: (c) => withLocalFonts(c)});
const browser = await openBrowser('chrome', {browserExecutable: process.env.REMOTION_CHROME || null, chromiumOptions: {gl: process.env.QA_GL || 'angle'}});
const composition = await selectComposition({serveUrl, id, puppeteerInstance: browser});
fs.mkdirSync('out/qa', {recursive: true});
const files = [];
for (const f of frames) {
  const file = `out/qa/${id}-${String(f).padStart(4, '0')}.png`;
  const t0 = Date.now();
  await renderStill({composition, serveUrl, output: file, frame: f, puppeteerInstance: browser, chromiumOptions: {gl: process.env.QA_GL || 'angle'}});
  console.log('frame', f, Date.now() - t0, 'ms');
  files.push(file);
}
await browser.close({silent: true});
const cols = Math.min(4, files.length);
const inputs = files.flatMap((f) => ['-i', f]);
const filter = files.map((_, i) => `[${i}:v]scale=432:480,drawtext=text='${frames[i]}':x=10:y=10:fontsize=28:fontcolor=yellow:box=1:boxcolor=black@0.6[v${i}]`).join(';') +
  ';' + files.map((_, i) => `[v${i}]`).join('') + `xstack=inputs=${files.length}:layout=${files.map((_, i) => `${(i % cols) * 432}_${Math.floor(i / cols) * 480}`).join('|')}:fill=black[o]`;
execFileSync('ffmpeg', ['-v', 'error', '-y', ...inputs, '-filter_complex', filter, '-map', '[o]', '-q:v', '3', out]);
console.log('->', out);
process.exit(0);
