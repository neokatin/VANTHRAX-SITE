# Image assets

The site is designed around five photographic assets that are produced
separately. **None are required to build or deploy.** Until a file exists, the
site shows an original illustration in its place, so there are never broken
image links.

## How to add an image

1. Export the image at the dimensions below (WebP, quality ~80).
2. Save it at the exact path listed.
3. Rebuild (`npm run build`; restart `npm run dev` if running). The build
   detects the file automatically and swaps it in — no code changes needed.

Paths and alt text are defined in `src/lib/images.ts`.

| Asset | Path | Size (px) | Replaces |
| --- | --- | --- | --- |
| Corporate hero background | `public/images/hero/vanthrax-hero-background.webp` | 2560 × 1440 | Grid backdrop behind the animated hero lattice |
| VSC Security Chip render | `public/images/products/vanthrax-vsc-security-chip.webp` | 1600 × 1200 (4:3) | VSC isometric drawing on the product card |
| EVSC external device render | `public/images/products/vanthrax-evsc-external-module.webp` | 1600 × 1200 (4:3) | EVSC isometric drawing on the product card |
| Data center imagery | `public/images/infrastructure/vanthrax-data-center.webp` | 2400 × 1029 (21:9) | Perspective data-hall drawing in Solutions |
| CEO portrait — Vexy Razor | `public/images/leadership/vexy-razor-portrait.webp` | 1200 × 1500 (4:5) | Emblem placeholder in Executive leadership |

## Art direction

All imagery should sit naturally on the `#08090B` background.

- **Overall:** low-key, near-black environments; cool neutral greys; red
  (`#B51224` / `#E02B3F`) only as small, motivated light sources. No neon, no
  lens flares, no stock "hacker" imagery, no visible third-party branding.
- **Hero background:** abstract and architectural (e.g. a dark structural
  interior or macro hardware surface). Keep the left 45% quiet — the headline
  sits there — and the right side dark enough for the animated lattice to read
  on top. It is displayed at 45% opacity.
- **VSC render:** the chip on a dark surface, three-quarter view, crisp edge
  light, small red illumination at the core. Centered with generous margin;
  the top ~12% carries overlaid labels.
- **EVSC render:** the external module, same lighting language as VSC, with
  its connector visible.
- **Data center:** a symmetric server aisle or secure operations hall, low
  light, receding perspective. A dark gradient is applied to the bottom 40%.
- **Portrait:** chest-up, dark backdrop, directional key light, neutral
  expression, subject centered with headroom. Displayed at 4:5, slightly
  desaturated.

## Brand assets already in place

- `public/images/brand/vanthrax-logo-banner.webp` — official lockup (footer, structured data)
- `public/images/social/vanthrax-og.jpg` — 1200 × 630 Open Graph / social preview, generated from the lockup
- `public/favicon.svg`, `public/apple-touch-icon.png`, `public/icon-512.png` — emblem icons
