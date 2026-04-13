/* SAMSA — Main JS */
(function(){'use strict';
document.addEventListener('DOMContentLoaded',init);
function init(){fixSafariViewport();setupScrollReveal();setupMobileNav();setupActiveNav();setupHeroSlider();setupNavbarScroll();setupFormFeedback();setupLightbox()}

function fixSafariViewport(){if(!/^((?!chrome|android).)*safari/i.test(navigator.userAgent))return;function s(){document.documentElement.style.setProperty('--safari-vh',(window.outerHeight||window.innerHeight)+'px')}s();window.addEventListener('resize',s)}

function setupScrollReveal(){if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.querySelectorAll('.reveal').forEach(function(e){e.classList.add('is-visible')});return}var o=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('is-visible');o.unobserve(entry.target)}})},{threshold:0.12,rootMargin:'0px 0px -50px 0px'});document.querySelectorAll('.reveal').forEach(function(e){o.observe(e)})}

function setupNavbarScroll(){var n=document.getElementById('navbar');if(!n)return;var last=0,ticking=false;window.addEventListener('scroll',function(){if(!ticking){window.requestAnimationFrame(function(){var cur=window.scrollY;if(cur>20)n.classList.add('scrolled');else n.classList.remove('scrolled');if(cur>last&&cur>400)n.style.transform='translateY(-100%)';else n.style.transform='translateY(0)';last=cur;ticking=false});ticking=true}})}




var hamburger,drawer,overlay;
function setupMobileNav(){hamburger=document.getElementById('hamburger');drawer=document.getElementById('mobileDrawer');overlay=document.getElementById('drawerOverlay');if(!hamburger||!drawer||!overlay)return;hamburger.addEventListener('click',toggleNav);overlay.addEventListener('click',closeNav);drawer.querySelectorAll('a').forEach(function(l){l.addEventListener('click',closeNav)})}
function toggleNav(){drawer.classList.contains('open')?closeNav():openNav()}
function openNav(){hamburger.classList.add('open');drawer.classList.add('open');overlay.classList.add('open');document.body.style.overflow='hidden'}
function closeNav(){if(!hamburger)return;hamburger.classList.remove('open');drawer.classList.remove('open');overlay.classList.remove('open');document.body.style.overflow=''}

function setupActiveNav(){var secs=document.querySelectorAll('section[id]'),links=document.querySelectorAll('.navbar-links a');if(!secs.length||!links.length)return;var o=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){var id=entry.target.getAttribute('id');links.forEach(function(l){l.classList.toggle('active',l.getAttribute('href')==='#'+id)})}})},{threshold:0.3,rootMargin:'-80px 0px -50% 0px'});secs.forEach(function(s){o.observe(s)})}

/*
 * HERO SLIDER — Dynamic loading from hero-slider/ folder
 * ============================================================
 * The owner can change hero images via FTP:
 * 1. Open the "hero-slider" folder
 * 2. Replace slide-1.jpg, slide-2.jpg (or add slide-3.jpg, slide-4.jpg, etc.)
 * 3. Images are loaded automatically — no code changes needed
 * Max 10 slides supported. JPG format.
 */
function setupHeroSlider(){
  var slider=document.getElementById('heroSlider');
  if(!slider)return;
  var loaded=[];var maxSlides=10;var checked=0;

  function tryLoad(n){
    if(n>maxSlides){startSlider();return}
    var img=new Image();
    img.onload=function(){
      var el=document.createElement('img');
      var base=window.location.pathname.indexOf('/en/')!==-1?'../hero-slider/':'hero-slider/';
      el.src=base+'slide-'+n+'.jpg';
      el.alt='SAMSA Boho & Ethnic Shop';
      el.loading=n===1?'eager':'lazy';
      if(n===1){el.classList.add('active');el.classList.add('hero-slide-first')}
      slider.appendChild(el);
      loaded.push(el);
      tryLoad(n+1);
    };
    img.onerror=function(){startSlider()};
    var base=window.location.pathname.indexOf('/en/')!==-1?'../hero-slider/':'hero-slider/';
    img.src=base+'slide-'+n+'.jpg';
  }

  function startSlider(){
    if(loaded.length<=1)return;
    var current=0;var total=loaded.length;
    setTimeout(function(){setInterval(function(){loaded[current].classList.remove('active');current=(current+1)%total;loaded[current].classList.add('active')},8500)},1000);
  }

  tryLoad(1);
}

