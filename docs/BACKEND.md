# Conectar el backend

El catálogo de vehículos, el calendario, el contacto y la reserva de citas se
alimentarán de una **aplicación que ya está en producción**, sobre la que se
desarrollarán endpoints públicos nuevos para este sitio.

Desde este repositorio es un sistema de terceros: no controlamos sus formas de
datos ni su ciclo de despliegue. Toda la arquitectura de esta capa parte de ahí.

En esta fase **no hay integración**: el provider activo es el estático. Lo que
existe son las costuras.

---

## Las tres reglas

1. **El dominio lo define este frontend.** Los tipos de `lib/domain/types.ts`
   describen lo que las páginas necesitan. Las respuestas del backend se
   traducen a ese dominio en `lib/backend/mappers.ts`. Si allá cambian el
   nombre de un campo, se toca un mapper y nada más.
2. **El backend puede fallar o cambiar.** Validación en la frontera y
   degradación decidida por recurso.
3. **No se asume que habrá webhooks.** La frescura la resuelve el `revalidate`
   de cada página. La revalidación bajo demanda está disponible pero es
   opcional: no se puede condicionar este sitio a que se añada un webhook en
   una aplicación de producción ajena.

---

## Por qué BFF y no llamar desde el navegador

Aunque los endpoints sean públicos, el navegador no los llama directo:

- Sin CORS que configurar en la app de producción.
- No se expone su URL ni sus credenciales.
- **La caché de página absorbe el tráfico.** Mil visitas a
  `/inventario-vehiculos` son una petición al backend por ventana de
  revalidación, no mil. Con un sistema en producción compartido, esto importa.

---

## Estructura

```
lib/
  domain/types.ts              Modelo propio. La única fuente de verdad.
  repositories/index.ts        ← EL INTERRUPTOR
  providers/
    tipos.ts                   Contrato que cumple todo provider
    static.provider.ts         Activo hoy: lee data/*.ts
    api.provider.ts            Esqueleto: aquí va el fetch
  backend/
    client.ts                  fetch con timeout, reintentos y errores
    schemas.ts                 Zod: forma cruda del backend  ← VACÍO
    mappers.ts                 DTO → lib/domain                ← VACÍO
```

`schemas.ts` y `mappers.ts` están vacíos **a propósito**: los endpoints aún no
existen, así que todavía no hay contrato que describir. Son el punto exacto
donde aterriza ese contrato, y son lo que evita que el resto del código dependa
de decisiones que no se han tomado.

---

## Qué necesita este frontend de cada endpoint

Esto es el insumo para quien desarrolle los endpoints del otro lado. Los
nombres de campo son indicativos: lo que importa es **qué información** hace
falta, no cómo se llame. La traducción la hace el mapper.

### Inventario de vehículos — `GET /vehiculos`

El más importante: es el único recurso sin equivalente en el sitio actual.

Por vehículo:

| Necesita | Para qué |
|---|---|
| identificador estable | clave de React y futura URL de detalle |
| marca, modelo, año | título y filtros del listado |
| versión | desambiguar unidades similares |
| kilometraje | dato de listado |
| patio | filtrar por sede; debe casar con los slugs de `data/patios.ts` |
| id de subasta | agrupar lotes por subasta |
| URLs de imágenes | galería; con dimensiones si es posible |

Parámetros: `patio`, `marca`, `anioMin`, `anioMax`, `pagina`, `porPagina`.

Respuesta paginada con el **total**, no solo la página: la paginación necesita
saber cuántas páginas hay.

**Lo que más ayuda:** que las imágenes vengan con ancho y alto. Sin ellos hay
que reservar la caja a ojo y el CLS se resiente.

### Calendario — `GET /subastas`

Título, fecha ISO, sedes, estado (próxima/completada), imagen y acciones. Es lo
que hoy hay en `data/subastas.ts`.

Filtrable por rango de fechas, para no traer el histórico completo.

### Contacto — `POST /contacto`

Nombre, email, teléfono, mensaje y origen (`contacto`, `como-vender`,
`boletin`). El honeypot ya se filtra aquí; no llega al backend.

### Reservas — `POST /reservas`

Patio, fecha, nombre, email y teléfono. Hoy lo gestiona el widget externo de
SimplyBook incrustado en `/reservas`.

---

## Cómo conectarlo

