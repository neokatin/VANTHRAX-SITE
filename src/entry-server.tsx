import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './App';
import { SITE } from './config/site';
import { NOT_FOUND, ROUTES, type Route } from './routes';

export { ROUTES, NOT_FOUND, SITE };

function escape(value: string) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function head(route: Route): string {
  const url = route.noindex ? SITE.url + '/' : SITE.url + route.path;
  const image = SITE.url + SITE.ogImage;
  const tags = [
    `<title>${escape(route.title)}</title>`,
    `<meta name="description" content="${escape(route.description)}" />`,
    route.noindex ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escape(SITE.name)}" />`,
    `<meta property="og:locale" content="${SITE.locale}" />`,
    `<meta property="og:title" content="${escape(route.title)}" />`,
    `<meta property="og:description" content="${escape(route.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escape(SITE.ogImageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escape(route.title)}" />`,
    `<meta name="twitter:description" content="${escape(route.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  ];
  if (route.isHome) {
    const org = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
      logo: `${SITE.url}/images/brand/vanthrax-logo-banner.webp`,
      slogan: SITE.tagline,
    };
    tags.push(`<script type="application/ld+json">${JSON.stringify(org)}</script>`);
  }
  if (route.name) {
    const trail = [{ name: 'Home', path: '/' }, ...(route.parents ?? []), { name: route.name, path: route.path }];
    const breadcrumbs = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: trail.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        item: SITE.url + c.path,
      })),
    };
    tags.push(`<script type="application/ld+json">${JSON.stringify(breadcrumbs).replace(/</g, '\\u003c')}</script>`);
  }
  return tags.join('\n    ');
}

export function render(route: Route) {
  const html = renderToString(
    <StrictMode>
      <App route={route} />
    </StrictMode>,
  );
  return { html, head: head(route) };
}
