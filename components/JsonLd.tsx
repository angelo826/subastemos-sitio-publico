/**
 * Inyecta un bloque de datos estructurados schema.org.
 * El contenido lo construyen los helpers de lib/jsonld.ts, nunca datos de
 * usuario, así que serializarlo aquí es seguro.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
