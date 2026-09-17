const countdown = document.getElementById("countdown");
const lockScreen = document.getElementById("lockScreen");
const site = document.getElementById("site");

// September 22, 2026 at 5:05 PM
const unlockDate = new Date(2026, 8, 22, 17, 5, 0);

function updateCountdown() {
  const now = new Date();
  const difference = unlockDate.getTime() - now.getTime();

  if (difference <= 0) {
    lockScreen.classList.add("hidden");
    site.classList.remove("hidden");
    startReveals();
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (difference % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor(
    (difference % (1000 * 60)) / 1000
  );

  countdown.textContent =
    `${days}d · ${String(hours).padStart(2, "0")}h · ${String(minutes).padStart(2, "0")}m · ${String(seconds).padStart(2, "0")}s`;
}

function startReveals() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => {
    observer.observe(el);
  });
}

updateCountdown();
setInterval(updateCountdown, 1000);


// START BUTTON
const startButton = document.getElementById("startButton");

if (startButton) {
  startButton.addEventListener("click", () => {
    document.getElementById("years").scrollIntoView({
      behavior: "smooth"
    });
  });
}


// SECRET BUTTON
const secretButton = document.getElementById("secretButton");

if (secretButton) {
  secretButton.addEventListener("click", () => {
    const secret = document.getElementById("secret");

    secret.classList.remove("hidden-secret");
    secret.classList.add("visible");
    secret.scrollIntoView({
      behavior: "smooth"
    });
  });
}


// MUSIC
const song = document.getElementById("song");
const musicButton = document.getElementById("musicButton");

if (musicButton && song) {
  musicButton.addEventListener("click", () => {

    if (!song.querySelector("source")) {
      alert("Add your music file in the audio section of index.html first.");
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
}
