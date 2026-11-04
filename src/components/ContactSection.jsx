import { useState } from 'react'
import { buildWhatsAppUrl, CONTACT_EMAIL } from '../lib/contact.js'
import Reveal from './Reveal.jsx'
import { ArrowIcon, CloudMark } from './Icons.jsx'
export default function ContactSection({ flight = false }) {
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const url = buildWhatsAppUrl({ name, company, message })
    window.location.assign(url)
  }

  return (
    <section id={flight ? undefined : 'contato'} className="contact-section section-anchor">
      <div className="contact-glow" aria-hidden="true" />
      <div className="site-container contact-grid">
        <Reveal className="contact-copy">
          <span className="section-index">04 / CONTATO</span>
          <h2>
            Uma boa ideia
            <br />
            começa com
            <br />
            <em>uma conversa.</em>
          </h2>
          <p>
            Tem uma oportunidade de estágio ou um projeto para discutir? Me conte o que você está
            construindo.
          </p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="contact-email">
            {CONTACT_EMAIL} <ArrowIcon diagonal />
          </a>
        </Reveal>
        <Reveal className="contact-form-wrap">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-top">
              <span>ENVIAR UMA MENSAGEM</span>
              <CloudMark />
            </div>
            <label htmlFor="contact-name">Seu nome</label>
            <input
              id="contact-name"
              name="name"
              autoComplete="name"
              placeholder="Como posso te chamar?"
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={80}
              required
            />
            <label htmlFor="contact-company">
              Empresa <span>(opcional)</span>
            </label>
            <input
              id="contact-company"
              name="organization"
              autoComplete="organization"
              placeholder="De onde você fala?"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              maxLength={100}
            />
            <label htmlFor="contact-message">Sua mensagem</label>
            <textarea
              id="contact-message"
              name="message"
              placeholder="Conte um pouco sobre a oportunidade ou sua ideia..."
              rows="4"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              maxLength={1200}
              required
            />
            <button type="submit" className="button button-primary form-submit">
              Continuar no WhatsApp <ArrowIcon diagonal />
            </button>
            <p className="form-note">
              A conversa abre no WhatsApp para você revisar e enviar a mensagem.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
