// DATOLOGO · align.mjs v2
// Pega cada palabra de script.txt a su tiempo real en voice.mp3 usando transcript.json (Whisper).
// Salidas: captions.js (window.WORDS), index.html con los efectos (data-word) reubicados, sync-report.txt
import fs from 'node:fs';
import path from 'node:path';

const DIR = process.cwd();
const script = fs.readFileSync(path.join(DIR, 'script.txt'), 'utf8');
const SW = script.split(/\s+/).filter(Boolean);

// ---------- transcript ----------
function findTranscript() {
  const cands = ['transcript.json', 'captions/transcript.json', 'voice.json', 'voice.transcript.json'];
  for (const c of cands) if (fs.existsSync(path.join(DIR, c))) return path.join(DIR, c);
  const js = fs.readdirSync(DIR).filter(f => /transcri.*\.json$/i.test(f));
  return js.length ? path.join(DIR, js[0]) : null;
}
function flatWords(j) {
  let arr = Array.isArray(j) ? j : (j.words || j.segments || j.transcript || j.result || []);
  const out = [];
  for (const x of arr) {
    if (x && Array.isArray(x.words)) { for (const w of x.words) out.push(w); continue; }
    out.push(x);
  }
  return out.map(w => ({
    text: String(w.text ?? w.word ?? w.w ?? '').trim(),
    start: +(w.start ?? w.s ?? w.from ?? 0),
    end: +(w.end ?? w.e ?? w.to ?? 0),
  })).filter(w => w.text && isFinite(w.start));
}

