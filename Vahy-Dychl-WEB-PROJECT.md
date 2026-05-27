# VÁHY-DYCHL — Projektová dokumentace

> Webová aplikace pro firmu VÁHY-DYCHL. Katalog průmyslových vah, admin panel, servisní stránky a kontaktní formulář.
> Poslední aktualizace: 2026-05

---

## Technologický stack

| Vrstva | Technologie |
|--------|-------------|
| Frontend | React 18 + Vite 6 |
| Styling | Tailwind CSS 3 + Radix UI komponenty (shadcn) |
| Routing | React Router DOM v6 |
| Backend-as-a-Service | **Supabase** (databáze + auth + storage) |
| E-mail | **Resend** |
| Serverless funkce | Vercel API Routes (Node.js) |
| Deployment | Vercel |
| Bezpečnost obsahu | DOMPurify |

---

## Kde najdeš API klíče a přístupy

### Supabase
- **Dashboard:** https://supabase.com → projekt `kvurkdiscvmuhxiqrfdt`
- **Proměnné prostředí (v Vercelu nebo `.env.local` lokálně):**
  ```
  VITE_SUPABASE_URL=https://kvurkdiscvmuhxiqrfdt.supabase.co
  VITE_SUPABASE_ANON_KEY=<anon key — jen pro čtení veřejných dat>
  ```
- **Kde v kódu:** `src/api/supabaseClient.js` — zde se inicializuje Supabase klient
- **Anon key** je bezpečné mít ve frontendu — přístup řídí RLS políčka v databázi

### Resend (odesílání e-mailů)
- **Dashboard:** https://resend.com
- **Proměnné prostředí (pouze na Vercelu — NIKDY ve frontendu):**
  ```
  RESEND_API_KEY=<tajný klíč>
  RESEND_FROM_EMAIL=noreply@vahy-dychl.cz
  ```
- **Kde v kódu:** `api/send-email.js` — serverless funkce která Resend volá
- Klíč musí být nastaven ve Vercel Dashboard → Settings → Environment Variables

---

## Struktura projektu

```
Vahy-Dychl.cz/
├── api/                          ← Vercel serverless funkce (backend)
│   ├── send-email.js             ← Odesílání poptávek přes Resend
│   ├── scrape.js                 ← Stažení HTML ze starého webu (admin nástroj)
│   └── docx-to-html.js           ← Konverze Word dokumentů na HTML (admin nástroj)
│
├── public/                       ← Statické soubory
│   ├── favicon.svg               ← Favicon (SVG, ostrý na všech velikostech)
│   ├── logos/logomale.jpg        ← Staré logo (již nepoužívané pro favicon)
│   └── kategorie/                ← Obrázky kategorií vah (kat-A.png … kat-L.png)
│
├── src/
│   ├── main.jsx                  ← Vstupní bod aplikace
│   ├── App.jsx                   ← Router + providery (Auth, QueryClient)
│   ├── index.css                 ← Globální CSS (Tailwind, animace, téma)
│   │
│   ├── api/
│   │   └── supabaseClient.js     ← Supabase klient + funkce uploadProductImage()
│   │
│   ├── lib/
│   │   ├── AuthContext.jsx       ← Kontext autentizace (login/logout/session)
│   │   ├── query-client.js       ← TanStack Query konfigurace
│   │   ├── utils.js              ← cn() helper pro Tailwind třídy
│   │   └── PageNotFound.jsx      ← 404 stránka
│   │
│   ├── hooks/
│   │   └── use-mobile.jsx        ← Hook pro detekci mobilního zařízení
│   │
│   ├── pages/                    ← Stránky (každá = jedna URL)
│   │   ├── Home.jsx              ← Hlavní stránka (/)
│   │   ├── Admin.jsx             ← Admin panel (/admin) — správa produktů
│   │   ├── Catalog.jsx           ← Katalog vah (/katalog)
│   │   ├── ProductDetail.jsx     ← Detail produktu (/produkt/:id)
│   │   ├── Servis.jsx            ← Servisní stránka (/servis)
│   │   ├── Kontakt.jsx           ← Kontaktní stránka (/kontakt)
│   │   ├── Pokladny.jsx          ← EET pokladny (/pokladny)
│   │   └── EetProdukt.jsx        ← Detail EET produktu (/eet/:slug)
│   │
│   ├── components/               ← Znovupoužitelné komponenty
│   │   ├── HeroSection.jsx       ← Hero sekce + bestsellery (hlavní stránka)
│   │   ├── NewsSection.jsx       ← Aktuality / novinky (hlavní stránka)
│   │   ├── CategoriesSection.jsx ← Přehled kategorií (hlavní stránka)
│   │   ├── ContactSection.jsx    ← Kontaktní formulář (hlavní stránka)
│   │   ├── Header.jsx            ← Navigační lišta
│   │   ├── Footer.jsx            ← Patička
│   │   ├── ProductCatalog.jsx    ← Seznam produktů s filtrováním
│   │   ├── ServisniKontaktCard.jsx ← Karta servisního kontaktu
│   │   ├── BestsellerSection.jsx ← NEPOUŽÍVANÉ — starší verze sekce
│   │   └── ui/                   ← shadcn/ui komponenty (Button, Dialog, Toast…)
│   │
│   └── utils/
│       └── index.ts              ← Utility funkce
│
├── supabase/
│   └── schema.sql                ← Databázové schéma + RLS políčka
│                                    !! Při změně spustit ručně v Supabase SQL Editoru !!
│
├── index.html                    ← HTML šablona (favicon, meta tagy, title)
├── vite.config.js                ← Vite konfigurace (alias @/ → src/)
├── tailwind.config.js            ← Tailwind konfigurace + barvy
├── vercel.json                   ← Vercel routování + bezpečnostní hlavičky
├── package.json                  ← Závislosti a skripty
└── components.json               ← shadcn/ui konfigurace
```

