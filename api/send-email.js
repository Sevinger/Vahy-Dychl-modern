import { Resend } from 'resend';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, phone, email, message, product } = req.body;
  if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' });

  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

  try {
    await resend.emails.send({
      from: `VÁHY-DYCHL <${from}>`,
      to: ['m.dytrich@seznam.cz'],
      replyTo: email,
      subject: `Nová poptávka od ${name}${product ? ` – ${product}` : ''}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1e293b;">
          <h2>Nová poptávka – VÁHY-DYCHL</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#64748b;width:120px;"><strong>Jméno:</strong></td><td>${name}</td></tr>
            ${phone ? `<tr><td style="padding:8px 0;color:#64748b;"><strong>Telefon:</strong></td><td><a href="tel:${phone}">${phone}</a></td></tr>` : ''}
            <tr><td style="padding:8px 0;color:#64748b;"><strong>E-mail:</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
            ${product ? `<tr><td style="padding:8px 0;color:#64748b;"><strong>Produkt:</strong></td><td>${product}</td></tr>` : ''}
          </table>
          <hr style="margin:16px 0;" />
          <strong>Zpráva:</strong>
          <p style="white-space:pre-wrap;">${message}</p>
        </div>
      `,
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Email error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
