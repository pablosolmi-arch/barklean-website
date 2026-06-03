# Barklean Chile — Photo-First Redesign with Framer Motion

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild all visual components to be photo-first with professional Framer Motion animations, replacing all emoji icons with SVG, and displaying 8 real local dog photos prominently.

**Architecture:** Client components (Hero, Gallery, PhotoStrip, Services, TrustBar, WhyUs, BookingSteps) use Framer Motion for entrance animations and scroll-triggered interactions. Photos are served from `/public/dogs/*.jpeg` (already copied — 8 photos). Navbar and Footer stay clean and functional. No external image hosting.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, Framer Motion 11, TypeScript

**Photo map (already in `/public/dogs/`):**
- `dog-01.jpeg` — German Shepherd with orange bandana in salon (full body, energetic)
- `dog-02.jpeg` — White fluffy Pomeranian/Spitz with orange bandana outdoors
- `dog-03.jpeg` — Two Weimaraners with orange bandanas in salon
- `dog-04.jpeg` — White Samoyed sitting in salon with navy bandana
- `dog-05.jpeg` — Two small groomed dogs on paw-print bed
- `dog-06.jpeg` — Two Weimaraners at store counter with orange bandanas
- `dog-07.jpeg` — Golden puppy "selfie" looking at camera, blue pom-pom collar → **HERO photo**
- `dog-08.jpeg` — Staff member holding tiny white Pomeranian → **WhyUs photo**

---

### Task 1: Install Framer Motion + update constants and globals

**Files:**
- Modify: `lib/constants.ts` (update GALLERY_IMAGES to local paths)
- Modify: `app/globals.css` (add float keyframe)
- Modify: `package.json` (via npm install)

- [ ] **Step 1: Install framer-motion**

```bash
cd /Users/pablodesolminihac/barkleanchile && npm install framer-motion@^11
```
Expected: `added N packages`

- [ ] **Step 2: Replace GALLERY_IMAGES in lib/constants.ts**

Find and replace the entire `GALLERY_IMAGES` export with:

```typescript
export const GALLERY_IMAGES = [
  { src: "/dogs/dog-07.jpeg", alt: "Perrito feliz en Barklean" },
  { src: "/dogs/dog-01.jpeg", alt: "Pastor alemán en el salón" },
  { src: "/dogs/dog-08.jpeg", alt: "Peluquera con Pomeranian" },
  { src: "/dogs/dog-04.jpeg", alt: "Samoyedo en el salón" },
  { src: "/dogs/dog-02.jpeg", alt: "Perrito con pañoleta naranja" },
  { src: "/dogs/dog-03.jpeg", alt: "Weimaraners en el salón" },
  { src: "/dogs/dog-06.jpeg", alt: "Weimaraners en la tienda" },
  { src: "/dogs/dog-05.jpeg", alt: "Perritos pequeños en cama" },
] as const;
```

- [ ] **Step 3: Add float keyframe to app/globals.css**

After the `html { scroll-behavior: smooth; }` line, add:

```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}
.animate-float {
  animation: float 3s ease-in-out infinite;
}
```

- [ ] **Step 4: Build check**

```bash
npm run build 2>&1 | tail -10
```
Expected: `✓ Compiled successfully`

- [ ] **Step 5: Commit**

```bash
git add lib/constants.ts app/globals.css package.json package-lock.json
git commit -m "feat: install framer-motion, switch gallery to local photos"
```

---

### Task 2: Rebuild Navbar — white background, clean

**Files:**
- Modify: `components/Navbar.tsx`

- [ ] **Step 1: Replace full content of components/Navbar.tsx**

```tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { NAV_LINKS, BRAND } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "border-b border-gray-100"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#inicio" className="flex items-center shrink-0">
            <Image
              src="/logo.png"
              alt="Barklean logo"
              width={130}
              height={48}
              className="object-contain"
              priority
            />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-brand-gray hover:text-brand-dark transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href={BRAND.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-dark text-white text-sm font-semibold rounded-full px-5 py-2.5 transition-colors"
          >
            Reserva tu Cita
          </a>

          <button
            className="md:hidden p-2 rounded-md text-brand-gray"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-brand-gray hover:text-brand-dark"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={BRAND.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center bg-brand-primary text-white text-sm font-semibold rounded-full px-5 py-2.5"
            onClick={() => setMenuOpen(false)}
          >
            Reserva tu Cita
          </a>
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 2: Build check**

```bash
npm run build 2>&1 | tail -8
```
Expected: `✓ Compiled successfully`

- [ ] **Step 3: Commit**

```bash
git add components/Navbar.tsx
git commit -m "feat: Navbar — white bg always, logo full width, clean style"
```

---

### Task 3: Rebuild Hero — Framer Motion clip-path reveal + spring stagger + floating photo

**Files:**
- Modify: `components/Hero.tsx`

This becomes a `"use client"` component. It's the most important visual piece.

- [ ] **Step 1: Replace full content of components/Hero.tsx**

```tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BRAND } from "@/lib/constants";

const STATS = [
  { value: "2", label: "Sucursales" },
  { value: "5★", label: "Google Rating" },
  { value: "100%", label: "Profesional" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 80, damping: 18 },
  },
};

