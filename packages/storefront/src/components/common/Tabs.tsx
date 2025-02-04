'use client';

import { getPathnameRoutes } from '@/utils/pathname';
import { PTabsBar, type TabsBarUpdateEventDetail } from '@porsche-design-system/components-react/ssr';
import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';

export default function Tabs() {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const onUpdate = (e: CustomEvent<TabsBarUpdateEventDetail>) => {
    setTabIndex(e.detail.activeTabIndex);
  };
  const pathname = usePathname();

  const tabs = useMemo(() => {
    const { category, page, tab } = getPathnameRoutes(pathname);

    if (!page && category?.redirect) {
      redirect(category.redirect);
    }

    if (!tab && page?.subPaths) {
      redirect(`${Object.values(page.subPaths)[0].path}`);
    }

    if (tab && page?.subPaths) {
      setTabIndex(Object.values(page.subPaths).indexOf(tab));
      return page.subPaths;
    }
  }, [pathname]);

  if (!tabs) {
    return null;
  }

  return (
    <PTabsBar className="col-span-full xs:col-start-2 xs:col-end-12" activeTabIndex={tabIndex} onUpdate={onUpdate}>
      {Object.entries(tabs).map(([_, route]) => (
        <Link key={route.path} href={route.path as string}>
          {route.name}
        </Link>
      ))}
    </PTabsBar>
  );
}
