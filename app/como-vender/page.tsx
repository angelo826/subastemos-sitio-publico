import { PaginaEditorial } from "@/components/sections/PaginaEditorial";
import { Acordeon } from "@/components/ui/Acordeon";
import { ContactForm } from "@/components/sections/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { grafo, webSite, breadcrumbs } from "@/lib/jsonld";
import { PAGINAS } from "@/data/paginas";
import { FAQS_COMO_VENDER } from "@/data/faqs";

const PAGINA = PAGINAS["como-vender"];
const PATH = "/como-vender";
const NOMBRE = "¿Cómo vender?";

export const metadata = buildMetadata({
  titulo: PAGINA.seo.titulo,
  descripcion: PAGINA.seo.descripcion,
  keywords: PAGINA.seo.keywords,
  path: PATH,
});

export const dynamic = "force-static";
export const revalidate = false;

export default function ComoVender() {
  return (
    <>
      <PaginaEditorial
        migas={[
          { nombre: "Inicio", href: "/" },
          { nombre: NOMBRE, href: PATH },
        ]}
        cuerpo={PAGINA.cuerpo}
        conCards={false}
        antesDeCards={
          <>
            {FAQS_COMO_VENDER.length > 0 && (
              <div className="container-bs pb-14">
                <h2 className="titulo-seccion mb-6">Preguntas frecuentes</h2>
                <Acordeon
                  items={FAQS_COMO_VENDER.map((f, i) => ({
                    id: `pregunta-${i + 1}`,
                    titulo: f.pregunta,
                    contenido: f.respuesta,
                  }))}
                />
              </div>
            )}
            <ContactForm origen="como-vender" />
          </>
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
