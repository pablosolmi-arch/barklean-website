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
