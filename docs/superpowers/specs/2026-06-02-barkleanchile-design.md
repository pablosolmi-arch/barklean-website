# Barklean Chile — Rebuild Spec
Date: 2026-06-02

## Overview
Rebuild barkleanchile.cl as a Next.js 15 + Vercel site. The original WordPress site was lost (password/access). Full code control, GitHub repo, deploy to Vercel. Domain barkleanchile.cl is under client control.

## Goals
- Replicate all content from the original site (no information lost)
- Improve visual design: more modern, professional, premium feel
- Better SEO: metadata, sitemap, structured data, Open Graph
- Improved gallery section (larger, masonry or grid)
- Maintain exact same colors and logo as original

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Fonts**: DM Sans (headings + body) + Roboto Slab (subheadings) via next/font/google
- **Images**: next/image with remote pattern for wp-content URLs + local logo
- **Deploy**: Vercel (free tier)
- **Repo**: GitHub

## Brand
### Colors
- Primary: `#5DADE2` (sky blue — logo text, paw icons)
- Dark blue: `#3498DB` (buttons, hero background)
- Hero gradient: `#1a6ea8` → `#3498DB` → `#5DADE2`
- Light blue: `#A7DCFF` (hero text highlight, card backgrounds)
- Background: `#ECF5FB` / `#F4FAFD` (section backgrounds)
- Surface: `#F8FAFC`
- Dark: `#2D2D2D` (footer, dark sections)
- Text: `#54595F` (secondary) / `#7A7A7A` (body)

### Typography
- DM Sans: headings (800, 700), body (400, 500)
- Roboto Slab: subheadings (400)
- Arimo: accent labels (500)

### Logo
- File: `public/logo.png` (already copied)
- Description: cartoon dog face, sky blue "BarKlean" text, paw prints

## Site Structure (single-page with sections)
Single `page.tsx` with anchor-linked sections:

1. **Navbar** — sticky, blur backdrop, logo + nav links + CTA button
2. **Hero** — full-height gradient, headline, subtext, 2 CTAs, stats bar (2 sucursales / 5★ / 100% pro), dog photo placeholder right
3. **Trust bar** — 4 trust signals (certified pros, premium products, WhatsApp booking, 2 locations)
4. **Services** — 6 cards in 3-col grid, Spa card featured (blue gradient)
5. **Why Us** — 2-col layout: numbered list left, image right, light blue background
6. **Booking steps** — 3 steps centered, gradient numbered circles, WhatsApp CTA
7. **Gallery** — asymmetric grid (1 large + 4 small), real photos from wp-content
8. **Locations** — 2 cards with Google Maps iframe embeds
9. **Footer** — dark (`#2D2D2D`), 4 columns, social icons, copyright
10. **Floating WhatsApp button** — fixed bottom-right, green

## Content

### Contact
- Phone: +56 9 3451 5587
- Email: contacto@barklean.cl
- Hours: Lun–Sáb 10:30–17:00
- WhatsApp link: `https://wa.me/56934515587?text=Hola%21%20estaba%20viendo%20su%20p%C3%A1gina%20web%20y%20me%20interesan%20sus%20servicios`

### Locations
- La Dehesa: La Dehesa 4580, Local 8, Lo Barnechea — maps.app.goo.gl/Yz9eaDJADamwV54J9
- El Espino: El Espino 1949, Local 107, Lo Barnechea — maps.app.goo.gl/FTiwksL1XKhbqxfV9

### Social
- Facebook: https://www.facebook.com/perruqueriaentretenida
- Instagram: https://www.instagram.com/barklean_peluqueria/

### Services (6)
1. Corte de Pelo — Cortes personalizados según la raza y estilo
2. Baño Completo — Shampoo premium, acondicionador, secado profesional
3. Spa & Tratamientos — Masajes relajantes y aromaterapia *(featured)*
4. Corte de Uñas — Recorte profesional, limado y revisión de almohadillas
5. Deslanado — Eliminación pelo muerto, razas pelo largo
6. Paquetes Completos — Combina servicios y ahorra

### Images (from original wp-content)
- `https://barkleanchile.cl/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-17-at-11.57.15-1.jpeg`
- `https://barkleanchile.cl/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-17-at-11.57.17.jpeg`
- `https://barkleanchile.cl/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-17-at-11.57.16-3.jpeg`
- `https://barkleanchile.cl/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-17-at-11.57.16.jpeg`
- `https://barkleanchile.cl/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-17-at-11.57.16-2-e1763804003256.jpeg`
- `https://barkleanchile.cl/wp-content/uploads/2025/11/Gemini_Generated_Image_j5wwh3j5wwh3j5ww-scaled-e1763807278482.png`
- `https://barkleanchile.cl/wp-content/uploads/2025/11/Gemini_Generated_Image_j5wwh3j5wwh3j5ww-1-scaled-e1763807406830.png`
- `https://barkleanchile.cl/wp-content/uploads/2025/11/Gemini_Generated_Image_j5wwh3j5wwh3j5ww-3-scaled-e1763807553889.png`

## SEO
- `metadata` export in `layout.tsx`: title, description, keywords, Open Graph, Twitter card
- `sitemap.ts` — generated sitemap
- `robots.ts` — robots.txt
- `schema.org` LocalBusiness JSON-LD with both locations
- Canonical URL: https://barkleanchile.cl

## Components
All components are server components by default. No `"use client"` unless strictly needed (mobile menu toggle).

- `Navbar` — server, mobile menu toggle is client island
- `Hero` — server
- `TrustBar` — server
- `Services` — server, static data
- `WhyUs` — server
- `BookingSteps` — server
- `Gallery` — server, next/image
- `Locations` — server, iframe maps
- `Footer` — server
- `FloatingWhatsApp` — client (fixed position button)

## File Structure
```
barkleanchile/
  app/
    layout.tsx        — root layout, metadata, fonts
    page.tsx          — assembles all sections
    sitemap.ts
    robots.ts
    globals.css
  components/
    Navbar.tsx
    Hero.tsx
    TrustBar.tsx
    Services.tsx
    WhyUs.tsx
    BookingSteps.tsx
    Gallery.tsx
    Locations.tsx
    Footer.tsx
    FloatingWhatsApp.tsx
  public/
    logo.png
  next.config.ts      — remote image domains for wp-content
  tailwind.config.ts
```

## Deployment
1. `npx create-next-app` in existing `/Users/pablodesolminihac/barkleanchile`
2. Build and test locally
3. Push to GitHub (new repo `barklean-website`)
4. Deploy to Vercel via `vercel` CLI
5. Configure custom domain `barkleanchile.cl` in Vercel dashboard
