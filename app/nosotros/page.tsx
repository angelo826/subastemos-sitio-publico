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
      <PaginaEditorial
        migas={[
          { nombre: "Inicio", href: "/" },
          { nombre: "Nosotros", href: PATH },
        ]}
        cuerpo={PAGINA.cuerpo}
        variante="nosotros"
        despuesDelTitulo={<FotosNosotros />}
      />

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

/** Par de fotos bajo el encabezado, en proporción 3:1 como en el tema. */
function FotosNosotros() {
  return (
    <div className="container-bs pt-10">
      <div className="flex gap-3">
        <div className="w-3/4">
          <Foto
            src="/uploads/rectangle@3x.webp"
            alt="Equipo de Subastemos durante una subasta"
            priority
            sizes="75vw"
            className="h-full w-full rounded-3xl object-cover"
          />
        </div>
        <div className="w-1/4">
          <Foto
            src="/uploads/rectangle-copy-2@3x.webp"
            alt="Detalle de una unidad en subasta"
            priority
            sizes="25vw"
            className="h-full w-full rounded-3xl object-cover"
          />
        </div>
      </div>
    </div>
  );
}
