"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import ESTILO from "@/data/map-style.json";

/**
 * Mapa de ubicación con el estilo morado del tema.
 *
 * Habla directamente con la API de Google Maps, igual que el clon: la lógica
 * son unas pocas líneas y evita una dependencia envolvente cuyo marcador no
 * compila bien con Turbopack.
 *
 * Tres cambios respecto al clon (ver docs/MIGRACION.md):
 * - El script solo se carga en /contacto y /patios/*, no en las 33 páginas.
 * - Las coordenadas son fijas; el original geocodificaba la dirección en cada
 *   carga, lo que suponía una llamada extra a la API y un resultado variable.
 * - Sin clave configurada se muestra la dirección en texto, no un hueco.
 */

declare global {
  interface Window {
    google?: typeof google;
    __initSubastemosMap?: () => void;
  }
}

export function GoogleMap({
  lat,
  lng,
  titulo,
  direccion,
}: {
  lat: number;
  lng: number;
  titulo: string;
  direccion: string;
}) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
  const contenedor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contenedor.current) return;

    let cancelado = false;
    const el = contenedor.current;

    /**
     * `onReady` de next/script dispara cuando el `<script>` termina de
     * cargar, pero con `loading=async` el arranque de la API todavía no ha
     * definido `importLibrary`. Se espera a que aparezca en vez de asumirlo.
     */
    async function esperarApi(limiteMs = 15_000) {
      const hasta = Date.now() + limiteMs;
      while (Date.now() < hasta) {
        if (typeof window.google?.maps?.importLibrary === "function") return true;
        await new Promise((r) => setTimeout(r, 100));
      }
      return false;
    }

    (async () => {
      if (!(await esperarApi()) || cancelado) return;

      // Con `loading=async` hay que pedir las librerías explícitamente en
      // lugar de dar por hecho que google.maps.Map ya existe.
      const { Map } = (await window.google!.maps.importLibrary(
        "maps",
      )) as google.maps.MapsLibrary;
      const { Marker } = (await window.google!.maps.importLibrary(
        "marker",
      )) as google.maps.MarkerLibrary;

      if (cancelado) return;

      const mapa = new Map(el, {
        center: { lat, lng },
        zoom: 12,
        // Sin `mapId`: la API ignora `styles` cuando hay uno, y el estilo
        // morado forma parte del diseño del tema.
        styles: ESTILO as google.maps.MapTypeStyle[],
        disableDefaultUI: true,
        gestureHandling: "cooperative",
      });

      new Marker({
        position: { lat, lng },
        map: mapa,
        title: titulo,
        icon: "/assets/map-pin.svg",
      });
    })();

    return () => {
      cancelado = true;
    };
  }, [lat, lng, titulo]);

  if (!apiKey) {
    return (
      <div className="grid h-full min-h-[300px] place-items-center rounded-[15px] bg-graybg p-6 text-center">
        <p>
          <span className="text-bold block text-darkpurple">{titulo}</span>
          <span className="block pt-2">{direccion}</span>
        </p>
      </div>
    );
  }

  return (
    <>
      {/*
        `afterInteractive`: la API se descarga tras la hidratación, sin bloquear
        la primera pintura. Solo llega a estas tres páginas (contacto y los dos
        patios); el clon la cargaba en las 33.
      */}
      <Script
        id="google-maps"
        src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&loading=async`}
        strategy="afterInteractive"
      />
      <div
        ref={contenedor}
        role="img"
        aria-label={`Mapa de ${titulo}: ${direccion}`}
        className="size-full min-h-[300px] rounded-[15px] bg-graybg"
      />
    </>
  );
}
