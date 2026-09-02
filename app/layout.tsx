import type { Metadata } from "next";
import Script from "next/script";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { HeaderNumbers, FooterNumbers } from "@/components/layout/NumbersBand";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { JsonLd } from "@/components/JsonLd";
import { grafo, localBusiness } from "@/lib/jsonld";
import { SITE, SITE_URL } from "@/data/site";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.nombreCompleto} | La mejor experiencia de subasta en México`,
    template: `%s | ${SITE.nombreCompleto}`,
  },
  description: SITE.descripcion,
  applicationName: SITE.nombre,
  authors: [{ name: SITE.autor }],
  icons: { icon: [{ url: "/favicon/favicon.png", sizes: "32x32", type: "image/png" }] },
};

/**
 * Layout raíz.
 *
 * El header y el footer viven aquí porque en el clon estático eran idénticos
 * byte a byte en las 33 páginas (verificado por md5), sin una sola excepción.
 *
 * El offset superior de <main> compensa la altura de la cabecera fija. El tema
 * original usaba `margin-top: 186px` fijo, que en móvil dejaba un hueco
 * desproporcionado respecto a la altura real del header; aquí es responsive.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={SITE.lang} className={fontVariables}>
      <body>
        <SiteHeader />
        <HeaderNumbers />

        <main className="mt-(--spacing-header-sm) md:mt-(--spacing-header)">
          {children}
        </main>

        <FooterNumbers />
        <SiteFooter />
        <WhatsAppButton />

        <JsonLd data={grafo(localBusiness())} />

        {/*
          Widget de reservas de SimplyBook. Se carga aquí porque su script
          global debe existir antes de que /reservas lo instancie, pero con
          lazyOnload para que no compita con la primera pintura.
        */}
        <Script
          src="https://widget.simplybook.me/v2/widget/widget.js"
          strategy="lazyOnload"
          id="simplybook-widget"
        />
      </body>
    </html>
  );
}
