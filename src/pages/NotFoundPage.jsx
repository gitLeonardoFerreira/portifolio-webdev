import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowIcon } from '../components/Icons.jsx'
import Footer from '../components/Footer.jsx'
export default function NotFoundPage() {
  useEffect(() => {
    document.title = 'Página não encontrada — Leonardo Barbosa'
  }, [])
  return (
    <>
      <main className="not-found site-container">
        <span className="section-index">404 / SEM SINAL</span>
        <h1>Essa página saiu de órbita.</h1>
        <p>Vamos voltar para um caminho conhecido?</p>
        <Link className="button button-primary" to="/#inicio">
          Voltar ao início <ArrowIcon diagonal />
        </Link>
      </main>
      <Footer />
    </>
  )
}
