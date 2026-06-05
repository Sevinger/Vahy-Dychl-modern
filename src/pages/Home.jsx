import { useEffect } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import CategoriesSection from "../components/CategoriesSection";
import NewsSection from "../components/NewsSection";
import BestsellerSection from "../components/BestsellerSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import { recordVisit } from "@/api/supabaseClient";

export default function Home() {
  useEffect(() => { recordVisit(); }, []);

  return (
    <div className="min-h-screen" style={{ background: "#1c1f3e" }}>
      <Header />
      <main>
        <HeroSection />
        <CategoriesSection />
        <NewsSection />
        <BestsellerSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}