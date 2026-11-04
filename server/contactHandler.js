import { createHash } from 'node:crypto'
import { validateContact } from '../shared/contact.js'
const hash = (value) => createHash('sha256').update(value).digest('hex')
export async function handleContact(
  { body, ip = 'unknown', origin },
  { db, sendEmail, siteUrl, salt },
) {
  if (origin && siteUrl && origin !== siteUrl)
    return { status: 403, body: { error: 'Origem de envio não permitida.' } }
  const { data, errors, valid } = validateContact(body)
  if (!valid)
    return { status: 400, body: { error: 'Confira os campos indicados.', fields: errors } }
  if (body.website) return { status: 400, body: { error: 'Não foi possível validar o envio.' } }
  if (
    typeof body.requestId !== 'string' ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(body.requestId)
  )
    return { status: 400, body: { error: 'Identificador de envio inválido. Recarregue a página.' } }
  const fingerprint = hash(JSON.stringify(data))
  const { data: existing, error: readError } = await db
    .from('contact_messages')
    .select('*')
    .eq('id', body.requestId)
    .maybeSingle()
  if (readError) throw new Error('database_read')
  if (existing && existing.payload_hash !== fingerprint)
    return {
      status: 409,
      body: { error: 'Este envio já foi usado com outra mensagem. Recarregue a página.' },
    }
  if (existing?.email_status === 'sent')
    return { status: 200, body: { saved: true, emailSent: true } }
  const { data: allowed, error: rateError } = await db.rpc('consume_contact_rate', {
    rate_key: hash(`${salt}:${ip}`),
  })
  if (rateError) throw new Error('rate_limit_unavailable')
  if (!allowed)
    return {
      status: 429,
      body: { error: 'Muitas tentativas de envio. Aguarde uma hora e tente novamente.' },
    }
  if (!existing) {
    const { error } = await db
      .from('contact_messages')
      .insert({ id: body.requestId, ...data, payload_hash: fingerprint })
    if (error && error.code !== '23505') throw new Error('database_insert')
    if (error?.code === '23505') {
      const { data: concurrent, error: concurrentError } = await db
        .from('contact_messages')
        .select('payload_hash')
        .eq('id', body.requestId)
        .single()
      if (concurrentError || concurrent.payload_hash !== fingerprint)
        return { status: 409, body: { error: 'Identificador de envio já utilizado.' } }
    }
  }
  let sent = false
  try {
    await sendEmail(data, body.requestId)
    sent = true
  } catch {
    /* durable record remains in dashboard; a retry uses the same idempotency key */
  }
  const { error: updateError } = await db
    .from('contact_messages')
    .update({ email_status: sent ? 'sent' : 'failed' })
    .eq('id', body.requestId)
  if (updateError) return { status: 202, body: { saved: true, emailSent: false } }
  return { status: sent ? 200 : 202, body: { saved: true, emailSent: sent } }
}
