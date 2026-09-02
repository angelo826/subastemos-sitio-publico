/**
 * Extrae los artículos del clon estático a data/posts.ts.
 * Script de migración de un solo uso; se conserva como referencia de
 * procedencia de los datos. Ver docs/MIGRACION.md.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const CLON = "C:/Repositories/maltiox-projects/subastemos_mx-all-branches/subastemos-static/site";
const BLOG = join(CLON, "blog");

const m = (html, re) => (re.exec(html)?.[1] ?? "").trim();
const limpiar = (s) => s.replace(/\s+/g, " ").trim();
const basename = (p) => p.split("/").pop();

// Artículos = todo blog/*.html menos las páginas de paginación pN.html
const slugs = readdirSync(BLOG)
  .filter((f) => f.endsWith(".html") && !/^p\d+\.html$/.test(f))
  .map((f) => f.replace(/\.html$/, ""));

// Los extractos y las imágenes de tarjeta solo están en los listados.
const listados = ["blog.html", "blog/p2.html", "blog/p3.html", "blog/p4.html"]
  .map((f) => readFileSync(join(CLON, f), "utf8"))
  .join("\n");

const fichas = new Map();
const orden = [];

// Se usa String.raw para que los escapes del patrón no dependan del escapado
// de la cadena.
const reCard = new RegExp(
  [
    String.raw`<img src="(/uploads/[^"]+)" alt="[^"]*" class="blog__card--img[^"]*"[^>]*>`,
    String.raw`[\s\S]*?<span class="text-bold px-2">\s*([^<]+?)\s*</span>`,
    String.raw`[\s\S]*?<span class="blog__card--tag[^"]*">\s*([^<]+?)\s*</span>`,
    String.raw`[\s\S]*?<h2[^>]*>\s*([^<]+?)\s*</h2>`,
    String.raw`\s*<p class="py-2">\s*([\s\S]*?)\s*</p>`,
    String.raw`[\s\S]*?href="/blog/([^".]+)\.html"`,
  ].join(""),
  "g",
);

for (const c of listados.matchAll(reCard)) {
  const [, imagen, fecha, tag, titulo, extracto, slug] = c;
  if (fichas.has(slug)) continue;
  fichas.set(slug, {
    imagen,
    fecha,
    tag,
    titulo: limpiar(titulo),
    extracto: limpiar(extracto),
  });
  orden.push(slug);
}

const MESES = {
  enero: "01", febrero: "02", marzo: "03", abril: "04", mayo: "05", junio: "06",
  julio: "07", agosto: "08", septiembre: "09", octubre: "10", noviembre: "11", diciembre: "12",
};

function aIso(fecha) {
  const [d, mes, a] = fecha.split("/");
  return `${a}-${MESES[mes.toLowerCase()]}-${d.padStart(2, "0")}`;
}

/** Recortes cuadrados que el clon trajo realmente generados. */
const cuadradas = new Set(readdirSync(join(CLON, "uploads/_square")));

const posts = [];
for (const slug of slugs) {
  const html = readFileSync(join(BLOG, `${slug}.html`), "utf8");
  const ficha = fichas.get(slug);
  if (!ficha) {
    console.warn(`  ! ${slug}: sin ficha en los listados, se omite`);
    continue;
  }

  const cuerpo = m(html, /<div class="blog__content redactorText">([\s\S]*?)<\/div>/);
  const imagenHero = m(
    html,
    /<div class="headerImage container p-5" style="background: no-repeat center url\(\s*([^ )]+)\s*\)/,
  );
  const descripcion = m(html, /<meta name="description" content="([^"]*)"/);
  const keywords = m(html, /<meta name="keywords" content="([^"]*)"/);
  const archivo = basename(ficha.imagen);

  posts.push({
    slug,
    titulo: ficha.titulo,
    descripcion,
    keywords: keywords ? keywords.split(",").map((k) => k.trim()).filter(Boolean) : [],
    fecha: ficha.fecha,
    fechaIso: aIso(ficha.fecha),
    tag: ficha.tag,
    extracto: ficha.extracto,
    imagenHero: imagenHero || ficha.imagen,
    imagenCard: ficha.imagen,
    // Solo tres imágenes tienen recorte cuadrado generado; el resto reutiliza
    // la de tarjeta, que es lo que hacía el listado original.
    imagenSquare: cuadradas.has(archivo) ? `/uploads/_square/${archivo}` : ficha.imagen,
    cuerpo: cuerpo.trim(),
  });
}

// El orden de aparición en los listados es el de publicación descendente.
posts.sort((a, b) => orden.indexOf(a.slug) - orden.indexOf(b.slug));

const ts = `/**
 * Artículos del blog.
 *
 * Extraídos del clon estático con scripts/extraer-posts.mjs. El cuerpo se
 * conserva como HTML porque venía del editor Redactor de Craft; se renderiza
 * dentro del contenedor con estilos \`.redactor\` (ver app/globals.css).
 *
 * El orden del array es el de publicación, de más reciente a más antiguo, y es
 * el que determina la paginación del listado. Para añadir un artículo, ver
 * docs/CONTENIDO.md.
 */

export interface Post {
  slug: string;
  titulo: string;
  descripcion: string;
  keywords: string[];
  /** Fecha como la mostraba el tema: "27/septiembre/2023". */
  fecha: string;
  /** La misma fecha en ISO, para <time datetime> y JSON-LD. */
  fechaIso: string;
  tag: string;
  extracto: string;
  /** Imagen de cabecera del artículo, a sangre. */
  imagenHero: string;
  /** Recorte horizontal, para las tarjetas del listado. */
  imagenCard: string;
  /** Recorte cuadrado, para la barra de artículos populares. */
  imagenSquare: string;
  /** Cuerpo en HTML. */
  cuerpo: string;
}

/** Artículos por página en el listado del blog. Era 2 en el clon. */
export const POSTS_POR_PAGINA = 2;

export const POSTS: Post[] = ${JSON.stringify(posts, null, 2)};

/** Total de páginas del listado. */
export const TOTAL_PAGINAS_BLOG = Math.max(
  1,
  Math.ceil(POSTS.length / POSTS_POR_PAGINA),
);

/** Devuelve los artículos de una página del listado (1-indexada). */
export function postsDePagina(pagina: number): Post[] {
  const inicio = (pagina - 1) * POSTS_POR_PAGINA;
  return POSTS.slice(inicio, inicio + POSTS_POR_PAGINA);
}

export function postPorSlug(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
`;

writeFileSync("data/posts.ts", ts);
console.log(`data/posts.ts: ${posts.length} artículos`);
for (const p of posts) {
  console.log(`  - ${p.slug} (${p.fecha}) cuerpo ${p.cuerpo.length}B  img ${p.imagenCard}`);
}
