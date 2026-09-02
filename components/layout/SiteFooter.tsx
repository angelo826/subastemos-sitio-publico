import Link from "next/link";
import { COLUMNAS_FOOTER } from "@/data/navigation";
import { NewsletterForm } from "./NewsletterForm";

/**
 * Pie de página del portal.
 *
 * Réplica del <footer class="footer"> del clon, byte-idéntico en las 33
 * páginas. Las columnas y qué se oculta en cada breakpoint viven en
 * data/navigation.ts, en lugar de las reglas CSS por id que usaba el tema
 * (`.footer #SUBASTAS #Tiposdesubastas { display: none }`).
 */
export function SiteFooter() {
  return (
    <footer className="bg-darkpurple">
      <div className="container-bs text-white">
        <div className="flex flex-wrap py-4">
          {/* Reserva: en móvil va arriba del todo; en sm+ se mueve a la
              cuarta columna, junto a la suscripción. */}
          <div className="w-full px-4 py-3 sm:hidden">
            <p>Agenda para conocer nuestros lotes antes de la subasta.</p>
            <Link
              href="/reservas"
              className="text-bold mt-3 inline-block bg-orange px-4 py-2 text-darkpurple"
            >
              Reserva tu visita
            </Link>
          </div>

          {COLUMNAS_FOOTER.map((col) => (
            <div
              key={col.id}
              className={`w-full px-4 py-3 sm:w-1/2 sm:p-6 lg:w-1/4 ${
                col.ocultarEnMovil ? "hidden sm:block" : ""
              }`}
            >
              <p className="text-title tracking-[4.5px] text-lg text-white">
                {col.titulo}
              </p>

              <ul
                className={`list-none px-0 py-2 ${
                  col.ocultarListaEnMovil ? "hidden sm:block" : ""
                }`}
              >
                {col.items.map((item) => (
                  <li
                    key={item.label}
                    className={`py-2 ${item.soloMovil ? "sm:hidden" : ""}`}
                  >
                    {item.href ? (
                      <Link href={item.href} className="text-white">
                        {item.label}
                      </Link>
                    ) : (
                      <span className="text-white">{item.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="w-full px-4 py-3 sm:w-1/2 sm:p-6 lg:w-1/4">
            <div className="hidden pb-3 sm:block">
              <p className="my-0 pb-3">
                Agenda para conocer nuestros lotes antes de la subasta.
              </p>
              <Link
                href="/reservas"
                className="text-bold inline-block bg-orange px-4 py-1 text-darkpurple"
              >
                Reserva tu visita
              </Link>
            </div>

            <div>
              <p className="text-title tracking-[4.5px] py-2 text-lg">
                SUSCRÍBETE
              </p>
              <p>Recibe exclusiva información de nuestras próximas subastas.</p>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-grad-footer text-center text-white">
        <p className="m-0 py-3">
          <span className="px-2">© Subastemos 2026 por IPETIK SOLUTIONS</span>
          {" | "}
          <Link href="/politica-de-privacidad" className="px-2">
            Política de privacidad
          </Link>
        </p>
      </div>
    </footer>
  );
}

