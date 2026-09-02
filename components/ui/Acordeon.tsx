"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Minus, Plus } from "lucide-react";
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
    <Accordion.Root type="single" collapsible className="w-full">
      {items.map((it) => (
        <Accordion.Item key={it.id} value={it.id} className="py-3">
          <Accordion.Header>
            <Accordion.Trigger
              className={`group flex w-full items-center rounded-[15px] p-4 text-start ${
                oscuro ? "bg-darkpurple text-white" : "bg-graybg text-purple"
              }`}
            >
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

              <span className={`text-bold ${it.icono ? "px-4" : ""}`}>
                {it.titulo}
              </span>

              <span className="ms-auto ps-4">
                <Plus
                  className={`size-4 group-data-[state=open]:hidden ${oscuro ? "text-white" : "text-purple"}`}
                  aria-hidden
                />
                <Minus
                  className={`hidden size-4 group-data-[state=open]:block ${oscuro ? "text-white" : "text-purple"}`}
                  aria-hidden
                />
              </span>
            </Accordion.Trigger>
          </Accordion.Header>

          <Accordion.Content className="overflow-hidden px-12">
            <div
              className="redactor py-2"
              dangerouslySetInnerHTML={{ __html: it.contenido }}
            />
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
