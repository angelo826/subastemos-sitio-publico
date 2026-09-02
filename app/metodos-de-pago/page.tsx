import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
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
      <div className="container-bs">
        <Breadcrumbs
          migas={[
            { nombre: "Inicio", href: "/" },
            { nombre: NOMBRE, href: PATH },
          ]}
        />

        <h1 className="text-title py-2 text-center text-4xl text-purple">
          {TITULO_PAGOS}
        </h1>

        <div className="py-2">
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

      <div className="container-bs py-12">
        <CardsCta />
      </div>

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
