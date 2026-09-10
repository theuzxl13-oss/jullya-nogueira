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
   - Suba os arquivos para `assets/img/` (manualmente pelo GitHub, ou
     mandando as fotos aqui para que sejam adicionadas) e acrescente o
     nome de cada arquivo na lista `GALLERY_PHOTOS` em
     `assets/js/script.js`. A ordem de exibição é embaralhada
     automaticamente a cada carregamento da página.

4. **Motivos para te amar**
   - Em `assets/js/script.js`, edite a lista `REASONS` com seus próprios motivos.

## Como publicar (GitHub Pages, sem precisar de nada no seu PC)

1. No GitHub, vá em **Settings → Pages** deste repositório.
2. Em "Build and deployment", escolha **Deploy from a branch**.
3. Selecione a branch (`main`, ou a branch atual) e a pasta `/ (root)`.
4. Salve — em alguns minutos o site fica disponível em uma URL do tipo
   `https://<seu-usuario>.github.io/<repo>/`.

## Repositório privado

Dá para deixar o repositório privado (**Settings → General → Danger Zone →
Change repository visibility**) sem quebrar o site: o GitHub Pages continua
publicando a página normalmente, só quem tenta navegar pelo código no
GitHub precisa de permissão. A galeria usa uma lista fixa de arquivos (veja
acima) justamente para continuar funcionando nesse cenário, já que a API do
GitHub exigiria login para listar fotos de um repositório privado.

## Editando sem baixar nada no PC

Como tudo fica versionado no git, dá para editar qualquer arquivo direto
pela interface do GitHub (botão de lápis ✏️ em cada arquivo) ou continuar
pedindo ajustes por aqui — toda alteração é commitada e enviada para o
repositório automaticamente.
