/* SAMSA — Main JS */
(function(){'use strict';
document.addEventListener('DOMContentLoaded',init);
function init(){fixSafariViewport();setupScrollReveal();setupLanguageSwitcher();setupMobileNav();setupActiveNav();setupHeroSlider();setupNavbarScroll();setupFormFeedback();setupLightbox()}

function fixSafariViewport(){if(!/^((?!chrome|android).)*safari/i.test(navigator.userAgent))return;function s(){document.documentElement.style.setProperty('--safari-vh',(window.outerHeight||window.innerHeight)+'px')}s();window.addEventListener('resize',s)}

function setupScrollReveal(){if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.querySelectorAll('.reveal').forEach(function(e){e.classList.add('is-visible')});return}var o=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('is-visible');o.unobserve(entry.target)}})},{threshold:0.12,rootMargin:'0px 0px -50px 0px'});document.querySelectorAll('.reveal').forEach(function(e){o.observe(e)})}

function setupNavbarScroll(){var n=document.getElementById('navbar');if(!n)return;var last=0,ticking=false;window.addEventListener('scroll',function(){if(!ticking){window.requestAnimationFrame(function(){var cur=window.scrollY;if(cur>20)n.classList.add('scrolled');else n.classList.remove('scrolled');if(cur>last&&cur>400)n.style.transform='translateY(-100%)';else n.style.transform='translateY(0)';last=cur;ticking=false});ticking=true}})}

