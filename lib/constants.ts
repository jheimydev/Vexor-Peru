import { ProductoInsumo, ServicioTransporte } from "./types";

// ---------------------------------------------------------------------------
// DATOS CORPORATIVOS
// ---------------------------------------------------------------------------
export const EMPRESA = {
  razonSocial: "VEXOR PERÚ S.A.C.",
  nombreComercial: "VEXOR PERÚ",
  ruc: "20609XXXXXX", // Reemplazar por el RUC real antes de producción
  eslogan: "Suministros Industriales y Transporte Especializado MATPEL",
  telefonoComercial: "+51 999 999 999",
  whatsappComercial: "51999999999", // Formato internacional sin '+' ni espacios, para wa.me
  correoComercial: "ventas@vexorperu.com",
  direccion: "Av. Industrial S/N, Lima, Perú",
  horarioAtencion: "Lun - Sáb: 8:00 a.m. - 7:00 p.m.",
};

// ---------------------------------------------------------------------------
// CATÁLOGO DE SUMINISTROS INDUSTRIALES
// ---------------------------------------------------------------------------
export const BOLAS_ACERO_MEDIDAS = [
  { pulgadas: "1", durezaHRC: "60-65 HRC", usoRecomendado: "Molienda fina - Molinos de bolas" },
  { pulgadas: "2", durezaHRC: "60-65 HRC", usoRecomendado: "Molienda estándar - Molinos de bolas" },
  { pulgadas: "3", durezaHRC: "60-65 HRC", usoRecomendado: "Molienda media - Molinos SAG y de bolas" },
  { pulgadas: "4", durezaHRC: "60-65 HRC", usoRecomendado: "Molienda primaria - Molinos SAG" },
  { pulgadas: "5", durezaHRC: "60-65 HRC", usoRecomendado: "Molienda gruesa - Molinos SAG de alto impacto" },
] as const;

export const PRODUCTOS: ProductoInsumo[] = [
  {
    id: "bolas-acero",
    nombre: "Bolas de Acero Forjado para Molienda",
    descripcion:
      "Bolas de acero forjado de alto cromo para molinos de bolas y SAG, con dureza controlada de 60-65 HRC para máxima resistencia al desgaste e impacto en circuitos de molienda de mineral.",
    unidadMedida: "Toneladas métricas (TM)",
    presentaciones: ["Big bags 1 TM", "Granel", "Contenedor 20'/40'"],
    fichaTecnica: {
      nombre: "Ficha Técnica - Bolas de Acero Forjado.pdf",
      urlPdf: "/docs/ficha-tecnica-bolas-acero.pdf",
    },
    medidas: BOLAS_ACERO_MEDIDAS as unknown as ProductoInsumo["medidas"],
  },
  {
    id: "carbon-activado",
    nombre: "Carbón Activado",
    descripcion:
      "Carbón activado base cáscara de coco y mineral, con índice de yodo de 950 a 1100 mg/g, formulado para procesos de minería de oro (CIP/CIL/CIC) y tratamiento de aguas industriales.",
    unidadMedida: "Kilogramos (kg) / Sacos 25 kg",
    presentaciones: ["Sacos 25 kg", "Big bags 1000 kg", "Granel a pedido"],
    fichaTecnica: {
      nombre: "Ficha Técnica - Carbón Activado.pdf",
      urlPdf: "/docs/ficha-tecnica-carbon-activado.pdf",
    },
    hojaSeguridad: {
      nombre: "HDS - Carbón Activado.pdf",
      urlPdf: "/docs/hds-carbon-activado.pdf",
    },
  },
  {
    id: "alcohol-industrial",
    nombre: "Alcohol Industrial",
    descripcion:
      "Alcohol etílico 96° y 70° GL, y alcohol isopropílico al 99%. Clasificación UN 1170, líquido inflamable Clase 3. Despacho seguro y trazable bajo normativa MATPEL.",
    unidadMedida: "Galones (gal) / Litros (L)",
    clasificacionUN: "UN 1170",
    claseRiesgo: "Clase 3 - Líquido inflamable",
    presentaciones: ["Cilindros 55 gal", "IBC 1000 L", "Cisterna a granel"],
    fichaTecnica: {
      nombre: "Ficha Técnica - Alcohol Industrial.pdf",
      urlPdf: "/docs/ficha-tecnica-alcohol-industrial.pdf",
    },
    hojaSeguridad: {
      nombre: "HDS - Alcohol Industrial (UN 1170).pdf",
      urlPdf: "/docs/hds-alcohol-industrial.pdf",
    },
  },
];

// ---------------------------------------------------------------------------
// SERVICIOS DE TRANSPORTE
// ---------------------------------------------------------------------------
export const SERVICIOS_TRANSPORTE: ServicioTransporte[] = [
  {
    id: "carga-general",
    nombre: "Transporte de Carga General",
    tipo: "carga-general",
    descripcion:
      "Flota de plataformas de 30 TM, furgones y camas bajas para el traslado de carga industrial y de proyecto a nivel nacional, cubriendo rutas de Costa, Sierra y Selva.",
    unidades: ["plataforma-30tm", "furgon", "cama-baja"],
    rutas: ["Costa", "Sierra", "Selva", "Rutas interprovinciales"],
  },
  {
    id: "matpel",
    tipo: "matpel",
    nombre: "Transporte MATPEL (Materiales Peligrosos)",
    descripcion:
      "Transporte especializado y regulado por el D.S. N° 021-2008-MTC para materiales de las Clases 2, 3, 8 y 9, con monitoreo GPS 24/7 homologado ante SUTRAN y protocolos de contingencia ambiental.",
    unidades: ["cisterna-matpel", "granelero-matpel"],
    rutas: ["Costa", "Sierra", "Selva", "Rutas mineras especializadas"],
  },
];

// ---------------------------------------------------------------------------
// CUMPLIMIENTO NORMATIVO
// ---------------------------------------------------------------------------
export const SELLOS_CUMPLIMIENTO = [
  {
    titulo: "Choferes Licencia A-IV",
    descripcion:
      "Conductores certificados con Licencia de Conducir Especial Categoría A-IV para el transporte de materiales peligrosos.",
    icono: "id-card",
  },
  {
    titulo: "Plan de Contingencia MTC",
    descripcion:
      "Planes de contingencia ambiental aprobados conforme al D.S. N° 021-2008-MTC ante cualquier eventualidad en ruta.",
    icono: "shield-alert",
  },
  {
    titulo: "GPS Homologado SUTRAN",
    descripcion:
      "Monitoreo satelital 24/7 de toda la flota, homologado ante la Superintendencia de Transporte Terrestre (SUTRAN).",
    icono: "satellite",
  },
  {
    titulo: "Facturación Electrónica SUNAT",
    descripcion:
      "Emisión de comprobantes electrónicos (Factura, Guía de Remisión) conforme a los estándares de SUNAT.",
    icono: "file-check-2",
  },
  {
    titulo: "Póliza de Seguro Ambiental",
    descripcion:
      "Cobertura de seguro ambiental vigente para operaciones de transporte de materiales peligrosos (MATPEL).",
    icono: "leaf",
  },
  {
    titulo: "Clases MATPEL 2, 3, 8 y 9",
    descripcion:
      "Autorización y experiencia operativa en el transporte de gases, líquidos inflamables, corrosivos y sustancias varias.",
    icono: "flame",
  },
];
