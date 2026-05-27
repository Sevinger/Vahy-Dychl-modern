import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Scale } from "lucide-react";

const CONTACTS = [
  {
    icon: Phone,
    title: "Telefon",
    content: <a href="tel:+420775698555" className="text-base font-semibold transition-opacity hover:opacity-70" style={{ color: "#e2e8f0" }}>+420 775 698 555</a>
  },
  {
    icon: Mail,
    title: "E-mail",
    content: (
      <a href="mailto:servisdychl@seznam.cz" className="block text-sm transition-opacity hover:opacity-70" style={{ color: "#e2e8f0" }}>servisdychl@seznam.cz</a>
    )
  },
  {
    icon: MapPin,
    title: "Adresa",
    content: <span className="text-sm" style={{ color: "#cbd5e1" }}>Kocourkova 3, 787 01 Šumperk</span>
  },
  {
    icon: Scale,
    title: "Firemní údaje",
    content: (
      <>
        <div className="text-sm" style={{ color: "#cbd5e1" }}>IČ: 73235202</div>
        <div className="text-sm" style={{ color: "#cbd5e1" }}>DIČ: CZ7408305773</div>
      </>
    )
  },
  {
    icon: Clock,
    title: "Otevírací doba",
    content: <span className="text-sm" style={{ color: "#cbd5e1" }}>Po–Pá: dle domluvy</span>
  },
];

export default function ContactSection() {
  const [focused, setFocused] = useState(null);

  const inputStyle = (name) => ({
    background: "rgba(255,255,255,0.05)",
    border: `1px solid ${focused === name ? "#38bdf8" : "rgba(255,255,255,0.1)"}`,
    borderRadius: "6px",
    color: "#f1f5f9",
    width: "100%",
    padding: "10px 16px",
    fontSize: "14px",
    outline: "none",
  });

  return (
    <section id="kontakt" className="py-20" style={{ background: "#252848" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-widest" style={{ color: "#f1f5f9" }}>
            Jsme tu pro vás
          </h2>
          <p className="mt-2 text-sm" style={{ color: "#94a3b8" }}>Martin Dytrich – vedoucí servisu a prodeje</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            {CONTACTS.map(({ icon: Icon, title, content }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center shrink-0 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <Icon className="w-4 h-4" style={{ color: "#38bdf8" }} />
                </div>
                <div>
                  <div className="font-bold text-sm mb-0.5" style={{ color: "#94a3b8" }}>{title}</div>
                  {content}
                </div>
              </div>
            ))}
          </div>

          <form
            className="p-8 space-y-4 rounded-xl"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <h3 className="text-lg font-black uppercase tracking-widest mb-4" style={{ color: "#f1f5f9" }}>
              Nezávazná poptávka
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: "Jméno / Firma", type: "text", placeholder: "Vaše jméno nebo firma", name: "jmeno" },
                { label: "Telefon", type: "tel", placeholder: "+420 ...", name: "telefon" },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-semibold tracking-wide mb-1.5 uppercase" style={{ color: "#94a3b8" }}>{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    style={inputStyle(f.name)}
                    onFocus={() => setFocused(f.name)}
                    onBlur={() => setFocused(null)}
                  />
                </div>
              ))}
            </div>
            <div>
              <label className="block text-xs font-semibold tracking-wide mb-1.5 uppercase" style={{ color: "#94a3b8" }}>E-mail</label>
              <input
                type="email"
                placeholder="vas@email.cz"
                style={inputStyle("email")}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold tracking-wide mb-1.5 uppercase" style={{ color: "#94a3b8" }}>Zpráva / Poptávka</label>
              <textarea
                rows={4}
                placeholder="Popište co hledáte nebo co potřebujete opravit..."
                style={{ ...inputStyle("zprava"), resize: "none" }}
                onFocus={() => setFocused("zprava")}
                onBlur={() => setFocused(null)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 font-bold text-sm tracking-widest uppercase rounded-lg text-white transition-opacity hover:opacity-80"
              style={{ background: "linear-gradient(135deg, #2563eb, #4f46e5)" }}
            >
              Odeslat poptávku
            </button>
            <p className="text-xs text-center" style={{ color: "#64748b" }}>Odpovíme do 24 hodin · Působíme v celé České republice</p>
          </form>
        </div>
      </div>
    </section>
  );
}
