import { staticProvider } from "@/lib/providers/static.provider";
import { apiProvider } from "@/lib/providers/api.provider";
import type { Proveedor } from "@/lib/providers/tipos";

/**
 * Selección del provider de datos activo.
 *
 * Este archivo es el único interruptor de toda la integración con el backend:
 * cuando los endpoints públicos existan y api.provider.ts esté implementado,
 * basta con poner DATA_PROVIDER=api en el entorno.
 *
 * Las páginas y los componentes importan SIEMPRE desde aquí, nunca desde
 * data/*.ts directamente, para que ese cambio no obligue a tocarlos.
 */
const proveedor: Proveedor =
  process.env.DATA_PROVIDER === "api" ? apiProvider : staticProvider;

export const postsRepository = proveedor.posts;
export const patiosRepository = proveedor.patios;
export const subastasRepository = proveedor.subastas;
export const faqsRepository = proveedor.faqs;
export const vehiculosRepository = proveedor.vehiculos;
