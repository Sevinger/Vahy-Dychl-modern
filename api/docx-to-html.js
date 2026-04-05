import mammoth from 'mammoth';
import formidable from 'formidable';
import fs from 'fs';

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const form = formidable({ maxFileSize: 20 * 1024 * 1024 });
    const [, files] = await form.parse(req);
    const file = files.file?.[0];
    if (!file) return res.status(400).json({ error: 'Žádný soubor nebyl nahrán' });

    const buffer = fs.readFileSync(file.filepath);

    // Zachová obrázky jako base64 data URL přímo v HTML
    const result = await mammoth.convertToHtml(
      { buffer },
      {
        convertImage: mammoth.images.imgElement(async (image) => {
          const base64 = (await image.read('base64'));
          return {
            src: `data:${image.contentType};base64,${base64}`,
          };
        }),
        styleMap: [
          "p[style-name='Heading 1'] => h2:fresh",
          "p[style-name='Heading 2'] => h3:fresh",
          "p[style-name='Heading 3'] => h3:fresh",
          "b => strong",
          "i => em",
        ],
      }
    );

    fs.unlinkSync(file.filepath);

    return res.status(200).json({
      html: result.value || '',
      warnings: result.messages?.map(m => m.message) || [],
    });
  } catch (err) {
    console.error('DOCX conversion error:', err);
    return res.status(500).json({ error: err.message || 'Konverze selhala' });
  }
}
