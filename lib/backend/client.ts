/**
 * Cliente HTTP hacia los endpoints públicos de la aplicación de producción.
 *
 * No se usa todavía: el provider activo es el estático. Existe para que la
 * integración futura tenga un único punto donde viven la URL base, el tiempo
 * de espera, los reintentos y el tratamiento de errores.
 *
 * BACKEND_API_URL es una variable de servidor (sin NEXT_PUBLIC_), así que
 * nunca llega al navegador ni al bundle.
 */

export class ErrorBackend extends Error {
  constructor(
    message: string,
    readonly status?: number,
    readonly ruta?: string,
  ) {
    super(message);
    this.name = "ErrorBackend";
  }
}

interface Opciones extends RequestInit {
  /** Milisegundos antes de abortar. Por defecto 8000. */
  timeoutMs?: number;
  /** Reintentos ante fallo de red o 5xx. Por defecto 2. */
  reintentos?: number;
  /** Segundos de caché de la petición. Se alinea con el revalidate de la ruta. */
  revalidate?: number;
}

export async function backendFetch<T>(
  ruta: string,
  { timeoutMs = 8000, reintentos = 2, revalidate, ...init }: Opciones = {},
): Promise<T> {
  const base = process.env.BACKEND_API_URL;
  if (!base) {
    throw new ErrorBackend("BACKEND_API_URL no está configurada", undefined, ruta);
  }

  const url = `${base.replace(/\/$/, "")}${ruta}`;
  const apiKey = process.env.BACKEND_API_KEY;

  let ultimoError: unknown;

  for (let intento = 0; intento <= reintentos; intento++) {
    const controlador = new AbortController();
    const temporizador = setTimeout(() => controlador.abort(), timeoutMs);

    try {
      const res = await fetch(url, {
        ...init,
        signal: controlador.signal,
        headers: {
          Accept: "application/json",
          ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
          ...init.headers,
        },
        ...(revalidate !== undefined ? { next: { revalidate } } : {}),
      });

      // Los 4xx no se reintentan: la petición es incorrecta, insistir no ayuda.
      if (res.status >= 400 && res.status < 500) {
        throw new ErrorBackend(`El backend respondió ${res.status}`, res.status, ruta);
      }
      if (!res.ok) {
        throw new ErrorBackend(`El backend respondió ${res.status}`, res.status, ruta);
      }

      return (await res.json()) as T;
    } catch (e) {
      ultimoError = e;
      if (e instanceof ErrorBackend && e.status && e.status < 500) throw e;

      // Espera creciente antes del siguiente intento.
      if (intento < reintentos) {
        await new Promise((r) => setTimeout(r, 200 * 2 ** intento));
      }
    } finally {
      clearTimeout(temporizador);
    }
  }

  throw new ErrorBackend(
    `Sin respuesta del backend tras ${reintentos + 1} intentos: ${String(ultimoError)}`,
    undefined,
    ruta,
  );
}
