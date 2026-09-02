import { ENLACES_EXTERNOS } from "./site";

/**
 * Estructura de navegación del portal.
 * Fuente: el <header> y el <footer> del clon estático, que son byte-idénticos
 * en las 33 páginas (verificado por md5), por eso viven en el layout raíz.
 */

export interface EnlaceNav {
  label: string;
  href: string;
  /** true para enlaces que salen del sitio (se abren en pestaña nueva). */
  externo?: boolean;
}

export interface GrupoNav {
  label: string;
  /** Si el grupo en sí es clicable además de desplegar. */
  href?: string;
  externo?: boolean;
  items: EnlaceNav[];
}

/** Barra superior, visible solo en desktop (md+). */
export const NAV_SUPERIOR: EnlaceNav[] = [
  { label: "Blog", href: "/blog" },
  { label: "Calendario", href: "/calendario" },
  { label: "Preguntas Frecuentes", href: "/preguntas-frecuentes" },
  { label: "Reserva tu visita", href: "/reservas" },
];

/** Navegación principal de desktop, con sus desplegables. */
export const NAV_PRINCIPAL: (EnlaceNav | GrupoNav)[] = [
  {
    label: "Compra y venta",
    items: [
      { label: "¿Cómo comprar?", href: "/como-comprar" },
      { label: "¿Cómo vender?", href: "/como-vender" },
      { label: "Métodos de pago", href: "/metodos-de-pago" },
    ],
  },
  {
    label: "Tipos de subastas",
    items: [
      { label: "Modalidades de subastas", href: "/tipos-de-subastas" },
      { label: "Subastas Bienes Raíces", href: "/subastas-bienes-raices" },
    ],
  },
  {
    label: "Patios",
    items: [
      { label: "Querétaro", href: "/patios/queretaro" },
      { label: "Ciudad de México", href: "/patios/ciudad-de-mexico" },
    ],
  },
  {
    label: "Subastas",
    href: ENLACES_EXTERNOS.subastas,
    externo: true,
    items: [
      { label: "Ver subastas", href: ENLACES_EXTERNOS.subastas, externo: true },
      { label: "Calendario", href: "/calendario" },
    ],
  },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
];

/**
 * Menú móvil. No es un reflejo del de desktop: el clon lo tenía con su propia
 * estructura y agrupaciones distintas, y se replica tal cual.
 */
export const NAV_MOVIL: (EnlaceNav | GrupoNav)[] = [
  {
    label: "Compra y venta",
    items: [
      { label: "¿Cómo comprar?", href: "/como-comprar" },
      { label: "¿Cómo vender?", href: "/como-vender" },
      { label: "Métodos de pago", href: "/metodos-de-pago" },
    ],
  },
  { label: "Tipos de subastas", href: "/tipos-de-subastas" },
  {
    label: "Subastas",
    items: [
      { label: "Querétaro", href: "/patios/queretaro" },
      { label: "Ciudad de México", href: "/patios/ciudad-de-mexico" },
      { label: "Calendario", href: "/calendario" },
      { label: "Métodos de pago", href: "/metodos-de-pago" },
    ],
  },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Blog", href: "/blog" },
  { label: "Preguntas Frecuentes", href: "/preguntas-frecuentes" },
  { label: "Contacto", href: "/contacto" },
];

export interface ColumnaFooter {
  id: string;
  titulo: string;
  /**
   * El tema oculta ciertos enlaces por breakpoint mediante reglas CSS con
   * selectores de id. Se modela aquí como dato en lugar de replicar ese CSS.
   */
  items: (EnlaceNav & { soloMovil?: boolean })[];
  /** La columna entera desaparece por debajo de sm. */
  ocultarEnMovil?: boolean;
  /** Solo el listado se oculta por debajo de sm; el título permanece. */
  ocultarListaEnMovil?: boolean;
}

export const COLUMNAS_FOOTER: ColumnaFooter[] = [
  {
    id: "compra-y-venta",
    titulo: "COMPRA Y VENTA",
    ocultarListaEnMovil: true,
    items: [
      { label: "¿Cómo comprar?", href: "/como-comprar" },
      { label: "¿Cómo vender?", href: "/como-vender" },
      { label: "Métodos de pago", href: "/metodos-de-pago" },
      { label: "Términos y Condiciones", href: "" },
    ],
  },
  {
    id: "subastas",
    titulo: "SUBASTAS",
    items: [
      { label: "Querétaro", href: "/patios/queretaro" },
      { label: "CDMX", href: "/patios/ciudad-de-mexico" },
      { label: "Calendario de subastas", href: "/calendario" },
      { label: "Tipos de subastas", href: "/tipos-de-subastas", soloMovil: true },
      { label: "Preguntas Frecuentes", href: "/preguntas-frecuentes", soloMovil: true },
      { label: "Terminos y condiciones", href: "", soloMovil: true },
    ],
  },
  {
    id: "recursos",
    titulo: "RECURSOS",
    ocultarEnMovil: true,
    items: [
      { label: "Tipos de subastas", href: "/tipos-de-subastas" },
      { label: "Nosotros", href: "/nosotros" },
      { label: "Blog", href: "/blog" },
      { label: "Preguntas Frecuentes", href: "/preguntas-frecuentes" },
      { label: "Contacto", href: "/contacto" },
    ],
  },
];

/** Discrimina un grupo desplegable de un enlace simple. */
export function esGrupo(item: EnlaceNav | GrupoNav): item is GrupoNav {
  return "items" in item;
}
