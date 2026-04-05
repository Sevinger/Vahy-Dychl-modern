
// Converts .docx files to HTML using mammoth.js

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
    const form = formidable({ maxFileSize: 10 * 1024 * 1024 }); // 10MB max

    const [, files] = await form.parse(req);
    const file = files.file?.[0];
    if (!file) return res.status(400).json({ error: 'Žádný soubor nebyl nahrán' });

    const buffer = fs.readFileSync(file.filepath);
    const result = await mammoth.convertToHtml({ buffer });

    // Clean up temp file
    fs.unlinkSync(file.filepath);

    return res.status(200).json({ html: result.value || '' });
  } catch (err) {
    console.error('DOCX conversion error:', err);
    return res.status(500).json({ error: err.message || 'Konverze selhala' });
  }
}
