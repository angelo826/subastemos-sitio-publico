import { WHATSAPP_URL } from "./site";

/**
 * Patios físicos de Subastemos.
 *
 * Fuente: el cliente (WhatsApp, 12-oct-2026), en este orden: Cancún, Monterrey,
 * Guadalajara, CDMX, Querétaro y Mérida. Sustituye a los dos patios del clon
 * (Querétaro en Paseo Constituyentes y CDMX en Periférico Sur), que ya no
 * corresponden.
 *
 * PROVISIONAL:
 * - Las coordenadas salen de OpenStreetMap a partir de la dirección. Solo la de
 *   Guadalajara es exacta; las demás son aproximadas (código postal o calle)
 *   hasta tener la ubicación de Google Maps de cada patio.
 * - Las fotos son de archivo hasta que el cliente envíe las de cada patio.
 * - Todos usan el teléfono y el WhatsApp generales.
 */

export interface Patio {
  slug: string;
  /** Nombre corto, el del H1, el menú y las tarjetas del inicio. */
  nombre: string;
  /** Municipio y estado, para la tarjeta del inicio. */
  ubicacion: string;
  direccion: string;
  coordenadas: { lat: number; lng: number };
  /** Foto de la cabecera de su página y de su tarjeta en el inicio. */
  imagen: string;
  telefono: string;
  whatsapp: string;
  /** SEO propio de la página. */
  seo: { titulo: string; descripcion: string; keywords: string[] };
}

const TELEFONO = "524462265588";

/** Construye un patio con los campos que se derivan del nombre y la dirección. */
function patio(
  datos: Omit<Patio, "telefono" | "whatsapp" | "seo"> & { keywords?: string[] },
): Patio {
  const { keywords = [], ...resto } = datos;
  return {
    ...resto,
    telefono: TELEFONO,
    whatsapp: WHATSAPP_URL,
    seo: {
      titulo: `Patio ${datos.nombre}`,
      descripcion: `Conoce nuestro patio en ${datos.nombre}: ${datos.direccion}`,
      keywords: [datos.nombre, ...keywords, "patio", "subastas"],
    },
  };
}

export const PATIOS: Patio[] = [
  patio({
    slug: "cancun",
    nombre: "Cancún",
    ubicacion: "Cancún, Q. Roo",
    direccion: "Av. Cancún #14, El Pedregal, C.P. 77536, Cancún, Quintana Roo.",
    coordenadas: { lat: 21.1111, lng: -86.8848 },
    imagen: "/uploads/card-img-1.webp",
  }),
  patio({
    slug: "monterrey",
    nombre: "Monterrey",
    ubicacion: "Escobedo, N.L.",
    direccion:
      "Parque Industrial Centro Logístico Libramiento II, Av. Centro Logístico II Oriente, Bodega #402, C.P. 66064, Escobedo, Nuevo León.",
    coordenadas: { lat: 25.8489, lng: -100.3834 },
    imagen: "/uploads/resumen-borroso-aparcamiento-coches.jpg",
  }),
  patio({
    slug: "guadalajara",
    nombre: "Guadalajara",
    ubicacion: "San Agustín, Jal.",
    direccion:
      "Parque Industrial Hydrotek Ecológico, C. Niños Héroes 603, C.P. 45645, San Agustín, Jalisco.",
    coordenadas: { lat: 20.555, lng: -103.4567 },
    imagen: "/uploads/vista-lateral-autos-nuevos-vender.jpg",
  }),
  patio({
    // Se conserva el slug histórico: /patios/ciudad-de-mexico ya existía.
    slug: "ciudad-de-mexico",
    nombre: "Ciudad de México",
    ubicacion: "Nextlalpan, Edo. Méx.",
    direccion:
      "Carretera Teoloyucan-Nextlalpan #343, Ejido Santa Ana Nextlalpan, Municipio de Nextlalpan, Estado de México, C.P. 55795.",
    coordenadas: { lat: 19.741, lng: -99.0764 },
    imagen: "/uploads/card-img-2.webp",
    keywords: ["CDMX", "Estado de México"],
  }),
  patio({
    slug: "queretaro",
    nombre: "Querétaro",
    ubicacion: "Querétaro, Qro.",
    direccion: "Carretera Querétaro - San Luis Potosí km 17.5, C.P. 76226, Santiago de Querétaro, Qro.",
    coordenadas: { lat: 20.7194, lng: -100.4389 },
    imagen: "/uploads/hero-image@3x.webp",
  }),
  patio({
    slug: "merida",
    nombre: "Mérida",
    ubicacion: "Mérida, Yuc.",
    direccion: "Calle 19 #303 por 30 y 32, C.P. 97205, Mérida, Yucatán.",
    coordenadas: { lat: 21.0164, lng: -89.6376 },
    imagen: "/uploads/home-img33.jpg",
  }),
];

export function patioPorSlug(slug: string): Patio | undefined {
  return PATIOS.find((p) => p.slug === slug);
}
