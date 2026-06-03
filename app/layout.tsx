import type { Metadata } from "next";
import { DM_Sans, Roboto_Slab } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  axes: ["opsz"],
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-roboto-slab",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Barklean — Peluquería Canina en Lo Barnechea, Santiago",
  description:
    "Peluquería profesional para perros en Lo Barnechea. Cortes, baños, spa y más. 2 sucursales. Reserva por WhatsApp. +56 9 3451 5587.",
  keywords: [
    "peluquería canina Santiago",
    "grooming perros Lo Barnechea",
    "peluquería perros La Dehesa",
    "Barklean",
  ],
  openGraph: {
    title: "Barklean — Peluquería Canina en Lo Barnechea",
    description:
      "Transformamos a tu mascota con cariño, experiencia y los mejores productos.",
    url: "https://barkleanchile.cl",
    siteName: "Barklean",
    locale: "es_CL",
    type: "website",
  },
  alternates: { canonical: "https://barkleanchile.cl" },
  robots: { index: true, follow: true },
};

// Static JSON-LD — hardcoded business data, no user input
const jsonLdString = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Barklean Peluquería Canina",
  url: "https://barkleanchile.cl",
  telephone: "+56934515587",
  email: "contacto@barklean.cl",
  openingHours: "Mo-Sa 10:30-17:00",
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "La Dehesa 4580, Local 8",
      addressLocality: "Lo Barnechea",
      addressRegion: "Santiago",
      addressCountry: "CL",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "El Espino 1949, Local 107",
      addressLocality: "Lo Barnechea",
      addressRegion: "Santiago",
      addressCountry: "CL",
    },
  ],
  sameAs: [
    "https://www.facebook.com/perruqueriaentretenida",
    "https://www.instagram.com/barklean_peluqueria/",
  ],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${dmSans.variable} ${robotoSlab.variable}`}>
      <head>
        <script
          type="application/ld+json"
          // Safe: jsonLdString is built from hardcoded static data only
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: jsonLdString }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
