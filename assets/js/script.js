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

// ---------- galeria (fotos carregadas direto do repositório do GitHub) ----------
// As fotos ficam guardadas em assets/img/ no GitHub e a galeria carrega
// automaticamente a partir de lá — para adicionar uma foto nova, basta
// subir o arquivo para essa pasta (sem precisar editar o HTML).
const GITHUB_OWNER = "theuzxl13-oss";
const GITHUB_REPO = "jullya-nogueira";
const GITHUB_BRANCH = "claude/romantic-website-girlfriend-bthdki";
const GITHUB_IMG_PATH = "assets/img";

const galleryEl = document.getElementById("gallery");

async function loadGallery() {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_IMG_PATH}?ref=${GITHUB_BRANCH}`
    );
    if (!res.ok) return; // mantém os placeholders do HTML em caso de erro

    const files = await res.json();
    const photos = files.filter(
      (f) => f.type === "file" && /\.(jpe?g|png|gif|webp)$/i.test(f.name)
    );

    if (photos.length === 0) return; // mantém os placeholders

    // embaralha a ordem das fotos a cada carregamento da página
    for (let i = photos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [photos[i], photos[j]] = [photos[j], photos[i]];
    }

    galleryEl.innerHTML = photos
      .map(
        (photo) => `
        <figure class="gallery-item">
          <img src="${photo.download_url}" alt="momento nosso" loading="lazy" />
        </figure>`
      )
      .join("");
  } catch (err) {
    // sem internet ou API indisponível: mantém os placeholders
  }
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
