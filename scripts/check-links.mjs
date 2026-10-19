/**
 * Verifies that every internal link, asset reference and fragment in the
 * built site resolves. Runs as the final build step; fails the build if
 * anything is broken.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return htmlFiles(full);
    return name.endsWith('.html') ? [full] : [];
  });
}

const pages = new Map(htmlFiles(dist).map((f) => [f, readFileSync(f, 'utf8')]));
const ids = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

function resolveTarget(fromFile, path) {
  if (!path) return fromFile;
  const abs = path.startsWith('/') ? join(dist, path) : join(dirname(fromFile), path);
  if (path.endsWith('/')) return join(abs, 'index.html');
  if (existsSync(abs) && statSync(abs).isDirectory()) return join(abs, 'index.html');
  return abs;
}

const problems = [];
let checked = 0;
for (const [file, html] of pages) {
  for (const [, attr, raw] of html.matchAll(/\s(href|src|content)="([^"]*)"/g)) {
    if (attr === 'content' && !raw.startsWith('https://vanthrax.com/')) continue;
    let url = raw.replace(/^https:\/\/vanthrax\.com\/?/, '/');
    if (attr !== 'content' && /^(https?:|mailto:|tel:|data:)/.test(url)) continue;
    if (url === '') {
      problems.push(`${relative(dist, file)}: empty ${attr}`);
      continue;
    }
    checked++;
    const [path, hash] = url.split('#');
    const target = resolveTarget(file, path);
    if (!existsSync(target)) {
      problems.push(`${relative(dist, file)}: ${attr}="${raw}" → missing ${relative(dist, target)}`);
      continue;
    }
    if (hash && target.endsWith('.html')) {
      const targetHtml = pages.get(target) ?? readFileSync(target, 'utf8');
      if (!ids(targetHtml).has(hash)) {
        problems.push(`${relative(dist, file)}: ${attr}="${raw}" → no element with id="${hash}"`);
      }
    }
  }
}

if (problems.length) {
  console.error(`✖ ${problems.length} broken reference(s):\n  ` + problems.join('\n  '));
  process.exit(1);
}
console.log(`✓ ${checked} internal references across ${pages.size} pages resolve.`);
