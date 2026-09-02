import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CardsCta } from "@/components/sections/CardsCta";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { grafo, webSite, breadcrumbs } from "@/lib/jsonld";
import { SEO_TIPOS, TITULO_TIPOS, TIPOS_DE_SUBASTA } from "@/data/tipos-de-subastas";

const PATH = "/tipos-de-subastas";
const NOMBRE = "Tipos de Subastas";

export const metadata = buildMetadata({
  titulo: SEO_TIPOS.titulo,
  descripcion: SEO_TIPOS.descripcion,
  keywords: SEO_TIPOS.keywords,
  path: PATH,
});

export const dynamic = "force-static";
export const revalidate = false;

export default function TiposDeSubastas() {
  return (
    <>
      <div className="container-bs">
        <Breadcrumbs
          migas={[
            { nombre: "Inicio", href: "/" },
            { nombre: NOMBRE, href: PATH },
          ]}
        />

        <h1 className="text-title py-6 text-center text-4xl text-purple">
          {TITULO_TIPOS}
        </h1>

        <div className="pb-12">
          {TIPOS_DE_SUBASTA.map((t) => (
            <article key={t.titulo} className="py-3">
              <h2 className="text-bold rounded-[15px] bg-darkpurple p-4 px-6 text-white text-[1.4rem]">
                {t.titulo}
              </h2>
              <p className="p-4">{t.descripcion}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="container-bs py-12">
        <CardsCta />
      </div>

      <JsonLd
        data={grafo(
          webSite({
            titulo: SEO_TIPOS.titulo,
            descripcion: SEO_TIPOS.descripcion,
            path: PATH,
          }),
          breadcrumbs([{ nombre: NOMBRE, path: PATH }]),
        )}
      />
    </>
  );
}
