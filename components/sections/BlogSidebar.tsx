import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Foto } from "@/components/Foto";
import { ENLACES_EXTERNOS } from "@/data/site";
import type { Post } from "@/data/posts";

/**
 * Barra lateral del blog: artículos populares y una llamada a participar en
 * las subastas.
 */
export function BlogSidebar({ populares }: { populares: Post[] }) {
  return (
    <div className="flex flex-col gap-6 lg:sticky lg:top-[calc(var(--spacing-header)+1.5rem)]">
      <aside className="rounded-3xl bg-lavender p-6">
        <h2 className="titulo-seccion text-xl">Artículos más populares</h2>

        <ul className="mt-5 flex flex-col gap-4">
          {populares.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`} className="group flex items-center gap-4">
                <Foto
                  src={p.imagenSquare}
                  alt=""
                  aria-hidden
                  sizes="80px"
                  className="size-20 shrink-0 rounded-2xl object-cover"
                />
                <span className="text-title leading-snug text-darkpurple group-hover:text-purple">
                  {p.titulo}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      <section className="bg-grad-marca rounded-3xl p-6 text-white">
        <h2 className="text-title text-2xl">Compra en Subastemos</h2>
        <p className="mt-2 text-white/90">
          Participa en nuestras subastas 100 % digitales.
        </p>
        <a
          href={ENLACES_EXTERNOS.subastas}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-sm mt-5"
        >
          Ver subastas
          <ArrowRight className="size-4" aria-hidden />
        </a>
      </section>
    </div>
  );
}
