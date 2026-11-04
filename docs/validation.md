# Registro de validação

## Resultados medidos nesta sessão

- `npm run check`: lint, formatação, 28 testes Vitest e build passaram.
- `npm run test:e2e`: 16 cenários passaram, oito em desktop e oito em celular. Incluem contato, cache entre rotas, refresh direto, 404, erro/vazio da API, tema persistente, modo leitura, voo e dashboard bloqueado sem sessão.
- `npm audit --omit=dev`: zero vulnerabilidades conhecidas nas dependências de produção no momento da consulta. Isso não constitui garantia geral de segurança.
- Lighthouse mobile, build de produção servido localmente: performance 96, acessibilidade 100, boas práticas 100, SEO 91, CLS 0. Relatórios HTML/JSON em `docs/evidence/`. Relatório local preservado como histórico.
- Inspeção visual: home diurna/noturna, catálogo e formulário; desktop e celular. As capturas são evidências do contexto de revisão local.

- Lighthouse mobile na **URL pública**, após o deploy automático do commit `ad6c176`: performance **97**, acessibilidade **100**, boas práticas **100**, SEO **100**, CLS **0,0000761**. [HTML de produção](evidence/lighthouse-mobile-production.report.html) e JSON ao lado. A ativação futura dos serviços pede nova medição.
- Publicação: GitHub registrou status Vercel `success`/“Deployment has completed” para o push de revisão. O acesso direto e refresh de `/projetos/rastro` foram conferidos na URL pública com os dados reais do GitHub. `/dashboard` redirecionou para `/login`. O endpoint `/api/contact` respondeu 405 a GET, com `Allow: POST`, sem enviar mensagens.

## Verificação real após ativação

Supabase e Resend ativados, migration aplicada, dono cadastrado e nove variáveis de produção salvas na Vercel. O redeploy concluiu Ready. O teste real foi salvo e enviado; Resend registrou **Delivered**. Dashboard autenticado mostrou a mensagem; marcação como respondida permaneceu após refresh. Três destaques foram salvos no banco e recarregados no painel. Logout retornou ao login.

Consulta de verificação: um teste salvo/enviado/respondido; RLS ativo nas quatro tabelas; SELECT de mensagens para anon negado; INSERT direto para authenticated negado; três destaques persistidos. A autorização de outra conta não allowlisted não foi testada com um segundo usuário real; as políticas SQL estão versionadas e o bloqueio sem sessão tem testes automatizados.

Lighthouse mobile após ativação: **100 performance, 100 acessibilidade, 100 boas práticas, 100 SEO**, CLS **0,015179**, LCP **1.100 ms**. Relatórios `lighthouse-mobile-configured.report.html/json` e capturas de evidência estão em docs/evidence. Resultados valem para o ambiente medido.

## Publicação

URL pública verificada: [portifolio-webdev-eight.vercel.app](https://portifolio-webdev-eight.vercel.app/). O primeiro deploy concluiu com sucesso na Vercel. A integração GitHub foi autorizada exclusivamente para o repositório portifolio-webdev, com branch de produção main. Os pushes seguintes atualizam a publicação automaticamente. A conclusão dos checks e o commit de cada execução podem ser conferidos no GitHub Actions e na Vercel.

## Revisão de design

As referências da skill Impeccable foram aplicadas diretamente; o engine local não estava instalado, portanto não foi executado o detector automático. O revisor independente apontou quatro ajustes: contraste das instruções no tema escuro, transição de cor dos links, comportamento após sucesso do contato e indicação da rota ativa. Após correções e recapturas, marcou os quatro como resolvidos, com disposição `ship` limitada a essas correções. A documentação final registra tokens e resíduos herdados sem reabrir a identidade aprovada.

## Pendências da entrega acadêmica

- Gravar e publicar vídeo não listado com rosto e tela durante até oito minutos.
- Entregar os três links na plataforma solicitada.
- Confirmar com o avaliador a aceitação do histórico herdado do portfólio: as novas mudanças foram feitas nesta sessão com datas reais.
