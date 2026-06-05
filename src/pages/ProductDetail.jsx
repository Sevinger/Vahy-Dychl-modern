import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/api/supabaseClient";
import { ArrowLeft, Phone, Mail, Tag, Info } from "lucide-react";
import DOMPurify from "dompurify";

const CAT_NAMES = {
  A: "Laboratorní & analytické", B: "Obchodní bez tisku", C: "Obchodní s tiskem",
  D: "Kuchyňské & skladové", E: "Počítací", F: "Jeřábové",
  G: "Můstkové & plošinové", H: "Paletové", I: "Silniční mostové",
  J: "Zdravotnické", K: "Indikátory", L: "EET / Registrační pokladny"
};

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("products").select("*").eq("id", id).single()
      .then(({ data }) => { setProduct(data || null); setLoading(false); });
  }, [id]);

  useEffect(() => {
    if (!product?.description) return;
    document.querySelectorAll(".product-description table").forEach(table => {
      if (table.parentElement.classList.contains("table-wrap")) return;
      const wrap = document.createElement("div");
      wrap.className = "table-wrap";
      table.parentNode.insertBefore(wrap, table);
      wrap.appendChild(table);
    });
  }, [product]);

  let variants = null;
  if (product?.variants_json) {
    try { variants = JSON.parse(product.variants_json); } catch {}
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#1c1f3e" }}>
      <div className="w-8 h-8 border-4 rounded-full animate-spin" style={{ borderColor: "rgba(255,255,255,0.1)", borderTopColor: "#38bdf8" }} />
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: "#1c1f3e" }}>
      <p style={{ color: "#94a3b8" }}>Produkt nenalezen.</p>
      <Link to="/katalog" className="font-semibold underline hover:opacity-70" style={{ color: "#38bdf8" }}>← Zpět do katalogu</Link>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ background: "#1c1f3e" }}>
      <header className="sticky top-0 z-40" style={{
        background: "rgba(16,28,65,0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.09)",
      }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-3">
          <Link to={`/katalog?cat=${product.category_id}`}
            className="flex items-center gap-2 font-semibold text-sm hover:opacity-70"
            style={{ color: "#38bdf8" }}>
            <ArrowLeft className="w-4 h-4" /> Katalog
          </Link>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
          <span className="text-sm truncate" style={{ color: "#94a3b8" }}>{product.name}</span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>
          <div className="grid md:grid-cols-2 gap-0">
            <div className="flex items-center justify-center p-8 min-h-72" style={{ background: "rgba(255,255,255,0.02)", borderRight: "1px solid rgba(255,255,255,0.09)" }}>
              {product.image_url ? (
                <img src={product.image_url} alt={product.name} className="max-h-64 w-full object-contain" />
              ) : (
                <div className="w-32 h-32 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <Tag className="w-12 h-12" style={{ color: "rgba(255,255,255,0.15)" }} />
                </div>
              )}
            </div>
            <div className="p-8 flex flex-col">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #2563eb, #4f46e5)" }}>
                  {CAT_NAMES[product.category_id] || product.category_id}
                </span>
                {product.certified && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold text-white" style={{ background: "#16a34a" }}>
                    Ověřeno
                  </span>
                )}
                {product.verification_option && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold text-white" style={{ background: "#ea580c" }}>
                    Možnost ověření
                  </span>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-black mb-3" style={{ color: "#f1f5f9" }}>{product.name}</h1>
              <div className="mb-6">
                {product.inquiry_only || !product.price ? (
                  <div className="flex items-center gap-2" style={{ color: "#94a3b8" }}>
                    <Info className="w-4 h-4" /><span className="text-sm">Cena na poptávku</span>
                  </div>
                ) : (
                  <div>
                    <span className="text-xs uppercase tracking-wide" style={{ color: "#94a3b8" }}>Cena od</span>
                    <div className="text-3xl font-black" style={{ color: "#38bdf8" }}>{product.price} <span className="text-base font-normal" style={{ color: "#94a3b8" }}>Kč bez DPH</span></div>
                  </div>
                )}
              </div>
              <div className="mt-auto space-y-3">
                <Link
                  to={`/poptavka?produkt=${encodeURIComponent(product.name)}`}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-white transition-opacity hover:opacity-80"
                  style={{ background: "linear-gradient(135deg, #2563eb, #4f46e5)", boxShadow: "0 4px 16px rgba(37,99,235,0.3)" }}>
                  <Mail className="w-4 h-4" /> Nezávazná poptávka
                </Link>
                <a href="tel:+420775698555"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold transition-opacity hover:opacity-80"
                  style={{ border: "1px solid rgba(255,255,255,0.12)", color: "#f1f5f9", background: "rgba(255,255,255,0.04)" }}>
                  <Phone className="w-4 h-4" /> +420 775 698 555
                </a>
              </div>
            </div>
          </div>

          {/* HTML description from ReactQuill */}
          {product.description && (
            <div className="p-8" style={{ borderTop: "1px solid rgba(255,255,255,0.09)" }}>
              <h2 className="text-lg font-black mb-4" style={{ color: "#f1f5f9" }}>Popis produktu</h2>
              <div className="text-sm leading-relaxed product-description"
                style={{ color: "#cbd5e1" }}
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }} />
            </div>
          )}

          {/* Variants table */}
          {variants && Array.isArray(variants) && variants.length > 0 && (
            <div className="p-8" style={{ borderTop: "1px solid rgba(255,255,255,0.09)" }}>
              <h2 className="text-lg font-black mb-4" style={{ color: "#f1f5f9" }}>Varianty a parametry</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr style={{ background: "rgba(56,189,248,0.08)" }}>
                      {Object.keys(variants[0]).map(key => (
                        <th key={key} className="text-left px-4 py-2.5 font-bold" style={{ border: "1px solid rgba(255,255,255,0.09)", color: "#38bdf8" }}>{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {variants.map((row, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.01)" }}>
                        {Object.values(row).map((val, j) => (
                          <td key={j} className="px-4 py-2.5" style={{ border: "1px solid rgba(255,255,255,0.09)", color: "#cbd5e1" }}>{val}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .product-description { color: #cbd5e1; }
        .product-description h2, .product-description h3 { font-weight: 700; margin: 1em 0 0.5em; color: #f1f5f9; }
        .product-description h4, .product-description h5 { font-weight: 700; margin: 0.8em 0 0.4em; color: #e2e8f0; }
        .product-description p { margin: 0.5em 0; color: #cbd5e1; }
        .product-description ul, .product-description ol { padding-left: 1.5em; margin: 0.5em 0; color: #cbd5e1; }
        .product-description li { margin: 0.25em 0; }
        .product-description strong, .product-description b { font-weight: 700; color: #e2e8f0; }
        .product-description a { color: #38bdf8; text-decoration: underline; }
        .product-description table { border-collapse: collapse; width: 100%; margin: 1em 0; min-width: 400px; }
        .product-description td, .product-description th { border: 1px solid rgba(255,255,255,0.09); padding: 6px 12px; white-space: nowrap; color: #cbd5e1; }
        .product-description th { background: rgba(56,189,248,0.08); font-weight: 700; color: #38bdf8; }
        .product-description tr:nth-child(even) td { background: rgba(255,255,255,0.02); }
        .product-description .table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
        .product-description span[style*="color"] { color: #cbd5e1 !important; }
        .product-description span[style*="background"] { background: transparent !important; }
      `}</style>
    </div>
  );
}
