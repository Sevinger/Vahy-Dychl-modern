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

export default function CategoriesSection() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchValue.trim()) {
      navigate(`/katalog?search=${encodeURIComponent(searchValue.trim())}`);
    }
  };
  return (
    <section id="kategorie" style={{ background: "#878787" }} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-widest text-black">
              Kategorie vah
            </h2>
            <p className="mt-2 text-sm text-black">
              Vyberte kategorii — vše skladem, montáž a servis v celé ČR.
            </p>
          </div>
          <input
            type="text"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Napište co hledáte..."
            className="shrink-0 px-5 py-2.5 text-sm font-semibold tracking-wide text-black placeholder-black/50 focus:outline-none transition-all"
            style={{
              background: "transparent",
              border: "2px solid #2563eb",
              borderRadius: "9999px",
              minWidth: "240px",
            }}
          />
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-10">
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => navigate(`/katalog?cat=${cat.id}`)}
              className="flex flex-col items-center gap-2 group transition-all hover:scale-[1.05]">
              <div className="w-full overflow-hidden transition-all"
                style={{ aspectRatio: "1", borderRadius: "10px", border: "2px solid #7a7a7a" }}>
                <img
                  src={cat.img}
                  alt={cat.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  onError={e => {
                    e.target.style.display = 'none';
                    e.target.parentElement.style.background = '#9e9e9e';
                    e.target.parentElement.innerHTML = `<span style="font-size:24px;display:flex;align-items:center;justify-content:center;height:100%;color:#555">${cat.id}</span>`;
                  }}
                />
              </div>
              <span className="text-xs font-semibold text-center leading-tight text-black">
                {cat.label}
              </span>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
