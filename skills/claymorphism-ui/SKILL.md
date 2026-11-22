---
name: claymorphism-ui
description: Claymorphism style for web and app UI - puffy, rounded, soft-colored elements that look like inflated clay or plasticine, made with a big outer drop shadow plus two inner shadows (light top-left, dark bottom-right), pastel colors and playful rounded type. Use for friendly apps, kids/education, fintech for consumers, onboarding, pricing cards, playful landing pages, or when the user asks for claymorphism, clay UI, puffy/inflated/3D-soft buttons, or a cute playful pastel look.
---

# Claymorphism UI

Elements look like soft colored clay: thick, rounded, slightly glossy, floating above a light background. Unlike neumorphism, clay elements have their OWN color (not the background color) and cast a real shadow.


## Starter template
A complete working example lives next to this file in `template/index.html` (single HTML file, no build step). Read it first and copy its tokens, components and patterns, then rebrand the content for the user's project.

## 1. Core recipe
```css
:root{
  --bg:#f4efff;                                   /* very light tint, never pure white */
  --ink:#2b2350; --muted:#6d6690;
  --pink:#ffb3d1; --peach:#ffcfa8; --mint:#b8f0d8; --sky:#b9dcff; --lilac:#d7c4ff; --lemon:#fff0a8;
  --r:32px;                                       /* very round */
}
.clay{
  border-radius:var(--r);
  background:var(--c,var(--lilac));
  box-shadow:
    18px 24px 40px rgba(60,40,120,.18),           /* 1. outer drop shadow (floating) */
    inset -10px -10px 20px rgba(0,0,0,.10),        /* 2. inner shade bottom-right (volume) */
    inset 10px 10px 20px rgba(255,255,255,.65);    /* 3. inner highlight top-left (puff) */
}
```
Rules:
- All three shadows, always. Outer shadow is larger and softer than neumorphism (offset 12-24px, blur 30-50px, tinted with the brand hue, not grey).
- Radius 24-48px on cards, fully round (`999px`) on buttons/chips. No sharp corners anywhere.
- Each element gets its own pastel fill; 3-5 pastels per screen max, plus one deeper accent (e.g. `#7c5cff`) for primary actions.
- Text is dark ink on pastels (check 4.5:1); avoid white text on pastels.
- Rounded, chunky typography (Nunito, Baloo 2, Fredoka, Poppins semibold+). Big headings, 700-800 weight.

## 2. Interaction states
| State | Treatment |
|---|---|
| hover | lift: `translateY(-4px)` + larger outer shadow |
| active/pressed | `scale(.96)`, outer shadow smaller, inner shadows stronger (squish) |
| selected | deeper fill or accent ring `0 0 0 4px #fff, 0 0 0 7px var(--accent)` |
| focus-visible | same accent ring (must be visible) |
| disabled | desaturate, opacity .55, no lift |
Use springy easing: `transition: transform .35s cubic-bezier(.34,1.56,.64,1), box-shadow .35s`.

## 3. Signature pieces
- **Blob / pill shapes** and 3D-looking clay icons: a circle or rounded square with its own clay shadow and a small white gloss ellipse (`filter:blur(2px)`, opacity .7) top-left.
- **Clay illustrations:** stack simple shapes (spheres, capsules, rounded cubes) each with the clay recipe; works in pure CSS or as images from 3D clay icon packs.
- **Floating decorations:** a few small clay spheres/stars around the hero, gently bobbing.
- **Chunky inputs:** pill inputs with an inset-only version (`inset 6px 6px 12px rgba(0,0,0,.08), inset -6px -6px 12px #fff`) on white.
- **Progress / toggles:** thick pill track, round clay knob that squishes on press.

## 4. Layout
- Generous padding (24-40px in cards), big gaps (24px+) so shadows breathe.
- Light background with 1-2 huge blurred pastel blobs behind content.
- Works great for pricing trios (middle card bigger + accent), onboarding steps, app dashboards for consumers, mobile tab bars.

## 5. Accessibility & performance
- Contrast check every pastel + ink pair.
- Hit areas >= 44px; clay buttons are naturally big - keep them.
- `prefers-reduced-motion`: remove bobbing and springy scale.
- Multiple inset+outer shadows are cheap; avoid animating `box-shadow` on 50+ elements at once (animate `transform` instead).

## 6. Don'ts
- Don't use the background color as the element color (that's neumorphism).
- Don't use grey shadows; tint them with the palette hue.
- Don't mix with sharp flat UI or thin outline icons.
- Don't overload: one clay layer of depth, no clay inside clay inside clay.
