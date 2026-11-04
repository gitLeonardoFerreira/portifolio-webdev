import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useProjects } from '../../hooks/useProjects.js'
import { fetchOwnerFeatured, saveFeatured } from '../../services/dashboard.js'
import AsyncState from '../AsyncState.jsx'
function Editor({ initial, projects }) {
  const [selected, setSelected] = useState(initial)
  const client = useQueryClient()
  const mutation = useMutation({
    mutationFn: saveFeatured,
    onSuccess: () => client.invalidateQueries({ queryKey: ['featured'] }),
  })
  return (
    <>
      <fieldset disabled={mutation.isPending}>
        <legend>Selecione até três projetos para o voo da home.</legend>
        {projects.map((project) => (
          <label className="project-option" key={project.slug}>
            <input
              type="checkbox"
              checked={selected.includes(project.slug)}
              disabled={!selected.includes(project.slug) && selected.length >= 3}
              onChange={(event) => {
                setSelected((current) =>
                  event.target.checked
                    ? [...current, project.slug]
                    : current.filter((slug) => slug !== project.slug),
                )
                mutation.reset()
              }}
            />
            {project.title}
          </label>
        ))}
      </fieldset>
      <button
        className="button button-primary"
        disabled={mutation.isPending}
        onClick={() => mutation.mutate(selected)}
      >
        {mutation.isPending ? 'Salvando…' : 'Salvar destaques'}
      </button>
      {mutation.isSuccess && <p role="status">Destaques atualizados. A home já usa sua seleção.</p>}
      {mutation.isError && (
        <p role="alert" className="field-error">
          {mutation.error.message}
        </p>
      )}
    </>
  )
}
export default function FeaturedEditor() {
  const projects = useProjects()
  const settings = useQuery({
    queryKey: ['owner-featured'],
    queryFn: fetchOwnerFeatured,
    retry: false,
  })
  return (
    <section className="dashboard-section">
      <h2>Destaques da home</h2>
      <AsyncState query={projects}>
        {settings.isPending ? (
          <p role="status">Carregando seleção…</p>
        ) : settings.isError ? (
          <div role="alert">
            <p>{settings.error.message}</p>
            <button className="button button-outline" onClick={() => settings.refetch()}>
              Tentar novamente
            </button>
          </div>
        ) : (
          <Editor
            initial={settings.data || projects.featured.map((item) => item.slug)}
            projects={projects.data}
          />
        )}
      </AsyncState>
    </section>
  )
}
