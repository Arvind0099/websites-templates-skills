---
name: animated-landing
description: The user's house style for websites — a modern, scroll-animated, glassy "premium product" look (aurora glows, glass cards, GSAP ScrollTrigger reveals, pinned tour, 3D card fan, glowing CTAs, CTA band that expands into a form). Use whenever building or redesigning any landing page, welcome page, marketing site, product homepage or web UI front page, or when the user says "same design as Kundali Pro", "modern", "animated", "premium" or complains a page looks static/old. Includes ready-to-copy starter files.
---

# Animated landing — house style

Live reference: https://kundali.arvind.eu.org/

## Starter files (copy, then rebrand)
`template/` next to this file — open `template/index.html` directly in a browser to see it work:
- `index.html` — header with menu dropdown, hero (split headline, CTAs, 3D product card with floating chips, aurora + orbit), marquee, feature grid, pinned tour, 3D card fan, count-up stats, **Begin band at the end that expands into a form** (the only start point, with a mode switch), footer with a credit pill.
- `styles.css` — design tokens on `:root` (light/dark), glass, components, reveal states, responsive and reduced-motion rules.
- `motion.js` — dependency-free reveals (geometry check + timer fallback), word-split headings, count-ups, pinned-tour step driver, Begin band open/close, menu, scroll progress; GSAP + ScrollTrigger enhancements (hero parallax, card tilt, fan) when available.

To rebrand: change `--brand-1/2/3` (gradient stops), `--accent`, `--gold`, fonts, copy, icons and the product visual inside `.hv-card`. Keep the structure and motion rules.

## Visual language
- Dark base (`--bg` deep navy/plum) with 2–3 huge blurred colour **blobs** drifting slowly; optional rotating thin **orbit/ring** SVG behind the hero.
- **Glass** surfaces: translucent surface colour, `backdrop-filter: blur(14–18px)`, 1px light border, soft long shadow, subtle inner highlight; gradient hairline border on hero cards (mask trick in `.glow-border`).
- Big display headings (clamp 2.6–4.6rem, tight tracking `-.04em`), one phrase in **gradient text**.
- **Glowing gradient CTA** (`.btn.glow`): animated background-position on hover, coloured shadow, lift.
- Icon tiles: gradient squares with white stroke icons that **draw in** (stroke-dasharray) when revealed.
- Rounded 18–32px radii, generous section spacing (90px+), eyebrow labels in small caps with letter-spacing.

## Motion rules
- GSAP **3.12.5** + ScrollTrigger from cdnjs (`https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js`, `.../ScrollTrigger.min.js`), loaded with `defer`. Everything must still work if they fail to load.
- Reveal-on-scroll: fade + rise (28px) with stagger via `--d`; headings split into words that rise and un-blur (`.split`). Use the geometry check + `setInterval` fallback from `motion.js` — never rely on IntersectionObserver alone (it is throttled in background/hidden contexts).
- Scrubbed parallax on hero layers (blobs, orbit, chips, product card tilt) — desktop only via `gsap.matchMedia('(min-width: 901px)')`.
- **Pinned tour**: sticky visual column (`position: sticky`) + tall step cards; the step nearest the viewport centre sets `data-step` on the visual, which cross-fades panels via CSS.
- **3D card fan**: perspective container; cards go from stacked to fanned (`x`, `rotateY`, `z`) scrubbed by scroll.
- Marquee strip (CSS animation, duplicated track, edge mask), scroll-progress bar fixed at the top, count-up stats (with a timeout fallback so they always land on the final value).
- **CTA band → form (one place only)**: put exactly ONE Begin band, at the END of the landing (it replaces a separate final CTA). Every CTA (hero, header, footer) scrolls down to it and opens it. Never show two begin bands. The primary action lives in that band ("Your … at the moment you …" headline + glowing button). Clicking it (or any `[data-act="start"]`) expands the band (`grid-template-rows: 0fr → 1fr`) to reveal the form card, scrolls it to the top under the header and focuses the first field. Set `has-js` on `<html>` in an inline `<head>` script so the band starts closed without a flash; without JS the form is simply open.
- **Sibling primary flows share one card**: if the product has two main actions (e.g. create one chart vs. match two), put a segmented **mode switch** at the top of the form card and let the user choose; do not build a separate page for the second flow. Deep links (e.g. `#/compare`) just open the band in that mode.
- Secondary navigation (docs, API, other pages) goes into a header **menu button with a glass dropdown** and the footer — keep the header minimal (brand left, menu + tools right).
- Once the user has a result, hide the marketing hero/landing; show the card again only when they choose Edit or the other flow.

## Non-negotiables
- `prefers-reduced-motion: reduce` → no parallax/fan/marquee/blob animation, content shown immediately.
- Content visible with JS disabled (initial hidden states only under `.js-anim` / `.has-js`).
- No horizontal overflow at 360–390px; floating decorations hidden on small screens; 44px touch targets.
- Light and dark themes via tokens (`:root` + `prefers-color-scheme` + `[data-theme]`).
- Keep it fast: CSS for continuous loops, GSAP only for scroll-linked work, no heavy images by default.
- Bilingual sites: pair text as `<span class="l-en">…</span><span class="l-hi">…</span>` and toggle with `html[lang]`.

## Verifying in the Claude preview pane
The preview pane is often hidden, which pauses rendering: transitions, rAF, smooth scrolling and timers stall. When checking, inject `*{transition-duration:0s!important;animation-duration:0s!important}`, scroll with `scrollTo({top, behavior:'instant'})`, and call `dispatchEvent(new Event('resize'))` to run the reveal check. Real browsers are unaffected.
