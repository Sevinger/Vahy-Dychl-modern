import { Phone, Mail, MapPin, Clock, Scale } from "lucide-react";

const CONTACTS = [
  {
    icon: Phone,
    title: "Telefon",
    content: <a href="tel:+420775698555" className="text-base font-semibold hover:opacity-70 transition-opacity text-black">+420 775 698 555</a>
  },
  {
    icon: Mail,
    title: "E-mail",
    content: (
      <a href="mailto:servisdychl@seznam.cz" className="block text-sm hover:opacity-70 transition-opacity text-black">servisdychl@seznam.cz</a>
    )
  },
  {
    icon: MapPin,
    title: "Adresa",
    content: <span className="text-sm text-black">Kocourkova 3, 787 01 Šumperk</span>
  },
  {
    icon: Scale,
    title: "Firemní údaje",
    content: (
      <>
        <div className="text-sm text-black">IČ: 73235202</div>
        <div className="text-sm text-black">DIČ: CZ7408305773</div>
      </>
    )
  },
  {
    icon: Clock,
    title: "Otevírací doba",
    content: <span className="text-sm text-black">Po–Pá: 7:00 – 17:00</span>
  },
];

export default function ContactSection() {
  return (
    <section id="kontakt" style={{ background: "#878787" }} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-widest text-black">
            Jsme tu pro vás
          </h2>
          <p className="mt-2 text-sm text-black">Martin Dytrich – vedoucí servisu a prodeje</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            {CONTACTS.map(({ icon: Icon, title, content }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center shrink-0 rounded-lg"
                  style={{ background: "#9e9e9e", border: "1px solid #7a7a7a" }}>
                  <Icon className="w-4 h-4 text-black" />
                </div>
                <div>
                  <div className="font-bold text-sm mb-0.5 text-black">{title}</div>
                  {content}
                </div>
              </div>
            ))}
          </div>

          <form className="p-8 space-y-4 rounded-xl" style={{ background: "#a8a8a8", border: "1px solid #7a7a7a" }}>
            <h3 className="text-lg font-black uppercase tracking-widest mb-4 text-black">
              Nezávazná poptávka
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: "Jméno / Firma", type: "text", placeholder: "Vaše jméno nebo firma" },
                { label: "Telefon", type: "tel", placeholder: "+420 ..." },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-semibold tracking-wide mb-1.5 uppercase text-black">{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder}
                    className="w-full px-4 py-2.5 text-sm focus:outline-none text-black placeholder-black/50 rounded-md"
                    style={{ background: "#878787", border: "1px solid #7a7a7a" }}
                    onFocus={e => e.target.style.borderColor = "#2563eb"}
                    onBlur={e => e.target.style.borderColor = "#7a7a7a"} />
                </div>
              ))}
            </div>
            <div>
              <label className="block text-xs font-semibold tracking-wide mb-1.5 uppercase text-black">E-mail</label>
              <input type="email" placeholder="vas@email.cz"
                className="w-full px-4 py-2.5 text-sm focus:outline-none text-black placeholder-black/50 rounded-md"
                style={{ background: "#878787", border: "1px solid #7a7a7a" }}
                onFocus={e => e.target.style.borderColor = "#2563eb"}
                onBlur={e => e.target.style.borderColor = "#7a7a7a"} />
            </div>
            <div>
              <label className="block text-xs font-semibold tracking-wide mb-1.5 uppercase text-black">Zpráva / Poptávka</label>
              <textarea rows={4} placeholder="Popište co hledáte nebo co potřebujete opravit..."
                className="w-full px-4 py-2.5 text-sm focus:outline-none resize-none text-black placeholder-black/50 rounded-md"
                style={{ background: "#878787", border: "1px solid #7a7a7a" }}
                onFocus={e => e.target.style.borderColor = "#2563eb"}
                onBlur={e => e.target.style.borderColor = "#7a7a7a"} />
            </div>
            <button type="submit"
              className="w-full py-3 font-bold text-sm tracking-widest uppercase rounded-lg text-black transition-opacity hover:opacity-80"
              style={{ background: "#2563eb" }}>
              Odeslat poptávku
            </button>
            <p className="text-xs text-center text-black">Odpovíme do 24 hodin · Působíme v celé České republice</p>
          </form>
        </div>
      </div>
    </section>
  );
}