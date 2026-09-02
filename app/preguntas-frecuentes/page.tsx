import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
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
      <div className="container-bs">
        <Breadcrumbs
          migas={[
            { nombre: "Inicio", href: "/" },
            { nombre: NOMBRE, href: PATH },
          ]}
        />

        <h1 className="text-title py-2 text-center text-4xl text-purple">
          Preguntas Frecuentes
        </h1>

        <FiltrosFaq categorias={categorias} faqs={faqs} />
      </div>

      <div className="container-bs py-12">
        <CardsCta />
      </div>

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
