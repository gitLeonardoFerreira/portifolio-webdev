# Ativar banco, login e e-mail

A produção desta entrega já foi configurada e testada, conforme docs/activation.md. Este guia serve para reproduzir a instalação em outro ambiente. Não reexecute a migration inicial no banco já configurado. Não envie credenciais pelo chat nem as versione.

URL publicada nesta entrega: [portifolio-webdev-eight.vercel.app](https://portifolio-webdev-eight.vercel.app/). Use essa origem em `SITE_URL`.

## 1. Supabase

1. Acesse [Supabase Dashboard](https://supabase.com/dashboard), crie uma organização/projeto gratuito e escolha uma região próxima dos visitantes. Defina você mesmo a senha do banco e guarde-a no seu gerenciador.
2. No SQL Editor, execute o conteúdo de [`supabase/migrations/202611030001_portfolio.sql`](../supabase/migrations/202611030001_portfolio.sql) **uma vez, em projeto novo**. Se já executou, não repita; acompanhe as migrations aplicadas.
3. Em Authentication > Users, adicione seu usuário pelo painel e defina uma senha forte. Copie o UUID desse usuário. Não crie um login de demonstração público.
4. Execute, substituindo o UUID:

```sql
insert into public.portfolio_owners(user_id)
values ('UUID-DO-SEU-USUARIO');
```

5. Desabilite novos cadastros públicos nas configurações Auth. A allowlist já restringe acesso mesmo se o cadastro estiver aberto.
6. Em URL Configuration, defina Site URL como a URL final Vercel. Cadastre as URLs locais apenas se precisar testar localmente. Este app usa senha e não depende de OAuth.
7. Copie a URL do projeto, a chave pública anon/publishable e a chave secreta service-role/secret compatível com bypass de RLS para o servidor. A chave pública deve funcionar nos endpoints REST e Auth. Não use chave secreta no navegador.

## 2. Resend

1. Acesse [Resend](https://resend.com), crie a conta gratuita e uma API key com permissão de envio.
2. Para o teste inicial, o remetente de teste `Portfolio <onboarding@resend.dev>` só pode enviar para o e-mail autorizado na sua conta. Use `leomurilobarbosa@gmail.com` como destinatário se ele for o e-mail permitido na conta.
3. Para uso normal com outro remetente, verifique um domínio seu e use um endereço desse domínio. Não simule um domínio verificado.
4. O e-mail do visitante entra em `reply_to`, permitindo responder diretamente. O conteúdo é enviado como texto, sem HTML do visitante.

## 3. Variáveis na Vercel

Em Project > Settings > Environment Variables, configure os valores reais para Production (e Preview se for testar lá):

| Nome                        | Onde roda | Valor                                              |
| --------------------------- | --------- | -------------------------------------------------- |
| `VITE_GITHUB_USERNAME`      | público   | `gitLeonardoFerreira`                              |
| `VITE_SUPABASE_URL`         | público   | URL Supabase                                       |
| `VITE_SUPABASE_ANON_KEY`    | público   | anon/publishable                                   |
| `SUPABASE_URL`              | servidor  | mesma URL                                          |
| `SUPABASE_SERVICE_ROLE_KEY` | servidor  | chave privilegiada Supabase                        |
| `RESEND_API_KEY`            | servidor  | chave de envio Resend                              |
| `CONTACT_FROM`              | servidor  | remetente autorizado                               |
| `CONTACT_TO`                | servidor  | `leomurilobarbosa@gmail.com`                       |
| `SITE_URL`                  | servidor  | URL pública exata, com `https://`, sem barra final |

Variáveis `VITE_*` entram no bundle durante o build, portanto faça **Redeploy** após configurá-las. As outras ficam somente na função. `SITE_URL` precisa corresponder à origem do formulário; uma URL preview diferente será rejeitada até configurar o ambiente preview apropriadamente. Não use chave secreta em campos `VITE_*`.

## 4. Verificar o fluxo real

1. Abra `/contato`, envie uma mensagem sua de pelo menos 20 caracteres e confirme o retorno. Confira também que o e-mail chegou; “salva com notificação pendente” não comprova entrega.
2. Abra `/dashboard` em janela privada: deve redirecionar para `/login`.
3. Entre como dono: a mensagem deve aparecer. Marque como respondida, atualize a página e confirme que o estado permaneceu.
4. Selecione até três repositórios, salve, abra a home em outra janela e confira os destaques. Desmarcar todos deixa a home sem destaques.
5. Saia. Uma conta não cadastrada em `portfolio_owners` não deve conseguir consultar mensagens nem editar destaques, mesmo com sessão Auth válida.
6. Confira RLS diretamente: chave pública sem token não pode ler `contact_messages`; somente `site_settings` é público. Nunca compartilhe screenshots com tokens.
7. Execute `npm run perf -- https://SEU-SITE/ mobile-production`, guarde o relatório e atualize `docs/validation.md` com o resultado medido.

O rate limit permite cinco tentativas por origem de rede a cada hora, usando hash do endereço com segredo do servidor. Não faça testes repetidos em produção até esgotar o limite. Para desenvolvimentos intensivos, use um projeto Supabase de teste próprio. Os testes automatizados usam fixtures e não enviam e-mails.

## 5. Desenvolvimento local completo

`.env.local` deve conter valores reais, fora do Git. O Vite sozinho não executa funções Vercel; rode `npx vercel dev` para testar `/api/contact` com backend. A ferramenta pode solicitar login e vinculação ao projeto. Para teste somente do frontend, `npm run dev` basta; a função real deve ser validada no deploy ou no Vercel dev.

## Recuperação de falhas

- 503 do formulário: conferir variáveis do servidor e conectividade do banco, sem expor os segredos em logs.
- Mensagem salva / e-mail pendente: conferir remetente autorizado, destinatário de teste e logs do Resend. A mensagem permanece no dashboard; o dono pode responder pelo link de e-mail.
- Login aceito, dashboard negado: conferir UUID na allowlist e execução da migration. Não remova as políticas para “resolver”.
- Destaques não carregam: conferir grants/policy de leitura pública em `site_settings` e chave pública.
- Rota direta 404 no servidor: conferir `vercel.json` e framework Vite.
- GitHub 403/429: respeitar o horário de reset informado; o app não faz retries automáticos que agravariam o limite.

Referência das chaves atuais: [Supabase API keys](https://supabase.com/docs/guides/getting-started/api-keys). O nome `VITE_SUPABASE_ANON_KEY` é o contrato deste app e aceita a chave pública atual; ela é enviada pelo header `apikey`, sem ser tratada como JWT.
