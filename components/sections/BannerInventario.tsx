import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Foto } from "@/components/Foto";

/** Banda final del inicio, dirigida a quien quiere vender su inventario. */
export function BannerInventario() {
  return (
    <section className="container-bs py-14">
      <div className="bg-grad-marca relative isolate overflow-hidden rounded-3xl px-6 py-10 text-white md:px-12 md:py-14">
        <Foto
          src="/uploads/card-img-2.webp"
          alt=""
          aria-hidden
          sizes="(max-width: 992px) 100vw, 60vw"
          className="absolute inset-y-0 right-0 -z-10 h-full w-full object-cover opacity-30 [mask-image:linear-gradient(to_right,transparent,black_50%)] md:w-3/5 md:opacity-70"
        />

        <p className="text-bold text-xs tracking-[0.25em] text-white/80 uppercase">
          Venta de inventario
        </p>
        <h2 className="text-title mt-2 max-w-lg text-[clamp(1.75rem,4vw,2.5rem)] leading-tight">
          Tu inventario, en las mejores manos.
        </h2>
        <p className="mt-3 max-w-md text-white/90">
          Si eres agencia, flotilla, empresa o particular, tenemos la solución
          para desplazar tus unidades al mejor precio.
        </p>
        <Link href="/como-vender" className="btn btn-primary mt-6">
          Más información
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
