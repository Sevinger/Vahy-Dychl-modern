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
  const [selectedCat, setSelectedCat] = useState(() => new URLSearchParams(window.location.search).get("cat") || "all");
  const navigate = useNavigate();

  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get("search");
    if (s) setSearch(s);
  }, []);

  useEffect(() => {
    supabase.from("products").select("*").eq("active", true).order("created_at", { ascending: false })
      .then(({ data }) => { setProducts(data || []); setLoading(false); });
  }, []);

  const filtered = products.filter(p => {
    const matchCat = selectedCat === "all" || p.category_id === selectedCat;
    const q = search.toLowerCase();
    const matchSearch = !q || p.name.toLowerCase().includes(q) || (p.description || "").toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const handleCatChange = (id) => {
    setSelectedCat(id);
    navigate(`/katalog${id !== "all" ? `?cat=${id}` : ""}`, { replace: true });
  };

  return (
    <div className="min-h-screen" style={{ background: "#939393" }}>
      <header className="sticky top-0 z-40" style={{ background: "#939393", borderBottom: "1px solid #7a7a7a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 font-semibold text-sm text-black hover:opacity-70">
            <ArrowLeft className="w-4 h-4" /> Zpět
          </Link>
          <div className="flex-1"><h1 className="text-lg font-black text-black">Katalog vah</h1></div>
          <div className="relative hidden md:block w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Hledat produkt..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ background: "#a8a8a8", borderColor: "#7a7a7a", color: "#000" }} />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6">
          {CATEGORIES.map(c => (
            <button key={c.id} onClick={() => handleCatChange(c.id)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${selectedCat === c.id ? "bg-blue-600 text-white border-transparent" : "text-black border-black/20 hover:border-blue-400"}`}
              style={{ background: selectedCat === c.id ? undefined : "#a8a8a8" }}>
              {c.label}
            </button>
          ))}
        </div>

        <p className="text-sm text-black/60 mb-4">{filtered.length} produktů</p>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="rounded-2xl h-56 animate-pulse" style={{ background: "#a8a8a8", border: "1px solid #7a7a7a" }} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-black/50">Žádné produkty nenalezeny.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filtered.map(p => (
              <Link key={p.id} to={`/produkt/${p.id}`}
                className="rounded-2xl border hover:shadow-md hover:-translate-y-1 transition-all flex flex-col overflow-hidden group"
                style={{ background: "#a8a8a8", borderColor: "#7a7a7a" }}>
                <div className="aspect-square flex items-center justify-center overflow-hidden" style={{ background: "#878787" }}>
                  {p.image_url ? (
                    <img src={p.image_url} alt={p.name} className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform" />
                  ) : (
                    <Tag className="w-10 h-10 text-black/20" />
                  )}
                </div>
                <div className="p-3 flex flex-col flex-1">
                  <p className="text-xs text-blue-600 font-semibold mb-1">Kat. {p.category_id}</p>
                  <h3 className="text-sm font-bold text-black leading-tight line-clamp-2 flex-1">{p.name}</h3>
                  <div className="mt-2 flex items-center justify-between gap-1">
                    {p.price ? <span className="text-xs font-bold text-blue-700">od {p.price} Kč</span>
                      : <span className="text-xs text-black/40">na poptávku</span>}
                    {p.certified && <CheckCircle className="w-3.5 h-3.5 text-green-600 shrink-0" />}
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
