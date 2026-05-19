import { useState, useRef, useEffect } from "react";
import { Menu, X, Phone, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const navLinks = [
  { label: "VÁHY", href: "#vahy" },
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
    <header style={{ background: "#939393", borderBottom: "1px solid #7a7a7a" }} className="sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

        <a href="/" className="flex items-center">
          <img
            src="/logos/logomale.jpg"
            style={{ mixBlendMode: "multiply" }}
            alt="Váhy Dychl"
            className="h-10 w-auto"
          />
        </a>

        <div className="hidden md:flex items-center gap-7">
          <nav className="flex items-center gap-7">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href}
                className="text-sm font-semibold tracking-widest hover:opacity-70 transition-opacity text-black">
                {link.label}
              </a>
            ))}
          </nav>

          <a href="tel:+420775698555"
            className="flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-lg transition-opacity hover:opacity-80 text-black"
            style={{ background: "#2563eb" }}>
            <Phone className="w-4 h-4" /> +420 775 698 555
          </a>

          <form onSubmit={handleSearch}
            className={`flex items-center overflow-hidden transition-all duration-300 ${searchOpen ? "w-44 rounded-lg px-2" : "w-8"}`}
            style={searchOpen ? { background: "#858585", border: "1px solid #7a7a7a" } : {}}>
            <button type="button" onClick={() => setSearchOpen(s => !s)}
              className="w-8 h-8 flex items-center justify-center shrink-0 text-black hover:opacity-70">
              {searchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
            </button>
            {searchOpen && (
              <input ref={searchRef} value={searchQ} onChange={e => setSearchQ(e.target.value)}
                placeholder="Hledat..." className="flex-1 py-1 text-sm bg-transparent focus:outline-none text-black placeholder-black/60" />
            )}
          </form>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <a href="tel:+420775698555" className="text-black"><Phone className="w-5 h-5" /></a>
          <button onClick={() => setOpen(!open)} className="text-black">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4 pt-2 space-y-3" style={{ background: "#939393", borderTop: "1px solid #7a7a7a" }}>
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setOpen(false)}
              className="block py-2 text-sm font-semibold tracking-widest text-black">
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}