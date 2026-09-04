// Tipos de dominio compartidos por la plataforma VEXOR PERÚ.
// Pensados para migrar directamente a modelos de una API/BD futura.

export type LineaNegocio = "insumo" | "flete";

export type CategoriaInsumo = "bolas-acero" | "carbon-activado" | "alcohol-industrial";

export interface MedidaBolaAcero {
  pulgadas: "1" | "2" | "3" | "4" | "5";
  durezaHRC: string;
  usoRecomendado: string;
}

export interface FichaTecnica {
  nombre: string;
  urlPdf: string; // Ruta al PDF de Ficha Técnica / HDS (Hoja de Datos de Seguridad)
}

export interface ProductoInsumo {
  id: CategoriaInsumo;
  nombre: string;
  descripcion: string;
  unidadMedida: string;
  clasificacionUN?: string; // Ej: UN 1170 para alcoholes
  claseRiesgo?: string; // Ej: Clase 3 - Líquido inflamable
  presentaciones: string[];
  fichaTecnica: FichaTecnica;
  hojaSeguridad?: FichaTecnica;
  medidas?: MedidaBolaAcero[];
}

export type TipoUnidadTransporte =
  | "plataforma-30tm"
  | "furgon"
  | "cama-baja"
  | "cisterna-matpel"
  | "granelero-matpel";

export interface ServicioTransporte {
  id: string;
  nombre: string;
  tipo: "carga-general" | "matpel";
  descripcion: string;
  unidades: TipoUnidadTransporte[];
  rutas: string[];
}

export type EstadoEnvio =
  | "registrado"
  | "en-transito"
  | "en-destino"
  | "entregado"
  | "incidencia";

export interface SeguimientoEnvio {
  codigoTracking: string;
  guiaRemisionSunat?: string;
  estado: EstadoEnvio;
  origen: string;
  destino: string;
  ultimaActualizacion: string;
  historial: { fecha: string; evento: string; ubicacion: string }[];
}

export interface CotizacionInsumo {
  tipo: "insumo";
  producto: CategoriaInsumo;
  medidaBola?: MedidaBolaAcero["pulgadas"];
  cantidad: number;
  unidad: string;
  ciudadEntrega: string;
  empresa: string;
  contacto: string;
  telefono: string;
  comentarios?: string;
}

export interface CotizacionFlete {
  tipo: "flete";
  tipoCarga: "carga-general" | "matpel";
  origen: string;
  destino: string;
  tipoUnidad: TipoUnidadTransporte;
  pesoToneladas: number;
  fechaTentativa: string;
  empresa: string;
  contacto: string;
  telefono: string;
  comentarios?: string;
}

export type Cotizacion = CotizacionInsumo | CotizacionFlete;
