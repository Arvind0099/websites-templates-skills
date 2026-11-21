// Animated landing — motion layer (house style template).
// Works without GSAP; GSAP + ScrollTrigger only add scroll-scrubbed parallax/tilt/fan.
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];

  function splitWords(el) {
    let i = 0;
    const walk = (node) => [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.nodeValue.split(/(\s+)/).forEach((p) => { if (!p) return; if (/^\s+$/.test(p)) { frag.append(p); return; } const w = document.createElement('span'); w.className = 'w'; w.style.setProperty('--wi', i++); w.textContent = p; frag.append(w); });
        n.replaceWith(frag);
      } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
    });
    walk(el);
  }
  function countUp(el) {
    const to = +el.dataset.count, suf = el.dataset.suffix || '', t0 = performance.now(), dur = 1400;
    const step = (t) => { const k = Math.min(1, (t - t0) / dur); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))) + suf; if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
    setTimeout(() => { el.textContent = to + suf; }, dur + 400); // final value even if frames are throttled
  }

  // flows inside the card (segmented switch)
  function setMode(mode) {
    const b = $('#begin'); if (!b) return;
    b.dataset.mode = mode;
    $$('.mode-switch [data-mode]', b).forEach((x) => x.setAttribute('aria-selected', String(x.dataset.mode === mode)));
    $$('.mode-pane', b).forEach((x) => { x.hidden = x.dataset.pane !== mode; });
  }
  // CTA band → form
  function openBegin({ scroll = true, focus = true, mode } = {}) {
    const b = $('#begin'); if (!b) return;
    if (mode) setMode(mode);
    const was = b.classList.contains('open');
    b.classList.add('open'); b.querySelector('.begin-cta')?.setAttribute('aria-expanded', 'true');
    setTimeout(() => b.classList.add('opened'), was || reduce ? 0 : 750);
    if (scroll) setTimeout(() => { const t = b.querySelector('.formcard') || b; window.scrollTo({ top: Math.max(0, t.getBoundingClientRect().top + scrollY - ($('.topbar')?.offsetHeight || 60) - 14), behavior: reduce ? 'auto' : 'smooth' }); }, was ? 0 : 120);
    if (focus) setTimeout(() => b.querySelector('.mode-pane:not([hidden]) input, .mode-pane:not([hidden]) select')?.focus({ preventScroll: true }), reduce ? 50 : 900);
  }
  window.openBegin = openBegin;

  function init() {
    // scroll progress
    const bar = $('.scroll-progress i');
    if (bar) { let raf = 0; const upd = () => { raf = 0; const h = document.documentElement.scrollHeight - innerHeight; bar.style.transform = `scaleX(${h > 0 ? Math.min(1, scrollY / h) : 0})`; }; addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(upd); }, { passive: true }); upd(); }

    // menu
    const btn = $('#menuBtn'), menu = $('#appMenu');
    if (btn && menu) {
      const close = (f) => { menu.hidden = true; btn.setAttribute('aria-expanded', 'false'); if (f) btn.focus(); };
      btn.addEventListener('click', (e) => { e.stopPropagation(); const open = menu.hidden; menu.hidden = !open; btn.setAttribute('aria-expanded', String(open)); if (open) menu.querySelector('a')?.focus(); });
      document.addEventListener('click', (e) => { if (!menu.hidden && (!e.target.closest('#appMenu') || e.target.closest('#appMenu a'))) close(); });
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) close(true); });
    }
    // theme toggle
    $('#themeBtn')?.addEventListener('click', () => { const cur = document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'); const next = cur === 'dark' ? 'light' : 'dark'; document.documentElement.dataset.theme = next; try { localStorage.setItem('theme', next); } catch { /* ignore */ } });

    // CTAs
    document.addEventListener('click', (e) => {
      const m = e.target.closest('.mode-switch [data-mode]'); if (m) { setMode(m.dataset.mode); return; }
      const a = e.target.closest('[data-act="start"], [data-act="open"]'); if (!a) return; e.preventDefault(); openBegin({ mode: a.dataset.mode });
    });

    // reveals: geometry check on scroll/resize + slow timer (IntersectionObserver alone is throttled in hidden contexts)
    if (reduce) $$('[data-count]').forEach((el) => { el.textContent = el.dataset.count + (el.dataset.suffix || ''); });
    else document.documentElement.classList.add('js-anim');
    $$('.split').forEach(splitWords);
    const pending = new Set($$('[data-reveal], .split'));
    const reveal = (el) => { el.classList.add('in'); pending.delete(el); if (!reduce) [el, ...el.querySelectorAll('[data-count]')].filter((x) => x.dataset.count).forEach(countUp); };
    const vis = $('.tour-visual'), steps = $$('.tour-step');
    const check = () => {
      const vh = innerHeight;
      for (const el of pending) { const r = el.getBoundingClientRect(); if (r.top < vh * 0.92 && r.bottom > 0) reveal(el); }
      if (vis && steps.length) { let best = null, bd = Infinity; for (const s of steps) { const r = s.getBoundingClientRect(); const d = Math.abs(r.top + r.height / 2 - vh / 2); if (d < bd) { bd = d; best = s; } } if (best && vis.dataset.step !== best.dataset.step) { vis.dataset.step = best.dataset.step; steps.forEach((s) => s.classList.toggle('on', s === best)); } }
    };
    let ticking = false;
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { ticking = false; check(); }); } }, { passive: true });
    addEventListener('resize', check);
    const timer = setInterval(() => { check(); if (!pending.size) clearInterval(timer); }, 900);
    addEventListener('beforeprint', () => [...pending].forEach(reveal));
    steps[0]?.classList.add('on');
    check();

    // GSAP enhancements
    const g = window.gsap, ST = window.ScrollTrigger;
    if (!g || !ST || reduce) return;
    g.registerPlugin(ST);
    g.matchMedia().add('(min-width: 901px)', () => {
      const st = (scrub = true) => ({ trigger: '.hero', start: 'top top', end: 'bottom top', scrub });
      g.to('.orbit', { yPercent: 18, rotate: 40, ease: 'none', scrollTrigger: st(0.6) });
      g.to('.blob.b1', { y: 160, ease: 'none', scrollTrigger: st() });
      g.to('.blob.b2', { y: -120, ease: 'none', scrollTrigger: st() });
      g.utils.toArray('.fchip').forEach((c, i) => g.to(c, { y: -60 - i * 35, ease: 'none', scrollTrigger: st() }));
      g.fromTo('.hv-card', { rotateY: -14, rotateX: 8 }, { rotateY: 10, rotateX: -4, y: -60, ease: 'none', scrollTrigger: st(0.8) });
    });
    const cards = g.utils.toArray('.fan-card'), n = cards.length, off = (i) => i - (n - 1) / 2;
    if (n) g.fromTo(cards, { x: 0, rotateY: 0, z: (i) => -i * 14, opacity: 0.4 }, { x: (i) => off(i) * (innerWidth < 700 ? 90 : 130), rotateY: (i) => off(i) * -14, z: (i) => -off(i) * off(i) * 20, opacity: 1, ease: 'power2.out', scrollTrigger: { trigger: '.fan', start: 'top 85%', end: 'center 45%', scrub: 0.8 } });
  }
  if (document.readyState === 'complete') init(); else addEventListener('load', init);
})();
