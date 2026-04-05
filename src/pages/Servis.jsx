import Header from "../components/Header";
import Footer from "../components/Footer";
import { Phone, Mail, MapPin, Clock, Wrench, FileCheck, Scale } from "lucide-react";

const SERVICES = [
  "Úřední ověření vah (cejchování) — ČMI",
  "Seřízení, přestavby a kalibrace vah",
  "Vyhotovení kalibračních listů měřidel",
  "Dodávky závaží IV. třídy obchodní i lékárenské",
  "Tenzometrické snímače a vyhodnocovací jednotky",
  "Speciální vážicí systémy na míru",
];

const CARDS = [
  { icon: FileCheck, title: "Úřední ověření", desc: "Certifikace dle ČMI" },
  { icon: Wrench, title: "Zkušení technici", desc: "Martin Dytrich a tým" },
  { icon: Phone, title: "Pohotovost", desc: "Po–Pá 7:00–17:00" },
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

            <div className="flex-1 grid grid-cols-2 gap-4">
              {CARDS.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="p-5 rounded-2xl" style={{ background: "#a8a8a8", border: "1px solid #7a7a7a" }}>
                    <Icon className="w-7 h-7 mb-3 text-black" />
                    <div className="font-bold text-black">{item.title}</div>
                    <div className="text-sm mt-1 text-black">{item.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-8 rounded-2xl max-w-lg mx-auto text-center" style={{ background: "#a8a8a8", border: "1px solid #7a7a7a" }}>
            <Scale className="w-10 h-10 mx-auto mb-4" style={{ color: "#2563eb" }} />
            <h3 className="text-xl font-black text-black mb-5">Servisní kontakt</h3>
            <div className="space-y-3">
              <a href="tel:+420775698555" className="flex items-center justify-center gap-2 font-semibold text-black hover:opacity-70 transition-opacity">
                <Phone className="w-4 h-4" /> +420 775 698 555
              </a>
              <a href="mailto:servisdychl@seznam.cz" className="flex items-center justify-center gap-2 text-black hover:opacity-70 transition-opacity">
                <Mail className="w-4 h-4" /> servisdychl@seznam.cz
              </a>
              <div className="flex items-center justify-center gap-2 text-black">
                <Clock className="w-4 h-4" /> Po–Pá: 7:00 – 17:00
              </div>
              <div className="flex items-center justify-center gap-2 text-black">
                <MapPin className="w-4 h-4" /> Kocourkova 3, 787 01 Šumperk
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}