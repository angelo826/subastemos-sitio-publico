import Link from "next/link";
import { Foto } from "@/components/Foto";
import { TARJETAS_PATIO } from "@/data/patios";

/**
 * Retícula «Nuestros patios» del inicio. Fuente: `<section class="patios">`.
 *
 * Dos correcciones deliberadas respecto al clon (ver docs/MIGRACION.md):
 *
 * 1. Los botones de cada tarjeta llevaban `d-none` y solo aparecían al pasar
 *    el ratón, lo que los dejaba inalcanzables por teclado y en móvil. Aquí la
 *    tarjeta entera es el enlace, así que funciona con teclado, toque y ratón,
 *    y el sobreimpreso sigue reaccionando al hover.
 * 2. El tema fijaba `height: 350px` por debajo de 992px. Aquí se usa
 *    aspect-ratio, que reserva la caja sin depender de una altura dura.
 */
export function PatiosGrid() {
  return (
    <section className="my-12">
      <div className="container-bs">
        <div className="text-center">
          <h2 className="text-title py-2 text-[2.5rem] text-purple">
            Nuestros patios
          </h2>
          <p className="py-2 text-2xl">
            Conoce, reserva tu visita y puja en nuestros patios.
          </p>
        </div>

        <div className="flex flex-wrap">
          {TARJETAS_PATIO.map((t) => (
            <div key={t.nombre} className="w-full p-6 lg:w-1/3">
              <Tarjeta tarjeta={t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Tarjeta({ tarjeta }: { tarjeta: (typeof TARJETAS_PATIO)[number] }) {
  const contenido = (
    <>
      <Foto
        src={tarjeta.imagen}
        alt=""
        aria-hidden
        sizes="(max-width: 992px) 100vw, 33vw"
        className="aspect-square w-full rounded-[40px] object-cover object-center lg:aspect-[300/540]"
      />

      <div className="group-hover:bg-grad-patio-hover absolute inset-0 size-full rounded-[40px] bg-black/20 transition-colors lg:bg-transparent">
        <div className="absolute top-[75%] w-full text-center transition-all group-hover:top-[60%]">
          <p className="text-title pb-4 text-[2.5rem] text-white lg:text-[2rem]">
            {tarjeta.nombre}
          </p>

          {tarjeta.proximamente ? (
            <span className="text-title hidden text-2xl text-white group-hover:block">
              Proximamente
            </span>
          ) : (
            <span className="text-bold mx-auto hidden w-3/4 border border-white px-4 py-2 text-white group-hover:block xl:w-1/2">
              Ver subastas
            </span>
          )}
        </div>
      </div>
    </>
  );

  if (!tarjeta.href) {
    return <div className="group relative block">{contenido}</div>;
  }

  return (
    <Link href={tarjeta.href} className="group relative block">
      {contenido}
    </Link>
  );
}
