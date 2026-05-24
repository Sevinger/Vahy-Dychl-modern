import { useState, useRef, useEffect } from "react";
import { Menu, X, Phone, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const navLinks = [
  { label: "VÁHY", href: "/katalog" },
  { label: "POKLADNY", href: "/pokladny" },
  { label: "SERVIS", href: "/servis" },
  { label: "KONTAKT", href: "/kontakt" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQ.trim()) {
      navigate(`/katalog?search=${encodeURIComponent(searchQ.trim())}`);
      setSearchOpen(false);
      setSearchQ("");
    }
  };

  return (
    <header
      style={{
        background: "rgba(16, 28, 65, 0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
      className="sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

        <a href="/" className="flex items-center">
          <div style={{
            background: "rgba(255,255,255,0.88)",
            borderRadius: "8px",
            padding: "3px 8px",
            display: "flex",
            alignItems: "center",
          }}>
            <img
              src="/logos/logomale.jpg"
              style={{ mixBlendMode: "multiply" }}
              alt="Váhy Dychl"
              className="h-9 w-auto"
            />
          </div>
        </a>

        <div className="hidden md:flex items-center gap-7">
          <nav className="flex items-center gap-7">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href}
                className="text-sm font-semibold tracking-widest transition-colors"
                style={{ color: "#94a3b8" }}
                onMouseEnter={e => e.target.style.color = "#f1f5f9"}
                onMouseLeave={e => e.target.style.color = "#94a3b8"}>
                {link.label}
              </a>
            ))}
          </nav>

          <a href="tel:+420775698555"
            className="flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-lg transition-opacity hover:opacity-80"
            style={{ background: "linear-gradient(135deg, #2563eb, #4f46e5)", color: "#fff" }}>
            <Phone className="w-4 h-4" /> +420 775 698 555
          </a>

          <form onSubmit={handleSearch}
            className={`flex items-center overflow-hidden transition-all duration-300 ${searchOpen ? "w-44 rounded-lg px-2" : "w-8"}`}
            style={searchOpen ? { background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)" } : {}}>
            <button type="button" onClick={() => setSearchOpen(s => !s)}
              className="w-8 h-8 flex items-center justify-center shrink-0 hover:opacity-70 transition-opacity"
              style={{ color: "#94a3b8" }}>
              {searchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
            </button>
            {searchOpen && (
              <input ref={searchRef} value={searchQ} onChange={e => setSearchQ(e.target.value)}
                placeholder="Hledat..."
                className="flex-1 py-1 text-sm bg-transparent focus:outline-none"
                style={{ color: "#f1f5f9" }} />
            )}
          </form>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <a href="tel:+420775698555" style={{ color: "#94a3b8" }}><Phone className="w-5 h-5" /></a>
          <button onClick={() => setOpen(!open)} style={{ color: "#94a3b8" }}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4 pt-2 space-y-3"
          style={{ background: "rgba(16,28,65,0.98)", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setOpen(false)}
              className="block py-2 text-sm font-semibold tracking-widest"
              style={{ color: "#94a3b8" }}>
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
