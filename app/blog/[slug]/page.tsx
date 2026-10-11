import { notFound } from "next/navigation";
import { CalendarDays } from "lucide-react";
import { RedactorText } from "@/components/ui/RedactorText";
import { EncabezadoPagina } from "@/components/sections/EncabezadoPagina";
import { BlogSidebar } from "@/components/sections/BlogSidebar";
import { BlogCard } from "@/components/sections/BlogCard";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { grafo, webSite, breadcrumbs, blogPosting } from "@/lib/jsonld";
import { postsRepository } from "@/lib/repositories";
import { POSTS } from "@/data/posts";

export const dynamic = "force-static";
export const revalidate = false;

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await postsRepository.porSlug(slug);
  if (!post) return {};

  return buildMetadata({
    titulo: post.titulo,
    descripcion: post.descripcion,
    keywords: post.keywords,
    path: `/blog/${post.slug}`,
    imagen: post.imagenCard,
    imagenAlt: post.titulo,
    tipo: "article",
    publicadoEn: post.fechaIso,
  });
}

export default async function Articulo({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await postsRepository.porSlug(slug);
  if (!post) notFound();

  const todos = await postsRepository.listar();
  const relacionados = todos.filter((p) => p.slug !== post.slug).slice(0, 2);
  const path = `/blog/${post.slug}`;

  return (
    <>
      <EncabezadoPagina
        titulo={post.titulo}
        imagen={post.imagenHero}
        migas={[
          { nombre: "Inicio", href: "/" },
          { nombre: "Blog", href: "/blog" },
          { nombre: post.titulo, href: path },
        ]}
      >
        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-white/85">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-4" aria-hidden />
            <time dateTime={post.fechaIso}>{post.fecha.replaceAll("/", " ")}</time>
          </span>
          <span className="text-bold rounded-full bg-white/15 px-3 py-1 text-xs">
            {post.tag}
          </span>
        </div>
      </EncabezadoPagina>

      <div className="container-bs py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <article>
              <RedactorText html={post.cuerpo} />
            </article>

            {relacionados.length > 0 && (
              <section className="pt-12">
                <h2 className="titulo-seccion mb-6">Artículos relacionados</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {relacionados.map((p) => (
                    <BlogCard key={p.slug} post={p} />
                  ))}
                </div>
              </section>
            )}
          </div>

          <div>
            <BlogSidebar populares={todos.slice(0, 3)} />
          </div>
        </div>
      </div>

      <JsonLd
        data={grafo(
          webSite({
            titulo: post.titulo,
            descripcion: post.descripcion,
            path,
            imagen: post.imagenCard,
            publicadoEn: post.fechaIso,
          }),
          blogPosting({
            titulo: post.titulo,
            descripcion: post.descripcion,
            path,
            imagen: post.imagenCard,
            publicadoEn: post.fechaIso,
          }),
          breadcrumbs([
            { nombre: "Blog", path: "/blog" },
            { nombre: post.titulo, path },
          ]),
        )}
      />
    </>
  );
}
