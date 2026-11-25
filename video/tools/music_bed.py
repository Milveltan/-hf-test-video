import numpy as np, wave
import sys
SR=32000; D=float(sys.argv[1]) if len(sys.argv)>1 else 100.2; N=int(SR*D); tt=np.arange(N)/SR; rng=np.random.default_rng(3)
x=np.zeros(N)
bpm=96; beat=60/bpm
# progresión Am - F - C - G (raíces) cada 2 compases
roots=[55.0,43.65,65.41,49.0]
bar=beat*4
for k in range(int(D/bar)+1):
    r=roots[(k//2)%4]; s=int(k*bar*SR); e=min(N,int((k+1)*bar*SR)); a=np.arange(e-s)/SR
    # bajo en corcheas con envolvente
    for q in range(8):
        qs=int(q*beat/2*SR); qe=min(len(a),qs+int(beat/2*SR)); b=np.arange(qe-qs)/SR
        if qs>=len(a): break
        seg=(np.sin(2*np.pi*r*b)+.35*np.sign(np.sin(2*np.pi*r*b)))*np.exp(-b*7)*.5
        x[s+qs:s+qe]+=seg
    # pad
    x[s:e]+=(np.sin(2*np.pi*r*2*a)+np.sin(2*np.pi*r*3*a)*.5+np.sin(2*np.pi*r*4.0*1.0*a+.3)*.25)*.12
# bombo y hat
for k in range(int(D/beat)):
    s=int(k*beat*SR); L=int(.35*SR); b=np.arange(L)/SR
    if s+L<N:
        x[s:s+L]+=np.sin(2*np.pi*np.cumsum(50+90*np.exp(-b*30))/SR)*np.exp(-b*9)*.9
    hs=int((k+.5)*beat*SR); HL=int(.05*SR)
    if hs+HL<N:
        h=rng.standard_normal(HL); h=np.diff(np.concatenate([[0],h]))
        x[hs:hs+HL]+=h*np.exp(-np.arange(HL)/SR*80)*.12
# dinámica: intro suave, se abre tras 10 s, baja en el tramo oculto (~73-80), sube al final
g=np.interp(tt,[0,3,10,D-4,D-.5,D],[.25,.4,.75,1,.9,0])  # curva base; ajustar por episodio
x*=g
x=x/np.max(np.abs(x))*.85
with wave.open('assets/sfx/music_bed.wav','wb') as w:
    w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((x*32767).astype(np.int16).tobytes())
