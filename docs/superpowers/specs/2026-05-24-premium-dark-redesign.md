# Váhy-Dychl.cz — Premium Dark Redesign

## Cíl

Modernizovat vizuální styl webu ze stávajícího plochého šedého vzhledu (`#939393`) na tmavý, prémiový design s pohyblivým pozadím. Zachovat veškerý obsah, strukturu, funkčnost a routing.

---

## Přístup: Premium Dark + Animated Grid

**Pohyblivé pozadí:** Animovaná mřížka (pohyb diagonálně, čistě CSS) + 3 plovoucí světelné orby (azur, indigo, modrá) umístěné v Hero sekci. Mřížka se na krajích plynule vytratí (radial-gradient mask), aby nezasahovala do čitelnosti textu.

**Glassmorphism karty:** Produktové karty, kategorie a kontaktní formulář přejdou na průhledné sklo (`rgba(255,255,255,0.04)` + `border: 1px solid rgba(255,255,255,0.09)`).

**Vše čistě CSS + Tailwind** — žádné nové JS závislosti, žádné nové npm balíčky.

---

## Barevná paleta

| Token | Nová hodnota | Použití |
|---|---|---|
| `--background` | `#0b1120` | Hlavní pozadí |
| `--foreground` | `#f1f5f9` | Hlavní text |
| `--card` | `rgba(255,255,255,0.04)` | Glassmorphism karty |
| `--card-foreground` | `#e2e8f0` | Text v kartách |
| `--primary` | `#2563eb` | CTA tlačítka |
| `--muted-foreground` | `#94a3b8` | Sekundární text |
| `--border` | `rgba(255,255,255,0.09)` | Okraje karet |
| Akcent azur | `#38bdf8` | Badge, ceny, bullet dots |
| Akcent indigo | `#6366f1` | Gradient logo, orby |
| Sekundární bg | `#0f1629` | Střídání sekcí |

---

## Animace

Vše čistě CSS `@keyframes`, nulový JavaScript overhead:

| Animace | Soubor | Popis |
|---|---|---|
| `grid-move` | `index.css` nebo `HeroSection.jsx` inline | Mřížka 40×40px posun 0→40px, 8s linear infinite |
| `float1` | HeroSection | Orb 1 (azur), 9s ease-in-out |
| `float2` | HeroSection | Orb 2 (indigo), 12s ease-in-out |
| `float3` | HeroSection | Orb 3 (modrá), 15s ease-in-out |

Mřížka je viditelná pouze v Hero sekci. Ostatní sekce mají čisté tmavé pozadí.

---

## Změny komponent

### `src/index.css`

- Přepsat CSS custom properties v `:root` na novou tmavou paletu
- Přidat `@keyframes grid-move`, `float1`, `float2`, `float3`
- Přidat utility třídy `.orb`, `.animated-grid`

### `src/pages/Home.jsx`

- Odstranit `style={{ background: "#939393" }}` → pozadí přebírá z `bg-background`

### `src/components/Header.jsx`

- `background: "#939393"` → `rgba(10,15,30,0.85)` + `backdropFilter: blur(16px)`
- `borderBottom` → `rgba(255,255,255,0.07)`
- Logo text → gradient azur→indigo
- Nav links → `#94a3b8`, hover `#f1f5f9`
- Telefonní tlačítko → `linear-gradient(135deg, #2563eb, #4f46e5)`
- Search input border → `rgba(255,255,255,0.15)`
- Mobilní menu pozadí → `rgba(10,15,30,0.95)`

### `src/components/HeroSection.jsx`

- Sekce `background: "#939393"` → `#0b1120`
- Přidat animovanou mřížku jako `::before` pseudo-element (inline style nebo CSS třída)
- Přidat 3 `.orb` divy s absolutní pozicí a CSS animacemi
- Badge → azurový outline (`rgba(56,189,248,0.12)`, border `rgba(56,189,248,0.3)`, text `#38bdf8`)
- Nadpis → gradient span (azur→indigo)
- Text → `#94a3b8`
- Bullet tečky → `#38bdf8` + glow shadow
- Tlačítka → gradient primární, outline sekundární
- Bestseller karty → glassmorphism (`rgba(255,255,255,0.04)`, border `rgba(255,255,255,0.09)`)
- Ceny v kartách → `#38bdf8`
- "Nejprodávanější váhy" label → pill s border `rgba(255,255,255,0.08)`

### `src/components/CategoriesSection.jsx`

- `background: "#878787"` → `#0f1629`
- Nadpis → `#f1f5f9`
- Popis → `#94a3b8`
- Search input → border `rgba(56,189,248,0.4)`, bg transparent, text `#f1f5f9`
- Kategorie tlačítka → border `rgba(255,255,255,0.1)`, hover border `rgba(56,189,248,0.35)`
- Popisky kategorií → `#cbd5e1`
- Fallback bg při chybě obrázku → `#1a2744`
- **Všech 12 kategorií zůstává beze změny** (pole `CATEGORIES` se nedotýká):
  A Laboratorní, B Obchodní bez tisku, C Obchodní s tiskem, D Kuchyně & sklady,
  E Počítací, F Jeřábové, G Můstkové & plošinové, H Paletové, I Silniční mostové,
  J Zdravotnické, K Indikátory, L EET / Pokladny

### `src/components/NewsSection.jsx`

- `background: "#939393"` → `#0b1120`
- Nadpis → `#f1f5f9`
- Karty → glassmorphism (`rgba(255,255,255,0.04)`, border `rgba(255,255,255,0.08)`)
- Název produktu → `#e2e8f0`
- Cena → `#38bdf8`
- Separator → `rgba(255,255,255,0.07)`

### `src/components/ContactSection.jsx`

- `background: "#878787"` → `#0f1629`
- Nadpis + popis → `#f1f5f9` / `#94a3b8`
- Ikony kontaktů → pozadí `rgba(255,255,255,0.05)`, border `rgba(255,255,255,0.1)`, ikona `#38bdf8`
- Text kontaktů → `#e2e8f0`
- Formulář → glassmorphism (`rgba(255,255,255,0.04)`, border `rgba(255,255,255,0.1)`)
- Labely → `#94a3b8`
- Inputy → bg `rgba(255,255,255,0.05)`, border `rgba(255,255,255,0.1)`, focus border `#38bdf8`, text `#f1f5f9`
- Submit → gradient (`#2563eb` → `#4f46e5`)

### `src/components/Footer.jsx`

- `background: "#808080"` → `#080e1a`
- `borderTop` → `rgba(255,255,255,0.06)`
- Text → `#475569`

---

## Stránky mimo Home

Stránky `Catalog`, `ProductDetail`, `Servis`, `Pokladny`, `Kontakt`, `EetProdukt` **nebudou v tomto rozsahu měněny** — mají vlastní layout a jsou samostatné. Pouze pokud používají sdílené komponenty (Header, Footer), ty se automaticky aktualizují.

---

## Co se nemění

- Veškerý obsah (texty, ceny, kontakty, katalog)
- Routing a navigační struktura
- Funkčnost vyhledávání a navigace do katalogu
- Supabase integrace a API volání
- Formulářová logika
- Obrázky produktů a kategorií

---

## Testování

1. `npm install && npm run dev` — spustit lokálně
2. Ověřit Home page: animace mřížky + orby, všechny sekce
3. Ověřit Header na mobilní šířce (hamburger menu)
4. Ověřit funkčnost vyhledávání z HeroSection a CategoriesSection
5. Ověřit navigaci na `/katalog`, `/servis`, `/kontakt`
6. Potvrdit čitelnost textu ve všech sekcích
