import { EncabezadoPagina } from "@/components/sections/EncabezadoPagina";
import { ContactForm } from "@/components/sections/ContactForm";
import { CardsCta } from "@/components/sections/CardsCta";
import { GoogleMap } from "@/components/sections/GoogleMap";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { grafo, webSite, breadcrumbs } from "@/lib/jsonld";
import { SITE } from "@/data/site";

const PATH = "/contacto";
const NOMBRE = "Contacto";
const TITULO = "Contacto";
const DESCRIPCION =
  "Escríbenos y resolvemos tus dudas sobre nuestras subastas. Encuéntranos en Cancún, Monterrey, Guadalajara, Ciudad de México, Querétaro y Mérida.";

export const metadata = buildMetadata({
  titulo: TITULO,
  descripcion: DESCRIPCION,
  keywords: ["contacto", "Subastemos"],
  path: PATH,
});

export const dynamic = "force-static";
export const revalidate = false;

export default function Contacto() {
  return (
    <>
      <EncabezadoPagina
        titulo="Contáctanos"
        subtitulo="Escríbenos y resolvemos tus dudas sobre nuestras subastas."
        migas={[
          { nombre: "Inicio", href: "/" },
          { nombre: NOMBRE, href: PATH },
        ]}
      />

      <ContactForm origen="contacto" />

      <div className="container-bs pb-14">
        <div className="h-[420px] overflow-hidden rounded-3xl">
          <GoogleMap
            lat={SITE.geo.lat}
            lng={SITE.geo.lng}
            titulo={SITE.nombre}
            direccion={`${SITE.direccion.calle}, ${SITE.direccion.codigoPostal} ${SITE.direccion.region}`}
          />
        </div>
      </div>

      <CardsCta />

      <JsonLd
        data={grafo(
          webSite({ titulo: TITULO, descripcion: DESCRIPCION, path: PATH }),
          breadcrumbs([{ nombre: NOMBRE, path: PATH }]),
        )}
      />
    </>
  );
}
