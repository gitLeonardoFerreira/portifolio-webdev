import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { usePreferences } from '../context/PreferencesContext.js'
import { ArrowIcon, CloudMark } from './Icons.jsx'
const navItems = [
  { id: 'inicio', label: 'Início' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'contato', label: 'Contato' },
]

export default function Header() {
  const { pathname } = useLocation()
  const { theme, toggleTheme, reading, toggleReading } = usePreferences()
  const [active, setActive] = useState('inicio')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (pathname !== '/') return
    function updateActive() {
      let current = 'inicio'
      navItems.forEach(({ id }) => {
        const section = document.getElementById(id)
        if (section && section.getBoundingClientRect().top <= window.innerHeight * 0.42) {
          current = id
        }
      })
      setActive(current)
    }
    window.addEventListener('scroll', updateActive, { passive: true })
    updateActive()
    return () => window.removeEventListener('scroll', updateActive)
  }, [pathname])

  function isActive(id) {
    if (pathname === '/') return active === id
    return (
      (id === 'projetos' && pathname.startsWith('/projetos')) ||
      (id === 'contato' && pathname === '/contato')
    )
  }

  return (
    <header className="site-header">
      <div className="header-inner site-container">
        <Link
          className="brand"
          to="/#inicio"
          aria-label="léo — Leonardo Barbosa, voltar ao início"
          onClick={() => setOpen(false)}
        >
          <CloudMark className="brand-cloud" />
          <span>léo</span>
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="main-navigation"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
        <nav
          id="main-navigation"
          className={`main-nav ${open ? 'is-open' : ''}`}
          aria-label="Navegação principal"
        >
          {navItems.map(({ id, label }) => (
            <Link
              key={id}
              to={id === 'projetos' ? '/projetos' : id === 'contato' ? '/contato' : `/#${id}`}
              onClick={() => setOpen(false)}
              className={isActive(id) ? 'is-active' : ''}
              aria-current={
                isActive(id)
                  ? pathname === '/projetos' || pathname === '/contato'
                    ? 'page'
                    : 'location'
                  : undefined
              }
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="visitor-controls">
          <button className="reading-toggle" aria-pressed={reading} onClick={toggleReading}>
            {reading ? 'Modo voo' : 'Modo leitura'}
          </button>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Ativar tema escuro' : 'Ativar tema claro'}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              {theme === 'light' ? (
                <path d="M20 15.2A8.5 8.5 0 0 1 8.8 4 8.5 8.5 0 1 0 20 15.2Z" />
              ) : (
                <>
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19M5 19l1.4-1.4M17.6 6.4 19 5" />
                </>
              )}
            </svg>
          </button>
        </div>
        <Link className="header-cta" to="/contato">
          Vamos conversar <ArrowIcon diagonal />
        </Link>
      </div>
    </header>
  )
}
