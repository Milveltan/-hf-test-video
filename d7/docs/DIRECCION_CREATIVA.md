# DIRECCIÓN CREATIVA — DROGMAN 7.0
Narrativa visual y retención del espectador. **Consultar antes de planificar cualquier episodio.**
Es una capa de pensamiento previa a la programación: no cambia el motor, el workflow ni el formato (9:10, 1080 × 1200, 30 fps). Lo técnico vive en `CLAUDE.md`, `CATALOGO.md`, `CALIDAD.md`, `EFICIENCIA.md`; aquí no se repite.

## 0. Narración (guion de voz) — se escribe antes que todo
Duración objetivo ~60 s: **140–160 palabras**.
1. **Gancho hablado (< 3 s):** la primera frase plantea una pregunta, un reto o una afirmación inesperada. Nada de presentaciones ("Hoy te voy a contar…").
2. **Promesa (5–8 s):** queda claro qué va a descubrir el espectador si se queda.
3. **Progresión:** cada frase sube la tensión o revela algo nuevo; sin relleno. Incluye un giro en la mitad o el último tercio.
4. **Cierre obligatorio:** responde la pregunta del inicio y dice en palabras simples de qué trató el video. Prohibidos los finales abiertos o solo metafóricos que dejen dudas; una frase memorable se permite solo después de la explicación clara.
5. **Lenguaje cotidiano:** se investiga y verifica todo, pero **no se narran cifras, estudios, fuentes, fechas ni tecnicismos**, salvo que un dato sea en sí el gancho. Lo técnico se explica con comparaciones y situaciones reconocibles.
6. Comprobación antes de aprobar: ¿engancha la primera frase?, ¿hay promesa?, ¿cada frase aporta?, ¿el final deja claro de qué trató?, ¿suena a conversación y no a clase?

## 1. Filosofía audiovisual
Una escena no existe solo porque se vea bonita. Debe cumplir al menos una función narrativa: despertar curiosidad, explicar, demostrar, revelar, sorprender, generar emoción, establecer contexto o hacer avanzar la historia. La sofisticación visual sirve a la narración.

## 2. Conexión con el espectador
Cuando la temática lo permita, relaciona la narración con experiencias, objetos, emociones, situaciones o preguntas reconocibles. Incluso los temas extraordinarios, históricos, científicos o desconocidos se pueden explicar mediante comparaciones que faciliten su comprensión. No fuerces la conexión si perjudica la historia.

## 3. Gancho audiovisual
El primer fotograma se diseña estratégicamente. Prioriza: acciones visuales inmediatas, acontecimientos inesperados, transformaciones, contrastes sorprendentes, escalas extraordinarias, revelaciones parciales y situaciones que despierten curiosidad.
Evita: introducciones estáticas, presentaciones genéricas, movimientos lentos sin propósito y aperturas que necesiten varios segundos para resultar interesantes.
El gancho debe funcionar visualmente aunque el espectador aún no haya escuchado la narración.

## 4. No lo cuentes: enséñalo
Si la narración describe un proceso, mecanismo, acción, transformación o consecuencia, represéntalo visualmente. No basta mostrar un objeto con una explicación: diseña acciones que permitan comprender lo que ocurre.
Recursos, cuando corresponda: despieces, cortes transversales, anatomía interna, transformaciones de materiales, visualización de fuerzas, flujos de partículas, comparaciones de tamaño, cambios físicos, gráficos dinámicos, metáforas visuales y representaciones de procesos invisibles.
Rigor factual siempre en la investigación; la narración usa lenguaje cotidiano (ver §0).

## 5. Causa, mecanismo y consecuencia
Cuando sea narrativamente apropiado, estructura la secuencia como: acción inicial → mecanismo que la desencadena → transformación producida → consecuencia observable. El espectador debe entender la relación entre estos elementos solo con las animaciones. No impongas esta estructura a escenas con otra función narrativa.

## 6. Cambios de escala y perspectiva
Aprovecha la animación para revelar lo que una cámara convencional no mostraría. Explora: humano ↔ microscópico, exterior ↔ interior, general ↔ detalle, presente ↔ pasado, objeto completo ↔ componentes internos, perspectiva terrestre ↔ espacial. Cada cambio debe revelar información nueva o producir un efecto narrativo significativo.

