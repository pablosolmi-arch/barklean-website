import Image from "next/image";
import Link from "next/link";
import { BRAND, LOCATIONS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-brand-charcoal text-white py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Col 1: Logo & brand */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Barklean logo"
              width={40}
              height={40}
              className="rounded-sm"
            />
            <span className="text-xl font-bold">{BRAND.name}</span>
          </div>
          <p className="text-sm text-white/70 leading-relaxed">
            Tu mejor amigo merece el mejor cuidado
          </p>
          <div className="flex flex-col gap-2 mt-1">
            <Link
              href={BRAND.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-brand-primary hover:text-brand-light transition-colors"
            >
              Facebook
            </Link>
            <Link
              href={BRAND.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-brand-primary hover:text-brand-light transition-colors"
            >
              Instagram
            </Link>
          </div>
        </div>

        {/* Col 2: Services */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-4">
            Servicios
          </h3>
          <ul className="flex flex-col gap-2 text-sm text-white/80">
            <li>Corte de Pelo</li>
            <li>Baño Completo</li>
            <li>Spa &amp; Tratamientos</li>
            <li>Corte de Uñas</li>
            <li>Deslanado</li>
          </ul>
        </div>

        {/* Col 3: Hours & Contact */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-4">
            Horarios y Contacto
          </h3>
          <ul className="flex flex-col gap-2 text-sm text-white/80">
            <li>{BRAND.hours}</li>
            <li>
              <Link
                href={`tel:${BRAND.phone.replace(/\s/g, "")}`}
                className="hover:text-brand-light transition-colors"
              >
                {BRAND.phone}
              </Link>
            </li>
            <li>
              <Link
                href={`mailto:${BRAND.email}`}
                className="hover:text-brand-light transition-colors"
              >
                {BRAND.email}
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Locations */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-4">
            Sucursales
          </h3>
          <ul className="flex flex-col gap-4 text-sm text-white/80">
            {LOCATIONS.map((loc) => (
              <li key={loc.name}>
                <p className="font-semibold text-white">{loc.name}</p>
                <Link
                  href={loc.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-light transition-colors"
                >
                  {loc.address}
                  <br />
                  {loc.city}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-white/10 text-center text-xs text-white/40">
        © 2026 Barklean. Todos los derechos reservados.
      </div>
    </footer>
  );
}
