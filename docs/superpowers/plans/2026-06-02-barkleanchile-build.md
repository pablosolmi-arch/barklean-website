# Barklean Chile Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a professional Next.js 15 marketing site for Barklean Chile (dog grooming), replicating all content from barkleanchile.cl with an improved design, better SEO, and full code ownership via GitHub + Vercel.

**Architecture:** Single-page site with anchor-linked sections, all server components except FloatingWhatsApp (fixed client button). All brand content in `lib/constants.ts`. Deployed to Vercel with custom domain barkleanchile.cl.

**Tech Stack:** Next.js 15 (App Router), Tailwind CSS v4, TypeScript, next/font/google (DM Sans + Roboto Slab), next/image, Vercel

---

## File Map

| File | Responsibility |
|------|----------------|
| `app/layout.tsx` | Root layout, fonts, metadata, JSON-LD schema |
| `app/page.tsx` | Assembles all section components |
| `app/globals.css` | Tailwind imports + scroll-behavior |
| `app/sitemap.ts` | Generated sitemap.xml |
| `app/robots.ts` | Generated robots.txt |
| `lib/constants.ts` | All brand content: services, links, locations, images |
| `components/Navbar.tsx` | Sticky navbar, mobile menu (client island) |
| `components/Hero.tsx` | Full-height gradient hero with stats |
| `components/TrustBar.tsx` | 4 trust signals bar |
| `components/Services.tsx` | 6 service cards grid |
| `components/WhyUs.tsx` | Numbered list + image layout |
| `components/BookingSteps.tsx` | 3-step process + WhatsApp CTA |
| `components/Gallery.tsx` | Asymmetric photo grid with next/image |
| `components/Locations.tsx` | 2 location cards with Google Maps iframes |
| `components/Footer.tsx` | Dark 4-column footer |
| `components/FloatingWhatsApp.tsx` | Fixed WhatsApp button (client component) |
| `next.config.ts` | Remote image domains (barkleanchile.cl wp-content) |
| `tailwind.config.ts` | Brand color tokens |
| `public/logo.png` | Already copied |

---

## Task 1: Scaffold Next.js project

**Files:**
- Create: all project boilerplate via create-next-app

- [ ] **Step 1: Scaffold the project in the existing directory**

```bash
cd /Users/pablodesolminihac/barkleanchile
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=no --import-alias="@/*" --yes
```

Expected output: `Success!` and files appear in the directory.

- [ ] **Step 2: Verify it runs**

```bash
cd /Users/pablodesolminihac/barkleanchile
npm run build 2>&1 | tail -5
```

Expected: `✓ Compiled successfully`

- [ ] **Step 3: Verify logo is present**

```bash
ls -la /Users/pablodesolminihac/barkleanchile/public/logo.png
```

Expected: file exists with non-zero size.

- [ ] **Step 4: Initial commit**

```bash
cd /Users/pablodesolminihac/barkleanchile
git init
git add .
git commit -m "feat: scaffold Next.js 15 project for Barklean Chile"
```

---

## Task 2: Brand configuration

**Files:**
- Create: `lib/constants.ts`
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Create `lib/constants.ts` with all brand content**

