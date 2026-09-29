# BETTA — Diorama Vivo

## Documento maestro de diseño
### Sistema distribuido · Instalación de galería · Data art con sedimento vivo

**Versión:** 1.0 — aterrizado conceptualmente
**Estado:** Listo para desarrollo
**Rol del autor:** Curador
**Fecha de cierre conceptual:** [insertar fecha]

---

## ÍNDICE

1. Resumen ejecutivo
2. Manifiesto conceptual
3. Arquitectura general
4. Los roles
5. Los cinco estados del bioma
6. El sedimento
7. Los dos gestos
8. Los tres elementos de lectura
9. La red y el silencio
10. La galería
11. El link y la puerta de entrada
12. Herencia y adopción
13. El rescate colectivo
14. Sistema técnico
15. El diorama actual
16. Roadmap por fases
17. Escenarios de prueba
18. Guía del curador
19. Consideraciones éticas
20. Glosario
21. Anexos

---

## 1. RESUMEN EJECUTIVO

### 1.1 Qué es

Una pieza de data art en forma de diorama de pez Betta que vive en una tableta expuesta en una galería, y que al mismo tiempo se distribuye entre diez dispositivos personales que comparten un mismo bioma. Lo que el visitante ve en la galería no es un video ni una animación pregrabada. Es una ventana a un ecosistema que está vivo en otro lugar, en manos de diez desconocidos que aceptaron cuidarlo sin firmar nada.

### 1.2 La idea central

**El bioma sin humano dura mucho. El humano es la alteración.**

Esta inversión es el corazón conceptual de la obra. Todo lo demás es consecuencia. La pieza engaña por bonita y por dentro es un registro de cuidado, abandono y pérdida. No hay números, no hay gráficos, no hay dashboards. Toda la información es materia del mundo: agua, sedimento, cuerpo, luz, tiempo.

### 1.3 Las tres capas

- **Capa individual** — Cada usuario tiene su bioma en su teléfono. Su pez. Su sedimento. Su historia.
- **Capa colectiva** — Los diez biomas comparten un agua común que se calcula, no se guarda. Las decisiones de uno afectan a los otros nueve.
- **Capa galería** — La tableta en la galería es el ojo que ve todos los biomas. Los muestra rotando. Los visitantes solo miran.

### 1.4 Lo que la obra produce

Un usuario nuevo entra y ve un acuario bonito. Con los días nota que el agua cambia. Con las semanas nota que el fondo tiene capas. Con los meses entiende que él es la causa del desgaste. Y que el mejor usuario es el que no toca.

La pieza no dice nada de esto. El usuario **llega** a estas conclusiones por su cuenta.

### 1.5 Lo que ya existe

Un diorama funcional de 5 planos con pez Betta, física de aletas, ciclo de vida, micrófono reactivo, artemia, nidos, variantes genéticas y comportamiento por estados. Todo esto queda intacto. Lo nuevo se monta encima.

### 1.6 Lo que falta

Una capa de persistencia (Firebase) que haga que el bioma viva entre sesiones. Un sistema de 10 biomas paralelos con agua común. Una vista de galería. Un sistema de herencia y adopción. Un sistema de rescate colectivo. Un sedimento que se acumule día a día con marcas legibles.

---

## 2. MANIFIESTO CONCEPTUAL

### 2.1 La ley invertida

El pensamiento convencional dice: el usuario cuida el bioma, el bioma se degrada cuando el usuario se va.

Esta pieza dice lo contrario.

**El bioma sin humano dura mucho.** Encuentra su equilibrio. Es estable. Es lento. Es sano. En la naturaleza, un ecosistema sin intervención encuentra su ritmo solo. Tarda. Pero no muere.

**El humano es la alteración.** Cada gesto desestabiliza. Cada decisión es una grieta en el ciclo natural. Cada pellet es un desequilibrio. El usuario cree que ayuda. Pero el usuario es la alteración.

**El mejor usuario es el que está pero no toca.** El peor es el que toca mucho. El que se va, en cambio, deja al bioma autorregularse. Pero el que se va también genera una pérdida: el pez se encariñó y ahora nadie lo cuida.

Esta inversión es el corazón de la obra. Todo lo demás deriva de ella.

### 2.2 La belleza como disfraz

La pieza nunca dice la verdad. La pieza **es** la verdad, disfrazada de paisaje. Nadie que pase por ahí verá "datos". Verá agua ámbar, plantas vivas, un pez iridiscente. Lo que no verá es que todo eso son síntomas.

La crueldad no está en lo que se muestra. Está en lo que no se dice sobre lo que se muestra.

### 2.3 Las cinco inversiones estéticas

Cinco elementos que se ven preciosos pero que significan lo contrario. El usuario los lee mal al principio. Los lee bien al final. Y ese cambio de lectura es el arco emocional de la pieza.

**El agua ámbar.**
Se ve preciosa. Té oscuro, luz dorada atravesándola, sedimento suspendido en suspensión dorada. Pero el ámbar es taninos. Los taninos significan que no hay cambio de agua. Que el agua lleva mucho tiempo sin oxigenarse. Que el pez está respirando su propio desecho. Cuanto más bonito el color, más tiempo lleva el usuario sin hacer nada.

**El cuerpo iridiscente.**
El pez está radiante. Azul-verdoso con destellos de cobre. Escamas que cambian según el ángulo. Pero la iridiscencia se intensifica con el estrés. Un pez tranquilo es más apagado, más sobrio. Un pez que lleva días sin oxígeno, sin comida estable, con luz intermitente, brilla más. El pez más bello es el pez más cerca de morir.

**Las plantas exuberantes.**
El tanque está lleno de vida. Verde profundo, hojas grandes, musgo por todos lados. Pero las plantas crecen con nitrógeno. Y el nitrógeno viene de los desechos del pez. Cuanta más planta, más excremento acumulado. Cuanta más vegetación, más cerca está el agua de ser tóxica. El tanque más verde es el tanque más enfermo.

**La cría translúcida.**
El pez bebé es precioso. Translúcido, brillante, casi etéreo. Se ven sus órganos a través de la piel. Pero la translucidez es señal de desnutrición. Una cría sana sería opaca a esta edad. La que ves clara es la que no ha comido. La cría que el usuario rescató y ama es la que está sufriendo.

**El nido intacto.**
Las burbujas del nido son perfectas. Esféricas, ordenadas, brillando a la luz. El macho lo construyó con cuidado. Pero si pasan los días y las burbujas siguen ahí, sin eclosionar, es que los huevos ya están muertos. El macho no lo sabe. Sigue cuidando un nido vacío. El nido más bello es el nido más triste.

### 2.4 El rol del usuario

El usuario no es un jugador. No es un observador pasivo. Es un **agente biológico**. Su presencia modifica el bioma. Sus gestos lo modifican. Sus ausencias lo modifican. Y su huella queda en el sedimento, legible, para siempre.

### 2.5 El rol de la data

La data no se muestra. La data se convierte en materia. Un evento no se cuenta. Deja ver. Una comida no es "+1". Es un destello dorado que dura 2 segundos y se disipa. La población no se reporta. El tanque está más o menos plantado según cuántos peces respiran en él.

La data se lee con el cuerpo, no con la vista. El usuario no sabe que la población subió. Siente que el agua está más viva. La información entra por ritmo, color, densidad.

### 2.6 El tiempo como material

La pieza no se puede consumir rápido. Tiene cinco velocidades distintas:

- Cambios que se notan en **segundos** — sonido, luz, movimiento.
- Cambios que se notan en **horas** — el agua se tiñe, las plantas crecen, el pez come.
- Cambios que se notan en **días** — una decisión, un nacimiento, una muerte.
- Cambios que se notan en **semanas** — el carácter del tanque, el sedimento del fondo.
- Cambios que se notan en **meses** — la historia completa.

Si alguien pasa y mira diez minutos, ve un acuario bonito. Si vuelve al día siguiente, ya hay algo distinto. Si vuelve en un mes, el tanque le cuenta una historia que no puede reconstruir del todo, pero siente que estuvo ahí.

### 2.7 El ciclo no cierra

La pieza puede morir. Puede revivir. Puede morir de nuevo. El ciclo no cierra. Solo se acumula. Cada resurrección deja más marcas. Cada abandono deja más peso. La obra no termina porque no puede terminar.

---

## 3. ARQUITECTURA GENERAL

### 3.1 Componentes del sistema
┌─────────────────────────────────────────────────────────────┐
│ GALERÍA (física) │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ TABLETA EXPUESTA │ │
│ │ - Vista rotativa de 10 biomas │ │
│ │ - Mapa de 10 puntos (vivos / agonizando / muertos) │ │
│ │ - No interactiva para el visitante │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
▲
│ (lee Firestore)
▼
┌─────────────────────────────────────────────────────────────┐
│ FIREBASE FIRESTORE │
│ - /biomes/{id} (10 documentos) │
│ - /biomes/{id}/users/{u} (dueños + espectadores) │
│ - /global (estado agregado) │
│ - /sediment/{date} (capas del sedimento común) │
└─────────────────────────────────────────────────────────────┘
▲
│ (escribe / lee)
┌───────────────┴───────────────┐
▼ ▼
┌─────────────────────────┐ ┌─────────────────────────────┐
│ 10 DISPOSITIVOS │ │ ESPECTADORES (∞) │
│ DE DUEÑOS │ │ - Leen los 10 biomas │
│ - Bioma propio │ │ - No escriben │
│ - Escritura parcial │ │ - Su presencia cuenta │
│ - Pantalla de bloqueo │ │ - Pueden tomar bioma libre │
└─────────────────────────┘ └─────────────────────────────┘

text

### 3.2 Flujo de datos

**Del dispositivo del dueño a Firestore:**
- Cada 5 minutos: `lastSeen` timestamp.
- En cada gesto significativo: actualización de `nutrients` o `oxygen`.
- Cada día (al cambio de fecha local): agregar una capa al sedimento.

