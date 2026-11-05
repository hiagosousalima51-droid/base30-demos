/* =========================================================
   ATELIÊ AURORA — script.js
   Tudo que você provavelmente vai querer editar está aqui em cima,
   no objeto CONFIG e no array GALLERY. O resto do arquivo só lê
   esses dados e cuida da interação (menu, carrossel, lightbox etc).
   ========================================================= */

const CONFIG = {
  // Número do WhatsApp em formato internacional, só números (DDI+DDD+número).
  // Exemplo real: "5511987654321"
  whatsappNumber: "5511999999999",

  // Usuário do Instagram (sem o @)
  instagram: "atelieaurora",

  // Link do Google Maps (pode ser o link de compartilhamento do próprio Google Maps)
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Rua+das+Palmeiras+245+São+Paulo+SP",
};

// Imagens da galeria — troque "url" pelas fotos reais do salão.
// "alt" é o texto alternativo (acessibilidade e SEO): descreva a foto de forma objetiva.
const GALLERY = [
  {
    url: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1",
    alt: "Cliente sendo atendida em lavatório de salão de beleza"
  },
  {
    url: "https://images.unsplash.com/photo-1457972729786-0411a3b2b626",
    alt: "Manicure sendo feita em close, esmalte vermelho"
  },
  {
    url: "https://images.unsplash.com/photo-1633681117690-262b94a01378",
    alt: "Interior moderno do salão de beleza"
  },
  {
    url: "https://images.unsplash.com/photo-1596754915834-012925e846cb",
    alt: "Corte de cabelo em andamento, detalhe da tesoura"
  },
  {
    url: "https://images.unsplash.com/photo-1634480258143-ffb5e6df0029",
    alt: "Cliente em frente ao espelho durante o corte de cabelo"
  },
  {
    url: "https://images.unsplash.com/photo-1672968831840-ab691ce8f263",
    alt: "Produtos profissionais organizados na prateleira do salão"
  },
];

/* =========================================================
   A partir daqui é lógica de interação — normalmente não
   precisa mexer, só se quiser ajustar o comportamento.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  setupWhatsappLinks();
  setupMapsLinks();
  setupInstagramLinks();
  setupYear();
  setupHeaderScroll();
  setupMobileMenu();
  setupSmoothAnchorClose();
  setupScrollReveal();
  setupGallery();
  setupLightbox();
  setupTestimonials();
});

/* ---- WhatsApp: monta o link a partir do CONFIG em todos os botões marcados ---- */
function setupWhatsappLinks() {
  const links = document.querySelectorAll("[data-whatsapp-link]");
  links.forEach((link) => {
    const message = link.getAttribute("data-wa-message") || "Olá! Vim pelo site e gostaria de agendar um horário.";
    const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    link.setAttribute("href", url);
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener");
  });
}

function setupMapsLinks() {
  document.querySelectorAll("[data-maps-link]").forEach((link) => {
    link.setAttribute("href", CONFIG.googleMapsUrl);
  });
}

function setupInstagramLinks() {
  document.querySelectorAll("[data-instagram-link]").forEach((link) => {
    link.setAttribute("href", `https://instagram.com/${CONFIG.instagram}`);
  });
}

/* ---- Ano automático no rodapé ---- */
function setupYear() {
  const el = document.getElementById("ano-atual");
  if (el) el.textContent = new Date().getFullYear();
}

/* ---- Header muda de aparência ao rolar a página ---- */
function setupHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const toggle = () => header.classList.toggle("scrolled", window.scrollY > 40);
  toggle();
  window.addEventListener("scroll", toggle, { passive: true });
}

/* ---- Menu mobile (hambúrguer) ---- */
function setupMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("main-nav");
  if (!toggle || !nav) return;

  const closeMenu = () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
    document.body.style.overflow = "";
  };
  const openMenu = () => {
    nav.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Fechar menu");
    document.body.style.overflow = "hidden";
  };

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.contains("open");
    isOpen ? closeMenu() : openMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // fecha ao clicar num link do menu
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
}

/* Garante que o menu mobile fecha se a pessoa clicar em um link do menu de navegação
   e que o scroll do body volta ao normal (já coberto acima, mantido por clareza). */
function setupSmoothAnchorClose() {}

/* ---- Animação sutil de entrada ao rolar a página ---- */
function setupScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    items.forEach((el) => el.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((el) => observer.observe(el));
}

