# Editar el contenido

Todo el contenido del sitio vive en `data/`. Para las tareas de abajo **no hace
falta tocar ningún componente ni ninguna página.**

Tras cualquier cambio:

```bash
npm run build
```

---

## Añadir un artículo al blog

Edita `data/posts.ts` y añade una entrada **al principio** del array `POSTS`
(está ordenado de más reciente a más antiguo):

```ts
{
  slug: "titulo-del-articulo",           // será /blog/titulo-del-articulo
  titulo: "Título del artículo",
  descripcion: "Resumen para buscadores y redes, ~155 caracteres.",
  keywords: ["subastas", "mercado automotriz"],
  fecha: "15/marzo/2026",                 // como se muestra
  fechaIso: "2026-03-15",                 // para <time> y JSON-LD
  tag: "Noticias",
  extracto: "Primeras líneas que se ven en el listado…",
  imagenHero: "/uploads/mi-imagen.jpg",   // cabecera a sangre
  imagenCard: "/uploads/mi-imagen.jpg",   // tarjeta del listado
  imagenSquare: "/uploads/mi-imagen.jpg", // barra de populares
  cuerpo: "<p>Primer párrafo.</p><h2>Un subtítulo</h2><p>Más texto.</p>",
}
```

Se actualizan solos:

- La ruta `/blog/titulo-del-articulo`
- El listado y **la paginación** (2 por página; se añaden páginas si hace falta)
- La barra de «Artículos más populares» (los tres primeros del array)
- El destacado de la portada (el segundo del array)
- `sitemap.xml`
- El JSON-LD `BlogPosting` del artículo

**Si añades una imagen nueva a `public/`**, ejecuta después:

```bash
npm run datos
```

Registra sus dimensiones. Sin eso, `<Foto>` lanza un error en el build con el
nombre del archivo que falta — a propósito, para que no llegue a producción una
imagen sin caja reservada.

---

## Añadir una pregunta frecuente

En `data/faqs.ts`, array `FAQS`:

```ts
{
  pregunta: "¿Cuánto tarda el pago?",
  respuesta: "<p>El pago se garantiza en 5 días hábiles.</p>",
  categoria: "Pagos",   // "Subastas" | "Compra" | "Venta" | "Pagos" | null
}
```

`categoria` debe coincidir con un `id` de `CATEGORIAS_FAQ` para que el filtro
la recoja. Con `null` la pregunta sale en «todas» pero en ningún filtro.

Las preguntas entran automáticamente en el JSON-LD `FAQPage`.

Los acordeones de `/como-comprar` y `/como-vender` usan arrays aparte
(`FAQS_COMO_COMPRAR`, `FAQS_COMO_VENDER`) y no aparecen en el filtro.

---

## Añadir una subasta

En `data/subastas.ts`:

```ts
{
  id: "multimarca-2026-04-12",
  titulo: "Subasta Multimarca",
  fecha: "12 abril 2026",
  fechaIso: "2026-04-12",
  sedes: ["Querétaro", "Ciudad de México"],
  imagen: "/uploads/mi-imagen.jpg",
  acciones: [{ label: "Regístrate aquí", href: "https://…", externo: true }],
  estado: "proxima",     // "proxima" | "completada"
}
```

Aparece en el carrusel de la portada, en las páginas de patio y **en el día
correspondiente del calendario**, que se calcula a partir de `fechaIso`.

El carrusel agrupa por `estado` y solo muestra los grupos con contenido.

### Rango de meses del calendario

`/calendario/month/[year]/[month]` solo genera los meses de `RANGO`, en
`lib/calendario.ts`. Para publicar una subasta fuera de ese rango, amplíalo:

```ts
export const RANGO = {
  desde: { anio: 2026, mes: 3 },
  hasta: { anio: 2026, mes: 12 },   // antes: 10
};
```

Las páginas, el selector de meses y el sitemap se ajustan solos.

---

## Añadir o editar un patio

En `data/patios.ts`, array `PATIOS`. Crea también su tarjeta en
`TARJETAS_PATIO` si debe salir en la retícula de la portada.

Las coordenadas son fijas a propósito: el clon geocodificaba la dirección en
cada carga, lo que gastaba una llamada extra a la API de Maps y daba resultados
variables. Sácalas de Google Maps y pégalas.

---

## Editar una página de texto

`/nosotros`, `/como-comprar`, `/como-vender`, `/subastas-bienes-raices` y
`/politica-de-privacidad` viven en `data/paginas.ts`, con su `cuerpo` en HTML y
su bloque `seo`.

Etiquetas que el estilo `.redactor` ya contempla: `h1` (morado, centrado), `h2`
(azul), `strong` (naranja), `ul`/`ol` con viñetas del tema, `p`, `a`, `img`.

`/tipos-de-subastas` y `/metodos-de-pago` tienen sus propios archivos.

---

## Cambiar la navegación

`data/navigation.ts`: barra superior, menú principal, menú móvil y columnas del
pie. **El menú móvil no es un espejo del de escritorio** — en el original tenía
sus propias agrupaciones y se replican tal cual.

---

## Re-extraer desde el clon estático

`npm run datos` vuelve a generar `data/posts.ts`, `data/paginas.ts`,
`data/faqs.ts`, `data/tipos-de-subastas.ts`, `data/metodos-de-pago.ts` y
`lib/imagenes.generado.ts` a partir del clon.

**Sobrescribe esos archivos.** Es útil para regenerar dimensiones de imagen,
pero si ya has editado contenido a mano, perderás los cambios en los archivos
extraídos. Para solo actualizar imágenes:

```bash
node scripts/dimensiones.mjs --ts
```
