import Image, { type ImageProps } from "next/image";
import { DIMENSIONES } from "@/lib/imagenes.generado";

type Props = Omit<ImageProps, "width" | "height"> & {
  src: string;
  /** Fuerza dimensiones distintas a las intrínsecas (raro). */
  width?: number;
  height?: number;
};

/**
 * next/image con las dimensiones intrínsecas resueltas automáticamente desde
 * lib/imagenes.generado.ts.
 *
 * Existe para que ninguna imagen se quede sin width/height: si falta el par,
 * el navegador no reserva la caja y una imagen diferida colapsa a altura 0
 * hasta que carga, desplazando toda la página (y hundiendo el CLS).
 *
 * Para SVG usa <Image> directamente: no llevan dimensiones intrínsecas fiables
 * y no pasan por el optimizador.
 */
export function Foto({ src, width, height, alt, ...props }: Props) {
  const dim = DIMENSIONES[src];

  if (!dim && (width === undefined || height === undefined)) {
    throw new Error(
      `Foto: no hay dimensiones para "${src}". Añade la imagen a public/ y ` +
        `ejecuta "node scripts/dimensiones.mjs --ts", o pasa width y height.`,
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? dim[0]}
      height={height ?? dim[1]}
      {...props}
    />
  );
}
