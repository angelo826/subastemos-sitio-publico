"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, ExternalLink, X } from "lucide-react";
import {
  NAV_PRINCIPAL,
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
 * Menú de navegación móvil: panel a pantalla completa que entra desde la
 * izquierda. Desde el rediseño de oct-2026 usa la misma navegación que el
 * desktop (data/navigation.ts).
 */
export function MobileMenu({ abierto, onCerrar }: Props) {
  // Bloquea el scroll del documento mientras el panel está abierto y permite
  // cerrarlo con Escape.
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
      // Se anima `transform`, que se compone en la GPU en vez de forzar un
      // reflujo en cada fotograma.
      className={`fixed inset-0 z-[100] flex h-dvh w-full flex-col overflow-auto bg-white transition-transform duration-300 xl:hidden ${
        abierto ? "translate-x-0" : "pointer-events-none -translate-x-full"
      }`}
      // Se evita `inert`: React 19 lo serializa como cadena vacía en el HTML
      // del servidor, lo que dispara un aviso de hidratación en este árbol.
      // `aria-hidden` más `pointer-events-none` dan el mismo aislamiento.
      aria-hidden={!abierto}
    >
      <div className="flex h-(--spacing-header-sm) shrink-0 items-center justify-between border-b border-lilac px-4">
        <Image
          src="/uploads/logo-color.svg"
          alt="Subastemos"
          width={214}
          height={25}
          className="h-auto w-[170px]"
        />
        <button
          type="button"
          onClick={onCerrar}
          aria-label="Cerrar menú"
          className="grid size-11 place-items-center rounded-full text-darkpurple hover:bg-lavender"
        >
          <X className="size-6" aria-hidden />
        </button>
      </div>

      <nav aria-label="Principal" className="flex-1 px-2 py-4">
        <Accordion.Root type="single" collapsible>
          {NAV_PRINCIPAL.map((item) =>
            esGrupo(item) ? (
              <GrupoColapsable key={item.label} grupo={item} onCerrar={onCerrar} />
            ) : (
              <EnlaceMovil
                key={item.label}
                enlace={item}
                onCerrar={onCerrar}
                className="text-title block rounded-xl px-4 py-3 text-xl text-darkpurple"
              />
            ),
          )}
        </Accordion.Root>
      </nav>

      <div className="bg-grad-marca grid grid-cols-2 gap-3 p-4">
        <a
          href={ENLACES_EXTERNOS.login}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost"
        >
          Iniciar sesión
        </a>
        <a
          href={ENLACES_EXTERNOS.registro}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          Regístrate
        </a>
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
    <Accordion.Item value={grupo.label}>
      <Accordion.Header>
        <Accordion.Trigger className="group text-title flex w-full items-center justify-between rounded-xl px-4 py-3 text-start text-xl text-darkpurple data-[state=open]:bg-lavender">
          {grupo.label}
          <ChevronDown
            className="size-5 transition-transform group-data-[state=open]:rotate-180"
            aria-hidden
          />
        </Accordion.Trigger>
      </Accordion.Header>

      <Accordion.Content className="overflow-hidden ps-4">
        {grupo.items.map((sub) => (
          <EnlaceMovil
            key={sub.label + sub.href}
            enlace={sub}
            onCerrar={onCerrar}
            className="block rounded-xl px-4 py-2.5 text-lg text-darkpurple"
          />
        ))}
      </Accordion.Content>
    </Accordion.Item>
  );
}

function EnlaceMovil({
  enlace,
  onCerrar,
  className,
}: {
  enlace: EnlaceNav;
  onCerrar: () => void;
  className: string;
}) {
  const contenido = (
    <span className="flex items-center justify-between gap-3">
      <span>
        {enlace.label}
        {enlace.detalle && (
          <span className="block text-sm text-darkpurple/70">{enlace.detalle}</span>
        )}
      </span>
      {enlace.externo && <ExternalLink className="size-4 opacity-50" aria-hidden />}
    </span>
  );

  if (enlace.externo) {
    return (
      <a
        href={enlace.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onCerrar}
        className={className}
      >
        {contenido}
      </a>
    );
  }
  return (
    <Link href={enlace.href} onClick={onCerrar} className={className}>
      {contenido}
    </Link>
  );
}