/* ---- Monta a galeria a partir do array GALLERY ---- */
function setupGallery() {
  const grid = document.getElementById("gallery-grid");
  if (!grid) return;

  grid.innerHTML = GALLERY.map((item, index) => `
    <button class="gallery-item reveal" type="button" data-index="${index}" aria-label="Ampliar foto: ${escapeHtml(item.alt)}">
      <img
        src="${item.url}?auto=format&fit=crop&w=800&q=70"
        alt="${escapeHtml(item.alt)}"
        loading="lazy"
        width="800" height="800">
    </button>
  `).join("");

  // reobserva os novos itens .reveal criados dinamicamente
  setupScrollReveal();
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* ---- Lightbox da galeria (abrir imagem ampliada, navegar, fechar) ---- */
function setupLightbox() {
  const lightbox = document.getElementById("lightbox");
  const imgEl = document.getElementById("lightbox-img");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");
  const grid = document.getElementById("gallery-grid");
  if (!lightbox || !grid) return;

  let currentIndex = 0;
  let lastFocused = null;

  const show = (index) => {
    currentIndex = (index + GALLERY.length) % GALLERY.length;
    const item = GALLERY[currentIndex];
    imgEl.src = `${item.url}?auto=format&fit=crop&w=1600&q=80`;
    imgEl.alt = item.alt;
  };

  const open = (index) => {
    lastFocused = document.activeElement;
    show(index);
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  };

  const close = () => {
    lightbox.hidden = true;
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  };

  grid.addEventListener("click", (e) => {
    const btn = e.target.closest(".gallery-item");
    if (!btn) return;
    open(Number(btn.dataset.index));
  });

  closeBtn.addEventListener("click", close);
  prevBtn.addEventListener("click", () => show(currentIndex - 1));
  nextBtn.addEventListener("click", () => show(currentIndex + 1));

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") show(currentIndex + 1);
    if (e.key === "ArrowLeft") show(currentIndex - 1);
  });
}

/* ---- Carrossel de depoimentos: pontinhos + rolagem automática leve ---- */
function setupTestimonials() {
  const track = document.getElementById("testimonials-track");
  const dotsWrap = document.getElementById("testimonials-dots");
  if (!track || !dotsWrap) return;

  const slides = Array.from(track.children);
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Quantos "slides" cabem por página, de acordo com o layout (1 no mobile, 2 no desktop)
  const getPerPage = () => (window.innerWidth >= 720 ? 2 : 1);
  const getPageCount = () => Math.ceil(slides.length / getPerPage());

  dotsWrap.innerHTML = "";
  const buildDots = () => {
    dotsWrap.innerHTML = "";
    const pages = getPageCount();
    for (let i = 0; i < pages; i++) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", `Ir para o grupo de depoimentos ${i + 1}`);
      dot.addEventListener("click", () => scrollToPage(i));
      dotsWrap.appendChild(dot);
    }
    updateActiveDot();
  };

  const scrollToPage = (page) => {
    const perPage = getPerPage();
    const target = slides[page * perPage];
    if (target) track.scrollTo({ left: target.offsetLeft, behavior: prefersReduced ? "auto" : "smooth" });
  };

  const updateActiveDot = () => {
    const perPage = getPerPage();
    const currentPage = Math.round(track.scrollLeft / track.clientWidth);
    Array.from(dotsWrap.children).forEach((dot, i) => {
      dot.setAttribute("aria-current", i === currentPage ? "true" : "false");
    });
  };

  track.addEventListener("scroll", debounce(updateActiveDot, 100), { passive: true });
  window.addEventListener("resize", debounce(buildDots, 200));

  buildDots();

  // Autoplay discreto — pausa se a pessoa preferir menos movimento, ou ao interagir
  if (!prefersReduced) {
    let autoplay = setInterval(() => {
      const pages = getPageCount();
      const currentPage = Math.round(track.scrollLeft / track.clientWidth);
      const next = (currentPage + 1) % pages;
      scrollToPage(next);
    }, 6000);

    const pause = () => clearInterval(autoplay);
    ["mouseenter", "focusin", "touchstart"].forEach((evt) =>
      track.addEventListener(evt, pause, { passive: true })
    );
  }
}

function debounce(fn, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), wait);
  };
}
