import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/api/supabaseClient";
import { ArrowLeft, Search, CheckCircle, Tag } from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "Vše" },
  { id: "A", label: "A – Laboratorní" },
  { id: "B", label: "B – Obchodní bez tisku" },
  { id: "C", label: "C – Obchodní s tiskem" },
  { id: "D", label: "D – Kuchyňské & skladové" },
  { id: "E", label: "E – Počítací" },
  { id: "F", label: "F – Jeřábové" },
  { id: "G", label: "G – Můstkové & plošinové" },
  { id: "H", label: "H – Paletové" },
  { id: "I", label: "I – Silniční mostové" },
  { id: "J", label: "J – Zdravotnické" },
  { id: "K", label: "K – Indikátory" },
  { id: "L", label: "L – EET / Pokladny" },
];

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState(
    () => new URLSearchParams(window.location.search).get("cat") || "all"
  );
  const navigate = useNavigate();

  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get("search");
    if (s) setSearch(s);
  }, []);

  useEffect(() => {
    // ⚡ Klíčová oprava: načítáme jen potřebná pole — BEZ description
    // description obsahuje base64 obrázky a způsobuje pomalé načítání
    supabase
      .from("products")
      .select("id, name, category_id, price, certified, verification_option, inquiry_only, image_url")
      .eq("active", true)
      .order("name", { ascending: true })
      .then(({ data }) => {
        setProducts(data || []);
        setLoading(false);
      });
  }, []);

  const filtered = products.filter(p => {
    const matchCat = selectedCat === "all" || p.category_id === selectedCat;
    const q = search.toLowerCase();
    const matchSearch = !q || p.name.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const handleCatChange = (id) => {
    setSelectedCat(id);
    navigate(`/katalog${id !== "all" ? `?cat=${id}` : ""}`, { replace: true });
  };

  return (
    <div className="min-h-screen" style={{ background: "#1c1f3e" }}>
      <header className="border-b border-white/10 sticky top-0 z-40 shadow-sm" style={{ background: "#252848" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold text-sm">
            <ArrowLeft className="w-4 h-4" /> Zpět
          </Link>
          <div className="flex-1"><h1 className="text-lg font-black text-white">Katalog vah</h1></div>
          <div className="relative hidden md:block w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Hledat produkt..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="md:hidden mb-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Hledat produkt..."
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-3 mb-6">
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              onClick={() => handleCatChange(c.id)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                selectedCat === c.id
                  ? "bg-blue-700 text-white border-transparent"
                  : "border-white/15 text-gray-300 hover:border-blue-600 hover:text-white"
              }`}
              style={{ background: selectedCat === c.id ? undefined : "#252848" }}
            >
              {c.label}
            </button>
          ))}
        </div>

        <p className="text-sm text-gray-500 mb-4">{filtered.length} produktů</p>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="rounded-2xl h-56 animate-pulse border border-white/8" style={{ background: "#252848" }} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500">Žádné produkty nenalezeny.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filtered.map(p => (
              <Link
                key={p.id}
                to={`/produkt/${p.id}`}
                className="rounded-2xl border border-white/8 hover:border-blue-600/50 hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col overflow-hidden group"
                style={{ background: "#252848" }}
              >
                <div className="aspect-square bg-white/5 flex items-center justify-center overflow-hidden">
                  {p.image_url ? (
                    <img
                      src={p.image_url}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-blue-900/40 flex items-center justify-center">
                      <Tag className="w-7 h-7 text-blue-500" />
                    </div>
                  )}
                </div>
                <div className="p-3 flex flex-col flex-1">
                  <p className="text-xs text-blue-400 font-semibold mb-1">Kat. {p.category_id}</p>
                  <h3 className="text-sm font-bold text-white leading-tight line-clamp-2 flex-1">{p.name}</h3>
                  <div className="mt-2 flex items-center justify-between gap-1">
                    {p.price
                      ? <span className="text-xs font-bold text-orange-400">od {p.price} Kč</span>
                      : <span className="text-xs text-gray-500">na poptávku</span>
                    }
                    {p.verification_option ? (
                      <span className="rounded text-[9px] font-black flex items-center justify-center shrink-0 px-1.5 py-0.5"
                        style={{ background: "#ea580c", color: "#fff" }}>možnost ověření</span>
                    ) : p.certified ? (
                      <span className="rounded text-[9px] font-black flex items-center justify-center shrink-0 px-1.5 py-0.5"
                        style={{ background: "#16a34a", color: "#fff" }}>Ověřeno</span>
                    ) : null}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
