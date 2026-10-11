import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Foto } from "@/components/Foto";
import type { Post } from "@/data/posts";

/** Tarjeta de artículo del listado del blog. */
export function BlogCard({ post }: { post: Post }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-lilac bg-white shadow-sm">
      <Link href={`/blog/${post.slug}`} tabIndex={-1} aria-hidden className="overflow-hidden">
        <Foto
          src={post.imagenCard}
          alt=""
          sizes="(max-width: 992px) 100vw, 40vw"
          className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-3 text-sm text-darkpurple/70">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-4" aria-hidden />
            <time dateTime={post.fechaIso}>{post.fecha.replaceAll("/", " ")}</time>
          </span>
          <span className="text-bold rounded-full bg-lavender px-3 py-1 text-xs text-purple">
            {post.tag}
          </span>
        </div>

        <h2 className="text-title mt-3 text-2xl leading-tight text-darkpurple">
          <Link href={`/blog/${post.slug}`} className="hover:text-purple">
            {post.titulo}
          </Link>
        </h2>
        <p className="mt-2 line-clamp-3 text-darkpurple/80">{post.extracto}</p>

        <Link
          href={`/blog/${post.slug}`}
          className="text-bold mt-auto inline-flex items-center gap-1.5 pt-4 text-orange"
        >
          Leer artículo
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          <span className="sr-only">: {post.titulo}</span>
        </Link>
      </div>
    </article>
  );
}
