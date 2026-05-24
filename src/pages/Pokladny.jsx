import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Pokladny() {
  return (
    <div className="min-h-screen" style={{ background: "#0b1120" }}>
      <Header />
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-6 p-8 text-center">
        <div style={{ fontSize: "4rem" }}>🔧</div>
        <h1 className="text-3xl font-bold" style={{ color: "#f1f5f9" }}>Pokladny</h1>
        <p className="text-lg max-w-md" style={{ color: "#94a3b8" }}>
          Tato sekce je momentálně ve výstavbě.<br />
          Brzy zde najdete kompletní nabídku pokladních systémů.
        </p>
        <Link
          to="/"
          className="mt-4 rounded-full px-8 py-3 font-semibold text-white hover:opacity-80 transition-opacity"
          style={{ background: "linear-gradient(135deg, #2563eb, #4f46e5)" }}
        >
          Zpět na hlavní stránku
        </Link>
      </main>
      <Footer />
    </div>
  );
}
