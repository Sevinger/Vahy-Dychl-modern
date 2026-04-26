export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'url is required' });

  const geminiKey = process.env.GEMINI_API_KEY;
  if (!geminiKey) return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });

  try {
    const pageRes = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ProductScraper/1.0)' },
    });
    if (!pageRes.ok) throw new Error(`Stránka vrátila ${pageRes.status}`);
    const html = await pageRes.text();

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{
              text: `Jsi expert na extrakci obsahu z HTML stránek českého e-shopu s vahami vahy-dychl.cz.

PRAVIDLA PRO TABULKY (NEJDŮLEŽITĚJŠÍ):
- KAŽDOU tabulku MUSÍŠ převést na HTML <table><thead><tbody><tr><th><td> strukturu
- NIKDY nepřeváděj tabulky na prostý text nebo odrážky
- Zachovej VŠECHNY řádky a sloupce tabulky přesně tak jak jsou
- Technické parametry (max. váha, přesnost, rozměry, napájení atd.) jsou VŽDY tabulky
- Pokud vidíš data uspořádaná do sloupců, je to tabulka — udělej z ní <table>

PRAVIDLA PRO OBRÁZKY:
- Zachovej všechny <img> tagy s jejich původními src URL
- Nezahazuj obrázky logotypů značek ani technické obrázky

PRAVIDLA PRO TEXT:
- <h2> pro hlavní nadpisy sekcí
- <h3> pro podnadpisy
- <p> pro odstavce
- <ul><li> pro odrážky
- <strong> pro tučné hodnoty

NEZAHRNUJ: navigaci, záhlaví, zápatí, košík, ceny, tlačítka "přidat do košíku"
NEZAHRNUJ: <html>, <head>, <body> tagy

Zachovej česká diakritická znaménka a technické hodnoty (kg, mm, V, Hz, g, cm) přesně.

Odpověz POUZE validním JSON bez markdown backticks:
{"html": "...", "product_name": "..."}`
            }]
          },
          contents: [{
            role: 'user',
            parts: [{ text: `Extrahuj obsah produktu z tohoto HTML. Tabulky MUSÍ být jako <table> HTML:\n\n${html.substring(0, 70000)}` }]
          }],
          generationConfig: { maxOutputTokens: 16384, temperature: 0.05 },
        }),
      }
    );

    const geminiData = await geminiRes.json();
    if (!geminiRes.ok) throw new Error(geminiData?.error?.message || 'Gemini error');

    const text = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const clean = text.replace(/```json|```/g, '').trim();

    let parsed;
    try {
      parsed = JSON.parse(clean);
    } catch {
      parsed = { html: clean, product_name: '' };
    }

    return res.status(200).json({
      html: parsed.html || '',
      product_name: parsed.product_name || '',
    });
  } catch (err) {
    console.error('Scrape error:', err);
    return res.status(500).json({ error: err.message || 'Interní chyba' });
  }
}
