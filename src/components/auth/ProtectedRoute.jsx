import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.js'
export default function ProtectedRoute({ children }) {
  const auth = useAuth()
  const location = useLocation()
  if (auth.loading)
    return (
      <main className="page-shell site-container" role="status">
        Verificando acesso…
      </main>
    )
  if (!auth.user) return <Navigate to="/login" state={{ from: location.pathname }} replace />
  return children
}
