import { ArrowIcon } from '../Icons.jsx'
export default function ProjectVisual({ project }) {
  if (project.slug === 'rastro')
    return (
      <div className="visual visual-rastro" aria-hidden="true">
        <span className="visual-label">FLUXO / 001</span>
        <div className="rastro-line">
          <span className="rastro-node node-on">
            01<small>PEDIDO</small>
          </span>
          <span className="rastro-connector" />
          <span className="rastro-node node-on">
            02<small>ACEITE</small>
          </span>
          <span className="rastro-connector" />
          <span className="rastro-node">
            03<small>CONFIRMAÇÃO</small>
          </span>
        </div>
        <div className="rastro-ticket">
          <span className="ticket-status">
            <i /> EM ANDAMENTO
          </span>
          <strong>
            Próximo passo,
            <br />
            sempre visível.
          </strong>
          <span className="ticket-id"># RST — 042</span>
        </div>
      </div>
    )
  if (project.slug === 'smart-file-organizer')
    return (
      <div className="visual visual-organizer" aria-hidden="true">
        <span className="visual-label">AUTOMAÇÃO / 002</span>
        <div className="folder-card folder-card-back">
          <span>downloads/</span>
          <strong>42 arquivos</strong>
        </div>
        <div className="folder-card folder-card-front">
          <span>organizados/</span>
          <strong>
            ✓ documentos
            <br />✓ imagens
            <br />✓ código
          </strong>
        </div>
        <div className="organizer-arrow">
          <ArrowIcon diagonal />
        </div>
        <span className="visual-bottom-label">DRY RUN: PRÉVIA ANTES DE MOVER</span>
      </div>
    )
  if (project.slug !== 'calculo-de-frete')
    return (
      <div className="visual visual-repository" aria-hidden="true">
        <span>{project.language || 'Código'}</span>
        <strong>{project.title}</strong>
        <span>git / {project.slug}</span>
      </div>
    )
  return (
    <div className="visual visual-freight" aria-hidden="true">
      <span className="visual-label">INTEGRAÇÃO / 003</span>
      <div className="freight-route">
        <span className="route-point route-start" />
        <span className="route-dash" />
        <span className="route-point route-end" />
      </div>
      <div className="freight-value">
        <small>DISTÂNCIA + TRANSPORTE</small>
        <strong>R$ ?</strong>
      </div>
      <span className="visual-bottom-label">REACT → API → RESULTADO</span>
    </div>
  )
}