function setupLanguageSwitcher(){var toggles=document.querySelectorAll('#langToggle, #langToggleDrawer');if(!toggles.length)return;var lang='sk';
var t={en:{'nav.home':'Home','nav.about':'About Us','nav.products':'Products','nav.store':'Store','nav.contact':'Contact','hero.cta':'Shop online','about.b1':'• Small shop. Big world.','about.b2':'• 20 years of journeys, artisans, and colours.','about.b3':'• Fair Trade. Always.','about.p3':'We don\'t follow trends. We follow stories.','journey.title':'The journey is part of the product','journey.s1':'Dyeing fabrics by hand-dipping into vats of colour.','journey.s2':'Casting silver over open flames into clay moulds.','journey.s3':'Weaving on wooden looms that are centuries old.','journey.sponsorTitle':'SAMSA in Nepal','journey.sponsorText':'Since 2006, we have sponsored two Nepali children and enabled them to study at a primary school in Kathmandu. We contributed to building a school in a village near Trisuli, and after the 2015 earthquake, we helped a family rebuild their home.','journey.sponsorClosing':'It\'s not charity. It\'s a relationship. We buy from them and they grow with us.','products.label':'Assortment','products.title':'Little Boho World','products.desc':'Choose from our diverse selection of handmade products from around the world.','products.cat1':'Clothing','products.cat2':'Ethnic Textiles','products.cat3':'Jewelry','products.cat4':'Home Accessories','products.cat5':'Costume Jewelry','products.cat6':'Bags & Accessories','products.cat7':'Fragrances','products.cat8':'Scarves & Shawls','store.title':'Our Store','store.addressLabel':'Address','store.phoneLabel':'Phone','store.hoursLabel':'Opening hours','store.hoursValue':'Monday – Sunday: 10:00 – 18:30','reviews.label':'Reviews','reviews.title':'What our customers say','reviews.r1':'"A beautiful little shop hidden in a courtyard by the Cathedral. I found amazing silver jewellery from Nepal and gorgeous scarves. The owner is very kind and helpful. I\'ll definitely come back!"','reviews.r2':'"I regularly buy gifts here for family and friends. Every piece is unique and handmade. The Fair Trade approach is a huge plus. I recommend it to anyone looking for something original!"','reviews.r3':'"I discovered SAMSA by chance and was thrilled. Beautiful bohemian clothing, quality materials, and an amazing atmosphere. You can feel that every product has a story. A wonderful shop with soul!"','newsletter.title':'Get 7% off your purchase','newsletter.discount':'Sign up for our newsletter and we\'ll send you a discount code immediately.','newsletter.name':'Name','newsletter.submit':'Submit','contact.label':'Contact','contact.title':'Where to find us','contact.formTitle':'CONTACT US','contact.name':'Name','contact.message':'Your message','contact.submit':'Send','contact.partners':'Partners','cookie.accept':'Accept','cookie.decline':'Decline'},
sk:{'nav.home':'Úvod','nav.about':'O nás','nav.products':'Produkty','nav.store':'Predajňa','nav.contact':'Kontakt','hero.cta':'Nakupujte online','about.b1':'• Malý obchod. Veľký svet.','about.b2':'• 20 rokov ciest, remeselníkov a farieb.','about.b3':'• Fair Trade. Vždy.','about.p3':'Nezakladáme si na trendoch. Zakladáme si na príbehoch.','journey.title':'Cesta je súčasť výrobku','journey.s1':'Farbenie látok ručným namáčaním do kadí s farbou.','journey.s2':'Odlievanie striebra nad otvoreným ohňom do hlinených formičiek.','journey.s3':'Tkanie na drevených stavoch, ktoré majú stovky rokov.','journey.sponsorTitle':'SAMSA v Nepále','journey.sponsorText':'Od roku 2006 sponzorujeme dve nepálske deti a umožnili sme im štúdium na základnej škole v Kathmandu. Prispeli sme na výstavbu školy v dedinke pri Trisuli a po zemetrasení v roku 2015 sme pomohli rodine obnoviť bývanie.','journey.sponsorClosing':'Nie je to charita. Je to vzťah. Kupujeme od nich a oni rastú s nami.','products.label':'Sortiment','products.title':'Malý svet Boho','products.desc':'Vyberte si z našej pestrej ponuky ručne vyrobených výrobkov z celého sveta.','products.cat1':'Oblečenie','products.cat2':'Etno Textil','products.cat3':'Šperky','products.cat4':'Bytové Doplnky','products.cat5':'Bižutéria','products.cat6':'Tašky & Doplnky','products.cat7':'Vône','products.cat8':'Šály & Šatky','store.title':'Naša predajňa','store.addressLabel':'Adresa','store.phoneLabel':'Telefón','store.hoursLabel':'Otváracie hodiny','store.hoursValue':'Pondelok – Nedeľa: 10:00 – 18:30','reviews.label':'Hodnotenia','reviews.title':'Čo hovoria naši zákazníci','reviews.r1':'"Nádherný obchodík schovaný vo dvore pri Dóme. Našla som tu úžasné strieborné šperky z Nepálu a krásne šatky. Majiteľka je veľmi milá a ochotná poradiť. Určite sa vrátim!"','reviews.r2':'"Pravidelne tu nakupujem darčeky pre rodinu a priateľov. Každý kúsok je unikátny a ručne robený. Fair Trade prístup je obrovské plus. Odporúčam každému, kto hľadá niečo originálne!"','reviews.r3':'"Objavila som SAMSA náhodou a bola som nadšená. Krásne bohémske oblečenie, kvalitné materiály a úžasná atmosféra. Cítiť, že za každým produktom je príbeh. Skvelý obchod s dušou!"','newsletter.title':'Získajte 7% zľavu na nákup','newsletter.discount':'Zaregistrujte sa k odberu newslettra a okamžite Vám pošleme zľavový kód.','newsletter.name':'Meno','newsletter.submit':'Odoslať','contact.label':'Kontakt','contact.title':'Kde nás nájdete','contact.formTitle':'KONTAKTUJTE NÁS','contact.name':'Meno','contact.message':'Vaša správa','contact.submit':'Odoslať','contact.partners':'Partneri','cookie.accept':'Súhlasím','cookie.decline':'Odmietam'}};
var h={en:{'hero.tagline':'Colours of the world. Stories of artisans. One small shop<br>in the heart of Bratislava.','about.p1':'SAMSA is a cosy little shop, hidden in a courtyard by St. Martin\'s Cathedral. No shop window, no advertising. Just a door, behind which awaits a world of handcrafted goods from Nepal, India, Indonesia, and beyond.','about.p2':'Every piece of jewellery, scarf, and garment has travelled a long journey — from the artisan who crafted it by hand, through mountain markets and small workshops, all the way to our shop at <a href="#contact" class="inline-link">Pánska&nbsp;33</a>.','journey.closing':'You can\'t order goods like these from a catalogue. You need to travel for them, find the right artisans, and earn their trust.<br>That\'s why we travel directly to mountain villages and remote islands where craftsmanship still lives.','store.notice':'For personal pickups, call <strong>0904 348 345</strong> on workdays. We are in the courtyard. Thank you.','cookie.text':'This website uses cookies to improve your experience. By continuing to browse, you agree to their use.'},
sk:{'hero.tagline':'Farby sveta. Príbehy remeselníkov. Jeden malý obchod<br>v srdci Bratislavy.','about.p1':'SAMSA je útulný obchodík, schovaný vo dvore pri Dóme Svätého Martina. Žiadny výklad, žiadna reklama. Len dvere, za ktorými čaká svet ručne zhotovených výrobkov z Nepálu, Indie, Indonézie a ďalších krajín.','about.p2':'Každý šperk, šatka a kúsok oblečenia prešiel dlhú cestu od remeselníka, ktorý ho vytvoril vlastnými rukami, cez horské trhy a malé manufaktúry, až do nášho obchodu na <a href="#contact" class="inline-link">Pánskej&nbsp;33</a>.','journey.closing':'Takýto tovar sa nedá objednať z katalógu. Je potreba za ním vycestovať, nájsť tých správnych výrobcov a vybudovať si ich dôveru.<br>Preto cestujeme priamo do horských dedín a na odľahlé ostrovy, kde remeslo stále žije.','store.notice':'Pre osobné odbery volajte v pracovné dni <strong>0904 348 345</strong>. Sme vo dvore. Ďakujeme.','cookie.text':'Táto webová stránka používa cookies na zlepšenie vášho zážitku. Pokračovaním v prehliadaní súhlasíte s ich používaním.'}};
function update(){document.querySelectorAll('[data-i18n]').forEach(function(e){var k=e.getAttribute('data-i18n');if(t[lang][k])e.textContent=t[lang][k]});document.querySelectorAll('[data-i18n-html]').forEach(function(e){var k=e.getAttribute('data-i18n-html');if(h[lang]&&h[lang][k])e.innerHTML=h[lang][k]});document.querySelectorAll('[data-i18n-placeholder]').forEach(function(e){var k=e.getAttribute('data-i18n-placeholder');if(t[lang][k])e.setAttribute('placeholder',t[lang][k])});toggles.forEach(function(b){b.textContent=lang==='sk'?'EN':'SK'});document.documentElement.lang=lang}
toggles.forEach(function(b){b.addEventListener('click',function(){lang=lang==='sk'?'en':'sk';update()})})}

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
      el.src='hero-slider/slide-'+n+'.jpg';
      el.alt='SAMSA Boho & Ethnic Shop';
      el.loading=n===1?'eager':'lazy';
      if(n===1){el.classList.add('active');el.classList.add('hero-slide-first')}
      slider.appendChild(el);
      loaded.push(el);
      tryLoad(n+1);
    };
    img.onerror=function(){startSlider()};
    img.src='hero-slider/slide-'+n+'.jpg';
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
  handle(document.getElementById('contactForm'),'php/contact.php');
  handle(document.getElementById('newsletterForm'),'php/newsletter.php');
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
