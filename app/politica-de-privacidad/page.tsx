import { PaginaEditorial } from "@/components/sections/PaginaEditorial";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { grafo, webSite } from "@/lib/jsonld";
import { PAGINAS } from "@/data/paginas";

const PAGINA = PAGINAS["politica-de-privacidad"];
const PATH = "/politica-de-privacidad";

export const metadata = buildMetadata({
  titulo: PAGINA.seo.titulo,
  descripcion: PAGINA.seo.descripcion,
  keywords: PAGINA.seo.keywords,
  path: PATH,
});

export const dynamic = "force-static";
export const revalidate = false;

export default function PoliticaDePrivacidad() {
  return (
    <>
      <PaginaEditorial cuerpo={PAGINA.cuerpo} conCards={false} />

      <JsonLd
        data={grafo(
          webSite({
            titulo: PAGINA.seo.titulo,
            descripcion: PAGINA.seo.descripcion,
            path: PATH,
          }),
        )}
      />
    </>
  );
}
