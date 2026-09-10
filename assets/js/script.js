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

// ---------- galeria (fotos salvas direto no repositório do GitHub) ----------
// A galeria funciona como um "banco de dados": as fotos ficam guardadas em
// assets/img/ no GitHub. Qualquer pessoa que abrir o site vê as fotos.
// Só quem tiver o token de acesso (gerado no GitHub, guardado apenas no
// navegador de quem for usar) consegue adicionar novas fotos.
const GITHUB_OWNER = "theuzxl13-oss";
const GITHUB_REPO = "jullya-nogueira";
const GITHUB_BRANCH = "claude/romantic-website-girlfriend-bthdki";
const GITHUB_IMG_PATH = "assets/img";
const TOKEN_STORAGE_KEY = "jullya_site_gh_token";

const galleryEl = document.getElementById("gallery");
const addPhotoBtn = document.getElementById("add-photo-btn");
const photoInput = document.getElementById("photo-input");
const uploadStatusEl = document.getElementById("upload-status");

function setUploadStatus(message, isError = false) {
  if (!uploadStatusEl) return;
  if (!message) {
    uploadStatusEl.hidden = true;
    return;
  }
  uploadStatusEl.hidden = false;
  uploadStatusEl.textContent = message;
  uploadStatusEl.classList.toggle("error", isError);
}

async function loadGallery() {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_IMG_PATH}?ref=${GITHUB_BRANCH}`
    );
    if (!res.ok) return; // mantém os placeholders do HTML em caso de erro

    const files = await res.json();
    const photos = files
      .filter((f) => f.type === "file" && /\.(jpe?g|png|gif|webp)$/i.test(f.name))
      .sort((a, b) => a.name.localeCompare(b.name));

    if (photos.length === 0) return; // mantém os placeholders

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

function getToken() {
  let token = localStorage.getItem(TOKEN_STORAGE_KEY);
  if (token) return token;

  token = prompt(
    "Cole aqui o token do GitHub (gerado em Settings > Developer settings > " +
      "Fine-grained tokens, com permissão de leitura/escrita só neste " +
      "repositório). Ele fica salvo apenas neste navegador."
  );
  if (token) {
    localStorage.setItem(TOKEN_STORAGE_KEY, token.trim());
    return token.trim();
  }
  return null;
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function uploadPhoto(file, token) {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const path = `${GITHUB_IMG_PATH}/${Date.now()}-${safeName}`;
  const content = await fileToBase64(file);

  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
      body: JSON.stringify({
        message: `Adiciona foto ${safeName}`,
        content,
        branch: GITHUB_BRANCH,
      }),
    }
  );

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || `Erro ${res.status}`);
  }
}

if (addPhotoBtn && photoInput) {
  addPhotoBtn.addEventListener("click", () => {
    const token = getToken();
    if (!token) return;
    photoInput.click();
  });

  photoInput.addEventListener("change", async () => {
    const files = Array.from(photoInput.files || []);
    if (files.length === 0) return;

    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!token) return;

    addPhotoBtn.disabled = true;
    let uploaded = 0;

    for (const file of files) {
      setUploadStatus(`enviando ${uploaded + 1} de ${files.length}...`);
      try {
        await uploadPhoto(file, token);
        uploaded++;
      } catch (err) {
        const invalidToken = /bad credentials|401|403/i.test(err.message);
        if (invalidToken) {
          localStorage.removeItem(TOKEN_STORAGE_KEY);
        }
        setUploadStatus(`erro ao enviar "${file.name}": ${err.message}`, true);
        addPhotoBtn.disabled = false;
        photoInput.value = "";
        return;
      }
    }

    setUploadStatus(`${uploaded} foto(s) adicionada(s) com sucesso!`);
    addPhotoBtn.disabled = false;
    photoInput.value = "";
    await loadGallery();
    setTimeout(() => setUploadStatus(""), 4000);
  });
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
