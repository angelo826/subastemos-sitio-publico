/** Lee ancho y alto de las imágenes de public/uploads sin dependencias. */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

function dims(buf) {
  // PNG
  if (buf.readUInt32BE(0) === 0x89504e47)
    return [buf.readUInt32BE(16), buf.readUInt32BE(20)];
  // WEBP
  if (buf.slice(0, 4).toString() === "RIFF") {
    const fmt = buf.slice(12, 16).toString();
    if (fmt === "VP8X") return [1 + buf.readUIntLE(24, 3), 1 + buf.readUIntLE(27, 3)];
    if (fmt === "VP8L") {
      const b = buf.readUInt32LE(21);
      return [(b & 0x3fff) + 1, ((b >> 14) & 0x3fff) + 1];
    }
    return [buf.readUInt16LE(26) & 0x3fff, buf.readUInt16LE(28) & 0x3fff];
  }
  // JPEG: recorre los marcadores hasta un SOF
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i < buf.length) {
      if (buf[i] !== 0xff) { i++; continue; }
      const marker = buf[i + 1];
      const len = buf.readUInt16BE(i + 2);
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker))
        return [buf.readUInt16BE(i + 7), buf.readUInt16BE(i + 5)];
      i += 2 + len;
    }
  }
  return null;
}

function recorrer(dir, base = "") {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) { recorrer(p, `${base}/${f}`); continue; }
    const ext = extname(f).toLowerCase();
    if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) continue;
    const d = dims(readFileSync(p));
    console.log(`${base}/${f}\t${d ? d.join("x") : "?"}`);
  }
}

recorrer("public/uploads", "/uploads");

// Modo --ts: además de listar, genera lib/imagenes.generado.ts
if (process.argv.includes("--ts")) {
  const { writeFileSync } = await import("node:fs");
  const mapa = {};
  const recolectar = (dir, base) => {
    for (const f of readdirSync(dir)) {
      const p = join(dir, f);
      if (statSync(p).isDirectory()) { recolectar(p, `${base}/${f}`); continue; }
      const ext = extname(f).toLowerCase();
      if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) continue;
      const d = dims(readFileSync(p));
      if (d) mapa[`${base}/${f}`] = d;
    }
  };
  recolectar("public/uploads", "/uploads");
  recolectar("public/assets", "/assets");

  writeFileSync(
    "lib/imagenes.generado.ts",
    `/**
 * Dimensiones intrínsecas de las imágenes de public/.
 *
 * ARCHIVO GENERADO — no editar a mano.
 * Regenerar con: node scripts/dimensiones.mjs --ts
 *
 * Sirve para que <Foto> pase siempre width y height a next/image y el
 * navegador reserve la caja antes de descargar. Sin esto, una imagen con
 * carga diferida colapsa a altura 0 y desplaza el layout al aparecer.
 */
export const DIMENSIONES: Record<string, readonly [number, number]> = ${JSON.stringify(mapa, null, 2)};
`,
  );
  console.error(`lib/imagenes.generado.ts: ${Object.keys(mapa).length} imágenes`);
}
