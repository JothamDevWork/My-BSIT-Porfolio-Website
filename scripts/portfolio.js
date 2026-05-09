/* CURSOR */
const cursorEl = document.getElementById("cursor");
const cursorRing = document.getElementById("cursorRing");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursorEl.style.left = mx + "px";
  cursorEl.style.top = my + "px";
});
document.querySelectorAll("a,button,[onclick]").forEach((el) => {
  el.addEventListener("mouseenter", () => cursorEl.classList.add("expand"));
  el.addEventListener("mouseleave", () => cursorEl.classList.remove("expand"));
});
(function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  cursorRing.style.left = rx + "px";
  cursorRing.style.top = ry + "px";
  requestAnimationFrame(animRing);
})();

/* MATRIX RAIN */
(function () {
  const c = document.getElementById("matrixCanvas"),
    ctx = c.getContext("2d");
  const ch =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*?/\\|ｦｧｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄ01";
  const fs = 13;
  let cols, drops;
  function resize() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    cols = Math.floor(c.width / fs);
    drops = Array(cols)
      .fill(1)
      .map(() => Math.random() * -80);
  }
  resize();
  window.addEventListener("resize", resize);
  function draw() {
    ctx.fillStyle = "rgba(10,10,10,0.05)";
    ctx.fillRect(0, 0, c.width, c.height);
    for (let i = 0; i < drops.length; i++) {
      const char = ch[Math.floor(Math.random() * ch.length)];
      const y = drops[i] * fs;
      ctx.fillStyle = "#00FF6A";
      ctx.font = `bold ${fs}px 'Share Tech Mono',monospace`;
      ctx.fillText(char, i * fs, y);
      ctx.fillStyle = "rgba(0,200,80,0.3)";
      ctx.font = `${fs}px 'Share Tech Mono',monospace`;
      ctx.fillText(ch[Math.floor(Math.random() * ch.length)], i * fs, y - fs);
      if (y > c.height && Math.random() > 0.975) drops[i] = 0;
      drops[i] += 0.5;
    }
  }
  setInterval(draw, Math.round(1000 / 25));
})();

/* INTRO */
const LANGUAGES = [
  {
    text: "Hi, I'm <span class='t-accent'>Tamski</span>",
    name: "ENGLISH",
  },
  {
    text: "你好，我是 <span class='t-accent'>Tamski</span>",
    name: "中文",
  },
  {
    text: "Hola, soy <span class='t-accent'>Tamski</span>",
    name: "ESPAÑOL",
  },
  {
    text: "नमस्ते, मैं <span class='t-accent'>Tamski</span> हूं",
    name: "हिन्दी",
  },
  {
    text: "مرحباً، أنا <span class='t-accent'>Tamski</span>",
    name: "العربية",
    dir: "rtl",
  },
  {
    text: "Bonjour, je suis <span class='t-accent'>Tamski</span>",
    name: "FRANÇAIS",
  },
  {
    text: "Olá, eu sou <span class='t-accent'>Tamski</span>",
    name: "PORTUGUÊS",
  },
  {
    text: "Привет, я <span class='t-accent'>Tamski</span>",
    name: "РУССКИЙ",
  },
  {
    text: "こんにちは、<span class='t-accent'>Tamski</span> です",
    name: "日本語",
  },
  {
    text: "Hallo, ich bin <span class='t-accent'>Tamski</span>",
    name: "DEUTSCH",
  },
];
const langTextEl = document.getElementById("langText"),
  langNameEl = document.getElementById("langName"),
  dotsEl = document.getElementById("introDots"),
  introEl = document.getElementById("intro"),
  mainEl = document.getElementById("mainPage");
