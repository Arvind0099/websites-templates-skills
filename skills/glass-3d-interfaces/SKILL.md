---
name: glass-3d-interfaces
description: 3D interface visual style - deep blue / violet glowing backgrounds with glossy, translucent 3D glass objects and icons (wallets, cameras, shields, locks, browser windows) on onboarding screens, feature cards and hero carousels. Covers three ways to get the 3D objects (pure CSS layered "clay-glass" icons, real-time Three.js glass with transmission, or 3D icon assets/Spline) plus the surrounding glass cards, glow and carousel. Use when the user asks for 3D UI, 3D icons, glossy/glass 3D illustrations, futuristic onboarding screens, security/fintech feature cards with 3D objects, or "3D interfaces".
---

# 3D Glass Interfaces

The look: a dark saturated stage (navy -> electric blue -> violet), soft light glows, and a glossy translucent 3D object as the hero of each card. Text is small and secondary; the object carries the message.


## Starter template
A complete working example lives next to this file in `template/index.html` (single HTML file, no build step). Read it first and copy its tokens, components and patterns, then rebrand the content for the user's project.

## 1. Stage tokens
```css
:root{
  --deep:#070b2e; --navy:#0c1a6b; --blue:#2447ff; --electric:#3d7bff;
  --violet:#7a3cff; --pink:#ff4fd8; --cyan:#58e1ff;
  --glass:rgba(255,255,255,.08); --glass-line:rgba(255,255,255,.22);
  --text:#eef1ff; --muted:#a9b3e6;
}
body{background:radial-gradient(120% 80% at 50% 0%,#1d2cff 0%,#0c1a6b 35%,#070b2e 75%);color:var(--text)}
.card{background:linear-gradient(160deg,rgba(80,110,255,.35),rgba(20,30,120,.25));
  border:1px solid var(--glass-line);border-radius:22px;backdrop-filter:blur(14px);
  box-shadow:0 30px 80px rgba(10,20,120,.5), inset 0 1px 0 rgba(255,255,255,.25)}
```
- Always place a blurred glow blob (`filter:blur(60-120px)`, blue/violet/pink) behind the object.
- Object sits in the top 60% of the card; title (14-18px, semi-bold) + 1-2 lines muted text + pager dots below.
- Cards have thin light borders and an inner top highlight (`inset 0 1px 0`).

## 2. Getting the 3D objects - pick one
**A. Pure CSS / SVG "glass" icons (default, zero dependencies, crisp).** Build objects from layered rounded shapes:
- Body: `linear-gradient(145deg, light-tint, mid-blue 45%, deep-blue)` + `border-radius` + big soft `box-shadow` underneath.
- Thickness: a second copy offset 6-10px down/right, darker, behind (fake extrusion).
- Gloss: a white ellipse at top-left with `opacity .5-.8` and `filter:blur(2-6px)`; a thin `inset 0 2px 0 rgba(255,255,255,.6)` rim.
- Glass parts: `rgba(255,255,255,.15)` fill + `backdrop-filter:blur(6px)` + 1px white border at 40%.
- Accent parts in pink/violet/cyan gradients (lens ring, lock shackle, toggle).
- Tilt the group with `transform: perspective(800px) rotateX(10deg) rotateY(-18deg)` and float it (`@keyframes` translateY 8-12px, 4-6s ease-in-out infinite).
- Mouse parallax: rotate a few degrees toward the cursor.

**B. Real-time 3D with Three.js** when the user wants true rotation/lighting:
- `MeshPhysicalMaterial({ transmission:1, thickness:.6, roughness:.08, ior:1.4, iridescence:.4, color:'#7aa2ff' })` for glass; `clearcoat:1` on solid parts.
- Environment: `RoomEnvironment` via PMREM; add 2-3 colored point lights (blue, violet, pink) for rim light.
- Compose objects from `RoundedBoxGeometry`, `TorusGeometry`, `CylinderGeometry`, `ExtrudeGeometry` (from SVG/Shape with bevel) for icons.
- Transparent canvas (`alpha:true`) laid over the CSS card; slow auto-rotate + pointer tilt. Pause rendering when off-screen.
- See the `threejs-webgl` and `react-three-fiber` skills for setup.

**C. Asset route** for the most polished result: use 3D icon packs (PNG/GLB with transparent background) or a Spline scene (`spline-interactive` skill). Keep assets <= 300 KB each, `loading="lazy"`, WebP/AVIF for images.

## 3. Layout patterns
- **Onboarding trio:** 3 tall phone-ratio cards (aspect 9/16), the middle one raised 30-40px; each = object + title + text + dots.
- **Center-focus carousel:** active card large and bright, neighbors scaled .8, dimmed and blurred at the edges; arrows/drag/scroll-snap to move; the active object animates in (scale .8->1, rotate -10deg->0).
- **Feature hero:** one huge object on the right, headline left, glow behind object, small floating glass chips (badges, sparkles, a DNA/ribbon squiggle) around it.

## 4. Motion
- Float, slow parallax, gentle glow pulse. No fast spins.
- Card hover: lift 6px + brighten border + object rotates a few degrees.
- Honor `prefers-reduced-motion` (stop floating and carousel autoplay).

## 5. Accessibility & performance
- Text on the dark stage must reach 4.5:1 (use `--text`/`--muted` above, never mid-blue text).
- Objects are decorative: `aria-hidden="true"`; card titles carry meaning.
- `backdrop-filter` is costly: limit to < 10 large blurred elements per view.
- One WebGL canvas per page max; prefer CSS icons for lists of many items.

## 6. Don'ts
- No flat outline icons in the hero spot (it kills the style).
- Don't use more than 3 accent hues per screen.
- Don't make text the focal point; keep copy short.
- Don't put 3D objects on light backgrounds without a dark glow stage behind them.
