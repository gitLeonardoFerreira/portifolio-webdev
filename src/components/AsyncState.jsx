export default function AsyncState({ query, empty = 'Nenhum resultado por enquanto.', children }) {
  if (query.isPending)
    return (
      <div className="project-skeleton" role="status" aria-label="Carregando projetos">
        <span />
        <span />
        <span />
        <p>Buscando projetos…</p>
      </div>
    )
  if (query.isError)
    return (
      <section className="state-panel" role="alert">
        <h2>O GitHub ficou fora de alcance.</h2>
        <p>{query.error?.message || 'Não foi possível carregar os projetos.'}</p>
        <button className="button button-outline" onClick={() => query.refetch()}>
          Tentar novamente
        </button>
      </section>
    )
  if (!query.data?.length)
    return (
      <section className="state-panel">
        <h2>{empty}</h2>
        <p>Volte em breve para acompanhar os próximos projetos.</p>
      </section>
    )
  return children || <p>{empty}</p>
}
