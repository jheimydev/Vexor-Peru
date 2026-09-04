import { NextRequest, NextResponse } from "next/server";
import type { Cotizacion } from "@/lib/types";

// ---------------------------------------------------------------------------
// ESQUELETO DE API - Persistencia de solicitudes de cotización B2B.
//
// El componente `components/B2BQuoteCalculator.tsx` hoy genera el mensaje de
// WhatsApp en el cliente (sin backend). Este endpoint queda listo para, en una
// segunda fase, además de abrir WhatsApp:
//  1. Registrar la solicitud en base de datos (para seguimiento comercial /
//     CRM interno) antes o después de redirigir a WhatsApp.
//  2. Notificar por correo al equipo comercial (ventas@vexorperu.com).
//  3. Alimentar la futura intranet de clientes (trazabilidad de pedidos).
//
// Reemplazar el bloque `// TODO` por la escritura real (ORM/DB, cola de
// mensajería, servicio de correo, etc).
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  let body: Cotizacion;

  try {
    body = (await request.json()) as Cotizacion;
  } catch {
    return NextResponse.json(
      { error: "El cuerpo de la solicitud debe ser un JSON válido." },
      { status: 400 }
    );
  }

  if (!body?.tipo || (body.tipo !== "insumo" && body.tipo !== "flete")) {
    return NextResponse.json(
      { error: "El campo 'tipo' debe ser 'insumo' o 'flete'." },
      { status: 400 }
    );
  }

  // TODO: persistir la cotización, por ejemplo:
  // const registro = await db.cotizacion.create({ data: body });
  // await enviarNotificacionComercial(registro);

  return NextResponse.json(
    { mensaje: "Solicitud recibida correctamente.", data: body },
    { status: 201 }
  );
}
