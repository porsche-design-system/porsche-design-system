'use client';

import { PTabsBar, type TabsBarUpdateEventDetail } from '@porsche-design-system/components-react/ssr';
import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';
import { getLandingRoute } from '@/links';
import type { Route } from '@/sitemap';
import { getPathnameRoutes } from '@/utils/pathname';

export default function Tabs() {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const onUpdate = (e: CustomEvent<TabsBarUpdateEventDetail>) => {
    setTabIndex(e.detail.activeTabIndex);
  };
  const pathname = usePathname();

  const tabs = useMemo(() => {
    if (pathname) {
      const { category, page, tab } = getPathnameRoutes(pathname);

      // A category or a page with tabs has no content of its own
      if ((!page && category?.subPaths) || (!tab && page?.subPaths)) {
        redirect(getLandingRoute((page ?? category) as Route).path);
      }

      if (tab && page?.subPaths) {
        setTabIndex(Object.values(page.subPaths).indexOf(tab));
        return page.subPaths;
      }
    }
  }, [pathname]);

  if (!tabs) {
    return null;
  }

  return (
    <nav aria-label="Content navigation" id="content-navigation">
      <PTabsBar activeTabIndex={tabIndex} background="surface" onUpdate={onUpdate}>
        {Object.entries(tabs).map(([_, route]) => (
          <Link key={route.path} href={route.path as string}>
            {route.name}
          </Link>
        ))}
      </PTabsBar>
    </nav>
  );
}