**De Firestore al dispositivo del dueño:**
- Cada 30 segundos: lectura de agua común (todos los biomas).
- Cada 5 minutos: lectura del estado de los otros 9 biomas.
- En eventos: cuando otro bioma entra en estado crítico.

**De Firestore a la galería:**
- Cada 15 segundos: lectura del estado agregado de los 10 biomas.
- En eventos: cuando un bioma muere o revive.

### 3.3 Lo que vive dónde

**Vive en el dispositivo:**
- Toda la animación del pez, las aletas, la física.
- Todo el diorama de fondo (tronco, plantas, sustrato).
- El sedimento propio (capas, marcas).
- El pez propio.
- Los pellets.
- Las burbujas.

**Vive en Firestore:**
- Solo las constantes vitales del bioma.
- Seis números por bioma.
- Un registro agregado de marcas por día.
- El estado global (vivo / agonizando / muerto / rescatado).

**No vive en ningún lado (se calcula):**
- El agua común (promedio ponderado de los 10 biomas).
- El sedimento común del día (media del día de todos).
- El nivel global de atención (contador efímero).

### 3.4 Sincronización y conflictos

**Regla de oro:** el dispositivo siempre manda sobre lo local. La red nunca corrige el estado del pez. La red solo aporta las constantes que modulan el agua común y el sedimento común.

**Si el dispositivo está offline:**
- El bioma sigue funcionando con la última lectura de red.
- Los gestos locales se acumulan en una cola local.
- Al reconectar, se sincronizan en orden.
- No hay pérdida.

**Si dos dispositivos escriben a la vez:**
- Firestore usa last-write-wins para las constantes.
- Pero las capas del sedimento se agregan, no se sobrescriben.
- Cada dispositivo aporta su parte al día común.

---

## 4. LOS ROLES

### 4.1 Curador

**Quién es:** quien instala la tableta.

**Qué hace:**
- Elige el lugar donde va la tableta.
- Elige la orientación de la pantalla.
- Elige el brillo.
- Conecta la tableta a la red.
- Publica el link en GitHub.
- Distribuye los 10 biomas iniciales (según el modo elegido, ver sección 4.5).

**Qué NO hace:**
- No tiene bioma propio.
- No interactúa con el sistema después de instalarlo.
- No aparece en la obra.

**Su rol es silencioso y total.** Sin él, la obra no tiene lugar. Pero su presencia no se siente.

### 4.2 Dueño

**Quién es:** uno de los primeros diez que entran al link y toman un bioma.

**Qué recibe:**
- Un bioma propio en su teléfono.
- Un pez.
- Un fondo de agua.
- Un ciclo de vida.

**Qué acepta (sin firmar):**
- Que el bioma reemplaza un pedazo de su vida. Está en su pantalla de bloqueo.
- Que el bioma no se puede cerrar. Se puede dejar de mirar. Pero sigue vivo sin él.
- Que el bioma acumula su huella. Cada día que no lo abre queda registrado.
- Que el bioma comparte agua con los otros nueve. Sus decisiones afectan a otros.
- Que el bioma mata si lo abandona. Y cuando muere, no vuelve solo.

**Qué pasa si abandona:**
- Después de X días sin abrir (ver 4.5), su bioma queda libre.
- El pez entra en estado adoptable.
- Un nuevo usuario puede heredarlo.
- El que abandonó no puede huir: el bioma sigue vivo, sigue visible, y algún día va a ver el resultado.

### 4.3 Espectador

**Quién es:** todos los demás. Los que abren el link sin ser dueños. Los que pasan por la galería.

**Qué puede hacer:**
- Ver los 10 biomas.
- Ver el agua de cada uno.
- Ver si están sanos o muriendo.
- Ver las bandas negras del fondo.
- Ver los peces nadando o quietos.
- Elegir cuál mirar.
- Ver la evolución de cada uno a lo largo del tiempo.
- Si hay biomas libres, tomar uno (y convertirse en dueño).

**Qué NO puede hacer:**
- Sus gestos no dejan marca.
- Si limpian con el dedo, el fondo vuelve a estar como estaba.
- Si tratan de alimentar, el pez no come.
- El sistema ignora sus intervenciones.
- No hay mensaje de error. Simplemente nada pasa.

**Qué sí hace:**
- Su presencia cuenta para el bioma.
- Los dueños no saben cuántos espectadores hay.
- Pero el bioma sí. Y a veces el bioma cambia porque hay más gente mirando.
- Más luz. Más silencio. Más atención.

**La crueldad del espectador:** es el rol más honesto y el más frustrante. Ve el problema y no puede resolverlo. Está ahí. Es testigo.

### 4.4 Heredero

**Quién es:** un usuario que toma un bioma liberado.

**Qué recibe:**
- No empieza de cero.
- Hereda la historia del dueño anterior.
- Las bandas negras del fondo.
- Las marcas del sedimento.
- Un pez ya encariñado con otra mano.
- Un código (ej. `#A7K-2`) — la única forma de identidad visible en toda la pieza.

**Qué significa el código:**
- Es la huella del dueño anterior.
- No es un nombre. No es una persona.
- Es la marca de que alguien lo cuidó antes.
- El nuevo usuario lo ve al tocar el pez.
- También ve la fecha de transferencia.
- También ve su estado emocional actual — el pez tarda días en adaptarse.
- Nada de esto se dice con texto. El pez se ve distinto. Más quieto. Más cerca del fondo. Hasta que un día acepta la nueva mano.

**Un pez con dos dueños tiene dos historias superpuestas en su sedimento.**

### 4.5 Modos de distribución de los 10 biomas

Decisión pendiente del curador. Tres opciones:

**Modo A — Lanzamiento simultáneo.**
Los 10 biomas se abren el mismo día. Los 10 dueños entran al mismo tiempo. La galería abre con los 10 puntos vivos. Es dramático. La obra nace completa.

**Modo B — Goteo semanal.**
Un bioma por semana. Los primeros 10 se van sumando durante 10 semanas. La galería ve los puntos ir apareciendo uno a uno. Es un ritual. La obra se construye con el tiempo.

**Modo C — Asignación curada.**
Los 10 biomas se asignan a mano. Amigos. Colegas. Personas elegidas. La pieza es cuidada en su distribución. Es política. La obra tiene dueños desde el día uno.

**Recomendación:** modo B. El goteo permite que la obra se despliegue, que la galería tenga una razón para volver, y que los primeros dueños sientan que están construyendo algo con los que llegan después.

---

## 5. LOS CINCO ESTADOS DEL BIOMA

### 5.1 Vivo sin humano

**Descripción visual:**
Agua clara y transparente. Luz suave que atraviesa el tanque. Plantas estables, sin movimiento brusco. Pez tranquilo, nadando lento. Sedimento casi imperceptible. Motas flotando lentamente.

**Comportamiento del pez:**
- `waveAmp` bajo (0.02–0.05).
- `waveFreq` bajo (0.3–0.5).
- Nada cerca del fondo.
- Casi no hay display ni burst.

**Duración natural:**
Indefinida. Es el estado más estable. Si nadie interviene, el bioma puede durar semanas o meses así.

**Cómo se ve el sedimento:**
Capas finas, claras, marrón suave. Uniformes. Sin marcas.

**Crueldad de este estado:**
Es aburrido. Hermoso, pero aburrido. El usuario que quiere ver acción, quiere ver cambio, va a intervenir. Y al intervenir, lo va a matar de a poco.

### 5.2 Vivo con humano

**Descripción visual:**
Agua más viva. Movimiento constante. El pez reacciona a todo. Más brillo. Más actividad. Sedimento acumulándose.

**Comportamiento del pez:**
- `waveAmp` medio (0.10–0.18).
- `waveFreq` medio (0.8–1.2).
- Reacciona al micrófono.
- Hace display y burst.
- Nada por todo el tanque.

**Duración natural:**
Días. Semanas si la intervención es moderada. Menos si es intensa.

**Cómo se ve el sedimento:**
Capas más gruesas, más oscuras. Con marcas. Con hojas, burbujas, partículas, grietas.

**Crueldad de este estado:**
Es el estado que el usuario cree que quiere. Es el que más rápido desgasta. Cada gesto deja huella. Cada decisión es irreversible.

### 5.3 Agonizando

**Descripción visual:**
El agua se tiñe de ámbar. Las plantas se debilitan, pierden color, algunas caen. El pez nada más lento, cerca del fondo. Las aletas están pegadas. El sedimento muestra bandas oscuras y claras alternadas.

**Comportamiento del pez:**
- `waveAmp` bajo (0.01–0.03).
- `waveFreq` bajo (0.2–0.4).
- Nada cerca del fondo.
- Casi no come.
- Se queda quieto mucho tiempo.

**Duración natural:**
Días. Una a dos semanas. El usuario que vuelve lo ve y no entiende qué pasó.

**Cómo se ve el sedimento:**
Bandas oscuras y claras alternadas. Las oscuras son los días malos. Las claras son los días en que hubo algún alivio.

**Crueldad de este estado:**
Es el estado intermedio. No es suficientemente dramático para movilizar. No es suficientemente calmado para ser tranquilo. Es el peor lugar para quedarse.

### 5.4 Muerto

**Descripción visual:**
Agua negra. No oscura. Negra. Sin transparencia. Sin luz que la atraviese. Plantas desintegradas. Sedimento comprimido en una sola banda densa. Pez quieto en el centro. La tableta sigue encendida.

**Comportamiento del pez:**
- No se mueve.
- No come.
- No responde al micrófono.
- Es solo silueta.

**Duración natural:**
Indefinida. Hasta que alguien lo rescate.

**Cómo se ve el sedimento:**
Una sola capa densa. Negra. Opaca. Sin marcas visibles. La información está comprimida.

