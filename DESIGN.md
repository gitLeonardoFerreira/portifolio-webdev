---
name: Portfólio de Leonardo Barbosa
description: Céu autoral, projetos legíveis e navegação em voo.
colors:
  sky: '#c8ebff'
  ink: '#17344d'
  muted: '#36556b'
  action: '#1856bc'
  action-hover: '#2774e3'
  surface: '#f6fcff'
  surface-alt: '#e7f5ff'
  line: '#a8c4d8'
  sun: '#ffe28a'
  warm-paper: '#fffdf5'
  dark-bg: '#0d2034'
  dark-surface: '#142f49'
  dark-ink: '#e9f5ff'
  dark-muted: '#b6cfe1'
  dark-action: '#9bc9ff'
  dark-action-hover: '#bddcff'
  dark-line: '#46647f'
typography:
  display:
    fontFamily: 'Barlow Condensed, sans-serif'
    fontSize: 'clamp(4.3rem, 8vw, 6rem)'
    fontWeight: 700
    lineHeight: 0.75
    letterSpacing: '-0.035em'
  headline:
    fontFamily: 'Barlow Condensed, sans-serif'
    fontSize: 'clamp(3.5rem, 8vw, 6rem)'
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: '-0.035em'
  body:
    fontFamily: 'DM Sans Variable, sans-serif'
    fontSize: '1rem'
    lineHeight: 1.65
  navigation:
    fontFamily: 'DM Sans Variable, sans-serif'
    fontSize: '0.82rem'
    fontWeight: 600
  label:
    fontFamily: 'IBM Plex Mono, monospace'
    fontSize: '0.7rem'
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: '0.12em'
rounded:
  contact-field: '6px'
  control: '8px'
  panel: '12px'
  project-card: '24px'
  pill: '999px'
spacing:
  control-gap: '0.5rem'
  content-gap: '1rem'
  catalog-gap: '2rem'
  dashboard-gap: '3rem'
components:
  button-primary:
    backgroundColor: '{colors.action}'
    textColor: 'white'
    rounded: '{rounded.pill}'
    padding: '0.85rem 1.35rem'
  button-primary-hover:
    backgroundColor: '{colors.action-hover}'
    textColor: 'white'
  button-primary-dark:
    backgroundColor: '{colors.dark-action}'
    textColor: '{colors.dark-bg}'
  button-outline:
    backgroundColor: 'white'
    textColor: '{colors.ink}'
    rounded: '{rounded.pill}'
    padding: '0.85rem 1.35rem'
  filter-input:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.ink}'
    rounded: '{rounded.control}'
    padding: '0.75rem 1rem'
  state-panel:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.ink}'
    rounded: '{rounded.panel}'
    padding: '2rem'
  project-card:
    backgroundColor: '{colors.warm-paper}'
    textColor: '{colors.ink}'
    rounded: '{rounded.project-card}'
    padding: 'clamp(1.7rem, 4vw, 3.5rem)'
---

# Design System: Portfólio de Leonardo Barbosa

## Overview

**Creative North Star: "Ideias no ar. Código no mundo real"**

O céu e o voo são a identidade confirmada do portfólio: nuvens geométricas, sol amarelo, logotipo “léo” e retratos reais. A tipografia condensada dá presença aos títulos; texto simples e dados monoespaçados mantêm o conteúdo autoral legível. O tema noturno transporta essa identidade para superfícies azuis profundas.

Este registro consolida o código existente, sem estabelecer uma nova identidade. A implementação visual é a referência: `src/main.jsx` carrega `src/styles.css`, `src/styles-sky.css`, `src/flight.css` e, por último, `src/enhancements.css`. Os tokens acima representam os papéis reutilizados; cenas ilustradas conservam gradientes e cores locais. Movimento, foco e regras responsivas complementares estão em `.impeccable/design.json`.

**Key Characteristics:**

- Céu ilustrado e retratos autorais preservados.
- Títulos condensados, texto confortável e metadados monoespaçados.
- Ações azuis e superfícies claras ou azuis profundas conforme o tema.
- Navegação em voo com alternativa de leitura convencional.

