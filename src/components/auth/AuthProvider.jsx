import { useState, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext.js'
import { supabase } from '../../services/supabase.js'
export default function AuthProvider({ children }) {
  const [state, setState] = useState({ user: null, loading: Boolean(supabase), error: null })
  useEffect(() => {
    if (!supabase) return
    let alive = true
    let revision = 0
    async function verify(session) {
      const current = ++revision
      if (!session) {
        if (alive) setState({ user: null, loading: false, error: null })
        return
      }
      try {
        const { data, error } = await supabase.auth.getUser()
        if (error) throw error
        const { data: owner, error: policyError } = await supabase.rpc('is_owner')
        if (policyError) throw policyError
        if (alive && current === revision)
          setState({
            user: owner ? data.user : null,
            loading: false,
            error: owner ? null : 'Esta conta não tem acesso à área do dono.',
          })
      } catch {
        if (alive && current === revision)
          setState({
            user: null,
            loading: false,
            error: 'Não foi possível verificar sua sessão. Entre novamente.',
          })
      }
    }
    supabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (error) {
          if (alive)
            setState({
              user: null,
              loading: false,
              error: 'Não foi possível verificar sua sessão.',
            })
        } else void verify(data.session)
      })
      .catch(() => {
        if (alive)
          setState({ user: null, loading: false, error: 'Não foi possível verificar sua sessão.' })
      })
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      queueMicrotask(() => {
        if (alive) void verify(session)
      })
    })
    return () => {
      alive = false
      subscription.unsubscribe()
    }
  }, [])
  return (
    <AuthContext.Provider value={{ ...state, configured: Boolean(supabase) }}>
      {children}
    </AuthContext.Provider>
  )
}
