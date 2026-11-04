import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowIcon, CartoonCloud } from '../Icons.jsx'
export default function Hero({ flight = false }) {
  const heroRef = useRef(null)

  useEffect(() => {
    const hero = heroRef.current
    if (flight || !hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    function update() {
      const distance = Math.max(0, Math.min(-hero.getBoundingClientRect().top, hero.offsetHeight))
      hero.style.setProperty('--hero-depth', (distance / hero.offsetHeight).toFixed(3))
      hero.style.setProperty('--cloud-shift', `${Math.round(distance * -0.12)}px`)
      hero.style.setProperty('--sun-shift', `${Math.round(distance * 0.055)}px`)
      frame = 0
    }
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [flight])

  return (
    <section id={flight ? undefined : 'inicio'} ref={heroRef} className="hero section-anchor">
      <div className="hero-stars" aria-hidden="true" />
      <div className="site-container hero-layout">
        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow">
            <span className="live-dot" /> DISPONÍVEL PARA ESTÁGIO · SÃO PAULO
          </div>
          <h1 className="hero-title">
            <span>LEONARDO</span>
            <span>
              BARBOSA<span className="hero-period">.</span>
            </span>
          </h1>
          <p className="hero-kicker">
            Ideias no ar. <em>Código no mundo real.</em>
          </p>
          <p className="hero-description">
            Estudante de Engenharia de Software. Crio soluções em Python, web e IA, com interesse
            crescente em cloud security.
          </p>
        </div>
        <div className="hero-cloud-scene">
          <span className="hero-cloud-sun" aria-hidden="true" />
          <span className="hero-cloud-spark" aria-hidden="true">
            ✳
          </span>
          <Link className="hero-cloud-link" to="/#projetos" aria-label="Explorar meus projetos">
            <CartoonCloud className="hero-cloud-shape" />
            <span className="hero-cloud-message">
              <small>PRÓXIMA PARADA</small>
              <strong>Meus projetos</strong>
              <span>
                Explorar <ArrowIcon diagonal />
              </span>
            </span>
          </Link>
        </div>
      </div>
      <div className="site-container hero-foot">
        <span>PORTFÓLIO / 2026</span>
        <span>
          ROLE PARA EXPLORAR <span className="scroll-line" />
        </span>
      </div>
    </section>
  )
}
