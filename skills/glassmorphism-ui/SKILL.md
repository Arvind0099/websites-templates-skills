---
name: glassmorphism-ui
description: Glassmorphism style for web and app UI - frosted translucent glass panels (backdrop blur, semi-transparent fill, thin light border, inner highlight) floating over a colorful gradient or blurred blob background, including Apple-style "liquid glass" refinements. Use for dashboards, music/weather/finance widgets, login cards, hero sections, navbars, modals, or when the user asks for glassmorphism, frosted glass, blur cards, translucent UI, iOS/macOS-like glass, or liquid glass.
---

# Glassmorphism UI

Panels look like frosted glass: you see a blurred, colorful world through them. The effect only works if there is something colorful BEHIND the glass.


## Starter template
A complete working example lives next to this file in `template/index.html` (single HTML file, no build step). Read it first and copy its tokens, components and patterns, then rebrand the content for the user's project.

## 1. Background first (mandatory)
```css
body{background:#0e0a24;min-height:100vh}
.blobs{position:fixed;inset:0;z-index:-1;overflow:hidden}
.blobs i{position:absolute;border-radius:50%;filter:blur(60px);opacity:.85}
/* e.g. 3-4 blobs: #ff5fa2, #7c5cff, #20c5ff, #ffb84d at 30-50vw size, slowly drifting */
```
Or a vivid photo / mesh gradient. Plain white or flat dark backgrounds make glass invisible.

## 2. Glass recipe
```css
:root{--glass:rgba(255,255,255,.14);--glass-strong:rgba(255,255,255,.22);--edge:rgba(255,255,255,.35);
  --ink:#fff;--muted:rgba(255,255,255,.72)}
.glass{
  background:linear-gradient(135deg,rgba(255,255,255,.22),rgba(255,255,255,.06));
  backdrop-filter:blur(18px) saturate(160%);-webkit-backdrop-filter:blur(18px) saturate(160%);
  border:1px solid var(--edge);border-radius:24px;
  box-shadow:0 20px 50px rgba(10,0,40,.35), inset 0 1px 0 rgba(255,255,255,.45), inset 0 -1px 0 rgba(255,255,255,.08);
}
```
- Blur 12-30px. Fill alpha .08-.25 (dark backgrounds) or .35-.6 white (light backgrounds).
- 1px border lighter on top-left: use `border-image` or a gradient border via `background: ... padding-box, linear-gradient(135deg,#fff8,#fff1) border-box; border:1px solid transparent`.
- Inner top highlight (`inset 0 1px 0`) sells the "glass edge".
- Optional: subtle noise texture (SVG feTurbulence at 3-5% opacity) for realism.

## 3. Liquid glass refinements (Apple 2025 style)
- Stronger specular rim: `inset 0 0 0 1px rgba(255,255,255,.25), inset 0 8px 16px rgba(255,255,255,.18)`.
- Edge refraction illusion: a second pseudo-element with a radial white gradient near one corner.
- Capsule controls (fully round) floating over content; tint glass slightly with the content color.
- Cursor-follow light: radial highlight at `var(--mx) var(--my)` on hover.

## 4. Hierarchy
- Max 2 glass layers stacked (panel + chips inside with `--glass-strong`). Deeper nesting becomes mush.
- Primary buttons: solid gradient or bright white (not glass), so they stand out.
- Use 1 large hero glass card + small widget glass cards (weather, player, stats, avatars).

## 5. Accessibility (glass is risky)
- Text must be 4.5:1 against the WORST spot the background can show behind it. Increase fill alpha or add a darker tint layer if needed.
- Provide a fallback where `backdrop-filter` isn't supported:
  `@supports not (backdrop-filter:blur(1px)){.glass{background:rgba(30,20,70,.85)}}`
- Respect `prefers-reduced-transparency: reduce` (solid panels) and `prefers-reduced-motion` (stop blob drift).
- Visible focus rings (white 2px + offset).

## 6. Performance
- `backdrop-filter` is expensive: < 10-12 large glass elements per view, don't animate the blur radius, avoid huge full-screen glass on mobile.
- Animate blobs with `transform` only.

## 7. Don'ts
- No glass over a flat single color.
- No grey text on glass; use white/near-white (dark bg) or deep ink (light bg).
- Don't make everything glass - mix with solid elements for contrast.
- Don't use heavy drop shadows that look like paper cards.
