"use client";

import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    name: "Catalina R.",
    dog: "Dueña de Milo, Labrador",
    text: "Milo salió hermoso y súper contento. Se nota que lo trataron con mucho cariño. ¡Ya agendamos la próxima visita!",
    rating: 5,
  },
  {
    name: "Rodrigo M.",
    dog: "Dueño de Luna, Schnauzer",
    text: "Excelente atención, muy profesionales. Luna siempre llega ansiosa a otros lados pero acá estuvo tranquila toda la sesión.",
    rating: 5,
  },
  {
    name: "Valentina S.",
    dog: "Dueña de Canela, Cocker",
    text: "Me encanta que puedes reservar por WhatsApp, súper fácil. El resultado fue increíble, Canela quedó preciosa.",
    rating: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-brand-bg py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-brand-dark mb-2">Lo que dicen nuestros clientes</h2>
          <p className="text-brand-gray">Más de 200 mascotas felices en La Dehesa</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 90, damping: 20 }}
            >
              <Stars count={t.rating} />
              <p className="text-brand-gray text-sm leading-relaxed flex-1">"{t.text}"</p>
              <div>
                <p className="font-semibold text-brand-dark text-sm">{t.name}</p>
                <p className="text-xs text-brand-muted">{t.dog}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
