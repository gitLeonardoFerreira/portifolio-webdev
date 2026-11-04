# Design

Identidade herdada do portfólio original, mantida a pedido do usuário. Modo da home: Experience; catálogo e estudos: Read; dashboard: Operate.

Céu diurno em azul claro, nuvens geométricas e sol amarelo; tema noturno em azul profundo. Barlow Condensed em títulos, DM Sans no texto e IBM Plex Mono em dados. Manter o logotipo “léo”, a frase e as fotos reais.

Tokens: céu #c8ebff, tinta #17344d, ação #1856bc, papel #f6fcff, sol #ffe28a. Tema noturno: fundo #0d2034, papel #142f49, texto #e9f5ff, ação #9bc9ff. Foco visível de 3px. Controles com alvo mínimo de 44px.

A navegação em voo continua por rolagem e botões, com cada projeto em sua cena. Movimento reduzido e modo leitura usam rolagem convencional. Conteúdo e estados de erro nunca dependem de animação para aparecer.

Refinamento: eliminar exageros de sombra dura e texto decorativo repetido; respeitar contraste, espaçamento e comprimento dos títulos. O formulário e o dashboard privilegiam leitura e operação. CSS adicional em src/enhancements.css, sem substituir a identidade herdada.
