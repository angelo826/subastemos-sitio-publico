/**
 * Renderiza el HTML editorial que viene de data/.
 *
 * El contenido procede del editor Redactor de Craft y se conserva como HTML
 * para no perder su formato. Es contenido propio y estático del repositorio,
 * nunca entrada de usuario, así que inyectarlo aquí es seguro.
 *
 * Los estilos (h1 morado, h2 azul, `strong` naranja, viñetas) están en
 * `.redactor` dentro de app/globals.css.
 */
export function RedactorText({
  html,
  variante,
}: {
  html: string;
  /** "nosotros" aplica la variante de cuerpo grande del tema. */
  variante?: "nosotros";
}) {
  return (
    <div
      className={`redactor ${variante === "nosotros" ? "redactor--nosotros" : ""}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
