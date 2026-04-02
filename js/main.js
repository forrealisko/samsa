/* ============================================
   SAMSA V2 — Main JavaScript
   Vintage Emerald • Premium Interactions
   ============================================ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    setupScrollReveal();
    setupLanguageSwitcher();
    setupMobileNav();
    setupActiveNav();
    setupHeroSlider();
    setupNavbarScroll();
    setupFormFeedback();
  }

  // ═══════════════════════════════════════
  // SMOOTH SCROLL
  // ═══════════════════════════════════════


  // ═══════════════════════════════════════
  // SCROLL REVEAL — IntersectionObserver
  // ═══════════════════════════════════════
  function setupScrollReveal() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  }

  // ═══════════════════════════════════════
  // NAVBAR — scroll shadow + auto-hide
  // ═══════════════════════════════════════
  function setupNavbarScroll() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;

    var lastScroll = 0;
    var ticking = false;

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          var currentScroll = window.scrollY;

          if (currentScroll > 20) {
            navbar.classList.add('scrolled');
          } else {
            navbar.classList.remove('scrolled');
          }

          if (currentScroll > lastScroll && currentScroll > 400) {
            navbar.style.transform = 'translateY(-100%)';
          } else {
            navbar.style.transform = 'translateY(0)';
          }

          lastScroll = currentScroll;
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // ═══════════════════════════════════════
  // LANGUAGE SWITCHER
  // ═══════════════════════════════════════
  function setupLanguageSwitcher() {
    var langToggles = document.querySelectorAll('.lang-toggle');
    if (!langToggles.length) return;

    var currentLang = 'sk';

    var translations = {
      en: {
        'nav.home': 'Home',
        'nav.about': 'About Us',
        'nav.products': 'Products',
        'nav.store': 'Store',
        'nav.contact': 'Contact',
        'newsletter.title': 'Get 10% off your Etsy purchase',
        'newsletter.discount': 'Sign up for our newsletter and we will send you a discount code immediately.',
        'newsletter.name': 'Name',
        'newsletter.submit': 'Submit',
        'newsletter.etsyPrompt': 'Or head straight to our shop:',
        'newsletter.etsyButton': 'Visit our Etsy Shop',
        'products.label': 'Assortment',
        'products.title': 'Little Boho World',
        'products.desc': 'Choose from our diverse selection of handmade products from around the world.',
        'products.cat1': 'Clothing',
        'products.cat2': 'Ethnic Textiles',
        'products.cat3': 'Jewelry & Amulets',
        'products.cat4': 'Bags & Accessories',
        'products.cat5': 'Scarves',
        'products.cat6': 'Home Decor',
        'products.cat7': 'Incense',
        'products.cat8': 'Gifts',
        'store.title': 'Our Store',
        'store.addressLabel': 'Address',
        'store.phoneLabel': 'Phone',
        'store.hoursLabel': 'Opening hours',
        'store.hoursValue': 'Monday - Sunday: 10:00 - 18:30',
        'store.notice': 'For personal pickups call 0904 348 345 on workdays. We are in the courtyard. Thank you.',
        'reviews.label': 'Reviews',
        'reviews.title': 'What our customers say',
        'contact.label': 'Contact',
        'contact.title': 'Where to find us',
        'contact.formTitle': 'CONTACT US',
        'contact.name': 'Name',
        'contact.message': 'Your message',
        'contact.submit': 'Send',
        'contact.partners': 'Partners'
      },
      sk: {
        'nav.home': 'Úvod',
        'nav.about': 'O nás',
        'nav.products': 'Produkty',
        'nav.store': 'Predajňa',
        'nav.contact': 'Kontakt',
        'newsletter.title': 'Získajte 10% zľavu na nákup cez Etsy',
        'newsletter.discount': 'Zaregistrujte sa k odberu newslettra a okamžite Vám pošleme zľavový kód.',
        'newsletter.name': 'Meno',
        'newsletter.submit': 'Odoslať',
        'newsletter.etsyPrompt': 'Alebo zamierte rovno do obchodu:',
        'newsletter.etsyButton': 'Navštívte náš Etsy obchod',
        'products.label': 'Sortiment',
        'products.title': 'Malý svet Boho',
        'products.desc': 'Vyberte si z našej pestrej ponuky ručne vyrobených výrobkov z celého sveta.',
        'products.cat1': 'Oblečenie',
        'products.cat2': 'Etno Textil',
        'products.cat3': 'Šperky',
        'products.cat4': 'Bytové Doplnky',
        'products.cat5': 'Bižutéria',
        'products.cat6': 'Fajky & Kadidlá',
        'products.cat7': 'Vône',
        'products.cat8': 'Šály & Šatky',
        'store.title': 'Naša predajňa',
        'store.addressLabel': 'Adresa',
        'store.phoneLabel': 'Telefón',
        'store.hoursLabel': 'Otváracie hodiny',
        'store.hoursValue': 'Pondelok – Nedeľa: 10:00 – 18:30',
        'store.notice': 'Pre osobné odbery volajte v pracovné dni 0904 348 345. Sme vo dvore. Ďakujeme.',
        'reviews.label': 'Hodnotenia',
        'reviews.title': 'Čo hovoria naši zákazníci',
        'contact.label': 'Kontakt',
        'contact.title': 'Kde nás nájdete',
        'contact.formTitle': 'KONTAKTUJTE NÁS',
        'contact.name': 'Meno',
        'contact.message': 'Vaša správa',
        'contact.submit': 'Odoslať',
        'contact.partners': 'Partneri'
      }
    };

    function updateLanguage() {
      document.querySelectorAll('[data-i18n]').forEach(function (el) {
        var key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
          el.textContent = translations[currentLang][key];
        }
      });

      document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
        var key = el.getAttribute('data-i18n-placeholder');
        if (translations[currentLang][key]) {
          el.setAttribute('placeholder', translations[currentLang][key]);
        }
      });

      langToggles.forEach(function(btn) {
         btn.textContent = currentLang === 'sk' ? 'EN' : 'SK';
      });
      document.documentElement.lang = currentLang;
    }

    langToggles.forEach(function (btn) {
      btn.addEventListener('click', function () {
        currentLang = currentLang === 'sk' ? 'en' : 'sk';
        updateLanguage();
      });
    });
  }

  // ═══════════════════════════════════════
  // MOBILE NAVIGATION
  // ═══════════════════════════════════════
  var hamburger, drawer, overlay;

  function setupMobileNav() {
    hamburger = document.getElementById('hamburger');
    drawer = document.getElementById('mobileDrawer');
    overlay = document.getElementById('drawerOverlay');

    if (!hamburger || !drawer || !overlay) return;

    hamburger.addEventListener('click', toggleMobileNav);
    overlay.addEventListener('click', closeMobileNav);

    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobileNav);
    });
  }

  function toggleMobileNav() {
    if (drawer.classList.contains('open')) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  }

  function openMobileNav() {
    hamburger.classList.add('open');
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    if (!hamburger) return;
    hamburger.classList.remove('open');
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // ═══════════════════════════════════════
  // ACTIVE NAV HIGHLIGHTING
  // ═══════════════════════════════════════
  function setupActiveNav() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.navbar-links a');

    if (!sections.length || !navLinks.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute('id');
            navLinks.forEach(function (link) {
              link.classList.toggle(
                'active',
                link.getAttribute('href') === '#' + id
              );
            });
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-80px 0px -50% 0px'
      }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  // ═══════════════════════════════════════
  // HERO SLIDER — Cinematic Ken Burns
  // ═══════════════════════════════════════
  function setupHeroSlider() {
    var slider = document.getElementById('heroSlider');
    if (!slider) return;

    var images = slider.querySelectorAll('img');
    if (images.length <= 1) return;

    var current = 0;
    var total = images.length;
    var panClasses = ['pan-down', 'pan-up'];

    setTimeout(function () {
      images[0].classList.add(panClasses[0]);
    }, 1000);

    setTimeout(function () {
      transition();
      setInterval(transition, 8500);
    }, 9000);

    function transition() {
      images[current].classList.remove(panClasses[current % panClasses.length]);
      images[current].classList.remove('active');

      current = (current + 1) % total;

      images[current].classList.add('active');
      images[current].classList.add(panClasses[current % panClasses.length]);
    }
  }

  // ═══════════════════════════════════════
  // FORM FEEDBACK — visual submit response
  // ═══════════════════════════════════════
  function setupFormFeedback() {
    var contactForm = document.getElementById('contactForm');
    var newsletterForm = document.getElementById('newsletterForm');

    function handleSubmit(form) {
      if (!form) return;
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        var btn = form.querySelector('.btn');
        var originalText = btn.textContent;

        btn.textContent = '✓';
        btn.style.background = '#5A9184';
        btn.style.color = '#fff';
        btn.style.pointerEvents = 'none';

        setTimeout(function () {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.style.color = '';
          btn.style.pointerEvents = '';
          form.reset();
        }, 2500);
      });
    }

    handleSubmit(contactForm);
    handleSubmit(newsletterForm);
  }

})();
