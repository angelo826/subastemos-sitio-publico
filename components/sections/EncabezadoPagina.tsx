import { Foto } from "@/components/Foto";
import { Breadcrumbs, type Miga } from "@/components/ui/Breadcrumbs";

/**
 * Encabezado común de las páginas interiores (rediseño oct-2026): migas,
 * título y entradilla opcional.
 *
 * Sin `imagen` es una banda lavanda clara; con `imagen` (patios, artículos,
 * blog) es una banda oscura de marca con la foto fundida a la derecha, como el
 * hero del inicio. Sustituye a la `.headerImage` del tema original.
 */
export function EncabezadoPagina({
  titulo,
  migas,
  subtitulo,
  imagen,
  children,
}: {
  titulo: string;
  migas?: Miga[];
  subtitulo?: string;
  imagen?: string;
  /** Contenido extra bajo el título (metadatos de un artículo, botones). */
  children?: React.ReactNode;
}) {
  if (!imagen) {
    return (
      <header className="bg-lavender">
        <div className="container-bs py-10 md:py-14">
          {migas && <Breadcrumbs migas={migas} />}
          <h1 className="text-title mt-4 max-w-4xl text-[clamp(2rem,5vw,3rem)] leading-tight text-darkpurple">
            {titulo}
          </h1>
          {subtitulo && (
            <p className="mt-3 max-w-2xl text-lg text-darkpurple/80">{subtitulo}</p>
          )}
          {children}
        </div>
      </header>
    );
  }

  return (
    <header className="bg-grad-marca relative isolate overflow-hidden text-white">
      <Foto
        src={imagen}
        alt=""
        aria-hidden
        priority
        sizes="100vw"
        className="absolute inset-0 -z-10 size-full object-cover opacity-40 md:opacity-70"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[#2b0160] via-[#2b0160]/80 to-[#2b0160]/10"
      />

      <div className="container-bs py-14 md:py-20">
        {migas && <Breadcrumbs migas={migas} tono="oscuro" />}
        <h1 className="text-title mt-4 max-w-3xl text-[clamp(2.25rem,6vw,3.75rem)] leading-[1.05] text-white">
          {titulo}
        </h1>
        {subtitulo && <p className="mt-3 max-w-2xl text-lg text-white/90">{subtitulo}</p>}
        {children}
      </div>
    </header>
  );
}
