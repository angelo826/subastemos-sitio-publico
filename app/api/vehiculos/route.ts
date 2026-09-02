import { NextResponse } from "next/server";
import { vehiculosRepository } from "@/lib/repositories";

/**
 * Listado de inventario para la futura página /inventario-vehiculos.
 *
 * Hoy devuelve una página vacía porque el provider estático no tiene vehículos;
 * el contrato de la respuesta ya es el definitivo, así que el frontend puede
 * escribirse contra él desde ahora. Ver docs/BACKEND.md.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const num = (clave: string) => {
    const v = url.searchParams.get(clave);
    return v ? Number(v) : undefined;
  };

  const pagina = await vehiculosRepository.listar({
    patio: url.searchParams.get("patio") ?? undefined,
    marca: url.searchParams.get("marca") ?? undefined,
    anioMin: num("anioMin"),
    anioMax: num("anioMax"),
    pagina: num("pagina") ?? 1,
    porPagina: num("porPagina") ?? 24,
  });

  return NextResponse.json(pagina);
}
