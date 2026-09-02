import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Recepción del formulario de contacto y del alta al boletín.
 *
 * Este endpoint es la costura hacia el backend: hoy valida y responde 200 sin
 * enviar nada. Cuando existan los endpoints públicos de la app de producción,
 * el reenvío se hace aquí, desde el servidor, sin exponer su URL ni sus
 * credenciales al navegador. Ver docs/BACKEND.md.
 */

const Solicitud = z.object({
  tipo: z.string().default("contacto"),
  fromName: z.string().min(1).max(200).optional(),
  fromEmail: z.email().max(200),
  telefono: z.string().min(6).max(30).optional(),
  mensaje: z.string().max(5000).optional(),
  /** Campo trampa: si llega relleno, es un bot. */
  honeypotField: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  let cuerpo: unknown;
  try {
    cuerpo = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const parsed = Solicitud.safeParse(cuerpo);

  if (!parsed.success) {
    // El honeypot relleno se responde con un 200 a propósito: si el bot
    // supiera que ha fallado, probaría otra cosa.
    const esHoneypot = parsed.error.issues.some((i) =>
      i.path.includes("honeypotField"),
    );
    if (esHoneypot) return NextResponse.json({ ok: true });

    return NextResponse.json(
      { error: "Datos inválidos", detalles: parsed.error.issues },
      { status: 400 },
    );
  }

  // TODO(backend): reenviar a los endpoints públicos de la app de producción.
  //   await backendClient.post("/contacto", parsed.data);
  // Mientras tanto se registra en el log del servidor para no perder el aviso.
  console.info("[contacto] solicitud recibida", {
    tipo: parsed.data.tipo,
    email: parsed.data.fromEmail,
  });

  return NextResponse.json({ ok: true });
}
