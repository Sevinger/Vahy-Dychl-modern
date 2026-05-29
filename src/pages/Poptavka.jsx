import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react";

export default function Poptavka() {
  const [searchParams] = useSearchParams();
  const productName = searchParams.get("produkt") || "";

  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          message: form.message,
          product: productName,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4" style={{ background: "#1c1f3e" }}>
        <CheckCircle className="w-16 h-16" style={{ color: "#22c55e" }} />
        <h1 className="text-2xl font-black text-center" style={{ color: "#f1f5f9" }}>Poptávka odeslána!</h1>
        <p className="text-center text-sm" style={{ color: "#94a3b8" }}>Odpovíme do 24 hodin.</p>
        <Link to="/katalog" className="font-semibold hover:opacity-70" style={{ color: "#38bdf8" }}>
          ← Zpět do katalogu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#1c1f3e" }}>
      <header className="sticky top-0 z-40" style={{
        background: "rgba(16,28,65,0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.09)",
      }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 h-16 flex items-center">
          <Link
            to={-1}
            className="flex items-center gap-2 font-semibold text-sm hover:opacity-70"
            style={{ color: "#38bdf8" }}
          >
            <ArrowLeft className="w-4 h-4" /> Zpět
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-2xl font-black mb-2" style={{ color: "#f1f5f9" }}>Nezávazná poptávka</h1>
        {productName && (
          <p className="mb-8 text-sm" style={{ color: "#94a3b8" }}>
            Produkt: <span className="font-bold" style={{ color: "#38bdf8" }}>{productName}</span>
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="p-8 space-y-4 rounded-xl"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: "Jméno / Firma *", type: "text", name: "name", placeholder: "Vaše jméno nebo firma", required: true },
              { label: "Telefon", type: "tel", name: "phone", placeholder: "+420 ...", required: false },
            ].map(f => (
              <div key={f.name}>
                <label className="block text-xs font-semibold tracking-wide mb-1.5 uppercase" style={{ color: "#94a3b8" }}>
                  {f.label}
                </label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  required={f.required}
                  value={form[f.name]}
                  onChange={e => setForm(p => ({ ...p, [f.name]: e.target.value }))}
                  style={inputStyle(f.name)}
                  onFocus={() => setFocused(f.name)}
                  onBlur={() => setFocused(null)}
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-xs font-semibold tracking-wide mb-1.5 uppercase" style={{ color: "#94a3b8" }}>E-mail *</label>
            <input
              type="email"
              placeholder="vas@email.cz"
              required
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              style={inputStyle("email")}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused(null)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold tracking-wide mb-1.5 uppercase" style={{ color: "#94a3b8" }}>Zpráva / Poptávka *</label>
            <textarea
              rows={4}
              placeholder="Popište co hledáte nebo co potřebujete..."
              required
              value={form.message}
              onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
              style={{ ...inputStyle("message"), resize: "none" }}
              onFocus={() => setFocused("message")}
              onBlur={() => setFocused(null)}
            />
          </div>

          {status === "error" && (
            <p className="text-sm" style={{ color: "#f87171" }}>
              Nepodařilo se odeslat. Zkuste znovu nebo napište přímo na{" "}
              <a href="mailto:servisdychl@seznam.cz" className="underline">servisdychl@seznam.cz</a>.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-3 font-bold text-sm tracking-widest uppercase rounded-lg text-white transition-opacity hover:opacity-80 disabled:opacity-50 flex items-center justify-center gap-2"
            style={{ background: "linear-gradient(135deg, #2563eb, #4f46e5)" }}
          >
            {status === "loading"
              ? <><Loader2 className="w-4 h-4 animate-spin" /> Odesílám...</>
              : "Odeslat poptávku"}
          </button>

          <p className="text-xs text-center" style={{ color: "#64748b" }}>
            Odpovíme do 24 hodin · Působíme v celé České republice
          </p>
        </form>
      </div>
    </div>
  );
}
