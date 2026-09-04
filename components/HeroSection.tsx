import { ShieldCheck, Satellite, ArrowRight, Truck } from "lucide-react";
import { EMPRESA } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-slate-800 bg-slate-950">
      <div
        className="absolute inset-0 bg-industrial-grid bg-grid opacity-40"
        aria-hidden="true"
      />
      <div
        className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 left-0 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="section-container relative py-20 lg:py-28">
        <div className="flex flex-wrap items-center gap-2">
          <span className="badge-normativo">
            <ShieldCheck className="h-3.5 w-3.5" />
            D.S. N° 021-2008-MTC
          </span>
          <span className="badge-normativo">
            <Satellite className="h-3.5 w-3.5" />
            Homologado SUTRAN
          </span>
        </div>

        <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          Suministros industriales y transporte{" "}
          <span className="text-amber-500">MATPEL</span> para la minería peruana
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-400">
          En <strong className="text-slate-200">{EMPRESA.nombreComercial}</strong> abastecemos
          bolas de acero forjado, carbón activado y alcohol industrial, y ejecutamos transporte
          terrestre de carga general y materiales peligrosos a nivel nacional, con trazabilidad
          y cumplimiento normativo end-to-end.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a href="#cotizador" className="btn-primary">
            Solicitar cotización
            <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#transporte" className="btn-secondary">
            <Truck className="h-4 w-4" />
            Ver servicios de transporte
          </a>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-6 border-t border-slate-800 pt-8 sm:grid-cols-4">
          {[
            { valor: "1\"-5\"", etiqueta: "Medidas de bolas de acero" },
            { valor: "24/7", etiqueta: "Monitoreo GPS en ruta" },
            { valor: "A-IV", etiqueta: "Licencia de conductores MATPEL" },
            { valor: "3 zonas", etiqueta: "Costa, Sierra y Selva" },
          ].map((stat) => (
            <div key={stat.etiqueta}>
              <dt className="text-2xl font-black text-amber-500 sm:text-3xl">{stat.valor}</dt>
              <dd className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">
                {stat.etiqueta}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
