import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { EncabezadoPagina } from "@/components/sections/EncabezadoPagina";
import { GoogleMap } from "@/components/sections/GoogleMap";
import { ProximasSubastas } from "@/components/sections/ProximasSubastas";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { grafo, webSite, breadcrumbs } from "@/lib/jsonld";
import { patiosRepository } from "@/lib/repositories";
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

  const path = `/patios/${patio.slug}`;

  return (
    <>
      <EncabezadoPagina
        titulo={patio.nombre}
        subtitulo={patio.tituloBloque}
        imagen={patio.imagenHero}
        migas={[
          { nombre: "Inicio", href: "/" },
          { nombre: patio.nombre, href: path },
        ]}
      />

      <div className="container-bs py-10 md:py-14">
        <div className="grid items-stretch gap-6 lg:grid-cols-2">
          <div className="flex flex-col justify-center rounded-3xl bg-lavender p-6 md:p-10">
            <h2 className="titulo-seccion">{patio.tituloBloque}</h2>

            <p className="mt-6 flex items-start gap-3 text-xl text-darkpurple">
              <MapPin className="mt-1 size-6 shrink-0 text-orange" aria-hidden />
              {patio.direccion}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`tel:${patio.telefono}`} className="btn btn-primary">
                <Phone className="size-4" aria-hidden />
                Llámanos
              </a>
              <a
                href={patio.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-green text-white hover:bg-[#039a0f]"
              >
                <MessageCircle className="size-4" aria-hidden />
                Escríbenos
              </a>
              <Link href="/reservas" className="btn btn-outline">
                Reserva tu visita
              </Link>
            </div>
          </div>

          <div className="min-h-[360px] overflow-hidden rounded-3xl">
            <GoogleMap
              lat={patio.coordenadas.lat}
              lng={patio.coordenadas.lng}
              titulo={`Patio ${patio.nombre}`}
              direccion={patio.direccion}
            />
          </div>
        </div>
      </div>

      <ProximasSubastas />

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
