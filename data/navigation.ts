import { ENLACES_EXTERNOS } from "./site";
import { SUBASTAS_PROXIMAS } from "./subastas";
import { PATIOS } from "./patios";

/**
 * Estructura de navegación del portal.
 * El pie sigue el <footer> del clon estático; la cabecera se rediseñó en
 * oct-2026 a partir del layout que envió el cliente.
 */

export interface EnlaceNav {
  label: string;
  href: string;
  /** true para enlaces que salen del sitio (se abren en pestaña nueva). */
  externo?: boolean;
  /** Texto secundario bajo el rótulo, p. ej. la sede de una subasta. */
  detalle?: string;
}

export interface GrupoNav {
  label: string;
  items: EnlaceNav[];
}

const MESES_CORTOS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

/** "2026-10-20" → "20 oct 2026". */
function fechaCorta(iso: string): string {
  const [anio, mes, dia] = iso.split("-").map(Number);
  return `${dia} ${MESES_CORTOS[mes - 1]} ${anio}`;
}

/**
 * Desplegable «Próximas subastas»: una entrada por fecha, que lleva a la
 * plataforma donde se participa (pedido del cliente, oct-2026). El calendario
 * va aparte, en su propio enlace, porque puede reunir otros tipos de subasta.
 */
const PROXIMAS: EnlaceNav[] = [
  ...[...SUBASTAS_PROXIMAS]
    .map((s) => ({
      label: s.hora ? `${fechaCorta(s.fechaIso)} · ${s.hora} h` : fechaCorta(s.fechaIso),
      detalle: s.sedes.length > 0 ? `${s.titulo} · ${s.sedes.join(" y ")}` : s.titulo,
      href: s.acciones.find((a) => a.externo)?.href ?? ENLACES_EXTERNOS.subastas,
      externo: true,
    })),
  { label: "Ver todas las subastas", href: ENLACES_EXTERNOS.subastas, externo: true },
];

/**
 * Navegación principal, la misma en desktop y en móvil.
 *
 * Rediseño 2026: el cliente pidió que lo primero fuera quién es Subastemos y
 * no el blog o el calendario, así que desaparece la barra superior del tema
 * original y el blog y las FAQ pasan al grupo «Nosotros».
 */
export const NAV_PRINCIPAL: (EnlaceNav | GrupoNav)[] = [
  {
    label: "Comprar",
    items: [
      { label: "¿Cómo comprar?", href: "/como-comprar" },
      { label: "Tipos de subastas", href: "/tipos-de-subastas" },
      { label: "Subastas de bienes raíces", href: "/subastas-bienes-raices" },
      { label: "Métodos de pago", href: "/metodos-de-pago" },
    ],
  },
  { label: "Vender", href: "/como-vender" },
  { label: "Marcas", href: "/#marcas" },
  { label: "Próximas subastas", items: PROXIMAS },
  { label: "Calendario", href: "/calendario" },
  {
    label: "Patios",
    items: [
      ...PATIOS.map((p) => ({ label: p.nombre, href: `/patios/${p.slug}` })),
      { label: "Reserva tu visita", href: "/reservas" },
    ],
  },
  {
    label: "Nosotros",
    items: [
      { label: "Quiénes somos", href: "/nosotros" },
      { label: "Blog", href: "/blog" },
      { label: "Preguntas frecuentes", href: "/preguntas-frecuentes" },
      { label: "Contacto", href: "/contacto" },
    ],
  },
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
    titulo: "PATIOS",
    items: [
      ...PATIOS.map((p) => ({ label: p.nombre, href: `/patios/${p.slug}` })),
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