LANGUAGES.forEach((_, i) => {
  const d = document.createElement("div");
  d.className = "intro-dot" + (i === 0 ? " active" : "");
  d.id = "dot-" + i;
  dotsEl.appendChild(d);
});
const delay = (ms) => new Promise((r) => setTimeout(r, ms));
let revealDone = false;
async function runIntro() {
  for (let i = 0; i < LANGUAGES.length; i++) {
    if (revealDone) return;
    const lang = LANGUAGES[i];
    langTextEl.style.opacity = "0";
    langTextEl.style.transform = "translateY(-18px)";
    langTextEl.style.filter = "blur(4px)";
    langNameEl.style.opacity = "0";
    await delay(380);
    if (revealDone) return;
    langTextEl.innerHTML = lang.text;
    langTextEl.setAttribute("dir", lang.dir || "ltr");
    langNameEl.textContent = lang.name;
    document.querySelectorAll(".intro-dot").forEach((d, idx) => {
      d.classList.remove("active", "done");
      if (idx < i) d.classList.add("done");
      if (idx === i) d.classList.add("active");
    });
    langTextEl.style.transition = "none";
    langTextEl.style.transform = "translateY(20px)";
    langTextEl.style.filter = "blur(6px)";
    void langTextEl.offsetWidth;
    langTextEl.style.transition =
      "opacity .42s ease, transform .45s cubic-bezier(.34,1.56,.64,1), filter .38s ease";
    langTextEl.style.opacity = "1";
    langTextEl.style.transform = "translateY(0)";
    langTextEl.style.filter = "blur(0)";
    langNameEl.style.opacity = "1";
    await delay(1500);
  }
  if (revealDone) return;
  document.querySelectorAll(".intro-dot").forEach((d) => {
    d.classList.remove("active");
    d.classList.add("done");
  });
  await delay(350);
  revealMain();
}
function revealMain() {
  if (revealDone) return;
  revealDone = true;
  introEl.classList.add("outro");
  mainEl.classList.add("visible");
  introEl.addEventListener(
    "animationend",
    () => introEl.classList.add("gone"),
    { once: true },
  );
  setTimeout(triggerHeroAnims, 200);
  setTimeout(animateCounters, 900);
  setTimeout(initProjects, 400);
  setTimeout(measureScrollBannerWidth, 500);
}
function triggerHeroAnims() {
  document.getElementById("heroPerson").classList.add("hero-animate-person");
  document.getElementById("heroFront").classList.add("hero-animate-front");
  document.getElementById("heroEnd").classList.add("hero-animate-end");
  document.getElementById("heroDev").classList.add("hero-animate-dev");
  document.getElementById("heroInfo1").classList.add("hero-animate-info");
  document.getElementById("heroInfo2").classList.add("hero-animate-info");
  document.getElementById("heroInfo3").classList.add("hero-animate-info");
}
function animateCounters() {
  document.querySelectorAll(".stat-num[data-count]").forEach((el) => {
    const target = parseInt(el.dataset.count, 10);
    let current = 0;
    const step = Math.max(1, Math.floor(target / 12));
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(timer);
    }, 55);
  });
}
document.getElementById("skipBtn").addEventListener("click", revealMain);
setTimeout(runIntro, 600);

/* PROJECTS */
const PROJECTS = [
  {
    idx: "// PROJECT_01",
    name: "Cyborg <em>Portfolio</em>",
    desc: "A futuristic portfolio landing experience featuring bold typography, neon-accented UI, and an interactive 3D character centerpiece. Designed with a sleek dark interface and vibrant cyber-green highlights, it delivers a smooth, immersive navigation flow while emphasizing innovation, clarity, and a modern developer-first aesthetic.",
    tags: ["HTML/CSS", "JavaScript", "UI/UX", "Responsive"],
    img: "../images/proj1.png",
    icon: "",
    label: "",
  },
  {
    idx: "// PROJECT_02",
    name: "Oakway <em>Living</em>",
    desc: "A premium furniture e-commerce experience showcasing warm, ambient visuals, refined layouts, and a seamless shopping journey. Designed with a cozy yet elegant aesthetic, it highlights timeless pieces through immersive imagery, smooth navigation, and a user-focused interface that emphasizes comfort, style, and effortless browsing.",
    tags: ["NASA API", "JavaScript", "Space UI", "APOD"],
    img: "../images/proj2.png",
    icon: "",
    label: "",
  },
  {
    idx: "// PROJECT_03",
    name: "Lacuna <em>Web</em>",
    desc: "A modern web agency landing experience featuring bold typography, a sleek dark interface, and striking orange accents that command attention. Built to showcase creativity and results, it combines structured layouts, engaging visuals, and smooth user flows to highlight services, portfolios, and client trust—delivering a professional, conversion-focused digital presence.",
    tags: ["Astronomy", "REST API", "Dark UI", "Science"],
    img: "../images/proj3.png",
    icon: "",
    label: "",
  },
];
let pIdx = 0,
  pBusy = false,
  touchStartY = 0;
