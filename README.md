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

## Firebase (Fase 2)

1. El proyecto `bettea-d4b04` ya está configurado en `src/js/config.js` (usa el SDK compat por CDN, no npm).
2. En la consola: **Realtime Database → Crear base de datos** si aún no existe.
3. Publica las reglas de `database.rules.json` (`firebase deploy --only database` o pégalas en la consola).

Cada bioma escribe solo un registro pequeño (`t`, `f` comidas de hoy, `n` total, `x` sexo). El **agua común no se guarda**:
cada cliente la calcula con los registros de las últimas 24 h; más alimento en la red => agua más ámbar.
Sin configuración, todo funciona en modo local.

> Nota: sin autenticación, cualquiera con la URL puede escribir registros válidos. Para una exposición larga, añade
> Firebase Auth anónima y restringe la escritura a `auth.uid === $id`.

## Despliegue en GitHub Pages

Incluye un workflow (`.github/workflows/pages.yml`). En el repositorio: *Settings → Pages → Source: GitHub Actions*.
