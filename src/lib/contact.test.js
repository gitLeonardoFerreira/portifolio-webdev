import { test } from 'vitest'
import assert from 'node:assert/strict'
import { buildWhatsAppUrl, WHATSAPP_NUMBER } from './contact.js'

test('gera conversa no número correto preservando acentos e quebras de linha', () => {
  const url = new URL(
    buildWhatsAppUrl({
      name: '  João  ',
      company: ' Empresa & Cia ',
      message: 'Olá! Temos uma oportunidade em São Paulo.',
    }),
  )

  assert.equal(url.origin, 'https://wa.me')
  assert.equal(url.pathname, `/${WHATSAPP_NUMBER}`)
  assert.equal(
    url.searchParams.get('text'),
    'Olá, Leonardo! Vim pelo seu portfólio.\n\nMeu nome é João, da Empresa & Cia.\n\nOlá! Temos uma oportunidade em São Paulo.',
  )
})

test('empresa é opcional e campos essenciais não podem ficar vazios', () => {
  const url = new URL(buildWhatsAppUrl({ name: 'Ana', company: '', message: 'Vamos conversar?' }))
  assert.match(url.searchParams.get('text'), /Meu nome é Ana\./)
  assert.throws(() => buildWhatsAppUrl({ name: ' ', company: '', message: 'Oi' }), /nome/)
  assert.throws(() => buildWhatsAppUrl({ name: 'Ana', company: '', message: ' ' }), /mensagem/)
})
