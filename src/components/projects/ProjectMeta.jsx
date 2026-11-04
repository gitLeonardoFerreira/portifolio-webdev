export default function ProjectMeta({ project }) {
  return (
    <p className="repository-meta">
      <span>{project.language || 'Linguagem não informada'}</span>
      <span>
        Atualizado em{' '}
        <time dateTime={project.updatedAt}>
          {new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium' }).format(
            new Date(project.updatedAt),
          )}
        </time>
      </span>
    </p>
  )
}
