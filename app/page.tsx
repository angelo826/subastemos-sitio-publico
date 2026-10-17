import { Hero } from "@/components/sections/Hero";
import { AccesosCompraVenta } from "@/components/sections/AccesosCompraVenta";
import { ProximasSubastas } from "@/components/sections/ProximasSubastas";
import { Beneficios } from "@/components/sections/Beneficios";
import { BannerMarcas } from "@/components/sections/BannerMarcas";
import { ComoFunciona } from "@/components/sections/ComoFunciona";
import { PatiosGrid } from "@/components/sections/PatiosGrid";
import { BannerInventario } from "@/components/sections/BannerInventario";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { grafo, webSite } from "@/lib/jsonld";
import { SITE } from "@/data/site";

const TITULO = "La mejor experiencia de subasta en México";
const DESCRIPCION =
  "Compra o vende a través de métodos innovadores y confiables, con garantía de pago de tus bienes en 5 días hábiles. Encuéntranos en Cancún, Monterrey, Guadalajara, Ciudad de México, Querétaro y Mérida.";

export const metadata = buildMetadata({
  titulo: TITULO,
  descripcion: DESCRIPCION,
  keywords: ["subastas", "México", "garantía", "compra", "vende"],
  path: "/",
});

export const dynamic = "force-static";
export const revalidate = false;

/**
 * Inicio. Rediseño oct-2026 a partir del layout que envió el cliente: primero
 * quién es Subastemos, luego las dos puertas (comprar y vender), las próximas
 * subastas y los patios.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <AccesosCompraVenta />
      <ProximasSubastas />
      <Beneficios />
      <BannerMarcas />
      <ComoFunciona />
      <PatiosGrid />
      <BannerInventario />

      <JsonLd
        data={grafo(
          webSite({
            titulo: TITULO,
            descripcion: DESCRIPCION,
            path: "/",
            imagen: SITE.imagenPorDefecto,
            publicadoEn: "2022-04-26T09:42:00-05:00",
          }),
        )}
      />
    </>
  );
}
