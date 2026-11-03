/**
 * Datos de negocio del portal. Fuente: el JSON-LD de LocalBusiness que
 * SEOmatic emitía en cada página del clon estático, más los enlaces salientes
 * que aparecían en el header, el footer y los botones de acción.
 */

export const SITE = {
  nombre: "Subastemos",
  /** Aparece en og:site_name. Los emoji son parte del nombre en el original. */
  nombreCompleto: "Subastemos 🚘💰",
  autor: "Brand Industry",
  locale: "es_MX",
  lang: "es-MX",
  anioCopyright: "2022",

  descripcion:
    "Compra o vende a través de métodos innovadores y confiables, con garantía de pago de tus bienes en 5 días hábiles. Encuéntranos en Cancún, Monterrey, Guadalajara, Ciudad de México, Querétaro y Mérida.",

  /**
   * Oficina, no patio (confirmado por el cliente, oct-2026). Alimenta el
   * JSON-LD LocalBusiness y el mapa de /contacto. Los patios están en
   * data/patios.ts.
   */
  direccion: {
    calle: "Av. Paseo Constituyentes 1621, El Pueblito",
    localidad: "El Pueblito",
    region: "Querétaro",
    codigoPostal: "76904",
    pais: "Mexico",
  },

  geo: {
    lat: 20.53433,
    lng: -100.45095,
  },

  /** Lunes a viernes 10–19, sábado 10–15. Domingo cerrado. */
  horarios: [
    { dias: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], abre: "10:00:00", cierra: "19:00:00" },
    { dias: ["Saturday"], abre: "10:00:00", cierra: "15:00:00" },
  ],

  whatsapp: {
    telefono: "524462265588",
    mensaje: "Hola, vengo de su sitio web y requiero información de:",
  },

  logo: {
    url: "/uploads/logo-color.svg",
    ancho: 214,
    alto: 25,
  },

  /** Imagen por defecto para Open Graph cuando la página no define una. */
  imagenPorDefecto: "/uploads/rectangle@3x.webp",
} as const;

/**
 * Plataforma de subastas. Es un sistema aparte: todos estos enlaces salen del
 * sitio y se abren en pestaña nueva.
 */
const PLATAFORMA = "https://subastas.subastemos.mx";
const RETORNO_SUBASTAS = encodeURIComponent(`${PLATAFORMA}/auctionlist.aspx?dv=1`);

export const ENLACES_EXTERNOS = {
  registro: `${PLATAFORMA}/register.aspx?returnurl=${RETORNO_SUBASTAS}`,
  registroContacto: `${PLATAFORMA}/register.aspx?returnurl=${encodeURIComponent(`${PLATAFORMA}/contact.aspx`)}`,
  login: `${PLATAFORMA}/login.aspx?returnurl=${RETORNO_SUBASTAS}`,
  /**
   * Listado general. El enlace de una subasta concreta va en sus `acciones`
   * (data/subastas.ts), para que este no caduque cuando la subasta termine.
   */
  subastas: `${PLATAFORMA}/auctionlist.aspx?dv=2`,
  subastasDv1: `${PLATAFORMA}/auctionlist.aspx?dv=1`,
  inventario: `${PLATAFORMA}/search.aspx`,
} as const;

/** URL de WhatsApp con el mensaje pre-cargado, tal como en el clon. */
export const WHATSAPP_URL = `https://api.whatsapp.com/send?phone=${SITE.whatsapp.telefono}&text=${encodeURIComponent(SITE.whatsapp.mensaje)}`;

/** Dominio canónico. Sin barra final. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:8080"
).replace(/\/$/, "");
