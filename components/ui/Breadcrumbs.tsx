import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface Miga {
  nombre: string;
  href: string;
}

/**
 * Migas de pan. El último elemento no es enlace: es la página actual.
 * `tono="oscuro"` es para cuando van sobre una foto o un fondo de marca.
 */
export function Breadcrumbs({
  migas,
  tono = "claro",
}: {
  migas: Miga[];
  tono?: "claro" | "oscuro";
}) {
  const oscuro = tono === "oscuro";

  return (
    <nav aria-label="Ruta de navegación" className="text-sm">
      <ol className="flex flex-wrap items-center gap-y-1">
        {migas.map((m, i) => {
          const ultima = i === migas.length - 1;
          return (
            <li key={m.href} className="flex items-center">
              {i > 0 && (
                <ChevronRight
                  className={`mx-1.5 size-3.5 ${oscuro ? "text-white/50" : "text-darkpurple/40"}`}
                  aria-hidden
                />
              )}
              {ultima ? (
                <span
                  className={`text-bold line-clamp-1 ${oscuro ? "text-white" : "text-darkpurple"}`}
                  aria-current="page"
                >
                  {m.nombre}
                </span>
              ) : (
                <Link
                  href={m.href}
                  className={
                    oscuro
                      ? "text-white/75 hover:text-white"
                      : "text-darkpurple/70 hover:text-purple"
                  }
                >
                  {m.nombre}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
