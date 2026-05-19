import Header from "../components/Header";
import Footer from "../components/Footer";
import ServisniKontaktCard from "../components/ServisniKontaktCard";

export default function Kontakt() {
  return (
    <div className="min-h-screen" style={{ background: "#939393" }}>
      <Header />
      <main className="flex min-h-[80vh] items-center justify-center p-8">
        <div style={{ maxWidth: "600px", width: "100%" }}>
          <ServisniKontaktCard large />
        </div>
      </main>
      <Footer />
    </div>
  );
}
