import { WHATSAPP_URL } from "./site";

/**
 * Patios físicos donde se celebran las subastas.
 * Fuente: las páginas /patios/*.html del clon.
 */

export interface Patio {
  slug: string;
  /** Nombre corto, el del H1 y las tarjetas del inicio. */
  nombre: string;
  /** Rótulo del bloque de dirección: "Patio Premium" en Querétaro. */
  tituloBloque: string;
  direccion: string;
  coordenadas: { lat: number; lng: number };
  /** Imagen a sangre de la cabecera. */
  imagenHero: string;
  /** Recorte para la retícula de patios del inicio. */
  imagenTarjeta: string;
  telefono: string;
  whatsapp: string;
  /** SEO propio de la página. */
  seo: { titulo: string; descripcion: string; keywords: string[] };
}

export const PATIOS: Patio[] = [
  {
    slug: "queretaro",
    nombre: "Querétaro",
    tituloBloque: "Patio Premium",
    direccion:
      "Av. Paseo Constituyentes 1621, El Pueblito, C.P. 76904. El Pueblito, Qro.",
    // El clon geocodificaba la dirección en cada carga; aquí las coordenadas
    // son fijas para no depender de una llamada extra a la API de Maps.
    coordenadas: { lat: 20.5369, lng: -100.4353 },
    // PROVISIONAL (oct-2026): el cliente pidió fotos de autos en lugar de la
    // ciudad; foto de archivo hasta que envíe la del patio.
    imagenHero: "/uploads/hero-image@3x.webp",
    imagenTarjeta: "/uploads/_rectangle/Qro-Subastemos.webp",
    telefono: "524462265588",
    whatsapp: WHATSAPP_URL,
    seo: {
      titulo: "Patio Querétaro",
      descripcion:
        "Conoce nuestro patio en Querétaro. Patio Premium: Av. Paseo Constituyentes 1621, El Pueblito, C.P. 76904. El Pueblito, Qro.",
      keywords: ["Querétaro", "patio", "subastas"],
    },
  },
  {
    slug: "ciudad-de-mexico",
    nombre: "Ciudad de México",
    tituloBloque: "Patio",
    direccion:
      "Periférico Sur 2004, San Bartolo Chico, Alcaldía Tlalpan, Ciudad de México. CP. 14380",
    coordenadas: { lat: 19.2949, lng: -99.1861 },
    imagenHero: "/uploads/card-img-2.webp",
    imagenTarjeta: "/uploads/_rectangle/Cdmx-Subastemos.webp",
    telefono: "524462265588",
    whatsapp: WHATSAPP_URL,
    seo: {
      titulo: "Patio Ciudad de México",
      descripcion:
        "Conoce nuestro patio en Ciudad de México: Periférico Sur 2004, San Bartolo Chico, Alcaldía Tlalpan, Ciudad de México. CP. 14380",
      keywords: ["Ciudad de México", "CDMX", "patio", "subastas"],
    },
  },
];

export function patioPorSlug(slug: string): Patio | undefined {
  return PATIOS.find((p) => p.slug === slug);
}

/**
 * Retícula de patios del inicio.
 *
 * Rediseño oct-2026: el cliente tiene cuatro patios y pidió fotos de autos en
 * lugar de la ciudad. PROVISIONAL hasta que envíe la información y las fotos
 * de cada patio: las imágenes son de archivo y los dos patios sin página se
 * muestran como «Próximamente».
 */
export interface TarjetaPatio {
  nombre: string;
  imagen: string;
  /** Línea corta bajo el nombre. */
  detalle: string;
  href?: string;
  /** Patio anunciado sin página propia todavía. */
  proximamente?: boolean;
}

export const TARJETAS_PATIO: TarjetaPatio[] = [
  {
    nombre: "Querétaro",
    imagen: "/uploads/hero-image@3x.webp",
    detalle: "Patio Premium · El Pueblito",
    href: "/patios/queretaro",
  },
  {
    nombre: "Ciudad de México",
    imagen: "/uploads/card-img-2.webp",
    detalle: "Periférico Sur · Tlalpan",
    href: "/patios/ciudad-de-mexico",
  },
  {
    nombre: "Monterrey",
    imagen: "/uploads/card-img-1.webp",
    detalle: "Información próximamente",
    proximamente: true,
  },
  {
    nombre: "Puebla",
    imagen: "/uploads/resumen-borroso-aparcamiento-coches.jpg",
    detalle: "Información próximamente",
    proximamente: true,
  },
];
