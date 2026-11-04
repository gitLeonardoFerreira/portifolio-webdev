import Reveal from '../Reveal.jsx'
import SectionHeading from '../SectionHeading.jsx'
import OrbitArt from '../OrbitArt.jsx'
import { ArrowIcon } from '../Icons.jsx'
export function AboutSection() {
  return (
    <section id="sobre" className="about-section section-anchor">
      <div className="site-container">
        <Reveal>
          <SectionHeading
            index="02"
            label="SOBRE MIM"
            title={
              <>
                Curiosidade que
                <br />
                <em>vira construção.</em>
              </>
            }
          />
        </Reveal>
        <div className="about-grid">
          <Reveal className="about-portrait">
            <OrbitArt />
          </Reveal>
          <div className="about-story">
            <Reveal className="about-statement">
              <p>
                Gosto de entender <em>como as coisas funcionam</em> — e de encontrar um jeito mais
                claro, seguro e útil de fazê-las acontecer.
              </p>
            </Reveal>
            <Reveal className="about-details">
              <p>
                Sou Leonardo Barbosa, estudante do 2º semestre de Engenharia de Software na FIAP, em
                São Paulo. Tenho me dedicado a backend Python, aplicações web e automação. Também
                estudo IA e caminho para a área de cloud security.
              </p>
              <p>
                Antes do código, trabalhei coordenando entregas e operações criativas. Essa
                experiência me ensinou a lidar com prioridades, colaborar e transformar demandas
                abertas em próximos passos concretos — algo que hoje levo para o desenvolvimento de
                software.
              </p>
              <div className="about-facts">
                <div>
                  <span>BASE</span>
                  <strong>São Paulo, SP</strong>
                </div>
                <div>
                  <span>FORMAÇÃO</span>
                  <strong>Engenharia de Software · FIAP</strong>
                </div>
                <div>
                  <span>OBJETIVO</span>
                  <strong>Estágio em desenvolvimento de software</strong>
                </div>
              </div>
              <a
                className="text-link about-resume"
                href={`${import.meta.env.BASE_URL}Leonardo_Barbosa_Curriculo.pdf`}
                download
              >
                Baixar currículo <ArrowIcon diagonal />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export function JourneySection() {
  return (
    <section className="journey-section">
      <div className="site-container journey-grid">
        <Reveal>
          <span className="section-index">03 / TRAJETÓRIA</span>
          <h2>
            O próximo
            <br />
            <em>horizonte.</em>
          </h2>
          <p>
            Uma base de engenharia, projetos práticos e uma direção de estudo: construir sistemas
            que sejam cada vez mais confiáveis.
          </p>
        </Reveal>
        <div className="journey-list">
          <Reveal as="article" className="journey-item">
            <span>AGORA</span>
            <div>
              <h3>Engenharia de Software</h3>
              <p>FIAP · 2º semestre · conclusão prevista em 2029</p>
            </div>
            <span className="journey-symbol">
              <ArrowIcon diagonal />
            </span>
          </Reveal>
          <Reveal as="article" className="journey-item">
            <span>PRÁTICA</span>
            <div>
              <h3>Backend e automação</h3>
              <p>Python, APIs, dados e interfaces que ajudam a resolver problemas reais.</p>
            </div>
            <span className="journey-symbol">
              <ArrowIcon diagonal />
            </span>
          </Reveal>
          <Reveal as="article" className="journey-item">
            <span>DIREÇÃO</span>
            <div>
              <h3>Cloud security</h3>
              <p>
                Interesse em nuvem, proteção de sistemas e pensamento de segurança desde o início.
              </p>
            </div>
            <span className="journey-symbol">
              <ArrowIcon diagonal />
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
