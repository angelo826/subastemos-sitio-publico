import Link from "next/link";

/**
 * Par de tarjetas de llamada a la acción que el tema repite al pie de casi
 * todas las páginas interiores. Fuente: los dos `<section>` con fondo
 * card-img-1.webp y card-img-2.webp.
 */

interface Tarjeta {
  titulo: string;
  texto: string;
  imagen: string;
  enlaces: { label: string; href: string }[];
}

const PATIOS = [
  { label: "QRO", href: "/patios/queretaro" },
  { label: "CDMX", href: "/patios/ciudad-de-mexico" },
];

const TARJETAS: Tarjeta[] = [
  {
    titulo: "Agenda una visita",
    texto: "Conoce y revisa las unidades previo a la subasta",
    imagen: "/uploads/card-img-1.webp",
    enlaces: PATIOS,
  },
  {
    titulo: "Compra en subastemos",
    texto: "Puja en nuestras subastas seguras",
    imagen: "/uploads/card-img-2.webp",
    enlaces: PATIOS,
  },
];

export function CardsCta() {
  return (
    <div className="container-bs">
      <div className="flex flex-wrap">
        {TARJETAS.map((t) => (
          <div key={t.titulo} className="w-full p-6 md:w-1/2">
            <section
              className="h-full rounded-[10px] bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${t.imagen})` }}
            >
              <div className="p-12 text-center text-white">
                <h2 className="text-title text-2xl">{t.titulo}</h2>
                <p className="pt-2">{t.texto}</p>

                <div className="block justify-center lg:flex">
                  {t.enlaces.map((e) => (
                    <Link
                      key={e.label}
                      href={e.href}
                      className="text-bold m-3 inline-block border border-white px-4 py-2 text-white hover:bg-white hover:text-darkpurple"
                    >
                      {e.label}
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </div>
        ))}
      </div>
    </div>
  );
}
