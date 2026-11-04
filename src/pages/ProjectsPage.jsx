import { useMemo, useState, useEffect } from 'react'
import { useProjects } from '../hooks/useProjects.js'
import ProjectCard from '../components/projects/ProjectCard.jsx'
import AsyncState from '../components/AsyncState.jsx'
import Footer from '../components/Footer.jsx'
export default function ProjectsPage() {
  const query = useProjects()
  const [search, setSearch] = useState('')
  const [language, setLanguage] = useState('')
  useEffect(() => {
    document.title = 'Projetos — Leonardo Barbosa'
  }, [])
  const projects = useMemo(
    () =>
      (query.data || []).filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) &&
          (!language || item.language === language),
      ),
    [query.data, search, language],
  )
  const languages = [
    ...new Set((query.data || []).map((item) => item.language).filter(Boolean)),
  ].sort()
  return (
    <>
      <main className="page-shell site-container">
        <h1 className="page-heading">Do problema ao projeto.</h1>
        <p className="page-intro">
          Meu trabalho em construção. Repositórios públicos, atualizados diretamente pelo GitHub.
        </p>
        <div className="project-filters">
          <div>
            <label htmlFor="search">Buscar projeto</label>
            <input
              id="search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Nome do repositório"
            />
          </div>
          <div>
            <label htmlFor="language">Linguagem</label>
            <select
              id="language"
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
            >
              <option value="">Todas as linguagens</option>
              {languages.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>
        <AsyncState query={query} empty="Ainda não há repositórios públicos.">
          <div className="project-stack catalog-stack">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          {!projects.length && (
            <div className="state-panel">
              <h2>Nenhum projeto encontrado.</h2>
              <p>Tente outro nome ou remova o filtro de linguagem.</p>
              <button
                className="button button-outline"
                onClick={() => {
                  setSearch('')
                  setLanguage('')
                }}
              >
                Limpar filtros
              </button>
            </div>
          )}
        </AsyncState>
      </main>
      <Footer />
    </>
  )
}
