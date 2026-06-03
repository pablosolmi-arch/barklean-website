"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { BRAND } from "@/lib/constants";

const STATS = [
  { value: "1", label: "Sucursal" },
  { value: "5★", label: "Google Rating" },
  { value: "100%", label: "Profesional" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
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

function PawPrint() {
  return (
    <svg viewBox="0 0 100 90" aria-hidden="true" fill="currentColor" className="w-full h-full">
      <ellipse cx="50" cy="68" rx="24" ry="19" />
      <ellipse cx="25" cy="46" rx="10" ry="13" />
      <ellipse cx="75" cy="46" rx="10" ry="13" />
      <ellipse cx="37" cy="30" rx="9" ry="12" />
      <ellipse cx="63" cy="30" rx="9" ry="12" />
    </svg>
  );
}

// Paw print configs: position, size, parallax factor, rotation
const PAW_CONFIG = [
  { top: "7%",  left: "2%",  size: 64, fx: 28,  fy: 20,  rot: 15  },
  { top: "12%", right: "3%", size: 40, fx: -18, fy: -14, rot: -22 },
  { top: "50%", left: "1%",  size: 48, fx: 32,  fy: -22, rot: 8   },
  { bottom: "18%", right: "2%", size: 80, fx: -22, fy: 16, rot: -14 },
  { bottom: "35%", left: "7%",  size: 36, fx: 15,  fy: 12, rot: 20  },
  { top: "70%", right: "12%", size: 52, fx: -12, fy: -10, rot: -6  },
] as const;

export default function Hero() {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 40, damping: 18 });
  const springY = useSpring(rawY, { stiffness: 40, damping: 18 });

  // Pre-compute parallax transforms for each paw (hooks must be at top level)
  const p0x = useTransform(springX, (v) => v * PAW_CONFIG[0].fx);
  const p0y = useTransform(springY, (v) => v * PAW_CONFIG[0].fy);
  const p1x = useTransform(springX, (v) => v * PAW_CONFIG[1].fx);
  const p1y = useTransform(springY, (v) => v * PAW_CONFIG[1].fy);
  const p2x = useTransform(springX, (v) => v * PAW_CONFIG[2].fx);
  const p2y = useTransform(springY, (v) => v * PAW_CONFIG[2].fy);
  const p3x = useTransform(springX, (v) => v * PAW_CONFIG[3].fx);
  const p3y = useTransform(springY, (v) => v * PAW_CONFIG[3].fy);
  const p4x = useTransform(springX, (v) => v * PAW_CONFIG[4].fx);
  const p4y = useTransform(springY, (v) => v * PAW_CONFIG[4].fy);
  const p5x = useTransform(springX, (v) => v * PAW_CONFIG[5].fx);
  const p5y = useTransform(springY, (v) => v * PAW_CONFIG[5].fy);

  const pawTransforms = [
    [p0x, p0y], [p1x, p1y], [p2x, p2y],
    [p3x, p3y], [p4x, p4y], [p5x, p5y],
  ];

  // Text and photo displacement
  const textX = useTransform(springX, (v) => v * 10);
  const textY = useTransform(springY, (v) => v * 6);
  const photoX = useTransform(springX, (v) => v * -12);
  const photoY = useTransform(springY, (v) => v * -8);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * 2);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [rawX, rawY]);

  return (
    <section
      id="inicio"
      className="relative min-h-[92vh] flex items-center bg-white overflow-hidden"
    >
      {/* Parallax paw prints (desktop) */}
      {PAW_CONFIG.map((cfg, i) => (
        <motion.div
          key={i}
          className="absolute hidden lg:block text-brand-primary pointer-events-none select-none"
          style={{
            width: cfg.size,
            height: cfg.size,
            top: "top" in cfg ? cfg.top : undefined,
            bottom: "bottom" in cfg ? cfg.bottom : undefined,
            left: "left" in cfg ? cfg.left : undefined,
            right: "right" in cfg ? cfg.right : undefined,
            rotate: cfg.rot,
            opacity: 0.10,
            x: pawTransforms[i][0],
            y: pawTransforms[i][1],
          }}
        >
          <PawPrint />
        </motion.div>
      ))}

      {/* Floating paw prints (mobile fallback) */}
      <motion.div
        className="absolute top-16 right-6 w-16 text-brand-primary/[0.07] pointer-events-none lg:hidden"
        animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <PawPrint />
      </motion.div>
      <motion.div
        className="absolute bottom-24 left-4 w-10 text-brand-primary/[0.06] pointer-events-none lg:hidden"
        animate={{ y: [0, 10, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <PawPrint />
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-20">

        {/* ── DESKTOP LAYOUT ── */}
        <div className="hidden lg:grid lg:grid-cols-2 items-center gap-0 relative">

          {/* Center logo divider — absolutely positioned between columns */}
          <div className="absolute left-1/2 -translate-x-1/2 inset-y-0 z-20 flex flex-col items-center py-6 pointer-events-none">
            <motion.div
              className="w-px flex-1 bg-gradient-to-b from-transparent via-brand-primary/20 to-brand-primary/35 origin-top"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.7, ease: "easeOut" }}
            />
            <motion.div
              className="relative my-3"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 130, damping: 13 }}
            >
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-brand-primary/25 blur-2xl scale-[2.8]" />
              {/* Logo circle */}
              <div className="relative z-10 w-[156px] h-[156px] rounded-full bg-white shadow-2xl border border-gray-100 ring-4 ring-brand-bg flex items-center justify-center p-3">
                <Image
                  src="/logo.png"
                  alt="Barklean"
                  width={118}
                  height={118}
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
            <motion.div
              className="w-px flex-1 bg-gradient-to-b from-brand-primary/35 via-brand-primary/20 to-transparent origin-bottom"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.7, ease: "easeOut" }}
            />
          </div>

          {/* LEFT: text (padded right so text doesn't overlap logo) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ x: textX, y: textY }}
            className="text-left pr-20"
          >
            <motion.span
              variants={itemVariants}
              className="inline-block bg-brand-bg text-brand-dark text-xs font-semibold tracking-widest uppercase rounded-full px-4 py-1.5 mb-6"
            >
              Peluquería Canina · Lo Barnechea, Santiago
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="font-slab text-5xl lg:text-6xl font-bold leading-tight text-brand-charcoal mb-6"
            >
              Tu Mejor Amigo
              <br />
              <span className="text-brand-dark">Merece el Mejor Cuidado</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-brand-muted text-lg max-w-md mb-10 leading-relaxed"
            >
              Transformamos a tu mascota con cariño, experiencia y los mejores
              productos premium. Reserva llamándonos o por WhatsApp en segundos.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              <a
                href={BRAND.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full px-7 py-3.5 transition-all duration-200 hover:scale-105 hover:shadow-lg"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
              <a
                href={`tel:${BRAND.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-dark text-white font-bold rounded-full px-7 py-3.5 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-brand-primary/30"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                Llamar
              </a>
              <a
                href="#servicios"
                className="inline-flex items-center justify-center border-2 border-brand-primary text-brand-primary font-semibold rounded-full px-7 py-3.5 hover:bg-brand-bg transition-colors"
              >
                Ver Servicios
              </a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-10 mt-12 pt-8 border-t border-gray-100"
            >
              {STATS.map((stat) => (
                <div key={stat.value}>
                  <p className="text-2xl font-bold text-brand-dark">{stat.value}</p>
                  <p className="text-xs text-brand-muted mt-0.5">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT: photo (padded left) */}
          <motion.div style={{ x: photoX, y: photoY }} className="flex justify-end pl-16">
            <div className="relative w-[440px]">
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
                  sizes="440px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/20 via-transparent to-transparent" />
              </motion.div>
              <motion.div
                variants={badgeVariants}
                initial="hidden"
                animate="visible"
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-5 py-3 shadow-xl border border-gray-100"
              >
                <p className="text-xs text-brand-muted">Atendemos</p>
                <p className="text-sm font-bold text-brand-charcoal">Lun–Sáb · 10:30–17:00</p>
              </motion.div>
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-brand-bg" />
            </div>
          </motion.div>
        </div>

        {/* ── MOBILE LAYOUT ── */}
        <div className="lg:hidden flex flex-col items-center gap-8">
          {/* Logo (mobile) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 130, damping: 13 }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-full bg-brand-primary/20 blur-xl scale-[2.2]" />
            <div className="relative z-10 w-24 h-24 rounded-full bg-white shadow-xl border border-gray-100 ring-4 ring-brand-bg flex items-center justify-center p-2">
              <Image src="/logo.png" alt="Barklean" width={70} height={70} className="object-contain" priority />
            </div>
          </motion.div>

          {/* Photo (mobile) */}
          <div className="relative w-full max-w-xs">
            <motion.div
              variants={photoVariants}
              initial="hidden"
              animate="visible"
              className="animate-float relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-brand-dark/20"
            >
              <Image src="/dogs/dog-07.jpeg" alt="Perrito feliz en Barklean" fill className="object-cover" priority sizes="320px" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/20 via-transparent to-transparent" />
            </motion.div>
            <motion.div
              variants={badgeVariants}
              initial="hidden"
              animate="visible"
              className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-4 py-2.5 shadow-xl border border-gray-100"
            >
              <p className="text-xs text-brand-muted">Atendemos</p>
              <p className="text-sm font-bold text-brand-charcoal">Lun–Sáb · 10:30–17:00</p>
            </motion.div>
          </div>

          {/* Text (mobile) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center pt-6"
          >
            <motion.span variants={itemVariants} className="inline-block bg-brand-bg text-brand-dark text-xs font-semibold tracking-widest uppercase rounded-full px-4 py-1.5 mb-4">
              Peluquería Canina · Lo Barnechea
            </motion.span>
            <motion.h1 variants={itemVariants} className="font-slab text-4xl font-bold leading-tight text-brand-charcoal mb-4">
              Tu Mejor Amigo<br /><span className="text-brand-dark">Merece el Mejor Cuidado</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-brand-muted text-base max-w-sm mx-auto mb-8 leading-relaxed">
              Reserva llamándonos o por WhatsApp en segundos.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col gap-3 w-full max-w-xs mx-auto">
              <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full px-8 py-3.5 transition-all">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
              <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} className="inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-dark text-white font-bold rounded-full px-8 py-3.5 transition-all">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                Llamar
              </a>
              <a href="#servicios" className="inline-flex items-center justify-center border-2 border-brand-primary text-brand-primary font-semibold rounded-full px-8 py-3.5 hover:bg-brand-bg transition-colors">
                Ver Servicios
              </a>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
