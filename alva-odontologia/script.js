(function(){
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* header shadow on scroll */
  var header = document.getElementById('site-header');
  function onScroll(){
    if(window.scrollY > 12){ header.classList.add('scrolled'); }
    else{ header.classList.remove('scrolled'); }
  }
  document.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  /* mobile menu */
  var hamburger = document.getElementById('hamburger');
  var panel = document.getElementById('mobile-panel');
  hamburger.addEventListener('click', function(){
    var open = panel.classList.toggle('open');
    hamburger.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', open ? 'true':'false');
  });
  panel.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      panel.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded','false');
    });
  });

  /* scroll reveal */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if(reduceMotion || !('IntersectionObserver' in window)){
    revealEls.forEach(function(el){ el.classList.add('in-view'); });
  } else {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:.15, rootMargin:'0px 0px -60px 0px'});
    revealEls.forEach(function(el){ io.observe(el); });
  }

  /* "o que você deseja mudar" -> scroll to treatment + highlight */
  document.querySelectorAll('.desire-item').forEach(function(item){
    item.addEventListener('click', function(){
      var id = item.getAttribute('data-target');
      var target = document.getElementById(id);
      if(!target) return;
      target.scrollIntoView({behavior: reduceMotion ? 'auto' : 'smooth', block:'center'});
      target.classList.add('highlight');
      setTimeout(function(){ target.classList.remove('highlight'); }, 1800);
    });
    item.setAttribute('tabindex','0');
    item.addEventListener('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); item.click(); }
    });
  });

  /* treatment card "conhecer tratamento" toggle */
  document.querySelectorAll('.treat-toggle').forEach(function(btn){
    btn.addEventListener('click', function(){
      var card = btn.closest('.treat-card');
      var open = card.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true':'false');
      btn.innerHTML = open
        ? 'Fechar <svg style="transform:rotate(90deg)"><use href="#ic-arrow-r"/></svg>'
        : 'Conhecer tratamento <svg><use href="#ic-arrow-r"/></svg>';
    });
  });

  /* faq accordion */
  document.querySelectorAll('.faq-q').forEach(function(btn){
    btn.addEventListener('click', function(){
      var item = btn.closest('.faq-item');
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function(o){ o.classList.remove('open'); });
      if(!isOpen){ item.classList.add('open'); }
    });
  });

  /* smooth anchor offset (fixed header) */
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var id = a.getAttribute('href').slice(1);
      var el = document.getElementById(id);
      if(!el) return;
      e.preventDefault();
      var top = el.getBoundingClientRect().top + window.scrollY - 86;
      window.scrollTo({top: top, behavior: reduceMotion ? 'auto' : 'smooth'});
    });
  });
})();
