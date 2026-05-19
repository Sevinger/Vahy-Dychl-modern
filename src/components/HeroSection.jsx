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
    <section id="vahy" style={{ background: "#939393" }} className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-12 items-start">

          <div className="md:w-2/5 flex flex-col gap-6">
            <div>
              <span className="inline-block px-5 py-2 rounded-full text-sm font-black tracking-widest uppercase text-black"
                style={{ background: "#2563eb" }}>
                Prodej · Servis · Kalibrace vah
              </span>
              <p className="mt-4 text-base text-black">
                Průmyslové, obchodní, laboratorní i osobní váhy. Kompletní katalog s cenami, servisem a poradenstvím.
              </p>
            </div>

            <ul className="space-y-3">
              {BULLETS.map((b, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 shrink-0" style={{ color: "#2563eb" }} />
                  <span className="text-sm text-black">{b}</span>
                </li>
              ))}
            </ul>

            <div className="flex gap-3 flex-wrap pt-2">
              <a href="/servis"
                className="px-6 py-3 rounded-lg font-bold text-sm transition-opacity hover:opacity-80 text-black"
                style={{ background: "#2563eb" }}>
                Přejít na SERVIS
              </a>
              <a href="#kontakt"
                className="px-6 py-3 rounded-lg font-bold text-sm transition-opacity hover:opacity-80 text-black"
                style={{ border: "1px solid #000" }}>
                Kontaktovat nás
              </a>
            </div>
          </div>

          <div className="md:w-3/5 flex flex-col gap-5">
            <h2 className="text-lg font-bold uppercase tracking-widest text-black">
              <span style={{
                display: "inline-block",
                border: "2px solid #2563eb",
                borderRadius: "9999px",
                padding: "4px 20px",
                backgroundColor: "transparent",
                color: "#000000",
                fontWeight: 600,
              }}>
                Nejprodávanější váhy
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {BESTSELLERS.map((p) => (
                <button key={p.name}
                  onClick={() => navigate(`/katalog?search=${encodeURIComponent(p.search)}`)}
                  className="text-left group flex flex-col transition-all hover:scale-[1.02]"
                  style={{ background: "#a8a8a8", border: "1px solid #7a7a7a", borderRadius: "10px", overflow: "hidden" }}>
                  <div className="flex items-center justify-center p-6" style={{ background: "#878787", minHeight: "180px" }}>
                    <img src={p.img} alt={p.name} className="max-h-40 w-full object-contain group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="px-4 py-4" style={{ borderTop: "1px solid #7a7a7a" }}>
                    <p className="text-sm font-semibold leading-tight mb-2 text-black flex items-center gap-1.5">
                      {p.name}
                      {p.certified && (
                        <span className="rounded text-[9px] font-black flex items-center justify-center shrink-0 px-1.5 py-0.5"
                          style={{ background: "#16a34a", color: "#fff" }}>Ověřeno</span>
                      )}
                    </p>
                    <p className="text-base font-black text-black">{p.price}</p>
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