**Crueldad de este estado:**
La tableta sigue encendida. El silencio es total. La pieza espera. No se apaga. No vuelve a empezar. Espera.

### 5.5 Rescatado

**Descripción visual:**
El agua revive. Pero no vuelve a ser la original. Lleva las marcas del ciclo anterior. El sedimento mantiene la banda negra del período muerto. El pez nuevo tiene huellas del rescate. La vida vuelve, distinta.

**Comportamiento del pez:**
- Similar a `vivo con humano` al principio.
- Con el tiempo, se estabiliza en un punto intermedio.
- Más silencioso que un pez que nunca murió.

**Cómo se ve el sedimento:**
Tiene la banda negra del período muerto, y encima, capas nuevas. La banda negra nunca se borra.

**Crueldad de este estado:**
Cada resurrección vuelve al bioma más dependiente de las manos. Ya no sabe vivir solo. Necesita que alguien lo toque cada tanto para no morir.

---

## 6. EL SEDIMENTO

### 6.1 Principio

El fondo del tanque no decora. Registra. Cada día deja una capa. Cada capa tiene un grosor. Cada capa tiene un color. Algunas capas tienen marcas.

### 6.2 Cómo se forma una capa

Cada vez que el dispositivo completa un ciclo de amanecer a amanecer (basado en la hora local del usuario), una capa de materia cae al fondo.

**Lo que determina el grosor de la capa:**
- Sonido detectado en el cuarto durante el día (promedio).
- Cantidad de gestos del usuario (toques + arrastres).
- Estado del bioma al final del día.
- Cantidad de peces vivos.

**Lo que determina el color de la capa:**
- Cantidad de luz ambiental (cámara).
- Nivel de oxígeno del bioma.
- Nivel de nutrientes.

**Lo que determina las marcas:**
- Si el usuario hizo un gesto significativo: `hoja caída`.
- Si hubo nido y eclosionó: `burbuja atrapada` (translúcida).
- Si hubo nido y no eclosionó: `burbuja atrapada` (opaca).
- Si hubo comida: `partícula dorada`.
- Si hubo sobresalto (golpe, grito): `grieta`.

### 6.3 Las cuatro marcas posibles

Solo hay cuatro cosas que pueden quedar atrapadas en una capa:

**Hoja caída**
- Significa: el usuario hizo un gesto significativo ese día.
- Frecuencia: raro. Un mes entero puede no tener ninguna.
- Cómo se ve: una hoja pequeña, marrón, atrapada entre dos capas. Nunca se mueve.
- Lectura del usuario: "ah, ese día hice algo importante".
- Crueldad: es la marca que el usuario más va a buscar. Y la que más pesa cuando la encuentra sola.

**Burbuja atrapada**
- Significa: hubo nido ese día.
- Variantes:
  - Traslúcida: el nido eclosionó. Nació una cría.
  - Opaca: el nido no eclosionó. Los huevos murieron.
- Cómo se ve: una burbuja esférica, blanca o gris según el caso.
- Lectura del usuario: "ahí hubo un nido".
- Crueldad: la burbuja opaca es la más triste. El usuario vio un día bonito, pero el nido no prosperó. Y ahora lo sabe.

**Partícula dorada**
- Significa: hubo comida ese día.
- Cómo se ve: un grano dorado, opaco, atrapado entre capas.
- Frecuencia: relativamente común en biomas vivos.
- Lectura del usuario: "ahí comió".
- Crueldad: las partículas doradas se acumulan. Si hay muchas, el bioma está sobrealimentado. El usuario lo ve y no entiende por qué el agua está tan ámbar.

**Grieta**
- Significa: hubo un sobresalto ese día.
- Cómo se ve: una ruptura en la capa, superpuesta con la siguiente. Como una cicatriz.
- Frecuencia: ligada al sonido fuerte en el cuarto.
- Lectura del usuario: "ahí algo pasó".
- Crueldad: las grietas se multiplican si el usuario vive en un ambiente ruidoso. Un bioma con muchas grietas es un bioma estresado. El usuario lo ve y no sabe por qué.

### 6.4 Dos sedimentos superpuestos

Cada ventana tiene **dos fondos**:

**Fondo propio**
- Cae cada día que tu ventana está viva.
- Es tu biografía.
- Tiene marcas que solo tú puedes leer.
- Es tu historia.

**Fondo común**
- Cae más despacio, más profundo.
- Lo forman todos los días de todas las ventanas.
- Tiene un tono que no controla nadie.
- Se vuelve más ámbar cuando el conjunto sufre.
- Se vuelve más claro cuando el conjunto descansa.
- Es el fondo del mundo.

Ambos se ven en pantalla, superpuestos. Uno encima del otro. El de arriba cambia a diario. El de abajo tarda semanas en moverse. No se pueden separar. Cuando el usuario mira el fondo, ve las dos historias superpuestas. La suya y la de los demás. Sin saber dónde empieza una y dónde termina la otra.

### 6.5 Cómo se lee el fondo

El usuario no aprende a leer el fondo al primer día. Ni a la primera semana. Un día cualquiera, mirando el tanque sin motivo, **nota** que el fondo tiene estratos. No los llama así. Pero ve zonas más claras y más oscuras, apiladas. Como una torta de tierra.

Entonces hace lo que haría cualquiera: mira más de cerca.

Y ahí descubre tres cosas:

**1. Las capas no son iguales de grosor.** Hay días que pesaron más que otros.

**2. Algunas capas tienen marcas.** No son idénticas. Hay una hoja enterrada a mitad de la capa 12. Hay una burbuja que quedó atrapada entre la capa 7 y la 8.

**3. Hay un período oscuro.** Una franja de capas, todas juntas, muy gruesas y muy oscuras. Corresponde a un tramo en el que el usuario no vino. Fueron días silenciosos, luz baja, el tanque solo. El sedimento de esos días es más denso.

Y sin saber por qué, el usuario cuenta las capas desde ahí. Y se da cuenta: "han pasado 23 días desde que dejé de venir".

Ese es el momento. No hay confesión. Hay conteo.

### 6.6 La marca indeleble

Cuando algo se pierde — un pez, un bioma, un ciclo — la marca queda.

- Un pez que muere no desaparece del bioma. Su cuerpo se hunde. Se descompone. Se convierte en sedimento. Y ese sedimento tiene un color distinto. No es solo materia. Es duelo.
- Un bioma que muere deja una banda negra que nunca se borra. Aunque el bioma sea rescatado, aunque vuelva la vida, en el fondo hay una línea oscura. Se puede ver. Se puede contar.
- Un ciclo que se repite (vive, muere, resucita) deja estratos alternados. Con el tiempo, el fondo tiene una estructura compleja. Un observador atento puede leer ahí cuántas veces el bioma ha muerto.

Esas marcas no se limpian con el gesto de rescate. El gesto quita la materia nueva. Las bandas antiguas quedan soldadas al fondo. Son el registro mineral del bioma.

### 6.7 Acumulación máxima

Con el tiempo, el sedimento podría crecer indefinidamente. Para evitar que el fondo se vuelva ilegible, hay un límite:

**Cuando el sedimento supera las 200 capas, las más antiguas se comprimen visualmente.** No se borran. Se apilan en un estrato denso y oscuro. Se puede seguir viendo que están. Pero no se pueden contar una por una.

La marca más profunda del sedimento es la primera capa. Nunca se comprime. Siempre se ve. Es el origen.

---

## 7. LOS DOS GESTOS

La pieza tiene solo dos gestos. No hay menús. No hay botones. No hay texto. Todo lo que se puede hacer, se hace con estos dos gestos.

### 7.1 Tocar

**Qué significa:** presencia. "Estoy aquí".

**Duración:** menos de 200 ms.

**Usos posibles:**

**Encender una luciérnaga.**
- Cuándo: cuando el bioma está oscuro y hay un punto tenue latiendo.
- Qué pasa: aparece una luciérnaga que vive una hora.
- Consecuencia: la capa de ese día tiene más luz.

**Aceptar un huevo en el nido.**
- Cuándo: cuando hay un huevo en el nido y el macho espera.
- Qué pasa: el huevo se fija al nido.
- Consecuencia: nace una cría en 5 días.

**Despertar al pez que duerme.**
- Cuándo: cuando el pez está quieto en el fondo y hay luz.
- Qué pasa: el pez se activa. Nada por unos minutos.
- Consecuencia: si se toca mucho, el pez se estresa.

**Liberar la planta medicinal.**
- Cuándo: cuando un pez está enfermo y brotó una planta nueva del sustrato.
- Qué pasa: la planta se libera, se puede arrastrar.
- Consecuencia: depende de la siguiente decisión.

**Leer la piedra.**
- Cuándo: siempre.
- Qué pasa: la piedra revela el estado del bioma común.
- Consecuencia: ninguna. Es solo lectura.

**Leer la hoja.**
- Cuándo: siempre.
- Qué pasa: la hoja muestra tus capas de sedimento.
- Consecuencia: ninguna. Es solo lectura.

**Leer el caracol.**
- Cuándo: siempre.
- Qué pasa: el caracol revela qué está pasando ahora.
- Consecuencia: ninguna. Es solo lectura.

**Espantar algo que no debería estar.**
- Cuándo: cuando aparece un intruso (caracol no deseado, alga nueva).
- Qué pasa: el intruso desaparece.
- Consecuencia: la capa de ese día no tiene la marca del intruso.

### 7.2 Arrastrar

**Qué significa:** voluntad. "Quiero esto".

**Duración:** más de 500 ms. Traza una trayectoria.

**Usos posibles:**

**Devolver un huevo al nido.**
- Cuándo: cuando un huevo cayó del nido al fondo.
- Qué pasa: el huevo vuelve al nido.
- Consecuencia: nace una cría en 5 días.
- Crueldad: si no se hace nada, en 2 horas el huevo se disuelve. El nido queda intacto pero estéril.

