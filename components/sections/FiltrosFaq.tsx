"use client";

import { useState } from "react";
import Image from "next/image";
import { Acordeon } from "@/components/ui/Acordeon";
import type { Faq, CategoriaFaq } from "@/data/faqs";

/**
 * Filtros de las preguntas frecuentes (píldoras desde el rediseño de
 * oct-2026; en el tema eran círculos), con el listado que gobiernan.
 *
 * En el clon los filtros solo añadían `?category=` a la URL: el listado nunca
 * cambiaba, porque el volcado estático perdió la consulta del CMS. Aquí filtran
 * de verdad sobre la categoría de cada pregunta.
 *
 * El filtrado ocurre en el cliente sobre datos ya renderizados en el servidor,
 * así que las preguntas siguen estando en el HTML inicial y son indexables.
 */
export function FiltrosFaq({
  categorias,
  faqs,
}: {
  categorias: CategoriaFaq[];
  faqs: Faq[];
}) {
  const [activa, setActiva] = useState<string | null>(null);

  const visibles = activa ? faqs.filter((f) => f.categoria === activa) : faqs;

  const chip = (seleccionada: boolean) =>
    `text-bold inline-flex min-h-11 items-center gap-2.5 rounded-full border py-1.5 ps-1.5 pe-4 transition-colors ${
      seleccionada
        ? "border-darkpurple bg-darkpurple text-white"
        : "border-lilac bg-white text-darkpurple hover:border-purple"
    }`;

  return (
    <>
      <div className="flex flex-wrap gap-3 pb-8" role="group" aria-label="Filtrar por categoría">
        <button
          type="button"
          aria-pressed={activa === null}
          onClick={() => setActiva(null)}
          className={`${chip(activa === null)} ps-4`}
        >
          Todas
          <span className="text-sm opacity-70">{faqs.length}</span>
        </button>

        {categorias.map((c) => {
          const seleccionada = activa === c.id;
          const cuantas = faqs.filter((f) => f.categoria === c.id).length;

          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={seleccionada}
              onClick={() => setActiva(seleccionada ? null : c.id)}
              className={chip(seleccionada)}
            >
              {/* Los iconos del tema son blancos: van sobre un disco de color. */}
              <span
                className={`grid size-8 place-items-center rounded-full ${
                  seleccionada ? "bg-orange" : "bg-darkpurple"
                }`}
              >
                <Image src={c.icono} alt="" width={18} height={18} aria-hidden className="size-[18px]" />
              </span>
              {c.nombre}
              <span className="text-sm opacity-70">
                {cuantas}
                <span className="sr-only"> preguntas</span>
              </span>
            </button>
          );
        })}
      </div>

      {visibles.length > 0 ? (
        <Acordeon
          items={visibles.map((f, i) => ({
            id: `pregunta-${i + 1}`,
            titulo: f.pregunta,
            contenido: f.respuesta,
          }))}
        />
      ) : (
        <p className="rounded-2xl bg-lavender py-12 text-center text-darkpurple">
          Todavía no hay preguntas en esta categoría.
        </p>
      )}
    </>
  );
}
