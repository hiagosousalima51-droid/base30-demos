/* =========================================================
   DADOS DO NEGÓCIO
   ========================================================= */

const NEGOCIO = {
  nomeExibicao: "Amora Doceria",

  whatsapp: "5511999999999",

  mensagemPadrao:
    "Olá! Vi o site da Amora Doceria e queria fazer uma encomenda.",

  instagram: "https://instagram.com/amoradoceria",

  instagramLabel: "@amoradoceria",

  endereco:
    "Jardim das Flores, Jundiaí — SP (retirada e entrega local)",

  horario: "Ter. a sáb., 9h às 18h",
};


/* =========================================================
   IMAGENS
   ========================================================= */

const IMAGENS = {

  hero:
    "https://images.unsplash.com/photo-1587668178277-295251f900ce?q=80&w=1200&auto=format&fit=crop",

  sobre:
    "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1000&auto=format&fit=crop",

  /*
   * IMAGEM DO CARRO-CHEFE
   *
   * Troque esta URL pela foto real do balde de pipoca
   * quando você tiver a imagem da influenciadora.
   */
  "carro-chefe":
    "https://i.pinimg.com/1200x/67/d5/41/67d54175aa3182f65e80e6424265f13d.jpg",
};


/* =========================================================
   CARDÁPIO
   ========================================================= */

const DOCES = [

  {
    nome: "Bolo de Ninho com Nutella",

    desc:
      "Massa fofa, recheio de leite ninho e cobertura de nutella.",

    preco:
      "a partir de R$ 95",

    img:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop",
  },

  {
    nome: "Brigadeiros Gourmet",

    desc:
      "Brigadeiros cremosos e deliciosos, feitos com carinho para deixar qualquer momento mais doce.",

    preco:
      "R$ 120",

    img:
      "https://i.pinimg.com/736x/e9/6c/92/e96c9285260377d39dfcd08cada49645.jpg",
  },

  {
    nome: "Torta de Limão Siciliano",

    desc:
      "Base amanteigada, creme azedinho na medida certa.",

    preco:
      "R$ 85",

    img:
      "https://i.pinimg.com/736x/86/18/6b/86186bdccfc48710eb053f08ed9db451.jpg",
  },

  {
    nome: "Torta de Pistache",

    desc:
      "Creme de pistache importado sobre massa crocante.",

    preco:
      "R$ 110",

    img:
      "https://i.pinimg.com/736x/2d/17/23/2d17235cb48efb78cd360bd2c24b06cc.jpg",
  },

  {
    nome: "Bolo Red Velvet",

    desc:
      "Recheio de cream cheese, cor e sabor clássicos.",

    preco:
      "a partir de R$ 100",

    img:
      "https://i.pinimg.com/736x/80/75/29/80752952afded3b566677838ba839337.jpg",
  },

  {
    nome: "Doce de Leite Artesanal (pote)",

    desc:
      "Cozido lento, textura cremosa, sem conservantes.",

    preco:
      "R$ 38",

    img:
      "https://i.pinimg.com/736x/f5/39/a1/f539a105db869f1faa3a81d8b9a9815a.jpg",
  },

];


/* =========================================================
   LINK DO WHATSAPP
   ========================================================= */

function montarLinkWhatsapp() {

  const texto = encodeURIComponent(
    NEGOCIO.mensagemPadrao
  );

  return `https://wa.me/${NEGOCIO.whatsapp}?text=${texto}`;
}


/* =========================================================
   APLICA DADOS DO NEGÓCIO
   ========================================================= */

function aplicarDadosDoNegocio() {

  document
    .querySelectorAll("[data-whatsapp-link]")
    .forEach((el) => {

      el.href = montarLinkWhatsapp();

      el.target = "_blank";

      el.rel = "noopener";

    });


  const endereco =
    document.querySelector(
      '[data-info="endereco"]'
    );

  if (endereco) {
    endereco.textContent =
      NEGOCIO.endereco;
  }


  const horario =
    document.querySelector(
      '[data-info="horario"]'
    );

  if (horario) {
    horario.textContent =
      NEGOCIO.horario;
  }


  const insta =
    document.querySelector(
      '[data-info-link="instagram"]'
    );

  if (insta) {

    insta.href =
      NEGOCIO.instagram;

    insta.textContent =
      NEGOCIO.instagramLabel;

    insta.target = "_blank";

    insta.rel = "noopener";
  }


  document
    .querySelectorAll("[data-img]")
    .forEach((img) => {

      const chave =
        img.getAttribute("data-img");

      if (IMAGENS[chave]) {
        img.src =
          IMAGENS[chave];
      }

    });
}


/* =========================================================
   MONTA CARDS DOS DOCES
   ========================================================= */

