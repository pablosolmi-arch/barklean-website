// lib/constants.ts

export const BRAND = {
  name: "Barklean",
  tagline: "Peluquer\u00eda Profesional para Perros en Chile",
  description:
    "Transformamos a tu mascota con cari\u00f1o, experiencia y los mejores productos. Dos sucursales en Lo Barnechea.",
  phone: "+56 9 3451 5587",
  email: "contacto@barklean.cl",
  hours: "Lun\u2013S\u00e1b: 10:30 \u2013 17:00",
  whatsapp:
    "https://wa.me/56934515587?text=Hola%21%20estaba%20viendo%20su%20p%C3%A1gina%20web%20y%20me%20interesan%20sus%20servicios",
  instagram: "https://www.instagram.com/barklean_peluqueria/",
  facebook: "https://www.facebook.com/perruqueriaentretenida",
} as const;

export const LOCATIONS = [
  {
    name: "La Dehesa",
    address: "La Dehesa 4580, Local 8",
    city: "Lo Barnechea, Santiago",
    mapsUrl: "https://maps.app.goo.gl/Yz9eaDJADamwV54J9",
    mapsEmbed:
      "https://maps.google.com/maps?q=La+Dehesa+4580,+Lo+Barnechea,+Santiago&output=embed",
  },
  {
    name: "El Espino",
    address: "El Espino 1949, Local 107",
    city: "Lo Barnechea, Santiago",
    mapsUrl: "https://maps.app.goo.gl/FTiwksL1XKhbqxfV9",
    mapsEmbed:
      "https://maps.google.com/maps?q=El+Espino+1949,+Lo+Barnechea,+Santiago&output=embed",
  },
] as const;

export const SERVICES = [
  {
    id: "corte",
    icon: "\u2702\ufe0f",
    title: "Corte de Pelo",
    description:
      "Cortes personalizados seg\u00fan la raza y estilo de tu perro. Estilistas capacitados en las \u00faltimas t\u00e9cnicas.",
    featured: false,
  },
  {
    id: "bano",
    icon: "\ud83d\udec1",
    title: "Ba\u00f1o Completo",
    description:
      "Shampoo premium, acondicionador, secado profesional y cepillado. Tu perro quedar\u00e1 limpio y brillante.",
    featured: false,
  },
  {
    id: "spa",
    icon: "\u2728",
    title: "Spa & Tratamientos",
    description:
      "Tratamientos especiales para piel y pelaje, masajes relajantes y aromaterapia para el bienestar de tu mascota.",
    featured: true,
  },
  {
    id: "unas",
    icon: "\ud83d\udc3e",
    title: "Corte de U\u00f1as",
    description:
      "Recorte profesional de u\u00f1as con cuidado especial. Incluye limado y revisi\u00f3n de almohadillas.",
    featured: false,
  },
  {
    id: "deslanado",
    icon: "\ud83c\udf00",
    title: "Deslanado",
    description:
      "Eliminaci\u00f3n de pelo muerto con t\u00e9cnicas profesionales. Ideal para razas de pelo largo en temporada de muda.",
    featured: false,
  },
  {
    id: "paquetes",
    icon: "\ud83c\udf81",
    title: "Paquetes Completos",
    description:
      "Combina varios servicios y ahorra. Ba\u00f1o, corte, u\u00f1as y m\u00e1s en un solo paquete adaptado a tu mascota.",
    featured: false,
  },
] as const;

export const GALLERY_IMAGES = [
  { src: "/dogs/dog-07.jpeg", alt: "Perrito feliz en Barklean" },
  { src: "/dogs/dog-01.jpeg", alt: "Pastor alemán en el salón" },
  { src: "/dogs/dog-08.jpeg", alt: "Peluquera con Pomeranian" },
  { src: "/dogs/dog-04.jpeg", alt: "Samoyedo en el salón" },
  { src: "/dogs/dog-02.jpeg", alt: "Perrito con pañoleta naranja" },
  { src: "/dogs/dog-03.jpeg", alt: "Weimaraners en el salón" },
  { src: "/dogs/dog-06.jpeg", alt: "Weimaraners en la tienda" },
  { src: "/dogs/dog-05.jpeg", alt: "Perritos pequeños en cama" },
] as const;

export const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Galer\u00eda", href: "#galeria" },
  { label: "Ubicaci\u00f3n", href: "#ubicacion" },
] as const;
