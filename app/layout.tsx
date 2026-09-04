import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { EMPRESA } from "@/lib/constants";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://www.vexorperu.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${EMPRESA.nombreComercial} | Suministros Industriales y Transporte MATPEL`,
    template: `%s | ${EMPRESA.nombreComercial}`,
  },
  description:
    "VEXOR PERÚ suministra bolas de acero forjado, carbón activado y alcohol industrial, y ejecuta transporte terrestre de carga general y materiales peligrosos (MATPEL) a nivel nacional, homologado ante SUTRAN y bajo el D.S. N° 021-2008-MTC.",
  keywords: [
    "bolas de acero forjado Perú",
    "carbón activado minería",
    "alcohol industrial Perú",
    "transporte MATPEL",
    "transporte materiales peligrosos Perú",
    "SUTRAN",
    "MTC 021-2008",
    "suministros mineros",
  ],
  authors: [{ name: EMPRESA.razonSocial }],
  openGraph: {
    title: `${EMPRESA.nombreComercial} | Suministros Industriales y Transporte MATPEL`,
    description: EMPRESA.eslogan,
    url: SITE_URL,
    siteName: EMPRESA.nombreComercial,
    locale: "es_PE",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: EMPRESA.razonSocial,
  alternateName: EMPRESA.nombreComercial,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  taxID: EMPRESA.ruc,
  address: {
    "@type": "PostalAddress",
    streetAddress: EMPRESA.direccion,
    addressCountry: "PE",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: EMPRESA.telefonoComercial,
      contactType: "ventas",
      areaServed: "PE",
      availableLanguage: ["es"],
    },
  ],
};

const jsonLdLogisticsService = {
  "@context": "https://schema.org",
  "@type": "LogisticsService",
  name: `${EMPRESA.nombreComercial} - Transporte de Carga y MATPEL`,
  provider: {
    "@type": "Organization",
    name: EMPRESA.razonSocial,
  },
  areaServed: {
    "@type": "Country",
    name: "Perú",
  },
  serviceType: [
    "Transporte de carga general",
    "Transporte de materiales peligrosos (MATPEL)",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-PE" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLogisticsService) }}
        />
      </head>
      <body className="min-h-screen bg-slate-950 font-sans text-slate-100 antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
