# Subastemos — portal público

Sitio público de Subastemos, reconstruido en Next.js a partir del clon estático
del portal original (Craft CMS + SEOmatic). Visualmente es una réplica; por
dentro no queda nada del stack heredado.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS v4 |
| Componentes | Radix UI (acordeón, desplegable) |
| Carrusel | Swiper |
| Iconos | lucide-react |
| Despliegue | Google App Engine Standard, `nodejs24` |

Sin jQuery, sin Popper, sin `bootstrap.js`, sin el kit remoto de Font Awesome y
sin el bundle Webpack de 286 KB que traía el clon. Ver [docs/MIGRACION.md](docs/MIGRACION.md).

## Requisitos

- Node.js 24

## Puesta en marcha

```bash
npm install
```

Copia las variables de entorno y rellénalas:

```bash
cp .env.example .env.local
```

Levanta el servidor de desarrollo:

```bash
npm run dev
```

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción; pre-renderiza las 17 rutas |
| `npm start` | Sirve el build. Respeta la variable `PORT` |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run datos` | Re-extrae el contenido desde el clon estático |
| `npm run deploy:test` | Despliega a TEST (`subastemosdev` / `app-Dev.yaml`) |
| `npm run deploy:prod` | Despliega a PRODUCCIÓN (`subastas-dev` / `app.yaml`) |

## Variables de entorno

| Variable | Ámbito | Para qué |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | navegador | Dominio canónico: canonical, og:url, sitemap, JSON-LD |
| `NEXT_PUBLIC_GOOGLE_MAPS_KEY` | navegador | Mapas de `/contacto` y `/patios/*` |
| `DATA_PROVIDER` | servidor | `static` (por defecto) o `api` |
| `BACKEND_API_URL` | servidor | Endpoints públicos del backend |
| `BACKEND_API_KEY` | servidor | Credencial del backend, si la pide |
| `REVALIDATE_TOKEN` | servidor | Protege `POST /api/revalidate` |

Sin `NEXT_PUBLIC_GOOGLE_MAPS_KEY` los mapas muestran la dirección en texto en
lugar de un hueco, así que el sitio funciona igual.

## Estructura

```
app/          Rutas (App Router) y Route Handlers
components/
  layout/     Cabecera, menú móvil, pie, botón de WhatsApp
  sections/   Un componente por bloque del tema
  ui/         Primitivas: acordeón, migas, contenido editorial
data/         Todo el contenido, tipado
lib/          SEO, JSON-LD, calendario, repositorios y capa de backend
scripts/      Extractores de un solo uso desde el clon estático
```

## Documentación

| Documento | Para qué |
|---|---|
| [ARQUITECTURA.md](docs/ARQUITECTURA.md) | Cómo encaja todo y el modelo de renderizado |
| [CONTENIDO.md](docs/CONTENIDO.md) | Cómo añadir un artículo, una FAQ, un patio o una subasta |
| [BACKEND.md](docs/BACKEND.md) | Cómo conectar los endpoints del backend cuando existan |
| [DISENO.md](docs/DISENO.md) | Tokens, breakpoints y equivalencias Bootstrap → Tailwind |
| [DESPLIEGUE.md](docs/DESPLIEGUE.md) | App Engine, secretos, promoción y reversión |
| [MIGRACION.md](docs/MIGRACION.md) | Qué se replicó, qué se corrigió a propósito y por qué |

Si vas a cambiar algo que parece un error del sitio, lee **MIGRACION.md**
primero: puede ser una decisión tomada, no un descuido.
