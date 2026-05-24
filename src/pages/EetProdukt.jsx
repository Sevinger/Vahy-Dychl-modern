import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Phone, Mail, Info } from "lucide-react";

const EET_PRODUCTS = [
  {
    slug: "chd-3050",
    name: "CHD 3050",
    category: "EET – Registrační pokladny",
    image: "https://new.vahy-dychl.cz/CHD30501.gif",
    image2: "https://new.vahy-dychl.cz/CHD30502.gif",
    price: "od 6 690 Kč bez DPH (bez zásuvky)",
    inquiry_only: false,
    description: "Pro malé prodejny. Připravena pro EET, bez měsíčních poplatků. Jednopásková, tisk grafického loga. UV detektor pravosti bankovek. Možnost provozu na akumulátor.",
  },
  {
    slug: "chd-3850",
    name: "CHD 3850",
    category: "EET – Registrační pokladny",
    image: "https://new.vahy-dychl.cz/CHD38501.png",
    image2: "https://new.vahy-dychl.cz/CHD38502.png",
    price: "od 6 890 Kč bez DPH (bez zásuvky)",
    inquiry_only: false,
    description: "Pro menší prodejny, potraviny, bistra a bufety. Připravena pro EET, bez měsíčních poplatků. Jednopásková se střihačem, tisk grafického loga. Elektronický žurnál na SD kartu.",
  },
  {
    slug: "ms-5145-eclipse",
    name: "MS-5145 ECLIPSE",
    category: "Snímače čárového kódu",
    image: "https://www.vahy-dychl.cz/userFiles/snimace/1001.jpg",
    price: null,
    inquiry_only: true,
    description: "Jednopaprskový laserový ruční snímač. Patentované tlačítko CodeGate pro inteligentní výběr kódu. Hloubka pole 0–140 mm, rychlost 72 sejmutí/s.",
  },
  {
    slug: "ms-9520-voyager",
    name: "MS-9520 VOYAGER",
    category: "Snímače čárového kódu",
    image: "https://www.vahy-dychl.cz/userFiles/snimace/1002.jpg",
    price: null,
    inquiry_only: true,
    description: "Jednopaprskový laserový snímač – ruční i stacionární použití. Snímá i 2D kódy RSS-14. Hloubka pole 0–203 mm, rychlost 72 sejmutí/s.",
  },
  {
    slug: "ms-9533-voyager-bt",
    name: "MS-9533 VOYAGER BT",
    category: "Snímače čárového kódu",
    image: "https://www.vahy-dychl.cz/userFiles/snimace/1003.jpg",
    price: null,
    inquiry_only: true,
    description: "Bezdrátový Bluetooth snímač. Dosah až 10 m od stojanu, až 14 000 sejmutí na jedno nabití. Tlačítko CodeGate. Snímá i 2D kódy RSS-14.",
  },
  {
    slug: "ms-9540-voyager-cg",
    name: "MS-9540 VOYAGER CG",
    category: "Snímače čárového kódu",
    image: "https://www.vahy-dychl.cz/userFiles/snimace/1004.jpg",
    price: null,
    inquiry_only: true,
    description: "Laserový ruční snímač řady Voyager s funkcí CodeGate. Spolehlivý výběr jednotlivých položek ze seznamu čárových kódů.",
  },
  {
    slug: "ms-6720",
    name: "MS-6720",
    category: "Snímače čárového kódu",
    image: "https://www.vahy-dychl.cz/userFiles/snimace/1005.jpg",
    price: null,
    inquiry_only: true,
    description: "Kompaktní laserový snímač čárového kódu. Robustní konstrukce vhodná pro každodenní provoz v obchodě nebo na pokladně.",
  },
  {
    slug: "ms-7120-orbit",
    name: "MS-7120 ORBIT",
    category: "Snímače čárového kódu",
    image: "https://www.vahy-dychl.cz/userFiles/snimace/1006.jpg",
    price: null,
    inquiry_only: true,
    description: "Všesměrový stolní snímač čárového kódu. Automatické snímání bez zmáčknutí tlačítka. Vhodný jako stacionární snímač u pokladny.",
  },
  {
    slug: "ms-7620-horizont",
    name: "MS-7620 / 7625 HORIZONT",
    category: "Snímače čárového kódu",
    image: "https://www.vahy-dychl.cz/userFiles/snimace/1007.jpg",
    price: null,
    inquiry_only: true,
    description: "Výkonný všesměrový snímač pro intenzivní provoz. Horizontální design pro pohodlné snímání zboží. Vhodný pro větší obchody a supermarkety.",
  },
];

