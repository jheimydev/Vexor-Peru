import { NextRequest, NextResponse } from "next/server";
import type { SeguimientoEnvio } from "@/lib/types";

// ---------------------------------------------------------------------------
// ESQUELETO DE API - Consulta de seguimiento de envíos / Guías de Remisión.
//
// Este endpoint es el punto de integración futuro para:
//  1. Sistema interno de trazabilidad de flota (posición GPS homologada SUTRAN).
//  2. Servicio de Guías de Remisión Electrónicas de SUNAT (consulta por número
//     de guía T001-XXXXXXXX o por código de tracking interno VXR-YYYY-NNNNN).
//
// Reemplazar el bloque `// TODO` por la consulta real (ORM/DB, o llamada a un
// microservicio externo). El contrato de respuesta ya está tipado en
// `SeguimientoEnvio` (lib/types.ts) para que el frontend (app/tracking/page.tsx)
// no requiera cambios al conectar la fuente real.
// ---------------------------------------------------------------------------

export async function GET(
  _request: NextRequest,
  { params }: { params: { codigo: string } }
) {
  const codigo = params.codigo?.trim().toUpperCase();

  if (!codigo) {
    return NextResponse.json(
      { error: "Debe proporcionar un código de tracking o número de guía." },
      { status: 400 }
    );
  }

  // TODO: reemplazar por consulta real, por ejemplo:
  // const envio = await db.seguimiento.findUnique({ where: { codigoTracking: codigo } });
  const envio: SeguimientoEnvio | null = null;

  if (!envio) {
    return NextResponse.json(
      { error: `No se encontró información para el código "${codigo}".` },
      { status: 404 }
    );
  }

  return NextResponse.json(envio, { status: 200 });
}