const pSection = document.getElementById("projects"),
  pCard = document.getElementById("projCardDisplay"),
  pImg = document.getElementById("pcdImg"),
  pPH = document.getElementById("pcdPlaceholder"),
  pPHLabel = document.getElementById("pcdPlaceholderLabel"),
  pPHIcon = document.getElementById("pcdIcon"),
  pIdxEl = document.getElementById("pcdIdx"),
  pNameEl = document.getElementById("pcdName"),
  pDescEl = document.getElementById("pcdDesc"),
  pTagsEl = document.getElementById("pcdTags"),
  pCounter = document.getElementById("projCounterLbl"),
  pProgFill = document.getElementById("projProgFill"),
  prevBtn = document.getElementById("projPrevBtn"),
  nextBtn = document.getElementById("projNextBtn");
function initProjects() {
  renderProject(0, false);
  pCard.classList.add("proj-entering");
  setTimeout(() => pCard.classList.remove("proj-entering"), 1000);
}
function updateNavButtons() {
  prevBtn.disabled = pIdx <= 0;
  nextBtn.disabled = pIdx >= PROJECTS.length - 1;
}
function renderProject(idx, animate) {
  const p = PROJECTS[idx];
  function applyContent() {
    if (p.img) {
      pImg.src = p.img;
      pImg.alt = p.idx;
      pImg.style.display = "block";
      pPH.style.display = "none";
    } else {
      pImg.style.display = "none";
      pPH.style.display = "flex";
      pPHIcon.innerHTML = p.icon;
      pPHLabel.textContent = p.label;
    }
    pIdxEl.textContent = p.idx;
    pNameEl.innerHTML = p.name;
    pDescEl.textContent = p.desc;
    pTagsEl.innerHTML = p.tags
      .map((t) => `<span class="pcd-tag">${t}</span>`)
      .join("");
    pCounter.textContent =
      String(idx + 1).padStart(2, "0") +
      " / " +
      String(PROJECTS.length).padStart(2, "0");
    pProgFill.style.width = ((idx + 1) / PROJECTS.length) * 100 + "%";
    updateNavButtons();
  }
  if (!animate) {
    applyContent();
    return;
  }
  pCard.classList.add("transitioning", "fade-out");
  setTimeout(() => {
    applyContent();
    pCard.classList.remove("transitioning", "fade-out");
    pCard.classList.add("fade-in-prep");
    void pCard.offsetWidth;
    pCard.classList.remove("fade-in-prep");
    pCard.classList.add("fade-in");
    setTimeout(() => {
      pCard.classList.remove("fade-in", "transitioning");
      pBusy = false;
    }, 600);
  }, 300);
}
function goNext() {
  if (pBusy || pIdx >= PROJECTS.length - 1) return false;
  pBusy = true;
  pIdx++;
  renderProject(pIdx, true);
  return true;
}
function goPrev() {
  if (pBusy || pIdx <= 0) return false;
  pBusy = true;
  pIdx--;
  renderProject(pIdx, true);
  return true;
}
prevBtn.addEventListener("click", () => {
  if (!pBusy) goPrev();
});
nextBtn.addEventListener("click", () => {
  if (!pBusy) goNext();
});
function inProjSection() {
  const r = pSection.getBoundingClientRect();
  return r.top <= 5 && r.bottom >= window.innerHeight - 5;
}
let wCool = false;
window.addEventListener(
  "wheel",
  (e) => {
    if (!inProjSection() || wCool || pBusy) return;
    const dn = e.deltaY > 0;
    if (dn && pIdx < PROJECTS.length - 1) {
      e.preventDefault();
      wCool = true;
      setTimeout(() => (wCool = false), 950);
      goNext();
    } else if (!dn && pIdx > 0) {
      e.preventDefault();
      wCool = true;
      setTimeout(() => (wCool = false), 950);
      goPrev();
    }
  },
  { passive: false },
);
window.addEventListener(
  "touchstart",
  (e) => {
    touchStartY = e.touches[0].clientY;
  },
  { passive: true },
);
window.addEventListener(
  "touchend",
  (e) => {
    if (!inProjSection() || pBusy) return;
    const dy = touchStartY - e.changedTouches[0].clientY;
    if (Math.abs(dy) < 45) return;
    if (dy > 0 && pIdx < PROJECTS.length - 1) {
      e.preventDefault();
      goNext();
    } else if (dy < 0 && pIdx > 0) {
      e.preventDefault();
      goPrev();
    }
  },
  { passive: false },
);
window.addEventListener("keydown", (e) => {
  if (!inProjSection()) return;
  if (e.key === "ArrowDown" || e.key === "PageDown") {
    if (pIdx < PROJECTS.length - 1) {
      e.preventDefault();
      goNext();
    }
  } else if (e.key === "ArrowUp" || e.key === "PageUp") {
    if (pIdx > 0) {
      e.preventDefault();
      goPrev();
    }
  }
});

