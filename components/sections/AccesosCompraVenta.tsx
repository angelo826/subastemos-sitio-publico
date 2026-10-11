import Link from "next/link";
import { ArrowRight, CarFront, Handshake } from "lucide-react";
import { Foto } from "@/components/Foto";

/**
 * Las dos puertas de entrada del inicio: «Quiero comprar» y «Quiero vender».
 * Rediseño oct-2026, a partir del layout del cliente.
 */

const ACCESOS = [
  {
    titulo: "Quiero comprar",
    texto: "Encuentra vehículos en subasta y haz la mejor inversión.",
    cta: "Cómo comprar",
    href: "/como-comprar",
    icono: CarFront,
    imagen: "/uploads/vista-lateral-autos-nuevos-vender.jpg",
    fondo: "bg-grad-marca",
  },
  {
    titulo: "Quiero vender",
    texto: "Pon tu inventario o flotilla en manos de expertos.",
    cta: "Más información",
    href: "/como-vender",
    icono: Handshake,
    imagen: "/uploads/card-img-1.webp",
    fondo: "bg-gradient-to-r from-orange to-[#ff9a40]",
  },
] as const;

export function AccesosCompraVenta() {
  return (
    <section className="container-bs pt-10 lg:pt-14">
      <div className="grid gap-5 md:grid-cols-2">
        {ACCESOS.map(({ titulo, texto, cta, href, icono: Icono, imagen, fondo }) => (
          <Link
            key={titulo}
            href={href}
            className={`${fondo} group relative isolate flex min-h-[200px] items-center gap-5 overflow-hidden rounded-3xl p-6 text-white shadow-lg shadow-darkpurple/10 md:p-8`}
          >
            <Foto
              src={imagen}
              alt=""
              aria-hidden
              sizes="(max-width: 768px) 100vw, 50vw"
              className="absolute inset-y-0 right-0 -z-10 h-full w-3/5 object-cover opacity-35 transition-transform duration-500 [mask-image:linear-gradient(to_right,transparent,black_60%)] group-hover:scale-105"
            />

            <span className="grid size-16 shrink-0 place-items-center rounded-full bg-white text-darkpurple">
              <Icono className="size-8" aria-hidden />
            </span>

            <span>
              <span className="text-title block text-2xl md:text-3xl">{titulo}</span>
              <span className="mt-2 block max-w-xs text-white/90">{texto}</span>
              <span className="text-bold mt-4 inline-flex items-center gap-2">
                {cta}
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
