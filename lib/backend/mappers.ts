/**
 * Traducción de las respuestas del backend a los tipos de lib/domain.
 *
 * VACÍO A PROPÓSITO, igual que schemas.ts: los endpoints aún no existen.
 *
 * Esta capa es la que permite que el backend cambie sin que se toque un solo
 * componente. Un ejemplo de cómo quedará:
 *
 * import type { z } from "zod";
 * import type { VehiculoDto } from "./schemas";
 * import type { Vehiculo } from "@/lib/domain/types";
 *
 * export function aVehiculo(dto: z.infer<typeof VehiculoDto>): Vehiculo {
 *   return {
 *     id: dto.id,
 *     marca: dto.marca,
 *     modelo: dto.modelo,
 *     anio: dto.anio,
 *     imagenes: dto.fotos,
 *   };
 * }
 */

export {};
