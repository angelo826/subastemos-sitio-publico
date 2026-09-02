import { Hero } from "@/components/sections/Hero";
import { NavTabs } from "@/components/sections/NavTabs";
import { SeccionSubastas } from "@/components/sections/SeccionSubastas";
import { ArticuloDestacado } from "@/components/sections/ArticuloDestacado";
import { PatiosGrid } from "@/components/sections/PatiosGrid";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { grafo, webSite } from "@/lib/jsonld";
import { POSTS } from "@/data/posts";
import { SITE } from "@/data/site";

const TITULO = "La mejor experiencia de subasta en México";
const DESCRIPCION =
  "Compra o vende a través de métodos innovadores y confiables, con garantía de pago de tus bienes en 5 días hábiles. Encuéntranos en CDMX, Querétaro y Puebla.";

export const metadata = buildMetadata({
  titulo: TITULO,
  descripcion: DESCRIPCION,
  keywords: ["subastas", "México", "garantía", "compra", "vende"],
  path: "/",
});

export const dynamic = "force-static";
export const revalidate = false;

export default function Home() {
  // El clon destacaba «Las marcas chinas de autos en México», que es el
  // segundo artículo por fecha. Se toma por posición para que el destacado
  // se mueva solo al publicar contenido nuevo.
  const destacado = POSTS[1] ?? POSTS[0];

  return (
    <>
      <Hero />
      <NavTabs />
      <SeccionSubastas />
      {destacado && <ArticuloDestacado post={destacado} />}
      <PatiosGrid />

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
