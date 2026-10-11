import {
  BadgeDollarSign,
  CarFront,
  Headset,
  MonitorSmartphone,
  ShieldCheck,
} from "lucide-react";

/**
 * Franja de beneficios del inicio. El cliente pidió destacar que la subasta
 * es digital y segura: por eso «100 % digital» sustituye a las «subastas
 * híbridas» que traía el layout.
 */
const BENEFICIOS = [
  { icono: ShieldCheck, texto: "Procesos seguros y transparentes" },
  { icono: MonitorSmartphone, texto: "Subastas 100 % digitales" },
  { icono: CarFront, texto: "Amplio inventario de vehículos y activos" },
  { icono: BadgeDollarSign, texto: "Pago de bienes vendidos en 5 días hábiles" },
  { icono: Headset, texto: "Soporte especializado en todo el proceso" },
];

export function Beneficios() {
  return (
    <section className="container-bs">
      <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-lilac md:grid-cols-5">
        {BENEFICIOS.map(({ icono: Icono, texto }, i) => (
          <li
            key={texto}
            className={`flex flex-col items-center gap-3 bg-lavender px-4 py-7 text-center ${
              i === BENEFICIOS.length - 1 ? "col-span-2 md:col-span-1" : ""
            }`}
          >
            <Icono className="size-9 text-purple" strokeWidth={1.6} aria-hidden />
            <span className="max-w-[16ch] text-darkpurple">{texto}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
