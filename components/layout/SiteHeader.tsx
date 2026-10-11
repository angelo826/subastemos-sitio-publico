"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown, ExternalLink, Menu } from "lucide-react";
import {
  NAV_PRINCIPAL,
  esGrupo,
  type EnlaceNav,
  type GrupoNav,
} from "@/data/navigation";
import { ENLACES_EXTERNOS } from "@/data/site";
import { MobileMenu } from "./MobileMenu";

/**
 * Cabecera fija del portal.
 *
 * Rediseño oct-2026 a partir del layout del cliente: una sola fila blanca con
 * el logo a color, la navegación y los accesos a la plataforma. Sustituye a
 * las dos barras moradas del tema original.
 *
 * La navegación completa aparece desde xl (1200px); por debajo, el menú móvil.
 */
export function SiteHeader() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[99] border-b border-lilac bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-(--spacing-header-sm) max-w-[1320px] items-center gap-4 px-4 md:h-(--spacing-header) lg:px-6">
          <Link href="/" className="shrink-0" aria-label="Subastemos, inicio">
            <Image
              src="/uploads/logo-color.svg"
              alt="Subastemos"
              width={214}
              height={25}
              priority
              className="h-auto w-[170px] md:w-[200px]"
            />
          </Link>

          <nav
            aria-label="Principal"
            className="ms-auto hidden items-center gap-0.5 xl:flex"
          >
            {NAV_PRINCIPAL.map((item) =>
              esGrupo(item) ? (
                <Desplegable key={item.label} grupo={item} />
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-bold rounded-full px-3 py-2 text-[0.95rem] text-darkpurple transition-colors hover:bg-lavender hover:text-purple"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="ms-auto flex items-center gap-2 xl:ms-4">
            <a
              href={ENLACES_EXTERNOS.login}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm hidden sm:inline-flex"
            >
              Iniciar sesión
            </a>
            <a
              href={ENLACES_EXTERNOS.registro}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
            >
              Regístrate
            </a>

            <button
              type="button"
              onClick={() => setMenuAbierto(true)}
              aria-label="Abrir menú"
              aria-expanded={menuAbierto}
              className="grid size-11 place-items-center rounded-full text-darkpurple hover:bg-lavender xl:hidden"
            >
              <Menu className="size-7" strokeWidth={2.25} aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu abierto={menuAbierto} onCerrar={() => setMenuAbierto(false)} />
    </>
  );
}

/** Un ítem de navegación con submenú. */
function Desplegable({ grupo }: { grupo: GrupoNav }) {
  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className="text-bold flex cursor-pointer items-center gap-1 rounded-full px-3 py-2 text-[0.95rem] text-darkpurple outline-none transition-colors hover:bg-lavender hover:text-purple focus-visible:ring-2 focus-visible:ring-blue data-[state=open]:bg-lavender data-[state=open]:text-purple"
        >
          {grupo.label}
          <ChevronDown className="size-4" aria-hidden />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={8}
          align="start"
          className="z-[100] min-w-56 rounded-2xl border border-lilac bg-white p-2 shadow-xl shadow-darkpurple/10"
        >
          {grupo.items.map((sub) => (
            <DropdownMenu.Item key={sub.label + sub.href} asChild>
              <ItemSubmenu enlace={sub} />
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

function ItemSubmenu({ enlace, ...props }: { enlace: EnlaceNav }) {
  const clase =
    "flex w-full items-center justify-between gap-4 rounded-xl px-3 py-2 text-darkpurple outline-none hover:bg-lavender focus:bg-lavender";

  const contenido = (
    <>
      <span>
        <span className="text-bold block">{enlace.label}</span>
        {enlace.detalle && (
          <span className="block text-sm text-darkpurple/70">{enlace.detalle}</span>
        )}
      </span>
      {enlace.externo && (
        <ExternalLink className="size-3.5 shrink-0 text-darkpurple/50" aria-hidden />
      )}
    </>
  );

  if (enlace.externo) {
    return (
      <a
        {...props}
        href={enlace.href}
        target="_blank"
        rel="noopener noreferrer"
        className={clase}
      >
        {contenido}
      </a>
    );
  }
  return (
    <Link {...props} href={enlace.href} className={clase}>
      {contenido}
    </Link>
  );
}
