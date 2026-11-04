import { useRef, useState } from 'react'
import { validateContact } from '../../shared/contact.js'
import { sendContact } from '../services/contact.js'
export function useContactForm() {
  const [values, setValues] = useState({ name: '', email: '', message: '', website: '' })
  const [errors, setErrors] = useState({})
  const [pending, setPending] = useState(false)
  const [result, setResult] = useState(null)
  const [failure, setFailure] = useState('')
  const inFlight = useRef(false)
  const request = useRef(null)
  function change(field, value) {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    setFailure('')
  }
  function blur(field) {
    setErrors((current) => ({ ...current, [field]: validateContact(values).errors[field] }))
  }
  async function submit(event) {
    event.preventDefault()
    if (inFlight.current) return
    const validated = validateContact(values)
    setErrors(validated.errors)
    if (!validated.valid) {
      event.currentTarget.querySelector(`[name="${Object.keys(validated.errors)[0]}"]`)?.focus()
      return
    }
    const fingerprint = JSON.stringify(validated.data)
    if (request.current?.fingerprint !== fingerprint)
      request.current = { fingerprint, id: crypto.randomUUID() }
    inFlight.current = true
    setPending(true)
    setFailure('')
    setResult(null)
    try {
      const response = await sendContact(
        { ...validated.data, website: values.website },
        request.current.id,
      )
      setResult(response)
      setValues({ name: '', email: '', message: '', website: '' })
      request.current = null
    } catch (error) {
      setFailure(
        error.name === 'TimeoutError'
          ? 'O envio demorou mais que o esperado. Tente novamente; sua mensagem não será duplicada.'
          : error.message,
      )
      if (error.fields) setErrors(error.fields)
    } finally {
      inFlight.current = false
      setPending(false)
    }
  }
  return { values, errors, pending, result, failure, change, blur, submit }
}
