import Link from "next/link";
import { Foto } from "@/components/Foto";
import type { Post } from "@/data/posts";

/**
 * Barra lateral del blog: artículos populares y la tarjeta de llamada a la
 * acción con textura. Fuente: `.blog__articulosPopulares` y
 * `.blog__cardComponent` del tema.
 */
export function BlogSidebar({ populares }: { populares: Post[] }) {
  return (
    <>
      <aside className="rounded-[15px] bg-graybg">
        <h2 className="text-title px-6 pt-12 pb-2 text-center text-2xl text-purple">
          Artículos más populares
        </h2>

        <div className="px-6 py-6">
          {populares.map((p) => (
            <div key={p.slug} className="flex items-center pb-6">
              <Foto
                src={p.imagenSquare}
                alt=""
                aria-hidden
                sizes="100px"
                className="size-[100px] shrink-0 rounded-[20px] object-cover"
              />
              <Link
                href={`/blog/${p.slug}`}
                className="text-title my-auto ps-4 text-[1.1rem] text-purple"
              >
                {p.titulo}
              </Link>
            </div>
          ))}
        </div>
      </aside>

      <section
        className="my-12 rounded-[10px] bg-cover bg-no-repeat"
        style={{ backgroundImage: "url(/uploads/textura-subastemos-20.svg)" }}
      >
        <div className="px-6 py-12 text-center text-white lg:px-8">
          <h2 className="text-title text-2xl">Compra en Subastemos</h2>
          <p className="py-4">Puja en nuestras subastas virtuales</p>
          <div>
            <Link
              href="/patios/queretaro"
              className="text-bold m-3 inline-block border border-white px-4 py-2 text-white hover:bg-white hover:text-darkpurple"
            >
              QRO
            </Link>
            <Link
              href="/patios/ciudad-de-mexico"
              className="text-bold m-3 inline-block border border-white px-4 py-2 text-white hover:bg-white hover:text-darkpurple"
            >
              CDMX
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
