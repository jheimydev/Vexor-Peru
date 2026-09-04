import { Truck, AlertTriangle, MapPin, CheckCircle2 } from "lucide-react";
import { SERVICIOS_TRANSPORTE } from "@/lib/constants";

export default function TransportSection() {
  const cargaGeneral = SERVICIOS_TRANSPORTE.find((s) => s.tipo === "carga-general")!;
  const matpel = SERVICIOS_TRANSPORTE.find((s) => s.tipo === "matpel")!;

  return (
    <section id="transporte" className="border-b border-slate-800 bg-slate-950 py-20">
      <div className="section-container">
        <div className="max-w-2xl">
          <span className="badge-normativo">Logística terrestre nacional</span>
          <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">
            Transporte de carga general y MATPEL
          </h2>
          <p className="mt-4 text-slate-400">
            Dos operaciones diferenciadas, un mismo estándar de seguridad: flota propia y
            afiliada monitoreada en tiempo real desde el origen hasta el destino final.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Carga General */}
          <article className="card-industrial p-6 lg:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 text-amber-400">
                <Truck className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-white">{cargaGeneral.nombre}</h3>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Carga estándar / proyecto
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              {cargaGeneral.descripcion}
            </p>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {["Plataforma 30 TM", "Furgón", "Cama baja"].map((u) => (
                <div
                  key={u}
                  className="rounded-lg border border-slate-800 bg-slate-950/60 p-3 text-center text-xs font-semibold text-slate-300"
                >
                  {u}
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-slate-400">
              <MapPin className="h-4 w-4 text-amber-500" />
              Cobertura: {cargaGeneral.rutas.join(" · ")}
            </div>

            <a href="#cotizador" className="btn-secondary mt-6 w-full">
              Cotizar carga general
            </a>
          </article>

          {/* MATPEL */}
          <article className="card-industrial relative overflow-hidden border-orange-900/40 p-6 lg:p-8">
            <div
              className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-orange-500/10"
              aria-hidden="true"
            />
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/15 text-orange-400">
                <AlertTriangle className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-white">{matpel.nombre}</h3>
                <p className="text-xs font-semibold uppercase tracking-wide text-orange-400">
                  Regulado D.S. N° 021-2008-MTC
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-400">{matpel.descripcion}</p>

            <ul className="mt-6 space-y-2">
              {[
                "Clases MATPEL 2, 3, 8 y 9",
                "Monitoreo GPS 24/7 homologado SUTRAN",
                "Conductores con Licencia Especial A-IV",
                "Póliza de seguro ambiental vigente",
                "Plan de contingencia aprobado por el MTC",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-slate-200">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center gap-2 text-sm text-slate-400">
              <MapPin className="h-4 w-4 text-orange-400" />
              Cobertura: {matpel.rutas.join(" · ")}
            </div>

            <a href="#cotizador" className="btn-primary mt-6 w-full">
              Cotizar transporte MATPEL
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
