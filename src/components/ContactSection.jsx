import Reveal from './Reveal.jsx'
import ContactForm from './ContactForm.jsx'
import { ArrowIcon } from './Icons.jsx'
import { CONTACT_EMAIL } from '../../shared/contact.js'
export default function ContactSection({ flight = false }) {
  return (
    <section id={flight ? undefined : 'contato'} className="contact-section section-anchor">
      <div className="site-container contact-grid">
        <Reveal className="contact-copy">
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
            {CONTACT_EMAIL}
            <ArrowIcon diagonal />
          </a>
        </Reveal>
        <div className="contact-form-wrap">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
