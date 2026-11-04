import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import ScrollManager from './components/ScrollManager.jsx'
import HomePage from './pages/HomePage.jsx'
const AuthBoundary = lazy(() => import('./components/auth/AuthBoundary.jsx'))
const ProtectedRoute = lazy(() => import('./components/auth/ProtectedRoute.jsx'))
const LoginPage = lazy(() => import('./pages/LoginPage.jsx'))
const DashboardPage = lazy(() => import('./pages/DashboardPage.jsx'))
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage.jsx'))
const ProjectPage = lazy(() => import('./pages/ProjectPage.jsx'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'))
export default function App() {
  return (
    <>
      <ScrollManager />
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <Header />
      <div id="conteudo">
        <Suspense
          fallback={
            <main className="page-shell site-container" role="status">
              Carregando página…
            </main>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projetos" element={<ProjectsPage />} />
            <Route path="/projetos/:slug" element={<ProjectPage />} />
            <Route
              path="/login"
              element={
                <AuthBoundary>
                  <LoginPage />
                </AuthBoundary>
              }
            />
            <Route
              path="/dashboard"
              element={
                <AuthBoundary>
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                </AuthBoundary>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
    </>
  )
}
