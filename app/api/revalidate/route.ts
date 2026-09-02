import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * Revalidación bajo demanda de una ruta concreta.
 *
 * Es un complemento, no el mecanismo principal: la frescura la resuelve el
 * `revalidate` de cada página, precisamente porque no se puede condicionar
 * este sitio a que se añada un webhook en una aplicación de producción ajena.
 *
 * Protegido con REVALIDATE_TOKEN. Sin token configurado el endpoint se apaga,
 * en lugar de quedar abierto.
 */
export async function POST(request: Request) {
  const esperado = process.env.REVALIDATE_TOKEN;
  if (!esperado) {
    return NextResponse.json(
      { error: "Revalidación no configurada" },
      { status: 503 },
    );
  }

  const recibido = request.headers.get("authorization")?.replace(/^Bearer /, "");
  if (recibido !== esperado) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { path } = (await request.json().catch(() => ({}))) as { path?: string };
  if (!path || !path.startsWith("/")) {
    return NextResponse.json(
      { error: 'Falta "path" (ruta absoluta desde la raíz)' },
      { status: 400 },
    );
  }

  revalidatePath(path);
  return NextResponse.json({
    ok: true,
    path,
    revalidadoEn: new Date().toISOString(),
  });
}
