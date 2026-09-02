import type { NextConfig } from "next";

/**
 * Rutas del clon estático que terminaban en .html, mapeadas a su URL limpia.
 * Se sirven como 301 permanentes para no perder los enlaces existentes ni la
 * autoridad acumulada. Ver docs/MIGRACION.md.
 */
const PAGINAS_HTML = [
  "blog",
  "calendario",
  "como-comprar",
  "como-vender",
  "contacto",
  "metodos-de-pago",
  "nosotros",
  "politica-de-privacidad",
  "preguntas-frecuentes",
  "reservas",
  "subastas-bienes-raices",
  "tipos-de-subastas",
  "patios/ciudad-de-mexico",
  "patios/queretaro",
  "blog/mercado-interno-de-automotores-ligeros",
  "blog/prueba-de-blog",
  "blog/prueba-de-blog-2",
  "blog/prueba-de-blog-3",
  "blog/prueba-de-blog-3-2",
  "blog/prueba-de-blog-4-2",
  "blog/que-es-el-campeonato-internacional-de-subastadores",
];

/** Meses que el clon congeló como HTML. */
const MESES_CALENDARIO = ["03", "04", "05", "06", "07", "08", "09", "10"];

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    // El clon sirve .webp, .jpg, .jpeg, .png y .svg desde /uploads.
    formats: ["image/webp"],
  },

  async redirects() {
    // 301 explícito en vez de `permanent: true`, que emite 308. Google trata
    // ambos igual, pero 301 lo entiende todo el instrumental de SEO y los
    // rastreadores antiguos, y esto es una migración de URLs públicas.
    const permanente = { statusCode: 301 as const };

    return [
      { source: "/index.html", destination: "/", ...permanente },

      ...PAGINAS_HTML.map((p) => ({
        source: `/${p}.html`,
        destination: `/${p}`,
        ...permanente,
      })),

      // Paginación del blog: /blog/p2.html → /blog/pagina/2
      ...[2, 3, 4].map((n) => ({
        source: `/blog/p${n}.html`,
        destination: `/blog/pagina/${n}`,
        ...permanente,
      })),

      // Calendario: el clon tenía /month/2026/09/index.html y /month/2026/08.html
      ...MESES_CALENDARIO.flatMap((m) => [
        {
          source: `/calendario/month/2026/${m}/index.html`,
          destination: `/calendario/month/2026/${m}`,
          ...permanente,
        },
        {
          source: `/calendario/month/2026/${m}.html`,
          destination: `/calendario/month/2026/${m}`,
          ...permanente,
        },
      ]),
    ];
  },

  async headers() {
    return [
      {
        // Assets con nombre estable y contenido inmutable.
        source: "/:dir(uploads|fonts|assets|favicon)/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