const photoVariants = {
  hidden: { clipPath: "inset(0 100% 0 0)", scale: 1.06 },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    scale: 1,
    transition: {
      clipPath: {
        duration: 0.9,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        delay: 0.2,
      },
      scale: { duration: 1.1, ease: "easeOut" as const, delay: 0.2 },
    },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: 1.2, type: "spring" as const, stiffness: 200, damping: 20 },
  },
};

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-[92vh] flex items-center bg-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT: text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <motion.span
              variants={itemVariants}
              className="inline-block bg-brand-bg text-brand-dark text-xs font-semibold tracking-widest uppercase rounded-full px-4 py-1.5 mb-6"
            >
              Peluquería Canina · Lo Barnechea, Santiago
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="font-slab text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-brand-charcoal mb-6"
            >
              Tu Mejor Amigo
              <br />
              <span className="text-brand-dark">Merece el Mejor Cuidado</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-brand-muted text-lg max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              Transformamos a tu mascota con cariño, experiencia y los mejores
              productos premium. Reserva por WhatsApp en segundos.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <a
                href={BRAND.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-dark text-white font-bold rounded-full px-8 py-3.5 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-brand-primary/30"
              >
                Reserva tu Cita →
              </a>
              <a
                href="#servicios"
                className="inline-flex items-center justify-center gap-2 border-2 border-brand-primary text-brand-primary font-semibold rounded-full px-8 py-3.5 hover:bg-brand-bg transition-colors"
              >
                Ver Servicios
              </a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-10 justify-center lg:justify-start mt-12 pt-8 border-t border-gray-100"
            >
              {STATS.map((stat) => (
                <div key={stat.value} className="text-center lg:text-left">
                  <p className="text-2xl font-bold text-brand-dark">{stat.value}</p>
                  <p className="text-xs text-brand-muted mt-0.5">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT: hero photo with clip-path curtain reveal */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm lg:max-w-none lg:w-[480px]">
              <motion.div
                variants={photoVariants}
                initial="hidden"
                animate="visible"
                className="animate-float relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-brand-dark/20"
              >
                <Image
                  src="/dogs/dog-07.jpeg"
                  alt="Perrito feliz en Barklean"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 384px, 480px"
                />
                {/* Subtle gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/20 via-transparent to-transparent" />
              </motion.div>

              {/* Floating badge */}
              <motion.div
                variants={badgeVariants}
                initial="hidden"
                animate="visible"
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-5 py-3 shadow-xl border border-gray-100"
              >
                <p className="text-xs text-brand-muted">Atendemos</p>
                <p className="text-sm font-bold text-brand-charcoal">Lun–Sáb · 10:30–17:00</p>
              </motion.div>

              {/* Decorative dot */}
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-brand-bg" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build check**

```bash
npm run build 2>&1 | tail -8
```
Expected: `✓ Compiled successfully`

- [ ] **Step 3: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: Hero with Framer Motion clip-path reveal, spring stagger, floating photo"
```

---

### Task 4: New PhotoStrip component — full-width real photo strip

**Files:**
- Create: `components/PhotoStrip.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create components/PhotoStrip.tsx**

```tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const STRIP_PHOTOS = [
  { src: "/dogs/dog-01.jpeg", alt: "Pastor alemán en Barklean" },
  { src: "/dogs/dog-04.jpeg", alt: "Samoyedo en el salón" },
  { src: "/dogs/dog-06.jpeg", alt: "Weimaraners en Barklean" },
  { src: "/dogs/dog-02.jpeg", alt: "Perrito con pañoleta naranja" },
];

export default function PhotoStrip() {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4">
      {STRIP_PHOTOS.map((photo, i) => (
        <motion.div
          key={photo.src}
          className="relative aspect-[4/3] overflow-hidden group"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: i * 0.1, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/15 transition-colors duration-300" />
        </motion.div>
      ))}
    </section>
  );
}
```

- [ ] **Step 2: Update app/page.tsx to include PhotoStrip after Hero**

```tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PhotoStrip from "@/components/PhotoStrip";
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
      <PhotoStrip />
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

- [ ] **Step 3: Build check**

```bash
npm run build 2>&1 | tail -8
```

- [ ] **Step 4: Commit**

```bash
git add components/PhotoStrip.tsx app/page.tsx
git commit -m "feat: add PhotoStrip — full-width real photo tira after Hero"
```

---

### Task 5: Services, TrustBar, BookingSteps — SVG icons + Framer Motion scroll animations

**Files:**
- Modify: `components/Services.tsx`
- Modify: `components/TrustBar.tsx`
- Modify: `components/BookingSteps.tsx`

All three become `"use client"` for Framer Motion `whileInView`.

- [ ] **Step 1: Replace full content of components/Services.tsx**

```tsx
"use client";

import { motion } from "framer-motion";
import { SERVICES, BRAND } from "@/lib/constants";

// Heroicons-style SVG icons keyed by service id
const ICONS: Record<string, React.ReactNode> = {
  corte: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
      <line x1="20" y1="4" x2="8.12" y2="15.88" />
      <line x1="14.47" y1="14.48" x2="20" y2="20" />
      <line x1="8.12" y1="8.12" x2="12" y2="12" />
    </svg>
  ),
  bano: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  ),
  spa: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
    </svg>
  ),
  unas: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
    </svg>
  ),
  deslanado: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
    </svg>
  ),
  paquetes: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
    </svg>
  ),
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, type: "spring" as const, stiffness: 90, damping: 20 },
  }),
};

