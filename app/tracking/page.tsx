"use client";

import { useState } from "react";
import {
  Search,
  PackageSearch,
  Truck,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Clock,
} from "lucide-react";
import type { EstadoEnvio, SeguimientoEnvio } from "@/lib/types";

// NOTA DE ARQUITECTURA:
// Este módulo es un MOCKUP funcional de UI. La búsqueda actual consulta datos
// de ejemplo en memoria (MOCK_ENVIOS). Para producción, reemplazar
// `buscarEnvioMock` por un fetch a un endpoint interno, por ejemplo:
//   GET /api/tracking/[codigo]  -> integrado con el sistema de Guías de
//   Remisión electrónicas de SUNAT y/o el proveedor de GPS/SUTRAN.
// La forma de los datos (SeguimientoEnvio, en lib/types.ts) ya está lista
// para ese contrato de API.

const ESTADOS_LABEL: Record<EstadoEnvio, { label: string; color: string }> = {
  registrado: { label: "Registrado", color: "text-slate-300 bg-slate-800" },
  "en-transito": { label: "En tránsito", color: "text-amber-400 bg-amber-500/10" },
  "en-destino": { label: "En destino", color: "text-orange-400 bg-orange-500/10" },
  entregado: { label: "Entregado", color: "text-emerald-400 bg-emerald-500/10" },
  incidencia: { label: "Incidencia", color: "text-red-400 bg-red-500/10" },
};

const MOCK_ENVIOS: Record<string, SeguimientoEnvio> = {
  "VXR-2026-00123": {
    codigoTracking: "VXR-2026-00123",
    guiaRemisionSunat: "T001-00045821",
    estado: "en-transito",
    origen: "Lima",
    destino: "Cajamarca",
    ultimaActualizacion: "04/09/2026 09:40",
    historial: [
      { fecha: "02/09/2026 07:15", evento: "Unidad cargada y despachada", ubicacion: "Almacén Lima" },
      { fecha: "02/09/2026 18:30", evento: "Checkpoint de ruta - GPS OK", ubicacion: "Pativilca" },
      { fecha: "03/09/2026 22:10", evento: "Checkpoint de ruta - GPS OK", ubicacion: "Cajamarca (ingreso)" },
      { fecha: "04/09/2026 09:40", evento: "En tránsito hacia punto de entrega final", ubicacion: "Cajamarca" },
    ],
  },
  "VXR-2026-00098": {
    codigoTracking: "VXR-2026-00098",
    guiaRemisionSunat: "T001-00045790",
    estado: "entregado",
    origen: "Lima",
    destino: "Arequipa",
    ultimaActualizacion: "28/08/2026 16:05",
    historial: [
      { fecha: "26/08/2026 06:50", evento: "Unidad cargada y despachada", ubicacion: "Almacén Lima" },
      { fecha: "27/08/2026 20:15", evento: "Checkpoint de ruta - GPS OK", ubicacion: "Nazca" },
      { fecha: "28/08/2026 16:05", evento: "Entrega conforme al cliente", ubicacion: "Arequipa" },
    ],
  },
};

