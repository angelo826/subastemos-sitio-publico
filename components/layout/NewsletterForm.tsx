"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

/**
 * Alta al boletín, en el pie de página.
 *
 * En el clon era un input suelto sin <form> ni destino: `static-clone.js`
 * cancelaba cualquier envío. Aquí es un formulario real que apunta a
 * /api/contacto; el envío efectivo queda pendiente de los endpoints del
 * backend (ver docs/BACKEND.md).
 */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [estado, setEstado] = useState<"inicial" | "enviando" | "ok" | "error">(
    "inicial",
  );

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setEstado("enviando");
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo: "boletin", fromEmail: email }),
      });
      setEstado(res.ok ? "ok" : "error");
      if (res.ok) setEmail("");
    } catch {
      setEstado("error");
    }
  }

  return (
    <form onSubmit={enviar}>
      <div className="flex">
        <label htmlFor="newsletter-email" className="sr-only">
          Correo electrónico
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          className="w-[170px] bg-white ps-4 text-darkpurple placeholder:text-sm"
        />
        <button
          type="submit"
          disabled={estado === "enviando"}
          aria-label="Suscribirme"
          className="grid size-11 place-items-center bg-orange px-3 py-2 text-white disabled:opacity-60"
        >
          <ChevronRight className="size-4" aria-hidden />
        </button>
      </div>

      {estado === "ok" && (
        <p role="status" className="pt-2 text-sm">
          Gracias, te avisaremos de nuestras próximas subastas.
        </p>
      )}
      {estado === "error" && (
        <p role="alert" className="pt-2 text-sm">
          No pudimos registrar tu correo. Inténtalo de nuevo.
        </p>
      )}
    </form>
  );
}
