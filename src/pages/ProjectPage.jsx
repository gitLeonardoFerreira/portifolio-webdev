import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useProjects } from '../hooks/useProjects.js'
import AsyncState from '../components/AsyncState.jsx'
import ProjectVisual from '../components/projects/ProjectVisual.jsx'
import ProjectMeta from '../components/projects/ProjectMeta.jsx'
import { ArrowIcon } from '../components/Icons.jsx'
import Footer from '../components/Footer.jsx'
import NotFoundPage from './NotFoundPage.jsx'
export default function ProjectPage() {
  const { slug } = useParams()
  const query = useProjects()
  const projects = query.data || []
  const project = projects.find((item) => item.slug.toLowerCase() === slug?.toLowerCase())
  useEffect(() => {
    document.title = project
      ? `${project.title} — Leonardo Barbosa`
      : 'Projeto não encontrado — Leonardo Barbosa'
  }, [project])
  if (query.isPending || query.isError)
    return (
      <main className="page-shell site-container">
        <h1>Projeto</h1>
        <AsyncState query={query} />
      </main>
    )
  if (!project) return <NotFoundPage />
  const next = projects[(projects.indexOf(project) + 1) % projects.length]
  return (
    <>
      <main className="case-study">
        <div className="case-hero">
          <div className="site-container">
            <Link className="back-link" to="/projetos">
              ← Voltar aos projetos
            </Link>
            <div className="case-heading">
              <span className="eyebrow">
                {project.number} / {project.eyebrow}
              </span>
              <h1>
                {project.title}
                <span>.</span>
              </h1>
              <p>{project.description}</p>
            </div>
            <div className="case-meta">
              <div>
                <span>TIPO</span>
                <strong>{project.eyebrow.split(' · ')[0]}</strong>
              </div>
              <div>
                <span>TECNOLOGIAS</span>
                <strong>{project.tags.join(' · ')}</strong>
              </div>
              <div>
                <span>ESTADO</span>
                <strong>{project.status}</strong>
              </div>
            </div>
            <ProjectMeta project={project} />
            <ProjectVisual project={project} />
          </div>
        </div>
        <div className="site-container case-content">
          <div className="case-intro">
            <span className="section-index">VISÃO GERAL</span>
            <p>{project.summary}</p>
            <a
              className="button button-outline"
              href={project.repository}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver código no GitHub <ArrowIcon diagonal />
            </a>
          </div>
          <div className="case-story">
            <article className="case-story-row">
              <span>01 / O PROBLEMA</span>
              <div>
                <h2>O ponto de partida.</h2>
                <p>{project.problem}</p>
              </div>
            </article>
            <article className="case-story-row">
              <span>02 / A SOLUÇÃO</span>
              <div>
                <h2>O que construí.</h2>
                <p>{project.solution}</p>
                <div
                  className="journey-flow"
                  aria-label={`Etapas do projeto: ${(project.journey || []).join(', ')}`}
                >
                  {(project.journey || []).map((step, index) => (
                    <span key={step}>
                      <small>{String(index + 1).padStart(2, '0')}</small>
                      {step}
                    </span>
                  ))}
                </div>
              </div>
            </article>
            <article className="case-story-row" hidden={!project.decisions?.length}>
              <span>03 / DECISÕES</span>
              <div>
                <h2>Por dentro do projeto.</h2>
                <div className="decision-list">
                  {(project.decisions || []).map((decision) => (
                    <div key={decision.title}>
                      <h3>{decision.title}</h3>
                      <p>{decision.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
            <article className="case-story-row">
              <span>04 / APRENDIZADO</span>
              <div>
                <h2>O que levo daqui.</h2>
                <p>{project.learning}</p>
                <p className="case-note">{project.note}</p>
              </div>
            </article>
          </div>
        </div>
        <div className="case-next">
          <div className="site-container">
            <span>PRÓXIMO PROJETO</span>
            <Link to={`/projetos/${next.slug}`}>
              {next.title} <ArrowIcon diagonal />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
