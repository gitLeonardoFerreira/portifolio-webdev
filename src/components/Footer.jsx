import { Link } from 'react-router-dom'
import { CONTACT_EMAIL } from '../lib/contact.js'
import { ArrowIcon } from './Icons.jsx'
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-inner">
        <Link className="footer-brand" to="/#inicio">
          léo
        </Link>
        <p>Feito com curiosidade, código e um pouco de céu.</p>
        <div className="footer-links">
          <Link to="/login">Área do dono</Link>
          <a
            href="https://github.com/gitLeonardoFerreira"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <ArrowIcon diagonal />
          </a>
          <a
            href="https://www.linkedin.com/in/leonardo-barbosa-102615-"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn <ArrowIcon diagonal />
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`}>
            E-mail <ArrowIcon diagonal />
          </a>
        </div>
      </div>
      <div className="site-container footer-base">
        <span>© {new Date().getFullYear()} LEONARDO BARBOSA</span>
        <Link to="/#inicio">VOLTAR AO TOPO</Link>
      </div>
    </footer>
  )
}
