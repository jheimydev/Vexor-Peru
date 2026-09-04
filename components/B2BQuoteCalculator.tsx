"use client";

import { useMemo, useState } from "react";
import { Package, Truck, Send, MessageCircle } from "lucide-react";
import { EMPRESA, PRODUCTOS, BOLAS_ACERO_MEDIDAS, SERVICIOS_TRANSPORTE } from "@/lib/constants";
import type {
  CategoriaInsumo,
  CotizacionFlete,
  CotizacionInsumo,
  LineaNegocio,
  TipoUnidadTransporte,
} from "@/lib/types";

const UNIDADES_TRANSPORTE: { value: TipoUnidadTransporte; label: string; matpel: boolean }[] = [
  { value: "plataforma-30tm", label: "Plataforma 30 TM", matpel: false },
  { value: "furgon", label: "Furgón", matpel: false },
  { value: "cama-baja", label: "Cama baja", matpel: false },
  { value: "cisterna-matpel", label: "Cisterna MATPEL", matpel: true },
  { value: "granelero-matpel", label: "Granelero MATPEL", matpel: true },
];

const initialInsumo: CotizacionInsumo = {
  tipo: "insumo",
  producto: "bolas-acero",
  medidaBola: "2",
  cantidad: 1,
  unidad: PRODUCTOS[0].unidadMedida,
  ciudadEntrega: "",
  empresa: "",
  contacto: "",
  telefono: "",
  comentarios: "",
};

const initialFlete: CotizacionFlete = {
  tipo: "flete",
  tipoCarga: "carga-general",
  origen: "",
  destino: "",
  tipoUnidad: "plataforma-30tm",
  pesoToneladas: 1,
  fechaTentativa: "",
  empresa: "",
  contacto: "",
  telefono: "",
  comentarios: "",
};

function construirMensajeInsumo(data: CotizacionInsumo): string {
  const producto = PRODUCTOS.find((p) => p.id === data.producto)!;
  const medida =
    data.producto === "bolas-acero"
      ? BOLAS_ACERO_MEDIDAS.find((m) => m.pulgadas === data.medidaBola)
      : undefined;

  const lineas = [
    `*Nueva Solicitud de Cotización - ${EMPRESA.nombreComercial}*`,
    `_Línea: Suministros Industriales_`,
    ``,
    `*Producto:* ${producto.nombre}`,
    medida ? `*Medida:* ${medida.pulgadas}" (${medida.durezaHRC})` : null,
    `*Cantidad:* ${data.cantidad} ${data.unidad}`,
    `*Ciudad de entrega:* ${data.ciudadEntrega || "—"}`,
    ``,
    `*Empresa:* ${data.empresa || "—"}`,
    `*Contacto:* ${data.contacto || "—"}`,
    `*Teléfono:* ${data.telefono || "—"}`,
    data.comentarios ? `*Comentarios:* ${data.comentarios}` : null,
  ].filter(Boolean);

  return lineas.join("\n");
}

function construirMensajeFlete(data: CotizacionFlete): string {
  const servicio = SERVICIOS_TRANSPORTE.find((s) => s.tipo === data.tipoCarga)!;
  const unidad = UNIDADES_TRANSPORTE.find((u) => u.value === data.tipoUnidad)!;

  const lineas = [
    `*Nueva Solicitud de Cotización - ${EMPRESA.nombreComercial}*`,
    `_Línea: ${servicio.nombre}_`,
    ``,
    `*Origen:* ${data.origen || "—"}`,
    `*Destino:* ${data.destino || "—"}`,
    `*Tipo de unidad:* ${unidad.label}`,
    `*Peso estimado:* ${data.pesoToneladas} TM`,
    `*Fecha tentativa:* ${data.fechaTentativa || "Por definir"}`,
    ``,
    `*Empresa:* ${data.empresa || "—"}`,
    `*Contacto:* ${data.contacto || "—"}`,
    `*Teléfono:* ${data.telefono || "—"}`,
    data.comentarios ? `*Comentarios:* ${data.comentarios}` : null,
  ].filter(Boolean);

  return lineas.join("\n");
}

