import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CATEGORIES = [
  { id: "A", label: "Laboratorní",            img: "/kategorie/kat-A.png" },
  { id: "B", label: "Obchodní bez tisku",      img: "/kategorie/kat-B.png" },
  { id: "C", label: "Obchodní s tiskem",       img: "/kategorie/kat-C.png" },
  { id: "D", label: "Kuchyně & sklady",        img: "/kategorie/kat-D.png" },
  { id: "E", label: "Počítací",                img: "/kategorie/kat-E.png" },
  { id: "F", label: "Jeřábové",                img: "/kategorie/kat-F.png" },
  { id: "G", label: "Můstkové & plošinové",    img: "/kategorie/kat-G.png" },
  { id: "H", label: "Paletové",                img: "/kategorie/kat-H.png" },
  { id: "I", label: "Silniční mostové",        img: "/kategorie/kat-I.png" },
  { id: "J", label: "Zdravotnické",            img: "/kategorie/kat-J.png" },
  { id: "K", label: "Indikátory",              img: "/kategorie/kat-K.png" },
  { id: "L", label: "EET / Pokladny",          img: "/kategorie/kat-L.png" },
];

function CategoryTile({ cat, onClick }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <button onClick={onClick} className="flex flex-col items-center gap-2 group transition-all hover:scale-[1.05]">
      <div
        className="w-full overflow-hidden transition-all flex items-center justify-center"
        style={{
          aspectRatio: "1",
          borderRadius: "10px",
          border: "1px solid rgba(255,255,255,0.1)",
          background: imgFailed ? "#1a2744" : "rgba(255,255,255,0.03)",
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(56,189,248,0.35)"}
        onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
      >
        {imgFailed ? (
          <span style={{ fontSize: 24, color: "#38bdf8" }}>{cat.id}</span>
        ) : (
          <img
            src={cat.img}
            alt={cat.label}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            onError={() => setImgFailed(true)}
          />
        )}
      </div>
      <span className="text-xs font-semibold text-center leading-tight" style={{ color: "#cbd5e1" }}>
        {cat.label}
      </span>
    </button>
  );
}

export default function CategoriesSection() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchValue.trim()) {
      navigate(`/katalog?search=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  return (
    <section id="kategorie" className="py-20" style={{ background: "#0f1629" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-widest" style={{ color: "#f1f5f9" }}>
              Kategorie vah
            </h2>
            <p className="mt-2 text-sm" style={{ color: "#94a3b8" }}>
              Vyberte kategorii — vše skladem, montáž a servis v celé ČR.
            </p>
          </div>
          <input
            type="text"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Napište co hledáte..."
            className="shrink-0 px-5 py-2.5 text-sm font-semibold tracking-wide focus:outline-none transition-all"
            style={{
              background: "transparent",
              border: "2px solid rgba(56,189,248,0.4)",
              borderRadius: "9999px",
              minWidth: "240px",
              color: "#f1f5f9",
            }}
          />
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-10">
          {CATEGORIES.map(cat => (
            <CategoryTile
              key={cat.id}
              cat={cat}
              onClick={() => navigate(`/katalog?cat=${cat.id}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
