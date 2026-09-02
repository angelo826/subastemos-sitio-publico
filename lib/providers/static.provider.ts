import { POSTS, postPorSlug, postsDePagina, POSTS_POR_PAGINA } from "@/data/posts";
import { PATIOS, patioPorSlug } from "@/data/patios";
import { SUBASTAS } from "@/data/subastas";
import { FAQS, CATEGORIAS_FAQ } from "@/data/faqs";
import type { Pagina, Vehiculo, FiltrosVehiculos } from "@/lib/domain/types";
import type { Proveedor } from "./tipos";

/**
 * Provider estático: sirve el contenido desde data/*.ts.
 *
 * Es el provider activo hoy. Todo el contenido vive en el repositorio, así que
 * las páginas se construyen enteras en el build y no dependen de ninguna red.
 */
export const staticProvider: Proveedor = {
  posts: {
    listar: async () => POSTS,
    porSlug: async (slug) => postPorSlug(slug) ?? null,
    porPagina: async (pagina) => ({
      items: postsDePagina(pagina),
      total: POSTS.length,
      pagina,
      porPagina: POSTS_POR_PAGINA,
    }),
  },

  patios: {
    listar: async () => PATIOS,
    porSlug: async (slug) => patioPorSlug(slug) ?? null,
  },

  subastas: {
    listar: async () => SUBASTAS,
    // El clon mostraba las mismas subastas en ambos patios: no había relación
    // sede-subasta en los datos volcados.
    porPatio: async () => SUBASTAS,
  },

  faqs: {
    listar: async () => FAQS,
    categorias: async () => CATEGORIAS_FAQ,
  },

  vehiculos: {
    /**
     * Sin datos hasta que existan los endpoints del backend. Devuelve una
     * página vacía en lugar de lanzar, para que la futura página de inventario
     * renderice su estado vacío sin ningún caso especial.
     */
    listar: async (filtros: FiltrosVehiculos = {}): Promise<Pagina<Vehiculo>> => ({
      items: [],
      total: 0,
      pagina: filtros.pagina ?? 1,
      porPagina: filtros.porPagina ?? 24,
    }),
    porId: async () => null,
  },
};
