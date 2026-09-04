import {
  IdCard,
  ShieldAlert,
  Satellite,
  FileCheck2,
  Leaf,
  Flame,
  type LucideIcon,
} from "lucide-react";
import { SELLOS_CUMPLIMIENTO } from "@/lib/constants";

const ICONOS: Record<string, LucideIcon> = {
  "id-card": IdCard,
  "shield-alert": ShieldAlert,
  satellite: Satellite,
  "file-check-2": FileCheck2,
  leaf: Leaf,
  flame: Flame,
};

export default function ComplianceGrid() {
  return (
    <section id="cumplimiento" className="border-b border-slate-800 bg-slate-950 py-20">
      <div className="section-container">
        <div className="max-w-2xl">
          <span className="badge-normativo">Cumplimiento normativo</span>
          <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">
            Operamos bajo el marco regulatorio peruano
          </h2>
          <p className="mt-4 text-slate-400">
            Cada despacho de VEXOR PERÚ está respaldado por certificaciones y controles
            verificables ante MTC, SUTRAN y SUNAT.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SELLOS_CUMPLIMIENTO.map((sello) => {
            const Icono = ICONOS[sello.icono] ?? ShieldAlert;
            return (
              <div
                key={sello.titulo}
                className="card-industrial group p-6 transition hover:border-amber-500/60"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-amber-400 transition group-hover:bg-amber-500 group-hover:text-slate-950">
                  <Icono className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-base font-bold text-white">{sello.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {sello.descripcion}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
