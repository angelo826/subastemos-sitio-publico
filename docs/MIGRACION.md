# Migración desde el clon estático

Qué se replicó, qué se corrigió a propósito y qué quedó fuera.

**Léelo antes de "arreglar" algo que parece un error del sitio.** Buena parte
de lo que aquí se lista fueron decisiones, no descuidos.

Origen: `subastemos-static/site`, un volcado HTML del portal original en Craft
CMS + SEOmatic. 33 páginas, 11 MB.

---

## Lo que se replicó

- El diseño completo: colores, tipografías, gradientes, radios y proporciones.
- Los textos, tal cual, incluidas erratas del CMS (`LOTERO/COMERCIALIZDOR`,
  `Toda transfeerencia`, `Proximamente` sin tilde). No se corrigieron: son
  contenido editable, no código.
- La estructura de navegación, con la particularidad de que **el menú móvil no
  es un espejo del de escritorio** — en el original tenía sus propias
  agrupaciones.
- Las metadescripciones y `keywords` de cada página.
- Los enlaces salientes a `subastas.subastemos.mx`, que sigue siendo un sistema
  aparte.

---

## Lo que se sustituyó (stack)

| Antes | Ahora |
|---|---|
| `css/app.css` (176 KB, Bootstrap 5.1.3 compilado) | Tailwind v4 con los tokens del tema |
| jQuery, Popper, `bootstrap.min.js` | Radix UI y estado de React |
| `js/app.js` (bundle Webpack de 286 KB con Swiper y axios) | `swiper` de npm |
| `js/static-clone.js` (cancelaba los envíos) | Formularios reales contra Route Handlers |
| Kit remoto de Font Awesome | `lucide-react` |
| `assets/calendario/main.js` (jQuery + AJAX) | Componente de calendario en React |
| Google Maps en las 33 páginas | Solo en `/contacto` y `/patios/*` |
| `@font-face` en el CSS, sin preload | `next/font/local` con preload |

Verificable: ninguna página carga ya jQuery, Popper, `bootstrap.js` ni el kit de
Font Awesome.

---

## Correcciones deliberadas

### URLs

Las rutas pasan de `/como-comprar.html` a `/como-comprar`. Es lo que ya
declaraban los `canonical` del sitio original, que apuntaban a URLs limpias
mientras el volcado servía `.html`. Todas las rutas antiguas redirigen con
**301** desde `next.config.ts`.

La paginación del blog pasa de `/blog/p2.html` a `/blog/pagina/2`.

### SEO

- Los `canonical`, `og:url` y el JSON-LD del clon apuntaban a
  `http://localhost:8080`, porque el volcado se hizo contra un servidor local.
  Ahora todo cuelga de `NEXT_PUBLIC_SITE_URL`.
- **`sitemap.xml` y `robots.txt` no existían.** Se generan desde las mismas
  fuentes que crean las rutas.
- Se añadió `BlogPosting` en cada artículo y `FAQPage` en preguntas frecuentes.
  El original no los tenía.
- `calendario.html` declaraba `lang="en"` en un sitio en español.

### Calendario

El clon traía ocho meses congelados como HTML (2026/03 a 2026/10), **todos
vacíos** («0 subastas»), y su selector de meses enlazaba a
`http://localhost:8080` en cuanto salías del rango.

Ahora la retícula se calcula desde `data/subastas.ts` y el selector solo ofrece
meses que existen. El rango se amplía en `lib/calendario.ts` (ver
[CONTENIDO.md](CONTENIDO.md)).

`calendario.html` además estaba **malformado**: un `<!DOCTYPE html>` completo
anidado dentro de un `<main>`. Se reconstruyó como página normal.

### Preguntas frecuentes

Los filtros circulares del clon **no filtraban nada**: solo añadían
`?category=` a la URL y el listado siempre mostraba las mismas preguntas,
porque el volcado estático perdió la consulta del CMS.

