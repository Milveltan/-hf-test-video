# DATOLOGO · tools/music_drone.py — música de fondo SOMBRÍA (historia, tragedia, misterio). Sin licencias.
# Pads lentos en re menor (Dm - Bb - Gm - A) + pulso grave tipo latido + aire. Uso: python3 tools/music_drone.py <segundos>
# Salida: assets/sfx/music_drone.wav (normalizada a ≈ -24 LUFS si ffmpeg está disponible). En index.html: data-volume="0.12".
import numpy as np, wave, sys, subprocess, os
SR=32000; D=float(sys.argv[1]) if len(sys.argv)>1 else 80.0; N=int(SR*D); t=np.arange(N)/SR; rng=np.random.default_rng(5)
chords=[[73.42,87.31,110.0],[58.27,73.42,87.31],[49.0,58.27,73.42],[55.0,69.3,82.41]]; seg=8.0
x=np.zeros(N)
for k in range(int(D/seg)+1):
    s=int(k*seg*SR); e=min(N,int((k+1)*seg*SR)+SR*2); 
    if s>=N: break
    a=np.arange(e-s)/SR; env=np.clip(a/2.5,0,1)*np.clip((e-s)/SR-a,0,2)/2
    for f in chords[k%4]:
        for det in (-.6,0,.6):
            x[s:e]+=np.sin(2*np.pi*(f*2+det)*a+rng.random()*6)*env*.12
        x[s:e]+=np.sin(2*np.pi*f*a)*env*.18
# latido grave cada 1.6 s
for b in np.arange(1.0,D-1,1.6):
    s=int(b*SR); a=np.arange(int(.5*SR))/SR; e=min(N,s+len(a)); a=a[:e-s]
    x[s:e]+=np.sin(2*np.pi*48*a)*np.exp(-a*9)*.5
air=rng.standard_normal(N); air=np.convolve(air,np.ones(60)/60,'same')*.05
x+=air
x*=np.interp(t,[0,4,D-5,D-.3,D],[.2,.8,1,.6,0])
x=x/np.max(np.abs(x))*.8
tmp='assets/sfx/_drone.wav'
with wave.open(tmp,'wb') as w:
    w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((x*32767).astype(np.int16).tobytes())
try:
    subprocess.run(['ffmpeg','-v','error','-y','-i',tmp,'-af','loudnorm=I=-24:TP=-2','-ar','32000','assets/sfx/music_drone.wav'],check=True); os.remove(tmp)
except Exception: os.replace(tmp,'assets/sfx/music_drone.wav')
print('assets/sfx/music_drone.wav',D,'s')
