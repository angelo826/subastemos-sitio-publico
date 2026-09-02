/**
 * Preguntas frecuentes.
 *
 * En el clon, los filtros circulares solo añadían ?category= a la URL sin
 * filtrar nada: el listado siempre mostraba las mismas preguntas, porque el
 * volcado estático perdió la consulta del CMS. Aquí las preguntas llevan su
 * categoría como dato y el filtro funciona de verdad.
 *
 * Extraído con scripts/extraer-paginas.mjs.
 */

export interface Faq {
  pregunta: string;
  /** Respuesta en HTML: viene del editor del CMS. */
  respuesta: string;
  /** id de la categoría, o null si no está clasificada. */
  categoria: string | null;
}

export interface CategoriaFaq {
  id: string;
  nombre: string;
  icono: string;
}

export const SEO_FAQ = {
  "titulo": "Preguntas Frecuentes",
  "descripcion": "Conoce todas las preguntas frecuentes sobre: Subastas, Compra, Venta y Pagos.  ¿Puedo ir a ver las unidades antes de la subasta? Si, los patios estarán…",
  "keywords": [
    "subastas",
    "México",
    "garantía",
    "compra",
    "vende"
  ]
};

export const CATEGORIAS_FAQ: CategoriaFaq[] = [
  {
    "id": "Subastas",
    "nombre": "Subastas",
    "icono": "/uploads/subastas.svg"
  },
  {
    "id": "Compra",
    "nombre": "Compra",
    "icono": "/uploads/compra-icon.svg"
  },
  {
    "id": "Venta",
    "nombre": "Venta",
    "icono": "/uploads/venta-icon.svg"
  },
  {
    "id": "Pagos",
    "nombre": "Pagos",
    "icono": "/uploads/pagos.svg"
  }
];

export const FAQS: Faq[] = [
  {
    "pregunta": "¿Puedo ir a ver las unidades antes de la subasta?",
    "respuesta": "<p>Si, los patios estarán abiertos para revisión física de las unidades, 24 horas previas a la subasta, concertar tu cita.</p>",
    "categoria": "Subastas"
  },
  {
    "pregunta": "¿Cuánto tiempo duran las subastas?",
    "respuesta": "<p>Depende del número de unidades, pero en promedio cada unidad se subasta en un minuto. </p>",
    "categoria": "Subastas"
  },
  {
    "pregunta": "¿Tienen subastas presenciales?",
    "respuesta": "<p>Si tenemos subastas presenciales</p>",
    "categoria": "Subastas"
  },
  {
    "pregunta": "¿Cómo asisto a las subastas presenciales?",
    "respuesta": "<p>Una vez que has hecho la garantía, puedes asistir a la subasta.</p>",
    "categoria": "Subastas"
  },
  {
    "pregunta": "¿Cuándo llegará mi estado de cuenta?",
    "respuesta": "<p>Una vez terminada la subasta, los estados de cuenta serán enviados automáticamente, al correo que regístrate.</p>",
    "categoria": "Pagos"
  },
  {
    "pregunta": "¿Qué métodos de pago aceptan?",
    "respuesta": "<p>Transferencia electrónica de fondos o cheques, cualquier tipo de pago, debe venir de la cuenta del titular registrado.</p>",
    "categoria": "Pagos"
  }
];

/** Acordeones incrustados en /como-comprar y /como-vender. */
export const FAQS_COMO_COMPRAR: Faq[] = [
  {
    "pregunta": "¿Cómo aseguran la calidad de las unidades?",
    "respuesta": "<p>Al ser unidades reposeidas, no podemos dar garantías. Las unidades se venden en las condiciones en las que se encuentran tanto físicas como de documentos.</p>",
    "categoria": null
  },
  {
    "pregunta": "¿Qué garantías me ofrece una compra con ustedes?",
    "respuesta": "<p>Entregar las unidades en las condiciones anunciadas, así como la seguridad de que no son unidades robadas.</p>",
    "categoria": null
  },
  {
    "pregunta": "¿Cuándo recibiré mis unidades después de ganar la subasta?",
    "respuesta": "<p>Una vez hecho el pago, puede sacar una cita para el retiro de unidades. El traslado desde nuestros patios, corre a cuenta del comprador.</p>",
    "categoria": null
  }
];

export const FAQS_COMO_VENDER: Faq[] = [
  {
    "pregunta": "¿Cómo aseguran la calidad de las unidades?",
    "respuesta": "<p>Al ser unidades reposeidas, no podemos dar garantías. Las unidades se venden en las condiciones en las que se encuentran tanto físicas como de documentos.</p>",
    "categoria": null
  },
  {
    "pregunta": "¿Qué garantías me ofrece una compra con ustedes?",
    "respuesta": "<p>Entregar las unidades en las condiciones anunciadas, así como la seguridad de que no son unidades robadas.</p>",
    "categoria": null
  },
  {
    "pregunta": "¿Cuándo recibiré mis unidades después de ganar la subasta?",
    "respuesta": "<p>Una vez hecho el pago, puede sacar una cita para el retiro de unidades. El traslado desde nuestros patios, corre a cuenta del comprador.</p>",
    "categoria": null
  }
];
