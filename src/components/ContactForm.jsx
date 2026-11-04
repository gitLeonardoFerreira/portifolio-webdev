import { useContactForm } from '../hooks/useContactForm.js'
import { ArrowIcon, CloudMark } from './Icons.jsx'
import { CONTACT_EMAIL } from '../../shared/contact.js'
const fields = [
  {
    name: 'name',
    label: 'Seu nome',
    autoComplete: 'name',
    placeholder: 'Como posso te chamar?',
    maxLength: 80,
  },
  {
    name: 'email',
    label: 'Seu e-mail',
    type: 'email',
    autoComplete: 'email',
    placeholder: 'voce@exemplo.com',
    maxLength: 254,
  },
  {
    name: 'message',
    label: 'Sua mensagem',
    placeholder: 'Conte um pouco sobre a oportunidade ou sua ideia…',
    maxLength: 2000,
  },
]
export default function ContactForm() {
  const form = useContactForm()
  return (
    <form className="contact-form" onSubmit={form.submit} noValidate aria-busy={form.pending}>
      <div className="form-top">
        <span>Enviar uma mensagem</span>
        <CloudMark />
      </div>
      {form.result ? (
        <div role="status" className="form-feedback">
          <h2>Mensagem recebida.</h2>
          <p>
            {form.result.emailSent
              ? 'Obrigado pela conversa. Recebi sua mensagem por e-mail e retorno assim que puder.'
              : 'Sua mensagem foi salva. A notificação por e-mail está pendente, mas já posso consultá-la no meu painel.'}
          </p>
          <button
            className="button button-outline"
            type="button"
            onClick={() => window.location.reload()}
          >
            Voltar ao portfólio
          </button>
        </div>
      ) : (
        <>
          {fields.map((field) => {
            const Tag = field.name === 'message' ? 'textarea' : 'input'
            return (
              <div className="form-field" key={field.name}>
                <label htmlFor={`contact-${field.name}`}>{field.label}</label>
                <Tag
                  {...field}
                  id={`contact-${field.name}`}
                  label={undefined}
                  rows={field.name === 'message' ? 3 : undefined}
                  type={field.type || (Tag === 'input' ? 'text' : undefined)}
                  value={form.values[field.name]}
                  onChange={(event) => form.change(field.name, event.target.value)}
                  onBlur={() => form.blur(field.name)}
                  aria-invalid={Boolean(form.errors[field.name])}
                  aria-describedby={form.errors[field.name] ? `error-${field.name}` : undefined}
                  required
                  disabled={form.pending}
                />
                {form.errors[field.name] && (
                  <p id={`error-${field.name}`} className="field-error">
                    {form.errors[field.name]}
                  </p>
                )}
              </div>
            )
          })}
          <div className="honeypot" aria-hidden="true">
            <label htmlFor="contact-website">Deixe este campo em branco</label>
            <input
              id="contact-website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={form.values.website}
              onChange={(event) => form.change('website', event.target.value)}
            />
          </div>
          {form.failure && (
            <p role="alert" className="field-error">
              {form.failure} <a href={`mailto:${CONTACT_EMAIL}`}>Enviar por e-mail</a>.
            </p>
          )}
          <button
            type="submit"
            className="button button-primary form-submit"
            disabled={form.pending}
          >
            {form.pending ? (
              <>
                <span className="spinner" aria-hidden="true" />
                Enviando…
              </>
            ) : (
              <>
                Enviar mensagem <ArrowIcon diagonal />
              </>
            )}
          </button>
          <p className="form-note">
            Usarei seus dados somente para responder ao contato. A mensagem fica salva em uma área
            privada.
          </p>
        </>
      )}
    </form>
  )
}
