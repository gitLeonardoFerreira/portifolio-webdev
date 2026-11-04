import { useState, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.js'
import { requireSupabase } from '../services/supabase.js'
export default function LoginPage() {
  const auth = useAuth()
  const location = useLocation()
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  useEffect(() => {
    document.title = 'Área do dono — Leonardo Barbosa'
  }, [])
  const from = location.state?.from === '/dashboard' ? '/dashboard' : '/dashboard'
  if (auth.user) return <Navigate to={from} replace />
  async function login(event) {
    event.preventDefault()
    if (pending) return
    const data = new FormData(event.currentTarget)
    setPending(true)
    setError('')
    try {
      const { error } = await requireSupabase().auth.signInWithPassword({
        email: data.get('email').trim(),
        password: data.get('password'),
      })
      if (error) throw error
    } catch {
      setError('Não foi possível entrar. Confira o e-mail e a senha e tente novamente.')
    } finally {
      setPending(false)
    }
  }
  return (
    <main className="page-shell site-container">
      <div className="auth-panel">
        <h1>Área do dono.</h1>
        <p>Mensagens e projetos em destaque, em um só lugar.</p>
        {!auth.configured ? (
          <div role="status" className="state-panel">
            <h2>Área em preparação.</h2>
            <p>O login será ativado após a configuração dos serviços pelo dono do portfólio.</p>
          </div>
        ) : (
          <form onSubmit={login}>
            <label htmlFor="login-email">E-mail</label>
            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="username"
              required
              disabled={pending}
            />
            <label htmlFor="login-password">Senha</label>
            <input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              disabled={pending}
            />
            {(error || auth.error) && (
              <p role="alert" className="field-error">
                {error || auth.error}
              </p>
            )}
            <button className="button button-primary" disabled={pending || auth.loading}>
              {pending ? 'Entrando…' : 'Entrar'}
            </button>
          </form>
        )}
      </div>
    </main>
  )
}
