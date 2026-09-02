import Image from "next/image";
import { WHATSAPP_URL } from "@/data/site";

/**
 * Botón flotante de WhatsApp, fijo en la esquina inferior derecha.
 * El área táctil se lleva a 64px (el tema original dejaba la imagen a 4rem
 * pero sin garantizar un objetivo mínimo cómodo en móvil).
 */
export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed right-0 bottom-0 z-[2] grid place-items-center p-6"
    >
      <Image
        src="/uploads/whatsapp.svg"
        alt=""
        width={64}
        height={64}
        aria-hidden
        className="size-16 drop-shadow-[3px_5px_2px_rgba(0,0,0,0.25)] transition-transform duration-200 hover:scale-125"
      />
    </a>
  );
}
