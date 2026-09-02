import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  DIAS_SEMANA,
  MESES,
  mesesDelRango,
  rutaMes,
  type MesCalendario,
} from "@/lib/calendario";

/**
 * Retícula mensual del calendario de subastas.
 *
 * Sustituye a los ocho meses congelados como HTML del clon. La tabla se
 * calcula, así que el selector de meses solo ofrece meses que existen: el
 * original enlazaba a http://localhost:8080 en cuanto salías del rango.
 *
 * La tabla desborda en pantallas estrechas, así que va dentro de un contenedor
 * con scroll horizontal propio para que no arrastre al <body>.
 */
export function CalendarMonth({ mes }: { mes: MesCalendario }) {
  const meses = mesesDelRango();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="w-1/4">
          {mes.anterior && (
            <Link
              href={rutaMes(mes.anterior.anio, mes.anterior.mes)}
              className="inline-grid size-11 place-items-center rounded border border-darkpurple text-darkpurple"
            >
              <ArrowLeft className="size-4" aria-hidden />
              <span className="sr-only">
                Mes anterior: {MESES[mes.anterior.mes - 1]} {mes.anterior.anio}
              </span>
            </Link>
          )}
        </div>

        <div className="text-center">
          <h2 className="text-title text-2xl text-darkpurple">
            <strong>{mes.nombre}</strong>
          </h2>
          <p className="pt-1">
            {mes.subastas.length === 0
              ? "0 subastas"
              : `${mes.subastas.length} ${mes.subastas.length === 1 ? "subasta" : "subastas"}`}
          </p>
        </div>

        <div className="flex w-1/4 justify-end">
          {mes.siguiente && (
            <Link
              href={rutaMes(mes.siguiente.anio, mes.siguiente.mes)}
              className="inline-grid size-11 place-items-center rounded border border-darkpurple text-darkpurple"
            >
              <ArrowRight className="size-4" aria-hidden />
              <span className="sr-only">
                Mes siguiente: {MESES[mes.siguiente.mes - 1]} {mes.siguiente.anio}
              </span>
            </Link>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse border border-gray-300">
          <caption className="sr-only">
            Subastas de {mes.nombre}, por día
          </caption>
          <thead>
            <tr>
              {DIAS_SEMANA.map((d) => (
                <th
                  key={d}
                  scope="col"
                  className="text-bold border border-gray-300 p-2 text-center"
                >
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mes.semanas.map((semana) => (
              <tr key={semana[0].iso}>
                {semana.map((celda) => (
                  <td
                    key={celda.iso}
                    className={`h-24 border border-gray-300 p-2 align-top ${
                      celda.fuera ? "bg-graybg text-gray-400" : ""
                    }`}
                  >
                    <time dateTime={celda.iso} className="block text-sm">
                      {String(celda.dia).padStart(2, "0")}
                    </time>

                    {celda.subastas.map((s) => (
                      <p
                        key={s.id}
                        className="text-bold mt-1 rounded bg-purple px-1 py-0.5 text-xs text-white"
                      >
                        {s.titulo}
                      </p>
                    ))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav aria-label="Ir a otro mes" className="pt-6">
        <ul className="flex flex-wrap gap-2">
          {meses.map((m) => {
            const actual = m.anio === mes.anio && m.mes === mes.mes;
            return (
              <li key={`${m.anio}-${m.mes}`}>
                {actual ? (
                  <span
                    aria-current="page"
                    className="text-bold block rounded border-2 border-purple bg-purple px-3 py-2 text-white"
                  >
                    {MESES[m.mes - 1]} {m.anio}
                  </span>
                ) : (
                  <Link
                    href={rutaMes(m.anio, m.mes)}
                    className="block rounded border-2 border-purple px-3 py-2 text-darkpurple hover:bg-purple hover:text-white"
                  >
                    {MESES[m.mes - 1]} {m.anio}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