/* PARALLAX */
const heroImg = document.getElementById("heroImg"),
  heroPanel = document.getElementById("tamski"),
  projGridBg = document.querySelector("#projects .section-grid-bg"),
  skillsGridBg = document.querySelector("#skills .section-grid-bg"),
  skillsSection = document.getElementById("skills"),
  srvGridBg = document.querySelector("#service .section-grid-bg"),
  srvSection = document.getElementById("service"),
  srvCards = document.querySelectorAll(".srv-card");
function runAllParallax() {
  if (heroPanel) {
    const progress =
      -heroPanel.getBoundingClientRect().top / window.innerHeight;
    heroImg.style.transform = `translateY(${-progress * 50}px)`;
  }
  if (projGridBg) {
    const rect = pSection.getBoundingClientRect();
    const progress =
      (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
    projGridBg.style.transform = `translateY(${(progress - 0.5) * 70}px) scale(1.1)`;
  }
  if (skillsGridBg && skillsSection) {
    const rect = skillsSection.getBoundingClientRect();
    const progress =
      (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
    skillsGridBg.style.transform = `translateY(${(progress - 0.5) * 80}px) scale(1.12)`;
  }
  if (srvGridBg && srvSection) {
    const rect = srvSection.getBoundingClientRect();
    const progress =
      (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
    srvGridBg.style.transform = `translateY(${(progress - 0.5) * 100}px) scale(1.15)`;
  }
  if (srvSection) {
    const rect = srvSection.getBoundingClientRect();
    const progress =
      (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
    const base = progress - 0.5;
    srvCards.forEach((card) => {
      const depth = parseInt(card.dataset.srvDepth || 0, 10);
      const shift = base * depth * 3.5;
      card.style.setProperty("--card-parallax", `${shift}px`);
      if (card.classList.contains("srv-visible"))
        card.style.transform = `translateX(0) translateY(${shift}px)`;
    });
  }
}
let rafPending = false;
window.addEventListener(
  "scroll",
  () => {
    if (!rafPending) {
      rafPending = true;
      requestAnimationFrame(() => {
        runAllParallax();
        rafPending = false;
      });
    }
  },
  { passive: true },
);
runAllParallax();

/* NAV ACTIVE */
const sections = document.querySelectorAll(".section-panel[id]"),
  navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
function updateActiveNav() {
  const trigger = window.scrollY + window.innerHeight * 0.35;
  let activeId = sections[0].id;
  sections.forEach((sec) => {
    if (sec.offsetTop <= trigger) activeId = sec.id;
  });
  navLinks.forEach((a) =>
    a.classList.toggle("active", a.getAttribute("href") === "#" + activeId),
  );
}
window.addEventListener("scroll", updateActiveNav, { passive: true });
updateActiveNav();

/* SECTION FLASH + NAV */
const flashEl = document.getElementById("sectionFlash");
function navTo(id) {
  flashEl.classList.add("flash");
  setTimeout(() => flashEl.classList.remove("flash"), 120);
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}
navLinks.forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    navTo(a.getAttribute("href").slice(1));
    document.getElementById("navLinks").classList.remove("open");
  });
});
window.smoothTo = (id) => navTo(id);
document.getElementById("hamburger").addEventListener("click", () => {
  document.getElementById("navLinks").classList.toggle("open");
});

/* FOOTER SUBSCRIBE */
function footerSubscribe() {
  const input = document.getElementById("footerSubInput"),
    form = document.getElementById("footerSubForm"),
    success = document.getElementById("footerSubSuccess");
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
  if (!valid) {
    form.style.borderColor = "rgba(255,60,60,.7)";
    form.style.boxShadow = "0 0 10px rgba(255,60,60,.22)";
    setTimeout(() => {
      form.style.borderColor = "";
      form.style.boxShadow = "";
    }, 1800);
    return;
  }
  form.style.display = "none";
  success.classList.add("show");
  input.value = "";
}
document.getElementById("footerSubInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") footerSubscribe();
});

