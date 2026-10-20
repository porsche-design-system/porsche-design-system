'use client';

import { PTabsBar } from '@porsche-design-system/components-react/ssr';
import { usePathname } from 'next/navigation';
import { DocsLink } from '@/components/common/DocsLink';
import type { DocsHref } from '@/links';
import { getPath } from '@/sitemap';
import { getPathnameRoutes } from '@/utils/pathname';

/**
 * The tabs of the current page, e.g. Configurator, Examples, Usage, Accessibility and API of a component, rendered by
 * the `(main)` layout above every page. Everything follows from the pathname: whether the page has tabs, and which one
 * is active. A tab is a link, so following it changes the pathname and with it the active tab.
 *
 * Categories and pages with tabs have no content of their own; their `page.tsx` redirects to where they lead.
 */
export default function Tabs() {
  const {
    keys: [categoryKey, pageKey],
    page,
    tab,
  } = getPathnameRoutes(usePathname() ?? '');

  // Pages without tabs, and pages outside the sitemap like `/license`, show no tabs
  if (!page?.tabs || !tab) {
    return null;
  }

  return (
    <nav aria-label="Content navigation" id="content-navigation">
      <PTabsBar activeTabIndex={Object.values(page.tabs).indexOf(tab)} background="surface">
        {Object.entries(page.tabs).map(([tabKey, { name }]) => {
          const path = getPath(categoryKey, pageKey, tabKey);
          return (
            <DocsLink key={path} href={path as DocsHref}>
              {name}
            </DocsLink>
          );
        })}
      </PTabsBar>
    </nav>
  );
}
