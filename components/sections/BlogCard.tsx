import Link from "next/link";
import { Clock, Tag } from "lucide-react";
import { Foto } from "@/components/Foto";
import type { Post } from "@/data/posts";

/** Tarjeta de artículo del listado del blog. Fuente: `.blog__card` del tema. */
export function BlogCard({ post }: { post: Post }) {
  return (
    <article className="mb-12">
      <Foto
        src={post.imagenCard}
        alt={post.titulo}
        sizes="(max-width: 992px) 100vw, 66vw"
        className="w-full rounded-[15px]"
      />

      <div className="px-1 pt-3">
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
        <h2 className="text-title py-2 text-3xl text-purple">
          <Link href={`/blog/${post.slug}`}>{post.titulo}</Link>
        </h2>
        <p className="py-2">{post.extracto}</p>
        <Link
          href={`/blog/${post.slug}`}
          className="text-bold inline-block border-2 border-orange px-4 py-2 text-darkpurple hover:bg-orange hover:text-white"
        >
          Leer artículo
          <span className="sr-only">: {post.titulo}</span>
        </Link>
      </div>
    </article>
  );
}
