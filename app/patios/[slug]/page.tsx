import { notFound } from "next/navigation";
import { MapPin, MessageCircle } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { HeaderImage } from "@/components/sections/HeaderImage";
import { GoogleMap } from "@/components/sections/GoogleMap";
import { SubastasSwiper } from "@/components/sections/SubastasSwiper";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { grafo, webSite, breadcrumbs } from "@/lib/jsonld";
import { patiosRepository, subastasRepository } from "@/lib/repositories";
import { PATIOS } from "@/data/patios";

export const dynamic = "force-static";
export const revalidate = false;

/** Las dos rutas de patio son fijas y se conocen en el build. */
export function generateStaticParams() {
  return PATIOS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const patio = await patiosRepository.porSlug(slug);
  if (!patio) return {};

  return buildMetadata({
    titulo: patio.seo.titulo,
    descripcion: patio.seo.descripcion,
    keywords: patio.seo.keywords,
    path: `/patios/${patio.slug}`,
    imagen: patio.imagenHero,
    imagenAlt: patio.nombre,
  });
}

export default async function PaginaPatio({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const patio = await patiosRepository.porSlug(slug);
  if (!patio) notFound();

  const subastas = await subastasRepository.porPatio(slug);
  const path = `/patios/${patio.slug}`;

  return (
    <>
      <div className="container-bs py-12">
        <Breadcrumbs
          migas={[
            { nombre: "Inicio", href: "/" },
            { nombre: patio.nombre, href: path },
          ]}
        />

        <HeaderImage titulo={patio.nombre} imagen={patio.imagenHero} />

        <div className="flex flex-wrap py-12">
          <div className="w-full py-12 lg:w-1/2">
            <h2 className="text-title py-12 text-center text-3xl text-purple">
              {patio.tituloBloque}
            </h2>

            <div className="flex items-center">
              <MapPin className="my-auto size-12 shrink-0 pe-4 text-purple" aria-hidden />
              <p className="my-auto text-2xl">{patio.direccion}</p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 py-6">
              <a
                href={`tel:${patio.telefono}`}
                className="text-bold bg-orange px-4 py-2 text-darkpurple"
              >
                Llámanos
              </a>
              <span className="px-2 md:px-4">ó</span>
              <a
                href={patio.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-bold inline-flex items-center gap-2 bg-green px-4 py-2 text-white"
              >
                <MessageCircle className="size-4" aria-hidden />
                <span>Escríbenos</span>
              </a>
            </div>
          </div>

          <div className="min-h-[400px] w-full px-0 lg:w-1/2 lg:px-12">
            <GoogleMap
              lat={patio.coordenadas.lat}
              lng={patio.coordenadas.lng}
              titulo={`Patio ${patio.nombre}`}
              direccion={patio.direccion}
            />
          </div>
        </div>
      </div>

      {subastas.length > 0 && (
        <section className="my-3 bg-[url('/assets/rectangle.svg')] bg-cover bg-center bg-no-repeat">
          <div className="py-12">
            <h2 className="text-title pt-6 pb-6 text-center text-4xl text-purple">
              Subastas
            </h2>
            <SubastasSwiper subastas={subastas} />
          </div>
        </section>
      )}

      <JsonLd
        data={grafo(
          webSite({
            titulo: patio.seo.titulo,
            descripcion: patio.seo.descripcion,
            path,
            imagen: patio.imagenHero,
          }),
          breadcrumbs([{ nombre: patio.nombre, path }]),
        )}
      />
    </>
  );
}
