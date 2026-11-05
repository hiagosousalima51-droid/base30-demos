(function () {
  "use strict";

  /* =====================================================
     CONFIG — troque pelo número real da barbearia
     Formato: código do país + DDD + número, só dígitos
     ===================================================== */
  const WHATSAPP_NUMBER = "5511999999999";

  const DEFAULT_MESSAGE =
    "Olá! Gostaria de agendar um horário na Barbearia Black. Gostaria de saber os horários disponíveis.";

  function serviceMessage(service) {
    return `Olá! Gostaria de agendar um ${service} na Barbearia Black. Quais horários estão disponíveis?`;
  }

  /* =====================================================
     Header — muda de estilo ao rolar
     ===================================================== */
  const header = document.getElementById("siteHeader");
  function onScroll() {
    if (window.scrollY > 40) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* =====================================================
     Menu hamburger (mobile)
     ===================================================== */
  const hamburger = document.getElementById("hamburger");
  const mainNav = document.getElementById("mainNav");

  function closeMenu() {
    hamburger.classList.remove("open");
    mainNav.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  function toggleMenu() {
    const isOpen = mainNav.classList.toggle("open");
    hamburger.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  hamburger.addEventListener("click", toggleMenu);
  mainNav.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  /* =====================================================
     Reveal on scroll (IntersectionObserver)
     ===================================================== */
  const revealTargets = document.querySelectorAll(".reveal, .section-head");

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealTargets.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealTargets.forEach(function (el) {
      el.classList.add("in-view");
    });
  }

  /* =====================================================
     Links do WhatsApp — abre com mensagem pré-preenchida
     ===================================================== */
  document.querySelectorAll(".whatsapp-btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const service = btn.getAttribute("data-service");
      const message = service ? serviceMessage(service) : DEFAULT_MESSAGE;
      const url =
        "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
      window.open(url, "_blank", "noopener");
    });
  });
})();
