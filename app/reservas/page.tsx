import { SimplyBookWidget } from "@/components/sections/SimplyBookWidget";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { grafo, webSite } from "@/lib/jsonld";

const PATH = "/reservas";
const TITULO = "Reserva tu próxima visita de revisión";
const DESCRIPCION =
  "Reserva tu próxima visita de revisión. Compra o vende a través de métodos innovadores y confiables, con garantía de pago de tus bienes en 5 días hábiles.";

export const metadata = buildMetadata({
  titulo: TITULO,
  descripcion: DESCRIPCION,
  keywords: ["Reservas"],
  path: PATH,
});

export const dynamic = "force-static";
export const revalidate = false;

export default function Reservas() {
  return (
    <>
      <div className="container-bs">
        <h1 className="text-title py-6 text-center text-4xl text-purple">
          {TITULO}
        </h1>

        <SimplyBookWidget />
      </div>

      <JsonLd
        data={grafo(
          webSite({ titulo: TITULO, descripcion: DESCRIPCION, path: PATH }),
        )}
      />
    </>
  );
}
