import localFont from "next/font/local";

/**
 * Tipografías del tema Subastemos.
 *
 * En el clon estático se declaraban con @font-face dentro de css/app.css, sin
 * preload. Aquí se cargan con next/font/local, que genera el preload y evita
 * el salto de layout al no depender de que app.css se descargue primero.
 *
 * Cada fuente expone una CSS variable que app/globals.css consume desde @theme.
 */

/** Texto corrido. Era la fuente por defecto de `*` en el tema original. */
export const codecProNews = localFont({
  src: "../public/fonts/CodecPro-News.woff2",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-regular",
  fallback: ["system-ui", "sans-serif"],
});

/** Énfasis. Corresponde a la clase `.text-bold` del tema original. */
export const codecProBold = localFont({
  src: "../public/fonts/CodecPro-Bold.woff2",
  weight: "700",
  style: "normal",
  display: "swap",
  variable: "--font-bold",
  fallback: ["system-ui", "sans-serif"],
});

/** Títulos. Corresponde a la clase `.text-title` y a todos los h1 del tema. */
export const geogrotesqueSemiBold = localFont({
  src: "../public/fonts/GeogrotesqueCyr-SemiBold.woff2",
  weight: "600",
  style: "normal",
  display: "swap",
  variable: "--font-title",
  fallback: ["system-ui", "sans-serif"],
});

/** Clase que monta las tres variables. Se aplica en <html>. */
export const fontVariables = [
  codecProNews.variable,
  codecProBold.variable,
  geogrotesqueSemiBold.variable,
].join(" ");
