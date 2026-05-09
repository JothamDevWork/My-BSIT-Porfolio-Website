// Typing effect for button — runs once
const fullText = "> Check my Website_";
const btnText = document.getElementById("btn-text");
let i = 0;

function typeText() {
  if (i < fullText.length) {
    btnText.textContent = fullText.slice(0, i + 1);
    i++;
    setTimeout(typeText, 60);
  }
}

// Start typing after button fades in
setTimeout(typeText, 2400);

// Click to fade out and go to site
document.getElementById("enter-btn").addEventListener("click", () => {
  const loader = document.getElementById("loader");

  // Fade grid bg
  document.querySelector(".grid-bg").style.transition = "opacity 1s ease";
  document.querySelector(".grid-bg").style.opacity = "0";

  // Smoothly slide corners back to center while fading out
  const corners = document.querySelectorAll(".corner");
  corners.forEach((c) => {
    // Stop the CSS animation and lock current position before transitioning
    const rect = c.getBoundingClientRect();
    c.style.animation = "none";
    c.style.opacity = "1";

    if (c.classList.contains("tl")) {
      c.style.top = rect.top + "px";
      c.style.left = rect.left + "px";
    } else if (c.classList.contains("tr")) {
      c.style.top = rect.top + "px";
      c.style.right = window.innerWidth - rect.right + "px";
    } else if (c.classList.contains("bl")) {
      c.style.bottom = window.innerHeight - rect.bottom + "px";
      c.style.left = rect.left + "px";
    } else if (c.classList.contains("br")) {
      c.style.bottom = window.innerHeight - rect.bottom + "px";
      c.style.right = window.innerWidth - rect.right + "px";
    }

    // Force reflow then animate to center + fade
    c.getBoundingClientRect();
    c.style.transition =
      "top 0.7s ease, bottom 0.7s ease, left 0.7s ease, right 0.7s ease, opacity 0.7s ease";

    if (c.classList.contains("tl")) {
      c.style.top = "50vh";
      c.style.left = "50vw";
    } else if (c.classList.contains("tr")) {
      c.style.top = "50vh";
      c.style.right = "50vw";
    } else if (c.classList.contains("bl")) {
      c.style.bottom = "50vh";
      c.style.left = "50vw";
    } else if (c.classList.contains("br")) {
      c.style.bottom = "50vh";
      c.style.right = "50vw";
    }
    c.style.opacity = "0";
  });

  // Fade loader content
  loader.classList.add("fade-out");

  // After fade, redirect to your main page
  setTimeout(() => {
    // Replace 'index.html' with your actual first page
    window.location.href = "pages/home.html";
  }, 1000);
});
