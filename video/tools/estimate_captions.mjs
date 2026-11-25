// DATOLOGO · tools/estimate_captions.mjs — tiempos PROVISIONALES para captions.js (uso de Claude, no del workflow)
// Reparte las palabras de script.txt por sílabas dentro de los tramos con voz detectados por ffmpeg.
// Whisper + align.mjs en GitHub Actions los sustituyen por los tiempos reales.
// Uso: node tools/estimate_captions.mjs [voice.mp3]
import fs from 'node:fs'; import { execSync } from 'node:child_process';
const mp3 = process.argv[2] || 'voice.mp3';
const dur = +execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 "${mp3}"`).toString();
const log = execSync(`ffmpeg -hide_banner -i "${mp3}" -af silencedetect=noise=-32dB:d=0.22 -f null - 2>&1`).toString();
const st = [...log.matchAll(/silence_start: ([\d.]+)/g)].map(m => +m[1]), en = [...log.matchAll(/silence_end: ([\d.]+)/g)].map(m => +m[1]);
const segs = []; let p = 0.1;
st.forEach((s, i) => { if (s - p > 0.15) segs.push([p, s]); p = en[i] ?? dur; }); if (dur - p > 0.2) segs.push([p, dur - 0.1]);
const SW = fs.readFileSync('script.txt', 'utf8').split(/\s+/).filter(Boolean);
const U = {'0':'cero','1':'uno','2':'dos','3':'tres','4':'cuatro','5':'cinco','6':'seis','7':'siete','8':'ocho','9':'nueve'};
const syl = w => { const d = w.replace(/\d/g, c => U[c] + ' ').toLowerCase().normalize('NFD').replace(/[^a-z ]/g, ''); return Math.max(1, (d.match(/[aeiouy]+/g) || []).length) + 0.6; };
const wt = SW.map(syl), tot = wt.reduce((a, b) => a + b, 0), speech = segs.reduce((a, [x, y]) => a + y - x, 0);
const tAt = f => { let r = f * speech; for (const [x, y] of segs) { if (r <= y - x) return x + r; r -= y - x; } return segs.at(-1)[1]; };
let c = 0; const W = SW.map((t, i) => { const s = tAt(c / tot); c += wt[i]; return { t, s: +s.toFixed(3), e: +tAt(c / tot).toFixed(3) }; });
fs.writeFileSync('captions.js', 'window.WORDS=' + JSON.stringify(W) + ';\n');
console.log(`Audio ${dur.toFixed(2)} s · ${segs.length} tramos con voz · ${SW.length} palabras → captions.js (provisional)`);
