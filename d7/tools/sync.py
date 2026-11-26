#!/usr/bin/env python3
"""
Datologo 7 · Sincronización real con Faster-Whisper.

Transcribe la voz con marcas de tiempo por palabra y pega cada palabra del guion (script.txt) a su tiempo real.
Las palabras del guion que Whisper no reconoce reciben un tiempo interpolado entre sus vecinas.

Uso:  python tools/sync.py <voz.wav|mp3> <script.txt> <salida words.json> [--model medium]
Salida: [{"t": "palabra", "s": inicio, "e": fin}, ...]  + informe en la consola (porcentaje alineado).
"""
import difflib
import json
import re
import sys
import unicodedata


def norm(w: str) -> str:
    w = unicodedata.normalize('NFD', w.lower())
    w = ''.join(c for c in w if unicodedata.category(c) != 'Mn')
    return re.sub(r'[^a-z0-9%]', '', w)


def main() -> None:
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    model_name = 'medium'
    if '--model' in sys.argv:
        model_name = sys.argv[sys.argv.index('--model') + 1]
        args = [a for a in args if a != model_name]
    audio, script_path, out_path = args[:3]

    from faster_whisper import WhisperModel  # importación tardía: solo se necesita en GitHub Actions

    model = WhisperModel(model_name, device='cpu', compute_type='int8')
    segments, _ = model.transcribe(audio, language='es', word_timestamps=True, vad_filter=False, beam_size=5)
    heard = [{'t': w.word.strip(), 's': round(w.start, 3), 'e': round(w.end, 3)} for seg in segments for w in seg.words]

    script = open(script_path, encoding='utf-8').read().split()
    a = [norm(w) for w in script]
    b = [norm(w['t']) for w in heard]
    times: list = [None] * len(script)
    for blk in difflib.SequenceMatcher(None, a, b, autojunk=False).get_matching_blocks():
        for k in range(blk.size):
            h = heard[blk.b + k]
            times[blk.a + k] = (h['s'], h['e'])
    matched = sum(t is not None for t in times)

    # interpolación de las palabras sin pareja
    n = len(script)
    for i in range(n):
        if times[i] is None:
            j = i
            while j < n and times[j] is None:
                j += 1
            s0 = times[i - 1][1] if i > 0 and times[i - 1] else 0.0
            s1 = times[j][0] if j < n else (heard[-1]['e'] if heard else s0 + 0.4 * (j - i))
            step = (s1 - s0) / (j - i + 1)
            for k in range(i, j):
                times[k] = (round(s0 + step * (k - i + 0.5), 3), round(s0 + step * (k - i + 1), 3))

    words = [{'t': w, 's': t[0], 'e': t[1]} for w, t in zip(script, times)]
    json.dump(words, open(out_path, 'w', encoding='utf-8'), ensure_ascii=False)
    pct = 100 * matched / max(1, n)
    report = f'Palabras del guion alineadas: {pct:.1f} % ({matched}/{n})\nPrimera: {words[0]["s"]:.2f}s · Última: {words[-1]["e"]:.2f}s'
    print(report)
    open(out_path.replace('.json', '-report.txt'), 'w', encoding='utf-8').write(report + '\n')


if __name__ == '__main__':
    main()
