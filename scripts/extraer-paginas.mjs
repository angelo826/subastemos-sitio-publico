/**
 * Extrae el contenido editorial del clon estático a data/paginas.ts,
 * data/faqs.ts, data/tipos-de-subastas.ts y data/metodos-de-pago.ts.
 *
 * Script de migración de un solo uso; se conserva como referencia de
 * procedencia de los datos. Ver docs/MIGRACION.md.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const CLON = "C:/Repositories/maltiox-projects/subastemos_mx-all-branches/subastemos-static/site";
const leer = (f) => readFileSync(join(CLON, f), "utf8");
const uno = (html, re) => (re.exec(html)?.[1] ?? "").trim();
const limpiar = (s) => s.replace(/\s+/g, " ").trim();

/** Los enlaces internos del clon acaban en .html; aquí son URLs limpias. */
function limpiarEnlaces(html) {
  return html
    .replace(/href="\/index\.html"/g, 'href="/"')
    .replace(/href="\/([^"]+)\.html"/g, 'href="/$1"');
}

function seo(html) {
  return {
    titulo: uno(html, /<title>([^<]*)<\/title>/).replace(/\s*\|\s*Subastemos.*$/, "").trim(),
    descripcion: uno(html, /<meta name="description" content="([^"]*)"/),
    keywords: uno(html, /<meta name="keywords" content="([^"]*)"/)
      .split(",").map((k) => k.trim()).filter(Boolean),
  };
}

// ───────────────────────────────────────────────────────────── páginas editoriales

const EDITORIALES = [
  { slug: "nosotros", ruta: "nosotros.html", h1EnCuerpo: true },
  { slug: "como-comprar", ruta: "como-comprar.html", h1EnCuerpo: true },
  { slug: "como-vender", ruta: "como-vender.html", h1EnCuerpo: true },
  { slug: "subastas-bienes-raices", ruta: "subastas-bienes-raices.html", h1EnCuerpo: true },
  { slug: "politica-de-privacidad", ruta: "politica-de-privacidad.html", h1EnCuerpo: true },
];

const paginas = {};
for (const p of EDITORIALES) {
  const html = leer(p.ruta);
  const cuerpo =
    uno(html, /<div class="redactorText">([\s\S]*?)<\/div>\s*<\/div>/) ||
    uno(html, /<div class="blog__content redactorText">([\s\S]*?)<\/div>\s*<\/div>/);
  paginas[p.slug] = { seo: seo(html), cuerpo: limpiarEnlaces(cuerpo.trim()) };
}

writeFileSync(
  "data/paginas.ts",
  `/**
 * Contenido editorial de las páginas de texto largo.
 *
 * El cuerpo viaja como HTML porque venía del editor Redactor de Craft; se
 * renderiza dentro del contenedor con estilos \`.redactor\` (ver globals.css).
 * Extraído con scripts/extraer-paginas.mjs.
 */

export interface PaginaEditorial {
  seo: { titulo: string; descripcion: string; keywords: string[] };
  /** Cuerpo en HTML, con el h1 incluido. */
  cuerpo: string;
}

export const PAGINAS: Record<string, PaginaEditorial> = ${JSON.stringify(paginas, null, 2)};
`,
);
console.log(`data/paginas.ts: ${Object.keys(paginas).length} páginas`);

// ───────────────────────────────────────────────────────────── tipos de subastas

const htmlTipos = leer("tipos-de-subastas.html");
const tipos = [];
const reTipo = new RegExp(
  [
    String.raw`<div class="tipoDeSubasta__title[^"]*"[^>]*>\s*<h3[^>]*>\s*([^<]+?)\s*</h3>`,
    String.raw`[\s\S]*?<div class="tipoDeSubasta__description">\s*<p[^>]*>\s*([\s\S]*?)\s*</p>`,
  ].join(""),
  "g",
);
for (const t of htmlTipos.matchAll(reTipo)) {
  tipos.push({ titulo: limpiar(t[1]), descripcion: limpiar(t[2]) });
}

writeFileSync(
  "data/tipos-de-subastas.ts",
  `/** Modalidades de subasta. Fuente: tipos-de-subastas.html del clon. */

export interface TipoDeSubasta {
  titulo: string;
  descripcion: string;
}

export const SEO_TIPOS = ${JSON.stringify(seo(htmlTipos), null, 2)};

export const TITULO_TIPOS = ${JSON.stringify(uno(htmlTipos, /<h1 class="text-title text-purple text-center py-4">\s*([^<]+?)\s*<\/h1>/))};

export const TIPOS_DE_SUBASTA: TipoDeSubasta[] = ${JSON.stringify(tipos, null, 2)};
`,
);
console.log(`data/tipos-de-subastas.ts: ${tipos.length} modalidades`);

// ───────────────────────────────────────────────────────────── métodos de pago

