import type { Miga } from "@/components/ui/Breadcrumbs";
import { RedactorText } from "@/components/ui/RedactorText";
import { CardsCta } from "./CardsCta";
import { EncabezadoPagina } from "./EncabezadoPagina";

/**
 * Separa el `<h1>` con el que empieza el HTML editorial del resto del cuerpo,
 * para que el título vaya en el encabezado común de las páginas interiores.
 * Si el cuerpo no empieza por un h1 se devuelve tal cual.
 */
function separarTitulo(html: string): { titulo: string | null; resto: string } {
  const m = /^\s*<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(html);
  if (!m) return { titulo: null, resto: html };
  const titulo = m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  return { titulo, resto: html.slice(m[0].length) };
}

/**
 * Plantilla de las páginas de texto largo: encabezado, cuerpo editorial y el
 * par de tarjetas de llamada a la acción del pie.
 *
 * Cubre /nosotros, /como-comprar, /como-vender, /subastas-bienes-raices y
 * /politica-de-privacidad, que en el clon eran cinco copias del mismo molde.
 */
export function PaginaEditorial({
  migas,
  cuerpo,
  variante,
  despuesDelTitulo,
  antesDeCards,
  conCards = true,
}: {
  migas?: Miga[];
  /** Cuerpo en HTML procedente de data/paginas.ts, con su h1. */
  cuerpo: string;
  variante?: "nosotros";
  /** Contenido entre el encabezado y el cuerpo (fotos de /nosotros). */
  despuesDelTitulo?: React.ReactNode;
  /** Contenido extra entre el cuerpo y las tarjetas (acordeones, formulario). */
  antesDeCards?: React.ReactNode;
  conCards?: boolean;
}) {
  const { titulo, resto } = separarTitulo(cuerpo);

  return (
    <>
      {titulo && <EncabezadoPagina titulo={titulo} migas={migas} />}

      {despuesDelTitulo}

      <div className="container-bs py-10 md:py-14">
        <div className="max-w-4xl">
          <RedactorText html={titulo ? resto : cuerpo} variante={variante} />
        </div>
      </div>

      {antesDeCards}

      {conCards && <CardsCta />}
    </>
  );
}
