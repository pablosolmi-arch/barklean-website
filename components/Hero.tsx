import { BRAND } from "@/lib/constants";

const STATS = [
  { value: "2 Sucursales", label: "Lo Barnechea" },
  { value: "5★ Google", label: "Mejor valorado" },
  { value: "100% Profesional", label: "Equipo certificado" },
];

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col"
      style={{
        background: "linear-gradient(135deg, #1a6ea8 0%, #3498db 50%, #5dade2 100%)",
      }}
    >
      {/* Main content */}
      <div className="flex-1 flex items-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: text content */}
            <div className="text-center lg:text-left">
              {/* Eyebrow badge */}
              <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full px-4 py-1.5 mb-6">
                Peluquería Profesional para Perros en Chile
              </span>

              {/* Headline */}
              <h1 className="font-slab text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6">
                Tu Mejor Amigo
                <br />
                <span className="text-brand-light">
                  Merece el Mejor Cuidado
                </span>
              </h1>

              {/* Subtext */}
              <p className="text-white/85 text-lg sm:text-xl max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed">
                Transformamos a tu mascota con cariño, experiencia y los mejores
                productos premium.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href={BRAND.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-brand-dark font-bold rounded-full px-8 py-3 hover:bg-brand-light transition text-center"
                >
                  Reserva tu Cita →
                </a>
                <a
                  href="#servicios"
                  className="border-2 border-white/60 text-white rounded-full px-8 py-3 hover:bg-white/10 transition text-center"
                >
                  Ver Servicios
                </a>
              </div>
            </div>

            {/* Right: decorative area */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-80 h-80 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <div className="absolute inset-4 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                  <span className="text-8xl select-none" aria-hidden="true">
                    🐾
                  </span>
                </div>
                {/* Floating accent dots */}
                <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-brand-light/40" />
                <div className="absolute -bottom-6 -left-6 w-12 h-12 rounded-full bg-white/20" />
                <div className="absolute top-8 -left-8 w-5 h-5 rounded-full bg-brand-light/30" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-white/20 backdrop-blur-sm border-t border-white/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-around py-6 gap-6 sm:gap-0">
            {STATS.map((stat, i) => (
              <div key={stat.value} className="flex items-center gap-0">
                <div className="text-center px-8">
                  <p className="text-white font-bold text-xl sm:text-2xl">
                    {stat.value}
                  </p>
                  <p className="text-white/70 text-sm mt-0.5">{stat.label}</p>
                </div>
                {i < STATS.length - 1 && (
                  <div className="hidden sm:block h-10 w-px bg-white/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
