# Para Jullya, com amor 💕

Site romântico feito por Matheus Marcelino de Andrade para Jullya Nogueira
de Deus. Estático (HTML/CSS/JS puro), sem build, sem dependências — dá
para publicar direto no GitHub Pages.

## Estrutura

```
index.html            página principal
assets/css/style.css  estilos
assets/js/script.js   contador, pétalas animadas e "motivos para te amar"
assets/img/           fotos do casal (adicione aqui)
```

## O que ainda falta personalizar

1. **Data de início do relacionamento**
   - Em `assets/js/script.js`, edite a linha `const START_DATE = new Date("2023-02-14T00:00:00");`
   - Em `index.html`, atualize o texto dentro de `#start-date-label`

2. **Carta romântica**
   - Em `index.html`, procure a seção `<section class="letter-section" id="carta">`
     e substitua o texto pela sua carta de verdade.

3. **Fotos**
   - A galeria carrega automaticamente as imagens de `assets/img/` direto do
     GitHub — não precisa editar o HTML. Duas formas de adicionar fotos:
     - Pelo botão **"+ adicionar foto"** no site (veja "Botão de adicionar
       fotos" abaixo);
     - Ou subindo o arquivo manualmente para `assets/img/` pelo GitHub.

4. **Motivos para te amar**
   - Em `assets/js/script.js`, edite a lista `REASONS` com seus próprios motivos.

## Como publicar (GitHub Pages, sem precisar de nada no seu PC)

1. No GitHub, vá em **Settings → Pages** deste repositório.
2. Em "Build and deployment", escolha **Deploy from a branch**.
3. Selecione a branch (`main`, ou a branch atual) e a pasta `/ (root)`.
4. Salve — em alguns minutos o site fica disponível em uma URL do tipo
   `https://<seu-usuario>.github.io/<repo>/`.

## Botão de adicionar fotos

A galeria funciona como um pequeno "banco de dados": as fotos são salvas
direto no repositório do GitHub (pasta `assets/img/`) através do botão
**"+ adicionar foto"** no site. Assim, qualquer pessoa que abrir o site vê
as mesmas fotos — não fica preso a um navegador ou dispositivo.

Para poder adicionar fotos (só quem tiver o token consegue postar; quem
só visita o site não vê nem usa esse botão de forma alguma):

1. No GitHub, vá em **Settings → Developer settings → Personal access
   tokens → Fine-grained tokens → Generate new token**.
2. Em "Repository access", selecione **Only select repositories** e
   escolha `jullya-nogueira`.
3. Em "Permissions", dê acesso de **Contents: Read and write**.
4. Defina uma validade (ex: 90 dias) e gere o token.
5. No site, clique em **"+ adicionar foto"**, cole o token quando for
   solicitado e escolha a(s) foto(s). O token fica salvo só no navegador
   usado (em `localStorage`), então cada pessoa cola o token uma vez no
   próprio celular/computador.

**Importante:** trate esse token como uma senha — não compartilhe, e
revogue/gere um novo se o navegador for usado por outra pessoa.

## Editando sem baixar nada no PC

Como tudo fica versionado no git, dá para editar qualquer arquivo direto
pela interface do GitHub (botão de lápis ✏️ em cada arquivo) ou continuar
pedindo ajustes por aqui — toda alteração é commitada e enviada para o
repositório automaticamente.
