import { EncabezadoPagina } from "@/components/sections/EncabezadoPagina";
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
      <EncabezadoPagina
        titulo={TITULO_TIPOS}
        migas={[
          { nombre: "Inicio", href: "/" },
          { nombre: NOMBRE, href: PATH },
        ]}
      />

      <div className="container-bs py-10 md:py-14">
        <div className="grid gap-5 md:grid-cols-2">
          {TIPOS_DE_SUBASTA.map((t, i) => (
            <article
              key={t.titulo}
              className="rounded-3xl border border-lilac bg-white p-6 shadow-sm md:p-8"
            >
              <span className="text-title grid size-10 place-items-center rounded-full bg-orange text-white">
                {i + 1}
              </span>
              <h2 className="text-title mt-4 text-2xl text-darkpurple">{t.titulo}</h2>
              <p className="mt-2 text-darkpurple/80">{t.descripcion}</p>
            </article>
          ))}
        </div>
      </div>

      <CardsCta />

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
