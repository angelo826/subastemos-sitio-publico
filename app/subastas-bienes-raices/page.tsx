import { PaginaEditorial } from "@/components/sections/PaginaEditorial";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { grafo, webSite, breadcrumbs } from "@/lib/jsonld";
import { PAGINAS } from "@/data/paginas";

const PAGINA = PAGINAS["subastas-bienes-raices"];
const PATH = "/subastas-bienes-raices";
const NOMBRE = "Subastas Bienes Raíces";

export const metadata = buildMetadata({
  titulo: PAGINA.seo.titulo,
  descripcion: PAGINA.seo.descripcion,
  keywords: PAGINA.seo.keywords,
  path: PATH,
});

export const dynamic = "force-static";
export const revalidate = false;

export default function SubastasBienesRaices() {
  return (
    <>
      <PaginaEditorial
        migas={[
          { nombre: "Inicio", href: "/" },
          { nombre: NOMBRE, href: PATH },
        ]}
        cuerpo={PAGINA.cuerpo}
      />

      <JsonLd
        data={grafo(
          webSite({
            titulo: PAGINA.seo.titulo,
            descripcion: PAGINA.seo.descripcion,
            path: PATH,
          }),
          breadcrumbs([{ nombre: NOMBRE, path: PATH }]),
        )}
      />
    </>
  );
}
