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


  // client logos: continuous right-to-left marquee (mirrors the original WordPress carousels)
  document.querySelectorAll('.logo-grid').forEach(function(grid){
    var cards = Array.prototype.slice.call(grid.children);
    var track = document.createElement('div');
    track.className = 'logo-track';
    cards.forEach(function(c){ track.appendChild(c); });
    // duplicate the set once for a seamless loop
    cards.forEach(function(c){ track.appendChild(c.cloneNode(true)); });
    var wrap = document.createElement('div');
    wrap.className = 'logo-marquee';
    grid.parentNode.insertBefore(wrap, grid);
    wrap.appendChild(track);
    grid.remove();
    // re-observe reveal state so cloned cards show immediately
    wrap.querySelectorAll('.logo-card').forEach(function(c){ c.classList.add('in'); });
  });


  // client feedback: auto-advancing right-to-left carousel on desktop (mirrors the original site's Client FEEDBACK slider)
  var bubblesWrap = document.querySelector('.bubbles');
  if (bubblesWrap && window.matchMedia('(min-width:901px)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var bubbles = Array.prototype.slice.call(bubblesWrap.querySelectorAll('.bubble'));
    var dots = document.createElement('div');
    dots.className = 'bubble-dots';
    bubbles.forEach(function(_, i){
      var d = document.createElement('button');
      d.type = 'button';
      d.setAttribute('aria-label', 'Feedback ' + (i + 1));
      d.addEventListener('click', function(){ go(i); restart(); });
      dots.appendChild(d);
    });
    bubblesWrap.appendChild(dots);
    var idx = 0, timer = null;
    function show(i, dir){
      bubbles.forEach(function(b, j){
        b.classList.remove('active', 'leaving');
        if (j === i) b.classList.add('active');
        else if (dir === 'back' && j === (i + 1) % bubbles.length) b.classList.add('leaving');
      });
      Array.prototype.forEach.call(dots.children, function(d, j){ d.classList.toggle('on', j === i); });
    }
    function go(i){ var moved = i !== idx; idx = i; show(idx, 'fwd'); if (moved) restart(); }
    function next(){ var prev = idx; idx = (idx + 1) % bubbles.length; bubbles[prev].classList.add('leaving'); bubbles[prev].classList.remove('active'); show(idx, 'fwd'); }
    function restart(){ clearInterval(timer); timer = setInterval(next, 6000); }
    bubblesWrap.addEventListener('mouseenter', function(){ clearInterval(timer); });
    bubblesWrap.addEventListener('mouseleave', restart);
    show(0); restart();
  }

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
  setTimeout(function(){ reveal.forEach(function(el){ el.classList.add('in'); }); }, 1400);
});