```typescript
// lib/constants.ts

export const BRAND = {
  name: "Barklean",
  tagline: "Peluquería Profesional para Perros en Chile",
  description:
    "Transformamos a tu mascota con cariño, experiencia y los mejores productos. Dos sucursales en Lo Barnechea.",
  phone: "+56 9 3451 5587",
  email: "contacto@barklean.cl",
  hours: "Lun\u2013S\u00e1b: 10:30 \u2013 17:00",
  whatsapp:
    "https://wa.me/56934515587?text=Hola%21%20estaba%20viendo%20su%20p%C3%A1gina%20web%20y%20me%20interesan%20sus%20servicios",
  instagram: "https://www.instagram.com/barklean_peluqueria/",
  facebook: "https://www.facebook.com/perruqueriaentretenida",
} as const;

export const LOCATIONS = [
  {
    name: "La Dehesa",
    address: "La Dehesa 4580, Local 8",
    city: "Lo Barnechea, Santiago",
    mapsUrl: "https://maps.app.goo.gl/Yz9eaDJADamwV54J9",
    mapsEmbed:
      "https://maps.google.com/maps?q=La+Dehesa+4580,+Lo+Barnechea,+Santiago&output=embed",
  },
  {
    name: "El Espino",
    address: "El Espino 1949, Local 107",
    city: "Lo Barnechea, Santiago",
    mapsUrl: "https://maps.app.goo.gl/FTiwksL1XKhbqxfV9",
    mapsEmbed:
      "https://maps.google.com/maps?q=El+Espino+1949,+Lo+Barnechea,+Santiago&output=embed",
  },
] as const;

export const SERVICES = [
  {
    id: "corte",
    icon: "\u2702\uFE0F",
    title: "Corte de Pelo",
    description:
      "Cortes personalizados seg\u00fan la raza y estilo de tu perro. Estilistas capacitados en las \u00faltimas t\u00e9cnicas.",
    featured: false,
  },
  {
    id: "bano",
    icon: "\uD83D\uDEC1",
    title: "Ba\u00f1o Completo",
    description:
      "Shampoo premium, acondicionador, secado profesional y cepillado. Tu perro quedar\u00e1 limpio y brillante.",
    featured: false,
  },
  {
    id: "spa",
    icon: "\u2728",
    title: "Spa & Tratamientos",
    description:
      "Tratamientos especiales para piel y pelaje, masajes relajantes y aromaterapia para el bienestar de tu mascota.",
    featured: true,
  },
  {
    id: "unas",
    icon: "\uD83D\uDC3E",
    title: "Corte de U\u00f1as",
    description:
      "Recorte profesional de u\u00f1as con cuidado especial. Incluye limado y revisi\u00f3n de almohadillas.",
    featured: false,
  },
  {
    id: "deslanado",
    icon: "\uD83C\uDF00",
    title: "Deslanado",
    description:
      "Eliminaci\u00f3n de pelo muerto con t\u00e9cnicas profesionales. Ideal para razas de pelo largo en temporada de muda.",
    featured: false,
  },
  {
    id: "paquetes",
    icon: "\uD83C\uDF81",
    title: "Paquetes Completos",
    description:
      "Combina varios servicios y ahorra. Ba\u00f1o, corte, u\u00f1as y m\u00e1s en un solo paquete adaptado a tu mascota.",
    featured: false,
  },
] as const;

export const GALLERY_IMAGES = [
  {
    src: "https://barkleanchile.cl/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-17-at-11.57.15-1.jpeg",
    alt: "Transformaci\u00f3n de perro 1",
    large: true,
  },
  {
    src: "https://barkleanchile.cl/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-17-at-11.57.17.jpeg",
    alt: "Transformaci\u00f3n de perro 2",
    large: false,
  },
  {
    src: "https://barkleanchile.cl/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-17-at-11.57.16-3.jpeg",
    alt: "Transformaci\u00f3n de perro 3",
    large: false,
  },
  {
    src: "https://barkleanchile.cl/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-17-at-11.57.16.jpeg",
    alt: "Transformaci\u00f3n de perro 4",
    large: false,
  },
  {
    src: "https://barkleanchile.cl/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-17-at-11.57.16-2-e1763804003256.jpeg",
    alt: "Transformaci\u00f3n de perro 5",
    large: false,
  },
] as const;

export const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Galer\u00eda", href: "#galeria" },
  { label: "Ubicaci\u00f3n", href: "#ubicacion" },
] as const;
```

