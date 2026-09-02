"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown, Menu } from "lucide-react";
import {
  NAV_PRINCIPAL,
  NAV_SUPERIOR,
  esGrupo,
  type EnlaceNav,
  type GrupoNav,
} from "@/data/navigation";
import { ENLACES_EXTERNOS } from "@/data/site";
import { MobileMenu } from "./MobileMenu";

/**
 * Cabecera fija del portal.
 *
 * Réplica del <header class="header"> del clon estático, que era byte-idéntico
 * en las 33 páginas. Incluye la barra superior, la navegación principal con sus
 * desplegables y el disparador del menú móvil.
 *
 * En el original los desplegables los manejaba bootstrap.min.js con jQuery y
 * Popper; aquí son Radix, sin dependencias legacy.
 */
export function SiteHeader() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[99] text-white">
        {/* ── Barra superior ─────────────────────────────────────────────
            En móvil se parte en dos mitades con gradientes distintos; en md+
            la izquierda ocupa todo el ancho y la derecha desaparece.        */}
        <div className="flex flex-wrap">
          <nav className="bg-grad-purple flex w-1/2 items-center justify-center gap-4 px-0 py-2 md:w-full md:justify-end md:px-12">
            {NAV_SUPERIOR.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-bold hidden py-1 text-white md:block"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={ENLACES_EXTERNOS.registro}
              target="_blank"
              rel="noopener noreferrer"
              className="text-bold bg-transparent px-3 py-1 text-white md:bg-orange"
            >
              Regístrate
            </a>
          </nav>

          <nav className="bg-grad-orange flex w-1/2 items-center justify-center px-0 py-2 md:hidden">
            <a
              href={ENLACES_EXTERNOS.login}
              target="_blank"
              rel="noopener noreferrer"
              className="text-bold py-1 text-white"
            >
              Inicia sesión
            </a>
          </nav>
        </div>

        {/* ── Navegación principal ──────────────────────────────────────── */}
        <div className="bg-grad-purple-rev flex flex-wrap items-center lg:px-12">
          <div className="flex w-1/4 md:hidden">
            <button
              type="button"
              onClick={() => setMenuAbierto(true)}
              aria-label="Abrir menú"
              aria-expanded={menuAbierto}
              className="my-4 ms-auto grid size-12 place-items-center text-white"
            >
              <Menu className="size-11" strokeWidth={2.5} aria-hidden />
            </button>
          </div>

          <div className="flex w-3/4 justify-center md:w-1/3 md:px-2 lg:w-1/4 xl:w-1/6">
            <Link href="/" className="my-auto md:mx-2">
              <Image
                src="/assets/logo-subastemos.svg"
                alt="Subastemos"
                width={214}
                height={25}
                priority
                className="h-auto w-full max-w-[214px]"
              />
            </Link>
          </div>

          <div className="w-1/2 md:w-2/3 lg:w-3/4 xl:w-5/6">
            <nav className="my-auto hidden items-center justify-end gap-1 px-2 py-6 md:flex">
              {NAV_PRINCIPAL.map((item) =>
                esGrupo(item) ? (
                  <Desplegable key={item.label} grupo={item} />
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-bold border-b-[3px] border-transparent px-2 py-1 text-white hover:border-orange"
                  >
                    {item.label}
                  </Link>
                ),
              )}

              <a
                href={ENLACES_EXTERNOS.login}
                target="_blank"
                rel="noopener noreferrer"
                className="text-bold my-auto mx-2 flex items-center rounded border border-white px-2 py-1 text-white hover:border-orange hover:bg-orange"
              >
                <Image
                  src="/uploads/login.svg"
                  alt=""
                  width={16}
                  height={16}
                  aria-hidden
                  className="mx-2 h-auto"
                />
                <span className="pe-2">Inicia sesión</span>
              </a>
            </nav>
          </div>
        </div>
      </header>

      <MobileMenu abierto={menuAbierto} onCerrar={() => setMenuAbierto(false)} />
    </>
  );
}

/** Un ítem de navegación con submenú. Sustituye al dropdown de Bootstrap. */
function Desplegable({ grupo }: { grupo: GrupoNav }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className="text-bold flex cursor-pointer items-center border-b-[3px] border-transparent px-2 py-1 text-white outline-none hover:border-orange"
        >
          {grupo.label}
          <ChevronDown className="ms-2 size-4" aria-hidden />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={4}
          align="start"
          className="z-[100] min-w-40 bg-purple py-2 text-white shadow-lg"
        >
          {grupo.items.map((sub) => (
            <DropdownMenu.Item key={sub.label} asChild>
              <ItemSubmenu enlace={sub} />
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

function ItemSubmenu({ enlace }: { enlace: EnlaceNav }) {
  const clase =
    "block w-full px-4 py-2 text-white outline-none hover:bg-orange focus:bg-orange";

  if (enlace.externo) {
    return (
      <a
        href={enlace.href}
        target="_blank"
        rel="noopener noreferrer"
        className={clase}
      >
        {enlace.label}
      </a>
    );
  }
  return (
    <Link href={enlace.href} className={clase}>
      {enlace.label}
    </Link>
  );
}

