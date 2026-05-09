/* ════ MATRIX RAIN ════ */
const canvas = document.getElementById("matrix-canvas"),
  ctx = canvas.getContext("2d");
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);
const chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/\\~`ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ01";
const fontSize = 13;
let cols, drops;
function initDrops() {
  cols = Math.floor(canvas.width / fontSize);
  drops = Array(cols)
    .fill(1)
    .map(() => Math.random() * -100);
}
initDrops();
window.addEventListener("resize", initDrops);
function drawMatrix() {
  ctx.fillStyle = "rgba(10,10,10,0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < drops.length; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)],
      y = drops[i] * fontSize;
    ctx.fillStyle = "#00FF6A";
    ctx.font = `bold ${fontSize}px 'Share Tech Mono',monospace`;
    ctx.fillText(char, i * fontSize, y);
    ctx.fillStyle = "rgba(0,200,80,0.35)";
    ctx.font = `${fontSize}px 'Share Tech Mono',monospace`;
    ctx.fillText(
      chars[Math.floor(Math.random() * chars.length)],
      i * fontSize,
      y - fontSize,
    );
    if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i] += 0.5;
  }
}
setInterval(drawMatrix, 40);

/* ════ CUSTOM CURSOR ════ */
const cursorEl = document.getElementById("cursor"),
  cursorRing = document.getElementById("cursorRing");
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
(function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  cursorRing.style.left = rx + "px";
  cursorRing.style.top = ry + "px";
  requestAnimationFrame(animRing);
})();
document
  .querySelectorAll(
    "a,button,.tag,.social-link,.about-card,.tl-card,.str-card,.opp-slide,.opp-dot",
  )
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursorEl.classList.add("hovering");
      cursorRing.classList.add("hovering");
    });
    el.addEventListener("mouseleave", () => {
      cursorEl.classList.remove("hovering");
      cursorRing.classList.remove("hovering");
    });
  });

/* ════ TYPING SUBTITLE ════ */
const lines = [
  "BSIT Student",
  "Web Developer",
  "Network Enthusiast",
  "Problem Solver",
];
let li = 0,
  ci = 0,
  deleting = false;
const subEl = document.getElementById("typed-sub");
function typeLoop() {
  const current = lines[li];
  if (!deleting) {
    subEl.textContent = current.slice(0, ++ci);
    if (ci === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    subEl.textContent = current.slice(0, --ci);
    if (ci === 0) {
      deleting = false;
      li = (li + 1) % lines.length;
    }
  }
  setTimeout(typeLoop, deleting ? 55 : 90);
}
typeLoop();

/* ════ TERMINAL ════ */
const termLines = [
  { type: "prompt", text: "whoami" },
  { type: "out", text: "bsit_student — aspiring developer" },
  { type: "blank" },
  { type: "prompt", text: "cat skills.txt" },
  { type: "out", text: "► HTML5  CSS3  JavaScript" },
  { type: "out", text: "► Python  MySQL  PHP" },
  { type: "out", text: "► Networking  Linux  Git" },
  { type: "blank" },
  { type: "prompt", text: "ls projects/" },
  {
    type: "out",
    text: "portfolio/   web-apps/   scripts/",
    cls: "accent",
  },
  { type: "blank" },
  { type: "prompt", text: "echo $STATUS" },
  { type: "out", text: "Open to opportunities 🟢", cls: "accent" },
  { type: "blank" },
  { type: "prompt", text: "./run --passion" },
  { type: "out", text: "Initializing...", cls: "warn" },
  { type: "out", text: "[████████████] 100% — Let's build!" },
];
const termBody = document.getElementById("terminalBody");
let tIdx = 0;
function appendTermLine(o) {
  const el = document.createElement("span");
  el.classList.add("t-line");
  if (o.type === "blank") el.classList.add("t-blank");
  else if (o.type === "prompt")
    el.innerHTML = `<span class="t-prompt">root@portfolio:~$ </span><span class="t-cmd">${o.text}</span>`;
  else {
    el.classList.add("t-out");
    if (o.cls) el.classList.add(o.cls);
    el.textContent = o.text;
  }
  termBody.appendChild(el);
  termBody.scrollTop = termBody.scrollHeight;
}
function runTerminal() {
  if (tIdx < termLines.length) {
    appendTermLine(termLines[tIdx++]);
    setTimeout(runTerminal, termLines[tIdx - 1].type === "prompt" ? 600 : 180);
  } else {
    const cur = document.createElement("span");
    cur.classList.add("t-line");
    cur.innerHTML =
      '<span class="t-prompt">root@portfolio:~$ </span><span class="t-cursor"></span>';
    termBody.appendChild(cur);
  }
}
setTimeout(runTerminal, 1200);

/* ════ SCROLL REVEAL (.reveal inner elements) ════
         Keeps observing after first intersection so elements
         can re-animate when the user scrolls back down to them.
      ════ */
(function () {
  const els = Array.from(document.querySelectorAll(".reveal"));
  els.forEach((el) => {
    const i = parseFloat(el.style.getPropertyValue("--i")) || 0;
    el.style.transitionDelay = i * 90 + "ms";
  });
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          // Reverse exit: strip .visible when element drops back below viewport
          // so it re-animates on the next downward scroll-through
          const rect = entry.boundingClientRect;
          if (rect.top > 0) {
            // Element is below viewport — user scrolled up past its section
            entry.target.classList.remove("visible");
          }
          // Elements already above viewport keep .visible (already passed)
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
  );
  els.forEach((el) => io.observe(el));
  document.querySelectorAll("#home .reveal").forEach((el, i) => {
    setTimeout(() => el.classList.add("visible"), 200 + i * 100);
  });
})();

/* ════ SCROLL HINT + NAVBAR ════ */
const scrollHint = document.getElementById("scrollHint"),
  mainNav = document.getElementById("mainNav");
window.addEventListener(
  "scroll",
  () => {
    scrollHint.style.opacity = window.scrollY > 80 ? "0" : "1";
    mainNav.classList.toggle("scrolled", window.scrollY > 20);
  },
  { passive: true },
);

/* ════ NAV ACTIVE LINK ════ */
const sections = document.querySelectorAll(".section-panel[id]"),
  navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
function updateActiveNav() {
  const trigger = window.scrollY + window.innerHeight * 0.35;
  let activeId = sections[0].id;
  sections.forEach((sec) => {
    if (sec.offsetTop <= trigger) activeId = sec.id;
  });
  navLinks.forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + activeId);
  });
}
window.addEventListener("scroll", updateActiveNav, { passive: true });
updateActiveNav();

/* ════ HAMBURGER ════ */
const hamburger = document.getElementById("hamburger");
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  document.getElementById("navLinks").classList.toggle("open");
});
navLinks.forEach((a) =>
  a.addEventListener("click", () => {
    hamburger.classList.remove("open");
    document.getElementById("navLinks").classList.remove("open");
  }),
);

/* ════ COMMENTS ════ */
function postComment() {
  const name = document.getElementById("nameInput").value.trim(),
    msg = document.getElementById("messageInput").value.trim();
  if (!name || !msg) {
    alert("Please enter both name and message.");
    return;
  }
  const div = document.createElement("div");
  div.classList.add("comment");
  div.innerHTML = `<strong>${name}</strong><p>${msg}</p>`;
  document.getElementById("commentSection").appendChild(div);
  document.getElementById("nameInput").value = "";
  document.getElementById("messageInput").value = "";
}
document.getElementById("messageInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    postComment();
  }
});

/* ════ EXPERIENCE SLIDESHOW ════ */
const experiences = [
  {
    title: "MY FRESHMAN JOURNEY",
    text: "My first year as a BSIT student was full of adjustments and new experiences. I was introduced to the fundamentals of programming, basic computer operations, and different areas of information technology. At first, everything felt overwhelming. However, as time passed, I slowly developed confidence and started enjoying the process of solving problems.",
    images: [
      "../images/exp1-1.jpg",
      "../images/exp1-2.png",
      "../images/exp1-3.jpg",
    ],
  },
  {
    title: "BEING SOPHOMORE",
    text: "During my second year, the lessons became more challenging and demanding. I encountered subjects that truly tested my logical and analytical thinking. Despite the difficulty, I gained more confidence in coding and started working on more complex projects that allowed me to apply what I had learned in practical scenarios.",
    images: [
      "../images/exp2-1.jpg",
      "../images/exp2-2.jpg",
      "../images/exp2-3.jpg",
    ],
  },
];
let expIndex = 0,
  imgIndex = 0,
  slideshowInterval,
  currentImg = "A";
function changeImage(newSrc) {
  const imgA = document.getElementById("imgA"),
    imgB = document.getElementById("imgB");
  if (currentImg === "A") {
    imgB.src = newSrc;
    imgB.classList.add("active");
    imgA.classList.remove("active");
    currentImg = "B";
  } else {
    imgA.src = newSrc;
    imgA.classList.add("active");
    imgB.classList.remove("active");
    currentImg = "A";
  }
}
function nextExperience() {
  const title = document.getElementById("expTitle"),
    text = document.getElementById("expText");
  expIndex = (expIndex + 1) % experiences.length;
  imgIndex = 0;
  title.style.opacity = "0";
  text.style.opacity = "0";
  setTimeout(() => {
    title.textContent = experiences[expIndex].title;
    text.textContent = experiences[expIndex].text;
    title.style.opacity = "1";
    text.style.opacity = "1";
  }, 300);
  changeImage(experiences[expIndex].images[0]);
  startSlideshow();
}
function startSlideshow() {
  clearInterval(slideshowInterval);
  slideshowInterval = setInterval(() => {
    const imgs = experiences[expIndex].images;
    imgIndex = (imgIndex + 1) % imgs.length;
    changeImage(imgs[imgIndex]);
  }, 5000);
}
startSlideshow();

/* ════ ACHIEVEMENTS ════ */
const earnData = [
  {
    title: "Dean's Lister",
    text: "Achieved Dean's Lister distinction during my first year, first semester as a BSIT student at the College of Information Technology, Cagayan State University – Carig Campus, reflecting strong academic performance and dedication.",
    img: "../images/ach1.png",
  },
  {
    title: "ITS First Year Representative",
    text: "Elected as the First Year Representative of the Information Technology Society (ITS) at Cagayan State University – Carig Campus, demonstrating leadership, communication skills, and active involvement in student initiatives.",
    img: "../images/ach2.png",
  },
  {
    title: "Crowned Web Static Champion",
    text: "Won the Web Static competition held at Cagayan State University – Gonzaga, showcasing strong frontend development, design, and problem-solving skills.",
    img: "../images/ach3.jpg",
  },
  {
    title: "Hackathon Experience",
    text: "Participated in a regional hackathon at Cagayan State University – Andrews Campus, where our team earned the Wildcard award in Region II through collaboration, innovation, and technical execution.",
    img: "../images/ach4.png",
  },
];
let earnIndex = 0;
const cardIds = ["earnCard0", "earnCard1", "earnCard2"];
function updateEarn() {
  const titleEl = document.getElementById("earnTitle"),
    textEl = document.getElementById("earnText");
  titleEl.classList.add("earn-text-hidden");
  textEl.classList.add("earn-text-hidden");
  setTimeout(() => {
    titleEl.textContent = earnData[earnIndex].title;
    textEl.textContent = earnData[earnIndex].text;
    titleEl.classList.remove("earn-text-hidden");
    textEl.classList.remove("earn-text-hidden");
  }, 380);
  cardIds.forEach((id, slot) => {
    const card = document.getElementById(id);
    const dataIndex =
      (earnIndex + (cardIds.length - 1 - slot)) % earnData.length;
    card.classList.remove("active");
    setTimeout(() => {
      card.src = earnData[dataIndex].img;
    }, slot * 80);
  });
  setTimeout(() => {
    document.getElementById("earnCard2").classList.add("active");
  }, 120);
}
updateEarn();
function nextEarn() {
  earnIndex = (earnIndex + 1) % earnData.length;
  updateEarn();
}
function prevEarn() {
  earnIndex = (earnIndex - 1 + earnData.length) % earnData.length;
  updateEarn();
}

/* ════ STRUGGLES TABS + BREACH BARS ════ */
let strCurrentYear = 0;
function setStrHeight() {
  const strCards = document.getElementById("strCards");
  const group = strCards.querySelector(
    `.str-card-group[data-year="${strCurrentYear}"]`,
  );
  if (!group) return;
  const savedPos = group.style.position;
  group.style.position = "static";
  group.style.visibility = "hidden";
  group.style.transform = "none";
  strCards.style.height = "auto";
  const h = strCards.scrollHeight;
  group.style.position = savedPos;
  group.style.visibility = "";
  group.style.transform = "";
  strCards.style.height = Math.max(h, 50) + "px";
}
let _strResizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(_strResizeTimer);
  _strResizeTimer = setTimeout(setStrHeight, 120);
});
(function initStruggles() {
  function buildBlocks(pct) {
    const total = 20,
      filled = Math.round((pct / 100) * total);
    return "[" + ("█".repeat(filled) + "░".repeat(total - filled)) + "]";
  }
  function animateBars(group) {
    group.querySelectorAll(".str-breach-fill").forEach((fill) => {
      const pct = fill.dataset.pct;
      requestAnimationFrame(() => {
        setTimeout(() => {
          fill.style.width = pct + "%";
        }, 120);
      });
    });
    group.querySelectorAll(".str-breach-blocks").forEach((el) => {
      el.textContent = buildBlocks(el.dataset.pct);
    });
  }
  document.querySelectorAll(".str-breach-blocks").forEach((el) => {
    el.textContent = buildBlocks(el.dataset.pct);
  });
  const firstGroup = document.querySelector('.str-card-group[data-year="0"]');
  firstGroup.classList.add("visible");
  animateBars(firstGroup);
  setTimeout(setStrHeight, 80);
  window.switchYear = function (year, btn) {
    if (year === strCurrentYear) return;
    document
      .querySelectorAll(".str-tab")
      .forEach((t) => t.classList.remove("active"));
    btn.classList.add("active");
    const direction = year > strCurrentYear ? "right" : "left";
    const leaving = document.querySelector(
      `.str-card-group[data-year="${strCurrentYear}"]`,
    );
    const entering = document.querySelector(
      `.str-card-group[data-year="${year}"]`,
    );
    entering.classList.remove(
      "spin-in-right",
      "spin-in-left",
      "hidden-right",
      "hidden-left",
      "visible",
    );
    leaving.classList.remove("spin-in-right", "spin-in-left");
    void entering.offsetWidth;
    leaving.classList.add(
      direction === "right" ? "hidden-left" : "hidden-right",
    );
    leaving.classList.remove("visible");
    entering.classList.add(
      direction === "right" ? "spin-in-right" : "spin-in-left",
    );
    strCurrentYear = year;
    entering.addEventListener(
      "animationend",
      function onEnd() {
        entering.removeEventListener("animationend", onEnd);
        entering.classList.remove("spin-in-right", "spin-in-left");
        entering.classList.add("visible");
        entering.querySelectorAll(".str-breach-fill").forEach((f) => {
          f.style.width = "0%";
        });
        animateBars(entering);
        setStrHeight();
      },
      { once: true },
    );
  };
})();

/* ════ OPPORTUNITIES CAROUSEL ════ */
(function () {
  const track = document.getElementById("oppTrack"),
    outer = document.getElementById("oppOuter"),
    dotsWrap = document.getElementById("oppDots");
  const slides = Array.from(track.querySelectorAll(".opp-slide")),
    slideCount = slides.length;
  const visCount = () =>
    window.innerWidth <= 600 ? 1 : window.innerWidth <= 900 ? 2 : 3;
  const maxIndex = () => Math.max(0, slideCount - visCount());
  let currentIndex = 0,
    autoTimer = null,
    isPaused = false;
  const dots = [];
  function buildDots() {
    dotsWrap.innerHTML = "";
    dots.length = 0;
    const max = maxIndex();
    for (let i = 0; i <= max; i++) {
      const d = document.createElement("div");
      d.className = "opp-dot" + (i === currentIndex ? " active" : "");
      d.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(d);
      dots.push(d);
    }
  }
  function updateDots() {
    dots.forEach((d, i) => d.classList.toggle("active", i === currentIndex));
  }
  function getSlideWidth() {
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    return slides[0].getBoundingClientRect().width + gap;
  }
  function goTo(idx) {
    currentIndex = Math.max(0, Math.min(idx, maxIndex()));
    track.style.transform =
      "translateX(-" + currentIndex * getSlideWidth() + "px)";
    updateDots();
  }
  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => {
      if (!isPaused) goTo(currentIndex >= maxIndex() ? 0 : currentIndex + 1);
    }, 3000);
  }
  outer.addEventListener("mouseenter", () => {
    isPaused = true;
  });
  outer.addEventListener("mouseleave", () => {
    isPaused = false;
  });
  let dragStart = 0,
    dragDelta = 0,
    dragging = false;
  track.addEventListener("mousedown", (e) => {
    dragging = true;
    dragStart = e.clientX;
    dragDelta = 0;
    track.classList.add("dragging");
    isPaused = true;
  });
  window.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    dragDelta = e.clientX - dragStart;
    track.style.transform =
      "translateX(" + (-currentIndex * getSlideWidth() + dragDelta) + "px)";
  });
  window.addEventListener("mouseup", () => {
    if (!dragging) return;
    dragging = false;
    track.classList.remove("dragging");
    isPaused = false;
    const t = getSlideWidth() * 0.22;
    if (dragDelta < -t) goTo(currentIndex + 1);
    else if (dragDelta > t) goTo(currentIndex - 1);
    else goTo(currentIndex);
  });
  track.addEventListener(
    "touchstart",
    (e) => {
      dragStart = e.touches[0].clientX;
      dragDelta = 0;
      isPaused = true;
    },
    { passive: true },
  );
  track.addEventListener(
    "touchmove",
    (e) => {
      dragDelta = e.touches[0].clientX - dragStart;
      track.style.transform =
        "translateX(" + (-currentIndex * getSlideWidth() + dragDelta) + "px)";
    },
    { passive: true },
  );
  track.addEventListener("touchend", () => {
    isPaused = false;
    const t = getSlideWidth() * 0.22;
    if (dragDelta < -t) goTo(currentIndex + 1);
    else if (dragDelta > t) goTo(currentIndex - 1);
    else goTo(currentIndex);
  });
  window.addEventListener("resize", () => {
    buildDots();
    goTo(Math.min(currentIndex, maxIndex()));
  });
  buildDots();
  startAuto();
  goTo(0);
})();

/* ════ PARALLAX — subtle hero only ════ */
function handleParallax() {
  const sy = window.scrollY;
  const homeEl = document.getElementById("home");
  if (homeEl) {
    const inner = homeEl.querySelector(".hero");
    if (inner) inner.style.transform = `translateY(${sy * 0.18}px)`;
  }
}
window.addEventListener("scroll", handleParallax, { passive: true });

/* ════ SMOOTH SCROLL + FOOTER SUBSCRIBE ════ */
function footerSubscribe() {
  const input = document.getElementById("footerSubInput"),
    form = document.getElementById("footerSubForm"),
    success = document.getElementById("footerSubSuccess");
  const email = input.value.trim(),
    valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!valid) {
    form.style.borderColor = "rgba(255,60,60,.65)";
    form.style.boxShadow = "0 0 10px rgba(255,60,60,.25)";
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

function navTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ════ BIDIRECTIONAL SECTION SCROLL ANIMATIONS ════
         Watches every <section> inside a non-home section-panel.
         Entering viewport  → .sec-visible  (slides up + fades in)
         Exiting above vp   → .sec-exit-above (slides up + fades out)
         Exiting below vp   → .sec-exit-below (slides down + fades out — mirrors entry)
      ════ */
(function () {
  var panels = document.querySelectorAll(".section-panel:not(#home) > section");

  // Stamp initial paint state without triggering transitions
  panels.forEach(function (sec) {
    var rect = sec.getBoundingClientRect();
    if (rect.bottom < 0) {
      // Above viewport on load (rare edge case)
      sec.classList.add("sec-exit-above");
    } else if (rect.top > window.innerHeight) {
      // Below viewport on load — default hidden state (already set by CSS)
      sec.classList.add("sec-exit-below");
    } else {
      // In viewport on load
      sec.classList.add("sec-visible");
    }
  });

  var secObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        var el = entry.target;
        if (entry.isIntersecting) {
          // Entering viewport — animate in from whichever edge it came from
          el.classList.add("sec-visible");
          el.classList.remove("sec-exit-above", "sec-exit-below");
        } else {
          el.classList.remove("sec-visible");
          var rect = entry.boundingClientRect;
          if (rect.top > 0) {
            // Section is now below viewport → user scrolled UP past it
            // Mirror entry: slide back down (same origin as initial entry)
            el.classList.add("sec-exit-below");
            el.classList.remove("sec-exit-above");
          } else {
            // Section is now above viewport → user scrolled DOWN past it
            el.classList.add("sec-exit-above");
            el.classList.remove("sec-exit-below");
          }
        }
      });
    },
    // Fire when ~12% of the section crosses the viewport edge
    { threshold: 0.12 },
  );

  panels.forEach(function (sec) {
    secObserver.observe(sec);
  });
})();
