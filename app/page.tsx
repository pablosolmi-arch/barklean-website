import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import BookingSteps from "@/components/BookingSteps";
import Gallery from "@/components/Gallery";
import Locations from "@/components/Locations";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustBar />
      <Services />
      <WhyUs />
      <BookingSteps />
      <Gallery />
      <Locations />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
