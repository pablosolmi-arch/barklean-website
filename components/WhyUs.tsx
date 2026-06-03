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
