import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
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
  "Escríbenos y resolvemos tus dudas sobre nuestras subastas. Encuéntranos en CDMX y Querétaro.";

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
      <div className="container-bs">
        <Breadcrumbs
          migas={[
            { nombre: "Inicio", href: "/" },
            { nombre: NOMBRE, href: PATH },
          ]}
        />

        <h1 className="text-title py-2 text-center text-4xl text-purple">
          Contáctanos
        </h1>
      </div>

      <ContactForm origen="contacto" />

      <div className="container-bs py-6">
        <CardsCta />
      </div>

      <div className="container-bs py-12">
        <div className="h-[500px]">
          <GoogleMap
            lat={SITE.geo.lat}
            lng={SITE.geo.lng}
            titulo={SITE.nombre}
            direccion={`${SITE.direccion.calle}, ${SITE.direccion.codigoPostal} ${SITE.direccion.region}`}
          />
        </div>
      </div>

      <JsonLd
        data={grafo(
          webSite({ titulo: TITULO, descripcion: DESCRIPCION, path: PATH }),
          breadcrumbs([{ nombre: NOMBRE, path: PATH }]),
        )}
      />
    </>
  );
}
