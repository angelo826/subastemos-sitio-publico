import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Reserva de cita para visitar un patio.
 *
 * Hoy las reservas las gestiona el widget externo de SimplyBook incrustado en
 * /reservas. Este endpoint existe como costura para cuando esa gestión pase a
 * los endpoints del backend. Ver docs/BACKEND.md.
 */

const Reserva = z.object({
  patio: z.string().min(1).max(100),
  fecha: z.iso.date(),
  nombre: z.string().min(1).max(200),
  email: z.email().max(200),
  telefono: z.string().min(6).max(30),
});

export async function POST(request: Request) {
  let cuerpo: unknown;
  try {
    cuerpo = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const parsed = Reserva.safeParse(cuerpo);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", detalles: parsed.error.issues },
      { status: 400 },
    );
  }

  // TODO(backend): crear la reserva contra los endpoints de la app de producción.
  return NextResponse.json(
    { error: "La reserva por API aún no está disponible. Usa /reservas." },
    { status: 501 },
  );
}