export default function EetProdukt() {
  const { slug } = useParams();
  const product = EET_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: "#0b1120" }}>
        <p style={{ color: "#94a3b8" }}>Produkt nenalezen.</p>
        <Link to="/" className="font-semibold underline hover:opacity-70" style={{ color: "#38bdf8" }}>
          ← Zpět na úvodní stránku
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#0b1120" }}>
      <header className="sticky top-0 z-40" style={{
        background: "rgba(16,28,65,0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.09)",
      }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 font-semibold text-sm hover:opacity-70"
            style={{ color: "#38bdf8" }}
          >
            <ArrowLeft className="w-4 h-4" /> Zpět
          </Link>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
          <span className="text-sm truncate" style={{ color: "#94a3b8" }}>{product.name}</span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>
          <div className="grid md:grid-cols-2 gap-0">
            <div className="flex items-center justify-center p-8 min-h-72" style={{ background: "rgba(255,255,255,0.02)", borderRight: "1px solid rgba(255,255,255,0.09)" }}>
              <img
                src={product.image}
                alt={product.name}
                className="max-h-64 w-full object-contain"
              />
            </div>
            <div className="p-8 flex flex-col">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #2563eb, #4f46e5)" }}
                >
                  {product.category}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black mb-3" style={{ color: "#f1f5f9" }}>{product.name}</h1>
              <div className="mb-6">
                {product.inquiry_only || !product.price ? (
                  <div className="flex items-center gap-2" style={{ color: "#94a3b8" }}>
                    <Info className="w-4 h-4" />
                    <span className="text-sm">Cena na poptávku</span>
                  </div>
                ) : (
                  <div>
                    <span className="text-xs uppercase tracking-wide" style={{ color: "#94a3b8" }}>Cena</span>
                    <div className="text-2xl font-black" style={{ color: "#38bdf8" }}>{product.price}</div>
                  </div>
                )}
              </div>
              <div className="mt-auto space-y-3">
                <a
                  href={`mailto:servisdychl@seznam.cz?subject=Poptávka: ${product.name}`}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-white transition-opacity hover:opacity-80"
                  style={{ background: "linear-gradient(135deg, #2563eb, #4f46e5)", boxShadow: "0 4px 16px rgba(37,99,235,0.3)" }}
                >
                  <Mail className="w-4 h-4" /> Nezávazná poptávka
                </a>
                <a
                  href="tel:+420775698555"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold transition-opacity hover:opacity-80"
                  style={{ border: "1px solid rgba(255,255,255,0.12)", color: "#f1f5f9", background: "rgba(255,255,255,0.04)" }}
                >
                  <Phone className="w-4 h-4" /> +420 775 698 555
                </a>
              </div>
            </div>
          </div>

          <div className="p-8" style={{ borderTop: "1px solid rgba(255,255,255,0.09)" }}>
            <h2 className="text-lg font-black mb-4" style={{ color: "#f1f5f9" }}>Popis produktu</h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#cbd5e1" }}>{product.description}</p>
            <p className="text-sm italic" style={{ color: "#64748b" }}>Podrobný popis bude doplněn.</p>
          </div>

          {product.image2 && (
            <div className="p-8 flex justify-center" style={{ borderTop: "1px solid rgba(255,255,255,0.09)" }}>
              <img
                src={product.image2}
                alt={`${product.name} – detail`}
                className="max-h-64 object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
