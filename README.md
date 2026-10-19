# VANTHRAX Systems — vanthrax.com

Official website of VANTHRAX Systems. A static, prerendered React site deployed
to GitHub Pages at **https://vanthrax.com**.

## Stack

| Concern | Choice | Why |
| --- | --- | --- |
| UI | React 19 + TypeScript | Component architecture for a growing multi-page site |
| Build | Vite | Fast dev server, optimized static output |
| Rendering | Build-time prerender (`scripts/prerender.mjs`) | Every page ships as complete HTML (SEO, no-JS readable, fast first paint), then hydrates. No server at runtime. |
| Styling | CSS Modules + design tokens (`src/styles/tokens.css`) | Scoped styles, one source of truth for color, type, space, motion |
| Visuals | Hand-written Canvas 2D and SVG | Original, light (no 3D library), pause off-screen, honor reduced motion |
| Icons | `lucide-react` | Tree-shaken, only used icons ship |
| Fonts | Self-hosted Inter, Space Grotesk, IBM Plex Mono (`@fontsource`) | No third-party requests; strict CSP |

## Commands

```bash
npm ci            # install exact dependency versions
npm run dev       # local dev server at http://localhost:5173
npm run build     # typecheck → client build → SSR build → prerender → link check
npm run preview   # serve dist/ at http://localhost:4173
```

`npm run build` fails if TypeScript errors exist or if any internal link,
asset reference or `#fragment` in the generated HTML does not resolve.

## Project structure

```
src/
  config/site.ts        Site metadata, navigation, contact channels
  content/              Copy and data (products, sectors, layers, legal, threat vocabulary)
  styles/               Tokens, fonts, base/global styles
  components/
    brand/              Emblem + logo
    layout/             Header (incl. mobile menu), footer, layout shell
    ui/                 Button, section header, product brief dialog
    effects/            Pointer reticle
    visuals/            Hero lattice (canvas), threat map (canvas), layer stack,
                        product drawings, data-hall drawing (SVG)
  sections/             Home page sections (Hero, Products, Solutions, …)
  pages/                Home, legal pages, 404
  routes.tsx            Route table: path, output file, title, description
  entry-client.tsx      Hydration entry
  entry-server.tsx      Prerender entry: HTML + per-page <head> (SEO, Open Graph, JSON-LD)
scripts/
  prerender.mjs         Writes dist/**/index.html, CSP, font preloads, sitemap.xml
  check-links.mjs       Fails the build on any broken internal reference
public/                 Copied verbatim: CNAME, icons, robots.txt, manifest, images/
docs/IMAGE-ASSETS.md    Photography specifications and how to add images
```

## Common updates

- **Copy:** edit files in `src/content/` — components read from there.
- **Contact channels:** set the `email` field for each channel in
  `src/config/site.ts`. Until at least one is set, the Contact section shows an
  explicit "channel opening soon" state; nothing pretends to submit.
- **Images:** drop files at the paths in `docs/IMAGE-ASSETS.md` and rebuild.
  They replace the illustrations automatically.
- **New page:** add a page component in `src/pages/` and an entry in
  `src/routes.tsx`; it is prerendered and added to the sitemap automatically.

## Deployment (GitHub Pages)

The workflow in `.github/workflows/deploy.yml` builds on every pull request
(as a check) and builds **and deploys** on every push to `main`.

One-time repository setup:

1. **Settings → Pages → Build and deployment → Source:** select **GitHub Actions**.
2. **Settings → Pages → Custom domain:** `vanthrax.com` (already configured; DNS is unchanged).
3. Enable **Enforce HTTPS** once the certificate is issued.

`public/CNAME` is included in the build output. The root-level `CNAME` is kept
for compatibility with the previous branch-based Pages setup and can be removed
once Pages deploys from Actions.

To publish an update: merge to `main`. The site is live in about a minute.

## Quality and security notes

- Content-Security-Policy (via `<meta>`): `default-src 'self'`, scripts limited
  to same-origin files plus one hash-pinned inline boot script, no plugins,
  no form submission, no third-party origins.
- No cookies, analytics, trackers or external requests.
- Accessibility target: WCAG 2.2 AA — semantic landmarks, skip link, full
  keyboard support, visible focus, reduced-motion support, pause controls for
  every continuous animation, AA contrast tokens.
- Animations pause when off-screen or when the tab is hidden.
- Every simulated visualization is labelled as such in the interface.

## License

Source code: MIT (see `LICENSE`). The VANTHRAX name, emblem and brand imagery
are not covered by the code license.
