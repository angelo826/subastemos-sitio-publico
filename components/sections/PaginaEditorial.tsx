import { Breadcrumbs, type Miga } from "@/components/ui/Breadcrumbs";
import { RedactorText } from "@/components/ui/RedactorText";
import { CardsCta } from "./CardsCta";

/**
 * Plantilla de las páginas de texto largo: migas, cuerpo editorial y el par de
 * tarjetas de llamada a la acción que el tema repite al pie.
 *
 * Cubre /nosotros, /como-comprar, /como-vender, /subastas-bienes-raices y
 * /politica-de-privacidad, que en el clon eran cinco copias del mismo molde.
 */
export function PaginaEditorial({
  migas,
  cuerpo,
  variante,
  antesDeCards,
  conCards = true,
}: {
  migas?: Miga[];
  /** Cuerpo en HTML procedente de data/paginas.ts. */
  cuerpo: string;
  variante?: "nosotros";
  /** Contenido extra entre el cuerpo y las tarjetas (acordeones, formulario). */
  antesDeCards?: React.ReactNode;
  conCards?: boolean;
}) {
  return (
    <>
      <div className="container-bs py-12">
        {migas && <Breadcrumbs migas={migas} />}
        <RedactorText html={cuerpo} variante={variante} />
      </div>

      {antesDeCards}

      {conCards && (
        <div className="container-bs py-12">
          <CardsCta />
        </div>
      )}
    </>
  );
}