**Llevar la planta medicinal al pez enfermo.**
- Cuándo: cuando un pez está enfermo y hay una planta medicinal disponible.
- Qué pasa: el pez se cura.
- Consecuencia: el agua se contamina. Las plantas del tanque se oscurecen por semanas.
- Crueldad: si no se hace nada, el pez muere. Pero de su cuerpo brota una nueva planta que alimenta el ecosistema. El agua queda más limpia, más madura.

**Mover el espejo frente a un pez.**
- Cuándo: cuando aparece una superficie reflectante en el fondo.
- Qué pasa: el pez se ve a sí mismo. Dispara un display completo.
- Consecuencia: el pez se agota. Pero su cuerpo se vuelve más colorido por días.
- Crueldad: el espejo se puede repetir. Y el pez se agota cada vez más. Su cuerpo se vuelve más colorido y más frágil.

**Trazar una corriente para orientar al pez.**
- Cuándo: siempre.
- Qué pasa: el pez nada contra la corriente.
- Consecuencia: el pez se orienta. Pero se cansa más rápido. Necesita comer más.

**Limpiar el sedimento (rescate).**
- Cuándo: cuando el bioma está muerto y hay una limpieza colectiva en curso.
- Qué pasa: quita el sedimento nuevo. Las bandas antiguas quedan.
- Consecuencia: revive el bioma si hay suficientes manos.

**Retirar un cuerpo del fondo.**
- Cuándo: cuando un pez murió y su cuerpo está en el fondo.
- Qué pasa: el cuerpo se retira.
- Consecuencia: el agua queda más limpia. Pero la marca del pez no se disuelve. La capa de ese día tiene un tono distinto.

### 7.3 La regla de irreversibilidad

Ambos gestos son **irreversibles** en el momento. No hay undo. No hay "espera, mejor no". El gesto se hizo. El tanque lo absorbió. Y la consecuencia queda en el sedimento.

Esto es fundamental. La pieza no perdona. La pieza no permite arrepentirse. La pieza solo permite **seguir**.

---

## 8. LOS TRES ELEMENTOS DE LECTURA

Hay tres elementos en la escena que, al tocarlos con dos dedos, abren una lectura del bioma. No una pantalla. Una **lectura**. Dura unos segundos. Se cierra sola.

### 8.1 La piedra — el estado del bioma común

**Ubicación:** en el fondo del tanque, entre las plantas. Siempre presente. Nunca se mueve.

**Cómo cambia:**
- Piedra clara, casi blanca → bioma común sano.
- Piedra con vetas oscuras → bioma común sufriendo.
- Piedra negra → bioma común muerto.
- Piedra con una grieta luminosa → alguien rescató el bioma común, está volviendo.

**Cómo se activa:** tocar la piedra con dos dedos.

**Qué pasa cuando se activa:**
- La piedra brilla tenuemente por 3 segundos.
- El brillo tiene el color del bioma común.
- Se apaga sola.
- Nada más.

**Lo que NO hace:**
- No muestra números.
- No muestra texto.
- No muestra los otros biomas.
- No muestra cuántos biomas están sanos y cuántos muertos.
- Solo muestra **un color**.

**Crueldad:** el usuario que toca la piedra todos los días ve cómo el color se va apagando. Sin saber por qué. Sin poder hacer nada. Porque el color es de todos.

### 8.2 La hoja — tu historia dentro del bioma

**Ubicación:** en el fondo del tanque, cerca del tronco. Una hoja grande, seca, siempre en el mismo lugar.

**Cómo cambia:**
- La hoja muestra las capas de tu sedimento propio, apiladas.
- Al lado, muy tenue, una capa gris que no es tuya. Es la capa común.

**Cómo se activa:** tocar la hoja con dos dedos.

**Qué pasa cuando se activa:**
- La hoja se abre. Como un libro.
- Se ven tus capas apiladas.
- Se ve la capa común al lado.
- Se ve la diferencia de grosor.
- Se ve la diferencia de color.
- Dura 5 segundos. Se cierra sola.

**Lo que NO hace:**
- No muestra fechas.
- No muestra cantidades.
- No muestra marcas específicas.
- Solo muestra **la forma** de tu historia.

**Crueldad:** el usuario que mira la hoja ve su historia y la del conjunto. Una al lado de la otra. Y no puede evitar comparar.

### 8.3 El caracol — qué está pasando ahora

**Ubicación:** en algún lugar del tanque. Cerca del fondo. Se mueve lentamente.

**Cómo cambia:**
- Caracol quieto → nadie está haciendo nada en ninguna ventana.
- Caracol moviéndose rápido → alguien está tocando su ventana ahora.
- Caracol desaparecido → el bioma común está muriendo.
- Caracol brillante → alguien acaba de rescatar algo.

**Cómo se activa:** tocar el caracol con dos dedos.

**Qué pasa cuando se activa:**
- El caracol se detiene.
- Un pequeño pulso de color sale de él.
- El pulso tiene el color del estado actual.
- Dura 2 segundos. Se apaga solo.
- El caracol sigue su camino.

**Lo que NO hace:**
- No dice quién.
- No dice dónde.
- No dice cuántos.
- Solo dice **que sí**.

**Crueldad:** el usuario que toca el caracol sabe que hay alguien, en algún lugar, haciendo algo. Pero no puede saber quién. Ni dónde. Ni qué. Solo que **no está solo**.

---

## 9. LA RED Y EL SILENCIO

### 9.1 El silencio como principio

El usuario **nunca sabe si hay otros** mirando al mismo tiempo. No hay indicador. No hay "N usuarios conectados". No hay nada.

Pero hay señales que se filtran.

### 9.2 Las señales

**Oleaje pequeño en el agua que no viene de tu pez.**
- Ocurre cuando alguien, en otro lugar del mundo, acaba de hacer un gesto.
- No se explica. No se repite. Simplemente pasa.
- El usuario lo nota o no lo nota. No hay forma de buscarlo.

**El sedimento común baja un poco más rápido de lo normal.**
- Ocurre cuando hay actividad en otras ventanas.
- Se ve al mirar la hoja.
- No hay mensaje. Solo el resultado.

**El agua aclara de golpe sin que hayas hecho nada.**
- Ocurre cuando alguien limpió su ventana y eso afectó el agua común.
- Es sutil. Un tono más claro por unas horas.
- Se va sin aviso.

**Tu pez hace un gesto que no es habitual.**
- Se gira. Se detiene. Mira hacia la derecha.
- Como si escuchara algo que vos no podés oír.
- Ocurre cuando hay mucha actividad en otras ventanas.
- No se puede provocar. Solo pasa.

### 9.3 La diferencia entre estar solo y estar acompañado sin saberlo

Es la diferencia entre:
- Un acuario silencioso, tranquilo, contemplativo.
- Un acuario que a veces respira distinto, sin explicación.

La pieza nunca confirma la presencia. Solo la deja sentir. El usuario que está atento, lo nota. El usuario que no, no. Y ambos tienen razón.

### 9.4 Qué se sincroniza y qué no

**Se sincroniza:**
- El oxígeno del bioma común.
- Los nutrientes del bioma común.
- La turbidez del agua común.
- El estado agregado (vivo/agonizando/muerto).
- La edad del bioma.

**NO se sincroniza:**
- El pez específico de cada ventana.
- El sedimento propio.
- Los gestos específicos.
- Las decisiones individuales.
- El sonido de cada cuarto.

La comunicación entre ventanas es **mínima**. Solo las constantes vitales viajan. Todo lo demás queda local.

---

## 10. LA GALERÍA

### 10.1 La tableta

**Ubicación:** en un lugar visible de la galería. Colgada en la pared, o sobre una peana, o integrada en el espacio de manera que no se pueda tocar (o que tocar no haga nada).

**Orientación:** horizontal o vertical, según el diseño del espacio.

**Brillo:** al máximo o adaptado a la iluminación del lugar.

**Conectividad:** siempre online. Si se va la red, la tableta muestra el último estado conocido y espera.

### 10.2 Qué se ve

**Vista rotativa de los 10 biomas.**
- Rota cada 60 segundos.
- Muestra el bioma completo: pez, plantas, agua, sedimento.
- No muestra el dueño. No muestra el nombre. No muestra nada externo.

**Mapa de 10 puntos.**
- En una esquina, discreto.
- Un punto por bioma.
- Puntos que brillan → biomas vivos.
- Puntos apagados → biomas agonizando.
- Puntos negros → biomas muertos.
- Puntos con pulso dorado → biomas rescatados.

**Nada más.**
- No hay texto.
- No hay nombres.
- No hay datos.
- Solo 10 puntos y una rotación.

### 10.3 La experiencia del visitante

**Primera visita:**
El visitante entra. Ve una tableta encendida con un acuario bonito. Mira. Se queda un rato. Se va.

No entiende qué está viendo. Cree que es un video. Cree que es una animación. Cree que es una pieza decorativa.

**Segunda visita (días después):**
El visitante vuelve. La tableta sigue encendida. El acuario sigue ahí. Pero ahora hay algo distinto. No sabe qué. Los colores son un poco distintos. Los puntos de la esquina son un poco distintos. Algunos brillan menos.

**Tercera visita (semanas después):**
El visitante vuelve. Ya no hay 10 puntos brillando. Hay 7. Los otros 3 están apagados o negros. El visitante empieza a notar que **algo pasa**.

**Visita N (meses después):**
El visitante vuelve. Los 10 puntos están negros. No hay ningún brillo. La tableta sigue encendida. La rotación sigue funcionando. Pero todos los biomas están muertos.

Y no hay un mensaje. No hay texto. Solo los 10 puntos negros.

Ese es el momento de la galería. **No cuando entrás. Cuando volvés y ya no hay nada.**

### 10.4 El visitante que se queda

Algunos visitantes se quedan mucho tiempo. Miran la tableta durante minutos. No entienden qué es, pero algo los retiene.

Algunos vuelven al día siguiente. Otros vuelven a la semana.

