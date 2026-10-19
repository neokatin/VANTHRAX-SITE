/**
 * Build-time prerendering.
 *
 * Renders every route to static HTML using the SSR bundle, so each page is
 * delivered as complete, indexable markup and then hydrated in the browser.
 * Also injects the Content-Security-Policy, font preloads, sitemap.xml.
 * Nothing here runs in production — the output in dist/ is fully static.
 */
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ssrDir = join(root, '.ssr');

const template = readFileSync(join(dist, 'index.html'), 'utf8');
const { render, ROUTES, NOT_FOUND, SITE } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href);

// Hash every inline executable script so the CSP can forbid all others.
const inlineHashes = [...template.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(
  ([, body]) => `'sha256-${createHash('sha256').update(body).digest('base64')}'`,
);

const csp = [
  "default-src 'self'",
  `script-src 'self' ${inlineHashes.join(' ')}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
  'upgrade-insecure-requests',
].join('; ');

// Preload the two Latin variable fonts used above the fold.
const assets = readdirSync(join(dist, 'assets'));
const preloadFonts = [/^inter-latin-wght-normal-.*\.woff2$/, /^space-grotesk-latin-wght-normal-.*\.woff2$/]
  .map((re) => assets.find((f) => re.test(f)))
  .filter(Boolean)
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`);

const pages = [...ROUTES, NOT_FOUND];
for (const route of pages) {
  const { html, head } = render(route);
  const document = template
    .replace(
      '<!--app-head-->',
      [`<meta http-equiv="Content-Security-Policy" content="${csp}" />`, head, ...preloadFonts].join('\n    '),
    )
    .replace('<!--app-html-->', html);
  const out = join(dist, route.file);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, document);
  console.log(`  prerendered ${route.path.padEnd(24)} → dist/${route.file}`);
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map((r) => `  <url><loc>${SITE.url}${r.path}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`;
writeFileSync(join(dist, 'sitemap.xml'), sitemap);
console.log('  wrote sitemap.xml');

rmSync(ssrDir, { recursive: true, force: true });
