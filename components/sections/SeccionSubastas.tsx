import { SUBASTAS_COMPLETADAS, SUBASTAS_PROXIMAS } from "@/data/subastas";
import { SubastasSwiper } from "./SubastasSwiper";

/**
 * Bloque «Subastas» con su fondo texturado. Fuente: `<section class="subastas">`.
 *
 * El clon montaba aquí una barra de pestañas de Bootstrap que, al no haber
 * subastas próximas, se renderizaba con una sola pestaña. Se conserva el
 * rótulo —da la misma información y ocupa el mismo espacio— pero como texto,
 * no como un control de pestañas de un solo elemento.
 */
export function SeccionSubastas() {
  const grupos = [
    { id: "proximas", label: "Próximas subastas", items: SUBASTAS_PROXIMAS },
    { id: "pasadas", label: "Subastas completadas", items: SUBASTAS_COMPLETADAS },
  ].filter((g) => g.items.length > 0);

  if (grupos.length === 0) return null;

  return (
    <section className="my-3 bg-[url('/assets/rectangle.svg')] bg-cover bg-center bg-no-repeat">
      <div className="py-12">
        <h2 className="text-title pt-6 text-center text-[2.5rem] text-purple">
          Subastas
        </h2>

        {grupos.map((g) => (
          <div key={g.id}>
            <p className="m-6 text-center">
              <span className="text-bold rounded border border-orange bg-orange px-3 py-2 text-white">
                {g.label}
              </span>
            </p>
            <SubastasSwiper subastas={g.items} />
          </div>
        ))}
      </div>
    </section>
  );
}
