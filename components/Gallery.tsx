import Image from "next/image";
import { GALLERY_IMAGES } from "@/lib/constants";

export default function Gallery() {
  return (
    <section id="galeria" className="bg-brand-charcoal py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-2">Galería</h2>
          <p className="text-brand-light text-lg">
            Transformaciones reales de nuestros peludos clientes
          </p>
        </div>

        {/* Mobile: 2-column grid. Desktop: 3-column with first image spanning 2 rows */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {GALLERY_IMAGES.map((image, index) => (
            <div
              key={image.src}
              className={`relative overflow-hidden rounded-lg ${
                image.large ? "row-span-2" : ""
              }`}
              style={{ aspectRatio: image.large ? undefined : "1 / 1" }}
            >
              {/* large image gets a fixed height container instead of aspect-ratio */}
              {image.large ? (
                <div className="relative h-full min-h-64 md:min-h-80">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                    priority={index === 0}
                  />
                </div>
              ) : (
                <div className="relative" style={{ paddingBottom: "100%" }}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