## Colors

A paleta combina a luminosidade do céu com tinta azul escura e ações azuis reconhecíveis.

### Primary

- **Azul de ação** (`action`): botões principais, links de ação, progresso e foco visível; `action-hover` registra o estado apontado do botão diurno.
- **Azul de ação noturno** (`dark-action`): assume o mesmo papel sobre fundos escuros; o botão principal usa texto do fundo noturno e clareia no hover.

### Secondary

- **Sol amarelo** (`sun`): sol da ilustração e seleção de texto. Não substitui o azul dos controles.

### Neutral

- **Céu** (`sky`): base do trilho de voo; a cena sobreposta usa gradiente próprio.
- **Tinta / texto secundário** (`ink`, `muted`): texto e informação de apoio diurnos.
- **Superfície / superfície alternativa / linha** (`surface`, `surface-alt`, `line`): campos, painéis, controles e separadores.
- **Papel quente** (`warm-paper`): formulário e primeiro cartão de projeto diurnos; outros cartões preservam variações locais herdadas.
- **Fundo / superfície / tinta / texto secundário / linha noturnos** (`dark-*`): substituições aplicadas por `data-theme='dark'` em `src/enhancements.css`.

**The Theme Role Rule.** Novos controles devem usar `--surface`, `--ink`, `--muted`, `--action` e `--line`, que mudam junto com o tema. As cores fixas da ilustração não são tokens de controles.

## Typography

**Display Font:** Barlow Condensed, sans-serif.  
**Body Font:** DM Sans Variable, sans-serif.  
**Label/Mono Font:** IBM Plex Mono, monospace.

**Character:** títulos altos e compactos acompanham o gesto do voo; texto de leitura mantém ritmo aberto. Mono identifica numeração, metadados e instrumentos, sem dominar a página.

### Hierarchy

- **Display:** título da abertura, em maiúsculas; no viewport estreito passa a `clamp(3.8rem, 15vw, 5.5rem)`.
- **Headline:** cabeçalhos de páginas de leitura. Títulos de catálogo usam `clamp(2.4rem, 5vw, 4rem)` com entrelinha de cartão (0.88); títulos de projetos em voo usam escala própria.
- **Body:** descrições da abertura; introduções de páginas usam (1.1rem), entrelinha (1.6) e largura máxima (65ch).
- **Navigation:** links de cabeçalho; no menu móvel usam (1rem).
- **Label:** numeração e metadados. Tags usam tamanho menor (0.68rem) e entrelinha (1.2).

**The Authored Title Rule.** Títulos devem acomodar o conteúdo autoral com quebra equilibrada; nomes de repositórios e títulos de cartões permitem quebra de palavras longas.

## Layout

O contêiner geral tem largura máxima (1512px), com margens automáticas e respiros laterais responsivos; o cabeçalho usa largura livre e padding entre (1rem) e (2rem). A cena de voo ocupa o viewport abaixo do cabeçalho fixado, com altura calculada a partir de `100svh`. Cada projeto mantém sua cena. O conteúdo interno pode rolar quando necessário.

O catálogo usa cartões com texto e imagem lado a lado no desktop e uma coluna até (760px); o formulário de contato independente usa duas colunas de mesma largura e passa a uma nesse mesmo limite. O dashboard usa proporção (1.4fr / 1fr), intervalo (3rem), e uma coluna até (760px). Filtros passam de linha a coluna. O menu móvel substitui a navegação horizontal; o botão de contato do cabeçalho desaparece até (1000px).

Há ajustes herdados em (1100px) e (480px), e ajustes de cenas para altura até (720px). Os limites e o tratamento de movimento estão no sidecar. A intenção de superfície é Experience na abertura, Read no catálogo e estudos, Operate no dashboard; a estratégia de cada página continua pertencendo à sua implementação.

## Elevation & Depth

O céu usa gradientes, sobreposição e movimento para profundidade. O refinamento suaviza sombras de controles, formulários e cartões, preservando contornos escuros da ilustração. A sombra comum é `0 8px 24px #17344d0d`; botões elevados por hover usam `0 8px 20px #17344d16` e deslocamento vertical (-2px). Nuvens e sol têm sombras próprias. Os valores ficam no sidecar, pois não pertencem ao esquema de componentes do frontmatter.

