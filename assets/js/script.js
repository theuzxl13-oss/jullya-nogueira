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
  "porque seu sorriso muda meu dia inteiro",
  "pela forma como você cuida de quem você ama",
  "porque você me faz querer ser melhor todos os dias",
  "pelo seu jeito único de ver o mundo",
  "porque com você tudo fica mais leve",
  "pela sua força, mesmo nos dias difíceis",
  "porque você é o meu lugar favorito",
  "por cada risada boba que a gente dá junto",
  "porque você acredita em mim, até quando eu duvido",
  "porque simplesmente é você",
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
