'use client';

/*
 * Site motion — deliberately restrained (brand brief §2.2):
 * one subtle fade-up reveal for content below the fold, a scroll progress
 * hairline, a gentle hero parallax and a cursor spotlight on cards.
 * No word-splitting, no magnetic buttons, no zoom/flip/blur effects.
 * Everything is skipped under prefers-reduced-motion.
 */

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const CARD_SELECTOR = [
  '.quick-option', '.pillar-card', '.aviation-card', '.aviation-index-grid > a', '.aviation-related-grid > a',
  '.aviation-process-grid > article', '.aviation-use-list > li', '.global-mosaic > a', '.global-related-grid > a',
  '.global-type-grid > article', '.global-use-cases > ul > li', '.club-inclusion-grid > article',
  '.club-process-grid > *', '.franchise-profile-grid > *', '.franchise-investment-card', '.franchise-support-grid > *',
  '.corporate-sections > article', '.destination-results > article', '.insight-card', '.plan-card', '.process-step',
  '.why-item',
  // Skinned pages + home card families
  '.al-card', '.al-amenity', '.al-dest-card', '.scs-step-card', '.scs-pillar-card', '.scs-value-card',
  '.club-inclusion-card', '.aviation-index-card', '.aviation-related-card', '.global-mosaic-card', '.sa-m-dest-tile',
  '.sa-pillar-card', '.sa-quick-card', '.sa-insight-card', '.sa-region',
].join(',');

const ENTRANCE_SELECTOR = [
  '.hero-copy > *', '.club-hero-copy > *', '.aviation-service-hero-copy > *', '.global-service-hero-copy > *',
  '.franchise-hero-copy > *', '.hero-visual', '.club-hero-image', '.aviation-service-hero-visual',
  '.global-service-hero-image', '.franchise-hero-image',
].join(',');

const PARALLAX_SELECTOR = '.sa-hero-media, .al-hero-bg, .sa-m-hero-media, .sa-av-hero-media';

const SPOTLIGHT_SELECTOR = [
  '.sa-pillar-card', '.sa-quick-card', '.sa-insight-card', '.al-card', '.scs-step-card', '.scs-pillar-card',
  '.scs-value-card', '.aviation-index-card', '.aviation-related-card', '.club-inclusion-card', '.plan-card',
  '.insight-card', '.franchise-investment-card', '.sa-form-card', '.sa-region',
].join(',');

const EASE = 'cubic-bezier(0.2, 0.75, 0.3, 1)';
const REVEAL = [{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }];

function canAnimate(el) {
  if (!el || el instanceof SVGElement) return false;
  if (el.matches('script, style, link, meta')) return false;
  if (el.matches(ENTRANCE_SELECTOR)) return false;
  if (el.classList.contains('reveal') || el.closest('.reveal')) return false;
  const position = window.getComputedStyle(el).position;
  return position !== 'sticky' && position !== 'fixed';
}

export default function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (typeof Element.prototype.animate !== 'function') return undefined;

    const hidden = new Map();
    let observer = null;
    let cancelled = false;

    /*
     * Performance (brief §12.1): all layout READS happen first (one layout), then all style
     * WRITES — the old version interleaved getComputedStyle/getBoundingClientRect with
     * style.opacity writes per element, forcing a layout for every card. Setup also waits
     * for an idle moment so it never competes with first paint / LCP.
     */
    const setup = () => {
      if (cancelled) return;
      const candidates = new Map();
      document.querySelectorAll(CARD_SELECTOR).forEach((el) => {
        candidates.set(el, Array.prototype.indexOf.call(el.parentElement.children, el));
      });
      document.querySelectorAll('main section > *').forEach((el) => {
        if (candidates.has(el) || el.matches(CARD_SELECTOR) || el.querySelector(CARD_SELECTOR)) return;
        candidates.set(el, 0);
      });
      const fold = window.innerHeight;
      // READ phase
      candidates.forEach((index, el) => {
        if (canAnimate(el) && el.getBoundingClientRect().top >= fold) hidden.set(el, index);
      });
      // WRITE phase
      hidden.forEach((_, el) => { el.style.opacity = '0'; });

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = hidden.get(entry.target) || 0;
          const animation = entry.target.animate(REVEAL, {
            duration: 520, delay: Math.min(index, 5) * 50, easing: EASE, fill: 'backwards',
          });
          animation.onfinish = () => { entry.target.style.opacity = ''; };
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
      hidden.forEach((_, el) => observer.observe(el));
    };
    const idle = window.requestIdleCallback || ((cb) => window.setTimeout(cb, 200));
    const cancelIdle = window.cancelIdleCallback || window.clearTimeout;
    const idleHandle = idle(setup, { timeout: 1500 });


    /* Scroll progress hairline */
    let progress = document.querySelector('.p-progress');
    if (!progress) {
      progress = document.createElement('div');
      progress.className = 'p-progress';
      progress.setAttribute('aria-hidden', 'true');
      document.body.appendChild(progress);
    }

    /* Gentle hero parallax (uses `translate`, leaving `transform` free) */
    const parallaxTargets = Array.from(document.querySelectorAll(PARALLAX_SELECTOR));
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
      if (y < window.innerHeight * 1.2) {
        parallaxTargets.forEach((el) => { el.style.translate = `0 ${(y * 0.08).toFixed(1)}px`; });
      }
    };
    const onScroll = () => {
      document.documentElement.classList.toggle('is-scrolled', window.scrollY > 10);
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    /* Cursor spotlight on cards (hover feedback only) */
    const onPointerMove = (event) => {
      const card = event.target instanceof Element ? event.target.closest(SPOTLIGHT_SELECTOR) : null;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      card.style.setProperty('--my', `${event.clientY - rect.top}px`);
    };
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (finePointer) document.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      cancelled = true;
      cancelIdle(idleHandle);
      observer?.disconnect();
      hidden.forEach((_, el) => { el.style.opacity = ''; });
      parallaxTargets.forEach((el) => { el.style.translate = ''; });
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('pointermove', onPointerMove);
      document.documentElement.classList.remove('is-scrolled');
    };
  }, [pathname]);

  return null;
}