Los que vuelven muchas veces empiezan a **aprender** la lógica sin que nadie se la enseñe. Notan patrones. Notan cambios. Notan que la tableta no es un video. Notan que **algo está vivo del otro lado**.

Ese es el visitante que la obra busca. No el que entra y sale. El que vuelve.

### 10.5 La tableta que nunca se apaga

La tableta no tiene botón de apagado accesible. No se puede reiniciar. No se puede resetear. Si alguien la desenchufa, la obra se detiene hasta que se vuelva a enchufar.

El curador debe asegurarse de que la tableta esté siempre conectada. Si la tableta se apaga, la obra entra en pausa. Los biomas siguen vivos en Firestore. Pero la galería no los muestra.

La tableta es el ojo. Si se cierra el ojo, la obra no desaparece. Solo deja de ver.

---

## 11. EL LINK Y LA PUERTA DE ENTRADA

### 11.1 El link

El link vive en un repositorio público de GitHub. Es la puerta de entrada al sistema.

**URL:** `[definir]`

**Tecnología:** página estática que carga el sistema desde el dispositivo del usuario. Sin servidor propio. Solo Firebase.

**Dominio:** público. Accesible desde cualquier navegador moderno. Optimizado para móvil.

### 11.2 Comportamientos según el estado

**Hay biomas vivos y sos uno de los 10 dueños:**
- Se abre tu bioma donde lo dejaste.
- Se restaura tu pez, tus plantas, tu sedimento.
- Se sincroniza con el agua común.
- Se activan los gestos.

**Hay biomas vivos y no sos dueño:**
- Ves los 10 biomas como espectador.
- Podés elegir cuál mirar.
- Podés ver la evolución de cada uno.
- No podés tocar.
- Tus gestos no dejan marca.

**Hay menos de 10 biomas vivos:**
- Aparece un gesto de **"tomar un bioma libre"**.
- El solo hecho de tomarlo es el compromiso.
- No hay formulario. No hay términos. No hay advertencias.
- El usuario que toma un bioma pasa a ser dueño.
- Su pez se inicializa con el estado del bioma que heredó.

**Los 10 están muertos:**
- Aparece un gesto de **"reactivar"**.
- Solo funciona si hay varios espectadores haciendo lo mismo al mismo tiempo.
- Uno solo no alcanza.
- Diez desconocidos, dispersos por el mundo, tocando al mismo tiempo, pueden revivir el bioma.

### 11.3 La responsabilidad sin texto

El link no tiene términos y condiciones. No hay formulario. No hay advertencias. No hay checkbox de "acepto".

El solo acto de tomar el bioma es el compromiso.

El usuario que no entiende esto en la primera semana, se le va a morir el pez en la cuarta.

Y no va a haber un mensaje que le diga qué hizo mal. Solo un pez muerto.

### 11.4 La primera vez

El usuario nuevo que llega al link por primera vez:

- Ve una pantalla simple. No hay onboarding. No hay tutorial.
- Ve los biomas disponibles.
- Ve un botón o gesto que dice **"tomar"**. Sin más texto.
- Si toma, se abre un bioma vacío. Agua clara. Un pez. Nada más.
- El usuario no sabe qué hacer. No hay instrucciones.
- Va a tocar. Va a arrastrar. Va a ver qué pasa.
- Y va a aprender, o no, sin que nadie le enseñe.

### 11.5 La reentrada

El usuario que vuelve a los días:

- El link lo reconoce por `userId` guardado en `localStorage`.
- Su bioma se abre donde lo dejó.
- El pez lo recibe. O no.
- Depende de cuánto tiempo estuvo afuera. Depende de si el pez se encariñó. Depende de si el pez está vivo.

---

## 12. HERENCIA Y ADOPCIÓN

### 12.1 El pez que se encariñó

Cuando un dueño abandona su bioma, el pez **ya se encariñó**.

Eso no es metáfora. Es literal.

El pez que el usuario alimentó durante semanas **tiene algo distinto**. Su cuerpo aprendió el ritmo de esa mano. Su comportamiento se ajustó a esa presencia. Cuando el usuario se va, el pez **no vuelve al estado salvaje**. Queda en un estado intermedio — domesticado a medias.

### 12.2 Estados del pez adoptable

**Primer día sin dueño:**
- El pez está quieto. Cerca del fondo. No come.
- Nada lento. Casi no reacciona a los estímulos.
- Se ve triste.

**Después de 3 días sin dueño:**
- El pez acepta la presencia pasiva. Sigue quieto.
- No busca comida. Come solo lo que pasa cerca.
- Se ve apagado.

**Después de 7 días sin dueño:**
- El pez empieza a explorar de nuevo. Vuelve a nadar.
- Pero su comportamiento es distinto. Más cauteloso.
- Se ve un pez que ya no es el que era.

**Después de 14 días sin dueño:**
- El pez se estabiliza. Puede aceptar una nueva mano.
- Pero su cuerpo tiene huellas del abandono. Aletas más pegadas. Colores más apagados.
- Se ve un pez que ha sobrevivido a algo.

### 12.3 Las dos opciones del que abandona

Cuando un dueño decide irse (o el sistema lo marca como abandonador por X días sin abrir — ver 12.4), tiene **dos opciones**:

**Soltarlo al bioma común.**
- El pez pasa a ser parte del sedimento colectivo.
- Se vuelve un pez anónimo.
- Nada de él queda como individuo.
- Se disuelve con todos los demás peces muertos de todas las demás ventanas.
- No hay código. No hay historia. Solo sedimento.

**Darlo en adopción.**
- Otro usuario del bioma (no importa dónde) recibe el pez.
- Lo recibe con un código (`#A7K-2`).
- El nuevo usuario ve el código al tocar el pez.
- También ve la fecha de transferencia.
- También ve su estado emocional actual.
- El pez tarda días en adaptarse.

### 12.4 Cuándo se marca a un usuario como abandonador

El sistema marca a un usuario como abandonador cuando:

- Han pasado **14 días sin abrir su bioma**, o
- Han pasado **7 días sin hacer ningún gesto** (solo mirar no cuenta).

Cuando se marca como abandonador:
- El bioma queda libre.
- El pez entra en estado adoptable.
- Si el usuario vuelve después de esto, ya no puede recuperar el pez original. Puede tomar un bioma libre. Pero no el suyo.

### 12.5 El código de identidad

El código es **la única forma de identidad visible en toda la pieza**.

**Formato:** `#` + 2 letras mayúsculas + `-` + 1 número.
Ejemplos: `#A7K-2`, `#BQ3-7`, `#XJ9-4`.

**Qué significa:**
- No es un nombre.
- No es una persona.
- Es la huella del dueño anterior.
- Es la marca de que alguien lo cuidó antes.

**Dónde aparece:**
- Solo al tocar el pez adoptado.
- Dura 3 segundos.
- Se apaga solo.

**Qué ve el nuevo usuario:**
- El código.
- La fecha de transferencia (solo día y mes, no año).
- Un color que representa el estado emocional del pez.

**Lo que NO ve:**
- El nombre del dueño anterior.
- Su ubicación.
- Su historia.
- Sus otras interacciones.

Es solo un código. Y es suficiente.

### 12.6 Un pez con dos dueños

Un pez adoptado tiene **dos historias superpuestas**:

- La historia del primer dueño.
- La historia del segundo.

En el sedimento propio del pez (que es distinto del sedimento del bioma), hay una marca. Una capa pequeñita, casi invisible, que corresponde al día de la transferencia. Y encima, las capas nuevas.

El pez que ha sido adoptado tiene un sedimento propio con una capa intermedia distinta. Es visible si se mira con cuidado.

---

## 13. EL RESCATE COLECTIVO

### 13.1 El momento

El bioma muere. Todos los peces mueren. Todas las ventanas lo ven. El sedimento se comprime.

Y entonces, aparece la opción de rescate.

No hay texto. No hay notificación. La tableta de la galería muestra los 10 puntos negros. Los dueños ven sus biomas muertos.

Y en la esquina del diorama, en el fondo del tanque, **aparece una grieta luminosa**. Muy pequeña. Muy tenue. Como si algo respirara.

### 13.2 Cómo funciona el rescate

**En el dispositivo del dueño:**
- La grieta aparece en el fondo.
- El usuario puede arrastrar el dedo por el fondo.
- Su dedo "limpia" una porción.
- El pedazo donde pasó su dedo se vuelve más claro.
- El resto queda negro.

**En el dispositivo de los espectadores:**
- La grieta aparece igual.
- Pero sus gestos no limpian. El fondo vuelve a estar como estaba.

**El umbral:**
- Cada limpieza suma a un contador global (invisible).
- Cuando el contador supera un umbral (a definir: 30% del fondo total), el bioma revive.
- Si el contador se queda corto, el bioma queda a medio limpiar.

### 13.3 La trampa

Limpiar es **intervenir**. La única forma de traer de vuelta la vida es **tocar más**. Y tocar es lo que la mató.

El bioma que vuelve **no es puro**. Es un bioma **ya tocado**. Tiene la huella de las manos que lo limpiaron. Es un bioma **domesticado por la emergencia**.

Con el tiempo, si el ciclo se repite, el bioma se vuelve **más y más dependiente** de las manos. Ya no sabe vivir solo. Necesita que alguien lo toque cada tanto para no morir.

Cada resurrección deja una marca. El sedimento tiene bandas negras acumuladas. El pez nuevo tiene huellas de manos. El agua tiene un tinte distinto.

### 13.4 El número importa

**10 ventanas activas:**
- Revive rápido.
- Las 10 manos limpian.
- El sedimento se disuelve en horas.
- El bioma revive en el mismo día.

**3 ventanas activas:**
- Revive despacio.
- Las 3 manos limpian lo que pueden.
- Pero el sedimento es mucho.
- Tarda días.

