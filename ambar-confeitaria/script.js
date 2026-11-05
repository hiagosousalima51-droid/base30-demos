document.getElementById('year').textContent = new Date().getFullYear();

// Header shrink on scroll
const header = document.getElementById('siteHeader');
const onScroll = () => { header.classList.toggle('scrolled', window.scrollY > 30); };
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile navigation
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const mobileNav = window.matchMedia('(max-width: 900px)');
function setMenuOpen(open, returnFocus = false) {
  const shouldOpen = Boolean(open && mobileNav.matches);
  navLinks.classList.toggle('open', shouldOpen);
  navToggle.classList.toggle('active', shouldOpen);
  document.body.classList.toggle('menu-open', shouldOpen);
  navToggle.setAttribute('aria-expanded', String(shouldOpen));
  navToggle.setAttribute('aria-label', shouldOpen ? 'Fechar menu' : 'Abrir menu');
  navLinks.setAttribute('aria-hidden', String(!shouldOpen && mobileNav.matches));
  if (shouldOpen) navLinks.querySelector('a')?.focus({ preventScroll: true });
  else if (returnFocus && mobileNav.matches) navToggle.focus({ preventScroll: true });
}
setMenuOpen(false);
navToggle.addEventListener('click', () => setMenuOpen(!navLinks.classList.contains('open')));
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenuOpen(false, true)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navLinks.classList.contains('open')) setMenuOpen(false, true);
});
mobileNav.addEventListener('change', event => {
  if (!event.matches) {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
    document.body.classList.remove('menu-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir menu');
    navLinks.setAttribute('aria-hidden', 'false');
  } else {
    navLinks.setAttribute('aria-hidden', 'true');
  }
});

// Reveal on scroll
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReduced) {
  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => el.classList.add('is-visible'));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => io.observe(el));
}

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q').addEventListener('click', () => {
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// Flavor / size picker
const flavorRow = document.getElementById('flavorRow');
const sizeRow = document.getElementById('sizeRow');
const previewName = document.getElementById('previewName');
const previewPrice = document.getElementById('previewPrice');
const customCta = document.getElementById('customCta');
const layer1 = document.getElementById('layer1');
const layer2 = document.getElementById('layer2');

let state = { flavor: 'Ninho com Nutella', color: '#C08A3E', size: 'P, 10 fatias', price: 120 };

function updatePreview(){
  previewName.textContent = 'Bolo ' + state.flavor + ' (' + state.size.split(', ')[0] + ')';
  previewPrice.textContent = 'R$ ' + state.price;
  layer1.setAttribute('fill', state.color);
  layer2.setAttribute('fill', state.color);
  const msg = encodeURIComponent('Olá! Quero encomendar um bolo ' + state.flavor + ', tamanho ' + state.size + '.');
  customCta.href = 'https://wa.me/5511987654321?text=' + msg;
}

flavorRow.querySelectorAll('.pill').forEach(btn => {
  btn.addEventListener('click', () => {
    flavorRow.querySelectorAll('.pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.flavor = btn.dataset.flavor;
    state.color = btn.dataset.color;
    updatePreview();
  });
});
sizeRow.querySelectorAll('.pill').forEach(btn => {
  btn.addEventListener('click', () => {
    sizeRow.querySelectorAll('.pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.size = btn.dataset.size;
    state.price = btn.dataset.price;
    updatePreview();
  });
});
updatePreview();
