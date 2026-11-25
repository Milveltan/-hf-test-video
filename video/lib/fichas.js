/* DATOLOGO · lib/fichas.js — fichas fijas de personajes (ACUMULATIVO: agregar, nunca borrar)
   Uso: makeChar('id', FICHAS.nombre)  ·  variantes: Object.assign({}, FICHAS.x, {silhouette:true, rim:'#ffb070'})
   Episodio de origen entre corchetes. */
window.FICHAS=Object.assign(window.FICHAS||{},{
  /* [gta-vi-13-anios] */
  jugador:{skin:['#f3c09a','#c98a66','#7a4a40'],hair:['#4a2c1c','#1a0e08'],hairStyle:'short',top:['#2fb8c9','#123c5a'],pants:['#2c3550','#121626'],iris:'#4a2e1c',rim:'#7fd6ff'},
  jugadorAdulto:{skin:['#f3c09a','#c98a66','#7a4a40'],hair:['#4a2c1c','#1a0e08'],hairStyle:'short',top:['#2fb8c9','#123c5a'],pants:['#2c3550','#121626'],iris:'#4a2e1c',rim:'#ffcf8a',beard:true},
  dev1:{skin:['#f6c7a6','#d0907a','#8a5048'],hair:['#d2642a','#6a240c'],hairStyle:'curly',top:['#9a4a5a','#3a1624'],pants:['#4a4a5a','#1d1d26'],iris:'#3a6a4a',rim:'#7dffb0',glasses:true},
  dev2:{skin:['#e8b48c','#b07454','#6a3e30'],hair:['#2a1a12','#0c0806'],hairStyle:'short',top:['#5a6a3a','#232a14'],top2:'#e8e2d0',pants:['#3a3328','#16130e'],iris:'#3a2418',rim:'#ffd59a'},
  publicista:{skin:['#f0bea0','#c48868','#7a4a3c'],hair:['#1c1c22','#050508'],hairStyle:'short',top:['#3a3f52','#11131c'],top2:'#f4f0e8',pants:['#2a2e3c','#0c0e16'],iris:'#2a2a2a',rim:'#ffe2b0'},
  hacker:{skin:['#d9a07a','#9a6448','#4a2a22'],hair:['#151012','#050405'],hairStyle:'short',top:['#2a2e3a','#0a0b10'],pants:['#1e2230','#08090e'],iris:'#2a1a12',rim:'#5ff3ff',hood:true},

  /* [hotspanish-antes-de-la-fama] — personaje ilustrado propio (no retrato) */
  hotspanish:{skin:['#e3a57c','#b06f4e','#62382c'],hair:['#3a2418','#140a06'],hairStyle:'afro',top:['#ff5fb4','#a3196a'],pants:['#ff6fbd','#a3196a'],shoes:'#f6f6f6',iris:'#2a1810',rim:'#ffb0e0',glasses:true,sleeve:'short'},
  hotspanishNino:{skin:['#e3a57c','#b06f4e','#62382c'],hair:['#3a2418','#140a06'],hairStyle:'afro',top:['#d8362f','#7a1414'],pants:['#3a4258','#161a28'],shoes:'#f2f2f2',iris:'#2a1810',rim:'#ffd59a',kid:true,sleeve:'short'},
  hotspanishYT:{skin:['#e3a57c','#b06f4e','#62382c'],hair:['#3a2418','#140a06'],hairStyle:'afro',top:['#9aa0ab','#4a4f5a'],pants:['#2c3550','#121626'],shoes:'#f2f2f2',iris:'#2a1810',rim:'#7fd6ff',hood:true},
  tia:{skin:['#e0a07a','#a86a4c','#5e3628'],hair:['#2a1a14','#0c0806'],hairStyle:'long',top:['#3f8a7a','#16403a'],pants:['#4a3a5a','#1e1626'],iris:'#2a1810',rim:'#ffcf8a'},
  papa:{skin:['#d99a72','#a0644a','#583226'],hair:['#1e1612','#080604'],hairStyle:'short',top:['#4a6a9a','#1c2c48'],pants:['#3a3a46','#14141c'],iris:'#2a1810',rim:'#ffd59a',cap:'#8a3a2a'},
  senor:{skin:['#d9a07a','#a0644a','#5a3428'],hair:['#d8d0c4','#8a8278'],hairStyle:'short',top:['#f2efe6','#bdb6a6'],pants:['#3a3328','#16130e'],iris:'#2a1810',rim:'#ffcf8a',beard:true},
});
