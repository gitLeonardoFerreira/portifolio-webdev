import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from '../src/components/auth/ProtectedRoute.jsx'
import { AuthContext } from '../src/context/AuthContext.js'
function view(auth) {
  return render(
    <MemoryRouter initialEntries={['/dashboard']}>
      <AuthContext.Provider value={auth}>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <h1>Mensagens privadas</h1>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<h1>Entrar</h1>} />
        </Routes>
      </AuthContext.Provider>
    </MemoryRouter>,
  )
}
describe('dashboard protegido', () => {
  it('redireciona sem login e não renderiza dados privados', () => {
    view({ user: null, loading: false })
    expect(screen.getByRole('heading', { name: 'Entrar' })).toBeInTheDocument()
    expect(screen.queryByText('Mensagens privadas')).not.toBeInTheDocument()
  })
  it('aguarda verificação da sessão', () => {
    view({ user: null, loading: true })
    expect(screen.getByRole('status')).toHaveTextContent('Verificando')
    expect(screen.queryByText('Mensagens privadas')).not.toBeInTheDocument()
  })
  it('permite dono autenticado', () => {
    view({ user: { id: 'owner' }, loading: false })
    expect(screen.getByRole('heading', { name: 'Mensagens privadas' })).toBeInTheDocument()
  })
})
