import { notFound } from "next/navigation";
import { BlogListado } from "@/components/sections/BlogListado";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { grafo, webSite } from "@/lib/jsonld";
import { postsRepository } from "@/lib/repositories";
import { TOTAL_PAGINAS_BLOG } from "@/data/posts";

export const dynamic = "force-static";
export const revalidate = false;

/**
 * Páginas 2..N del listado. La 1 vive en /blog, para no tener dos URLs con el
 * mismo contenido.
 */
export function generateStaticParams() {
  return Array.from({ length: TOTAL_PAGINAS_BLOG - 1 }, (_, i) => ({
    page: String(i + 2),
  }));
}

const DESCRIPCION =
  "Noticias y artículos sobre el mercado automotriz y el mundo de las subastas en México.";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  return buildMetadata({
    titulo: `Blog — página ${page}`,
    descripcion: DESCRIPCION,
    path: `/blog/pagina/${page}`,
  });
}

export default async function PaginaBlog({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const n = Number(page);

  if (!Number.isInteger(n) || n < 2 || n > TOTAL_PAGINAS_BLOG) notFound();

  const { items } = await postsRepository.porPagina(n);
  if (items.length === 0) notFound();

  const todos = await postsRepository.listar();

  return (
    <>
      <BlogListado
        posts={items}
        populares={todos.slice(0, 3)}
        pagina={n}
        totalPaginas={TOTAL_PAGINAS_BLOG}
      />

      <JsonLd
        data={grafo(
          webSite({
            titulo: `Blog — página ${n}`,
            descripcion: DESCRIPCION,
            path: `/blog/pagina/${n}`,
          }),
        )}
      />
    </>
  );
}
