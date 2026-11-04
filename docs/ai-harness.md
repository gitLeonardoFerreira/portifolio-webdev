# Harness de IA usado no projeto

## O que foi realmente usado

A adaptação foi conduzida no **Codex desktop, agente da família GPT-6**, com ferramentas de terminal/Git, conector GitHub e controle do Chrome. A sessão não fornece um identificador verificável da variante exata do modelo; confira o seletor do aplicativo antes da gravação e informe o nome que ele realmente mostrar. Não atribua esta execução ao Claude nem afirme que houve comparação experimental de modelos.

A escolha operacional foi usar o Codex para editar o repositório, executar testes e verificar a experiência no navegador no mesmo fluxo. A alternativa seria trabalhar no chat copiando trechos manualmente ou em um assistente do editor. O custo aceito é depender das permissões e integrações do ambiente, e exigir revisão humana das decisões e das contas externas.

## Arquivos versionados

| Arquivo                                  | Efeito verificável                                                               |
| ---------------------------------------- | -------------------------------------------------------------------------------- |
| `AGENTS.md`                              | Restringe arquitetura, nomes, branches, commits, testes e tratamento de segredos |
| `PRODUCT.md`                             | Guarda fatos e preferências confirmados: céu, voo, fotos e propósito             |
| `DESIGN.md` e `.impeccable/design.json`  | Registram identidade e tokens herdados                                           |
| `.impeccable/config.json`                | Registra a escolha do dono por construir direto no código                        |
| `.codex/harness.json`                    | Inventário documental da sessão; não instala conectores ou agentes               |
| `eslint.config.js`, `.prettierrc.json`   | Verificam convenções de código                                                   |
| `.husky/pre-commit`, `.husky/commit-msg` | Executam lint-staged e commitlint antes de aceitar commits                       |
| `.github/workflows/ci.yml`               | Repete checks e testes em ambiente limpo                                         |
| `tests/` e `e2e/`                        | Transformam requisitos em verificações executáveis                               |
| `docs/requirements.md`                   | Relaciona critério, implementação, evidência e pendência                         |
| `prompts.md`                             | Histórico recebido do projeto original, preservado como contexto                 |

## Skill, conectores e agentes

A skill **Impeccable 4.3.1**, solicitada pelo dono, orientou a preservação da identidade, os ajustes de contraste, os estados de interface e a revisão em celular/desktop. Seu carregador automático não executou por falta do engine local; as instruções e referências foram lidas diretamente. Não se atribui uma aprovação do detector automático a esta sessão.

O conector GitHub consultou os metadados e permissões do repositório; Git/gh fizeram clone, branches, commits e publicação. O Chrome foi usado para inspecionar o portfólio, conferir o novo layout e configurar a integração Vercel. A integração foi autorizada pelo dono, restrita a `portifolio-webdev`; a confirmação GitHub Mobile foi feita pelo próprio usuário.

O ambiente disponibiliza subagentes, mas o desenvolvimento das funcionalidades foi sequencial. A revisão final independente de interface e a documentação final do sistema visual foram motivadas pelo fluxo da skill, com contexto próprio e escopo limitado. O revisor encontrou quatro ajustes; depois das correções, considerou os quatro resolvidos. Não há uma equipe autônoma permanente instalada no repositório. Arquivos documentais não concedem acesso a serviços: cada máquina precisa conectar suas ferramentas e nunca versionar credenciais.

## Exemplos da condução

1. Ler a proposta inteira e decompor em critérios verificáveis antes de editar.
2. Perguntar sobre o que preservar: Leonardo confirmou voo, céu e fotos, além da implementação direta no código.
3. Reaproveitar conteúdo e histórico reais, separar responsabilidades e transformar projetos em dados da API.
4. Escrever testes de validação, rota protegida, persistência antes de envio, retry idempotente e estados de API.
5. Verificar o navegador: um teste detectou uma rota de contato ausente; o código foi corrigido e os testes refeitos.
6. Medir performance de verdade e registrar o relatório; não inferir a pontuação do tamanho do bundle.
7. Declarar que Supabase/Resend ainda precisam de ativação porque o dono preferiu configurar depois.

## Por que as instruções não bastam

`AGENTS.md` orienta o agente, mas não é uma garantia de obediência. ESLint, Prettier, commitlint, testes e CI verificam partes objetivas das instruções. Branches e merges registrados permitem auditar o processo. Validação humana verifica conteúdo, explicações e serviços reais. Nenhuma dessas camadas permite prometer nota máxima ou conhecer métricas internas de um modelo avaliador.
