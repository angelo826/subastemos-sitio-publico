import next from "eslint-config-next";

/**
 * eslint-config-next 16 exporta configuración plana directamente, así que no
 * hace falta el puente FlatCompat de eslintrc.
 */
const config = [
  ...next,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "public/**",
      // Archivo generado por scripts/dimensiones.mjs
      "lib/imagenes.generado.ts",
    ],
  },
];

export default config;
