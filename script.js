const UNLOCK_DATE = new Date("2026-09-01T17:05:00");

const lockScreen = document.getElementById("lockScreen");
const site = document.getElementById("site");
const countdown = document.getElementById("countdown");

function updateLock() {
  const now = new Date();
  const difference = UNLOCK_DATE - now;

  if (difference <= 0) {
    lockScreen.classList.add("hidden");
    site.classList.remove("hidden");
    startReveals();
    return;
  }

  const days = Math.floor(difference / 86400000);
  const hours = Math.floor((difference % 86400000) / 3600000);
  const minutes = Math.floor((difference % 3600000) / 60000);
  const seconds = Math.floor((difference % 60000) / 1000);

  countdown.textContent =
    `${days}d · ${String(hours).padStart(2,"0")}h · ${String(minutes).padStart(2,"0")}m · ${String(seconds).padStart(2,"0")}s`;
}

function startReveals() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

updateLock();
setInterval(updateLock, 1000);

document.getElementById("startButton").addEventListener("click", () => {
  document.getElementById("years").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("secretButton").addEventListener("click", () => {
  const secret = document.getElementById("secret");
  secret.classList.remove("hidden-secret");
  secret.classList.add("visible");
  secret.scrollIntoView({ behavior: "smooth" });
});

const song = document.getElementById("song");
const musicButton = document.getElementById("musicButton");

musicButton.addEventListener("click", () => {
  if (!song.querySelector("source")) {
    alert("Add your permitted music file/link in the <audio> section of index.html first.");
    return;
  }

  if (song.paused) {
    song.play();
    musicButton.textContent = "♫ Pause our song";
  } else {
    song.pause();
    musicButton.textContent = "♫ Play our song";
  }
});
