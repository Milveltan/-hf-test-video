// DATOLOGO · tools/ficha_sheet.mjs — hoja de fichas (PNG estático, NO es render de video). Uso de Claude para comprobar parecido.
// Uso: node tools/ficha_sheet.mjs hotspanishNino,hotspanishYT,hotspanish  → ficha_sheet.svg (convertir: rsvg-convert -w 1100 ficha_sheet.svg -o ficha_sheet.png)
import fs from 'node:fs';
globalThis.window=globalThis;globalThis.gsap={};globalThis.document={};
for(const f of ['lib/core.js','lib/characters.js','lib/fichas.js'])(0,eval)(fs.readFileSync(f,'utf8'));
const names=(process.argv[2]||Object.keys(window.FICHAS).join(',')).split(',');
const g=names.map((n,i)=>`<g transform="translate(${150+i*260} 720)">${DLC.makeChar('f'+i,window.FICHAS[n])}</g><text x="${150+i*260}" y="750" font-size="22" fill="#fff" text-anchor="middle">${n}</text>`).join('');
fs.writeFileSync('ficha_sheet.svg',`<svg xmlns="http://www.w3.org/2000/svg" width="${names.length*260+40}" height="770"><defs>${DL.DEFS.join('')}</defs><rect width="100%" height="100%" fill="#3a3a54"/>${g}</svg>`);
console.log('ficha_sheet.svg',names.join(', '));
