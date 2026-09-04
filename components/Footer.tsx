import Link from "next/link";
import { Truck, MapPin, Mail, Phone, Clock, ShieldCheck } from "lucide-react";
import { EMPRESA } from "@/lib/constants";

export default function Footer() {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="section-container py-14">
        <div className="grid gap-10 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 font-black tracking-tight">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500 text-slate-950">
                <Truck className="h-5 w-5" strokeWidth={2.5} />
              </span>
              <span className="text-lg text-white">
                VEXOR<span className="text-amber-500"> PERÚ</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-slate-500">{EMPRESA.eslogan}</p>
          </div>

          <div>
            <h5 className="text-sm font-bold uppercase tracking-wide text-slate-300">
              Navegación
            </h5>
            <ul className="mt-4 space-y-2 text-sm text-slate-500">
              <li><Link href="/#suministros" className="hover:text-amber-400">Suministros</Link></li>
              <li><Link href="/#transporte" className="hover:text-amber-400">Transporte</Link></li>
              <li><Link href="/#cumplimiento" className="hover:text-amber-400">Cumplimiento</Link></li>
              <li><Link href="/#cotizador" className="hover:text-amber-400">Cotizador</Link></li>
              <li><Link href="/tracking" className="hover:text-amber-400">Rastreo de envíos</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-bold uppercase tracking-wide text-slate-300">Contacto</h5>
            <ul className="mt-4 space-y-3 text-sm text-slate-500">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                {EMPRESA.direccion}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-amber-500" />
                {EMPRESA.telefonoComercial}
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-amber-500" />
                {EMPRESA.correoComercial}
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0 text-amber-500" />
                {EMPRESA.horarioAtencion}
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-bold uppercase tracking-wide text-slate-300">
              Cumplimiento normativo
            </h5>
            <ul className="mt-4 space-y-2 text-sm text-slate-500">
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-500" />
                D.S. N° 021-2008-MTC
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-500" />
                Homologado SUTRAN
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-500" />
                Facturación electrónica SUNAT
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-slate-800 pt-6 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {anioActual} {EMPRESA.razonSocial} — Todos los derechos reservados.
          </p>
          <p>RUC: {EMPRESA.ruc}</p>
        </div>
      </div>
    </footer>
  );
}
