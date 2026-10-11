import { EncabezadoPagina } from "@/components/sections/EncabezadoPagina";
import { FiltrosFaq } from "@/components/sections/FiltrosFaq";
import { CardsCta } from "@/components/sections/CardsCta";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { grafo, webSite, breadcrumbs } from "@/lib/jsonld";
import { faqsRepository } from "@/lib/repositories";
import { SEO_FAQ } from "@/data/faqs";

const PATH = "/preguntas-frecuentes";
const NOMBRE = "Preguntas Frecuentes";

export const metadata = buildMetadata({
  titulo: SEO_FAQ.titulo,
  descripcion: SEO_FAQ.descripcion,
  keywords: SEO_FAQ.keywords,
  path: PATH,
});

export const dynamic = "force-static";
export const revalidate = false;

export default async function PreguntasFrecuentes() {
  const [faqs, categorias] = await Promise.all([
    faqsRepository.listar(),
    faqsRepository.categorias(),
  ]);

  return (
    <>
      <EncabezadoPagina
        titulo="Preguntas frecuentes"
        migas={[
          { nombre: "Inicio", href: "/" },
          { nombre: NOMBRE, href: PATH },
        ]}
      />

      <div className="container-bs py-10 md:py-14">
        <div className="max-w-4xl">
          <FiltrosFaq categorias={categorias} faqs={faqs} />
        </div>
      </div>

      <CardsCta />

      <JsonLd
        data={grafo(
          webSite({
            titulo: SEO_FAQ.titulo,
            descripcion: SEO_FAQ.descripcion,
            path: PATH,
          }),
          breadcrumbs([{ nombre: NOMBRE, path: PATH }]),
          // FAQPage no existía en el clon. Es lo que permite que estas
          // preguntas opten a resultados enriquecidos en Google.
          {
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.pregunta,
              acceptedAnswer: {
                "@type": "Answer",
                text: f.respuesta.replace(/<[^>]+>/g, "").trim(),
              },
            })),
          },
        )}
      />
    </>
  );
}
