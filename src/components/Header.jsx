import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowIcon, CloudMark } from './Icons.jsx'
const navItems = [
  { id: 'inicio', label: 'Início' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'contato', label: 'Contato' },
]

export default function Header() {
  const { pathname } = useLocation()
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
              to={id === 'projetos' ? '/projetos' : `/#${id}`}
              onClick={() => setOpen(false)}
              className={pathname === '/' && active === id ? 'is-active' : ''}
              aria-current={pathname === '/' && active === id ? 'location' : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link className="header-cta" to="/#contato">
          Vamos conversar <ArrowIcon diagonal />
        </Link>
      </div>
    </header>
  )
}
