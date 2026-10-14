# ariceliomoura.com.br · Portfólio com livro

Site de [Aricelio Moura](https://ariceliomoura.com.br): portfólio de serviços (sites, lojas virtuais, aplicativos, chatbots com IA e QA) e a página de vendas do livro **Programar, Testar, Automatizar**.

- Página inicial (serviços e portfólio): <https://ariceliomoura.com.br/>
- Página do livro: <https://ariceliomoura.com.br/livro/>

## Tecnologias

HTML, CSS e JavaScript puros, sem framework e sem etapa de build. É só publicar os arquivos como estão.

## Estrutura

```
index.html              Página inicial: serviços, portfólio, como eu trabalho, sobre, dúvidas e contato
css/home.css            Estilos da página inicial (paleta: fundo #101418 e âmbar #F5A524)
js/home.js              Menu, animações, ano do rodapé e links do WhatsApp (constante WHATSAPP)
img/                    Logo, ícones, foto, imagem de compartilhamento (og) e prints dos trabalhos
livro/                  Página de vendas do livro
  index.html
  css/estilo.css
  js/principal.js       Interações da página do livro
  js/lojas.js           Links de compra (Hotmart, WhatsApp e Instagram), em um só lugar
  img/                  Capa (frente e verso)
portfolio/              Redirecionam os endereços do site antigo para as seções da página inicial
servicos/
como-eu-trabalho/
robots.txt
sitemap.xml
```

## Ver no computador

Os caminhos são relativos, então dá para abrir o `index.html` direto no navegador. Para testar como num servidor:

```bash
python -m http.server 8000
```

Depois, acesse <http://localhost:8000>.

## Publicar

1. Envie todos os arquivos desta pasta para a raiz do domínio na hospedagem.
2. Mantenha a estrutura de pastas, porque a página do livro precisa ficar em `/livro/`.
3. O endereço oficial é `https://ariceliomoura.com.br`, sem www. Configure na hospedagem o redirecionamento do `www` para ele.

## O que atualizar com mais frequência

- **WhatsApp:** a constante `WHATSAPP` em `js/home.js` e os atributos `data-zap` do HTML.
- **Link de compra do livro:** só em `livro/js/lojas.js`, porque ele atualiza todos os botões "Garantir exemplar".
- **Preço do livro:** no texto de `livro/index.html` e nos dados estruturados (`"offers"`) do mesmo arquivo.
- **Novos trabalhos no portfólio:** a seção de portfólio do `index.html`, com o print em `img/trabalhos/` no formato `.webp`.
- **Datas do sitemap:** a tag `lastmod` em `sitemap.xml`, sempre que uma página mudar.

## Direitos

© Aricelio Moura. Todos os direitos reservados. Textos, imagens, logo e a capa do livro não podem ser reutilizados sem autorização. Os nomes e prints dos projetos do portfólio pertencem aos respectivos clientes.
