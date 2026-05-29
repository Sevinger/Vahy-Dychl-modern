import { Resend } from 'resend';

const escHtml = s => String(s ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#x27;');

const isValidEmail = s => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s ?? ''));

const ALLOWED_ORIGINS = [
  'https://vahy-dychl.cz',
  'https://www.vahy-dychl.cz',
  'https://vahy-dychl-modern.vercel.app',
];

export default async function handler(req, res) {
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Vary', 'Origin');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, phone, email, message, product } = req.body;
  if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' });
  if (!isValidEmail(email)) return res.status(400).json({ error: 'Neplatný e-mail' });

  const safeName    = escHtml(name);
  const safePhone   = escHtml(phone);
  const safeEmail   = escHtml(email);
  const safeMessage = escHtml(message);
  const safeProduct = escHtml(product);

  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

  try {
    await resend.emails.send({
      from: `VÁHY-DYCHL <${from}>`,
      to: ['m.dytrich@seznam.cz'],
      replyTo: email,
      subject: `Nová poptávka od ${safeName}${safeProduct ? ` – ${safeProduct}` : ''}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1e293b;">
          <h2>Nová poptávka – VÁHY-DYCHL</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#64748b;width:120px;"><strong>Jméno:</strong></td><td>${safeName}</td></tr>
            ${safePhone ? `<tr><td style="padding:8px 0;color:#64748b;"><strong>Telefon:</strong></td><td><a href="tel:${safePhone}">${safePhone}</a></td></tr>` : ''}
            <tr><td style="padding:8px 0;color:#64748b;"><strong>E-mail:</strong></td><td><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
            ${safeProduct ? `<tr><td style="padding:8px 0;color:#64748b;"><strong>Produkt:</strong></td><td>${safeProduct}</td></tr>` : ''}
          </table>
          <hr style="margin:16px 0;" />
          <strong>Zpráva:</strong>
          <p style="white-space:pre-wrap;">${safeMessage}</p>
        </div>
      `,
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Email error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
