"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Widget de reservas de SimplyBook.
 *
 * El servicio inyecta un iframe en el contenedor. Su script se carga en el
 * layout raíz con `lazyOnload`; aquí solo se instancia cuando el componente
 * está montado y el script disponible.
 *
 * La configuración es la misma del clon, con los colores del tema.
 */

/** Config del widget, tal cual la aceptaba SimplyBook en el clon. */
const CONFIG = {
  widget_type: "iframe",
  url: "https://subastemos.simplybook.me",
  theme: "dainty",
  theme_settings: {
    timeline_show_end_time: "1",
    timeline_hide_unavailable: "1",
    hide_past_days: "0",
    sb_base_color: "#400186",
    secondary_color: "#00a3e1",
    sb_text_color: "#212529",
    display_item_mode: "block",
    body_bg_color: "#ffffff",
    sb_background_image: "12",
    sb_review_image: "13",
    sb_review_image_preview:
      "/uploads/subastemos/image_files/preview/bf37de20628323d030cd1d2236a80d5b.png",
    dark_font_color: "#000000",
    light_font_color: "#ffffff",
    sb_company_label_color: "#ffffff",
    sb_cancellation_color: "#f7662d",
    hide_img_mode: "0",
  },
  timeline: "modern",
  datepicker: "top_calendar",
  is_rtl: false,
  app_config: { allow_switch_to_ada: 0, predefined: [] },
} as const;

declare global {
  interface Window {
    SimplybookWidget?: new (config: unknown) => unknown;
  }
}

export function SimplyBookWidget() {
  const instanciado = useRef(false);
  const [fallo, setFallo] = useState(false);

  useEffect(() => {
    if (instanciado.current) return;

    // El script se carga con lazyOnload, así que puede no estar listo todavía.
    const limite = Date.now() + 15_000;
    const id = setInterval(() => {
      if (window.SimplybookWidget) {
        clearInterval(id);
        instanciado.current = true;
        new window.SimplybookWidget(CONFIG);
      } else if (Date.now() > limite) {
        clearInterval(id);
        setFallo(true);
      }
    }, 200);

    return () => clearInterval(id);
  }, []);

  if (fallo) {
    return (
      <p className="py-12 text-center">
        No pudimos cargar el sistema de reservas. Escríbenos por WhatsApp o
        llámanos y te agendamos la visita.
      </p>
    );
  }

  // SimplyBook inserta su iframe al final del <body>; este bloque reserva el
  // espacio y sostiene el mensaje mientras tanto.
  return (
    <div className="min-h-[600px] py-6" aria-live="polite">
      <p className="sr-only">Cargando el calendario de reservas…</p>
    </div>
  );
}