### 1. Describir la respuesta en `lib/backend/schemas.ts`

```ts
export const VehiculoDto = z.looseObject({
  id: z.union([z.string(), z.number()]).transform(String),
  marca: z.string(),
  modelo: z.string(),
  anio: z.coerce.number(),
  fotos: z.array(z.string()).default([]),
});

export const ListaVehiculosDto = paginado(VehiculoDto);
```

Usa **`looseObject`**: los campos desconocidos se ignoran en vez de invalidar la
respuesta. El backend evolucionará por su cuenta y un campo nuevo no debe tumbar
una página.

### 2. Traducir en `lib/backend/mappers.ts`

```ts
export function aVehiculo(dto: z.infer<typeof VehiculoDto>): Vehiculo {
  return {
    id: dto.id,
    marca: dto.marca,
    modelo: dto.modelo,
    anio: dto.anio,
    imagenes: dto.fotos,
  };
}
```

### 3. Implementar `lib/providers/api.provider.ts`

```ts
vehiculos: {
  listar: async (filtros = {}) => {
    try {
      const crudo = await backendFetch("/vehiculos?" + qs(filtros), { revalidate: 60 });
      const parsed = ListaVehiculosDto.safeParse(crudo);
      if (!parsed.success) {
        console.error("[backend] respuesta inesperada en /vehiculos", parsed.error);
        return { items: [], total: 0, pagina: 1, porPagina: 24 };
      }
      return { items: parsed.data.data.map(aVehiculo), total: parsed.data.total, … };
    } catch (e) {
      console.error("[backend] /vehiculos no respondió", e);
      return { items: [], total: 0, pagina: 1, porPagina: 24 };
    }
  },
}
```

**Decide la degradación recurso por recurso.** Un inventario vacío es
aceptable: la página renderiza su estado vacío. Un artículo de blog que
desaparece, no.

### 4. Activarlo

```
DATA_PROVIDER=api
BACKEND_API_URL=https://…
```

No hay que tocar ni una página ni un componente.

---

## Frescura por tipo de contenido

Todas las páginas siguen siendo estáticas; lo único que varía es cada cuánto se
regeneran.

| Contenido | `revalidate` | Motivo |
|---|---|---|
| Inventario de vehículos | 60 s | Cambia durante el día |
| Calendario de subastas | 300 s | Cambia por jornada |
| Blog y artículos | 3600 s | Publicaciones esporádicas |
| Páginas fijas y legales | `false` | Solo cambian con un deploy |

### Sobre el SEO

Una página regenerada entrega HTML completo desde caché: para un rastreador es
indistinguible de una construida en el build. No hay penalización. El riesgo de
indexación estaría en pedir los datos desde el navegador, que es justo lo que el
modelo de renderizado prohíbe.

### Salvedad de App Engine — resolver al llegar el inventario

La caché de páginas regeneradas vive en el **disco local de cada instancia**.
Con autoescalado y `min_instances: 0`, cada instancia revalida por su cuenta y
la caché se pierde al reciclarse.

No afecta al SEO —el HTML servido sigue siendo completo—, pero produce **más
peticiones al backend de las que sugiere el TTL** y frescura desigual entre
instancias. Con un backend en producción compartido, conviene resolverlo antes
de abrir el inventario al público.

La solución es un `cacheHandler` compartido en `next.config.ts`, respaldado por
Memorystore o un bucket de GCS. No se ha implementado porque hoy ninguna página
revalida y no habría nada que cachear.

---

## Revalidación bajo demanda

`POST /api/revalidate` con `Authorization: Bearer $REVALIDATE_TOKEN` y
`{"path": "/inventario-vehiculos"}`.

Sin `REVALIDATE_TOKEN` configurado el endpoint devuelve 503 en lugar de quedar
abierto.

---

## Configuración por entorno

| Variable | Local | App Engine |
|---|---|---|
| `BACKEND_API_URL` | entorno de pruebas o mock | `app.yaml` |
| `BACKEND_API_KEY` | `.env.local` | **Secret Manager** |
| `REVALIDATE_TOKEN` | `.env.local` | **Secret Manager** |
| `DATA_PROVIDER` | `static` | `static` hasta que se implemente |

`BACKEND_API_URL` **no** lleva el prefijo `NEXT_PUBLIC_`: es una variable de
servidor y no debe llegar al navegador ni al bundle.
