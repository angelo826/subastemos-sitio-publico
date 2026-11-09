import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Foto } from "@/components/Foto";
import { ENLACES_EXTERNOS } from "@/data/site";
import { SUBASTAS_PROXIMAS } from "@/data/subastas";

/**
 * Bloque principal del inicio.
 *
 * Rediseño oct-2026 a partir del layout del cliente. Lo primero que se lee es
 * quién es Subastemos: una plataforma de subastas digital y segura. Debajo, el acceso directo a la próxima subasta.
 *
 * La foto es de archivo hasta que el cliente entregue la definitiva.
 */
export function Hero() {
  // Todas las del día más cercano: puede haber varias el mismo día.
  const proximas = SUBASTAS_PROXIMAS.filter(
    (s) => s.fechaIso === SUBASTAS_PROXIMAS[0]?.fechaIso,
  );

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
          <h1 className="text-title text-[clamp(2.6rem,7vw,4.5rem)] leading-[1.02] text-white">
            Plataforma de <span className="block text-orange">subastas digitales</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-white/90 md:text-xl">
            Compra o vende vehículos de forma segura y transparente, desde
            cualquier lugar y con pago de tus bienes garantizado en 5 días
            hábiles.
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

          {proximas.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-3">
              {proximas.map((proxima) => (
                <a
                  key={proxima.id}
                  href={proxima.acciones.find((a) => a.externo)?.href ?? ENLACES_EXTERNOS.subastas}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur transition-colors hover:bg-white/20"
                >
                  <CalendarDays className="size-5 text-orange" aria-hidden />
                  <span>
                    <span className="block text-xs text-white/75">
                      {proximas.length > 1 ? proxima.titulo : "Próxima subasta"}
                    </span>
                    <time dateTime={proxima.fechaIso} className="text-bold">
                      {proxima.fecha}
                      {proxima.hora && ` · ${proxima.hora} h`}
                    </time>
                  </span>
                  <ArrowRight className="size-4" aria-hidden />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
