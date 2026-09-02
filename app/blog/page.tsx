import { BlogListado } from "@/components/sections/BlogListado";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { grafo, webSite } from "@/lib/jsonld";
import { postsRepository } from "@/lib/repositories";
import { TOTAL_PAGINAS_BLOG } from "@/data/posts";

const PATH = "/blog";
const TITULO = "Blog";
const DESCRIPCION =
  "Noticias y artículos sobre el mercado automotriz y el mundo de las subastas en México.";

export const metadata = buildMetadata({
  titulo: TITULO,
  descripcion: DESCRIPCION,
  keywords: ["blog", "noticias", "subastas", "automotriz"],
  path: PATH,
});

export const dynamic = "force-static";
export const revalidate = false;

export default async function Blog() {
  const { items } = await postsRepository.porPagina(1);
  const todos = await postsRepository.listar();

  return (
    <>
      <BlogListado
        posts={items}
        populares={todos.slice(0, 3)}
        pagina={1}
        totalPaginas={TOTAL_PAGINAS_BLOG}
      />

      <JsonLd
        data={grafo(
          webSite({ titulo: TITULO, descripcion: DESCRIPCION, path: PATH }),
        )}
      />
    </>
  );
}
