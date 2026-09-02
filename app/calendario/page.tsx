import { CalendarMonth } from "@/components/sections/CalendarMonth";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { grafo, webSite } from "@/lib/jsonld";
import { construirMes, RANGO } from "@/lib/calendario";

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
  // El clon abría por el mes en curso del volcado. Aquí se entra por el primer
  // mes del rango, que es determinista y no depende de cuándo se compile.
  const mes = construirMes(RANGO.desde.anio, RANGO.desde.mes);

  return (
    <>
      <div className="container-bs py-6">
        <h1 className="text-title py-4 text-4xl text-purple">
          Calendario de Subastas
        </h1>
        <hr className="mb-6" />

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
