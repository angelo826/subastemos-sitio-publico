import { Foto } from "@/components/Foto";
import Link from "next/link";
import { Clock, Tag } from "lucide-react";
import type { Post } from "@/data/posts";

/**
 * Artículo destacado del inicio. Fuente: `<section class="articuloDestacado">`.
 * El clon destacaba el segundo artículo más reciente; aquí se recibe por props
 * para que la página decida.
 */
export function ArticuloDestacado({ post }: { post: Post }) {
  return (
    <section className="container-bs">
      <div className="p-6 md:p-12">
        <h2 className="text-title pb-12 text-center text-[2.5rem] text-purple">
          Blog Destacado
        </h2>

        <div className="mx-auto w-full md:w-5/6">
          <Foto
            src={post.imagenCard}
            alt={post.titulo}
            sizes="(max-width: 768px) 100vw, 66vw"
            className="w-full rounded-[15px]"
          />

          <div className="pt-3">
            <span className="inline-flex items-center text-darkpurple tracking-[4.5px]">
              <Clock className="size-4" aria-hidden />
              <time dateTime={post.fechaIso} className="text-bold px-2">
                {post.fecha}
              </time>
            </span>

            <span className="ms-12 inline-flex items-center text-purple">
              <Tag className="size-4" aria-hidden />
              <span className="ms-3 rounded-[20px] bg-graybg px-3 py-2">
                {post.tag}
              </span>
            </span>
          </div>

          <div className="py-2">
            <h3 className="text-title py-2 text-3xl text-purple">
              {post.titulo}
            </h3>
            <p className="py-2">{post.extracto}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="text-bold inline-block border-2 border-orange px-4 py-2 text-darkpurple hover:bg-orange hover:text-white"
            >
              Leer artículo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