Ahora filtran de verdad. Eso obligó a reconstruir la relación pregunta →
categoría, que no estaba en el HTML. **La asignación es criterio nuestro**, no
un dato heredado: las cuatro primeras a «Subastas» y las dos de estado de
cuenta y métodos de pago a «Pagos». Está en `scripts/extraer-paginas.mjs`, en
`CATEGORIA_POR_PREGUNTA`. No hay preguntas de «Compra» ni «Venta»: esos filtros
muestran un estado vacío.

### Accesibilidad

- **Tarjetas de patio**: los botones llevaban `d-none` y solo aparecían al
  pasar el ratón, lo que los dejaba inalcanzables por teclado y en móvil. Ahora
  la tarjeta entera es el enlace.
- **Formularios**: solo tenían `placeholder`, que desaparece al escribir y los
  lectores de pantalla anuncian mal. Se añadieron etiquetas reales ocultas
  visualmente.
- **Acordeones**: el collapse de Bootstrap alternaba dos iconos con `d-none` y
  no exponía estado. Radix aporta `aria-expanded` y navegación por teclado.
- **Menú móvil**: ahora bloquea el scroll del documento y cierra con `Escape`.
- **Paginación del blog**: la página actual apuntaba a `#`; ahora es un
  `<span aria-current="page">`.

### Rendimiento

- Google Maps pasa de 33 páginas a 3.
- Todas las imágenes llevan `width`/`height` a través de `<Foto>`, que resuelve
  las dimensiones intrínsecas y **lanza si faltan**. Durante la migración, unas
  imágenes diferidas sin caja reservada colapsaban a altura 0 y acortaban la
  página en 1000 px hasta que cargaban.

---

## Elementos del clon que no se replicaron

- **Un botón vacío en el hero**, que el CMS renderizaba sin texto y se veía
  como una línea naranja suelta. Un botón sin etiqueta no es accesible.
- **Un punto suelto (`.`) como descripción** del acceso «Subastas» en la
  portada: era un campo vacío del CMS.
- **La barra de pestañas de subastas**, que se renderizaba con una sola
  pestaña. Se conserva el rótulo, con el mismo aspecto e información, pero como
  texto en vez de un control de pestañas de un solo elemento.
- **Los enlaces vacíos** (`href=""`) de «Términos y Condiciones» en el pie: se
  renderizan como texto, no como enlaces muertos.

---

## Decisiones técnicas que conviene no revertir

**`google.maps.Marker` en lugar de `AdvancedMarkerElement`.** Google marca el
primero como obsoleto, pero el segundo exige un `mapId`, y cuando hay `mapId`
la API **ignora la propiedad `styles`**. El mapa morado es parte del diseño del
tema. Migrar al marcador nuevo implica trasladar el estilo a la consola de
Google Cloud. `Marker` no tiene fecha de retirada y Google promete 12 meses de
aviso.

**No se usa el atributo `inert` en el menú móvil.** React 19 lo serializa como
cadena vacía en el HTML del servidor y dispara un aviso de hidratación en ese
árbol. Se usan `aria-hidden` y `pointer-events-none`.

**El fondo va en `html`, no en `body`.** Ver [DISENO.md](DISENO.md).

---

## Fuera de alcance

- **La integración con el backend.** Están las costuras, no la conexión. Ver
  [BACKEND.md](BACKEND.md).
- **`/inventario-vehiculos`.** Existen el repositorio tipado y el stub
  `app/api/vehiculos/route.ts`, pero no la página.
- **Envío real de contacto y reservas.** Los Route Handlers validan y responden
  200, con el `TODO` marcado.
- **La plataforma de subastas** (`subastas.subastemos.mx`), que sigue siendo
  externa.

## Pendiente antes de publicar

- **Rotar la clave de Google Maps.** La del clon
  (`AIzaSyAKkxs0G_KAhgEXHGYmK9b44hdaA3V3pQc`) es pública y quedó expuesta en el
  volcado. Genera una nueva y restringe por referrer al dominio de producción.
- **Verificar el mapa en el dominio real.** En local no llega a pintar: la
  clave del clon está restringida a sus propios referrers. El componente
  degrada mostrando la dirección en texto.
- **Fijar el dominio canónico** en `NEXT_PUBLIC_SITE_URL`.
- **Enlazar «Términos y Condiciones»** cuando exista esa página.
