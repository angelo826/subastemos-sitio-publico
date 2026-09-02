import type { Metadata } from "next";
import { SITE, SITE_URL } from "@/data/site";

export interface OpcionesSeo {
  /** Título de la página, sin el sufijo del sitio. */
  titulo: string;
  descripcion: string;
  keywords?: string[];
  /** Ruta absoluta desde la raíz, p. ej. "/patios/queretaro". */
  path: string;
  /** Imagen para redes. Ruta desde la raíz. Si se omite, usa la del sitio. */
  imagen?: string;
  /** Texto alternativo de la imagen social. */
  imagenAlt?: string;
  /** "article" para entradas de blog. */
  tipo?: "website" | "article";
  /** Fecha ISO de publicación, solo para artículos. */
  publicadoEn?: string;
  /** Deja la página fuera de los índices (no se usa hoy). */
  noIndex?: boolean;
}

const COMUNES = [
  "450_1000_2023-05-11-201316_arkh.jpg",
  "Nuevos_2023-09-27-182450_elhg.jpg",
  "SCMULTI.jpg",
  "WhatsApp-Image-2023-03-03-at-2.39.10-PM.jpeg",
  "WhatsApp-Image-2023-06-03-at-14.21.00_2023-06-03-203103_rrbq.jpeg",
  "marcela-worldchampionship.jpg",
  "patrullas.jpg",
  "rectangle@3x.webp",
];

/**
 * Variantes de imagen que el clon trajo realmente generadas.
 * Las dos transformaciones no cubren el mismo juego: qro.webp tiene 1200x630
 * pero no 800x418, por eso se listan por separado en lugar de asumir simetría.
 */
const VARIANTES = {
  "_1200x630_crop_center-center_82_none": new Set([...COMUNES, "qro.webp"]),
  "_800x418_crop_center-center_82_none": new Set(COMUNES),
} as const;

type Transform = keyof typeof VARIANTES;

/**
 * Aplica una transformación de Craft a una ruta de /uploads.
 * `/uploads/foo.webp` pasa a `/uploads/<transform>/foo.webp`.
 * Si esa variante no existe en disco, devuelve la ruta original en vez de
 * apuntar a un 404.
 */
function transformar(ruta: string, transform: Transform): string {
  const m = /^\/uploads\/([^/]+)$/.exec(ruta);
  if (!m) return ruta;
  if (!VARIANTES[transform].has(m[1])) return ruta;
  return `/uploads/${transform}/${m[1]}`;
}

/**
 * Construye la metadata de una página.
 *
 * Reemplaza a SEOmatic, que en el clon emitía canonical, og:url y JSON-LD
 * apuntando a http://localhost:8080 porque el volcado se hizo contra un
 * servidor local. Aquí todo cuelga de NEXT_PUBLIC_SITE_URL.
 *
 * Las transformaciones de imagen del original se conservan: Open Graph usa la
 * variante 1200x630 y Twitter la de 800x418.
 */
export function buildMetadata({
  titulo,
  descripcion,
  keywords,
  path,
  imagen,
  imagenAlt,
  tipo = "website",
  publicadoEn,
  noIndex = false,
}: OpcionesSeo): Metadata {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  const base = imagen ?? SITE.imagenPorDefecto;

  const ogImage = transformar(base, "_1200x630_crop_center-center_82_none");
  const twitterImage = transformar(base, "_800x418_crop_center-center_82_none");

  return {
    title: titulo,
    description: descripcion,
    keywords,
    authors: [{ name: SITE.autor }],
    referrer: "no-referrer-when-downgrade",
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    alternates: { canonical: url },
    openGraph: {
      type: tipo,
      locale: SITE.locale,
      siteName: SITE.nombreCompleto,
      url,
      title: titulo,
      description: descripcion,
      ...(publicadoEn ? { publishedTime: publicadoEn } : {}),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          ...(imagenAlt ? { alt: imagenAlt } : {}),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titulo,
      description: descripcion,
      images: [
        {
          url: twitterImage,
          width: 800,
          height: 418,
          ...(imagenAlt ? { alt: imagenAlt } : {}),
        },
      ],
    },
  };
}