export default function Services() {
  return (
    <section id="servicios" className="bg-brand-surface py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        >
          <p className="text-brand-primary text-sm font-semibold tracking-widest uppercase mb-2">Lo que ofrecemos</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-charcoal">Nuestros Servicios</h2>
          <p className="text-brand-muted mt-3 max-w-lg mx-auto">
            Cada servicio diseñado para que tu mascota salga feliz y radiante.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className={`rounded-2xl p-7 ${
                service.featured
                  ? "text-white shadow-xl shadow-brand-dark/20"
                  : "bg-white border border-gray-100 shadow-sm hover:shadow-md"
              }`}
              style={
                service.featured
                  ? { background: "linear-gradient(135deg, #3498db, #5dade2)" }
                  : {}
              }
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                  service.featured ? "bg-white/20 text-white" : "bg-brand-bg text-brand-primary"
                }`}
              >
                {ICONS[service.id]}
              </div>
              {service.featured && (
                <span className="inline-block text-xs font-semibold bg-white/20 rounded-full px-3 py-0.5 mb-3">
                  ✦ Más Popular
                </span>
              )}
              <h3 className={`font-bold text-lg mb-2 ${service.featured ? "text-white" : "text-brand-charcoal"}`}>
                {service.title}
              </h3>
              <p className={`text-sm leading-relaxed ${service.featured ? "text-white/85" : "text-brand-muted"}`}>
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <a
            href={BRAND.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-dark text-white font-bold rounded-full px-8 py-3.5 transition-all hover:scale-105 hover:shadow-lg hover:shadow-brand-primary/30"
          >
            Reserva tu Cita →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Replace full content of components/TrustBar.tsx**

```tsx
"use client";

import { motion } from "framer-motion";

const TRUST_ITEMS = [
  {
    title: "Profesionales Certificados",
    subtitle: "Cuidado experto y de confianza",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
      </svg>
    ),
  },
  {
    title: "Productos Premium",
    subtitle: "Solo lo mejor para tu perro",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
      </svg>
    ),
  },
  {
    title: "Reserva por WhatsApp",
    subtitle: "Fácil, rápido, sin llamadas",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
      </svg>
    ),
  },
  {
    title: "2 Sucursales",
    subtitle: "Lo Barnechea, Santiago",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
  },
];

