import React, { useState, useEffect, useRef } from "react";
import { supabase, uploadProductImage } from "@/api/supabaseClient";
import { useAuth } from "@/lib/AuthContext";
import { Plus, Pencil, Trash2, X, Check, Scale, LogOut, Upload, Image, FileText, Loader2, AlertCircle } from "lucide-react";

const CATEGORIES = [
  { id: "A", label: "A – Laboratorní & analytické" },
  { id: "B", label: "B – Obchodní bez tisku" },
  { id: "C", label: "C – Obchodní s tiskem" },
  { id: "D", label: "D – Kuchyňské & skladové" },
  { id: "E", label: "E – Počítací" },
  { id: "F", label: "F – Jeřábové" },
  { id: "G", label: "G – Můstkové & plošinové" },
  { id: "H", label: "H – Paletové" },
  { id: "I", label: "I – Silniční mostové" },
  { id: "J", label: "J – Zdravotnické" },
  { id: "K", label: "K – Indikátory" },
  { id: "L", label: "L – EET / Registrační pokladny" },
];

const empty = { name: "", category_id: "A", description: "", price: "", certified: false, inquiry_only: false, active: true, image_url: "", variants_json: "" };

function HtmlEditor({ value, onChange }) {
  const [preview, setPreview] = React.useState(false);
  return (
    <div style={{ borderRadius: "12px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 12px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
        <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 500 }}>Vložte HTML nebo zkopírujte obsah ze starého webu</span>
        <button type="button" onClick={() => setPreview(p => !p)}
          style={{ marginLeft: "auto", fontSize: "12px", padding: "4px 12px", borderRadius: "8px", fontWeight: 600, border: "1px solid", cursor: "pointer", background: preview ? "#2563eb" : "white", color: preview ? "white" : "#475569", borderColor: preview ? "#2563eb" : "#e2e8f0" }}>
          {preview ? "✏️ Editovat" : "👁 Náhled"}
        </button>
      </div>
      {preview ? (
        <div style={{ padding: "16px", minHeight: "256px", fontSize: "13px", lineHeight: 1.6, overflow: "auto" }}
          className="product-desc-preview"
          dangerouslySetInnerHTML={{ __html: value || "<p style='color:#94a3b8'>Žádný obsah</p>" }} />
      ) : (
        <textarea
          value={value || ""}
          onChange={e => onChange(e.target.value)}
          placeholder="Vložte HTML sem — tabulky, obrázky i text se zachovají přesně jak jsou. Zkopírujte zdrojový kód ze starého webu."
          style={{ width: "100%", padding: "12px 16px", fontSize: "13px", fontFamily: "monospace", color: "#1e293b", outline: "none", resize: "vertical", background: "white", border: "none", minHeight: "320px", display: "block" }}
        />
      )}
      <style>{`
        .product-desc-preview table { border-collapse: collapse; width: 100%; margin: 1em 0; }
        .product-desc-preview td, .product-desc-preview th { border: 1px solid #cbd5e1; padding: 6px 12px; }
        .product-desc-preview th { background: #f1f5f9; font-weight: 700; }
        .product-desc-preview h2, .product-desc-preview h3 { font-weight: 700; margin: 1em 0 0.5em; }
        .product-desc-preview ul, .product-desc-preview ol { padding-left: 1.5em; margin: 0.5em 0; }
        .product-desc-preview img { max-width: 100%; height: auto; }
        .product-desc-preview p { margin: 0.5em 0; }
      `}</style>
    </div>
  );
}

