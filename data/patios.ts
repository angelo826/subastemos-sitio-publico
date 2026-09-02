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
    imagenHero: "/uploads/qro.webp",
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
    imagenHero: "/uploads/qro.webp",
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
 * Retícula de patios del inicio. Incluye Puebla, que aparece en el clon como
 * sede anunciada pero sin página propia ni enlaces activos.
 */
export interface TarjetaPatio {
  nombre: string;
  imagen: string;
  href?: string;
  /** Puebla se muestra sin enlaces: solo el rótulo. */
  proximamente?: boolean;
}

export const TARJETAS_PATIO: TarjetaPatio[] = [
  {
    nombre: "Puebla",
    imagen: "/uploads/_rectangle/Puebla-Subastemos.webp",
    proximamente: true,
  },
  {
    nombre: "CDMX",
    imagen: "/uploads/_rectangle/Cdmx-Subastemos.webp",
    href: "/patios/ciudad-de-mexico",
  },
  {
    nombre: "Querétaro",
    imagen: "/uploads/_rectangle/Qro-Subastemos.webp",
    href: "/patios/queretaro",
  },
];