**1 ventana activa:**
- **No revive.**
- Una mano no alcanza.
- El sedimento pesa demasiado.
- El bioma queda a medio limpiar — negro por un lado, claro por el otro, en tensión.
- Y espera.

### 13.5 El usuario que limpia solo

El usuario que limpia solo **ve que no alcanza**. No hay mensaje. Solo el resultado: su dedo limpia y el fondo se vuelve claro donde pasó, pero queda todo lo demás negro.

Es **frustración visual**. Es la sensación exacta de querer salvar algo y no poder solo.

La pieza enseña, sin texto, que **hay cosas que no se salvan en solitario**. Y que el que intenta solo, no termina de salvar. Termina dejando el bioma en un estado **peor**: a medio camino entre la muerte y la vida.

### 13.6 El rescate que se queda a medias

Si el rescate no alcanza el umbral en un tiempo determinado (a definir: 72 horas), el bioma entra en un estado nuevo: **medio-vivo**.

**Medio-vivo:**
- El agua está clara por un lado. Oscura por el otro.
- El pez está quieto. Pero respira.
- El sedimento tiene una mezcla extraña de capas limpias y capas negras.
- La luz está dividida. Una mitad del tanque recibe luz. La otra no.

Es un estado de tensión. Es un estado que no debería existir. Y es el resultado de la intervención humana fallida.

Si en las siguientes 72 horas alguien más se suma al rescate, el bioma revive. Si no, se estabiliza en este estado medio-vivo. Permanente hasta que alguien intervenga de nuevo.

---

## 14. SISTEMA TÉCNICO

### 14.1 Stack

**Frontend:**
- HTML5 + Canvas 2D.
- JavaScript vanilla (sin frameworks, para mantenerlo simple).
- El código actual ya está en este formato.

**Backend:**
- Firebase Firestore (plan gratuito).
- Sin servidor propio.
- Sin Cloud Functions (por ahora, para mantenerlo dentro del plan gratuito).

**Storage:**
- `localStorage` para el estado propio del bioma.
- Firestore para las constantes compartidas.

**Hosting:**
- GitHub Pages para el link público.
- Firebase Hosting para las reglas de seguridad.

**Autenticación:**
- Anónima. Sin registro.
- `userId` generado localmente en la primera visita.
- Guardado en `localStorage`.
- Usado para identificar al usuario en Firestore.

### 14.2 Estructura de Firestore
/biomes/{biomeId}
├── state: 'alive' | 'dying' | 'dead' | 'rescued' | 'half-alive'
├── oxygen: number (0-100)
├── nutrients: number (0-100)
├── turbidity: number (0-100)
├── age: number (días desde creación)
├── lastLifeMark: timestamp
├── ownerCode: string | null
├── ownerLastSeen: timestamp
├── layers: [
│ { date: 'YYYY-MM-DD',
│ density: number (0-1),
│ color: string (hex),
│ marks: [] // 'leaf', 'bubble-translucent', 'bubble-opaque', 'particle', 'crack'
│ }
│ ]
├── pezAdoptable: boolean
├── pezMood: 'attached' | 'detached' | 'adopting'
└── lastSynced: timestamp

/biomes/{biomeId}/users/{userId}
├── role: 'owner' | 'spectator'
├── firstSeen: timestamp
├── lastSeen: timestamp
└── gestureCount: number

/global
├── activeBiomes: number
├── totalDeaths: number
├── totalRescues: number
├── rescueInProgress: boolean
└── rescueProgress: number (0-1)

/sediment/{date}
├── avgDensity: number
├── avgColor: string
├── marks: [] // marcas agregadas de todos los biomas
└── contributorsCount: number

text

### 14.3 Reglas de seguridad
rules_version = '2';
service cloud.firestore {
match /databases/{database}/documents {

// Cualquiera puede leer los biomas
match /biomes/{biomeId} {
allow read: if true;
allow write: if request.auth != null
&& request.resource.data.diff(resource.data).affectedKeys()
.hasOnly(['oxygen','nutrients','turbidity','lastLifeMark','ownerLastSeen','lastSynced','layers']);

match /users/{userId} {
allow read: if true;
allow write: if request.auth != null
&& request.auth.uid == userId;
}
}

// Solo lectura para el global
match /global {
allow read: if true;
allow write: if false; // solo Cloud Functions (o admin) si es necesario
}

// Solo lectura para el sedimento común
match /sediment/{date} {
allow read: if true;
allow write: if request.auth != null;
}
}
}

text

### 14.4 Sincronización

**Escritura del dispositivo a Firestore:**

| Evento | Frecuencia | Qué escribe |
|---|---|---|
| Ping de vida | Cada 5 min | `lastSeen`, `lastSynced`, `ownerLastSeen` |
| Gesto significativo | Inmediato | `nutrients`, `oxygen` (delta pequeño) |
| Fin de día local | Una vez por día | Nueva capa en `layers` |
| Cambio de estado | Inmediato | `state` |
| Adopción | Inmediato | `ownerCode`, `pezMood`, `pezAdoptable` |

**Lectura de Firestore al dispositivo:**

| Evento | Frecuencia | Qué lee |
|---|---|---|
| Estado del bioma propio | Cada 30 seg | `state`, `oxygen`, `nutrients`, `turbidity` |
| Agua común | Cada 30 seg | Promedio de los 10 biomas |
| Sedimento común | Cada 5 min | `/sediment/{hoy}` |
| Estado de los otros 9 | Cada 5 min | Solo `state` de cada uno |
| Eventos críticos | En tiempo real | Listener en `/global` |

### 14.5 Fallbacks

**Sin red:**
- El bioma sigue funcionando con el último estado conocido.
- Los gestos se acumulan localmente.
- Al reconectar, se sincronizan en orden.
- No hay pérdida.

**Sin Firebase disponible:**
- El bioma entra en modo local.
- No hay agua común.
- No hay sedimento común.
- No hay herencia ni adopción.
- La tableta de la galería muestra el último estado conocido y espera.

**Sin dispositivo (tableta apagada):**
- Los biomas siguen vivos en Firestore.
- Pero no se actualizan.
- Los dueños no ven cambios.
- Cuando vuelve la tableta, se resincroniza todo.

### 14.6 Rendimiento

**Optimizaciones:**
- El diorama se renderiza una vez y se cachea (ya implementado).
- El pez y las aletas se renderizan cada frame (ya implementado).
- Las plantas se renderizan por capas (ya implementado).
- El sedimento se renderiza como una textura precalculada, actualizada al final de cada día.

**Uso de datos:**
- Firestore free tier: 50k lecturas / 20k escrituras por día.
- Con 10 biomas y lecturas cada 30 seg, son ~28,800 lecturas/día. Dentro del límite.
- Escrituras: ~1,500/día. Muy dentro del límite.
- Si la pieza se vuelve popular y supera el límite, se puede migrar a Realtime Database (también gratuito).

### 14.7 Compatibilidad

**Dispositivos soportados:**
- iOS Safari (12+).
- Android Chrome (80+).
- Desktop Chrome, Firefox, Safari.

**Tableta de galería:**
- iPad o Android tablet.
- Siempre conectada.
- Siempre encendida.
- En modo kiosco si es posible.

---

## 15. EL DIORAMA ACTUAL

### 15.1 Qué existe (implementado)

Todo lo que sigue ya está construido y funcionando. **No se modifica en esta fase.**

**Diorama de 5 planos:**
- Plano 5: agua base con gradiente complejo.
- Plano 4: masas vegetales lejanas.
- Plano 3: plantas de fondo animadas.
- Plano 2: pez, artemia, pellets, nidos.
- Plano 1: vegetación frontal.

**Tronco central:**
- Generado con Catmull-Rom.
- Silueta con taper natural.
- Corteza con fibras longitudinales.
- Nudos con anillos concéntricos.
- Musgo en la cara superior.

**Sustrato:**
- Gradiente base.
- Grava angular.
- Arenilla fina.
- Hojitas, palitos, semillas enterradas.
- Contacto agua-suelo.

**Vegetación:**
- 140 rosetas individuales (Monte Carlo).
- 220 briznas en masa derecha (Vallisneria, Sagittaria, tallos).
- 18 racimos de anubias anclados a nudos del tronco.
- 26 grupos de Vallisneria con gradiente real.
- 22 rosetas de Cryptocoryne (algunas rojizas).
- 10 rocas tapizadas de musgo.
- 3 zonas de musgo filamentoso.

**Pez Betta:**
- Movimiento por onda viajera con envelope (cabeza rígida, cola látigo).
- Aletas con física de radios individuales:
  - Caudal: 34 radios, longitud 155·dpr, fan 1.75.
  - Dorsal: 16 radios, longitud 62·dpr, fan 1.05.
  - Anal: 22 radios, longitud 92·dpr, fan 1.15.
  - Pectorales: 11 radios, longitud 30·dpr, fan 0.85.
  - Ventrales: 4 radios, longitud 58·dpr, fan 0.18.
- Estados: `hover`, `cruise`, `burst` (S-start), `display`, `nesting`, `feed`.
- 5 variantes: `original`, `superDelta`, `halfmoon`, `roseTail`, `crowntail`.
- Dos sexos: macho y hembra con paletas y formas distintas.
- Profundidad continua Z (1 a 5) con transición suave y escala visual.

**Micrófono:**
- Análisis FFT con `AnalyserNode`.
- Mapeo de energía total, bajos, medios, agudos.
- Empuje físico del pez según el sonido.
- Estados de display y burst según energía.

**Artemia:**
- Viven en la banda de nado.
- Aparecen en 3 zonas (fondo, tope, laterales).
- Comestibles al pasar por la cabeza del pez.
- Confinadas a `SWIM_BAND` y `WATER_FLOOR_FRAC`.

**Ciclo de vida:**
- Comer artemia → crecer → adulto → anidar → poner huevos → nacer cría → crecer cría.
- 500 artemias para anidar (adulto).
- 500 artemias para crecer (cría).
- Máximo 5 peces simultáneos.

