import { Foto } from "@/components/Foto";
import { PaginaEditorial } from "@/components/sections/PaginaEditorial";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { grafo, webSite } from "@/lib/jsonld";
import { PAGINAS } from "@/data/paginas";

const PAGINA = PAGINAS["nosotros"];
const PATH = "/nosotros";

export const metadata = buildMetadata({
  titulo: PAGINA.seo.titulo,
  descripcion: PAGINA.seo.descripcion,
  keywords: PAGINA.seo.keywords,
  path: PATH,
});

export const dynamic = "force-static";
export const revalidate = false;

export default function Nosotros() {
  return (
    <>
      {/* Par de imágenes de cabecera, en proporción 9/3 como en el tema. */}
      <div className="container-bs">
        <div className="flex py-4">
          <div className="w-3/4 px-1">
            <Foto
              src="/uploads/rectangle@3x.webp"
              alt="Equipo de Subastemos durante una subasta"
              priority
              sizes="75vw"
              className="h-full w-full rounded-[15px] object-cover"
            />
          </div>
          <div className="w-1/4 px-1">
            <Foto
              src="/uploads/rectangle-copy-2@3x.webp"
              alt="Detalle de una unidad en subasta"
              priority
              sizes="25vw"
              className="h-full w-full rounded-[15px] object-cover"
            />
          </div>
        </div>
      </div>

      <PaginaEditorial cuerpo={PAGINA.cuerpo} variante="nosotros" />

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
