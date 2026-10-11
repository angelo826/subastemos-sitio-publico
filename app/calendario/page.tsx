import { CalendarMonth } from "@/components/sections/CalendarMonth";
import { EncabezadoPagina } from "@/components/sections/EncabezadoPagina";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { grafo, webSite } from "@/lib/jsonld";
import { construirMes, mesInicial } from "@/lib/calendario";

const PATH = "/calendario";
const TITULO = "Calendario";
const DESCRIPCION =
  "Conoce nuestras próximas subastas. Compra o vende a través de métodos innovadores y confiables, con garantía de pago de tus bienes en 5 días hábiles.";

export const metadata = buildMetadata({
  titulo: TITULO,
  descripcion: DESCRIPCION,
  keywords: ["Calendario"],
  path: PATH,
  imagenAlt: TITULO,
});

export const dynamic = "force-static";
export const revalidate = false;

export default function Calendario() {
  // El clon abría por el mes en curso del volcado. Aquí se entra por el mes
  // de la próxima subasta, que sale de los datos y no del reloj del build.
  const inicial = mesInicial();
  const mes = construirMes(inicial.anio, inicial.mes);

  return (
    <>
      <EncabezadoPagina
        titulo="Calendario de subastas"
        subtitulo="Consulta las fechas y entra a la subasta desde su día en el calendario."
        migas={[
          { nombre: "Inicio", href: "/" },
          { nombre: "Calendario", href: PATH },
        ]}
      />

      <div className="container-bs py-10 md:py-14">
        <CalendarMonth mes={mes} />
      </div>

      <JsonLd
        data={grafo(
          webSite({ titulo: TITULO, descripcion: DESCRIPCION, path: PATH }),
        )}
      />
    </>
  );
}
