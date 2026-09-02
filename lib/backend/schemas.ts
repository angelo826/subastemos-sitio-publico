import { z } from "zod";

/**
 * Forma cruda que se espera de las respuestas del backend.
 *
 * VACÍO A PROPÓSITO: los endpoints públicos todavía no existen, así que aún no
 * hay contrato que describir. Este archivo es el lugar exacto donde aterriza
 * ese contrato cuando llegue, y es lo que evita que el resto del código dependa
 * de decisiones que aún no se han tomado.
 *
 * Dos reglas al rellenarlo:
 *
 * 1. Describir lo que el backend DEVUELVE, no lo que este sitio necesita. La
 *    traducción a los tipos de lib/domain va en mappers.ts.
 * 2. Usar `.passthrough()` o `.loose()`: los campos desconocidos se ignoran en
 *    lugar de invalidar la respuesta, porque el backend evolucionará por su
 *    cuenta y un campo nuevo no debe tumbar una página.
 *
 * Ejemplo de cómo quedará:
 *
 * export const VehiculoDto = z.looseObject({
 *   id: z.union([z.string(), z.number()]).transform(String),
 *   marca: z.string(),
 *   modelo: z.string(),
 *   anio: z.coerce.number(),
 *   fotos: z.array(z.string()).default([]),
 * });
 *
 * export const ListaVehiculosDto = z.looseObject({
 *   data: z.array(VehiculoDto),
 *   total: z.coerce.number(),
 * });
 */

/** Envoltorio paginado, si el backend usa uno. Ajustar al contrato real. */
export const paginado = <T extends z.ZodType>(item: T) =>
  z.looseObject({
    data: z.array(item),
    total: z.coerce.number().default(0),
    page: z.coerce.number().default(1),
    perPage: z.coerce.number().default(24),
  });
