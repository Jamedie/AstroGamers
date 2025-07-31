function getZodiacSign(month, day) {
  const signs = [
    { name: "capricorne", start: [12, 22], end: [1, 19] },
    { name: "verseau", start: [1, 20], end: [2, 18] },
    { name: "poissons", start: [2, 19], end: [3, 20] },
    { name: "bélier", start: [3, 21], end: [4, 19] },
    { name: "taureau", start: [4, 20], end: [5, 20] },
    { name: "gémeaux", start: [5, 21], end: [6, 20] },
    { name: "cancer", start: [6, 21], end: [7, 22] },
    { name: "lion", start: [7, 23], end: [8, 22] },
    { name: "vierge", start: [8, 23], end: [9, 22] },
    { name: "balance", start: [9, 23], end: [10, 22] },
    { name: "scorpion", start: [10, 23], end: [11, 21] },
    { name: "sagittaire", start: [11, 22], end: [12, 21] },
  ];

  return (
    signs.find(
      ({ start, end }) =>
        (month === start[0] && day >= start[1]) ||
        (month === end[0] && day <= end[1])
    )?.name || "capricorne"
  );
}

function createZodiacCard(sign) {
  const card = document.createElement("div");
  card.className = "zodiac-result-card fade-in";

  const img = document.createElement("img");
  img.src = `/assets/zodiac/${sign}.webp`;
  img.alt = sign;
  img.className = "zodiac-icon-result";

  const heading = document.createElement("p");
  heading.className = "zodiac-result-heading";
  heading.textContent = "Ton signe est";

  const name = document.createElement("h3");
  name.className = "zodiac-result-name";
  name.textContent = sign.toUpperCase();

  const button = document.createElement("a");
  button.href = `/signe/${sign}`;
  button.className = "cta-button big";
  button.id = "ctaZodiac";
  button.textContent = "Voir ton horoscope";

  card.append(img, heading, name, button);
  return card;
}

function launchParticles(target, sign) {
  const rect = target.getBoundingClientRect();
  const particlesContainer =
    document.getElementById("particles") || document.body;

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = `${rect.left + rect.width / 2}px`;
    particle.style.top = `${rect.top + rect.height / 2}px`;
    particle.style.setProperty("--x", `${(Math.random() - 0.5) * 300}px`);
    particle.style.setProperty("--y", `${(Math.random() - 0.5) * 300}px`);
    particlesContainer.appendChild(particle);

    setTimeout(() => particle.remove(), 800);
  }

  setTimeout(() => {
    window.location.href = `/signe/${sign}`;
  }, 300);
}

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("findZodiac");
  const calendarTrigger = document.getElementById("calendarTrigger");
  const birthdateInput = document.getElementById("birthdate");
  const resultContainer = document.getElementById("result");

  calendarTrigger.addEventListener("click", () => {
    birthdateInput.showPicker?.() || birthdateInput.focus();
  });

  button.addEventListener("click", () => {
    const date = new Date(birthdateInput.value);
    if (isNaN(date)) return;

    const month = date.getMonth() + 1;
    const day = date.getDate();
    const sign = getZodiacSign(month, day);

    resultContainer.innerHTML = "";
    const card = createZodiacCard(sign);
    resultContainer.appendChild(card);

    const ctaButton = card.querySelector("#ctaZodiac");
    ctaButton.addEventListener("click", (e) => {
      e.preventDefault();
      launchParticles(ctaButton, sign);
    });

    document
      .querySelector("#zodiac-finder")
      ?.scrollIntoView({ behavior: "smooth" });
  });
});
