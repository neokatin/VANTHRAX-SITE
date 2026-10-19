import { LAYERS } from '../content/layers';
import { SECTORS } from '../content/sectors';
import { PageHeader } from '../components/ui/PageHeader';
import type { Route } from '../routes';
import styles from './SitemapPage.module.css';

interface Entry {
  name: string;
  href: string;
  description?: string;
  /** Sub-sections within the page. */
  children?: { name: string; href: string }[];
}

interface Group {
  title: string;
  entries: Entry[];
}

const entry = (route: Route, children?: Entry['children']): Entry => ({
  name: route.name ?? 'Home',
  href: route.path,
  description: route.description,
  children,
});

/** Builds the sitemap from the route table so it can never drift from the site. */
function buildGroups(routes: Route[]): Group[] {
  const at = (path: string) => routes.find((r) => r.path === path)!;
  const under = (prefix: string) => routes.filter((r) => r.path.startsWith(prefix));

  return [
    {
      title: 'VANTHRAX',
      entries: [entry(at('/')), entry(at('/company/')), entry(at('/contact/'))],
    },
    {
      title: 'Products',
      entries: under('/products/').map((r) => entry(r)),
    },
    {
      title: 'Solutions',
      entries: [
        entry(
          at('/solutions/'),
          SECTORS.map((s) => ({ name: s.name, href: `/solutions/#${s.id}` })),
        ),
        entry(at('/government-enterprise/')),
      ],
    },
    {
      title: 'Technology',
      entries: [
        entry(at('/technology/'), [
          ...LAYERS.map((l, i) => ({ name: `L${i + 1} — ${l.name}`, href: `/technology/#layer-${l.id}` })),
          { name: 'Threat intelligence demonstration', href: '/technology/#intelligence' },
        ]),
      ],
    },
    {
      title: 'Legal',
      entries: [
        ...under('/legal/').map((r) => entry(r)),
        {
          name: 'XML sitemap',
          href: '/sitemap.xml',
          description: 'Machine-readable list of every page, for search engines.',
        },
      ],
    },
  ];
}

export function SitemapPage({ routes }: { routes: Route[] }) {
  const groups = buildGroups(routes);
  const total = routes.length;

  return (
    <>
      <PageHeader
        eyebrow="Sitemap"
        current="Sitemap"
        title={
          <>
            Sitemap.
          </>
        }
        intro={<p>Every page on vanthrax.com, in one place. {total} pages in total.</p>}
      />

      <div className={`container ${styles.groups}`}>
        {groups.map((group, gi) => (
          <section key={group.title} className={styles.group} aria-labelledby={`sm-${gi}`}>
            <h2 id={`sm-${gi}`} className={`mono ${styles.groupTitle}`}>
              <span>0{gi + 1}</span>
              {group.title}
            </h2>
            <ul role="list" className={styles.entries}>
              {group.entries.map((e) => (
                <li key={e.href} className={styles.entry}>
                  <a href={e.href} className={styles.link}>
                    {e.name}
                  </a>
                  {e.description && <p className={styles.description}>{e.description}</p>}
                  {e.children && (
                    <ul role="list" className={styles.children}>
                      {e.children.map((c) => (
                        <li key={c.href}>
                          <a href={c.href}>{c.name}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
