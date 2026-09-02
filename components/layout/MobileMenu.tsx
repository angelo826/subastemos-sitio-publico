"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import * as Accordion from "@radix-ui/react-accordion";
import { X } from "lucide-react";
import {
  NAV_MOVIL,
  esGrupo,
  type EnlaceNav,
  type GrupoNav,
} from "@/data/navigation";
import { ENLACES_EXTERNOS } from "@/data/site";

interface Props {
  abierto: boolean;
  onCerrar: () => void;
}

/**
 * Menú de navegación móvil.
 *
 * Panel a pantalla completa que entra deslizándose desde la izquierda, igual
 * que `.header__mobile-menu` del tema original (`right: 100%` → `right: 0` con
 * `transition .5s`).
 *
 * No es un espejo del menú de desktop: el clon lo tenía con sus propias
 * agrupaciones y se replican tal cual desde data/navigation.ts.
 *
 * Los desplegables usaban el collapse de Bootstrap; aquí son Radix Accordion.
 */
export function MobileMenu({ abierto, onCerrar }: Props) {
  // Bloquea el scroll del documento mientras el panel está abierto y permite
  // cerrarlo con Escape, dos cosas que el menú original no hacía.
  useEffect(() => {
    if (!abierto) return;

    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const alPulsar = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCerrar();
    };
    document.addEventListener("keydown", alPulsar);

    return () => {
      document.body.style.overflow = previo;
      document.removeEventListener("keydown", alPulsar);
    };
  }, [abierto, onCerrar]);

  return (
    <div
      // El tema animaba `right` de 100% a 0. Aquí se usa `transform`, que da
      // el mismo desplazamiento pero se compone en la GPU en lugar de forzar
      // un reflujo en cada fotograma.
      // El tema animaba `right` de 100% a 0. Aquí se anima `transform`, que se
      // compone en la GPU en vez de forzar un reflujo en cada fotograma.
      className={`bg-grad-purple-rev fixed inset-y-0 left-0 z-[100] h-full min-h-dvh w-full overflow-auto transition-transform duration-500 md:hidden ${
        abierto ? "translate-x-0" : "pointer-events-none -translate-x-full"
      }`}
      // Se evita `inert`: React 19 lo serializa como cadena vacía en el HTML
      // del servidor, lo que dispara un aviso de hidratación en este árbol.
      // `aria-hidden` más `pointer-events-none` dan el mismo aislamiento.
      aria-hidden={!abierto}
    >
      {/* Accesos directos, a ancho completo y sin separación. */}
      <div className="flex">
        <a
          href={ENLACES_EXTERNOS.registroContacto}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-grad-purple text-bold flex w-1/2 justify-center py-4 text-center text-white"
        >
          Regístrate
        </a>
        <Link
          href="/reservas"
          onClick={onCerrar}
          className="bg-grad-orange text-bold flex w-1/2 justify-center py-4 text-center text-white"
        >
          Reserva tu visita
        </Link>
      </div>

      <div className="mt-12 text-center">
        <div className="flex w-full justify-center">
          <Image
            src="/assets/logo-subastemos.svg"
            alt="Subastemos"
            width={214}
            height={50}
            className="h-auto w-full max-w-[214px]"
          />
        </div>

        <div className="text-end">
          <button
            type="button"
            onClick={onCerrar}
            aria-label="Cerrar menú"
            className="grid size-12 place-items-center p-3 text-white"
          >
            <X className="size-[18px]" aria-hidden />
          </button>
        </div>

        <nav className="py-2 text-start">
          <Accordion.Root type="single" collapsible className="list-none p-0">
            {NAV_MOVIL.map((item) =>
              esGrupo(item) ? (
                <GrupoColapsable key={item.label} grupo={item} onCerrar={onCerrar} />
              ) : (
                <div key={item.label} className="py-2">
                  <EnlaceMovil enlace={item} onCerrar={onCerrar} />
                </div>
              ),
            )}
          </Accordion.Root>
        </nav>
      </div>
    </div>
  );
}

function GrupoColapsable({
  grupo,
  onCerrar,
}: {
  grupo: GrupoNav;
  onCerrar: () => void;
}) {
  return (
    <Accordion.Item value={grupo.label} className="py-2">
      <Accordion.Header>
        <Accordion.Trigger className="group text-bold flex w-full items-center justify-between bg-transparent ps-4 pe-4 text-start text-2xl font-bold text-white data-[state=open]:bg-purple">
          {grupo.label}
          <Image
            src="/assets/arrow-down.svg"
            alt=""
            width={30}
            height={30}
            aria-hidden
            className="w-[30px] group-data-[state=open]:hidden"
          />
          <Image
            src="/assets/arrow-up.svg"
            alt=""
            width={30}
            height={30}
            aria-hidden
            className="hidden w-[30px] group-data-[state=open]:block"
          />
        </Accordion.Trigger>
      </Accordion.Header>

      <Accordion.Content className="overflow-hidden">
        {grupo.items.map((sub) => (
          <Link
            key={sub.label}
            href={sub.href}
            onClick={onCerrar}
            className="block py-3 ps-4 text-start text-2xl font-normal text-white"
          >
            {sub.label}
          </Link>
        ))}
      </Accordion.Content>
    </Accordion.Item>
  );
}

function EnlaceMovil({
  enlace,
  onCerrar,
}: {
  enlace: EnlaceNav;
  onCerrar: () => void;
}) {
  return (
    <Link
      href={enlace.href}
      onClick={onCerrar}
      className="text-bold block ps-4 text-start text-2xl font-bold text-white"
    >
      {enlace.label}
    </Link>
  );
}