function setupFormFeedback(){
  function handle(form,endpoint){
    if(!form)return;
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var btn=form.querySelector('.btn');var txt=btn.textContent;
      btn.textContent='…';btn.style.pointerEvents='none';
      fetch(endpoint,{method:'POST',body:new FormData(form)})
      .then(function(r){return r.json()})
      .then(function(d){
        if(d.ok){
          btn.textContent='✓';btn.style.background='#5A9184';btn.style.color='#fff';
          form.reset();
        }else{
          btn.textContent='✗';btn.style.background='#c0392b';btn.style.color='#fff';
          if(d.errors)alert(d.errors.join('\n'));
        }
        setTimeout(function(){btn.textContent=txt;btn.style.background='';btn.style.color='';btn.style.pointerEvents=''},3000);
      })
      .catch(function(){
        btn.textContent='✗';btn.style.background='#c0392b';btn.style.color='#fff';
        setTimeout(function(){btn.textContent=txt;btn.style.background='';btn.style.color='';btn.style.pointerEvents=''},3000);
      });
    });
  }
  var phpBase=window.location.pathname.indexOf('/en/')!==-1?'../php/':'php/';
  handle(document.getElementById('contactForm'),phpBase+'contact.php');
  handle(document.getElementById('newsletterForm'),phpBase+'newsletter.php');
}

function setupLightbox(){var lb=document.getElementById('lightbox'),lbImg=document.getElementById('lightboxImg'),lbCap=document.getElementById('lightboxCaption'),closeBtn=document.getElementById('lightboxClose'),prevBtn=document.getElementById('lightboxPrev'),nextBtn=document.getElementById('lightboxNext'),cards=document.querySelectorAll('.product-card');if(!lb||!cards.length)return;var ci=0,products=[];
cards.forEach(function(c,i){var img=c.querySelector('img');var label=c.querySelector('.product-card-overlay h3');products.push({src:img.src,alt:img.alt,caption:label?label.textContent:''});c.addEventListener('click',function(){open(i)})});
function open(i){ci=i;upd();lb.setAttribute('aria-hidden','false');document.body.classList.add('lightbox-open')}
function close(){lb.setAttribute('aria-hidden','true');document.body.classList.remove('lightbox-open')}
function upd(){var p=products[ci];lbImg.style.opacity='0';setTimeout(function(){lbImg.src=p.src;lbImg.alt=p.alt;lbCap.textContent=cards[ci].querySelector('.product-card-overlay h3').textContent;lbImg.style.opacity='1'},150)}
function next(){ci=(ci+1)%products.length;upd()}
function prev(){ci=(ci-1+products.length)%products.length;upd()}
closeBtn.addEventListener('click',close);nextBtn.addEventListener('click',function(e){e.stopPropagation();next()});prevBtn.addEventListener('click',function(e){e.stopPropagation();prev()});
lb.addEventListener('click',function(e){if(e.target===lb||e.target.classList.contains('lightbox-content'))close()});
document.addEventListener('keydown',function(e){if(lb.getAttribute('aria-hidden')==='false'){if(e.key==='Escape')close();if(e.key==='ArrowRight')next();if(e.key==='ArrowLeft')prev()}});
var tsx=0,tex=0;lb.addEventListener('touchstart',function(e){tsx=e.changedTouches[0].screenX},{passive:true});lb.addEventListener('touchend',function(e){tex=e.changedTouches[0].screenX;var d=50;if(tex<tsx-d)next();if(tex>tsx+d)prev()},{passive:true})}
})();
