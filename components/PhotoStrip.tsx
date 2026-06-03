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
