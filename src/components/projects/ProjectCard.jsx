import { Link } from 'react-router-dom'
import { ArrowIcon } from '../Icons.jsx'
import ProjectVisual from './ProjectVisual.jsx'
import ProjectMeta from './ProjectMeta.jsx'
export default function ProjectCard({ project, onOpen }) {
  function moveGlow(event) {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }
  return (
    <article className={`project-card project-card-${project.color}`}>
      <Link
        to={`/projetos/${project.slug}`}
        className="project-card-link"
        onPointerMove={moveGlow}
        onClick={onOpen ? (event) => onOpen(event, project) : undefined}
        aria-label={`Ver estudo de caso do projeto ${project.title}`}
      >
        <div className="project-card-copy">
          <span className="project-number">
            {project.number} <span className="project-separator" /> {project.eyebrow}
          </span>
          <div>
            <h3>{project.title}</h3>
            <p>{project.summary}</p>
          </div>
          <ProjectMeta project={project} />
          <div className="project-bottom">
            <div className="tag-row">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <span className="round-arrow">
              <ArrowIcon diagonal />
            </span>
          </div>
        </div>
        <ProjectVisual project={project} />
      </Link>
    </article>
  )
}