// ---------- normalización ----------
const U = ['cero','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve','diez','once','doce','trece','catorce','quince','dieciséis','diecisiete','dieciocho','diecinueve','veinte','veintiuno','veintidós','veintitrés','veinticuatro','veinticinco','veintiséis','veintisiete','veintiocho','veintinueve'];
const D = {3:'treinta',4:'cuarenta',5:'cincuenta',6:'sesenta',7:'setenta',8:'ochenta',9:'noventa'};
const C = {1:'ciento',2:'doscientos',3:'trescientos',4:'cuatrocientos',5:'quinientos',6:'seiscientos',7:'setecientos',8:'ochocientos',9:'novecientos'};
function n2w(n) {
  if (n < 30) return U[n];
  if (n < 100) return D[Math.floor(n/10)] + (n%10 ? ' y ' + U[n%10] : '');
  if (n === 100) return 'cien';
  if (n < 1000) return C[Math.floor(n/100)] + (n%100 ? ' ' + n2w(n%100) : '');
  if (n < 1000000) { const k = Math.floor(n/1000), r = n%1000; return (k === 1 ? 'mil' : n2w(k) + ' mil') + (r ? ' ' + n2w(r) : ''); }
  return String(n);
}
const strip = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ]/g, '');
const ROMAN = { i:'uno', ii:'dos', iii:'tres', iv:'cuatro', v:'cinco', vi:'seis' };
function expand(tok, prev) {
  const raw = tok.replace(/[¿?¡!.,:;…"“”()]/g, '');
  if (/^\d+d$/i.test(raw)) return [...n2w(+raw.slice(0, -1)).split(' '), 'de'];
  if (/^\d+$/.test(raw)) return n2w(+raw).split(' ').map(strip);
  const s = strip(raw);
  if (prev && strip(prev) === 'gta' && ROMAN[s]) return [ROMAN[s]];
  if (s === 'racenchase') return ['race', 'n', 'chase'];
  return s ? [s] : [];
}

// ---------- similitud ----------
function lev(a, b) {
  const m = a.length, n = b.length; if (!m) return n; if (!n) return m;
  let p = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) { const c = [i]; for (let j = 1; j <= n; j++) c[j] = Math.min(p[j] + 1, c[j-1] + 1, p[j-1] + (a[i-1] === b[j-1] ? 0 : 1)); p = c; }
  return p[n];
}
function sim(a, b) { if (a === b) return 1; const r = 1 - lev(a, b) / Math.max(a.length, b.length); return r >= 0.6 ? r * 0.9 : 0; }

// ---------- alineación ----------
function align(TW) {
  // sub-tokens del guion
  const S = []; SW.forEach((w, i) => expand(w, SW[i-1]).forEach(t => S.push({ t, i })));
  // sub-tokens de whisper (con números expandidos y tiempos repartidos)
  const T = [];
  for (const w of TW) {
    const parts = w.text.split(/\s+/).flatMap(x => expand(x));
    const dur = Math.max(0.01, w.end - w.start);
    parts.forEach((t, k) => T.push({ t, s: w.start + dur * k / parts.length, e: w.start + dur * (k + 1) / parts.length }));
  }
  const n = S.length, m = T.length, GAP = -0.35;
  const sc = Array.from({ length: n + 1 }, () => new Float32Array(m + 1));
  const bt = Array.from({ length: n + 1 }, () => new Uint8Array(m + 1));
  for (let i = 1; i <= n; i++) { sc[i][0] = i * GAP; bt[i][0] = 1; }
  for (let j = 1; j <= m; j++) { sc[0][j] = j * GAP; bt[0][j] = 2; }
  for (let i = 1; i <= n; i++) for (let j = 1; j <= m; j++) {
    const s = sim(S[i-1].t, T[j-1].t);
    const d = sc[i-1][j-1] + (s > 0 ? s : -0.6), u = sc[i-1][j] + GAP, l = sc[i][j-1] + GAP;
    if (d >= u && d >= l) { sc[i][j] = d; bt[i][j] = s > 0 ? 3 : 0; } else if (u >= l) { sc[i][j] = u; bt[i][j] = 1; } else { sc[i][j] = l; bt[i][j] = 2; }
  }
  const W = SW.map(() => ({ s: null, e: null }));
  let i = n, j = m;
  while (i > 0 && j > 0) {
    const b = bt[i][j];
    if (b === 3) { const w = W[S[i-1].i]; const tt = T[j-1]; w.s = w.s == null ? tt.s : Math.min(w.s, tt.s); w.e = w.e == null ? tt.e : Math.max(w.e, tt.e); i--; j--; }
    else if (b === 0) { i--; j--; } else if (b === 1) i--; else j--;
  }
  return W;
}

function fill(W, total) {
  const matched = W.filter(w => w.s != null).length;
  // interpolación de palabras sin pareja entre vecinos alineados
  let k = 0;
  while (k < W.length) {
    if (W[k].s != null) { k++; continue; }
    let a = k - 1, b = k; while (b < W.length && W[b].s == null) b++;
    const t0 = a >= 0 ? W[a].e : 0, t1 = b < W.length ? W[b].s : Math.max(t0 + 0.3 * (b - k), total - 0.2);
    const cnt = b - k, step = Math.max(0.05, (t1 - t0) / cnt);
    for (let q = 0; q < cnt; q++) W[k + q] = { s: t0 + step * q, e: t0 + step * (q + 1) };
    k = b;
  }
  for (let q = 1; q < W.length; q++) if (W[q].s < W[q-1].s) W[q].s = W[q-1].s + 0.02;
  return matched;
}

// ---------- main ----------
const tp = findTranscript();
let total = 100.1;
const idxPath = path.join(DIR, 'index.html');
let html = fs.readFileSync(idxPath, 'utf8');
const dm = html.match(/id="voice"[^>]*data-duration="([\d.]+)"/); if (dm) total = +dm[1];
let report = [];
let WORDS = null;
if (!tp) {
  report.push('Sin transcript.json: se conservan los tiempos estimados de captions.js');
  const cj = fs.readFileSync(path.join(DIR, 'captions.js'), 'utf8');
  WORDS = JSON.parse(cj.slice(cj.indexOf('['), cj.lastIndexOf(']') + 1));
} else {
  const TW = flatWords(JSON.parse(fs.readFileSync(tp, 'utf8')));
  const W = align(TW);
  const matched = fill(W, total);
  WORDS = SW.map((t, i) => ({ t, s: +W[i].s.toFixed(3), e: +Math.max(W[i].e, W[i].s + 0.08).toFixed(3) }));
  fs.writeFileSync(path.join(DIR, 'captions.js'), 'window.WORDS=' + JSON.stringify(WORDS) + ';\n');
  report.push(`Transcript: ${path.basename(tp)} (${TW.length} palabras reconocidas)`);
  report.push(`Palabras del guion alineadas: ${(100 * matched / SW.length).toFixed(1)} % (${matched}/${SW.length})`);
  report.push(`Primera palabra: ${WORDS[0].s}s · Última palabra: ${WORDS[WORDS.length-1].e}s · Audio: ${total}s`);
}
// efectos de sonido anclados a palabra: <audio ... data-word="N" data-offset="x" ... data-start="...">
let moved = 0;
html = html.replace(/<audio\b[^>]*>/g, tag => {
  const w = tag.match(/data-word="(\d+)"/); if (!w) return tag;
  const off = +(tag.match(/data-offset="(-?[\d.]+)"/) || [0, 0])[1];
  const st = Math.max(0, WORDS[Math.min(+w[1], WORDS.length - 1)].s + off).toFixed(3); moved++;
  return tag.replace(/data-start="[\d.]+"/, `data-start="${st}"`);
});
fs.writeFileSync(idxPath, html);
report.push(`Efectos de sonido reubicados: ${moved}`);
fs.writeFileSync(path.join(DIR, 'sync-report.txt'), report.join('\n') + '\n');
console.log(report.join('\n'));
