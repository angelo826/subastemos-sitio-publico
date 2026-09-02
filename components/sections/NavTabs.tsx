import Image from "next/image";
import Link from "next/link";
import { ENLACES_EXTERNOS } from "@/data/site";

/**
 * Fila de accesos circulares del inicio. Fuente: `<section class="navTabs">`.
 * Los colores alternan morado y azul siguiendo el orden del tema original.
 */

interface Acceso {
  titulo: string;
  descripcion: string;
  icono: string;
  href: string;
  externo?: boolean;
  color: "purple" | "blue";
}

const ACCESOS: Acceso[] = [
  {
    titulo: "Compra",
    descripcion: "Puja en una de nuestras subastas",
    icono: "/uploads/compra-icon.svg",
    href: "/como-comprar",
    color: "purple",
  },
  {
    titulo: "Calendario",
    descripcion: "Revisa el calendario de subastas",
    icono: "/uploads/calendario-icon.svg",
    href: "/calendario",
    color: "blue",
  },
  {
    titulo: "Regístrate",
    descripcion: "Y comienza a comprar",
    icono: "/uploads/reg-strate-icon.svg",
    href: ENLACES_EXTERNOS.registro,
    externo: true,
    color: "purple",
  },
  {
    titulo: "Inventario",
    descripcion: "Revisa el inventario con el que contamos",
    icono: "/uploads/inventario-icon.svg",
    href: ENLACES_EXTERNOS.inventario,
    externo: true,
    color: "blue",
  },
  {
    titulo: "Subastas",
    // El clon traía un punto suelto como descripción: campo vacío en el CMS.
    descripcion: "",
    icono: "/uploads/rectangle@3x.webp",
    href: ENLACES_EXTERNOS.subastasDv1,
    externo: true,
    color: "purple",
  },
];

export function NavTabs() {
  return (
    <section className="container-bs">
      <div className="flex flex-wrap py-6">
        {ACCESOS.map((a) => (
          <div
            key={a.titulo}
            className="w-full p-6 text-center sm:w-1/2 lg:w-1/4"
          >
            <Acceso acceso={a} />
            {a.descripcion && (
              <p className="pt-6 text-[1.4rem] text-black">{a.descripcion}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function Acceso({ acceso }: { acceso: Acceso }) {
  const fondo = acceso.color === "purple" ? "bg-purple" : "bg-blue";
  const texto = acceso.color === "purple" ? "text-purple" : "text-blue";

  const disco = (
    <span
      className={`${fondo} mx-auto flex aspect-square w-[160px] max-w-full rounded-full transition-colors hover:bg-orange`}
    >
      <Image
        src={acceso.icono}
        alt=""
        width={96}
        height={96}
        aria-hidden
        className="m-auto max-h-full p-6"
      />
    </span>
  );

  const titulo = (
    <span
      className={`text-bold mt-6 hidden text-3xl sm:block ${texto} hover:text-orange`}
    >
      {acceso.titulo}
    </span>
  );

  if (acceso.externo) {
    return (
      <a
        href={acceso.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {disco}
        {titulo}
        <span className="sr-only sm:hidden">{acceso.titulo}</span>
      </a>
    );
  }

  return (
    <Link href={acceso.href} className="block">
      {disco}
      {titulo}
      <span className="sr-only sm:hidden">{acceso.titulo}</span>
    </Link>
  );
}