const htmlPagos = leer("metodos-de-pago.html");
const metodos = [];
const reMetodo = new RegExp(
  [
    String.raw`<img src="(/uploads/[^"]+)" alt="([^"]*)" class="img-fluid metodosDePago__img"\s*/>`,
    String.raw`[\s\S]*?<span class="text-white text-bold my-auto px-4">\s*([^<]+?)\s*</span>`,
    String.raw`[\s\S]*?<div class="collapse px-5" id="[^"]*">\s*<p class="py-2">\s*([\s\S]*?)\s*</p>\s*</div>`,
  ].join(""),
  "g",
);
for (const p of htmlPagos.matchAll(reMetodo)) {
  metodos.push({
    icono: p[1],
    titulo: limpiar(p[3]),
    contenido: p[4].trim(),
  });
}

writeFileSync(
  "data/metodos-de-pago.ts",
  `/** Métodos de pago aceptados. Fuente: metodos-de-pago.html del clon. */

export interface MetodoDePago {
  icono: string;
  titulo: string;
  /** Contenido en HTML: viene del editor del CMS. */
  contenido: string;
}

export const SEO_PAGOS = ${JSON.stringify(seo(htmlPagos), null, 2)};

export const TITULO_PAGOS = ${JSON.stringify(uno(htmlPagos, /<h1 class="text-center text-title text-purple">\s*([^<]+?)\s*<\/h1>/))};

export const METODOS_DE_PAGO: MetodoDePago[] = ${JSON.stringify(metodos, null, 2)};
`,
);
console.log(`data/metodos-de-pago.ts: ${metodos.length} métodos`);

// ───────────────────────────────────────────────────────────── preguntas frecuentes

const reFaq = new RegExp(
  [
    String.raw`<span class="text-purple text-bold">\s*([\s\S]*?)\s*</span>`,
    String.raw`[\s\S]*?<div class="collapse" id="[^"]*">\s*<p class="px-5 py-2">\s*([\s\S]*?)\s*</p>\s*</div>`,
  ].join(""),
  "g",
);

/**
 * Categoría de cada pregunta.
 *
 * El volcado estático perdió esta relación: los filtros del clon solo añadían
 * ?category= a la URL y el listado nunca cambiaba. Se reconstruye aquí a mano,
 * a partir del contenido de cada pregunta, para que el filtro funcione de
 * verdad. Es un criterio nuestro, no un dato heredado; queda anotado en
 * docs/MIGRACION.md.
 */
const CATEGORIA_POR_PREGUNTA = {
  "¿Puedo ir a ver las unidades antes de la subasta?": "Subastas",
  "¿Cuánto tiempo duran las subastas?": "Subastas",
  "¿Tienen subastas presenciales?": "Subastas",
  "¿Cómo asisto a las subastas presenciales?": "Subastas",
  "¿Cuándo llegará mi estado de cuenta?": "Pagos",
  "¿Qué métodos de pago aceptan?": "Pagos",
};

function faqsDe(html) {
  return [...html.matchAll(reFaq)].map((f) => {
    const pregunta = limpiar(f[1]);
    return {
      pregunta,
      respuesta: f[2].trim(),
      categoria: CATEGORIA_POR_PREGUNTA[pregunta] ?? null,
    };
  });
}

const htmlFaq = leer("preguntas-frecuentes.html");

// Categorías: los filtros circulares de la parte superior.
const categorias = [];
const reCat = new RegExp(
  String.raw`<img src="(/uploads/[^"]+)" alt="([^"]*)" class="preguntasFrecuentes__filtros--img[^"]*"\s*/>`,
  "g",
);
for (const c of htmlFaq.matchAll(reCat)) {
  categorias.push({ id: c[2], nombre: c[2], icono: c[1] });
}

writeFileSync(
  "data/faqs.ts",
  `/**
 * Preguntas frecuentes.
 *
 * En el clon, los filtros circulares solo añadían ?category= a la URL sin
 * filtrar nada: el listado siempre mostraba las mismas preguntas, porque el
 * volcado estático perdió la consulta del CMS. Aquí las preguntas llevan su
 * categoría como dato y el filtro funciona de verdad.
 *
 * Extraído con scripts/extraer-paginas.mjs.
 */

export interface Faq {
  pregunta: string;
  /** Respuesta en HTML: viene del editor del CMS. */
  respuesta: string;
  /** id de la categoría, o null si no está clasificada. */
  categoria: string | null;
}

export interface CategoriaFaq {
  id: string;
  nombre: string;
  icono: string;
}

export const SEO_FAQ = ${JSON.stringify(seo(htmlFaq), null, 2)};

export const CATEGORIAS_FAQ: CategoriaFaq[] = ${JSON.stringify(categorias, null, 2)};

export const FAQS: Faq[] = ${JSON.stringify(
    faqsDe(htmlFaq),
    null,
    2,
  )};

/** Acordeones incrustados en /como-comprar y /como-vender. */
export const FAQS_COMO_COMPRAR: Faq[] = ${JSON.stringify(
    faqsDe(leer("como-comprar.html")),
    null,
    2,
  )};

export const FAQS_COMO_VENDER: Faq[] = ${JSON.stringify(
    faqsDe(leer("como-vender.html")),
    null,
    2,
  )};
`,
);
console.log(
  `data/faqs.ts: ${faqsDe(htmlFaq).length} preguntas, ${categorias.length} categorías, ` +
    `${faqsDe(leer("como-comprar.html")).length} en como-comprar, ` +
    `${faqsDe(leer("como-vender.html")).length} en como-vender`,
);
