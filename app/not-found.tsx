import Link from "next/link";

/**
 * Página 404. Reutiliza el bloque `.notfound` del tema, que existía en el CSS
 * del clon pero al que ninguna página estática llegaba a apuntar.
 */
export default function NoEncontrada() {
  return (
    <div className="bg-darkpurple">
      <div className="container-bs grid min-h-[60vh] place-items-center py-24 text-center">
        <div>
          <p className="text-title leading-none text-white text-[clamp(5rem,20vw,10rem)]">
            404
          </p>
          <h1 className="text-title py-6 text-white">
            No encontramos la página que buscas
          </h1>
          <Link
            href="/"
            className="text-bold mt-4 inline-block border-2 border-white px-6 py-3 text-white hover:bg-white hover:text-darkpurple"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
