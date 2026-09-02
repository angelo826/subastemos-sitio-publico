import type {
  Post,
  Patio,
  Subasta,
  Faq,
  CategoriaFaq,
  Vehiculo,
  FiltrosVehiculos,
  Pagina,
} from "@/lib/domain/types";

/**
 * Contrato que cumple todo provider de datos.
 *
 * Hoy lo implementa `staticProvider` (lee data/*.ts). Cuando existan los
 * endpoints públicos del backend, `apiProvider` implementará lo mismo y el
 * cambio será una línea en lib/repositories/index.ts.
 *
 * Todos los métodos son asíncronos aunque el provider estático sea síncrono:
 * así la firma no cambia al llegar el backend.
 */
export interface Proveedor {
  posts: {
    listar(): Promise<Post[]>;
    porSlug(slug: string): Promise<Post | null>;
    porPagina(pagina: number): Promise<Pagina<Post>>;
  };
  patios: {
    listar(): Promise<Patio[]>;
    porSlug(slug: string): Promise<Patio | null>;
  };
  subastas: {
    listar(): Promise<Subasta[]>;
    porPatio(slug: string): Promise<Subasta[]>;
  };
  faqs: {
    listar(): Promise<Faq[]>;
    categorias(): Promise<CategoriaFaq[]>;
  };
  vehiculos: {
    listar(filtros?: FiltrosVehiculos): Promise<Pagina<Vehiculo>>;
    porId(id: string): Promise<Vehiculo | null>;
  };
}