export default function Admin() {
  const { isAuthenticated, isLoadingAuth, login, logout } = useAuth();
  const [emailInput, setEmailInput] = useState("");
  const [pwInput, setPwInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState("");
  const [filterCat, setFilterCat] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [docxLoading, setDocxLoading] = useState(false);
  const [scrapeUrl, setScrapeUrl] = useState("");
  const [scrapeLoading, setScrapeLoading] = useState(false);
  const [scrapeError, setScrapeError] = useState("");
  const docxRef = useRef(null);

  const load = async () => {
    setLoading(true);
    setDbError("");
    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (error) setDbError(`Chyba načítání: ${error.message}`);
    else setProducts(data || []);
    setLoading(false);
  };

  useEffect(() => { if (isAuthenticated) load(); }, [isAuthenticated]);

  const openNew = () => { setForm(empty); setEditing(null); setScrapeUrl(""); setScrapeError(""); setShowForm(true); };
  const openEdit = (p) => { setForm({ ...p }); setEditing(p.id); setScrapeUrl(""); setScrapeError(""); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditing(null); };

  const handleImageUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadProductImage(file);
      setForm(f => ({ ...f, image_url: url }));
    } catch (err) {
      alert("Nahrání fotografie selhalo: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const scrapeProduct = async () => {
    if (!scrapeUrl.trim()) return;
    setScrapeLoading(true);
    setScrapeError("");
    try {
      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: scrapeUrl.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Chyba scraperu");
      if (data.html) setForm(f => ({ ...f, description: data.html, name: f.name || data.product_name || f.name }));
    } catch (err) {
      setScrapeError("Nepodařilo se načíst stránku: " + err.message);
    } finally {
      setScrapeLoading(false);
    }
  };

  const importDocx = async (file) => {
    setDocxLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/docx-to-html", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Chyba konverze");
      if (data.html) setForm(f => ({ ...f, description: data.html }));
    } catch (err) {
      alert("Import z Wordu selhal: " + err.message);
    } finally {
      setDocxLoading(false);
      if (docxRef.current) docxRef.current.value = "";
    }
  };

  const save = async () => {
    if (!form.name) return;
    setSaving(true);
    const payload = {
      name: form.name, category_id: form.category_id,
      description: form.description || null, price: form.price || null,
      certified: !!form.certified, inquiry_only: !!form.inquiry_only,
      active: !!form.active, image_url: form.image_url || null,
      variants_json: form.variants_json || null,
    };
    if (editing) await supabase.from("products").update(payload).eq("id", editing);
    else await supabase.from("products").insert([payload]);
    await load();
    setSaving(false);
    closeForm();
  };

  const remove = async (id) => {
    if (!confirm("Smazat produkt?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) { alert("Smazání selhalo: " + error.message); return; }
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const filtered = filterCat === "all" ? products : products.filter(p => p.category_id === filterCat);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    try { await login(emailInput, pwInput); }
    catch { setLoginError("Nesprávný e-mail nebo heslo."); }
    finally { setLoginLoading(false); }
  };

  if (isLoadingAuth) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-8 h-8 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
    </div>
  );

  if (!isAuthenticated) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 w-full max-w-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
            <Scale className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-black text-slate-800">VÁHY-DYCHL</div>
            <div className="text-xs text-slate-400">Administrace</div>
          </div>
        </div>
        <form onSubmit={handleLogin} className="space-y-3">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">E-mail</label>
            <input type="email" value={emailInput} onChange={e => setEmailInput(e.target.value)} required placeholder="admin@vahy-dychl.cz"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Heslo</label>
            <input type="password" value={pwInput} onChange={e => { setPwInput(e.target.value); setLoginError(""); }} required
              className={`w-full px-3 py-2 rounded-xl border text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm ${loginError ? "border-red-400" : "border-slate-200"}`} />
          </div>
          {loginError && <p className="text-xs text-red-500">{loginError}</p>}
          <button type="submit" disabled={loginLoading}
            className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-bold hover:opacity-80 transition-all text-sm disabled:opacity-60 flex items-center justify-center gap-2">
            {loginLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Přihlásit se"}
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
            <Scale className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-black text-slate-800">VÁHY-DYCHL</span>
            <span className="ml-2 text-xs bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded-full">Admin</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" className="text-sm text-slate-500 hover:text-blue-600">← Zpět na web</a>
          <button onClick={logout} className="flex items-center gap-1 text-sm text-slate-500 hover:text-red-500">
            <LogOut className="w-4 h-4" /> Odhlásit
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-black text-slate-800">Správa produktů</h1>
          <button onClick={openNew} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold hover:opacity-80 transition-all">
            <Plus className="w-4 h-4" /> Přidat produkt
          </button>
        </div>

        {dbError && (
          <div className="mb-4 flex items-start gap-2 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" /><p>{dbError}</p>
          </div>
        )}

        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          <button onClick={() => setFilterCat("all")}
            className={`shrink-0 px-3 py-1.5 rounded-full text-sm font-semibold border transition-all ${filterCat === "all" ? "bg-blue-600 text-white border-transparent" : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"}`}>
            Vše ({products.length})
          </button>
          {CATEGORIES.map(c => (
            <button key={c.id} onClick={() => setFilterCat(c.id)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-sm font-semibold border transition-all ${filterCat === c.id ? "bg-blue-600 text-white border-transparent" : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"}`}>
              {c.id} ({products.filter(p => p.category_id === c.id).length})
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-400">Načítám...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-400"><Scale className="w-10 h-10 mx-auto mb-3 opacity-30" /><p>Žádné produkty.</p></div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Produkt</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Kat.</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Cena</th>
                  <th className="text-center px-4 py-3 font-semibold text-slate-600">Ověřeno</th>
                  <th className="text-center px-4 py-3 font-semibold text-slate-600">Aktivní</th>
                  <th className="text-right px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {p.image_url ? (
                          <img src={p.image_url} alt="" className="w-10 h-10 object-contain rounded bg-slate-50 border border-slate-100 shrink-0" />
                        ) : (
                          <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center shrink-0">
                            <Image className="w-4 h-4 text-slate-300" />
                          </div>
                        )}
                        <div>
                          <div className="font-semibold text-slate-800">{p.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-500">{p.category_id}</td>
                    <td className="px-4 py-3 font-semibold text-blue-600">{p.price ? `${p.price} Kč` : "—"}</td>
                    <td className="px-4 py-3 text-center">{p.certified ? <Check className="w-4 h-4 text-green-500 mx-auto" /> : <span className="text-slate-300">—</span>}</td>
                    <td className="px-4 py-3 text-center">{p.active ? <Check className="w-4 h-4 text-green-500 mx-auto" /> : <X className="w-4 h-4 text-red-400 mx-auto" />}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"><Pencil className="w-4 h-4" /></button>
                        <button onClick={() => remove(p.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/40" onClick={closeForm} />
          <div className="w-full max-w-2xl bg-white h-full overflow-y-auto shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="font-black text-slate-800 text-lg">{editing ? "Upravit produkt" : "Nový produkt"}</h2>
              <button onClick={closeForm} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 px-6 py-6 space-y-5">

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Fotografie produktu</label>
                <div className="flex items-center gap-3">
                  {form.image_url ? (
                    <img src={form.image_url} alt="" className="w-16 h-16 object-contain rounded-lg border border-slate-200 bg-slate-50" />
                  ) : (
                    <div className="w-16 h-16 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center">
                      {uploading ? <Loader2 className="w-6 h-6 text-blue-400 animate-spin" /> : <Image className="w-6 h-6 text-slate-300" />}
                    </div>
                  )}
                  <label className={`flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 cursor-pointer hover:bg-slate-50 ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
                    <Upload className="w-4 h-4" />
                    {uploading ? "Nahrávám..." : "Nahrát foto"}
                    <input type="file" accept="image/*" className="hidden" disabled={uploading}
                      onChange={e => e.target.files[0] && handleImageUpload(e.target.files[0])} />
                  </label>
                  {form.image_url && !uploading && (
                    <button onClick={() => setForm(f => ({ ...f, image_url: "" }))} className="text-xs text-red-400 hover:text-red-600">Odstranit</button>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Název produktu *</label>
                <input type="text" placeholder="např. CAS PR2" value={form.name || ""}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Cena (Kč bez DPH)</label>
                <input type="text" placeholder="např. od 4.290" value={form.price || ""}
                  onChange={e => setForm({ ...form, price: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Načíst popis z webu vahy-dychl.cz</label>
                <div className="flex gap-2">
                  <input type="url" placeholder="https://www.vahy-dychl.cz/vahy/..."
                    value={scrapeUrl} onChange={e => setScrapeUrl(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm" />
                  <button type="button" onClick={scrapeProduct} disabled={scrapeLoading || !scrapeUrl.trim()}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-bold hover:opacity-80 disabled:opacity-50">
                    {scrapeLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                    {scrapeLoading ? "Načítám..." : "Načíst"}
                  </button>
                </div>
                {scrapeError && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {scrapeError}</p>}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-slate-700">Popis produktu</label>
                  <label className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${docxLoading ? "border-blue-300 text-blue-500 bg-blue-50" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                    {docxLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileText className="w-3.5 h-3.5" />}
                    {docxLoading ? "Zpracovávám..." : "Import z Wordu (.docx)"}
                    <input ref={docxRef} type="file" accept=".docx,.doc" className="hidden" disabled={docxLoading}
                      onChange={e => e.target.files[0] && importDocx(e.target.files[0])} />
                  </label>
                </div>
                <HtmlEditor value={form.description || ""} onChange={val => setForm(f => ({ ...f, description: val }))} />
                <p className="text-xs text-slate-400 mt-1">Zkopírujte HTML nebo importujte z Wordu — tabulky i obrázky se zachovají.</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Varianty / parametry (JSON)</label>
                <textarea rows={3} placeholder='[{"Model":"PR2","Max":"6kg"}]'
                  value={form.variants_json || ""}
                  onChange={e => setForm({ ...form, variants_json: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none text-sm font-mono" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Kategorie *</label>
                <select value={form.category_id} onChange={e => setForm({ ...form, category_id: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm bg-white">
                  {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>

              <div className="space-y-3">
                {[
                  { key: "certified", label: "Úředně ověřeno (M)" },
                  { key: "inquiry_only", label: "Pouze na poptávku (bez fixní ceny)" },
                  { key: "active", label: "Aktivní – zobrazit na webu" },
                ].map(f => (
                  <label key={f.key} className="flex items-center gap-3 cursor-pointer">
                    <div onClick={() => setForm({ ...form, [f.key]: !form[f.key] })}
                      className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-all ${form[f.key] ? "bg-blue-600 border-blue-600" : "border-slate-300"}`}>
                      {form[f.key] && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-sm text-slate-700">{f.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 flex gap-3">
              <button onClick={closeForm} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-all text-sm">Zrušit</button>
              <button onClick={save} disabled={!form.name || saving || uploading}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white font-bold hover:opacity-80 transition-all text-sm disabled:opacity-50">
                {saving ? "Ukládám..." : editing ? "Uložit změny" : "Přidat produkt"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
