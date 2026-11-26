// DROGMAN · Validación técnica automática (≈ 20 s). Uso: node tools/check.mjs [slug]
// Revisa: tipos, palabras del guion vs words.json, índices de palabra dentro de rango, audios y efectos existentes,
// composición declarada, textos demasiado pequeños para teléfono. Sale con código 1 si hay errores.
import {execSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const ep = JSON.parse(fs.readFileSync('episode.json', 'utf8'));
const slug = process.argv[2] || ep.slug;
const dir = `src/episodes/${slug}`;
const errors = [], warns = [];
const ok = (m) => console.log('✓', m);

try { execSync('npx tsc --noEmit', {stdio: 'pipe'}); ok('tipos (tsc)'); }
catch (e) { errors.push('tsc:\n' + e.stdout.toString().split('\n').slice(0, 15).join('\n')); }

const words = JSON.parse(fs.readFileSync(`${dir}/words.json`, 'utf8'));
const script = fs.readFileSync(`${dir}/script.txt`, 'utf8').split(/\s+/).filter(Boolean);
if (words.length !== script.length) errors.push(`words.json tiene ${words.length} palabras y script.txt ${script.length}`);
else ok(`palabras: ${words.length}`);

const files = execSync(`grep -rlE "lw\\(|w\\(" ${dir}`).toString().trim().split('\n');
let maxIdx = -1;
for (const f of files) for (const m of fs.readFileSync(f, 'utf8').matchAll(/\bl?w\((\d+)/g)) maxIdx = Math.max(maxIdx, +m[1]);
if (maxIdx >= words.length) errors.push(`índice de palabra ${maxIdx} fuera de rango (máx ${words.length - 1})`);
else ok(`índices de palabra ≤ ${maxIdx}`);

const src = execSync(`cat ${dir}/*.tsx ${dir}/scenes/*.tsx 2>/dev/null`).toString();
for (const m of src.matchAll(/file: '([\w-]+)'/g)) if (!fs.existsSync(`public/sfx/${m[1]}.wav`)) errors.push(`falta public/sfx/${m[1]}.wav`);
for (const m of src.matchAll(/(?:voice|ambient|music|staticFile\()\s*:?\s*'([^']+\.(?:wav|mp3|png|jpg|webm))'/g)) if (!fs.existsSync(`public/${m[1]}`)) errors.push(`falta public/${m[1]}`);
ok('archivos de audio y efectos');

const root = fs.readFileSync('src/Root.tsx', 'utf8');
if (!root.includes(`"${ep.composition}"`) && !root.includes(`'${ep.composition}'`)) errors.push(`la composición ${ep.composition} no está en Root.tsx`);
else ok(`composición ${ep.composition}`);

const audio = execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${ep.voice}`).toString().trim();
if (Math.abs(+audio - words[words.length - 1].e) > 2.5) warns.push(`la última palabra (${words[words.length - 1].e}s) no cuadra con el audio (${audio}s)`);
else ok(`audio ${(+audio).toFixed(1)} s`);

for (const f of execSync(`ls ${dir}/scenes/*.tsx`).toString().trim().split('\n')) {
  const t = fs.readFileSync(f, 'utf8');
  for (const m of t.matchAll(/fontSize: (\d+)\b/g)) if (+m[1] < 28) warns.push(`${path.basename(f)}: texto de ${m[1]} px (mínimo recomendado 28 px en teléfono, salvo dentro de pantallas escaladas)`);
}

warns.forEach((w) => console.log('⚠', w));
if (errors.length) { errors.forEach((e) => console.log('✗', e)); process.exit(1); }
console.log(`\nValidación OK (${warns.length} avisos).`);
