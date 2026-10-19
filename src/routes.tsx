import type { ReactNode } from 'react';
import { LEGAL_DOCUMENTS } from './content/legal';
import { PRODUCTS } from './content/products';
import { SITE, type NavKey } from './config/site';
import { CompanyPage } from './pages/CompanyPage';
import { ContactPage } from './pages/ContactPage';
import { GovernmentEnterprisePage } from './pages/GovernmentEnterprisePage';
import { HomePage } from './pages/HomePage';
import { LegalPage } from './pages/LegalPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductPage } from './pages/products/ProductPage';
import { ProductsIndexPage } from './pages/products/ProductsIndexPage';
import { SitemapPage } from './pages/SitemapPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { TechnologyPage } from './pages/TechnologyPage';

export interface Route {
  /** Canonical path, always with a trailing slash (except the 404 document). */
  path: string;
  /** File written by the prerenderer, relative to dist/. */
  file: string;
  title: string;
  description: string;
  /** Primary navigation item to mark as current. */
  active?: NavKey;
  /** Ancestors for breadcrumb structured data (Home is implied). */
  parents?: { name: string; path: string }[];
  /** Short name used in breadcrumb structured data. */
  name?: string;
  isHome?: boolean;
  noindex?: boolean;
  render: () => ReactNode;
}

const page = (path: string, rest: Omit<Route, 'path' | 'file'>): Route => ({
  path,
  file: `${path.slice(1)}index.html`,
  ...rest,
});

const products = PRODUCTS.map((p) =>
  page(`/products/${p.id}/`, {
    title: `${p.code} — ${p.name} | ${SITE.name}`,
    description: p.summary,
    active: 'products',
    name: p.code,
    parents: [{ name: 'Products', path: '/products/' }],
    render: () => <ProductPage product={p} />,
  }),
);

const legal = Object.values(LEGAL_DOCUMENTS).map((doc) =>
  page(`/legal/${doc.slug}/`, {
    title: `${doc.title} — ${SITE.name}`,
    description: doc.description,
    name: doc.title,
    render: () => <LegalPage doc={doc} />,
  }),
);

export const ROUTES: Route[] = [
  page('/', {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    isHome: true,
    render: () => <HomePage />,
  }),
  page('/products/', {
    title: `Products — ${SITE.name}`,
    description:
      'VSC, VCP and EVSC: hardware security, endpoint protection and external trust anchors built on one architecture.',
    active: 'products',
    name: 'Products',
    render: () => <ProductsIndexPage />,
  }),
  ...products,
  page('/solutions/', {
    title: `Solutions — Critical Infrastructure | ${SITE.name}`,
    description:
      'How VANTHRAX protects healthcare, energy, telecommunications, finance, industrial, transportation and government systems.',
    active: 'solutions',
    name: 'Solutions',
    render: () => <SolutionsPage />,
  }),
  page('/government-enterprise/', {
    title: `Government & Enterprise — ${SITE.name}`,
    description: 'How VANTHRAX works with governments and enterprises, from confidential briefing to continuous defense.',
    active: 'solutions',
    name: 'Government & Enterprise',
    parents: [{ name: 'Solutions', path: '/solutions/' }],
    render: () => <GovernmentEnterprisePage />,
  }),
  page('/technology/', {
    title: `Technology — ${SITE.name}`,
    description: 'The VANTHRAX five-layer architecture: hardware integrity, endpoint defense, network protection, threat intelligence and infrastructure resilience.',
    active: 'technology',
    name: 'Technology',
    render: () => <TechnologyPage />,
  }),
  page('/company/', {
    title: `Company — ${SITE.name}`,
    description: 'The mission, principles and leadership of VANTHRAX Systems.',
    active: 'company',
    name: 'Company',
    render: () => <CompanyPage />,
  }),
  page('/contact/', {
    title: `Contact — ${SITE.name}`,
    description: 'Enterprise inquiries, product information, partnerships and responsible disclosure.',
    active: 'contact',
    name: 'Contact',
    render: () => <ContactPage />,
  }),
  ...legal,
  page('/sitemap/', {
    title: `Sitemap — ${SITE.name}`,
    description: 'Every page on vanthrax.com.',
    name: 'Sitemap',
    // Read at render time, after ROUTES is fully defined.
    render: () => <SitemapPage routes={ROUTES} />,
  }),
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
