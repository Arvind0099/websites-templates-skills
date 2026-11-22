---
name: neumorphism-ui
description: Soft UI / neumorphism style for web and app interfaces - extruded and pressed elements made from the same color as the background using paired light and dark shadows, often mixed with a dark contrast panel and glossy icons (dashboards, mobile app screens, control panels, music players, smart-home UIs). Use when the user asks for neumorphism, neumorphic, soft UI, "soft shadows", embossed/extruded/pressed buttons, or a tactile clay-like pale interface.
---

# Neumorphism UI (Soft UI)

Build interfaces where every element looks pushed out of, or pressed into, one continuous surface. The surface color and element color are the same; depth comes only from two shadows.


## Starter template
A complete working example lives next to this file in `template/index.html` (single HTML file, no build step). Read it first and copy its tokens, components and patterns, then rebrand the content for the user's project.

## 1. Core recipe (copy these tokens)

```css
:root{
  --bg:#e6e8f0;            /* surface: pale cool grey / lavender. Never pure white */
  --hi:#ffffff;            /* light shadow (top-left) */
  --lo:#b8bdd0;            /* dark shadow (bottom-right): bg darkened ~18-22%, same hue */
  --text:#2c3045; --muted:#7c8199;
  --accent:#6c5ce7;        /* ONE saturated accent for state/active/focus */
  --dark:#20233a;          /* optional contrast panel (night mode card) */
  --r-lg:28px; --r-md:18px; --r-sm:12px;
  --raised: 8px 8px 18px var(--lo), -8px -8px 18px var(--hi);
  --raised-sm: 4px 4px 10px var(--lo), -4px -4px 10px var(--hi);
  --pressed: inset 6px 6px 12px var(--lo), inset -6px -6px 12px var(--hi);
  --pressed-sm: inset 3px 3px 6px var(--lo), inset -3px -3px 6px var(--hi);
}
body{background:var(--bg);color:var(--text)}
.raised{background:var(--bg);border-radius:var(--r-lg);box-shadow:var(--raised)}
.pressed{background:var(--bg);border-radius:var(--r-md);box-shadow:var(--pressed)}
```

Rules:
- Light source is always top-left. Light shadow negative offset, dark shadow positive offset. Never mix directions on one page.
- Shadow offset ~ 0.1x element size, blur ~ 2x offset. Small chips: 3-4px. Cards: 8-12px. Big panels: 14-20px.
- Backgrounds of child elements equal the parent background. Do not give cards a different fill.
- Large radii (16-32px). Sharp corners break the effect.
- Leave generous gaps (>= 2x shadow offset) or shadows overlap and look muddy.

## 2. States (most important for usability)
| State | Treatment |
|---|---|
| default button | `--raised-sm` |
| hover | slightly larger shadow, or accent-colored icon |
| active / pressed / selected | switch to `--pressed-sm` + accent text/icon |
| toggle on | pressed track + accent knob or accent fill |
| focus-visible | `outline:2px solid var(--accent); outline-offset:3px` (shadows alone are NOT a focus indicator) |
| disabled | no shadow, `--muted` text, opacity .6 |

Transition `box-shadow .2s ease, transform .1s`; add `transform:scale(.98)` on `:active`.

## 3. Component patterns
- **Inputs / search:** pressed well (`--pressed`), no border, placeholder in `--muted`.
- **Progress / sliders:** pressed track + raised or accent-filled thumb/fill.
- **Ring / gauge:** raised outer circle, pressed inner circle, accent `conic-gradient` arc between.
- **Icon tiles (app grid):** raised rounded squares with a colorful glossy icon inside (gradient + white highlight); label below in small muted text.
- **Sidebar nav:** items flat; active item pressed + accent icon.
- **Charts:** thin dark or accent bars inside a pressed panel; keep gridlines very light.
- **Dark contrast panel:** for a hero card or "night mode" screen use `--dark` with its own pair of shadows (`#2a2e4a` light / `#14162a` dark). A curved wave divider between a dark and light area (SVG path or large border-radius on an overlapping element) is a signature move.

## 4. Accessibility (non-negotiable)
Neumorphism's weakness is low contrast. Always:
- Text contrast >= 4.5:1 against `--bg` (`--text` above passes; do not use light grey body text).
- Indicate state with color/icon/text as well as shadow (pressed alone is too subtle).
- Visible focus outlines. Hit areas >= 44x44px.
- Respect `prefers-reduced-motion`.
- Use a real `<button>`, `<input type=checkbox role=switch>` etc., then style.

## 5. Don'ts
- No pure white `#fff` or pure black background.
- No high-saturation surface colors (shadows look dirty). Accent only for small elements.
- No borders around neumorphic elements (except focus).
- Don't nest more than 2 levels of raised/pressed.
- Don't use it for dense data tables or long forms; mix with flat sections instead.

## 6. Workflow
1. Pick `--bg` (cool grey, lavender, or warm stone), derive `--lo` by darkening same hue, `--hi` = lighter/white.
2. Lay out with CSS grid, big gaps.
3. Apply raised to containers, pressed to wells/inputs/selected items.
4. Add one accent + optional dark contrast panel and glossy icons for visual interest.
5. Check contrast and focus states, test at mobile width.

Single-file HTML with no libraries is the default output. Works the same with Tailwind (put shadows in `theme.extend.boxShadow`) or React.
