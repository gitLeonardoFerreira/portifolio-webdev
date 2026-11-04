import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from '../src/components/ContactForm.jsx'
import { sendContact } from '../src/services/contact.js'
vi.mock('../src/services/contact.js', () => ({ sendContact: vi.fn() }))
async function fill(user) {
  await user.type(screen.getByLabelText('Seu nome'), 'Maria')
  await user.type(screen.getByLabelText('Seu e-mail'), 'maria@example.com')
  await user.type(
    screen.getByLabelText('Sua mensagem'),
    'Tenho uma oportunidade de estágio para conversar.',
  )
}
describe('formulário de contato', () => {
  it('mostra erros por campo e não chama a API', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }))
    expect(screen.getByText('Informe um e-mail válido.')).toBeInTheDocument()
    expect(screen.getByLabelText('Sua mensagem')).toHaveAttribute('aria-invalid', 'true')
    expect(sendContact).not.toHaveBeenCalled()
  })
  it('bloqueia o envio pendente e confirma o sucesso', async () => {
    let resolve
    vi.mocked(sendContact).mockImplementation(
      () =>
        new Promise((done) => {
          resolve = done
        }),
    )
    const user = userEvent.setup()
    render(<ContactForm />)
    await fill(user)
    await user.dblClick(screen.getByRole('button', { name: 'Enviar mensagem' }))
    expect(screen.getByRole('button', { name: 'Enviando…' })).toBeDisabled()
    expect(sendContact).toHaveBeenCalledTimes(1)
    resolve({ saved: true, emailSent: true })
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Mensagem recebida.'))
  })
  it('mantém conteúdo e idempotência ao tentar novamente após erro', async () => {
    vi.mocked(sendContact)
      .mockRejectedValueOnce(new Error('Falha temporária'))
      .mockResolvedValueOnce({ saved: true, emailSent: true })
    const user = userEvent.setup()
    render(<ContactForm />)
    await fill(user)
    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }))
    expect(await screen.findByRole('alert')).toHaveTextContent('Falha temporária')
    expect(screen.getByLabelText('Seu nome')).toHaveValue('Maria')
    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }))
    await screen.findByRole('status')
    expect(sendContact.mock.calls[0][1]).toBe(sendContact.mock.calls[1][1])
  })
  it('distingue persistência de entrega de e-mail', async () => {
    vi.mocked(sendContact).mockResolvedValue({ saved: true, emailSent: false })
    const user = userEvent.setup()
    render(<ContactForm />)
    await fill(user)
    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }))
    expect(await screen.findByRole('status')).toHaveTextContent(
      'notificação por e-mail está pendente',
    )
  })
})

it('oferece novo formulário depois do sucesso', async () => {
  vi.mocked(sendContact).mockResolvedValue({ saved: true, emailSent: true })
  const user = userEvent.setup()
  render(<ContactForm />)
  await fill(user)
  await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }))
  await user.click(await screen.findByRole('button', { name: 'Enviar outra mensagem' }))
  expect(screen.getByLabelText('Seu nome')).toHaveValue('')
  expect(screen.getByRole('button', { name: 'Enviar mensagem' })).toBeEnabled()
})
