import { notFound } from "next/navigation";
import { Clock, Tag } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { RedactorText } from "@/components/ui/RedactorText";
import { HeaderImage } from "@/components/sections/HeaderImage";
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
      <div className="container-bs py-12">
        <Breadcrumbs
          migas={[
            { nombre: "Inicio", href: "/" },
            { nombre: "Blog", href: "/blog" },
            { nombre: post.titulo, href: path },
          ]}
        />

        <HeaderImage titulo={post.titulo} imagen={post.imagenHero} />

        <div className="pt-4">
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

        <div className="flex flex-wrap pt-6">
          <div className="w-full lg:w-2/3 lg:pe-6">
            <article>
              <RedactorText html={post.cuerpo} />
            </article>

            {relacionados.length > 0 && (
              <section className="pt-12">
                <h2 className="text-title py-6 text-center text-2xl text-purple">
                  Artículos relacionados
                </h2>
                <div className="flex flex-wrap">
                  {relacionados.map((p) => (
                    <div key={p.slug} className="w-full p-3 md:w-1/2">
                      <BlogCard post={p} />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="w-full lg:w-1/3 lg:ps-6">
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
