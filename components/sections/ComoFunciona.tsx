import { CarFront, CreditCard, Gavel, Search, UserPlus } from "lucide-react";

/** «¿Cómo funciona?» del inicio: el recorrido del comprador en cinco pasos. */
const PASOS = [
  { icono: UserPlus, titulo: "Regístrate", texto: "Crea tu cuenta en minutos." },
  { icono: Search, titulo: "Explora", texto: "Revisa el inventario y encuentra tu mejor opción." },
  { icono: Gavel, titulo: "Participa", texto: "Haz tu oferta en línea, desde cualquier lugar." },
  { icono: CreditCard, titulo: "Realiza tu pago", texto: "Completa el proceso de forma segura." },
  { icono: CarFront, titulo: "Recibe tu bien", texto: "Y comienza a disfrutarlo." },
];

export function ComoFunciona() {
  return (
    <section className="container-bs pb-14">
      <h2 className="titulo-seccion">¿Cómo funciona?</h2>

      <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {PASOS.map(({ icono: Icono, titulo, texto }, i) => (
          <li key={titulo} className="relative flex gap-4 lg:flex-col lg:gap-3">
            <span className="relative grid size-14 shrink-0 place-items-center rounded-full bg-lavender text-purple">
              <Icono className="size-6" aria-hidden />
              <span className="text-bold absolute -top-1 -left-1 grid size-6 place-items-center rounded-full bg-orange text-xs text-white">
                {i + 1}
              </span>
            </span>
            {/* Conector entre pasos, solo cuando van en una fila. */}
            {i < PASOS.length - 1 && (
              <span
                aria-hidden
                className="absolute top-7 left-[4.5rem] hidden h-px w-[calc(100%-4rem)] border-t-2 border-dashed border-lilac lg:block"
              />
            )}
            <span>
              <span className="text-title block text-lg text-darkpurple">{titulo}</span>
              <span className="block text-sm text-darkpurple/75">{texto}</span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
