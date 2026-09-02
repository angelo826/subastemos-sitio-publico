/** Métodos de pago aceptados. Fuente: metodos-de-pago.html del clon. */

export interface MetodoDePago {
  icono: string;
  titulo: string;
  /** Contenido en HTML: viene del editor del CMS. */
  contenido: string;
}

export const SEO_PAGOS = {
  "titulo": "Métodos de Pago",
  "descripcion": "Nuestros métodos de pago Tarjeta de Crédito  Pagos con tarjeta  Efectivo  Pago en efectivo  Transferencia electrónica de fondos  Toda transfeerenciadebe…",
  "keywords": [
    "Métodos de Pago"
  ]
};

export const TITULO_PAGOS = "Nuestros métodos de pago";

export const METODOS_DE_PAGO: MetodoDePago[] = [
  {
    "icono": "/uploads/credit-card.png",
    "titulo": "Tarjeta de Crédito",
    "contenido": "<p>Pagos con tarjeta</p>"
  },
  {
    "icono": "/uploads/cash.png",
    "titulo": "Efectivo",
    "contenido": "<p>Pago en efectivo</p>"
  },
  {
    "icono": "/uploads/noun-transfer-money.png",
    "titulo": "Transferencia electrónica de fondos",
    "contenido": "<p>Toda transfeerenciadebe ser referenciada y estar a <strong>nombre del titular registrado como el comprador de la subasta.</strong></p>"
  },
  {
    "icono": "/uploads/check.png",
    "titulo": "Cheques",
    "contenido": "<p>Pago con cheque.</p>"
  }
];
