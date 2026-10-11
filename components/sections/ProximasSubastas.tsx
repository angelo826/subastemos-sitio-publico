import Link from "next/link";
import { ArrowRight, MapPin, MonitorSmartphone, UserPlus } from "lucide-react";
import { ENLACES_EXTERNOS } from "@/data/site";
import { SUBASTAS_PROXIMAS } from "@/data/subastas";
import { MESES } from "@/lib/calendario";

/**
 * «Próximas subastas» del inicio.
 *
 * El layout del cliente mostraba aquí lotes concretos con precio y cuenta
 * regresiva. Esos datos viven en la plataforma de subastas, que todavía no
 * expone endpoints públicos (ver docs/BACKEND.md), así que en su lugar se
 * muestran las fechas, y cada una lleva a la plataforma, que es donde se
 * participa.
 */
export function ProximasSubastas() {
  const subastas = [...SUBASTAS_PROXIMAS].sort((a, b) =>
    a.fechaIso.localeCompare(b.fechaIso),
  );

  return (
    <section className="container-bs py-14">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 className="titulo-seccion">Próximas subastas</h2>
        <Link
          href="/calendario"
          className="text-bold inline-flex items-center gap-1 text-sm text-darkpurple hover:text-purple"
        >
          Ver calendario completo
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {subastas.map((s) => {
          const [anio, mes, dia] = s.fechaIso.split("-").map(Number);
          const enlace = s.acciones.find((a) => a.externo)?.href ?? ENLACES_EXTERNOS.subastas;

          return (
            <article
              key={s.id}
              className="flex gap-5 rounded-3xl border border-lilac bg-white p-5 shadow-sm"
            >
              <time
                dateTime={s.fechaIso}
                className="bg-grad-marca grid w-24 shrink-0 place-content-center rounded-2xl py-4 text-center text-white"
              >
                <span className="text-title block text-4xl leading-none">{dia}</span>
                <span className="text-bold mt-1 block text-sm uppercase">
                  {MESES[mes - 1].slice(0, 3)}
                </span>
                <span className="block text-xs text-white/75">{anio}</span>
              </time>

              <div className="flex flex-1 flex-col">
                <h3 className="text-title text-xl text-darkpurple">{s.titulo}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-darkpurple/75">
                  {s.sedes.length > 0 ? (
                    <>
                      <MapPin className="size-4" aria-hidden />
                      {s.sedes.join(" y ")}
                    </>
                  ) : (
                    <>
                      <MonitorSmartphone className="size-4" aria-hidden />
                      Participa desde cualquier lugar
                    </>
                  )}
                </p>
                <a
                  href={enlace}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-dark btn-sm mt-auto self-start"
                >
                  Participar
                  <ArrowRight className="size-4" aria-hidden />
                </a>
              </div>
            </article>
          );
        })}

        {/* Cierra la fila con una invitación a registrarse, que es el paso
            previo para participar en cualquier subasta. */}
        <article className="flex flex-col justify-between gap-4 rounded-3xl bg-peach p-6">
          <div>
            <UserPlus className="size-7 text-orange" aria-hidden />
            <h3 className="text-title mt-3 text-xl text-darkpurple">
              ¿Aún no tienes cuenta?
            </h3>
            <p className="mt-1 text-darkpurple/80">
              Regístrate gratis en minutos y recibe acceso a todas nuestras subastas.
            </p>
          </div>
          <a
            href={ENLACES_EXTERNOS.registro}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm self-start"
          >
            Crear mi cuenta
          </a>
        </article>
      </div>
    </section>
  );
}
