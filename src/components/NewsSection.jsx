import { useNavigate } from "react-router-dom";

const NEWS = [
  {
    name: "Obchodní váha ACLAS PS1-15B / 15PB",
    price: "od 3.790 Kč bez DPH",
    certified: true,
    imgs: ["https://new.vahy-dychl.cz/ACLAS15B/1.jpg", "https://new.vahy-dychl.cz/ACLAS15B/2.jpg"],
    search: "ACLAS PS1",
  },
  {
    name: "Paletová váha P4TLDFWL-UNI",
    price: "19.790 Kč bez DPH",
    certified: true,
    imgs: ["https://new.vahy-dychl.cz/P4TLDFWL/1.jpg", "https://new.vahy-dychl.cz/P4TLDFWL/2.jpg"],
    search: "P4TLDFWL",
  },
  {
    name: "Počítací váha KPZ",
    price: "od 4.240 Kč bez DPH",
    certified: false,
    imgs: ["https://new.vahy-dychl.cz/kpz2047.jpg"],
    search: "KPZ",
  },
];

export default function NewsSection() {
  const navigate = useNavigate();

  return (
    <section style={{ background: "#939393" }} className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-widest text-black">
            Aktuality
          </h2>
          <p className="mt-1 text-sm text-black">Novinky v nabídce</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {NEWS.map((item) => (
            <button key={item.name}
              onClick={() => navigate(`/katalog?search=${encodeURIComponent(item.search)}`)}
              className="text-left group transition-all hover:scale-[1.02] flex flex-col overflow-hidden"
              style={{ background: "#a8a8a8", border: "1px solid #7a7a7a", borderRadius: "10px" }}>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex gap-2 justify-center mb-4 min-h-[120px] items-center">
                  {item.imgs.map((src, i) => (
                    <img key={i} src={src} alt={item.name} className="max-h-28 object-contain flex-1 group-hover:scale-105 transition-transform" />
                  ))}
                </div>
                <div className="flex items-start gap-2 mb-2" style={{ borderTop: "1px solid #7a7a7a", paddingTop: "12px" }}>
                  <span className="font-bold text-sm leading-tight flex-1 text-black">{item.name}</span>
                  {item.certified && (
                    <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded text-xs font-black text-white"
                      style={{ background: "#16a34a" }}>M</span>
                  )}
                </div>
                <span className="font-black text-base text-black">{item.price}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}