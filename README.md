# Leonardo Barbosa · Portfólio Webdev

Ideias no ar. Código no mundo real.

Adaptação do meu [portfólio original](https://github.com/gitLeonardoFerreira/portifolio) para a atividade de Web Development da FIAP. Mantém a navegação em voo, o céu e os retratos; acrescenta catálogo pela API GitHub, temas persistentes, contato com persistência e dashboard do dono.

[Site publicado](https://portifolio-webdev-eight.vercel.app/) · [Repositório](https://github.com/gitLeonardoFerreira/portifolio-webdev) · [Roteiro do vídeo](docs/video-script.md) · [Matriz de requisitos](docs/requirements.md) · [Arquitetura e decisões](docs/architecture.md) · [Harness de IA](docs/ai-harness.md)

## Estado da entrega

O frontend e a integração de backend estão implementados. **A ativação do Supabase e do Resend ficou para o dono configurar depois, por sua escolha.** Sem essas variáveis, o login aparece como “Área em preparação” e o endpoint de contato retorna 503 com alternativa de e-mail. Não há login fictício nem persistência de mensagens em localStorage.

Para concluir esses requisitos na produção, siga [Configuração dos serviços](docs/setup.md), teste um contato real e o dashboard e registre a evidência. O vídeo ainda precisa ser gravado e publicado como não listado. Nenhuma nota de avaliação é garantida.

## Executar

Node.js **22.12+**, npm e Git:

```bash
git clone https://github.com/gitLeonardoFerreira/portifolio-webdev.git
cd portifolio-webdev
npm ci
cp .env.example .env.local
npm run dev
```

As variáveis podem ficar ausentes para explorar o site público. Não use literalmente os placeholders do `.env.example`: remova-os ou substitua pelos valores reais. O Vite serve o frontend; a função `/api/contact` roda na Vercel. Para testar o fluxo completo localmente, use a CLI oficial com `npx vercel dev` após configurar as variáveis.

```bash
npm run check       # lint, formatação, 28 testes e build
npm run test:e2e    # 16 cenários em Chrome desktop e celular
npm run perf        # Lighthouse mobile no build, falha se performance <80
npm run preview
```

No Linux/CI, instale primeiro o Chromium dos testes: `npx playwright install --with-deps chromium`. No macOS os testes usam o Chrome instalado. Para medir performance, gere o build com `npm run build`; o comando `perf` abre uma prévia de produção isolada. Também aceita URL pública: `npm run perf -- https://URL-DO-SITE/ mobile-production`.

## Tecnologias

React 19, Vite 7, React Router, TanStack Query, CSS e Tailwind herdados, Supabase Auth/PostgreSQL/RLS, função Vercel e Resend. Vitest e Testing Library verificam regras e componentes; Playwright verifica navegação e comportamento em dois tamanhos.

## Estrutura

```text
src/
  components/        # apresentação e controles reutilizáveis
    auth/            # verificação e proteção de rota
    dashboard/       # mensagens e editor de destaques
    home/            # voo e conteúdo autoral preservados
    projects/        # cards, diagramas e metadados
  pages/             # rotas públicas e privadas
  hooks/             # cache de projetos e estado do formulário
  services/          # chamadas HTTP e operações Supabase
  context/           # sessão e preferências do visitante
  data/              # textos autorais e referências das fotos
shared/              # validação usada no cliente e no servidor
api/                 # entrada HTTP da função Vercel
server/              # orquestração de persistência e e-mail
supabase/migrations/ # schema, permissões e rate limiting
tests/             # unidade e integração
e2e/                 # testes em navegador
scripts/             # otimização de imagens e orçamento Lighthouse
docs/                # decisões, roteiro, configuração e evidências
```

`src/data/projects.js` contém somente narrativa complementar dos três estudos existentes. A lista de projetos é criada exclusivamente a partir da API do GitHub; adicionar um repositório público original e não arquivado o inclui automaticamente. Forks e repositórios arquivados são filtrados. A API é paginada em lotes de 100, com limite defensivo de 10 páginas. Os três destaques padrão priorizam estudos com narrativa; o dono pode substituir a seleção pelo dashboard.

## Padrões de código e Git

Componentes em PascalCase, hooks `useNome`, serviços camelCase. Apresentação em JSX, HTTP em `services`, regra compartilhada em `shared`, código privilegiado em `api`/`server`. CSS preserva a identidade do projeto; tokens e decisões estão em [DESIGN.md](DESIGN.md).

GitHub Flow com `feature/<nome>` e `fix/<nome>`. Cada funcionalidade nasce em branch própria, passa pelos checks e entra na `main` com merge `--no-ff`, preservando o contexto de integração. Conventional Commits em português: `feat:`, `fix:`, `docs:`, `test:`, `chore:`. O hook pre-commit aplica ESLint e Prettier aos arquivos alterados; commit-msg verifica a mensagem com commitlint. O CI verifica o projeto completo e os testes de navegador. Instruções equivalentes para IA: [AGENTS.md](AGENTS.md).

O histórico anterior foi preservado com os commits e autores originais, que antecedem esta padronização. As novas alterações seguem o padrão acima e usam suas datas reais. A adaptação foi feita nesta sessão; não simula commits distribuídos por dias anteriores.

## Publicação

Importe este repositório na Vercel como Vite, raiz `./`, comando `npm run build`, saída `dist`, branch de produção `main`. A integração GitHub publica novos pushes e gera previews das branches. `vercel.json` deixa `/api/*` para as funções e reescreve as rotas do SPA para `index.html`; por isso `/projetos/rastro` abre e atualiza diretamente.

## Evidências e limites

A medição na **URL pública** marcou **97 em performance mobile, 100 em acessibilidade, 100 em boas práticas e 100 em SEO**, com CLS de aproximadamente 0,00008. [Relatório Lighthouse de produção](docs/evidence/lighthouse-mobile-production.report.html). A medição local anterior de 96 também foi preservada. Esses resultados valem para os ambientes medidos; repita após ativar os serviços. Resultados e pendências: [Validação](docs/validation.md).

Fotos WebP entre 57 e 71 KiB substituem os PNGs de aproximadamente 1,8 MiB na interface. Dashboard, autenticação e motor do voo são carregados sob demanda. Cache de 15 minutos evita nova consulta GitHub em navegação interna. Os diagramas dos projetos são ilustrações de fluxo, não capturas de sistemas publicados.

## Segurança e dados

`.env*` e `.vercel` ficam fora do Git; `.env.example` declara o contrato. Somente URL e chave pública Supabase vão para o navegador. Chave service-role e Resend ficam no servidor. RLS limita mensagens ao UUID do dono, com permissão de alteração somente de `responded_at`; visitantes leem apenas os destaques. O endpoint valida campos, limita corpo, aplica rate limiting persistente e usa idempotência no banco e no provedor de e-mail. Não registra conteúdo das mensagens nos logs.

Mensagens não são apagadas automaticamente. Como dono, defina e aplique uma política de retenção adequada ao uso real e atenda pedidos de exclusão pelo painel Supabase. A lista do dashboard mostra as 100 mensagens mais recentes; todas permanecem no banco.
