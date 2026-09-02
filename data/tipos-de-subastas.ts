/** Modalidades de subasta. Fuente: tipos-de-subastas.html del clon. */

export interface TipoDeSubasta {
  titulo: string;
  descripcion: string;
}

export const SEO_TIPOS = {
  "titulo": "Tipos de Subastas",
  "descripcion": "Subasta híbrida En esta subasta podrás estar presente en nuestro patio para participar en forma presencial o bien podrás subastar desde un punto remoto a…",
  "keywords": [
    "Tipos de Subastas"
  ]
};

export const TITULO_TIPOS = "Conoce nuestros tipos de subastas";

export const TIPOS_DE_SUBASTA: TipoDeSubasta[] = [
  {
    "titulo": "Subasta híbrida",
    "descripcion": "En esta subasta podrás estar presente en nuestro patio para participar en forma presencial o bien podrás subastar desde un punto remoto a través de nuestra plataforma. La duración de la subasta dependerá del número de lotes, en promedio se asigna un lote cada minuto y medio."
  },
  {
    "titulo": "Subasta virtual",
    "descripcion": "Esta subasta se llevará únicamente por medio de nuestra plataforma, en ella podrás participar de forma remota. El tiempo como en el caso anterior dependerá del número de lotes a subastar."
  },
  {
    "titulo": "Subasta cronometrada",
    "descripcion": "Esta subasta la estaremos realizando eventualmente. En ella estarían corriendo lotes que no hayan sido asignados, dando así una segunda oportunidad a estos productos o bien lotes de consignación. Esta subasta consiste en poner un tiempo determinado a los lotes para que se reciban pujas, ganando el mayor postor, siempre y cuando, se haya llegado al precio mínimo de venta. Aquí no habrá un subastador que esté tomando tus ofertas. Los lotes estarán corriendo durante 12 horas. El sistema les estará enviando un correo electrónico de forma automática cada vez que su puja haya sido superada por si desea seguir participando."
  },
  {
    "titulo": "Subasta de liquidación de bienes materiales",
    "descripcion": "Esta subasta es ideal para las personas físicas o morales, que quieren una venta rápida, eficiente y sin complicaciones, subastando la liquidación de bienes comerciales, producción excesiva, cierre de negocios (mobiliario, maquinaria, etcétera), stocks no vendidos o fuera de temporada, pedidos cancelados y/o devoluciones."
  },
  {
    "titulo": "Subastas de beneficencia",
    "descripcion": "Subastemos México, somos una empresa solidaria, estamos comprometidos con las causas altruistas. Por lo que, ofrecemos servicios de administración y organización de subastas de caridad."
  }
];
