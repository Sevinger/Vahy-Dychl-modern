import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import CategoriesSection from "../components/CategoriesSection";
import NewsSection from "../components/NewsSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "#939393" }}>
      <Header />
      <main>
        <HeroSection />
        <CategoriesSection />
        <NewsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}