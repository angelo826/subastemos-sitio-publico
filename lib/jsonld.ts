import { SITE, SITE_URL } from "@/data/site";

/**
 * Datos estructurados schema.org.
 *
 * El clon emitía este grafo en cada página vía SEOmatic, con todas las URLs
 * apuntando a localhost:8080. Aquí se reconstruye desde SITE_URL y se añade
 * BlogPosting en los artículos, que el original no tenía.
 */

const ID_IDENTITY = `${SITE_URL}/#identity`;
const ID_CREATOR = `${SITE_URL}/#creator`;

/** LocalBusiness: la ficha del negocio. Idéntica en todas las páginas. */
export function localBusiness() {
  return {
    "@id": ID_IDENTITY,
    "@type": "LocalBusiness",
    name: SITE.nombre,
    description: SITE.descripcion,
    url: `${SITE_URL}/`,
    priceRange: "$",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.direccion.calle,
      addressLocality: SITE.direccion.localidad,
      addressRegion: SITE.direccion.region,
      postalCode: SITE.direccion.codigoPostal,
      addressCountry: SITE.direccion.pais,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: String(SITE.geo.lat),
      longitude: String(SITE.geo.lng),
    },
    image: {
      "@type": "ImageObject",
      url: `${SITE_URL}${SITE.logo.url}`,
      width: String(SITE.logo.ancho),
      height: String(SITE.logo.alto),
    },
    openingHoursSpecification: SITE.horarios.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.dias,
      opens: h.abre,
      closes: h.cierra,
    })),
  };
}

interface OpcionesWebSite {
  titulo: string;
  descripcion: string;
  path: string;
  imagen?: string;
  publicadoEn?: string;
  modificadoEn?: string;
}

/** WebSite/WebPage: la página concreta dentro del sitio. */
export function webSite({
  titulo,
  descripcion,
  path,
  imagen,
  publicadoEn,
  modificadoEn,
}: OpcionesWebSite) {
  const url = `${SITE_URL}${path === "/" ? "/" : path}`;
  return {
    "@type": "WebSite",
    name: SITE.nombreCompleto,
    headline: titulo,
    description: descripcion,
    url,
    mainEntityOfPage: url,
    inLanguage: "es-mx",
    author: { "@id": ID_IDENTITY },
    copyrightHolder: { "@id": ID_IDENTITY },
    copyrightYear: SITE.anioCopyright,
    creator: { "@id": ID_CREATOR },
    publisher: { "@id": ID_CREATOR },
    ...(publicadoEn ? { datePublished: publicadoEn } : {}),
    ...(modificadoEn ? { dateModified: modificadoEn } : {}),
    image: {
      "@type": "ImageObject",
      url: `${SITE_URL}${imagen ?? SITE.imagenPorDefecto}`,
    },
  };
}

/** Migas de pan. En el clon solo aparecían en patios y artículos. */
export function breadcrumbs(items: { nombre: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    name: "Breadcrumbs",
    description: "Breadcrumbs list",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.nombre,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

interface OpcionesBlogPosting {
  titulo: string;
  descripcion: string;
  path: string;
  imagen: string;
  publicadoEn: string;
}

/**
 * BlogPosting para artículos. No existía en el clon; se añade porque es lo
 * que permite que un artículo opte a resultados enriquecidos.
 */
export function blogPosting({
  titulo,
  descripcion,
  path,
  imagen,
  publicadoEn,
}: OpcionesBlogPosting) {
  return {
    "@type": "BlogPosting",
    headline: titulo,
    description: descripcion,
    url: `${SITE_URL}${path}`,
    mainEntityOfPage: `${SITE_URL}${path}`,
    inLanguage: "es-mx",
    datePublished: publicadoEn,
    dateModified: publicadoEn,
    image: `${SITE_URL}${imagen}`,
    author: { "@id": ID_IDENTITY },
    publisher: { "@id": ID_IDENTITY },
  };
}

/** Envuelve los nodos en el @graph que espera schema.org. */
export function grafo(...nodos: object[]) {
  return {
    "@context": "http://schema.org",
    "@graph": [...nodos, { "@id": ID_CREATOR, "@type": "Organization" }],
  };
}
