# VINGO Creative Studio — Site Completo v33

## Para visualizar
Extraia o ZIP e abra `index.html` (ou `pt/index.html`) no Chrome. Para publicar, envie **toda a pasta**, mantendo a estrutura.

## Páginas
- Home, Quem Somos/About, Serviços/Services, Portfólio/Portfolio, Blog, Contato/Contact — em português e inglês.
- Nove páginas de serviços em cada idioma.
- Três páginas demonstrativas de artigos em cada idioma.
- Portfólio: ao clicar no card, abre a apresentação longa em imagem (demo); não cria página individual.

## Pendências importantes
- O projeto permanece com meta `noindex,nofollow` porque é uma prévia. Remova somente quando todos os links, textos, imagens e informações estiverem validados.
- O domínio final não foi informado: `canonical`, `hreflang` e URLs absolutas deverão ser configurados na publicação.
- Telefone de WhatsApp, e-mail, links de redes sociais e canais de contato **não foram inventados**. O botão flutuante aponta à página de contato até o número real ser cadastrado.
- Os projetos e imagens são demonstrações. Confirmar autorização/atribuição antes de apresentar como portfólio.
- Artigos de blog são exemplos de estrutura; devem ser revisados, expandidos e datados antes de publicar.
- Não existe painel administrativo nem backend nesta versão estática. Cadastro dinâmico exige CMS e banco de dados.
- Menu PT/EN das páginas internas aponta inicialmente às respectivas Homes no idioma selecionado; versões equivalentes poderão ser conectadas por rota quando os slugs forem fechados.

## Desenvolvimento e histórico
- Os arquivos do site ficam diretamente na raiz: `index.html`, `pt/`, `en/` e `assets/`.
- Fonte desta importação: `VINGO-SITE-COMPLETO-NOVO.zip` (v33).
- O repositório pertence exclusivamente à VINGO Creative Studio.
- Prévia prevista: https://mvborburema.github.io/vingo/ — GitHub Pages, branch `main`, pasta `/`.
- A raiz redireciona para `pt/index.html`. Todas as páginas, inclusive a raiz, mantêm `noindex,nofollow` durante o desenvolvimento.
- Para continuar pelo ChatGPT: informar a página e a alteração desejada; revisar o diff e registrar as mudanças em commits, preservando o histórico.
- Não criar painel administrativo antes da aprovação de todas as páginas.

## Validação da importação (03/11/2026)
- 36 páginas de conteúdo (18 PT e 18 EN), além do redirecionamento na raiz.
- Referências locais de HTML e CSS verificadas sem arquivos ausentes.
- Sintaxe dos dois arquivos JavaScript verificada com `node --check`.
- Cada página de conteúdo contém um H1, título, meta description e `noindex,nofollow`.
- Design, textos, imagens, estilos e funcionalidades originais preservados. Única mudança no HTML: meta robots adicionada ao redirecionamento da raiz.
- Os arquivos vazios de teste `site` e `novo` foram removidos; versões anteriores permanecem no histórico Git.
- A publicação e os testes visuais/interativos no navegador dependem da ativação do GitHub Pages. A checagem estática não confirma responsividade ou interações em execução.
