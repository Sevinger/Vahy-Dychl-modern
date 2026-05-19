import { Phone, Mail, Clock, MapPin, Scale } from "lucide-react";

export default function ServisniKontaktCard({ large = false }) {
  return (
    <div
      className={`rounded-2xl text-center ${large ? "p-12" : "p-8 max-w-lg mx-auto"}`}
      style={{ background: "#a8a8a8", border: "1px solid #7a7a7a" }}
    >
      <Scale
        className={`mx-auto mb-4 ${large ? "w-16 h-16" : "w-10 h-10"}`}
        style={{ color: "#2563eb" }}
      />
      <h3 className={`font-black text-black mb-5 ${large ? "text-3xl" : "text-xl"}`}>
        Servisní kontakt
      </h3>
      <div className="space-y-3">
        <a
          href="tel:+420775698555"
          className={`flex items-center justify-center gap-2 font-semibold text-black hover:opacity-70 transition-opacity ${large ? "text-lg" : ""}`}
        >
          <Phone className={large ? "w-5 h-5" : "w-4 h-4"} /> +420 775 698 555
        </a>
        <a
          href="mailto:servisdychl@seznam.cz"
          className={`flex items-center justify-center gap-2 text-black hover:opacity-70 transition-opacity ${large ? "text-base" : ""}`}
        >
          <Mail className={large ? "w-5 h-5" : "w-4 h-4"} /> servisdychl@seznam.cz
        </a>
        <div className="flex items-center justify-center gap-2 text-black">
          <Clock className={large ? "w-5 h-5" : "w-4 h-4"} /> Po–Pá: dle domluvy
        </div>
        <div className="flex items-center justify-center gap-2 text-black">
          <MapPin className={large ? "w-5 h-5" : "w-4 h-4"} /> Kocourkova 3, 787 01 Šumperk
        </div>
      </div>
    </div>
  );
}
