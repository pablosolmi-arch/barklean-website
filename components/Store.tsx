"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BRAND } from "@/lib/constants";

const PRODUCTS = [
  {
    src: "/store/toys.jpeg",
    category: "Juguetes",
    description: "Pelotas, cuerdas, mordedores y más para mantener a tu perro activo y entretenido.",
    comingSoon: false,
  },
  {
    src: "/store/harness.jpeg",
    category: "Arneses & Accesorios",
    description: "Arneses, correas, collares y todo lo que necesitas para paseos seguros y cómodos.",
    comingSoon: false,
  },
  {
    src: "/store/treats.jpeg",
    category: "Snacks & Premios",
    description: "Snacks naturales, galletas y premios para recompensar a tu mejor amigo.",
    comingSoon: false,
  },
  {
    src: "/store/pharmacy.jpeg",
    category: "Farmacia",
    description: "Productos de salud, suplementos y cuidado veterinario para el bienestar de tu mascota.",
    comingSoon: true,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, type: "spring" as const, stiffness: 80, damping: 18 },
  }),
};

export default function Store() {
  return (
    <section id="tienda" className="bg-brand-bg py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        >
          <p className="text-brand-primary text-sm font-semibold tracking-widest uppercase mb-2">Todo en un solo lugar</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-charcoal">
            Tenemos de Todo para tu Mascota
          </h2>
          <p className="text-brand-muted mt-3 max-w-xl mx-auto">
            Además de grooming, en nuestra tienda encontrarás todo lo que tu perro necesita.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.category}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={product.src}
                  alt={product.category}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {product.comingSoon && (
                  <div className="absolute inset-0 bg-brand-charcoal/40 flex items-center justify-center">
                    <span className="bg-white text-brand-charcoal text-xs font-bold uppercase tracking-wider rounded-full px-4 py-1.5 shadow-lg">
                      Próximamente
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-brand-charcoal mb-1">{product.category}</h3>
                <p className="text-sm text-brand-muted leading-relaxed">{product.description}</p>
              </div>
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
            Consulta disponibilidad →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
