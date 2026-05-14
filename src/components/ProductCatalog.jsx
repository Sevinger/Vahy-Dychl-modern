import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, MessageSquare, ChevronRight } from "lucide-react";

const categoryCards = [
  { id: "A", emoji: "🔬", label: "Laboratorní" },
  { id: "B", emoji: "🛒", label: "Obchodní" },
  { id: "C", emoji: "🖨️", label: "S tiskem" },
  { id: "D", emoji: "🍽️", label: "Kuchyně/Sklad" },
  { id: "E", emoji: "🔢", label: "Počítací" },
  { id: "F", emoji: "🏗️", label: "Jeřábové" },
  { id: "G", emoji: "📦", label: "Plošinové" },
  { id: "H", emoji: "🪝", label: "Paletové" },
  { id: "I", emoji: "🚛", label: "Mostové" },
  { id: "J", emoji: "🏥", label: "Zdravotnictví" },
  { id: "K", emoji: "📟", label: "Indikátory" },
  { id: "L", emoji: "🖥️", label: "EET/Pokladny" },
];

const catalog = [
  {
    id: "A",
    label: "Laboratorní & analytické",
    short: "Laboratorní",
    products: [
      { name: "Kern AET", desc: "Analytická váha, cejchovatelná, dotykový displej", price: "158.600", certified: true },
      { name: "ABS-ABJ", desc: "Analytická váha, cejchovatelná, jednočlánkový vážící systém", price: "24.960", certified: true },
      { name: "ALD", desc: "Analytická váha, s vnitřní kalibrací, možnost ověření", price: "32.200", certified: true },
      { name: "CAS XE 600g / 6000g", desc: "Pro zlatníky, lékárny a laboratoře. Úředně ověřeno (M)", price: "9.600", certified: true },
    ],
  },
  {
    id: "B",
    label: "Obchodní váhy bez tisku",
    short: "Obchodní",
    products: [
      { name: "ACLAS PS1-15B", desc: "S výpočtem ceny, váživost 6/15kg, skvělý poměr výkon/cena", price: "od 3.790", certified: true },
      { name: "CAS PR2 / PR2 s nožkou", desc: "S výpočtem ceny, dvourozsahová, s akumulátorem, váživost 6/15kg", price: "4.290 / 5.290", certified: true },
      { name: "TSQTP / TSQSP", desc: "Dvourozsahová, s akumulátorem, výpočet vratné částky, 3/6–6/15kg", price: "5.990", certified: true },
      { name: "CAS-ER plus", desc: "Dvourozsahová, s akumulátorem, váživost 3/6–6/15kg", price: "7.790", certified: true },
    ],
  },
  {
    id: "C",
    label: "Obchodní váhy s tiskem",
    short: "S tiskem",
    products: [
      { name: "CAS-CL5000", desc: "Tisk účtenek nebo etiket. Včetně úředního ověření", price: "27.800", certified: true },
      { name: "SM-500", desc: "Dvourozsahová, tisk účtenek nebo etiket. Včetně úředního ověření", price: "37.700", certified: true },
      { name: "DIGI SM 5100 B/P", desc: "Tisk účtenek i etiket. Včetně úředního ověření", price: "33.780", certified: true },
    ],
  },
  {
    id: "D",
    label: "Kuchyňské & skladové",
    short: "Kuchyně/Sklad",
    products: [
      { name: "TST28", desc: "Dvourozsahová, s akumulátorem, váživost 3/6–15/25kg", price: "od 4.790", certified: true },
      { name: "TS-SW", desc: "Voděodolná s akumulátorem, váživost 3, 6, 15kg", price: "6.490", certified: true },
      { name: "TSS29B", desc: "Nerezová, voděodolná (IP), s akumulátorem, váživost 3, 6, 15kg", price: "7.290", certified: true },
      { name: "CAS-ED", desc: "S akumulátorem, váživost 3, 6, 15, 30kg", price: "7.200", certified: true },
      { name: "CAS-SW", desc: "Voděodolná řada W, dvourozsahová, váživost 2, 5, 10, 20kg", price: "5.190", certified: true },
    ],
  },
  {
    id: "E",
    label: "Počítací váhy",
    short: "Počítací",
    products: [
      { name: "NHB", desc: "Laboratorní, neověřená, rychlé přesné vážení", price: "od 5.390", certified: false },
      { name: "NHBM", desc: "Laboratorní, úředně ověřená (M), rychlé přesné vážení", price: "od 8.690", certified: true },
      { name: "TSCALE QHW++", desc: "Přesnost 0,02–0,2g, váživost 3–30kg, výdrž na aku až 90 hod.", price: "6.890", certified: false },
      { name: "CAS SW2", desc: "Dvourozsahová, váživost 6/10/30kg, druhý displej, počítání kusů", price: "5.400", certified: true },
      { name: "TSJW", desc: "Váživost 3–30kg, nízká cena, velké číslice", price: "5.990", certified: false },
    ],
  },
  {
    id: "F",
    label: "Jeřábové váhy",
    short: "Jeřábové",
    products: [
      { name: "JEV", desc: "S dálkovým ovládáním, váživost 3,5t – 15t, necejchovatelná", price: "od 10.290", certified: false },
      { name: "J1-RWS NEREZ", desc: "Váživost 60kg – 9t, s dálkovým ovládáním. Možnost ověření (OIML)", price: "od 16.870", certified: true },
      { name: "J1-RWP", desc: "Váživost 6kg – 150kg, s dálkovým ovládáním. Možnost ověření (OIML)", price: "od 7.990", certified: true },
    ],
  },
  {
    id: "G",
    label: "Můstkové & plošinové",
    short: "Plošinové",
    products: [
      { name: "Plošinová 4TxxxxDFWL", desc: "Odolná konstrukce, provoz na baterie, váživost 300–1500kg", price: "od 23.140", certified: true },
      { name: "FOX-1", desc: "Stolní dvourozsahová, váživost 15–45kg. Ověřená (M)", price: "6.260", certified: true },
      { name: "FOX-2", desc: "Stolní dvourozsahová, váživost 60–250kg. Ověřená (M)", price: "7.690", certified: true },
      { name: "CAS-DB2", desc: "Počítací funkce, váživost 60–150kg, s akumulátorem", price: "8.890", certified: true },
    ],
  },
  {
    id: "H",
    label: "Paletové váhy",
    short: "Paletové",
    products: [
      { name: "KPZ1", desc: "Váživost 2200kg, přesnost 500g. Možnost úředního ověření", price: "od 22.590", certified: true },
      { name: "P4TLDFWL-UNI", desc: "Váživost 300/600/1500kg. Možnost ověření (OIML)", price: "od 19.790", certified: true },
      { name: "P4TDFWL", desc: "Váživost 300–2000kg. Možnost ověření (OIML)", price: "od 17.690", certified: true },
      { name: "Ližinová 4TLDFWL", desc: "Pro vážení palet, váživost 600–3000kg. Možnost ověření (OIML)", price: "od 19.900", certified: true },
    ],
  },
  {
    id: "I",
    label: "Silniční mostové váhy",
    short: "Mostové",
    products: [
      { name: "PROFI UNIVERSAL – nájezdová", desc: "Váživost do 60.000kg, dílek 20kg, nízká nájezdová výška, třída přesnosti III (OIML)", price: "Na dotaz", certified: true, inquiry: true },
      { name: "Zapuštěná – železobetonová", desc: "Projekty mostových vah na míru, individuální kalkulace dle rozměrů a zatížení", price: "Na dotaz", certified: true, inquiry: true },
    ],
  },
  {
    id: "J",
    label: "Zdravotnické váhy",
    short: "Zdravotnictví",
    products: [
      { name: "Kojenecká váha TSCALE", desc: "Úředně ověřeno (M)", price: "od 7.190", certified: true },
      { name: "Osobní váha TSCALE", desc: "Úředně ověřeno (M)", price: "od 11.970", certified: true },
      { name: "Mobilní vážící křeslo 1TVKLDFWLB", desc: "Možnost ověření (OIML)", price: "od 23.700", certified: true },
      { name: "Nájezdová váha pro invalidní vozíky", desc: "S vestavěnými nájezdy", price: "od 25.990", certified: false },
      { name: "Transportní lůžko s váhou 4TVL-DFWL", desc: "Váha integrovaná přímo do lůžka", price: "od 59.990", certified: false },
    ],
  },
  {
    id: "K",
    label: "Indikátory",
    short: "Indikátory",
    products: [
      { name: "BW", desc: "Plastový, s akumulátorem, limitní vážení, displej 52mm", price: "od 3.990", certified: true },
      { name: "BWS", desc: "Nerezový, s akumulátorem, limitní vážení, displej 52mm", price: "od 5.190", certified: true },
      { name: "SB520", desc: "Plastový, s akumulátorem, počítací, 3 displeje, léty prověřený", price: "od 4.000", certified: true },
      { name: "DFWL", desc: "Možnost úředního ověření (OIML)", price: "Na dotaz", certified: true },
      { name: "Smart", desc: "Nerez, ideální pro automobilové váhy, léty prověřený", price: "Na dotaz", certified: true },
    ],
  },
  {
    id: "L",
    label: "EET – Registrační pokladny",
    short: "EET/Pokladny",
    products: [
      {
        name: "CHD 3050",
        desc: "Pro malé prodejny. Připravena pro EET, bez měsíčních poplatků. Jednopásková, tisk grafického loga. UV detektor pravosti bankovek. Možnost provozu na akumulátor.",
        price: "od 6.690",
        certified: false,
        image: "https://new.vahy-dychl.cz/CHD30501.gif",
        slug: "chd-3050",
      },
      {
        name: "CHD 3850",
        desc: "Pro menší prodejny, potraviny, bistra a bufety. Připravena pro EET, bez měsíčních poplatků. Jednopásková se střihačem, tisk grafického loga. Elektronický žurnál na SD kartu.",
        price: "od 6.890",
        certified: false,
        image: "https://new.vahy-dychl.cz/CHD38501.png",
        slug: "chd-3850",
      },
      {
        name: "MS-5145 ECLIPSE",
        desc: "Jednopaprskový laserový ruční snímač. Patentované tlačítko CodeGate pro inteligentní výběr kódu. Hloubka pole 0–140 mm, rychlost 72 sejmutí/s.",
        price: "Na dotaz",
        certified: false,
        inquiry: true,
        image: "https://www.vahy-dychl.cz/userFiles/snimace/1001.jpg",
        slug: "ms-5145-eclipse",
      },
      {
        name: "MS-9520 VOYAGER",
        desc: "Jednopaprskový laserový snímač – ruční i stacionární použití. Snímá i 2D kódy RSS-14. Hloubka pole 0–203 mm, rychlost 72 sejmutí/s.",
        price: "Na dotaz",
        certified: false,
        inquiry: true,
        image: "https://www.vahy-dychl.cz/userFiles/snimace/1002.jpg",
        slug: "ms-9520-voyager",
      },
      {
        name: "MS-9533 VOYAGER BT",
        desc: "Bezdrátový Bluetooth snímač. Dosah až 10 m od stojanu, až 14 000 sejmutí na jedno nabití. Tlačítko CodeGate. Snímá i 2D kódy RSS-14.",
        price: "Na dotaz",
        certified: false,
        inquiry: true,
        image: "https://www.vahy-dychl.cz/userFiles/snimace/1003.jpg",
        slug: "ms-9533-voyager-bt",
      },
      {
        name: "MS-9540 VOYAGER CG",
        desc: "Laserový ruční snímač řady Voyager s funkcí CodeGate. Spolehlivý výběr jednotlivých položek ze seznamu čárových kódů.",
        price: "Na dotaz",
        certified: false,
        inquiry: true,
        image: "https://www.vahy-dychl.cz/userFiles/snimace/1004.jpg",
        slug: "ms-9540-voyager-cg",
      },
      {
        name: "MS-6720",
        desc: "Kompaktní laserový snímač čárového kódu. Robustní konstrukce vhodná pro každodenní provoz v obchodě nebo na pokladně.",
        price: "Na dotaz",
        certified: false,
        inquiry: true,
        image: "https://www.vahy-dychl.cz/userFiles/snimace/1005.jpg",
        slug: "ms-6720",
      },
      {
        name: "MS-7120 ORBIT",
        desc: "Všesměrový stolní snímač čárového kódu. Automatické snímání bez zmáčknutí tlačítka. Vhodný jako stacionární snímač u pokladny.",
        price: "Na dotaz",
        certified: false,
        inquiry: true,
        image: "https://www.vahy-dychl.cz/userFiles/snimace/1006.jpg",
        slug: "ms-7120-orbit",
      },
      {
        name: "MS-7620 / 7625 HORIZONT",
        desc: "Výkonný všesměrový snímač pro intenzivní provoz. Horizontální design pro pohodlné snímání zboží. Vhodný pro větší obchody a supermarkety.",
        price: "Na dotaz",
        certified: false,
        inquiry: true,
        image: "https://www.vahy-dychl.cz/userFiles/snimace/1007.jpg",
        slug: "ms-7620-horizont",
      },
      {
        name: "Příslušenství",
        desc: "Termokotoučky, termoetikety do vah — ceník na vyžádání",
        price: "Na dotaz",
        certified: false,
        inquiry: true,
      },
    ],
  },
];

