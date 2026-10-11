"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import Image from "next/image";

export interface ItemAcordeon {
  id: string;
  titulo: string;
  /** Cuerpo en HTML, procedente del CMS. */
  contenido: string;
  /** Icono opcional a la izquierda (métodos de pago). */
  icono?: string;
}

/**
 * Acordeón de secciones plegables.
 *
 * Reemplaza al collapse de Bootstrap que usaban las preguntas frecuentes y los
 * métodos de pago. El original alternaba dos iconos con `d-none` y no exponía
 * ningún estado a lectores de pantalla; Radix aporta `aria-expanded` y
 * navegación por teclado.
 */
export function Acordeon({
  items,
  variante = "claro",
}: {
  items: ItemAcordeon[];
  /** "claro" = preguntas frecuentes; "oscuro" = métodos de pago. */
  variante?: "claro" | "oscuro";
}) {
  const oscuro = variante === "oscuro";

  return (
    <Accordion.Root type="single" collapsible className="flex w-full flex-col gap-3">
      {items.map((it) => (
        <Accordion.Item
          key={it.id}
          value={it.id}
          className={`overflow-hidden rounded-2xl border ${
            oscuro
              ? "border-transparent bg-darkpurple text-white data-[state=open]:bg-grad-marca"
              : "border-lilac bg-white data-[state=open]:bg-lavender"
          }`}
        >
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full items-center gap-4 p-5 text-start">
              {it.icono && (
                <Image
                  src={it.icono}
                  alt=""
                  width={40}
                  height={30}
                  aria-hidden
                  className="h-[30px] w-auto"
                />
              )}

              <span className={`text-bold text-lg ${oscuro ? "" : "text-darkpurple"}`}>
                {it.titulo}
              </span>

              <span
                className={`ms-auto grid size-8 shrink-0 place-items-center rounded-full transition-transform group-data-[state=open]:rotate-45 ${
                  oscuro ? "bg-white/15 text-white" : "bg-lilac text-purple"
                }`}
              >
                <Plus className="size-4" aria-hidden />
              </span>
            </Accordion.Trigger>
          </Accordion.Header>

          <Accordion.Content className="overflow-hidden px-5 pb-4">
            <div
              className={`redactor ${oscuro ? "redactor--oscuro" : ""}`}
              dangerouslySetInnerHTML={{ __html: it.contenido }}
            />
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
