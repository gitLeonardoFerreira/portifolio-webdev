import { useEffect, useState } from 'react'
import MessageList from '../components/dashboard/MessageList.jsx'
import FeaturedEditor from '../components/dashboard/FeaturedEditor.jsx'
import { signOut } from '../services/dashboard.js'
export default function DashboardPage() {
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)
  useEffect(() => {
    document.title = 'Dashboard — Leonardo Barbosa'
  }, [])
  async function leave() {
    setPending(true)
    try {
      await signOut()
    } catch (error) {
      setError(error.message)
    } finally {
      setPending(false)
    }
  }
  return (
    <main className="page-shell site-container dashboard">
      <div className="dashboard-heading">
        <div>
          <h1>Seu portfólio, por dentro.</h1>
          <p>Cuide das conversas e escolha o que ganha destaque.</p>
        </div>
        <button className="button button-outline" disabled={pending} onClick={leave}>
          {pending ? 'Saindo…' : 'Sair'}
        </button>
      </div>
      {error && <p role="alert">{error}</p>}
      <div className="dashboard-layout">
        <MessageList />
        <FeaturedEditor />
      </div>
    </main>
  )
}
