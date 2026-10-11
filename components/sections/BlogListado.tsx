import Link from "next/link";
import { EncabezadoPagina } from "./EncabezadoPagina";
import { BlogCard } from "./BlogCard";
import { BlogSidebar } from "./BlogSidebar";
import type { Post } from "@/data/posts";

/**
 * Listado del blog, compartido por /blog y /blog/pagina/[page].
 *
 * La paginación del clon era `/blog/p2.html`; aquí es `/blog/pagina/2`, y el
 * enlace de la página actual se marca con aria-current en lugar de apuntar a
 * `#` como hacía el original.
 */
export function BlogListado({
  posts,
  populares,
  pagina,
  totalPaginas,
}: {
  posts: Post[];
  populares: Post[];
  pagina: number;
  totalPaginas: number;
}) {
  return (
    <>
      <EncabezadoPagina
        titulo="Blog Subastemos"
        subtitulo="Noticias y análisis del mercado automotriz y el mundo de las subastas."
        imagen="/uploads/hero-image@3x.webp"
        migas={[
          { nombre: "Inicio", href: "/" },
          { nombre: "Blog", href: "/blog" },
        ]}
      />

      <div className="container-bs py-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="grid gap-6 md:grid-cols-2">
              {posts.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>

            {totalPaginas > 1 && (
              <nav aria-label="Paginación del blog" className="mt-10 flex justify-center">
                <ol className="text-bold flex gap-2">
                  {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((n) => {
                    const actual = n === pagina;
                    const href = n === 1 ? "/blog" : `/blog/pagina/${n}`;
                    const clase = "grid size-11 place-items-center rounded-full";

                    return (
                      <li key={n}>
                        {actual ? (
                          <span aria-current="page" className={`${clase} bg-darkpurple text-white`}>
                            {n}
                            <span className="sr-only"> (página actual)</span>
                          </span>
                        ) : (
                          <Link
                            href={href}
                            className={`${clase} border border-lilac bg-white text-darkpurple hover:border-purple`}
                          >
                            {n}
                            <span className="sr-only"> Ir a la página {n}</span>
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </nav>
            )}
          </div>

          <div>
            <BlogSidebar populares={populares} />
          </div>
        </div>
      </div>
    </>
  );
}
