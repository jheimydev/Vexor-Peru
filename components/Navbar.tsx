"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Truck, PackageSearch, ShieldCheck, Phone } from "lucide-react";
import { EMPRESA } from "@/lib/constants";

const NAV_LINKS = [
  { href: "/#suministros", label: "Suministros" },
  { href: "/#transporte", label: "Transporte" },
  { href: "/#cumplimiento", label: "Cumplimiento" },
  { href: "/#cotizador", label: "Cotizador" },
  { href: "/tracking", label: "Rastreo" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-colors ${
        scrolled
          ? "border-slate-800 bg-slate-950/95 backdrop-blur"
          : "border-transparent bg-slate-950/70 backdrop-blur"
      }`}
    >
      <nav className="section-container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-black tracking-tight">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500 text-slate-950">
            <Truck className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <span className="text-lg text-white">
            VEXOR<span className="text-amber-500"> PERÚ</span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-300 transition hover:text-amber-400"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`https://wa.me/${EMPRESA.whatsappComercial}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp !px-4 !py-2 text-xs"
          >
            <Phone className="h-4 w-4" />
            Cotizar por WhatsApp
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-lg border border-slate-800 p-2 text-slate-200 lg:hidden"
          aria-label="Abrir menú"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-800 bg-slate-950 lg:hidden">
          <div className="section-container flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium text-slate-200 hover:bg-slate-900 hover:text-amber-400"
              >
                {link.label === "Rastreo" && <PackageSearch className="h-4 w-4" />}
                {link.label === "Cumplimiento" && <ShieldCheck className="h-4 w-4" />}
                {link.label}
              </Link>
            ))}
            <a
              href={`https://wa.me/${EMPRESA.whatsappComercial}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp mt-2"
            >
              <Phone className="h-4 w-4" />
              Cotizar por WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
