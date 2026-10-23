/* Header state */

const header = document.getElementById("siteHeader");

function onScroll() {
  header.classList.toggle("is-scrolled", window.scrollY > 28);
}

onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

/* Mobile menu */

const menuToggle = document.getElementById("menuToggle");

function setMenu(open) {
  document.body.classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
}

menuToggle.addEventListener("click", () => {
  setMenu(!document.body.classList.contains("menu-open"));
});

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 960) setMenu(false);
});

/* Active nav link */

const navLinks = Array.from(document.querySelectorAll(".nav a[data-nav]"));

if ("IntersectionObserver" in window) {
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.dataset.nav === entry.target.id);
      });
    });
  }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });

  ["portfolio", "product", "notice", "reservation"].forEach((id) => {
    const section = document.getElementById(id);
    if (section) spy.observe(section);
  });
}

/* Reveal on scroll */

const revealElements = document.querySelectorAll(".reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("in"));
}

/* Portfolio filtering */

const grid = document.getElementById("portfolioGrid");
const cards = Array.from(grid.querySelectorAll(".p-card"));
const filterButtons = Array.from(document.querySelectorAll(".filter"));

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));

    const filter = button.dataset.filter;
    let visibleCount = 0;

    cards.forEach((card) => {
      const show = filter === "all" || card.dataset.cat === filter;
      card.classList.toggle("is-hidden", !show);
      if (show) visibleCount += 1;
    });

    grid.classList.remove("layout-1", "layout-2", "layout-3");
    if (filter !== "all" && visibleCount > 0 && visibleCount <= 3) {
      grid.classList.add(`layout-${visibleCount}`);
    }
  });
});

/* Modal */

const modal = document.getElementById("modal");
const modalMedia = document.getElementById("modalMedia");
const modalTitle = document.getElementById("modalTitle");
const modalMeta = document.getElementById("modalMeta");
const modalDesc = document.getElementById("modalDesc");
const modalCta = document.getElementById("modalCta");
const modalClose = document.getElementById("modalClose");
let lastFocused = null;

function openModalShell() {
  lastFocused = document.activeElement;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  modalClose.focus();
}

function closeModal(restoreFocus = true) {
  if (!modal.classList.contains("open")) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  if (restoreFocus && lastFocused) lastFocused.focus();
}

function openWorkModal(card) {
  const media = card.querySelector(".p-media");
  modalMedia.className = "modal-media";
  modalMedia.innerHTML = "";
  modalMedia.appendChild(media.cloneNode(true));

  modalTitle.innerHTML = card.querySelector("h3").innerHTML;
  modalMeta.textContent = card.querySelector(".p-meta").textContent.trim();
  modalDesc.textContent = card.dataset.desc || "";
  modalCta.style.display = "";
  openModalShell();
}

function openVideoModal() {
  modalMedia.className = "modal-media is-video";
  modalMedia.removeAttribute("style");
  modalMedia.innerHTML = '<span class="modal-play">PLAY</span>';
  modalTitle.textContent = "OLLA MOVIE SAMPLE FILM";
  modalMeta.textContent = "SAMPLE FILM · 2026";
  modalDesc.textContent = "샘플 영상은 준비 중입니다. 실제 사이트에서는 결혼스냅 하이라이트 영상이 이곳에 연결됩니다.";
  modalCta.style.display = "none";
  openModalShell();
}

cards.forEach((card) => {
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", card.querySelector("h3").textContent.trim());
  card.addEventListener("click", () => openWorkModal(card));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openWorkModal(card);
    }
  });
});

const videoCard = document.getElementById("videoCard");

videoCard.addEventListener("click", openVideoModal);
videoCard.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openVideoModal();
  }
});

modalClose.addEventListener("click", () => closeModal());
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});
modalCta.addEventListener("click", () => closeModal(false));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
    setMenu(false);
  }
});
