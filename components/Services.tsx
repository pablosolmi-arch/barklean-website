import { BRAND, SERVICES } from "@/lib/constants";

export default function Services() {
  return (
    <section id="servicios" className="bg-brand-bg py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-bold text-3xl text-brand-dark mb-3">
            Nuestros Servicios
          </h2>
          <p className="text-brand-muted text-lg max-w-xl mx-auto">
            Todo lo que tu mascota necesita para verse y sentirse increíble.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {SERVICES.map((service) =>
            service.featured ? (
              <div
                key={service.id}
                className="relative rounded-xl p-6 text-white"
                style={{
                  background: "linear-gradient(135deg, #3498db, #5dade2)",
                }}
              >
                {/* Badge */}
                <span className="absolute top-4 right-4 bg-white/20 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  ⭐ Más Popular
                </span>
                <span className="text-3xl mb-4 block" aria-hidden="true">
                  {service.icon}
                </span>
                <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ) : (
              <div
                key={service.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-brand-bg hover:shadow-md transition"
              >
                <span className="text-3xl mb-4 block" aria-hidden="true">
                  {service.icon}
                </span>
                <h3 className="font-semibold text-brand-charcoal text-lg mb-2">
                  {service.title}
                </h3>
                <p className="text-brand-muted text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            )
          )}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href={BRAND.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-brand-primary text-white font-bold rounded-full px-10 py-3 hover:bg-brand-dark transition-colors"
          >
            Reserva tu Cita
          </a>
        </div>
      </div>
    </section>
  );
}
