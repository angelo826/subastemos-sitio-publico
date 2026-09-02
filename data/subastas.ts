/**
 * Subastas mostradas en el carrusel del inicio y de las páginas de patio.
 *
 * Fuente: los slides de `.subastas__swiper` del clon. Cuando llegue el backend,
 * este archivo lo sustituye `subastasRepository` sin tocar los componentes.
 * Ver docs/BACKEND.md.
 */

export interface Subasta {
  id: string;
  titulo: string;
  /** Fecha como la mostraba el tema: "25 mayo 2023". */
  fecha: string;
  /** La misma fecha en ISO, para ordenar y para <time>. */
  fechaIso: string;
  /** Sedes donde se celebra. El tema las une con "y". */
  sedes: string[];
  /** Imagen de fondo del slide. */
  imagen: string;
  /** Botones del slide. El clon no los mostraba en todas las subastas. */
  acciones: { label: string; href: string; externo?: boolean }[];
  /** Estado. Hoy todas las del clon están completadas. */
  estado: "proxima" | "completada";
}

export const SUBASTAS: Subasta[] = [
  {
    id: "multimarca-2023-05-25",
    titulo: "Subasta Multimarca 25 de mayo 2023",
    fecha: "25 mayo 2023",
    fechaIso: "2023-05-25",
    sedes: ["Querétaro", "Ciudad de México"],
    imagen: "/uploads/vista-lateral-autos-nuevos-vender.jpg",
    acciones: [],
    estado: "completada",
  },
  {
    id: "multimarca-cronometrada-2023-03-30",
    titulo: "Subasta Multimarca Cronometrada",
    fecha: "30 marzo 2023",
    fechaIso: "2023-03-30",
    sedes: ["Querétaro", "Ciudad de México"],
    imagen: "/uploads/resumen-borroso-aparcamiento-coches.jpg",
    acciones: [
      {
        label: "Regístrate aquí",
        href: "https://subastas.subastemos.mx/register.aspx?returnurl=https%3a%2f%2fsubastas.subastemos.mx%2fauctionlist.aspx%3fdv%3d1&tr=0",
        externo: true,
      },
      { label: "Vista de revisión", href: "/calendario" },
    ],
    estado: "completada",
  },
];

export const SUBASTAS_COMPLETADAS = SUBASTAS.filter((s) => s.estado === "completada");
export const SUBASTAS_PROXIMAS = SUBASTAS.filter((s) => s.estado === "proxima");