/*
 * ── SCROLL REVEAL — IO FALLBACK ─────────────────────────────────────────
 *
 * Used only in browsers that don't support animation-timeline: view().
 *
 * BIDIRECTIONAL logic:
 *   • isIntersecting → add io-visible   (animate IN,  staggered delay)
 *   • !isIntersecting → remove io-visible (animate OUT, instant, no delay)
 *
 * Removing io-visible reverses the entry CSS transition: elements fade
 * out and translate back to their starting offsets (down for "up",
 * left for "left", right for "right"), mirroring the entry effect
 * in reverse regardless of whether the element exited above or below.
 *
 * Sections excluded from the observer: hero (#tamski) and footer.
 * Those elements are either hero-animated or permanently visible.
 */
(function () {
  let supported = false;
  try {
    supported = CSS.supports("animation-timeline", "view()");
  } catch (e) {}
  if (supported) return;

  const SKIP_SECTIONS = ["tamski"];
  const els = Array.from(document.querySelectorAll("[data-anim]")).filter(
    (el) => {
      const inFooter = !!el.closest(".site-footer");
      if (inFooter) return false;
      const section = el.closest(".section-panel[id]");
      return !section || !SKIP_SECTIONS.includes(section.id);
    },
  );

  const counters = {};
  els.forEach((el) => {
    const section = el.closest(".section-panel");
    const key = section ? section.id || section.className : "_root";
    if (!counters[key]) counters[key] = 0;
    el._baseDelay = counters[key] * 110;
    counters[key]++;
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (entry.isIntersecting) {
          /*
           * Element entering viewport from either direction.
           * Animate IN with the staggered delay assigned at setup.
           */
          el.style.transitionDelay = el._baseDelay + "ms";
          el.classList.add("io-visible");
        } else {
          /*
           * Element leaving viewport in either direction
           * (scrolled above OR scrolled back below the viewport).
           * Remove io-visible immediately so the CSS transition
           * plays in reverse — fading out and returning to the
           * starting offset — creating the symmetric exit animation.
           */
          el.style.transitionDelay = "0ms";
          el.classList.remove("io-visible");
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );

  els.forEach((el) => io.observe(el));

  /* Footer data-anim elements are permanently visible. */
  document.querySelectorAll(".site-footer [data-anim]").forEach((el) => {
    el.style.transitionDelay = "0ms";
    el.classList.add("io-visible");
  });
})();

/* SKILL BARS */
(function () {
  const rows = document.querySelectorAll(".skill-row[data-pct]");
  if (!rows.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const row = entry.target,
          fill = row.querySelector(".skill-fill");
        if (!fill) return;
        const idx = Array.from(rows).indexOf(row);
        setTimeout(() => {
          fill.style.width = row.dataset.pct + "%";
        }, idx * 90);
        io.unobserve(row);
      });
    },
    { threshold: 0.25 },
  );
  rows.forEach((row) => io.observe(row));
})();

/* SERVICE CARDS */
(function () {
  const cards = document.querySelectorAll(".srv-card");
  if (!cards.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const card = entry.target,
          delay = parseInt(card.dataset.srvDepth || 0, 10) * 80;
        setTimeout(() => card.classList.add("srv-visible"), delay);
        io.unobserve(card);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
  );
  cards.forEach((card) => io.observe(card));
})();

/* SCROLL BANNER PARALLAX */
(function () {
  const track = document.getElementById("scrollTrack");
  if (!track) return;
  let rawOffset = 0,
    velocity = 0,
    prevY = window.scrollY,
    halfWidth = 0;
  function measureHalfWidth() {
    const span = track.querySelector(".scroll-text");
    if (!span) return;
    const gap =
      parseFloat(
        getComputedStyle(track).columnGap ||
          getComputedStyle(track).gap ||
          "64",
      ) || 64;
    halfWidth = span.offsetWidth + gap;
  }
  window.addEventListener(
    "scroll",
    () => {
      const currentY = window.scrollY,
        delta = currentY - prevY;
      velocity -= delta * 0.55;
      prevY = currentY;
    },
    { passive: true },
  );
  (function tick() {
    rawOffset += velocity;
    velocity *= 0.88;
    let display = rawOffset;
    if (halfWidth > 0)
      display = ((rawOffset % halfWidth) + halfWidth) % halfWidth;
    track.style.transform = `translateX(-${display}px)`;
    requestAnimationFrame(tick);
  })();
  if (document.readyState === "complete") measureHalfWidth();
  else window.addEventListener("load", measureHalfWidth, { once: true });
  window.addEventListener("resize", measureHalfWidth);
})();

function measureScrollBannerWidth() {
  const track = document.getElementById("scrollTrack");
  if (!track) return;
  window.dispatchEvent(new Event("resize"));
}