- [ ] **Step 2: Update `tailwind.config.ts` with brand colors**

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#5DADE2",
          dark: "#3498DB",
          hero: "#1a6ea8",
          light: "#A7DCFF",
          bg: "#ECF5FB",
          surface: "#F4FAFD",
          charcoal: "#2D2D2D",
          gray: "#54595F",
          muted: "#7A7A7A",
        },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "sans-serif"],
        slab: ["var(--font-roboto-slab)", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 3: Update `app/globals.css`**

```css
@import "tailwindcss";

html {
  scroll-behavior: smooth;
}
```

- [ ] **Step 4: Commit**

```bash
cd /Users/pablodesolminihac/barkleanchile
git add lib/constants.ts tailwind.config.ts app/globals.css
git commit -m "feat: add brand constants and Tailwind color tokens"
```

---

## Task 3: Root layout, SEO, sitemap, robots

**Files:**
- Modify: `app/layout.tsx`
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Modify: `next.config.ts`

- [ ] **Step 1: Write `app/layout.tsx`**

Note: The JSON-LD script uses a static object defined in this file — all values are hardcoded, no user input involved.

```typescript
// app/layout.tsx
import type { Metadata } from "next";
import { DM_Sans, Roboto_Slab } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-roboto-slab",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Barklean \u2014 Peluquer\u00eda Canina en Lo Barnechea, Santiago",
  description:
    "Peluquer\u00eda profesional para perros en Lo Barnechea. Cortes, ba\u00f1os, spa y m\u00e1s. 2 sucursales. Reserva por WhatsApp. +56 9 3451 5587.",
  keywords: [
    "peluquer\u00eda canina Santiago",
    "grooming perros Lo Barnechea",
    "peluquer\u00eda perros La Dehesa",
    "Barklean",
  ],
  openGraph: {
    title: "Barklean \u2014 Peluquer\u00eda Canina en Lo Barnechea",
    description:
      "Transformamos a tu mascota con cari\u00f1o, experiencia y los mejores productos.",
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
  name: "Barklean Peluquer\u00eda Canina",
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
```

- [ ] **Step 2: Create `app/sitemap.ts`**

```typescript
// app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://barkleanchile.cl",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
```

- [ ] **Step 3: Create `app/robots.ts`**

```typescript
// app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://barkleanchile.cl/sitemap.xml",
  };
}
```

- [ ] **Step 4: Update `next.config.ts`**

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "barkleanchile.cl",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 5: Build check**

```bash
cd /Users/pablodesolminihac/barkleanchile && npm run build 2>&1 | tail -15
```

Expected: `✓ Compiled successfully`

- [ ] **Step 6: Commit**

```bash
git add app/layout.tsx app/sitemap.ts app/robots.ts next.config.ts
git commit -m "feat: SEO metadata, JSON-LD schema, sitemap, robots, image config"
```

---

## Task 4: Navbar component

**Files:**
- Create: `components/Navbar.tsx`

- [ ] **Step 1: Create `components/Navbar.tsx`**

```tsx
// components/Navbar.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BRAND, NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/[0.97] backdrop-blur-md border-b border-brand-primary/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
        <Link href="#inicio" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="Barklean" width={44} height={44} priority />
          <span className="font-extrabold text-lg text-brand-dark hidden sm:block">BarKlean</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-brand-gray hover:text-brand-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            href={BRAND.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-block bg-brand-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-[0_4px_14px_rgba(93,173,226,0.35)] hover:shadow-[0_6px_20px_rgba(93,173,226,0.45)] hover:-translate-y-0.5 transition-all"
          >
            Reserva tu Cita
          </Link>
          <button
            className="md:hidden p-2 text-brand-gray"
            onClick={() => setOpen(!open)}
            aria-label="Abrir men\u00fa"
          >
            <span className="block w-5 h-0.5 bg-current mb-1" />
            <span className="block w-5 h-0.5 bg-current mb-1" />
            <span className="block w-5 h-0.5 bg-current" />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-brand-bg px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-brand-gray hover:text-brand-primary"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={BRAND.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold text-center"
            onClick={() => setOpen(false)}
          >
            Reserva tu Cita
          </Link>
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 2: Stub `app/page.tsx` to test Navbar**

```tsx
// app/page.tsx
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="p-8 text-brand-dark">Barklean</div>
    </main>
  );
}
```

- [ ] **Step 3: Build check**

```bash
cd /Users/pablodesolminihac/barkleanchile && npm run build 2>&1 | tail -5
```

Expected: `✓ Compiled successfully`

- [ ] **Step 4: Commit**

```bash
git add components/Navbar.tsx app/page.tsx
git commit -m "feat: add sticky Navbar with mobile menu"
```

---

## Task 5: Hero section

**Files:**
- Create: `components/Hero.tsx`

- [ ] **Step 1: Create `components/Hero.tsx`**

```tsx
// components/Hero.tsx
import Link from "next/link";
import { BRAND } from "@/lib/constants";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-[88vh] flex items-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1a6ea8 0%, #3498DB 45%, #5DADE2 100%)" }}
    >
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex items-center justify-between gap-12">
        <div className="max-w-[580px]">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            🐾 Peluquer\u00eda Profesional · Lo Barnechea
          </div>
          <h1 className="text-5xl md:text-[52px] font-extrabold leading-[1.1] text-white mb-5 tracking-tight">
            Tu Mejor Amigo<br />
            Merece el <span className="text-brand-light">Mejor Cuidado</span>
          </h1>
          <p className="text-lg text-white/[0.88] leading-relaxed mb-9 max-w-[440px]">
            {BRAND.description}
          </p>
          <div className="flex flex-wrap gap-3.5">
            <Link
              href={BRAND.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-brand-dark font-bold text-[15px] px-7 py-3.5 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 transition-transform"
            >
              Reserva tu Cita \u2192
            </Link>
            <Link
              href="#servicios"
              className="border-2 border-white/45 text-white font-semibold text-[15px] px-7 py-3.5 rounded-full hover:bg-white/10 transition-colors"
            >
              Ver Servicios
            </Link>
          </div>
          <div className="flex gap-8 mt-12 pt-9 border-t border-white/20">
            {[
              { num: "2", label: "Sucursales" },
              { num: "5\u2605", label: "Calificaci\u00f3n" },
              { num: "100%", label: "Profesional" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-[28px] font-extrabold text-white leading-none">{stat.num}</div>
                <div className="text-[13px] text-white/75 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden lg:flex items-center justify-center w-[320px] h-[400px] bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 text-8xl flex-shrink-0">
          🐶
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update `app/page.tsx`**

```tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
    </main>
  );
}
```

- [ ] **Step 3: Build check**

```bash
cd /Users/pablodesolminihac/barkleanchile && npm run build 2>&1 | tail -5
```

Expected: `✓ Compiled successfully`

- [ ] **Step 4: Commit**

```bash
git add components/Hero.tsx app/page.tsx
git commit -m "feat: add Hero section with gradient, badge, stats, and CTA buttons"
```

---

## Task 6: TrustBar, Services, WhyUs

**Files:**
- Create: `components/TrustBar.tsx`
- Create: `components/Services.tsx`
- Create: `components/WhyUs.tsx`

- [ ] **Step 1: Create `components/TrustBar.tsx`**

```tsx
// components/TrustBar.tsx
const ITEMS = [
  { icon: "\u2705", text: "Profesionales certificados" },
  { icon: "\uD83E\uDDF4", text: "Productos premium hipoalerg\u00e9nicos" },
  { icon: "\uD83D\uDCC5", text: "Reserva f\u00e1cil por WhatsApp" },
  { icon: "\uD83C\uDFE0", text: "2 locales en Lo Barnechea" },
];

export default function TrustBar() {
  return (
    <div className="bg-brand-surface border-b border-brand-bg px-6 py-5">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-6 md:gap-12">
        {ITEMS.map((item) => (
          <div key={item.text} className="flex items-center gap-2.5 text-brand-gray text-sm font-medium">
            <span className="text-xl">{item.icon}</span>
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `components/Services.tsx`**

```tsx
// components/Services.tsx
import Link from "next/link";
import { BRAND, SERVICES } from "@/lib/constants";

export default function Services() {
  return (
    <section id="servicios" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-xs font-bold tracking-[3px] uppercase text-brand-primary mb-3">
            Nuestros servicios
          </p>
          <h2 className="text-[38px] font-extrabold text-brand-charcoal leading-tight tracking-tight mb-4">
            Peluquer\u00eda de alta<br />gama para tu perro
          </h2>
          <p className="text-[17px] text-brand-muted leading-relaxed max-w-[520px]">
            Cada servicio est\u00e1 dise\u00f1ado para el bienestar y la comodidad de tu mascota.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className={`rounded-2xl p-8 border transition-all hover:-translate-y-1 ${
                service.featured
                  ? "bg-gradient-to-br from-brand-dark to-brand-primary border-transparent shadow-[0_8px_30px_rgba(52,152,219,0.3)]"
                  : "bg-white border-brand-bg shadow-[0_4px_24px_rgba(52,152,219,0.06)] hover:shadow-[0_12px_40px_rgba(52,152,219,0.14)]"
              }`}
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className={`text-lg font-bold mb-2 ${service.featured ? "text-white" : "text-brand-charcoal"}`}>
                {service.title}
              </h3>
              <p className={`text-sm leading-relaxed mb-4 ${service.featured ? "text-white/85" : "text-brand-muted"}`}>
                {service.description}
              </p>
              <Link
                href={BRAND.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-sm font-semibold ${service.featured ? "text-brand-light" : "text-brand-primary"}`}
              >
                Reservar \u2192
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create `components/WhyUs.tsx`**

```tsx
// components/WhyUs.tsx
const REASONS = [
  {
    num: "1",
    title: "Profesionales certificados",
    desc: "Estilistas con credenciales internacionales y a\u00f1os de experiencia.",
  },
  {
    num: "2",
    title: "Productos premium hipoalerg\u00e9nicos",
    desc: "Solo usamos shampoos y tratamientos seguros para toda raza y tipo de piel.",
  },
  {
    num: "3",
    title: "Atenci\u00f3n personalizada",
    desc: "Cada perro es \u00fanico. Adaptamos cada servicio a las necesidades de tu mascota.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-20 px-6 bg-brand-surface">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-xs font-bold tracking-[3px] uppercase text-brand-primary mb-3">
            \u00bfPor qu\u00e9 elegirnos?
          </p>
          <h2 className="text-[38px] font-extrabold text-brand-charcoal leading-tight tracking-tight mb-4">
            Cuidado profesional<br />con amor real
          </h2>
          <p className="text-[17px] text-brand-muted leading-relaxed mb-10 max-w-[480px]">
            Tu perro est\u00e1 en las mejores manos. Cada mascota recibe atenci\u00f3n personalizada.
          </p>
          <div className="flex flex-col gap-7">
            {REASONS.map((r) => (
              <div key={r.num} className="flex gap-4">
                <div className="w-10 h-10 min-w-[40px] bg-brand-primary text-white rounded-xl flex items-center justify-center font-extrabold text-sm">
                  {r.num}
                </div>
                <div>
                  <h3 className="text-base font-bold text-brand-charcoal mb-1">{r.title}</h3>
                  <p className="text-sm text-brand-muted leading-relaxed">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden lg:flex items-center justify-center h-[420px] rounded-3xl text-8xl bg-gradient-to-br from-brand-light to-brand-primary">
          \uD83D\uDC15
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Update `app/page.tsx`**

```tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustBar />
      <Services />
      <WhyUs />
    </main>
  );
}
```

- [ ] **Step 5: Build check**

```bash
cd /Users/pablodesolminihac/barkleanchile && npm run build 2>&1 | tail -5
```

Expected: `✓ Compiled successfully`

- [ ] **Step 6: Commit**

```bash
git add components/TrustBar.tsx components/Services.tsx components/WhyUs.tsx app/page.tsx
git commit -m "feat: add TrustBar, Services grid, and WhyUs sections"
```

---

## Task 7: BookingSteps, Gallery, Locations

**Files:**
- Create: `components/BookingSteps.tsx`
- Create: `components/Gallery.tsx`
- Create: `components/Locations.tsx`

- [ ] **Step 1: Create `components/BookingSteps.tsx`**

```tsx
// components/BookingSteps.tsx
import Link from "next/link";
import { BRAND } from "@/lib/constants";

const STEPS = [
  { num: "1", title: "Elige tu servicio", desc: "Revisa nuestros servicios y elige el que mejor se adapta a tu perro." },
  { num: "2", title: "Elige fecha y hora", desc: "Esc\u00edbenos por WhatsApp y te confirmamos disponibilidad al instante." },
  { num: "3", title: "\u00a1Listo, nos vemos!", desc: "Ven a cualquiera de nuestras dos sucursales en Lo Barnechea." },
];

export default function BookingSteps() {
  return (
    <section className="py-20 px-6 text-center">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs font-bold tracking-[3px] uppercase text-brand-primary mb-3">Proceso de reserva</p>
        <h2 className="text-[38px] font-extrabold text-brand-charcoal leading-tight tracking-tight mb-4">
          Reserva en 3 pasos simples
        </h2>
        <p className="text-[17px] text-brand-muted leading-relaxed max-w-lg mx-auto mb-12">
          Sin formularios complicados. Agenda directamente por WhatsApp.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {STEPS.map((step) => (
            <div key={step.num} className="bg-white rounded-2xl p-9 border border-brand-bg shadow-[0_4px_20px_rgba(52,152,219,0.05)]">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-[22px] font-extrabold mx-auto mb-4 shadow-[0_6px_20px_rgba(52,152,219,0.3)]"
                style={{ background: "linear-gradient(135deg, #3498DB, #5DADE2)" }}
              >
                {step.num}
              </div>
              <h3 className="text-base font-bold text-brand-charcoal mb-2">{step.title}</h3>
              <p className="text-sm text-brand-muted leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
        <Link
          href={BRAND.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-brand-primary text-white font-bold text-base px-9 py-4 rounded-full shadow-[0_8px_30px_rgba(93,173,226,0.35)] hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(93,173,226,0.45)] transition-all"
        >
          Reservar por WhatsApp \u2192
        </Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/Gallery.tsx`**

```tsx
// components/Gallery.tsx
import Image from "next/image";
import { GALLERY_IMAGES } from "@/lib/constants";

export default function Gallery() {
  const [large, ...rest] = GALLERY_IMAGES;
  return (
    <section id="galeria" className="py-20 px-6 bg-brand-surface">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-xs font-bold tracking-[3px] uppercase text-brand-primary mb-3">Galer\u00eda</p>
            <h2 className="text-[38px] font-extrabold text-brand-charcoal leading-tight tracking-tight">
              Transformaciones<br />que hablan por s\u00ed solas
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3" style={{ gridTemplateRows: "200px 200px" }}>
          <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden bg-brand-light">
            <Image src={large.src} alt={large.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
          {rest.map((img) => (
            <div key={img.src} className="relative rounded-2xl overflow-hidden bg-brand-bg">
              <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create `components/Locations.tsx`**

```tsx
// components/Locations.tsx
import Link from "next/link";
import { LOCATIONS, BRAND } from "@/lib/constants";

export default function Locations() {
  return (
    <section id="ubicacion" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs font-bold tracking-[3px] uppercase text-brand-primary mb-3">
          D\u00f3nde encontrarnos
        </p>
        <h2 className="text-[38px] font-extrabold text-brand-charcoal leading-tight tracking-tight mb-12">
          Dos sucursales en Lo Barnechea
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LOCATIONS.map((loc) => (
            <div key={loc.name} className="rounded-2xl overflow-hidden border border-brand-bg shadow-[0_4px_20px_rgba(52,152,219,0.07)]">
              <div className="h-[220px]">
                <iframe
                  src={loc.mapsEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Mapa ${loc.name}`}
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-brand-charcoal mb-1">{loc.name}</h3>
                <p className="text-sm text-brand-muted mb-0.5">{loc.address}</p>
                <p className="text-sm text-brand-muted mb-1">{loc.city}</p>
                <p className="text-sm font-semibold text-brand-charcoal mb-4">{BRAND.hours}</p>
                <div className="flex gap-3 flex-wrap">
                  <Link href={loc.mapsUrl} target="_blank" rel="noopener noreferrer"
                    className="bg-brand-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Ver en Google Maps \u2192
                  </Link>
                  <Link href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer"
                    className="border border-brand-primary text-brand-primary px-4 py-2 rounded-full text-sm font-semibold">
                    Reservar
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Build check**

```bash
cd /Users/pablodesolminihac/barkleanchile && npm run build 2>&1 | tail -5
```

Expected: `✓ Compiled successfully`

- [ ] **Step 5: Commit**

```bash
git add components/BookingSteps.tsx components/Gallery.tsx components/Locations.tsx
git commit -m "feat: add BookingSteps, Gallery, and Locations sections"
```

---

## Task 8: Footer, FloatingWhatsApp, and page assembly

**Files:**
- Create: `components/Footer.tsx`
- Create: `components/FloatingWhatsApp.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/Footer.tsx`**

```tsx
// components/Footer.tsx
import Link from "next/link";
import { BRAND, NAV_LINKS, SERVICES } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-brand-charcoal text-white px-6 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="text-2xl font-extrabold text-brand-primary mb-4">BarKlean</div>
            <p className="text-sm text-white/60 leading-relaxed mb-5">
              Peluquer\u00eda profesional para perros en Chile. Cuidamos a tu mascota con amor y experiencia desde Lo Barnechea.
            </p>
            <div className="flex gap-2.5">
              <Link href={BRAND.facebook} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-brand-primary/30 flex items-center justify-center text-base transition-colors" aria-label="Facebook">
                📘
              </Link>
              <Link href={BRAND.instagram} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-brand-primary/30 flex items-center justify-center text-base transition-colors" aria-label="Instagram">
                📸
              </Link>
              <Link href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-brand-primary/30 flex items-center justify-center text-base transition-colors" aria-label="WhatsApp">
                💬
              </Link>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold tracking-[2px] uppercase text-brand-primary mb-4">Navegaci\u00f3n</h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-brand-primary transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold tracking-[2px] uppercase text-brand-primary mb-4">Servicios</h4>
            <ul className="space-y-2.5">
              {SERVICES.slice(0, 4).map((s) => (
                <li key={s.id}>
                  <Link href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer"
                    className="text-sm text-white/60 hover:text-brand-primary transition-colors">{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold tracking-[2px] uppercase text-brand-primary mb-4">Contacto</h4>
            <ul className="space-y-2.5">
              <li><Link href={`tel:${BRAND.phone}`} className="text-sm text-white/60 hover:text-brand-primary transition-colors">{BRAND.phone}</Link></li>
              <li><Link href={`mailto:${BRAND.email}`} className="text-sm text-white/60 hover:text-brand-primary transition-colors">{BRAND.email}</Link></li>
              <li className="text-sm text-white/60">La Dehesa 4580, Local 8</li>
              <li className="text-sm text-white/60">El Espino 1949, Local 107</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-white/40">\u00a9 2025 Barklean. Todos los derechos reservados.</p>
          <p className="text-xs text-white/40">Lo Barnechea, Santiago de Chile</p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Create `components/FloatingWhatsApp.tsx`**

```tsx
// components/FloatingWhatsApp.tsx
"use client";

import Link from "next/link";
import { BRAND } from "@/lib/constants";

export default function FloatingWhatsApp() {
  return (
    <Link
      href={BRAND.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-7 right-7 z-50 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(37,211,102,0.5)] transition-all"
      style={{ backgroundColor: "#25D366" }}
    >
      💬
    </Link>
  );
}
```

- [ ] **Step 3: Write final `app/page.tsx`**

```tsx
// app/page.tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import BookingSteps from "@/components/BookingSteps";
import Gallery from "@/components/Gallery";
import Locations from "@/components/Locations";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustBar />
      <Services />
      <WhyUs />
      <BookingSteps />
      <Gallery />
      <Locations />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
```

- [ ] **Step 4: Final production build**

```bash
cd /Users/pablodesolminihac/barkleanchile && npm run build 2>&1
```

Expected: `✓ Compiled successfully` — route `/` listed, no TypeScript or ESLint errors.

- [ ] **Step 5: Commit**

```bash
git add components/Footer.tsx components/FloatingWhatsApp.tsx app/page.tsx
git commit -m "feat: complete full-page assembly — all sections, footer, floating WhatsApp"
```

---

## Task 9: Deploy to Vercel + custom domain

**Files:** none (CLI + dashboard)

- [ ] **Step 1: Create GitHub repo and push**

```bash
cd /Users/pablodesolminihac/barkleanchile
gh repo create barklean-website --public --source=. --remote=origin --push
```

Expected: repo created and code pushed.

- [ ] **Step 2: Deploy to Vercel**

```bash
cd /Users/pablodesolminihac/barkleanchile
vercel --yes
```

Expected: deployment URL printed, e.g. `https://barklean-website-xxxx.vercel.app`

- [ ] **Step 3: Promote to production**

```bash
vercel --prod
```

- [ ] **Step 4: Configure custom domain**

Go to Vercel dashboard → Project → Settings → Domains → Add `barkleanchile.cl`

In your domain registrar, update DNS:
- **Option A (recommended):** Add A record pointing to `76.76.21.21`
- **Option B:** Add CNAME `www` pointing to `cname.vercel-dns.com`

- [ ] **Step 5: Verify**

```bash
curl -I https://barklean-website.vercel.app 2>&1 | head -3
```

Expected: `HTTP/2 200`

---

## Self-Review

**Spec coverage:**
- Next.js 15 + Vercel + GitHub — Tasks 1, 9
- Brand colors + DM Sans + Roboto Slab fonts — Task 2
- All 10 page sections (navbar, hero, trust, services, why, steps, gallery, locations, footer, floating WA) — Tasks 4–8
- SEO: metadata, JSON-LD, sitemap.xml, robots.txt — Task 3
- All original content (services ×6, locations ×2, contact, social, images) — Task 2 constants
- Remote images from wp-content — Task 3 next.config.ts
- Mobile-responsive navbar with hamburger — Task 4
- Gallery with real photos — Task 7
- Google Maps iframes — Task 7
- Custom domain setup — Task 9

**Placeholder check:** All code blocks are complete. No TBDs.

**Type consistency:** `BRAND`, `SERVICES`, `LOCATIONS`, `GALLERY_IMAGES`, `NAV_LINKS` defined once in `lib/constants.ts`, imported by name in every component that uses them.
