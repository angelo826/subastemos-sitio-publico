import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";

/**
 * robots.txt. El clon no tenía ninguno.
 *
 * Se bloquean solo las rutas de API: no son contenido y no aportan nada a un
 * índice de búsqueda.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