**Pellets:**
- Caen al doble-click en un círculo superior (30·dpr).
- Se detienen 2 diámetros por encima del fondo.
- Hacen crecer el velo del pez (0.1 por pellet, tope 1.5).

**Nidos:**
- Se construyen con 40 burbujas.
- Ponen 20 huevos.
- Eclosionan tras 10 segundos.
- Se desvanecen tras el nacimiento.

**Audio:**
- Drone de fondo (dos osciladores a 36 y 54 Hz).
- Sonidos de burbujas (bubbleSnd).
- Sonidos de pop (bubblePop).

**Cámara y resize:**
- Adaptación a `devicePixelRatio` (tope 1.8).
- Reconstrucción del swamp al resize.

### 15.2 Qué NO cambia

Todo lo anterior queda **intacto**. La nueva capa se monta encima. El diorama sigue funcionando solo si la red falla.

### 15.3 Qué se añade

- Persistencia en Firestore (constantes vitales).
- Multi-bioma (10 instancias).
- Vista de galería.
- Sistema de herencia y adopción.
- Sistema de rescate colectivo.
- Sedimento persistente día a día.
- Los 3 elementos de lectura (piedra, hoja, caracol).
- Los estados de los 5 biomas (vivo sin humano, vivo con humano, agonizando, muerto, rescatado).

---

## 16. ROADMAP POR FASES

### Fase 1 — Fundación (semana 1-2)

**Objetivo:** el diorama persiste entre sesiones.

**Entregables:**
- Conexión a Firebase Firestore.
- Generación de `userId` local.
- Escritura del estado básico: `state`, `oxygen`, `nutrients`, `age`.
- Lectura del estado al abrir.
- Ping de vida cada 5 minutos.

**Sin:**
- Sin multi-bioma.
- Sin galería.
- Sin rescate.
- Sin adopción.

**Cómo se prueba:**
- El usuario abre, interactúa, cierra.
- Al día siguiente vuelve, el bioma está donde lo dejó.
- El agua ha cambiado un poco.

### Fase 2 — El sedimento (semana 3-4)

**Objetivo:** el fondo se convierte en registro.

**Entregables:**
- Cálculo diario de capa.
- Almacenamiento de capas en Firestore.
- Renderizado de capas en el fondo del diorama.
- Las 4 marcas posibles.
- Compresión de capas antiguas (>200).

**Sin:**
- Sin sedimento común.
- Sin lectura de piedra/hoja/caracol.

**Cómo se prueba:**
- El usuario interactúa durante varios días.
- El fondo acumula capas visibles.
- Las marcas aparecen según los eventos.

### Fase 3 — Los tres elementos (semana 5)

**Objetivo:** el usuario puede leer su historia.

**Entregables:**
- Piedra (estado del bioma).
- Hoja (capas propias).
- Caracol (estado actual).
- Activación por dos dedos.

**Sin:**
- Sin agua común.
- Sin otros biomas.

**Cómo se prueba:**
- El usuario toca cada elemento y ve la lectura.
- La lectura cambia según el estado.

### Fase 4 — Multi-bioma (semana 6-7)

**Objetivo:** 10 biomas paralelos con agua común.

**Entregables:**
- Registro de hasta 10 biomas.
- Cálculo del agua común.
- Sincronización de constantes vitales.
- Detección de "hay biomas libres".
- Toma de bioma libre.

**Sin:**
- Sin galería.
- Sin herencia.
- Sin rescate.

**Cómo se prueba:**
- Se crean 10 biomas desde dispositivos distintos.
- El agua de uno afecta al otro.

### Fase 5 — Galería (semana 8)

**Objetivo:** la tableta ve todos los biomas.

**Entregables:**
- Vista rotativa de los 10 biomas.
- Mapa de 10 puntos con estado agregado.
- Modo kiosco.
- Reconstrucción automática del estado al cargar.

**Sin:**
- Sin herencia.
- Sin rescate.

**Cómo se prueba:**
- La tableta muestra la rotación.
- Los puntos cambian según el estado.

### Fase 6 — Herencia y adopción (semana 9)

**Objetivo:** los biomas pueden cambiar de dueño.

**Entregables:**
- Detección de abandono (14 días sin abrir, 7 días sin gestos).
- Marca de pez adoptable.
- Código de identidad.
- Toma de bioma liberado.
- Estado emocional del pez adoptado.

**Sin:**
- Sin rescate colectivo.

**Cómo se prueba:**
- Un usuario abandona su bioma.
- Otro lo toma.
- El pez se comporta distinto al principio.

### Fase 7 — Rescate colectivo (semana 10)

**Objetivo:** el bioma muerto puede revivir.

**Entregables:**
- Detección de bioma muerto.
- Gesto de limpieza (arrastrar).
- Cálculo de progreso global.
- Umbral de resurrección.
- Estado medio-vivo.

**Cómo se prueba:**
- Un bioma muere.
- Varios usuarios limpian.
- Si alcanzan el umbral, revive.
- Si no, queda a medio limpiar.

### Fase 8 — Ciclo circadiano (semana 11)

**Objetivo:** el bioma vive en el tiempo real del usuario.

**Entregables:**
- Lectura de hora y ubicación.
- Amanecer/anochecer locales.
- Estaciones del año.
- Ajuste de luz y ritmo.

**Cómo se prueba:**
- El bioma cambia según la hora real.
- En invierno se ve distinto que en verano.

### Fase 9 — Pulido y despliegue (semana 12)

**Objetivo:** la pieza está lista para galería.

**Entregables:**
- Optimizaciones de rendimiento.
- Pruebas en iPad y Android.
- Modo kiosco.
- Documentación para el curador.
- Publicación del link.

---

## 17. ESCENARIOS DE PRUEBA

### 17.1 Escenario 1 — El usuario perfecto

Un usuario abre su bioma todos los días. Hace un gesto cada 3 días. Nunca abandona. Dura 6 meses.

**Resultado esperado:**
- El agua se tiñe lentamente.
- El sedimento tiene capas finas, claras, con algunas hojas caídas.
- El pez vive 4 meses antes de envejecer.
- Un día el pez muere. Deja una banda densa en el sedimento.
- El usuario entra, ve la banda, no hace nada.
- Al día siguiente, el bioma está agonizando.
- El usuario decide limpiar. Pero solo hay una mano.
- El rescate no alcanza.
- El bioma queda medio-vivo durante semanas.
- Eventualmente el usuario pide ayuda a un amigo.
- El amigo toma un bioma libre y ayuda a limpiar.
- El bioma revive. Con la banda negra al fondo.

### 17.2 Escenario 2 — El usuario negligente

Un usuario abre su bioma. Interactúa mucho el primer día. Después no vuelve por 20 días.

**Resultado esperado:**
- Día 1: bioma vivo con humano. Sedimento con varias marcas.
- Día 3: bioma vivo sin humano. El agua empieza a teñirse.
- Día 7: bioma agonizando. El pez nada lento.
- Día 14: el sistema marca al usuario como abandonador. El pez queda adoptable.
- Día 20: el usuario vuelve. Ve que su bioma ya no es suyo.
- Alguien más lo tomó.
- El código `#XXXX-N` aparece al tocar el pez.
- El usuario no puede recuperarlo.

### 17.3 Escenario 3 — El rescate colectivo

Los 10 biomas mueren en una semana por abandono colectivo.

**Resultado esperado:**
- La tableta de la galería muestra los 10 puntos negros.
- Los visitantes ven la tableta sin entender qué pasó.
- Días después, algunos visitantes empiezan a tocar la tableta (sin efecto).
- Eventualmente, alguien abre el link. Ve el gesto de reactivar.
- Toca. Nada pasa.
- Vuelve al día siguiente. Toca de nuevo.
- Aparece una segunda persona. Toca también.
- Con el tiempo, se suman más.
- Al alcanzar el umbral, los 10 biomas reviven.
- Las 10 bandas negras quedan en el fondo.
- Un nuevo ciclo empieza.

### 17.4 Escenario 4 — El pez adoptado

Un usuario abandona su bioma después de 3 semanas. Otro lo toma.

**Resultado esperado:**
- El bioma tiene un pez con historial.
- El nuevo usuario lo ve quieto al principio.
- El código `#A7K-2` aparece al tocar.
- El pez tarda 7 días en adaptarse.
- Al principio no come mucho. Nada cerca del fondo.
- Después de 7 días, empieza a explorar.
- Después de 14 días, acepta la nueva mano.
- Pero su cuerpo tiene huellas del abandono.
- El sedimento del pez tiene una capa intermedia distinta.

### 17.5 Escenario 5 — La tableta sola

La tableta de la galería está encendida 24/7. Nadie interactúa con ella. Solo la miran.

**Resultado esperado:**
- Los biomas siguen vivos en Firestore.
- Los dueños siguen interactuando desde sus teléfonos.
- La tableta solo muestra. No interactúa.
- Los visitantes ven los 10 puntos cambiar lentamente.
- Algunos visitantes vuelven al mes.
- Encuentran los puntos negros.
- No hay mensaje. Solo los puntos.

---

## 18. GUÍA DEL CURADOR

### 18.1 Antes de instalar

**Hardware:**
- Tableta iPad o Android de 10" o más.
- Cargador permanente.
- Soporte o peana según el espacio.
- Opcional: modo kiosco activado.

**Software:**
- Navegador actualizado.
- Cuenta de Firebase (free tier).
- Repositorio GitHub público.

**Espacio:**
- Lugar visible.
- Luz adecuada (el brillo de la tableta debe competir con la luz del lugar).
- Sin acceso para tocar (o con acceso inútil: la tableta no responde a toques en modo galería).
- Cerca de un enchufe.

### 18.2 Instalación

