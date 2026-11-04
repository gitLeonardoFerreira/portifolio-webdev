import { createClient } from '@supabase/supabase-js'
import { handleContact } from '../server/contactHandler.js'
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Método não permitido.' })
  }
  if (
    !process.env.SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY ||
    !process.env.RESEND_API_KEY ||
    !process.env.CONTACT_TO ||
    !process.env.CONTACT_FROM
  )
    return res.status(503).json({
      error:
        'O formulário está em preparação. Envie sua mensagem diretamente para leomurilobarbosa@gmail.com.',
    })
  if (Number(req.headers['content-length'] || 0) > 12000)
    return res.status(413).json({ error: 'Mensagem maior que o permitido.' })
  let body
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    if (
      !body ||
      typeof body !== 'object' ||
      Array.isArray(body) ||
      Buffer.byteLength(JSON.stringify(body)) > 12000
    )
      throw new Error()
  } catch {
    return res.status(400).json({ error: 'Formato de mensagem inválido.' })
  }
  const db = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  async function sendEmail(data, id) {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': `portfolio-contact/${id}`,
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM,
        to: [process.env.CONTACT_TO],
        reply_to: data.email,
        subject: 'Novo contato pelo portfólio',
        text: `Nome: ${data.name}\nE-mail: ${data.email}\n\n${data.message}`,
      }),
      signal: AbortSignal.timeout(10000),
    })
    if (!response.ok) throw new Error('email_send')
  }
  try {
    const outcome = await handleContact(
      {
        body,
        ip:
          req.headers['x-vercel-forwarded-for']?.split(',')[0] ||
          req.socket?.remoteAddress ||
          'unknown',
        origin: req.headers.origin,
      },
      { db, sendEmail, siteUrl: process.env.SITE_URL, salt: process.env.SUPABASE_SERVICE_ROLE_KEY },
    )
    return res.status(outcome.status).json(outcome.body)
  } catch {
    return res.status(503).json({
      error:
        'Não foi possível concluir o envio. Tente novamente; mensagens reenviadas não serão duplicadas.',
    })
  }
}
