import { describe, it, expect } from 'vitest'
import { validateContact } from '../shared/contact.js'
const valid = {
  name: 'Leonardo',
  email: 'leo@example.com',
  message: 'Quero conversar sobre uma oportunidade de estágio.',
}
describe('validação compartilhada', () => {
  it('normaliza os campos e aceita contato válido', () => {
    expect(validateContact({ ...valid, name: '  Leonardo  ' }).data.name).toBe('Leonardo')
    expect(validateContact(valid).valid).toBe(true)
  })
  it('retorna um erro específico para cada campo', () => {
    expect(validateContact({ name: ' ', email: 'invalido', message: 'curta' }).errors).toEqual({
      name: expect.stringContaining('2 e 80'),
      email: expect.stringContaining('válido'),
      message: expect.stringContaining('20 e 2.000'),
    })
  })
  it.each([19, 2001])('rejeita mensagem com %i caracteres', (length) =>
    expect(validateContact({ ...valid, message: 'a'.repeat(length) }).errors.message).toBeDefined(),
  )
  it.each([20, 2000])('aceita mensagem no limite de %i caracteres', (length) =>
    expect(validateContact({ ...valid, message: 'a'.repeat(length) }).valid).toBe(true),
  )
  it('não aceita campos de tipo inesperado', () =>
    expect(validateContact({ name: [], email: 42, message: {} }).valid).toBe(false))
})
