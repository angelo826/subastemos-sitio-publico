import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";
import { POSTS, TOTAL_PAGINAS_BLOG } from "@/data/posts";
import { PATIOS } from "@/data/patios";
import { mesesDelRango, rutaMes } from "@/lib/calendario";

/**
 * Mapa del sitio. El clon no tenía ninguno.
 *
 * Se construye desde las mismas fuentes que generan las rutas, así que no puede
 * desincronizarse del árbol real ni depende de que ningún servicio responda.
 */

const FIJAS = [
  { path: "/", prioridad: 1.0 },
  { path: "/como-comprar", prioridad: 0.8 },
  { path: "/como-vender", prioridad: 0.8 },
  { path: "/metodos-de-pago", prioridad: 0.7 },
  { path: "/tipos-de-subastas", prioridad: 0.7 },
  { path: "/subastas-bienes-raices", prioridad: 0.7 },
  { path: "/nosotros", prioridad: 0.6 },
  { path: "/contacto", prioridad: 0.6 },
  { path: "/preguntas-frecuentes", prioridad: 0.6 },
  { path: "/reservas", prioridad: 0.6 },
  { path: "/calendario", prioridad: 0.7 },
  { path: "/blog", prioridad: 0.8 },
  { path: "/politica-de-privacidad", prioridad: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();

  return [
    ...FIJAS.map((f) => ({
      url: `${SITE_URL}${f.path === "/" ? "" : f.path}`,
      lastModified: ahora,
      changeFrequency: "monthly" as const,
      priority: f.prioridad,
    })),

    ...PATIOS.map((p) => ({
      url: `${SITE_URL}/patios/${p.slug}`,
      lastModified: ahora,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),

    ...POSTS.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.fechaIso),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),

    ...Array.from({ length: TOTAL_PAGINAS_BLOG - 1 }, (_, i) => ({
      url: `${SITE_URL}/blog/pagina/${i + 2}`,
      lastModified: ahora,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    })),

    ...mesesDelRango().map(({ anio, mes }) => ({
      url: `${SITE_URL}${rutaMes(anio, mes)}`,
      lastModified: ahora,
      changeFrequency: "weekly" as const,
      priority: 0.4,
    })),
  ];
}
