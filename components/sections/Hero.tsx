import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Foto } from "@/components/Foto";
import { MARCAS } from "@/data/marcas";
import { ENLACES_EXTERNOS } from "@/data/site";
import { SUBASTAS_PROXIMAS } from "@/data/subastas";

/**
 * Bloque principal del inicio.
 *
 * Rediseño oct-2026 a partir del layout del cliente («Oportunidades que te
 * mueven»). Lo primero que se lee es quién es Subastemos: una plataforma de
 * subastas digital y segura. Debajo, el acceso directo a la próxima subasta.
 *
 * La foto es de archivo hasta que el cliente entregue la definitiva.
 */
export function Hero() {
  const proxima = [...SUBASTAS_PROXIMAS].sort((a, b) =>
    a.fechaIso.localeCompare(b.fechaIso),
  )[0];

  return (
    <section className="bg-grad-marca relative isolate overflow-hidden text-white">
      <Foto
        src="/uploads/hero-image@3x.webp"
        alt=""
        aria-hidden
        priority
        sizes="100vw"
        className="absolute inset-0 -z-10 size-full object-cover object-[70%_center] opacity-45 lg:opacity-75"
      />
      {/* Funde la foto con el morado para que el texto siempre contraste. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[#2b0160] via-[#2b0160]/85 to-transparent lg:via-[#2b0160]/70"
      />

      <div className="container-bs py-16 md:py-24 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-bold text-xs tracking-[0.25em] text-white/80 uppercase">
            La plataforma de subastas digitales de
          </p>
          <p className="text-title mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-lg text-white md:text-xl">
            {MARCAS.map((m, i) => (
              <span key={m} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden className="hidden h-4 w-px bg-white/40 sm:block" />}
                {m}
              </span>
            ))}
          </p>

          <h1 className="text-title mt-6 text-[clamp(2.6rem,7vw,4.5rem)] leading-[1.02] text-white">
            Oportunidades <span className="block text-orange">que te mueven.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-white/90 md:text-xl">
            Compra o vende vehículos en subastas 100 % digitales: seguras,
            transparentes y con pago de tus bienes garantizado en 5 días hábiles.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={ENLACES_EXTERNOS.subastas}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Explorar subastas
              <ArrowRight className="size-4" aria-hidden />
            </a>
            <Link href="/como-vender" className="btn btn-ghost">
              Vender mi inventario
            </Link>
          </div>

          {proxima && (
            <a
              href={proxima.acciones.find((a) => a.externo)?.href ?? ENLACES_EXTERNOS.subastas}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur transition-colors hover:bg-white/20"
            >
              <CalendarDays className="size-5 text-orange" aria-hidden />
              <span>
                <span className="block text-xs text-white/75">Próxima subasta</span>
                <time dateTime={proxima.fechaIso} className="text-bold">
                  {proxima.fecha}
                </time>
              </span>
              <ArrowRight className="size-4" aria-hidden />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
