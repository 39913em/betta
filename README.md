# BETTA — Diorama Vivo

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

## Firebase: 10 espacios abiertos (Fase 2)

Configuración (una sola vez, en la consola de Firebase del proyecto `bettea-d4b04`):
1. **Authentication → Método de acceso → Anónimo → Habilitar.** (Obligatorio: da identidad a cada navegador.)
2. **Realtime Database → Crear base de datos.**
3. **Reglas:** pega `database.rules.json` y publica.

Cómo funciona:
- Hay 10 espacios (`s1`…`s10`). Quien llega **toma el primero libre** (transacción atómica). Si están todos ocupados, entra como **espectador** (mira, no alimenta).
- El estado del bioma (sexo del pez, sedimento, comidas) vive en el espacio, no en el navegador.
- **Ceder:** mantener pulsado 3 s sobre el sedimento (franja inferior). El espacio queda libre con su pez y su sedimento; quien lo adopte los hereda. Quien cede no retoma espacio durante 24 h.
- **Rescate:** un espacio sin actividad 7 días queda en rescate y cualquiera puede tomarlo (lo hacen las reglas, no el cliente).
- **Agua común:** calculada por cada cliente con la comida de las últimas 24 h de los espacios; nunca se guarda.
- Añade `?debug` a la URL para ver rol, espacio, estado de la red y agua.

Límites: si alguien borra los datos del navegador pierde su identidad y su espacio; se libera solo tras 7 días.

## Despliegue en GitHub Pages

Incluye un workflow (`.github/workflows/pages.yml`). En el repositorio: *Settings → Pages → Source: GitHub Actions*.
