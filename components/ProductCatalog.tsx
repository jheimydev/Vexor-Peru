"use client";

import { useMemo, useState } from "react";
import { FileDown, FlaskConical, Layers, Droplets, CheckCircle2 } from "lucide-react";
import { PRODUCTOS, BOLAS_ACERO_MEDIDAS } from "@/lib/constants";
import type { CategoriaInsumo } from "@/lib/types";

const ICONOS: Record<CategoriaInsumo, React.ElementType> = {
  "bolas-acero": Layers,
  "carbon-activado": FlaskConical,
  "alcohol-industrial": Droplets,
};

export default function ProductCatalog() {
  const [activo, setActivo] = useState<CategoriaInsumo>("bolas-acero");
  const [medidaSeleccionada, setMedidaSeleccionada] =
    useState<(typeof BOLAS_ACERO_MEDIDAS)[number]["pulgadas"]>("2");

  const producto = useMemo(
    () => PRODUCTOS.find((p) => p.id === activo)!,
    [activo]
  );

  const medidaActual = useMemo(
    () => BOLAS_ACERO_MEDIDAS.find((m) => m.pulgadas === medidaSeleccionada)!,
    [medidaSeleccionada]
  );

  return (
    <section id="suministros" className="border-b border-slate-800 bg-slate-950 py-20">
      <div className="section-container">
        <div className="max-w-2xl">
          <span className="badge-normativo">Catálogo industrial</span>
          <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">
            Suministros para minería e industria
          </h2>
          <p className="mt-4 text-slate-400">
            Insumos críticos para procesos de molienda, cianuración y tratamiento de aguas,
            despachados con ficha técnica y hoja de datos de seguridad (HDS).
          </p>
        </div>

        {/* Selector de categoría */}
        <div className="mt-10 flex flex-wrap gap-3">
          {PRODUCTOS.map((p) => {
            const Icono = ICONOS[p.id];
            const isActive = p.id === activo;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActivo(p.id)}
                aria-pressed={isActive}
                className={`inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "border-amber-500 bg-amber-500/10 text-amber-400"
                    : "border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                <Icono className="h-4 w-4" />
                {p.nombre}
              </button>
            );
          })}
        </div>

        {/* Panel de producto activo */}
        <div className="mt-8 grid gap-6 lg:grid-cols-5">
          <div className="card-industrial p-6 lg:col-span-3 lg:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-xl font-bold text-white">{producto.nombre}</h3>
              {producto.clasificacionUN && (
                <span className="badge-normativo !text-orange-400">
                  {producto.clasificacionUN} · {producto.claseRiesgo}
                </span>
              )}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              {producto.descripcion}
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Unidad de medida
                </p>
                <p className="mt-1 text-sm text-slate-200">{producto.unidadMedida}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Presentaciones
                </p>
                <ul className="mt-1 space-y-1">
                  {producto.presentaciones.map((pres) => (
                    <li key={pres} className="flex items-center gap-1.5 text-sm text-slate-200">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                      {pres}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Selector dinámico exclusivo de Bolas de Acero */}
            {producto.id === "bolas-acero" && (
              <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950/60 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Selecciona la medida
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {BOLAS_ACERO_MEDIDAS.map((m) => {
                    const isActive = m.pulgadas === medidaSeleccionada;
                    return (
                      <button
                        key={m.pulgadas}
                        type="button"
                        onClick={() => setMedidaSeleccionada(m.pulgadas)}
                        aria-pressed={isActive}
                        className={`flex h-14 w-14 items-center justify-center rounded-lg border text-sm font-black transition ${
                          isActive
                            ? "border-amber-500 bg-amber-500 text-slate-950"
                            : "border-slate-700 bg-slate-900 text-slate-300 hover:border-amber-500/60 hover:text-amber-400"
                        }`}
                      >
                        {m.pulgadas}&quot;
                      </button>
                    );
                  })}
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg bg-slate-900 p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      Dureza
                    </p>
                    <p className="text-sm font-semibold text-amber-400">
                      {medidaActual.durezaHRC}
                    </p>
                  </div>
                  <div className="rounded-lg bg-slate-900 p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      Uso recomendado
                    </p>
                    <p className="text-sm font-semibold text-slate-200">
                      {medidaActual.usoRecomendado}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Descargas de documentación técnica */}
          <div className="card-industrial flex flex-col gap-4 p-6 lg:col-span-2 lg:p-8">
            <h4 className="text-sm font-bold uppercase tracking-wide text-slate-300">
              Documentación técnica
            </h4>

            <a
              href={producto.fichaTecnica.urlPdf}
              download
              className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-4 transition hover:border-amber-500"
            >
              <div>
                <p className="text-sm font-semibold text-slate-100">Ficha Técnica</p>
                <p className="text-xs text-slate-500">{producto.fichaTecnica.nombre}</p>
              </div>
              <FileDown className="h-5 w-5 text-amber-500" />
            </a>

            {producto.hojaSeguridad && (
              <a
                href={producto.hojaSeguridad.urlPdf}
                download
                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-4 transition hover:border-amber-500"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-100">
                    Hoja de Datos de Seguridad (HDS)
                  </p>
                  <p className="text-xs text-slate-500">{producto.hojaSeguridad.nombre}</p>
                </div>
                <FileDown className="h-5 w-5 text-amber-500" />
              </a>
            )}

            <div className="mt-auto rounded-xl border border-dashed border-slate-800 p-4 text-xs text-slate-500">
              Los documentos son referenciales. Para especificaciones certificadas por lote,
              solicita el respaldo mediante el cotizador o WhatsApp corporativo.
            </div>

            <a href="#cotizador" className="btn-primary">
              Cotizar {producto.nombre}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