---

## URL routing

| URL | Komponenta | Popis |
|-----|-----------|-------|
| `/` | `Home.jsx` | Hlavní stránka |
| `/katalog` | `Catalog.jsx` | Katalog všech produktů, filtrování dle kategorie |
| `/katalog?cat=A` | `Catalog.jsx` | Katalog filtrovaný na kategorii A |
| `/katalog?search=paletová` | `Catalog.jsx` | Katalog s vyhledáváním |
| `/produkt/:id` | `ProductDetail.jsx` | Detail konkrétního produktu (UUID z Supabase) |
| `/servis` | `Servis.jsx` | Servisní stránka |
| `/kontakt` | `Kontakt.jsx` | Kontaktní formulář |
| `/pokladny` | `Pokladny.jsx` | EET pokladny |
| `/eet/:slug` | `EetProdukt.jsx` | Detail EET produktu |
| `/admin` | `Admin.jsx` | Admin panel (vyžaduje přihlášení) |

---

## Databáze — Supabase

### Tabulky

**`products`** — katalog vah
| Sloupec | Typ | Popis |
|---------|-----|-------|
| `id` | UUID | Primární klíč |
| `name` | TEXT | Název produktu |
| `category_id` | TEXT (A–L) | Kategorie (viz níže) |
| `description` | TEXT | HTML popis (z admin editoru) |
| `price` | TEXT | Cena jako text (např. "od 9.990 Kč") |
| `certified` | BOOLEAN | Úředně ověřeno (zelený badge) |
| `inquiry_only` | BOOLEAN | Cena na poptávku (skryje cenu) |
| `active` | BOOLEAN | Viditelný v katalogu |
| `image_url` | TEXT | URL obrázku |
| `variants_json` | TEXT | JSON tabulka variant/parametrů |
| `created_at` | TIMESTAMPTZ | Datum vytvoření |

**`inquiries`** — poptávky z formuláře
| Sloupec | Typ | Popis |
|---------|-----|-------|
| `id` | UUID | Primární klíč |
| `name` | TEXT | Jméno zákazníka |
| `phone` | TEXT | Telefon |
| `email` | TEXT | E-mail |
| `message` | TEXT | Text poptávky |
| `product` | TEXT | Název produktu (volitelné) |
| `created_at` | TIMESTAMPTZ | Datum odeslání |

### Kategorie produktů
```
A — Laboratorní & analytické
B — Obchodní bez tisku
C — Obchodní s tiskem
D — Kuchyňské & skladové
E — Počítací
F — Jeřábové
G — Můstkové & plošinové
H — Paletové
I — Silniční mostové
J — Zdravotnické
K — Indikátory
L — EET / Registrační pokladny
```

### RLS políčka (Row Level Security)
- **Veřejnost** může pouze číst aktivní produkty (`active = true`)
- **Zápis/mazání** produktů jen pro `m.dytrich@seznam.cz`
- **Poptávky** může vytvářet kdokoli, číst/mazat jen `m.dytrich@seznam.cz`
- **Storage** (nahrávání obrázků) jen pro `m.dytrich@seznam.cz`

> Schema soubor: `supabase/schema.sql` — po úpravě spustit v Supabase → SQL Editor

### Storage bucket
- Název: `product-images`
- Veřejné čtení, zápis jen admin
- Obrázky nahrávané přes admin panel jdou sem

---

## Serverless API funkce (`api/`)

### `api/send-email.js`
- **Metoda:** POST
- **Volá:** Resend API
- **Odesílá e-mail na:** `m.dytrich@seznam.cz`
- **Tělo požadavku:** `{ name, phone, email, message, product }`
- **Ochrana:** HTML escaping všech vstupů, validace e-mailu, CORS omezen na `vahy-dychl.cz`
- **Env proměnné:** `RESEND_API_KEY`, `RESEND_FROM_EMAIL`

