import Link from "next/link";

export interface Miga {
  nombre: string;
  href: string;
}

/**
 * Migas de pan. Fuente: el `<nav aria-label="breadcrumb">` del tema.
 * El último elemento no es enlace: es la página actual.
 */
export function Breadcrumbs({ migas }: { migas: Miga[] }) {
  return (
    <nav aria-label="Ruta de navegación" className="pb-3 pt-4 text-xl">
      <ol className="flex flex-wrap items-center gap-y-1">
        {migas.map((m, i) => {
          const ultima = i === migas.length - 1;
          return (
            <li key={m.href} className="flex items-center">
              {i > 0 && (
                <span className="text-bold px-2 text-purple" aria-hidden>
                  /
                </span>
              )}
              {ultima ? (
                <span className="text-bold text-purple" aria-current="page">
                  {m.nombre}
                </span>
              ) : (
                <Link href={m.href} className="text-blue hover:underline">
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
