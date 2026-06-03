import { LOCATIONS } from "@/lib/constants";

export default function Locations() {
  return (
    <section id="ubicacion" className="bg-brand-bg py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-dark mb-2">
            Nuestras Sucursales
          </h2>
          <p className="text-brand-gray text-lg">
            Dos locales en Lo Barnechea para tu conveniencia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LOCATIONS.map((location) => (
            <div
              key={location.name}
              className="bg-white rounded-xl overflow-hidden shadow-md"
            >
              <div className="relative" style={{ height: "250px" }}>
                <iframe
                  src={location.mapsEmbed}
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Mapa de ${location.name}`}
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-brand-dark mb-1">
                  {location.name}
                </h3>
                <p className="text-brand-muted text-sm mb-1">
                  {location.address}
                </p>
                <p className="text-brand-muted text-sm mb-3">{location.city}</p>
                <a
                  href={location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-primary font-medium text-sm hover:text-brand-dark transition-colors duration-200"
                >
                  Ver en Google Maps →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
