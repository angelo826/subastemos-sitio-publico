# Sistema de diseño

El tema original eran 176 KB de CSS compilado: ~162 KB de Bootstrap 5.1.3 y
solo ~13,6 KB propios (63 clases BEM). Se descartó el compilado y se
reconstruyó el tema sobre Tailwind v4. Todo vive en `app/globals.css`.

## Tokens

```css
@theme {
  --color-purple:     #7300fe;   /* acento principal */
  --color-darkpurple: #400186;   /* fondos oscuros, pie */
  --color-orange:     #ff7500;   /* llamadas a la acción */
  --color-blue:       #00a3e1;   /* secundario, h2 editoriales */
  --color-green:      #04ae11;   /* WhatsApp */
  --color-graybg:     #f0f0f0;   /* fondos suaves */
}
```

Se usan como `text-purple`, `bg-darkpurple`, `border-orange`, etc.

## Tipografías

| Utilidad | Fuente | Uso |
|---|---|---|
| `text-title` | GeogrotesqueCyr SemiBold | Títulos y todos los `h1` |
| `text-bold` | CodecPro Bold | Énfasis, botones, navegación |
| `text-regular` | CodecPro News | Texto corrido (por defecto en `body`) |

Se cargan con `next/font/local` desde `app/fonts.ts`, con `display: swap` y
preload. En el clon se declaraban con `@font-face` dentro del CSS, sin preload.

## Breakpoints

**Son los de Bootstrap, no los de Tailwind.** El markup del clon estaba escrito
contra ellos; cambiarlos habría creado saltos de layout donde el original no
los tenía.

| Prefijo | Este proyecto | Tailwind por defecto |
|---|---|---|
| `sm:` | 576px | 640px |
| `md:` | 768px | 768px |
| `lg:` | 992px | 1024px |
| `xl:` | 1200px | 1280px |
| `2xl:` | 1400px | 1536px |

## Equivalencias Bootstrap → Tailwind

**La trampa principal de la migración.** Las escalas de espaciado no coinciden:
`py-4` en Bootstrap son 1,5 rem y en Tailwind 1 rem. Al traducir markup del
clon, usa esta tabla y no el número homónimo:

| Bootstrap | rem | Tailwind |
|---|---|---|
| `p-1` | 0.25 | `p-1` |
| `p-2` | 0.5 | `p-2` |
| `p-3` | 1 | **`p-4`** |
| `p-4` | 1.5 | **`p-6`** |
| `p-5` | 3 | **`p-12`** |

Otras equivalencias frecuentes:

| Bootstrap | Tailwind |
|---|---|
| `col-12 col-md-6 col-lg-3` | `w-full md:w-1/2 lg:w-1/4` |
| `row` | `flex flex-wrap` |
| `d-none d-md-block` | `hidden md:block` |
| `d-flex justify-content-center` | `flex justify-center` |
| `text-center` | `text-center` |
| `my-auto` | `my-auto` |
| `w-100 h-100` | `w-full h-full` |
| `img-fluid` | `max-w-full h-auto` |

## Clases de componente

En `@layer components`, porque se repiten y algunas se aplican a HTML que llega
como string desde `data/`:

| Clase | Qué es |
|---|---|
| `.container-bs` | Réplica exacta de `.container` de Bootstrap 5, con sus `max-width` por breakpoint y su padding de media canaleta |
| `.bg-grad-purple` | `linear-gradient(90deg, #400186, #7300fe)` — barra superior |
| `.bg-grad-purple-rev` | Invertido — barra de navegación y menú móvil |
| `.bg-grad-orange` | Morado a naranja — acceso móvil |
| `.bg-grad-footer` | Radial del pie |
| `.bg-grad-patio-hover` | Sobreimpreso de las tarjetas de patio |
| `.clip-banner` | Triángulo de la banderola de subastas |
| `.redactor` | Tipografía del contenido editorial |

### `.redactor`

Se aplica al HTML que viene del editor Redactor de Craft:

| Elemento | Estilo |
|---|---|
| `h1` | Morado, tipografía de títulos, centrado |
| `h2` | Azul, tipografía de títulos |
| `strong` | Naranja (negro en la variante `.redactor--nosotros`) |
| `ul` | Viñeta cuadrada, marcador azul |
| `ol` | Marcador morado con tipografía de títulos |
| `a` | Azul, subrayado al pasar el ratón |

La variante `.redactor--nosotros` sube el cuerpo a 1,25 rem.

## Responsive

Correcciones deliberadas sobre lo que hacía el tema:

| Antes | Ahora | Por qué |
|---|---|---|
| `main { margin-top: 186px }` fijo | 157px en móvil, 186px desde `md` | El header real mide 112px en móvil; 186px dejaba un hueco desproporcionado |
| Filigrana del pie con 7 media queries y `top` negativo (-450px … -80px) | Un `clamp()` fluido | Mismo efecto, sin la cascada frágil |
| `.patios__img { height: 350px }` bajo 992px | `aspect-square` | Reserva la caja sin altura dura |
| `hero__title` con un solo salto en 1400px | `clamp(2.75rem, 14vw, 3.5rem)`, 4rem desde `2xl` | Escala sin desbordar en pantallas estrechas |
| Tabla del calendario desbordando el `body` | Contenedor con `overflow-x: auto` | El scroll queda dentro de la tabla |
| Botones táctiles sin tamaño mínimo | 44×44 px mínimo | Hamburguesa, cierre del menú y botón de WhatsApp |

## Fondo y `z-index`

La filigrana de números va con `z-index: -99`. **El fondo y el recorte
horizontal se declaran en `html`, no en `body`**: si `body` lleva un `overflow`
distinto de `visible`, su fondo deja de propagarse al canvas y pasa a pintarse
por encima de los elementos con `z-index` negativo, que es exactamente lo que
ocultaba la filigrana durante la migración.