export default function ProductCatalog() {
  const [activeId, setActiveId] = useState("A");
  const active = catalog.find((c) => c.id === activeId);

  return (
    <div>
      {/* Category emoji cards */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-10">
        {categoryCards.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveId(cat.id)}
            className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${
              activeId === cat.id
                ? "bg-gradient-to-br from-sky-500 to-cyan-400 text-white border-transparent shadow-lg scale-105"
                : "bg-white text-slate-700 border-slate-100 hover:border-sky-300 hover:shadow-md hover:-translate-y-0.5"
            }`}
          >
            <span className="text-3xl">{cat.emoji}</span>
            <span className={`text-xs font-semibold text-center leading-tight ${
              activeId === cat.id ? "text-white" : "text-slate-600"
            }`}>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Category heading */}
      <div className="mb-6">
        <h3 className="text-xl font-black text-slate-800">
          Kategorie {active.id}: {active.label}
        </h3>
      </div>

      {/* Product grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {active.products.map((p) => (
          <div
            key={p.name}
            className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group flex flex-col"
          >
            {p.image && (
              <div className="mb-3 flex items-center justify-center h-36 overflow-hidden rounded-xl bg-slate-50">
                <img
                  src={p.image}
                  alt={p.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            )}
            <div className="flex items-start justify-between gap-2 mb-2">
              <h4 className="font-bold text-slate-800 text-base group-hover:text-sky-600 transition-colors">
                {p.name}
              </h4>
              {p.certified && (
                <span className="shrink-0 flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 border border-green-200 rounded-full px-2 py-0.5">
                  <CheckCircle className="w-3 h-3" /> Ověřeno
                </span>
              )}
            </div>
            <p className="text-sm text-slate-500 mb-4 flex-1">{p.desc}</p>
            <div className="flex items-center justify-between gap-2 mt-auto">
              <div>
                <span className="text-xs text-slate-400">{p.inquiry && !p.price.startsWith("od") ? "" : "Cena od"}</span>
                <div className="text-lg font-black text-sky-600">
                  {p.price}{p.price !== "Na dotaz" && <span className="text-xs font-normal text-slate-400"> Kč bez DPH</span>}
                </div>
              </div>
              <div className="flex gap-2">
                {p.slug && (
                  <Link
                    to={`/eet/${p.slug}`}
                    className="flex items-center gap-1 text-xs font-semibold text-sky-600 border border-sky-200 px-3 py-2 rounded-xl hover:bg-sky-50 transition-all"
                  >
                    Detail
                  </Link>
                )}
                <a
                  href="#kontakt"
                  className="flex items-center gap-1 text-xs font-semibold text-white bg-gradient-to-r from-sky-500 to-cyan-400 px-3 py-2 rounded-xl hover:scale-105 transition-all shadow"
                >
                  <MessageSquare className="w-3 h-3" />
                  {p.inquiry ? "Poptávka" : "Poptat"}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}