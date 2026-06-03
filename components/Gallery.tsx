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
