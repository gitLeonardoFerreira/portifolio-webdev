import { useEffect, useRef, useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useProjects } from '../../hooks/useProjects.js'
import AsyncState from '../AsyncState.jsx'
import ProjectCard from '../projects/ProjectCard.jsx'
import Hero from './Hero.jsx'
import { JourneySection } from './ProfileSections.jsx'
import SectionHeading from '../SectionHeading.jsx'
import OrbitArt from '../OrbitArt.jsx'
import ContactSection from '../ContactSection.jsx'
import { CONTACT_EMAIL } from '../../lib/contact.js'
import { CartoonCloud, ArrowIcon } from '../Icons.jsx'
export default function FlightExperience() {
  const query = useProjects()
  const projects = useMemo(
    () => (query.isPending ? [null, null, null] : query.featured.length ? query.featured : [null]),
    [query.isPending, query.featured],
  )
  const flightStops = useMemo(
    () => [
      { label: 'Início', anchor: 'inicio' },
      ...projects.map((project, index) => ({
        label: project?.title || 'Projetos',
        anchor: index === 0 ? 'projetos' : undefined,
      })),
      { label: 'Sobre', anchor: 'sobre' },
      { label: 'Minha história' },
      { label: 'Trajetória' },
      { label: 'Contato', anchor: 'contato' },
      { label: 'Mensagem' },
    ],
    [projects],
  )
  const railRef = useRef(null)
  const departureTimer = useRef(null)
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(0)
  const [departing, setDeparting] = useState(false)

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    const scenes = [...rail.querySelectorAll('.flight-scene')]
    const clouds = [...rail.querySelectorAll('.flight-cloud')]
    let frame = 0
    let currentIndex = -1

    function update() {
      const headerHeight = document.querySelector('.site-header')?.offsetHeight ?? 0
      const step = rail.querySelector('.flight-stage').offsetHeight
      const progress = Math.max(
        0,
        Math.min(flightStops.length - 1, (headerHeight - rail.getBoundingClientRect().top) / step),
      )
      const closest = Math.round(progress)

      scenes.forEach((scene, index) => {
        const distance = index - progress
        const arriving = distance >= 0
        const opacity = arriving
          ? Math.max(0, Math.min(1, (1 - distance - 0.42) / 0.58))
          : Math.max(0, Math.min(1, 1 - -distance / 0.44))
        const scale = arriving ? 0.32 + 0.68 * (1 - distance) : 1 + -distance * 1.55
        scene.style.opacity = opacity.toFixed(3)
        scene.style.transform = `translate3d(0, 0, 0) scale(${scale.toFixed(3)})`
        scene.style.visibility = opacity > 0.005 ? 'visible' : 'hidden'
        scene.style.pointerEvents = index === closest ? 'auto' : 'none'
        scene.style.zIndex = index <= progress ? '2' : '1'
        scene.inert = index !== closest
        scene.setAttribute('aria-hidden', String(index !== closest))
      })

      clouds.forEach((cloud, index) => {
        const phase = (progress * 0.8 + index / clouds.length) % 1
        cloud.style.setProperty('--cloud-phase', phase.toFixed(3))
        cloud.style.opacity = (Math.sin(Math.PI * phase) * 0.46).toFixed(3)
      })
      rail.style.setProperty('--flight-travel', (progress / (flightStops.length - 1)).toFixed(3))
      if (closest !== currentIndex) {
        currentIndex = closest
        rail.dataset.current = String(closest)
        setActiveIndex(closest)
      }
      frame = 0
    }

    function scheduleUpdate() {
      if (!frame) frame = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    update()
    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [flightStops])

  useEffect(() => () => window.clearTimeout(departureTimer.current), [])

  function goToStop(index) {
    railRef.current?.querySelectorAll('.flight-marker')[index]?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
      block: 'start',
    })
  }

  function openProject(event, project) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return
    event.preventDefault()
    navigate('/', { replace: true, state: { flightReturn: activeIndex } })
    setDeparting(true)
    departureTimer.current = window.setTimeout(() => navigate(`/projetos/${project.slug}`), 560)
  }

  return (
    <div
      ref={railRef}
      className={`flight-rail ${departing ? 'is-departing' : ''}`}
      style={{ '--scene-count': flightStops.length }}
    >
      <div className="flight-stage">
        <div className="flight-atmosphere" aria-hidden="true">
          <div className="flight-horizon" />
          <span className="flight-sun" />
          {Array.from({ length: 6 }, (_, index) => (
            <CartoonCloud key={index} className={`flight-cloud flight-cloud-${index + 1}`} />
          ))}
        </div>

        <div className="flight-scene flight-scene-intro" data-scene="inicio">
          <Hero flight />
        </div>

        {projects.map((project, index) => (
          <div
            className="flight-scene flight-scene-project"
            data-scene={project?.slug || `loading-${index}`}
            key={project?.slug || index}
          >
            <div className="flight-scene-inner flight-project-layout">
              <div className="flight-project-heading">
                <span className="section-index">
                  01 / PROJETOS · {index + 1} DE {projects.length}
                </span>
                {index === 0 ? (
                  <h2>
                    Projetos com <em>propósito.</em>
                  </h2>
                ) : (
                  <p>Da ideia ao código: projetos para resolver problemas reais.</p>
                )}
              </div>
              {project ? (
                <ProjectCard project={project} onOpen={openProject} />
              ) : (
                <AsyncState
                  query={query}
                  empty="Nenhum projeto em destaque. Explore o catálogo completo."
                />
              )}
              <Link className="catalog-link text-link" to="/projetos">
                Ver todos os projetos
              </Link>
            </div>
          </div>
        ))}

        <div className="flight-scene flight-scene-about" data-scene="sobre">
          <div className="flight-scene-inner flight-about-intro">
            <SectionHeading
              index="02"
              label="SOBRE MIM"
              title={
                <>
                  Curiosidade que <em>vira construção.</em>
                </>
              }
            />
            <div className="flight-about-intro-grid">
              <OrbitArt active={activeIndex === projects.length + 1} />
              <p className="flight-about-statement">
                Gosto de entender <em>como as coisas funcionam</em> — e de encontrar um jeito mais
                claro, seguro e útil de fazê-las acontecer.
              </p>
            </div>
          </div>
        </div>

        <div className="flight-scene flight-scene-story" data-scene="historia">
          <div className="flight-scene-inner flight-story-layout">
            <div className="flight-story-heading">
              <span className="section-index">02 / SOBRE MIM</span>
              <h2>
                Prazer, <em>Leonardo.</em>
              </h2>
            </div>
            <div className="flight-story-body">
              <p>
                Sou Leonardo Barbosa, estudante do 2º semestre de Engenharia de Software na FIAP, em
                São Paulo. Tenho me dedicado a backend Python, aplicações web e automação. Também
                estudo IA e caminho para a área de cloud security.
              </p>
              <p>
                Antes do código, trabalhei coordenando entregas e operações criativas. Essa
                experiência me ensinou a lidar com prioridades, colaborar e transformar demandas
                abertas em próximos passos concretos — algo que hoje levo para o desenvolvimento de
                software.
              </p>
              <div className="about-facts">
                <div>
                  <span>BASE</span>
                  <strong>São Paulo, SP</strong>
                </div>
                <div>
                  <span>FORMAÇÃO</span>
                  <strong>Engenharia de Software · FIAP</strong>
                </div>
                <div>
                  <span>OBJETIVO</span>
                  <strong>Estágio em desenvolvimento de software</strong>
                </div>
              </div>
              <a
                className="text-link about-resume"
                href={`${import.meta.env.BASE_URL}Leonardo_Barbosa_Curriculo.pdf`}
                download
              >
                Baixar currículo <ArrowIcon diagonal />
              </a>
            </div>
          </div>
        </div>

        <div className="flight-scene flight-scene-journey" data-scene="trajetoria">
          <JourneySection />
        </div>

        <div className="flight-scene flight-scene-contact-intro" data-scene="contato">
          <div className="flight-scene-inner flight-contact-intro">
            <span className="section-index">04 / CONTATO</span>
            <h2>
              Uma boa ideia começa com <em>uma conversa.</em>
            </h2>
            <p>
              Tem uma oportunidade de estágio ou um projeto para discutir? Me conte o que você está
              construindo.
            </p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="contact-email">
              {CONTACT_EMAIL} <ArrowIcon diagonal />
            </a>
            <button
              className="flight-contact-next"
              type="button"
              onClick={() => goToStop(flightStops.length - 1)}
            >
              Escrever uma mensagem <ArrowIcon />
            </button>
          </div>
        </div>

        <div className="flight-scene flight-scene-contact-form" data-scene="mensagem">
          <div className="flight-scene-inner flight-form-layout">
            <ContactSection flight />
            <div className="flight-final-links">
              <span>© {new Date().getFullYear()} LEONARDO BARBOSA</span>
              <Link to="/login">Área do dono</Link>
              <a href="https://github.com/gitLeonardoFerreira" target="_blank" rel="noreferrer">
                GitHub <ArrowIcon diagonal />
              </a>
              <a
                href="https://www.linkedin.com/in/leonardo-barbosa-102615-"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn <ArrowIcon diagonal />
              </a>
            </div>
          </div>
        </div>

        <div className="flight-hud" aria-label="Navegação pelas cenas">
          <span className="flight-hud-current">
            {String(activeIndex + 1).padStart(2, '0')} /{' '}
            {String(flightStops.length).padStart(2, '0')}{' '}
            <strong>{flightStops[activeIndex]?.label}</strong>
          </span>
          <div className="flight-hud-track" aria-hidden="true">
            <span />
          </div>
          <div className="flight-hud-controls">
            <button
              type="button"
              aria-label="Cena anterior"
              disabled={activeIndex === 0}
              onClick={() => goToStop(activeIndex - 1)}
            >
              ↑
            </button>
            <button
              type="button"
              aria-label="Próxima cena"
              disabled={activeIndex === flightStops.length - 1}
              onClick={() => goToStop(activeIndex + 1)}
            >
              ↓
            </button>
          </div>
        </div>
        <div className="flight-departure" aria-hidden="true" />
      </div>
      {flightStops.map((stop, index) => (
        <span
          key={stop.label}
          id={stop.anchor}
          className="flight-marker section-anchor"
          data-flight-marker
          style={{ top: `calc(var(--flight-step) * ${index})` }}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}
