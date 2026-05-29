import { useNavigate } from "react-router-dom";

const PRODUCTS = [
  {
    name: "Plošinová váha do 1500kg",
    img: "https://new.vahy-dychl.cz/4TxxxxDFWL/image005.jpg",
    price: "od 14.990 Kč bez DPH",
    search: "Plošinová",
  },
  {
    name: "Paletový vozík s váhou PV4TYCS",
    img: "/produkty/pv4tycs/1.jpg",
    price: "od 12.100 Kč bez DPH",
    search: "PV4TYCS",
  },
  {
    name: "Můstková váha E-M",
    img: "https://new.vahy-dychl.cz/DWVL/2.jpg",
    price: "od 3.490 Kč bez DPH",
    search: "Můstková",
  },
];

export default function BestsellerSection() {
  const navigate = useNavigate();

  return (
    <section className="py-16" style={{ background: "#6b6b6b" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-3">
            Nejprodávanější
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-blue-900">
            Nejprodávanější váhy
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {PRODUCTS.map((p) => (
            <button
              key={p.name}
              onClick={() => navigate(`/katalog?search=${encodeURIComponent(p.search)}`)}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all text-left group"
            >
              {/* Blue gradient header strip */}
              <div
                style={{
                  background: "linear-gradient(90deg, #1e3a8a 0%, #2563eb 100%)",
                }}
                className="px-4 py-3"
              >
                <span className="text-white font-bold text-sm">{p.name}</span>
              </div>
              <div className="p-4 flex flex-col items-center">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full max-h-44 object-contain mb-3"
                />
                <p className="text-sm font-bold text-red-600 text-center">{p.price}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}