## 7. Continuidad y transformación visual
No pienses el video como una colección de escenas independientes. Conecta secuencias mediante transformaciones de objetos, match cuts, desplazamientos de cámara, cambios de escala, revelación de nuevas capas, continuidad de movimiento y elementos que evolucionan de una escena a la siguiente.
Una escena puede contener varias acciones y revelaciones si mantiene el interés. No es obligatorio cortar cada vez que cambia una frase.

## 8. Jerarquía visual
Cada composición tiene un protagonista visual claramente identificable. Dirige la atención con tamaño, contraste, iluminación, profundidad, movimiento, color, enfoque selectivo y composición. Evita que varios elementos compitan sin necesidad. Diseña para teléfono móvil.

## 9. Sincronización semántica
Sincroniza las acciones importantes con el significado de la narración: si la voz menciona una caída, una reacción, una transformación, una cifra o una revelación, la acción visual ocurre en el momento narrativo adecuado (anclada a palabras con `lw(i)`, nunca a segundos). Los efectos de sonido refuerzan estas acciones sin competir con la voz.
Sincronizar no es cambiar elementos visuales compulsivamente en cada palabra.

## 10. Revelación progresiva y retención
Diseña una progresión que mantenga la curiosidad: cada bloque narrativo aporta una nueva acción, descubrimiento, perspectiva, contraste, consecuencia o información relevante.
Evita: repeticiones sin propósito, escenas estáticas demasiado tiempo, animaciones decorativas innecesarias, zoom como único recurso de movimiento, transiciones arbitrarias y composiciones genéricas.
Retención no es saturación visual ni velocidad excesiva.

## 11. Planificación estratégica de escenas
Antes de programar cada escena o bloque, decide internamente (breve y eficiente):
1. Qué debe comprender o sentir el espectador.
2. Cuál es el protagonista visual.
3. Qué acción sucede.
4. Qué información se revela o qué elemento se transforma.
5. Cómo se usan cámara y composición.
6. Cómo se relaciona con la narración.
7. Cómo se conecta con la siguiente escena.

Sin informes extensos ni tablas innecesarias para el usuario. El mapa de escenas existente (`Episode.tsx`) es la herramienta técnica donde se aplican estas decisiones.

## 12. Reutilización creativa y eficiencia
Reutilizar componentes no significa repetir videos. Un mismo personaje, objeto, escenario o sistema de animación puede cumplir funciones narrativas distintas mediante cambios de escala, perspectiva, comportamiento, iluminación, composición y contexto. Esto mejora la continuidad visual y reduce el consumo de tokens.
Orden de trabajo: primero la mejor solución narrativa; después, cómo construirla eficientemente con la biblioteca existente (`CATALOGO.md`, `EFICIENCIA.md`). No se sacrifica creatividad ni calidad audiovisual por ahorrar recursos.

## 13. Control de calidad creativo
Se suma a la revisión artística de `CALIDAD.md` §3 (que ya cubre protagonista, luz, movimiento, transiciones y legibilidad); no es un proceso aparte. Comprobación breve antes de entregar:
- ¿La narración cumple §0 (gancho hablado, promesa, progresión, cierre claro, sin datos técnicos)?
- ¿El primer segundo genera curiosidad visual?
- ¿Cada bloque cumple una función narrativa?
- ¿Las animaciones muestran acciones y consecuencias?
- ¿La información visual es comprensible?
- ¿Hay variedad de composiciones y movimientos?
- ¿Las escenas evolucionan?
- ¿La atención está bien dirigida?
- ¿Hay elementos innecesarios o repetitivos?
- ¿La dirección artística corresponde a la temática?
- ¿El resultado mantiene o supera el estándar visual de DROGMAN?

## 14. Libertad artística
Estos principios no son una plantilla estética. No obligan a usar colores, interfaces, contadores, personajes, transiciones, efectos, composiciones ni cantidad de escenas determinados. Aplican a cualquier temática: ciencia, anatomía, tecnología, animales, naturaleza, historia, universo, psicología, misterios y biografías.
Tienen prioridad la creatividad, la originalidad, la claridad narrativa y la capacidad de sorprender.

**Objetivo:** que DROGMAN no solo produzca animaciones profesionales, sino experiencias visuales inteligentes, originales, comprensibles y capaces de mantener la curiosidad del espectador.
