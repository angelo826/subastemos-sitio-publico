"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";
import type { Subasta } from "@/data/subastas";
import "swiper/css";
import "swiper/css/pagination";

/**
 * Carrusel de subastas. Aparece en el inicio y en las páginas de patio.
 *
 * En el clon lo movía un Swiper incrustado en el bundle Webpack de 286 KB
 * (js/app.js) junto con axios; aquí es el paquete `swiper` de npm, cargado
 * solo donde se usa.
 */
export function SubastasSwiper({ subastas }: { subastas: Subasta[] }) {
  if (subastas.length === 0) return null;

  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      pagination={{ clickable: true }}
      autoplay={{ delay: 6000, disableOnInteraction: true }}
      loop={subastas.length > 1}
      spaceBetween={0}
      slidesPerView={1}
      className="subastas-swiper h-auto w-full"
    >
      {subastas.map((s) => (
        <SwiperSlide key={s.id} className="p-3 text-white">
          <div
            className="h-[500px] bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${s.imagen})` }}
          >
            {/* Banderola de sedes, arriba a la derecha. */}
            <div className="flex justify-end">
              <div className="text-title flex">
                <div className="clip-banner -me-px w-[50px] bg-purple" />
                <h3 className="text-bold m-0 bg-purple px-4 py-2 text-[1.4rem]">
                  {s.sedes.join(" y ")}
                </h3>
              </div>
            </div>

            <div className="flex h-[calc(500px-3.5rem)] items-end p-3">
              <div className="p-6 md:p-12">
                <h2 className="text-title py-3 text-2xl md:text-3xl">
                  {s.titulo} - <time dateTime={s.fechaIso}>{s.fecha}</time>
                </h2>

                {s.acciones.length > 0 && (
                  <div className="text-center sm:text-start">
                    {s.acciones.map((a) =>
                      a.externo ? (
                        <a
                          key={a.label}
                          href={a.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="me-2 my-2 inline-block border border-white px-4 py-2 text-white hover:border-orange hover:bg-orange"
                        >
                          {a.label}
                        </a>
                      ) : (
                        <Link
                          key={a.label}
                          href={a.href}
                          className="me-2 my-2 inline-block border border-white px-4 py-2 text-white hover:border-orange hover:bg-orange"
                        >
                          {a.label}
                        </Link>
                      ),
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
