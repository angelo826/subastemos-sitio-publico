import Link from "next/link";
import { HeaderImage } from "./HeaderImage";
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
      <div className="container-bs py-12">
        <HeaderImage titulo="Blog Subastemos" imagen="/uploads/hero-image@3x.webp" />
      </div>

      <div className="container-bs py-12">
        <div className="flex flex-wrap px-4 sm:px-0">
          <div className="w-full md:w-2/3 md:pe-6">
            {posts.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}

            {totalPaginas > 1 && (
              <nav aria-label="Paginación del blog" className="flex">
                <ol className="text-bold mx-auto flex tracking-[4px]">
                  {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((n) => {
                    const actual = n === pagina;
                    const etiqueta = String(n).padStart(2, "0");
                    const href = n === 1 ? "/blog" : `/blog/pagina/${n}`;

                    return (
                      <li key={n} className="mx-2">
                        {actual ? (
                          <span
                            aria-current="page"
                            className="block rounded-[5px] bg-purple px-3 py-2 text-white"
                          >
                            {etiqueta}
                            <span className="sr-only"> (página actual)</span>
                          </span>
                        ) : (
                          <Link
                            href={href}
                            className="block rounded-[5px] bg-graybg px-3 py-2 text-darkpurple"
                          >
                            {etiqueta}
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

          <div className="w-full lg:w-1/3 lg:ps-6">
            <BlogSidebar populares={populares} />
          </div>
        </div>
      </div>
    </>
  );
}
