/**
 * Artículos del blog.
 *
 * Extraídos del clon estático con scripts/extraer-posts.mjs. El cuerpo se
 * conserva como HTML porque venía del editor Redactor de Craft; se renderiza
 * dentro del contenedor con estilos `.redactor` (ver app/globals.css).
 *
 * El orden del array es el de publicación, de más reciente a más antiguo, y es
 * el que determina la paginación del listado. Para añadir un artículo, ver
 * docs/CONTENIDO.md.
 */

export interface Post {
  slug: string;
  titulo: string;
  descripcion: string;
  keywords: string[];
  /** Fecha como la mostraba el tema: "27/septiembre/2023". */
  fecha: string;
  /** La misma fecha en ISO, para <time datetime> y JSON-LD. */
  fechaIso: string;
  tag: string;
  extracto: string;
  /** Imagen de cabecera del artículo, a sangre. */
  imagenHero: string;
  /** Recorte horizontal, para las tarjetas del listado. */
  imagenCard: string;
  /** Recorte cuadrado, para la barra de artículos populares. */
  imagenSquare: string;
  /** Cuerpo en HTML. */
  cuerpo: string;
}

/** Artículos por página en el listado del blog. Era 2 en el clon. */
export const POSTS_POR_PAGINA = 2;

export const POSTS: Post[] = [
  {
    "slug": "mercado-interno-de-automotores-ligeros",
    "titulo": "Mercado Interno de Automotores Ligeros",
    "descripcion": "De acuerdo a los datos de la Asociación Mexicana de Distribuidores de Automotores AC (AMDA), en el mes de agosto del presente año, se comercializaron…",
    "keywords": [
      "Mercado Interno de Automotores Ligeros"
    ],
    "fecha": "27/septiembre/2023",
    "fechaIso": "2023-09-27",
    "tag": "Noticias",
    "extracto": "De acuerdo a los datos de la Asociación Mexicana de Distribuidores de Automotores AC (AMDA), en el mes de agosto del presente año, se comercializaron 113,873 vehículos ligeros, cifra 23.8%...",
    "imagenHero": "/uploads/Nuevos_2023-09-27-182450_elhg.jpg",
    "imagenCard": "/uploads/_horizontalRectangle/Nuevos_2023-09-27-182450_elhg.jpg",
    "imagenSquare": "/uploads/_square/Nuevos_2023-09-27-182450_elhg.jpg",
    "cuerpo": "<p>De acuerdo a los datos de la Asociación Mexicana de Distribuidores de Automotores AC (AMDA), en el mes de agosto del presente año, se comercializaron 113,873 vehículos ligeros, cifra 23.8% superior a los vehículos vendidos en agosto del 2022 (91,988 unidades).</p>\n<p>En relación a julio del presente año, hubo un aumento de 2.7% es decir se vendieron 3,030 autos más en agosto.</p>\n<p>Si se evalúa el periodo de enero a agosto del presente año, con el mismo intervalo de tiempo en el 2022, en este año se han vendido 857,803 coches una cifra 23.6% mayor al 2022 donde se comercializaron 694,010 unidades.</p>\n<p>Comenta la ANDA que los resultados positivos del mes de agosto 2023 reflejan la mejoría en la disponibilidad de autos nuevos, así como un mejor desempeño de las marcas nuevas que han llegado a nuestro país.</p>\n<p>La mayor variación se ubicó en los vehículos de usos múltiples, es decir: SUV, Crossover, Pickup, Camionetas panel y van y las Minivan.</p>\n<p>¿Cómo está influyendo estás cifras en la venta de vehículos seminuevos? Desde el punto de vista de nuestra casa subastadora, el mercado en los últimos meses ha cambiado de manera drástica. Los precios de los seminuevos han presentado una gran caída lo que está representando un gran desafío para los vendedores de esta gama. El reto por vencer es seleccionar el momento adecuado para vender los inventarios a un precio atractivo para los compradores, sin que esto represente una pérdida económica para las empresas.</p>\n<p>Recuerden que en Subastemos México podemos apoyarlos con el desplazamiento de sus inventarios.</p>\n<p><a href=\"https://www.amda.mx/ventas-de-vehiculos-ligeros/\">https://www.amda.mx/ventas-de-vehiculos-ligeros/</a></p>\n<p><a href=\"https://www.subastemos.mx\">https://www.subastemos.mx</a></p>"
  },
  {
    "slug": "prueba-de-blog-3-2",
    "titulo": "Las marcas chinas de autos en México",
    "descripcion": "En la actualidad se están comercializando en nuestro país, diferentes marcas de autos procedentes de China. Según datos del Instituto Nacional de…",
    "keywords": [
      "Las marcas chinas de autos en México"
    ],
    "fecha": "03/junio/2023",
    "fechaIso": "2023-06-03",
    "tag": "Noticias",
    "extracto": "En la actualidad se están comercializando en nuestro país, diferentes marcas de autos procedentes de China. Según datos del Instituto Nacional de Estadística y Geografía (INEGI) en el primer trimestre...",
    "imagenHero": "/uploads/WhatsApp-Image-2023-06-03-at-14.21.00_2023-06-03-203103_rrbq.jpeg",
    "imagenCard": "/uploads/_horizontalRectangle/WhatsApp-Image-2023-06-03-at-14.21.00_2023-06-03-203103_rrbq.jpeg",
    "imagenSquare": "/uploads/_square/WhatsApp-Image-2023-06-03-at-14.21.00_2023-06-03-203103_rrbq.jpeg",
    "cuerpo": "<p>En la actualidad se están comercializando en nuestro país, diferentes marcas de autos procedentes de China. Según datos del Instituto Nacional de Estadística y Geografía (INEGI) en el primer trimestre del 2023 son siete las marcas chinas que vendieron unidades y que ya tienen captado el 15% del mercado. Estas son:</p>\n<ol><li>MG Motor: aunque tiene una raíz británica, la marca actualmente se fabrica en China y pertenece al grupo de SAIC Motors. Su modelo MG5 vendió en el primer trimestre del año 7,145 unidades. Como marca se colocó entre las 10 más vendidas con un total de 13,063 vehículos. Hay 5 modelos que se están vendiendo en nuestro país, con un precio que puede arrancar en $298,000.00.</li><li>Chirey: en México cuenta con 5 modelos todos pertenecientes a la gama de las SUV’s, durante marzo del 2023 vendió 3,369 unidades según datos del INEGI. Chirey ha implementado una estrategia de globalización desde su establecimiento y se ha convertido en la primera empresa de automóviles de pasajeros en China en exportar vehículos completos, piezas CKD, motores, tecnología de fabricación y equipos al mercado global.</li><li>JAC: Es una de las marcas que más tiempo tiene comercializándose en México. Esta marca cuenta con una planta ensambladora en nuestro país en el estado de Hidalgo; sin embargo, varios de sus modelos siguen siendo importados. Actualmente ofrece 13 modelos que arrancan en un precio de $299,000.00. Según el INEGI en marzo del presente años vendió 1,713 autos.</li><li>BAIC: Actualmente se comercializa a través de Motornation junto con las marcas JMC y Changan. Según los números del INEGI para el tercer mes del presente año, Motornation vendió 1,035 vehículos. En nuestro país BAIC sólo esta comercializando dos modelos SUV’s con precios que van desde los $365,900.00.</li><li>JMC: actualmente sólo comercializan un modelo pickup con motor diésel, ya que ellos se han especializado en modelos comerciales, con un motor de 177 caballos de fuerza. El precio vario entre $459,900.00 a $499,900.00.</li><li>Changan: en México está ofreciendo tres modelos de autos: un subcompacto, una SUV compacta y una SUV mediana. El precio más bajo de su subcompacto es de $304,500.00.</li><li>BYD: Cuenta con tres modelos un sedán y dos SUV’s, con dos agencias una en CDMX y otra en Guadalajara, sus autos son totalmente eléctricos.</li></ol>\n\n\n\n\n\n\n<p>Es importante comentar que los precios eran los que se manejaban en abril del presente año. Estas marcas chinas, vienen a complementar la variedad de vehículos que pueden conseguirse actualmente.</p>\n<p>Por otro lado, las marcas más vendidas en el primer trimestre del año fueron las siguientes:</p>\n<ol><li>Nissan 59,187 unidades.</li><li>Chevrolet 36,751 unidades.</li><li>Volkswagen 24,874 unidades.</li><li>Kia 23,147 unidades.</li><li>Toyota 22,857 unidades.</li><li>Mazda 19,264 unidades.</li><li>MG 13,063 unidades.</li><li>Hyundai 10,872 unidades.</li><li>Ford 9,581 unidades.</li><li>Suzuki 9,420 unidades.</li></ol>"
  },
  {
    "slug": "prueba-de-blog",
    "titulo": "Crecimiento en la producción y exportación de vehículos",
    "descripcion": "Según datos del INEGI durante el primer trimestre del presente año, la producción de autos incrementó en 28.4% (922,177 unidades) en relación al mismo…",
    "keywords": [
      "Crecimiento en la producción y exportación de vehículos"
    ],
    "fecha": "11/mayo/2023",
    "fechaIso": "2023-05-11",
    "tag": "Noticias",
    "extracto": "Según datos del INEGI durante el primer trimestre del presente año, la producción de autos incrementó en 28.4% (922,177 unidades) en relación al mismo trimestre del 2022; mientras que la...",
    "imagenHero": "/uploads/450_1000_2023-05-11-201316_arkh.jpg",
    "imagenCard": "/uploads/_horizontalRectangle/450_1000_2023-05-11-201316_arkh.jpg",
    "imagenSquare": "/uploads/_square/450_1000_2023-05-11-201316_arkh.jpg",
    "cuerpo": "<p>Según datos del INEGI durante el primer trimestre del presente año, la producción de autos incrementó en 28.4% (922,177 unidades) en relación al mismo trimestre del 2022; mientras que la exportación en el mismo trimestre, aumento 9% siendo las SUV, minivanes y pickup las que más exportación presentaron.</p>\n<p>Es importante también recalcar, con base en las cifras del INEGI, que las ventas de sedanes, hatchback y coupés presentaron un incremento de 22.3% (144,161 vehículos) y las SUV, minivanes y pickups un incremento de 26.2% (170,965 unidades).</p>\n<p>No se han alcanzado los números previos a la pandemia, sin embargo, la producción, exportación y venta se está recuperando, en un buen porcentaje.</p>"
  },
  {
    "slug": "prueba-de-blog-4-2",
    "titulo": "Circular con permiso provisional y cometer una infracción",
    "descripcion": "En nuestro medio es muy común que se utilicen permisos provisionales para circular unidades nuevas o seminuevas. Existe mucha desconfianza hoy en día por…",
    "keywords": [
      "Circular con permiso provisional y cometer una infracción"
    ],
    "fecha": "27/abril/2023",
    "fechaIso": "2023-04-27",
    "tag": "Noticias",
    "extracto": "En nuestro medio es muy común que se utilicen permisos provisionales para circular unidades nuevas o seminuevas. Existe mucha desconfianza hoy en día por el uso de estos. Hay algunos...",
    "imagenHero": "/uploads/patrullas.jpg",
    "imagenCard": "/uploads/transforms/21.jpg",
    "imagenSquare": "/uploads/transforms/21.jpg",
    "cuerpo": "<p>En nuestro medio es muy común que se utilicen permisos provisionales para circular unidades nuevas o seminuevas. Existe mucha desconfianza hoy en día por el uso de estos. Hay algunos estados de la república que están marcados, donde se considera que los permisos son falsos y traer portando uno es un problema seguro.</p>\n<p>Es importante recalcar, por experiencia propia, que un policía de tránsito no tiene por qué detenerte por ir circulando con un permiso provisional; sin embargo, si cometes una infracción, la historia cambia. Si te detiene un policía de tránsito por ir, por ejemplo, hablando por celular sin el uso de un manos libres y traes un permiso, pueden empezar los problemas.</p>\n<p>De entrada, van a levantarte una infracción que varía en costo, pero la multa por esta razón dependiendo del estado varia como se puede ver a continuación:</p>\n<ul><li>Estado de México $2,074.80</li><li>Ciudad de México hasta $3,630.90</li><li>Jalisco hasta $1,037.40</li><li>Guanajuato hasta $4,149.60</li><li>Chihuahua hasta $1,348.62</li><li>Nuevo León hasta $3,112.20</li><li>Puebla hasta $1,244.88</li><li>Querétaro hasta $4,481.00</li><li>No se hace descuento por pronto pago.</li></ul>\n<p>Si no traes placas o tarjeta de circulación, pero además traes una licencia de otro estado de la república, no hay forma que dejes una garantía de pago, por lo que, te retendrán el auto. Por lo menos en Querétaro, la licencia de conducir de otro estado no es garantía de que se va a pagar la multa.</p>\n<p>Dependiendo del policía que te detenga, puede revisar el permiso y si por alguna razón el código QR arroja algo extraño o no lo pueden leer, pueden llevar al conductor y al automóvil a la Fiscalía del Estado y ahí puedes pasar hasta 72 horas detenido en lo que se hacen las averiguaciones.</p>\n<p>Y como ya saben, una vez que retienen la unidad hay que pagar la multa, arrastre y corralón. Si eres una persona física puede ser sencillo una vez pagado, pero si eres una persona moral la historia cambia, porque además de tener que presentarse el representante legal, poder, identificación, factura de origen e intermedias si aplica, el representante debe tener licencia vigente, por lo menos en Querétaro. Y si no tiene licencia no hay forma, excepto que hagas una carta poder simple a alguien con licencia. Moraleja, si traes un permiso, hay que tener cuidado de no cometer ninguna infracción y revisar que el mismo este vigente.</p>"
  },
  {
    "slug": "prueba-de-blog-3",
    "titulo": "¿Qué es una subasta cronometrada?",
    "descripcion": "Es una subasta que se lleva a cabo en línea, en la que se pueden hacer ofertas durante un tiempo determinado (o con límite de tiempo). En ella no se…",
    "keywords": [
      "¿Qué es una subasta cronometrada?"
    ],
    "fecha": "18/abril/2023",
    "fechaIso": "2023-04-18",
    "tag": "Compras",
    "extracto": "Es una subasta que se lleva a cabo en línea, en la que se pueden hacer ofertas durante un tiempo determinado (o con límite de tiempo). En ella no se...",
    "imagenHero": "/uploads/SCMULTI.jpg",
    "imagenCard": "/uploads/transforms/22.jpg",
    "imagenSquare": "/uploads/transforms/22.jpg",
    "cuerpo": "<p>Es una subasta que se lleva a cabo en línea, en la que se pueden hacer ofertas durante un tiempo determinado (o con límite de tiempo). En ella no se cuenta con un subastador que esté tomando las pujas. Al final, se llevará el lote, la persona que haya hecho la mayor oferta, <strong>siempre y cuando se haya alcanzado el precio fijado por el vendedor.</strong><br /></p>\n<p><strong><em>Es importante recalcar, que no es una subasta absoluta, donde se vende al último postor aun cuando no se haya logrado el precio mínimo de venta.</em></strong></p>\n<p>El sistema de Subastemos, marcará un precio de arranque, a partir del cual, los interesados podrán hacer sus ofertas. Este valor por ende es la oferta mínima, en la cual podrá iniciarse la puja. Sin embargo; también existe la posibilidad que se haga una oferta máxima por el lote que desea adquirir, es decir, el máximo que desea pagar, y puede fijarse previamente al inicio de la subasta.</p>\n<p>Estará recibiendo un correo electrónico cada vez que su oferta sea superada, pero debe tener en cuenta que, debido a la rapidez de la subasta, puede no recibir este aviso. Por lo que es importante que este al pendiente del evento. Una vez finalizada la subasta, el personal de Subastemos México, se pondrá en contacto con usted para notificarle si fue ganador de algún lote.</p>\n<p>Los cierres de los lotes tienen una diferencia de 1 minuto, debe saber que el plazo del cierre no se incrementa con una nueva puja, por lo que la última que entre, será la que el sistema considera la final.</p>"
  },
  {
    "slug": "prueba-de-blog-2",
    "titulo": "Subastas de Beneficencia",
    "descripcion": "Subastemos México y Lucerna Auction, dos casas de subastas mexicanas se han unido con el fin de ser las primeras empresas en México especializadas en…",
    "keywords": [
      "Subastas de Beneficencia"
    ],
    "fecha": "09/marzo/2023",
    "fechaIso": "2023-03-09",
    "tag": "Compras",
    "extracto": "Subastemos México y Lucerna Auction, dos casas de subastas mexicanas se han unido con el fin de ser las primeras empresas en México especializadas en subastas benéficas y de...",
    "imagenHero": "/uploads/WhatsApp-Image-2023-03-03-at-2.39.10-PM.jpeg",
    "imagenCard": "/uploads/transforms/23.jpg",
    "imagenSquare": "/uploads/transforms/23.jpg",
    "cuerpo": "<p><br /></p>\n\n<p>Subastemos México y Lucerna Auction, dos casas de subastas mexicanas se han unido con el fin de ser las primeras empresas en México especializadas en subastas benéficas y de consultoría en recaudación de fondos por medio de subastas.</p>\n<p>La necesidad de servicios profesionales de subastas de beneficencia en un país como México, fue el combustible que encendió este proyecto que busca inspirar no sólo a personas en nuestro país, sino también en países de habla hispana, donde las subastas de recaudación de fondos no son tan comunes, utilizando el método de marketing por subasta, para llegar a audiencias más amplias y recaudar fondos en menos tiempo que pueden ayudar a las organizaciones sin fines de lucro a alcanzar sus objetivos más rápido y marcar la diferencia en el mundo en el que vivimos.</p>\n<p>Subastemos México y Lucerna, pueden servir como una plataforma para las organizaciones, al proporcionar las herramientas necesarias tanto en el aspecto de consultoría, como de subasta profesional, para ayudar a recaudar fondos a través de un proceso ético y transparente. Nuestro equipo asegura el diseño personalizado de una subasta de recaudación de fondos que se ajuste a las necesidades de nuestros clientes, trabajando codo a codo con la organización para garantizar el éxito de su evento y guiándolos durante todo el proceso.</p>\n<p>El evento debe ser autosustentable, es decir, la consultoría, el evento y todos los gastos deben cubrirse con lo obtenido en la subasta.</p>\n<p>Para más información pueden consultar nuestras páginas web o comunicarse con nosotros a través de correo electrónico o teléfono. </p>\n<p><strong>Lucerna Auction: </strong><a href=\"https://lucernaauction.com/\">https://lucernaauction.com/</a> </p>"
  },
  {
    "slug": "que-es-el-campeonato-internacional-de-subastadores",
    "titulo": "Próximo Campeonato Internacional de Subastadores: 29 de julio 2022",
    "descripcion": "Ya sea que quieras comprar o vender, las subastas son una muy buena opción. Y aunque pudiera parecer un formato muy poco transparente o confiable, en…",
    "keywords": [
      "Próximo Campeonato Internacional de Subastadores: 29 de julio 2022"
    ],
    "fecha": "26/julio/2022",
    "fechaIso": "2022-07-26",
    "tag": "Noticias",
    "extracto": "Ya sea que quieras comprar o vender, las subastas son una muy buena opción. Y aunque pudiera parecer un formato muy poco transparente o confiable, en países como en Estados...",
    "imagenHero": "/uploads/marcela-worldchampionship.jpg",
    "imagenCard": "/uploads/transforms/24.jpg",
    "imagenSquare": "/uploads/transforms/24.jpg",
    "cuerpo": "<p>Ya sea que quieras comprar o vender, las subastas son una muy buena opción. Y aunque pudiera parecer un formato muy poco transparente o confiable, en países como en Estados Unidos, se venden más de doscientos cincuenta mil millones de dólares al año en bienes y servicios. Combinando la preventa del remarketing con las emociones que se exaltan con la presencia de un subastador, ya sea de forma presencial o por medio de una plataforma virtual adecuada. El entusiasmo por las subastas es debido a la competencia que se genera entre los compradores que desean un producto o servicio, tratando de obtener lo mejor al mejor precio. </p>\n<p>En México las subastas no tienen tanto auge como en otros países; sin embargo, en los últimos años ha crecido el interés por este tipo de venta organizada, que se basa en la competencia directa de los compradores, obteniendo el producto quien tuvo la puja más alta, siempre y cuando se haya llegado al precio mínimo de la venta marcado por el vendedor.</p>\n<p>Las subastas de automóviles, tractocamiones y autobuses son las más socorridas en nuestro país, y aunque el número de casas subastadoras ha aumentado, pocas cuentan con un subastador de talla internacional que haya participado en el Campeonato Internacional de Subastadores (IAC por sus siglas en inglés) el cual fue establecido en 1988. </p>\n<p>Para nuestra fortuna, nuestra subastadora <a href=\"https://www.linkedin.com/in/marcela-davila-diez-gutierrez-1a54791b7/\" target=\"_blank\" rel=\"noreferrer noopener\">Marcela Dávila Diez Gutiérrez</a> ha participado en dos <a href=\"https://www.youtube.com/watch?v=xVksUwhQEk8&amp;feature=emb_title\" target=\"_blank\" rel=\"noreferrer noopener\">ocasiones</a>. En 2019 recibió el reconocimiento como la estrella más brillante en ascenso, la cual se otorga al subastador que se presenta por primera vez y al cual se le ve todo el potencial para brillar. En 2021 después de un año sin concurso por cuestiones de COVID, ganó el segundo lugar en el ramo de las mujeres.</p>\n<p>Este año, Marcela está decidida a ser la campeona del mundo y en Subastemos México, estamos seguros de que así será. Marcela en Subastemos México, estamos muy orgullosos de contar contigo como parte del equipo, eres una parte fundamental de este engranaje, estaremos siguiéndote en todo momento.</p>\n<p>Si ustedes desean seguir a Marcela en esta competencia internacional, la liga para poder ver la transmisión en vivo es <a href=\"https://youtu.be/c5KZvf6wcPY\">https://youtu.be/c5KZvf6wcPY</a> el 29 de julio a partir de las 10 horas hora del centro de México, inicia la rama varonil.</p>"
  }
];

/** Total de páginas del listado. */
export const TOTAL_PAGINAS_BLOG = Math.max(
  1,
  Math.ceil(POSTS.length / POSTS_POR_PAGINA),
);

/** Devuelve los artículos de una página del listado (1-indexada). */
export function postsDePagina(pagina: number): Post[] {
  const inicio = (pagina - 1) * POSTS_POR_PAGINA;
  return POSTS.slice(inicio, inicio + POSTS_POR_PAGINA);
}

export function postPorSlug(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
