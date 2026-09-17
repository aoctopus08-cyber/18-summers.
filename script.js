const countdown = document.getElementById("countdown");

const unlockDate = new Date(2026, 8, 22, 17, 5, 0);

function updateCountdown() {
  const now = new Date();
  const difference = unlockDate.getTime() - now.getTime();

  if (difference <= 0) {
    countdown.textContent = "It's time! ❤️";
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

updateCountdown();
setInterval(updateCountdown, 1000);
