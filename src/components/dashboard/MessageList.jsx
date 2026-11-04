import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchMessages, markResponded } from '../../services/dashboard.js'
export default function MessageList() {
  const client = useQueryClient()
  const query = useQuery({ queryKey: ['messages'], queryFn: fetchMessages, retry: false })
  const mutation = useMutation({
    mutationFn: ({ id, answered }) => markResponded(id, answered),
    onSuccess: () => client.invalidateQueries({ queryKey: ['messages'] }),
  })
  if (query.isPending) return <p role="status">Carregando mensagens…</p>
  if (query.isError)
    return (
      <div role="alert">
        <p>{query.error.message}</p>
        <button className="button button-outline" onClick={() => query.refetch()}>
          Tentar novamente
        </button>
      </div>
    )
  return (
    <section className="dashboard-section">
      <h2>Mensagens recebidas</h2>
      <p>As 100 mensagens mais recentes. As demais continuam disponíveis no banco.</p>
      {mutation.isError && (
        <p role="alert" className="field-error">
          {mutation.error.message}
        </p>
      )}
      {!query.data.length ? (
        <div className="state-panel">
          <h3>A conversa ainda vai começar.</h3>
          <p>As mensagens enviadas pelo formulário aparecem aqui.</p>
        </div>
      ) : (
        <ol className="message-list">
          {query.data.map((item) => (
            <li key={item.id}>
              <div className="message-heading">
                <h3>{item.name}</h3>
                <span>{item.responded_at ? 'Respondida' : 'A responder'}</span>
              </div>
              <a href={`mailto:${item.email}`}>{item.email}</a>
              <time dateTime={item.created_at}>
                {new Date(item.created_at).toLocaleString('pt-BR')}
              </time>
              <p className="message-body">{item.message}</p>
              {item.email_status !== 'sent' && <p>Notificação por e-mail pendente.</p>}
              <button
                className="button button-outline"
                disabled={mutation.isPending}
                onClick={() => mutation.mutate({ id: item.id, answered: !item.responded_at })}
              >
                {mutation.isPending && mutation.variables?.id === item.id
                  ? 'Salvando…'
                  : item.responded_at
                    ? 'Marcar como pendente'
                    : 'Marcar como respondida'}
              </button>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
