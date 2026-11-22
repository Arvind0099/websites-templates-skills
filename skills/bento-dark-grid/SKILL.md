---
name: bento-dark-grid
description: Bento grid layouts - modular cards of different sizes arranged on a CSS grid - with emphasis on the premium dark style seen on developer/AI/SaaS product pages and analytics dashboards (glowing gradient borders, big stat numbers, code snippets, mini charts, integration logos, spotlight hover). Also covers light bento. Use when the user asks for a bento grid, bento box layout, feature grid like Apple/Linear/Vercel product pages, stats dashboard made of tiles, or "cards of different sizes".
---

# Bento Grid (dark premium)

A bento is a single container split into tiles of different sizes. Each tile states ONE idea: a number, a feature, a visual, a quote, a code sample. The grid itself is the composition.


## Starter template
A complete working example lives next to this file in `template/index.html` (single HTML file, no build step). Read it first and copy its tokens, components and patterns, then rebrand the content for the user's project.

## 1. Grid structure (always CSS Grid)
```css
.bento{display:grid;gap:14px;grid-template-columns:repeat(6,1fr);grid-auto-rows:120px;
  max-width:1200px;margin:auto;padding:14px;border-radius:32px;background:#0b0b10}
.tile{grid-column:span 2;grid-row:span 2}       /* default 2x2 */
.w3{grid-column:span 3}.w4{grid-column:span 4}.w6{grid-column:span 6}
.h1{grid-row:span 1}.h3{grid-row:span 3}.h4{grid-row:span 4}
@media(max-width:900px){.bento{grid-template-columns:repeat(2,1fr)}
  .tile,.w3,.w4,.w6{grid-column:span 2}.h3,.h4{grid-row:span 2}}
```
- Use `grid-template-areas` for a fixed hero composition; use spans for flexible ones.
- 5-9 tiles per bento. One clearly dominant tile (largest, top-left or center), 1-2 medium, rest small.
- Equal gaps everywhere (12-20px). Outer container radius = tile radius + gap.
- Never use flexbox for the bento itself.

## 2. Dark tile recipe
```css
:root{--bg:#07070b;--tile:#111118;--tile2:#16161f;--line:rgba(255,255,255,.07);
  --text:#f3f3f7;--muted:#8b8ba0;--violet:#8b5cf6;--teal:#2dd4bf;--green:#22c55e}
.tile{position:relative;background:linear-gradient(180deg,var(--tile2),var(--tile));
  border:1px solid var(--line);border-radius:22px;padding:22px;overflow:hidden}
/* gradient border on featured tile */
.feat{border:1px solid transparent;background:
  linear-gradient(var(--tile),var(--tile)) padding-box,
  linear-gradient(140deg,rgba(139,92,246,.9),rgba(45,212,191,.2) 40%,transparent 70%) border-box}
/* cursor spotlight */
.tile::before{content:"";position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity .3s;
  background:radial-gradient(300px circle at var(--mx) var(--my),rgba(139,92,246,.15),transparent 60%)}
.tile:hover::before{opacity:1}
```
JS: on `pointermove` set `--mx/--my` on each tile relative to its rect.

Atmosphere: a big blurred teal or violet glow behind the whole bento, very faint grid/dot pattern or noise inside tiles, 1px top highlight `inset 0 1px 0 rgba(255,255,255,.06)`.

## 3. Tile types (mix them)
| Type | Content |
|---|---|
| Stat | small label (muted, 13px) + huge number (40-64px, tabular-nums, semibold) + delta chip |
| Feature | icon in glass square + title + one line |
| Code | monospace snippet with line numbers, syntax colors, fake cursor |
| Chart | sparkline / bar chart / line in SVG, accent stroke + gradient area |
| Visual | 3D object, product shot, illustration bleeding off the edge |
| Logos | row of integration icons in rounded squares |
| Pricing / CTA | price + button, gradient border |
| List / activity | 3-5 rows with status dots, one highlighted |
| Pipeline | vertical line with branching nodes |

## 4. Motion
- Tiles fade/slide up with a 60-80ms stagger when the bento enters the viewport (IntersectionObserver or GSAP).
- Count numbers up once. Animate chart strokes drawing in.
- Hover: spotlight + border brightens + 2-4px lift. Keep it subtle.
- Respect `prefers-reduced-motion`.

## 5. Light variant
`--bg:#f5f5f7; --tile:#fff; --line:#e7e7ec`, shadows `0 1px 2px rgba(0,0,0,.04), 0 8px 24px rgba(0,0,0,.05)`, accents stay the same.

## 6. Accessibility
- Reading order in the DOM must make sense when stacked on mobile (place the dominant tile first).
- Numbers need text labels; charts need an `aria-label` summary.
- Muted text >= 4.5:1 (`#8b8ba0` on `#111118` passes; do not go darker).
- Tiles that link must be real `<a>` with visible focus ring.

## 7. Don'ts
- Don't give every tile the same size (that's just a card grid).
- Don't put more than one idea or more than ~25 words in a small tile.
- Don't use more than 2 accent colors.
- Don't let content overflow; design each tile for its span and test at 900px and 400px widths.
