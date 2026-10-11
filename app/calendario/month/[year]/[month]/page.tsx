import { notFound } from "next/navigation";
import { EncabezadoPagina } from "@/components/sections/EncabezadoPagina";
import { CalendarMonth } from "@/components/sections/CalendarMonth";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { grafo, webSite, breadcrumbs } from "@/lib/jsonld";
import { construirMes, dentroDeRango, mesesDelRango, rutaMes } from "@/lib/calendario";

export const dynamic = "force-static";
export const revalidate = false;

/**
 * Los meses navegables son un rango fijo conocido en el build: la ruta no se
 * genera a partir de ninguna respuesta remota. Ver el modelo de renderizado en
 * docs/ARQUITECTURA.md.
 */
export function generateStaticParams() {
  return mesesDelRango().map(({ anio, mes }) => ({
    year: String(anio),
    month: String(mes).padStart(2, "0"),
  }));
}

function parsear(year: string, month: string) {
  const anio = Number(year);
  const mes = Number(month);
  if (!Number.isInteger(anio) || !Number.isInteger(mes)) return null;
  if (!dentroDeRango(anio, mes)) return null;
  return { anio, mes };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string; month: string }>;
}) {
  const { year, month } = await params;
  const p = parsear(year, month);
  if (!p) return {};

  const mes = construirMes(p.anio, p.mes);
  return buildMetadata({
    titulo: `Calendario de subastas — ${mes.nombre}`,
    descripcion: `Subastas programadas en ${mes.nombre}. Consulta fechas, sedes y modalidades.`,
    path: rutaMes(p.anio, p.mes),
  });
}

export default async function MesCalendarioPagina({
  params,
}: {
  params: Promise<{ year: string; month: string }>;
}) {
  const { year, month } = await params;
  const p = parsear(year, month);
  if (!p) notFound();

  const mes = construirMes(p.anio, p.mes);
  const path = rutaMes(p.anio, p.mes);

  return (
    <>
      <EncabezadoPagina
        titulo="Calendario de subastas"
        migas={[
          { nombre: "Inicio", href: "/" },
          { nombre: "Calendario", href: "/calendario" },
          { nombre: mes.nombre, href: path },
        ]}
      />

      <div className="container-bs py-10 md:py-14">
        <CalendarMonth mes={mes} />
      </div>

      <JsonLd
        data={grafo(
          webSite({
            titulo: `Calendario de subastas — ${mes.nombre}`,
            descripcion: `Subastas programadas en ${mes.nombre}.`,
            path,
          }),
          breadcrumbs([
            { nombre: "Calendario", path: "/calendario" },
            { nombre: mes.nombre, path },
          ]),
        )}
      />
    </>
  );
}
