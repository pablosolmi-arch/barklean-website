const REASONS = [
  {
    title: "Experiencia y Amor por los Animales",
    description:
      "Nuestro equipo ama lo que hace. Cada mascota recibe atención personalizada.",
  },
  {
    title: "Productos de Alta Calidad",
    description:
      "Usamos solo shampoos, acondicionadores y productos premium libres de químicos dañinos.",
  },
  {
    title: "Ambiente Seguro y Tranquilo",
    description:
      "Nuestras sucursales están diseñadas para que tu mascota se sienta cómoda y relajada.",
  },
  {
    title: "Resultados Garantizados",
    description:
      "Si no quedas satisfecho, lo solucionamos. Tu confianza es nuestra prioridad.",
  },
];

export default function WhyUs() {
  return (
    <section id="por-que" className="bg-brand-surface py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h2 className="text-center font-bold text-3xl text-brand-dark mb-12">
          ¿Por qué elegirnos?
        </h2>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: numbered list */}
          <ul className="flex flex-col gap-8">
            {REASONS.map((reason, index) => (
              <li key={reason.title} className="flex items-start gap-4">
                <span className="shrink-0 w-9 h-9 rounded-full bg-brand-primary text-white font-bold flex items-center justify-center text-sm">
                  {index + 1}
                </span>
                <div>
                  <p className="font-bold text-brand-charcoal mb-1">
                    {reason.title}
                  </p>
                  <p className="text-brand-muted text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* Right: decorative placeholder */}
          <div className="bg-brand-bg rounded-2xl flex flex-col items-center justify-center py-16 px-8 text-center">
            <span className="text-7xl mb-4" aria-hidden="true">
              🐶
            </span>
            <p className="font-bold text-brand-dark text-xl mb-2">
              Tu mascota en las mejores manos
            </p>
            <p className="text-brand-muted text-sm max-w-xs">
              Más de 500 mascotas felices confían en Barklean cada mes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
