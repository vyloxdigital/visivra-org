/* ============================================================
   VISIVRA — main.js
   Domain: visivra-org.vercel.app
   ============================================================ */

(function () {
  'use strict';

  /* ── NAV HAMBURGER ─────────────────────────────────────── */
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks  = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', e => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── STICKY HEADER ─────────────────────────────────────── */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── SMOOTH SCROLL ─────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 76;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      navLinks && navLinks.classList.remove('open');
    });
  });

  /* ── SCROLL REVEAL ─────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
  if (revealEls.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  }

  /* ── STAT COUNTER ───────────────────────────────────────── */
  function animateCounter(el) {
    const target  = parseFloat(el.dataset.count || '0');
    const suffix  = el.dataset.suffix  || '';
    const prefix  = el.dataset.prefix  || '';
    const dec     = parseInt(el.dataset.dec || '0', 10);
    const duration = 1800;
    let start = null;

    function step(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = prefix + (target * eased).toFixed(dec) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = prefix + target.toFixed(dec) + suffix;
    }
    requestAnimationFrame(step);
  }

  const statEls = document.querySelectorAll('[data-count]');
  if (statEls.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    statEls.forEach(el => io.observe(el));
  }

  /* ── BAR ANIMATION ──────────────────────────────────────── */
  const bars = document.querySelectorAll('.agg-bar-fill[data-width]');
  if (bars.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.width + '%';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    bars.forEach(b => io.observe(b));
  }

  /* ── FAQ ACCORDION ──────────────────────────────────────── */
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item    = q.closest('.faq-item');
      const isOpen  = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ── SCROLL TO TOP ──────────────────────────────────────── */
  const scrollBtn = document.querySelector('.scroll-top');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      scrollBtn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ── LAZY IMAGES POLYFILL ───────────────────────────────── */
  if ('loading' in HTMLImageElement.prototype === false) {
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      img.src = img.dataset.src || img.src;
    });
  }

  /* ── ACTIVE NAV HIGHLIGHT ───────────────────────────────── */
  const sections   = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
  if (sections.length && navAnchors.length) {
    const ioNav = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navAnchors.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { rootMargin: '-50% 0px -50% 0px' });
    sections.forEach(s => ioNav.observe(s));
  }

})();
