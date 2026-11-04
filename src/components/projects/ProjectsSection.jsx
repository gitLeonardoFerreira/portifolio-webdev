import { Link } from 'react-router-dom'
import { useProjects } from '../../hooks/useProjects.js'
import ProjectCard from './ProjectCard.jsx'
import AsyncState from '../AsyncState.jsx'
export default function ProjectsSection() {
  const query = useProjects()
  return (
    <section id="projetos" className="projects-section section-anchor">
      <div className="site-container">
        <h2 className="page-heading">Projetos com propósito.</h2>
        <AsyncState query={query} empty="Ainda não há projetos públicos.">
          <div className="project-stack">
            {query.featured.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          {!query.featured.length && (
            <p>Nenhum projeto em destaque. Explore o catálogo completo.</p>
          )}
        </AsyncState>
        <Link className="text-link" to="/projetos">
          Ver todos os projetos
        </Link>
      </div>
    </section>
  )
}
