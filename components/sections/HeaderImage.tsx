/**
 * Cabecera a sangre con imagen de fondo y título encima.
 * Fuente: `.headerImage` del tema (blog, patios y artículos).
 */
export function HeaderImage({
  titulo,
  imagen,
  como = "h1",
}: {
  titulo: string;
  imagen: string;
  como?: "h1" | "h2";
}) {
  const Titulo = como;

  return (
    <div
      className="rounded-[15px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${imagen})` }}
    >
      <div className="px-6 py-24 md:py-32">
        <Titulo className="text-title text-center text-white text-[clamp(2rem,5vw,3rem)]">
          {titulo}
        </Titulo>
      </div>
    </div>
  );
}
