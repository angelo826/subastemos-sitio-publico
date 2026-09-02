import type { Proveedor } from "./tipos";
import { staticProvider } from "./static.provider";

/**
 * Provider que lee de los endpoints públicos de la aplicación de producción.
 *
 * ESQUELETO: esos endpoints todavía no existen, así que por ahora delega en el
 * provider estático. Al implementarlos, el patrón por método es:
 *
 *   listar: async () => {
 *     const crudo = await backendFetch("/vehiculos", { revalidate: 60 });
 *     const parsed = ListaVehiculosDto.safeParse(crudo);
 *     if (!parsed.success) {
 *       // Degradar, no reventar: la página renderiza su estado vacío.
 *       console.error("[backend] respuesta inesperada en /vehiculos", parsed.error);
 *       return { items: [], total: 0, pagina: 1, porPagina: 24 };
 *     }
 *     return {
 *       items: parsed.data.data.map(aVehiculo),
 *       total: parsed.data.total,
 *       pagina: parsed.data.page,
 *       porPagina: parsed.data.perPage,
 *     };
 *   }
 *
 * La degradación se decide por recurso, no de forma global: un inventario
 * vacío es aceptable, un artículo de blog que desaparece no lo es.
 *
 * Ver docs/BACKEND.md.
 */
export const apiProvider: Proveedor = {
  ...staticProvider,
};