### `api/scrape.js`
- **Metoda:** POST
- **Účel:** Stáhne HTML stránky ze starého webu pro import do admin panelu
- **Tělo požadavku:** `{ url }`
- **Ochrana:** Allowlist — povoleny pouze domény `vahy-dychl.cz` a subdomény (SSRF prevence)
- **CORS** omezen na `vahy-dychl.cz`

### `api/docx-to-html.js`
- **Metoda:** POST (multipart/form-data)
- **Účel:** Konverze Word (.docx) souboru na HTML pro vložení do popisu produktu
- **Knihovna:** mammoth.js

---

## Admin panel (`/admin`)

### Přihlášení
- URL: `vahy-dychl.cz/admin`
- Autentizace přes Supabase Auth (`signInWithPassword`)
- Přihlašovací e-mail: `m.dytrich@seznam.cz`
- Heslo uloženo pouze v Supabase Auth — nikde v kódu
- Reset hesla: Supabase Dashboard → Authentication → Users → Send password reset

### Co admin umí
- Přidat / upravit / smazat produkt
- Nahrát obrázek produktu (jde do Supabase Storage)
- Napsat HTML popis produktu (s náhledem)
- Importovat popis ze starého webu (scrape URL)
- Konvertovat Word dokument na HTML popis
- Spravovat varianty/parametry produktu (JSON tabulka)
- Zobrazit příchozí poptávky, smazat je

---

## Lokální spuštění

```bash
# 1. Naklonovat repozitář
git clone https://github.com/Sevinger/Vahy-Dychl-modern.git
cd Vahy-Dychl-modern

# 2. Nainstalovat závislosti
npm install

# 3. Vytvořit .env.local
echo "VITE_SUPABASE_URL=https://kvurkdiscvmuhxiqrfdt.supabase.co" > .env.local
echo "VITE_SUPABASE_ANON_KEY=<anon_key_ze_supabase>" >> .env.local

# 4. Spustit vývojový server
npm run dev
# → http://localhost:5173
```

> Serverless funkce (`api/`) lokálně nefungují přes `npm run dev`.
> Pro testování e-mailů/scrape použij `vercel dev` (vyžaduje Vercel CLI: `npm i -g vercel`).

---

## Deployment (Vercel)

- **GitHub repo:** https://github.com/Sevinger/Vahy-Dychl-modern
- **Vercel projekt:** automaticky deployuje z větve `main`
- **Build command:** `npm run build`
- **Output directory:** `dist`

### Environment variables na Vercelu (nastav v Dashboard → Settings → Env Variables)
```
VITE_SUPABASE_URL        = https://kvurkdiscvmuhxiqrfdt.supabase.co
VITE_SUPABASE_ANON_KEY   = <anon key>
RESEND_API_KEY           = <resend tajný klíč>
RESEND_FROM_EMAIL        = noreply@vahy-dychl.cz   (nebo ověřená doména)
```

---

## Bezpečnost

| Hrozba | Řešení |
|--------|--------|
| XSS v popisech produktů | DOMPurify.sanitize() před vložením HTML |
| HTML injection v e-mailech | escHtml() na všech vstupech v send-email.js |
| SSRF v scrape funkci | Allowlist — pouze vahy-dychl.cz domény |
| Neoprávněný zápis do DB | Supabase RLS omezeno na m.dytrich@seznam.cz |
| Clickjacking | X-Frame-Options: SAMEORIGIN (vercel.json) |
| MIME sniffing | X-Content-Type-Options: nosniff (vercel.json) |
| Přenos dat | HSTS max-age=31536000 (vercel.json) |
| Neautorizované API | CORS omezen na https://vahy-dychl.cz |

---

## Supabase keepalive (automatické)

Projekt na Supabase free tieru se pausuje po 1 týdnu bez aktivity.
Řešení: Claude Code Remote Routine která každé pondělí v 7:00 (Praha) pingne databázi.

- **Routine ID:** `trig_01M1o49AEUGG3cvCEE6BXiQb`
- **Správa:** https://claude.ai/code/routines/trig_01M1o49AEUGG3cvCEE6BXiQb
- **Co dělá:** curl GET na Supabase REST API (veřejný endpoint, nevyžaduje heslo)

---

## Git repozitáře

| Remote | URL | Účel |
|--------|-----|------|
| `origin` | https://github.com/Sevinger/Vahy-Dychl.cz | Původní/záloha |
| `modern` | https://github.com/Sevinger/Vahy-Dychl-modern | Aktivní — z tohoto Vercel deployuje |

Pushovat vždy na `modern`:
```bash
git push modern main
```
