import Header from "../components/Header";
import Footer from "../components/Footer";
import ServisniKontaktCard from "../components/ServisniKontaktCard";
import { Wrench, FileCheck, Phone, MapPin } from "lucide-react";

const SERVICES = [
  "Úřední ověření vah (cejchování) ve spolupráci s ČMI",
  "Seřízení, přestavby a kalibrace vah",
  "Vyhotovení kalibračních listů měřidel",
  "Dodávky závaží IV. třídy obchodní i lékárenské",
  "Tenzometrické snímače a vyhodnocovací jednotky",
  "Speciální vážicí systémy na míru",
];

const CARDS = [
  { icon: FileCheck, title: "Úřední ověření", desc: "Certifikace dle ČMI" },
  { icon: Wrench, title: "Zkušení technici", desc: "Martin Dytrich a tým" },
  { icon: Phone, title: "Pohotovost", desc: "Po–Pá dle domluvy" },
  { icon: MapPin, title: "Celá ČR", desc: "Servis i montáž kdekoliv" },
];

export default function Servis() {
  return (
    <div className="min-h-screen" style={{ background: "#939393" }}>
      <Header />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-5 py-2 rounded-full text-sm font-black tracking-widest uppercase text-black mb-4"
              style={{ background: "#2563eb" }}>
              Servisní centrum – celá ČR
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-black mb-4">
              Servis & Kalibrace
            </h1>
            <p className="max-w-2xl mx-auto text-black">
              Komplexní servisní služby pro průmyslové, obchodní i přesné váhy všech značek.
              Úřední ověření ve spolupráci s Českým metrologickým institutem (ČMI).
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-12 mb-16">
            <div className="flex-1">
              <h2 className="text-2xl font-black text-black mb-5">Co nabízíme</h2>
              <ul className="space-y-3">
                {SERVICES.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-black">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ background: "#2563eb" }} />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="mailto:servisdychl@seznam.cz"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-black transition-opacity hover:opacity-80 mt-8"
                style={{ background: "#2563eb" }}>
                <Wrench className="w-4 h-4" />
                Objednat servis: servisdychl@seznam.cz
              </a>
            </div>

            <div className="flex-1">
              <div className="rounded-2xl p-8" style={{ background: "#a8a8a8", border: "1px solid #7a7a7a" }}>
                <div className="grid grid-cols-2 gap-6">
                  {CARDS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="flex flex-col gap-2">
                        <Icon className="w-6 h-6 text-black" />
                        <span className="font-bold text-black">{item.title}</span>
                        <p className="text-sm text-black">{item.desc}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 pt-6 flex items-center gap-3" style={{ borderTop: "1px solid #7a7a7a" }}>
                  <span className="font-semibold text-black">Otevírací doba:</span>
                  <span className="text-black">Po–Pá <strong>dle domluvy</strong></span>
                </div>
              </div>
            </div>
          </div>

          <ServisniKontaktCard />
        </div>
      </section>

      <Footer />
    </div>
  );
}
