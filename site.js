// Influence Consulting — interactions
document.addEventListener('DOMContentLoaded', function(){
  // count-up stats
  var counters = document.querySelectorAll('.count');
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(!e.isIntersecting) return;
      var el = e.target; io.unobserve(el);
      var to = parseInt(el.dataset.to,10)||0;
      var suffix = el.dataset.suffix||'';
      var delim = el.dataset.delimiter||'';
      var t0 = null, dur = 2000;
      function step(ts){
        if(!t0) t0 = ts;
        var p = Math.min((ts-t0)/dur, 1);
        var eased = 1 - Math.pow(1-p, 3);
        var val = Math.round(to * eased);
        el.textContent = (delim ? val.toLocaleString('en-NZ') : val) + suffix;
        if(p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }, {threshold: 0.4});
  counters.forEach(function(c){ io.observe(c); });

  // speech bubbles reveal (staggered, like the original build-in animation)
  var bubbles = document.querySelectorAll('.bubble');
  var bio = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('show'); bio.unobserve(e.target); }
    });
  }, {threshold: 0.2});
  bubbles.forEach(function(b,i){ b.style.transitionDelay = (i*0.35)+'s'; bio.observe(b); });

  // modals
  document.querySelectorAll('[data-modal]').forEach(function(card){
    card.addEventListener('click', function(){
      var m = document.getElementById(card.dataset.modal);
      if(m){ m.classList.add('open'); document.body.style.overflow='hidden'; }
    });
  });
  document.querySelectorAll('.modal').forEach(function(m){
    m.addEventListener('click', function(ev){
      if(ev.target === m || ev.target.classList.contains('modal-close')){
        m.classList.remove('open'); document.body.style.overflow='';
      }
    });
  });
  document.addEventListener('keydown', function(ev){
    if(ev.key === 'Escape'){
      document.querySelectorAll('.modal.open').forEach(function(m){ m.classList.remove('open'); document.body.style.overflow=''; });
    }
  });

  // mobile nav
  var toggle=document.querySelector('.nav-toggle');
  var header=document.querySelector('.site-header');
  if(toggle){
    toggle.addEventListener('click', function(){
      var open=header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open?'true':'false');
    });
    document.querySelectorAll('nav a').forEach(function(a){
      a.addEventListener('click', function(){ header.classList.remove('nav-open'); toggle.setAttribute('aria-expanded','false'); });
    });
  }

  // subtle scroll reveal for cards
  var reveal = document.querySelectorAll('.card, .person, .story, .logo-card');
  var rio = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('in'); rio.unobserve(e.target); }
    });
  }, {threshold: 0.12});
  reveal.forEach(function(el){ rio.observe(el); });
});
