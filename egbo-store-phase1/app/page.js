import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ProductTeaser from "@/components/ProductTeaser";
import WhyUsSection from "@/components/WhyUsSection";
import FaqSection from "@/components/FaqSection";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ProductTeaser />
      <AboutSection />
      <WhyUsSection />
      <FaqSection />
    </main>
  );
}
