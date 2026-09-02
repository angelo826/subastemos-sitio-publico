import { PaginaEditorial } from "@/components/sections/PaginaEditorial";
import { Acordeon } from "@/components/ui/Acordeon";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { grafo, webSite, breadcrumbs } from "@/lib/jsonld";
import { PAGINAS } from "@/data/paginas";
import { FAQS_COMO_COMPRAR } from "@/data/faqs";

const PAGINA = PAGINAS["como-comprar"];
const PATH = "/como-comprar";
const NOMBRE = "¿Cómo comprar?";

export const metadata = buildMetadata({
  titulo: PAGINA.seo.titulo,
  descripcion: PAGINA.seo.descripcion,
  keywords: PAGINA.seo.keywords,
  path: PATH,
});

export const dynamic = "force-static";
export const revalidate = false;

export default function ComoComprar() {
  return (
    <>
      <PaginaEditorial
        migas={[
          { nombre: "Inicio", href: "/" },
          { nombre: NOMBRE, href: PATH },
        ]}
        cuerpo={PAGINA.cuerpo}
        antesDeCards={
          FAQS_COMO_COMPRAR.length > 0 && (
            <div className="container-bs py-6">
              <Acordeon
                items={FAQS_COMO_COMPRAR.map((f, i) => ({
                  id: `pregunta-${i + 1}`,
                  titulo: f.pregunta,
                  contenido: f.respuesta,
                }))}
              />
            </div>
          )
        }
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
