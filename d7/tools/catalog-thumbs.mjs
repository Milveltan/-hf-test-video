// Genera las miniaturas del catálogo visual (catalog/thumbs/<id>.jpg) y una hoja (catalog/hoja.jpg).
// Uso: node tools/catalog-thumbs.mjs [id1,id2…]   (sin argumentos: todas)
import {bundle} from '@remotion/bundler';
import {openBrowser, renderStill, selectComposition} from '@remotion/renderer';
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {withLocalFonts} from './webpack-fonts.mjs';

const src = fs.readFileSync('src/catalog/Showcase.tsx', 'utf8');
const all = [...src.matchAll(/\{id: '([^']+)'/g)].map((m) => m[1]);
const ids = process.argv[2] ? process.argv[2].split(',') : all;
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts'), publicDir: path.resolve('public'), webpackOverride: (c) => withLocalFonts(c)});
const browser = await openBrowser('chrome', {browserExecutable: process.env.REMOTION_CHROME || null, chromiumOptions: {gl: 'angle'}});
fs.mkdirSync('catalog/thumbs', {recursive: true});
for (const id of ids) {
  const inputProps = {piece: id};
  const composition = await selectComposition({serveUrl, id: 'Catalogo', inputProps, puppeteerInstance: browser});
  const tmp = `/tmp/cat-${id}.png`;
  await renderStill({composition, serveUrl, inputProps, output: tmp, frame: 40, puppeteerInstance: browser, chromiumOptions: {gl: 'angle'}});
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', tmp, '-vf', 'scale=360:400', '-q:v', '4', `catalog/thumbs/${id}.jpg`]);
  console.log('✓', id);
}
await browser.close({silent: true});
const list = fs.readdirSync('catalog/thumbs').filter((f) => f.endsWith('.jpg')).sort();
const cols = 6, rows = Math.ceil(list.length / cols);
execFileSync('ffmpeg', ['-v', 'error', '-y', ...list.flatMap((f) => ['-i', `catalog/thumbs/${f}`]), '-filter_complex',
  list.map((_, i) => `[${i}:v]`).join('') + `xstack=inputs=${list.length}:layout=${list.map((_, i) => `${(i % cols) * 360}_${Math.floor(i / cols) * 400}`).join('|')}:fill=black`, '-q:v', '4', 'catalog/hoja.jpg']);
console.log('-> catalog/hoja.jpg', list.length, 'piezas');
process.exit(0);
