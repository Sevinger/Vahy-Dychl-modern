
// Fetches a product URL and uses Gemini to extract clean HTML content

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
    // 1. Fetch the product page
    const pageRes = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ProductScraper/1.0)' },
    });
    if (!pageRes.ok) throw new Error(`Stránka vrátila ${pageRes.status}`);
    const html = await pageRes.text();

    // 2. Ask Gemini to extract and structure the content
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{
              text: `Jsi asistent pro extrakci obsahu z HTML stránek českého e-shopu s vahami.
Extrahuj POUZE viditelný obsah hlavního produktu: název, popis, technické specifikace, parametry, tabulky.
Vyrob čisté, strukturované HTML:
- <h2> pro hlavní nadpisy sekcí
- <h3> pro podnadpisy
- <p> pro odstavce  
- <ul><li> pro odrážky
- <table><thead><tbody><tr><th><td> pro specifikace — zachovej všechny řádky a sloupce přesně
- <strong> pro důležité hodnoty
NEVKLÁDEJ navigaci, záhlaví, zápatí, bannery, reklamy.
NEVKLÁDEJ <html>, <head>, <body>.
Zachovej česká diakritická znaménka. Zachovej technické hodnoty (kg, mm, V, Hz).
Odpověz POUZE validním JSON objektem bez markdown backticks:
{"html": "...", "product_name": "..."}`
            }]
          },
          contents: [{
            role: 'user',
            parts: [{ text: `Extrahuj obsah z tohoto HTML:\n\n${html.substring(0, 60000)}` }]
          }],
          generationConfig: { maxOutputTokens: 8192, temperature: 0.1 },
        }),
      }
    );

    const geminiData = await geminiRes.json();
    if (!geminiRes.ok) throw new Error(geminiData?.error?.message || 'Gemini error');

    const text = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const clean = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);

    return res.status(200).json({ html: parsed.html || '', product_name: parsed.product_name || '' });
  } catch (err) {
    console.error('Scrape error:', err);
    return res.status(500).json({ error: err.message || 'Interní chyba' });
  }
}
