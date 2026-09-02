import { Foto } from "@/components/Foto";

/**
 * Bloque principal del inicio: titular a la izquierda y mosaico de tres fotos
 * a la derecha. Fuente: `<section class="hero">` de index.html.
 *
 * El párrafo aparece dos veces en el clon (una versión para desktop y otra
 * para móvil, alternadas con d-none/d-block). Aquí se escribe una sola vez y
 * se reordena con flexbox, para no duplicar contenido en el DOM ni ante los
 * rastreadores.
 */
export function Hero() {
  return (
    <section className="container-bs">
      <div className="flex flex-wrap">
        <div className="flex w-full pe-0 lg:w-1/2 lg:pe-12">
          <div className="ps-2 pt-2 md:ps-6 md:py-12">
            <h1 className="text-title py-2 pe-0 text-purple text-[clamp(2.75rem,14vw,3.5rem)] leading-tight 2xl:text-[4rem] lg:pe-12">
              La mejor experiencia de subasta en México.
            </h1>

            <p className="hidden py-2 md:block">
              Compra o vende a través de métodos innovadores y confiables, con
              garantía de pago de tus bienes en 5 días hábiles.
            </p>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="container-bs py-0 lg:py-12">
            <div className="flex flex-wrap py-2">
              <div className="w-1/2 px-1">
                <Foto
                  src="/uploads/heroimg-111.jpg"
                  alt="Sala de subastas de Subastemos"
                  priority
                  sizes="(max-width: 992px) 50vw, 25vw"
                  className="h-full w-full rounded-[15px] object-cover"
                />
              </div>

              <div className="flex w-1/2 flex-col px-1">
                <Foto
                  src="/uploads/heroimg-22.jpg"
                  alt="Registro de asistentes a una subasta"
                  priority
                  sizes="(max-width: 992px) 50vw, 25vw"
                  className="h-1/2 w-full rounded-[15px] object-cover pb-1"
                />
                <Foto
                  src="/uploads/home-img33.jpg"
                  alt="Vehículo en exhibición previo a la subasta"
                  sizes="(max-width: 992px) 50vw, 25vw"
                  className="h-1/2 w-full rounded-[15px] object-cover pt-1"
                />
              </div>
            </div>

            <p className="py-4 md:hidden">
              Compra o vende a través de métodos innovadores y confiables, con
              garantía de pago de tus bienes en 5 días hábiles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
