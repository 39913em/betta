# BETTA-BIOMA

Pieza de data art: un diorama hiperrealista de pez Betta (canvas 2D, audio generativo y micrófono reactivo)
que recuerda entre sesiones. Cada día de visita deja una capa de **sedimento** en el fondo; cuanto más se alimenta, más cálida y oscura.

> *El bioma sin humano dura mucho. El humano es la alteración.*

## Uso

Abre `index.html` con doble clic, o sirve la carpeta:

```bash
npm start        # http://localhost:8080
```

- **Doble clic / doble toque** sobre el círculo de comida: suelta un pellet.
- **Clic / toque:** activa audio y micrófono (reacciona al sonido).
- El estado se guarda en `localStorage` (`betta.bioma.v1`). Para reiniciar el bioma: `localStorage.removeItem('betta.bioma.v1')`.

## Estructura

```
index.html
src/css/style.css
src/js/
  config.js     configuración de Firebase
  network.js    red y agua común (Fase 2)
  core.js       canvas, CFG, resize
  audio.js      audio generativo, micrófono
  persist.js    persistencia + sedimento (Fase 1, local)
  swamp.js      fondo de 5 planos, plantas, partículas
  fins.js       Spine, RayFin (aletas)
  artemia.js    artemia
  nest.js       nido de burbujas
  foodhint.js   invitación de comida
  betta.js      pez: paletas, variantes, comportamiento
  pellet.js     crías y pellets
  main.js       instancias y bucle principal
  decay.js      deterioro visible y limpieza
  onboarding.js introducción, tutorial, decisión y responsiva
  input.js      ratón y táctil
```

Los scripts son clásicos (no módulos) y el orden en `index.html` importa.

## Origen del código

Basado en `index.html` de https://github.com/39913em/betta (versión con fondo completo: madera, anubias, sustrato, alfombra frontal),
dividido en módulos. `pez.html` y `Betta_diorama.html` del repositorio original no forman parte de esta carpeta.

## Cambios respecto al original

- Código dividido en módulos; comportamiento y colores del pez intactos.
- **Rendimiento:** degradados de plantas cacheados (antes ~3 por hoja por frame); reconstrucción del fondo con debounce al redimensionar; partículas independientes de la tasa de frames.
- **Fiabilidad:** el `AudioContext` se reanuda en móviles; `touch-action:none` evita zoom por doble toque.
- **Nuevo:** persistencia entre sesiones, sexo del pez fijo y sedimento diario.

## Roadmap (ver documento maestro)

- [x] Fase 1: persistencia local y sedimento.
- [x] Fase 2: red de hasta 10 biomas (Firebase Realtime Database) con agua común calculada. Ver «Firebase».
- [ ] Fase 3: vista de galería, herencia/adopción y rescate colectivo.

## Flujo del visitante

1. **Entra y ve el bioma en marcha** (sin cuenta, sin datos). Una introducción breve lo explica: *Acerca de* → *Cómo funciona*.
2. **Decide:** *MIRAR* o *CUIDAR* (muestra cuántos de los 10 quedan libres).
3. **Solo si cuida:** lee y acepta la **responsiva** (términos, aviso de privacidad y compromiso) → inicia sesión con **Google** → recibe su lugar.
4. Quien volvió a mirar ve un botón discreto «CUIDAR»; el pie de página enlaza *Cómo funciona* (abajo a la izquierda) y *Acerca de*, *10 Biomas*, *Términos* y *Privacidad*.

## Firebase: 10 espacios abiertos

Configuración (una sola vez, proyecto `bettea-d4b04`):
1. **Authentication → Comenzar → Método de acceso → Google → Habilitar** (pide un correo de soporte).
2. **Authentication → Configuración → Dominios autorizados → Agregar** `39913em.github.io` (y tu dominio propio si lo usas).
3. **Realtime Database → Crear base de datos** y pegar `database.rules.json` en **Reglas**.

(Ya no se usa acceso anónimo: no hace falta habilitarlo ni activar la limpieza automática.)

- Hay 10 espacios (`s1`…`s10`). Se toma el primero libre con una transacción atómica. Con todos ocupados, se entra como espectador.
- El estado del bioma (sexo del pez, sedimento, comidas) vive en el espacio, ligado a la cuenta, no al navegador: se recupera en cualquier dispositivo.
- **Ceder:** mantener pulsado 3 s sobre el fondo. Dos opciones: **dejarlo libre** (cualquiera lo adopta) o **heredar con PIN**: se genera un PIN de 6 caracteres, el lugar queda reservado 3 días para quien lo tenga; esa persona acepta términos y privacidad e ingresa el PIN (o abre el enlace `?pin=XXXXXX`). Quien cede no retoma lugar durante 24 h.
- **Deterioro:** sin limpieza, en ~6 días aparecen residuos, malesa y moho (hasta 18 elementos), el agua verdea y el pez nada más lento. Se limpia arrastrando sobre ellos (solo cuidadores). `?dirt=0.8` fuerza un nivel para probarlo. Un lugar adoptado en rescate hereda su suciedad: adoptarlo es rescatarlo.
- **Invitar:** «INVITAR» comparte el enlace `?invita=1`, que abre directamente la decisión.
- **Rescate:** 7 días sin actividad y cualquiera puede tomarlo (lo imponen las reglas).
- **Agua común:** calculada en cada cliente con la comida de las últimas 24 h; nunca se guarda.
- `?debug` en la URL muestra rol, espacio, red y agua.

## Legal

Los textos viven en `src/js/legal.js` y se muestran dentro de la ventana flotante (un solo lugar para editarlos). Responsable: 39913 · eddmatography@protonmail.ch · Ciudad de México. Conviene que un abogado los revise antes de una publicación formal.

## Despliegue en GitHub Pages

Incluye un workflow (`.github/workflows/pages.yml`). En el repositorio: *Settings → Pages → Source: GitHub Actions*.
