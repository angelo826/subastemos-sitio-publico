"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/data/site";

/**
 * Formulario de contacto. Aparece en /contacto y en /como-vender.
 *
 * En el clon llevaba un CRAFT_CSRF_TOKEN caducado y `static-clone.js`
 * cancelaba el envío: era decorativo. Aquí es un formulario real que envía a
 * /api/contacto. El campo trampa (honeypot) del original se conserva.
 *
 * El envío efectivo queda pendiente de los endpoints del backend; el Route
 * Handler valida y responde 200. Ver docs/BACKEND.md.
 */
export function ContactForm({ origen = "contacto" }: { origen?: string }) {
  const [estado, setEstado] = useState<"inicial" | "enviando" | "ok" | "error">(
    "inicial",
  );

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const datos = Object.fromEntries(new FormData(e.currentTarget));
    setEstado("enviando");

    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...datos, tipo: origen }),
      });
      if (res.ok) {
        setEstado("ok");
        e.currentTarget.reset();
      } else {
        setEstado("error");
      }
    } catch {
      setEstado("error");
    }
  }

  return (
    <section className="my-12">
      <div className="container-bs lg:px-12">
        <form onSubmit={enviar} className="md:px-12" noValidate={false}>
          {/* Campo trampa: invisible para las personas, tentador para los bots. */}
          <div className="hidden" aria-hidden>
            <label htmlFor="honeypotField">No rellenar</label>
            <input
              type="text"
              id="honeypotField"
              name="honeypotField"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="px-4">
            <div className="flex flex-wrap md:px-12">
              <Campo
                className="w-full md:w-1/2"
                id="fromName"
                label="Nombre completo"
                type="text"
                autoComplete="name"
              />
              <Campo
                className="w-full md:w-1/2"
                id="telefono"
                label="Celular"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
              />
              <Campo
                className="w-full"
                id="fromEmail"
                label="Correo electrónico"
                type="email"
                autoComplete="email"
              />
              <Campo
                className="w-full"
                id="mensaje"
                label="Mensaje"
                type="text"
              />

              <div className="w-full py-3 text-center">
                <button
                  type="submit"
                  disabled={estado === "enviando"}
                  className="text-bold bg-orange px-4 py-2 text-darkpurple disabled:opacity-60"
                >
                  {estado === "enviando" ? "Enviando…" : "Enviar"}
                </button>

                <span className="px-2 md:px-6">ó</span>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bold inline-flex items-center gap-2 bg-green px-4 py-2 text-white"
                >
                  <MessageCircle className="size-4" aria-hidden />
                  <span>Escríbenos</span>
                </a>
              </div>

              {estado === "ok" && (
                <p role="status" className="w-full pt-2 text-center text-green">
                  Gracias, hemos recibido tu mensaje. Te contactaremos pronto.
                </p>
              )}
              {estado === "error" && (
                <p role="alert" className="w-full pt-2 text-center text-orange">
                  No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos
                  por WhatsApp.
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

function Campo({
  className,
  id,
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  className: string;
  id: string;
  label: string;
}) {
  return (
    <div className={`${className} py-3`}>
      {/* El tema usaba solo placeholder, que desaparece al escribir y no lo
          anuncian bien los lectores de pantalla. Se añade una etiqueta real
          oculta visualmente. */}
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        name={id}
        placeholder={label}
        required
        className="w-full rounded-[15px] border-none bg-graybg px-4 py-2 focus:outline-purple"
        {...props}
      />
    </div>
  );
}