O hover do link do cartão ainda conserva a sombra dura herdada `5px 7px 0 #17344d` de `src/styles-sky.css`. Isso é uma particularidade atual do código, não uma regra geral de elevação.

## Shapes

Botões de ação e tags são cápsulas. Controles de tema e leitura têm cantos suaves; painéis e formulários usam arredondamento intermediário, e cartões de projeto mantêm cantos mais amplos. Campos do contato usam raio próprio, menor que filtros e autenticação. Sol e controles de voo são circulares. A nuvem permanece uma silhueta ilustrada, não um retângulo arredondado genérico.

## Components

### Buttons

Ações firmes, legíveis e levemente elevadas. Botões compartilhados têm altura mínima (54px), borda diurna de tinta (2px), tipografia de corpo (0.88rem, 700) e cápsula. Primário usa azul com texto branco; secundário usa branco com tinta. No tema noturno, o primário usa ação clara com texto escuro e o secundário usa os papéis de superfície, tinta e linha. Hover desloca (-2px); desabilitado tem opacidade reduzida e cursor correspondente.

### Chips

Tags de tecnologia usam cápsula, fonte mono e contorno fino. O estado diurno usa branco translúcido; o noturno usa azul de apoio com tinta e linha noturnas. São metadados, sem estado de seleção no padrão amostrado.

### Cards / Containers

Cartões de projeto unem texto e visual em um único link, com borda de tinta (2px), cantos amplos, recorte do conteúdo e padding fluido. Hover sobe (-4px), mantém a sombra herdada descrita acima e destaca a seta circular. Painéis de estado priorizam mensagem, explicação e ação de recuperação. Não dependem de revelação animada para aparecer: o refinamento mantém `.reveal` visível.

### Inputs / Fields

Filtros e autenticação têm altura mínima (48px), borda de linha (1px), superfície e texto do tema. Contato usa padding (0.92rem 1rem), borda de linha e placeholder secundário; textarea é redimensionável verticalmente, com altura mínima (130px). Campo inválido recebe contorno vermelho e mensagem textual; mensagens usam tom claro no tema noturno.

O foco global é contorno de ação (3px), afastado (4px). O contato ainda possui uma regra `:focus` mais específica herdada, com borda verde-azulada e halo próprio; o sidecar registra ambos sem declarar uniformidade inexistente.

### Navigation

O cabeçalho é aderente, com marca, links, tema e modo leitura. Links ativos usam texto de destaque e traço inferior (2px); o refinamento remove transição de cor dos links. Até (760px), menu em coluna surge sob o cabeçalho. Tema, menu e controles de voo têm alvo mínimo (44px) nos padrões refinados. Não há evidência neste registro de que todo link do site alcance essa medida.

### Flight scene

Nuvem de abertura, sol, trilho de progresso e botões circulares compõem a assinatura. Voo continua por rolagem e controles; modo leitura e movimento reduzido têm alternativa convencional conforme a direção confirmada. CSS reduz animações e transições a (0.01ms), desliga rolagem suave e mantém conteúdo visível. Este documento registra a implementação de estilo; não substitui verificação funcional em navegador.

## Do's and Don'ts

### Do:

- **Do** preservar céu, nuvens, logotipo “léo”, retratos reais e a frase autoral confirmada.
- **Do** usar os papéis de tema nos novos controles e conteúdos de leitura.
- **Do** manter foco visível, mensagens de erro textuais e conteúdo acessível sem animação de revelação.
- **Do** usar a tipografia condensada nos títulos e reservar mono para dados e instrumentos.

### Don't:

- **Don't** substituir a identidade de céu e voo por uma identidade genérica.
- **Don't** fazer texto ou recuperação de falhas dependerem de animação.
- **Don't** tratar cores locais de artes dos projetos como novos papéis globais.
- **Don't** afirmar contraste, acessibilidade ou comportamento responsivo verificados apenas com esta extração de CSS.
