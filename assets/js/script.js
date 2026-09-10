// ---------- contador de tempo juntos ----------
// Edite a data abaixo para o dia em que vocês começaram a namorar.
const START_DATE = new Date("2023-02-14T00:00:00");

function updateCounter() {
  const now = new Date();
  let diff = Math.max(0, now - START_DATE);

  const day = 1000 * 60 * 60 * 24;
  const days = Math.floor(diff / day);
  diff -= days * day;

  const hour = 1000 * 60 * 60;
  const hours = Math.floor(diff / hour);
  diff -= hours * hour;

  const minute = 1000 * 60;
  const minutes = Math.floor(diff / minute);
  diff -= minutes * minute;

  const seconds = Math.floor(diff / 1000);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCounter();
setInterval(updateCounter, 1000);

// ---------- galeria ----------
// Lista as fotos que ficam em assets/img/. Usar uma lista fixa (em vez de
// consultar a API do GitHub) faz a galeria funcionar mesmo com o
// repositório privado — a API do GitHub exige autenticação para
// repositórios privados, mas os arquivos do próprio site continuam sendo
// servidos normalmente pelo GitHub Pages.
// Para adicionar uma foto nova: suba o arquivo para assets/img/ e
// acrescente o nome dele nesta lista.
const GALLERY_PHOTOS = [
  "assets/img/01.jpg",
  "assets/img/02.jpg",
  "assets/img/03.jpg",
  "assets/img/04.jpg",
  "assets/img/05.jpg",
  "assets/img/06.jpg",
  "assets/img/07.jpg",
];

const galleryEl = document.getElementById("gallery");

function loadGallery() {
  const photos = [...GALLERY_PHOTOS];

  // embaralha a ordem das fotos a cada carregamento da página
  for (let i = photos.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [photos[i], photos[j]] = [photos[j], photos[i]];
  }

  galleryEl.innerHTML = photos
    .map(
      (src) => `
      <figure class="gallery-item">
        <img src="${src}" alt="momento nosso" loading="lazy" />
      </figure>`
    )
    .join("");
}

loadGallery();

// ---------- pétalas flutuantes ----------
function spawnPetals() {
  const container = document.querySelector(".petals");
  if (!container || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const count = window.innerWidth < 600 ? 10 : 18;
  for (let i = 0; i < count; i++) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.textContent = "❁";
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.setProperty("--drift", Math.random() * 80 - 40 + "px");
    petal.style.animationDuration = 10 + Math.random() * 12 + "s";
    petal.style.animationDelay = Math.random() * 12 + "s";
    petal.style.fontSize = 0.7 + Math.random() * 0.8 + "rem";
    container.appendChild(petal);
  }
}

spawnPetals();

// ---------- motivos para te amar ----------
// Edite/adicione livremente os motivos abaixo.
const REASONS = [
  "Pelo alívio que você traz ao meu coração.",
  "Pela forma como tudo parece mais leve quando estou com você.",
  "Pelo jeito que o seu sorriso consegue acalmar até os meus dias mais difíceis.",
  "Pela paz que a sua presença me traz, mesmo quando não dizemos nada.",
  "Pelo seu jeito único e bonito de enxergar o mundo.",
  "Pela forma como você consegue fazer meu coração se sentir em casa.",
  "Pelo carinho que existe até nos seus pequenos gestos.",
  "Pela maneira como você faz momentos simples se tornarem especiais.",
  "Pela sua força, até nos dias em que você esquece o quanto é forte.",
  "Pelo jeito que você me faz sorrir sem nem perceber.",
  "Pela sensação boa que fica em mim depois de estar perto de você.",
  "Pelo brilho que existe no seu olhar e que, de algum jeito, sempre encontra o meu.",
  "Pela forma como meu coração fica mais tranquilo quando sei que você está por perto.",
  "Pelo jeito que você faz eu querer conhecer cada pedacinho seu.",
  "Pelas conversas que eu poderia passar horas tendo com você sem nunca me cansar.",
  "Pelo seu jeito de existir, tão seu, tão único, tão impossível de não admirar.",
  "Pela saudade que aparece mesmo pouco tempo depois de eu me despedir de você.",
  "Pelo jeito que meu coração acelera quando você chega perto.",
  "Pela vontade de guardar cada momento ao seu lado como se fossem pequenos tesouros.",
  "E, principalmente, por ser você. Porque quanto mais eu te conheço, mais motivos encontro para gostar de você.",
];

let reasonIndex = 0;
const revealBtn = document.getElementById("reveal-btn");
const reasonsList = document.getElementById("reasons-list");

if (revealBtn && reasonsList) {
  revealBtn.addEventListener("click", () => {
    if (reasonIndex >= REASONS.length) {
      revealBtn.querySelector(".reveal-text").textContent = "isso é só o começo";
      return;
    }
    const li = document.createElement("li");
    li.textContent = REASONS[reasonIndex];
    reasonsList.prepend(li);
    reasonIndex++;

    if (reasonIndex >= REASONS.length) {
      revealBtn.querySelector(".reveal-text").textContent = "isso é só o começo";
    } else {
      revealBtn.querySelector(".reveal-text").textContent = "clique de novo";
    }
  });
}
