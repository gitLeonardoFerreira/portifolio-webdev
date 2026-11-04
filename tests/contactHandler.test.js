import { describe, it, expect, vi } from 'vitest'
import { handleContact } from '../server/contactHandler.js'
const input = {
  body: {
    requestId: 'd9428888-122b-4eaa-b451-45230c432faf',
    name: 'Maria',
    email: 'maria@example.com',
    message: 'Gostaria de conversar sobre uma oportunidade.',
  },
  ip: '127.0.0.1',
  origin: 'https://portfolio.example',
}
function deps({ existing = null, allowed = true, insertError = null, readError = null } = {}) {
  const update = vi.fn().mockReturnValue({ eq: vi.fn().mockResolvedValue({ error: null }) })
  const insert = vi.fn().mockResolvedValue({ error: insertError })
  const db = {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          maybeSingle: vi.fn().mockResolvedValue({ data: existing, error: readError }),
        })),
      })),
      insert,
      update,
    })),
    rpc: vi.fn().mockResolvedValue({ data: allowed, error: null }),
  }
  return {
    db,
    sendEmail: vi.fn().mockResolvedValue({}),
    siteUrl: input.origin,
    salt: 'test',
    insert,
    update,
  }
}
describe('contato no servidor', () => {
  it('valida novamente no servidor antes de persistir', async () => {
    const context = deps()
    expect(
      (await handleContact({ ...input, body: { ...input.body, message: 'curta' } }, context))
        .status,
    ).toBe(400)
    expect(context.insert).not.toHaveBeenCalled()
  })
  it('salva e envia e-mail com idempotência', async () => {
    const context = deps()
    expect(await handleContact(input, context)).toMatchObject({
      status: 200,
      body: { saved: true, emailSent: true },
    })
    expect(context.insert).toHaveBeenCalledTimes(1)
    expect(context.sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({ email: 'maria@example.com' }),
      input.body.requestId,
    )
  })
  it('preserva a mensagem quando o provedor de e-mail falha', async () => {
    const context = deps()
    context.sendEmail.mockRejectedValue(new Error('offline'))
    expect(await handleContact(input, context)).toMatchObject({
      status: 202,
      body: { saved: true, emailSent: false },
    })
    expect(context.update).toHaveBeenCalledWith({ email_status: 'failed' })
  })
  it('não envia e-mail se persistência falhar', async () => {
    const context = deps({ insertError: { code: 'DATABASE' } })
    await expect(handleContact(input, context)).rejects.toThrow()
    expect(context.sendEmail).not.toHaveBeenCalled()
  })
  it('limita abuso no banco e não envia nem salva', async () => {
    const context = deps({ allowed: false })
    expect((await handleContact(input, context)).status).toBe(429)
    expect(context.insert).not.toHaveBeenCalled()
    expect(context.sendEmail).not.toHaveBeenCalled()
  })
  it('rejeita idempotência de outra mensagem', async () => {
    expect(
      (await handleContact(input, deps({ existing: { payload_hash: 'different' } }))).status,
    ).toBe(409)
  })
  it('rejeita origem estranha e honeypot', async () => {
    expect((await handleContact({ ...input, origin: 'https://evil.example' }, deps())).status).toBe(
      403,
    )
    expect(
      (await handleContact({ ...input, body: { ...input.body, website: 'spam' } }, deps())).status,
    ).toBe(400)
  })
})
