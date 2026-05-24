import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const BULLETS = [
  "Průmyslové, obchodní, laboratorní a osobní váhy",
  "Zajištění úředního ověření váhy ve spolupráci s ČMI",
  "Záruční i pozáruční servis – celá ČR",
  "Odborná instalace a doprava",
  "Poradenství při výběru váhy",
  "Pravidelné revize a ověřování",
];

const BESTSELLERS = [
  {
    name: "Plošinová váha do 1500 kg",
    img: "https://new.vahy-dychl.cz/4TxxxxDFWL/image005.jpg",
    price: "od 14.990 Kč bez DPH",
    search: "Plošinová",
    certified: true,
  },
  {
    name: "Paletová váha do 2000 kg",
    img: "https://www.vahy-dychl.cz/userFiles/listy/paletak.jpg",
    price: "od 9.990 Kč bez DPH",
    search: "Paletová",
    certified: false,
  },
  {
    name: "Můstková váha E-M",
    img: "https://new.vahy-dychl.cz/DWVL/2.jpg",
    price: "od 3.490 Kč bez DPH",
    search: "Můstková",
    certified: true,
  },
];

export default function HeroSection() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchValue.trim()) {
      navigate(`/katalog?search=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  return (
    <section
      id="vahy"
      className="relative overflow-hidden py-16 md:py-24"
      style={{ background: "#0b1120" }}
    >
      {/* Animovaná mřížka */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(56,189,248,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.055) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          animation: "grid-move 8s linear infinite",
          maskImage: "radial-gradient(ellipse at center, transparent 25%, black 90%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, transparent 25%, black 90%)",
        }}
      />

      {/* Plovoucí orby */}
      <div aria-hidden style={{
        position: "absolute", borderRadius: "50%",
        width: 520, height: 520,
        background: "radial-gradient(circle, rgba(56,189,248,0.13) 0%, transparent 65%)",
        top: -160, left: -100,
        animation: "float1 9s ease-in-out infinite",
        pointerEvents: "none",
      }} />
      <div aria-hidden style={{
        position: "absolute", borderRadius: "50%",
        width: 420, height: 420,
        background: "radial-gradient(circle, rgba(99,102,241,0.11) 0%, transparent 65%)",
        bottom: -130, right: "3%",
        animation: "float2 12s ease-in-out infinite",
        pointerEvents: "none",
      }} />
      <div aria-hidden style={{
        position: "absolute", borderRadius: "50%",
        width: 290, height: 290,
        background: "radial-gradient(circle, rgba(37,99,235,0.10) 0%, transparent 65%)",
        top: "30%", left: "45%",
        animation: "float3 15s ease-in-out infinite",
        pointerEvents: "none",
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-12 items-start">

          {/* Levá strana */}
          <div className="md:w-2/5 flex flex-col gap-6">
            <div>
              <span
                className="inline-block px-5 py-2 rounded-full text-sm font-black tracking-widest uppercase"
                style={{
                  background: "rgba(56,189,248,0.12)",
                  border: "1px solid rgba(56,189,248,0.3)",
                  color: "#38bdf8",
                }}
              >
                Prodej · Servis · Kalibrace vah
              </span>
              <p className="mt-4 text-base" style={{ color: "#94a3b8" }}>
                Průmyslové, obchodní, laboratorní i osobní váhy. Kompletní katalog s cenami, servisem a poradenstvím.
              </p>
            </div>

            <ul className="space-y-3">
              {BULLETS.map((b, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span style={{
                    width: 7, height: 7, borderRadius: "50%", flexShrink: 0,
                    background: "#38bdf8",
                    boxShadow: "0 0 8px rgba(56,189,248,0.7)",
                    display: "inline-block",
                  }} />
                  <span className="text-sm" style={{ color: "#cbd5e1" }}>{b}</span>
                </li>
              ))}
            </ul>

            <div className="flex gap-3 flex-wrap pt-2">
              <a href="/servis"
                className="px-6 py-3 rounded-lg font-bold text-sm transition-opacity hover:opacity-80 text-white"
                style={{ background: "linear-gradient(135deg, #2563eb, #4f46e5)", boxShadow: "0 4px 20px rgba(37,99,235,0.35)" }}>
                Přejít na SERVIS
              </a>
              <a href="#kontakt"
                className="px-6 py-3 rounded-lg font-bold text-sm transition-opacity hover:opacity-80"
                style={{ border: "1px solid rgba(255,255,255,0.2)", color: "#e2e8f0", background: "rgba(255,255,255,0.04)" }}>
                Kontaktovat nás
              </a>
            </div>
          </div>

          {/* Pravá strana — bestsellery */}
          <div className="md:w-3/5 flex flex-col gap-5">
            <h2 className="text-lg font-bold uppercase tracking-widest">
              <span style={{
                display: "inline-block",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "9999px",
                padding: "4px 20px",
                color: "#64748b",
                fontWeight: 700,
                fontSize: "11px",
                letterSpacing: "0.2em",
              }}>
                Nejprodávanější váhy
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {BESTSELLERS.map((p) => (
                <button key={p.name}
                  onClick={() => navigate(`/katalog?search=${encodeURIComponent(p.search)}`)}
                  className="text-left group flex flex-col transition-all hover:scale-[1.02]"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    borderRadius: "14px",
                    overflow: "hidden",
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(56,189,248,0.35)"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"}
                >
                  <div className="flex items-center justify-center p-6" style={{ background: "rgba(255,255,255,0.02)", minHeight: "180px" }}>
                    <img src={p.img} alt={p.name} className="max-h-40 w-full object-contain group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="px-4 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <p className="text-sm font-semibold leading-tight mb-2 flex items-center gap-1.5" style={{ color: "#e2e8f0" }}>
                      {p.name}
                      {p.certified && (
                        <span className="rounded text-[9px] font-black flex items-center justify-center shrink-0 px-1.5 py-0.5"
                          style={{ background: "#16a34a", color: "#fff" }}>Ověřeno</span>
                      )}
                    </p>
                    <p className="text-base font-black" style={{ color: "#38bdf8" }}>{p.price}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
