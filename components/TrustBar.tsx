const TRUST_ITEMS = [
  {
    icon: "🏅",
    title: "Profesionales Certificados",
    subtitle: "Cuidado de confianza",
  },
  {
    icon: "💎",
    title: "Productos Premium",
    subtitle: "Los mejores del mercado",
  },
  {
    icon: "💬",
    title: "Reserva por WhatsApp",
    subtitle: "Fácil y rápido",
  },
  {
    icon: "📍",
    title: "2 Sucursales",
    subtitle: "Lo Barnechea, Santiago",
  },
];

export default function TrustBar() {
  return (
    <div className="bg-white border-t border-brand-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_ITEMS.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center text-center gap-2"
            >
              <span className="text-2xl" aria-hidden="true">
                {item.icon}
              </span>
              <p className="font-bold text-brand-dark text-sm sm:text-base leading-tight">
                {item.title}
              </p>
              <p className="text-brand-muted text-xs sm:text-sm">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
