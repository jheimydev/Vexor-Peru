# VEXOR PERÚ — Plataforma Corporativa y Cotizador B2B

Sitio corporativo y cotizador B2B para **VEXOR PERÚ** (Suministros Industriales
y Transporte Especializado MATPEL), construido con Next.js 14 (App Router),
TypeScript y Tailwind CSS.

## Stack

- Next.js 14 (App Router, Server Components)
- TypeScript
- Tailwind CSS
- lucide-react (iconografía)

## Puesta en marcha

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Estructura del proyecto

```
app/
  layout.tsx              Metadata global, JSON-LD (Organization, LogisticsService), navbar/footer
  page.tsx                Landing: Hero, Catálogo, Transporte, Cumplimiento, Cotizador
  tracking/page.tsx        Mockup de rastreo de envíos / Guía de Remisión SUNAT
  api/tracking/[codigo]/route.ts  Esqueleto de API para conectar el tracking real
  api/quotes/route.ts      Esqueleto de API para persistir cotizaciones B2B
components/
  Navbar.tsx
  HeroSection.tsx
  ProductCatalog.tsx        Selector de medidas de bolas de acero + descarga de fichas
  TransportSection.tsx      Carga General vs. MATPEL
  ComplianceGrid.tsx        Sellos normativos (MTC, SUTRAN, SUNAT)
  B2BQuoteCalculator.tsx    Cotizador con toggle insumo/flete y generador de mensaje WhatsApp
  Footer.tsx
lib/
  types.ts                 Tipos de dominio (productos, transporte, tracking, cotizaciones)
  constants.ts              Datos de la empresa, catálogo y servicios (fuente única de verdad)
```

## Configuración pendiente antes de producción

1. **RUC y datos legales**: actualizar `EMPRESA.ruc` en `lib/constants.ts` con el RUC real.
2. **WhatsApp corporativo**: actualizar `EMPRESA.whatsappComercial` (formato internacional
   sin `+` ni espacios, ej. `51999999999`) en `lib/constants.ts`.
3. **Fichas técnicas / HDS**: subir los PDFs reales a `public/docs/` respetando los nombres
   de archivo referenciados en `PRODUCTOS` (`lib/constants.ts`).
4. **Dominio y Open Graph**: actualizar `SITE_URL` en `app/layout.tsx`.
5. **Logo**: agregar `public/logo.png` (referenciado en el JSON-LD de `Organization`).

## Escalabilidad futura (intranet de clientes)

- `app/tracking/page.tsx` ya está desacoplado de los datos mock (`MOCK_ENVIOS`) mediante el
  tipo `SeguimientoEnvio` (`lib/types.ts`), listo para consumir `app/api/tracking/[codigo]/route.ts`.
- `app/api/quotes/route.ts` deja el contrato listo para persistir cotizaciones y alimentar un
  futuro CRM o intranet con historial de pedidos por cliente.
- Rutas sugeridas para la intranet de clientes: `app/(intranet)/dashboard`,
  `app/(intranet)/pedidos`, `app/(intranet)/guias-remision`, protegidas con autenticación
  (NextAuth, Clerk, o similar) y separadas del layout público.

## Build de producción

```bash
npm run build
npm run start
```
