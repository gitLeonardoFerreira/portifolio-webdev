# Entrevista técnica · cinco perguntas

Meta: **7min40s**, deixando 20 segundos de margem. Rosto e tela visíveis durante todo o vídeo, inclusive ao trocar de janela. Grave em 1080p, aumente o zoom do editor e feche abas com dados privados. Publique no YouTube como **não listado**. O roteiro é um guia para responder com suas palavras, não um texto a decorar.

## 1. “Qual problema seu portfólio resolve e como você organizou a aplicação?”

**0:00–1:20 · 1min20s.** Mostre o voo na home, o catálogo e a página de um projeto. Abra o diagrama em `docs/architecture.md` e a árvore de pastas.

Explique a adaptação do portfólio anterior: preservou céu, fotos e navegação autoral; passou a consultar GitHub e separar responsabilidades. Mostre `App.jsx` declarando rotas, um card reutilizado e `useProjects` buscando dados por serviço. Narre o fluxo visitante → rota → hook/cache → serviço → API, e diferencie componentes, páginas e regras compartilhadas. Deixe claro quais funcionalidades já estão ativas na URL que você está mostrando.

## 2. “Quais alternativas você comparou para a stack e o que aceitou perder?”

**1:20–2:50 · 1min30s.** Mostre a tabela de alternativas em `docs/architecture.md`, apontando as escolhas no código.

Compare React/Vite com Next.js: reutilização da base versus recursos de SSR/SEO. React Router versus HashRouter: URLs limpas, com necessidade de rewrite. TanStack Query versus fetch por componente: cache e estados consistentes, com dependência adicional. Supabase versus backend próprio/Firebase: SQL, Auth e RLS juntos, com dependência de serviço. Resend via função versus EmailJS/Formspree: controle do fluxo e segredos no servidor, exigindo configuração. Explique por que manteve JSX neste incremento e por que o efeito de voo usa CSS, sem adicionar uma cena 3D pesada.

Não diga que realizou benchmarks ou experimentos com ferramentas que só comparou conceitualmente. Justifique cada escolha pelo contexto deste projeto.

## 3. “Como você tratou dados remotos, contato e autorização?”

**2:50–4:20 · 1min30s.** Mostre metadados GitHub, teste de erro/empty e o código do formulário. Se o backend estiver ativado, demonstre login, mensagem real, marcação como respondida e seleção de destaques; use dados de teste seus.

Explique loading/erro/vazio, limite de requisições e cache de 15 minutos. Mostre validação por campo, botão bloqueado e a mesma validação no servidor. Descreva salvar antes de enviar, chave idempotente e a diferença entre mensagem salva e e-mail entregue. Mostre `ProtectedRoute`, `getUser`/`is_owner` e uma política da migration: o bloqueio visual não substitui RLS.

**Antes de gravar:** ative Supabase/Resend seguindo `docs/setup.md` e confirme o envio real. Se não tiver ativado, diga explicitamente que o código está pronto, mas a demonstração dos serviços ainda está pendente; não apresente um teste mockado como produção.

## 4. “Como você garante qualidade e como uma alteração chega à produção?”

**4:20–5:40 · 1min20s.** Mostre `git log --graph --oneline --all`, uma branch feature e seu merge. Abra hooks, CI, resultados dos testes e relatório Lighthouse.

Narre feature → Conventional Commit → lint-staged/commitlint → checks → merge na main → push → Vercel. Distinga CI de deploy automático: a integração nativa pode publicar em paralelo ao CI. Mostre teste de validação e teste que bloqueia dashboard sem login; depois o Playwright com celular/desktop. Mostre o resultado Lighthouse com URL e data do ambiente medido. Explique WebP/lazy, lazy do dashboard/voo, dimensões reservadas e cache. Não diga que o resultado local equivale automaticamente ao site publicado.

## 5. “Qual harness de IA você montou, como o conduziu e como verifica o que a IA entrega?”

**5:40–7:40 · 2min.** Mostre o seletor real de modelo do Codex e os arquivos `AGENTS.md`, `PRODUCT.md`, `DESIGN.md`, `.codex/harness.json` e `docs/ai-harness.md`.

Diga a ferramenta e o nome de modelo que o seletor efetivamente mostrar. Explique o critério da ferramenta: acesso ao código, terminal, Git e navegador; compare com chat com cópia manual e aceite a dependência das permissões do ambiente. Mostre as regras para pastas, nomes, commits e branches em AGENTS e como hooks/testes as verificam. Descreva a skill Impeccable na preservação da identidade e na revisão responsiva, e o conector GitHub no acesso ao repositório. Declare que o engine automático da skill não estava disponível; o trabalho usou as referências diretamente.

Mostre uma decisão que você tomou: manter o voo e o conteúdo autoral. Conte um erro encontrado por teste e sua correção, como a rota direta de contato. Distinga instruções de IA, ferramentas, conectores e revisão independente. Encerre com uma limitação real e o próximo passo: ativar/verificar os serviços se ainda pendentes. Você deve conseguir explicar cada trecho mostrado, inclusive tratamento de falhas e permissões.

## Preparação e entrega

- Execute os testes antes de gravar, abra os relatórios e ensaie sem decorar.
- Confirme que a versão apresentada corresponde ao commit publicado.
- Ative e teste o backend antes de afirmar que todos os requisitos estão concluídos.
- Não mostre `.env`, tokens, senhas, mensagens reais de terceiros ou páginas privadas.
- Mantenha rosto e tela em todas as cenas, verifique áudio e cronometre até 8 minutos.
- Publique como não listado e teste o link em janela privada.
- Entregue os três links: GitHub, Vercel e YouTube. A publicação do vídeo é feita por você.