export default function TrustBar() {
  return (
    <section className="bg-white py-12 px-4 border-b border-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {TRUST_ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              className="flex flex-col items-center text-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 100, damping: 20 }}
            >
              <div className="text-brand-primary">{item.icon}</div>
              <div>
                <p className="font-semibold text-brand-charcoal text-sm">{item.title}</p>
                <p className="text-xs text-brand-muted mt-0.5">{item.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Replace full content of components/BookingSteps.tsx**

```tsx
"use client";

import { motion } from "framer-motion";
import { BRAND } from "@/lib/constants";

const STEPS = [
  {
    number: "01",
    title: "Elige tu Servicio",
    description: "Revisa nuestros servicios y elige el que mejor se adapta a tu mascota.",
  },
  {
    number: "02",
    title: "Escríbenos por WhatsApp",
    description: "Envíanos un mensaje y te responderemos a la brevedad para coordinar.",
  },
  {
    number: "03",
    title: "¡Ven a tu Cita!",
    description: "Llega a nuestra sucursal en el horario acordado. ¡Tu mascota te lo agradecerá!",
  },
];

export default function BookingSteps() {
  return (
    <section id="reservas" className="bg-white py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        >
          <p className="text-brand-primary text-sm font-semibold tracking-widest uppercase mb-2">Simple y rápido</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-charcoal">¿Cómo Reservar?</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.15, type: "spring", stiffness: 80, damping: 18 }}
            >
              <div className="w-16 h-16 rounded-full bg-brand-primary text-white flex items-center justify-center text-xl font-bold mb-5 shadow-lg shadow-brand-primary/30">
                {step.number}
              </div>
              <h3 className="text-lg font-bold text-brand-charcoal mb-2">{step.title}</h3>
              <p className="text-brand-muted text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <a
            href={BRAND.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full px-8 py-3.5 transition-all hover:scale-105 hover:shadow-lg"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Reservar por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Build check**

```bash
npm run build 2>&1 | tail -8
```
Expected: `✓ Compiled successfully`

- [ ] **Step 5: Commit**

```bash
git add components/Services.tsx components/TrustBar.tsx components/BookingSteps.tsx
git commit -m "feat: SVG icons + Framer Motion whileInView in Services, TrustBar, BookingSteps"
```

---

### Task 6: Rebuild WhyUs — real staff photo + Framer Motion slide-in

**Files:**
- Modify: `components/WhyUs.tsx`

- [ ] **Step 1: Replace full content of components/WhyUs.tsx**

```tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const REASONS = [
  {
    n: "01",
    title: "Experiencia y Amor por los Animales",
    description: "Nuestro equipo ama lo que hace. Cada mascota recibe atención personalizada y cariñosa.",
  },
  {
    n: "02",
    title: "Productos de Alta Calidad",
    description: "Solo usamos shampoos, acondicionadores y tratamientos premium, libres de químicos dañinos.",
  },
  {
    n: "03",
    title: "Ambiente Seguro y Tranquilo",
    description: "Nuestras sucursales están diseñadas para que tu mascota se sienta cómoda y relajada.",
  },
  {
    n: "04",
    title: "Resultados Garantizados",
    description: "Si no quedas satisfecho, lo solucionamos. Tu confianza es nuestra prioridad.",
  },
];

export default function WhyUs() {
  return (
    <section id="por-que" className="bg-brand-bg py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        >
          <p className="text-brand-primary text-sm font-semibold tracking-widest uppercase mb-2">Nuestra diferencia</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-charcoal">¿Por qué elegirnos?</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: numbered reasons */}
          <div className="space-y-8">
            {REASONS.map((reason, i) => (
              <motion.div
                key={reason.n}
                className="flex gap-5"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 80, damping: 18 }}
              >
                <span className="text-5xl font-bold text-brand-light select-none shrink-0 leading-none mt-1">
                  {reason.n}
                </span>
                <div>
                  <h3 className="font-bold text-brand-charcoal text-lg mb-1">{reason.title}</h3>
                  <p className="text-brand-muted text-sm leading-relaxed">{reason.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: real photo of staff */}
          <motion.div
            className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, x: 30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 70, damping: 18, delay: 0.2 }}
          >
            <Image
              src="/dogs/dog-08.jpeg"
              alt="Peluquera de Barklean sosteniendo un Pomeranian"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-4">
                <p className="font-bold text-brand-charcoal text-sm">Equipo Barklean</p>
                <p className="text-brand-muted text-xs mt-0.5">Cuidado profesional con amor</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build check**

```bash
npm run build 2>&1 | tail -8
```

- [ ] **Step 3: Commit**

```bash
git add components/WhyUs.tsx
git commit -m "feat: WhyUs with real staff photo and Framer Motion slide-in"
```

---

### Task 7: Rebuild Gallery — masonry grid, Framer Motion cascade, all 8 local photos

**Files:**
- Modify: `components/Gallery.tsx`

- [ ] **Step 1: Replace full content of components/Gallery.tsx**

```tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { GALLERY_IMAGES } from "@/lib/constants";

export default function Gallery() {
  return (
    <section id="galeria" className="bg-brand-charcoal py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        >
          <p className="text-brand-light text-sm font-semibold tracking-widest uppercase mb-2">Nuestros clientes</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Galería</h2>
          <p className="text-white/60 mt-3 max-w-lg mx-auto">
            Transformaciones reales de nuestros peludos clientes
          </p>
        </motion.div>

        {/* 3-column grid: first image spans 2 rows */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 gap-3"
          style={{ gridAutoRows: "280px" }}
        >
          {GALLERY_IMAGES.map((image, i) => (
            <motion.div
              key={image.src}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer ${
                i === 0 ? "row-span-2" : ""
              }`}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                delay: i * 0.06,
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 right-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white text-sm font-medium">{image.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build check**

```bash
npm run build 2>&1 | tail -8
```
Expected: `✓ Compiled successfully`

- [ ] **Step 3: Commit**

```bash
git add components/Gallery.tsx
git commit -m "feat: Gallery masonry grid with Framer Motion cascade and hover effects"
```

---

### Task 8: Deploy to production

**Files:** No code changes.

- [ ] **Step 1: Final build check**

```bash
npm run build 2>&1 | tail -15
```
Expected: all routes `○ (Static)`, no errors.

- [ ] **Step 2: Push all commits to GitHub**

```bash
git push
```

- [ ] **Step 3: Deploy to Vercel production**

```bash
vercel --prod --scope pablos-projects-fc93be22 2>&1
```
Expected: `Production: https://barkleanchile.vercel.app` and `✓ Deployment completed`
