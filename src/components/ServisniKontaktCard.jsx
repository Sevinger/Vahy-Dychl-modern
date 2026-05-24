import { Phone, Mail, Clock, MapPin, Scale } from "lucide-react";

export default function ServisniKontaktCard({ large = false }) {
  return (
    <div
      className={`rounded-2xl text-center ${large ? "p-12" : "p-8 max-w-lg mx-auto"}`}
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}
    >
      <Scale
        className={`mx-auto mb-4 ${large ? "w-16 h-16" : "w-10 h-10"}`}
        style={{ color: "#38bdf8" }}
      />
      <h3 className={`font-black mb-5 ${large ? "text-3xl" : "text-xl"}`} style={{ color: "#f1f5f9" }}>
        Servisní kontakt
      </h3>
      <div className="space-y-3">
        <a
          href="tel:+420775698555"
          className={`flex items-center justify-center gap-2 font-semibold hover:opacity-70 transition-opacity ${large ? "text-lg" : ""}`}
          style={{ color: "#e2e8f0" }}
        >
          <Phone className={large ? "w-5 h-5" : "w-4 h-4"} style={{ color: "#38bdf8" }} />
          +420 775 698 555
        </a>
        <a
          href="mailto:servisdychl@seznam.cz"
          className={`flex items-center justify-center gap-2 hover:opacity-70 transition-opacity ${large ? "text-base" : ""}`}
          style={{ color: "#e2e8f0" }}
        >
          <Mail className={large ? "w-5 h-5" : "w-4 h-4"} style={{ color: "#38bdf8" }} />
          servisdychl@seznam.cz
        </a>
        <div className="flex items-center justify-center gap-2" style={{ color: "#94a3b8" }}>
          <Clock className={large ? "w-5 h-5" : "w-4 h-4"} style={{ color: "#38bdf8" }} />
          Po–Pá: dle domluvy
        </div>
        <div className="flex items-center justify-center gap-2" style={{ color: "#94a3b8" }}>
          <MapPin className={large ? "w-5 h-5" : "w-4 h-4"} style={{ color: "#38bdf8" }} />
          Kocourkova 3, 787 01 Šumperk
        </div>
      </div>
    </div>
  );
}