export default function B2BQuoteCalculator() {
  const [linea, setLinea] = useState<LineaNegocio>("insumo");
  const [insumo, setInsumo] = useState<CotizacionInsumo>(initialInsumo);
  const [flete, setFlete] = useState<CotizacionFlete>(initialFlete);
  const [enviado, setEnviado] = useState(false);

  const productoSeleccionado = useMemo(
    () => PRODUCTOS.find((p) => p.id === insumo.producto)!,
    [insumo.producto]
  );

  const unidadesDisponibles = useMemo(
    () =>
      flete.tipoCarga === "matpel"
        ? UNIDADES_TRANSPORTE.filter((u) => u.matpel)
        : UNIDADES_TRANSPORTE.filter((u) => !u.matpel),
    [flete.tipoCarga]
  );

  const mensajeWhatsApp = useMemo(
    () => (linea === "insumo" ? construirMensajeInsumo(insumo) : construirMensajeFlete(flete)),
    [linea, insumo, flete]
  );

  const whatsappUrl = `https://wa.me/${EMPRESA.whatsappComercial}?text=${encodeURIComponent(
    mensajeWhatsApp
  )}`;

  const camposObligatoriosCompletos = useMemo(() => {
    if (linea === "insumo") {
      return Boolean(insumo.cantidad > 0 && insumo.ciudadEntrega && insumo.empresa && insumo.telefono);
    }
    return Boolean(
      flete.origen && flete.destino && flete.pesoToneladas > 0 && flete.empresa && flete.telefono
    );
  }, [linea, insumo, flete]);

  function handleProductoChange(id: CategoriaInsumo) {
    const producto = PRODUCTOS.find((p) => p.id === id)!;
    setInsumo((prev) => ({
      ...prev,
      producto: id,
      unidad: producto.unidadMedida,
      medidaBola: id === "bolas-acero" ? prev.medidaBola ?? "2" : undefined,
    }));
  }

  function handleTipoCargaChange(tipo: "carga-general" | "matpel") {
    const unidadesValidas = UNIDADES_TRANSPORTE.filter((u) =>
      tipo === "matpel" ? u.matpel : !u.matpel
    );
    setFlete((prev) => ({
      ...prev,
      tipoCarga: tipo,
      tipoUnidad: unidadesValidas[0].value,
    }));
  }

  function handleEnviarWhatsApp(e: React.FormEvent) {
    e.preventDefault();
    if (!camposObligatoriosCompletos) return;
    setEnviado(true);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <section id="cotizador" className="bg-slate-950 py-20">
      <div className="section-container">
        <div className="max-w-2xl">
          <span className="badge-normativo">Cotizador B2B</span>
          <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">
            Genera tu cotización en minutos
          </h2>
          <p className="mt-4 text-slate-400">
            Completa los datos de tu requerimiento. Al enviar, se genera automáticamente un
            mensaje estructurado listo para tu WhatsApp corporativo.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          <div className="card-industrial p-6 lg:col-span-3 lg:p-8">
            {/* Toggle de línea de negocio */}
            <div className="grid grid-cols-2 gap-2 rounded-xl border border-slate-800 bg-slate-950/60 p-1.5">
              <button
                type="button"
                onClick={() => setLinea("insumo")}
                aria-pressed={linea === "insumo"}
                className={`flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-bold transition ${
                  linea === "insumo"
                    ? "bg-amber-500 text-slate-950"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Package className="h-4 w-4" />
                Compra de Insumos
              </button>
              <button
                type="button"
                onClick={() => setLinea("flete")}
                aria-pressed={linea === "flete"}
                className={`flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-bold transition ${
                  linea === "flete"
                    ? "bg-amber-500 text-slate-950"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Truck className="h-4 w-4" />
                Servicio de Flete
              </button>
            </div>

            <form className="mt-6 space-y-5" onSubmit={handleEnviarWhatsApp}>
              {linea === "insumo" ? (
                <>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Producto
                    </label>
                    <div className="mt-2 grid gap-2 sm:grid-cols-3">
                      {PRODUCTOS.map((p) => {
                        const isActive = p.id === insumo.producto;
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => handleProductoChange(p.id)}
                            aria-pressed={isActive}
                            className={`rounded-lg border px-3 py-2.5 text-xs font-semibold transition ${
                              isActive
                                ? "border-amber-500 bg-amber-500/10 text-amber-400"
                                : "border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700"
                            }`}
                          >
                            {p.nombre}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {insumo.producto === "bolas-acero" && (
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Medida
                      </label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {BOLAS_ACERO_MEDIDAS.map((m) => {
                          const isActive = m.pulgadas === insumo.medidaBola;
                          return (
                            <button
                              key={m.pulgadas}
                              type="button"
                              onClick={() =>
                                setInsumo((prev) => ({ ...prev, medidaBola: m.pulgadas }))
                              }
                              aria-pressed={isActive}
                              className={`h-12 w-12 rounded-lg border text-sm font-black transition ${
                                isActive
                                  ? "border-amber-500 bg-amber-500 text-slate-950"
                                  : "border-slate-700 bg-slate-900 text-slate-300 hover:border-amber-500/60"
                              }`}
                            >
                              {m.pulgadas}&quot;
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="cantidad" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Cantidad ({productoSeleccionado.unidadMedida})
                      </label>
                      <input
                        id="cantidad"
                        type="number"
                        min={1}
                        value={insumo.cantidad}
                        onChange={(e) =>
                          setInsumo((prev) => ({
                            ...prev,
                            cantidad: Number(e.target.value),
                          }))
                        }
                        className="mt-2 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-amber-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="ciudad" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Ciudad de entrega
                      </label>
                      <input
                        id="ciudad"
                        type="text"
                        placeholder="Ej. Cajamarca"
                        value={insumo.ciudadEntrega}
                        onChange={(e) =>
                          setInsumo((prev) => ({ ...prev, ciudadEntrega: e.target.value }))
                        }
                        className="mt-2 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-amber-500"
                        required
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Tipo de carga
                    </label>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleTipoCargaChange("carga-general")}
                        aria-pressed={flete.tipoCarga === "carga-general"}
                        className={`rounded-lg border px-3 py-2.5 text-xs font-semibold transition ${
                          flete.tipoCarga === "carga-general"
                            ? "border-amber-500 bg-amber-500/10 text-amber-400"
                            : "border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        Carga General
                      </button>
                      <button
                        type="button"
                        onClick={() => handleTipoCargaChange("matpel")}
                        aria-pressed={flete.tipoCarga === "matpel"}
                        className={`rounded-lg border px-3 py-2.5 text-xs font-semibold transition ${
                          flete.tipoCarga === "matpel"
                            ? "border-orange-500 bg-orange-500/10 text-orange-400"
                            : "border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        MATPEL
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="origen" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Origen
                      </label>
                      <input
                        id="origen"
                        type="text"
                        placeholder="Ej. Lima"
                        value={flete.origen}
                        onChange={(e) => setFlete((prev) => ({ ...prev, origen: e.target.value }))}
                        className="mt-2 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-amber-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="destino" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Destino
                      </label>
                      <input
                        id="destino"
                        type="text"
                        placeholder="Ej. Cerro de Pasco"
                        value={flete.destino}
                        onChange={(e) => setFlete((prev) => ({ ...prev, destino: e.target.value }))}
                        className="mt-2 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-amber-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Tipo de unidad
                    </label>
                    <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {unidadesDisponibles.map((u) => {
                        const isActive = u.value === flete.tipoUnidad;
                        return (
                          <button
                            key={u.value}
                            type="button"
                            onClick={() =>
                              setFlete((prev) => ({ ...prev, tipoUnidad: u.value }))
                            }
                            aria-pressed={isActive}
                            className={`rounded-lg border px-3 py-2.5 text-xs font-semibold transition ${
                              isActive
                                ? "border-amber-500 bg-amber-500/10 text-amber-400"
                                : "border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700"
                            }`}
                          >
                            {u.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="peso" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Peso estimado (TM)
                      </label>
                      <input
                        id="peso"
                        type="number"
                        min={1}
                        value={flete.pesoToneladas}
                        onChange={(e) =>
                          setFlete((prev) => ({
                            ...prev,
                            pesoToneladas: Number(e.target.value),
                          }))
                        }
                        className="mt-2 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-amber-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="fecha" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Fecha tentativa
                      </label>
                      <input
                        id="fecha"
                        type="date"
                        value={flete.fechaTentativa}
                        onChange={(e) =>
                          setFlete((prev) => ({ ...prev, fechaTentativa: e.target.value }))
                        }
                        className="mt-2 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-amber-500 [color-scheme:dark]"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="grid gap-4 border-t border-slate-800 pt-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="empresa" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Empresa
                  </label>
                  <input
                    id="empresa"
                    type="text"
                    value={linea === "insumo" ? insumo.empresa : flete.empresa}
                    onChange={(e) =>
                      linea === "insumo"
                        ? setInsumo((prev) => ({ ...prev, empresa: e.target.value }))
                        : setFlete((prev) => ({ ...prev, empresa: e.target.value }))
                    }
                    className="mt-2 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-amber-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contacto" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Persona de contacto
                  </label>
                  <input
                    id="contacto"
                    type="text"
                    value={linea === "insumo" ? insumo.contacto : flete.contacto}
                    onChange={(e) =>
                      linea === "insumo"
                        ? setInsumo((prev) => ({ ...prev, contacto: e.target.value }))
                        : setFlete((prev) => ({ ...prev, contacto: e.target.value }))
                    }
                    className="mt-2 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label htmlFor="telefono" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Teléfono / WhatsApp
                  </label>
                  <input
                    id="telefono"
                    type="tel"
                    placeholder="+51 9XX XXX XXX"
                    value={linea === "insumo" ? insumo.telefono : flete.telefono}
                    onChange={(e) =>
                      linea === "insumo"
                        ? setInsumo((prev) => ({ ...prev, telefono: e.target.value }))
                        : setFlete((prev) => ({ ...prev, telefono: e.target.value }))
                    }
                    className="mt-2 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-amber-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="comentarios" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Comentarios (opcional)
                  </label>
                  <input
                    id="comentarios"
                    type="text"
                    value={linea === "insumo" ? insumo.comentarios : flete.comentarios}
                    onChange={(e) =>
                      linea === "insumo"
                        ? setInsumo((prev) => ({ ...prev, comentarios: e.target.value }))
                        : setFlete((prev) => ({ ...prev, comentarios: e.target.value }))
                    }
                    className="mt-2 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!camposObligatoriosCompletos}
                className="btn-whatsapp w-full disabled:cursor-not-allowed disabled:opacity-40"
              >
                <MessageCircle className="h-4 w-4" />
                Enviar cotización por WhatsApp
              </button>

              {enviado && (
                <p className="text-center text-xs font-medium text-emerald-400">
                  Se abrió WhatsApp con tu solicitud. Nuestro equipo comercial te responderá a la
                  brevedad.
                </p>
              )}
            </form>
          </div>

          {/* Vista previa del mensaje */}
          <div className="card-industrial flex flex-col p-6 lg:col-span-2 lg:p-8">
            <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-300">
              <Send className="h-4 w-4 text-emerald-500" />
              Vista previa del mensaje
            </h4>
            <pre className="mt-4 flex-1 whitespace-pre-wrap rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-xs leading-relaxed text-slate-300">
              {mensajeWhatsApp}
            </pre>
            <p className="mt-4 text-xs text-slate-500">
              Este mensaje se genera automáticamente y se codifica para abrir tu WhatsApp con el
              texto ya redactado, listo para enviar a {EMPRESA.nombreComercial}.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
