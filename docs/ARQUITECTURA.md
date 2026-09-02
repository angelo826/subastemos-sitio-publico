# Arquitectura

## Modelo de renderizado

Una sola regla gobierna todo el sitio, hoy y cuando llegue el backend:

> **Todas las rutas son estáticas y están pre-renderizadas. Ningún contenido
> dinámico crea rutas: se renderiza en el servidor, dentro de una página
> estática ya existente.**

Tres invariantes que no cambian:

1. **El árbol de rutas es determinista.** Toda ruta es literal o sale de
   `generateStaticParams`. Nunca se genera una URL a partir de una respuesta
   remota, así que `sitemap.xml` no depende de que el backend responda.
2. **Nunca hay render por petición.** No se usa SSR dinámico. Una página se
   construye en el build; si sus datos envejecen, se reconstruye en el servidor
   cada `revalidate` segundos y se sigue sirviendo desde caché. Es la misma
   página estática, regenerada — lo que Next llama ISR. No es un modo distinto
   ni una renuncia frente a SSG.
3. **Los datos remotos se renderizan en el servidor.** Nunca se piden desde el
   navegador: es lo que mantiene el contenido indexable. La interactividad
   (filtros, orden) se monta encima del HTML ya pintado.

Hoy todo el contenido vive en `data/`, así que las 17 rutas se construyen en el
build y no revalidan. Cuando una página pase a leer del backend, lo único que
cambia es su `revalidate`.

## Flujo de datos

```
data/*.ts  →  lib/providers  →  lib/repositories  →  app/**/page.tsx
                                                  →  components/sections
```

**Las páginas nunca importan de `data/` directamente.** Siempre pasan por
`lib/repositories`, que es el único interruptor de la integración con el
backend. Ver [BACKEND.md](BACKEND.md).

La excepción son los datos que definen el *árbol de rutas*
(`generateStaticParams`, `sitemap.ts`): esos sí leen de `data/` de forma
síncrona, porque por la invariante 1 no pueden depender de una llamada remota.

## Por qué el contenido vive en `data/`

En el clon, el contenido estaba incrustado en el HTML: el mismo artículo
aparecía copiado en cuatro páginas de listado y en la portada. Cambiar un
título obligaba a editar cinco archivos y era fácil dejar uno atrás.

Aquí cada pieza de contenido existe una vez, tipada, y los componentes la
renderizan donde haga falta. La paginación del blog se calcula sola, el
sitemap se genera solo y añadir un artículo es tocar un archivo.

## Carpetas

| Carpeta | Contenido |
|---|---|
| `app/` | Rutas del App Router; `app/api/` son los Route Handlers del BFF |
| `components/layout/` | Cabecera, menú móvil, pie, filigrana y botón de WhatsApp. Van en el layout raíz porque en el clon eran byte-idénticos en las 33 páginas |
| `components/sections/` | Un componente por bloque del tema |
| `components/ui/` | Primitivas reutilizables |
| `data/` | Todo el contenido, con sus `interface` |
| `lib/domain/` | Modelo de dominio, definido por este frontend |
| `lib/providers/` | Implementaciones de la fuente de datos |
| `lib/repositories/` | Punto único de acceso a datos |
| `lib/backend/` | Cliente HTTP, esquemas Zod y mapeadores del backend |
| `scripts/` | Extractores de un solo uso desde el clon estático |

## Decisiones que conviene conocer

**`components/Foto.tsx` en lugar de `next/image` a pelo.** Resuelve las
dimensiones intrínsecas desde `lib/imagenes.generado.ts` y lanza si faltan. Sin
`width`/`height` el navegador no reserva la caja: una imagen diferida colapsa a
altura 0 y desplaza la página entera al cargar. Ya pasó durante la migración.
Si añades una imagen a `public/`, ejecuta `npm run datos`.

**El HTML editorial se inyecta con `dangerouslySetInnerHTML`.** Viene del
editor Redactor de Craft y se conserva como HTML para no perder formato. Es
contenido propio del repositorio, nunca entrada de usuario.

**Los estilos del tema viven en `@layer components` de `app/globals.css`**, no
repartidos por los componentes: `.container-bs`, los gradientes y `.redactor`.
Ver [DISENO.md](DISENO.md).
