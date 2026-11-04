export async function sendContact(data, requestId) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, requestId }),
    signal: AbortSignal.timeout(20000),
  })
  let result
  try {
    result = await response.json()
  } catch {
    throw new Error('O envio está indisponível agora. Tente novamente ou use o e-mail ao lado.')
  }
  if (!response.ok) {
    const error = new Error(result.error || 'Não foi possível enviar. Tente novamente.')
    error.fields = result.fields
    throw error
  }
  return result
}
