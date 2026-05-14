import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/api/supabaseClient";
import { ArrowLeft, Phone, Mail, Tag, Info } from "lucide-react";

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
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#939393" }}>
      <div className="w-8 h-8 border-4 rounded-full animate-spin" style={{ borderColor: "#7a7a7a", borderTopColor: "#2563eb" }} />
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: "#939393" }}>
      <p className="text-black">Produkt nenalezen.</p>
      <Link to="/katalog" className="font-semibold text-black underline hover:opacity-70">← Zpět do katalogu</Link>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ background: "#939393" }}>
      <header className="sticky top-0 z-40" style={{ background: "#939393", borderBottom: "1px solid #7a7a7a" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-3">
          <Link to={`/katalog?cat=${product.category_id}`}
            className="flex items-center gap-2 font-semibold text-sm text-black hover:opacity-70">
            <ArrowLeft className="w-4 h-4" /> Katalog
          </Link>
          <span className="text-black/40">/</span>
          <span className="text-sm truncate text-black">{product.name}</span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-2xl overflow-hidden" style={{ background: "#a8a8a8", border: "1px solid #7a7a7a" }}>
          <div className="grid md:grid-cols-2 gap-0">
            <div className="flex items-center justify-center p-8 min-h-72" style={{ background: "#878787" }}>
              {product.image_url ? (
                <img src={product.image_url} alt={product.name} className="max-h-64 w-full object-contain" />
              ) : (
                <div className="w-32 h-32 rounded-full flex items-center justify-center" style={{ background: "#9e9e9e" }}>
                  <Tag className="w-12 h-12 text-black/20" />
                </div>
              )}
            </div>
            <div className="p-8 flex flex-col">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: "#2563eb" }}>
                  {CAT_NAMES[product.category_id] || product.category_id}
                </span>
                {product.certified && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold text-white" style={{ background: "#16a34a" }}>
                    Ověřeno
                  </span>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-black mb-3">{product.name}</h1>
              <div className="mb-6">
                {product.inquiry_only || !product.price ? (
                  <div className="flex items-center gap-2 text-black">
                    <Info className="w-4 h-4" /><span className="text-sm">Cena na poptávku</span>
                  </div>
                ) : (
                  <div>
                    <span className="text-xs uppercase tracking-wide text-black">Cena od</span>
                    <div className="text-3xl font-black text-black">{product.price} <span className="text-base font-normal">Kč bez DPH</span></div>
                  </div>
                )}
              </div>
              <div className="mt-auto space-y-3">
                <a href={`mailto:servisdychl@seznam.cz?subject=Poptávka: ${product.name}`}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-white transition-opacity hover:opacity-80"
                  style={{ background: "#2563eb" }}>
                  <Mail className="w-4 h-4" /> Nezávazná poptávka
                </a>
                <a href="tel:+420775698555"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-black transition-opacity hover:opacity-80"
                  style={{ border: "1px solid #7a7a7a" }}>
                  <Phone className="w-4 h-4" /> +420 775 698 555
                </a>
              </div>
            </div>
          </div>

          {/* HTML description from ReactQuill */}
          {product.description && (
            <div className="p-8" style={{ borderTop: "1px solid #7a7a7a" }}>
              <h2 className="text-lg font-black text-black mb-4">Popis produktu</h2>
              <div className="text-sm leading-relaxed text-black product-description"
                dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
          )}

          {/* Variants table */}
          {variants && Array.isArray(variants) && variants.length > 0 && (
            <div className="p-8" style={{ borderTop: "1px solid #7a7a7a" }}>
              <h2 className="text-lg font-black text-black mb-4">Varianty a parametry</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr style={{ background: "#878787" }}>
                      {Object.keys(variants[0]).map(key => (
                        <th key={key} className="text-left px-4 py-2.5 font-bold text-black" style={{ border: "1px solid #7a7a7a" }}>{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {variants.map((row, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? "#a8a8a8" : "#9e9e9e" }}>
                        {Object.values(row).map((val, j) => (
                          <td key={j} className="px-4 py-2.5 text-black" style={{ border: "1px solid #7a7a7a" }}>{val}</td>
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
        .product-description h2, .product-description h3 { font-weight: 700; margin: 1em 0 0.5em; }
        .product-description ul, .product-description ol { padding-left: 1.5em; margin: 0.5em 0; }
        .product-description li { margin: 0.25em 0; }
        .product-description table { border-collapse: collapse; width: 100%; margin: 1em 0; min-width: 400px; }
        .product-description td, .product-description th { border: 1px solid #7a7a7a; padding: 6px 12px; white-space: nowrap; }
        .product-description th { background: #878787; font-weight: 700; }
        .product-description .table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
        .product-description p { margin: 0.5em 0; }
        .product-description strong, .product-description b { font-weight: 700; }
      `}</style>
    </div>
  );
}
