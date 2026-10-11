import { EncabezadoPagina } from "@/components/sections/EncabezadoPagina";
import { Acordeon } from "@/components/ui/Acordeon";
import { CardsCta } from "@/components/sections/CardsCta";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { grafo, webSite, breadcrumbs } from "@/lib/jsonld";
import { SEO_PAGOS, TITULO_PAGOS, METODOS_DE_PAGO } from "@/data/metodos-de-pago";

const PATH = "/metodos-de-pago";
const NOMBRE = "Métodos de Pago";

export const metadata = buildMetadata({
  titulo: SEO_PAGOS.titulo,
  descripcion: SEO_PAGOS.descripcion,
  keywords: SEO_PAGOS.keywords,
  path: PATH,
});

export const dynamic = "force-static";
export const revalidate = false;

export default function MetodosDePago() {
  return (
    <>
      <EncabezadoPagina
        titulo={TITULO_PAGOS}
        migas={[
          { nombre: "Inicio", href: "/" },
          { nombre: NOMBRE, href: PATH },
        ]}
      />

      <div className="container-bs py-10 md:py-14">
        <div className="max-w-4xl">
          <Acordeon
            variante="oscuro"
            items={METODOS_DE_PAGO.map((m, i) => ({
              id: `metodo-${i + 1}`,
              titulo: m.titulo,
              contenido: m.contenido,
              icono: m.icono,
            }))}
          />
        </div>
      </div>

      <CardsCta />

      <JsonLd
        data={grafo(
          webSite({
            titulo: SEO_PAGOS.titulo,
            descripcion: SEO_PAGOS.descripcion,
            path: PATH,
          }),
          breadcrumbs([{ nombre: NOMBRE, path: PATH }]),
        )}
      />
    </>
  );
}
