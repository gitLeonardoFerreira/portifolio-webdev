export const CONTACT_EMAIL = 'leomurilobarbosa@gmail.com'
export function validateContact(input = {}) {
  const errors = {}
  const name = typeof input.name === 'string' ? input.name.trim() : ''
  const email = typeof input.email === 'string' ? input.email.trim() : ''
  const message = typeof input.message === 'string' ? input.message.trim() : ''
  if (name.length < 2 || name.length > 80)
    errors.name = 'Informe seu nome, entre 2 e 80 caracteres.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254)
    errors.email = 'Informe um e-mail válido.'
  if (message.length < 20 || message.length > 2000)
    errors.message = 'Escreva uma mensagem entre 20 e 2.000 caracteres.'
  return { errors, data: { name, email, message }, valid: Object.keys(errors).length === 0 }
}
