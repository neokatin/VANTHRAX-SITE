import type { ReactNode } from 'react';
import { LEGAL_DOCUMENTS } from './content/legal';
import { SITE } from './config/site';
import { HomePage } from './pages/HomePage';
import { LegalPage } from './pages/LegalPage';
import { NotFoundPage } from './pages/NotFoundPage';

export interface Route {
  /** Canonical path, always with a trailing slash (except the 404 document). */
  path: string;
  /** File written by the prerenderer, relative to dist/. */
  file: string;
  title: string;
  description: string;
  isHome?: boolean;
  noindex?: boolean;
  render: () => ReactNode;
}

const legal = Object.values(LEGAL_DOCUMENTS).map<Route>((doc) => ({
  path: `/legal/${doc.slug}/`,
  file: `legal/${doc.slug}/index.html`,
  title: `${doc.title} — ${SITE.name}`,
  description: doc.description,
  render: () => <LegalPage doc={doc} />,
}));

export const ROUTES: Route[] = [
  {
    path: '/',
    file: 'index.html',
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    isHome: true,
    render: () => <HomePage />,
  },
  ...legal,
];

export const NOT_FOUND: Route = {
  path: '/404.html',
  file: '404.html',
  title: `Page not found — ${SITE.name}`,
  description: 'The requested page could not be found.',
  noindex: true,
  render: () => <NotFoundPage />,
};

export function resolveRoute(pathname: string): Route {
  const normalized = pathname.replace(/index\.html$/, '').replace(/\/?$/, '/');
  return ROUTES.find((r) => r.path === normalized) ?? NOT_FOUND;
}
