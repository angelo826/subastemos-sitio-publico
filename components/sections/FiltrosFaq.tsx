"use client";

import { useState } from "react";
import Image from "next/image";
import { Acordeon } from "@/components/ui/Acordeon";
import type { Faq, CategoriaFaq } from "@/data/faqs";

/**
 * Filtros circulares de las preguntas frecuentes, con el listado que gobiernan.
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

  return (
    <>
      <div className="flex flex-wrap py-6">
        {categorias.map((c) => {
          const seleccionada = activa === c.id;
          const cuantas = faqs.filter((f) => f.categoria === c.id).length;

          return (
            <div key={c.id} className="w-full pt-12 text-center sm:w-1/2 md:w-1/4">
              <button
                type="button"
                aria-pressed={seleccionada}
                onClick={() => setActiva(seleccionada ? null : c.id)}
                className="mx-auto block"
              >
                <span
                  className={`grid size-[170px] place-items-center rounded-full border ${
                    seleccionada ? "border-darkpurple" : "border-transparent"
                  }`}
                >
                  <span
                    className={`grid size-[150px] place-items-center rounded-full ${
                      seleccionada ? "bg-purple" : "bg-darkpurple"
                    }`}
                  >
                    <Image
                      src={c.icono}
                      alt=""
                      width={64}
                      height={64}
                      aria-hidden
                      className="size-16"
                    />
                  </span>
                </span>

                <span
                  className={`text-title block py-4 text-2xl ${
                    seleccionada ? "text-purple" : "text-darkpurple"
                  }`}
                >
                  {c.nombre}
                </span>

                <span className="sr-only">
                  {cuantas === 0
                    ? "sin preguntas en esta categoría"
                    : `${cuantas} preguntas`}
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {activa && (
        <p className="pb-4 text-center">
          Mostrando {visibles.length} de {faqs.length} preguntas.{" "}
          <button
            type="button"
            onClick={() => setActiva(null)}
            className="text-bold text-purple underline"
          >
            Ver todas
          </button>
        </p>
      )}

      {visibles.length > 0 ? (
        <Acordeon
          items={visibles.map((f, i) => ({
            id: `pregunta-${i + 1}`,
            titulo: f.pregunta,
            contenido: f.respuesta,
          }))}
        />
      ) : (
        <p className="py-12 text-center">
          Todavía no hay preguntas en esta categoría.
        </p>
      )}
    </>
  );
}
