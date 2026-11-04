// Influence Consulting — interactions
document.addEventListener('DOMContentLoaded', function(){

  // ── count-up stats ──────────────────────────────────────────────
  var counters = document.querySelectorAll('.count');
  var statObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(!e.isIntersecting) return;
      var el = e.target; statObserver.unobserve(el);
      var to = parseInt(el.dataset.to,10)||0;
      var suffix = el.dataset.suffix||'';
      var delim = el.dataset.delimiter||'';
      var t0 = null, dur = 2400;
      function step(ts){
        if(!t0) t0 = ts;
        var p = Math.min((ts-t0)/dur, 1);
        var eased = 1 - Math.pow(1-p, 3);
        var val = Math.round(to * eased);
        el.textContent = (delim ? val.toLocaleString('en-NZ') : val) + suffix;
        if(p >= 1) el.classList.add('counted');
        if(p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }, {threshold: 0.35});
  counters.forEach(function(c){ statObserver.observe(c); });

  // ── client logo tabbed carousel ─────────────────────────────────
  var clientPanels = document.querySelectorAll('.client-panel');
  var clientTabs = document.querySelectorAll('.client-tab');
  var clientDotsWrapper = document.querySelector('.client-dots');
  var clientAutoTimer = null;
  var clientIdx = 0;

  function showClientPanel(i){
    clientPanels.forEach(function(p, j){ p.classList.toggle('active', j === i); });
    clientTabs.forEach(function(t, j){ t.classList.toggle('active', j === i); });
    if(clientDotsWrapper){
      Array.prototype.forEach.call(clientDotsWrapper.children, function(d, j){ d.classList.toggle('on', j === i); });
    }
    clientIdx = i;
  }
  function nextClientPanel(){
    showClientPanel((clientIdx + 1) % clientPanels.length);
  }
  function restartClientTimer(){
    clearInterval(clientAutoTimer);
    if(clientPanels.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      clientAutoTimer = setInterval(nextClientPanel, 5000);
    }
  }
  if(clientPanels.length && clientTabs.length){
    clientTabs.forEach(function(tab, i){
      tab.addEventListener('click', function(){ showClientPanel(i); restartClientTimer(); });
    });
    if(clientDotsWrapper){
      Array.prototype.forEach.call(clientDotsWrapper.children, function(d, i){
        d.addEventListener('click', function(){ showClientPanel(i); restartClientTimer(); });
      });
    }
    // hover pauses auto-advance
    var clientSection = document.querySelector('.client-section');
    if(clientSection){
      clientSection.addEventListener('mouseenter', function(){ clearInterval(clientAutoTimer); });
      clientSection.addEventListener('mouseleave', restartClientTimer);
    }
    showClientPanel(0);
    restartClientTimer();
  }

  // ── programme tabs ──────────────────────────────────────────────
  var progTabs = document.querySelectorAll('.programme-tab');
  var progGrids = document.querySelectorAll('#programmes .grid-2');
  progTabs.forEach(function(tab, i){
    tab.addEventListener('click', function(){
      progTabs.forEach(function(t){ t.classList.remove('active'); });
      tab.classList.add('active');
      progGrids.forEach(function(g, j){ g.classList.toggle('active', j === i); });
    });
  });
  // Default: show first programme grid
  if(progTabs.length && progGrids.length){
    progTabs[0].classList.add('active');
    progGrids[0].classList.add('active');
  }

  // ── testimonial carousel ────────────────────────────────────────
  var bubbles = document.querySelectorAll('.bubble');
  var dotsEl = document.querySelector('.bubble-dots');
  var prevBtn = document.querySelector('.bubble-prev');
  var nextBtn = document.querySelector('.bubble-next');
  var bubbleIdx = 0;
  var bubbleTimer = null;

  function showBubble(i){
    bubbles.forEach(function(b, j){
      b.classList.remove('active', 'leaving');
      if(j === i) b.classList.add('active');
      else if(j === (i + 1) % bubbles.length || (i === bubbles.length - 1 && j === 0)){
        // the one being replaced — give it a leaving class so it can fade out opposite direction
      }
    });
    bubbleIdx = i;
    if(dotsEl){
      Array.prototype.forEach.call(dotsEl.children, function(d, j){ d.classList.toggle('on', j === i); });
    }
  }
  function nextBubble(){
    var prev = bubbleIdx;
    bubbleIdx = (bubbleIdx + 1) % bubbles.length;
    bubbles[prev].classList.remove('active');
    bubbles[prev].classList.add('leaving');
    // after the leave transition, remove the leaving class
    setTimeout((function(p){ return function(){ p.classList.remove('leaving'); }; })(bubbles[prev]), 500);
    bubbles[bubbleIdx].classList.add('active');
    if(dotsEl){
      Array.prototype.forEach.call(dotsEl.children, function(d, j){ d.classList.toggle('on', j === bubbleIdx); });
    }
  }
  function prevBubble(){
    var cur = bubbleIdx;
    bubbleIdx = (bubbleIdx - 1 + bubbles.length) % bubbles.length;
    bubbles[cur].classList.remove('active');
    bubbles[cur].classList.add('leaving');
    setTimeout((function(p){ return function(){ p.classList.remove('leaving'); }; })(bubbles[cur]), 500);
    bubbles[bubbleIdx].classList.add('active');
    if(dotsEl){
      Array.prototype.forEach.call(dotsEl.children, function(d, j){ d.classList.toggle('on', j === bubbleIdx); });
    }
  }
  function restartBubbleTimer(){
    clearInterval(bubbleTimer);
    if(bubbles.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      bubbleTimer = setInterval(nextBubble, 6000);
    }
  }
  if(bubbles.length){
    if(prevBtn) prevBtn.addEventListener('click', function(){ prevBubble(); restartBubbleTimer(); });
    if(nextBtn) nextBtn.addEventListener('click', function(){ nextBubble(); restartBubbleTimer(); });
    if(dotsEl){
      Array.prototype.forEach.call(dotsEl.children, function(d, i){
        d.addEventListener('click', function(){ showBubble(i); restartBubbleTimer(); });
      });
    }
    var bubbleWrapper = document.querySelector('.bubbles-wrapper');
    if(bubbleWrapper){
      bubbleWrapper.addEventListener('mouseenter', function(){ clearInterval(bubbleTimer); });
      bubbleWrapper.addEventListener('mouseleave', restartBubbleTimer);
    }
    showBubble(0);
    restartBubbleTimer();
  }

  // ── modals ──────────────────────────────────────────────────────
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

  // ── mobile nav ──────────────────────────────────────────────────
  var toggle = document.querySelector('.nav-toggle');
  var header = document.querySelector('.site-header');
  if(toggle){
    toggle.addEventListener('click', function(){
      var open = header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open?'true':'false');
    });
    document.querySelectorAll('nav a').forEach(function(a){
      a.addEventListener('click', function(){ header.classList.remove('nav-open'); toggle.setAttribute('aria-expanded','false'); });
    });
  }

  // ── hero video: honour reduced motion (poster frame only)
  var dv=document.querySelector('.drop-video');
  if(dv && window.matchMedia('(prefers-reduced-motion: reduce)').matches){ dv.removeAttribute('autoplay'); dv.pause(); }

  // ── hero loop segments: seamlessly loop media-fragment range (#t=start,end)
  document.querySelectorAll('video.drop-video').forEach(function(v){
    var src=v.currentSrc||'';
    if(!src){ var s=v.querySelector('source'); if(s) src=s.getAttribute('src')||''; }
    var m=/#t=([\d.]*)(?:,([\d.]+))?/.exec(src);
    if(m){
      var segStart=m[1]?parseFloat(m[1]):0;
      var segEnd=m[2]?parseFloat(m[2]):null;
      if(segEnd!==null){
        v.addEventListener('timeupdate',function(){
          if(v.currentTime>=segEnd||(v.currentTime+0.05<segStart)){
            try{ v.currentTime=segStart; }catch(e){}
          }
        });
        // also catch 'ended' in case the browser fires it at the fragment boundary
        v.addEventListener('ended',function(e){ e.preventDefault(); try{ v.currentTime=segStart; v.play(); }catch(x){} });
      }
    }
  });

  // ── subtle scroll reveal for cards, people, stories ─────────────
  var reveal = document.querySelectorAll('.person, .story, .logo-card');
  var rio = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('in'); rio.unobserve(e.target); }
    });
  }, {threshold: 0.12});
  reveal.forEach(function(el){ rio.observe(el); });
  // safety net
  setTimeout(function(){ reveal.forEach(function(el){ el.classList.add('in'); }); }, 1400);
});