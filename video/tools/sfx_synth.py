import numpy as np, wave
SR=44100; rng=np.random.default_rng(7)
def save(n,x):
    x=x/ (np.max(np.abs(x))+1e-9)*0.9
    with wave.open(f'assets/sfx/{n}.wav','wb') as w:
        w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((x*32767).astype(np.int16).tobytes())
def t(d): return np.arange(int(SR*d))/SR
def env(d,a=0.005,r=None,k=6):
    tt=t(d); e=np.minimum(1,tt/a); return e*np.exp(-k*tt/d) if r is None else e
def lp(x,a): # one-pole lowpass, a in (0,1)
    y=np.zeros_like(x); s=0
    for i in range(len(x)): s+=a*(x[i]-s); y[i]=s
    return y
def lpf(x,c): # FFT lowpass
    X=np.fft.rfft(x); f=np.fft.rfftfreq(len(x),1/SR); X[f>c]=0; return np.fft.irfft(X,len(x))
def bpf(x,lo,hi):
    X=np.fft.rfft(x); f=np.fft.rfftfreq(len(x),1/SR); X[(f<lo)|(f>hi)]=0; return np.fft.irfft(X,len(x))
# impact
d=0.9;tt=t(d);f=55*np.exp(-tt*4)+40
x=np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-tt*5)+lpf(rng.standard_normal(len(tt)),1800)*np.exp(-tt*25)*.6
save('impact',x)
# crash metálico
d=1.2;tt=t(d);x=bpf(rng.standard_normal(len(tt)),300,6000)*np.exp(-tt*5)
for fr in [523,1187,1730,2410,3120]: x+=np.sin(2*np.pi*fr*tt+rng.random()*6)*np.exp(-tt*(4+rng.random()*4))*.35
x+=np.sin(2*np.pi*48*tt)*np.exp(-tt*6)*1.2
save('crash',x)
# sirena
d=2.4;tt=t(d);f=900+350*np.sin(2*np.pi*1.6*tt);ph=2*np.pi*np.cumsum(f)/SR
x=(np.sin(ph)+.3*np.sin(2*ph))*np.minimum(1,tt*6)*np.minimum(1,(d-tt)*4);save('siren',x)
# glitch
d=0.7;tt=t(d);x=np.zeros(len(tt))
for k in range(9):
    s=int(rng.random()*len(tt)*.85);L=int(SR*(0.02+rng.random()*0.06));fr=200+rng.random()*2500
    seg=np.sign(np.sin(2*np.pi*fr*np.arange(L)/SR))*(0.5+rng.random()*.5); x[s:s+L]+=seg[:len(x[s:s+L])]
x+=np.round(rng.standard_normal(len(tt))*3)/3*.15*np.exp(-tt*3);save('glitch',x)
# obturador / flash
d=0.35;tt=t(d);x=np.zeros(len(tt))
for s0 in [0,0.09]:
    i=int(s0*SR);L=int(.04*SR);x[i:i+L]+=bpf(rng.standard_normal(L),1500,9000)*np.exp(-np.arange(L)/SR*90)
save('shutter',x)
# monedas
d=1.6;tt=t(d);x=np.zeros(len(tt))
for k in range(28):
    s=int((k/28)**1.3*SR*1.2+rng.random()*800);fr=2600+rng.random()*2600;L=int(.25*SR);a=np.arange(L)/SR
    seg=(np.sin(2*np.pi*fr*a)+.5*np.sin(2*np.pi*fr*1.52*a))*np.exp(-a*18);x[s:s+L]+=seg[:len(x[s:s+L])]*(0.4+rng.random()*.6)
save('coins',x)
# tecleo
d=2.2;tt=t(d);x=np.zeros(len(tt))
for k in range(22):
    s=int((k*0.095+rng.random()*0.03)*SR);L=int(.03*SR);x[s:s+L]+=bpf(rng.standard_normal(L),900,5000)*np.exp(-np.arange(L)/SR*160)*(0.5+rng.random()*.5)
save('typing',x)
# lluvia (loop)
d=8;tt=t(d);x=lpf(rng.standard_normal(len(tt)),5000)*.35
for k in range(500):
    s=int(rng.random()*(len(tt)-400));L=300;x[s:s+L]+=bpf(rng.standard_normal(L),2000,8000)*np.exp(-np.arange(L)/SR*300)*rng.random()
x*=np.minimum(1,tt/0.8)*np.minimum(1,(d-tt)/0.8);save('rain',x)
# sello
d=0.6;tt=t(d);x=np.sin(2*np.pi*90*tt)*np.exp(-tt*18)+lpf(rng.standard_normal(len(tt)),2500)*np.exp(-tt*40)*.8;save('stamp',x)
# riser
d=2.2;tt=t(d);f=150+tt**2*500;x=np.sin(2*np.pi*np.cumsum(f)/SR)*.4
n=rng.standard_normal(len(tt));x+=np.concatenate([bpf(n[i:i+4410],300+i/len(tt)*7000,800+i/len(tt)*9000) for i in range(0,len(tt),4410)])[:len(tt)]*.7
x*=(tt/d)**1.6;save('riser',x)
# boom final
d=3.2;tt=t(d);f=60*np.exp(-tt*1.5)+28;x=np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-tt*1.3)+lpf(rng.standard_normal(len(tt)),900)*np.exp(-tt*4)*.5;save('boom',x)
# ping notificación
d=0.6;tt=t(d);x=(np.sin(2*np.pi*1320*tt)*np.exp(-tt*9)+np.sin(2*np.pi*1980*tt)*np.exp(-tt*12)*.6)*np.minimum(1,tt/0.003)
x[int(.11*SR):]+=(np.sin(2*np.pi*1760*tt)*np.exp(-tt*9))[:len(tt)-int(.11*SR)];save('ping',x)
# motor
d=2.0;tt=t(d);f=60+90*(1-np.exp(-tt*2.5))+12*np.sin(2*np.pi*7*tt);ph=2*np.pi*np.cumsum(f)/SR
x=(2*((ph/(2*np.pi))%1)-1)*.6+np.sin(ph*2)*.3;x=lpf(x,1400)*np.minimum(1,tt*5)*np.minimum(1,(d-tt)*3);save('engine',x)
# caja registradora
d=1.0;tt=t(d);x=(np.sin(2*np.pi*2093*tt)+np.sin(2*np.pi*3136*tt)*.6)*np.exp(-tt*4)
x[:int(.08*SR)]+=bpf(rng.standard_normal(int(.08*SR)),800,5000)*.8;save('cash',x)
# reloj
d=2.0;tt=t(d);x=np.zeros(len(tt))
for k in range(8):
    s=int(k*.25*SR);L=int(.02*SR);x[s:s+L]+=bpf(rng.standard_normal(L),2500,7000)*np.exp(-np.arange(L)/SR*250)*(1 if k%2==0 else .6)
save('tick',x)
# hojas de calendario (flip)
d=1.4;tt=t(d);x=np.zeros(len(tt))
for k in range(10):
    s=int(k*.12*SR);L=int(.07*SR);x[s:s+L]+=bpf(rng.standard_normal(L),600,6000)*np.sin(np.linspace(0,np.pi,L))
save('flip',x)
