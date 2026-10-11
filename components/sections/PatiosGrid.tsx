import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Foto } from "@/components/Foto";
import { TARJETAS_PATIO, type TarjetaPatio } from "@/data/patios";

/**
 * Retícula «Nuestros patios» del inicio.
 *
 * Rediseño oct-2026: cuatro patios y fotos de autos en lugar de la ciudad,
 * como pidió el cliente. La tarjeta entera es el enlace, así que funciona con
 * teclado, toque y ratón (el clon escondía los botones hasta el hover).
 */
export function PatiosGrid() {
  return (
    <section className="bg-lavender py-14">
      <div className="container-bs">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="titulo-seccion">Nuestros patios</h2>
            <p className="mt-2 text-darkpurple/80">
              Conoce las unidades antes de la subasta: agenda tu visita.
            </p>
          </div>
          <Link href="/reservas" className="btn btn-outline btn-sm">
            Reserva tu visita
          </Link>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TARJETAS_PATIO.map((t) => (
            <Tarjeta key={t.nombre} tarjeta={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Tarjeta({ tarjeta }: { tarjeta: TarjetaPatio }) {
  const contenido = (
    <>
      <Foto
        src={tarjeta.imagen}
        alt=""
        aria-hidden
        sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 25vw"
        className="aspect-[16/10] w-full object-cover sm:aspect-[4/5] transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#2b0160] via-[#2b0160]/30 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <p className="flex items-center gap-1.5 text-sm text-white/80">
          <MapPin className="size-4" aria-hidden />
          {tarjeta.detalle}
        </p>
        <p className="text-title text-2xl">{tarjeta.nombre}</p>
        {tarjeta.proximamente ? (
          <span className="text-bold mt-3 inline-block rounded-full bg-white/15 px-3 py-1 text-xs">
            Próximamente
          </span>
        ) : (
          <span className="text-bold mt-3 inline-flex items-center gap-1 text-sm text-orange">
            Ver patio
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </span>
        )}
      </div>
    </>
  );

  const clase = "group relative block overflow-hidden rounded-3xl shadow-lg shadow-darkpurple/10";

  if (!tarjeta.href) return <div className={clase}>{contenido}</div>;

  return (
    <Link href={tarjeta.href} className={clase}>
      {contenido}
    </Link>
  );
}