export default function TrackingPage() {
  const [codigo, setCodigo] = useState("");
  const [resultado, setResultado] = useState<SeguimientoEnvio | null>(null);
  const [buscando, setBuscando] = useState(false);
  const [noEncontrado, setNoEncontrado] = useState(false);

  function buscarEnvioMock(codigoBuscado: string): SeguimientoEnvio | null {
    const normalizado = codigoBuscado.trim().toUpperCase();
    return MOCK_ENVIOS[normalizado] ?? null;
  }

  function handleBuscar(e: React.FormEvent) {
    e.preventDefault();
    if (!codigo.trim()) return;

    setBuscando(true);
    setNoEncontrado(false);
    setResultado(null);

    // Simulación de latencia de red / consulta a API futura.
    window.setTimeout(() => {
      const envio = buscarEnvioMock(codigo);
      if (envio) {
        setResultado(envio);
      } else {
        setNoEncontrado(true);
      }
      setBuscando(false);
    }, 600);
  }

  return (
    <section className="border-b border-slate-800 bg-slate-950 py-20">
      <div className="section-container">
        <div className="max-w-2xl">
          <span className="badge-normativo">
            <PackageSearch className="h-3.5 w-3.5" />
            Módulo de rastreo (preliminar)
          </span>
          <h1 className="mt-4 text-3xl font-black text-white sm:text-4xl">
            Rastrea tu envío o Guía de Remisión
          </h1>
          <p className="mt-4 text-slate-400">
            Ingresa tu código de tracking VEXOR o número de Guía de Remisión electrónica SUNAT
            para consultar el estado de tu despacho. Este módulo es un mockup funcional; la
            versión de producción se conectará a la API interna de trazabilidad y al servicio
            de Guías de Remisión de SUNAT.
          </p>
        </div>

        <form onSubmit={handleBuscar} className="card-industrial mt-10 flex flex-col gap-3 p-4 sm:flex-row sm:p-3">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              placeholder="Ej. VXR-2026-00123 o T001-00045821"
              className="w-full rounded-lg border border-slate-800 bg-slate-950 py-3 pl-11 pr-4 text-sm text-slate-100 outline-none focus:border-amber-500"
            />
          </div>
          <button type="submit" disabled={buscando} className="btn-primary sm:w-48">
            {buscando ? "Buscando..." : "Rastrear envío"}
          </button>
        </form>

        <p className="mt-3 text-xs text-slate-600">
          Prueba con los códigos de ejemplo: <code className="text-amber-500">VXR-2026-00123</code>{" "}
          (en tránsito) o <code className="text-amber-500">VXR-2026-00098</code> (entregado).
        </p>

        {noEncontrado && (
          <div className="mt-8 flex items-center gap-3 rounded-xl border border-red-900/40 bg-red-500/5 p-5 text-sm text-red-300">
            <AlertCircle className="h-5 w-5 shrink-0" />
            No se encontró ningún envío con ese código. Verifica el número o comunícate con tu
            asesor comercial.
          </div>
        )}

        {resultado && (
          <div className="mt-10 grid gap-6 lg:grid-cols-5">
            <div className="card-industrial p-6 lg:col-span-2 lg:p-8">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Código
                </p>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    ESTADOS_LABEL[resultado.estado].color
                  }`}
                >
                  {ESTADOS_LABEL[resultado.estado].label}
                </span>
              </div>
              <p className="mt-1 text-lg font-black text-white">{resultado.codigoTracking}</p>

              {resultado.guiaRemisionSunat && (
                <p className="mt-1 text-xs text-slate-500">
                  Guía de Remisión SUNAT: {resultado.guiaRemisionSunat}
                </p>
              )}

              <div className="mt-6 flex items-center gap-3 text-sm text-slate-300">
                <MapPin className="h-4 w-4 text-amber-500" />
                {resultado.origen} → {resultado.destino}
              </div>
              <div className="mt-2 flex items-center gap-3 text-sm text-slate-400">
                <Clock className="h-4 w-4 text-amber-500" />
                Última actualización: {resultado.ultimaActualizacion}
              </div>

              <div className="mt-6 flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950/60 p-3 text-xs text-slate-500">
                <Truck className="h-4 w-4 text-emerald-500" />
                Monitoreo GPS homologado SUTRAN activo durante todo el trayecto.
              </div>
            </div>

            <div className="card-industrial p-6 lg:col-span-3 lg:p-8">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-300">
                Historial de eventos
              </h3>
              <ol className="mt-6 space-y-6 border-l border-slate-800 pl-6">
                {resultado.historial.map((evento, idx) => {
                  const esUltimo = idx === resultado.historial.length - 1;
                  return (
                    <li key={`${evento.fecha}-${evento.evento}`} className="relative">
                      <span
                        className={`absolute -left-[29px] flex h-4 w-4 items-center justify-center rounded-full ${
                          esUltimo ? "bg-amber-500" : "bg-slate-700"
                        }`}
                      >
                        {esUltimo && <CheckCircle2 className="h-3 w-3 text-slate-950" />}
                      </span>
                      <p className="text-sm font-semibold text-slate-100">{evento.evento}</p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {evento.fecha} · {evento.ubicacion}
                      </p>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
