# Ativação e evidências reais

Configuração concluída em 03/11/2026, horário de São Paulo.

- Supabase separado, gratuito, São Paulo; migration inicial aplicada. Usuário criado pelo dono, allowlist com um dono, novos cadastros públicos bloqueados e Site URL alinhada ao site.
- Nove variáveis de produção salvas na Vercel. Chaves privilegiadas somente como Secret do servidor. Resend com Sending access. Chave inicial não utilizada foi revogada.
- Redeploy de ativação GZ3CuqRPoPFeqd2ovJHdXRYWxBGQ concluído Ready.
- Formulário real: mensagem técnica autorizada pelo dono foi salva e enviada. Resend confirmou **Delivered**. Captura de entrega incluída somente no ZIP.
- Login real realizado pelo dono. Marcação Respondida permaneceu após recarregar o painel. Três destaques salvos e recarregados. Logout retornou a /login. Captura do dashboard incluída somente no ZIP.
- Consulta ao banco: teste salvo/enviado/respondido=1; RLS ativo=true; anon pode ler mensagens=false; authenticated pode inserir diretamente=false; destaques salvos=3. Captura da consulta incluída somente no ZIP.
- [Lighthouse mobile após ativação](evidence/lighthouse-mobile-configured.report.html): **100 performance, 100 acessibilidade, 100 boas práticas, 100 SEO**, CLS0,015179 e LCP1.100ms. Resultados podem variar em outras medições.

As evidências contêm somente o teste autorizado e o e-mail profissional já público. Não há credenciais no pacote. O dono acessa o painel com sua própria senha; não existe conta pública de demonstração. A autorização de uma segunda conta fora da allowlist não foi testada com outro usuário real; políticas, grants e testes de rota estão disponíveis para revisão.

O vídeo será gravado e publicado pelo aluno. O roteiro existente tem cinco perguntas e duração planejada de 7min40s. Não há garantia de nota nem simulação de histórico de commits.