1. Cargar el link en la tableta.
2. Activar modo kiosco.
3. Configurar `localStorage` con un `userId` de galería.
4. Verificar la conexión a Firestore.
5. Dejar la tableta encendida.

### 18.3 Distribución de los 10 biomas

Decisión del curador. Tres modos (ver sección 4.5):

- Lanzamiento simultáneo.
- Goteo semanal.
- Asignación curada.

El curador debe anunciar el link por los canales que elija (redes, mail, etc.). Los primeros 10 que entren al link y tomen un bioma serán los dueños.

### 18.4 Mantenimiento

- Revisar la conexión a Firestore periódicamente.
- Verificar que la tableta siga encendida.
- Reiniciar la tableta cada 7 días para evitar fugas de memoria.
- Si la tableta falla, reemplazarla con otra configurada igual.

### 18.5 Observación

El curador no interviene en la obra después de instalarla. Su rol es de testigo. Puede observar la evolución. Puede tomar notas. Pero no puede modificar el sistema.

Si el sistema muere del todo, el curador espera a que alguien lo rescate. Si nadie lo hace, la pieza queda en estado de muerte indefinida. Es la obra.

---

## 19. CONSIDERACIONES ÉTICAS

### 19.1 Sobre la crueldad de la pieza

La pieza es amable en la superficie y cruel en el fondo. Esto es deliberado. No es un accidente.

**La crueldad no está en el sistema. Está en el usuario.** El sistema no juzga. No castiga. No premia. Solo registra. El usuario que siente culpa, la siente por su cuenta.

**No hay posición correcta.** El que toca, mancha. El que no toca, abandona. El que toca mucho, ahoga. El que toca poco, permite. Todas las posiciones son responsables de algo.

**El sistema no miente.** El sistema solo deja ver. La lectura de la información es responsabilidad del usuario.

### 19.2 Sobre la alusión a la obra de la galería

La pieza se inspira en la obra de un conocido del curador (peces en bolsas de agua colgadas al techo, con adopción real). Esa obra fue la genealogía conceptual. Pero esta pieza no la replica. La transforma.

**Diferencias clave:**
- La obra original usaba animales reales. Esta usa una simulación.
- La obra original tenía un momento puntual de decisión. Esta tiene una acumulación lenta.
- La obra original exponía el problema. Esta invita a habitarlo.

### 19.3 Sobre el usuario dueño

Los 10 dueños no firman nada. Pero aceptan un compromiso implícito al tomar el bioma. La pieza no advierte. La pieza solo recibe.

Si un dueño abandona su bioma, el sistema lo marca. Pero no lo juzga. El código `#XXXX-N` no dice "abandonador". Solo dice "el que vino antes".

### 19.4 Sobre la muerte

La pieza permite la muerte del bioma. Los peces mueren. Los biomas mueren. Esto es deliberado.

No hay protección contra el fracaso. La obra no se puede completar. Solo se puede atravesar.

### 19.5 Sobre el espectador

El espectador no tiene agencia. Ve sin poder tocar. Esto puede ser frustrante. Es deliberado.

La frustración del espectador es la frustración del testigo. Es la posición del que ve un problema y no puede resolverlo. Es la posición del que **está ahí**.

---

## 20. GLOSARIO

**Bioma** — Unidad viva. Hay 10. Cada uno vive en un dispositivo distinto.

**Agua común** — Promedio agregado de los 10 biomas. Se calcula, no se guarda.

**Sedimento** — Capas acumuladas de materia. Registro de tiempo. Nunca se borra del todo.

**Capa** — Cada día deja una capa en el sedimento. Tiene grosor, color, y puede tener marcas.

**Marca** — Elemento atrapado en una capa. Hoja, burbuja, partícula, grieta.

**Hoja caída** — Marca que significa que el usuario hizo un gesto significativo ese día.

**Burbuja atrapada** — Marca que significa que hubo nido. Traslúcida si eclosionó, opaca si no.

**Partícula dorada** — Marca que significa que hubo comida ese día.

**Grieta** — Marca que significa que hubo un sobresalto. Golpe, grito, sonido fuerte.

**Gestos** — Solo dos. Tocar (presencia) y arrastrar (voluntad).

**Lecturas** — Tres elementos que se leen al tocar. Piedra, hoja, caracol.

**Piedra** — Elemento del diorama que revela el estado del bioma común.

**Hoja** — Elemento del diorama que revela las capas propias del usuario.

**Caracol** — Elemento del diorama que revela el estado actual del bioma.

**Dueño** — Uno de los 10. Tiene bioma propio. Vive en su dispositivo.

**Espectador** — Todos los demás. Ven. No tocan.

**Heredero** — Usuario que toma un bioma liberado. Hereda historia ajena.

**Código** — String corto (`#A7K-2`) que identifica al dueño anterior de un bioma adoptado. Única forma de identidad visible.

**Curador** — Quien instala la tableta. No aparece en la obra.

**Tableta** — Dispositivo físico en la galería. Muestra los 10 biomas rotando.

**Bioma muerto** — Estado en el que el agua es negra, el pez quieto, las plantas desintegradas.

**Banda negra** — Marca del sedimento que corresponde a un período muerto. Nunca se borra.

**Rescate** — Gesto colectivo de limpieza para revivir un bioma muerto.

**Medio-vivo** — Estado del bioma que quedó a medio limpiar. Claro por un lado, negro por otro.

**Inversión** — La ley central: el humano es la alteración, la naturaleza es estable.

**Lectura del fondo** — Aprendizaje gradual de interpretar las capas del sedimento.

---

## 21. ANEXOS

### 21.1 Wireframes (ASCII)

**Vista de dueño (dispositivo):**
┌─────────────────────────────────────┐
│ │
│ [DIORAMA DEL BIOMA] │
│ │
│ - Pez │
│ - Plantas │
│ - Tronco │
│ - Agua │
│ - Sedimento con capas │
│ - Piedra (esquina) │
│ - Hoja (cerca del tronco) │
│ - Caracol (fondo) │
│ │
│ │
│ │
│ ┌──┐ │
│ │ │ ← círculo de alimento │
│ └──┘ │
└─────────────────────────────────────┘

text

**Vista de galería (tableta):**
┌─────────────────────────────────────┐
│ │
│ │
│ [BIOMA ROTANDO] │
│ │
│ │
│ │
│ │
│ │
│ │
│ ┌────────┐ │
│ │ ● ● ● ●│ │
│ │ ● ● ● ●│ │
│ │ ● ● │ │
│ └────────┘ │
└─────────────────────────────────────┘

text

**Estructura del sedimento:**
Día 1 ──────────────── (capa fina, clara)
Día 2 ──────────────── (capa fina, clara)
Día 3 ────────────●──── (capa con partícula dorada)
Día 4 ──────────────── (capa fina, clara)
Día 5 ────────────────── (capa más gruesa, más oscura)
Día 6 ────╱╲──────────── (capa con grieta - sobresalto)
Día 7 ──────────────── (capa fina, clara)
Día 8 ──────────────── (capa fina, clara)
Día 9 ──○─────────────── (capa con burbuja opaca - nido fallido)
Día 10 ──────────────── (capa fina, clara)
...
Día 20 ════════════════ (banda negra - período muerto)
Día 21 ════════════════ (banda negra - período muerto)
Día 22 ──────────────── (capa nueva post-rescate)

text

### 21.2 Referencias

**Artistas de data art:**
- Refik Anadol — Instalaciones con datos como materia visual.
- Nathalie Miebach — Esculturas con datos meteorológicos.
- Jer Thorp — Visualización de datos con narrativa.

**Obras de referencia:**
- La obra de la galería de peces en bolsas (mencionada por el curador).
- "The Best American Infographics" (serie).
- "Dear Data" (Giorgia Lupi y Stefanie Posavec).

**Conceptos teóricos:**
- Slow art — El arte que requiere tiempo para ser comprendido.
- Ambient computing — Interfaces que no piden atención constante.
- Data physicalization — Convertir datos en objetos físicos.

### 21.3 Influencias estéticas

- Acuarios plantados de estilo natural (Takashi Amano).
- Fotografía macro de bettas en su hábitat natural (Tailandia).
- Pintura de paisaje chino (los estratos como tiempo).
- Instalaciones de arte contemporáneo con agua (Olafur Eliasson).
- Videojuegos lentos de contemplación (Journey, Flower, ABZÛ).

### 21.4 Preguntas abiertas

Estas cosas están pendientes de definir durante el desarrollo:

**1. ¿El bioma común puede morir antes que el individual?**
Es decir, si 9 biomas mueren y 1 está vivo, ¿el agua común está lo suficientemente contaminada para matar al bioma vivo?

**Decisión pendiente.**

**2. ¿El usuario que toma un bioma libre hereda la huella del dueño anterior?**
El pez hereda. ¿El sedimento propio del bioma también?

**Decisión pendiente.**

**3. ¿El rescate puede repetirse indefinidamente?**
Si un bioma muere 10 veces y revive 10 veces, ¿el 11º rescate es más difícil que el 1º?

**Decisión pendiente.**

**4. ¿Hay un estado "rescatado permanentemente"?**
Es decir, ¿hay una forma de que el bioma salga del ciclo de vida-muerte-rescate y se estabilice?

**Decisión pendiente.**

**5. ¿La galería puede cambiar de tableta?**
Si la tableta original se rompe, ¿se puede instalar el sistema en otra? ¿Se preserva el estado?

**Decisión pendiente.**

### 21.5 Changelog

**v0.1 — Conceptual inicial**
- Primer esbozo de la idea.

**v1.0 — Aterrizado**
- Ley invertida definida.
- 5 estados del bioma.
- 3 roles + heredero.
- 2 gestos.
- 3 elementos de lectura.
- Sistema de sedimento.
- Sistema de rescate.
- Guía de curador.
- Roadmap por fases.

---

*Documento vivo. Sujeto a cambios según la obra lo pida.*

*Última actualización: [fecha]*

