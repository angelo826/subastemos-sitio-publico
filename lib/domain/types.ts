/**
 * Modelo de dominio del sitio público.
 *
 * IMPORTANTE: estas formas las define este frontend, no el backend. La
 * aplicación de producción que expondrá los endpoints es un sistema aparte,
 * con su propio ciclo de vida; sus respuestas se traducen a estos tipos en
 * lib/backend/mappers.ts. Si allá cambia el nombre de un campo, se toca un
 * mapper y ni los componentes ni las páginas se enteran.
 *
 * Ver docs/BACKEND.md.
 */

export type { Post } from "@/data/posts";
export type { Patio } from "@/data/patios";
export type { Subasta } from "@/data/subastas";
export type { Faq, CategoriaFaq } from "@/data/faqs";

/**
 * Vehículo del inventario. Todavía no lo sirve nadie: el repositorio devuelve
 * una lista vacía hasta que existan los endpoints. Se define ya para que la
 * futura página /inventario-vehiculos tenga contra qué escribirse.
 */
export interface Vehiculo {
  id: string;
  marca: string;
  modelo: string;
  anio: number;
  version?: string;
  kilometraje?: number;
  /** Patio donde se encuentra la unidad (slug de data/patios.ts). */
  patio?: string;
  /** Identificador de la subasta a la que pertenece el lote. */
  subastaId?: string;
  imagenes: string[];
}

/** Filtros del listado de inventario. */
export interface FiltrosVehiculos {
  patio?: string;
  marca?: string;
  anioMin?: number;
  anioMax?: number;
  pagina?: number;
  porPagina?: number;
}

/** Respuesta paginada genérica. */
export interface Pagina<T> {
  items: T[];
  total: number;
  pagina: number;
  porPagina: number;
}
