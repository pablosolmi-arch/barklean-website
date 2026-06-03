import { BRAND } from "@/lib/constants";

const STEPS = [
  {
    number: "1",
    title: "Elige tu Servicio",
    description:
      "Revisa nuestros servicios y elige el que mejor se adapta a tu mascota.",
  },
  {
    number: "2",
    title: "Contáctanos por WhatsApp",
    description:
      "Envíanos un mensaje y te responderemos a la brevedad.",
  },
  {
    number: "3",
    title: "¡Listo! Ven a tu Cita",
    description:
      "Llega a nuestra sucursal en el horario acordado.",
  },
] as const;

export default function BookingSteps() {
  return (
    <section id="reservas" className="bg-brand-bg py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-dark mb-2">
            ¿Cómo Reservar?
          </h2>
          <p className="text-brand-gray text-lg">Proceso simple y rápido</p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-0 justify-center mb-12">
          {STEPS.map((step, index) => (
            <div key={step.number} className="flex flex-col md:flex-row items-center">
              <div className="flex flex-col items-center text-center max-w-xs px-6">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-md bg-brand-primary"
                >
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-brand-dark mb-2">
                  {step.title}
                </h3>
                <p className="text-brand-gray text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              {index < STEPS.length - 1 && (
                <span className="text-brand-primary text-3xl font-light md:mx-2 rotate-90 md:rotate-0">
                  →
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href={BRAND.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-brand-dark hover:bg-brand-hero text-white font-semibold px-8 py-4 rounded-full transition-colors duration-200 text-lg shadow-md"
          >
            Reservar por WhatsApp →
          </a>
        </div>
      </div>
    </section>
  );
}