function montarCardsDeDoces() {

  const grid =
    document.querySelector(
      "[data-doces-grid]"
    );

  if (!grid) return;


  grid.innerHTML = DOCES.map(
    (doce) => `

      <article
        class="doce-card"
        data-reveal
      >

        <div class="doce-card-media">

          <img
            src="${doce.img}"
            alt="${doce.nome}"
            loading="lazy"
          >

        </div>

        <div class="doce-card-body">

          <h3>
            ${doce.nome}
          </h3>

          <p>
            ${doce.desc}
          </p>

          <span class="doce-price">
            ${doce.preco}
          </span>

        </div>

      </article>

    `
  ).join("");
}


/* =========================================================
   MENU MOBILE
   ========================================================= */

function configurarMenuMobile() {

  const toggle =
    document.querySelector(
      ".nav-toggle"
    );

  const nav =
    document.querySelector(
      ".nav"
    );

  if (!toggle || !nav) return;


  toggle.addEventListener(
    "click",
    () => {

      const aberto =
        nav.classList.toggle(
          "nav-open"
        );

      toggle.setAttribute(
        "aria-expanded",
        String(aberto)
      );

    }
  );


  nav.querySelectorAll("a")
    .forEach((link) => {

      link.addEventListener(
        "click",
        () => {

          nav.classList.remove(
            "nav-open"
          );

        }
      );

    });
}


/* =========================================================
   REVEAL NO SCROLL
   ========================================================= */

function configurarReveal() {

  const alvos =
    document.querySelectorAll(
      "[data-reveal]"
    );

  const prefersReduced =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (prefersReduced) {

    alvos.forEach((el) =>
      el.classList.add(
        "is-visible"
      )
    );

    return;
  }


  const observer =
    new IntersectionObserver(
      (entradas) => {

        entradas.forEach(
          (entrada) => {

            if (
              entrada.isIntersecting
            ) {

              entrada.target.classList.add(
                "is-visible"
              );

              observer.unobserve(
                entrada.target
              );

            }

          }
        );

      },
      {
        threshold: 0.15,
      }
    );


  alvos.forEach((el) =>
    observer.observe(el)
  );
}


/* =========================================================
   MARCA SEÇÕES PARA REVEAL
   ========================================================= */

function marcarSecoesParaReveal() {

  document
    .querySelectorAll(
      ".sobre-text, .sobre-media, .doces-header, .carro-chefe-inner"
    )
    .forEach((el) => {

      el.setAttribute(
        "data-reveal",
        ""
      );

    });
}


/* =========================================================
   STAGGER DOS CARDS
   ========================================================= */

function aplicarStaggerNosCards() {

  const cards =
    document.querySelectorAll(
      ".doce-card"
    );

  const prefersReduced =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (
    prefersReduced ||
    typeof gsap === "undefined"
  ) {
    return;
  }


  gsap.set(cards, {
    opacity: 0,
    y: 30,
  });


  ScrollTrigger.batch(
    cards,
    {

      start: "top 88%",

      once: true,

      onEnter: (batch) => {

        gsap.to(
          batch,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power2.out",
          }
        );

      },

    }
  );
}


/* =========================================================
   MARQUEE CONTÍNUO
   ========================================================= */

function configurarMarquee() {

  const track =
    document.querySelector(
      ".marquee-track"
    );

  const prefersReduced =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (
    !track ||
    prefersReduced ||
    typeof gsap === "undefined"
  ) {
    return;
  }


  gsap.to(
    track,
    {

      xPercent: -50,

      duration: 18,

      ease: "linear",

      repeat: -1,

    }
  );
}


/* =========================================================
   BOTÃO MAGNÉTICO
   ========================================================= */

function configurarBotaoMagnetico() {

  const prefersReduced =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  const alvo =
    document.querySelector(
      ".hero-actions .btn-primary"
    );


  if (
    !alvo ||
    prefersReduced ||
    typeof gsap === "undefined"
  ) {
    return;
  }


  if (
    window.matchMedia(
      "(hover: none)"
    ).matches
  ) {
    return;
  }


  alvo.addEventListener(
    "mousemove",
    (e) => {

      const r =
        alvo.getBoundingClientRect();

      const x =
        e.clientX -
        r.left -
        r.width / 2;

      const y =
        e.clientY -
        r.top -
        r.height / 2;


      gsap.to(
        alvo,
        {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: "power2.out",
        }
      );

    }
  );


  alvo.addEventListener(
    "mouseleave",
    () => {

      gsap.to(
        alvo,
        {
          x: 0,
          y: 0,
          duration: 0.4,
          ease: "elastic.out(1, 0.4)",
        }
      );

    }
  );
}


/* =========================================================
   INIT
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    aplicarDadosDoNegocio();

    montarCardsDeDoces();

    configurarMenuMobile();

    marcarSecoesParaReveal();

    configurarReveal();


    if (
      typeof gsap !== "undefined"
    ) {

      gsap.registerPlugin(
        ScrollTrigger
      );

      aplicarStaggerNosCards();

      configurarMarquee();

      configurarBotaoMagnetico();

    }

  }
);