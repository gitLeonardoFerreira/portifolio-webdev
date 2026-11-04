# Instruções para desenvolvimento assistido por IA

Leia README.md, PRODUCT.md, DESIGN.md e docs/requirements.md antes de alterar o projeto.

- Preserve a identidade de céu, os retratos e a navegação em voo solicitada pelo Leonardo.
- Nunca invente experiência, clientes, métricas, resultados de testes ou datas de commits.
- Use GitHub Flow: crie feature/<nome>, faça commits Conventional Commits em português e integre na main com merge --no-ff. Nunca desenvolva uma funcionalidade diretamente na main.
- Componentes em PascalCase; hooks useNome; módulos de serviço em camelCase. JSX para apresentação; requests em services; regras compartilhadas em shared; servidor em api e server.
- Funções pequenas, componentes reutilizáveis; não concentre código no App.jsx.
- Todo dado remoto precisa de loading, error, empty e retry. Use o mesmo cache do TanStack Query ao navegar.
- Nunca coloque service-role, chave Resend ou senha em VITE_*, código, documentação, screenshots ou Git.
- Proteja dados no servidor e com RLS. Uma rota React protegida não substitui autorização no banco.
- Valide formulário no cliente e no servidor. Evite duplicação com bloqueio síncrono e chave de idempotência.
- Antes de commit: npm run lint e npm run format:check (hook aplica lint-staged). Antes de integrar: npm run check. Teste integração quando alterar contratos.
- Rode testes de formulário, rota protegida e falhas de API. Teste celular e desktop, movimento reduzido e os dois temas. Lighthouse mobile >=80 é critério medido, nunca presumido.
- Documente decisões e perdas em docs/architecture.md e uso real da IA em docs/ai-harness.md. Não invente um nome de modelo indisponível na sessão.
- Não crie agentes paralelos sem autorização do usuário. Impeccable é a skill de design utilizada. Conectores só têm acesso de acordo com a sessão; não versionar tokens.
- Ao concluir, declare o que foi medido, o que foi apenas implementado e dependências externas pendentes.
