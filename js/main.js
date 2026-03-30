/* ============================================
   SAMSA V2 — Main JavaScript
   Vanilla JS: no dependencies
   ============================================ */

(function () {
  'use strict';

  // ─── DOM Ready ───
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    setupSmoothScroll();
    setupScrollReveal();
    setupLanguageSwitcher();
    setupMobileNav();
    setupActiveNav();
    setupHeroSlider();
  }

  // ═══════════════════════════════════════
  // SMOOTH SCROLL
  // ═══════════════════════════════════════
  function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(function (link) {
      link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();

        // Close mobile drawer if open
        closeMobileNav();

        // Get navbar height for offset
        const navbar = document.getElementById('navbar');
        const offset = navbar ? navbar.offsetHeight : 0;

        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      });
    });
  }

  // ═══════════════════════════════════════
  // SCROLL REVEAL (IntersectionObserver)
  // ═══════════════════════════════════════
  function setupScrollReveal() {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Make everything visible immediately
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
            observer.unobserve(entry.target); // Only animate once
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  }

  // ═══════════════════════════════════════
  // LANGUAGE SWITCHER
  // ═══════════════════════════════════════
  function setupLanguageSwitcher() {
    var langToggles = document.querySelectorAll('.lang-toggle');
    if (!langToggles.length) return;

    var currentLang = 'sk'; // Default

    var translations = {
      en: {
        'nav.home': 'Home',
        'nav.about': 'About Us',
        'nav.products': 'Products',
        'nav.store': 'Store',
        'nav.contact': 'Contact',
        'newsletter.title': 'Subscribe to our newsletter',
        'newsletter.discount': 'Sign up and get an instant 10% DISCOUNT!',
        'newsletter.name': 'Name',
        'newsletter.submit': 'Submit',
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
        'products.cat8': 'Gifts'
      },
      sk: {
        'nav.home': 'Úvod',
        'nav.about': 'O nás',
        'nav.products': 'Produkty',
        'nav.store': 'Predajňa',
        'nav.contact': 'Kontakt',
        'newsletter.title': 'Prihláste sa na odoberanie newslettra',
        'newsletter.discount': 'Zaregistruj sa a získaj okamžitú 10% ZĽAVU!',
        'newsletter.name': 'Meno',
        'newsletter.submit': 'Odoslať',
        'products.label': 'Sortiment',
        'products.title': 'Malý svet Boho',
        'products.desc': 'Vyberte si z našej pestrej ponuky ručne vyrobených výrobkov z celého sveta.',
        'products.cat1': 'Oblečenie',
        'products.cat2': 'Etno Textil',
        'products.cat3': 'Šperky & Amulety',
        'products.cat4': 'Tašky & Doplnky',
        'products.cat5': 'Šály & Šatky',
        'products.cat6': 'Dekorácie',
        'products.cat7': 'Vónne Tyčinky',
        'products.cat8': 'Darčeky'
      }
    };

    function updateLanguage() {
      // Update text content
      document.querySelectorAll('[data-i18n]').forEach(function (el) {
        var key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
          el.textContent = translations[currentLang][key];
        }
      });

      // Update placeholders
      document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
        var key = el.getAttribute('data-i18n-placeholder');
        if (translations[currentLang][key]) {
          el.setAttribute('placeholder', translations[currentLang][key]);
        }
      });

      // Update button text to show the OTHER language
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

    // Initialize (we start in SK, so we don't really need to run it, but good for safety)
    // updateLanguage(); 
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

    // Close when tapping a drawer link
    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobileNav);
    });
  }

  function toggleMobileNav() {
    var isOpen = drawer.classList.contains('open');
    if (isOpen) {
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
  // HERO IMAGE SLIDER (cinematic Ken Burns)
  // ═══════════════════════════════════════
  function setupHeroSlider() {
    var slider = document.getElementById('heroSlider');
    if (!slider) return;

    var images = slider.querySelectorAll('img');
    if (images.length <= 1) return;

    var current = 0;
    var total = images.length;
    var panClasses = ['pan-down', 'pan-up'];

    // Start first pan after 1s (human feel — page settles first)
    setTimeout(function () {
      images[0].classList.add(panClasses[0]);
    }, 1000);

    // First transition after 9s (1s delay + 8s pan)
    // Then cycle every 8.5s
    setTimeout(function () {
      transition();
      setInterval(transition, 8500);
    }, 9000);

    function transition() {
      // Remove pan + fade out current image
      images[current].classList.remove(panClasses[current % panClasses.length]);
      images[current].classList.remove('active');

      // Advance to next
      current = (current + 1) % total;

      // Fade in + start pan simultaneously
      // Pan class added with active — image is still at opacity 0,
      // so the position jump to animation start is invisible.
      // By the time opacity reaches ~0.3, pan is already smooth.
      images[current].classList.add('active');
      images[current].classList.add(panClasses[current % panClasses.length]);
    }
  }

})();
