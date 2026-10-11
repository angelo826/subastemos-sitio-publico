import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Foto } from "@/components/Foto";
import { ENLACES_EXTERNOS } from "@/data/site";

/**
 * Par de tarjetas de llamada a la acción del pie de las páginas interiores.
 * Rediseño oct-2026: mismas tarjetas oscuras de marca que el inicio.
 */

const TARJETAS = [
  {
    titulo: "Agenda una visita",
    texto: "Conoce y revisa las unidades antes de la subasta.",
    imagen: "/uploads/card-img-1.webp",
    cta: { label: "Reserva tu visita", href: "/reservas", externo: false },
  },
  {
    titulo: "Compra en Subastemos",
    texto: "Participa en nuestras subastas 100 % digitales y seguras.",
    imagen: "/uploads/card-img-2.webp",
    cta: { label: "Ver subastas", href: ENLACES_EXTERNOS.subastas, externo: true },
  },
];

export function CardsCta() {
  return (
    <section className="container-bs pb-14">
      <div className="grid gap-5 md:grid-cols-2">
        {TARJETAS.map((t) => (
          <div
            key={t.titulo}
            className="bg-grad-marca relative isolate overflow-hidden rounded-3xl p-8 text-white md:p-10"
          >
            <Foto
              src={t.imagen}
              alt=""
              aria-hidden
              sizes="(max-width: 768px) 100vw, 50vw"
              className="absolute inset-0 -z-10 size-full object-cover opacity-30 [mask-image:linear-gradient(to_right,transparent,black_60%)]"
            />
            <h2 className="text-title text-2xl md:text-3xl">{t.titulo}</h2>
            <p className="mt-2 max-w-xs text-white/90">{t.texto}</p>
            {t.cta.externo ? (
              <a
                href={t.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm mt-6"
              >
                {t.cta.label}
                <ArrowRight className="size-4" aria-hidden />
              </a>
            ) : (
              <Link href={t.cta.href} className="btn btn-primary btn-sm mt-6">
                {t.cta.label}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
