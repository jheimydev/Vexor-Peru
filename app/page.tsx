import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import ProductCatalog from "@/components/ProductCatalog";
import TransportSection from "@/components/TransportSection";
import ComplianceGrid from "@/components/ComplianceGrid";
import B2BQuoteCalculator from "@/components/B2BQuoteCalculator";

export const metadata: Metadata = {
  title: "Suministros Industriales y Transporte MATPEL en Perú",
  description:
    "Bolas de acero forjado, carbón activado, alcohol industrial y transporte terrestre de carga general y MATPEL a nivel nacional, con cumplimiento normativo MTC y SUTRAN.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductCatalog />
      <TransportSection />
      <ComplianceGrid />
      <B2BQuoteCalculator />
    </>
  );
}
