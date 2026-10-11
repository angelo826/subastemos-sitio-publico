import { SUBASTAS, type Subasta } from "@/data/subastas";

/**
 * Utilidades del calendario de subastas.
 *
 * El clon traía ocho meses congelados como HTML (2026/03 a 2026/10), todos
 * vacíos («0 subastas»), y sus enlaces fuera de ese rango apuntaban a
 * http://localhost:8080. Aquí la retícula se calcula, así que no hay HTML
 * congelado ni enlaces rotos.
 */

export const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
] as const;

/** La semana empieza en lunes, como en el tema original. */
export const DIAS_SEMANA = [
  "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo",
] as const;

/**
 * Rango de meses navegables. Empieza donde empezaba el clon para que las URLs
 * que ya existían sigan resolviendo; el final se amplía a mano (ver
 * docs/CONTENIDO.md).
 */
export const RANGO = {
  desde: { anio: 2026, mes: 3 },
  hasta: { anio: 2027, mes: 12 },
} as const;

export interface Celda {
  /** Día del mes. */
  dia: number;
  /** true si pertenece al mes anterior o al siguiente. */
  fuera: boolean;
  /** Fecha ISO completa, para el atributo datetime. */
  iso: string;
  subastas: Subasta[];
}

export interface MesCalendario {
  anio: number;
  /** 1-12. */
  mes: number;
  nombre: string;
  /** Semanas de siete celdas, de lunes a domingo. */
  semanas: Celda[][];
  subastas: Subasta[];
  anterior: { anio: number; mes: number } | null;
  siguiente: { anio: number; mes: number } | null;
}

const dosDigitos = (n: number) => String(n).padStart(2, "0");

/** Índice comparable de un año y mes, para acotar el rango. */
const indice = (anio: number, mes: number) => anio * 12 + (mes - 1);

export function dentroDeRango(anio: number, mes: number): boolean {
  const i = indice(anio, mes);
  return (
    i >= indice(RANGO.desde.anio, RANGO.desde.mes) &&
    i <= indice(RANGO.hasta.anio, RANGO.hasta.mes)
  );
}

/** Todos los meses navegables, en orden. Alimenta el desplegable y el sitemap. */
export function mesesDelRango(): { anio: number; mes: number }[] {
  const salida: { anio: number; mes: number }[] = [];
  for (let i = indice(RANGO.desde.anio, RANGO.desde.mes); i <= indice(RANGO.hasta.anio, RANGO.hasta.mes); i++) {
    salida.push({ anio: Math.floor(i / 12), mes: (i % 12) + 1 });
  }
  return salida;
}

/**
 * Mes con el que abre /calendario: el de la próxima subasta, o el primero del
 * rango si no hay ninguna. Sale de los datos y no del reloj, así que la página
 * sigue siendo determinista en el build.
 */
export function mesInicial(): { anio: number; mes: number } {
  const proxima = SUBASTAS.filter((s) => s.estado === "proxima")
    .map((s) => s.fechaIso)
    .sort()[0];
  if (proxima) {
    const [anio, mes] = proxima.split("-").map(Number);
    if (dentroDeRango(anio, mes)) return { anio, mes };
  }
  return RANGO.desde;
}

export function rutaMes(anio: number, mes: number): string {
  return `/calendario/month/${anio}/${dosDigitos(mes)}`;
}

/** Construye la retícula de un mes con las subastas que caen en cada día. */
export function construirMes(anio: number, mes: number): MesCalendario {
  const primero = new Date(Date.UTC(anio, mes - 1, 1));
  const diasEnMes = new Date(Date.UTC(anio, mes, 0)).getUTCDate();

  // getUTCDay() da 0 para domingo; se reindexa para que lunes sea 0.
  const desplazamiento = (primero.getUTCDay() + 6) % 7;

  const diasMesAnterior = new Date(Date.UTC(anio, mes - 1, 0)).getUTCDate();

  const celdas: Celda[] = [];

  // Cola del mes anterior.
  for (let i = desplazamiento - 1; i >= 0; i--) {
    const dia = diasMesAnterior - i;
    const m = mes === 1 ? 12 : mes - 1;
    const a = mes === 1 ? anio - 1 : anio;
    celdas.push({ dia, fuera: true, iso: `${a}-${dosDigitos(m)}-${dosDigitos(dia)}`, subastas: [] });
  }

  // Días del mes.
  for (let dia = 1; dia <= diasEnMes; dia++) {
    const iso = `${anio}-${dosDigitos(mes)}-${dosDigitos(dia)}`;
    celdas.push({
      dia,
      fuera: false,
      iso,
      subastas: SUBASTAS.filter((s) => s.fechaIso === iso),
    });
  }

  // Cabeza del mes siguiente, hasta completar la última semana.
  let dia = 1;
  while (celdas.length % 7 !== 0) {
    const m = mes === 12 ? 1 : mes + 1;
    const a = mes === 12 ? anio + 1 : anio;
    celdas.push({ dia, fuera: true, iso: `${a}-${dosDigitos(m)}-${dosDigitos(dia)}`, subastas: [] });
    dia++;
  }

  const semanas: Celda[][] = [];
  for (let i = 0; i < celdas.length; i += 7) semanas.push(celdas.slice(i, i + 7));

  const prev = mes === 1 ? { anio: anio - 1, mes: 12 } : { anio, mes: mes - 1 };
  const next = mes === 12 ? { anio: anio + 1, mes: 1 } : { anio, mes: mes + 1 };

  return {
    anio,
    mes,
    nombre: `${MESES[mes - 1]} ${anio}`,
    semanas,
    subastas: celdas.filter((c) => !c.fuera).flatMap((c) => c.subastas),
    // Solo se enlaza dentro del rango: fuera de él no hay página que servir.
    anterior: dentroDeRango(prev.anio, prev.mes) ? prev : null,
    siguiente: dentroDeRango(next.anio, next.mes) ? next : null,
  };
}
