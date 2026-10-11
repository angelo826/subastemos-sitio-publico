import { Foto } from "@/components/Foto";
import { MARCAS } from "@/data/marcas";

/**
 * Banda «Nuestras marcas». Es el destino del enlace «Marcas» del menú
 * (`/#marcas`), por eso lleva ese id y margen para la cabecera fija.
 */
export function BannerMarcas() {
  return (
    <section
      id="marcas"
      className="container-bs scroll-mt-(--spacing-header) py-14"
    >
      <div className="bg-grad-marca relative isolate overflow-hidden rounded-3xl px-6 py-10 text-white md:px-12 md:py-14">
        <Foto
          src="/uploads/vista-lateral-autos-nuevos-vender.jpg"
          alt=""
          aria-hidden
          sizes="(max-width: 992px) 100vw, 60vw"
          className="absolute inset-y-0 right-0 -z-10 h-full w-full object-cover opacity-30 [mask-image:linear-gradient(to_right,transparent,black_55%)] md:w-3/5 md:opacity-60"
        />

        <p className="text-bold text-xs tracking-[0.25em] text-white/80 uppercase">
          Nuestras marcas
        </p>
        <h2 className="text-title mt-2 max-w-md text-[clamp(1.75rem,4vw,2.5rem)] leading-tight">
          La calidad y el respaldo de siempre.
        </h2>

        <ul className="mt-8 flex flex-wrap gap-3">
          {MARCAS.map((m) => (
            <li
              key={m}
              className="text-title rounded-full border border-white/30 bg-white/10 px-5 py-2 text-lg tracking-wide backdrop-blur"
            >
              {m}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
