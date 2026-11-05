/* =========================================================================
   TEZ — Estúdio de Estética
   JavaScript mínimo, só para o que HTML/CSS puros não resolvem:
   1) abrir/fechar o menu no mobile
   2) o header ficar sólido depois que a página rola
   3) revelar elementos suavemente conforme entram na tela
========================================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* --- 1) Menu mobile ------------------------------------------------- */
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('nav');

  menuBtn.addEventListener('click', () => {
    const aberto = nav.classList.toggle('is-open');
    menuBtn.setAttribute('aria-expanded', String(aberto));
  });

  // fecha o menu ao clicar em um link (evita ficar aberto após navegar)
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  /* --- 2) Header sólido ao rolar --------------------------------------- */
  const header = document.getElementById('header');

  const atualizarHeader = () => {
    header.classList.toggle('header--solido', window.scrollY > 40);
  };
  atualizarHeader();
  window.addEventListener('scroll', atualizarHeader, { passive: true });

  /* --- 3) Revelar elementos ao entrar na tela --------------------------- */
  const seletoresRevelaveis = [
    '.hero__eyebrow',
    '.hero__text',
    '.hero__visual',
    '.section-head',
    '.tratamento',
    '.experiencia__conteudo',
    '.sobre__visual',
    '.sobre__texto',
    '.cta-final__conteudo',
    '.contato__bloco',
    '.footer'
  ].join(', ');
  document.querySelectorAll(seletoresRevelaveis).forEach((el) => el.setAttribute('data-reveal', ''));
  const elementosRevelaveis = document.querySelectorAll('[data-reveal]');
  const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reduzirMovimento && 'IntersectionObserver' in window && elementosRevelaveis.length) {
    document.documentElement.classList.add('reveal-ready');
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add('is-visible');
            observador.unobserve(entrada.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    elementosRevelaveis.forEach((el) => observador.observe(el));
  } else {
    // navegadores sem suporte ou com movimento reduzido mostram tudo direto
    elementosRevelaveis.forEach((el) => el.classList.add('is-visible'));
  }

});
