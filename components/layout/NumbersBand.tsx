import Image from "next/image";

/**
 * Filigrana de números que el tema coloca detrás del contenido, arriba y abajo.
 * Es puramente decorativa: va con z-index negativo y sin capturar el puntero.
 */

/** Banda superior, justo bajo la cabecera. */
export function HeaderNumbers() {
  return (
    <div aria-hidden className="pointer-events-none">
      <Image
        src="/assets/numbers-bg.webp"
        alt=""
        width={1920}
        height={600}
        className="absolute inset-x-0 top-0 -z-[99] mt-[150px] w-full md:mt-[100px]"
      />
    </div>
  );
}

/**
 * Banda inferior, sobre el footer. Va rotada 180°.
 *
 * El tema original la posicionaba con siete media queries encadenadas y `top`
 * en píxeles negativos (-450px … -80px). Aquí es un único clamp() fluido: el
 * mismo efecto, sin la cascada frágil.
 */
export function FooterNumbers() {
  return (
    <div aria-hidden className="pointer-events-none relative">
      <Image
        src="/assets/numbers-bg.webp"
        alt=""
        width={1920}
        height={600}
        className="absolute inset-x-0 -z-[99] mb-[-20px] w-full rotate-180"
        style={{ top: "clamp(-450px, -28vw, -80px)" }}
      />
    </div>
  );
}
